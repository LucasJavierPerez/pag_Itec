import type { MapOnline } from '../../Experience/Map/net/MapOnline.ts';
import { checkChat } from '../../../shared/moderation.ts';
import { MAX_CHAT } from '../../../shared/protocol.ts';
import { isCompactLayout, onCompactChange } from '../compact.ts';
import { ChatStore, messageForReason } from './ChatStore.ts';
import type { ChatMessage } from './ChatStore.ts';
import { ChatToast } from './ChatToast.ts';

// ---- Tunable constants
/** The character counter appears from this length on. */
const COUNTER_FROM = 100;
/** Pixels from the bottom within which the list keeps following new messages. */
const STICK_PX = 48;
/** Inline feedback ("no se puede enviar links") disappears after this long. */
const INLINE_MS = 4500;
/** Dragging the sheet handle down further than this closes the sheet. */
const SWIPE_CLOSE_PX = 70;
const PRIVACY_KEY = 'itec-chat-privacy';

const PRIVACY_TEXT = 'Los mensajes los ven todas las personas conectadas y no se guardan. No compartas datos personales.';

const ICON_CHAT =
  '<svg class="chat__icon" viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M4 4h16a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2H9l-5 4v-4H4a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" fill="currentColor"/></svg>';

function readSession(key: string): string {
  try {
    return sessionStorage.getItem(key) ?? '';
  } catch {
    return '';
  }
}
function writeSession(key: string, value: string): void {
  try {
    sessionStorage.setItem(key, value);
  } catch {
    // the notice then simply shows again next time
  }
}

/** Deterministic hue (0-359) for a nickname, so the same person keeps the same colour. */
export function nickHue(nick: string): number {
  let h = 0;
  for (let i = 0; i < nick.length; i++) h = (h * 31 + nick.charCodeAt(i)) >>> 0;
  return h % 360;
}

interface Row {
  el: HTMLElement;
  rev: number;
  text: HTMLElement;
}

export interface ChatPanelOptions {
  store: ChatStore;
  online: MapOnline;
}

/**
 * The chat of the Mapa tab. Desktop: a bar at the bottom centre that expands into a panel.
 * Phones: a round button under the "Centrar" icon that opens a bottom sheet above the keyboard.
 * Every piece of user text goes through `textContent`.
 */
export class ChatPanel {
  readonly root: HTMLDivElement;

  private _store: ChatStore;
  private _online: MapOnline;
  private _toast = new ChatToast();

  private _toggle: HTMLButtonElement;
  private _dot: HTMLElement;
  private _label: HTMLElement;
  private _badge: HTMLElement;
  private _panel: HTMLElement;
  private _title: HTMLElement;
  private _status: HTMLElement;
  private _statusDot: HTMLElement;
  private _privacy: HTMLElement;
  private _log: HTMLElement;
  private _jump: HTMLButtonElement;
  private _inline: HTMLElement;
  private _input: HTMLInputElement;
  private _count: HTMLElement;
  private _send: HTMLButtonElement;
  private _form: HTMLFormElement;
  private _offline: HTMLElement;
  private _offlineText: HTMLElement;
  private _connect: HTMLButtonElement;
  private _scrim: HTMLElement;
  private _menu: HTMLDivElement;
  private _menuButton: HTMLButtonElement;
  private _menuFor: { id: string; nick: string; opener: HTMLElement } | null = null;

  private _rows = new Map<number, Row>();
  private _maxSeq = 0;
  private _open = false;
  private _viewActive = false;
  private _compact = isCompactLayout();
  private _opener: HTMLElement | null = null;
  private _lastSent = '';
  private _inlineTimer: number | null = null;
  private _cooldownTimer: number | null = null;
  private _vvFrame = 0;
  private _unsubStore: () => void;
  private _unsubCompact: () => void;
  private _drag: { id: number; y: number } | null = null;

