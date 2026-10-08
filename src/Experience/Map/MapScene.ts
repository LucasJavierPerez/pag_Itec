import * as THREE from 'three';
import { isCoarsePointer } from '../../utils/device.ts';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { DISTRICTS, MAP_POINTS } from '../../UI/MapData.ts';
import type { MapPoint } from '../../UI/MapData.ts';
import { disposeObject } from '../World/styles/shared/dispose.ts';
import { MapBatch } from './MapBatch.ts';
import { buildLandmark } from './landmarks.ts';
import { createDistrictLabel, createPointLabel } from './labels.ts';
import type { LabelSprite } from './labels.ts';
import { createOutlineMaterial } from './skins/lowpoly.ts';
import type { MapQuality, MapSkin } from './skins/index.ts';
import {
  ADA_SECRET,
  DISTRICT_RECTS,
  EDGES,
  MAP_SIZE,
  NODES,
  PLACEMENTS,
  PLAZA_ID,
  PLAZA_RADIUS,
  ROAD_WIDTH,
  SECRET_PATH,
} from './mapLayout.ts';

/** Heights of the flat ground layers (each at least 0.04 apart, no z-fighting). */
const TOP = { pad: 0.08, sidewalk: 0.1, road: 0.14, mark: 0.17, plaza: 0.18, plazaRing: 0.22, plazaInner: 0.26, emblem: 0.3 };
const RING_Y = 0.34;
const RING_INNER = 1.25;
const RING_OUTER = 1.7;

/** Labels are a constant size on screen; fingertip devices get slightly larger ones. */
const LABEL_SCALE = isCoarsePointer() ? 1.15 : 1;
const LABEL_PX = 30 * LABEL_SCALE;
const DISTRICT_LABEL_PX = 36 * LABEL_SCALE;
/** Point labels need at least this many pixels per world unit to be readable. */
export const LABEL_MIN_PPU = 11;
/** District captions fade out once zoomed this far in. */
export const DISTRICT_MAX_PPU = 22;

const HOVER_LIFT = 0.35;
const HOVER_SCALE = 0.05;

const hex = (css: string): number => parseInt(css.slice(1), 16);

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function mixHex(a: number, b: number, t: number): number {
  const c = new THREE.Color(a).lerp(new THREE.Color(b), t);
  return c.getHex();
}

function distToSegment(px: number, pz: number, ax: number, az: number, bx: number, bz: number): number {
  const dx = bx - ax;
  const dz = bz - az;
  const len2 = dx * dx + dz * dz;
  const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - ax) * dx + (pz - az) * dz) / len2));
  return Math.hypot(px - (ax + t * dx), pz - (az + t * dz));
}

export interface Landmark {
  id: string;
  group: THREE.Group;
  mesh: THREE.Mesh;
  height: number;
  /** Where the robot stops (ring center). */
  stopX: number;
  stopZ: number;
  hover: number;
  pop: number;
}

interface LabelEntry {
  sprite: THREE.Sprite;
  aspect: number;
  pointId: string | null;
  px: number;
  anchor: THREE.Vector3;
  priority: number;
}

export interface SceneUpdateInput {
  dt: number;
  time: number;
  /** Pixels per world unit horizontally. */
  ppu: number;
  camera: THREE.OrthographicCamera;
  width: number;
  height: number;
  reduceMotion: boolean;
}

/** All static and animated content of the map for one skin: terrain, landmarks, rings, labels. */
export class MapScene {
  readonly root = new THREE.Group();
  readonly landmarks = new Map<string, Landmark>();
  /** Objects the pointer can hit (landmark meshes, ring markers, labels). */
  readonly pickables: THREE.Object3D[] = [];
  readonly points: MapPoint[] = MAP_POINTS;

