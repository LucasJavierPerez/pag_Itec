import * as THREE from 'three';
import { createRoleMaterial, piecesFromPrimitives } from './primitives.ts';
import type { StyleRenderer } from './types.ts';

/** Emissive strength of the highlight roles (accent is a gentle sheen, glow / eye really shine). */
const EMISSIVE: Record<string, number> = { accent: 0.3, glow: 1.8, eye: 1.3 };

/** Cinematic: smooth, glossy clothing (MeshStandardMaterial only) and emissive highlight roles. */
export const cinematicRenderer: StyleRenderer = {
  outline: false,
  pieces: (def, animated) =>
    piecesFromPrimitives(def, animated, { sphere: [16, 11], cylinder: 14, cone: 14 }, ['accent', 'glow', 'eye']),
  createMainMaterial: () => new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.28, metalness: 0.35 }),
  createPieceMaterial: (piece) =>
    createRoleMaterial({ roughness: 0.3, metalness: piece.paint === 'accent' ? 0.35 : 0.1 }, EMISSIVE[piece.paint] ?? 0.5),
};
