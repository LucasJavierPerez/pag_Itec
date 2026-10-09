// Headless checks for the pure parts of the client networking layer. Run with:
//   node --experimental-strip-types scripts/check-net.mjs
import {
  MAX_EXTRAPOLATION_MS,
  RENDER_DELAY_MS,
  STALE_SPEED_FADE_MS,
  SnapshotBuffer,
  TELEPORT_DISTANCE,
  createSample,
  shortestArc,
} from '../src/Experience/Map/net/interpolation.ts';
import { ClockSync, MAX_SLEW_MS, RTT_WINDOW, SNAP_THRESHOLD_MS } from '../src/Experience/Map/net/clockSync.ts';
import {
  BACKOFF_JITTER,
  BACKOFF_MAX_MS,
  MAX_ATTEMPTS,
  MAX_ROOMS,
  backoffDelay,
  roomAt,
  shouldGiveUp,
} from '../src/Experience/Map/net/backoff.ts';
import { Presence } from '../src/Experience/Map/net/presence.ts';
import { getSharedTimeMs } from '../src/Experience/Map/sharedTime.ts';

let failures = 0;
let checks = 0;
function check(ok, message) {
  checks++;
  if (!ok) {
    failures++;
    console.error(`FAIL  ${message}`);
  }
}
const near = (a, b, eps = 1e-6) => Math.abs(a - b) <= eps;

// ------------------------------------------------------------------ shortestArc
check(near(shortestArc(0, 1), 1), 'shortestArc simple');
check(near(shortestArc(3, -3), 2 * Math.PI - 6), 'shortestArc across +PI/-PI goes the short way');
check(near(shortestArc(-3, 3), -(2 * Math.PI - 6)), 'shortestArc across -PI/+PI (negative)');
check(Math.abs(shortestArc(0, 7 * Math.PI)) <= Math.PI + 1e-9, 'shortestArc stays within PI for big inputs');

// ------------------------------------------------------------------ interpolation
{
  const b = new SnapshotBuffer();
  const o = createSample();
  check(b.sample(0, o).empty === true, 'empty buffer reports empty');
  for (let i = 0; i <= 10; i++) b.push(1000 + i * 100, i * 1.0, -i * 0.5, 0, 1);
  let prev = -Infinity;
  let mono = true;
  for (let t = 1000; t <= 2000; t += 7) {
    b.sample(t, o);
    if (o.x < prev - 1e-9) mono = false;
    prev = o.x;
  }
  check(mono, 'x is monotonic across the buffered range');
  b.sample(1250, o);
  check(near(o.x, 2.5) && near(o.z, -1.25), 'linear interpolation midway between snapshots');
  b.sample(900, o);
  check(near(o.x, 0), 'before the first snapshot the first one is held');
}
{
  // Heading across +-PI takes the short arc
  const b = new SnapshotBuffer();
  const o = createSample();
  b.push(0, 0, 0, 3.0, 1);
  b.push(100, 1, 0, -3.0, 1);
  b.sample(50, o);
  const expected = 3.0 + shortestArc(3.0, -3.0) * 0.5;
  check(near(o.h, expected), 'heading interpolates through PI, not through 0');
  check(Math.abs(o.h) > 3.0, 'heading midpoint stays near +-PI');
}
{
  // Late snapshots: bounded extrapolation then speed fade
  const b = new SnapshotBuffer();
  const o = createSample();
  b.push(0, 0, 0, 0, 1);
  b.push(100, 1, 0, 0, 1);
  b.sample(100 + MAX_EXTRAPOLATION_MS / 2, o);
  check(near(o.x, 1 + (MAX_EXTRAPOLATION_MS / 2) / 100), 'extrapolates at last velocity');
  b.sample(100 + MAX_EXTRAPOLATION_MS, o);
  const cap = o.x;
  b.sample(100 + MAX_EXTRAPOLATION_MS + 1000, o);
  check(near(o.x, cap), 'extrapolation never goes past the cap');
  check(o.s === 0, 'speed faded to 0 when snapshots stay late');
  b.sample(100 + MAX_EXTRAPOLATION_MS + STALE_SPEED_FADE_MS / 2, o);
  check(o.s > 0 && o.s < 1, 'speed fades gradually');
}
{
  // A peer that reported s=0 does not glide
  const b = new SnapshotBuffer();
  const o = createSample();
  b.push(0, 0, 0, 0, 1);
  b.push(100, 1, 0, 0, 0);
  b.sample(200, o);
  check(near(o.x, 1) && o.s === 0, 'stopped peer is not extrapolated');
}
{
  // Out of order / duplicate / non-finite
  const b = new SnapshotBuffer();
  check(b.push(100, 0, 0, 0, 0) === true, 'first push accepted');
  check(b.push(100, 1, 0, 0, 0) === false, 'duplicate timestamp dropped');
  check(b.push(50, 1, 0, 0, 0) === false, 'older timestamp dropped');
  check(b.push(Number.NaN, 1, 0, 0, 0) === false, 'NaN dropped');
  check(b.push(200, Number.POSITIVE_INFINITY, 0, 0, 0) === false, 'Infinity dropped');
  check(b.size === 1, 'only the valid snapshot is kept');
}
{
  // Teleport
  const b = new SnapshotBuffer();
  const o = createSample();
  b.push(0, 0, 0, 0, 1);
  b.push(100, 5, 0, 0, 1);
  const before = b.teleports;
  b.push(200, 5 + TELEPORT_DISTANCE + 1, 0, 0, 1);
  check(b.teleports === before + 1 && b.size === 1, 'jump above the threshold clears history');
  b.sample(150, o);
  check(near(o.x, 5 + TELEPORT_DISTANCE + 1), 'teleport snaps instead of gliding');
  b.push(300, 5 + TELEPORT_DISTANCE + 4, 0, 0, 1);
  check(b.teleports === before + 1, 'a normal step is not a teleport');
}
{
  // Ring buffer wraps without losing order
  const b = new SnapshotBuffer();
  const o = createSample();
  for (let i = 0; i < 100; i++) b.push(i * 100, i * 0.1, 0, 0, 1);
  b.sample(9500 - 50, o);
  check(near(o.x, 9.45, 1e-6), 'interpolation still right after the ring buffer wrapped');
  check(b.size <= 32, 'buffer is bounded');
}
check(RENDER_DELAY_MS >= 80 && RENDER_DELAY_MS <= 200, 'render delay is in the sane range');

