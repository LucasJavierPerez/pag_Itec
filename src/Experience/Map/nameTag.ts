import * as THREE from 'three';
import { isCoarsePointer } from '../../utils/device.ts';

/**
 * Floating name tags shared by the player, remote players and the bots: one canvas-texture sprite
 * per character, textures cached by (text, colour, self, quality) with LRU eviction, and a layout
 * pass that keeps the tags readable (zoom gate, no overlaps, capped count, priority order).
 */

// ---- Tunable constants
/** Name tags need this many pixels per world unit to be readable (hidden when zoomed further out). */
export const TAG_MIN_PPU = 9;
/** On-screen height of a tag in CSS pixels. */
export const TAG_HEIGHT_PX = 22 * (isCoarsePointer() ? 1.15 : 1);
/** Most tags drawn at once. */
export const MAX_VISIBLE_TAGS = 20;
/** Cached label textures (the least recently used ones that nobody shows are disposed). */
export const MAX_CACHED_TEXTURES = 64;
/** Names longer than this are cut with an ellipsis. */
export const MAX_TAG_CHARS = 16;
/** ITEC blue, the accent of your own tag. */
export const SELF_ACCENT = 0x2980b9;
/** Characters are ~2.3 units tall before scaling. */
const CHARACTER_HEIGHT = 2.3;
const TAG_GAP = 0.22;
/** Pixels of margin around a tag when testing overlaps. */
const OVERLAP_PAD_PX = 2;
/** Tags this far outside the viewport are not drawn. */
const OFFSCREEN_MARGIN_PX = 40;

/** Priority classes: lower is drawn first and wins overlaps. */
export const TAG_PRIORITY = { self: 0, remote: 1, bot: 2 } as const;

/** World height of the tag anchor for a character drawn at `scale`. */
export function tagHeight(scale: number): number {
  return CHARACTER_HEIGHT * scale + TAG_GAP;
}

export function truncateName(text: string): string {
  const chars = [...text];
  return chars.length > MAX_TAG_CHARS ? `${chars.slice(0, MAX_TAG_CHARS - 1).join('')}…` : text;
}

export interface TagLabel {
  text: string;
  accent: number;
  /** Your own tag: ITEC blue frame and a small "vos" chip. */
  self?: boolean;
}

const hexCss = (n: number): string => `#${(n & 0xffffff).toString(16).padStart(6, '0')}`;

interface CacheEntry {
  texture: THREE.CanvasTexture;
  aspect: number;
  refs: number;
}

const cache = new Map<string, CacheEntry>();

function dpr(): number {
  return Math.min(2, Math.max(1, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1));
}

