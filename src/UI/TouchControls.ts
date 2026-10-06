import { stickToDirection } from './joystickMapping.ts';
import type { StickDirection } from './joystickMapping.ts';
import { haptic, isCoarsePointer, onCoarsePointerChange } from '../utils/device.ts';

/** Stick travel in CSS px (half of the base diameter). Keep in sync with --touch-stick-size. */
const STICK_RADIUS = 56;
const DEAD_ZONE = 0.25;
const HINT_MS = 6000;

const NONE: StickDirection = { active: false, dirX: 0, dirZ: 0, strength: 0 };

/**
 * Virtual joystick (floating base, left side) plus a reset button (bottom-right).
 * Only visible on coarse pointers and while the 3D explorer is the active view.
 * Output goes through `onChange` as a screen-relative direction (up = -Z, right = +X).
 */
export class TouchControls {
  private _root: HTMLDivElement;
  private _zone: HTMLDivElement;
  private _stick: HTMLDivElement;
  private _knob: HTMLDivElement;
  private _reset: HTMLButtonElement;
  private _hint: HTMLParagraphElement;

  private _onChange: (dir: StickDirection) => void;
  private _dir: StickDirection = NONE;
  private _pointerId: number | null = null;
  private _originX = 0;
  private _originY = 0;

  private _coarse: boolean;
  private _viewActive = true;
  private _hintTimer: number | null = null;
  private _hintShown = false;
  private _unsubscribe: () => void;

  private _onVisibility = () => {
    if (document.hidden) this._release();
  };
  private _onBlur = () => this._release();
  private _onEvent = () => haptic(8);

  constructor(onChange: (dir: StickDirection) => void) {
    this._onChange = onChange;

    this._root = document.createElement('div');
    this._root.className = 'touch-controls';

    this._zone = document.createElement('div');
    this._zone.className = 'touch-controls__zone';

    this._stick = document.createElement('div');
    this._stick.className = 'touch-controls__stick';
    this._stick.setAttribute('aria-hidden', 'true');
    this._knob = document.createElement('div');
    this._knob.className = 'touch-controls__knob';
    this._stick.appendChild(this._knob);
    this._zone.appendChild(this._stick);

    this._reset = document.createElement('button');
    this._reset.type = 'button';
    this._reset.className = 'touch-controls__reset';
    this._reset.setAttribute('aria-label', 'Reiniciar posición del robot');
    this._reset.innerHTML =
      '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M12 5V2L7 6.5 12 11V8a5 5 0 1 1-5 5H5a7 7 0 1 0 7-8Z" fill="currentColor"/></svg>';

    this._hint = document.createElement('p');
    this._hint.className = 'touch-controls__hint';
    this._hint.textContent = 'Arrastrá el joystick: el robot va hacia donde empujás';
    this._hint.setAttribute('aria-hidden', 'true');

    this._root.append(this._zone, this._reset, this._hint);
    document.body.appendChild(this._root);

    this._zone.addEventListener('pointerdown', (e) => this._onDown(e));
    this._zone.addEventListener('pointermove', (e) => this._onMove(e));
    this._zone.addEventListener('pointerup', (e) => this._onEnd(e));
    this._zone.addEventListener('pointercancel', (e) => this._onEnd(e));
    this._zone.addEventListener('lostpointercapture', (e) => this._onEnd(e));
    this._zone.addEventListener('contextmenu', (e) => e.preventDefault());

    this._reset.addEventListener('click', () => {
      haptic(12);
      window.dispatchEvent(new CustomEvent('vehicle-reset'));
    });

    document.addEventListener('visibilitychange', this._onVisibility);
    window.addEventListener('blur', this._onBlur);

    this._coarse = isCoarsePointer();
    this._unsubscribe = onCoarsePointerChange((coarse) => {
      this._coarse = coarse;
      this._sync();
    });
    window.addEventListener('goal-scored', this._onEvent);
    window.addEventListener('classroom-enter', this._onEvent);
    this._sync();
  }

