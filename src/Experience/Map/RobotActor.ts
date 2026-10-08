import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { STYLES } from '../World/styles/index.ts';
import type { StyleId } from '../World/styles/types.ts';
import { disposeObject } from '../World/styles/shared/dispose.ts';
import { RobotPainter } from './robotPaint.ts';
import { getRobotSkin } from './skins/robotSkins.ts';
import type { RobotSkin } from './skins/robotSkins.ts';
import type { MapQuality } from './skins/types.ts';
import { buildCharacter } from './characters/buildCharacter.ts';
import type { CharacterInstance, CharacterMotion } from './characters/buildCharacter.ts';
import type { CharacterId } from './characters/characterSpec.ts';

/** Visual scale of the robot on the map (the style robots are ~1 m tall). */
export const MAP_ROBOT_SCALE = 1.4;

/**
 * Merges every static mesh of `root` that shares a material into one mesh (the style robots are
 * rigid groups of ~30 small meshes, which would cost ~30 draw calls on the map).
 */
export function bakeByMaterial(root: THREE.Object3D): void {
  root.updateMatrixWorld(true);
  const inverse = new THREE.Matrix4().copy(root.matrixWorld).invert();
  const buckets = new Map<string, { material: THREE.Material; meshes: THREE.Mesh[]; castShadow: boolean }>();
  root.traverse((o) => {
    const mesh = o as THREE.Mesh;
    if (!mesh.isMesh || Array.isArray(mesh.material)) return;
    const names = Object.keys(mesh.geometry.attributes).sort().join(',');
    const key = `${mesh.material.uuid}|${names}`;
    const bucket = buckets.get(key) ?? { material: mesh.material, meshes: [], castShadow: mesh.castShadow };
    bucket.meshes.push(mesh);
    buckets.set(key, bucket);
  });

  for (const bucket of buckets.values()) {
    if (bucket.meshes.length < 2) continue;
    const geometries = bucket.meshes.map((m) => {
      const g = (m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone()) as THREE.BufferGeometry;
      return g.applyMatrix4(new THREE.Matrix4().multiplyMatrices(inverse, m.matrixWorld));
    });
    const merged = mergeGeometries(geometries);
    geometries.forEach((g) => g.dispose());
    if (!merged) continue;
    for (const m of bucket.meshes) {
      m.geometry.dispose();
      m.parent?.remove(m);
    }
    const mesh = new THREE.Mesh(merged, bucket.material);
    mesh.castShadow = bucket.castShadow;
    root.add(mesh);
  }
}

/**
 * The character that lives on the map (the style's robot or a spec-built character). `holder`
 * carries the ground position and heading, `tilt` the run animation (lean / sway), and the
 * visual sits inside it.
 */
export class RobotActor {
  readonly holder = new THREE.Group();
  readonly tilt = new THREE.Group();

  private _scale: number;
  private _styleId: StyleId;
  private _characterId: CharacterId;
  private _quality: MapQuality;
  private _body: THREE.Group | null = null;
  private _character: CharacterInstance | null = null;
  private _bounce: (time: number) => number = () => 0;
  private _shadows = false;
  private _painter: RobotPainter | null = null;
  private _skin: RobotSkin = getRobotSkin(null);
  private _time = 0;
  private _motion: CharacterMotion | null = null;

  constructor(
    parent: THREE.Object3D,
    styleId: StyleId,
    skin?: RobotSkin,
    scale = MAP_ROBOT_SCALE,
    characterId: CharacterId = 'robot',
    quality: MapQuality = 'high',
  ) {
    this._scale = scale;
    this._styleId = styleId;
    this._characterId = characterId;
    this._quality = quality;
    if (skin) this._skin = skin;
    this.tilt.scale.setScalar(scale);
    this.holder.add(this.tilt);
    parent.add(this.holder);
    this._buildVisual();
  }

  get characterId(): CharacterId {
    return this._characterId;
  }

  /** (Re)creates the visual for the current style / character / quality, keeping position and heading. */
  private _buildVisual(): void {
    this._disposeVisual();
    if (this._characterId === 'robot') {
      const result = STYLES[this._styleId].createRobot();
      this._body = result.group;
      bakeByMaterial(this._body);
      this._painter = new RobotPainter(this._body);
      this._painter.apply(this._skin, this._time);
      this._bounce = result.getBounceOffset;
      this.tilt.add(this._body);
    } else {
      this._character = buildCharacter({
        characterId: this._characterId,
        paletteId: this._skin.id,
        styleId: this._styleId,
        timeSeconds: this._time,
        quality: this._quality,
      });
      if (this._motion) this._character.setMotion(this._motion);
      this._bounce = (time) => (Math.sin(time * 2.4) + 1) * 0.02;
      this.tilt.add(this._character.group);
    }
    this.setShadows(this._shadows);
  }

  private _disposeVisual(): void {
    if (this._body) disposeObject(this._body);
    this._body = null;
    this._painter = null;
    this._character?.dispose();
    this._character = null;
  }

  /** Replaces the visual by the one of `styleId`, keeping position and heading. */
  setStyle(styleId: StyleId): void {
    this._styleId = styleId;
    this._buildVisual();
  }

  /** Switches to another character (no-op when it is already worn). */
  setCharacter(characterId: CharacterId): void {
    if (characterId === this._characterId) return;
    this._characterId = characterId;
    this._buildVisual();
  }

  /** Quality only changes characters (limb pivots, outline): the robot is unaffected. */
  setQuality(quality: MapQuality): void {
    if (quality === this._quality) return;
    this._quality = quality;
    if (this._characterId !== 'robot') this._buildVisual();
  }

  /** Recolors the visual (survives `setStyle` / `setCharacter`). */
  setSkin(skin: RobotSkin): void {
    this._skin = skin;
    this._painter?.apply(skin, this._time);
    this._character?.setPalette(skin.id);
  }

  /** Drives the limb animation of a character (speed, greeting); the robot ignores it. */
  setMotion(motion: CharacterMotion): void {
    this._motion = motion;
    this._character?.setMotion(motion);
  }

  /** Per-frame hook: animated skins (rainbow) cycle their colours, characters swing their limbs. */
  update(time: number): void {
    const dt = Math.max(0, Math.min(0.1, time - this._time));
    this._time = time;
    this._painter?.update(time);
    this._character?.update(dt, time);
  }

  setShadows(enabled: boolean): void {
    this._shadows = enabled;
    const apply = (o: THREE.Object3D): void => {
      if ((o as THREE.Mesh).isMesh && !o.userData.noShadow) o.castShadow = enabled;
    };
    this._body?.traverse(apply);
    this._character?.group.traverse(apply);
  }

  get position(): THREE.Vector3 {
    return this.holder.position;
  }

  setPosition(x: number, z: number): void {
    this.holder.position.set(x, 0, z);
  }

  setHeading(yaw: number): void {
    this.holder.rotation.y = yaw;
  }

  /** The style's own idle bob (the explorer uses the same function). */
  idleBounce(time: number): number {
    return this._bounce(time) * this._scale;
  }

  dispose(): void {
    this._disposeVisual();
    this.holder.parent?.remove(this.holder);
  }
}
