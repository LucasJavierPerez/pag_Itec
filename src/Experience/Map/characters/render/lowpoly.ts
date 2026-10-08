import * as THREE from 'three';
import { createRoleMaterial, piecesFromPrimitives } from './primitives.ts';
import type { StyleRenderer } from './types.ts';

/** Low-poly: coarse faceted primitives, flat shading, a thin dark hull on the body. */
export const lowpolyRenderer: StyleRenderer = {
  outline: true,
  pieces: (def, animated) =>
    piecesFromPrimitives(def, animated, { sphere: [7, 5], cylinder: 6, cone: 6 }, ['glow', 'eye']),
  createMainMaterial: () =>
    new THREE.MeshStandardMaterial({ vertexColors: true, flatShading: true, roughness: 0.9, metalness: 0 }),
  createPieceMaterial: () => createRoleMaterial({ flatShading: true, roughness: 0.8, metalness: 0 }, 0.9),
};
