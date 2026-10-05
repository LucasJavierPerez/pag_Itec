/**
 * Geometry-agnostic layout of the classroom building's decorative details: which wall stretches get a
 * plinth / cornice / pilasters / windows, where every classroom portal, lamp, planter, bench, vent and
 * flag goes, and where the south-facade hero gate and board stand.
 *
 * It returns plain descriptors (centre + size + semantic role). Each style renders them in its own
 * idiom (faceted boxes, smooth rounded meshes, voxel cubes, satin metal and emissive glass), so all four
 * styles read as the same building. Nothing here creates geometry, touches physics or depends on THREE.
 */

// ---------------------------------------------------------------- tunables
export const PLINTH = { height: 0.3, protrude: 0.08 };
export const CORNICE = { height: 0.25, protrude: 0.1 };
export const PILASTER = { size: 0.4, capSize: 0.62, capHeight: 0.12 };
/** Target spacing between pilasters along long walls. */
export const PILASTER_SPACING = 4;
export const WINDOW = { width: 1.3, height: 1.4, centerY: 2.3, frame: 0.1, depth: 0.1 };
export const PORTAL = {
  doorWidth: 3,
  doorHeight: 3.2,
  jamb: 0.35,
  lintelHeight: 0.4,
  plateHeight: 0.7,
  plateWidth: 2.8,
  awningDepth: 0.95,
  awningTilt: 0.35,
  lampOffsetZ: 2.4,
  lampHeight: 1.9,
};
export const HERO = {
  columnX: 2.3,
  columnSize: 0.6,
  columnHeight: 5.4,
  boardWidth: 4.2,
  boardY0: 4.2,
  boardHeight: 1.0,
  boardDepth: 0.3,
  /** z of the south end wall the gate stands on. */
  wallZ: 20,
};
export const PLANTER_X = 4.5;
export const PLANTER_Z = 22.2;
export const BENCH_X = 8;
export const BENCH_Z = 21.5;
/** North-east corner flag pole. */
export const FLAG = { x: 16, z: -20, poleHeight: 3.3 };
/** Rooftop vents on the north wall: x positions. */
export const VENT_X = [-9, 6];

// ---------------------------------------------------------------- public types
export type WallFace = '+x' | '-x' | '+z' | '-z';

export interface BuildingWall {
  /** Centre on the ground plane (same numbers as the physics wall). */
  x: number;
  z: number;
  sx: number;
  sz: number;
  /** Classroom accent color for back walls (cornice cap). */
  accent?: number;
  /** Put a pilaster in the middle of the span (false where a whiteboard hangs). */
  mid: boolean;
  /** Faces that get windows. */
  windows?: WallFace[];
  /** Wall ends that border an open gap (no pilaster there): lower / higher coordinate along its axis. */
  openEnds?: ('min' | 'max')[];
}

export interface BuildingRoom {
  name: string;
  color: number;
  x: number;
  z: number;
  facing: number;
}

export interface BuildingDetailsInput {
  walls: BuildingWall[];
  rooms: BuildingRoom[];
  wallHeight: number;
  roomDepth: number;
}

export type PartRole =
  | 'plinth'
  | 'blue'
  | 'stone'
  | 'glass'
  | 'frame'
  | 'board'
  | 'metal'
  | 'bulb'
  | 'pot'
  | 'wood'
  | 'white'
  | 'accent'
  | 'bush';

export type PartTag =
  | 'plinth'
  | 'cornice'
  | 'pilaster'
  | 'cap'
  | 'jamb'
  | 'lintel'
  | 'plate'
  | 'plate-border'
  | 'awning'
  | 'lamp-post'
  | 'lamp-arm'
  | 'lamp-bulb'
  | 'lamp-cap'
  | 'gate-column'
  | 'gate-cap'
  | 'board'
  | 'board-lintel'
  | 'window'
  | 'planter'
  | 'bench'
  | 'vent'
  | 'flag';

