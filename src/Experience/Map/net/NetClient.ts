import {
  DEFAULT_ROOM,
  ERROR_MESSAGES,
  KEEPALIVE_PING,
  KEEPALIVE_PONG,
  PROTOCOL_VERSION,
  clampX,
  clampZ,
  encode,
  parseServerMessage,
  round2,
} from '../../../../shared/protocol.ts';
import type {
  CharacterId,
  ClientMessage,
  ErrorCode,
  PaletteId,
  Peer,
  PosTuple,
  SecretId,
  ServerMessage,
  SystemKind,
} from '../../../../shared/protocol.ts';
import { sanitizeNick } from '../../../../shared/moderation.ts';
import { backoffDelay, roomAt, shouldGiveUp } from './backoff.ts';
import { ClockSync, clock as pageClock } from './clockSync.ts';
import { shortestArc } from './interpolation.ts';
import { Presence } from './presence.ts';

// ---- Tunable constants
/** Raw `ping` text frame cadence (the room answers without waking up). */
export const KEEPALIVE_MS = 25000;
/** No frame of any kind for this long: the peer is dead, reconnect. */
export const DEAD_PEER_MS = 40000;
/** JSON ping/pong round trip used to refine the clock offset. */
export const RTT_PING_MS = 30000;
/** The page stayed hidden this long: close the socket until it is visible again. */
export const HIDDEN_DISCONNECT_MS = 30000;
const CONNECT_TIMEOUT_MS = 10000;
const WELCOME_TIMEOUT_MS = 8000;
const TICK_MS = 1000;
/** Own cap on outgoing `pos` frames (the server allows 30/s). */
const MIN_POS_INTERVAL_MS = 40;
const OPEN = 1;

export type NetStatus = 'idle' | 'connecting' | 'online' | 'offline' | 'rejected';

export interface NetStatusInfo {
  status: NetStatus;
  /** People in the room including you (0 unless online). */
  count: number;
  /** One short Spanish line for the UI, empty when there is nothing to say. */
  message: string;
  room: string | null;
}

type WelcomeMsg = Extract<ServerMessage, { t: 'welcome' }>;

export interface NetEvents {
  status: NetStatusInfo;
  welcome: WelcomeMsg;
  join: Peer;
  leave: { id: string };
  state: { st: number; p: PosTuple[]; recvAt: number };
  appearance: { id: string; character: CharacterId; palette: PaletteId };
  rename: { id: string; nick: string; self: boolean };
  chat: { id: string; nick: string; text: string; ts: number; self: boolean };
  system: { text: string; kind: SystemKind };
  error: { code: ErrorCode; message: string };
}

type Listener<T> = (payload: T) => void;

/** Minimal WebSocket surface the client needs (the browser and Node >= 22 globals fit it). */
export interface SocketLike {
  readonly readyState: number;
  onopen: ((ev: unknown) => void) | null;
  onmessage: ((ev: { data: unknown }) => void) | null;
  onclose: ((ev: unknown) => void) | null;
  onerror: ((ev: unknown) => void) | null;
  send(data: string): void;
  close(code?: number, reason?: string): void;
}

export interface HelloIdentity {
  nick: string;
  character: CharacterId;
  palette: PaletteId;
}

export interface NetClientOptions {
  /** Read on every (re)connection, so renames / skin changes made while offline are honoured. */
  getHello: () => HelloIdentity;
  /** Full URL for a room; defaults to the page origin (`wss:` on https). */
  buildUrl?: (room: string) => string;
  createSocket?: (url: string) => SocketLike;
  /** Listen to `document` visibility (default true when a document exists). */
  watchVisibility?: boolean;
  now?: () => number;
  random?: () => number;
  clock?: ClockSync;
}

function defaultUrl(room: string): string {
  const loc = globalThis.location;
  const proto = loc.protocol === 'https:' ? 'wss:' : 'ws:';
  return `${proto}//${loc.host}/ws?room=${encodeURIComponent(room)}`;
}

function defaultSocket(url: string): SocketLike {
  return new WebSocket(url) as unknown as SocketLike;
}

type Timer = ReturnType<typeof setTimeout>;

