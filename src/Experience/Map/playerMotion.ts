import { stepYaw } from '../Physics/steering.ts';

/**
 * Pure kinematics of the player robot on the map (no THREE, no DOM): eased acceleration towards
 * a wanted ground velocity, auto-turn towards the heading of the movement, and sliding along
 * the edges of the walkable region.
 */

// ---- Tunable constants
/** Top speed in world units per second (the click-to-run speed is higher). */
export const PLAYER_MAX_SPEED = 9;
export const PLAYER_ACCEL = 32;
export const PLAYER_DECEL = 40;
/** Auto-turn rate in rad/s (same as the explorer robot). */
export const PLAYER_TURN_RATE = 9;
/** Below this speed the robot does not steer by velocity. */
const MIN_STEER_SPEED = 0.4;

export type ClampFn = (x: number, z: number, out: { x: number; z: number }) => void;

export class PlayerMotion {
  x = 0;
  z = 0;
  /** Radians around Y, 0 = +Z (same convention as the road runner). */
  heading = 0;
  vx = 0;
  vz = 0;
  /** Signed yaw rate of the last step in rad/s (for the lean animation). */
  turnRate = 0;

  private _out = { x: 0, z: 0 };

  get speed(): number {
    return Math.hypot(this.vx, this.vz);
  }

  /** Takes over from an existing pose; the velocity follows `heading` at `speed`. */
  reset(x: number, z: number, heading: number, speed: number): void {
    this.x = x;
    this.z = z;
    this.heading = heading;
    this.vx = Math.sin(heading) * speed;
    this.vz = Math.cos(heading) * speed;
    this.turnRate = 0;
  }

  /**
   * @param ix world X of the wanted direction (any length up to 1)
   * @param iz world Z of the wanted direction
   * @param strength push in [0, 1] (scales the top speed)
   */
  step(dt: number, ix: number, iz: number, strength: number, clamp: ClampFn): void {
    if (!(dt > 0)) return;
    const len = Math.hypot(ix, iz);
    const wants = len > 1e-6 && strength > 0;
    const tx = wants ? (ix / len) * PLAYER_MAX_SPEED * Math.min(1, strength) : 0;
    const tz = wants ? (iz / len) * PLAYER_MAX_SPEED * Math.min(1, strength) : 0;

    // Approach the wanted velocity with a bounded acceleration (vector-wise, so diagonals are not faster)
    const dvx = tx - this.vx;
    const dvz = tz - this.vz;
    const dv = Math.hypot(dvx, dvz);
    if (dv > 1e-9) {
      const braking = !wants || Math.hypot(tx, tz) < this.speed;
      const maxStep = (braking ? PLAYER_DECEL : PLAYER_ACCEL) * dt;
      const k = Math.min(1, maxStep / dv);
      this.vx += dvx * k;
      this.vz += dvz * k;
    }

    // Move and slide: the clamp returns the nearest walkable point, which keeps the along-wall part
    const nx = this.x + this.vx * dt;
    const nz = this.z + this.vz * dt;
    clamp(nx, nz, this._out);
    const moved = Math.hypot(this._out.x - this.x, this._out.z - this.z);
    const wanted = Math.hypot(nx - this.x, nz - this.z);
    if (wanted > 1e-9 && moved < wanted * 0.999) {
      // Blocked: the velocity becomes the actual (sliding) displacement
      this.vx = (this._out.x - this.x) / dt;
      this.vz = (this._out.z - this.z) / dt;
    }
    this.x = this._out.x;
    this.z = this._out.z;

    // Auto-turn towards where the robot is going (input direction when pushing, velocity otherwise)
    let target: number | null = null;
    if (wants && this.speed > MIN_STEER_SPEED * 0.5) target = Math.atan2(this.vx, this.vz);
    else if (this.speed > MIN_STEER_SPEED) target = Math.atan2(this.vx, this.vz);
    const before = this.heading;
    if (target !== null) this.heading = stepYaw(this.heading, target, PLAYER_TURN_RATE, dt);
    this.turnRate = (this.heading - before) / dt;
  }
}
