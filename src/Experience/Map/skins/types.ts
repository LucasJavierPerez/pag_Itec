import type * as THREE from 'three';
import type { StyleId } from '../../World/styles/types.ts';

export interface MapPalette {
  ground: number;
  ground2: number;
  sidewalk: number;
  road: number;
  roadLine: number;
  plaza: number;
  plazaRing: number;
  wall: number;
  wall2: number;
  trim: number;
  roof: number;
  window: number;
  door: number;
  trunk: number;
  leaf: number;
  leaf2: number;
  lamp: number;
}

export type MapQuality = 'high' | 'low';

export interface MapLights {
  /** Called every frame with the robot ground position. */
  update(robot: THREE.Vector3, dt: number): void;
  dispose(): void;
}

/** Everything that changes between the four visual styles of the map. */
export interface MapSkin {
  id: StyleId;
  palette: MapPalette;
  /** Build with unit cubes and no round shapes. */
  voxel: boolean;
  /** Faceted normals. */
  flat: boolean;
  /** Dark inverted-hull outline on landmarks. */
  outline: boolean;
  /** Real shadow map (only used on high quality). */
  shadows: boolean;
  /** Share of the decorative props kept (1 = all). */
  propDensity: number;
  /** Lit material that reads vertex colors (and the `aGlow` attribute where supported). */
  createLitMaterial(): THREE.Material;
  /** Material of the ring markers; reads per-instance colors. */
  createRingMaterial(): THREE.Material;
  /** Flat ribbon material for the route line (alpha-masked dash texture). */
  createPathMaterial(color: number, dashes: THREE.Texture): THREE.Material;
  /** Creates the lights of the style and adds them to the scene. */
  createLights(scene: THREE.Scene, quality: MapQuality): MapLights;
  /** Material for the robot's ground dust puffs. */
  createDustMaterial(texture: THREE.Texture): THREE.PointsMaterial;
}
