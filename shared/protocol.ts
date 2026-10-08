/**
 * Realtime protocol shared by the browser (src/) and the Worker (server/).
 * Pure types + runtime validators, no dependencies. Imports use `.ts` extensions.
 */

export const PROTOCOL_VERSION = 1;

export const MAX_NICK = 16;
export const MAX_CHAT = 140;
export const ROOM_CAP = 40;
export const POS_HZ = 10;
export const CHAT_MIN_INTERVAL_MS = 2000;
export const MAX_FRAME_BYTES = 1024;
export const DEFAULT_ROOM = 'main';

/** Map bounds (world units) used to clamp positions: MAP_SIZE is 100x68 centred at (0, 1) plus a margin. */
export const MAP_BOUNDS = { minX: -52, maxX: 52, minZ: -35, maxZ: 37 } as const;

export const CHARACTER_IDS = [
  'robot',
  'programadora',
  'tecnico',
  'turista',
  'creativa',
  'estudiante',
  'gato',
  'dino',
] as const;
export const PALETTE_IDS = [
  'clasico',
  'rojo-itec',
  'azul-itec',
  'verde',
  'dorado',
  'nocturno',
  'rosa',
  'arcoiris',
] as const;
export const SECRET_IDS = ['ada'] as const;

export type CharacterId = (typeof CHARACTER_IDS)[number];
export type PaletteId = (typeof PALETTE_IDS)[number];
export type SecretId = (typeof SECRET_IDS)[number];

export const ERROR_CODES = [
  'bad_message',
  'filtered',
  'rate_limited',
  'room_full',
  'bad_origin',
  'bad_version',
  'too_many_connections',
] as const;
export type ErrorCode = (typeof ERROR_CODES)[number];

export type SystemKind = 'join' | 'leave' | 'secret' | 'info';

export interface Peer {
  id: string;
  nick: string;
  character: CharacterId;
  palette: PaletteId;
  x: number;
  z: number;
  h: number;
  s: number;
}

/** Compact movement tuple: [id, x, z, heading, speed01]. */
export type PosTuple = [string, number, number, number, number];

// ---------------------------------------------------------------- client -> server
export type ClientMessage =
  | { t: 'hello'; v: number; nick: string; character: CharacterId; palette: PaletteId }
  | { t: 'pos'; x: number; z: number; h: number; s: number }
  | { t: 'appearance'; character: CharacterId; palette: PaletteId }
  | { t: 'chat'; text: string }
  | { t: 'secret'; id: SecretId }
  | { t: 'rename'; nick: string }
  | { t: 'ping' };

// ---------------------------------------------------------------- server -> client
export type ServerMessage =
  | { t: 'welcome'; v: number; id: string; serverTime: number; room: string; peers: Peer[] }
  | { t: 'join'; peer: Peer }
  | { t: 'leave'; id: string }
  | { t: 'state'; st: number; p: PosTuple[] }
  | { t: 'appearance'; id: string; character: CharacterId; palette: PaletteId }
  | { t: 'rename'; id: string; nick: string }
  | { t: 'chat'; id: string; nick: string; text: string; ts: number }
  | { t: 'system'; text: string; kind: SystemKind }
  | { t: 'error'; code: ErrorCode; message: string }
  | { t: 'pong' };

/** Friendly Argentine Spanish messages for each error code (shown to players). */
export const ERROR_MESSAGES: Record<ErrorCode, string> = {
  bad_message: 'No entendimos ese mensaje.',
  filtered: 'Tu mensaje no se envió: evitá datos personales, enlaces y malas palabras.',
  rate_limited: 'Despacio, che. Esperá un par de segundos entre mensajes.',
  room_full: 'Esta sala está llena. Probá en otra.',
  bad_origin: 'No se permite conectarse desde este sitio.',
  bad_version: 'Tu versión está desactualizada. Recargá la página.',
  too_many_connections: 'Hay demasiadas conexiones desde tu red. Cerrá otras pestañas e intentá de nuevo.',
};

