import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import { ANIMATED_LIMBS, ROLE_ORDER } from '../characterSpec.ts';
import type { CharacterDef, Limb, Part, PartRole, Vec3 } from '../characterSpec.ts';
import { LIMB_PIVOTS } from '../characterSpec.ts';
import type { GeoPiece } from './types.ts';

/** Segment counts of the round primitives (the style decides how smooth they are). */
export interface Segments {
  sphere: [number, number];
  cylinder: number;
  cone: number;
}

const matrix = new THREE.Matrix4();
const quat = new THREE.Quaternion();
const euler = new THREE.Euler();
const one = new THREE.Vector3();

/** Pivot of a limb for this character. */
export function pivotOf(def: CharacterDef, limb: Limb): Vec3 {
  return def.pivots?.[limb] ?? LIMB_PIVOTS[limb];
}

/** Non-indexed position + normal geometry of one part, expressed relative to `origin`. */
export function partGeometry(part: Part, seg: Segments, origin: Vec3): THREE.BufferGeometry {
  let g: THREE.BufferGeometry;
  if (part.shape === 'box') g = new THREE.BoxGeometry(1, 1, 1);
  else if (part.shape === 'sphere') g = new THREE.SphereGeometry(0.5, seg.sphere[0], seg.sphere[1]);
  else if (part.shape === 'cylinder') g = new THREE.CylinderGeometry(0.5, 0.5, 1, seg.cylinder);
  else g = new THREE.ConeGeometry(0.5, 1, seg.cone);
  const flat = g.index ? g.toNonIndexed() : g;
  if (flat !== g) g.dispose();
  flat.deleteAttribute('uv');
  const r = part.rot ?? [0, 0, 0];
  quat.setFromEuler(euler.set(r[0], r[1], r[2]));
  matrix.compose(
    one.set(part.pos[0] - origin[0], part.pos[1] - origin[1], part.pos[2] - origin[2]),
    quat,
    new THREE.Vector3(part.size[0], part.size[1], part.size[2]),
  );
  return flat.applyMatrix4(matrix);
}

function mergeParts(parts: Part[], seg: Segments, origin: Vec3): Pick<GeoPiece, 'geometry' | 'roles' | 'gains'> | null {
  if (parts.length === 0) return null;
  const geos = parts.map((p) => partGeometry(p, seg, origin));
  const roles = new Uint8Array(geos.reduce((n, g) => n + g.attributes.position.count, 0));
  let at = 0;
  geos.forEach((g, i) => {
    const idx = ROLE_ORDER.indexOf(parts[i].role);
    roles.fill(idx, at, at + g.attributes.position.count);
    at += g.attributes.position.count;
  });
  const geometry = mergeGeometries(geos);
  geos.forEach((g) => g.dispose());
  if (!geometry) return null;
  return { geometry, roles, gains: new Float32Array(roles.length).fill(1) };
}

/**
 * Pieces of a character built from smooth / low-poly primitives. Animated limbs (when
 * `animated`) get their own pivot-relative piece; `splitRoles` of the static body become
 * uniform-coloured pieces (one per role) so the material can glow.
 */
export function piecesFromPrimitives(
  def: CharacterDef,
  animated: boolean,
  seg: Segments,
  splitRoles: readonly PartRole[],
): GeoPiece[] {
  const out: GeoPiece[] = [];
  const isAnimated = (p: Part): p is Part & { limb: Limb } => animated && !!p.limb && ANIMATED_LIMBS.includes(p.limb);

  const main: Part[] = [];
  const split = new Map<PartRole, Part[]>();
  const limbs = new Map<Limb, Part[]>();
  for (const p of def.parts) {
    if (isAnimated(p)) {
      const list = limbs.get(p.limb) ?? [];
      list.push(p);
      limbs.set(p.limb, list);
    } else if (splitRoles.includes(p.role)) {
      const list = split.get(p.role) ?? [];
      list.push(p);
      split.set(p.role, list);
    } else {
      main.push(p);
    }
  }

  const base = mergeParts(main, seg, [0, 0, 0]);
  if (base) out.push({ limb: null, paint: 'vertex', ...base });
  for (const [role, parts] of split) {
    const merged = mergeParts(parts, seg, [0, 0, 0]);
    if (merged) out.push({ limb: null, paint: role, ...merged });
  }
  for (const [limb, parts] of limbs) {
    const merged = mergeParts(parts, seg, pivotOf(def, limb));
    if (merged) out.push({ limb, paint: 'vertex', ...merged });
  }
  return out;
}

/** Standard material coloured through `color` (and `emissive`, when `intensity` > 0) from the palette. */
export function createRoleMaterial(
  extra: THREE.MeshStandardMaterialParameters,
  intensity: number,
): THREE.MeshStandardMaterial {
  const m = new THREE.MeshStandardMaterial({ color: 0xffffff, ...extra });
  if (intensity > 0) {
    m.emissive.setHex(0xffffff);
    m.emissiveIntensity = intensity;
    m.userData.glowy = true;
  }
  return m;
}
