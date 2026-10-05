import * as THREE from 'three';
import { seededRandom } from '../shared/lowPoly.ts';
import { applyBuildIn } from './buildIn.ts';

/** Face bit flags used to cull faces that can never be seen. */
export const FACE = {
  PX: 1,
  NX: 2,
  PY: 4,
  NY: 8,
  PZ: 16,
  NZ: 32,
} as const;

export const FACES_ALL = 63;
/** Default: skip the bottom face, it is never visible and just costs vertices. */
export const FACES_NO_BOTTOM = FACES_ALL & ~FACE.NY;
export const FACES_TOP_ONLY = FACE.PY;

type Vec3 = [number, number, number];

/** Multiplies the brightness of a hex color. Returns a hex color. */
export function shade(hex: number, factor: number): number {
  const r = Math.min(255, Math.round(((hex >> 16) & 255) * factor));
  const g = Math.min(255, Math.round(((hex >> 8) & 255) * factor));
  const b = Math.min(255, Math.round((hex & 255) * factor));
  return (r << 16) | (g << 8) | b;
}

/** Mixes two hex colors (t = 0 gives a, t = 1 gives b). */
export function mix(a: number, b: number, t: number): number {
  const ar = (a >> 16) & 255;
  const ag = (a >> 8) & 255;
  const ab = a & 255;
  const br = (b >> 16) & 255;
  const bg = (b >> 8) & 255;
  const bb = b & 255;
  return (
    (Math.round(ar + (br - ar) * t) << 16) |
    (Math.round(ag + (bg - ag) * t) << 8) |
    Math.round(ab + (bb - ab) * t)
  );
}

export interface VoxelBuildOptions {
  /** Defaults to a shared lit Lambert material with vertex colors. */
  material?: THREE.Material;
  castShadow?: boolean;
  receiveShadow?: boolean;
}

/** One shared lit material: flat faces with per-vertex colors. Takes part in the build-in animation. */
const litMaterial = applyBuildIn(new THREE.MeshLambertMaterial({ vertexColors: true }));

/**
 * Same look as the default material but never animated: for big slabs (ground, hills) and for
 * dynamic props (robot, ball, goal) that must not take part in the "blocks assemble" entry.
 */
export const staticLitMaterial = new THREE.MeshLambertMaterial({ vertexColors: true });

/** Unlit variant for glowing voxels (core, eyes, rings). `animated = false` opts out of the build-in. */
export function createGlowMaterial(
  extra: THREE.MeshBasicMaterialParameters = {},
  animated = true,
): THREE.MeshBasicMaterial {
  const mat = new THREE.MeshBasicMaterial({ vertexColors: true, ...extra });
  return animated ? applyBuildIn(mat) : mat;
}

/**
 * Accumulates axis-aligned boxes into ONE BufferGeometry with baked
 * per-vertex colors, so a whole prop or terrain layer is a single draw call.
 */
export class VoxelBuilder {
  private positions: number[] = [];
  private normals: number[] = [];
  private colors: number[] = [];
  /** Per-vertex center of the voxel the vertex belongs to (drives the build-in animation). */
  private centers: number[] = [];
  private cur: Vec3 = [0, 0, 0];
  private indices: number[] = [];
  private vertexCount = 0;
  private rand: () => number;
  private tmp = new THREE.Color();
  /** Max +/- brightness variation per voxel (0.06 = +/-6%). */
  private jitter: number;

  constructor(seed = 1, jitter = 0.06) {
    this.rand = seededRandom(seed);
    this.jitter = jitter;
  }

  get isEmpty(): boolean {
    return this.vertexCount === 0;
  }

  /** Adds a single box described by its center and size. */
  box(
    cx: number,
    cy: number,
    cz: number,
    sx: number,
    sy: number,
    sz: number,
    color: number,
    faces: number = FACES_NO_BOTTOM,
  ): this {
    if (faces === 0) return this;
    this.cur = [cx, cy, cz];

    // Seeded brightness jitter bakes a "textured block" look into the colors
    const k = 1 + (this.rand() * 2 - 1) * this.jitter;
    this.tmp.setHex(color);
    const r = this.tmp.r * k;
    const g = this.tmp.g * k;
    const b = this.tmp.b * k;

    const x0 = cx - sx / 2;
    const x1 = cx + sx / 2;
    const y0 = cy - sy / 2;
    const y1 = cy + sy / 2;
    const z0 = cz - sz / 2;
    const z1 = cz + sz / 2;

    if (faces & FACE.PX) this.quad([x1, y0, z1], [x1, y0, z0], [x1, y1, z0], [x1, y1, z1], 1, 0, 0, r, g, b);
    if (faces & FACE.NX) this.quad([x0, y0, z0], [x0, y0, z1], [x0, y1, z1], [x0, y1, z0], -1, 0, 0, r, g, b);
    if (faces & FACE.PY) this.quad([x0, y1, z1], [x1, y1, z1], [x1, y1, z0], [x0, y1, z0], 0, 1, 0, r, g, b);
    if (faces & FACE.NY) this.quad([x0, y0, z0], [x1, y0, z0], [x1, y0, z1], [x0, y0, z1], 0, -1, 0, r, g, b);
    if (faces & FACE.PZ) this.quad([x0, y0, z1], [x1, y0, z1], [x1, y1, z1], [x0, y1, z1], 0, 0, 1, r, g, b);
    if (faces & FACE.NZ) this.quad([x1, y0, z0], [x0, y0, z0], [x0, y1, z0], [x1, y1, z0], 0, 0, -1, r, g, b);
    return this;
  }

