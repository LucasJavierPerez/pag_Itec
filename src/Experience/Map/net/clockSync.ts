/**
 * Server clock estimate (pure, no DOM). The server stamps `welcome.serverTime`; the offset is
 * `serverTime + rtt/2 - localReceiveTime`, where the RTT is the median of the last few
 * `{t:'ping'}` -> `{t:'pong'}` round trips (outliers dropped). The offset that is actually applied
 * only moves by a few milliseconds per frame so the bots never jump.
 */

// ---- Tunable constants
/** Round trips kept for the median. */
export const RTT_WINDOW = 5;
/** Largest change of the applied offset per `step()` (one call per frame). */
export const MAX_SLEW_MS = 5;
/** Differences beyond this are a broken local clock: snap instead of slewing for minutes. */
export const SNAP_THRESHOLD_MS = 5000;
/** A round trip this many times above the median (+ slack) is a hiccup and is ignored. */
const OUTLIER_FACTOR = 3;
const OUTLIER_SLACK_MS = 100;
const MAX_RTT_MS = 10000;

function median(values: number[]): number {
  const s = [...values].sort((a, b) => a - b);
  const n = s.length;
  if (n === 0) return 0;
  return n % 2 ? s[(n - 1) / 2] : (s[n / 2 - 1] + s[n / 2]) / 2;
}

export class ClockSync {
  private _now: () => number;
  private _rtts: number[] = [];
  private _provisionalRtt = 0;
  private _welcome: { serverTime: number; recvAt: number } | null = null;
  private _target = 0;
  private _applied = 0;

  constructor(now: () => number = Date.now) {
    this._now = now;
  }

  /** Offset (server - local) the clock wants to reach, ms. */
  get targetOffset(): number {
    return this._target;
  }

  /** Offset currently applied, ms (moves towards the target in `step`). */
  get offset(): number {
    return this._applied;
  }

  get synced(): boolean {
    return this._welcome !== null;
  }

  /** Median RTT in ms (the provisional hello->welcome one until a ping measured another). */
  get rtt(): number {
    return this._rtts.length ? median(this._rtts) : this._provisionalRtt;
  }

  /**
   * `welcome` arrived. `helloRtt` (hello sent -> welcome received) is inflated by the room waking
   * up, so it is only used until the first ping/pong measures the real one.
   */
  onWelcome(serverTime: number, recvAt: number = this._now(), helloRtt = 0): void {
    if (!Number.isFinite(serverTime)) return;
    this._welcome = { serverTime, recvAt };
    this._provisionalRtt = Number.isFinite(helloRtt) && helloRtt > 0 ? Math.min(helloRtt, 2000) : 0;
    this._rtts = [];
    this._retarget();
  }

  /** A `{t:'ping'}` round trip finished. Returns false when the sample was rejected as an outlier. */
  addRtt(rtt: number): boolean {
    if (!Number.isFinite(rtt) || rtt < 0 || rtt > MAX_RTT_MS) return false;
    if (this._rtts.length >= 3 && rtt > median(this._rtts) * OUTLIER_FACTOR + OUTLIER_SLACK_MS) return false;
    this._rtts.push(rtt);
    if (this._rtts.length > RTT_WINDOW) this._rtts.shift();
    this._retarget();
    return true;
  }

  private _retarget(): void {
    if (!this._welcome) return;
    this._target = this._welcome.serverTime + this.rtt / 2 - this._welcome.recvAt;
    if (Math.abs(this._target - this._applied) > SNAP_THRESHOLD_MS) this._applied = this._target;
  }

  /** The connection is gone: glide back to the local clock. */
  reset(): void {
    this._welcome = null;
    this._rtts = [];
    this._provisionalRtt = 0;
    this._target = 0;
  }

  /** Call once per frame: moves the applied offset at most `maxSlew` ms towards the target. */
  step(maxSlew: number = MAX_SLEW_MS): number {
    const d = this._target - this._applied;
    this._applied += Math.abs(d) <= maxSlew ? d : Math.sign(d) * maxSlew;
    return this._applied;
  }

  /** Estimated server time in ms (slewed: safe to place the bots with). */
  serverNow(): number {
    return this._now() + this._applied;
  }

  /**
   * Estimated server time using the target offset right away. Interpolation buffers use this one:
   * they render in the past, so an instant correction is invisible, while the slewed clock would lag.
   */
  targetNow(): number {
    return this._now() + this._target;
  }
}

/** The clock of the page. */
export const clock = new ClockSync();

export function serverNow(): number {
  return clock.serverNow();
}

export function targetServerNow(): number {
  return clock.targetNow();
}
