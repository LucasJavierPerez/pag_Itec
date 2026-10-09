import { NetClient } from './NetClient.ts';
import type { NetStatusInfo } from './NetClient.ts';
import { shortestArc } from './interpolation.ts';
import { NicknamePrompt } from '../../../UI/NicknamePrompt.ts';
import type { NicknameResult } from '../../../UI/NicknamePrompt.ts';
import { getCharacterId, getSkinId } from '../skinState.ts';
import { PLAYER_MAX_SPEED } from '../playerMotion.ts';
import { sanitizeNick } from '../../../../shared/moderation.ts';

/** localStorage: the nickname the player chose (only ever sent to the room they join). */
export const NICK_STORAGE_KEY = 'itec-nick';
/** sessionStorage: '0' = "Jugar sin conexión" for this browser session (no network at all). */
export const ONLINE_SESSION_KEY = 'itec-online';

// ---- Tunable constants
/** Position reports per second while moving (the room accepts up to 30). */
const POS_INTERVAL_MS = 100;
/** Keep reporting this long after the last movement, so the final pose arrives. */
const MOVE_GRACE_MS = 200;
const TURN_EPSILON = 0.02;
const MOVE_EPSILON = 0.03;

function readLocal(key: string): string {
  try {
    return localStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}
function writeLocal(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // storage may be blocked: the nickname then only lasts for this page
  }
}
function readSession(key: string): string {
  try {
    return sessionStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}
function writeSession(key: string, value: string | null): void {
  try {
    if (value === null) sessionStorage.removeItem(key);
    else sessionStorage.setItem(key, value);
  } catch {
    // ignore
  }
}

/**
 * Glue between the Mapa view and the network: owns the (lazily created) `NetClient`, the stored
 * nickname, the consent prompt, the position reports and the public window events that the chat UI
 * (T7) consumes: `net-status`, `net-chat`, `net-system`, `net-error` (+ `net-nick`).
 */
export class MapOnline {
  private _client: NetClient | null = null;
  private _clientListeners = new Set<(c: NetClient) => void>();
  private _prompt = new NicknamePrompt();
  private _prompting = false;
  private _mapActive = false;
  private _nick = readLocal(NICK_STORAGE_KEY);
  private _sessionNick = '';
  private _secretPending = false;
  private _secretSent = false;

  private _lastSend = 0;
  private _lastMoveAt = 0;
  private _lastHeading = 0;
  private _idleSent = true;
  private _status: NetStatusInfo = { status: 'idle', count: 0, message: '', room: null };

  private _onSkin = (): void => {
    const c = this._client;
    if (c && c.status === 'online') c.sendAppearance(getCharacterId(), getSkinId());
  };
  private _onSecret = (e: Event): void => {
    const detail = (e as CustomEvent<{ id?: string; first?: boolean }>).detail;
    if (detail?.id !== 'ada' || !detail.first || this._secretSent) return;
    this._secretPending = true;
    this._flushSecret();
  };

  constructor() {
    window.addEventListener('skin-change', this._onSkin);
    window.addEventListener('secret-found', this._onSecret);
  }

  // ------------------------------------------------------------------ public store (for T7)
  get client(): NetClient | null {
    return this._client;
  }
  get status(): NetStatusInfo['status'] {
    return this._status.status;
  }
  get statusInfo(): NetStatusInfo {
    return this._status;
  }
  get connectedCount(): number {
    return this._client?.connectedCount ?? 0;
  }
  get selfId(): string | null {
    return this._client?.selfId ?? null;
  }
  /** Nickname to show: the server's version when online, else what the player chose. */
  get nick(): string {
    return this._client?.nick || this._sessionNick || this._nick;
  }
  /** The player chose "Jugar sin conexión" for this session. */
  get soloThisSession(): boolean {
    return readSession(ONLINE_SESSION_KEY) === '0';
  }
  /** The client is online or trying to be. */
  get wantsOnline(): boolean {
    return !!this._client && this._client.wanted;
  }

  /** Calls `cb` when the client exists (immediately when it already does). */
  onClient(cb: (c: NetClient) => void): () => void {
    this._clientListeners.add(cb);
    if (this._client) cb(this._client);
    return () => this._clientListeners.delete(cb);
  }

  // ------------------------------------------------------------------ client lifecycle
  private _ensureClient(): NetClient {
    if (this._client) return this._client;
    const c = new NetClient({
      getHello: () => ({ nick: this.nick, character: getCharacterId(), palette: getSkinId() }),
    });
    this._client = c;
    c.setViewActive(this._mapActive);
    c.on('status', (info) => {
      this._status = info;
      this._dispatch('net-status', { status: info.status, count: info.count, message: info.message, room: info.room });
    });
    c.on('welcome', (m) => {
      this._idleSent = false;
      this._lastMoveAt = performance.now();
      this._adoptServerNick(m.nick);
      this._dispatch('net-nick', { nick: this.nick });
      this._flushSecret();
    });
    c.on('rename', ({ nick, self }) => {
      if (!self) return;
      this._adoptServerNick(nick);
      this._dispatch('net-nick', { nick: this.nick });
    });
    c.on('chat', (m) => this._dispatch('net-chat', { id: m.id, nick: m.nick, text: m.text, ts: m.ts, self: m.self }));
    c.on('system', (m) => this._dispatch('net-system', { text: m.text, kind: m.kind }));
    c.on('error', (m) => this._dispatch('net-error', { code: m.code, message: m.message }));
    for (const cb of [...this._clientListeners]) cb(c);
    return c;
  }

  private _dispatch(type: string, detail: unknown): void {
    try {
      window.dispatchEvent(new CustomEvent(type, { detail }));
    } catch {
      // a faulty listener must not break the connection
    }
  }

  /** The server's sanitised nickname wins; it is persisted only when the player already saved one. */
  private _adoptServerNick(nick: string): void {
    if (!nick) return;
    this._sessionNick = nick;
    if (this._nick) {
      this._nick = nick;
      writeLocal(NICK_STORAGE_KEY, nick);
    }
  }

  private _flushSecret(): void {
    const c = this._client;
    if (!this._secretPending || !c || c.status !== 'online') return;
    if (c.sendSecret('ada')) {
      this._secretPending = false;
      this._secretSent = true;
    }
  }

  private _connect(): void {
    const c = this._ensureClient();
    c.connect();
  }

  // ------------------------------------------------------------------ view hooks
  /** The Mapa tab became visible: ask for a nickname the first time, then connect. */
  mapShown(): void {
    this._mapActive = true;
    this._client?.setViewActive(true);
    if (this._prompting || this.soloThisSession) return;
    if (!this._nick) {
      void this._firstVisit();
      return;
    }
    const c = this._client;
    if (!c || c.status === 'idle' || (c.status === 'offline' && c.gaveUp)) this._connect();
  }

  mapHidden(): void {
    this._mapActive = false;
    this._client?.setViewActive(false);
  }

  private async _firstVisit(): Promise<void> {
    this._prompting = true;
    try {
      const result = await this._prompt.open({ mode: 'first' });
      this._applyFirst(result);
    } finally {
      this._prompting = false;
    }
  }

  private _applyFirst(result: NicknameResult): void {
    if (result.action === 'cancel') return;
    const nick = sanitizeNick(result.nick);
    if (result.action === 'enter') {
      this._nick = nick;
      this._sessionNick = nick;
      writeLocal(NICK_STORAGE_KEY, nick);
      writeSession(ONLINE_SESSION_KEY, null);
      this._dispatch('net-nick', { nick });
      this._connect();
      return;
    }
    // "Jugar sin conexión": nothing is stored and nothing touches the network
    this._sessionNick = nick;
    writeSession(ONLINE_SESSION_KEY, '0');
    this._status = { status: 'idle', count: 0, message: 'Jugando sin conexión', room: null };
    this._dispatch('net-status', { status: 'idle', count: 0, message: this._status.message, room: null });
    this._dispatch('net-nick', { nick });
  }

  // ------------------------------------------------------------------ menu actions
  /** "Cambiar nombre". */
  async changeName(): Promise<void> {
    if (this._prompting) return;
    this._prompting = true;
    try {
      const result = await this._prompt.open({ mode: 'rename', initial: this.nick });
      if (result.action !== 'enter') return;
      const nick = sanitizeNick(result.nick);
      this._sessionNick = nick;
      if (this._nick || this.wantsOnline) {
        this._nick = nick;
        writeLocal(NICK_STORAGE_KEY, nick);
      }
      this._dispatch('net-nick', { nick });
      const c = this._client;
      if (c && c.status === 'online') c.sendRename(nick);
    } finally {
      this._prompting = false;
    }
  }

  /** "Conectarme" / "Desconectarme". */
  async toggleConnection(): Promise<void> {
    if (this.wantsOnline) {
      this._client?.disconnect();
      writeSession(ONLINE_SESSION_KEY, '0');
      return;
    }
    writeSession(ONLINE_SESSION_KEY, null);
    if (!this._nick) {
      if (this._prompting) return;
      this._prompting = true;
      try {
        this._applyFirst(await this._prompt.open({ mode: 'first', initial: this._sessionNick }));
      } finally {
        this._prompting = false;
      }
      return;
    }
    this._connect();
  }

  // ------------------------------------------------------------------ position reports
  /**
   * Call once per frame with the local player's pose. Reports ~10 times a second while moving or
   * turning, plus a final idle report (`s = 0`) when the player stops.
   */
  tick(nowMs: number, x: number, z: number, heading: number, speed: number): void {
    const c = this._client;
    if (!c || c.status !== 'online') return;
    const s = Math.max(0, Math.min(1, speed / PLAYER_MAX_SPEED));
    const moving = s > MOVE_EPSILON || Math.abs(shortestArc(this._lastHeading, heading)) > TURN_EPSILON;
    this._lastHeading = heading;
    if (moving) this._lastMoveAt = nowMs;
    if (moving || nowMs - this._lastMoveAt < MOVE_GRACE_MS) {
      this._idleSent = false;
      if (nowMs - this._lastSend >= POS_INTERVAL_MS && c.sendPos(x, z, heading, s)) this._lastSend = nowMs;
    } else if (!this._idleSent) {
      if (c.sendPos(x, z, heading, 0)) this._idleSent = true;
    }
  }

  dispose(): void {
    window.removeEventListener('skin-change', this._onSkin);
    window.removeEventListener('secret-found', this._onSecret);
    this._prompt.close();
    this._client?.dispose();
    this._client = null;
    this._clientListeners.clear();
  }
}
