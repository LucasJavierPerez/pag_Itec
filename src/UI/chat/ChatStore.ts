/**
 * Chat state of the Mapa tab, kept free of any DOM so it can be unit-tested headlessly.
 * It listens to the window events published by `MapOnline` (`net-chat`, `net-system`, `net-error`,
 * `net-status`) and keeps the last messages, the unread counter, the muted peers and the friendly
 * notices for the local player. Text is stored exactly as received; renderers must use `textContent`.
 */

import type { ChatRejectReason } from '../../../shared/moderation.ts';

// ---- Tunable constants
/** Messages kept in memory (oldest dropped first). */
export const MAX_MESSAGES = 100;
/** sessionStorage key with the muted peer ids (JSON array). */
export const MUTED_KEY = 'itec-muted';
/** This many join/leave lines of the same kind inside the window collapse into a single line. */
export const BURST_MIN = 3;
export const BURST_WINDOW_MS = 5000;
/** The send button stays disabled this long after the server reports `rate_limited`. */
export const RATE_COOLDOWN_MS = 3000;

export const NOTICE_FILTERED = 'Tu mensaje no se envió: evitá datos personales, links o insultos.';
export const NOTICE_RATE_LIMITED = 'Esperá un momento antes de escribir de nuevo.';
export const NOTICE_OFFLINE = 'Sin conexión: el chat se activa cuando te conectes.';

export type ChatKind = 'chat' | 'system' | 'notice';
export type NetStatusName = 'idle' | 'connecting' | 'online' | 'offline' | 'rejected';

export interface ChatMessage {
  /** Monotonic sequence number (never reused); use it as a stable key. */
  seq: number;
  kind: ChatKind;
  /** Sender peer id (chat only). */
  id?: string;
  nick: string;
  text: string;
  ts: number;
  self: boolean;
  /** Bumped when a collapsed burst line changes text in place. */
  rev: number;
  /** System sub-kind (join, leave, secret, info). */
  sub?: string;
}

export interface StorageLike {
  getItem(key: string): string | null;
  setItem(key: string, value: string): void;
}

export interface ChatStoreOptions {
  now?: () => number;
  /** `null` disables persistence; default is sessionStorage when available. */
  storage?: StorageLike | null;
}

/** Friendly Spanish notice for a server error code (the local player is the only one who gets them). */
export function noticeForError(code: string, message?: string): string {
  switch (code) {
    case 'filtered':
      return NOTICE_FILTERED;
    case 'rate_limited':
      return NOTICE_RATE_LIMITED;
    case 'bad_message':
      return 'No pudimos enviar ese mensaje. Probá de nuevo.';
    case 'room_full':
      return 'Esta sala está llena. Probá de nuevo en un rato.';
    case 'bad_version':
      return 'Tu versión está desactualizada. Recargá la página para chatear.';
    case 'bad_origin':
      return 'No se puede chatear desde este sitio.';
    case 'too_many_connections':
      return 'Hay demasiadas conexiones desde tu red. Cerrá otras pestañas.';
    default:
      return typeof message === 'string' && message ? message.slice(0, 120) : 'Algo falló con el chat. Probá de nuevo.';
  }
}

/** Friendly Spanish explanation for a client-side `checkChat` rejection. */
export function messageForReason(reason: ChatRejectReason): string {
  switch (reason) {
    case 'empty':
      return 'Escribí algo para enviar.';
    case 'too_long':
      return 'Tu mensaje es muy largo.';
    case 'phone':
    case 'digits':
      return 'No compartas números de teléfono ni de documento.';
    case 'email':
      return 'No compartas correos electrónicos.';
    case 'link':
      return 'No se pueden enviar links.';
    case 'contact':
      return 'No compartas datos de contacto ni pidas pasar a otra app.';
    case 'repetition':
      return 'Evitá repetir lo mismo muchas veces.';
    case 'caps':
      return 'Escribí sin tantas MAYÚSCULAS, por favor.';
    case 'profanity':
      return 'Cuidemos el lenguaje: probá con otras palabras.';
  }
}

interface Burst {
  kind: string;
  start: number;
  count: number;
  items: ChatMessage[];
  summary: ChatMessage | null;
}

function burstText(kind: string, n: number): string {
  return kind === 'join' ? `${n} personas entraron` : `${n} personas salieron`;
}

