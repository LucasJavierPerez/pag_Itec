import { DurableObject } from 'cloudflare:workers';
import {
  CHAT_MIN_INTERVAL_MS,
  ERROR_MESSAGES,
  MAX_FRAME_BYTES,
  PROTOCOL_VERSION,
  ROOM_CAP,
  clampX,
  clampZ,
  encode,
  isCharacterId,
  isPaletteId,
  parseClientMessage,
  round2,
  sanitizeRoomName,
} from '../shared/protocol.ts';
import type {
  CharacterId,
  ClientMessage,
  ErrorCode,
  PaletteId,
  Peer,
  PosTuple,
  ServerMessage,
  SystemKind,
} from '../shared/protocol.ts';
import { checkChat, sanitizeNick } from '../shared/moderation.ts';
import type { Env } from './env.ts';

const HELLO_TIMEOUT_MS = 5000;
const STATE_INTERVAL_MS = 100;
const KICK_DELAY_MS = 150;
const MAX_PER_IP = 5;
const MAX_STRIKES_BAD = 20;
const MAX_POS_PER_SEC = 30;
const MAX_SPEED_UNITS = 18;
const RENAME_MIN_INTERVAL_MS = 10_000;
const CHAT_BURST = 2;
const CHAT_STRIKES_FOR_MUTE = 3;
const CHAT_MUTE_MS = 30_000;
const STRIKE_DECAY_MS = 60_000;

/** Per-connection state, persisted with serializeAttachment so it survives hibernation (< 2 KB). */
interface Conn {
  id: string;
  ok: boolean; // hello completed
  nick: string;
  character: CharacterId;
  palette: PaletteId;
  x: number;
  z: number;
  h: number;
  s: number;
  d: boolean; // position changed since the last state broadcast
  joinedAt: number;
  ip: string; // salted hash, never the raw address
  bad: number; // malformed message count
  lastChatAt: number; // last token-bucket refill reference
  chatTokens: number;
  mutedUntil: number;
  strikes: number;
  strikeAt: number;
  lastRenameAt: number;
  posWinStart: number;
  posCount: number;
  lastPosAt: number;
  flags: number; // implausible movement counter (informational)
  secrets: string[];
  kick: number; // close code to apply from the alarm (closing inside fetch() is not delivered)
}

async function hashIp(ip: string): Promise<string> {
  const data = new TextEncoder().encode(`itec-map:${ip}`);
  const digest = await crypto.subtle.digest('SHA-256', data);
  return [...new Uint8Array(digest).slice(0, 8)].map((b) => b.toString(16).padStart(2, '0')).join('');
}

function randomId(taken: Set<string>): string {
  for (;;) {
    const bytes = crypto.getRandomValues(new Uint8Array(3));
    const id = [...bytes].map((b) => b.toString(36).padStart(2, '0')).join('').slice(0, 4);
    if (!taken.has(id)) return id;
  }
}

function wrapAngle(h: number): number {
  const twoPi = Math.PI * 2;
  let a = (h + Math.PI) % twoPi;
  if (a < 0) a += twoPi;
  return a - Math.PI;
}

function toPeer(c: Conn): Peer {
  return {
    id: c.id,
    nick: c.nick,
    character: c.character,
    palette: c.palette,
    x: c.x,
    z: c.z,
    h: c.h,
    s: c.s,
  };
}

export class MapRoom extends DurableObject<Env> {
  /** In-memory hint for the next scheduled alarm; recomputed from storage after an eviction. */
  private nextAlarmAt: number | null = null;
  private room: string | null = null;

  constructor(ctx: DurableObjectState, env: Env) {
    super(ctx, env);
    // Keep-alive without waking the object.
    ctx.setWebSocketAutoResponse(new WebSocketRequestResponsePair('ping', 'pong'));
  }

  private get cap(): number {
    const n = Number(this.env.ROOM_CAP);
    return Number.isInteger(n) && n > 0 ? n : ROOM_CAP;
  }

  // ------------------------------------------------------------------ helpers
  private conn(ws: WebSocket): Conn | null {
    return (ws.deserializeAttachment() as Conn | null) ?? null;
  }

  private save(ws: WebSocket, c: Conn): void {
    ws.serializeAttachment(c);
  }

  private send(ws: WebSocket, msg: ServerMessage): void {
    try {
      ws.send(encode(msg));
    } catch {
      /* socket already closing */
    }
  }