/** An axis-aligned box (optionally rolled about Z) described by centre and size. */
export interface Part {
  role: PartRole;
  tag: PartTag;
  x: number;
  y: number;
  z: number;
  /** Size along x / y / z. For role 'bush' `w` is the sphere radius. */
  w: number;
  h: number;
  d: number;
  /** Roll about Z in radians (only the awnings use it). */
  rotZ?: number;
  /** Classroom accent color, for role 'accent' (and for strips derived from it). */
  accent?: number;
  /** Direction away from the wall the part hangs on (+1 / -1 along x or z) for awnings and lamps. */
  facing?: number;
}

/** Axis-aligned silhouette volume that the toon / soft outline styles wrap. */
export interface Hull {
  tag: 'wall' | 'cornice' | 'pilaster' | 'cap' | 'portal' | 'gate' | 'board' | 'flag';
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  d: number;
}

export interface WindowDesc {
  face: WallFace;
  /** Wall centre (ground plane) the window sits on. */
  wallX: number;
  wallZ: number;
  /** Offset along the wall axis. */
  t: number;
  /** Wall thickness. */
  thick: number;
}

export interface HeroDesc {
  /** Board face (the printed plane): centre, size. The face looks towards +z. */
  x: number;
  y: number;
  z: number;
  w: number;
  h: number;
  /** Centre of the gate columns' tops, for lights. */
  columns: { x: number; y: number; z: number }[];
}

export interface BuildingLayout {
  parts: Part[];
  hulls: Hull[];
  windows: WindowDesc[];
  hero: HeroDesc;
  /** Distinct classroom accent colors (back walls + rooms). */
  accents: number[];
  wallHeight: number;
}

// ---------------------------------------------------------------- helpers
class Out {
  parts: Part[] = [];
  hulls: Hull[] = [];

  box(
    role: PartRole,
    tag: PartTag,
    w: number,
    h: number,
    d: number,
    x: number,
    y: number,
    z: number,
    extra: { rotZ?: number; accent?: number; facing?: number } = {},
  ): void {
    this.parts.push({ role, tag, x, y, z, w, h, d, ...extra });
  }

  hull(tag: Hull['tag'], w: number, h: number, d: number, x: number, y: number, z: number): void {
    this.hulls.push({ tag, x, y, z, w, h, d });
  }
}

/** Part positioned on a wall face: `t` along the wall, `off` outward from the wall centre line. */
function placeOnFace(
  face: WallFace,
  wallX: number,
  wallZ: number,
  t: number,
  y: number,
  off: number,
  width: number,
  height: number,
  depth: number,
): { x: number; y: number; z: number; w: number; h: number; d: number } {
  const sign = face[0] === '+' ? 1 : -1;
  if (face[1] === 'x') {
    return { x: wallX + sign * off, y, z: wallZ + t, w: depth, h: height, d: width };
  }
  return { x: wallX + t, y, z: wallZ + sign * off, w: width, h: height, d: depth };
}

/**
 * Standard window parts (inset glass + frame jambs, mullions, sill, header) for one window. The
 * smooth, faceted and satin styles all use this; the voxel style builds windows from cubes instead.
 */
export function windowParts(win: WindowDesc): Part[] {
  const out: Part[] = [];
  const face0 = win.thick / 2;
  const { width: w, height: h, centerY: cy, frame: f, depth: d } = WINDOW;
  const add = (role: PartRole, t: number, y: number, off: number, width: number, height: number, depth: number): void => {
    const p = placeOnFace(win.face, win.wallX, win.wallZ, t, y, off, width, height, depth);
    out.push({ role, tag: 'window', ...p });
  };
  const t = win.t;
  // Glass sits flush with the wall; the frame stands proud of it, so the glass reads as inset.
  add('glass', t, cy, face0 + 0.02, w, h, 0.04);
  const fo = face0 + d / 2;
  add('frame', t - w / 2, cy, fo, f, h + f, d); // left jamb
  add('frame', t + w / 2, cy, fo, f, h + f, d); // right jamb
  add('frame', t, cy, fo - 0.02, w, f * 0.6, d - 0.04); // horizontal mullion
  add('frame', t, cy, fo - 0.02, f * 0.6, h, d - 0.04); // vertical mullion
  add('frame', t, cy - h / 2 - 0.08, face0 + 0.11, w + 0.5, 0.1, 0.22); // sill
  add('frame', t, cy + h / 2 + 0.1, face0 + 0.07, w + 0.3, 0.12, 0.14); // header
  return out;
}

