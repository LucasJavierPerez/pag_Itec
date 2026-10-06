import * as THREE from 'three';

export interface BatchOptions {
  /** Boxes become unit cubes (with a tiny per-cube tint) and round shapes become blocks. */
  voxel: boolean;
  /** Faceted normals on round shapes. */
  flat: boolean;
}

interface Frame {
  x: number;
  y: number;
  z: number;
  c: number;
  s: number;
}

export interface BoxOptions {
  glow?: number;
  /** Only emit the +Y face (flat ground tiles). */
  topOnly?: boolean;
  /** Keep the box as one piece even in voxel mode. */
  solid?: boolean;
}

const R = (n: number): number => Math.round(n * 1000) / 1000;

/**
 * Collects colored triangles into one non-indexed BufferGeometry (position, normal, color, aGlow).
 * Primitives are expressed in a local frame that can be moved and yawed with `push`/`pop`.
 */
export class MapBatch {
  private _opts: BatchOptions;
  private _pos: number[] = [];
  private _nor: number[] = [];
  private _col: number[] = [];
  private _glow: number[] = [];
  private _stack: Frame[] = [{ x: 0, y: 0, z: 0, c: 1, s: 0 }];
  private _color = new THREE.Color();

  constructor(opts: BatchOptions) {
    this._opts = opts;
  }

  get empty(): boolean {
    return this._pos.length === 0;
  }

  /** Enters a child frame at (x, y, z) rotated `yaw` radians around Y. */
  push(x: number, y: number, z: number, yaw = 0): this {
    const f = this._stack[this._stack.length - 1];
    // Two Y rotations compose by adding their angles
    const angle = Math.atan2(f.s, f.c) + yaw;
    this._stack.push({
      x: f.x + f.c * x + f.s * z,
      y: f.y + y,
      z: f.z - f.s * x + f.c * z,
      c: Math.cos(angle),
      s: Math.sin(angle),
    });
    return this;
  }

  pop(): this {
    if (this._stack.length > 1) this._stack.pop();
    return this;
  }

  private _v(x: number, y: number, z: number): [number, number, number] {
    const f = this._stack[this._stack.length - 1];
    return [f.c * x + f.s * z + f.x, y + f.y, -f.s * x + f.c * z + f.z];
  }

  private _n(x: number, y: number, z: number): [number, number, number] {
    const f = this._stack[this._stack.length - 1];
    return [f.c * x + f.s * z, y, -f.s * x + f.c * z];
  }

  private _tri(
    a: [number, number, number],
    b: [number, number, number],
    c: [number, number, number],
    na: [number, number, number],
    nb: [number, number, number],
    nc: [number, number, number],
    rgb: THREE.Color,
    glow: number,
  ): void {
    const va = this._v(...a);
    const vb = this._v(...b);
    const vc = this._v(...c);
    this._pos.push(...va, ...vb, ...vc);
    this._nor.push(...this._n(...na), ...this._n(...nb), ...this._n(...nc));
    for (let i = 0; i < 3; i++) {
      this._col.push(rgb.r, rgb.g, rgb.b);
      this._glow.push(glow);
    }
  }

  private _quad(
    a: [number, number, number],
    b: [number, number, number],
    c: [number, number, number],
    d: [number, number, number],
    n: [number, number, number],
    rgb: THREE.Color,
    glow: number,
  ): void {
    this._tri(a, b, c, n, n, n, rgb, glow);
    this._tri(a, c, d, n, n, n, rgb, glow);
  }