  private _skin: MapSkin;
  private _rings: THREE.InstancedMesh;
  private _ringIds: string[] = [];
  private _ringColors: THREE.Color[] = [];
  private _labels: LabelEntry[] = [];
  private _hover: string | null = null;
  private _selected: string | null = null;
  private _matrix = new THREE.Matrix4();
  private _tmpColor = new THREE.Color();
  private _tmpV = new THREE.Vector3();
  private _opaqueMaterial: THREE.Material;
  private _outlineMaterial: THREE.Material | null = null;

  constructor(skin: MapSkin, quality: MapQuality) {
    this._skin = skin;
    const high = quality === 'high';
    const opts = { voxel: skin.voxel, flat: skin.flat };
    this._opaqueMaterial = skin.createLitMaterial();
    if (skin.outline) this._outlineMaterial = createOutlineMaterial();

    this._buildTerrain(opts, high);
    this._buildLandmarks(opts, high);
    this._rings = this._buildRings();
    this.root.add(this._rings);
    this.pickables.push(this._rings);
    this._buildLabels();
  }

  // ---------------------------------------------------------------- terrain

  private _buildTerrain(opts: { voxel: boolean; flat: boolean }, high: boolean): void {
    const pal = this._skin.palette;
    const b = new MapBatch(opts);
    const slab = (cx: number, top: number, cz: number, w: number, thick: number, d: number, color: number, glow = 0) =>
      b.box(cx, top - thick / 2, cz, w, thick, d, color, { solid: true, glow });
    const seg = this._skin.flat ? 14 : 40;

    // Ground
    slab(MAP_SIZE.cx, 0, MAP_SIZE.cz, MAP_SIZE.w, 1, MAP_SIZE.d, pal.ground);
    if (this._skin.voxel) {
      // Checkerboard grass tiles
      const tile = 4;
      for (let x = -MAP_SIZE.w / 2; x < MAP_SIZE.w / 2; x += tile) {
        for (let z = MAP_SIZE.cz - MAP_SIZE.d / 2; z < MAP_SIZE.cz + MAP_SIZE.d / 2; z += tile) {
          if (((x / tile + z / tile) & 1) === 0) continue;
          b.box(x + tile / 2, 0.01, z + tile / 2, tile, 0.02, tile, pal.ground2, { topOnly: true });
        }
      }
    } else if (this._skin.id === 'cinematic') {
      // Faint glowing grid
      for (let x = -48; x <= 48; x += 6) slab(x, 0.03, MAP_SIZE.cz, 0.08, 0.03, MAP_SIZE.d, 0x1d6f8a, 0.5);
      for (let z = -30; z <= 32; z += 6) slab(0, 0.03, z, MAP_SIZE.w, 0.03, 0.08, 0x1d6f8a, 0.5);
    }

    // District pads
    for (const rect of DISTRICT_RECTS) {
      const accent = hex(DISTRICTS.find((d) => d.id === rect.id)!.accent);
      slab(rect.cx, TOP.pad - 0.03, rect.cz, rect.w + 1.2, 0.05, rect.d + 1.2, pal.sidewalk);
      slab(rect.cx, TOP.pad, rect.cz, rect.w, 0.05, rect.d, mixHex(pal.ground2, accent, 0.28));
      if (this._skin.id === 'cinematic') {
        // Neon outline on the pad edge
        const hw = rect.w / 2;
        const hd = rect.d / 2;
        slab(rect.cx, TOP.pad + 0.02, rect.cz - hd, rect.w, 0.04, 0.12, accent, 0.9);
        slab(rect.cx, TOP.pad + 0.02, rect.cz + hd, rect.w, 0.04, 0.12, accent, 0.9);
        slab(rect.cx - hw, TOP.pad + 0.02, rect.cz, 0.12, 0.04, rect.d, accent, 0.9);
        slab(rect.cx + hw, TOP.pad + 0.02, rect.cz, 0.12, 0.04, rect.d, accent, 0.9);
      }
    }

    // Roads: sidewalk below, asphalt on top, dashed center line
    const nodeById = new Map(NODES.map((n) => [n.id, n]));
    for (const e of EDGES) {
      const a = nodeById.get(e.a)!;
      const c = nodeById.get(e.b)!;
      const len = Math.hypot(c.x - a.x, c.z - a.z);
      const yaw = Math.atan2(c.x - a.x, c.z - a.z);
      b.push((a.x + c.x) / 2, 0, (a.z + c.z) / 2, yaw);
      slab(0, TOP.sidewalk, 0, ROAD_WIDTH + 1.1, 0.05, len, pal.sidewalk);
      slab(0, TOP.road, 0, ROAD_WIDTH, 0.05, len, pal.road);
      const dashes = Math.floor((len - 3) / 3);
      for (let i = 0; i < dashes; i++) {
        const z = -((dashes - 1) * 3) / 2 + i * 3;
        slab(0, TOP.mark, z, 0.16, 0.03, 1.3, pal.roadLine, this._skin.id === 'cinematic' ? 0.9 : 0);
      }
      b.pop();
    }
    for (const n of NODES) {
      if (n.id === PLAZA_ID) continue;
      b.cyl(n.x, TOP.sidewalk - 0.025, n.z, ROAD_WIDTH / 2 + 0.55, ROAD_WIDTH / 2 + 0.55, 0.05, pal.sidewalk, seg);
      b.cyl(n.x, TOP.road - 0.025, n.z, ROAD_WIDTH / 2, ROAD_WIDTH / 2, 0.05, pal.road, seg);
    }

    // Central plaza: concentric discs with the accent star
    const accentColor = pal.plazaRing;
    b.cyl(0, TOP.plaza - 0.04, 0, PLAZA_RADIUS, PLAZA_RADIUS, 0.08, pal.sidewalk, seg);
    b.cyl(0, TOP.plazaRing - 0.03, 0, PLAZA_RADIUS - 0.8, PLAZA_RADIUS - 0.8, 0.06, accentColor, seg, this._skin.id === 'cinematic' ? 0.9 : 0);
    b.cyl(0, TOP.plazaInner - 0.03, 0, PLAZA_RADIUS - 1.5, PLAZA_RADIUS - 1.5, 0.06, pal.plaza, seg);
    b.cyl(0, TOP.emblem - 0.03, 0, 1.6, 1.6, 0.06, accentColor, seg, this._skin.id === 'cinematic' ? 0.7 : 0);
    for (let i = 0; i < 4; i++) {
      const a = (i / 4) * Math.PI * 2 + Math.PI / 4;
      b.push(Math.cos(a) * 3.3, TOP.plazaInner, Math.sin(a) * 3.3, -a);
      b.box(0, 0.03, 0, 2.6, 0.06, 0.4, accentColor, { solid: true, glow: this._skin.id === 'cinematic' ? 0.7 : 0 });
      b.pop();
    }

    this._addProps(b, high);

    const mesh = new THREE.Mesh(b.toGeometry(), this._opaqueMaterial);
    mesh.name = 'terrain';
    mesh.receiveShadow = true;
    mesh.castShadow = this._skin.shadows && high;
    this.root.add(mesh);
  }