// ---------------------------------------------------------------- builders
function addWallShell(o: Out, wall: BuildingWall, H: number): void {
  const alongX = wall.sx >= wall.sz;
  const thick = alongX ? wall.sz : wall.sx;
  const len = alongX ? wall.sx : wall.sz;
  const grow = 2 * PLINTH.protrude;
  const cgrow = 2 * CORNICE.protrude;
  const px = alongX ? len : thick + grow;
  const pz = alongX ? thick + grow : len;
  // Plinth / baseboard (also reads as a baseboard inside the classrooms)
  o.box('plinth', 'plinth', px, PLINTH.height, pz, wall.x, PLINTH.height / 2, wall.z);
  // Cornice cap (accent on classroom back walls)
  const cx = alongX ? len : thick + cgrow;
  const cz = alongX ? thick + cgrow : len;
  const cy = H + CORNICE.height / 2;
  if (wall.accent !== undefined) {
    o.box('accent', 'cornice', cx, CORNICE.height, cz, wall.x, cy, wall.z, { accent: wall.accent });
  } else {
    o.box('blue', 'cornice', cx, CORNICE.height, cz, wall.x, cy, wall.z);
  }
  // Outline: wall volume and cornice
  o.hull('wall', wall.sx, H, wall.sz, wall.x, H / 2, wall.z);
  o.hull('cornice', cx, CORNICE.height, cz, wall.x, cy, wall.z);
}

function addPilasterAndWindows(
  o: Out,
  windows: WindowDesc[],
  wall: BuildingWall,
  H: number,
  placed: Set<string>,
): void {
  const alongX = wall.sx >= wall.sz;
  const thick = alongX ? wall.sz : wall.sx;
  const len = alongX ? wall.sx : wall.sz;
  const n = wall.mid ? Math.max(2, Math.round(len / PILASTER_SPACING)) : 1;
  const step = len / n;
  const positions: number[] = [];
  for (let i = 0; i <= n; i++) positions.push(-len / 2 + i * step);

  // Body ends flush with the cornice top; the cap then rises PILASTER.capHeight above it.
  const bodyH = H + CORNICE.height;
  for (let i = 0; i < positions.length; i++) {
    const t = positions[i];
    const isMin = i === 0;
    const isMax = i === positions.length - 1;
    if ((isMin && wall.openEnds?.includes('min')) || (isMax && wall.openEnds?.includes('max'))) continue;
    const px = alongX ? wall.x + t : wall.x;
    const pz = alongX ? wall.z : wall.z + t;
    const key = `${px.toFixed(2)},${pz.toFixed(2)}`;
    if (placed.has(key)) continue;
    placed.add(key);
    o.box('stone', 'pilaster', PILASTER.size, bodyH, PILASTER.size, px, bodyH / 2, pz);
    o.box('blue', 'cap', PILASTER.capSize, PILASTER.capHeight, PILASTER.capSize, px, bodyH + PILASTER.capHeight / 2, pz);
    o.hull('pilaster', PILASTER.size, bodyH, PILASTER.size, px, bodyH / 2, pz);
    o.hull('cap', PILASTER.capSize, PILASTER.capHeight, PILASTER.capSize, px, bodyH + PILASTER.capHeight / 2, pz);
  }

  if (wall.windows) {
    for (let i = 0; i < positions.length - 1; i++) {
      const t = (positions[i] + positions[i + 1]) / 2;
      for (const face of wall.windows) windows.push({ face, wallX: wall.x, wallZ: wall.z, t, thick });
    }
  }
}

