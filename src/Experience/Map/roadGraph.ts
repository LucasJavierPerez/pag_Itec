import { EDGES, NODES } from './mapLayout.ts';
import type { LayoutEdge, LayoutNode } from './mapLayout.ts';

/**
 * Pure road-graph helpers (no THREE dependency, so they run headless in Node):
 * graph construction, Dijkstra shortest path, snapping a position onto the roads and
 * polyline sampling for the robot runner.
 */

export interface Neighbor {
  to: string;
  len: number;
}

export interface RoadGraph {
  nodes: Map<string, LayoutNode>;
  adjacency: Map<string, Neighbor[]>;
  edges: LayoutEdge[];
}

export interface PathResult {
  /** Node ids from start to goal (a single id when start === goal). */
  ids: string[];
  length: number;
}

export interface Snap {
  a: string;
  b: string;
  /** 0 at `a`, 1 at `b`. */
  t: number;
  x: number;
  z: number;
  /** Distance from the queried position to the road. */
  dist: number;
}

export interface Point2 {
  x: number;
  z: number;
}

export function buildGraph(nodes: LayoutNode[], edges: LayoutEdge[]): RoadGraph {
  const map = new Map(nodes.map((n) => [n.id, n]));
  const adjacency = new Map<string, Neighbor[]>(nodes.map((n) => [n.id, []]));
  for (const e of edges) {
    const a = map.get(e.a);
    const b = map.get(e.b);
    if (!a || !b) throw new Error(`Edge references an unknown node: ${e.a} - ${e.b}`);
    const len = Math.hypot(b.x - a.x, b.z - a.z);
    adjacency.get(e.a)!.push({ to: e.b, len });
    adjacency.get(e.b)!.push({ to: e.a, len });
  }
  return { nodes: map, adjacency, edges };
}

/** The graph of the ITEC map layout. */
export function createLayoutGraph(): RoadGraph {
  return buildGraph(NODES, EDGES);
}

/** Dijkstra (the graph has ~30 nodes, so a linear scan for the minimum is plenty). */
export function shortestPath(graph: RoadGraph, from: string, to: string): PathResult | null {
  if (!graph.nodes.has(from) || !graph.nodes.has(to)) return null;
  if (from === to) return { ids: [from], length: 0 };

  const dist = new Map<string, number>();
  const prev = new Map<string, string>();
  const open = new Set<string>();
  for (const id of graph.nodes.keys()) dist.set(id, Infinity);
  dist.set(from, 0);
  open.add(from);

  while (open.size > 0) {
    let current = '';
    let best = Infinity;
    for (const id of open) {
      const d = dist.get(id)!;
      if (d < best) {
        best = d;
        current = id;
      }
    }
    open.delete(current);
    if (current === to) break;
    for (const n of graph.adjacency.get(current)!) {
      const alt = best + n.len;
      if (alt < dist.get(n.to)!) {
        dist.set(n.to, alt);
        prev.set(n.to, current);
        open.add(n.to);
      }
    }
  }

  const total = dist.get(to)!;
  if (!Number.isFinite(total)) return null;
  const ids = [to];
  while (ids[0] !== from) ids.unshift(prev.get(ids[0])!);
  return { ids, length: total };
}

/** Nearest point of the road network to (x, z). */
export function snapToGraph(graph: RoadGraph, x: number, z: number): Snap {
  let best: Snap | null = null;
  for (const e of graph.edges) {
    const a = graph.nodes.get(e.a)!;
    const b = graph.nodes.get(e.b)!;
    const dx = b.x - a.x;
    const dz = b.z - a.z;
    const len2 = dx * dx + dz * dz;
    const t = len2 === 0 ? 0 : Math.max(0, Math.min(1, ((x - a.x) * dx + (z - a.z) * dz) / len2));
    const sx = a.x + dx * t;
    const sz = a.z + dz * t;
    const dist = Math.hypot(x - sx, z - sz);
    if (!best || dist < best.dist) best = { a: e.a, b: e.b, t, x: sx, z: sz, dist };
  }
  if (!best) throw new Error('The road graph has no edges');
  return best;
}