  /** Axis-aligned box (in the current frame) given by its center and size. */
  box(cx: number, cy: number, cz: number, w: number, h: number, d: number, color: number, o: BoxOptions = {}): this {
    const glow = o.glow ?? 0;
    const unitMode = this._opts.voxel && !o.solid && !o.topOnly && Math.min(w, h, d) >= 0.9;
    if (!unitMode) {
      this._color.setHex(color);
      this._emitBox(cx, cy, cz, w, h, d, this._color, glow, o.topOnly ? 4 : 63);
      return this;
    }
    const nx = Math.max(1, Math.round(w));
    const ny = Math.max(1, Math.round(h));
    const nz = Math.max(1, Math.round(d));
    const sx = w / nx;
    const sy = h / ny;
    const sz = d / nz;
    const x0 = cx - w / 2;
    const y0 = cy - h / 2;
    const z0 = cz - d / 2;
    for (let ix = 0; ix < nx; ix++) {
      for (let iy = 0; iy < ny; iy++) {
        for (let iz = 0; iz < nz; iz++) {
          let mask = 0;
          if (ix === nx - 1) mask |= 1;
          if (ix === 0) mask |= 2;
          if (iy === ny - 1) mask |= 4;
          if (iy === 0) mask |= 8;
          if (iz === nz - 1) mask |= 16;
          if (iz === 0) mask |= 32;
          if (mask === 0) continue;
          // Deterministic tint so neighbouring cubes read as separate blocks
          const hash = (ix * 73856093) ^ (iy * 19349663) ^ (iz * 83492791);
          const tint = 0.93 + (((hash >>> 0) % 100) / 100) * 0.12;
          this._color.setHex(color).multiplyScalar(tint);
          this._emitBox(x0 + (ix + 0.5) * sx, y0 + (iy + 0.5) * sy, z0 + (iz + 0.5) * sz, sx, sy, sz, this._color, glow, mask);
        }
      }
    }
    return this;
  }

