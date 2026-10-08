import { EDGES, NODES, PLACEMENTS, PLAZA_ID, PLAZA_RADIUS, ROAD_WIDTH, STOP_PAD_RADIUS } from './mapLayout.ts';

/**
 * Walkable ground of the map (pure, no THREE): the union of road capsules, the central plaza and
 * the stop pads. Buildings and landmarks are simply not part of it. `clampToWalkable` returns the
 * nearest walkable point, so a robot pushed into a wall slides along it instead of stopping.
 */

// ---- Tunable constants
/** Walkable half-width of a road: asphalt half-width plus part of the sidewalk. */
export const ROAD_HALF_WALK = ROAD_WIDTH / 2 + 0.4;
/** Default robot radius used to keep its body (not only its center) on the ground. */
export const PLAYER_RADIUS = 0.45;
/** Clamped points land this far inside the boundary so they test as walkable (idempotence). */
const INSET = 1e-6;

/** A segment with a radius (a disc when both ends coincide). */
export interface WalkShape {
  ax: number;
  az: number;
  bx: number;
  bz: number;
  r: number;
}

/** Extra walkable ground (e.g. the hidden path of the easter egg), passed at construction. */
export interface WalkableExtras {
  capsules?: WalkShape[];
  discs?: { x: number; z: number; r: number }[];
}

export interface Walkable {
  isWalkable(x: number, z: number, radius?: number): boolean;
  /** Writes the nearest walkable point to `out` (unchanged position when already walkable). */
  clampInto(x: number, z: number, radius: number, out: { x: number; z: number }): void;
  clampToWalkable(x: number, z: number, radius?: number): { x: number; z: number };
  readonly shapes: readonly WalkShape[];
}

export function createWalkable(extras: WalkableExtras = {}): Walkable {
  const nodes = new Map(NODES.map((n) => [n.id, n]));
  const shapes: WalkShape[] = [];
  for (const e of EDGES) {
    const a = nodes.get(e.a)!;
    const b = nodes.get(e.b)!;
    shapes.push({ ax: a.x, az: a.z, bx: b.x, bz: b.z, r: ROAD_HALF_WALK });
  }
  const plaza = nodes.get(PLAZA_ID)!;
  shapes.push({ ax: plaza.x, az: plaza.z, bx: plaza.x, bz: plaza.z, r: PLAZA_RADIUS - 0.2 });
  for (const p of PLACEMENTS) {
    const stop = nodes.get(p.stop)!;
    shapes.push({ ax: stop.x, az: stop.z, bx: stop.x, bz: stop.z, r: STOP_PAD_RADIUS });
  }
  for (const c of extras.capsules ?? []) shapes.push({ ...c });
  for (const d of extras.discs ?? []) shapes.push({ ax: d.x, az: d.z, bx: d.x, bz: d.z, r: d.r });

  const clampInto = (x: number, z: number, radius: number, out: { x: number; z: number }): void => {
    let bestD = Infinity;
    let bx = x;
    let bz = z;
    for (let i = 0; i < shapes.length; i++) {
      const s = shapes[i];
      const reff = s.r - radius;
      if (reff <= 0) continue;
      const dx = s.bx - s.ax;
      const dz = s.bz - s.az;
      const len2 = dx * dx + dz * dz;
      const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((x - s.ax) * dx + (z - s.az) * dz) / len2));
      const cx = s.ax + dx * t;
      const cz = s.az + dz * t;
      const ox = x - cx;
      const oz = z - cz;
      const d = Math.hypot(ox, oz);
      if (d <= reff) {
        out.x = x;
        out.z = z;
        return;
      }
      const excess = d - reff;
      if (excess < bestD) {
        bestD = excess;
        const k = (reff - INSET) / d;
        bx = cx + ox * k;
        bz = cz + oz * k;
      }
    }
    out.x = bx;
    out.z = bz;
  };

  const scratch = { x: 0, z: 0 };
  return {
    shapes,
    clampInto,
    isWalkable(x, z, radius = 0) {
      clampInto(x, z, radius, scratch);
      return scratch.x === x && scratch.z === z;
    },
    clampToWalkable(x, z, radius = PLAYER_RADIUS) {
      const out = { x, z };
      clampInto(x, z, radius, out);
      return out;
    },
  };
}

/** The base region (roads, plaza, stop pads). */
const BASE = createWalkable();

export function isWalkable(x: number, z: number, radius = 0): boolean {
  return BASE.isWalkable(x, z, radius);
}

export function clampToWalkable(x: number, z: number, radius = PLAYER_RADIUS): { x: number; z: number } {
  return BASE.clampToWalkable(x, z, radius);
}
