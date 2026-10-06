import type { MapPoint } from '../../UI/MapData.ts';
import type { MapPalette } from './skins/types.ts';
import type { MapBatch } from './MapBatch.ts';

/** Builds one landmark in a local frame: origin at the footprint center on the ground, front faces +Z. */

const hex = (css: string): number => parseInt(css.slice(1), 16);

/** Row of lit windows on a facade at depth `z` (front faces +Z). */
function windows(b: MapBatch, pal: MapPalette, xs: number[], y: number, z: number, w = 0.9, h = 1.1): void {
  for (const x of xs) {
    b.box(x, y, z, w, h, 0.12, pal.window, { glow: 0.8, solid: true });
    b.box(x, y, z - 0.02, w + 0.3, h + 0.3, 0.1, pal.trim, { solid: true });
  }
}

function sede(b: MapBatch, pal: MapPalette, accent: number): number {
  b.box(0, 2, 0, 9, 4, 6, pal.wall);
  b.box(0, 5, -0.5, 5, 2, 4, pal.wall2);
  b.box(0, 6.15, -0.5, 5.4, 0.3, 4.4, pal.trim, { solid: true });
  b.box(0, 4.15, 0, 9.4, 0.3, 6.4, pal.trim, { solid: true });
  b.box(0, 3.3, 0, 9.1, 0.5, 6.1, accent, { solid: true });
  b.box(0, 1, 3.02, 1.6, 2, 0.12, pal.door, { solid: true });
  windows(b, pal, [-3.6, -2.2, 2.2, 3.6], 1.8, 3.04);
  windows(b, pal, [-1.5, 0, 1.5], 5, 1.54);
  // Flagpole with the accent flag
  b.cyl(5.6, 4, 3.2, 0.09, 0.09, 8, pal.wall2, 6);
  b.box(6.4, 7.2, 3.2, 1.6, 0.9, 0.06, accent, { solid: true });
  return 7.2;
}

function carrera(b: MapBatch, pal: MapPalette, accent: number): number {
  b.box(0, 1.8, 0, 5, 3.6, 4, pal.wall);
  b.gable(0, 4.6, 0, 5.8, 2, 4.8, accent);
  b.box(0, 3.0, 2.04, 3, 0.55, 0.1, accent, { solid: true });
  b.box(0, 1, 2.04, 1.3, 2, 0.1, pal.door, { solid: true });
  windows(b, pal, [-1.7, 1.7], 1.9, 2.05, 0.8, 1);
  b.box(1.6, 5.5, -1, 0.7, 1.4, 0.7, pal.trim, { solid: true });
  return 5.6;
}

function servicio(b: MapBatch, pal: MapPalette, accent: number): number {
  b.box(0, 1.1, 0, 3.2, 2.2, 3.2, pal.wall);
  b.box(0, 2.3, 1.9, 4.4, 0.25, 2.4, accent, { solid: true });
  b.cyl(-2, 1.1, 2.9, 0.1, 0.1, 2.2, pal.trim, 6);
  b.cyl(2, 1.1, 2.9, 0.1, 0.1, 2.2, pal.trim, 6);
  b.box(0, 1.4, 1.62, 2, 0.9, 0.12, pal.window, { glow: 0.8, solid: true });
  b.box(0, 0.75, 2.2, 2.4, 0.2, 0.8, pal.wall2, { solid: true });
  b.cyl(0, 3.3, -0.2, 0, 2.6, 1.8, accent, 4);
  return 4.2;
}

