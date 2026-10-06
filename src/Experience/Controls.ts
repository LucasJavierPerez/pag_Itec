import type { Vehicle } from './Physics/Vehicle.ts';

export class Controls {
  private keys = { forward: false, backward: false, left: false, right: false };
  private touch: { dirX: number; dirZ: number; strength: number } | null = null;
  private onKeyDown: (e: KeyboardEvent) => void;
  private onKeyUp: (e: KeyboardEvent) => void;

  constructor() {
    this.onKeyDown = (e) => this.handleKey(e, true);
    this.onKeyUp = (e) => this.handleKey(e, false);
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
  }

  private handleKey(e: KeyboardEvent, pressed: boolean): void {
    switch (e.code) {
      case 'KeyW': case 'ArrowUp': this.keys.forward = pressed; break;
      case 'KeyS': case 'ArrowDown': this.keys.backward = pressed; break;
      case 'KeyA': case 'ArrowLeft': this.keys.left = pressed; break;
      case 'KeyD': case 'ArrowRight': this.keys.right = pressed; break;
      case 'KeyR': if (pressed) window.dispatchEvent(new CustomEvent('vehicle-reset')); break;
    }
  }

  /** Virtual joystick direction (screen-relative); null or inactive when released. */
  setTouchDirection(state: { active: boolean; dirX: number; dirZ: number; strength: number } | null): void {
    this.touch = state && state.active ? state : null;
  }

  update(vehicle: Vehicle, dt = 1 / 60): void {
    const k = this.keys;
    const keyboard = k.forward || k.backward || k.left || k.right;
    if (this.touch && !keyboard) {
      vehicle.applyDirectional(this.touch.dirX, this.touch.dirZ, this.touch.strength, dt);
      return;
    }
    vehicle.applyMovement(k.forward, k.backward, k.left, k.right);
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }
}
