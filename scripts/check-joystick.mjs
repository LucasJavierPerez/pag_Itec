// Headless checks for the joystick mapping. Run with:
//   node --experimental-strip-types scripts/check-joystick.mjs
import { stickToKeys } from '../src/UI/joystickMapping.ts';

let failures = 0;
let checks = 0;

function check(ok, message) {
  checks++;
  if (!ok) {
    failures++;
    console.error(`FAIL  ${message}`);
  }
}

const R = 60;
const key = (k) => `${+k.forward}${+k.backward}${+k.left}${+k.right}`;
const at = (dx, dy, prev) => key(stickToKeys(dx, dy, R, 0.25, prev));

// Dead zone: nothing below 25% of the radius, in any direction
check(at(0, 0) === '0000', 'center is idle');
check(at(10, -10) === '0000', 'inside dead zone is idle');
check(at(14, 0) === '0000' && at(0, -14) === '0000', 'just inside dead zone is idle');

// Four axes
check(at(0, -40) === '1000', 'up = forward');
check(at(0, 40) === '0100', 'down = backward');
check(at(-40, 0) === '0010', 'left = left');
check(at(40, 0) === '0001', 'right = right');

// Diagonals
check(at(40, -40) === '1001', 'up-right = forward + right');
check(at(-40, -40) === '1010', 'up-left = forward + left');
check(at(40, 40) === '0101', 'down-right = backward + right');
check(at(-40, 40) === '0110', 'down-left = backward + left');

// Hysteresis: activation at 0.25, release below 0.175
const on = stickToKeys(0, -16, R, 0.25);
check(key(on) === '1000', 'activates above the dead zone');
check(key(stickToKeys(0, -12, R, 0.25, on)) === '1000', 'stays active inside the hysteresis band');
check(key(stickToKeys(0, -12, R, 0.25)) === '0000', 'without history the same offset is idle');
check(key(stickToKeys(0, -9, R, 0.25, on)) === '0000', 'releases below the release threshold');

// Safety
check(key(stickToKeys(30, -30, 0)) === '0000', 'radius 0 is safe');
check(key(stickToKeys(30, -30, -5)) === '0000', 'negative radius is safe');
check(key(stickToKeys(NaN, 10, R)) === '0000', 'NaN input is safe');
check(at(500, -500) === '1001', 'offsets beyond the radius still map');

if (failures > 0) {
  console.error(`\n${failures}/${checks} joystick checks failed`);
  process.exit(1);
}
console.log(`OK  ${checks} joystick checks passed`);