  private _addProps(b: MapBatch, high: boolean): void {
    const pal = this._skin.palette;
    const density = this._skin.propDensity * (high ? 1 : 0.35);
    const rng = mulberry32(20260610);
    const nodeById = new Map(NODES.map((n) => [n.id, n]));
    const segs = EDGES.map((e) => {
      const a = nodeById.get(e.a)!;
      const c = nodeById.get(e.b)!;
      return [a.x, a.z, c.x, c.z] as const;
    });
    const roadDist = (x: number, z: number): number =>
      Math.min(...segs.map((s) => distToSegment(x, z, s[0], s[1], s[2], s[3])));
    const blocked = (x: number, z: number): boolean => {
      if (roadDist(x, z) < ROAD_WIDTH / 2 + 2.6) return true;
      // Keep the hidden path to the easter egg free of trees (it is never drawn, only walkable)
      if (Math.hypot(x - ADA_SECRET.x, z - ADA_SECRET.z) < 4) return true;
      for (const h of SECRET_PATH) if (distToSegment(x, z, h.ax, h.az, h.bx, h.bz) < 2.4) return true;
      if (Math.hypot(x, z) < PLAZA_RADIUS + 2) return true;
      for (const p of PLACEMENTS) {
        if (Math.hypot(x - p.x, z - p.z) < 6.5) return true;
        const stop = nodeById.get(p.stop)!;
        if (Math.hypot(x - stop.x, z - stop.z) < 3.4) return true;
      }
      return false;
    };

    // Trees
    const target = Math.round(95 * density);
    let placed = 0;
    for (let attempt = 0; attempt < 900 && placed < target; attempt++) {
      const x = (rng() - 0.5) * (MAP_SIZE.w - 6);
      const z = MAP_SIZE.cz + (rng() - 0.5) * (MAP_SIZE.d - 6);
      if (blocked(x, z)) continue;
      const s = 0.8 + rng() * 0.55;
      const leaf = rng() < 0.5 ? pal.leaf : pal.leaf2;
      b.cyl(x, 0.7 * s, z, 0.22 * s, 0.28 * s, 1.4 * s, pal.trunk, 6);
      if (this._skin.voxel) {
        b.box(x, 2.2 * s, z, 2 * s, 1.6 * s, 2 * s, leaf);
        b.box(x, 3.4 * s, z, 1.2 * s, 1.2 * s, 1.2 * s, leaf);
      } else if (this._skin.flat) {
        b.cyl(x, 2.7 * s, z, 0, 1.5 * s, 2.6 * s, leaf, 6);
      } else {
        b.cyl(x, 2.3 * s, z, 0.5 * s, 1.5 * s, 1.8 * s, leaf, 10);
        b.cyl(x, 3.5 * s, z, 0, 1.1 * s, 1.6 * s, pal.leaf2, 10);
      }
      placed++;
    }

    // Street lamps along the roads
    const lampGlow = this._skin.id === 'cinematic' ? 1 : 0;
    segs.forEach((s, i) => {
      if (!high && i % 2) return;
      const len = Math.hypot(s[2] - s[0], s[3] - s[1]);
      if (len < 7) return;
      const mx = (s[0] + s[2]) / 2;
      const mz = (s[1] + s[3]) / 2;
      const nx = -(s[3] - s[1]) / len;
      const nz = (s[2] - s[0]) / len;
      const side = i % 2 ? 1 : -1;
      const off = ROAD_WIDTH / 2 + 0.9;
      const lx = mx + nx * off * side;
      const lz = mz + nz * off * side;
      b.cyl(lx, 1.6, lz, 0.07, 0.09, 3.2, pal.trim, 6);
      b.box(lx, 3.3, lz, 0.5, 0.35, 0.5, pal.lamp, { glow: lampGlow, solid: true });
    });
  }