function trayecto(b: MapBatch, pal: MapPalette, accent: number): number {
  b.box(0, 1.5, 0, 7, 3, 5, pal.wall2);
  b.push(0, 0, 0, Math.PI / 2);
  b.gable(0, 3.9, 0, 5.8, 1.8, 7.4, pal.trim);
  b.pop();
  b.box(0, 1.2, 2.54, 3, 2.4, 0.12, pal.door, { solid: true });
  b.box(0, 2.55, 2.55, 3.4, 0.3, 0.14, accent, { solid: true });
  b.box(-2.2, 4.4, -1.2, 0.8, 2.4, 0.8, pal.trim, { solid: true });
  windows(b, pal, [-2.6, 2.6], 1.9, 2.54, 0.8, 0.9);
  // Gear pictogram on a round pedestal (reads from above)
  b.cyl(5.2, 0.3, 2.4, 1.2, 1.2, 0.6, pal.trim, 10);
  b.cyl(5.2, 0.8, 2.4, 0.8, 0.8, 0.4, accent, 12);
  for (let i = 0; i < 8; i++) {
    const a = (i / 8) * Math.PI * 2;
    b.push(5.2 + Math.cos(a) * 1.05, 0.8, 2.4 + Math.sin(a) * 1.05, -a);
    b.box(0, 0, 0, 0.5, 0.4, 0.4, accent, { solid: true });
    b.pop();
  }
  b.cyl(5.2, 1.03, 2.4, 0.3, 0.3, 0.1, pal.trim, 8);
  return 5.6;
}

function secundario(b: MapBatch, pal: MapPalette, accent: number): number {
  b.box(0, 1.8, 0, 11, 3.6, 5.5, pal.wall);
  b.box(0, 3.7, 0, 11.4, 0.25, 5.9, pal.trim, { solid: true });
  b.box(0, 3.8, 0.8, 3.4, 7.6, 3.4, pal.wall2);
  b.cyl(0, 8.7, 0.8, 0, 2.5, 2.2, accent, 4);
  // Clock on the tower front
  b.box(0, 6.2, 2.54, 1.7, 1.7, 0.12, 0xf8f6ee, { solid: true });
  b.box(0, 6.4, 2.62, 0.12, 0.7, 0.08, pal.trim, { solid: true });
  b.box(0.25, 6.2, 2.62, 0.55, 0.12, 0.08, pal.trim, { solid: true });
  b.box(0, 1, 2.82, 1.8, 2, 0.12, pal.door, { solid: true });
  b.box(0, 0.15, 3.5, 3.4, 0.3, 1.2, pal.sidewalk, { solid: true });
  windows(b, pal, [-4.4, -3, -1.7, 1.7, 3, 4.4], 1.9, 2.78);
  windows(b, pal, [0], 4.2, 2.54, 1, 1);
  return 10.1;
}

function contacto(b: MapBatch, pal: MapPalette, accent: number): number {
  b.box(0, 1.2, 0, 2.6, 2.4, 2.6, pal.wall);
  b.box(0, 2.55, 0, 3.2, 0.3, 3.2, accent, { solid: true });
  b.box(0, 1.4, 1.34, 1.6, 0.8, 0.12, pal.window, { glow: 0.8, solid: true });
  b.box(0, 0.95, 1.7, 2.0, 0.15, 0.6, pal.wall2, { solid: true });
  b.cyl(-0.8, 4.6, -0.8, 0.06, 0.06, 4, pal.trim, 6);
  b.cyl(-0.8, 6.7, -0.8, 0.55, 0.1, 0.4, pal.wall2, 10);
  b.box(0.9, 2.9, 0.9, 0.4, 0.4, 0.4, accent, { glow: 0.9, solid: true });
  return 7.2;
}

/** Adds the landmark of `point` to `batch` and returns its top height (for the label anchor). */
export function buildLandmark(batch: MapBatch, point: MapPoint, pal: MapPalette): number {
  const accent = hex(point.accent);
  switch (point.category) {
    case 'sede':
      return sede(batch, pal, accent);
    case 'carrera':
      return carrera(batch, pal, accent);
    case 'servicio':
      return servicio(batch, pal, accent);
    case 'trayecto':
      return trayecto(batch, pal, accent);
    case 'secundario':
      return secundario(batch, pal, accent);
    case 'contacto':
      return contacto(batch, pal, accent);
  }
}
