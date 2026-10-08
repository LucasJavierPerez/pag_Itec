import * as THREE from 'three';
import { FACE, VoxelBuilder, createGlowMaterial } from '../../../World/styles/voxel/voxel.ts';
import { ANIMATED_LIMBS, ROLE_ORDER } from '../characterSpec.ts';
import type { CharacterDef, Limb, Part } from '../characterSpec.ts';
import { pivotOf } from './primitives.ts';
import type { GeoPiece, StyleRenderer } from './types.ts';

/** Edge of one character cube (same grid as the voxel robot). */
export const VOXEL_CELL = 0.2;
const EPS = 1e-6;

interface Cell {
  role: number;
  limb: Limb | null;
}

const key = (x: number, y: number, z: number): string => `${x},${y},${z}`;
const GLOW_ROLES = [ROLE_ORDER.indexOf('glow'), ROLE_ORDER.indexOf('eye')];

/** True when the point (local to the part, axes before rotation) is inside the shape. */
function inside(part: Part, x: number, y: number, z: number): boolean {
  const hx = Math.max(part.size[0] / 2, VOXEL_CELL / 2 + EPS);
  const hy = Math.max(part.size[1] / 2, VOXEL_CELL / 2 + EPS);
  const hz = Math.max(part.size[2] / 2, VOXEL_CELL / 2 + EPS);
  if (part.shape === 'box') return Math.abs(x) <= hx && Math.abs(y) <= hy && Math.abs(z) <= hz;
  const nx = x / hx;
  const nz = z / hz;
  const ny = y / hy;
  if (part.shape === 'sphere') return nx * nx + ny * ny + nz * nz <= 1 + EPS;
  if (Math.abs(ny) > 1 + EPS) return false;
  const radial = Math.hypot(nx, nz);
  if (part.shape === 'cylinder') return radial <= 1 + EPS;
  // cone: full radius at the base (y = -h/2), zero at the apex (y = +h/2)
  return radial <= (1 - ny) / 2 + EPS;
}

/** Fills the cells whose centre lies inside each part (later parts override earlier ones). */
function rasterize(parts: Part[], animated: boolean): Map<string, Cell & { x: number; y: number; z: number }> {
  const cells = new Map<string, Cell & { x: number; y: number; z: number }>();
  const q = new THREE.Quaternion();
  const e = new THREE.Euler();
  const v = new THREE.Vector3();
  for (const part of parts) {
    const r = part.rot ?? [0, 0, 0];
    q.setFromEuler(e.set(r[0], r[1], r[2])).invert();
    const reach = Math.hypot(part.size[0], part.size[1], part.size[2]) / 2 + VOXEL_CELL;
    const role = ROLE_ORDER.indexOf(part.role);
    const limb = animated && part.limb && ANIMATED_LIMBS.includes(part.limb) ? part.limb : null;
    const lo = part.pos.map((c) => Math.floor((c - reach) / VOXEL_CELL));
    const hi = part.pos.map((c) => Math.ceil((c + reach) / VOXEL_CELL));
    const put = (ix: number, iy: number, iz: number): void => {
      cells.set(key(ix, iy, iz), { role, limb, x: ix, y: iy, z: iz });
    };
    for (let ix = lo[0]; ix <= hi[0]; ix++) {
      for (let iy = lo[1]; iy <= hi[1]; iy++) {
        for (let iz = lo[2]; iz <= hi[2]; iz++) {
          v.set(
            (ix + 0.5) * VOXEL_CELL - part.pos[0],
            (iy + 0.5) * VOXEL_CELL - part.pos[1],
            (iz + 0.5) * VOXEL_CELL - part.pos[2],
          ).applyQuaternion(q);
          if (inside(part, v.x, v.y, v.z)) put(ix, iy, iz);
        }
      }
    }
    // Details thinner than a cube still get the one cube that contains their centre
    put(
      Math.floor(part.pos[0] / VOXEL_CELL),
      Math.floor(part.pos[1] / VOXEL_CELL),
      Math.floor(part.pos[2] / VOXEL_CELL),
    );
  }
  return cells;
}