/**
 * Owns the WebSocket to the map room: connection lifecycle, resilient reconnection, heartbeat,
 * clock sync and typed events. Nothing here throws into the caller (render loop).
 */
export class NetClient {
  readonly presence = new Presence();

  private _opts: NetClientOptions;
  private _listeners: { [K in keyof NetEvents]?: Set<Listener<NetEvents[K]>> } = {};
  private _clock: ClockSync;
  private _now: () => number;
  private _random: () => number;

  private _status: NetStatus = 'idle';
  private _message = '';
  private _room: string | null = null;
  private _nick = '';
  private _wanted = false;
  private _paused = false;
  private _gaveUp = false;
  private _viewActive = true;
  private _disposed = false;

  private _ws: SocketLike | null = null;
  private _gen = 0;
  private _attempts = 0;
  private _roomIdx = 0;
  private _retryTimer: Timer | null = null;
  private _connectTimer: Timer | null = null;
  private _helloTimer: Timer | null = null;
  private _hiddenTimer: Timer | null = null;
  private _tickTimer: ReturnType<typeof setInterval> | null = null;

  private _helloSentAt = 0;
  private _lastRx = 0;
  private _lastPing = 0;
  private _lastRttPing = 0;
  private _pingSentAt = 0;
  private _lastPos = 0;

  private _onVisibility = (): void => {
    try {
      this._handleVisibility();
    } catch {
      // never break the page
    }
  };

  constructor(opts: NetClientOptions) {
    this._opts = opts;
    this._now = opts.now ?? Date.now;
    this._random = opts.random ?? Math.random;
    this._clock = opts.clock ?? pageClock;
    if (opts.watchVisibility !== false && typeof document !== 'undefined') {
      document.addEventListener('visibilitychange', this._onVisibility);
    }
  }

  // ------------------------------------------------------------------ public state
  get status(): NetStatus {
    return this._status;
  }
  get message(): string {
    return this._message;
  }
  /** People in the room including you; 0 unless online. */
  get connectedCount(): number {
    return this._status === 'online' ? this.presence.count : 0;
  }
  get selfId(): string | null {
    return this.presence.selfId;
  }
  /** Your nickname as the server knows it (empty before the first welcome). */
  get nick(): string {
    return this._nick;
  }
  get room(): string | null {
    return this._room;
  }
  /** True between `connect()` and `disconnect()` (the client is trying to be, or is, online). */
  get wanted(): boolean {
    return this._wanted;
  }
  /** True after the automatic attempts ran out: only `connect()` starts again. */
  get gaveUp(): boolean {
    return this._gaveUp;
  }
  get info(): NetStatusInfo {
    return { status: this._status, count: this.connectedCount, message: this._message, room: this._room };
  }

  // ------------------------------------------------------------------ events
  on<K extends keyof NetEvents>(event: K, cb: Listener<NetEvents[K]>): () => void {
    let set = this._listeners[event] as Set<Listener<NetEvents[K]>> | undefined;
    if (!set) {
      set = new Set();
      (this._listeners as Record<string, unknown>)[event] = set;
    }
    set.add(cb);
    return () => this.off(event, cb);
  }

  off<K extends keyof NetEvents>(event: K, cb: Listener<NetEvents[K]>): void {
    (this._listeners[event] as Set<Listener<NetEvents[K]>> | undefined)?.delete(cb);
  }

  private _emit<K extends keyof NetEvents>(event: K, payload: NetEvents[K]): void {
    const set = this._listeners[event] as Set<Listener<NetEvents[K]>> | undefined;
    if (!set) return;
    for (const cb of [...set]) {
      try {
        cb(payload);
      } catch {
        // a faulty listener must not break the connection
      }
    }
  }

  private _setStatus(status: NetStatus, message = ''): void {
    this._status = status;
    this._message = message;
    this._emit('status', this.info);
  }

