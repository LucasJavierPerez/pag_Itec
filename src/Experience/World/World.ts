import * as THREE from 'three';
import { STYLES } from './styles/index.ts';
import type { StyleId, StyleModule, Destroyable, LightsHandle, PhysicsBodyDesc, PhysicsWallDesc, TriggerZoneDesc, SignatureHandle, SignatureQuality } from './styles/types.ts';
import { Particles } from './Particles.ts';
import { disposeObject } from './styles/shared/dispose.ts';
import { buildCharacter } from '../Map/characters/buildCharacter.ts';
import type { CharacterInstance } from '../Map/characters/buildCharacter.ts';
import type { CharacterId } from '../Map/characters/characterSpec.ts';
import { RobotPainter } from '../Map/robotPaint.ts';
import { getRobotSkin } from '../Map/skins/robotSkins.ts';
import type { RobotSkinId } from '../Map/skins/robotSkins.ts';

export type { PhysicsBodyDesc, TriggerZoneDesc } from './styles/types.ts';

/** Ground speed (units/s) at which a character's limbs swing at full amplitude. */
const CHARACTER_FULL_SPEED = 9;

const NO_OBJECTS: readonly THREE.Object3D[] = [];

/** Optional ball hook: receives new visuals when the style changes. */
export interface BallVisualTarget {
  setVisuals(ball: THREE.Object3D, goal: THREE.Group): void;
}

export class World {
  robotMesh: THREE.Group;
  physicsDescriptions: PhysicsBodyDesc[];
  triggerDescriptions: TriggerZoneDesc[];
  styleId: StyleId;

  private _scene: THREE.Scene;
  private _renderer: THREE.WebGLRenderer;
  private _camera: THREE.PerspectiveCamera;
  private _signature: SignatureHandle | null = null;
  private _quality: SignatureQuality;
  private _revealed = false;
  private _lights: LightsHandle;
  private _particles: Particles;
  private _lastUpdate: number;
  private _environment: Destroyable;
  private _floorGroup: THREE.Group;
  private _classroomsGroup: THREE.Group;
  private _robotBounce: (time: number) => number;
  private _characterId: CharacterId = 'robot';
  private _paletteId: RobotSkinId = 'clasico';
  private _character: CharacterInstance | null = null;
  private _painter: RobotPainter | null = null;
  private _startTime: number;
  private _ball: BallVisualTarget | null = null;

  // Horizontal speed derived from consecutive positions (scratch fields, no per-frame allocation)
  private _hasPrev = false;
  private _prevX = 0;
  private _prevZ = 0;
  private _speed = 0;
  private _travelDir = new THREE.Vector3(0, 0, 1);

  constructor(
    scene: THREE.Scene,
    renderer: THREE.WebGLRenderer,
    camera: THREE.PerspectiveCamera,
    styleId: StyleId,
    quality: SignatureQuality,
  ) {
    this._scene = scene;
    this._renderer = renderer;
    this._camera = camera;
    this._quality = quality;
    this._startTime = performance.now() / 1000;
    this.styleId = styleId;

    this._lastUpdate = this._startTime;
    this._particles = new Particles(scene);

    const style = STYLES[styleId];
    this._applyStageSettings(style);

    this._environment = style.createEnvironment(scene);
    this._lights = style.createLights(scene, style.getClassroomPositions());

    const floor = style.createFloor();
    scene.add(floor.meshGroup);
    this._floorGroup = floor.meshGroup;

    const classrooms = style.createClassrooms();
    scene.add(classrooms.meshGroup);
    this._classroomsGroup = classrooms.meshGroup;

    const robotResult = style.createRobot();
    this.robotMesh = robotResult.group;
    this._robotBounce = robotResult.getBounceOffset;
    this.robotMesh.position.set(0, 0, 0);
    scene.add(this.robotMesh);
    this._painter = new RobotPainter(this.robotMesh);

    // Physics is built once from the first build; it never changes on re-skin.
    this.physicsDescriptions = [
      ...floor.physicsBodies,
      ...classrooms.physicsWalls.map((w: PhysicsWallDesc) => ({
        position: w.position,
        size: w.size,
      })),
    ];
    this.triggerDescriptions = [
      ...classrooms.triggerZones,
      // Address panel: sensor next to the welcome arch
      { name: 'Cómo llegar', position: { x: 4.5, y: 2, z: 30 }, size: { x: 10, y: 4, z: 6 } },
    ];

    this._signature = this._createSignature(style);
  }