/** Deterministic +/-3% brightness of a cell (the baked "block" variation). */
function cellGain(x: number, y: number, z: number): number {
  const h = Math.sin(x * 127.1 + y * 311.7 + z * 74.7) * 43758.5453;
  return 1 + ((h - Math.floor(h)) * 2 - 1) * 0.03;
}

function popcount(mask: number): number {
  let n = 0;
  for (let m = mask; m; m &= m - 1) n++;
  return n;
}

function buildPiece(
  cells: Iterable<Cell & { x: number; y: number; z: number }>,
  all: Map<string, Cell>,
  origin: [number, number, number],
  limb: Limb | null,
  glow: boolean,
): GeoPiece | null {
  const builder = new VoxelBuilder(7, 0);
  const roles: number[] = [];
  const gains: number[] = [];
  for (const c of cells) {
    // A face is hidden only by a neighbour that moves with it (limbs swing away from the body)
    const free = (x: number, y: number, z: number): boolean => {
      const n = all.get(key(x, y, z));
      return !n || n.limb !== c.limb;
    };
    let mask = 0;
    if (free(c.x + 1, c.y, c.z)) mask |= FACE.PX;
    if (free(c.x - 1, c.y, c.z)) mask |= FACE.NX;
    if (free(c.x, c.y + 1, c.z)) mask |= FACE.PY;
    if (free(c.x, c.y - 1, c.z) && c.y > 0) mask |= FACE.NY;
    if (free(c.x, c.y, c.z + 1)) mask |= FACE.PZ;
    if (free(c.x, c.y, c.z - 1)) mask |= FACE.NZ;
    if (mask === 0) continue;
    builder.box(
      (c.x + 0.5) * VOXEL_CELL - origin[0],
      (c.y + 0.5) * VOXEL_CELL - origin[1],
      (c.z + 0.5) * VOXEL_CELL - origin[2],
      VOXEL_CELL,
      VOXEL_CELL,
      VOXEL_CELL,
      0xffffff,
      mask,
    );
    const g = cellGain(c.x, c.y, c.z);
    for (let i = 0; i < popcount(mask) * 4; i++) {
      roles.push(c.role);
      gains.push(g);
    }
  }
  if (builder.isEmpty) return null;
  const geometry = builder.build().geometry;
  geometry.deleteAttribute('aVoxel');
  return { limb, paint: 'vertex', glow, geometry, roles: Uint8Array.from(roles), gains: Float32Array.from(gains) };
}

/** Voxel: parts rasterized to cubes on a 0.2 grid, lit blocks plus unlit glow blocks. */
export const voxelRenderer: StyleRenderer = {
  outline: false,
  pieces(def: CharacterDef, animated: boolean): GeoPiece[] {
    const cells = rasterize(def.parts, animated);
    const out: GeoPiece[] = [];
    const list = [...cells.values()];
    const isGlow = (c: Cell): boolean => GLOW_ROLES.includes(c.role);

    const body = buildPiece(list.filter((c) => !c.limb && !isGlow(c)), cells, [0, 0, 0], null, false);
    if (body) out.push(body);
    const glow = buildPiece(list.filter((c) => !c.limb && isGlow(c)), cells, [0, 0, 0], null, true);
    if (glow) out.push(glow);
    if (animated) {
      for (const limb of ANIMATED_LIMBS) {
        const piece = buildPiece(list.filter((c) => c.limb === limb), cells, pivotOf(def, limb), limb, false);
        if (piece) out.push(piece);
      }
    }
    return out;
  },
  createMainMaterial: () => new THREE.MeshLambertMaterial({ vertexColors: true }),
  createPieceMaterial: (piece) => (piece.glow ? createGlowMaterial({}, false) : new THREE.MeshLambertMaterial({ vertexColors: true })),
};
