import * as THREE from 'three';
import { HERO } from './buildingLayout.ts';

export interface HeroPalette {
  background: string;
  frameOuter: string;
  frameInner: string;
  title: string;
  subtitle: string;
}

/** The faceted / smooth styles: ITEC navy with cream and gold. */
export const HERO_PALETTE_DAY: HeroPalette = {
  background: '#12384f',
  frameOuter: '#f4efe2',
  frameInner: '#f1c40f',
  title: '#ffffff',
  subtitle: '#f1c40f',
};

/**
 * Draws the south-facade board face: "ITEC" over "Instituto Tecnológico Río Cuarto", in a double
 * frame. Fully opaque (it is the board face). `width` is the canvas width in pixels.
 */
export function createHeroTexture(
  palette: HeroPalette,
  options: { width?: number; pixelated?: boolean } = {},
): THREE.CanvasTexture {
  const w = options.width ?? 1344;
  const h = Math.round((w * HERO.boardHeight) / (HERO.boardWidth - 0.2));
  const u = w / 1344; // scale factor relative to the 1344 px design
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = palette.background;
  ctx.fillRect(0, 0, w, h);
  ctx.strokeStyle = palette.frameOuter;
  ctx.lineWidth = Math.max(1, 12 * u);
  ctx.strokeRect(14 * u, 14 * u, w - 28 * u, h - 28 * u);
  ctx.strokeStyle = palette.frameInner;
  ctx.lineWidth = Math.max(1, 5 * u);
  ctx.strokeRect(34 * u, 34 * u, w - 68 * u, h - 68 * u);
  ctx.fillStyle = palette.title;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.font = `900 ${Math.round(h * 0.5)}px Arial, Helvetica, sans-serif`;
  ctx.fillText('ITEC', w / 2, h * 0.4);
  ctx.fillStyle = palette.subtitle;
  ctx.font = `bold ${Math.round(h * 0.15)}px Arial, Helvetica, sans-serif`;
  ctx.fillText('Instituto Tecnológico Río Cuarto', w / 2, h * 0.79);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  if (options.pixelated) {
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
  }
  return texture;
}
