import type { StyleId, StyleModule } from './types.ts';
import { originalStyle } from './original/index.ts';
import { lowpolyStyle } from './lowpoly/index.ts';
import { voxelStyle } from './voxel/index.ts';
import { cinematicStyle } from './cinematic/index.ts';

export type { StyleId, StyleModule } from './types.ts';

export const STYLES: Record<StyleId, StyleModule> = {
  original: originalStyle,
  lowpoly: lowpolyStyle,
  voxel: voxelStyle,
  cinematic: cinematicStyle,
};

export const STYLE_IDS: StyleId[] = ['original', 'lowpoly', 'voxel', 'cinematic'];

export const DEFAULT_STYLE: StyleId = 'voxel';

export function isStyleId(value: unknown): value is StyleId {
  return typeof value === 'string' && value in STYLES;
}