// ------------------------------------------------------------------ clock sync
{
  let local = 1_000_000;
  const c = new ClockSync(() => local);
  check(c.serverNow() === 1_000_000 && !c.synced, 'unsynced clock is the local clock');
  // Server is 250 ms ahead; true one-way latency 40 ms
  c.onWelcome(local + 250 - 40, local, 300);
  check(c.synced, 'welcome marks the clock as synced');
  for (let i = 0; i < 6; i++) c.addRtt(80);
  check(near(c.rtt, 80), 'rtt median converges');
  check(near(c.targetOffset, 250, 1e-9), 'offset uses rtt/2 correction');
  // outlier rejection
  const accepted = c.addRtt(900);
  check(accepted === false, 'a huge rtt sample is rejected as outlier');
  check(near(c.rtt, 80), 'median unaffected by the outlier');
  check(c.addRtt(-5) === false && c.addRtt(Number.NaN) === false, 'invalid rtt samples are rejected');
  // median of the last RTT_WINDOW
  const m = new ClockSync(() => local);
  m.onWelcome(local, local, 0);
  [50, 60, 70, 80, 90].forEach((v) => m.addRtt(v));
  m.addRtt(95);
  check(RTT_WINDOW === 5, 'window is 5');
  check(near(m.rtt, 80), 'median keeps only the last 5 samples (60,70,80,90,95)');
  // slewing never jumps more than the limit
  let maxStep = 0;
  let last = c.offset;
  let steps = 0;
  while (Math.abs(c.offset - c.targetOffset) > 1e-9 && steps < 1000) {
    c.step();
    maxStep = Math.max(maxStep, Math.abs(c.offset - last));
    last = c.offset;
    steps++;
  }
  check(maxStep <= MAX_SLEW_MS + 1e-9, 'slew never exceeds the per-frame limit');
  check(near(c.offset, 250, 1e-9) && steps === 50, `offset reaches target in ${steps} steps (expected 50)`);
  check(near(c.serverNow(), local + 250, 1e-9), 'serverNow applies the offset');
  // reset glides back to local
  c.reset();
  let s2 = 0;
  while (Math.abs(c.offset) > 1e-9 && s2 < 1000) c.step();
  check(near(c.offset, 0) && !c.synced, 'reset slews back to the local clock');
  // absurd offset snaps
  const z = new ClockSync(() => local);
  z.onWelcome(local + SNAP_THRESHOLD_MS * 4, local, 0);
  check(near(z.offset, z.targetOffset), 'a broken local clock snaps once');
  // monotonic-ish: successive serverNow values with slewing never go backwards for positive local progress
  const w = new ClockSync(() => local);
  w.onWelcome(local - 300, local, 0);
  let prev = w.serverNow();
  let back = false;
  for (let i = 0; i < 100; i++) {
    local += 16;
    w.step();
    const now = w.serverNow();
    if (now < prev) back = true;
    prev = now;
  }
  check(!back, 'negative offset corrections still never move time backwards (5 ms < 16 ms frame)');
}
check(typeof getSharedTimeMs() === 'number' && Math.abs(getSharedTimeMs() - Date.now()) < 50, 'getSharedTimeMs is the local clock when offline');