  // ------------------------------------------------------------------ lifecycle
  /** Starts (or restarts after giving up / rejection) the connection. Safe to call repeatedly. */
  connect(): void {
    if (this._disposed) return;
    if (this._wanted && (this._status === 'connecting' || this._status === 'online')) return;
    this._wanted = true;
    this._paused = false;
    this._gaveUp = false;
    this._attempts = 0;
    this._roomIdx = 0;
    this._clearRetry();
    if (typeof document !== 'undefined' && document.hidden) {
      this._paused = true;
      this._setStatus('offline', 'En pausa mientras no mirás la pestaña.');
      return;
    }
    this._open();
  }

  /** Closes for good (until `connect()` is called again). */
  disconnect(): void {
    this._wanted = false;
    this._paused = false;
    this._gaveUp = false;
    this._clearRetry();
    this._clearHidden();
    this._teardownSocket(true);
    this._resetSession();
    if (this._status !== 'idle' || this._message) this._setStatus('idle', '');
  }

  dispose(): void {
    if (this._disposed) return;
    this.disconnect();
    this._disposed = true;
    if (typeof document !== 'undefined') document.removeEventListener('visibilitychange', this._onVisibility);
    this._listeners = {};
  }

  /** Whether the Mapa view is showing: `pos` frames are only sent while it is. */
  setViewActive(active: boolean): void {
    this._viewActive = active;
  }

  private _resetSession(): void {
    this.presence.clear();
    this._clock.reset();
    this._pingSentAt = 0;
  }

  private _clearRetry(): void {
    if (this._retryTimer !== null) clearTimeout(this._retryTimer);
    this._retryTimer = null;
  }

  private _clearHidden(): void {
    if (this._hiddenTimer !== null) clearTimeout(this._hiddenTimer);
    this._hiddenTimer = null;
  }

  private _clearSocketTimers(): void {
    if (this._connectTimer !== null) clearTimeout(this._connectTimer);
    if (this._helloTimer !== null) clearTimeout(this._helloTimer);
    if (this._tickTimer !== null) clearInterval(this._tickTimer);
    this._connectTimer = this._helloTimer = null;
    this._tickTimer = null;
  }

  /** Detaches and closes the current socket; late events of it are ignored from now on. */
  private _teardownSocket(normal: boolean): void {
    this._gen++;
    this._clearSocketTimers();
    const ws = this._ws;
    this._ws = null;
    if (!ws) return;
    ws.onopen = ws.onmessage = ws.onclose = ws.onerror = null;
    try {
      ws.close(normal ? 1000 : 4000, normal ? 'bye' : 'closed');
    } catch {
      // already closed
    }
  }

  private _open(): void {
    if (this._disposed || !this._wanted) return;
    this._clearRetry();
    this._teardownSocket(true);
    const room = roomAt(this._roomIdx) ?? DEFAULT_ROOM;
    this._room = room;
    this._setStatus('connecting', 'Conectando…');
    const gen = this._gen;
    let ws: SocketLike;
    try {
      ws = (this._opts.createSocket ?? defaultSocket)((this._opts.buildUrl ?? defaultUrl)(room));
    } catch {
      this._lost(gen);
      return;
    }
    this._ws = ws;
    const now = this._now();
    this._lastRx = now;
    this._lastPing = now;
    this._lastRttPing = now;
    ws.onopen = () => this._guard(gen, () => this._onOpen());
    ws.onmessage = (ev) => this._guard(gen, () => this._onData(ev.data));
    ws.onclose = () => this._lost(gen);
    ws.onerror = () => {
      // a `close` always follows; the loss is handled there
    };
    this._connectTimer = setTimeout(() => this._lost(gen, true), CONNECT_TIMEOUT_MS);
  }

  private _guard(gen: number, fn: () => void): void {
    if (gen !== this._gen) return;
    try {
      fn();
    } catch {
      // swallow: a bad frame or listener must never reach the render loop
    }
  }

  private _onOpen(): void {
    if (this._connectTimer !== null) clearTimeout(this._connectTimer);
    this._connectTimer = null;
    const id = this._opts.getHello();
    this._helloSentAt = this._now();
    this._rawSend(
      encode({
        t: 'hello',
        v: PROTOCOL_VERSION,
        nick: sanitizeNick(id.nick),
        character: id.character,
        palette: id.palette,
      }),
    );
    const gen = this._gen;
    this._helloTimer = setTimeout(() => this._lost(gen, true), WELCOME_TIMEOUT_MS);
  }

