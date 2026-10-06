import * as THREE from 'three';
import type { MapSkin } from './types.ts';
import { createDustPoints, createSunLights } from './lighting.ts';

export const lowpolySkin: MapSkin = {
  id: 'lowpoly',
  palette: {
    ground: 0xb9d28a,
    ground2: 0xa9c47a,
    sidewalk: 0xe9dcc2,
    road: 0x6a6f7e,
    roadLine: 0xfbe9b0,
    plaza: 0xf3d9a4,
    plazaRing: 0x2980b9,
    wall: 0xfaf1de,
    wall2: 0xe6d3b0,
    trim: 0x41506a,
    roof: 0xd9695f,
    window: 0x9fdcf5,
    door: 0x9a6b4a,
    trunk: 0x9b7653,
    leaf: 0x4fa86a,
    leaf2: 0x6bc17e,
    lamp: 0xfff0b3,
  },
  voxel: false,
  flat: true,
  outline: true,
  shadows: false,
  propDensity: 1,
  createLitMaterial: () => new THREE.MeshLambertMaterial({ vertexColors: true, flatShading: true }),
  createRingMaterial: () =>
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.95, depthWrite: false, side: THREE.DoubleSide }),
  createPathMaterial: (color, dashes) =>
    new THREE.MeshBasicMaterial({ color, alphaMap: dashes, transparent: true, opacity: 0.9, depthWrite: false }),
  createLights: (scene, quality) =>
    createSunLights(scene, {
      ambient: { color: 0xfff1dd, intensity: 0.85 },
      hemi: { sky: 0xffffff, ground: 0xc9b48a, intensity: 0.5 },
      sun: { color: 0xffe6c0, intensity: 1.5 },
      shadows: false,
      quality,
    }),
  createDustMaterial: (texture) => createDustPoints(texture, 0xfff2d6, false),
};

/** Dark inverted-hull material used for the landmark outlines. */
export function createOutlineMaterial(): THREE.Material {
  return new THREE.MeshBasicMaterial({ color: 0x2a2f3d, side: THREE.BackSide });
}