function defaultStorage(): StorageLike | null {
  try {
    return typeof sessionStorage !== 'undefined' ? sessionStorage : null;
  } catch {
    return null;
  }
}

export class ChatStore {
  private _all: ChatMessage[] = [];
  private _seq = 0;
  private _readSeq = 0;
  private _muted = new Set<string>();
  private _visible: ChatMessage[] | null = [];
  private _changeListeners = new Set<() => void>();
  private _chatListeners = new Set<(m: ChatMessage) => void>();
  private _burst: Burst | null = null;
  private _offlineNoticed = false;
  private _now: () => number;
  private _storage: StorageLike | null;
  private _target: EventTarget | null = null;

  status: NetStatusName = 'idle';
  count = 0;
  /** Timestamp until which the send button should stay disabled (0 = no cooldown). */
  cooldownUntil = 0;

  private _onChatEvent = (e: Event): void => this.handleChat((e as CustomEvent).detail);
  private _onSystemEvent = (e: Event): void => this.handleSystem((e as CustomEvent).detail);
  private _onErrorEvent = (e: Event): void => this.handleError((e as CustomEvent).detail);
  private _onStatusEvent = (e: Event): void => this.handleStatus((e as CustomEvent).detail);

  constructor(opts: ChatStoreOptions = {}) {
    this._now = opts.now ?? (() => Date.now());
    this._storage = opts.storage === undefined ? defaultStorage() : opts.storage;
    this._loadMuted();
  }

  // ------------------------------------------------------------------ wiring
  /** Starts listening to the `net-*` events published on `target` (the window). */
  attach(target: EventTarget): void {
    this.detach();
    this._target = target;
    target.addEventListener('net-chat', this._onChatEvent);
    target.addEventListener('net-system', this._onSystemEvent);
    target.addEventListener('net-error', this._onErrorEvent);
    target.addEventListener('net-status', this._onStatusEvent);
  }

  detach(): void {
    const t = this._target;
    if (!t) return;
    t.removeEventListener('net-chat', this._onChatEvent);
    t.removeEventListener('net-system', this._onSystemEvent);
    t.removeEventListener('net-error', this._onErrorEvent);
    t.removeEventListener('net-status', this._onStatusEvent);
    this._target = null;
  }

  subscribe(fn: () => void): () => void {
    this._changeListeners.add(fn);
    return () => this._changeListeners.delete(fn);
  }

  /** Called for every new chat message that is not hidden by a mute (used by the overhead bubbles). */
  onChat(fn: (m: ChatMessage) => void): () => void {
    this._chatListeners.add(fn);
    return () => this._chatListeners.delete(fn);
  }

  // ------------------------------------------------------------------ event handlers
  handleChat(detail: unknown): void {
    const d = detail as { id?: unknown; nick?: unknown; text?: unknown; ts?: unknown; self?: unknown } | null;
    if (!d || typeof d.text !== 'string' || !d.text) return;
    this.addChat({
      id: typeof d.id === 'string' ? d.id : undefined,
      nick: typeof d.nick === 'string' ? d.nick : '',
      text: d.text,
      ts: typeof d.ts === 'number' ? d.ts : this._now(),
      self: d.self === true,
    });
  }

  handleSystem(detail: unknown): void {
    const d = detail as { text?: unknown; kind?: unknown } | null;
    if (!d || typeof d.text !== 'string' || !d.text) return;
    this.addSystem(d.text, typeof d.kind === 'string' ? d.kind : 'info');
  }

  handleError(detail: unknown): void {
    const d = detail as { code?: unknown; message?: unknown } | null;
    const code = typeof d?.code === 'string' ? d.code : '';
    if (code === 'rate_limited') this.cooldownUntil = this._now() + RATE_COOLDOWN_MS;
    this.addNotice(noticeForError(code, typeof d?.message === 'string' ? d.message : undefined));
  }

  handleStatus(detail: unknown): void {
    const d = detail as { status?: unknown; count?: unknown } | null;
    const status = d?.status as NetStatusName | undefined;
    if (!status) return;
    this.status = status;
    this.count = typeof d?.count === 'number' ? d.count : 0;
    if (status === 'online') {
      this._offlineNoticed = false;
    } else if ((status === 'offline' || status === 'rejected') && !this._offlineNoticed) {
      this._offlineNoticed = true;
      this._append('notice', { nick: '', text: NOTICE_OFFLINE, ts: this._now(), self: false });
    }
    this._emit();
  }

