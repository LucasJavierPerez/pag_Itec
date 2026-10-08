import { ROBOT_SKINS } from '../Experience/Map/skins/robotSkins.ts';
import type { RobotSkin } from '../Experience/Map/skins/robotSkins.ts';
import { getCharacterId, getSkinId, setCharacter, setPalette } from '../Experience/Map/skinState.ts';
import { CHARACTERS } from '../Experience/Map/characters/characterSpec.ts';
import type { CharacterDef } from '../Experience/Map/characters/characterSpec.ts';
import type { StyleId } from '../Experience/World/styles/types.ts';
import { getStoredStyle } from './ThemeManager.ts';
import { CharacterThumbs } from './CharacterThumbs.ts';

const SWATCH_COLUMNS = 4;
const CARD_COLUMNS = 3;
const GAP = 8;
/** Keep in sync with the compact breakpoint in ui-mobile.css (and COMPACT_QUERY in MapLegend.ts). */
const COMPACT_QUERY = '(max-width: 640px), (max-height: 480px) and (orientation: landscape)';
/** Compact sheet: top offset below the tabs row, and share of the viewport height it may use. */
const SHEET_TOP = 64;
const SHEET_MAX_VH = 0.6;

export interface SkinPickerOptions {
  /** Visual style the thumbnails are rendered in (defaults to the stored style). */
  getStyleId?: () => StyleId;
}

const hexCss = (n: number): string => `#${n.toString(16).padStart(6, '0')}`;

/**
 * "Skins" picker of the Mapa view: a toggle button (lives inside the map HUD) and a floating
 * panel with two sections: "Personaje" (cards with a live thumbnail) and "Color" (one round
 * swatch per palette). The panel is a sibling in the DOM (the HUD clips its children),
 * positioned next to the toggle when opened.
 */
export class SkinPicker {
  readonly toggle: HTMLButtonElement;
  readonly panel: HTMLDivElement;

  private _swatches = new Map<string, HTMLButtonElement>();
  private _cards = new Map<string, HTMLButtonElement>();
  private _name: HTMLParagraphElement;
  private _open = false;
  private _getStyleId: () => StyleId;
  private _thumbs = new CharacterThumbs();
  private _thumbsDirty = true;
  private _thumbFrame = 0;

  private _onPointerDown = (e: PointerEvent): void => {
    const t = e.target as Node;
    if (this._open && !this.panel.contains(t) && !this.toggle.contains(t)) this.close();
  };
  private _onEscape = (e: KeyboardEvent): void => {
    if (e.key === 'Escape' && this._open) this.close();
  };
  private _onResize = (): void => {
    if (this._open) this._place();
  };
  private _onSkin = (): void => {
    this._sync();
    this._thumbsDirty = true;
    if (this._open) this._refreshThumbs();
  };
  private _onStyle = (): void => {
    this._thumbsDirty = true;
    if (this._open) this._refreshThumbs();
  };

  constructor(options: SkinPickerOptions = {}) {
    this._getStyleId = options.getStyleId ?? getStoredStyle;
    this.toggle = document.createElement('button');
    this.toggle.type = 'button';
    this.toggle.className = 'skin-picker__toggle map-hud__button map-hud__button--wide';
    this.toggle.textContent = 'Skins';
    this.toggle.setAttribute('aria-label', 'Elegir personaje y color');
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
    this.panel.setAttribute('aria-label', 'Personaje y color');
    this.panel.hidden = true;

    const title = document.createElement('p');
    title.className = 'skin-picker__title';
    title.textContent = 'Skins';

    const characters = document.createElement('div');
    characters.className = 'skin-picker__characters';
    characters.setAttribute('role', 'radiogroup');
    characters.setAttribute('aria-label', 'Personaje');
    for (const def of CHARACTERS) characters.appendChild(this._createCard(def));

    const grid = document.createElement('div');
    grid.className = 'skin-picker__grid';
    grid.setAttribute('role', 'group');
    grid.setAttribute('aria-label', 'Color');
    for (const skin of ROBOT_SKINS) grid.appendChild(this._createSwatch(skin));

    this._name = document.createElement('p');
    this._name.className = 'skin-picker__name';
    this._name.setAttribute('aria-live', 'polite');

    this.panel.append(
      title,
      this._section('Personaje', characters),
      this._section('Color', grid),
      this._name,
    );
    this.panel.addEventListener('keydown', (e) => this._onKeyDown(e));

    document.addEventListener('pointerdown', this._onPointerDown);
    window.addEventListener('keydown', this._onEscape);
    window.addEventListener('resize', this._onResize);
    window.addEventListener('skin-change', this._onSkin);
    window.addEventListener('style-change', this._onStyle);
    this._sync();
  }

