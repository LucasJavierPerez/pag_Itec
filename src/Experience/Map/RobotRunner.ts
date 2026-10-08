import * as THREE from 'three';
import { makePolyline, routeFrom, sampleAt, segmentIndexAt, snapToGraph } from './roadGraph.ts';
import type { Point2, Polyline, RoadGraph } from './roadGraph.ts';
import type { RobotActor } from './RobotActor.ts';
import type { MapSkin } from './skins/index.ts';

// ---- Tunable run constants
/** Top speed in world units per second. */
export const RUN_SPEED = 10;
/** Acceleration / braking in units per second squared (easing at start and end). */
const ACCEL = 24;
const ACCEL_REDUCED = 90;
/** Steering damping (higher turns faster). */
const TURN_DAMPING = 11;
/** Speed multiplier lost at a sharp 90 degree corner. */
const CORNER_SLOWDOWN = 0.5;
/** Distance before a corner where the robot starts slowing down. */
const CORNER_LOOKAHEAD = 3;
const MIN_SPEED = 0.8;
/** Steps per second at top speed. */
const STEP_RATE = 3.4;
const BOUNCE_HEIGHT = 0.13;
const LEAN = 0.24;
const SWAY = 0.1;
const WAVE_SECONDS = 1.5;

// Route ribbon
const PATH_Y = 0.32;
const PATH_WIDTH = 0.55;
const DASH_LENGTH = 1.1;
const MAX_PATH_POINTS = 48;

// Dust puffs
const DUST_POOL = 36;
const DUST_LIFE = 0.55;
const DUST_RATE = 26;
const DUST_WORLD_SIZE = 1.1;

export type RunnerState = 'idle' | 'running' | 'arrived';

export interface RunnerEvents {
  /** The robot stopped at the end of the route that was started for `pointId`. */
  onArrive(pointId: string): void;
}

function createDashTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 16;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, 64, 16);
  const g = ctx.createLinearGradient(0, 0, 0, 16);
  g.addColorStop(0, '#000');
  g.addColorStop(0.25, '#fff');
  g.addColorStop(0.75, '#fff');
  g.addColorStop(1, '#000');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, 38, 16);
  const texture = new THREE.CanvasTexture(canvas);
  texture.wrapS = THREE.RepeatWrapping;
  return texture;
}

function createPuffTexture(): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = 64;
  canvas.height = 64;
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

function shortestAngle(from: number, to: number): number {
  let d = (to - from) % (Math.PI * 2);
  if (d > Math.PI) d -= Math.PI * 2;
  if (d < -Math.PI) d += Math.PI * 2;
  return d;
}

/**
 * Drives the robot along the road graph: shortest-path routing from wherever it currently is,
 * eased speed, damped steering, run animation, dust puffs and the shrinking route line.
 */
export class RobotRunner {
  state: RunnerState = 'idle';
  targetId: string | null = null;

  private _actor: RobotActor;
  private _graph: RoadGraph;
  private _events: RunnerEvents;
  private _root: THREE.Group;
  private _line: Polyline | null = null;
  private _dist = 0;
  private _speed = 0;
  private _heading = 0;
  private _phase = 0;
  private _turnRate = 0;
  private _wave = 0;
  private _face: Point2 | null = null;
  /** True while the player drives the robot (WASD / joystick); the road run is then off. */
  private _manual = false;

  private _dashTexture = createDashTexture();
  private _puffTexture = createPuffTexture();
  private _ribbon: THREE.Mesh;
  private _ribbonPos: Float32Array;
  private _ribbonUv: Float32Array;
  private _ribbonMaterial: THREE.Material | null = null;
  private _dust: THREE.Points;
  private _dustPos = new Float32Array(DUST_POOL * 3);
  private _dustCol = new Float32Array(DUST_POOL * 4);
  private _dustAge = new Float32Array(DUST_POOL).fill(DUST_LIFE);
  private _dustVel = new Float32Array(DUST_POOL * 3);
  private _dustTint = new THREE.Color(1, 1, 1);
  private _dustNext = 0;
  private _dustCarry = 0;
  private _accent = new THREE.Color('#ffffff');

