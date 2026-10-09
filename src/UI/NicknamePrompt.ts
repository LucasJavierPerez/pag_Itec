import { MAX_NICK } from '../../shared/protocol.ts';
import { generateNick, sanitizeNick } from '../../shared/moderation.ts';

export type NicknameMode = 'first' | 'rename';

export interface NicknamePromptOptions {
  mode: NicknameMode;
  /** Text the input starts with ('' for a first visit). */
  initial?: string;
}

export type NicknameResult =
  | { action: 'enter'; nick: string }
  | { action: 'offline'; nick: string }
  | { action: 'cancel' };

const FOCUSABLE = 'input, button:not([disabled])';

/**
 * Modal dialog that asks for the nickname (first visit to the Mapa tab, or "Cambiar nombre").
 * Everything user-typed goes through `textContent` / `value`, never `innerHTML`.
 * Escape uses the suggested nickname on the first visit and cancels when renaming.
 */
export class NicknamePrompt {
  private _backdrop: HTMLDivElement | null = null;
  private _resolve: ((r: NicknameResult) => void) | null = null;
  private _restoreFocus: HTMLElement | null = null;

  get isOpen(): boolean {
    return this._backdrop !== null;
  }

  open(options: NicknamePromptOptions): Promise<NicknameResult> {
    if (this._backdrop) this._finish({ action: 'cancel' });
    const first = options.mode === 'first';
    const suggested = generateNick();
    const seed = Number(suggested.slice(-4));
    this._restoreFocus = document.activeElement instanceof HTMLElement ? document.activeElement : null;

    const backdrop = document.createElement('div');
    backdrop.className = 'nick-prompt';

    const dialog = document.createElement('div');
    dialog.className = 'nick-prompt__dialog';
    dialog.setAttribute('role', 'dialog');
    dialog.setAttribute('aria-modal', 'true');
    dialog.setAttribute('aria-labelledby', 'nick-prompt-title');
    dialog.setAttribute('aria-describedby', 'nick-prompt-privacy');

    const title = document.createElement('h2');
    title.id = 'nick-prompt-title';
    title.className = 'nick-prompt__title';
    title.textContent = first ? '¡Hola! ¿Cómo te llamamos?' : 'Cambiar mi nombre';

    const intro = document.createElement('p');
    intro.className = 'nick-prompt__text';
    intro.textContent = first
      ? 'Elegí un apodo para que las demás personas te vean en el mapa.'
      : 'Elegí el apodo con el que te van a ver en el mapa.';

    const label = document.createElement('label');
    label.className = 'nick-prompt__label';
    label.htmlFor = 'nick-prompt-input';
    label.textContent = 'Tu apodo';

    const input = document.createElement('input');
    input.id = 'nick-prompt-input';
    input.className = 'nick-prompt__input';
    input.type = 'text';
    input.maxLength = MAX_NICK;
    input.autocomplete = 'off';
    input.autocapitalize = 'words';
    input.spellcheck = false;
    input.enterKeyHint = 'go';
    input.placeholder = suggested;
    input.value = options.initial ?? '';
    input.setAttribute('aria-describedby', 'nick-prompt-preview');

    const preview = document.createElement('p');
    preview.id = 'nick-prompt-preview';
    preview.className = 'nick-prompt__preview';
    preview.setAttribute('aria-live', 'polite');
    const previewName = document.createElement('strong');
    preview.append('Te van a ver como: ', previewName);

    const privacy = document.createElement('p');
    privacy.id = 'nick-prompt-privacy';
    privacy.className = 'nick-prompt__privacy';
    privacy.textContent = 'Tu apodo y tus mensajes los ven las demás personas conectadas. No compartas datos personales.';

    const actions = document.createElement('div');
    actions.className = 'nick-prompt__actions';
    const primary = document.createElement('button');
    primary.type = 'button';
    primary.className = 'nick-prompt__button nick-prompt__button--primary';
    primary.textContent = first ? 'Entrar al mapa' : 'Guardar nombre';
    const secondary = document.createElement('button');
    secondary.type = 'button';
    secondary.className = 'nick-prompt__button';
    secondary.textContent = first ? 'Jugar sin conexión' : 'Cancelar';
    actions.append(primary, secondary);

    dialog.append(title, intro, label, input, preview, privacy, actions);
    backdrop.appendChild(dialog);

    const current = (): string => sanitizeNick(input.value.trim() === '' ? suggested : input.value, seed);
    const refresh = (): void => {
      previewName.textContent = current();
    };
    input.addEventListener('input', refresh);
    refresh();

    primary.addEventListener('click', () => this._finish({ action: 'enter', nick: current() }));
    secondary.addEventListener('click', () =>
      this._finish(first ? { action: 'offline', nick: current() } : { action: 'cancel' }),
    );
    dialog.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        e.stopPropagation();
        this._finish(first ? { action: 'enter', nick: suggested } : { action: 'cancel' });
        return;
      }
      if (e.key === 'Enter' && e.target === input) {
        e.preventDefault();
        this._finish({ action: 'enter', nick: current() });
        return;
      }
      if (e.key === 'Tab') this._trap(e, dialog);
      // Keep game keys (WASD, arrows, +/-) from reaching the map while the dialog is open
      e.stopPropagation();
    });
    dialog.addEventListener('keyup', (e) => e.stopPropagation());
    // Clicking the dim area never dismisses: a deliberate choice is required
    backdrop.addEventListener('pointerdown', (e) => e.stopPropagation());

    document.body.appendChild(backdrop);
    this._backdrop = backdrop;
    input.focus();
    input.select();
    return new Promise<NicknameResult>((resolve) => {
      this._resolve = resolve;
    });
  }

  /** Closes the dialog without a choice (e.g. the page is leaving). */
  close(): void {
    if (this._backdrop) this._finish({ action: 'cancel' });
  }

  private _trap(e: KeyboardEvent, dialog: HTMLElement): void {
    const items = [...dialog.querySelectorAll<HTMLElement>(FOCUSABLE)];
    if (items.length === 0) return;
    const firstItem = items[0];
    const lastItem = items[items.length - 1];
    const active = document.activeElement;
    if (e.shiftKey && (active === firstItem || !dialog.contains(active))) {
      e.preventDefault();
      lastItem.focus();
    } else if (!e.shiftKey && (active === lastItem || !dialog.contains(active))) {
      e.preventDefault();
      firstItem.focus();
    }
  }

  private _finish(result: NicknameResult): void {
    const resolve = this._resolve;
    this._resolve = null;
    this._backdrop?.remove();
    this._backdrop = null;
    const back = this._restoreFocus;
    this._restoreFocus = null;
    if (back && document.contains(back)) back.focus({ preventScroll: true });
    resolve?.(result);
  }
}
