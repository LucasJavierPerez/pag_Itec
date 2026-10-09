import type { MapOnline } from '../Experience/Map/net/MapOnline.ts';
import type { HudMenu } from './HudMenu.ts';

/**
 * The player-facing online controls of the Mapa tab: a small footer in the Skins panel ("Mi nombre",
 * connection state, change name, connect / disconnect) and the same two actions in the compact HUD
 * menu on phones. Everything shown is plain text (`textContent`).
 */
export class OnlineControls {
  private _online: MapOnline;
  private _nick: HTMLElement;
  private _state: HTMLElement;
  private _toggle: HTMLButtonElement;
  private _menuToggle: HTMLButtonElement;

  private _render = (): void => {
    const online = this._online;
    const info = online.statusInfo;
    this._nick.textContent = online.nick || 'sin nombre';
    let state: string;
    if (info.status === 'online') {
      state = `En línea · ${info.count} ${info.count === 1 ? 'persona' : 'personas'}`;
    } else if (online.soloThisSession) {
      state = 'Jugando sin conexión';
    } else {
      state = info.message || 'Sin conexión';
    }
    this._state.textContent = state;
    const label = online.wantsOnline ? 'Desconectarme' : 'Conectarme';
    this._toggle.textContent = label;
    this._menuToggle.textContent = label;
  };

  constructor(online: MapOnline, host: HTMLElement, hud: HudMenu) {
    this._online = online;

    const footer = document.createElement('div');
    footer.className = 'online-controls';
    footer.setAttribute('role', 'group');
    footer.setAttribute('aria-label', 'Mi nombre y conexión');

    const heading = document.createElement('p');
    heading.className = 'skin-picker__heading';
    heading.textContent = 'En línea';

    const name = document.createElement('p');
    name.className = 'online-controls__name';
    name.append('Mi nombre: ');
    this._nick = document.createElement('strong');
    name.appendChild(this._nick);

    this._state = document.createElement('p');
    this._state.className = 'online-controls__state';
    this._state.setAttribute('aria-live', 'polite');

    const row = document.createElement('div');
    row.className = 'online-controls__row';
    const rename = this._button('Cambiar nombre', 'Cambiar mi nombre en el mapa', () => void online.changeName());
    this._toggle = this._button('Conectarme', 'Conectarme o desconectarme del mapa en línea', () => void online.toggleConnection());
    row.append(rename, this._toggle);

    footer.append(heading, name, this._state, row);
    host.appendChild(footer);

    hud.addAction('Cambiar nombre', 'Cambiar mi nombre en el mapa', () => void online.changeName(), true);
    this._menuToggle = hud.addAction('Conectarme', 'Conectarme o desconectarme del mapa en línea', () => void online.toggleConnection(), true);

    window.addEventListener('net-status', this._render);
    window.addEventListener('net-nick', this._render);
    this._render();
  }

  private _button(label: string, aria: string, onClick: () => void): HTMLButtonElement {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'map-hud__button online-controls__button';
    b.textContent = label;
    b.setAttribute('aria-label', aria);
    b.addEventListener('click', (e) => {
      if (e.detail > 0) b.blur();
      onClick();
    });
    return b;
  }
}