  /** The socket closed (or was judged dead). Decides between retrying and giving up. */
  private _lost(gen: number, force = false): void {
    if (gen !== this._gen) return;
    if (force) this._teardownSocket(false);
    else {
      this._gen++;
      this._clearSocketTimers();
      this._ws = null;
    }
    const wasOnline = this._status === 'online';
    this._resetSession();
    if (!this._wanted || this._disposed) return;
    if (this._status === 'rejected') return;
    if (this._paused) return;
    this._attempts++;
    if (shouldGiveUp(this._attempts)) {
      this._gaveUp = true;
      this._setStatus('offline', 'Sin conexión. Seguís explorando solo; podés reintentar desde el menú.');
      return;
    }
    const delay = backoffDelay(this._attempts - 1, this._random);
    this._setStatus('offline', wasOnline ? 'Se cortó la conexión. Reconectando…' : 'Reconectando…');
    this._retryTimer = setTimeout(() => {
      this._retryTimer = null;
      if (typeof document !== 'undefined' && document.hidden) {
        this._paused = true;
        this._setStatus('offline', 'En pausa mientras no mirás la pestaña.');
        return;
      }
      this._open();
    }, delay);
  }

  // ------------------------------------------------------------------ visibility
  private _handleVisibility(): void {
    if (!this._wanted || this._disposed) return;
    if (document.hidden) {
      this._clearHidden();
      this._hiddenTimer = setTimeout(() => {
        this._hiddenTimer = null;
        if (!this._wanted || this._paused) return;
        this._paused = true;
        this._clearRetry();
        this._teardownSocket(true);
        this._resetSession();
        this._setStatus('offline', 'En pausa mientras no mirás la pestaña.');
      }, HIDDEN_DISCONNECT_MS);
      return;
    }
    this._clearHidden();
    if (this._paused) {
      this._paused = false;
      this._attempts = 0;
      this._gaveUp = false;
      this._open();
    }
  }

  // ------------------------------------------------------------------ heartbeat
  private _startHeartbeat(): void {
    if (this._tickTimer !== null) clearInterval(this._tickTimer);
    const gen = this._gen;
    this._tickTimer = setInterval(() => this._guard(gen, () => this._tick(gen)), TICK_MS);
  }

  private _tick(gen: number): void {
    const now = this._now();
    if (now - this._lastRx > DEAD_PEER_MS) {
      this._lost(gen, true);
      return;
    }
    if (now - this._lastPing >= KEEPALIVE_MS) {
      this._lastPing = now;
      this._rawSend(KEEPALIVE_PING);
    }
    if (now - this._lastRttPing >= RTT_PING_MS) this._sendRttPing(now);
  }

  private _sendRttPing(now: number): void {
    this._lastRttPing = now;
    this._pingSentAt = now;
    this._rawSend(encode({ t: 'ping' }));
  }

  // ------------------------------------------------------------------ inbound
  private _onData(data: unknown): void {
    if (typeof data !== 'string') return;
    const now = this._now();
    this._lastRx = now;
    if (data === KEEPALIVE_PONG) return;
    const msg = parseServerMessage(data);
    if (!msg) return;
    switch (msg.t) {
      case 'welcome':
        this._onWelcome(msg, now);
        return;
      case 'join': {
        const info = this.presence.join(msg.peer, now);
        if (!info) return;
        this._emit('join', msg.peer);
        this._emit('status', this.info);
        return;
      }
      case 'leave':
        if (this.presence.leave(msg.id)) {
          this._emit('leave', { id: msg.id });
          this._emit('status', this.info);
        }
        return;
      case 'state':
        if (Array.isArray(msg.p)) {
          for (const t of msg.p) this.presence.touch(t[0], now);
          this._emit('state', { st: msg.st, p: msg.p, recvAt: now });
        }
        return;
      case 'appearance':
        if (this.presence.setAppearance(msg.id, msg.character, msg.palette, now)) {
          this._emit('appearance', { id: msg.id, character: msg.character, palette: msg.palette });
        }
        return;
      case 'rename': {
        const self = msg.id === this.presence.selfId;
        if (self) this._nick = msg.nick;
        else if (!this.presence.setNick(msg.id, msg.nick, now)) return;
        this._emit('rename', { id: msg.id, nick: msg.nick, self });
        return;
      }
      case 'chat':
        this._emit('chat', { id: msg.id, nick: msg.nick, text: msg.text, ts: msg.ts, self: msg.id === this.presence.selfId });
        return;
      case 'system':
        this._emit('system', { text: msg.text, kind: msg.kind });
        return;
      case 'error':
        this._onServerError(msg.code, msg.message);
        return;
      case 'pong':
        if (this._pingSentAt) {
          this._clock.addRtt(now - this._pingSentAt);
          this._pingSentAt = 0;
        }
        return;
    }
  }

