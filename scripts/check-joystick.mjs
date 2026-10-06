// Headless checks for the joystick direction mapping and steering math. Run with:
//   node --experimental-strip-types scripts/check-joystick.mjs
import { stickToDirection } from '../src/UI/joystickMapping.ts';
import { shortestAngle, stepYaw } from '../src/Experience/Physics/steering.ts';

let failures = 0;
let checks = 0;

function check(ok, message) {
  checks++;
  if (!ok) {
    failures++;
    console.error(`FAIL  ${message}`);
  }
}

const near = (a, b, eps = 1e-9) => Math.abs(a - b) < eps;
const R = 60;
const dir = (dx, dy, was) => stickToDirection(dx, dy, R, 0.25, was);
const isZero = (d) => !d.active && d.dirX === 0 && d.dirZ === 0 && d.strength === 0;

// Dead zone
check(isZero(dir(0, 0)), 'center is idle');
check(isZero(dir(10, -10)), 'inside dead zone is idle');
check(isZero(dir(14, 0)) && isZero(dir(0, -14)), 'just inside dead zone is idle');

// Four axes (screen up = world -Z, right = +X)
const up = dir(0, -40);
const down = dir(0, 40);
const right = dir(40, 0);
const left = dir(-40, 0);
check(up.active && near(up.dirZ, -1) && near(up.dirX, 0), 'up -> dirZ -1');
check(down.active && near(down.dirZ, 1) && near(down.dirX, 0), 'down -> dirZ +1');
check(right.active && near(right.dirX, 1) && near(right.dirZ, 0), 'right -> dirX +1');
check(left.active && near(left.dirX, -1) && near(left.dirZ, 0), 'left -> dirX -1');

// Diagonals are unit vectors
for (const [dx, dy] of [[40, -40], [-40, -40], [40, 40], [-40, 40], [500, -123]]) {
  const d = dir(dx, dy);
  check(d.active && near(Math.hypot(d.dirX, d.dirZ), 1), `diagonal (${dx},${dy}) is normalized`);
}
const ur = dir(40, -40);
check(ur.dirX > 0 && ur.dirZ < 0, 'up-right points to +X, -Z');

// Strength: monotonic, within 0..1
let prev = -1;
let monotonic = true;
let bounded = true;
for (let len = 16; len <= 200; len += 2) {
  const s = dir(0, -len).strength;
  if (s < prev) monotonic = false;
  if (s < 0 || s > 1) bounded = false;
  prev = s;
}
check(monotonic, 'strength is monotonic');
check(bounded, 'strength stays within 0..1');
check(near(dir(0, -R).strength, 1) && dir(0, -16).strength < 0.05, 'strength spans ~0 to 1');

// Hysteresis: activation at 0.25, release below 0.175
check(dir(0, -16).active, 'activates above the dead zone');
check(dir(0, -12, true).active, 'stays active inside the hysteresis band');
check(!dir(0, -12, false).active, 'without history the same offset is idle');
check(isZero(dir(0, -9, true)), 'releases below the release threshold');

// Safety
check(isZero(stickToDirection(30, -30, 0)), 'radius 0 is safe');
check(isZero(stickToDirection(30, -30, -5)), 'negative radius is safe');
check(isZero(stickToDirection(NaN, 10, R)), 'NaN input is safe');
check(isZero(stickToDirection(10, 10, NaN)), 'NaN radius is safe');

// Steering: shortest way across the +-PI seam
check(near(shortestAngle(3.0, -3.0), 2 * Math.PI - 6.0), 'shortest angle 3.0 -> -3.0 goes through PI');
check(shortestAngle(3.0, -3.0) > 0, 'turns positive (through PI), not the long way');
check(near(shortestAngle(-3.0, 3.0), -(2 * Math.PI - 6.0)), 'mirrored seam crossing');
check(near(shortestAngle(0, 7 * Math.PI), Math.PI) || near(shortestAngle(0, 7 * Math.PI), -Math.PI), 'wraps large angles');
const stepped = stepYaw(3.0, -3.0, 9, 1 / 60);
check(near(stepped, 3.0 + 9 / 60), 'one step is rate * dt toward the short side');
check(near(stepYaw(1, 1.01, 9, 1 / 60), 1.01), 'does not overshoot a small remaining angle');

// Convergence from 180 degrees within 0.4 s at 9 rad/s (60 Hz)
let yaw = Math.PI;
let steps = 0;
const target = 0;
while (Math.abs(shortestAngle(yaw, target)) > 1e-9 && steps < 600) {
  yaw = stepYaw(yaw, target, 9, 1 / 60);
  steps++;
}
check(steps / 60 <= 0.4, `converges from 180 deg in ${(steps / 60).toFixed(3)} s (<= 0.4 s)`);

// Seam convergence stays on the short path (never leaves the 3.0 -> -3.0 arc)
yaw = 3.0;
let longWay = false;
for (let i = 0; i < 60; i++) {
  yaw = stepYaw(yaw, -3.0, 9, 1 / 60);
  const d = Math.abs(shortestAngle(yaw, 3.0));
  if (d > 2 * Math.PI - 6.0 + 1e-9) longWay = true;
}
check(!longWay, 'seam crossing never takes the long way');

if (failures > 0) {
  console.error(`\n${failures}/${checks} joystick checks failed`);
  process.exit(1);
}
console.log(`OK  ${checks} joystick checks passed`);