function addPortal(o: Out, room: BuildingRoom, entranceX: number): void {
  const f = room.facing;
  const accent = room.color;
  const { doorWidth: dw, doorHeight: dh, jamb } = PORTAL;
  const jambZ = dw / 2 + jamb / 2;

  // Side jambs
  for (const s of [-1, 1]) {
    o.box('stone', 'jamb', jamb, dh, jamb, entranceX, dh / 2, room.z + s * jambZ);
    o.hull('portal', jamb, dh, jamb, entranceX, dh / 2, room.z + s * jambZ);
  }
  // Lintel in the classroom accent color
  const lintelW = dw + 2 * jamb + 0.1;
  const lintelY = dh + PORTAL.lintelHeight / 2;
  o.box('accent', 'lintel', 0.45, PORTAL.lintelHeight, lintelW, entranceX, lintelY, room.z, { accent });
  o.hull('portal', 0.45, PORTAL.lintelHeight, lintelW, entranceX, lintelY, room.z);
  // Nameplate: accent border behind a dark board
  const plateY = dh + PORTAL.lintelHeight + 0.05 + PORTAL.plateHeight / 2;
  o.box('accent', 'plate-border', 0.2, PORTAL.plateHeight + 0.16, PORTAL.plateWidth + 0.16, entranceX, plateY, room.z, { accent });
  o.box('board', 'plate', 0.28, PORTAL.plateHeight, PORTAL.plateWidth, entranceX, plateY, room.z);
  o.hull('portal', 0.28, PORTAL.plateHeight + 0.16, PORTAL.plateWidth + 0.16, entranceX, plateY, room.z);
  // Angled awning above the plate, sloping down away from the classroom
  const awnY = plateY + PORTAL.plateHeight / 2 + 0.28;
  o.box(
    'accent',
    'awning',
    PORTAL.awningDepth,
    0.08,
    lintelW + 0.3,
    entranceX + f * (PORTAL.awningDepth / 2 - 0.05),
    awnY,
    room.z,
    { rotZ: -f * PORTAL.awningTilt, accent, facing: f },
  );

  // Lamps flanking the entrance (post + arm + emissive bulb + cap)
  for (const s of [-1, 1]) {
    const lz = room.z + s * PORTAL.lampOffsetZ;
    o.box('metal', 'lamp-post', 0.14, PORTAL.lampHeight, 0.14, entranceX, PORTAL.lampHeight / 2, lz);
    o.box('metal', 'lamp-arm', 0.1, 0.1, 0.5, entranceX, PORTAL.lampHeight, lz - s * 0.2);
    o.box('bulb', 'lamp-bulb', 0.26, 0.3, 0.26, entranceX, PORTAL.lampHeight - 0.05, lz - s * 0.4);
    o.box('metal', 'lamp-cap', 0.34, 0.07, 0.34, entranceX, PORTAL.lampHeight + 0.14, lz - s * 0.4);
  }
}

