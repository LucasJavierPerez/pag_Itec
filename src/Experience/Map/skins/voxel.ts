import * as THREE from 'three';
import type { MapSkin } from './types.ts';
import { createDustPoints, createSunLights } from './lighting.ts';

export const voxelSkin: MapSkin = {
  id: 'voxel',
  palette: {
    ground: 0x8fcf6a,
    ground2: 0x82c25e,
    sidewalk: 0xd8d2c0,
    road: 0x5a606b,
    roadLine: 0xf5e7a0,
    plaza: 0xe9dcae,
    plazaRing: 0xf5b041,
    wall: 0xf2eddc,
    wall2: 0xd9cfb4,
    trim: 0x3d4654,
    roof: 0xc0504d,
    window: 0x7fd1ff,
    door: 0x8a5a3a,
    trunk: 0x8d6a4a,
    leaf: 0x3f9d4a,
    leaf2: 0x57b85a,
    lamp: 0xffe9a0,
  },
  voxel: true,
  flat: true,
  outline: false,
  shadows: false,
  propDensity: 1,
  createLitMaterial: () => new THREE.MeshLambertMaterial({ vertexColors: true }),
  createRingMaterial: () =>
    new THREE.MeshBasicMaterial({ transparent: true, opacity: 0.95, depthWrite: false, side: THREE.DoubleSide }),
  createPathMaterial: (color, dashes) =>
    new THREE.MeshBasicMaterial({ color, alphaMap: dashes, transparent: true, opacity: 0.9, depthWrite: false }),
  createLights: (scene, quality) =>
    createSunLights(scene, {
      ambient: { color: 0xffffff, intensity: 1.15 },
      sun: { color: 0xfff4dc, intensity: 1.6 },
      shadows: false,
      quality,
    }),
  createDustMaterial: (texture) => createDustPoints(texture, 0xf0e6c8, false),
};
