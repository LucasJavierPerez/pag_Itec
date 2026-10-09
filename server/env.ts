import type { MapRoom } from './MapRoom.ts';

export interface Env {
  MAP_ROOM: DurableObjectNamespace<MapRoom>;
  ASSETS: Fetcher;
  /** Dev-only override (e.g. `wrangler dev --var ROOM_CAP:3`). Production uses ROOM_CAP from the protocol. */
  ROOM_CAP?: string;
}
