import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/examples/jsm/geometries/RoundedBoxGeometry.js';
import {
  computeBuildingLayout,
  windowParts,
  type BuildingDetailsInput,
  type Part,
  type PartRole,
} from '../shared/buildingLayout.ts';
import { GeometryCollector } from '../shared/geometryCollector.ts';
import { HERO_PALETTE_DAY, createHeroTexture } from '../shared/heroTexture.ts';

export type { BuildingWall, BuildingRoom, BuildingDetailsInput, WallFace } from '../shared/buildingLayout.ts';

/**
 * Smooth, warm decoration for the "original" style: painted plaster, stone and wood tones, glass
 * windows with a faint sheen, rounded planters / boards / benches, spherical bulbs and bushes, and a
 * thin, soft navy outline on the main silhouettes. Everything casts and receives soft shadows.
 * Merged per material: about 22 draw calls in total. Layout comes from shared/buildingLayout.ts.
 */

// ---------------------------------------------------------------- tunables
/** Soft ink for the silhouette hull; lower contrast than the low-poly style's ink. */
const OUTLINE_COLOR = 0x1b2a3a;
/** World-space thickness of the inverted-hull outline, per side. */
const OUTLINE_THICKNESS = 0.03;
/** Outline only these silhouettes (walls, cornice, pilasters and the hero board). */
const OUTLINE_TAGS = new Set(['wall', 'cornice', 'pilaster', 'cap', 'board']);

interface MatSpec {
  color: number;
  roughness: number;
  metalness?: number;
  emissive?: number;
  emissiveIntensity?: number;
}

const MATERIALS: Record<Exclude<PartRole, 'accent'>, MatSpec> = {
  plinth: { color: 0x9a8f80, roughness: 0.92 },
  blue: { color: 0x1f5f8b, roughness: 0.55, metalness: 0.1 },
  stone: { color: 0xe4dccb, roughness: 0.85 },
  glass: { color: 0x3b6b94, roughness: 0.1, metalness: 0.35, emissive: 0x0d2236, emissiveIntensity: 0.3 },
  frame: { color: 0xf4efe2, roughness: 0.7 },
  board: { color: 0x12384f, roughness: 0.6 },
  metal: { color: 0x3a3f48, roughness: 0.4, metalness: 0.6 },
  bulb: { color: 0xffe2a0, roughness: 0.3, emissive: 0xffd27a, emissiveIntensity: 1.0 },
  pot: { color: 0xb0623f, roughness: 0.8 },
  bush: { color: 0x5aa655, roughness: 0.9 },
  wood: { color: 0x8b5a2b, roughness: 0.65 },
  white: { color: 0xf7f7f7, roughness: 0.7 },
};

/** Roles drawn with rounded boxes (small counts only; they cost more triangles). */
const ROUNDED = new Set<PartRole>(['pot', 'wood', 'board']);

function geometryFor(p: Part): THREE.BufferGeometry {
  if (p.role === 'bush') return new THREE.SphereGeometry(p.w, 16, 12);
  if (p.role === 'bulb') {
    const g = new THREE.SphereGeometry(p.w / 2, 14, 10);
    g.scale(1, p.h / p.w, p.d / p.w);
    return g;
  }
  if (p.role === 'metal' && (p.tag === 'lamp-post' || (p.tag === 'flag' && p.h > 1))) {
    return new THREE.CylinderGeometry(p.w / 2, p.w / 2, p.h, 12);
  }
  if (ROUNDED.has(p.role)) {
    return new RoundedBoxGeometry(p.w, p.h, p.d, 2, Math.min(p.w, p.h, p.d) * 0.3);
  }
  return new THREE.BoxGeometry(p.w, p.h, p.d);
}

function addPart(c: GeometryCollector, p: Part): void {
  const key = p.role === 'accent' ? `accent-${p.accent}` : p.role;
  c.add(key, geometryFor(p), p.x, p.y, p.z, p.rotZ ?? 0);
}

/** Builds all building details into one group (add it to the Classrooms group; dispose it with it). */
export function buildBuildingDetails(input: BuildingDetailsInput): THREE.Group {
  const group = new THREE.Group();
  group.name = 'original-building-details';
  const c = new GeometryCollector();
  const layout = computeBuildingLayout(input);

  for (const p of layout.parts) addPart(c, p);
  for (const win of layout.windows) for (const p of windowParts(win)) addPart(c, p);
  for (const h of layout.hulls) if (OUTLINE_TAGS.has(h.tag)) c.hull(h, OUTLINE_THICKNESS);

  for (const key of c.keys()) {
    let material: THREE.MeshStandardMaterial;
    if (key.startsWith('accent-')) {
      material = new THREE.MeshStandardMaterial({ color: Number(key.slice(7)), roughness: 0.55, metalness: 0.1 });
    } else {
      material = new THREE.MeshStandardMaterial(MATERIALS[key as keyof typeof MATERIALS]);
    }
    const mesh = c.buildKey(key, material, `bld-${key}`);
    if (!mesh) continue;
    mesh.castShadow = key !== 'bulb';
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  const outline = c.buildOutline(
    new THREE.MeshBasicMaterial({ color: OUTLINE_COLOR, side: THREE.BackSide }),
    'bld-outline',
  );
  if (outline) group.add(outline);

  // Hero board face: lit plane with a gentle self-glow so the lettering stays readable
  const texture = createHeroTexture(HERO_PALETTE_DAY);
  const face = new THREE.Mesh(
    new THREE.PlaneGeometry(layout.hero.w, layout.hero.h),
    new THREE.MeshStandardMaterial({
      map: texture,
      emissive: 0xffffff,
      emissiveMap: texture,
      emissiveIntensity: 0.25,
      roughness: 0.6,
    }),
  );
  face.position.set(layout.hero.x, layout.hero.y, layout.hero.z);
  face.receiveShadow = true;
  face.name = 'bld-hero-face';
  group.add(face);
  return group;
}
