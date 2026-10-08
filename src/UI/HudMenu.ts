const ICON_MENU =
  '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><path d="M4 6h16v2H4V6Zm0 5h16v2H4v-2Zm0 5h16v2H4v-2Z" fill="currentColor"/></svg>';

/**
 * Compact HUD menu. On desktop the wrapper is `display: contents` and the secondary controls
 * (style switcher, quality toggle) keep their own fixed positions, so nothing changes.
 * Below the compact breakpoint (see ui-mobile.css) the controls are shown inside a panel
 * opened by a round button, plus an optional fullscreen toggle.
 */
export class HudMenu {
  private _root: HTMLDivElement;
  private _button: HTMLButtonElement;
  private _panel: HTMLDivElement;
  private _fullscreen: HTMLButtonElement | null = null;
  private _open = false;

  private _onPointerDown = (e: PointerEvent) => {
    if (this._open && !this._root.contains(e.target as Node)) this.setOpen(false);
  };
  private _onKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Escape' && this._open) {
      this.setOpen(false);
      this._button.focus();
    }
  };
  private _onFullscreenChange = () => this._renderFullscreen();

  constructor(items: HTMLElement[]) {
    this._root = document.createElement('div');
    this._root.className = 'hud-menu';

    this._button = document.createElement('button');
    this._button.type = 'button';
    this._button.className = 'hud-menu__button';
    this._button.setAttribute('aria-label', 'Abrir menú de opciones');
    this._button.setAttribute('aria-expanded', 'false');
    this._button.setAttribute('aria-controls', 'hud-menu-panel');
    this._button.innerHTML = ICON_MENU;
    this._button.addEventListener('click', (e) => {
      // Pointer taps release focus so WASD never gets swallowed; keyboard users keep it
      const next = !this._open;
      this.setOpen(next);
      if (e.detail > 0 && !next) this._button.blur();
    });

    this._panel = document.createElement('div');
    this._panel.className = 'hud-menu__panel';
    this._panel.id = 'hud-menu-panel';
    this._panel.setAttribute('role', 'group');
    this._panel.setAttribute('aria-label', 'Opciones');
    for (const item of items) this._panel.appendChild(item);

    if (document.fullscreenEnabled) {
      this._fullscreen = document.createElement('button');
      this._fullscreen.type = 'button';
      this._fullscreen.className = 'hud-menu__fullscreen';
      this._fullscreen.addEventListener('click', () => {
        this._fullscreen?.blur();
        if (document.fullscreenElement) {
          void document.exitFullscreen().catch(() => {});
        } else {
          void document.documentElement.requestFullscreen({ navigationUI: 'hide' }).catch(() => {});
        }
      });
      document.addEventListener('fullscreenchange', this._onFullscreenChange);
      this._renderFullscreen();
      this._panel.appendChild(this._fullscreen);
    }

    this._root.append(this._button, this._panel);
    document.body.appendChild(this._root);
    document.addEventListener('pointerdown', this._onPointerDown);
    window.addEventListener('keydown', this._onKeyDown);
  }

  /**
   * Adds an action button to the panel (compact layout only). `mapOnly` actions are shown just
   * while the Mapa view is active (CSS keys off body[data-view='map']). Selecting one closes the menu.
   */
  addAction(label: string, ariaLabel: string, onSelect: () => void, mapOnly = false): HTMLButtonElement {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'hud-menu__action';
    if (mapOnly) b.classList.add('hud-menu__action--map');
    b.textContent = label;
    b.setAttribute('aria-label', ariaLabel);
    b.addEventListener('click', () => {
      this.setOpen(false);
      onSelect();
    });
    this._panel.insertBefore(b, this._fullscreen);
    return b;
  }

  private _renderFullscreen(): void {
    if (!this._fullscreen) return;
    const on = !!document.fullscreenElement;
    this._fullscreen.textContent = on ? 'Salir de pantalla completa' : 'Pantalla completa';
    this._fullscreen.setAttribute('aria-pressed', String(on));
  }

  setOpen(open: boolean): void {
    this._open = open;
    this._root.classList.toggle('hud-menu--open', open);
    this._button.setAttribute('aria-expanded', String(open));
    this._button.setAttribute('aria-label', open ? 'Cerrar menú de opciones' : 'Abrir menú de opciones');
  }

  dispose(): void {
    document.removeEventListener('pointerdown', this._onPointerDown);
    document.removeEventListener('fullscreenchange', this._onFullscreenChange);
    window.removeEventListener('keydown', this._onKeyDown);
    this._root.remove();
  }
}
