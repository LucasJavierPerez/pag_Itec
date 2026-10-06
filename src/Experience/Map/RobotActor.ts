import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { STYLES } from '../World/styles/index.ts';
import type { StyleId } from '../World/styles/types.ts';
import { disposeObject } from '../World/styles/shared/dispose.ts';

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
 * The robot that lives on the map. `holder` carries the ground position and heading, `tilt`
 * the run animation (lean / sway), and the style robot sits inside it.
 */
export class RobotActor {
  readonly holder = new THREE.Group();
  readonly tilt = new THREE.Group();

  private _body: THREE.Group | null = null;
  private _bounce: (time: number) => number = () => 0;
  private _shadows = false;

  constructor(parent: THREE.Object3D, styleId: StyleId) {
    this.tilt.scale.setScalar(MAP_ROBOT_SCALE);
    this.holder.add(this.tilt);
    parent.add(this.holder);
    this.setStyle(styleId);
  }

  /** Replaces the robot visual by the one of `styleId`, keeping position and heading. */
  setStyle(styleId: StyleId): void {
    if (this._body) disposeObject(this._body);
    const result = STYLES[styleId].createRobot();
    this._body = result.group;
    bakeByMaterial(this._body);
    this._bounce = result.getBounceOffset;
    this.tilt.add(this._body);
    this.setShadows(this._shadows);
  }

  setShadows(enabled: boolean): void {
    this._shadows = enabled;
    this._body?.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) o.castShadow = enabled;
    });
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
    return this._bounce(time) * MAP_ROBOT_SCALE;
  }

  dispose(): void {
    if (this._body) disposeObject(this._body);
    this._body = null;
    this.holder.parent?.remove(this.holder);
  }
}