  constructor(actor: RobotActor, graph: RoadGraph, parent: THREE.Object3D, events: RunnerEvents) {
    this._actor = actor;
    this._graph = graph;
    this._events = events;
    this._root = new THREE.Group();
    parent.add(this._root);

    const geometry = new THREE.BufferGeometry();
    this._ribbonPos = new Float32Array(MAX_PATH_POINTS * 2 * 3);
    this._ribbonUv = new Float32Array(MAX_PATH_POINTS * 2 * 2);
    geometry.setAttribute('position', new THREE.BufferAttribute(this._ribbonPos, 3).setUsage(THREE.DynamicDrawUsage));
    geometry.setAttribute('uv', new THREE.BufferAttribute(this._ribbonUv, 2).setUsage(THREE.DynamicDrawUsage));
    const index: number[] = [];
    for (let i = 0; i < MAX_PATH_POINTS - 1; i++) {
      const a = i * 2;
      index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
    }
    geometry.setIndex(index);
    geometry.setDrawRange(0, 0);
    this._ribbon = new THREE.Mesh(geometry, undefined);
    this._ribbon.frustumCulled = false;
    this._ribbon.renderOrder = 4;
    this._ribbon.visible = false;
    this._root.add(this._ribbon);

    const dustGeometry = new THREE.BufferGeometry();
    dustGeometry.setAttribute('position', new THREE.BufferAttribute(this._dustPos, 3).setUsage(THREE.DynamicDrawUsage));
    dustGeometry.setAttribute('color', new THREE.BufferAttribute(this._dustCol, 4).setUsage(THREE.DynamicDrawUsage));
    this._dust = new THREE.Points(dustGeometry, undefined);
    this._dust.frustumCulled = false;
    this._dust.renderOrder = 6;
    this._root.add(this._dust);
  }

  /** Re-creates the materials that depend on the visual style (call after every re-skin). */
  setSkin(skin: MapSkin): void {
    this._ribbonMaterial?.dispose();
    this._ribbonMaterial = skin.createPathMaterial(this._accent.getHex(), this._dashTexture);
    this._ribbon.material = this._ribbonMaterial;
    this._applyAccent();

    (this._dust.material as THREE.Material | undefined)?.dispose();
    const dustMaterial = skin.createDustMaterial(this._puffTexture);
    this._dust.material = dustMaterial;
    this._dustTint.setHex(dustMaterial.color.getHex());
    dustMaterial.color.set(0xffffff);
  }

  private _applyAccent(): void {
    const m = this._ribbonMaterial as THREE.MeshBasicMaterial | THREE.MeshStandardMaterial | null;
    if (!m) return;
    m.color.copy(this._accent);
    if ('emissive' in m) m.emissive.copy(this._accent);
  }

  get running(): boolean {
    return this.state === 'running';
  }

  get speed(): number {
    return this._speed;
  }

  get heading(): number {
    return this._heading;
  }

  get manual(): boolean {
    return this._manual;
  }

  /** Stops the current run at once (route line included); the robot keeps its position. */
  cancelRun(): void {
    if (this.state === 'running') this.state = 'idle';
    this._line = null;
    this.targetId = null;
    this._face = null;
    this._ribbon.visible = false;
    this._ribbon.geometry.setDrawRange(0, 0);
  }

  /**
   * Per-frame pose of the robot while the player drives it: the position is set by the caller,
   * the runner only mirrors speed/heading so the run animation and dust keep working.
   */
  driveManual(speed: number, heading: number, turnRate: number): void {
    if (!this._manual) {
      this.cancelRun();
      this.state = 'idle';
      this._manual = true;
      this._wave = 0;
    }
    this._speed = speed;
    this._heading = heading;
    this._turnRate = turnRate;
    this._actor.setHeading(heading);
  }

