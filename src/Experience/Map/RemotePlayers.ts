import * as THREE from 'three';
import type { StyleId } from '../World/styles/types.ts';
import { MAP_ROBOT_SCALE, RobotActor } from './RobotActor.ts';
import { createPuffTexture, createRingTexture } from './BotCrowd.ts';
import { NameTag, TAG_PRIORITY, tagHeight } from './nameTag.ts';
import type { NameTagLayer } from './nameTag.ts';
import { getRobotSkin } from './skins/robotSkins.ts';
import type { MapQuality, MapSkin } from './skins/index.ts';
import type { NetClient } from './net/NetClient.ts';
import { clock } from './net/clockSync.ts';
import { RENDER_DELAY_MS, SnapshotBuffer, createSample } from './net/interpolation.ts';
import type { Sample } from './net/interpolation.ts';
import type { CharacterId, PaletteId, Peer } from '../../../shared/protocol.ts';

// ---- Tunable constants
/** Remote characters drawn at full detail (the nearest ones to the local player). */
export const MAX_FULL_DETAIL = 24;
/** Remote characters drawn at all (the rest of a full room is simply not shown). */
export const MAX_REMOTE_VISIBLE = 40;
/** Nearest remotes that kick up dust. */
const DUST_NEAREST = 6;
/** How often the detail levels are re-ranked, seconds. */
const RERANK_SECONDS = 0.5;
/** A character that already is at full detail keeps it unless a challenger is this much closer. */
const LOD_HYSTERESIS = 3;
/** Below this zoom the limb animation is too small to see and is skipped. */
const MIN_ANIMATION_PPU = 8;
/** Offscreen margin (NDC) beyond which a remote is not updated nor drawn. */
const CULL_NDC = 1.35;
const RING_Y = 0.4;
const RING_SIZE = 2.5;
const RING_OPACITY = 0.4;

const STEP_RATE = 3.4;
const BOUNCE_HEIGHT = 0.11;
const LEAN = 0.2;
const SWAY = 0.09;

const DUST_POOL = 20;
const DUST_LIFE = 0.5;
const DUST_RATE = 6;
const DUST_WORLD_SIZE = 0.9;

type Detail = 'full' | 'low' | 'hidden';

interface Remote {
  id: string;
  nick: string;
  character: CharacterId;
  palette: PaletteId;
  actor: RobotActor;
  tag: NameTag;
  ring: THREE.Mesh;
  buffer: SnapshotBuffer;
  sample: Sample;
  teleports: number;
  x: number;
  z: number;
  heading: number;
  speed: number;
  phase: number;
  detail: Detail;
  onScreen: boolean;
  dist: number;
  score: number;
  placed: boolean;
}

/**
 * The other people in the room. Peers come from the `NetClient` events; each one is a character of
 * the shared builder driven by interpolated snapshots. Remote players are never raycast and never
 * intercept clicks: they only live in the scene graph as decoration.
 */
export class RemotePlayers {
  private _parent: THREE.Object3D;
  private _styleId: StyleId;
  private _quality: MapQuality;
  private _shadows = false;
  private _remotes = new Map<string, Remote>();
  private _list: Remote[] = [];
  private _net: NetClient | null = null;
  private _unsub: Array<() => void> = [];
  private _rerankIn = 0;

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
  private _v = new THREE.Vector3();

