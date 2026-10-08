// Headless checks for the deterministic bot simulation. Run with:
//   node --experimental-strip-types scripts/check-bots.mjs
import {
  BOTS,
  BOT_LEGS,
  BOT_PAUSE_MAX,
  BOT_PAUSE_MIN,
  BOT_SEED,
  BOT_SPEED,
  botCycleSeconds,
  botStatesAt,
  createBotSchedule,
  simulateBots,
} from '../src/Experience/Map/botSim.ts';
import { buildBotFacts, botLine } from '../src/Experience/Map/botFacts.ts';
import { createLayoutGraph, snapToGraph } from '../src/Experience/Map/roadGraph.ts';
import { ROAD_WIDTH } from '../src/Experience/Map/mapLayout.ts';
import { getRobotSkin } from '../src/Experience/Map/skins/robotSkins.ts';
import { getSharedTimeMs } from '../src/Experience/Map/sharedTime.ts';
import { MAP_POINTS } from '../src/UI/MapData.ts';

let failures = 0;
let checks = 0;

function check(ok, message) {
  checks++;
  if (!ok) {
    failures++;
    console.error(`FAIL  ${message}`);
  }
}

// Definitions
check(BOTS.length === 3, 'there are 3 bots');
check(JSON.stringify(BOTS.map((b) => b.name)) === JSON.stringify(['Tecno', 'Mecha', 'Turi']), 'bot names');
check(new Set(BOTS.map((b) => b.skin)).size === 3, 'bot skins are distinct');
for (const b of BOTS) check(getRobotSkin(b.skin).id === b.skin, `bot ${b.name} uses an existing skin`);
check(typeof getSharedTimeMs() === 'number' && Math.abs(getSharedTimeMs() - Date.now()) < 1000, 'getSharedTimeMs is the local clock for now');

// Two independent instantiations (separate graphs, separate schedules)
const graphA = createLayoutGraph();
const graphB = createLayoutGraph();
const a = createBotSchedule(BOT_SEED, graphA);
const b = createBotSchedule(BOT_SEED, graphB);
const cycles = a.tracks.map((_, i) => botCycleSeconds(a, i));
check(cycles.every((c) => c > 600), `cycles are long (${cycles.map((c) => c.toFixed(0)).join(', ')} s)`);
check(cycles.every((c, i) => c === botCycleSeconds(b, i)), 'cycle lengths match between instantiations');

const same = (x, y) =>
  x.length === y.length &&
  x.every((s, i) => s.x === y[i].x && s.z === y[i].z && s.heading === y[i].heading && s.state === y[i].state && s.leg === y[i].leg);

const times = [0, 1, 999, 1_700_000_000_000, 1_700_000_123_456, 4_102_444_800_000, 9_000_000_000_000_000, -12345];
for (const c of cycles) {
  for (const k of [1, 2, 7, 1000]) {
    times.push(c * k * 1000, c * k * 1000 - 1, c * k * 1000 + 1, c * k * 1000 - 50);
  }
}
let identical = true;
for (const t of times) if (!same(botStatesAt(a, t), botStatesAt(b, t))) identical = false;
check(identical, `identical states for ${times.length} times (far future and cycle seams included)`);
check(same(simulateBots(BOT_SEED, 1_700_000_000_000, graphA), botStatesAt(b, 1_700_000_000_000)), 'simulateBots matches the schedule');
check(!same(botStatesAt(a, 5000), botStatesAt(createBotSchedule(BOT_SEED + 1, graphA), 5000)), 'a different seed gives different bots');

// Reusing the output array does not change results
{
  const out = botStatesAt(a, 1234);
  const again = botStatesAt(a, 98765, out);
  check(again === out && same(again, botStatesAt(a, 98765)), 'the out array is reused without changing results');
}

// Walk the whole cycle (and across the seam) at 100 ms: on the graph, finite, speed-capped, pauses
let allFinite = true;
let maxOffRoad = 0;
let maxSpeed = 0;
const pausing = [0, 0, 0];
let walking = 0;
const pauseRuns = [[], [], []];
const run = [0, 0, 0];
for (let i = 0; i < 3; i++) {
  const c = cycles[i];
  let prev = null;
  const step = 0.1;
  const from = 0;
  const to = c + 30;
  for (let t = from; t <= to; t += step) {
    // Sample around the seam too: shift by a large whole number of cycles
    const abs = (Math.round(2000 * c) + t) * 1000;
    const s = botStatesAt(a, abs)[i];
    if (![s.x, s.z, s.heading].every(Number.isFinite)) allFinite = false;
    const snap = snapToGraph(graphA, s.x, s.z);
    maxOffRoad = Math.max(maxOffRoad, snap.dist);
    if (prev) maxSpeed = Math.max(maxSpeed, Math.hypot(s.x - prev.x, s.z - prev.z) / step);
    if (s.state === 'pausing') {
      pausing[i]++;
      run[i] += step;
    } else {
      walking++;
      if (run[i] > 0) pauseRuns[i].push(run[i]);
      run[i] = 0;
    }
    prev = { x: s.x, z: s.z };
  }
}
check(allFinite, 'no NaN / Infinity anywhere in the cycle');
check(maxOffRoad < 1e-6 && maxOffRoad < ROAD_WIDTH, `bots stay on the road graph (max distance ${maxOffRoad.toExponential(2)})`);
check(maxSpeed <= 4.6, `speed never exceeds 4.6 u/s (max ${maxSpeed.toFixed(4)}, nominal ${BOT_SPEED})`);
check(maxSpeed > 4.4, `bots really walk at ~${BOT_SPEED} u/s (max ${maxSpeed.toFixed(3)})`);
check(pausing.every((n) => n > 100), `every bot pauses (${pausing.join(', ')} samples)`);
check(walking > 1000, 'bots also walk');
const runs = pauseRuns.flat();
check(runs.length > 60, `many completed pauses were observed (${runs.length})`);
check(runs.every((r) => r >= BOT_PAUSE_MIN - 0.15 && r <= BOT_PAUSE_MAX + 0.15), 'pauses last 2-6 s');
check(BOT_LEGS === 120, 'cycle has 120 legs');

// Bubble facts come from MapData only
const facts = buildBotFacts(MAP_POINTS);
check(facts.length >= 15, `enough facts (${facts.length})`);
let fromData = true;
for (const f of facts) {
  const p = MAP_POINTS.find((x) => x.id === f.pointId);
  const stripped = f.text.replace(/\.$/, '');
  if (!p || !(p.description.includes(f.text) || p.highlights.some((h) => h.replace(/\.$/, '') === stripped))) fromData = false;
}
check(fromData, 'every fact is copied from MapData');
check(botLine('Tecno', facts[0]).startsWith('¡Hola! Soy Tecno.'), 'bubble text greets by name');

if (failures > 0) {
  console.error(`\n${failures} of ${checks} bot checks failed`);
  process.exit(1);
}
console.log(`OK  ${checks} bot checks passed`);
