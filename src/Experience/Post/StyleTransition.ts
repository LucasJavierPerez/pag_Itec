import type { StyleId } from '../World/styles/types.ts';
import { STYLES } from '../World/styles/index.ts';
import type { PostProcessing } from './PostProcessing.ts';

const COVER_SECONDS = 0.35;
const REVEAL_SECONDS = 0.55;
/** Keeps a long frame (the style rebuild hitch) from eating the reveal. */
const MAX_STEP = 0.05;

type Phase = 'idle' | 'covering' | 'swap' | 'revealing';

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

/**
 * Orchestrates the cover -> swap -> reveal wipe. `apply` (world.setStyle + theme) only runs while
 * the screen is fully covered. Requests during a running transition collapse to the latest one.
 * Without an active post pipeline (low quality) the style is applied immediately.
 */
export class StyleTransition {
  private _post: PostProcessing;
  private _apply: (id: StyleId) => void;
  private _current: StyleId;
  private _target: StyleId;
  private _queued: StyleId | null = null;
  private _phase: Phase = 'idle';
  private _t = 0;

  constructor(post: PostProcessing, initial: StyleId, apply: (id: StyleId) => void) {
    this._post = post;
    this._current = initial;
    this._target = initial;
    this._apply = apply;
  }

  get busy(): boolean {
    return this._phase !== 'idle';
  }

  request(id: StyleId): void {
    if (this._phase !== 'idle') {
      this._queued = id;
      return;
    }
    if (id === this._current) return;
    if (!this._post.enabled) {
      this._swap(id);
      return;
    }
    this._start(id);
  }

  private _start(id: StyleId): void {
    this._target = id;
    this._phase = 'covering';
    this._t = 0;
    this._post.setTransitionStyle(STYLES[id].accent, Math.random() * 100);
    this._post.setTransition(0, false);
  }

  private _swap(id: StyleId): void {
    this._apply(id);
    this._current = id;
  }

  update(deltaSeconds: number): void {
    if (this._phase === 'idle') return;
    const dt = Math.min(Math.max(deltaSeconds, 0), MAX_STEP);

    switch (this._phase) {
      case 'covering': {
        this._t = Math.min(this._t + dt / COVER_SECONDS, 1);
        this._post.setTransition(easeInOutCubic(this._t), false);
        if (this._t >= 1) this._phase = 'swap'; // let one fully covered frame reach the screen
        break;
      }
      case 'swap': {
        this._swap(this._target);
        this._phase = 'revealing';
        this._t = 0;
        this._post.setTransition(1, true);
        break;
      }
      case 'revealing': {
        this._t = Math.min(this._t + dt / REVEAL_SECONDS, 1);
        this._post.setTransition(1 - easeInOutCubic(this._t), true);
        if (this._t >= 1) {
          this._phase = 'idle';
          this._post.setTransition(0, false);
          const next = this._queued;
          this._queued = null;
          if (next && next !== this._current) this.request(next);
        }
        break;
      }
    }
  }

  /** Cancels any running wipe and clears the queue. */
  destroy(): void {
    this._queued = null;
    this._phase = 'idle';
    this._post.setTransition(0, false);
  }
}
