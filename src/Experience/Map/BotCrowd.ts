import * as THREE from 'three';
import type { StyleId } from '../World/styles/types.ts';
import { stepYaw } from '../Physics/steering.ts';
import { isCoarsePointer } from '../../utils/device.ts';
import { RobotActor } from './RobotActor.ts';
import { BOTS, botStatesAt, createBotSchedule } from './botSim.ts';
import type { BotSchedule, BotState } from './botSim.ts';
import { getRobotSkin } from './skins/robotSkins.ts';
import type { MapQuality, MapSkin } from './skins/index.ts';

// ---- Tunable constants
/** Visual scale of the bots (the player's robot is 1.4). */
export const BOT_SCALE = 1.1;
/** A bot greets the player when closer than this (world units)... */
export const WAVE_DISTANCE = 3;
/** ...at most once per this many seconds per bot. */
export const WAVE_COOLDOWN = 20;
const WAVE_SECONDS = 1.3;
const STEP_RATE = 2.2;
const BOUNCE_HEIGHT = 0.07;
const SWAY = 0.05;
const LEAN = 0.1;
const TURN_RATE = 8;
/** Name tags need this many pixels per world unit to be readable (hidden when zoomed further out). */
export const TAG_MIN_PPU = 9;
const TAG_HEIGHT_PX = 22 * (isCoarsePointer() ? 1.15 : 1);
const TAG_Y = 2.75;
const RING_Y = 0.4;
const RING_SIZE = 2.8;
const HEAD_Y = 1.1;

const DUST_POOL = 18;
const DUST_LIFE = 0.5;
const DUST_RATE = 5;
const DUST_WORLD_SIZE = 0.8;

const hexCss = (n: number): string => `#${n.toString(16).padStart(6, '0')}`;

function createTagTexture(name: string, accent: number, high: boolean): { texture: THREE.CanvasTexture; aspect: number } {
  const h = high ? 64 : 48;
  const font = `700 ${Math.round(h * 0.52)}px system-ui, -apple-system, "Segoe UI", sans-serif`;
  const measure = document.createElement('canvas').getContext('2d')!;
  measure.font = font;
  const textW = Math.ceil(measure.measureText(name).width);
  const pad = Math.round(h * 0.45);
  const w = textW + pad * 2;
  const canvas = document.createElement('canvas');
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d')!;
  ctx.font = font;
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  if (high) {
    // Pill with an accent dot
    ctx.fillStyle = 'rgba(14, 18, 28, 0.82)';
    ctx.beginPath();
    ctx.roundRect(2, 2, w - 4, h - 4, (h - 4) / 2);
    ctx.fill();
    ctx.strokeStyle = hexCss(accent);
    ctx.lineWidth = 3;
    ctx.stroke();
    ctx.fillStyle = '#ffffff';
    ctx.fillText(name, w / 2, h / 2 + 2);
  } else {
    // Low quality: plain outlined text
    ctx.lineJoin = 'round';
    ctx.lineWidth = 6;
    ctx.strokeStyle = 'rgba(14, 18, 28, 0.9)';
    ctx.strokeText(name, w / 2, h / 2 + 2);
    ctx.fillStyle = '#ffffff';
    ctx.fillText(name, w / 2, h / 2 + 2);
  }
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return { texture, aspect: w / h };
}

function createRingTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(64, 64, 20, 64, 64, 62);
  g.addColorStop(0, 'rgba(255,255,255,0)');
  g.addColorStop(0.55, 'rgba(255,255,255,0.0)');
  g.addColorStop(0.75, 'rgba(255,255,255,1)');
  g.addColorStop(0.9, 'rgba(255,255,255,0.35)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 128, 128);
  return new THREE.CanvasTexture(canvas);
}

function createPuffTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 64;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.45, 'rgba(255,255,255,0.5)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 64, 64);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

interface BotView {
  actor: RobotActor;
  tag: THREE.Sprite;
  tagAspect: number;
  ring: THREE.Mesh;
  heading: number;
  phase: number;
  motion: number;
  wave: number;
  lastWave: number;
  placed: boolean;
}

/**
 * The three wandering bots on the map: robots of the active style tinted with their own skin,
 * walk animation, name tags, a soft ring on the ground and (high quality) a little dust.
 * Their positions come from the deterministic `botSim`, never from local state.
 */
export class BotCrowd {
  readonly states: BotState[];

  private _parent: THREE.Object3D;
  private _schedule: BotSchedule = createBotSchedule();
  private _views: BotView[] = [];
  private _high = true;
  private _ringTexture = createRingTexture();
  private _ringGeometry = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
  private _puffTexture = createPuffTexture();
  private _dust: THREE.Points;
  private _dustPos = new Float32Array(DUST_POOL * 3);
  private _dustCol = new Float32Array(DUST_POOL * 4);
  private _dustAge = new Float32Array(DUST_POOL).fill(DUST_LIFE);
  private _dustVel = new Float32Array(DUST_POOL * 3);
  private _dustTint = new THREE.Color(1, 1, 1);
  private _dustNext = 0;
  private _dustCarry = 0;
  private _styleId: StyleId;
  private _shadows = false;

