import * as THREE from 'three';
import { isCoarsePointer } from '../../utils/device.ts';

// Dust volume around the Mecatrónica classroom and its entrance
const DUST_COUNT_BASE = 150;
const DUST_MIN = new THREE.Vector3(-17, 0.2, -5);
const DUST_MAX = new THREE.Vector3(-5, 3.5, 5);

// Welding sparks emitter inside Mecatrónica (back-left workbench area)
const SPARK_COUNT_BASE = 60;
const SPARK_ORIGIN = new THREE.Vector3(-14, 1.0, -2);
const SPARK_GRAVITY = -9;
const SPARK_BURST_MIN = 10;
const SPARK_BURST_MAX = 22;
const BURST_DELAY_MIN = 0.6;
const BURST_DELAY_MAX = 1.8;

// Ground-dust trail left behind the robot
const TRAIL_COUNT_BASE = 80;
const TRAIL_LIFE = 0.7;
const TRAIL_MIN_SPEED = 1.2;
const TRAIL_MAX_SPEED = 5;
const TRAIL_MAX_RATE = 60; // particles per second at top speed
const TRAIL_BEHIND = 0.9;
const TRAIL_HEIGHT = 0.12;
const TRAIL_TINT = 0.55; // peak brightness of the additive sprite (light sand / white)