function addSouthFacade(o: Out): HeroDesc {
  const zWall = HERO.wallZ;
  const columns: HeroDesc['columns'] = [];
  // Gate columns flanking the 4-unit patio door (they stand on the wall ends, outside the opening)
  for (const s of [-1, 1]) {
    const x = s * HERO.columnX;
    const ch = HERO.columnHeight;
    o.box('stone', 'gate-column', HERO.columnSize, ch, 0.7, x, ch / 2, zWall);
    o.box('blue', 'gate-cap', HERO.columnSize + 0.2, 0.2, 0.9, x, ch + 0.1, zWall);
    o.hull('gate', HERO.columnSize, ch, 0.7, x, ch / 2, zWall);
    o.hull('gate', HERO.columnSize + 0.2, 0.2, 0.9, x, ch + 0.1, zWall);
    columns.push({ x, y: 3.2, z: zWall + 0.7 });
  }
  // Board mounted on a lintel spanning the gap, never below y = 4.2
  const by = HERO.boardY0 + HERO.boardHeight / 2;
  o.box('board', 'board', HERO.boardWidth, HERO.boardHeight, HERO.boardDepth, 0, by, zWall);
  o.box('blue', 'board-lintel', HERO.boardWidth, 0.14, HERO.boardDepth + 0.1, 0, HERO.boardY0 - 0.07, zWall);
  o.hull('board', HERO.boardWidth, HERO.boardHeight + 0.14, HERO.boardDepth + 0.1, 0, by - 0.07, zWall);

  // Planters with a bush, and benches (outside |x| < 3.5, the robot path)
  for (const s of [-1, 1]) {
    const px = s * PLANTER_X;
    o.box('pot', 'planter', 1.4, 0.55, 0.8, px, 0.275, PLANTER_Z);
    o.box('metal', 'planter', 1.2, 0.04, 0.6, px, 0.56, PLANTER_Z);
    o.box('bush', 'planter', 0.55, 0.55, 0.55, px, 0.95, PLANTER_Z);
    o.box('bush', 'planter', 0.38, 0.38, 0.38, px + 0.42, 0.85, PLANTER_Z + 0.05);

    const bx = s * BENCH_X;
    o.box('wood', 'bench', 2.0, 0.1, 0.55, bx, 0.5, BENCH_Z);
    o.box('wood', 'bench', 2.0, 0.5, 0.08, bx, 0.8, BENCH_Z - 0.26);
    o.box('metal', 'bench', 0.1, 0.5, 0.5, bx - 0.85, 0.25, BENCH_Z);
    o.box('metal', 'bench', 0.1, 0.5, 0.5, bx + 0.85, 0.25, BENCH_Z);
  }

  return { x: 0, y: by, z: zWall + HERO.boardDepth / 2 + 0.01, w: HERO.boardWidth - 0.2, h: HERO.boardHeight, columns };
}

function addRoofline(o: Out, H: number): void {
  const top = H + CORNICE.height;
  // Low vents on the north wall
  for (const x of VENT_X) {
    o.box('plinth', 'vent', 0.7, 0.4, 0.45, x, top + 0.2, -20);
    o.box('metal', 'vent', 0.8, 0.08, 0.5, x, top + 0.44, -20);
    o.box('metal', 'vent', 0.5, 0.05, 0.05, x, top + 0.25, -19.76);
  }
  // Flagpole with a flat ITEC-blue flag on the north-east corner, standing on the pilaster cap
  const baseY = top + PILASTER.capHeight;
  o.box('metal', 'flag', 0.1, FLAG.poleHeight, 0.1, FLAG.x, baseY + FLAG.poleHeight / 2, FLAG.z);
  o.box('bulb', 'flag', 0.2, 0.2, 0.2, FLAG.x, baseY + FLAG.poleHeight + 0.1, FLAG.z);
  o.box('blue', 'flag', 1.2, 0.7, 0.04, FLAG.x - 0.65, baseY + FLAG.poleHeight - 0.45, FLAG.z);
  o.box('white', 'flag', 0.5, 0.12, 0.05, FLAG.x - 0.65, baseY + FLAG.poleHeight - 0.45, FLAG.z);
  o.hull('flag', 0.1, FLAG.poleHeight, 0.1, FLAG.x, baseY + FLAG.poleHeight / 2, FLAG.z);
}

// ---------------------------------------------------------------- entry point
/** Computes every descriptor of the building details (pure function of the wall / room layout). */
export function computeBuildingLayout(input: BuildingDetailsInput): BuildingLayout {
  const o = new Out();
  const windows: WindowDesc[] = [];
  const H = input.wallHeight;

  const accents = new Set<number>();
  for (const w of input.walls) if (w.accent !== undefined) accents.add(w.accent);
  for (const r of input.rooms) accents.add(r.color);

  const placed = new Set<string>();
  for (const wall of input.walls) {
    addWallShell(o, wall, H);
    addPilasterAndWindows(o, windows, wall, H, placed);
  }
  for (const room of input.rooms) {
    addPortal(o, room, room.x + room.facing * (input.roomDepth / 2));
  }
  const hero = addSouthFacade(o);
  addRoofline(o, H);

  return { parts: o.parts, hulls: o.hulls, windows, hero, accents: [...accents], wallHeight: H };
}