  // -------------------------------------------------------------- landmarks

  private _buildLandmarks(opts: { voxel: boolean; flat: boolean }, high: boolean): void {
    const pal = this._skin.palette;
    const nodeById = new Map(NODES.map((n) => [n.id, n]));
    for (const place of PLACEMENTS) {
      const point = MAP_POINTS.find((p) => p.id === place.pointId);
      if (!point) continue;
      const b = new MapBatch(opts);
      const height = buildLandmark(b, point, pal);
      const geometry = b.toGeometry();
      const mesh = new THREE.Mesh(geometry, this._opaqueMaterial);
      mesh.castShadow = this._skin.shadows && high;
      mesh.receiveShadow = true;
      mesh.userData.pointId = point.id;

      const group = new THREE.Group();
      const x = this._skin.voxel ? Math.round(place.x) : place.x;
      const z = this._skin.voxel ? Math.round(place.z) : place.z;
      group.position.set(x, 0, z);
      group.rotation.y = place.facing;
      group.add(mesh);
      if (this._outlineMaterial) {
        const hull = new THREE.Mesh(geometry, this._outlineMaterial);
        hull.scale.set(1.07, 1.03, 1.07);
        hull.userData.pointId = point.id;
        group.add(hull);
      }
      this.root.add(group);
      this.pickables.push(mesh);

      const stop = nodeById.get(place.stop)!;
      this.landmarks.set(point.id, {
        id: point.id,
        group,
        mesh,
        height,
        stopX: stop.x,
        stopZ: stop.z,
        hover: 0,
        pop: 0,
      });
    }
  }