  /** Called by the view manager: the joystick only makes sense in the explorer. */
  setViewActive(active: boolean): void {
    this._viewActive = active;
    this._sync();
  }

  private get _enabled(): boolean {
    return this._coarse && this._viewActive;
  }

  private _sync(): void {
    document.body.classList.toggle('touch-ui', this._coarse);
    this._root.classList.toggle('touch-controls--on', this._enabled);
    if (!this._enabled) {
      this._release();
      return;
    }
    if (!this._hintShown) {
      this._hintShown = true;
      this._root.classList.add('touch-controls--hint');
      this._hintTimer = window.setTimeout(() => {
        this._root.classList.remove('touch-controls--hint');
        this._hintTimer = null;
      }, HINT_MS);
    }
  }

  private _hideHint(): void {
    if (this._hintTimer !== null) {
      window.clearTimeout(this._hintTimer);
      this._hintTimer = null;
    }
    this._root.classList.remove('touch-controls--hint');
  }

  private _onDown(e: PointerEvent): void {
    if (!this._enabled || this._pointerId !== null) return;
    e.preventDefault();
    this._pointerId = e.pointerId;
    try {
      this._zone.setPointerCapture(e.pointerId);
    } catch {
      // capture can fail if the pointer is already gone; moves still arrive on the zone
    }
    this._hideHint();

    // Floating base: centered where the thumb landed, kept fully inside the zone
    const rect = this._zone.getBoundingClientRect();
    const pad = STICK_RADIUS + 8;
    this._originX = Math.min(Math.max(e.clientX, rect.left + pad), rect.right - pad);
    this._originY = Math.min(Math.max(e.clientY, rect.top + pad), rect.bottom - pad);
    this._stick.style.left = `${this._originX - rect.left}px`;
    this._stick.style.top = `${this._originY - rect.top}px`;
    this._stick.style.right = 'auto';
    this._stick.style.bottom = 'auto';
    this._stick.classList.add('touch-controls__stick--active');
    this._move(e.clientX, e.clientY);
    haptic(6);
  }

  private _onMove(e: PointerEvent): void {
    if (e.pointerId !== this._pointerId) return;
    e.preventDefault();
    this._move(e.clientX, e.clientY);
  }

  private _onEnd(e: PointerEvent): void {
    if (e.pointerId !== this._pointerId) return;
    this._release();
  }

  private _move(x: number, y: number): void {
    let dx = x - this._originX;
    let dy = y - this._originY;
    const len = Math.hypot(dx, dy);
    if (len > STICK_RADIUS) {
      dx = (dx / len) * STICK_RADIUS;
      dy = (dy / len) * STICK_RADIUS;
    }
    this._knob.style.transform = `translate(${dx}px, ${dy}px)`;
    this._emit(stickToDirection(dx, dy, STICK_RADIUS, DEAD_ZONE, this._dir.active));
  }

  private _release(): void {
    if (this._pointerId !== null) {
      try {
        this._zone.releasePointerCapture(this._pointerId);
      } catch {
        // already released
      }
      this._pointerId = null;
    }
    this._knob.style.transform = '';
    this._stick.classList.remove('touch-controls__stick--active');
    // Back to the idle ghost position defined in CSS
    this._stick.style.left = '';
    this._stick.style.top = '';
    this._stick.style.right = '';
    this._stick.style.bottom = '';
    this._emit(NONE);
  }

  private _emit(dir: StickDirection): void {
    const prev = this._dir;
    if (
      dir.active === prev.active &&
      dir.dirX === prev.dirX &&
      dir.dirZ === prev.dirZ &&
      dir.strength === prev.strength
    ) {
      return;
    }
    this._dir = dir;
    this._onChange(dir);
  }

  dispose(): void {
    this._release();
    this._hideHint();
    this._unsubscribe();
    document.removeEventListener('visibilitychange', this._onVisibility);
    window.removeEventListener('blur', this._onBlur);
    window.removeEventListener('goal-scored', this._onEvent);
    window.removeEventListener('classroom-enter', this._onEvent);
    document.body.classList.remove('touch-ui');
    this._root.remove();
  }
}