function createSpriteTexture(): THREE.CanvasTexture {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.4, 'rgba(255,255,255,0.45)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/**
 * Style-independent ambient particles: floating dust and welding sparks.
 * Owned by the World; persists across style switches. Allocation-free per frame.
 */
export class Particles {
  private _scene: THREE.Scene;
  private _texture: THREE.CanvasTexture;

  private _dust: THREE.Points;
  private _dustBase: Float32Array;
  private _dustPhase: Float32Array;
  private _dustSpeed: Float32Array;

  private _sparks: THREE.Points;
  private _sparkVel: Float32Array;
  private _sparkLife: Float32Array;
  private _sparkMaxLife: Float32Array;
  private _nextBurst: number;

  private _trail: THREE.Points;
  private _trailVel: Float32Array;
  private _trailLife: Float32Array;
  private _trailCursor = 0;
  private _trailAccum = 0;
  private _trailEnabled = true;

  private _time = 0;

  // Pool sizes: halved on coarse pointers (phones/tablets)
  private _dustCount: number;
  private _sparkCount: number;
  private _trailCount: number;

  constructor(scene: THREE.Scene) {
    this._scene = scene;
    const scale = isCoarsePointer() ? 0.5 : 1;
    this._dustCount = Math.round(DUST_COUNT_BASE * scale);
    this._sparkCount = Math.round(SPARK_COUNT_BASE * scale);
    this._trailCount = Math.round(TRAIL_COUNT_BASE * scale);
    this._texture = createSpriteTexture();

    const spanX = DUST_MAX.x - DUST_MIN.x;
    const spanY = DUST_MAX.y - DUST_MIN.y;
    const spanZ = DUST_MAX.z - DUST_MIN.z;

    // --- Dust ---
    this._dustBase = new Float32Array(this._dustCount * 3);
    this._dustPhase = new Float32Array(this._dustCount);
    this._dustSpeed = new Float32Array(this._dustCount);
    for (let i = 0; i < this._dustCount; i++) {
      this._dustBase[i * 3] = DUST_MIN.x + Math.random() * spanX;
      this._dustBase[i * 3 + 1] = DUST_MIN.y + Math.random() * spanY;
      this._dustBase[i * 3 + 2] = DUST_MIN.z + Math.random() * spanZ;
      this._dustPhase[i] = Math.random() * Math.PI * 2;
      this._dustSpeed[i] = 0.03 + Math.random() * 0.07;
    }
    const dustGeo = new THREE.BufferGeometry();
    dustGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this._dustBase), 3));
    const dustMat = new THREE.PointsMaterial({
      color: 0xfff1d6,
      size: 0.09,
      map: this._texture,
      transparent: true,
      opacity: 0.55,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    this._dust = new THREE.Points(dustGeo, dustMat);
    this._dust.frustumCulled = false;
    this._dust.renderOrder = 2;

    // --- Sparks ---
    this._sparkVel = new Float32Array(this._sparkCount * 3);
    this._sparkLife = new Float32Array(this._sparkCount); // 0 = dead
    this._sparkMaxLife = new Float32Array(this._sparkCount);
    this._nextBurst = 0.5;
    const sparkGeo = new THREE.BufferGeometry();
    sparkGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(this._sparkCount * 3), 3));
    sparkGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(this._sparkCount * 3), 3));
    const sparkMat = new THREE.PointsMaterial({
      size: 0.16,
      map: this._texture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    this._sparks = new THREE.Points(sparkGeo, sparkMat);
    this._sparks.frustumCulled = false;
    this._sparks.renderOrder = 3;
    // Start with every spark parked far away and invisible (black = no additive contribution)
    const pos = sparkGeo.getAttribute('position') as THREE.BufferAttribute;
    for (let i = 0; i < this._sparkCount; i++) pos.setXYZ(i, SPARK_ORIGIN.x, -100, SPARK_ORIGIN.z);

    // --- Trail (fixed pool, ring-buffer reuse) ---
    this._trailVel = new Float32Array(this._trailCount * 3);
    this._trailLife = new Float32Array(this._trailCount);
    const trailGeo = new THREE.BufferGeometry();
    const trailPos = new THREE.BufferAttribute(new Float32Array(this._trailCount * 3), 3);
    for (let i = 0; i < this._trailCount; i++) trailPos.setXYZ(i, 0, -100, 0);
    trailGeo.setAttribute('position', trailPos);
    trailGeo.setAttribute('color', new THREE.BufferAttribute(new Float32Array(this._trailCount * 3), 3));
    const trailMat = new THREE.PointsMaterial({
      size: 0.5,
      map: this._texture,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
    });
    this._trail = new THREE.Points(trailGeo, trailMat);
    this._trail.frustumCulled = false;
    this._trail.renderOrder = 2;

    scene.add(this._dust, this._sparks, this._trail);
  }

  /** The trail is skipped entirely on low quality; live particles simply fade out. */
  setTrailEnabled(enabled: boolean): void {
    this._trailEnabled = enabled;
    this._trail.visible = enabled;
    if (!enabled) {
      this._trailLife.fill(0);
      this._trailAccum = 0;
    }
  }

  /**
   * Spawns ground dust behind a moving robot.
   * @param position robot position
   * @param forwardDirection unit horizontal direction of travel
   * @param speed horizontal speed in units/s
   * @param deltaSeconds frame time
   */
  emitTrail(
    position: THREE.Vector3,
    forwardDirection: THREE.Vector3,
    speed: number,
    deltaSeconds: number,
  ): void {
    if (!this._trailEnabled || speed < TRAIL_MIN_SPEED) {
      this._trailAccum = 0;
      return;
    }
    const k = Math.min((speed - TRAIL_MIN_SPEED) / (TRAIL_MAX_SPEED - TRAIL_MIN_SPEED), 1);
    this._trailAccum += (8 + (TRAIL_MAX_RATE - 8) * k) * Math.min(deltaSeconds, 0.1);
    const p = (this._trail.geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array;
    const fx = forwardDirection.x;
    const fz = forwardDirection.z;
    while (this._trailAccum >= 1) {
      this._trailAccum -= 1;
      const i = this._trailCursor;
      this._trailCursor = (i + 1) % this._trailCount;
      const i3 = i * 3;
      const back = TRAIL_BEHIND + Math.random() * 0.4;
      const side = (Math.random() - 0.5) * 0.7;
      p[i3] = position.x - fx * back - fz * side;
      p[i3 + 1] = TRAIL_HEIGHT + Math.random() * 0.08;
      p[i3 + 2] = position.z - fz * back + fx * side;
      this._trailVel[i3] = -fx * 0.5 * speed * 0.2 + (Math.random() - 0.5) * 0.3;
      this._trailVel[i3 + 1] = 0.25 + Math.random() * 0.35;
      this._trailVel[i3 + 2] = -fz * 0.5 * speed * 0.2 + (Math.random() - 0.5) * 0.3;
      this._trailLife[i] = TRAIL_LIFE;
    }
  }

  private _emitBurst(): void {
    const count =
      SPARK_BURST_MIN + Math.floor(Math.random() * (SPARK_BURST_MAX - SPARK_BURST_MIN + 1));
    const p = (this._sparks.geometry.getAttribute('position') as THREE.BufferAttribute).array as Float32Array;
    let emitted = 0;
    for (let i = 0; i < this._sparkCount && emitted < count; i++) {
      if (this._sparkLife[i] > 0) continue;
      const maxLife = 0.5 + Math.random() * 0.6;
      this._sparkLife[i] = maxLife;
      this._sparkMaxLife[i] = maxLife;
      // Random direction on the upper hemisphere, biased outward
      const theta = Math.random() * Math.PI * 2;
      const up = 0.3 + Math.random() * 0.9;
      const speed = 1.5 + Math.random() * 2.5;
      this._sparkVel[i * 3] = Math.cos(theta) * speed;
      this._sparkVel[i * 3 + 1] = up * speed;
      this._sparkVel[i * 3 + 2] = Math.sin(theta) * speed;
      p[i * 3] = SPARK_ORIGIN.x;
      p[i * 3 + 1] = SPARK_ORIGIN.y;
      p[i * 3 + 2] = SPARK_ORIGIN.z;
      emitted++;
    }
  }

  update(deltaSeconds: number): void {
    const dt = Math.min(Math.max(deltaSeconds, 0), 0.1);
    this._time += dt;
    const t = this._time;

    // --- Dust: sine wobble + slow upward drift, wrapped inside the volume ---
    const spanY = DUST_MAX.y - DUST_MIN.y;
    const dustPos = this._dust.geometry.getAttribute('position') as THREE.BufferAttribute;
    const dp = dustPos.array as Float32Array;
    for (let i = 0; i < this._dustCount; i++) {
      const i3 = i * 3;
      let by = this._dustBase[i3 + 1] + this._dustSpeed[i] * dt;
      if (by > DUST_MAX.y) by -= spanY;
      this._dustBase[i3 + 1] = by;
      const ph = this._dustPhase[i];
      dp[i3] = this._dustBase[i3] + Math.sin(t * 0.4 + ph) * 0.35;
      dp[i3 + 1] = by + Math.sin(t * 0.6 + ph * 1.7) * 0.08;
      dp[i3 + 2] = this._dustBase[i3 + 2] + Math.cos(t * 0.33 + ph) * 0.35;
    }
    dustPos.needsUpdate = true;

    // --- Sparks ---
    this._nextBurst -= dt;
    if (this._nextBurst <= 0) {
      this._emitBurst();
      this._nextBurst = BURST_DELAY_MIN + Math.random() * (BURST_DELAY_MAX - BURST_DELAY_MIN);
    }

    const sparkPos = this._sparks.geometry.getAttribute('position') as THREE.BufferAttribute;
    const sparkCol = this._sparks.geometry.getAttribute('color') as THREE.BufferAttribute;
    const sp = sparkPos.array as Float32Array;
    const sc = sparkCol.array as Float32Array;
    for (let i = 0; i < this._sparkCount; i++) {
      const i3 = i * 3;
      const life = this._sparkLife[i];
      if (life <= 0) {
        sc[i3] = 0;
        sc[i3 + 1] = 0;
        sc[i3 + 2] = 0;
        continue;
      }
      const nl = life - dt;
      if (nl <= 0) {
        this._sparkLife[i] = 0;
        sc[i3] = 0;
        sc[i3 + 1] = 0;
        sc[i3 + 2] = 0;
        continue;
      }
      this._sparkLife[i] = nl;
      this._sparkVel[i3 + 1] += SPARK_GRAVITY * dt;
      sp[i3] += this._sparkVel[i3] * dt;
      sp[i3 + 1] += this._sparkVel[i3 + 1] * dt;
      sp[i3 + 2] += this._sparkVel[i3 + 2] * dt;
      if (sp[i3 + 1] < 0.02) {
        // Bounce once, damped, so they skitter on the floor
        sp[i3 + 1] = 0.02;
        this._sparkVel[i3 + 1] *= -0.3;
        this._sparkVel[i3] *= 0.6;
        this._sparkVel[i3 + 2] *= 0.6;
      }
      // White-yellow when fresh, orange as it cools, fading to black
      const f = nl / this._sparkMaxLife[i];
      sc[i3] = f;
      sc[i3 + 1] = f * (0.35 + 0.55 * f);
      sc[i3 + 2] = f * f * 0.45;
    }
    sparkPos.needsUpdate = true;
    sparkCol.needsUpdate = true;

    this._updateTrail(dt);
  }

  private _updateTrail(dt: number): void {
    const posAttr = this._trail.geometry.getAttribute('position') as THREE.BufferAttribute;
    const colAttr = this._trail.geometry.getAttribute('color') as THREE.BufferAttribute;
    const tp = posAttr.array as Float32Array;
    const tc = colAttr.array as Float32Array;
    let any = false;
    for (let i = 0; i < this._trailCount; i++) {
      const i3 = i * 3;
      const life = this._trailLife[i];
      if (life <= 0) {
        if (tc[i3] !== 0) {
          tc[i3] = 0;
          tc[i3 + 1] = 0;
          tc[i3 + 2] = 0;
          any = true;
        }
        continue;
      }
      any = true;
      const nl = life - dt;
      if (nl <= 0) {
        this._trailLife[i] = 0;
        tc[i3] = 0;
        tc[i3 + 1] = 0;
        tc[i3 + 2] = 0;
        continue;
      }
      this._trailLife[i] = nl;
      // Drag so the puffs settle instead of flying off
      const drag = Math.max(0, 1 - 2.5 * dt);
      this._trailVel[i3] *= drag;
      this._trailVel[i3 + 1] *= drag;
      this._trailVel[i3 + 2] *= drag;
      tp[i3] += this._trailVel[i3] * dt;
      tp[i3 + 1] += this._trailVel[i3 + 1] * dt;
      tp[i3 + 2] += this._trailVel[i3 + 2] * dt;
      // Fade out; warm white -> light sand
      const f = nl / TRAIL_LIFE;
      const a = f * f * TRAIL_TINT;
      tc[i3] = a;
      tc[i3 + 1] = a * 0.92;
      tc[i3 + 2] = a * 0.76;
    }
    if (any) {
      posAttr.needsUpdate = true;
      colAttr.needsUpdate = true;
    }
  }

  destroy(): void {
    this._scene.remove(this._dust, this._sparks, this._trail);
    this._dust.geometry.dispose();
    (this._dust.material as THREE.Material).dispose();
    this._sparks.geometry.dispose();
    (this._sparks.material as THREE.Material).dispose();
    this._trail.geometry.dispose();
    (this._trail.material as THREE.Material).dispose();
    this._texture.dispose();
  }
}
