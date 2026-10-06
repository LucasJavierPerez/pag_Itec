import * as THREE from 'three';
import type { MapIcon } from '../../UI/MapData.ts';

type Ctx = CanvasRenderingContext2D;

/** Draws a simple pictogram centered at (cx, cy); `r` is the circle radius that frames it. */
export function drawIcon(ctx: Ctx, key: MapIcon, cx: number, cy: number, r: number): void {
  const u = r * 0.52;
  const x = (v: number): number => cx + v * u;
  const y = (v: number): number => cy + v * u;
  ctx.save();
  ctx.strokeStyle = '#ffffff';
  ctx.fillStyle = '#ffffff';
  ctx.lineWidth = Math.max(2, r * 0.13);
  ctx.lineCap = 'round';
  ctx.lineJoin = 'round';
  ctx.beginPath();
  switch (key) {
    case 'school':
      ctx.moveTo(x(-1), y(-0.1));
      ctx.lineTo(x(0), y(-1));
      ctx.lineTo(x(1), y(-0.1));
      ctx.moveTo(x(-0.8), y(-0.1));
      ctx.lineTo(x(-0.8), y(0.9));
      ctx.lineTo(x(0.8), y(0.9));
      ctx.lineTo(x(0.8), y(-0.1));
      ctx.moveTo(x(0), y(0.9));
      ctx.lineTo(x(0), y(0.3));
      break;
    case 'campus':
      ctx.moveTo(x(-0.6), y(1));
      ctx.lineTo(x(-0.6), y(-1));
      ctx.lineTo(x(0.9), y(-0.5));
      ctx.lineTo(x(-0.6), y(0));
      break;
    case 'code':
      ctx.moveTo(x(-0.4), y(-0.8));
      ctx.lineTo(x(-1), y(0));
      ctx.lineTo(x(-0.4), y(0.8));
      ctx.moveTo(x(0.4), y(-0.8));
      ctx.lineTo(x(1), y(0));
      ctx.lineTo(x(0.4), y(0.8));
      break;
    case 'brain':
      ctx.arc(x(-0.4), y(-0.2), u * 0.6, 0, Math.PI * 2);
      ctx.moveTo(x(1), y(-0.2));
      ctx.arc(x(0.4), y(-0.2), u * 0.6, 0, Math.PI * 2);
      ctx.moveTo(x(-0.3), y(0.35));
      ctx.lineTo(x(-0.3), y(1));
      ctx.moveTo(x(0.3), y(0.35));
      ctx.lineTo(x(0.3), y(1));
      break;
    case 'plane':
      ctx.moveTo(x(-1), y(0.1));
      ctx.lineTo(x(1), y(-0.8));
      ctx.lineTo(x(0.2), y(0.9));
      ctx.lineTo(x(0), y(0.2));
      ctx.closePath();
      break;
    case 'chip':
      ctx.rect(x(-0.6), y(-0.6), u * 1.2, u * 1.2);
      for (const v of [-0.3, 0.3]) {
        ctx.moveTo(x(v), y(-0.6));
        ctx.lineTo(x(v), y(-1));
        ctx.moveTo(x(v), y(0.6));
        ctx.lineTo(x(v), y(1));
        ctx.moveTo(x(-0.6), y(v));
        ctx.lineTo(x(-1), y(v));
        ctx.moveTo(x(0.6), y(v));
        ctx.lineTo(x(1), y(v));
      }
      break;
    case 'megaphone':
      ctx.moveTo(x(-1), y(-0.3));
      ctx.lineTo(x(-1), y(0.3));
      ctx.lineTo(x(0.1), y(0.3));
      ctx.lineTo(x(1), y(0.9));
      ctx.lineTo(x(1), y(-0.9));
      ctx.lineTo(x(0.1), y(-0.3));
      ctx.closePath();
      break;
    case 'flask':
      ctx.moveTo(x(-0.3), y(-1));
      ctx.lineTo(x(-0.3), y(-0.2));
      ctx.lineTo(x(-0.95), y(0.9));
      ctx.lineTo(x(0.95), y(0.9));
      ctx.lineTo(x(0.3), y(-0.2));
      ctx.lineTo(x(0.3), y(-1));
      ctx.moveTo(x(-0.5), y(-1));
      ctx.lineTo(x(0.5), y(-1));
      break;
    case 'book':
      ctx.moveTo(x(0), y(-0.6));
      ctx.lineTo(x(0), y(0.9));
      ctx.moveTo(x(0), y(-0.6));
      ctx.quadraticCurveTo(x(-0.5), y(-0.9), x(-1), y(-0.7));
      ctx.lineTo(x(-1), y(0.7));
      ctx.quadraticCurveTo(x(-0.5), y(0.5), x(0), y(0.9));
      ctx.moveTo(x(0), y(-0.6));
      ctx.quadraticCurveTo(x(0.5), y(-0.9), x(1), y(-0.7));
      ctx.lineTo(x(1), y(0.7));
      ctx.quadraticCurveTo(x(0.5), y(0.5), x(0), y(0.9));
      break;
    case 'briefcase':
      ctx.rect(x(-1), y(-0.4), u * 2, u * 1.4);
      ctx.moveTo(x(-0.4), y(-0.4));
      ctx.lineTo(x(-0.4), y(-0.9));
      ctx.lineTo(x(0.4), y(-0.9));
      ctx.lineTo(x(0.4), y(-0.4));
      break;
    case 'monitor':
      ctx.rect(x(-1), y(-0.8), u * 2, u * 1.4);
      ctx.moveTo(x(0), y(0.6));
      ctx.lineTo(x(0), y(1));
      ctx.moveTo(x(-0.5), y(1));
      ctx.lineTo(x(0.5), y(1));
      break;
    case 'cap':
      ctx.moveTo(x(-1.1), y(-0.3));
      ctx.lineTo(x(0), y(-0.9));
      ctx.lineTo(x(1.1), y(-0.3));
      ctx.lineTo(x(0), y(0.3));
      ctx.closePath();
      ctx.moveTo(x(-0.6), y(0));
      ctx.lineTo(x(-0.6), y(0.7));
      ctx.quadraticCurveTo(x(0), y(1.1), x(0.6), y(0.7));
      ctx.lineTo(x(0.6), y(0));
      break;
    case 'gear': {
      ctx.arc(cx, cy, u * 0.55, 0, Math.PI * 2);
      for (let i = 0; i < 8; i++) {
        const a = (i / 8) * Math.PI * 2;
        ctx.moveTo(cx + Math.cos(a) * u * 0.7, cy + Math.sin(a) * u * 0.7);
        ctx.lineTo(cx + Math.cos(a) * u * 1.05, cy + Math.sin(a) * u * 1.05);
      }
      break;
    }
    case 'phone':
      ctx.rect(x(-0.5), y(-1), u, u * 2);
      ctx.moveTo(x(-0.15), y(0.7));
      ctx.lineTo(x(0.15), y(0.7));
      break;
  }
  ctx.stroke();
  ctx.restore();
}

