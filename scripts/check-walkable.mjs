// Headless checks for the walkable region of the map. Run with:
//   node --experimental-strip-types scripts/check-walkable.mjs
import { clampToWalkable, createWalkable, isWalkable, PLAYER_RADIUS, ROAD_HALF_WALK } from '../src/Experience/Map/walkable.ts';
import { NODES, PLACEMENTS, PLAZA_ID } from '../src/Experience/Map/mapLayout.ts';
import { PlayerMotion, PLAYER_MAX_SPEED } from '../src/Experience/Map/playerMotion.ts';

let failures = 0;
let checks = 0;

function check(ok, message) {
  checks++;
  if (!ok) {
    failures++;
    console.error(`FAIL  ${message}`);
  }
}

const nodes = new Map(NODES.map((n) => [n.id, n]));

// Stop nodes and the plaza are walkable (also with the robot radius)
for (const p of PLACEMENTS) {
  const stop = nodes.get(p.stop);
  check(isWalkable(stop.x, stop.z, PLAYER_RADIUS), `stop node ${p.stop} of ${p.pointId} is walkable`);
}
check(isWalkable(0, 0, PLAYER_RADIUS), 'the plaza center is walkable');
check(isWalkable(5.5, 0, PLAYER_RADIUS), 'the plaza rim is walkable');
for (const n of NODES) check(isWalkable(n.x, n.z, PLAYER_RADIUS), `node ${n.id} is walkable`);

// Landmark centers (deep inside buildings) are not walkable
for (const p of PLACEMENTS) check(!isWalkable(p.x, p.z), `landmark center of ${p.pointId} is not walkable`);
check(!isWalkable(-20, -5), 'open grass between districts is not walkable');
check(!isWalkable(200, 200), 'far outside the map is not walkable');

// clampToWalkable: result walkable, idempotent, never moves walkable points
let seed = 12345;
const rnd = () => {
  seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0;
  return seed / 4294967296;
};
let outsideCount = 0;
let allWalkable = true;
let idempotent = true;
let unmoved = true;
for (let i = 0; i < 4000; i++) {
  const x = (rnd() - 0.5) * 110;
  const z = (rnd() - 0.5) * 80;
  const c = clampToWalkable(x, z, PLAYER_RADIUS);
  if (!isWalkable(c.x, c.z, PLAYER_RADIUS)) allWalkable = false;
  const c2 = clampToWalkable(c.x, c.z, PLAYER_RADIUS);
  if (c2.x !== c.x || c2.z !== c.z) idempotent = false;
  if (isWalkable(x, z, PLAYER_RADIUS)) {
    if (c.x !== x || c.z !== z) unmoved = false;
  } else {
    outsideCount++;
  }
}
check(outsideCount > 500, `the random sample has many outside points (${outsideCount})`);
check(allWalkable, 'clampToWalkable always returns a walkable point');
check(idempotent, 'clampToWalkable is idempotent');
check(unmoved, 'clampToWalkable never moves a walkable point');

// Nearest: the clamp of an outside point is the closest walkable point (compare with brute force)
{
  const w = createWalkable();
  let ok = true;
  for (let i = 0; i < 300; i++) {
    const x = (rnd() - 0.5) * 110;
    const z = (rnd() - 0.5) * 80;
    const c = w.clampToWalkable(x, z, PLAYER_RADIUS);
    const d = Math.hypot(c.x - x, c.z - z);
    for (let j = 0; j < 40; j++) {
      const a = rnd() * Math.PI * 2;
      const r = rnd() * (d + 3);
      const px = x + Math.cos(a) * r;
      const pz = z + Math.sin(a) * r;
      if (w.isWalkable(px, pz, PLAYER_RADIUS) && Math.hypot(px - x, pz - z) < d - 1e-4) ok = false;
    }
  }
  check(ok, 'no walkable point is closer than the clamped one');
}

// Sliding: pushing diagonally into the south edge of the Carreras street keeps the along-wall part
{
  const edgeZ = -13 + ROAD_HALF_WALK - PLAYER_RADIUS; // south boundary of the street (center walk limit)
  const from = { x: 8, z: edgeZ - 0.05 };
  const to = { x: from.x + 0.3, z: from.z + 0.3 };
  const c = clampToWalkable(to.x, to.z, PLAYER_RADIUS);
  check(Math.abs(c.x - to.x) < 1e-6, `slides along the wall (x ${c.x.toFixed(3)} keeps ${to.x})`);
  check(c.z <= edgeZ + 1e-9 && c.z > edgeZ - 1e-3, `stays on the wall line (z ${c.z.toFixed(4)} ~ ${edgeZ.toFixed(4)})`);
}

// Player motion: sliding, speed cap, easing and diagonals
{
  const w = createWalkable();
  const clamp = (x, z, out) => w.clampInto(x, z, PLAYER_RADIUS, out);
  const p = new PlayerMotion();
  p.reset(8, -13, 0, 0);
  let maxSpeed = 0;
  for (let i = 0; i < 120; i++) {
    p.step(1 / 60, 1, 1, 1, clamp); // diagonal into the south wall, towards +X
    maxSpeed = Math.max(maxSpeed, p.speed);
  }
  check(p.x > 8.5, `the player keeps advancing along the wall (x=${p.x.toFixed(2)})`);
  check(isWalkable(p.x, p.z, PLAYER_RADIUS), 'the player ends on walkable ground');
  check(maxSpeed <= PLAYER_MAX_SPEED + 1e-9, `speed never exceeds the cap (${maxSpeed.toFixed(3)})`);

  const q = new PlayerMotion();
  q.reset(0, 0, 0, 0);
  q.step(1 / 60, 1, 1, 1, clamp);
  check(q.speed < PLAYER_MAX_SPEED * 0.5, 'acceleration is eased (no instant top speed)');
  for (let i = 0; i < 120; i++) q.step(1 / 60, 0, 0, 0, clamp);
  check(q.speed < 1e-6 || q.speed < 0.05, 'releasing the input brakes to a stop');
  const diag = new PlayerMotion();
  diag.reset(0, 0, 0, 0);
  for (let i = 0; i < 40; i++) diag.step(1 / 60, 1, 1, 1, (x, z, o) => { o.x = x; o.z = z; });
  check(diag.speed <= PLAYER_MAX_SPEED + 1e-9, 'diagonals are normalized');
}

// Plaza is part of the region and the id is known
check(nodes.has(PLAZA_ID), 'plaza node exists');

if (failures > 0) {
  console.error(`\n${failures} of ${checks} walkable checks failed`);
  process.exit(1);
}
console.log(`OK  ${checks} walkable checks passed`);
