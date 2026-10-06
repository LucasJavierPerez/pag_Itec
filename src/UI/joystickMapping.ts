/** Pure mapping from a joystick offset to a screen-relative direction. No DOM, no THREE. */

export interface StickDirection {
  active: boolean;
  /** World X component of the unit direction (screen right = +X). */
  dirX: number;
  /** World Z component of the unit direction (screen down = +Z, screen up = -Z). */
  dirZ: number;
  /** Push strength in [0, 1] after the dead zone, eased with a smoothstep. */
  strength: number;
}

/** Fraction of the dead zone below which an already-active stick releases (hysteresis). */
export const RELEASE_RATIO = 0.7;

const IDLE: StickDirection = { active: false, dirX: 0, dirZ: 0, strength: 0 };

/**
 * @param dx Horizontal offset in px (positive = right).
 * @param dy Vertical offset in px, screen coordinates (positive = down).
 * @param radius Stick radius in px; 0 or invalid returns an inactive result.
 * @param deadzone Fraction of the radius that must be exceeded to activate.
 * @param wasActive Previous state, enables hysteresis: stays active until the push drops
 *   below `deadzone * RELEASE_RATIO`.
 */
export function stickToDirection(
  dx: number,
  dy: number,
  radius: number,
  deadzone = 0.25,
  wasActive = false,
): StickDirection {
  if (!(radius > 0) || !Number.isFinite(dx) || !Number.isFinite(dy)) return { ...IDLE };
  const len = Math.hypot(dx, dy);
  const ratio = len / radius;
  const threshold = wasActive ? deadzone * RELEASE_RATIO : deadzone;
  if (len === 0 || ratio <= threshold) return { ...IDLE };
  const span = 1 - deadzone;
  const t = span > 0 ? Math.min(1, Math.max(0, (ratio - deadzone) / span)) : 1;
  return { active: true, dirX: dx / len, dirZ: dy / len, strength: t * t * (3 - 2 * t) };
}