function roundRect(ctx: Ctx, x: number, y: number, w: number, h: number, r: number): void {
  ctx.beginPath();
  ctx.moveTo(x + r, y);
  ctx.arcTo(x + w, y, x + w, y + h, r);
  ctx.arcTo(x + w, y + h, x, y + h, r);
  ctx.arcTo(x, y + h, x, y, r);
  ctx.arcTo(x, y, x + w, y, r);
  ctx.closePath();
}

const FONT = '700 34px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';

function wrap(ctx: Ctx, text: string, maxWidth: number): string[] {
  const words = text.split(' ');
  const lines: string[] = [];
  let line = '';
  for (const word of words) {
    const test = line ? `${line} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && line) {
      lines.push(line);
      line = word;
    } else {
      line = test;
    }
  }
  if (line) lines.push(line);
  return lines.slice(0, 2);
}

export interface LabelSprite {
  sprite: THREE.Sprite;
  /** width / height of the texture. */
  aspect: number;
}

function makeSprite(canvas: HTMLCanvasElement): LabelSprite {
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  const material = new THREE.SpriteMaterial({
    map: texture,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
  const sprite = new THREE.Sprite(material);
  sprite.center.set(0.5, 0);
  sprite.renderOrder = 20;
  return { sprite, aspect: canvas.width / canvas.height };
}

/** Name pill with a colored pictogram badge. */
export function createPointLabel(name: string, icon: MapIcon, accent: string): LabelSprite {
  const H = 112;
  const R = 40;
  const measure = document.createElement('canvas').getContext('2d')!;
  measure.font = FONT;
  const lines = wrap(measure, name, 330);
  const textW = Math.max(...lines.map((l) => measure.measureText(l).width));
  const W = Math.ceil(R * 2 + 36 + textW + 34);

  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'rgba(10, 16, 32, 0.86)';
  roundRect(ctx, 2, 2, W - 4, H - 4, H / 2 - 2);
  ctx.fill();
  ctx.strokeStyle = accent;
  ctx.lineWidth = 4;
  ctx.stroke();

  ctx.fillStyle = accent;
  ctx.beginPath();
  ctx.arc(8 + R, H / 2, R, 0, Math.PI * 2);
  ctx.fill();
  drawIcon(ctx, icon, 8 + R, H / 2, R);

  ctx.font = FONT;
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  const lh = 38;
  const top = H / 2 - ((lines.length - 1) * lh) / 2;
  lines.forEach((l, i) => ctx.fillText(l, R * 2 + 28, top + i * lh + 1));
  return makeSprite(canvas);
}

/** Large district caption (accent underline, no pill). */
export function createDistrictLabel(name: string, accent: string): LabelSprite {
  const H = 96;
  const measure = document.createElement('canvas').getContext('2d')!;
  measure.font = '800 52px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  const W = Math.ceil(measure.measureText(name.toUpperCase()).width + 70);
  const canvas = document.createElement('canvas');
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'rgba(10, 16, 32, 0.55)';
  roundRect(ctx, 0, 0, W, H, 22);
  ctx.fill();
  ctx.fillStyle = accent;
  roundRect(ctx, 22, H - 18, W - 44, 7, 3);
  ctx.fill();
  ctx.font = '800 52px system-ui, -apple-system, "Segoe UI", Roboto, sans-serif';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(name.toUpperCase(), W / 2, H / 2 - 7);
  return makeSprite(canvas);
}