  private _onWelcome(msg: WelcomeMsg, now: number): void {
    if (this._helloTimer !== null) clearTimeout(this._helloTimer);
    this._helloTimer = null;
    this._attempts = 0;
    this._gaveUp = false;
    this.presence.reset(msg.id, Array.isArray(msg.peers) ? msg.peers : [], now);
    this._nick = typeof msg.nick === 'string' && msg.nick ? msg.nick : sanitizeNick(this._opts.getHello().nick);
    if (typeof msg.room === 'string') this._room = msg.room;
    this._clock.onWelcome(msg.serverTime, now, now - this._helloSentAt);
    this._setStatus('online', 'En línea');
    this._emit('welcome', msg);
    this._startHeartbeat();
    this._sendRttPing(now);
  }

  private _onServerError(code: ErrorCode, message: string): void {
    this._emit('error', { code, message: ERROR_MESSAGES[code] ?? message });
    // The server closes some rejections late: close our side right away
    if (code === 'room_full') {
      this._roomIdx++;
      if (roomAt(this._roomIdx) === null) {
        this._reject('Todas las salas están llenas por ahora. Seguís explorando solo.');
        return;
      }
      this._teardownSocket(true);
      this._resetSession();
      this._setStatus('connecting', 'Esa sala está llena, probando otra…');
      this._clearRetry();
      this._retryTimer = setTimeout(() => {
        this._retryTimer = null;
        this._open();
      }, 250);
      return;
    }
    if (code === 'too_many_connections' || code === 'bad_version' || code === 'bad_origin') {
      this._reject(ERROR_MESSAGES[code]);
    }
  }

  private _reject(message: string): void {
    this._teardownSocket(true);
    this._resetSession();
    this._setStatus('rejected', message);
  }

  // ------------------------------------------------------------------ outbound
  private _rawSend(text: string): boolean {
    const ws = this._ws;
    if (!ws || ws.readyState !== OPEN) return false;
    try {
      ws.send(text);
      return true;
    } catch {
      return false;
    }
  }

  private _send(msg: ClientMessage): boolean {
    if (this._status !== 'online') return false;
    return this._rawSend(encode(msg));
  }

  /** Movement report; dropped while the Mapa view is hidden or when called faster than ~25/s. */
  sendPos(x: number, z: number, h: number, s: number): boolean {
    if (!this._viewActive || this._status !== 'online') return false;
    if (!(Number.isFinite(x) && Number.isFinite(z) && Number.isFinite(h) && Number.isFinite(s))) return false;
    const now = this._now();
    if (now - this._lastPos < MIN_POS_INTERVAL_MS) return false;
    this._lastPos = now;
    return this._send({
      t: 'pos',
      x: round2(clampX(x)),
      z: round2(clampZ(z)),
      h: round2(shortestArc(0, h)),
      s: round2(Math.max(0, Math.min(1, s))),
    });
  }

  sendAppearance(character: CharacterId, palette: PaletteId): boolean {
    return this._send({ t: 'appearance', character, palette });
  }

  sendChat(text: string): boolean {
    return this._send({ t: 'chat', text });
  }

  sendSecret(id: SecretId): boolean {
    return this._send({ t: 'secret', id });
  }

  /** Asks for a new nickname; the server answers with a `rename` (its sanitised version wins). */
  sendRename(nick: string): boolean {
    return this._send({ t: 'rename', nick: sanitizeNick(nick) });
  }
}
