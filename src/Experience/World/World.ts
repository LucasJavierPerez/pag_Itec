import * as THREE from 'three';
import { STYLES } from './styles/index.ts';
import type { StyleId, StyleModule, Destroyable, LightsHandle, PhysicsBodyDesc, PhysicsWallDesc, TriggerZoneDesc, SignatureHandle, SignatureQuality } from './styles/types.ts';
import { Particles } from './Particles.ts';
import { disposeObject } from './styles/shared/dispose.ts';

export type { PhysicsBodyDesc, TriggerZoneDesc } from './styles/types.ts';

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

  /** Forwards the quality level to the active signature effects. */
  setQuality(quality: SignatureQuality): void {
    this._quality = quality;
    this._signature?.setQuality(quality);
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
    disposeObject(this.robotMesh);

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

    const robotResult = style.createRobot();
    this.robotMesh = robotResult.group;
    this._robotBounce = robotResult.getBounceOffset;
    this.robotMesh.position.copy(pos);
    this.robotMesh.quaternion.copy(quat);
    this._scene.add(this.robotMesh);

    this._applyBallVisuals(style);

    this.styleId = id;
    this._signature = this._createSignature(style);
    window.dispatchEvent(new CustomEvent('style-change', { detail: { id } }));
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
