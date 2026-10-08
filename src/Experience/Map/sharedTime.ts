/**
 * The clock every client uses to place the wandering bots. For now it is the local clock;
 * the multiplayer phase replaces the implementation with server-synced time.
 */
export function getSharedTimeMs(): number {
  return Date.now();
}