  // ------------------------------------------------------------------ rings

  private _buildRings(): THREE.InstancedMesh {
    const ring = new THREE.RingGeometry(RING_INNER, RING_OUTER, 40);
    const dot = new THREE.CircleGeometry(0.4, 20);
    const merged = mergeGeometries([ring, dot])!;
    ring.dispose();
    dot.dispose();
    merged.rotateX(-Math.PI / 2);
    merged.deleteAttribute('uv');

    const material = this._skin.createRingMaterial();
    const mesh = new THREE.InstancedMesh(merged, material, PLACEMENTS.length);
    mesh.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    mesh.frustumCulled = false;
    mesh.renderOrder = 5;
    mesh.name = 'rings';
    const nodeById = new Map(NODES.map((n) => [n.id, n]));
    PLACEMENTS.forEach((p, i) => {
      const point = MAP_POINTS.find((m) => m.id === p.pointId)!;
      const stop = nodeById.get(p.stop)!;
      this._ringIds.push(point.id);
      this._ringColors.push(new THREE.Color(point.accent));
      this._matrix.makeTranslation(stop.x, RING_Y, stop.z);
      mesh.setMatrixAt(i, this._matrix);
      mesh.setColorAt(i, this._ringColors[i]);
    });
    return mesh;
  }

  // ----------------------------------------------------------------- labels

  private _buildLabels(): void {
    const add = (l: LabelSprite, anchor: THREE.Vector3, px: number, pointId: string | null, priority: number): void => {
      l.sprite.position.copy(anchor);
      this.root.add(l.sprite);
      if (pointId) {
        l.sprite.userData.pointId = pointId;
        this.pickables.push(l.sprite);
      }
      this._labels.push({ sprite: l.sprite, aspect: l.aspect, pointId, px, anchor, priority });
    };

    for (const p of MAP_POINTS) {
      const lm = this.landmarks.get(p.id);
      if (!lm) continue;
      const anchor = new THREE.Vector3(lm.group.position.x, lm.height + 1.1, lm.group.position.z);
      add(createPointLabel(p.name, p.icon, p.accent), anchor, LABEL_PX, p.id, 1);
    }
    for (const rect of DISTRICT_RECTS) {
      const d = DISTRICTS.find((x) => x.id === rect.id)!;
      const anchor = new THREE.Vector3(rect.cx, 0.6, rect.cz - rect.d / 2 + 1.4);
      add(createDistrictLabel(d.name, d.accent), anchor, DISTRICT_LABEL_PX, null, 0);
    }
  }

  // ----------------------------------------------------------- interaction

  ringIndex(pointId: string): number {
    return this._ringIds.indexOf(pointId);
  }

  pointIdForRingInstance(instanceId: number): string | undefined {
    return this._ringIds[instanceId];
  }

  setHover(id: string | null): void {
    this._hover = id;
  }

  setSelected(id: string | null): void {
    this._selected = id;
  }

  /** Arrival feedback: landmark pops and its ring flashes. */
  pop(id: string): void {
    const lm = this.landmarks.get(id);
    if (lm) lm.pop = 1;
  }

  /** Ground position of a point's stop (robot destination). */
  stopPosition(id: string): { x: number; z: number } | null {
    const lm = this.landmarks.get(id);
    return lm ? { x: lm.stopX, z: lm.stopZ } : null;
  }