  private _section(heading: string, content: HTMLElement): HTMLElement {
    const section = document.createElement('div');
    section.className = 'skin-picker__section';
    const h = document.createElement('p');
    h.className = 'skin-picker__heading';
    h.textContent = heading;
    section.append(h, content);
    return section;
  }

  private _createCard(def: CharacterDef): HTMLButtonElement {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'skin-card';
    b.dataset.characterId = def.id;
    b.setAttribute('role', 'radio');
    b.setAttribute('aria-checked', 'false');
    b.setAttribute('aria-label', `${def.label}: ${def.blurb}`);
    b.title = def.blurb;
    b.tabIndex = -1;

    const thumb = document.createElement('span');
    thumb.className = 'skin-card__thumb';
    // Flat badge until (or instead of) the live thumbnail
    const badge = document.createElement('span');
    badge.className = 'skin-card__badge';
    badge.textContent = def.label.charAt(0);
    badge.style.background = hexCss(def.signature.body);
    badge.style.color = '#fff';
    badge.style.textShadow = '0 1px 3px rgba(0, 0, 0, 0.7)';
    thumb.appendChild(badge);

    const label = document.createElement('span');
    label.className = 'skin-card__label';
    label.textContent = def.label;
    b.append(thumb, label);

    b.addEventListener('click', (e) => {
      if (e.detail > 0) b.blur();
      setCharacter(def.id);
      this._sync();
    });
    this._cards.set(def.id, b);
    return b;
  }

  /** Renders the missing thumbnails one per frame so opening the panel never janks. */
  private _refreshThumbs(): void {
    cancelAnimationFrame(this._thumbFrame);
    this._thumbsDirty = false;
    const style = this._getStyleId();
    const palette = getSkinId();
    const queue = CHARACTERS.map((c) => c.id);
    const step = (): void => {
      const id = queue.shift();
      if (!id) return;
      const url = this._thumbs.get(id, style, palette) ?? this._thumbs.render(id, style, palette);
      if (url) this._setThumb(id, url);
      if (queue.length > 0) this._thumbFrame = requestAnimationFrame(step);
    };
    // Cached ones show at once; the rest follow frame by frame
    for (const c of CHARACTERS) {
      const cached = this._thumbs.get(c.id, style, palette);
      if (cached) {
        this._setThumb(c.id, cached);
        queue.splice(queue.indexOf(c.id), 1);
      }
    }
    if (queue.length > 0) this._thumbFrame = requestAnimationFrame(step);
  }