  endManual(): void {
    this._manual = false;
    this._speed = 0;
    this._turnRate = 0;
  }

  /** True when the robot is parked within `radius` of (x, z). */
  isParkedAt(x: number, z: number, radius = 0.4): boolean {
    if (this.state === 'running') return false;
    const p = this._actor.position;
    return Math.hypot(p.x - x, p.z - z) <= radius;
  }

  /**
   * Starts (or re-routes) a run to the stop node of `pointId`. Returns false when no route exists.
   * Speed and heading carry over, so re-routing mid-run never teleports or snaps the robot.
   */
  runTo(pointId: string, stopNodeId: string, accent: string, face?: Point2): boolean {
    const p = this._actor.position;
    const snap = snapToGraph(this._graph, p.x, p.z);
    const route = routeFrom(this._graph, snap, stopNodeId);
    if (!route || route.points.length < 2) return false;
    // Standing beside the road (free movement): walk to the road first instead of jumping onto it
    if (snap.dist > 0.05) route.points.unshift({ x: p.x, z: p.z });
    if (this._manual) this.endManual();

    this._line = makePolyline(route.points);
    this._dist = 0;
    this.targetId = pointId;
    this._face = face ?? null;
    this.state = 'running';
    this._wave = 0;
    this._accent.set(accent);
    this._applyAccent();
    if (this._speed === 0) this._heading = this._actor.holder.rotation.y;
    this._ribbon.visible = true;
    return true;
  }

  update(dt: number, time: number, ppu: number, reduceMotion: boolean): void {
    if (this._manual) {
      // Pose is driven from outside (see driveManual)
    } else if (this.state === 'running' && this._line) this._advance(dt, reduceMotion);
    else if (this.state === 'arrived') this._faceLandmark(dt);

    this._animate(dt, time, reduceMotion);
    this._updateDust(dt, ppu, reduceMotion);
    this._updateRibbon();
  }

  private _advance(dt: number, reduceMotion: boolean): void {
    const line = this._line!;
    const remaining = line.length - this._dist;
    const accel = reduceMotion ? ACCEL_REDUCED : ACCEL;

    // Brake so that the speed reaches zero exactly at the end of the route
    let target = Math.min(RUN_SPEED, Math.sqrt(2 * accel * Math.max(remaining, 0)));

    // Slow down for corners
    const seg = segmentIndexAt(line, this._dist);
    const toCorner = line.cum[seg + 1] - this._dist;
    if (seg + 2 < line.points.length && toCorner < CORNER_LOOKAHEAD) {
      const a = line.points[seg];
      const b = line.points[seg + 1];
      const c = line.points[seg + 2];
      const h1 = Math.atan2(b.x - a.x, b.z - a.z);
      const h2 = Math.atan2(c.x - b.x, c.z - b.z);
      const sharp = Math.min(1, Math.abs(shortestAngle(h1, h2)) / (Math.PI / 2));
      target *= 1 - CORNER_SLOWDOWN * sharp * (1 - toCorner / CORNER_LOOKAHEAD);
    }
    target = Math.max(target, remaining > 0.05 ? MIN_SPEED : 0);

    const dv = target - this._speed;
    this._speed += Math.max(-accel * dt, Math.min(accel * dt, dv));
    this._dist = Math.min(line.length, this._dist + this._speed * dt);

    const here = sampleAt(line, this._dist);
    const ahead = sampleAt(line, Math.min(line.length, this._dist + 0.9));
    const wanted = Math.atan2(ahead.x - here.x, ahead.z - here.z);
    const diff = shortestAngle(this._heading, wanted);
    const step = diff * (1 - Math.exp(-TURN_DAMPING * dt));
    this._heading += step;
    this._turnRate = dt > 0 ? step / dt : 0;

    this._actor.setPosition(here.x, here.z);
    this._actor.setHeading(this._heading);

    if (this._dist >= line.length - 1e-3) this._arrive();
  }