  // ----------------------------------------------------------------- update

  update(input: SceneUpdateInput): void {
    const { dt, time, reduceMotion } = input;
    const k = 1 - Math.exp(-12 * dt);

    for (const lm of this.landmarks.values()) {
      const target = lm.id === this._hover ? 1 : 0;
      lm.hover += (target - lm.hover) * k;
      lm.pop = Math.max(0, lm.pop - dt * 1.6);
      const bump = Math.sin(lm.pop * Math.PI) * 0.35;
      const sel = lm.id === this._selected ? 1 : 0;
      lm.group.position.y = lm.hover * HOVER_LIFT + sel * 0.1 + (reduceMotion ? 0 : bump);
      const s = 1 + lm.hover * HOVER_SCALE + (reduceMotion ? 0 : bump * 0.12);
      lm.group.scale.setScalar(s);
    }

    const nodeById = new Map(NODES.map((n) => [n.id, n]));
    PLACEMENTS.forEach((p, i) => {
      const lm = this.landmarks.get(p.pointId)!;
      const stop = nodeById.get(p.stop)!;
      const pulse = reduceMotion ? 0.5 : 0.5 + 0.5 * Math.sin(time * 2.2 + i * 0.9);
      const selected = p.pointId === this._selected ? 1 : 0;
      const scale = 1 + pulse * 0.09 + lm.hover * 0.25 + selected * 0.15 + lm.pop * 0.5;
      this._matrix.makeScale(scale, 1, scale);
      this._matrix.setPosition(stop.x, RING_Y, stop.z);
      this._rings.setMatrixAt(i, this._matrix);
      const brightness = 0.7 + pulse * 0.3 + lm.hover * 0.3 + selected * 0.3 + lm.pop * 0.5;
      this._tmpColor.copy(this._ringColors[i]).multiplyScalar(brightness);
      this._rings.setColorAt(i, this._tmpColor);
    });
    this._rings.instanceMatrix.needsUpdate = true;
    if (this._rings.instanceColor) this._rings.instanceColor.needsUpdate = true;

    this._updateLabels(input);
  }

  private _updateLabels(input: SceneUpdateInput): void {
    const { ppu, camera, width, height } = input;
    const showPoints = ppu >= LABEL_MIN_PPU;
    const showDistricts = ppu <= DISTRICT_MAX_PPU;
    const taken: { x0: number; x1: number; y0: number; y1: number }[] = [];

    // Priority order: hovered / selected labels first, then points, then districts
    const order = [...this._labels].sort((a, b) => this._rank(b) - this._rank(a));
    for (const l of order) {
      const isPoint = l.pointId !== null;
      const forced = isPoint && (l.pointId === this._hover || l.pointId === this._selected);
      let visible = isPoint ? showPoints || forced : showDistricts;
      const worldH = l.px / ppu;
      l.sprite.scale.set(worldH * l.aspect, worldH, 1);

      if (visible) {
        this._tmpV.copy(l.anchor).project(camera);
        const sx = (this._tmpV.x * 0.5 + 0.5) * width;
        const sy = (-this._tmpV.y * 0.5 + 0.5) * height;
        const w = l.px * l.aspect;
        const rect = { x0: sx - w / 2, x1: sx + w / 2, y0: sy - l.px, y1: sy };
        const overlaps = taken.some((t) => rect.x0 < t.x1 && rect.x1 > t.x0 && rect.y0 < t.y1 && rect.y1 > t.y0);
        if (overlaps && !forced) visible = false;
        else taken.push(rect);
      }
      l.sprite.visible = visible;
    }
  }

  private _rank(l: LabelEntry): number {
    if (l.pointId && l.pointId === this._hover) return 100;
    if (l.pointId && l.pointId === this._selected) return 90;
    return l.priority;
  }

  dispose(): void {
    this._rings.dispose();
    disposeObject(this.root);
    this._opaqueMaterial.dispose();
    this._outlineMaterial?.dispose();
  }
}