  constructor(parent: THREE.Object3D, styleId: StyleId, quality: MapQuality) {
    this._parent = parent;
    this._styleId = styleId;
    this._high = quality === 'high';
    this.states = botStatesAt(this._schedule, 0);

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(this._dustPos, 3).setUsage(THREE.DynamicDrawUsage));
    dustGeometry.setAttribute('color', new THREE.BufferAttribute(this._dustCol, 4).setUsage(THREE.DynamicDrawUsage));
    this._dust = new THREE.Points(dustGeometry, undefined);
    this._dust.frustumCulled = false;
    this._dust.renderOrder = 6;
    parent.add(this._dust);

    this._build();
  }

  private _build(): void {
    for (let i = 0; i < BOTS.length; i++) {
      const def = BOTS[i];
      const skin = getRobotSkin(def.skin);
      const actor = new RobotActor(this._parent, this._styleId, skin, BOT_SCALE);
      actor.setShadows(this._shadows);

      const { texture, aspect } = createTagTexture(def.name, skin.accent, this._high);
      const tag = new THREE.Sprite(
        new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false, depthTest: false, toneMapped: false }),
      );
      tag.center.set(0.5, 0);
      tag.renderOrder = 12;
      this._parent.add(tag);

      // Unlit-looking ground ring: black base color, accent emissive, soft alpha texture
      const ring = new THREE.Mesh(
        this._ringGeometry,
        new THREE.MeshStandardMaterial({
          color: 0x000000,
          emissive: skin.accent,
          emissiveIntensity: 1.2,
          alphaMap: this._ringTexture,
          transparent: true,
          opacity: 0.7,
          depthWrite: false,
          toneMapped: false,
        }),
      );
      ring.scale.setScalar(RING_SIZE);
      ring.renderOrder = 3;
      this._parent.add(ring);

      this._views.push({
        actor,
        tag,
        tagAspect: aspect,
        ring,
        heading: 0,
        phase: i * 1.7,
        motion: 0,
        wave: 0,
        lastWave: -Infinity,
        placed: false,
      });
    }
  }

  private _clear(): void {
    for (const v of this._views) {
      v.actor.dispose();
      v.tag.material.map?.dispose();
      v.tag.material.dispose();
      v.tag.removeFromParent();
      (v.ring.material as THREE.Material).dispose();
      v.ring.removeFromParent();
    }
    this._views = [];
  }

  /** Re-skin after a style change: the robots are rebuilt with the new style, bots keep their skins. */
  setStyle(styleId: StyleId): void {
    if (styleId === this._styleId) return;
    this._styleId = styleId;
    for (const v of this._views) v.actor.setStyle(styleId);
  }

  /** Quality changes the name tags (pill vs plain text) and the dust. */
  setQuality(quality: MapQuality): void {
    const high = quality === 'high';
    if (high === this._high) return;
    this._high = high;
    const wasPlaced = this._views.map((v) => ({ heading: v.heading, placed: v.placed }));
    this._clear();
    this._build();
    this._views.forEach((v, i) => Object.assign(v, wasPlaced[i]));
    if (!high) this._dustAge.fill(DUST_LIFE);
  }

  setShadows(enabled: boolean): void {
    this._shadows = enabled;
    for (const v of this._views) v.actor.setShadows(enabled);
  }

  /** Re-creates the style-dependent dust material (call after every map re-skin). */
  setMapSkin(skin: MapSkin): void {
    (this._dust.material as THREE.Material | undefined)?.dispose();
    const material = skin.createDustMaterial(this._puffTexture);
    this._dust.material = material;
    this._dustTint.setHex(material.color.getHex());
    material.color.set(0xffffff);
  }

  /** Makes bot `index` wave right now (e.g. when the player taps it). */
  wave(index: number, time: number): void {
    const v = this._views[index];
    if (!v) return;
    v.wave = WAVE_SECONDS;
    v.lastWave = time;
  }

  /**
   * @param timeMs shared clock (see `getSharedTimeMs`)
   * @param time local animation clock in seconds
   */
  update(
    dt: number,
    time: number,
    timeMs: number,
    ppu: number,
    reduceMotion: boolean,
    player: THREE.Vector3,
  ): void {
    botStatesAt(this._schedule, timeMs, this.states);
    const showTags = ppu >= TAG_MIN_PPU;

    for (let i = 0; i < this._views.length; i++) {
      const v = this._views[i];
      const s = this.states[i];
      const actor = v.actor;

      actor.setPosition(s.x, s.z);
      if (!v.placed) {
        v.heading = s.heading;
        v.placed = true;
      }
      v.heading = stepYaw(v.heading, s.heading, TURN_RATE, dt);
      actor.setHeading(v.heading);
      actor.update(time);

      // Walk cycle, blended in and out (the bot pauses at its destinations)
      const target = s.state === 'walking' ? 1 : 0;
      v.motion += (target - v.motion) * (1 - Math.exp(-8 * dt));
      if (v.motion > 0.02) v.phase += dt * Math.PI * 2 * STEP_RATE;
      const stride = Math.sin(v.phase);
      let bounce = reduceMotion ? 0 : Math.abs(stride) * BOUNCE_HEIGHT * v.motion;
      let sway = reduceMotion ? 0 : stride * SWAY * v.motion;
      let lean = LEAN * v.motion;
      let wobble = 0;

      // Greeting when the player passes close by
      if (v.wave <= 0 && time - v.lastWave >= WAVE_COOLDOWN && Math.hypot(player.x - s.x, player.z - s.z) < WAVE_DISTANCE) {
        v.wave = WAVE_SECONDS;
        v.lastWave = time;
      }
      if (v.wave > 0) {
        v.wave = Math.max(0, v.wave - dt);
        const w = v.wave / WAVE_SECONDS;
        const e = WAVE_SECONDS - v.wave;
        sway += Math.sin(e * 11) * 0.3 * w;
        wobble += Math.sin(e * 5.5) * 0.12 * w;
        lean *= 1 - w;
        if (!reduceMotion) bounce += Math.abs(Math.sin(e * 8)) * 0.1 * w;
      }

      const tilt = actor.tilt;
      const blend = 1 - Math.exp(-14 * dt);
      tilt.rotation.x += (lean - tilt.rotation.x) * blend;
      tilt.rotation.z += (sway - tilt.rotation.z) * blend;
      tilt.rotation.y += (wobble - tilt.rotation.y) * blend;
      const idle = v.motion < 0.05 && v.wave === 0 && !reduceMotion ? actor.idleBounce(time) : 0;
      tilt.position.y = bounce + idle;

      v.ring.position.set(s.x, RING_Y, s.z);

      // Name tag: constant size on screen, hidden when zoomed far out
      v.tag.visible = showTags;
      if (showTags) {
        const h = TAG_HEIGHT_PX / ppu;
        v.tag.scale.set(h * v.tagAspect, h, 1);
        v.tag.position.set(s.x, TAG_Y + bounce, s.z);
      }

      if (this._high && !reduceMotion && s.state === 'walking') this._carryDust(dt, s);
    }

    this._updateDust(dt, ppu);
  }

  private _carryDust(dt: number, s: BotState): void {
    this._dustCarry += dt * DUST_RATE;
    while (this._dustCarry >= 1) {
      this._dustCarry -= 1;
      const i = this._dustNext;
      this._dustNext = (this._dustNext + 1) % DUST_POOL;
      const h = s.heading;
      const side = (Math.random() - 0.5) * 0.5;
      this._dustPos[i * 3] = s.x - Math.sin(h) * 0.6 + Math.cos(h) * side;
      this._dustPos[i * 3 + 1] = 0.3;
      this._dustPos[i * 3 + 2] = s.z - Math.cos(h) * 0.6 - Math.sin(h) * side;
      this._dustVel[i * 3] = (Math.random() - 0.5) * 0.5;
      this._dustVel[i * 3 + 1] = 0.35 + Math.random() * 0.3;
      this._dustVel[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      this._dustAge[i] = 0;
    }
  }

  private _updateDust(dt: number, ppu: number): void {
    const material = this._dust.material as THREE.PointsMaterial | undefined;
    if (!material) return;
    material.size = DUST_WORLD_SIZE * ppu;
    this._dust.visible = this._high;
    if (!this._high) return;
    for (let i = 0; i < DUST_POOL; i++) {
      const age = this._dustAge[i];
      if (age >= DUST_LIFE) {
        this._dustCol[i * 4 + 3] = 0;
        continue;
      }
      const a = age + dt;
      this._dustAge[i] = a;
      this._dustPos[i * 3] += this._dustVel[i * 3] * dt;
      this._dustPos[i * 3 + 1] += this._dustVel[i * 3 + 1] * dt;
      this._dustPos[i * 3 + 2] += this._dustVel[i * 3 + 2] * dt;
      this._dustCol[i * 4] = this._dustTint.r;
      this._dustCol[i * 4 + 1] = this._dustTint.g;
      this._dustCol[i * 4 + 2] = this._dustTint.b;
      this._dustCol[i * 4 + 3] = (1 - Math.min(1, a / DUST_LIFE)) * 0.45;
    }
    (this._dust.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    (this._dust.geometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
  }

  /** Screen-space anchor of the bot (head height), for picking and the speech bubble. */
  headPosition(index: number, out: THREE.Vector3): THREE.Vector3 {
    const s = this.states[index];
    return out.set(s.x, HEAD_Y * BOT_SCALE + 0.9, s.z);
  }

  dispose(): void {
    this._clear();
    this._ringGeometry.dispose();
    this._ringTexture.dispose();
    this._puffTexture.dispose();
    this._dust.geometry.dispose();
    (this._dust.material as THREE.Material | undefined)?.dispose();
    this._dust.removeFromParent();
  }
}