  private _arrive(): void {
    this.state = 'arrived';
    this._speed = 0;
    this._turnRate = 0;
    this._line = null;
    this._wave = WAVE_SECONDS;
    this._ribbon.visible = false;
    const id = this.targetId;
    if (id) this._events.onArrive(id);
  }

  /** After arriving the robot turns to face the landmark it came for. */
  private _faceLandmark(dt: number): void {
    if (!this._face) return;
    const p = this._actor.position;
    const wanted = Math.atan2(this._face.x - p.x, this._face.z - p.z);
    this._heading += shortestAngle(this._heading, wanted) * (1 - Math.exp(-TURN_DAMPING * 0.6 * dt));
    this._actor.setHeading(this._heading);
  }

  private _animate(dt: number, time: number, reduceMotion: boolean): void {
    const tilt = this._actor.tilt;
    const k = Math.min(1, this._speed / RUN_SPEED);

    if (this._speed > 0.05) {
      this._phase += dt * Math.PI * 2 * STEP_RATE * (0.35 + 0.65 * k);
    }
    const stride = Math.sin(this._phase);
    const bounce = reduceMotion ? 0 : Math.abs(stride) * BOUNCE_HEIGHT * k;
    const bank = Math.max(-0.2, Math.min(0.2, -this._turnRate * 0.04));

    let lean = LEAN * k;
    let sway = (reduceMotion ? 0 : stride * SWAY * k) + bank * k;
    let wobble = reduceMotion ? 0 : Math.sin(this._phase * 2) * 0.05 * k;
    let squash = 0;

    if (this._wave > 0 && this.state === 'arrived') {
      this._wave = Math.max(0, this._wave - dt);
      const w = this._wave / WAVE_SECONDS;
      // "Hello": rock side to side and hop, fading out
      sway += Math.sin((WAVE_SECONDS - this._wave) * 11) * 0.3 * w;
      lean *= 0;
      wobble += Math.sin((WAVE_SECONDS - this._wave) * 5.5) * 0.12 * w;
      squash = reduceMotion ? 0 : Math.abs(Math.sin((WAVE_SECONDS - this._wave) * 8)) * 0.12 * w;
    }

    // Characters swing their limbs with the same stride phase and greeting as the robot rocks
    this._actor.setMotion({
      speed01: k,
      wave: this._wave > 0 && this.state === 'arrived' ? Math.min(1, (this._wave / WAVE_SECONDS) * 3) : 0,
      phase: this._phase,
      reduced: reduceMotion,
    });

    // Damped so the pose blends between running, waving and idle
    const blend = 1 - Math.exp(-16 * dt);
    tilt.rotation.x += (lean - tilt.rotation.x) * blend;
    tilt.rotation.z += (sway - tilt.rotation.z) * blend;
    tilt.rotation.y += (wobble - tilt.rotation.y) * blend;

    const idleBob = this._speed < 0.05 && this._wave === 0 && !reduceMotion ? this._actor.idleBounce(time) : 0;
    tilt.position.y = bounce + idleBob + squash;
  }

