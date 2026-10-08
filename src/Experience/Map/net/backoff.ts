import { DEFAULT_ROOM } from '../../../../shared/protocol.ts';

/**
 * Reconnection policy (pure): exponential backoff with jitter and the room fallback sequence.
 */

// ---- Tunable constants
export const BACKOFF_BASE_MS = 1000;
export const BACKOFF_MAX_MS = 30000;
/** Jitter spread: the delay is multiplied by a random factor in [1 - J, 1 + J]. */
export const BACKOFF_JITTER = 0.25;
/** Failed attempts in a row before giving up (until the user retries or reopens the tab). */
export const MAX_ATTEMPTS = 8;
/** `main`, `main-2`, ... how many rooms are tried when they are full. */
export const MAX_ROOMS = 5;

/**
 * Delay before reconnect attempt number `attempt` (0-based). `rand` is injectable for tests and
 * must return a value in [0, 1).
 */
export function backoffDelay(attempt: number, rand: () => number = Math.random): number {
  const a = Math.max(0, Math.floor(attempt));
  const raw = Math.min(BACKOFF_MAX_MS, BACKOFF_BASE_MS * 2 ** a);
  const factor = 1 - BACKOFF_JITTER + rand() * 2 * BACKOFF_JITTER;
  return Math.min(BACKOFF_MAX_MS, Math.round(raw * factor));
}

/** True once `attempts` consecutive failures were reached. */
export function shouldGiveUp(attempts: number): boolean {
  return attempts >= MAX_ATTEMPTS;
}

/** Room name for fallback index `n` (0 = `main`, 1 = `main-2`, ...); null past the last one. */
export function roomAt(n: number, base: string = DEFAULT_ROOM): string | null {
  if (!Number.isInteger(n) || n < 0 || n >= MAX_ROOMS) return null;
  return n === 0 ? base : `${base}-${n + 1}`;
}