  // ------------------------------------------------------------------ adding messages
  addChat(m: { id?: string; nick: string; text: string; ts: number; self: boolean }): ChatMessage {
    const msg = this._append('chat', m);
    this._emit();
    if (!this._hidden(msg)) for (const fn of [...this._chatListeners]) fn(msg);
    return msg;
  }

  addSystem(text: string, sub = 'info'): void {
    if (sub === 'join' || sub === 'leave') {
      this._addPresence(text, sub);
    } else {
      this._append('system', { nick: '', text, ts: this._now(), self: false }, sub);
    }
    this._emit();
  }

  /** A local-only dim line. An identical notice right after another one is dropped. */
  addNotice(text: string): void {
    const last = this._all[this._all.length - 1];
    if (last && last.kind === 'notice' && last.text === text) return;
    this._append('notice', { nick: '', text, ts: this._now(), self: false });
    this._emit();
  }

  private _addPresence(text: string, kind: string): void {
    const t = this._now();
    let b = this._burst;
    if (!b || b.kind !== kind || t - b.start > BURST_WINDOW_MS) {
      b = { kind, start: t, count: 0, items: [], summary: null };
      this._burst = b;
    }
    b.count++;
    if (b.summary) {
      b.summary.text = burstText(kind, b.count);
      b.summary.rev++;
      return;
    }
    b.items.push(this._append('system', { nick: '', text, ts: t, self: false }, kind));
    if (b.count >= BURST_MIN) {
      const drop = new Set(b.items.map((x) => x.seq));
      this._all = this._all.filter((x) => !drop.has(x.seq));
      b.items = [];
      b.summary = this._append('system', { nick: '', text: burstText(kind, b.count), ts: t, self: false }, kind);
    }
  }

  private _append(
    kind: ChatKind,
    m: { id?: string; nick: string; text: string; ts: number; self: boolean },
    sub?: string,
  ): ChatMessage {
    const msg: ChatMessage = { seq: ++this._seq, kind, id: m.id, nick: m.nick, text: m.text, ts: m.ts, self: m.self, rev: 0, sub };
    this._all.push(msg);
    if (this._all.length > MAX_MESSAGES) this._all.splice(0, this._all.length - MAX_MESSAGES);
    return msg;
  }

  // ------------------------------------------------------------------ mute
  private _hidden(m: ChatMessage): boolean {
    return m.kind === 'chat' && !m.self && !!m.id && this._muted.has(m.id);
  }

  isMuted(id: string): boolean {
    return this._muted.has(id);
  }

  get mutedIds(): readonly string[] {
    return [...this._muted];
  }

  mute(id: string): void {
    if (!id || this._muted.has(id)) return;
    this._muted.add(id);
    this._saveMuted();
    this._emit();
  }

  unmute(id: string): void {
    if (!this._muted.delete(id)) return;
    this._saveMuted();
    this._emit();
  }

  private _loadMuted(): void {
    try {
      const raw = this._storage?.getItem(MUTED_KEY);
      if (!raw) return;
      const list: unknown = JSON.parse(raw);
      if (Array.isArray(list)) for (const id of list) if (typeof id === 'string') this._muted.add(id);
    } catch {
      // corrupted or blocked storage: start with nobody muted
    }
  }

  private _saveMuted(): void {
    try {
      this._storage?.setItem(MUTED_KEY, JSON.stringify([...this._muted]));
    } catch {
      // the mute list then only lasts for this page
    }
  }

  // ------------------------------------------------------------------ reading
  /** Messages to show: everything except the chat lines of muted peers. */
  get messages(): readonly ChatMessage[] {
    if (!this._visible) this._visible = this._all.filter((m) => !this._hidden(m));
    return this._visible;
  }

  /** Chat lines from other (non-muted) people that arrived since `markRead()`. */
  get unread(): number {
    let n = 0;
    for (const m of this.messages) if (m.kind === 'chat' && !m.self && m.seq > this._readSeq) n++;
    return n;
  }

  markRead(): void {
    if (this._readSeq === this._seq) return;
    this._readSeq = this._seq;
    this._emit();
  }

  private _emit(): void {
    this._visible = null;
    for (const fn of [...this._changeListeners]) fn();
  }
}
