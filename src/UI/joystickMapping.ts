/** Pure mapping from a joystick offset to the four driving keys. No DOM, no THREE. */

export interface StickKeys {
  forward: boolean;
  backward: boolean;
  left: boolean;
  right: boolean;
}

/** Fraction of the dead zone below which an already-active axis releases (hysteresis). */
export const RELEASE_RATIO = 0.7;

const NONE: StickKeys = { forward: false, backward: false, left: false, right: false };

/**
 * @param dx Horizontal offset in px (positive = right).
 * @param dy Vertical offset in px, screen coordinates (negative = up = forward).
 * @param radius Stick radius in px; 0 or invalid returns no input.
 * @param deadzone Fraction of the radius that must be exceeded to activate an axis.
 * @param prev Previous result, enables hysteresis: an active axis stays on until it drops
 *   below `deadzone * RELEASE_RATIO`.
 */
export function stickToKeys(
  dx: number,
  dy: number,
  radius: number,
  deadzone = 0.25,
  prev: StickKeys = NONE,
): StickKeys {
  if (!(radius > 0) || !Number.isFinite(dx) || !Number.isFinite(dy)) return { ...NONE };
  const nx = dx / radius;
  const ny = dy / radius;
  const on = deadzone;
  const off = deadzone * RELEASE_RATIO;
  return {
    forward: ny < 0 && -ny > (prev.forward ? off : on),
    backward: ny > 0 && ny > (prev.backward ? off : on),
    left: nx < 0 && -nx > (prev.left ? off : on),
    right: nx > 0 && nx > (prev.right ? off : on),
  };
}
