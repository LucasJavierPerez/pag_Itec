import * as THREE from 'three';

/** Faceted, matte material shared by the whole low-poly diorama style. */
export function flatMat(
  color: number | THREE.Color,
  extra: THREE.MeshStandardMaterialParameters = {},
): THREE.MeshStandardMaterial {
  return new THREE.MeshStandardMaterial({
    color,
    flatShading: true,
    roughness: 0.9,
    metalness: 0,
    ...extra,
  });
}

/** Deterministic pseudo-random generator so decoration is stable between reloads. */
export function seededRandom(seed: number): () => number {
  let s = seed >>> 0;
  return () => {
    s = (s * 1664525 + 1013904223) >>> 0;
    return s / 4294967296;
  };
}
