import * as THREE from 'three';
import {
  PORTAL,
  computeBuildingLayout,
  type BuildingDetailsInput,
  type Part,
  type PartRole,
  type WindowDesc,
} from '../shared/buildingLayout.ts';
import { HERO_PALETTE_DAY, createHeroTexture } from '../shared/heroTexture.ts';
import { applyBuildIn } from './buildIn.ts';
import { VoxelBuilder, createGlowMaterial, mix, shade } from './voxel.ts';

export type { BuildingWall, BuildingRoom, BuildingDetailsInput, WallFace } from '../shared/buildingLayout.ts';

/**
 * Cube-built decoration for the voxel style. The shared layout (shared/buildingLayout.ts) is snapped to
 * the 0.25 grid and rendered with VoxelBuilder cubes in the world's own animated materials, so every
 * detail drops in with the walls during the build-in. Outline = a darker rim of cubes along cornice,
 * cap, gate and board tops (no hull, nothing round). Draw calls: 3 (solid, glow, hero face).
 */

// ---------------------------------------------------------------- tunables
/** Grid step of the detail cubes. */
const G = 0.25;
/** Anything thinner than this collapses to one grid cell. */
const THIN = 0.38;
/** Dark navy rim that plays the role of the outline. */
const RIM_COLOR = 0x1f2f40;
const RIM_HEIGHT = 0.125;
/** Pixel width of the hero board texture (nearest filtered, so it reads as pixel art). */
const HERO_TEXTURE_WIDTH = 304;

const COLORS: Record<Exclude<PartRole, 'accent' | 'bulb' | 'bush'>, number> = {
  plinth: 0x9a8f80,
  blue: 0x1f5f8b,
  stone: 0xe8dfc8,
  glass: 0x1b3a63,
  frame: 0xf4efe2,
  board: 0x12384f,
  metal: 0x3a3f48,
  pot: 0xb0623f,
  wood: 0x8b5a2b,
  white: 0xf5f5f5,
};
const BULB_COLOR = 0xffd27a;
const LEAF = 0x4f9d4a;
const SOIL = 0x3a2a1a;
const GLASS_LIGHT = 0x2c5a8c;

// ---------------------------------------------------------------- helpers
interface Builders {
  solid: VoxelBuilder;
  glow: VoxelBuilder;
}

interface Box {
  cx: number;
  cy: number;
  cz: number;
  sx: number;
  sy: number;
  sz: number;
}

/** Snaps one axis: thick extents round to the grid, thin ones become a single cell. */
function snapAxis(c: number, s: number): [number, number] {
  if (s < THIN) {
    const cc = Math.round(c / (G / 2)) * (G / 2);
    return [cc, G];
  }
  const lo = Math.round((c - s / 2) / G) * G;
  let hi = Math.round((c + s / 2) / G) * G;
  if (hi - lo < G) hi = lo + G;
  return [(lo + hi) / 2, hi - lo];
}

function snapPart(p: Part): Box {
  const [cx, sx] = snapAxis(p.x, p.w);
  const [cy, sy] = snapAxis(p.y, p.h);
  const [cz, sz] = snapAxis(p.z, p.d);
  return { cx, cy, cz, sx, sy, sz };
}

function cellFor(size: number): number {
  return size >= 1 ? 0.5 : G;
}

/** Fills a box with tinted cubes (a gentle checker on top of the builder's own jitter). */
function cubes(vb: VoxelBuilder, b: Box, color: number): void {
  const alt = shade(color, 0.94);
  vb.fill(b.cx, b.cy, b.cz, b.sx, b.sy, b.sz, [cellFor(b.sx), cellFor(b.sy), cellFor(b.sz)], (ix, iy, iz) =>
    (ix + iy + iz) & 1 ? alt : color,
  );
}

function rim(b: Builders, box: Box): void {
  const top = box.cy + box.sy / 2;
  vbRim(b.solid, box.cx, top + RIM_HEIGHT / 2, box.cz, box.sx, box.sz);
}

function vbRim(vb: VoxelBuilder, cx: number, cy: number, cz: number, sx: number, sz: number): void {
  vb.fill(cx, cy, cz, sx, RIM_HEIGHT, sz, [cellFor(sx), RIM_HEIGHT, cellFor(sz)], RIM_COLOR);
}

