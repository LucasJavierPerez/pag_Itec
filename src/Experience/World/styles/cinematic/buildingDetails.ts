import * as THREE from 'three';
import {
  computeBuildingLayout,
  windowParts,
  type BuildingDetailsInput,
  type Part,
  type PartRole,
} from '../shared/buildingLayout.ts';
import { GeometryCollector } from '../shared/geometryCollector.ts';
import { createHeroTexture, type HeroPalette } from '../shared/heroTexture.ts';

export type { BuildingWall, BuildingRoom, BuildingDetailsInput, WallFace } from '../shared/buildingLayout.ts';

/**
 * Night-time decoration for the cinematic style: satin dark metal, glass panes with warm lit
 * interiors, emissive lamp bulbs, thin emissive accent strips on the cornice and portal lintels, and
 * an emissive hero board. MeshStandardMaterial only. Two small point lights sit at the gate columns.
 * Merged per material: about 19 draw calls. Layout comes from shared/buildingLayout.ts.
 */

// ---------------------------------------------------------------- tunables
/** Warm interior glow behind every window pane. */
const WINDOW_GLOW_COLOR = 0xffc27a;
const WINDOW_GLOW_INTENSITY = 0.8;
/** Emissive accent strips (cornice / lintels / awnings / nameplate borders). */
const STRIP_INTENSITY = 1.4;
const STRIP_THICKNESS = 0.05;
/** Strip color on cornices that have no classroom accent (the ITEC cyan of the address sign). */
const COLOR_STRIP_DEFAULT = 0x4cc3ff;
/** Gate-column lights: moderate, short range, no shadows. */
const GATE_LIGHT = { color: 0xffc27a, intensity: 18, distance: 8, decay: 2 };
const HERO_EMISSIVE_INTENSITY = 0.7;
const HERO_PALETTE_NIGHT: HeroPalette = {
  background: '#10213a',
  frameOuter: '#4cc3ff',
  frameInner: '#e8f4ff',
  title: '#e8f4ff',
  subtitle: '#4cc3ff',
};

interface MatSpec {
  color: number;
  roughness: number;
  metalness?: number;
  emissive?: number;
  emissiveIntensity?: number;
}

const MATERIALS: Record<Exclude<PartRole, 'accent'>, MatSpec> = {
  plinth: { color: 0x1c2230, roughness: 0.45, metalness: 0.75 },
  blue: { color: 0x1b3d5c, roughness: 0.35, metalness: 0.7 },
  stone: { color: 0x4d576d, roughness: 0.35, metalness: 0.7 },
  glass: {
    color: 0x101a28,
    roughness: 0.08,
    metalness: 0.2,
    emissive: WINDOW_GLOW_COLOR,
    emissiveIntensity: WINDOW_GLOW_INTENSITY,
  },
  frame: { color: 0x2a3144, roughness: 0.3, metalness: 0.8 },
  board: { color: 0x0b1424, roughness: 0.35, metalness: 0.5 },
  metal: { color: 0x2b3550, roughness: 0.35, metalness: 0.7 },
  bulb: { color: 0xfff0d0, roughness: 0.3, emissive: 0xffd9a0, emissiveIntensity: 2.2 },
  pot: { color: 0x2f3647, roughness: 0.4, metalness: 0.5 },
  bush: { color: 0x1e5a3c, roughness: 0.8, emissive: 0x0a2a18, emissiveIntensity: 0.3 },
  wood: { color: 0x5a4636, roughness: 0.5, metalness: 0.1 },
  white: { color: 0xdce6f4, roughness: 0.5, emissive: 0x8aa0c0, emissiveIntensity: 0.25 },
};

/** Keys that cast shadows (structure and props; glass, bulbs and strips do not). */
const CAST = new Set(['plinth', 'blue', 'stone', 'frame', 'wood', 'pot', 'bush', 'board', 'metal']);

/** Parts that carry a thin emissive strip wrapped around their body. */
const STRIPPED = new Set(['cornice', 'lintel', 'board-lintel']);
/** Accent parts that are themselves thin enough to glow outright. */
const GLOWING = new Set(['awning', 'plate-border']);

function glowKey(color: number): string {
  return `glow-${color}`;
}

function addPart(c: GeometryCollector, p: Part): void {
  let key: string = p.role;
  if (p.role === 'accent') {
    // Back-wall cornices and lintels read as satin trim with an emissive strip; awnings and plate
    // borders are thin enough to glow in the classroom color themselves.
    key = GLOWING.has(p.tag) ? glowKey(p.accent!) : 'blue';
  }
  const geo =
    p.role === 'bush'
      ? new THREE.SphereGeometry(p.w, 14, 10)
      : p.role === 'bulb'
        ? sphereBulb(p)
        : new THREE.BoxGeometry(p.w, p.h, p.d);
  c.add(key, geo, p.x, p.y, p.z, p.rotZ ?? 0);

  if (STRIPPED.has(p.tag)) {
    const color = p.accent ?? COLOR_STRIP_DEFAULT;
    c.box(glowKey(color), p.w + 0.03, STRIP_THICKNESS, p.d + 0.03, p.x, p.y, p.z);
  }
}

function sphereBulb(p: Part): THREE.BufferGeometry {
  const g = new THREE.SphereGeometry(p.w / 2, 12, 8);
  g.scale(1, p.h / p.w, p.d / p.w);
  return g;
}

/** Builds all building details into one group (add it to the Classrooms group; dispose it with it). */
export function buildBuildingDetails(input: BuildingDetailsInput): THREE.Group {
  const group = new THREE.Group();
  group.name = 'cinematic-building-details';
  const c = new GeometryCollector();
  const layout = computeBuildingLayout(input);

  for (const p of layout.parts) addPart(c, p);
  for (const win of layout.windows) for (const p of windowParts(win)) addPart(c, p);

  for (const key of c.keys()) {
    let material: THREE.MeshStandardMaterial;
    if (key.startsWith('glow-')) {
      const color = Number(key.slice(5));
      material = new THREE.MeshStandardMaterial({
        color,
        emissive: color,
        emissiveIntensity: STRIP_INTENSITY,
        roughness: 0.3,
      });
    } else {
      material = new THREE.MeshStandardMaterial(MATERIALS[key as keyof typeof MATERIALS]);
    }
    const mesh = c.buildKey(key, material, `bld-${key}`);
    if (!mesh) continue;
    mesh.castShadow = CAST.has(key);
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  // Hero board face: emissive texture, like the address sign
  const texture = createHeroTexture(HERO_PALETTE_NIGHT);
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(layout.hero.w, layout.hero.h),
    new THREE.MeshStandardMaterial({
      map: texture,
      emissive: 0xffffff,
      emissiveMap: texture,
      emissiveIntensity: HERO_EMISSIVE_INTENSITY,
      roughness: 0.4,
      metalness: 0.1,
    }),
  );
  face.position.set(layout.hero.x, layout.hero.y, layout.hero.z);
  face.name = 'bld-hero-face';
  group.add(face);

  // One small warm light at each gate column (the only extra lights of this style's building)
  for (const col of layout.hero.columns) {
    const light = new THREE.PointLight(GATE_LIGHT.color, GATE_LIGHT.intensity, GATE_LIGHT.distance, GATE_LIGHT.decay);
    light.position.set(col.x, col.y, col.z);
    light.castShadow = false;
    light.name = 'bld-gate-light';
    group.add(light);
  }
  return group;
}
