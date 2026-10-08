// Headless checks for the robot skin data. Run with:
//   node --experimental-strip-types scripts/check-skins.mjs
import {
  ROBOT_SKINS,
  DEFAULT_SKIN_ID,
  RAINBOW_PERIOD,
  accentAt,
  getRobotSkin,
  hsvToHex,
  isRobotSkinId,
  rainbowHue,
} from '../src/Experience/Map/skins/robotSkins.ts';

let failures = 0;
let checks = 0;

function check(ok, message) {
  checks++;
  if (!ok) {
    failures++;
    console.error(`FAIL  ${message}`);
  }
}

const EXPECTED = ['clasico', 'rojo-itec', 'azul-itec', 'verde', 'dorado', 'nocturno', 'rosa', 'arcoiris'];
check(ROBOT_SKINS.length === 8, `there are 8 skins (${ROBOT_SKINS.length})`);
check(JSON.stringify(ROBOT_SKINS.map((s) => s.id)) === JSON.stringify(EXPECTED), 'ids and order match the spec');
check(new Set(ROBOT_SKINS.map((s) => s.id)).size === ROBOT_SKINS.length, 'ids are unique');
check(new Set(ROBOT_SKINS.map((s) => s.label)).size === ROBOT_SKINS.length, 'labels are unique');

const validHex = (n) => Number.isInteger(n) && n >= 0 && n <= 0xffffff;
for (const s of ROBOT_SKINS) {
  check(validHex(s.panel) && validHex(s.joint) && validHex(s.accent), `${s.id}: colors are valid 24-bit ints`);
  check(typeof s.label === 'string' && s.label.length > 0, `${s.id}: has a Spanish label`);
  check(s.emissive > 0 && s.emissive <= 3, `${s.id}: emissive multiplier is sane`);
  check(isRobotSkinId(s.id), `${s.id}: isRobotSkinId`);
}

check(isRobotSkinId(DEFAULT_SKIN_ID), 'the default skin exists');
check(getRobotSkin(null).id === DEFAULT_SKIN_ID, 'null falls back to the default');
check(getRobotSkin('nope').id === DEFAULT_SKIN_ID, 'unknown ids fall back to the default');
check(getRobotSkin('azul-itec').panel === 0x1a5276, 'azul-itec uses the 0x1a5276 family');
check(getRobotSkin(DEFAULT_SKIN_ID).original, 'clasico keeps the current look');
check(ROBOT_SKINS.filter((s) => s.animated).map((s) => s.id).join() === 'arcoiris', 'only arcoiris is animated');

// Rainbow: deterministic, periodic, slow, always a valid color
const rainbow = getRobotSkin('arcoiris');
let deterministic = true;
let valid = true;
for (let t = -30; t < 200; t += 0.37) {
  if (accentAt(rainbow, t) !== accentAt(rainbow, t)) deterministic = false;
  if (!validHex(accentAt(rainbow, t))) valid = false;
  const h = rainbowHue(t);
  if (!(h >= 0 && h < 1)) valid = false;
}
check(deterministic, 'the rainbow accent is deterministic for a given time');
check(valid, 'the rainbow accent is always a valid color and the hue stays in [0, 1)');
check(accentAt(rainbow, 3.3) === accentAt(rainbow, 3.3 + RAINBOW_PERIOD), 'the rainbow is periodic');
check(accentAt(rainbow, 0) !== accentAt(rainbow, RAINBOW_PERIOD / 3), 'the rainbow changes over time');
check(RAINBOW_PERIOD >= 8, 'the rainbow cycle is slow (>= 8 s)');
check(accentAt(getRobotSkin('rosa'), 12.3) === getRobotSkin('rosa').accent, 'static skins ignore time');
check(hsvToHex(0, 1, 1) === 0xff0000 && hsvToHex(1 / 3, 1, 1) === 0x00ff00 && hsvToHex(2 / 3, 1, 1) === 0x0000ff, 'hsvToHex primaries');

if (failures > 0) {
  console.error(`\n${failures} of ${checks} skin checks failed`);
  process.exit(1);
}
console.log(`OK  ${checks} skin checks passed`);