  private _updateDust(dt: number, ppu: number, reduceMotion: boolean): void {
    const material = this._dust.material as THREE.PointsMaterial | undefined;
    if (!material) return;
    material.size = DUST_WORLD_SIZE * ppu;

    // Emit behind the robot while it runs fast
    if (!reduceMotion && this._speed > 3 && (this.state === 'running' || this._manual)) {
      this._dustCarry += dt * DUST_RATE * Math.min(1, this._speed / RUN_SPEED);
      while (this._dustCarry >= 1) {
        this._dustCarry -= 1;
        this._emitPuff();
      }
    }

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
      const life = Math.min(1, a / DUST_LIFE);
      this._dustCol[i * 4] = this._dustTint.r;
      this._dustCol[i * 4 + 1] = this._dustTint.g;
      this._dustCol[i * 4 + 2] = this._dustTint.b;
      this._dustCol[i * 4 + 3] = (1 - life) * 0.55;
    }
    (this._dust.geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    (this._dust.geometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
  }

  private _emitPuff(): void {
    const i = this._dustNext;
    this._dustNext = (this._dustNext + 1) % DUST_POOL;
    const p = this._actor.position;
    const h = this._heading;
    const back = 0.9;
    const side = (Math.random() - 0.5) * 0.7;
    this._dustPos[i * 3] = p.x - Math.sin(h) * back + Math.cos(h) * side;
    this._dustPos[i * 3 + 1] = 0.3;
    this._dustPos[i * 3 + 2] = p.z - Math.cos(h) * back - Math.sin(h) * side;
    this._dustVel[i * 3] = -Math.sin(h) * 0.8 + (Math.random() - 0.5) * 0.8;
    this._dustVel[i * 3 + 1] = 0.5 + Math.random() * 0.5;
    this._dustVel[i * 3 + 2] = -Math.cos(h) * 0.8 + (Math.random() - 0.5) * 0.8;
    this._dustAge[i] = 0;
  }

  /** Rebuilds the ribbon from the robot's current position to the end of the route. */
  private _updateRibbon(): void {
    const line = this._line;
    if (!line || this.state !== 'running') return;
    const geometry = this._ribbon.geometry;
    const here = sampleAt(line, this._dist);
    const seg = segmentIndexAt(line, this._dist);
    const pts: { x: number; z: number; d: number }[] = [{ x: here.x, z: here.z, d: this._dist }];
    for (let i = seg + 1; i < line.points.length && pts.length < MAX_PATH_POINTS; i++) {
      pts.push({ x: line.points[i].x, z: line.points[i].z, d: line.cum[i] });
    }
    if (pts.length < 2) {
      geometry.setDrawRange(0, 0);
      return;
    }

    for (let i = 0; i < pts.length; i++) {
      const prev = pts[Math.max(0, i - 1)];
      const next = pts[Math.min(pts.length - 1, i + 1)];
      let dx = next.x - prev.x;
      let dz = next.z - prev.z;
      const len = Math.hypot(dx, dz) || 1;
      dx /= len;
      dz /= len;
      // Normal in the ground plane; widen slightly at corners
      const nx = -dz;
      const nz = dx;
      const half = PATH_WIDTH / 2;
      const o = i * 6;
      this._ribbonPos[o] = pts[i].x + nx * half;
      this._ribbonPos[o + 1] = PATH_Y;
      this._ribbonPos[o + 2] = pts[i].z + nz * half;
      this._ribbonPos[o + 3] = pts[i].x - nx * half;
      this._ribbonPos[o + 4] = PATH_Y;
      this._ribbonPos[o + 5] = pts[i].z - nz * half;
      const u = pts[i].d / DASH_LENGTH;
      this._ribbonUv[i * 4] = u;
      this._ribbonUv[i * 4 + 1] = 0;
      this._ribbonUv[i * 4 + 2] = u;
      this._ribbonUv[i * 4 + 3] = 1;
    }
    geometry.setDrawRange(0, (pts.length - 1) * 6);
    (geometry.getAttribute('position') as THREE.BufferAttribute).needsUpdate = true;
    (geometry.getAttribute('uv') as THREE.BufferAttribute).needsUpdate = true;
  }

  dispose(): void {
    this._ribbon.geometry.dispose();
    this._ribbonMaterial?.dispose();
    this._dust.geometry.dispose();
    (this._dust.material as THREE.Material | undefined)?.dispose();
    this._dashTexture.dispose();
    this._puffTexture.dispose();
    this._root.parent?.remove(this._root);
  }
}
