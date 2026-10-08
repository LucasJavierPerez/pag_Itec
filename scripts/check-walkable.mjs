// Headless checks for the walkable region of the map. Run with:
//   node --experimental-strip-types scripts/check-walkable.mjs
import {
  clampToWalkable,
  createWalkable,
  isWalkable,
  PLAYER_RADIUS,
  ROAD_HALF_WALK,
  SECRET_WALK,
} from '../src/Experience/Map/walkable.ts';
import {
  ADA_SECRET,
  MAP_SIZE,
  NODES,
  PLACEMENTS,
  PLAZA_ID,
  SECRET_PATH,
  SECRET_PATH_HALF_WIDTH,
} from '../src/Experience/Map/mapLayout.ts';
import { MAP_POINTS } from '../src/UI/MapData.ts';
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

// ---- Easter egg: the pad is reachable only through the hidden path, and it is not inside a building
{
  const base = createWalkable();
  const secret = createWalkable(SECRET_WALK);
  check(!base.isWalkable(ADA_SECRET.x, ADA_SECRET.z, PLAYER_RADIUS), 'the secret pad is NOT walkable without the hidden path');
  check(secret.isWalkable(ADA_SECRET.x, ADA_SECRET.z, PLAYER_RADIUS), 'the secret pad is walkable with the hidden path');
  check(ADA_SECRET.radius > 0 && ADA_SECRET.radius < 3, 'the trigger radius is small');

  // Connectivity: shapes are linked when the walkable space shrunk by the robot radius still overlaps
  const segDist = (s, t) => {
    const pd = (px, pz, a) => {
      const dx = a.bx - a.ax;
      const dz = a.bz - a.az;
      const l2 = dx * dx + dz * dz;
      const k = l2 === 0 ? 0 : Math.max(0, Math.min(1, ((px - a.ax) * dx + (pz - a.az) * dz) / l2));
      return Math.hypot(px - (a.ax + dx * k), pz - (a.az + dz * k));
    };
    return Math.min(pd(s.ax, s.az, t), pd(s.bx, s.bz, t), pd(t.ax, t.az, s), pd(t.bx, t.bz, s));
  };
  const shapes = secret.shapes;
  const link = (i, j) => segDist(shapes[i], shapes[j]) < shapes[i].r + shapes[j].r - 2 * PLAYER_RADIUS - 1e-6;
  const plazaIdx = shapes.findIndex((s) => s.ax === 0 && s.az === 0 && s.bx === 0 && s.bz === 0 && s.r > 5);
  const padIdx = shapes.findIndex((s) => s.ax === ADA_SECRET.x && s.az === ADA_SECRET.z && s.bx === ADA_SECRET.x && s.bz === ADA_SECRET.z);
  const seen = new Set([plazaIdx]);
  const queue = [plazaIdx];
  while (queue.length) {
    const i = queue.shift();
    for (let j = 0; j < shapes.length; j++) {
      if (!seen.has(j) && link(i, j)) {
        seen.add(j);
        queue.push(j);
      }
    }
  }
  check(plazaIdx >= 0 && padIdx >= 0, 'plaza and secret pad shapes were found');
  check(seen.has(padIdx), 'the secret pad is connected to the plaza through walkable shapes');

  // Walk it for real: from the plaza to the pad with the player motion, using only the hidden path
  const clamp = (x, z, out) => secret.clampInto(x, z, PLAYER_RADIUS, out);
  const walker = new PlayerMotion();
  walker.reset(0, 0, 0, 0);
  // Waypoints along the roads and the hidden path (what a player would steer through)
  const way = [[0, 9.5], [0, 18], [10, 18], [10, ADA_SECRET.z]];
  let reached = false;
  for (const [wx, wz] of way) {
    for (let i = 0; i < 2400; i++) {
      const dx = wx - walker.x;
      const dz = wz - walker.z;
      const d = Math.hypot(dx, dz);
      if (d < 0.6) break;
      walker.step(1 / 60, dx / d, dz / d, 1, clamp);
    }
  }
  reached = Math.hypot(walker.x - ADA_SECRET.x, walker.z - ADA_SECRET.z) < ADA_SECRET.radius;
  check(reached, `the player walks from the plaza onto the secret pad (ended at ${walker.x.toFixed(1)}, ${walker.z.toFixed(1)})`);

  // Not inside any building footprint (Secundario: exact rectangle; the rest: a generous circle)
  const ada = PLACEMENTS.find((p) => p.pointId === 'ada-byron');
  const rect = { x0: ada.x - 5.7, x1: ada.x + 5.7, z0: ada.z - 2.95, z1: ada.z + 2.95 };
  const radiusOf = { sede: 5.6, carrera: 3.6, servicio: 3.2, trayecto: 7.2, secundario: 0, contacto: 2.4 };
  const insideAny = (x, z, margin) => {
    for (const p of PLACEMENTS) {
      const cat = MAP_POINTS.find((m) => m.id === p.pointId).category;
      if (cat === 'secundario') {
        if (x > rect.x0 - margin && x < rect.x1 + margin && z > rect.z0 - margin && z < rect.z1 + margin) return true;
      } else if (Math.hypot(x - p.x, z - p.z) < radiusOf[cat] + margin) return true;
    }
    return false;
  };
  check(!insideAny(ADA_SECRET.x, ADA_SECRET.z, ADA_SECRET.radius), 'the secret pad is outside every building footprint');
  let pathClear = true;
  for (const seg of SECRET_PATH) {
    for (let k = 0; k <= 40; k++) {
      const x = seg.ax + ((seg.bx - seg.ax) * k) / 40;
      const z = seg.az + ((seg.bz - seg.az) * k) / 40;
      if (insideAny(x, z, SECRET_PATH_HALF_WIDTH)) pathClear = false;
    }
  }
  check(pathClear, 'the hidden path never crosses a building footprint');
  check(
    ADA_SECRET.z + ADA_SECRET.radius < MAP_SIZE.cz + MAP_SIZE.d / 2 && ADA_SECRET.z > ada.z + 2.95,
    'the pad lies behind (south of) the Secundario and inside the map',
  );
  check(!isWalkable(ADA_SECRET.x + 6, ADA_SECRET.z), 'the grass around the pad stays unwalkable (base region unchanged)');
}

// Plaza is part of the region and the id is known
check(nodes.has(PLAZA_ID), 'plaza node exists');

if (failures > 0) {
  console.error(`\n${failures} of ${checks} walkable checks failed`);
  process.exit(1);
}
console.log(`OK  ${checks} walkable checks passed`);