  private sendError(ws: WebSocket, code: ErrorCode): void {
    this.send(ws, { t: 'error', code, message: ERROR_MESSAGES[code] });
  }

  private closeWith(ws: WebSocket, code: number, reason: string): void {
    try {
      ws.close(code, reason);
    } catch (e) {
      console.log(JSON.stringify({ ev: 'close_failed', code, err: String(e) }));
    }
  }

  private broadcast(msg: ServerMessage, except?: WebSocket): void {
    const frame = encode(msg);
    for (const ws of this.ctx.getWebSockets()) {
      if (ws === except) continue;
      const c = this.conn(ws);
      if (!c?.ok) continue;
      try {
        ws.send(frame);
      } catch {
        /* ignore */
      }
    }
  }

  private system(kind: SystemKind, text: string, except?: WebSocket): void {
    this.broadcast({ t: 'system', kind, text }, except);
  }

  private async ensureAlarm(at: number): Promise<void> {
    const now = Date.now();
    if (this.nextAlarmAt !== null && this.nextAlarmAt > now && this.nextAlarmAt <= at) return;
    const cur = await this.ctx.storage.getAlarm();
    if (cur !== null && cur > now && cur <= at) {
      this.nextAlarmAt = cur;
      return;
    }
    await this.ctx.storage.setAlarm(at);
    this.nextAlarmAt = at;
  }

  private strike(c: Conn, now: number): void {
    if (now - c.strikeAt > STRIKE_DECAY_MS) c.strikes = 0;
    c.strikes += 1;
    c.strikeAt = now;
    if (c.strikes >= CHAT_STRIKES_FOR_MUTE) {
      c.mutedUntil = now + CHAT_MUTE_MS;
      c.strikes = 0;
    }
  }

  private badMessage(ws: WebSocket, c: Conn | null): void {
    if (c) {
      c.bad += 1;
      this.save(ws, c);
    }
    this.sendError(ws, 'bad_message');
    if (c && c.bad >= MAX_STRIKES_BAD) {
      console.log(JSON.stringify({ ev: 'kick', reason: 'bad_messages' }));
      this.closeWith(ws, 1008, 'too many bad messages');
    }
  }

  // ------------------------------------------------------------------ upgrade
  async fetch(request: Request): Promise<Response> {
    if (request.headers.get('Upgrade')?.toLowerCase() !== 'websocket') {
      return new Response('Se esperaba una conexión WebSocket.', { status: 426 });
    }
    this.room = sanitizeRoomName(new URL(request.url).searchParams.get('room'));
    const ip = await hashIp(request.headers.get('CF-Connecting-IP') ?? 'unknown');

    const pair = new WebSocketPair();
    const client = pair[0];
    const server = pair[1];
    this.ctx.acceptWebSocket(server);

    const sockets = this.ctx.getWebSockets().filter((w) => w !== server);
    const states = sockets.map((w) => this.conn(w)).filter((c): c is Conn => c !== null);
    const taken = new Set(states.map((c) => c.id));
    const now = Date.now();

    const c: Conn = {
      id: randomId(taken),
      ok: false,
      nick: '',
      character: 'robot',
      palette: 'clasico',
      x: 0,
      z: 0,
      h: 0,
      s: 0,
      d: false,
      joinedAt: now,
      ip,
      bad: 0,
      lastChatAt: now,
      chatTokens: 1,
      mutedUntil: 0,
      strikes: 0,
      strikeAt: 0,
      lastRenameAt: 0,
      posWinStart: now,
      posCount: 0,
      lastPosAt: 0,
      flags: 0,
      secrets: [],
      kick: 0,
    };
    this.save(server, c);

    if (states.length >= this.cap) {
      this.sendError(server, 'room_full');
      c.kick = 1013;
      this.save(server, c);
      await this.ensureAlarm(now + KICK_DELAY_MS);
    } else if (states.filter((s) => s.ip === ip).length >= MAX_PER_IP) {
      this.sendError(server, 'too_many_connections');
      c.kick = 1008;
      this.save(server, c);
      await this.ensureAlarm(now + KICK_DELAY_MS);
    } else {
      await this.ensureAlarm(now + HELLO_TIMEOUT_MS);
    }
    return new Response(null, { status: 101, webSocket: client });
  }

