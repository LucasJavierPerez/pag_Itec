import type { CharacterId, PaletteId, Peer } from '../../../../shared/protocol.ts';

/** Authoritative local view of who is in the room (identity only; motion lives in the buffers). */
export interface PeerInfo {
  id: string;
  nick: string;
  character: CharacterId;
  palette: PaletteId;
  /** Local `Date.now()` of the last message that mentioned this peer. */
  lastSeen: number;
}

export class Presence {
  selfId: string | null = null;
  readonly peers = new Map<string, PeerInfo>();

  /** People in the room, counting yourself once you are in. */
  get count(): number {
    return this.peers.size + (this.selfId ? 1 : 0);
  }

  reset(selfId: string | null, peers: readonly Peer[], now: number): void {
    this.selfId = selfId;
    this.peers.clear();
    for (const p of peers) this.join(p, now);
  }

  clear(): void {
    this.selfId = null;
    this.peers.clear();
  }

  /** Returns the stored entry, or null for ourselves / invalid input. */
  join(p: Peer, now: number): PeerInfo | null {
    if (!p || typeof p.id !== 'string' || p.id === this.selfId) return null;
    const info: PeerInfo = { id: p.id, nick: p.nick, character: p.character, palette: p.palette, lastSeen: now };
    this.peers.set(p.id, info);
    return info;
  }

  leave(id: string): boolean {
    return this.peers.delete(id);
  }

  touch(id: string, now: number): void {
    const p = this.peers.get(id);
    if (p) p.lastSeen = now;
  }

  setAppearance(id: string, character: CharacterId, palette: PaletteId, now: number): PeerInfo | null {
    const p = this.peers.get(id);
    if (!p) return null;
    p.character = character;
    p.palette = palette;
    p.lastSeen = now;
    return p;
  }

  setNick(id: string, nick: string, now: number): PeerInfo | null {
    const p = this.peers.get(id);
    if (!p) return null;
    p.nick = nick;
    p.lastSeen = now;
    return p;
  }

  get(id: string): PeerInfo | undefined {
    return this.peers.get(id);
  }
}
