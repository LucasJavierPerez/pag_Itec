import type { StyleId } from '../../World/styles/types.ts';
import type { MapSkin } from './types.ts';
import { voxelSkin } from './voxel.ts';
import { lowpolySkin } from './lowpoly.ts';
import { originalSkin } from './original.ts';
import { cinematicSkin } from './cinematic.ts';

export type { MapSkin, MapQuality, MapLights, MapPalette } from './types.ts';

const SKINS: Record<StyleId, MapSkin> = {
  voxel: voxelSkin,
  lowpoly: lowpolySkin,
  original: originalSkin,
  cinematic: cinematicSkin,
};

export function getMapSkin(id: StyleId): MapSkin {
  return SKINS[id];
}