  // ------------------------------------------------------------------ messages
  async webSocketMessage(ws: WebSocket, message: string | ArrayBuffer): Promise<void> {
    const c = this.conn(ws);
    if (!c) {
      this.closeWith(ws, 1011, 'no state');
      return;
    }
    if (typeof message !== 'string' || message.length > MAX_FRAME_BYTES) {
      this.badMessage(ws, c);
      return;
    }
    const msg = parseClientMessage(message);
    if (!msg) {
      this.badMessage(ws, c);
      return;
    }
    const now = Date.now();

    if (!c.ok) {
      if (msg.t === 'ping') {
        this.send(ws, { t: 'pong' });
        return;
      }
      if (msg.t !== 'hello') {
        this.badMessage(ws, c);
        return;
      }
      await this.onHello(ws, c, msg, now);
      return;
    }

    switch (msg.t) {
      case 'hello':
        this.badMessage(ws, c);
        return;
      case 'ping':
        this.send(ws, { t: 'pong' });
        return;
      case 'pos':
        await this.onPos(ws, c, msg, now);
        return;
      case 'appearance':
        c.character = msg.character;
        c.palette = msg.palette;
        this.save(ws, c);
        this.broadcast({ t: 'appearance', id: c.id, character: c.character, palette: c.palette }, ws);
        return;
      case 'chat':
        this.onChat(ws, c, msg.text, now);
        return;
      case 'secret':
        if (c.secrets.includes(msg.id)) return;
        c.secrets.push(msg.id);
        this.save(ws, c);
        this.system('secret', `${c.nick} descubrió el secreto de Ada`);
        return;
      case 'rename':
        this.onRename(ws, c, msg.nick, now);
        return;
    }
  }

  private async onHello(
    ws: WebSocket,
    c: Conn,
    msg: Extract<ClientMessage, { t: 'hello' }>,
    now: number,
  ): Promise<void> {
    if (msg.v !== PROTOCOL_VERSION) {
      this.sendError(ws, 'bad_version');
      this.closeWith(ws, 1008, 'bad version');
      return;
    }
    if (!isCharacterId(msg.character) || !isPaletteId(msg.palette)) {
      this.badMessage(ws, c);
      return;
    }
    const taken = new Set(
      this.ctx
        .getWebSockets()
        .map((w) => this.conn(w))
        .filter((o): o is Conn => o !== null && o.ok)
        .map((o) => o.nick.toLowerCase()),
    );
    let nick = sanitizeNick(msg.nick);
    // Keep nicknames unique within the room (case-insensitive) with a short numeric suffix.
    if (taken.has(nick.toLowerCase())) {
      const base = nick.slice(0, 12);
      for (let i = 2; i < 100; i++) {
        const candidate = `${base}${i}`;
        if (!taken.has(candidate.toLowerCase())) {
          nick = candidate;
          break;
        }
      }
    }
    c.ok = true;
    c.nick = nick;
    c.character = msg.character;
    c.palette = msg.palette;
    c.d = true;
    c.lastPosAt = now;
    this.save(ws, c);

    const peers = this.ctx
      .getWebSockets()
      .filter((w) => w !== ws)
      .map((w) => this.conn(w))
      .filter((o): o is Conn => o !== null && o.ok)
      .map(toPeer);
    this.send(ws, {
      t: 'welcome',
      v: PROTOCOL_VERSION,
      id: c.id,
      nick: c.nick,
      serverTime: now,
      room: this.room ?? this.ctx.id.name ?? sanitizeRoomName(null),
      peers,
    });
    this.broadcast({ t: 'join', peer: toPeer(c) }, ws);
    this.system('join', `${c.nick} entró al mapa`, ws);
    await this.maybeScheduleState();
  }

  private async onPos(
    ws: WebSocket,
    c: Conn,
    msg: Extract<ClientMessage, { t: 'pos' }>,
    now: number,
  ): Promise<void> {
    if (now - c.posWinStart >= 1000) {
      c.posWinStart = now;
      c.posCount = 0;
    }
    c.posCount += 1;
    if (c.posCount > MAX_POS_PER_SEC) {
      this.save(ws, c);
      return; // silently dropped
    }
    const x = clampX(msg.x);
    const z = clampZ(msg.z);
    const dt = Math.max((now - c.lastPosAt) / 1000, 0.01);
    if (Math.hypot(x - c.x, z - c.z) > MAX_SPEED_UNITS * dt + 2) c.flags += 1;
    c.x = round2(x);
    c.z = round2(z);
    c.h = round2(wrapAngle(msg.h));
    c.s = round2(Math.min(1, Math.max(0, msg.s)));
    c.lastPosAt = now;
    c.d = true;
    this.save(ws, c);
    await this.maybeScheduleState();
  }

