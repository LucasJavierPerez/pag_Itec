import * as THREE from 'three';
import { TAG_HEIGHT_PX, TAG_MIN_PPU } from './nameTag.ts';
import { wrapBubbleText } from './bubbleLayout.ts';

/**
 * Speech bubbles floating above the character that just wrote in the chat. One canvas-texture sprite
 * per live bubble (pool of MAX_BUBBLES, oldest evicted), textures cached by text with reference
 * counts. The sprites live in the map scene, are drawn above the name tags and never take input.
 * Nothing is allocated per frame.
 */

// ---- Tunable constants
/** How long a bubble stays (including both fades). */
export const BUBBLE_LIFETIME_MS = 5000;
export const BUBBLE_FADE_MS = 300;
/** Most bubbles alive at once. */
export const MAX_BUBBLES = 8;
/** Unused textures kept around for quick reuse before they are disposed. */
export const MAX_IDLE_TEXTURES = 12;
/** Bubbles are hidden below the zoom where name tags are hidden. */
export const BUBBLE_MIN_PPU = TAG_MIN_PPU;
/** Zoom (px per world unit) at which a bubble has its base size; it scales linearly within the clamps. */
const REFERENCE_PPU = 24;
const MIN_SCALE = 0.85;
const MAX_SCALE = 1.35;
/** Base font size in CSS px. */
const FONT_PX = 13;
/** Gap between the top of the name tag and the tail of the bubble, in CSS px. */
const TAG_GAP_PX = 5;

const SELF_KEY = '#self';

interface Texture {
  texture: THREE.CanvasTexture;
  /** width / height of the canvas. */
  aspect: number;
  /** Height in CSS px at scale 1. */
  heightPx: number;
  refs: number;
}

interface Slot {
  sprite: THREE.Sprite;
  material: THREE.SpriteMaterial;
  active: boolean;
  sender: string;
  self: boolean;
  born: number;
  key: string;
  tex: Texture | null;
}

/** Resolves where the head of a character is; returns false when that character is not drawn. */
export type HeadResolver = (id: string, self: boolean, out: THREE.Vector3) => boolean;

function dpr(): number {
  return Math.min(2, Math.max(1, typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1));
}

const FONT_FAMILY = 'system-ui, -apple-system, "Segoe UI", sans-serif';