/**
 * Route from an arbitrary on-road position to a node: leaves through whichever end of the
 * current edge gives the shorter total. Used for the first run and for re-routing mid-run.
 */
export function routeFrom(graph: RoadGraph, snap: Snap, goal: string): { points: Point2[]; length: number } | null {
  const nodeA = graph.nodes.get(snap.a)!;
  const nodeB = graph.nodes.get(snap.b)!;
  const start: Point2 = { x: snap.x, z: snap.z };
  const viaA = shortestPath(graph, snap.a, goal);
  const viaB = shortestPath(graph, snap.b, goal);
  const costA = viaA ? Math.hypot(nodeA.x - start.x, nodeA.z - start.z) + viaA.length : Infinity;
  const costB = viaB ? Math.hypot(nodeB.x - start.x, nodeB.z - start.z) + viaB.length : Infinity;
  if (!Number.isFinite(costA) && !Number.isFinite(costB)) return null;

  const path = costA <= costB ? viaA! : viaB!;
  const points: Point2[] = [start];
  for (const id of path.ids) {
    const n = graph.nodes.get(id)!;
    const last = points[points.length - 1];
    // Skip duplicates (the robot already stands on that node)
    if (Math.hypot(n.x - last.x, n.z - last.z) > 1e-4) points.push({ x: n.x, z: n.z });
  }
  // Going through the near end and straight back would be a detour: drop the first leg if so
  if (points.length >= 3) {
    const [p0, p1, p2] = points;
    const d1x = p1.x - p0.x;
    const d1z = p1.z - p0.z;
    const d2x = p2.x - p1.x;
    const d2z = p2.z - p1.z;
    if (d1x * d2x + d1z * d2z < 0 && Math.abs(d1x * d2z - d1z * d2x) < 1e-6) points.splice(1, 1);
  }
  return { points, length: polylineLength(points) };
}

export function polylineLength(points: Point2[]): number {
  let total = 0;
  for (let i = 1; i < points.length; i++) {
    total += Math.hypot(points[i].x - points[i - 1].x, points[i].z - points[i - 1].z);
  }
  return total;
}

export interface Polyline {
  points: Point2[];
  /** Cumulative distance at each point (cum[0] = 0). */
  cum: number[];
  length: number;
}

export function makePolyline(points: Point2[]): Polyline {
  const cum = [0];
  for (let i = 1; i < points.length; i++) {
    cum.push(cum[i - 1] + Math.hypot(points[i].x - points[i - 1].x, points[i].z - points[i - 1].z));
  }
  return { points, cum, length: cum[cum.length - 1] };
}

/** Index of the segment containing distance `d` (clamped). */
export function segmentIndexAt(line: Polyline, d: number): number {
  const last = line.points.length - 2;
  if (last < 0) return 0;
  let i = 0;
  while (i < last && line.cum[i + 1] <= d) i++;
  return i;
}

/** Position and heading (radians around Y, 0 = +Z) at distance `d` along the polyline. */
export function sampleAt(line: Polyline, d: number): { x: number; z: number; heading: number } {
  const pts = line.points;
  if (pts.length === 1) return { x: pts[0].x, z: pts[0].z, heading: 0 };
  const dd = Math.max(0, Math.min(line.length, d));
  const i = segmentIndexAt(line, dd);
  const a = pts[i];
  const b = pts[i + 1];
  const segLen = line.cum[i + 1] - line.cum[i] || 1;
  const t = (dd - line.cum[i]) / segLen;
  return {
    x: a.x + (b.x - a.x) * t,
    z: a.z + (b.z - a.z) * t,
    heading: Math.atan2(b.x - a.x, b.z - a.z),
  };
}