  private onChat(ws: WebSocket, c: Conn, text: string, now: number): void {
    if (now < c.mutedUntil) {
      this.sendError(ws, 'rate_limited');
      return;
    }
    // Token bucket: 1 token per CHAT_MIN_INTERVAL_MS, burst CHAT_BURST.
    c.chatTokens = Math.min(CHAT_BURST, c.chatTokens + (now - c.lastChatAt) / CHAT_MIN_INTERVAL_MS);
    c.lastChatAt = now;
    if (c.chatTokens < 1) {
      this.strike(c, now);
      this.save(ws, c);
      this.sendError(ws, 'rate_limited');
      return;
    }
    c.chatTokens -= 1;
    const res = checkChat(text);
    if (!res.ok) {
      this.strike(c, now);
      this.save(ws, c);
      this.sendError(ws, 'filtered');
      return;
    }
    this.save(ws, c);
    this.broadcast({ t: 'chat', id: c.id, nick: c.nick, text: res.text, ts: now });
  }

  private onRename(ws: WebSocket, c: Conn, rawNick: string, now: number): void {
    if (now - c.lastRenameAt < RENAME_MIN_INTERVAL_MS) {
      this.sendError(ws, 'rate_limited');
      return;
    }
    const nick = sanitizeNick(rawNick);
    c.lastRenameAt = now;
    if (nick === c.nick) {
      this.save(ws, c);
      return;
    }
    c.nick = nick;
    this.save(ws, c);
    this.broadcast({ t: 'rename', id: c.id, nick });
  }

  // ------------------------------------------------------------------ state batching
  private async maybeScheduleState(): Promise<void> {
    const sockets = this.ctx.getWebSockets();
    if (sockets.length < 2) return;
    await this.ensureAlarm(Date.now() + STATE_INTERVAL_MS);
  }

  async alarm(): Promise<void> {
    this.nextAlarmAt = null;
    const now = Date.now();
    const sockets = this.ctx.getWebSockets();
    const moved: PosTuple[] = [];
    const joined: WebSocket[] = [];
    let nextDeadline: number | null = null;

    for (const ws of sockets) {
      const c = this.conn(ws);
      if (!c) continue;
      if (c.kick) {
        this.closeWith(ws, c.kick, 'closed by server');
        continue;
      }
      if (!c.ok) {
        const deadline = c.joinedAt + HELLO_TIMEOUT_MS;
        if (now >= deadline) {
          this.sendError(ws, 'bad_message');
          this.closeWith(ws, 1008, 'hello timeout');
        } else nextDeadline = Math.min(nextDeadline ?? deadline, deadline);
        continue;
      }
      joined.push(ws);
      if (c.d) {
        moved.push([c.id, c.x, c.z, c.h, c.s]);
        c.d = false;
        this.save(ws, c);
      }
    }

    if (moved.length > 0 && joined.length >= 2) {
      const frame = encode({ t: 'state', st: now, p: moved });
      for (const ws of joined) {
        try {
          ws.send(frame);
        } catch {
          /* ignore */
        }
      }
    }
    if (nextDeadline !== null) await this.ensureAlarm(nextDeadline);
  }

  // ------------------------------------------------------------------ lifecycle
  private leave(ws: WebSocket): void {
    const c = this.conn(ws);
    if (!c?.ok) return;
    c.ok = false; // so broadcasts skip this socket and a second close event is a no-op
    this.save(ws, c);
    this.broadcast({ t: 'leave', id: c.id });
    this.system('leave', `${c.nick} salió del mapa`);
  }

  async webSocketClose(ws: WebSocket, code: number, _reason: string, _wasClean: boolean): Promise<void> {
    this.leave(ws);
    try {
      ws.close(code >= 1000 && code < 5000 && code !== 1005 && code !== 1006 ? code : 1000, 'bye');
    } catch {
      /* already closed */
    }
  }

  async webSocketError(ws: WebSocket, _error: unknown): Promise<void> {
    this.leave(ws);
    this.closeWith(ws, 1011, 'error');
  }
}
