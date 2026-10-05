import * as THREE from 'three';
import type { SignatureContext, SignatureHandle, SignatureQuality } from '../types.ts';
import { buildUniform } from './buildIn.ts';
import { disposePoints } from '../shared/signatureUtils.ts';

// --- Tunables (build-in & pixels) ---------------------------------------------------------------
/** Duration of the "blocks assemble" entry, in seconds. */
const BUILD_SECONDS = 2.4;
/** Pause between the style becoming visible and the first block moving. */
const BUILD_START_DELAY = 0.15;
/** Safety net: start anyway if `enter()` never arrives (e.g. a failed load). */
const MAX_WAIT_SECONDS = 10;

const FIREFLIES_HIGH = 48;
const FIREFLIES_LOW = 16;
/** On-screen size of a firefly in pixels (square sprite, not distance-attenuated). */
const FIREFLY_SIZE = 3.5;
const FIREFLY_COLOR = 0xffe066;
/** Wander radius around the anchor tree and height range. */
const FIREFLY_RADIUS_MIN = 1.5;
const FIREFLY_RADIUS_MAX = 4;
const FIREFLY_HEIGHT_MIN = 0.8;
const FIREFLY_HEIGHT_MAX = 4.5;
/** Trees of voxel/Environment.ts (all outside the building footprint). */
const TREES: ReadonlyArray<readonly [number, number]> = [
  [-40, -30], [-38, -18], [-42, -5], [-36, 10], [-40, 22], [-44, 35], [-35, 40],
  [40, -28], [38, -12], [42, 5], [36, 18], [40, 30], [44, 42],
  [-25, -42], [0, -44], [25, -42], [-28, 42], [5, 44], [28, 42], [-30, 38],
];

type Phase = 'waiting' | 'delay' | 'playing' | 'done';

function easeInOutQuad(t: number): number {
  return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
}

class VoxelSignature implements SignatureHandle {
  private _scene: THREE.Scene;
  private _phase: Phase;
  private _clock = 0;

  private _fireflies: THREE.Points;
  private _anchor: Float32Array;
  private _params: Float32Array;
  private _colors: Float32Array;
  private _count = FIREFLIES_HIGH;

  constructor(ctx: SignatureContext) {
    this._scene = ctx.scene;

    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    if (reduce) {
      this._phase = 'done';
      buildUniform.value = 1;
    } else {
      this._phase = ctx.awaitReveal ? 'waiting' : 'delay';
      buildUniform.value = 0;
    }

    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(FIREFLIES_HIGH * 3), 3));
    this._colors = new Float32Array(FIREFLIES_HIGH * 3);
    geo.setAttribute('color', new THREE.BufferAttribute(this._colors, 3));
    this._fireflies = new THREE.Points(
      geo,
      new THREE.PointsMaterial({
        size: FIREFLY_SIZE,
        color: FIREFLY_COLOR,
        vertexColors: true,
        sizeAttenuation: false,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        fog: false,
      }),
    );
    this._fireflies.frustumCulled = false;
    this._anchor = new Float32Array(FIREFLIES_HIGH * 3);
    // per firefly: radius, angular speed, phase, height, height speed, blink speed
    this._params = new Float32Array(FIREFLIES_HIGH * 6);
    for (let i = 0; i < FIREFLIES_HIGH; i++) {
      const tree = TREES[i % TREES.length];
      this._anchor[i * 3] = tree[0];
      this._anchor[i * 3 + 1] = FIREFLY_HEIGHT_MIN + Math.random() * (FIREFLY_HEIGHT_MAX - FIREFLY_HEIGHT_MIN);
      this._anchor[i * 3 + 2] = tree[1];
      const p = i * 6;
      this._params[p] = FIREFLY_RADIUS_MIN + Math.random() * (FIREFLY_RADIUS_MAX - FIREFLY_RADIUS_MIN);
      this._params[p + 1] = (0.1 + Math.random() * 0.25) * (Math.random() < 0.5 ? -1 : 1);
      this._params[p + 2] = Math.random() * Math.PI * 2;
      this._params[p + 3] = 0.4 + Math.random() * 0.8;
      this._params[p + 4] = 0.3 + Math.random() * 0.5;
      this._params[p + 5] = 0.8 + Math.random() * 1.6;
    }
    this._scene.add(this._fireflies);
    this.setQuality(ctx.quality);
  }

  setQuality(quality: SignatureQuality): void {
    this._count = quality === 'high' ? FIREFLIES_HIGH : FIREFLIES_LOW;
    this._fireflies.geometry.setDrawRange(0, this._count);
  }

  /** The scene became visible: the blocks start dropping. */
  enter(): void {
    if (this._phase === 'waiting') {
      this._phase = 'delay';
      this._clock = 0;
    }
  }

  update(dt: number, time: number): void {
    // A long frame (the style rebuild hitch) must not eat the animation
    const step = Math.min(dt, 0.05);
    switch (this._phase) {
      case 'waiting':
        this._clock += step;
        if (this._clock > MAX_WAIT_SECONDS) this.enter();
        break;
      case 'delay':
        this._clock += step;
        if (this._clock >= BUILD_START_DELAY) {
          this._phase = 'playing';
          this._clock = 0;
        }
        break;
      case 'playing':
        this._clock += step;
        if (this._clock >= BUILD_SECONDS) {
          buildUniform.value = 1;
          this._phase = 'done';
        } else {
          buildUniform.value = easeInOutQuad(this._clock / BUILD_SECONDS);
        }
        break;
      default:
        break;
    }

    // Fireflies appear once the world has landed
    const appear = THREE.MathUtils.smoothstep(buildUniform.value, 0.85, 1);
    const pos = this._fireflies.geometry.getAttribute('position') as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < this._count; i++) {
      const p = i * 6;
      const a = this._params[p + 2] + time * this._params[p + 1];
      const r = this._params[p];
      arr[i * 3] = this._anchor[i * 3] + Math.cos(a) * r;
      arr[i * 3 + 1] = this._anchor[i * 3 + 1] + Math.sin(time * this._params[p + 4] + this._params[p + 2]) * this._params[p + 3];
      arr[i * 3 + 2] = this._anchor[i * 3 + 2] + Math.sin(a * 1.3) * r;
      const blink = Math.pow(0.5 + 0.5 * Math.sin(time * this._params[p + 5] + this._params[p + 2] * 3), 2);
      const k = appear * (0.15 + 0.85 * blink);
      this._colors[i * 3] = k;
      this._colors[i * 3 + 1] = k * 0.95;
      this._colors[i * 3 + 2] = k * 0.45;
    }
    pos.needsUpdate = true;
    (this._fireflies.geometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
  }

  destroy(): void {
    buildUniform.value = 1; // leave no half-built state behind for the next voxel entry
    disposePoints(this._fireflies);
  }
}

export function createSignature(ctx: SignatureContext): SignatureHandle {
  return new VoxelSignature(ctx);
}
