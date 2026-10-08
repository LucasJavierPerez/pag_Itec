import { ROBOT_SKINS } from '../Experience/Map/skins/robotSkins.ts';
import type { RobotSkin } from '../Experience/Map/skins/robotSkins.ts';
import { getSkinId, setSkinId } from '../Experience/Map/skinState.ts';

const COLUMNS = 4;
const GAP = 8;

const hexCss = (n: number): string => `#${n.toString(16).padStart(6, '0')}`;

/**
 * "Skins" picker of the Mapa view: a toggle button (lives inside the map HUD) and a floating
 * panel with one round swatch per robot skin. The panel is a sibling in the DOM (the HUD clips
 * its children), positioned next to the toggle when opened.
 */
export class SkinPicker {
  readonly toggle: HTMLButtonElement;
  readonly panel: HTMLDivElement;

  private _swatches = new Map<string, HTMLButtonElement>();
  private _name: HTMLParagraphElement;
  private _open = false;

  private _onPointerDown = (e: PointerEvent): void => {
    const t = e.target as Node;
    if (this._open && !this.panel.contains(t) && !this.toggle.contains(t)) this.close();
  };
  private _onResize = (): void => {
    if (this._open) this._place();
  };
  private _onSkin = (): void => this._sync();

  constructor() {
    this.toggle = document.createElement('button');
    this.toggle.type = 'button';
    this.toggle.className = 'skin-picker__toggle map-hud__button map-hud__button--wide';
    this.toggle.textContent = 'Skins';
    this.toggle.setAttribute('aria-label', 'Elegir el skin del robot');
    this.toggle.setAttribute('aria-haspopup', 'true');
    this.toggle.setAttribute('aria-expanded', 'false');
    this.toggle.setAttribute('aria-controls', 'skin-picker-panel');
    this.toggle.addEventListener('click', (e) => {
      const next = !this._open;
      this.setOpen(next);
      if (e.detail > 0 && !next) this.toggle.blur();
    });

    this.panel = document.createElement('div');
    this.panel.id = 'skin-picker-panel';
    this.panel.className = 'skin-picker__panel';
    this.panel.setAttribute('role', 'group');
    this.panel.setAttribute('aria-label', 'Skins del robot');
    this.panel.hidden = true;

    const title = document.createElement('p');
    title.className = 'skin-picker__title';
    title.textContent = 'Skins';

    const grid = document.createElement('div');
    grid.className = 'skin-picker__grid';
    for (const skin of ROBOT_SKINS) grid.appendChild(this._createSwatch(skin));

    this._name = document.createElement('p');
    this._name.className = 'skin-picker__name';
    this._name.setAttribute('aria-live', 'polite');

    this.panel.append(title, grid, this._name);
    this.panel.addEventListener('keydown', (e) => this._onKeyDown(e));

    document.addEventListener('pointerdown', this._onPointerDown);
    window.addEventListener('resize', this._onResize);
    window.addEventListener('skin-change', this._onSkin);
    this._sync();
  }

  private _createSwatch(skin: RobotSkin): HTMLButtonElement {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'skin-picker__swatch';
    if (skin.animated) b.classList.add('skin-picker__swatch--rainbow');
    b.dataset.skinId = skin.id;
    b.style.setProperty('--skin-panel', hexCss(skin.panel));
    b.style.setProperty('--skin-joint', hexCss(skin.joint));
    b.style.setProperty('--skin-accent', hexCss(skin.accent));
    b.setAttribute('aria-label', skin.label);
    b.title = skin.label;
    b.setAttribute('aria-pressed', 'false');
    b.addEventListener('click', (e) => {
      if (e.detail > 0) b.blur();
      setSkinId(skin.id);
      this._sync();
    });
    this._swatches.set(skin.id, b);
    return b;
  }

  /** Reflects the current skin in the pressed states and the caption. */
  private _sync(): void {
    const id = getSkinId();
    for (const [key, b] of this._swatches) b.setAttribute('aria-pressed', String(key === id));
    const skin = ROBOT_SKINS.find((s) => s.id === id);
    this._name.textContent = skin ? `Skin: ${skin.label}` : '';
  }

  private _onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      e.stopPropagation();
      this.close();
      this.toggle.focus();
      return;
    }
    const items = [...this._swatches.values()];
    const index = items.indexOf(document.activeElement as HTMLButtonElement);
    if (index < 0) return;
    let next = -1;
    if (e.key === 'ArrowRight') next = (index + 1) % items.length;
    else if (e.key === 'ArrowLeft') next = (index + items.length - 1) % items.length;
    else if (e.key === 'ArrowDown') next = Math.min(items.length - 1, index + COLUMNS);
    else if (e.key === 'ArrowUp') next = Math.max(0, index - COLUMNS);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    if (next < 0) return;
    // The arrows belong to the grid here, not to the robot
    e.preventDefault();
    e.stopPropagation();
    items[next].focus();
  }

  setOpen(open: boolean): void {
    this._open = open;
    this.panel.hidden = !open;
    this.toggle.setAttribute('aria-expanded', String(open));
    this.toggle.classList.toggle('skin-picker__toggle--open', open);
    if (open) this._place();
  }

  close(): void {
    if (this._open) this.setOpen(false);
  }

  /** Puts the panel under the HUD (row layout) or to the left of it (column layout). */
  private _place(): void {
    const hud = this.toggle.parentElement;
    if (!hud) return;
    const hudRect = hud.getBoundingClientRect();
    const toggleRect = this.toggle.getBoundingClientRect();
    const column = getComputedStyle(hud).flexDirection === 'column';
    const panel = this.panel;
    panel.style.left = 'auto';
    if (column) {
      panel.style.right = `${Math.max(8, window.innerWidth - hudRect.left + GAP)}px`;
      const maxTop = window.innerHeight - panel.offsetHeight - GAP;
      panel.style.top = `${Math.max(GAP, Math.min(toggleRect.top, maxTop))}px`;
    } else {
      panel.style.right = `${Math.max(8, window.innerWidth - hudRect.right)}px`;
      panel.style.top = `${hudRect.bottom + GAP}px`;
    }
  }

  dispose(): void {
    document.removeEventListener('pointerdown', this._onPointerDown);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('skin-change', this._onSkin);
    this.toggle.remove();
    this.panel.remove();
  }
}