  constructor(parent: THREE.Object3D, styleId: StyleId, quality: MapQuality) {
    this._parent = parent;
    this._styleId = styleId;
    this._quality = quality;
    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(this._dustPos, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute('color', new THREE.BufferAttribute(this._dustCol, 4).setUsage(THREE.DynamicDrawUsage));
    this._dust = new THREE.Points(geometry, undefined);
    this._dust.frustumCulled = false;
    this._dust.renderOrder = 6;
    parent.add(this._dust);
  }

  /** Number of remote characters currently alive. */
  get count(): number {
    return this._remotes.size;
  }

  // ------------------------------------------------------------------ network binding
  bind(net: NetClient): void {
    this.unbind();
    this._net = net;
    this._unsub.push(
      net.on('welcome', (m) => {
        this.clear();
        const t = clock.targetNow() - 500;
        for (const p of m.peers) this._add(p, t);
      }),
      net.on('join', (p) => this._add(p, clock.targetNow() - 500)),
      net.on('leave', ({ id }) => this._remove(id)),
      net.on('state', ({ st, p }) => {
        const self = net.selfId;
        for (const [id, x, z, h, s] of p) {
          if (id === self) continue;
          this._remotes.get(id)?.buffer.push(st, x, z, h, s);
        }
      }),
      net.on('appearance', ({ id, character, palette }) => this._setAppearance(id, character, palette)),
      net.on('rename', ({ id, nick, self }) => {
        if (!self) this._rename(id, nick);
      }),
      net.on('status', ({ status }) => {
        if (status !== 'online') this.clear();
      }),
    );
  }

  unbind(): void {
    for (const off of this._unsub) off();
    this._unsub = [];
    this._net = null;
  }

  // ------------------------------------------------------------------ peers
  private _add(peer: Peer, t: number): void {
    if (!peer || peer.id === this._net?.selfId || this._remotes.has(peer.id)) return;
    const skin = getRobotSkin(peer.palette);
    const actor = new RobotActor(this._parent, this._styleId, skin, MAP_ROBOT_SCALE, peer.character, this._quality);
    actor.setShadows(false);
    const tag = new NameTag({ text: peer.nick, accent: skin.accent }, this._quality === 'high');
    this._parent.add(tag.sprite);
    const ring = new THREE.Mesh(
      this._ringGeometry,
      new THREE.MeshStandardMaterial({
        color: 0x000000,
        emissive: skin.accent,
        emissiveIntensity: 1.0,
        alphaMap: this._ringTexture,
        transparent: true,
        opacity: RING_OPACITY,
        depthWrite: false,
        toneMapped: false,
      }),
    );
    ring.scale.setScalar(RING_SIZE);
    ring.renderOrder = 3;
    ring.raycast = () => {}; // never pickable
    this._parent.add(ring);
    const buffer = new SnapshotBuffer();
    buffer.push(t, peer.x, peer.z, peer.h, peer.s);
    const remote: Remote = {
      id: peer.id,
      nick: peer.nick,
      character: peer.character,
      palette: peer.palette,
      actor,
      tag,
      ring,
      buffer,
      sample: createSample(),
      teleports: buffer.teleports,
      x: peer.x,
      z: peer.z,
      heading: peer.h,
      speed: 0,
      phase: Math.random() * Math.PI * 2,
      detail: 'hidden', // until the next ranking decides how much detail it gets
      onScreen: true,
      dist: 0,
      score: 0,
      placed: false,
    };
    actor.setPosition(peer.x, peer.z);
    actor.setHeading(peer.h);
    actor.holder.visible = false;
    this._remotes.set(peer.id, remote);
    this._list.push(remote);
    this._rerankIn = 0; // pick its detail level on the next frame
  }

  private _destroy(r: Remote): void {
    r.actor.dispose();
    r.tag.dispose();
    (r.ring.material as THREE.Material).dispose();
    r.ring.removeFromParent();
  }

  private _remove(id: string): void {
    const r = this._remotes.get(id);
    if (!r) return;
    this._remotes.delete(id);
    const i = this._list.indexOf(r);
    if (i >= 0) this._list.splice(i, 1);
    this._destroy(r);
  }

  private _setAppearance(id: string, character: CharacterId, palette: PaletteId): void {
    const r = this._remotes.get(id);
    if (!r) return;
    r.character = character;
    r.palette = palette;
    const skin = getRobotSkin(palette);
    r.actor.setSkin(skin);
    r.actor.setCharacter(character);
    (r.ring.material as THREE.MeshStandardMaterial).emissive.setHex(skin.accent);
    r.tag.update({ text: r.nick, accent: skin.accent }, this._quality === 'high');
  }

  private _rename(id: string, nick: string): void {
    const r = this._remotes.get(id);
    if (!r) return;
    r.nick = nick;
    r.tag.update({ text: nick, accent: getRobotSkin(r.palette).accent }, this._quality === 'high');
  }

  /** Removes every remote (going offline, welcome of a new room, style rebuild). */
  clear(): void {
    for (const r of this._list) this._destroy(r);
    this._list.length = 0;
    this._remotes.clear();
    this._dustAge.fill(DUST_LIFE);
  }

  // ------------------------------------------------------------------ appearance of the whole group
  /** The explorer style changed: rebuild every character with the new style. */
  setStyle(styleId: StyleId): void {
    if (styleId === this._styleId) return;
    this._styleId = styleId;
    for (const r of this._list) r.actor.setStyle(styleId);
  }

  setQuality(quality: MapQuality): void {
    if (quality === this._quality) return;
    this._quality = quality;
    const high = quality === 'high';
    for (const r of this._list) {
      r.tag.update({ text: r.nick, accent: getRobotSkin(r.palette).accent }, high);
      r.detail = 'hidden';
      r.actor.holder.visible = false;
    }
    if (!high) this._dustAge.fill(DUST_LIFE);
    this._rerankIn = 0;
  }

  setShadows(enabled: boolean): void {
    this._shadows = enabled;
    for (const r of this._list) r.actor.setShadows(enabled && r.detail === 'full');
  }

  /** Re-creates the style-dependent dust material (call after every map re-skin). */
  setMapSkin(skin: MapSkin): void {
    (this._dust.material as THREE.Material | undefined)?.dispose();
    const material = skin.createDustMaterial(this._puffTexture);
    this._dust.material = material;
    this._dustTint.setHex(material.color.getHex());
    material.color.set(0xffffff);
  }

  // ------------------------------------------------------------------ frame
  private _rerank(): void {
    const list = this._list;
    for (const r of list) r.score = r.dist - (r.detail === 'full' ? LOD_HYSTERESIS : 0);
    list.sort((a, b) => a.score - b.score);
    const lowOnly = this._quality === 'low';
    for (let i = 0; i < list.length; i++) {
      const r = list[i];
      const next: Detail = i >= MAX_REMOTE_VISIBLE ? 'hidden' : !lowOnly && i < MAX_FULL_DETAIL ? 'full' : 'low';
      if (next === r.detail) continue;
      const wasFull = r.detail === 'full';
      r.detail = next;
      r.actor.holder.visible = next !== 'hidden';
      if (next === 'hidden') continue;
      r.actor.setQuality(next === 'full' ? this._quality : 'low');
      if (wasFull !== (next === 'full')) r.actor.setShadows(this._shadows && next === 'full');
    }
  }

  update(
    dt: number,
    time: number,
    ppu: number,
    reduceMotion: boolean,
    player: THREE.Vector3,
    camera: THREE.Camera,
    tags: NameTagLayer,
  ): void {
    const list = this._list;
    const renderTime = clock.targetNow() - RENDER_DELAY_MS;
    const animate = ppu >= MIN_ANIMATION_PPU;
    const high = this._quality === 'high';

    for (const r of list) r.dist = Math.hypot(r.x - player.x, r.z - player.z);
    this._rerankIn -= dt;
    if (this._rerankIn <= 0) {
      this._rerankIn = RERANK_SECONDS;
      this._rerank();
    }

    let dustBudget = DUST_NEAREST;
    for (const r of list) {
      if (r.detail === 'hidden') {
        r.ring.visible = false;
        continue;
      }
      const s = r.buffer.sample(renderTime, r.sample);
      if (s.empty) continue;
      if (r.buffer.teleports !== r.teleports) {
        r.teleports = r.buffer.teleports;
        r.placed = false;
      }
      r.x = s.x;
      r.z = s.z;
      r.heading = s.h;
      if (!r.placed) {
        r.speed = s.s;
        r.placed = true;
      } else {
        r.speed += (s.s - r.speed) * (1 - Math.exp(-10 * dt));
      }

      // Frustum cull on the ground point (generous margin: characters and tags are tall)
      this._v.set(r.x, 0, r.z).project(camera);
      r.onScreen = Math.abs(this._v.x) <= CULL_NDC && Math.abs(this._v.y) <= CULL_NDC;
      r.actor.holder.visible = r.onScreen;
      r.ring.visible = r.onScreen;
      if (!r.onScreen) continue;

      const actor = r.actor;
      actor.setPosition(r.x, r.z);
      actor.setHeading(r.heading);
      actor.update(time);
      r.ring.position.set(r.x, RING_Y, r.z);

      const k = Math.min(1, r.speed);
      let bounce = 0;
      if (animate) {
        if (k > 0.02) r.phase += dt * Math.PI * 2 * STEP_RATE * (0.35 + 0.65 * k);
        const stride = Math.sin(r.phase);
        bounce = reduceMotion ? 0 : Math.abs(stride) * BOUNCE_HEIGHT * k;
        const sway = reduceMotion ? 0 : stride * SWAY * k;
        actor.setMotion({ speed01: k, phase: r.phase, reduced: reduceMotion });
        const tilt = actor.tilt;
        const blend = 1 - Math.exp(-14 * dt);
        tilt.rotation.x += (LEAN * k - tilt.rotation.x) * blend;
        tilt.rotation.z += (sway - tilt.rotation.z) * blend;
        const idle = k < 0.05 && !reduceMotion ? actor.idleBounce(time) : 0;
        tilt.position.y = bounce + idle;
        if (high && !reduceMotion && r.detail === 'full' && k > 0.4 && dustBudget > 0 && r.dist < 40) {
          dustBudget--;
          this._carryDust(dt, r);
        }
      }
      tags.add(r.tag, r.x, tagHeight(MAP_ROBOT_SCALE) + bounce, r.z, TAG_PRIORITY.remote, r.dist);
    }

    this._updateDust(dt, ppu, high);
  }

  private _carryDust(dt: number, r: Remote): void {
    this._dustCarry += dt * DUST_RATE;
    while (this._dustCarry >= 1) {
      this._dustCarry -= 1;
      const i = this._dustNext;
      this._dustNext = (this._dustNext + 1) % DUST_POOL;
      const h = r.heading;
      const side = (Math.random() - 0.5) * 0.5;
      this._dustPos[i * 3] = r.x - Math.sin(h) * 0.7 + Math.cos(h) * side;
      this._dustPos[i * 3 + 1] = 0.3;
      this._dustPos[i * 3 + 2] = r.z - Math.cos(h) * 0.7 - Math.sin(h) * side;
      this._dustVel[i * 3] = (Math.random() - 0.5) * 0.5;
      this._dustVel[i * 3 + 1] = 0.35 + Math.random() * 0.3;
      this._dustVel[i * 3 + 2] = (Math.random() - 0.5) * 0.5;
      this._dustAge[i] = 0;
    }
  }

  private _updateDust(dt: number, ppu: number, high: boolean): void {
    const material = this._dust.material as THREE.PointsMaterial | undefined;
    this._dust.visible = high && !!material;
    if (!material || !high) return;
    material.size = DUST_WORLD_SIZE * ppu;
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
      this._dustCol[i * 4 + 3] = (1 - Math.min(1, a / DUST_LIFE)) * 0.35;
    }
    (this._dust.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    (this._dust.geometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
  }

  dispose(): void {
    this.unbind();
    this.clear();
    this._ringGeometry.dispose();
    this._ringTexture.dispose();
    this._puffTexture.dispose();
    this._dust.geometry.dispose();
    (this._dust.material as THREE.Material | undefined)?.dispose();
    this._dust.removeFromParent();
  }
}