// ------------------------------------------------------------------ backoff & rooms
{
  let prevMax = 0;
  let ok = true;
  for (let a = 0; a < 12; a++) {
    const lo = backoffDelay(a, () => 0);
    const hi = backoffDelay(a, () => 0.999999);
    const raw = Math.min(BACKOFF_MAX_MS, 1000 * 2 ** a);
    if (lo < Math.round(raw * (1 - BACKOFF_JITTER)) - 1 || hi > Math.min(BACKOFF_MAX_MS, raw * (1 + BACKOFF_JITTER) + 1)) ok = false;
    if (hi > BACKOFF_MAX_MS) ok = false;
    if (hi < prevMax * 0.5) ok = false;
    prevMax = hi;
  }
  check(ok, 'backoff stays within jitter bounds and the 30 s cap');
  check(backoffDelay(0, () => 0.5) === 1000, 'first retry waits ~1 s at the jitter midpoint');
  check(backoffDelay(20, () => 0.5) === BACKOFF_MAX_MS, 'backoff caps at 30 s');
  check(backoffDelay(3, () => 0.5) === 8000, 'exponential growth (attempt 3 = 8 s)');
  const spread = new Set();
  for (let i = 0; i < 50; i++) spread.add(backoffDelay(2));
  check(spread.size > 5, 'jitter produces different delays');
  check(!shouldGiveUp(MAX_ATTEMPTS - 1) && shouldGiveUp(MAX_ATTEMPTS), 'gives up after 8 attempts');
  check(MAX_ATTEMPTS === 8, 'MAX_ATTEMPTS is 8');
  const seq = [];
  for (let i = 0; i < MAX_ROOMS + 2; i++) seq.push(roomAt(i));
  check(seq.slice(0, 5).join(',') === 'main,main-2,main-3,main-4,main-5' && seq[5] === null, `room fallback sequence (${seq.join(',')})`);
  check(roomAt(-1) === null && roomAt(1.5) === null, 'invalid room index yields null');
}

// ------------------------------------------------------------------ presence
{
  const p = new Presence();
  const peer = (id, nick) => ({ id, nick, character: 'robot', palette: 'clasico', x: 0, z: 0, h: 0, s: 0 });
  check(p.count === 0, 'empty presence has no people');
  p.reset('me', [peer('a', 'Ana'), peer('b', 'Beto')], 10);
  check(p.count === 3 && p.selfId === 'me', 'count includes yourself');
  check(p.join(peer('me', 'Yo'), 11) === null, 'own join echo is ignored');
  check(p.join(peer('c', 'Cami'), 12) !== null && p.count === 4, 'join adds a peer');
  p.touch('a', 99);
  check(p.get('a').lastSeen === 99, 'touch updates last seen');
  check(p.setNick('a', 'Anita', 100)?.nick === 'Anita', 'rename updates the nick');
  check(p.setAppearance('b', 'gato', 'rosa', 101)?.character === 'gato', 'appearance updates the look');
  check(p.setNick('zzz', 'x', 1) === null && p.setAppearance('zzz', 'robot', 'clasico', 1) === null, 'unknown ids are ignored');
  check(p.leave('b') === true && p.leave('b') === false && p.count === 3, 'leave removes once');
  p.clear();
  check(p.count === 0 && p.selfId === null, 'clear empties everything');
}

if (failures) {
  console.error(`\n${failures} of ${checks} checks failed`);
  process.exit(1);
}
console.log(`OK  ${checks} checks passed`);
