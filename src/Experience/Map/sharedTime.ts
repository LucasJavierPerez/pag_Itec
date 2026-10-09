import { clock } from './net/clockSync.ts';

/**
 * The clock every client uses to place the wandering bots. Online it is the server's clock (so
 * everyone sees the bots in the same place); offline it is the local one. The offset between them
 * is applied gradually (see `stepSharedClock`), so connecting or disconnecting never makes a bot jump.
 */
export function getSharedTimeMs(): number {
  return clock.serverNow();
}

/** Call once per rendered frame: lets the clock offset glide a few milliseconds towards its target. */
export function stepSharedClock(): void {
  clock.step();
}