function paintTag(label: TagLabel, high: boolean): { texture: THREE.CanvasTexture; aspect: number } {
  const h = Math.round((high ? 56 : 44) * dpr());
  const name = truncateName(label.text);
  const font = `700 ${Math.round(h * 0.52)}px system-ui, -apple-system, "Segoe UI", sans-serif`;
  const chipFont = `700 ${Math.round(h * 0.3)}px system-ui, -apple-system, "Segoe UI", sans-serif`;
  const measure = document.createElement('canvas').getContext('2d')!;
  measure.font = font;
  const textW = Math.ceil(measure.measureText(name).width);
  const pad = Math.round(h * 0.45);
  let chipW = 0;
  const chipGap = Math.round(h * 0.18);
  if (label.self) {
    measure.font = chipFont;
    chipW = Math.ceil(measure.measureText('vos').width) + Math.round(h * 0.3);
  }
  const w = textW + pad * 2 + (label.self ? chipW + chipGap : 0);
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.textBaseline = 'middle';
  const textX = pad + textW / 2;
  const cy = h / 2 + 2;
  if (high || label.self) {
    ctx.fillStyle = 'rgba(14, 18, 28, 0.82)';
    ctx.beginPath();
    ctx.roundRect(2, 2, w - 4, h - 4, (h - 4) / 2);
    ctx.fill();
    ctx.strokeStyle = hexCss(label.accent);
    ctx.lineWidth = label.self ? 4 : 3;
    ctx.stroke();
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText(name, textX, cy);
  } else {
    // Low quality: plain outlined text
    ctx.font = font;
    ctx.textAlign = 'center';
    ctx.lineJoin = 'round';
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(14, 18, 28, 0.9)';
    ctx.strokeText(name, textX, cy);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(name, textX, cy);
  }
  if (label.self) {
    // Small "vos" chip, so you can find yourself in a crowd
    const chipH = Math.round(h * 0.46);
    const chipX = pad + textW + chipGap;
    ctx.fillStyle = hexCss(SELF_ACCENT);
    ctx.beginPath();
    ctx.roundRect(chipX, (h - chipH) / 2 + 1, chipW, chipH, chipH / 2);
    ctx.fill();
    ctx.font = chipFont;
    ctx.textAlign = 'center';
    ctx.fillStyle = '#ffffff';
    ctx.fillText('vos', chipX + chipW / 2, cy - 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return { texture, aspect: w / h };
}

function keyOf(label: TagLabel, high: boolean): string {
  return `${high ? 'h' : 'l'}|${label.self ? 's' : 'o'}|${label.accent}|${truncateName(label.text)}`;
}

function acquire(label: TagLabel, high: boolean): { key: string; entry: CacheEntry } {
  const key = keyOf(label, high);
  let entry = cache.get(key);
  if (entry) {
    cache.delete(key); // refresh recency
  } else {
    entry = { ...paintTag(label, high), refs: 0 };
  }
  cache.set(key, entry);
  entry.refs++;
  trimCache();
  return { key, entry };
}

function release(key: string): void {
  const entry = cache.get(key);
  if (entry) entry.refs = Math.max(0, entry.refs - 1);
  trimCache();
}

function trimCache(): void {
  if (cache.size <= MAX_CACHED_TEXTURES) return;
  for (const [key, entry] of cache) {
    if (cache.size <= MAX_CACHED_TEXTURES) break;
    if (entry.refs > 0) continue;
    entry.texture.dispose();
    cache.delete(key);
  }
}

/** Test / teardown helper: disposes every cached texture that nobody uses. */
export function purgeNameTagCache(): void {
  for (const [key, entry] of cache) {
    if (entry.refs > 0) continue;
    entry.texture.dispose();
    cache.delete(key);
  }
}

/** One floating tag: a sprite whose texture comes from the shared cache. */
export class NameTag {
  readonly sprite: THREE.Sprite;
  aspect = 1;

  private _key: string | null = null;
  private _label: TagLabel;
  private _high: boolean;

  constructor(label: TagLabel, high: boolean) {
    this._label = { ...label };
    this._high = high;
    this.sprite = new THREE.Sprite(
      new THREE.SpriteMaterial({ transparent: true, depthWrite: false, depthTest: false, toneMapped: false }),
    );
    this.sprite.center.set(0.5, 0);
    this.sprite.renderOrder = 12;
    this.sprite.visible = false;
    this._apply();
  }

  private _apply(): void {
    const previous = this._key;
    const { key, entry } = acquire(this._label, this._high);
    this._key = key;
    this.aspect = entry.aspect;
    this.sprite.material.map = entry.texture;
    this.sprite.material.needsUpdate = true;
    if (previous) release(previous);
  }

  /** Re-labels (nick change, palette change) or re-renders for another quality; no-op when unchanged. */
  update(label: TagLabel, high: boolean): void {
    if (keyOf(label, high) === this._key) return;
    this._label = { ...label };
    this._high = high;
    this._apply();
  }

  dispose(): void {
    if (this._key) release(this._key);
    this._key = null;
    this.sprite.material.map = null;
    this.sprite.material.dispose();
    this.sprite.removeFromParent();
  }
}

interface Candidate {
  tag: NameTag | null;
  x: number;
  y: number;
  z: number;
  priority: number;
  dist: number;
  sx: number;
  sy: number;
}

/**
 * Per-frame layout of every tag: call `begin()`, `add()` for each character, then `resolve()`.
 * Allocation free after warm-up.
 */
export class NameTagLayer {
  private _pool: Candidate[] = [];
  private _used = 0;
  private _order: Candidate[] = [];
  private _boxes: number[] = [];
  private _v = new THREE.Vector3();
  private _shown: NameTag[] = [];

  begin(): void {
    this._used = 0;
  }

  add(tag: NameTag, x: number, y: number, z: number, priority: number, dist: number): void {
    let c = this._pool[this._used];
    if (!c) {
      c = { tag: null, x: 0, y: 0, z: 0, priority: 0, dist: 0, sx: 0, sy: 0 };
      this._pool[this._used] = c;
    }
    this._used++;
    c.tag = tag;
    c.x = x;
    c.y = y;
    c.z = z;
    c.priority = priority;
    c.dist = dist;
  }

  /** Hides everything (zoomed out / view inactive). */
  hideAll(): void {
    for (const t of this._shown) t.sprite.visible = false;
    this._shown.length = 0;
  }

  resolve(camera: THREE.Camera, width: number, height: number, ppu: number): void {
    // Hide what was drawn last frame; the winners are switched back on below
    this.hideAll();
    if (ppu < TAG_MIN_PPU || this._used === 0) return;
    const order = this._order;
    order.length = 0;
    for (let i = 0; i < this._used; i++) {
      const c = this._pool[i];
      this._v.set(c.x, c.y, c.z).project(camera);
      c.sx = (this._v.x * 0.5 + 0.5) * width;
      c.sy = (-this._v.y * 0.5 + 0.5) * height;
      const aspect = c.tag!.aspect;
      const halfW = (TAG_HEIGHT_PX * aspect) / 2;
      if (
        c.sx + halfW < -OFFSCREEN_MARGIN_PX ||
        c.sx - halfW > width + OFFSCREEN_MARGIN_PX ||
        c.sy < -OFFSCREEN_MARGIN_PX ||
        c.sy - TAG_HEIGHT_PX > height + OFFSCREEN_MARGIN_PX
      ) {
        continue;
      }
      order.push(c);
    }
    order.sort((a, b) => a.priority - b.priority || a.dist - b.dist);

    const boxes = this._boxes;
    boxes.length = 0;
    const h = TAG_HEIGHT_PX / ppu;
    let shown = 0;
    for (const c of order) {
      if (shown >= MAX_VISIBLE_TAGS) break;
      const tag = c.tag!;
      const halfW = (TAG_HEIGHT_PX * tag.aspect) / 2 + OVERLAP_PAD_PX;
      const l = c.sx - halfW;
      const r = c.sx + halfW;
      const t = c.sy - TAG_HEIGHT_PX - OVERLAP_PAD_PX;
      const b = c.sy + OVERLAP_PAD_PX;
      let hit = false;
      for (let i = 0; i < boxes.length; i += 4) {
        if (l < boxes[i + 2] && r > boxes[i] && t < boxes[i + 3] && b > boxes[i + 1]) {
          hit = true;
          break;
        }
      }
      if (hit) continue;
      boxes.push(l, t, r, b);
      shown++;
      tag.sprite.visible = true;
      tag.sprite.scale.set(h * tag.aspect, h, 1);
      tag.sprite.position.set(c.x, c.y, c.z);
      this._shown.push(tag);
    }
  }
}