  /** Drops the time spent paused so the next update() does not see one huge delta. */
  resetClock(): void {
    this._lastUpdate = performance.now() / 1000;
    this._hasPrev = false;
    this._speed = 0;
  }

  /** Forwards the quality level to the active signature effects. */
  setQuality(quality: SignatureQuality): void {
    const changed = quality !== this._quality;
    this._quality = quality;
    this._signature?.setQuality(quality);
    // Characters choose their limb pivots / outline by quality: rebuild in place
    if (changed && this._character) {
      const pos = this.robotMesh.position.clone();
      const quat = this.robotMesh.quaternion.clone();
      this._disposeRobotVisual();
      this._createRobotVisual(STYLES[this.styleId]);
      this.robotMesh.position.copy(pos);
      this.robotMesh.quaternion.copy(quat);
    }
  }

  /** The scene is now visible (loading screen gone): lets entry animations (voxel build-in) start. */
  enterSignature(): void {
    this._revealed = true;
    this._signature?.enter?.();
  }

  /** Objects of the signature that must not be written into the depth-of-field depth pass. */
  get depthExclude(): readonly THREE.Object3D[] {
    return this._signature?.depthExclude ?? NO_OBJECTS;
  }

  private _createSignature(style: StyleModule): SignatureHandle | null {
    return (
      style.createSignature?.({
        scene: this._scene,
        camera: this._camera,
        renderer: this._renderer,
        quality: this._quality,
        getRobotPosition: () => this.robotMesh.position,
        getRobot: () => this.robotMesh,
        lights: this._lights,
        awaitReveal: !this._revealed,
      }) ?? null
    );
  }

  /** Enables/disables the ground-dust trail (disabled on low quality). */
  setTrailEnabled(enabled: boolean): void {
    this._particles.setTrailEnabled(enabled);
  }

  /** Registers the ball and gives it the visuals of the current style. */
  attachBall(ball: BallVisualTarget): void {
    this._ball = ball;
    this._applyBallVisuals(STYLES[this.styleId]);
  }

  /** Rebuilds every visual in the given style, leaving physics untouched. */
  setStyle(id: StyleId): void {
    if (id === this.styleId) return;
    const style = STYLES[id];

    // Keep the robot pose so the swap is seamless until the next update()
    const pos = this.robotMesh.position.clone();
    const quat = this.robotMesh.quaternion.clone();

    this._signature?.destroy();
    this._signature = null;
    this._environment.destroy();
    this._lights.destroy();
    disposeObject(this._floorGroup);
    disposeObject(this._classroomsGroup);
    this._disposeRobotVisual();

    this._applyStageSettings(style);

    this._environment = style.createEnvironment(this._scene);
    this._lights = style.createLights(this._scene, style.getClassroomPositions());
    this._lights.update?.(pos);

    const floor = style.createFloor();
    this._scene.add(floor.meshGroup);
    this._floorGroup = floor.meshGroup;

    const classrooms = style.createClassrooms();
    this._scene.add(classrooms.meshGroup);
    this._classroomsGroup = classrooms.meshGroup;

    this._createRobotVisual(style);
    this.robotMesh.position.copy(pos);
    this.robotMesh.quaternion.copy(quat);

    this._applyBallVisuals(style);

    this.styleId = id;
    this._signature = this._createSignature(style);
    window.dispatchEvent(new CustomEvent('style-change', { detail: { id } }));
  }

  /**
   * The explorer wears the character + palette picked in the Skins panel. The robot keeps the
   * style's own model (only tinted); any other character replaces it with a spec-built one
   * (feet at y = 0, ~2.3 tall, front on +Z), swapped in place so pose and physics are untouched.
   */
  setAppearance(characterId: CharacterId, paletteId: RobotSkinId): void {
    this._paletteId = paletteId;
    if (characterId !== this._characterId) {
      const pos = this.robotMesh.position.clone();
      const quat = this.robotMesh.quaternion.clone();
      this._disposeRobotVisual();
      this._characterId = characterId;
      this._createRobotVisual(STYLES[this.styleId]);
      this.robotMesh.position.copy(pos);
      this.robotMesh.quaternion.copy(quat);
      return;
    }
    this._applyPalette();
  }