// ---------------------------------------------------------------- features
/** Window: recessed dark-blue glass cubes inside a light frame of proud cubes. */
function addWindow(b: Builders, win: WindowDesc): void {
  const sign = win.face[0] === '+' ? 1 : -1;
  const faceX = win.face[1] === 'x';
  const half = win.thick / 2;
  // t: along the wall (relative to the window centre), y: height, o: outward from the wall centre line
  const put = (vb: VoxelBuilder, t0: number, t1: number, y0: number, y1: number, o0: number, o1: number, color: number): void => {
    const tc = win.t + (t0 + t1) / 2;
    const oc = (sign * (o0 + o1)) / 2;
    const sT = t1 - t0;
    const sO = o1 - o0;
    const sY = y1 - y0;
    const cy = (y0 + y1) / 2;
    const alt = shade(color, 0.92);
    const colorFn = (ix: number, iy: number, iz: number): number => ((ix + iy + iz) & 1 ? alt : color);
    if (faceX) vb.fill(win.wallX + oc, cy, win.wallZ + tc, sO, sY, sT, G, colorFn);
    else vb.fill(win.wallX + tc, cy, win.wallZ + oc, sT, sY, sO, G, colorFn);
  };
  // Glass: its outer face is 0.05 proud of the wall, 0.2 behind the frame, so it reads as recessed
  put(b.solid, -0.5, 0.5, 1.75, 3.0, half - 0.2, half + 0.05, GLASS_LIGHT);
  put(b.solid, -0.5, 0.5, 1.75, 2.5, half - 0.2, half + 0.05, COLORS.glass); // darker lower pane
  const f = COLORS.frame;
  put(b.solid, -0.625, -0.375, 1.75, 3.0, half - 0.05, half + 0.25, f); // left jamb
  put(b.solid, 0.375, 0.625, 1.75, 3.0, half - 0.05, half + 0.25, f); // right jamb
  put(b.solid, -0.875, 0.875, 3.0, 3.25, half - 0.05, half + 0.25, f); // header
  put(b.solid, -0.875, 0.875, 1.5, 1.75, half - 0.05, half + 0.3, f); // sill
}

/** Awning: stepped cube slabs descending away from the wall, in the classroom accent color. */
function addAwning(b: Builders, p: Part): void {
  const f = p.facing ?? 1;
  const accent = p.accent ?? 0x2980b9;
  const wallX = p.x - f * (PORTAL.awningDepth / 2 - 0.05);
  const topY = snapAxis(p.y, 0.25)[0];
  const [cz, sz] = snapAxis(p.z, p.d);
  const steps = 4;
  for (let i = 0; i < steps; i++) {
    const cx = wallX + f * (G / 2 + i * G);
    const cy = topY - i * 0.125;
    cubes(b.solid, { cx, cy, cz, sx: G, sy: G, sz }, i & 1 ? accent : mix(accent, 0xffffff, 0.12));
  }
}

/** Lamp: a cube post, a cube arm over a glowing cube bulb. */
function addLamp(b: Builders, post: Part, bulb: Part): void {
  const px = Math.round(post.x / (G / 2)) * (G / 2);
  const pz = Math.round(post.z / (G / 2)) * (G / 2);
  const dz = Math.sign(bulb.z - post.z) || 1;
  const bz = pz + dz * 0.5;
  cubes(b.solid, { cx: px, cy: 1.0, cz: pz, sx: G, sy: 2.0, sz: G }, COLORS.metal);
  cubes(b.solid, { cx: px, cy: 2.125, cz: pz + dz * 0.25, sx: G, sy: G, sz: 0.75 }, COLORS.metal);
  b.glow.box(px, 1.875, bz, G, G, G, BULB_COLOR);
}

/** Bush: a pyramid of leaf cubes. `r` is the sphere radius of the layout. */
function addBush(b: Builders, p: Part): void {
  const r = p.w;
  const layers = Math.max(2, Math.round(r / 0.2));
  const baseW = Math.max(G, Math.round((2 * r) / G) * G);
  const y0 = Math.round((p.y - r * 0.6) / G) * G;
  for (let k = 0; k < layers; k++) {
    const w = Math.max(G, baseW - k * G);
    cubes(b.solid, { cx: p.x, cy: y0 + G / 2 + k * G, cz: p.z, sx: w, sy: G, sz: w }, k & 1 ? shade(LEAF, 1.12) : LEAF);
  }
}

