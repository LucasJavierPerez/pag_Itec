/** Pure steering math (no physics engine import) so it can be checked headlessly. */

/** Shortest signed angle from `from` to `to`, in [-PI, PI]. */
export function shortestAngle(from: number, to: number): number {
  const twoPi = Math.PI * 2;
  let diff = (to - from) % twoPi;
  if (diff > Math.PI) diff -= twoPi;
  else if (diff < -Math.PI) diff += twoPi;
  return diff;
}

/** Turns `yaw` toward `target` by at most `rate * dt`, taking the shortest way around. */
export function stepYaw(yaw: number, target: number, rate: number, dt: number): number {
  const maxStep = rate * dt;
  const diff = shortestAngle(yaw, target);
  return yaw + Math.min(maxStep, Math.max(-maxStep, diff));
}