  // ---------------------------------------------------------------- listeners
  private _onStoreChange = (): void => this._sync();
  private _onNetEvent = (): void => this._sync();
  private _onSecretLine = (e: Event): void => {
    const d = (e as CustomEvent<{ text?: string; kind?: string }>).detail;
    if (d?.kind === 'secret' && typeof d.text === 'string' && d.text) this._toast.show(d.text);
  };
  private _onNetError = (e: Event): void => {
    // A rejected message comes back to the sender only: put the text back so it is not lost
    const code = (e as CustomEvent<{ code?: string }>).detail?.code;
    if ((code === 'filtered' || code === 'rate_limited') && this._lastSent && !this._input.value) {
      this._input.value = this._lastSent;
      this._updateCounter();
    }
    this._lastSent = '';
  };
  private _onWindowKey = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this._open && !e.defaultPrevented) {
      this.close(true);
      return;
    }
    if (e.key !== 'Enter' || e.repeat || e.ctrlKey || e.metaKey || e.altKey || e.shiftKey) return;
    if (this._compact || !this._viewActive || e.defaultPrevented) return;
    const t = e.target as HTMLElement | null;
    if (t && t !== document.body && t.tagName !== 'CANVAS' && t.tagName !== 'HTML') return;
    if (document.querySelector('.nick-prompt')) return;
    e.preventDefault();
    this.open();
  };
  private _onPointerDown = (e: PointerEvent): void => {
    const t = e.target as Node;
    if (this._menuFor && !this._menu.contains(t)) this._closeMenu(false);
  };
  private _onViewport = (): void => {
    if (this._vvFrame) return;
    this._vvFrame = requestAnimationFrame(() => {
      this._vvFrame = 0;
      this._syncViewport();
    });
  };

  constructor(opts: ChatPanelOptions) {
    this._store = opts.store;
    this._online = opts.online;

    const root = document.createElement('div');
    root.className = 'chat';
    root.hidden = true;
    this.root = root;

    // --- toggle (desktop bar / phone round button)
    this._toggle = document.createElement('button');
    this._toggle.type = 'button';
    this._toggle.className = 'chat__toggle';
    this._toggle.id = 'chat-toggle';
    this._toggle.setAttribute('aria-expanded', 'false');
    this._toggle.setAttribute('aria-controls', 'chat-panel');
    this._dot = document.createElement('span');
    this._dot.className = 'chat__dot';
    this._dot.setAttribute('aria-hidden', 'true');
    this._label = document.createElement('span');
    this._label.className = 'chat__label';
    this._badge = document.createElement('span');
    this._badge.className = 'chat__badge';
    this._badge.setAttribute('aria-hidden', 'true');
    this._badge.hidden = true;
    const icon = document.createElement('span');
    icon.className = 'chat__icon-wrap';
    icon.innerHTML = ICON_CHAT; // static markup, no user text
    this._toggle.append(icon, this._dot, this._label, this._badge);
    this._toggle.addEventListener('click', (e) => {
      if (this._open) {
        this.close(e.detail === 0);
      } else {
        this._opener = e.detail === 0 ? this._toggle : null;
        this.open();
      }
    });

    // --- scrim (phones: tap outside closes)
    this._scrim = document.createElement('div');
    this._scrim.className = 'chat__scrim';
    this._scrim.addEventListener('pointerdown', () => this.close(false));

    // --- panel
    const panel = document.createElement('section');
    panel.className = 'chat__panel';
    panel.id = 'chat-panel';
    panel.setAttribute('role', 'region');
    panel.setAttribute('aria-labelledby', 'chat-title');
    this._panel = panel;

    const grip = document.createElement('div');
    grip.className = 'chat__grip';
    grip.setAttribute('aria-hidden', 'true');
    grip.appendChild(document.createElement('span'));
    grip.addEventListener('pointerdown', (e) => this._dragStart(e, grip));
    grip.addEventListener('pointermove', (e) => this._dragMove(e));
    grip.addEventListener('pointerup', (e) => this._dragEnd(e, grip));
    grip.addEventListener('pointercancel', (e) => this._dragEnd(e, grip));

    const head = document.createElement('header');
    head.className = 'chat__head';
    this._title = document.createElement('h2');
    this._title.className = 'chat__title';
    this._title.id = 'chat-title';
    this._title.tabIndex = -1;
    this._title.textContent = 'Chat del mapa';
    this._status = document.createElement('p');
    this._status.className = 'chat__status';
    this._statusDot = document.createElement('span');
    this._statusDot.className = 'chat__dot';
    this._statusDot.setAttribute('aria-hidden', 'true');
    const statusText = document.createElement('span');
    this._status.append(this._statusDot, statusText);
    const close = document.createElement('button');
    close.type = 'button';
    close.className = 'chat__close';
    close.setAttribute('aria-label', 'Cerrar chat');
    close.textContent = '×';
    close.addEventListener('click', (e) => this.close(e.detail === 0));
    head.append(this._title, this._status, close);

    this._privacy = document.createElement('div');
    this._privacy.className = 'chat__privacy';
    const privacyText = document.createElement('span');
    privacyText.textContent = PRIVACY_TEXT;
    const privacyOk = document.createElement('button');
    privacyOk.type = 'button';
    privacyOk.className = 'chat__privacy-ok';
    privacyOk.textContent = 'Entendido';
    privacyOk.setAttribute('aria-label', 'Entendido, ocultar aviso de privacidad');
    privacyOk.addEventListener('click', () => {
      writeSession(PRIVACY_KEY, '1');
      this._privacy.hidden = true;
      this._input.focus({ preventScroll: true });
    });
    this._privacy.append(privacyText, privacyOk);
    this._privacy.hidden = readSession(PRIVACY_KEY) === '1';

    const logWrap = document.createElement('div');
    logWrap.className = 'chat__logwrap';
    this._log = document.createElement('div');
    this._log.className = 'chat__log';
    this._log.setAttribute('role', 'log');
    this._log.setAttribute('aria-live', 'polite');
    this._log.setAttribute('aria-relevant', 'additions');
    this._log.setAttribute('aria-label', 'Mensajes del chat');
    this._log.tabIndex = 0;
    this._log.addEventListener('scroll', () => this._updateJump());
    this._jump = document.createElement('button');
    this._jump.type = 'button';
    this._jump.className = 'chat__jump';
    this._jump.textContent = 'Ir al final';
    this._jump.hidden = true;
    this._jump.addEventListener('click', () => {
      this._scrollToBottom();
      this._input.focus({ preventScroll: true });
    });
    logWrap.append(this._log, this._jump);

    this._inline = document.createElement('p');
    this._inline.className = 'chat__inline';
    this._inline.setAttribute('role', 'status');
    this._inline.setAttribute('aria-live', 'polite');

    this._form = document.createElement('form');
    this._form.className = 'chat__form';
    this._form.noValidate = true;
    const label = document.createElement('label');
    label.className = 'chat__sr';
    label.htmlFor = 'chat-input';
    label.textContent = 'Escribí un mensaje';
    this._input = document.createElement('input');
    this._input.type = 'text';
    this._input.id = 'chat-input';
    this._input.className = 'chat__input';
    this._input.maxLength = MAX_CHAT;
    this._input.autocomplete = 'off';
    this._input.setAttribute('autocapitalize', 'sentences');
    this._input.setAttribute('enterkeyhint', 'send');
    this._input.setAttribute('spellcheck', 'false');
    this._input.placeholder = 'Escribí un mensaje…';
    this._input.addEventListener('input', () => this._updateCounter());
    this._count = document.createElement('span');
    this._count.className = 'chat__count';
    this._count.setAttribute('aria-hidden', 'true');
    this._count.hidden = true;
    this._send = document.createElement('button');
    this._send.type = 'submit';
    this._send.className = 'chat__send';
    this._send.textContent = 'Enviar';
    this._form.append(label, this._input, this._count, this._send);
    this._form.addEventListener('submit', (e) => {
      e.preventDefault();
      this._submit();
    });

    this._offline = document.createElement('div');
    this._offline.className = 'chat__offline';
    this._offlineText = document.createElement('span');
    this._connect = document.createElement('button');
    this._connect.type = 'button';
    this._connect.className = 'chat__connect';
    this._connect.textContent = 'Conectarme';
    this._connect.addEventListener('click', () => this._connectNow());
    this._offline.append(this._offlineText, this._connect);

    panel.append(grip, head, this._privacy, logWrap, this._inline, this._form, this._offline);
    // Keys typed inside the panel must never reach the map (WASD, +, -, Escape of other panels...)
    panel.addEventListener('keydown', (e) => this._onPanelKey(e));
    panel.addEventListener('keyup', (e) => e.stopPropagation());

    // --- nickname menu (silenciar)
    this._menu = document.createElement('div');
    this._menu.className = 'chat__menu';
    this._menu.hidden = true;
    this._menuButton = document.createElement('button');
    this._menuButton.type = 'button';
    this._menuButton.className = 'chat__menu-item';
    this._menuButton.addEventListener('click', () => this._toggleMute());
    this._menu.appendChild(this._menuButton);
    this._menu.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.stopPropagation();
        this._closeMenu(true);
      } else if (e.key === 'Tab') {
        this._closeMenu(false);
      }
    });

    root.append(this._scrim, panel, this._toggle, this._menu);
    document.body.appendChild(root);

    this._unsubStore = this._store.subscribe(this._onStoreChange);
    this._unsubCompact = onCompactChange((c) => {
      this._compact = c;
      this._syncViewport();
    });
    this._sync();
  }

  // ------------------------------------------------------------------ public API
  get isOpen(): boolean {
    return this._open;
  }

  /** The Mapa tab is shown / hidden: listeners and DOM follow, the store keeps collecting. */
  setViewActive(active: boolean): void {
    if (active === this._viewActive) return;
    this._viewActive = active;
    this.root.hidden = !active;
    if (active) {
      window.addEventListener('keydown', this._onWindowKey);
      window.addEventListener('net-status', this._onNetEvent);
      window.addEventListener('net-nick', this._onNetEvent);
      window.addEventListener('net-system', this._onSecretLine);
      window.addEventListener('net-error', this._onNetError);
      document.addEventListener('pointerdown', this._onPointerDown, true);
      this._sync();
    } else {
      this.close(false);
      this._closeMenu(false);
      this._toast.hide();
      window.removeEventListener('keydown', this._onWindowKey);
      window.removeEventListener('net-status', this._onNetEvent);
      window.removeEventListener('net-nick', this._onNetEvent);
      window.removeEventListener('net-system', this._onSecretLine);
      window.removeEventListener('net-error', this._onNetError);
      document.removeEventListener('pointerdown', this._onPointerDown, true);
    }
  }

  /** Expands the chat. On desktop the input gets the focus (or "Conectarme" while offline). */
  open(): void {
    if (this._open || !this._viewActive) return;
    if (this._opener === null && document.activeElement instanceof HTMLElement && document.activeElement !== document.body) {
      this._opener = document.activeElement;
    }
    this._open = true;
    this.root.classList.add('chat--open');
    document.body.classList.add('chat-open');
    this._toggle.setAttribute('aria-expanded', 'true');
    this._store.markRead();
    this._sync();
    this._scrollToBottom();
    if (this._compact) {
      window.visualViewport?.addEventListener('resize', this._onViewport);
      window.visualViewport?.addEventListener('scroll', this._onViewport);
      this._syncViewport();
      this._title.focus({ preventScroll: true });
    } else {
      this._focusEntry();
    }
  }

  /** Collapses the chat. `restoreFocus` returns the focus to whatever opened it (keyboard use). */
  close(restoreFocus = true): void {
    if (!this._open) return;
    this._open = false;
    this._closeMenu(false);
    this.root.classList.remove('chat--open');
    document.body.classList.remove('chat-open');
    this._toggle.setAttribute('aria-expanded', 'false');
    window.visualViewport?.removeEventListener('resize', this._onViewport);
    window.visualViewport?.removeEventListener('scroll', this._onViewport);
    this.root.style.removeProperty('--chat-kb');
    this.root.style.removeProperty('--chat-vvh');
    this._panel.style.transform = '';
    const active = document.activeElement;
    const inside = active instanceof HTMLElement && this.root.contains(active);
    const target = this._opener && this._opener.isConnected ? this._opener : this._toggle;
    if (restoreFocus) target.focus({ preventScroll: true });
    else if (inside) (active as HTMLElement).blur();
    this._opener = null;
    this._sync();
  }

  dispose(): void {
    this.setViewActive(false);
    this.close(false);
    this._unsubStore();
    this._unsubCompact();
    if (this._inlineTimer !== null) window.clearTimeout(this._inlineTimer);
    if (this._cooldownTimer !== null) window.clearTimeout(this._cooldownTimer);
    if (this._vvFrame) cancelAnimationFrame(this._vvFrame);
    this._toast.dispose();
    this.root.remove();
  }

  // ------------------------------------------------------------------ keyboard
  private _onPanelKey(e: KeyboardEvent): void {
    // Nothing typed here may reach the map's shortcuts or the other panels
    e.stopPropagation();
    if (e.key === 'Escape') {
      if (this._menuFor) this._closeMenu(true);
      else this.close(true);
      return;
    }
    if (e.key === 'Enter' && e.shiftKey && e.target === this._input) e.preventDefault(); // single line
  }

  private _focusEntry(): void {
    if (!this._input.disabled) this._input.focus({ preventScroll: true });
    else if (!this._connect.hidden && !this._offline.hidden) this._connect.focus({ preventScroll: true });
    else this._title.focus({ preventScroll: true });
  }

  // ------------------------------------------------------------------ sending
  private _submit(): void {
    if (this._input.disabled || this._send.disabled) return;
    const raw = this._input.value;
    if (!raw.trim()) return;
    const check = checkChat(raw);
    if (!check.ok) {
      this._showInline(messageForReason(check.reason));
      return;
    }
    const client = this._online.client;
    if (!client || !client.sendChat(check.text)) {
      this._showInline('No estás conectado: probá de nuevo en un momento.');
      return;
    }
    // The line appears in the list when the server echoes it back (net-chat with self: true)
    this._lastSent = raw;
    this._input.value = '';
    this._updateCounter();
    this._showInline('');
  }

  private _showInline(text: string): void {
    this._inline.textContent = text;
    if (this._inlineTimer !== null) window.clearTimeout(this._inlineTimer);
    this._inlineTimer = null;
    if (text) {
      this._inlineTimer = window.setTimeout(() => {
        this._inline.textContent = '';
        this._inlineTimer = null;
      }, INLINE_MS);
    }
  }

  private _updateCounter(): void {
    const n = [...this._input.value].length;
    const show = n >= COUNTER_FROM;
    this._count.hidden = !show;
    if (show) {
      this._count.textContent = `${n}/${MAX_CHAT}`;
      this._count.classList.toggle('chat__count--limit', n >= MAX_CHAT);
    }
  }

  private _connectNow(): void {
    const online = this._online;
    if (!online.wantsOnline) void online.toggleConnection();
    else online.client?.connect();
  }

  // ------------------------------------------------------------------ rendering
  private _connectionState(): 'online' | 'connecting' | 'reconnecting' | 'off' {
    const o = this._online;
    const s = o.status;
    if (s === 'online') return 'online';
    if (s === 'connecting') return 'connecting';
    if (s === 'offline' && o.wantsOnline && !o.client?.gaveUp) return 'reconnecting';
    return 'off';
  }

  private _sync(): void {
    if (!this._viewActive && !this._open) {
      // Hidden tab: only the (cheap) badge text is kept fresh
      this._renderBadge();
      return;
    }
    const state = this._connectionState();
    const count = this._online.statusInfo.count;
    let label: string;
    let dotClass: string;
    switch (state) {
      case 'online':
        label = `Chat · ${count} ${count === 1 ? 'conectado' : 'conectados'}`;
        dotClass = 'chat__dot chat__dot--on';
        break;
      case 'connecting':
        label = 'Chat · Conectando…';
        dotClass = 'chat__dot chat__dot--wait';
        break;
      case 'reconnecting':
        label = 'Chat · Reconectando…';
        dotClass = 'chat__dot chat__dot--wait';
        break;
      default:
        label = 'Sin conexión · modo solitario';
        dotClass = 'chat__dot chat__dot--off';
    }
    this._label.textContent = label;
    this._dot.className = dotClass;
    this._statusDot.className = dotClass;
    (this._status.lastElementChild as HTMLElement).textContent = label.replace(/^Chat · /, '');
    this._setState(state);

    // Input availability
    const canType = state === 'online';
    this._input.disabled = !canType;
    this._input.placeholder = canType ? 'Escribí un mensaje…' : 'Conectate para chatear';
    this._offline.hidden = canType;
    if (!canType) {
      const waiting = state === 'connecting' || state === 'reconnecting';
      this._offlineText.textContent = waiting ? (state === 'connecting' ? 'Conectando…' : 'Reconectando…') : 'Conectate para chatear';
      this._connect.hidden = waiting;
      this._connect.textContent = this._online.wantsOnline ? 'Reintentar' : 'Conectarme';
    }
    this._renderCooldown();

    if (this._open) this._store.markRead();
    this._renderBadge();
    this._renderList();
  }

  private _setState(state: string): void {
    this.root.dataset.state = state;
  }

  private _renderBadge(): void {
    const n = this._open ? 0 : this._store.unread;
    this._badge.hidden = n === 0;
    this._badge.textContent = n > 9 ? '9+' : String(n);
    const base = this._label.textContent || 'Chat';
    this._toggle.setAttribute(
      'aria-label',
      `${this._open ? 'Cerrar' : 'Abrir'} chat. ${base}${n > 0 ? `. ${n} ${n === 1 ? 'mensaje sin leer' : 'mensajes sin leer'}` : ''}`,
    );
  }

  private _renderCooldown(): void {
    if (this._cooldownTimer !== null) {
      window.clearTimeout(this._cooldownTimer);
      this._cooldownTimer = null;
    }
    const left = this._store.cooldownUntil - Date.now();
    const online = this._connectionState() === 'online';
    if (left > 0) {
      this._send.disabled = true;
      this._send.textContent = `${Math.ceil(left / 1000)} s`;
      this._cooldownTimer = window.setTimeout(() => {
        this._cooldownTimer = null;
        this._renderCooldown();
      }, 250);
    } else {
      this._send.disabled = !online;
      this._send.textContent = 'Enviar';
    }
  }

  private _renderList(): void {
    const msgs = this._store.messages;
    const visible = new Set<number>();
    let needsRebuild = false;
    for (const m of msgs) {
      visible.add(m.seq);
      if (!this._rows.has(m.seq) && m.seq < this._maxSeq) needsRebuild = true;
    }
    if (needsRebuild) {
      // A muted person was un-muted: their old lines return in the middle of the list
      this._log.textContent = '';
      this._rows.clear();
      this._maxSeq = 0;
    } else {
      for (const [seq, row] of this._rows) {
        if (!visible.has(seq)) {
          row.el.remove();
          this._rows.delete(seq);
        }
      }
    }
    const follow = this._atBottom();
    let appendedSelf = false;
    let appended = 0;
    for (const m of msgs) {
      const row = this._rows.get(m.seq);
      if (row) {
        if (row.rev !== m.rev) {
          row.text.textContent = m.text;
          row.rev = m.rev;
        }
        continue;
      }
      const made = this._makeRow(m);
      this._log.appendChild(made.el);
      this._rows.set(m.seq, made);
      this._maxSeq = Math.max(this._maxSeq, m.seq);
      appended++;
      if (m.self) appendedSelf = true;
    }
    if (!this._open) return;
    if (needsRebuild || follow || appendedSelf) this._scrollToBottom();
    else if (appended > 0) this._updateJump();
  }

  private _makeRow(m: ChatMessage): Row {
    const el = document.createElement('div');
    if (m.kind === 'system') {
      el.className = `chat__sys chat__sys--${m.sub ?? 'info'}`;
      el.textContent = m.text;
      return { el, rev: m.rev, text: el };
    }
    if (m.kind === 'notice') {
      el.className = 'chat__note';
      el.textContent = m.text;
      return { el, rev: m.rev, text: el };
    }
    el.className = m.self ? 'chat__msg chat__msg--self' : 'chat__msg';
    const text = document.createElement('div');
    text.className = 'chat__text';
    text.textContent = m.text;
    if (!m.self) {
      const nick = document.createElement('button');
      nick.type = 'button';
      nick.className = 'chat__nick';
      nick.style.setProperty('--nick-h', String(nickHue(m.nick)));
      nick.textContent = m.nick || 'Alguien';
      nick.setAttribute('aria-haspopup', 'true');
      nick.setAttribute('aria-label', `${m.nick || 'Alguien'}: opciones`);
      nick.addEventListener('click', () => {
        if (m.id) this._openMenu(m.id, m.nick, nick);
      });
      el.append(nick);
    }
    el.append(text);
    return { el, rev: m.rev, text };
  }

  // ------------------------------------------------------------------ scrolling
  private _atBottom(): boolean {
    const l = this._log;
    return l.scrollHeight - l.scrollTop - l.clientHeight <= STICK_PX;
  }

  private _scrollToBottom(): void {
    this._log.scrollTop = this._log.scrollHeight;
    this._jump.hidden = true;
  }

  private _updateJump(): void {
    this._jump.hidden = this._atBottom();
  }

  // ------------------------------------------------------------------ mute menu
  private _openMenu(id: string, nick: string, opener: HTMLElement): void {
    if (this._menuFor?.opener === opener) {
      this._closeMenu(true);
      return;
    }
    this._menuFor = { id, nick, opener };
    this._menuButton.textContent = this._store.isMuted(id) ? 'Dejar de silenciar' : 'Silenciar';
    this._menuButton.setAttribute('aria-label', `${this._menuButton.textContent} a ${nick || 'esta persona'}`);
    this._menu.hidden = false;
    const r = opener.getBoundingClientRect();
    const w = this._menu.offsetWidth || 160;
    const left = Math.max(8, Math.min(window.innerWidth - w - 8, r.left));
    const top = Math.min(window.innerHeight - 52, r.bottom + 4);
    this._menu.style.left = `${Math.round(left)}px`;
    this._menu.style.top = `${Math.round(top)}px`;
    opener.setAttribute('aria-expanded', 'true');
    this._menuButton.focus({ preventScroll: true });
  }

  private _closeMenu(restoreFocus: boolean): void {
    const f = this._menuFor;
    if (!f) return;
    this._menuFor = null;
    this._menu.hidden = true;
    f.opener.removeAttribute('aria-expanded');
    if (restoreFocus && f.opener.isConnected) f.opener.focus({ preventScroll: true });
  }

  private _toggleMute(): void {
    const f = this._menuFor;
    if (!f) return;
    const wasMuted = this._store.isMuted(f.id);
    this._closeMenu(false);
    if (wasMuted) this._store.unmute(f.id);
    else this._store.mute(f.id);
    this._showInline(wasMuted ? `Dejaste de silenciar a ${f.nick}.` : `Silenciaste a ${f.nick}. Sus mensajes ya no se ven.`);
    this._input.focus({ preventScroll: true });
  }

  // ------------------------------------------------------------------ phone sheet
  /** Lifts the sheet above the on-screen keyboard using the visual viewport. */
  private _syncViewport(): void {
    if (!this._open || !this._compact) {
      this.root.style.removeProperty('--chat-kb');
      this.root.style.removeProperty('--chat-vvh');
      return;
    }
    const vv = window.visualViewport;
    if (!vv) return;
    const kb = Math.max(0, Math.round(window.innerHeight - vv.height - vv.offsetTop));
    this.root.style.setProperty('--chat-kb', `${kb}px`);
    this.root.style.setProperty('--chat-vvh', `${Math.round(vv.height)}px`);
    if (this._jump.hidden) this._scrollToBottom();
  }

  private _dragStart(e: PointerEvent, grip: HTMLElement): void {
    if (!this._compact) return;
    this._drag = { id: e.pointerId, y: e.clientY };
    grip.setPointerCapture(e.pointerId);
  }

  private _dragMove(e: PointerEvent): void {
    const d = this._drag;
    if (!d || d.id !== e.pointerId) return;
    const dy = Math.max(0, e.clientY - d.y);
    this._panel.style.transform = `translateY(${dy}px)`;
  }

  private _dragEnd(e: PointerEvent, grip: HTMLElement): void {
    const d = this._drag;
    if (!d || d.id !== e.pointerId) return;
    this._drag = null;
    if (grip.hasPointerCapture(e.pointerId)) grip.releasePointerCapture(e.pointerId);
    const dy = e.clientY - d.y;
    this._panel.style.transform = '';
    if (dy > SWIPE_CLOSE_PX) this.close(false);
  }
}
