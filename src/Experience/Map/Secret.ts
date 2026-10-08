import * as THREE from 'three';
import { MapBatch } from './MapBatch.ts';
import { ADA_SECRET } from './mapLayout.ts';
import type { MapQuality, MapSkin } from './skins/index.ts';

/**
 * The Ada Byron easter egg: a flat punched-card tile hidden behind the Secundario. It is not in
 * the legend, has no label and is never raycast (not clickable). Only a faint sparkle shows when
 * the player is within SPARKLE_DISTANCE; standing on the pad for DWELL_SECONDS plays a rain of
 * binary digits. No per-frame allocations: every buffer is created once.
 */

// ---- Tunable constants
export const SPARKLE_DISTANCE = 8;
/** The tile itself only fades in when the player is this close. */
export const TILE_REVEAL_DISTANCE = 5;
export const DWELL_SECONDS = 1.5;
const REARM_SECONDS = 2;
export const RAIN_SECONDS = 4;
export const RAIN_SECONDS_FOUND = 1.6;
/** Binary digits alive at once (per glyph): high / low quality. Low stays at 40 in total. */
const RAIN_PER_GLYPH_HIGH = 36;
const RAIN_PER_GLYPH_LOW = 20;
const RAIN_TOP = 6.5;
const RAIN_RADIUS = 3.4;
const SPARKLES = 10;
export const FOUND_STORAGE_KEY = 'itec-secret-ada';
/** Text whose ASCII bits are punched into the card. */
const CARD_TEXT = 'ADA BYRON';
const HOLE_PITCH = 0.3;

export function isAdaFound(): boolean {
  try {
    return localStorage.getItem(FOUND_STORAGE_KEY) === '1';
  } catch {
    return false;
  }
}

export function markAdaFound(): void {
  try {
    localStorage.setItem(FOUND_STORAGE_KEY, '1');
  } catch {
    // ignore persistence failures
  }
}

function glyphTexture(glyph: string): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  ctx.font = '700 52px ui-monospace, "SFMono-Regular", Menlo, Consolas, monospace';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.shadowColor = 'rgba(160, 255, 235, 0.9)';
  ctx.shadowBlur = 8;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(glyph, 32, 36);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

function sparkTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 32;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(16, 16, 0, 16, 16, 16);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(255,240,180,0.6)');
  g.addColorStop(1, 'rgba(255,240,180,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 32, 32);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** One pool of falling glyphs sharing a texture (a Points object per glyph keeps it to 2 draw calls). */
class GlyphRain {
  readonly points: THREE.Points;
  private _n: number;
  private _pos: Float32Array;
  private _col: Float32Array;
  private _life: Float32Array;
  private _age: Float32Array;
  private _speed: Float32Array;
  private _texture: THREE.CanvasTexture;
  private _material: THREE.PointsMaterial;
  private _tint = new THREE.Color(0x7fffd4);

  constructor(glyph: string, count: number, tint: number) {
    this._n = count;
    this._pos = new Float32Array(count * 3);
    this._col = new Float32Array(count * 4);
    this._life = new Float32Array(count).fill(0);
    this._age = new Float32Array(count).fill(0);
    this._speed = new Float32Array(count);
    this._tint.setHex(tint);
    this._texture = glyphTexture(glyph);
    this._material = new THREE.PointsMaterial({
      map: this._texture,
      size: 24,
      sizeAttenuation: false,
      vertexColors: true,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(this._pos, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute('color', new THREE.BufferAttribute(this._col, 4).setUsage(THREE.DynamicDrawUsage));
    this.points = new THREE.Points(geometry, this._material);
    this.points.frustumCulled = false;
    this.points.renderOrder = 14;
    this.points.visible = false;
  }

  get alive(): boolean {
    for (let i = 0; i < this._n; i++) if (this._age[i] < this._life[i]) return true;
    return false;
  }

  update(dt: number, spawn: boolean, cx: number, cz: number, sizePx: number): void {
    this._material.size = sizePx;
    let any = false;
    for (let i = 0; i < this._n; i++) {
      if (this._age[i] >= this._life[i]) {
        if (!spawn) {
          this._col[i * 4 + 3] = 0;
          continue;
        }
        // Respawn near the top at a random place around the robot
        const a = Math.random() * Math.PI * 2;
        const r = Math.sqrt(Math.random()) * RAIN_RADIUS;
        this._pos[i * 3] = cx + Math.cos(a) * r;
        this._pos[i * 3 + 1] = RAIN_TOP * (0.7 + Math.random() * 0.3);
        this._pos[i * 3 + 2] = cz + Math.sin(a) * r;
        this._speed[i] = 4 + Math.random() * 3;
        this._life[i] = this._pos[i * 3 + 1] / this._speed[i];
        this._age[i] = 0;
      }
      this._age[i] += dt;
      this._pos[i * 3 + 1] -= this._speed[i] * dt;
      const t = Math.min(1, this._age[i] / this._life[i]);
      const fade = Math.min(1, t / 0.15) * Math.min(1, (1 - t) / 0.3);
      this._col[i * 4] = this._tint.r;
      this._col[i * 4 + 1] = this._tint.g;
      this._col[i * 4 + 2] = this._tint.b;
      this._col[i * 4 + 3] = Math.max(0, fade) * 0.9;
      any = true;
    }
    this.points.visible = any;
    (this.points.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    (this.points.geometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
  }

  dispose(): void {
    this.points.geometry.dispose();
    this._material.dispose();
    this._texture.dispose();
    this.points.removeFromParent();
  }
}

export class SecretSpot {
  readonly root = new THREE.Group();

  private _tile: THREE.Mesh;
  private _litMaterial: THREE.Material;
  private _sparkles: THREE.Points;
  private _sparkMaterial: THREE.PointsMaterial;
  private _sparkTexture = sparkTexture();
  private _sparkPos = new Float32Array(SPARKLES * 3);
  private _sparkPhase = new Float32Array(SPARKLES);
  private _rain: GlyphRain[];
  private _found: boolean;
  private _dwell = 0;
  private _armed = true;
  private _away = 0;
  private _rainLeft = 0;
  private _reveal = 0;

  /**
   * @param found the secret was already discovered in an earlier visit (dimmer sparkle, shorter rain)
   */
  constructor(skin: MapSkin, quality: MapQuality, found: boolean) {
    this._found = found;
    const cinematic = skin.id === 'cinematic';
    const pal = skin.palette;

    // ---- Punched card: a thin cream slab with a grid of holes encoding "ADA BYRON" in ASCII
    const b = new MapBatch({ voxel: skin.voxel, flat: skin.flat });
    const cols = CARD_TEXT.length;
    const rows = 7;
    const w = cols * HOLE_PITCH + 0.7;
    const d = rows * HOLE_PITCH + 0.6;
    const card = cinematic ? 0x1f3a5c : 0xefe6c8;
    const hole = cinematic ? 0x7fe6ff : pal.trim;
    b.box(0, 0.1, 0, w, 0.12, d, card, { solid: true, glow: cinematic ? 0.25 : 0 });
    const seg = skin.flat ? 6 : 12;
    for (let c = 0; c < cols; c++) {
      const code = CARD_TEXT.charCodeAt(c);
      for (let r = 0; r < rows; r++) {
        if (!((code >> (6 - r)) & 1)) continue;
        const x = (c - (cols - 1) / 2) * HOLE_PITCH;
        const z = (r - (rows - 1) / 2) * HOLE_PITCH;
        if (skin.voxel) b.box(x, 0.175, z, 0.2, 0.03, 0.2, hole, { solid: true });
        else b.cyl(x, 0.175, z, 0.085, 0.085, 0.03, hole, seg, cinematic ? 0.9 : 0);
      }
    }
    // The classic cut corner
    b.box(-w / 2 + 0.2, 0.175, -d / 2 + 0.2, 0.3, 0.03, 0.3, hole, { solid: true, glow: cinematic ? 0.5 : 0 });

    this._litMaterial = skin.createLitMaterial();
    this._tile = new THREE.Mesh(b.toGeometry(), this._litMaterial);
    this._tile.receiveShadow = false;
    this._tile.visible = false;
    this.root.add(this._tile);
    this.root.position.set(ADA_SECRET.x, 0, ADA_SECRET.z);

    // ---- Sparkle: a few additive points that drift upwards
    const sparkGeometry = new THREE.BufferGeometry();
    sparkGeometry.setAttribute('position', new THREE.BufferAttribute(this._sparkPos, 3).setUsage(THREE.DynamicDrawUsage));
    this._sparkMaterial = new THREE.PointsMaterial({
      map: this._sparkTexture,
      color: 0xfff0b0,
      size: 14,
      sizeAttenuation: false,
      transparent: true,
      opacity: 0,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    this._sparkles = new THREE.Points(sparkGeometry, this._sparkMaterial);
    this._sparkles.frustumCulled = false;
    this._sparkles.renderOrder = 13;
    this._sparkles.visible = false;
    this.root.add(this._sparkles);
    for (let i = 0; i < SPARKLES; i++) this._sparkPhase[i] = (i * 0.6180339) % 1;

    // ---- Binary rain
    const per = quality === 'high' ? RAIN_PER_GLYPH_HIGH : RAIN_PER_GLYPH_LOW;
    this._rain = [new GlyphRain('0', per, 0x7fffd4), new GlyphRain('1', per, 0xb6ffe8)];
    // The rain lives in world coordinates: cancel the pad offset of its parent
    for (const r of this._rain) {
      r.points.position.set(-ADA_SECRET.x, 0, -ADA_SECRET.z);
      this.root.add(r.points);
    }
  }

  /** Marks the secret as discovered: the sparkle gets dimmer and later rains are shorter. */
  setFound(found: boolean): void {
    this._found = found;
  }

  /** Starts the binary rain (`reduceMotion`: nothing falls, the card alone tells the story). */
  playRain(reduceMotion: boolean): void {
    if (reduceMotion) return;
    this._rainLeft = this._found ? RAIN_SECONDS_FOUND : RAIN_SECONDS;
  }

  /**
   * @returns true on the frame the player completes the dwell on the pad (once per visit to the pad)
   */
  update(dt: number, time: number, ppu: number, px: number, pz: number, reduceMotion: boolean): boolean {
    const dx = px - ADA_SECRET.x;
    const dz = pz - ADA_SECRET.z;
    const dist = Math.hypot(dx, dz);

    // Tile: only appears when you are close
    const wantReveal = dist < TILE_REVEAL_DISTANCE ? 1 : 0;
    this._reveal += (wantReveal - this._reveal) * (1 - Math.exp(-6 * dt));
    this._tile.visible = this._reveal > 0.02;
    if (this._tile.visible) {
      const s = 0.3 + 0.7 * this._reveal;
      this._tile.scale.set(s, this._reveal, s);
    }

    // Sparkle: fades in between SPARKLE_DISTANCE and 3 units, dimmer once discovered
    const near = Math.max(0, Math.min(1, (SPARKLE_DISTANCE - dist) / (SPARKLE_DISTANCE - 3)));
    const base = this._found ? 0.3 : 0.75;
    this._sparkMaterial.opacity = near * base;
    this._sparkles.visible = near > 0.01;
    if (this._sparkles.visible) {
      this._sparkMaterial.size = Math.max(8, Math.min(26, ppu * 0.5));
      // Reduced motion: the sparkle holds still instead of drifting
      const clock = reduceMotion ? 0 : time;
      for (let i = 0; i < SPARKLES; i++) {
        const t = (clock * 0.18 + this._sparkPhase[i]) % 1;
        const a = this._sparkPhase[i] * Math.PI * 2 * 5 + clock * 0.3;
        const r = 0.35 + 1.1 * ((this._sparkPhase[i] * 7) % 1);
        this._sparkPos[i * 3] = Math.cos(a) * r;
        this._sparkPos[i * 3 + 1] = 0.25 + t * 1.7;
        this._sparkPos[i * 3 + 2] = Math.sin(a) * r;
      }
      (this._sparkles.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    }

    // Dwell trigger
    let fired = false;
    if (dist <= ADA_SECRET.radius) {
      this._away = 0;
      if (this._armed) {
        this._dwell += dt;
        if (this._dwell >= DWELL_SECONDS) {
          this._armed = false;
          this._dwell = 0;
          fired = true;
        }
      }
    } else {
      this._dwell = 0;
      this._away += dt;
      if (this._away > REARM_SECONDS) this._armed = true;
    }

    // Rain
    const raining = this._rainLeft > 0;
    if (raining) this._rainLeft = Math.max(0, this._rainLeft - dt);
    const size = Math.max(12, Math.min(34, ppu * 0.85));
    for (const r of this._rain) {
      if (!raining && !r.points.visible) continue;
      r.update(dt, raining, ADA_SECRET.x, ADA_SECRET.z, size);
    }
    return fired;
  }

  dispose(): void {
    this._tile.geometry.dispose();
    this._litMaterial.dispose();
    this._sparkles.geometry.dispose();
    this._sparkMaterial.dispose();
    this._sparkTexture.dispose();
    for (const r of this._rain) r.dispose();
    this.root.removeFromParent();
  }
}
