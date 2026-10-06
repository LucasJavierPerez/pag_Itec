import { isCoarsePointer } from '../../utils/device.ts';

export type QualityLevel = 'high' | 'low';

const STORAGE_KEY = 'itec-quality';
const WINDOW_SECONDS = 3;
const FPS_THRESHOLD = 40;
const STRIKES_TO_DOWNGRADE = 2;
const WARMUP_SECONDS = 2;
/** A frame this long means a tab switch or a hitch, not sustained load. */
const MAX_FRAME_SECONDS = 0.25;

export function getStoredQuality(): QualityLevel {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored === 'high' || stored === 'low') return stored;
  } catch {
    // localStorage unavailable: default by device
  }
  // Never chosen: phones and tablets start light, desktop starts high
  return isCoarsePointer() ? 'low' : 'high';
}

/** Holds the current quality level, persists it and notifies listeners via a `change` event. */
export class QualityController extends EventTarget {
  level: QualityLevel;

  constructor() {
    super();
    this.level = getStoredQuality();
  }

  set(level: QualityLevel): void {
    if (level === this.level) return;
    this.level = level;
    try {
      localStorage.setItem(STORAGE_KEY, level);
    } catch {
      // ignore persistence failures
    }
    this.dispatchEvent(new Event('change'));
  }

  toggle(): void {
    this.set(this.level === 'high' ? 'low' : 'high');
  }
}

/**
 * Average FPS over 3 s windows; two consecutive windows under 40 fps trigger `onLowFps`.
 * Allocation-free per frame. Windows are discarded on warm-up, hitches and while paused.
 */
export class FpsMonitor {
  private _onLowFps: () => void;
  private _elapsed = 0;
  private _windowTime = 0;
  private _frames = 0;
  private _strikes = 0;

  constructor(onLowFps: () => void) {
    this._onLowFps = onLowFps;
  }

  reset(): void {
    this._windowTime = 0;
    this._frames = 0;
    this._strikes = 0;
  }

  update(deltaSeconds: number, paused: boolean): void {
    this._elapsed += deltaSeconds;
    if (paused || deltaSeconds > MAX_FRAME_SECONDS || this._elapsed < WARMUP_SECONDS) {
      this.reset();
      return;
    }
    this._windowTime += deltaSeconds;
    this._frames++;
    if (this._windowTime < WINDOW_SECONDS) return;

    const fps = this._frames / this._windowTime;
    this._windowTime = 0;
    this._frames = 0;
    this._strikes = fps < FPS_THRESHOLD ? this._strikes + 1 : 0;
    if (this._strikes >= STRIKES_TO_DOWNGRADE) {
      this._strikes = 0;
      this._onLowFps();
    }
  }
}
