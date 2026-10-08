import * as THREE from 'three';
import { createRoleMaterial, piecesFromPrimitives } from './primitives.ts';
import type { StyleRenderer } from './types.ts';

/** Original: smooth primitives with vertex colours (same family as the style's own robot). */
export const originalRenderer: StyleRenderer = {
  outline: false,
  pieces: (def, animated) =>
    piecesFromPrimitives(def, animated, { sphere: [16, 11], cylinder: 14, cone: 14 }, ['glow', 'eye']),
  createMainMaterial: () => new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.5, metalness: 0.1 }),
  createPieceMaterial: () => createRoleMaterial({ roughness: 0.4, metalness: 0.1 }, 0.7),
};
