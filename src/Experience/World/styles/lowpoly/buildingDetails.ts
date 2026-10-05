import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { flatMat } from '../shared/lowPoly.ts';
import {
  computeBuildingLayout,
  windowParts,
  type BuildingDetailsInput,
  type Hull,
  type Part,
} from '../shared/buildingLayout.ts';
import { HERO_PALETTE_DAY, createHeroTexture } from '../shared/heroTexture.ts';

export type { BuildingWall, BuildingRoom, BuildingDetailsInput, WallFace } from '../shared/buildingLayout.ts';

/**
 * Purely decorative low-poly detailing for the classroom building: toon outline, plinth, cornice,
 * pilasters, windows, classroom portals, lamps, the south-facade hero board, patio props and a
 * roofline flag. Nothing here has a collider and nothing moves, so it never touches physics.
 *
 * The layout (what goes where) lives in shared/buildingLayout.ts; this file only renders it as faceted
 * boxes, merged per material, so the whole set costs about 19 draw calls.
 */

// ---------------------------------------------------------------- tunables
/** Same dark ink as the welcome arch outline (Signature.ts OUTLINE_COLOR). */
const OUTLINE_COLOR = 0x16202c;
/** World-space thickness of the inverted-hull outline, per side. */
const OUTLINE_THICKNESS = 0.06;

const COLOR_ITEC_BLUE = 0x1a5276;
const COLOR_PLINTH = 0x8c8174;
const COLOR_STONE = 0xe3dac3;
const COLOR_GLASS = 0x1f4e79;
const COLOR_FRAME = 0xf4efe2;
const COLOR_BOARD = 0x12384f;
const COLOR_METAL = 0x2b2f36;
const COLOR_BULB = 0xffd27a;
const COLOR_POT = 0xb0623f;
const COLOR_BUSH = 0x4f9d4a;
const COLOR_WOOD = 0x8b5a2b;
const COLOR_WHITE = 0xf5f5f5;

/** Keys that receive shadows (the others are small or emissive). */
const RECEIVE = new Set(['plinth', 'blue', 'stone', 'frame', 'board', 'wood', 'pot']);

// ---------------------------------------------------------------- geometry collector
type Mat = THREE.Material;

class Collector {
  private parts = new Map<string, THREE.BufferGeometry[]>();
  private mats = new Map<string, Mat>();
  private hulls: THREE.BufferGeometry[] = [];
  private readonly _m = new THREE.Matrix4();
  private readonly _q = new THREE.Quaternion();
  private readonly _e = new THREE.Euler();

  material(key: string, make: () => Mat): void {
    if (!this.mats.has(key)) this.mats.set(key, make());
  }

  /** Adds a (possibly rotated about Z) geometry to the merge list of `key`. */
  geo(key: string, g: THREE.BufferGeometry, x: number, y: number, z: number, rotZ = 0): void {
    const ng = g.index ? g.toNonIndexed() : g;
    if (ng !== g) g.dispose();
    this._e.set(0, 0, rotZ);
    this._q.setFromEuler(this._e);
    this._m.compose(new THREE.Vector3(x, y, z), this._q, new THREE.Vector3(1, 1, 1));
    ng.applyMatrix4(this._m);
    let list = this.parts.get(key);
    if (!list) this.parts.set(key, (list = []));
    list.push(ng);
  }

  /** Axis-aligned outline hull from extents; the underside is not inflated when it rests on the ground. */
  hull(h: Hull): void {
    const o = OUTLINE_THICKNESS;
    const y0 = h.y - h.h / 2;
    const y1 = h.y + h.h / 2;
    const by = y0 > 0.01 ? y0 - o : y0;
    const g = new THREE.BoxGeometry(h.w + 2 * o, y1 + o - by, h.d + 2 * o).toNonIndexed();
    g.deleteAttribute('normal');
    g.deleteAttribute('uv');
    g.translate(h.x, (y1 + o + by) / 2, h.z);
    this.hulls.push(g);
  }

  build(group: THREE.Group): void {
    for (const [key, list] of this.parts) {
      const geometry = mergeGeometries(list, false);
      for (const g of list) g.dispose();
      const mesh = new THREE.Mesh(geometry, this.mats.get(key)!);
      mesh.name = `bld-${key}`;
      mesh.receiveShadow = RECEIVE.has(key);
      group.add(mesh);
    }
    if (this.hulls.length > 0) {
      const geometry = mergeGeometries(this.hulls, false);
      for (const g of this.hulls) g.dispose();
      const outline = new THREE.Mesh(
        geometry,
        new THREE.MeshBasicMaterial({ color: OUTLINE_COLOR, side: THREE.BackSide }),
      );
      outline.name = 'bld-outline';
      group.add(outline);
    }
  }
}

function addPart(c: Collector, p: Part): void {
  const key = p.role === 'accent' ? `accent-${p.accent}` : p.role;
  if (p.role === 'bush') {
    c.geo(key, new THREE.IcosahedronGeometry(p.w, 0), p.x, p.y, p.z);
  } else {
    c.geo(key, new THREE.BoxGeometry(p.w, p.h, p.d), p.x, p.y, p.z, p.rotZ ?? 0);
  }
}

// ---------------------------------------------------------------- entry point
/** Builds all building details into one group (add it to the Classrooms group; dispose it with it). */
export function buildBuildingDetails(input: BuildingDetailsInput): THREE.Group {
  const group = new THREE.Group();
  group.name = 'lowpoly-building-details';
  const c = new Collector();
  const layout = computeBuildingLayout(input);

  c.material('plinth', () => flatMat(COLOR_PLINTH));
  c.material('blue', () => flatMat(COLOR_ITEC_BLUE));
  c.material('stone', () => flatMat(COLOR_STONE));
  c.material('glass', () => flatMat(COLOR_GLASS, { emissive: COLOR_GLASS, emissiveIntensity: 0.3, roughness: 0.4 }));
  c.material('frame', () => flatMat(COLOR_FRAME));
  c.material('board', () => flatMat(COLOR_BOARD));
  c.material('metal', () => flatMat(COLOR_METAL));
  c.material('bulb', () => flatMat(COLOR_BULB, { emissive: COLOR_BULB, emissiveIntensity: 1.2 }));
  c.material('pot', () => flatMat(COLOR_POT));
  c.material('bush', () => flatMat(COLOR_BUSH));
  c.material('wood', () => flatMat(COLOR_WOOD));
  c.material('white', () => flatMat(COLOR_WHITE));
  for (const a of layout.accents) c.material(`accent-${a}`, () => flatMat(a));

  for (const p of layout.parts) addPart(c, p);
  for (const win of layout.windows) for (const p of windowParts(win)) addPart(c, p);
  for (const h of layout.hulls) c.hull(h);
  c.build(group);

  // Hero board face (unlit plane in front of the board)
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(layout.hero.w, layout.hero.h),
    new THREE.MeshBasicMaterial({ map: createHeroTexture(HERO_PALETTE_DAY) }),
  );
  face.position.set(layout.hero.x, layout.hero.y, layout.hero.z);
  face.name = 'bld-hero-face';
  group.add(face);
  return group;
}
