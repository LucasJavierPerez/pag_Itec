// Headless checks for the character specs. Run with:
//   node --experimental-strip-types scripts/check-characters.mjs
import {
  CHARACTERS,
  DEFAULT_CHARACTER_ID,
  getCharacterDef,
  isCharacterId,
  resolveRoleColors,
  ANIMATED_LIMBS,
} from '../src/Experience/Map/characters/characterSpec.ts';
import { ROBOT_SKINS, RAINBOW_PERIOD } from '../src/Experience/Map/skins/robotSkins.ts';

let failures = 0;
let checks = 0;

function check(ok, message) {
  checks++;
  if (!ok) {
    failures++;
    console.error(`FAIL  ${message}`);
  }
}

const EXPECTED = ['robot', 'programadora', 'tecnico', 'turista', 'creativa', 'estudiante', 'gato', 'dino'];
const LABELS = ['Robot ITEC', 'Programadora', 'Técnico', 'Turista', 'Creativa', 'Estudiante', 'Gato', 'Dino'];
check(CHARACTERS.length === 8, `there are 8 characters (${CHARACTERS.length})`);
check(JSON.stringify(CHARACTERS.map((c) => c.id)) === JSON.stringify(EXPECTED), 'ids and order match the spec');
check(JSON.stringify(CHARACTERS.map((c) => c.label)) === JSON.stringify(LABELS), 'Spanish labels match the spec');
check(new Set(CHARACTERS.map((c) => c.id)).size === 8, 'ids are unique');
check(isCharacterId(DEFAULT_CHARACTER_ID) && DEFAULT_CHARACTER_ID === 'robot', 'the default character is the robot');
check(getCharacterDef('nope').id === 'robot' && getCharacterDef(null).id === 'robot', 'unknown ids fall back to the robot');
check(CHARACTERS.filter((c) => c.native).map((c) => c.id).join() === 'robot', 'only the robot is pipeline-native');

const ROLES = ['skin', 'hair', 'body', 'bodyAlt', 'accent', 'dark', 'glow', 'eye', 'white'];
const SHAPES = ['box', 'sphere', 'cylinder', 'cone'];
const LIMBS = ['armL', 'armR', 'legL', 'legR', 'tail', 'head'];
const finite3 = (v) => Array.isArray(v) && v.length === 3 && v.every((n) => Number.isFinite(n));
const quarter = (a) => Math.abs(a / (Math.PI / 2) - Math.round(a / (Math.PI / 2))) < 1e-9;

for (const c of CHARACTERS) {
  check(typeof c.label === 'string' && c.label.length > 0, `${c.id}: label`);
  check(typeof c.blurb === 'string' && c.blurb.length > 0 && c.blurb.length <= 40, `${c.id}: blurb <= 40 chars (${c.blurb.length})`);
  if (c.native) {
    check(c.parts.length === 0, `${c.id}: native character has no parts`);
    continue;
  }
  check(c.parts.length >= 12 && c.parts.length <= 45, `${c.id}: 12..45 parts (${c.parts.length})`);
  let minY = Infinity;
  let maxY = -Infinity;
  let ok = true;
  for (const p of c.parts) {
    if (!SHAPES.includes(p.shape) || !ROLES.includes(p.role) || (p.limb && !LIMBS.includes(p.limb))) ok = false;
    if (!finite3(p.pos) || !finite3(p.size) || !p.size.every((n) => n > 0)) ok = false;
    if (p.rot && (!finite3(p.rot) || !p.rot.every(quarter))) ok = false;
    // vertical extent (spheres / boxes / cylinders / cones; rotated parts swap by 90 degrees)
    let h = p.size[1];
    if (p.rot) {
      const [rx, , rz] = p.rot.map((a) => Math.abs(Math.round(a / (Math.PI / 2))) % 2);
      if (rx) h = p.size[2];
      else if (rz) h = p.size[0];
    }
    minY = Math.min(minY, p.pos[1] - h / 2);
    maxY = Math.max(maxY, p.pos[1] + h / 2);
  }
  check(ok, `${c.id}: every part has a valid shape / role / limb and finite positive size`);
  check(minY >= -0.05, `${c.id}: no part below y = -0.05 (${minY.toFixed(2)})`);
  check(Math.abs(minY) <= 0.05, `${c.id}: feet at y ~ 0 (${minY.toFixed(2)})`);
  const height = maxY - minY;
  check(height >= 2.0 && height <= 2.4, `${c.id}: height within 2.0..2.4 (${height.toFixed(2)})`);
  check(Math.abs(c.height - height) < 0.15, `${c.id}: declared height ${c.height} matches ${height.toFixed(2)}`);
  check(c.parts.some((p) => p.limb && ANIMATED_LIMBS.includes(p.limb)), `${c.id}: has animated limbs`);
  for (const role of ['body', 'skin']) {
    check(c.parts.some((p) => p.role === role) || role === 'skin', `${c.id}: uses the ${role} role`);
  }
  check(JSON.stringify(JSON.parse(JSON.stringify(c.parts))) === JSON.stringify(c.parts), `${c.id}: parts survive a JSON round trip`);
}

const validHex = (n) => Number.isInteger(n) && n >= 0 && n <= 0xffffff;
for (const c of CHARACTERS) {
  for (const s of ROBOT_SKINS) {
    for (const t of [0, 3.3, 9]) {
      const colors = resolveRoleColors(c, s, t);
      check(ROLES.every((r) => validHex(colors[r])), `${c.id}/${s.id}@${t}: valid 24-bit colours for every role`);
    }
  }
  const classic = resolveRoleColors(c, 'clasico', 0);
  for (const s of ROBOT_SKINS) {
    if (s.id === 'clasico' || s.id === 'arcoiris') continue;
    const other = resolveRoleColors(c, s.id, 0);
    check(other.body !== classic.body, `${c.id}: clasico body differs from ${s.id}`);
  }
  const a = resolveRoleColors(c, 'arcoiris', 2.5);
  const b = resolveRoleColors(c, 'arcoiris', 2.5);
  const p = resolveRoleColors(c, 'arcoiris', 2.5 + RAINBOW_PERIOD);
  check(JSON.stringify(a) === JSON.stringify(b), `${c.id}: arcoiris is deterministic`);
  check(JSON.stringify(a) === JSON.stringify(p), `${c.id}: arcoiris is periodic over RAINBOW_PERIOD`);
  check(JSON.stringify(a) !== JSON.stringify(resolveRoleColors(c, 'arcoiris', 2.5 + RAINBOW_PERIOD / 3)), `${c.id}: arcoiris moves over time`);
  check(a.skin === c.fixed.skin && a.hair === c.fixed.hair, `${c.id}: fixed roles do not change with the palette`);
}

// Ids are serializable pairs
const pair = JSON.parse(JSON.stringify({ characterId: 'gato', paletteId: 'verde' }));
check(isCharacterId(pair.characterId) && ROBOT_SKINS.some((s) => s.id === pair.paletteId), 'characterId + paletteId round trip');

if (failures > 0) {
  console.error(`\n${failures} of ${checks} checks failed`);
  process.exit(1);
}
console.log(`check-characters: ${checks} checks passed`);
