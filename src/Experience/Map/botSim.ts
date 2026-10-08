import { createLayoutGraph, makePolyline, sampleAt, shortestPath } from './roadGraph.ts';
import type { Polyline, RoadGraph } from './roadGraph.ts';
import { PLACEMENTS, PLAZA_ID } from './mapLayout.ts';
import type { RobotSkinId } from './skins/robotSkins.ts';
import type { CharacterId } from './characters/characterSpec.ts';

/**
 * Deterministic wandering of the map bots (pure: no THREE, no DOM, no clock). The schedule of each
 * bot is a repeating cycle of LEGS legs (walk to a destination, then pause there) built from a
 * seeded PRNG, so the position at ANY absolute time is plain arithmetic: no accumulated state,
 * no drift, and every client with the same seed and time sees the same bots.
 */

// ---- Tunable constants
/** Shared seed of the schedules (change it to reshuffle the routes for everyone). */
export const BOT_SEED = 0x17ec2026;
/** Legs per cycle; the cycle then repeats seamlessly. */
export const BOT_LEGS = 120;
/** Walking speed in world units per second (the player runs at up to 9-10). */
export const BOT_SPEED = 4.5;
export const BOT_PAUSE_MIN = 2;
export const BOT_PAUSE_MAX = 6;
/** Share of the destinations that are the plaza (the rest are stop nodes of points). */
const PLAZA_SHARE = 0.15;

export interface BotDef {
  id: string;
  name: string;
  skin: RobotSkinId;
  /** Character the bot wears (it ignores the player's own pick). */
  character: CharacterId;
}

export const BOTS: readonly BotDef[] = [
  { id: 'tecno', name: 'Tecno', skin: 'verde', character: 'robot' },
  { id: 'mecha', name: 'Mecha', skin: 'dorado', character: 'tecnico' },
  { id: 'turi', name: 'Turi', skin: 'rosa', character: 'turista' },
];

export interface BotState {
  id: string;
  name: string;
  skin: RobotSkinId;
  x: number;
  z: number;
  /** Radians around Y, 0 = +Z. */
  heading: number;
  state: 'walking' | 'pausing';
  /** Index of the current leg inside the cycle. */
  leg: number;
}

interface Leg {
  line: Polyline;
  walk: number;
  pause: number;
}

interface BotTrack {
  def: BotDef;
  legs: Leg[];
  /** Start time of each leg inside the cycle (seconds), ascending; start[0] = 0. */
  start: number[];
  cycle: number;
}

export interface BotSchedule {
  seed: number;
  tracks: BotTrack[];
}

function mulberry32(seed: number): () => number {
  let a = seed >>> 0;
  return () => {
    a = (a + 0x6d2b79f5) >>> 0;
    let t = a;
    t = Math.imul(t ^ (t >>> 15), t | 1);
    t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function buildTrack(def: BotDef, index: number, seed: number, graph: RoadGraph): BotTrack {
  const rng = mulberry32((seed + Math.imul(index + 1, 0x9e3779b1)) >>> 0);
  const stops = [...new Set(PLACEMENTS.map((p) => p.stop))];

  // Destinations: mostly point stops, sometimes the plaza; never the same node twice in a row
  // (also across the cycle seam: the last one differs from the first)
  const dest: string[] = [];
  const pick = (): string => (rng() < PLAZA_SHARE ? PLAZA_ID : stops[Math.floor(rng() * stops.length)]);
  for (let i = 0; i < BOT_LEGS; i++) {
    let d = pick();
    let guard = 0;
    while ((d === dest[i - 1] || (i === BOT_LEGS - 1 && d === dest[0])) && guard++ < 32) d = pick();
    dest.push(d);
  }

  const legs: Leg[] = [];
  const start: number[] = [];
  let t = 0;
  for (let i = 0; i < BOT_LEGS; i++) {
    const from = dest[(i + BOT_LEGS - 1) % BOT_LEGS];
    const path = shortestPath(graph, from, dest[i]);
    if (!path) throw new Error(`Bot route without path: ${from} -> ${dest[i]}`);
    const points = path.ids.map((id) => {
      const n = graph.nodes.get(id)!;
      return { x: n.x, z: n.z };
    });
    // A degenerate single-point route would have no heading: give it a tiny second point
    if (points.length === 1) points.push({ x: points[0].x, z: points[0].z + 1e-3 });
    const line = makePolyline(points);
    const pause = BOT_PAUSE_MIN + rng() * (BOT_PAUSE_MAX - BOT_PAUSE_MIN);
    legs.push({ line, walk: line.length / BOT_SPEED, pause });
    start.push(t);
    t += line.length / BOT_SPEED + pause;
  }
  return { def, legs, start, cycle: t };
}

export function createBotSchedule(seed: number = BOT_SEED, graph: RoadGraph = createLayoutGraph()): BotSchedule {
  return { seed, tracks: BOTS.map((def, i) => buildTrack(def, i, seed, graph)) };
}

/** Largest index i with start[i] <= t (the sequence is ascending). */
function legIndexAt(start: number[], t: number): number {
  let lo = 0;
  let hi = start.length - 1;
  while (lo < hi) {
    const mid = (lo + hi + 1) >> 1;
    if (start[mid] <= t) lo = mid;
    else hi = mid - 1;
  }
  return lo;
}

function stateOf(track: BotTrack, timeMs: number, out?: BotState): BotState {
  const seconds = timeMs / 1000;
  let t = seconds % track.cycle;
  if (t < 0) t += track.cycle;
  const i = legIndexAt(track.start, t);
  const leg = track.legs[i];
  const local = t - track.start[i];
  const walking = local < leg.walk;
  const sample = sampleAt(leg.line, walking ? local * BOT_SPEED : leg.line.length);
  const s = out ?? ({} as BotState);
  s.id = track.def.id;
  s.name = track.def.name;
  s.skin = track.def.skin;
  s.x = sample.x;
  s.z = sample.z;
  s.heading = sample.heading;
  s.state = walking ? 'walking' : 'pausing';
  s.leg = i;
  return s;
}

/** States of all bots at `timeMs`; pass `out` (from a previous call) to avoid allocating objects. */
export function botStatesAt(schedule: BotSchedule, timeMs: number, out?: BotState[]): BotState[] {
  const result = out && out.length === schedule.tracks.length ? out : new Array<BotState>(schedule.tracks.length);
  for (let i = 0; i < schedule.tracks.length; i++) result[i] = stateOf(schedule.tracks[i], timeMs, out?.[i]);
  return result;
}

/** Length in seconds of one full cycle of bot `index`. */
export function botCycleSeconds(schedule: BotSchedule, index: number): number {
  return schedule.tracks[index].cycle;
}

const CACHE = new WeakMap<RoadGraph, Map<number, BotSchedule>>();

/** Convenience: states at `timeMs` for (seed, graph); schedules are built once per pair. */
export function simulateBots(seed: number, timeMs: number, graph: RoadGraph): BotState[] {
  let bySeed = CACHE.get(graph);
  if (!bySeed) CACHE.set(graph, (bySeed = new Map()));
  let schedule = bySeed.get(seed);
  if (!schedule) bySeed.set(seed, (schedule = createBotSchedule(seed, graph)));
  return botStatesAt(schedule, timeMs);
}
