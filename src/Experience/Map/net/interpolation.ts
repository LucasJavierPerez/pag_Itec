/**
 * Snapshot interpolation for remote players (pure, no allocation per frame).
 * Snapshots carry the SERVER time `st`; the renderer samples at `serverNow() - RENDER_DELAY_MS`,
 * which keeps the motion smooth despite network jitter.
 */

// ---- Tunable constants
/** Remote players are shown this far in the past, ms. */
export const RENDER_DELAY_MS = 120;
/** Past the newest snapshot a remote keeps moving at its last velocity for at most this long, ms. */
export const MAX_EXTRAPOLATION_MS = 150;
/** After the extrapolation window the displayed speed fades to 0 over this many ms. */
export const STALE_SPEED_FADE_MS = 200;
/** A jump larger than this (world units) is a teleport: the history is dropped and it snaps. */
export const TELEPORT_DISTANCE = 20;
const CAPACITY = 32;
const TWO_PI = Math.PI * 2;

/** Shortest signed angle from `a` to `b`, in (-PI, PI]. */
export function shortestArc(a: number, b: number): number {
  let d = (b - a) % TWO_PI;
  if (d > Math.PI) d -= TWO_PI;
  else if (d <= -Math.PI) d += TWO_PI;
  return d;
}

export interface Sample {
  x: number;
  z: number;
  /** Heading in radians. */
  h: number;
  /** Speed 0..1. */
  s: number;
  /** True while there is nothing recent to show (no snapshot yet). */
  empty: boolean;
}

export function createSample(): Sample {
  return { x: 0, z: 0, h: 0, s: 0, empty: true };
}

export class SnapshotBuffer {
  private _t = new Float64Array(CAPACITY);
  private _x = new Float64Array(CAPACITY);
  private _z = new Float64Array(CAPACITY);
  private _h = new Float64Array(CAPACITY);
  private _s = new Float64Array(CAPACITY);
  private _head = 0;
  private _size = 0;
  /** Incremented on every teleport so the consumer can reset its own smoothing. */
  teleports = 0;

  get size(): number {
    return this._size;
  }

  get lastTime(): number {
    return this._size ? this._t[this._idx(this._size - 1)] : -Infinity;
  }

  private _idx(i: number): number {
    return (this._head + i) % CAPACITY;
  }

  clear(): void {
    this._head = 0;
    this._size = 0;
  }

  /**
   * Adds a snapshot. Out-of-order / duplicate timestamps and non-finite values are dropped (returns
   * false). A jump above TELEPORT_DISTANCE clears the history first.
   */
  push(t: number, x: number, z: number, h: number, s: number): boolean {
    if (!(Number.isFinite(t) && Number.isFinite(x) && Number.isFinite(z) && Number.isFinite(h) && Number.isFinite(s))) {
      return false;
    }
    if (this._size > 0) {
      const li = this._idx(this._size - 1);
      if (t <= this._t[li]) return false;
      if (Math.hypot(x - this._x[li], z - this._z[li]) > TELEPORT_DISTANCE) {
        this.clear();
        this.teleports++;
      }
    }
    if (this._size === CAPACITY) {
      this._head = (this._head + 1) % CAPACITY;
      this._size--;
    }
    const i = this._idx(this._size);
    this._t[i] = t;
    this._x[i] = x;
    this._z[i] = z;
    this._h[i] = h;
    this._s[i] = Math.max(0, Math.min(1, s));
    this._size++;
    return true;
  }

  /** Fills `out` with the pose at `renderTime` (server clock, already delayed). */
  sample(renderTime: number, out: Sample): Sample {
    const n = this._size;
    if (n === 0) {
      out.empty = true;
      return out;
    }
    out.empty = false;
    const first = this._idx(0);
    if (renderTime <= this._t[first] || n === 1) {
      // Before the first snapshot (or only one): hold it. A lone snapshot is a standing peer.
      out.x = this._x[first];
      out.z = this._z[first];
      out.h = this._h[first];
      out.s = n === 1 ? 0 : this._s[first];
      return out;
    }
    const lastI = this._idx(n - 1);
    if (renderTime >= this._t[lastI]) {
      const prevI = this._idx(n - 2);
      const stale = renderTime - this._t[lastI];
      const span = this._t[lastI] - this._t[prevI];
      const ahead = Math.min(stale, MAX_EXTRAPOLATION_MS);
      // A peer whose last report says it stopped must not keep gliding
      const k = span > 0 && this._s[lastI] > 0 ? ahead / span : 0;
      out.x = this._x[lastI] + (this._x[lastI] - this._x[prevI]) * k;
      out.z = this._z[lastI] + (this._z[lastI] - this._z[prevI]) * k;
      out.h = this._h[lastI];
      const fade = stale > MAX_EXTRAPOLATION_MS ? 1 - (stale - MAX_EXTRAPOLATION_MS) / STALE_SPEED_FADE_MS : 1;
      out.s = this._s[lastI] * Math.max(0, fade);
      return out;
    }
    // Inside the buffered range: find the segment (the buffer is tiny, linear scan from the end)
    let i = n - 2;
    while (i > 0 && this._t[this._idx(i)] > renderTime) i--;
    const a = this._idx(i);
    const b = this._idx(i + 1);
    const span = this._t[b] - this._t[a];
    const u = span > 0 ? (renderTime - this._t[a]) / span : 1;
    out.x = this._x[a] + (this._x[b] - this._x[a]) * u;
    out.z = this._z[a] + (this._z[b] - this._z[a]) * u;
    out.h = this._h[a] + shortestArc(this._h[a], this._h[b]) * u;
    out.s = this._s[a] + (this._s[b] - this._s[a]) * u;
    return out;
  }
}
