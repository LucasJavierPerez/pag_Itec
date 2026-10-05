import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { Hull } from './buildingLayout.ts';

/**
 * Collects positioned geometries per material key and merges each key into ONE mesh, so a whole
 * category of decoration is a single draw call. Geometries must carry position / normal / uv.
 */
export class GeometryCollector {
  private parts = new Map<string, THREE.BufferGeometry[]>();
  private hulls: THREE.BufferGeometry[] = [];
  private readonly _m = new THREE.Matrix4();
  private readonly _q = new THREE.Quaternion();
  private readonly _e = new THREE.Euler();
  private readonly _p = new THREE.Vector3();
  private readonly _s = new THREE.Vector3(1, 1, 1);

  /** Adds a (possibly rolled about Z) geometry to the merge list of `key`; takes ownership of `g`. */
  add(key: string, g: THREE.BufferGeometry, x: number, y: number, z: number, rotZ = 0): void {
    const ng = g.index ? g.toNonIndexed() : g;
    if (ng !== g) g.dispose();
    this._e.set(0, 0, rotZ);
    this._q.setFromEuler(this._e);
    this._m.compose(this._p.set(x, y, z), this._q, this._s);
    ng.applyMatrix4(this._m);
    let list = this.parts.get(key);
    if (!list) this.parts.set(key, (list = []));
    list.push(ng);
  }

  box(key: string, w: number, h: number, d: number, x: number, y: number, z: number, rotZ = 0): void {
    this.add(key, new THREE.BoxGeometry(w, h, d), x, y, z, rotZ);
  }

  /** Adds an outline hull: the volume inflated by `thickness` per side (underside kept on the ground). */
  hull(h: Hull, thickness: number): void {
    const y0 = h.y - h.h / 2;
    const y1 = h.y + h.h / 2;
    const by = y0 > 0.01 ? y0 - thickness : y0;
    const g = new THREE.BoxGeometry(h.w + 2 * thickness, y1 + thickness - by, h.d + 2 * thickness).toNonIndexed();
    g.deleteAttribute('normal');
    g.deleteAttribute('uv');
    g.translate(h.x, (y1 + thickness + by) / 2, h.z);
    this.hulls.push(g);
  }

  /** Merged mesh of `key`, or null when nothing was added. Consumes the key's geometries. */
  buildKey(key: string, material: THREE.Material, name: string): THREE.Mesh | null {
    const list = this.parts.get(key);
    if (!list || list.length === 0) return null;
    this.parts.delete(key);
    const geometry = mergeGeometries(list, false);
    for (const g of list) g.dispose();
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    return mesh;
  }

  keys(): string[] {
    return [...this.parts.keys()];
  }

  /** Merged outline mesh (back faces only), or null when no hull was added. */
  buildOutline(material: THREE.Material, name: string): THREE.Mesh | null {
    if (this.hulls.length === 0) return null;
    const geometry = mergeGeometries(this.hulls, false);
    for (const g of this.hulls) g.dispose();
    this.hulls = [];
    const mesh = new THREE.Mesh(geometry, material);
    mesh.name = name;
    return mesh;
  }
}