function paintBubble(lines: string[], self: boolean): Omit<Texture, 'refs'> {
  const d = dpr();
  const u = Math.round(FONT_PX * d);
  const font = `700 ${u}px ${FONT_FAMILY}`;
  const measure = document.createElement('canvas').getContext('2d')!;
  measure.font = font;
  let textW = 0;
  for (const l of lines) textW = Math.max(textW, Math.ceil(measure.measureText(l).width));
  const padX = Math.round(u * 0.8);
  const padY = Math.round(u * 0.55);
  const lineH = Math.round(u * 1.28);
  const tail = Math.round(u * 0.6);
  const border = Math.max(2, Math.round(d * 1.5));
  const w = textW + padX * 2 + border * 2;
  const bodyH = lines.length * lineH + padY * 2;
  const h = bodyH + tail + border * 2;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  const r = Math.min(bodyH / 2, u * 0.9);
  const x0 = border;
  const y0 = border;
  const bw = w - border * 2;

  ctx.beginPath();
  ctx.roundRect(x0, y0, bw, bodyH, r);
  // Tail: a small triangle centred under the pill
  const cx = w / 2;
  ctx.moveTo(cx - tail * 0.8, y0 + bodyH - 1);
  ctx.lineTo(cx, y0 + bodyH + tail);
  ctx.lineTo(cx + tail * 0.8, y0 + bodyH - 1);
  ctx.closePath();
  ctx.fillStyle = self ? '#1f6fb0' : '#ffffff';
  ctx.fill();
  ctx.lineJoin = 'round';
  ctx.lineWidth = border;
  ctx.strokeStyle = self ? '#0e2f44' : 'rgba(14, 18, 28, 0.85)';
  ctx.stroke();

  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillStyle = self ? '#ffffff' : '#0e1220';
  for (let i = 0; i < lines.length; i++) {
    ctx.fillText(lines[i] as string, cx, y0 + padY + lineH * (i + 0.5) + 1);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.generateMipmaps = false;
  texture.minFilter = THREE.LinearFilter;
  return { texture, aspect: w / h, heightPx: h / d };
}

export class ChatBubbles {
  private _slots: Slot[] = [];
  private _parent: THREE.Object3D | null = null;
  private _cache = new Map<string, Texture>();
  private _resolve: HeadResolver | null = null;
  private _head = new THREE.Vector3();
  private _disposed = false;

  constructor() {
    for (let i = 0; i < MAX_BUBBLES; i++) {
      const material = new THREE.SpriteMaterial({ transparent: true, depthWrite: false, depthTest: false, toneMapped: false });
      const sprite = new THREE.Sprite(material);
      sprite.center.set(0.5, 0);
      sprite.renderOrder = 13;
      sprite.visible = false;
      this._slots.push({ sprite, material, active: false, sender: '', self: false, born: 0, key: '', tex: null });
    }
  }

  /** Adds the sprites to the scene (idempotent, so it is safe to call after every scene rebuild). */
  attach(parent: THREE.Object3D): void {
    this._parent = parent;
    for (const s of this._slots) if (s.sprite.parent !== parent) parent.add(s.sprite);
  }

  setHeadResolver(fn: HeadResolver): void {
    this._resolve = fn;
  }

  /** Shows (or replaces) the bubble of one sender. `id` is the peer id, `self` marks the local player. */
  show(id: string, self: boolean, text: string, nowMs: number): void {
    if (this._disposed || !this._parent) return;
    const resolve = this._resolve;
    if (resolve && !resolve(id, self, this._head)) return; // not rendered: skip silently
    const sender = self ? SELF_KEY : id;
    let slot: Slot | null = null;
    let oldest: Slot | null = null;
    let free: Slot | null = null;
    for (const s of this._slots) {
      if (s.active && s.sender === sender) {
        slot = s;
        break;
      }
      if (!s.active) free ??= s;
      else if (!oldest || s.born < oldest.born) oldest = s;
    }
    slot ??= free ?? oldest;
    if (!slot) return;
    this._release(slot);
    const lines = wrapBubbleText(text);
    if (lines.length === 0) {
      slot.active = false;
      slot.sprite.visible = false;
      return;
    }
    const key = `${self ? 's' : 'o'}|${lines.join('\n')}`;
    const tex = this._acquire(key, lines, self);
    slot.tex = tex;
    slot.key = key;
    slot.sender = sender;
    slot.self = self;
    slot.born = nowMs;
    slot.active = true;
    slot.material.map = tex.texture;
    slot.material.needsUpdate = true;
    slot.material.opacity = 0;
    slot.sprite.visible = false;
  }

  /** Per-frame placement and fading. */
  update(nowMs: number, ppu: number, reduceMotion: boolean): void {
    const show = ppu >= BUBBLE_MIN_PPU;
    const resolve = this._resolve;
    const k = Math.min(MAX_SCALE, Math.max(MIN_SCALE, ppu / REFERENCE_PPU));
    for (const s of this._slots) {
      if (!s.active) continue;
      const age = nowMs - s.born;
      if (age >= BUBBLE_LIFETIME_MS) {
        this._free(s);
        continue;
      }
      const tex = s.tex;
      if (!show || !tex || !resolve || !resolve(s.sender === SELF_KEY ? '' : s.sender, s.self, this._head)) {
        s.sprite.visible = false;
        continue;
      }
      let alpha = 1;
      if (!reduceMotion) alpha = Math.min(1, age / BUBBLE_FADE_MS, (BUBBLE_LIFETIME_MS - age) / BUBBLE_FADE_MS);
      s.material.opacity = alpha;
      const heightPx = tex.heightPx * k;
      const h = heightPx / ppu;
      s.sprite.scale.set(h * tex.aspect, h, 1);
      // Anchor below the sprite so the tail tip floats just above the name tag
      s.sprite.center.y = -(TAG_HEIGHT_PX + TAG_GAP_PX) / heightPx;
      s.sprite.position.copy(this._head);
      s.sprite.visible = true;
    }
  }

  /** Removes every live bubble (muting, leaving the tab). */
  clear(): void {
    for (const s of this._slots) if (s.active) this._free(s);
  }

  /** Drops the bubble of one sender (a peer that left). */
  remove(id: string, self = false): void {
    const sender = self ? SELF_KEY : id;
    for (const s of this._slots) if (s.active && s.sender === sender) this._free(s);
  }

  get activeCount(): number {
    let n = 0;
    for (const s of this._slots) if (s.active) n++;
    return n;
  }

  dispose(): void {
    this._disposed = true;
    for (const s of this._slots) {
      this._free(s);
      s.material.dispose();
      s.sprite.removeFromParent();
    }
    for (const t of this._cache.values()) t.texture.dispose();
    this._cache.clear();
  }

  // ---------------------------------------------------------------- texture cache
  private _acquire(key: string, lines: string[], self: boolean): Texture {
    let t = this._cache.get(key);
    if (t) {
      this._cache.delete(key); // refresh recency
    } else {
      t = { ...paintBubble(lines, self), refs: 0 };
    }
    this._cache.set(key, t);
    t.refs++;
    this._trim();
    return t;
  }

  private _release(slot: Slot): void {
    const t = slot.tex;
    slot.tex = null;
    if (t) {
      t.refs = Math.max(0, t.refs - 1);
      this._trim();
    }
  }

  private _free(slot: Slot): void {
    slot.active = false;
    slot.sprite.visible = false;
    slot.material.map = null;
    this._release(slot);
  }

  private _trim(): void {
    let idle = 0;
    for (const t of this._cache.values()) if (t.refs === 0) idle++;
    if (idle <= MAX_IDLE_TEXTURES) return;
    for (const [key, t] of this._cache) {
      if (idle <= MAX_IDLE_TEXTURES) break;
      if (t.refs > 0) continue;
      t.texture.dispose();
      this._cache.delete(key);
      idle--;
    }
  }
}

