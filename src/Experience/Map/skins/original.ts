import * as THREE from 'three';
import type { MapSkin } from './types.ts';
import { createDustPoints, createSunLights } from './lighting.ts';

export const originalSkin: MapSkin = {
  id: 'original',
  palette: {
    ground: 0xb4c79a,
    ground2: 0xa8bc8e,
    sidewalk: 0xe4dac3,
    road: 0x585e69,
    roadLine: 0xf2e6b8,
    plaza: 0xeadfc4,
    plazaRing: 0x2980b9,
    wall: 0xf4efe3,
    wall2: 0xdcd2bc,
    trim: 0x3b4a5f,
    roof: 0xb85c4e,
    window: 0x8ecde8,
    door: 0x7a5538,
    trunk: 0x7d5f43,
    leaf: 0x4b8f55,
    leaf2: 0x5fa569,
    lamp: 0xfff0c0,
  },
  voxel: false,
  flat: false,
  outline: false,
  shadows: true,
  propDensity: 1,
  createLitMaterial: () =>
    new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.82, metalness: 0.04 }),
  createRingMaterial: () =>
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.95, depthWrite: false, side: THREE.DoubleSide }),
  createPathMaterial: (color, dashes) =>
    new THREE.MeshBasicMaterial({ color, alphaMap: dashes, transparent: true, opacity: 0.9, depthWrite: false }),
  createLights: (scene, quality) =>
    createSunLights(scene, {
      ambient: { color: 0xfff3e0, intensity: 0.55 },
      hemi: { sky: 0xdfeeff, ground: 0xb59f7a, intensity: 0.7 },
      sun: { color: 0xfff0d6, intensity: 2.6 },
      shadows: true,
      quality,
    }),
  createDustMaterial: (texture) => createDustPoints(texture, 0xe8dcc0, false),
};