  /** Per-frame hook of the robot tint (the rainbow palette cycles its accent). */
  updateAppearance(timeSeconds: number): void {
    this._painter?.update(timeSeconds);
  }

  private _applyPalette(): void {
    if (this._character) this._character.setPalette(this._paletteId);
    else this._painter?.apply(getRobotSkin(this._paletteId));
  }

  private _disposeRobotVisual(): void {
    if (this._character) this._character.dispose();
    else disposeObject(this.robotMesh);
    this._character = null;
    this._painter = null;
  }

  /** Creates the explorer visual (robot or character) in `style`, tinted, and adds it to the scene. */
  private _createRobotVisual(style: StyleModule): void {
    if (this._characterId === 'robot') {
      const result = style.createRobot();
      this.robotMesh = result.group;
      this._robotBounce = result.getBounceOffset;
      this._painter = new RobotPainter(this.robotMesh);
    } else {
      this._character = buildCharacter({
        characterId: this._characterId,
        paletteId: this._paletteId,
        styleId: style.id,
        quality: this._quality,
      });
      this.robotMesh = this._character.group;
      this._robotBounce = (time) => Math.sin(time * 2.4) * 0.03 + 0.03;
    }
    this._scene.add(this.robotMesh);
    if (this._painter) this._painter.apply(getRobotSkin(this._paletteId));
  }

  private _applyBallVisuals(style: StyleModule): void {
    this._ball?.setVisuals(style.createBallVisual(), style.createGoalVisual());
  }

  private _applyStageSettings(style: StyleModule): void {
    const { scene: s, renderer: r } = style;
    this._scene.background = new THREE.Color(s.background);
    this._scene.fog = new THREE.Fog(s.fogColor, s.fogNear, s.fogFar);

    const gl = this._renderer;
    const shadowChanged = gl.shadowMap.type !== r.shadowMapType;
    gl.toneMapping = r.toneMapping;
    gl.toneMappingExposure = r.toneMappingExposure;
    gl.shadowMap.type = r.shadowMapType;
    if (shadowChanged) gl.shadowMap.needsUpdate = true;
  }

  update(
    position: THREE.Vector3,
    quaternion: THREE.Quaternion,
  ): void {
    const now = performance.now() / 1000;
    const dt = now - this._lastUpdate;
    this._lastUpdate = now;
    const time = now - this._startTime;
    const bounce = this._robotBounce(time);
    this.robotMesh.position.copy(position);
    this.robotMesh.position.y += bounce;
    this.robotMesh.quaternion.copy(quaternion);
    if (this._character) {
      this._character.setMotion({ speed01: this._speed / CHARACTER_FULL_SPEED });
      this._character.update(Math.min(dt, 0.1), time);
    }
    this._lights.update?.(position);
    this._updateTrail(position, dt);
    this._particles.update(dt);
    this._signature?.update(Math.min(dt, 0.1), time);
  }

  private _updateTrail(position: THREE.Vector3, dt: number): void {
    if (this._hasPrev && dt > 1e-4) {
      const dx = position.x - this._prevX;
      const dz = position.z - this._prevZ;
      const dist = Math.sqrt(dx * dx + dz * dz);
      // A big jump is a teleport (vehicle reset), not motion
      if (dist < 4) {
        const raw = dist / dt;
        this._speed += (raw - this._speed) * (1 - Math.exp(-10 * Math.min(dt, 0.1)));
        if (dist > 1e-5) this._travelDir.set(dx / dist, 0, dz / dist);
      } else {
        this._speed = 0;
      }
    }
    this._hasPrev = true;
    this._prevX = position.x;
    this._prevZ = position.z;
    this._particles.emitTrail(position, this._travelDir, this._speed, dt);
  }

  destroy(): void {
    this._signature?.destroy();
    this._signature = null;
    this._lights.destroy();
    this._environment.destroy();
    this._particles.destroy();
  }
}