// ---------------------------------------------------------------- validators
export function isCharacterId(v: unknown): v is CharacterId {
  return typeof v === 'string' && (CHARACTER_IDS as readonly string[]).includes(v);
}
export function isPaletteId(v: unknown): v is PaletteId {
  return typeof v === 'string' && (PALETTE_IDS as readonly string[]).includes(v);
}
export function isSecretId(v: unknown): v is SecretId {
  return typeof v === 'string' && (SECRET_IDS as readonly string[]).includes(v);
}

export function sanitizeRoomName(raw: string | null | undefined): string {
  const r = (raw ?? '').toLowerCase();
  return /^[a-z0-9-]{1,24}$/.test(r) ? r : DEFAULT_ROOM;
}

function num(v: unknown): number | null {
  return typeof v === 'number' && Number.isFinite(v) ? v : null;
}

export function clamp(v: number, lo: number, hi: number): number {
  return v < lo ? lo : v > hi ? hi : v;
}

export function clampX(x: number): number {
  return clamp(x, MAP_BOUNDS.minX, MAP_BOUNDS.maxX);
}
export function clampZ(z: number): number {
  return clamp(z, MAP_BOUNDS.minZ, MAP_BOUNDS.maxZ);
}

/** Round to 2 decimals to keep frames small. */
export function round2(v: number): number {
  return Math.round(v * 100) / 100;
}

/**
 * Parse an inbound client frame. Returns null for anything malformed. Strings are NOT sanitised
 * here (nick/chat go through shared/moderation.ts); numbers are finite but clamped by the caller.
 */
export function parseClientMessage(raw: unknown): ClientMessage | null {
  if (typeof raw !== 'string' || raw.length > MAX_FRAME_BYTES) return null;
  let o: unknown;
  try {
    o = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof o !== 'object' || o === null || Array.isArray(o)) return null;
  const m = o as Record<string, unknown>;
  switch (m.t) {
    case 'hello': {
      const v = num(m.v);
      if (v === null || typeof m.nick !== 'string' || m.nick.length > 200) return null;
      if (!isCharacterId(m.character) || !isPaletteId(m.palette)) return null;
      return { t: 'hello', v, nick: m.nick, character: m.character, palette: m.palette };
    }
    case 'pos': {
      const x = num(m.x);
      const z = num(m.z);
      const h = num(m.h);
      const s = num(m.s);
      if (x === null || z === null || h === null || s === null) return null;
      return { t: 'pos', x, z, h, s };
    }
    case 'appearance':
      if (!isCharacterId(m.character) || !isPaletteId(m.palette)) return null;
      return { t: 'appearance', character: m.character, palette: m.palette };
    case 'chat':
      if (typeof m.text !== 'string' || m.text.length > 600) return null;
      return { t: 'chat', text: m.text };
    case 'secret':
      if (!isSecretId(m.id)) return null;
      return { t: 'secret', id: m.id };
    case 'rename':
      if (typeof m.nick !== 'string' || m.nick.length > 200) return null;
      return { t: 'rename', nick: m.nick };
    case 'ping':
      return { t: 'ping' };
    default:
      return null;
  }
}

/** Light structural parse of a server frame for the client (trusts shapes after the `t` check). */
export function parseServerMessage(raw: unknown): ServerMessage | null {
  if (typeof raw !== 'string') return null;
  let o: unknown;
  try {
    o = JSON.parse(raw);
  } catch {
    return null;
  }
  if (typeof o !== 'object' || o === null || Array.isArray(o)) return null;
  const t = (o as { t?: unknown }).t;
  const known = ['welcome', 'join', 'leave', 'state', 'appearance', 'rename', 'chat', 'system', 'error', 'pong'];
  return typeof t === 'string' && known.includes(t) ? (o as ServerMessage) : null;
}

export function encode(msg: ServerMessage | ClientMessage): string {
  return JSON.stringify(msg);
}