  /**
   * Fills a region (center + size) with a grid of cubes of roughly `cell`
   * size. Faces shared between neighbouring cells are never emitted, so big
   * walls stay cheap. `colorFn` picks the color of every cell.
   */
  fill(
    cx: number,
    cy: number,
    cz: number,
    sx: number,
    sy: number,
    sz: number,
    cell: number | Vec3,
    colorFn: number | ((ix: number, iy: number, iz: number) => number),
    options: { faces?: number; inset?: number } = {},
  ): this {
    const [cwx, cwy, cwz] = typeof cell === 'number' ? [cell, cell, cell] : cell;
    const nx = Math.max(1, Math.round(sx / cwx));
    const ny = Math.max(1, Math.round(sy / cwy));
    const nz = Math.max(1, Math.round(sz / cwz));
    const dx = sx / nx;
    const dy = sy / ny;
    const dz = sz / nz;
    const allowed = options.faces ?? FACES_NO_BOTTOM;
    const inset = options.inset ?? 0;
    const sizeX = dx - inset;
    const sizeY = dy - inset;
    const sizeZ = dz - inset;

    for (let ix = 0; ix < nx; ix++) {
      for (let iy = 0; iy < ny; iy++) {
        for (let iz = 0; iz < nz; iz++) {
          let mask = 0;
          if (inset > 0) {
            mask = FACES_ALL;
          } else {
            if (ix === nx - 1) mask |= FACE.PX;
            if (ix === 0) mask |= FACE.NX;
            if (iy === ny - 1) mask |= FACE.PY;
            if (iy === 0) mask |= FACE.NY;
            if (iz === nz - 1) mask |= FACE.PZ;
            if (iz === 0) mask |= FACE.NZ;
          }
          mask &= allowed;
          if (mask === 0) continue;
          const color = typeof colorFn === 'number' ? colorFn : colorFn(ix, iy, iz);
          this.box(
            cx - sx / 2 + dx * (ix + 0.5),
            cy - sy / 2 + dy * (iy + 0.5),
            cz - sz / 2 + dz * (iz + 0.5),
            sizeX,
            sizeY,
            sizeZ,
            color,
            mask,
          );
        }
      }
    }
    return this;
  }

  /** Random number from the builder's own seeded stream. */
  random(): number {
    return this.rand();
  }

  /** Bakes everything into a single mesh. */
  build(options: VoxelBuildOptions = {}): THREE.Mesh {
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.Float32BufferAttribute(this.positions, 3));
    geometry.setAttribute('normal', new THREE.Float32BufferAttribute(this.normals, 3));
    geometry.setAttribute('color', new THREE.Float32BufferAttribute(this.colors, 3));
    geometry.setAttribute('aVoxel', new THREE.Float32BufferAttribute(this.centers, 3));
    geometry.setIndex(
      this.vertexCount > 65535
        ? new THREE.Uint32BufferAttribute(this.indices, 1)
        : new THREE.Uint16BufferAttribute(this.indices, 1),
    );
    geometry.computeBoundingSphere();
    geometry.computeBoundingBox();

    const mesh = new THREE.Mesh(geometry, options.material ?? litMaterial);
    mesh.castShadow = options.castShadow ?? true;
    mesh.receiveShadow = options.receiveShadow ?? true;
    return mesh;
  }

  private quad(
    a: Vec3,
    b: Vec3,
    c: Vec3,
    d: Vec3,
    nx: number,
    ny: number,
    nz: number,
    r: number,
    g: number,
    bl: number,
  ): void {
    const base = this.vertexCount;
    for (const v of [a, b, c, d]) {
      this.positions.push(v[0], v[1], v[2]);
      this.normals.push(nx, ny, nz);
      this.colors.push(r, g, bl);
      this.centers.push(this.cur[0], this.cur[1], this.cur[2]);
    }
    this.indices.push(base, base + 1, base + 2, base, base + 2, base + 3);
    this.vertexCount += 4;
  }
}
