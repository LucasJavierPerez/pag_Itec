// Headless checks for the map road graph. Run with:
//   node --experimental-strip-types scripts/check-roadgraph.mjs
import { createLayoutGraph, shortestPath, snapToGraph, routeFrom, polylineLength } from '../src/Experience/Map/roadGraph.ts';
import { PLACEMENTS, PLAZA_ID } from '../src/Experience/Map/mapLayout.ts';
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

const graph = createLayoutGraph();
const stops = PLACEMENTS.map((p) => p.stop);
const EPS = 1e-6;

// Every point has exactly one placement, and every placement a point
check(MAP_POINTS.length === PLACEMENTS.length, `points (${MAP_POINTS.length}) and placements (${PLACEMENTS.length}) match`);
for (const point of MAP_POINTS) {
  const placements = PLACEMENTS.filter((p) => p.pointId === point.id);
  check(placements.length === 1, `point ${point.id} has exactly one placement`);
}
for (const place of PLACEMENTS) {
  check(MAP_POINTS.some((p) => p.id === place.pointId), `placement ${place.pointId} has a MapPoint`);
}

// No point lies off the graph: stops are graph nodes sitting exactly on the roads,
// and each landmark stands within a short walk of its stop
for (const place of PLACEMENTS) {
  const node = graph.nodes.get(place.stop);
  check(Boolean(node), `stop ${place.stop} of ${place.pointId} exists in the graph`);
  if (!node) continue;
  const snap = snapToGraph(graph, node.x, node.z);
  check(snap.dist < EPS, `stop ${place.stop} lies on the road network (dist ${snap.dist})`);
  const walk = Math.hypot(place.x - node.x, place.z - node.z);
  check(walk <= 12, `landmark ${place.pointId} is within 12 units of its stop (${walk.toFixed(1)})`);
}

// Reachability from the plaza (also checks the whole graph is connected)
check(graph.nodes.has(PLAZA_ID), 'plaza node exists');
for (const id of graph.nodes.keys()) {
  check(shortestPath(graph, PLAZA_ID, id) !== null, `node ${id} is reachable from the plaza`);
}
for (const place of PLACEMENTS) {
  const path = shortestPath(graph, PLAZA_ID, place.stop);
  check(path !== null && path.length > 0, `${place.pointId} is reachable from the plaza`);
}

// Symmetry: shortest paths have the same length in both directions; lengths match the polyline
const ids = [PLAZA_ID, ...stops];
for (let i = 0; i < ids.length; i++) {
  for (let j = i + 1; j < ids.length; j++) {
    const ab = shortestPath(graph, ids[i], ids[j]);
    const ba = shortestPath(graph, ids[j], ids[i]);
    check(ab && ba && Math.abs(ab.length - ba.length) < EPS, `d(${ids[i]},${ids[j]}) is symmetric`);
    if (ab) {
      const pts = ab.ids.map((id) => graph.nodes.get(id));
      check(Math.abs(polylineLength(pts) - ab.length) < EPS, `path ${ids[i]} -> ${ids[j]} length matches its polyline`);
    }
  }
}

// Trivial path of a node to itself
for (const id of graph.nodes.keys()) {
  const self = shortestPath(graph, id, id);
  check(self && self.ids.length === 1 && self.ids[0] === id && self.length === 0, `path ${id} -> ${id} is trivial`);
}

// Triangle inequality sanity check (a shortest path never beats a path through any node)
for (const a of ids) {
  for (const b of ids) {
    const direct = shortestPath(graph, a, b).length;
    const via = shortestPath(graph, a, PLAZA_ID).length + shortestPath(graph, PLAZA_ID, b).length;
    check(direct <= via + EPS, `d(${a},${b}) <= d(${a},plaza) + d(plaza,${b})`);
  }
}

// Mid-road re-routing: from the middle of an edge the route never exceeds going around
for (const e of graph.edges) {
  const a = graph.nodes.get(e.a);
  const b = graph.nodes.get(e.b);
  const mid = { x: (a.x + b.x) / 2, z: (a.z + b.z) / 2 };
  const snap = snapToGraph(graph, mid.x, mid.z);
  check(snap.dist < EPS, `midpoint of ${e.a}-${e.b} snaps onto the road`);
  for (const goal of stops) {
    const route = routeFrom(graph, snap, goal);
    check(route !== null && Number.isFinite(route.length), `route from ${e.a}-${e.b} midpoint to ${goal} exists`);
  }
}

if (failures > 0) {
  console.error(`\n${failures} of ${checks} checks failed`);
  process.exit(1);
}
console.log(`road graph OK: ${graph.nodes.size} nodes, ${graph.edges.length} edges, ${MAP_POINTS.length} points, ${checks} checks passed`);