  private _setThumb(id: string, url: string): void {
    const thumb = this._cards.get(id)?.querySelector('.skin-card__thumb');
    if (!thumb) return;
    let img = thumb.querySelector('img');
    if (!img) {
      img = document.createElement('img');
      img.alt = '';
      img.decoding = 'async';
      img.draggable = false;
      thumb.appendChild(img);
    }
    if (img.src !== url) img.src = url;
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
      setPalette(skin.id);
      this._sync();
    });
    this._swatches.set(skin.id, b);
    return b;
  }

  /** Reflects the current character and palette in the pressed states and the caption. */
  private _sync(): void {
    const id = getSkinId();
    const characterId = getCharacterId();
    for (const [key, b] of this._swatches) b.setAttribute('aria-pressed', String(key === id));
    for (const [key, b] of this._cards) {
      b.setAttribute('aria-checked', String(key === characterId));
      b.tabIndex = key === characterId ? 0 : -1;
    }
    const skin = ROBOT_SKINS.find((s) => s.id === id);
    const character = CHARACTERS.find((c) => c.id === characterId);
    this._name.textContent = skin && character ? `${character.label} · ${skin.label}` : '';
  }

  private _onKeyDown(e: KeyboardEvent): void {
    if (e.key === 'Escape') {
      e.stopPropagation();
      this.close();
      this.toggle.focus();
      return;
    }
    const active = document.activeElement as HTMLButtonElement | null;
    const cards = [...this._cards.values()];
    const swatches = [...this._swatches.values()];
    const isCard = !!active && cards.includes(active);
    const items = isCard ? cards : swatches;
    const columns = isCard ? CARD_COLUMNS : SWATCH_COLUMNS;
    const index = active ? items.indexOf(active) : -1;
    if (index < 0) return;
    let next = -1;
    if (e.key === 'ArrowRight') next = (index + 1) % items.length;
    else if (e.key === 'ArrowLeft') next = (index + items.length - 1) % items.length;
    else if (e.key === 'ArrowDown') next = Math.min(items.length - 1, index + columns);
    else if (e.key === 'ArrowUp') next = Math.max(0, index - columns);
    else if (e.key === 'Home') next = 0;
    else if (e.key === 'End') next = items.length - 1;
    if (next < 0) return;
    // The arrows belong to the grid here, not to the robot
    e.preventDefault();
    e.stopPropagation();
    items[next].focus();
    // Radio pattern: moving the focus over the characters also selects them
    if (isCard) {
      const id = items[next].dataset.characterId;
      if (id) setCharacter(id as Parameters<typeof setCharacter>[0]);
      this._sync();
      items[next].focus();
    }
  }

  setOpen(open: boolean): void {
    this._open = open;
    this.panel.hidden = !open;
    this.toggle.setAttribute('aria-expanded', String(open));
    this.toggle.classList.toggle('skin-picker__toggle--open', open);
    if (open) {
      this._place();
      if (this._thumbsDirty) this._refreshThumbs();
      this._cards.get(getCharacterId())?.scrollIntoView?.({ block: 'nearest' });
    }
  }

  /** Opens the panel as a centered sheet (used from the compact menu, where the toggle is hidden). */
  openAsSheet(): void {
    this.setOpen(true);
    this._cards.get(getCharacterId())?.focus({ preventScroll: true });
  }

  close(): void {
    if (this._open) this.setOpen(false);
  }

  /** Puts the panel under the HUD (row layout) or to the left of it (column layout). */
  private _place(): void {
    const hud = this.toggle.parentElement;
    if (!hud) return;
    const panel = this.panel;
    if (window.matchMedia?.(COMPACT_QUERY).matches) {
      // Phones: centered sheet at the top, never reaching the joystick / legend corners
      const top = `calc(var(--safe-top, 0px) + ${SHEET_TOP}px)`;
      panel.style.left = '0';
      panel.style.right = '0';
      panel.style.marginInline = 'auto';
      panel.style.top = top;
      panel.style.maxHeight = `min(${SHEET_MAX_VH * 100}dvh, calc(100dvh - ${top} - ${GAP}px))`;
      return;
    }
    panel.style.marginInline = '';
    const hudRect = hud.getBoundingClientRect();
    const toggleRect = this.toggle.getBoundingClientRect();
    const column = getComputedStyle(hud).flexDirection === 'column';
    panel.style.left = 'auto';
    panel.style.maxHeight = `${Math.max(160, window.innerHeight - 2 * GAP)}px`;
    if (column) {
      panel.style.right = `${Math.max(8, window.innerWidth - hudRect.left + GAP)}px`;
      const maxTop = window.innerHeight - panel.offsetHeight - GAP;
      panel.style.top = `${Math.max(GAP, Math.min(toggleRect.top, maxTop))}px`;
    } else {
      panel.style.right = `${Math.max(8, window.innerWidth - hudRect.right)}px`;
      panel.style.top = `${hudRect.bottom + GAP}px`;
      panel.style.maxHeight = `${Math.max(160, window.innerHeight - hudRect.bottom - 2 * GAP)}px`;
    }
  }

  dispose(): void {
    document.removeEventListener('pointerdown', this._onPointerDown);
    window.removeEventListener('keydown', this._onEscape);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('skin-change', this._onSkin);
    window.removeEventListener('style-change', this._onStyle);
    cancelAnimationFrame(this._thumbFrame);
    this._thumbs.dispose();
    this.toggle.remove();
    this.panel.remove();
  }
}
