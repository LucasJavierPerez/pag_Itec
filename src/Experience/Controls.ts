import type { Vehicle } from './Physics/Vehicle.ts';

export class Controls {
  private keys = { forward: false, backward: false, left: false, right: false };
  private touch = { forward: false, backward: false, left: false, right: false };
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

  /** Virtual joystick state, merged (OR) with the keyboard so desktop behavior is unchanged. */
  setTouchState(state: { forward: boolean; backward: boolean; left: boolean; right: boolean }): void {
    this.touch.forward = state.forward;
    this.touch.backward = state.backward;
    this.touch.left = state.left;
    this.touch.right = state.right;
  }

  update(vehicle: Vehicle): void {
    const k = this.keys;
    const t = this.touch;
    vehicle.applyMovement(k.forward || t.forward, k.backward || t.backward, k.left || t.left, k.right || t.right);
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
  }
}
