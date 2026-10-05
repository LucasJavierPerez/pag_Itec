import * as THREE from 'three';

/**
 * Top-surface height of every flat ground layer, in stacking order. Consecutive layers are at
 * least 0.02 apart so the depth buffer can always tell them apart (no z-fighting / flicker).
 */
export const GROUND = {
  grass: 0.02,
  pad: 0.04,
  /** Cinematic mirror plane: above the sand/pad, below everything painted on top. */
  mirror: 0.06,
  room: 0.08,
  hallway: 0.1,
  branch: 0.12,
  marking: 0.14,
  circle: 0.16,
  ring: 0.19,
} as const;

/**
 * Pulls a flat decal material slightly towards the camera in the depth buffer.
 * `layer` (1 = lowest decal) scales the units so higher layers always win.
 * Never call it on a material shared with non-decal meshes.
 */
export function decal<T extends THREE.Material>(material: T, layer: number): T {
  material.polygonOffset = true;
  material.polygonOffsetFactor = -1;
  material.polygonOffsetUnits = -layer;
  return material;
}
