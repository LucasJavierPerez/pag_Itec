import type { DistrictId } from '../../UI/MapData.ts';

/**
 * Static layout of the map: road graph, landmark placements and district pads.
 * Pure data (no THREE dependency) so it can be checked headless. World units ~ 1 m,
 * x grows east, z grows south (towards the viewer), the whole map spans about 90 x 60.
 */

export interface LayoutNode {
  id: string;
  x: number;
  z: number;
}

export interface LayoutEdge {
  a: string;
  b: string;
}

export interface Placement {
  pointId: string;
  /** Landmark center on the ground. */
  x: number;
  z: number;
  /** Road node where the robot stops (the ring marker is drawn there). */
  stop: string;
  /** Rotation around Y: 0 faces south (+z), Math.PI faces north, -PI/2 faces west. */
  facing: number;
}

export interface DistrictRect {
  id: DistrictId;
  cx: number;
  cz: number;
  w: number;
  d: number;
}

export const PLAZA_ID = 'plaza';
export const PLAZA_RADIUS = 6.2;
export const ROAD_WIDTH = 3.2;
/** Walkable disc around each stop node (covers the ring marker and a little more). */
export const STOP_PAD_RADIUS = 2.4;
/** Standing within this distance of a stop node counts as being "on the pad" (opens the card). */
export const PAD_TRIGGER_RADIUS = 1.7;

/** Ground slab size; the camera never pans outside of it. */
export const MAP_SIZE = { w: 100, d: 68, cx: 0, cz: 1 };

const N = (id: string, x: number, z: number): LayoutNode => ({ id, x, z });
const E = (a: string, b: string): LayoutEdge => ({ a, b });

export const NODES: LayoutNode[] = [
  N(PLAZA_ID, 0, 0),
  // Carreras street (north)
  N('n1', 0, -13),
  N('k1', 6, -13),
  N('k2', 13, -13),
  N('k3', 20, -13),
  N('k4', 27, -13),
  N('k5', 34, -13),
  N('eN', 38, -13),
  // Sedes street (north-west) and its connectors
  N('nw1', -12, -13),
  N('s1', -26, -13),
  N('s2', -38, -13),
  N('nw0', -12, 0),
  N('ct', -12, -6),
  N('aW1', -26, 0),
  N('aW2', -38, 0),
  // Main avenue east and the Innovación street
  N('e0', 10, 0),
  N('e1', 24, 0),
  N('E2', 38, 0),
  N('i0', 10, 10),
  N('lb', 17, 10),
  N('i1', 24, 10),
  N('pt', 31, 10),
  N('i2', 38, 10),
  // South street (Cursos y oficios) and the Secundario access
  N('s0', 0, 10),
  N('w0', -12, 10),
  N('pcc', -18, 10),
  N('wB', -30, 10),
  N('wC', -38, 10),
  N('ab', 0, 18),
];

export const EDGES: LayoutEdge[] = [
  E(PLAZA_ID, 'n1'),
  E('n1', 'k1'), E('k1', 'k2'), E('k2', 'k3'), E('k3', 'k4'), E('k4', 'k5'), E('k5', 'eN'), E('eN', 'E2'),
  E('n1', 'nw1'), E('nw1', 's1'), E('s1', 's2'),
  E('nw1', 'ct'), E('ct', 'nw0'),
  E('s1', 'aW1'), E('s2', 'aW2'),
  E('aW2', 'aW1'), E('aW1', 'nw0'), E('nw0', PLAZA_ID),
  E(PLAZA_ID, 'e0'), E('e0', 'e1'), E('e1', 'E2'),
  E('e0', 'i0'), E('e1', 'i1'), E('E2', 'i2'),
  E('i0', 'lb'), E('lb', 'i1'), E('i1', 'pt'), E('pt', 'i2'),
  E(PLAZA_ID, 's0'), E('s0', 'i0'),
  E('s0', 'w0'), E('w0', 'pcc'), E('pcc', 'wB'), E('wB', 'wC'), E('aW2', 'wC'), E('nw0', 'w0'),
  E('s0', 'ab'),
];

const SOUTH = 0;
const NORTH = Math.PI;
const WEST = -Math.PI / 2;

const P = (pointId: string, x: number, z: number, stop: string, facing: number): Placement => ({
  pointId,
  x,
  z,
  stop,
  facing,
});

export const PLACEMENTS: Placement[] = [
  P('sede-centro', -38, -21, 's2', SOUTH),
  P('sede-campus', -26, -21, 's1', SOUTH),
  P('contacto', -8, -6, 'ct', WEST),
  P('carrera-software', 6, -20, 'k1', SOUTH),
  P('carrera-ia', 13, -20, 'k2', SOUTH),
  P('carrera-turismo', 20, -20, 'k3', SOUTH),
  P('carrera-mecatronica', 27, -20, 'k4', SOUTH),
  P('carrera-marketing', 34, -20, 'k5', SOUTH),
  P('itec-labs', 17, 17, 'lb', NORTH),
  P('sitec', 24, 17, 'i1', NORTH),
  P('portal-trabajo', 31, 17, 'pt', NORTH),
  P('pcc', -18, 17, 'pcc', NORTH),
  P('electromecanico', -30, 17, 'wB', NORTH),
  P('ada-byron', 0, 25, 'ab', NORTH),
];

export const DISTRICT_RECTS: DistrictRect[] = [
  { id: 'sedes', cx: -25, cz: -15.5, w: 38, d: 25 },
  { id: 'carreras', cx: 22, cz: -21.5, w: 40, d: 13 },
  { id: 'innovacion', cx: 25, cz: 20.5, w: 34, d: 17 },
  { id: 'cursos', cx: -27, cz: 20.5, w: 30, d: 17 },
  { id: 'secundario', cx: 0, cz: 21, w: 16, d: 18 },
];

// ---- Easter egg: the punched-card tile hidden behind the Secundario Ada Byron
/** Where the secret pad is (south-east of the Secundario, off the roads) and its trigger radius. */
export const ADA_SECRET = { id: 'ada', x: 10, z: 30.6, radius: 1.5 } as const;
/** Half-width of the hidden path that leads to the pad (reachable only with free movement). */
export const SECRET_PATH_HALF_WIDTH = 1.1;
/** Hidden path segments: they start inside the Secundario stop pad and end at the secret pad. */
export const SECRET_PATH: readonly { ax: number; az: number; bx: number; bz: number }[] = [
  { ax: 1.5, az: 18, bx: ADA_SECRET.x, bz: 18 },
  { ax: ADA_SECRET.x, az: 18, bx: ADA_SECRET.x, bz: ADA_SECRET.z },
];
/** Walkable pad around the tile (a bit bigger than the trigger radius). */
export const SECRET_PAD_WALK_RADIUS = ADA_SECRET.radius + 0.9;