  private _emitBox(
    cx: number,
    cy: number,
    cz: number,
    w: number,
    h: number,
    d: number,
    rgb: THREE.Color,
    glow: number,
    mask: number,
  ): void {
    const x0 = cx - w / 2;
    const x1 = cx + w / 2;
    const y0 = cy - h / 2;
    const y1 = cy + h / 2;
    const z0 = cz - d / 2;
    const z1 = cz + d / 2;
    if (mask & 1) this._quad([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], [1, 0, 0], rgb, glow);
    if (mask & 2) this._quad([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], [-1, 0, 0], rgb, glow);
    if (mask & 4) this._quad([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], [0, 1, 0], rgb, glow);
    if (mask & 8) this._quad([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, -1, 0], rgb, glow);
    if (mask & 16) this._quad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], [0, 0, 1], rgb, glow);
    if (mask & 32) this._quad([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], [0, 0, -1], rgb, glow);
  }

  /**
   * Vertical cylinder / cone frustum centered at (cx, cy, cz). `rTop` 0 gives a cone.
   * In voxel mode it becomes square blocks (cones become stacked shrinking blocks).
   */
  cyl(
    cx: number,
    cy: number,
    cz: number,
    rTop: number,
    rBot: number,
    h: number,
    color: number,
    seg = 12,
    glow = 0,
  ): this {
    if (this._opts.voxel) {
      const layers = rTop === rBot ? 1 : Math.max(2, Math.round(h));
      const width = seg === 4 ? Math.SQRT2 : 1.7;
      for (let i = 0; i < layers; i++) {
        const t = layers === 1 ? 0.5 : (i + 0.5) / layers;
        const r = Math.max(0.25, rBot + (rTop - rBot) * t);
        this.box(cx, cy - h / 2 + ((i + 0.5) * h) / layers, cz, r * width, h / layers, r * width, color, { glow, solid: r < 0.5 });
      }
      return this;
    }
    this._color.setHex(color);
    const rgb = this._color;
    const y0 = cy - h / 2;
    const y1 = cy + h / 2;
    const slope = (rBot - rTop) / h;
    const ring = (i: number): [number, number] => {
      const a = (i / seg) * Math.PI * 2 + (seg === 4 ? Math.PI / 4 : 0);
      return [Math.cos(a), Math.sin(a)];
    };
    for (let i = 0; i < seg; i++) {
      const [c0, s0] = ring(i);
      const [c1, s1] = ring(i + 1);
      const p0b: [number, number, number] = [cx + c0 * rBot, y0, cz + s0 * rBot];
      const p1b: [number, number, number] = [cx + c1 * rBot, y0, cz + s1 * rBot];
      const p0t: [number, number, number] = [cx + c0 * rTop, y1, cz + s0 * rTop];
      const p1t: [number, number, number] = [cx + c1 * rTop, y1, cz + s1 * rTop];
      const nrm = (c: number, s: number): [number, number, number] => {
        const len = Math.hypot(1, slope);
        return [c / len, slope / len, s / len];
      };
      let n0 = nrm(c0, s0);
      let n1 = nrm(c1, s1);
      if (this._opts.flat) {
        const mc = Math.cos(((i + 0.5) / seg) * Math.PI * 2 + (seg === 4 ? Math.PI / 4 : 0));
        const ms = Math.sin(((i + 0.5) / seg) * Math.PI * 2 + (seg === 4 ? Math.PI / 4 : 0));
        n0 = nrm(mc, ms);
        n1 = n0;
      }
      // Counter-clockwise seen from outside
      this._tri(p0b, p0t, p1b, n0, n0, n1, rgb, glow);
      if (rTop > 0) this._tri(p1b, p0t, p1t, n1, n0, n1, rgb, glow);
      // Caps
      if (rTop > 0) this._tri([cx, y1, cz], p1t, p0t, [0, 1, 0], [0, 1, 0], [0, 1, 0], rgb, glow);
      if (rBot > 0) this._tri([cx, y0, cz], p0b, p1b, [0, -1, 0], [0, -1, 0], [0, -1, 0], rgb, glow);
    }
    return this;
  }

  /** Triangular prism with its ridge along Z (gable roof). `w` x `d` footprint, `h` tall. */
  gable(cx: number, cy: number, cz: number, w: number, h: number, d: number, color: number): this {
    if (this._opts.voxel) {
      const steps = Math.max(1, Math.round(h));
      for (let i = 0; i < steps; i++) {
        const sw = w * (1 - i / steps);
        this.box(cx, cy - h / 2 + ((i + 0.5) * h) / steps, cz, Math.max(1, sw), h / steps, d, color);
      }
      return this;
    }
    this._color.setHex(color);
    const rgb = this._color;
    const x0 = cx - w / 2;
    const x1 = cx + w / 2;
    const y0 = cy - h / 2;
    const y1 = cy + h / 2;
    const z0 = cz - d / 2;
    const z1 = cz + d / 2;
    const len = Math.hypot(h, w / 2);
    const ny = (w / 2) / len;
    const nx = h / len;
    this._quad([x1, y0, z1], [x1, y0, z0], [cx, y1, z0], [cx, y1, z1], [nx, ny, 0], rgb, 0);
    this._quad([x0, y0, z0], [x0, y0, z1], [cx, y1, z1], [cx, y1, z0], [-nx, ny, 0], rgb, 0);
    this._tri([x0, y0, z1], [x1, y0, z1], [cx, y1, z1], [0, 0, 1], [0, 0, 1], [0, 0, 1], rgb, 0);
    this._tri([x1, y0, z0], [x0, y0, z0], [cx, y1, z0], [0, 0, -1], [0, 0, -1], [0, 0, -1], rgb, 0);
    this._quad([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], [0, -1, 0], rgb, 0);
    return this;
  }

  /** Builds the geometry (call once; the batch can be discarded afterwards). */
  toGeometry(): THREE.BufferGeometry {
    const g = new THREE.BufferGeometry();
    g.setAttribute('position', new THREE.Float32BufferAttribute(this._pos.map(R), 3));
    g.setAttribute('normal', new THREE.Float32BufferAttribute(this._nor, 3));
    g.setAttribute('color', new THREE.Float32BufferAttribute(this._col, 3));
    g.setAttribute('aGlow', new THREE.Float32BufferAttribute(this._glow, 1));
    g.computeBoundingSphere();
    g.computeBoundingBox();
    return g;
  }
}