function addGeneric(b: Builders, p: Part): void {
  const box = snapPart(p);
  const solid = b.solid;
  switch (p.tag) {
    case 'plinth':
    case 'cornice': {
      // Stretch the long axis a hair so end faces never share a plane with the wall's own end face
      const along = box.sx >= box.sz ? 'x' : 'z';
      if (along === 'x') box.sx += 0.04;
      else box.sz += 0.04;
      const color = p.role === 'accent' ? p.accent! : COLORS[p.role as keyof typeof COLORS];
      cubes(solid, box, color);
      if (p.tag === 'cornice') rim(b, box);
      return;
    }
    case 'cap':
    case 'gate-cap':
      cubes(solid, box, COLORS.blue);
      rim(b, box);
      return;
    case 'board':
      cubes(solid, box, COLORS.board);
      rim(b, box);
      return;
    case 'lintel':
      cubes(solid, box, p.accent!);
      return;
    case 'plate': {
      // Nameplate: 0.5 deep so it stands proud of its accent border
      const [cy, sy] = snapAxis(p.y, p.h);
      cubes(solid, { cx: box.cx, cy, cz: box.cz, sx: 0.5, sy, sz: box.sz }, COLORS.board);
      return;
    }
    case 'plate-border': {
      const [cy, sy] = snapAxis(p.y, p.h + 0.4);
      const [cz, sz] = snapAxis(p.z, p.d + 0.4);
      cubes(solid, { cx: box.cx, cy, cz, sx: G, sy, sz }, p.accent!);
      return;
    }
    case 'planter':
      if (p.role === 'bush') return addBush(b, p);
      cubes(solid, box, p.role === 'metal' ? SOIL : COLORS.pot);
      return;
    case 'flag':
      if (p.role === 'bulb') {
        b.glow.box(box.cx, box.cy, box.cz, G, G, G, BULB_COLOR);
      } else if (p.role === 'white') {
        cubes(solid, { ...box, sz: box.sz + 0.06 }, COLORS.white);
      } else {
        cubes(solid, box, COLORS[p.role as keyof typeof COLORS]);
      }
      return;
    default:
      cubes(solid, box, COLORS[p.role as keyof typeof COLORS]);
  }
}

// ---------------------------------------------------------------- entry point
/** Builds all building details into one group (add it to the Classrooms group; dispose it with it). */
export function buildBuildingDetails(input: BuildingDetailsInput): THREE.Group {
  const group = new THREE.Group();
  group.name = 'voxel-building-details';
  const b: Builders = {
    solid: new VoxelBuilder(31, 0.05),
    glow: new VoxelBuilder(32, 0.03),
  };
  const layout = computeBuildingLayout(input);

  let lastPost: Part | null = null;
  for (const p of layout.parts) {
    if (p.role === 'accent' && p.tag === 'cornice') {
      addGeneric(b, p);
    } else if (p.tag === 'awning') {
      addAwning(b, p);
    } else if (p.tag === 'lamp-post') {
      lastPost = p;
    } else if (p.tag === 'lamp-bulb' && lastPost) {
      addLamp(b, lastPost, p);
    } else if (p.tag === 'lamp-arm' || p.tag === 'lamp-cap') {
      // built together with the bulb (cube arm), nothing separate
    } else {
      addGeneric(b, p);
    }
  }
  for (const win of layout.windows) addWindow(b, win);

  group.add(b.solid.build());
  group.add(b.glow.build({ material: createGlowMaterial(), castShadow: false, receiveShadow: false }));

  // Hero board face: unlit, pixelated, and patched with the shared build-in (one voxel at the board centre)
  const board = layout.parts.find((p) => p.tag === 'board' && p.w > 3);
  if (board) {
    const bb = snapPart(board);
    const faceW = bb.sx - 0.2;
    const faceH = faceW / 4;
    const geo = new THREE.PlaneGeometry(faceW, faceH);
    const center = [bb.cx, bb.cy, bb.cz + bb.sz / 2 + 0.01];
    const aVoxel = new Float32Array(4 * 3);
    for (let i = 0; i < 4; i++) aVoxel.set(center, i * 3);
    geo.setAttribute('aVoxel', new THREE.BufferAttribute(aVoxel, 3));
    const face = new THREE.Mesh(
      geo,
      applyBuildIn(
        new THREE.MeshBasicMaterial({ map: createHeroTexture(HERO_PALETTE_DAY, { width: HERO_TEXTURE_WIDTH, pixelated: true }) }),
      ),
    );
    face.position.set(center[0], center[1], center[2]);
    face.name = 'bld-hero-face';
    group.add(face);
  }
  return group;
}
