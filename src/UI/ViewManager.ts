import type { InfoPanel } from './InfoPanel.ts';

export type ViewId = 'explorer' | 'map';

export interface ExplorerHooks {
  /** Stops the explorer render loop and physics step, keeping all state. */
  pause(): void;
  resume(): void;
}

export interface MapHooks {
  /** Shows the map and starts its own render loop. */
  activate(): void;
  /** Hides the map and stops its render loop. */
  deactivate(): void;
}

interface ViewManagerOptions {
  explorer: ExplorerHooks;
  map: MapHooks;
  /** The explorer canvas (hidden while the map is shown). */
  explorerCanvas: HTMLCanvasElement;
  infoPanel: InfoPanel;
}

const STORAGE_KEY = 'itec-view';
const HASH: Record<ViewId, string> = { explorer: '#explorador', map: '#mapa' };

const ICON_EXPLORER =
  '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="M12 2 3 7v10l9 5 9-5V7l-9-5Zm0 2.3 5.9 3.3L12 10.9 6.1 7.6 12 4.3ZM5 9.3l6 3.3v7L5 16.3v-7Zm8 10.3v-7l6-3.3v7l-6 3.3Z" fill="currentColor"/></svg>';
const ICON_MAP =
  '<svg viewBox="0 0 24 24" width="16" height="16" aria-hidden="true" focusable="false"><path d="m9 3-6 2.3v15.7l6-2.3 6 2.3 6-2.3V3l-6 2.3L9 3Zm0 2.4 4 1.5v11.7l-4-1.5V5.4ZM5 6.7l2-.8v11.7l-2 .8V6.7Zm14 10.6-2 .8V6.4l2-.8v11.7Z" fill="currentColor"/></svg>';

/** The tab requested by the URL hash. Only `#mapa` changes the (always explorer) default boot. */
export function getInitialView(): ViewId {
  return window.location.hash === HASH.map ? 'map' : 'explorer';
}

/**
 * Top-center tab bar plus the switching logic: guarantees that only one render loop runs.
 * The explorer is paused (loop + physics) while the map is active and resumed on return.
 */
export class ViewManager extends EventTarget {
  current: ViewId;

  private _opts: ViewManagerOptions;
  private _root: HTMLDivElement;
  private _tabs = new Map<ViewId, HTMLButtonElement>();

  constructor(opts: ViewManagerOptions, initial: ViewId) {
    super();
    this._opts = opts;
    this.current = initial;

    this._root = document.createElement('div');
    this._root.className = 'view-tabs';
    this._root.setAttribute('role', 'tablist');
    this._root.setAttribute('aria-label', 'Vista');

    this._addTab('explorer', 'Explorador 3D', ICON_EXPLORER);
    this._addTab('map', 'Mapa', ICON_MAP);
    this._root.addEventListener('keydown', (e) => this._onKeyDown(e));
    document.body.appendChild(this._root);

    this._syncTabs();
    document.body.dataset.view = initial;

    // Boot state: the explorer is already running; only a `#mapa` boot needs the swap
    if (initial === 'map') {
      opts.explorer.pause();
      opts.explorerCanvas.style.display = 'none';
      opts.infoPanel.setClassroomEvents(false);
      opts.map.activate();
    }

    window.addEventListener('hashchange', () => {
      const wanted = getInitialView();
      if (window.location.hash === HASH.map || window.location.hash === HASH.explorer) {
        this.setView(wanted);
      }
    });
  }

  private _addTab(id: ViewId, label: string, icon: string): void {
    const button = document.createElement('button');
    button.type = 'button';
    button.className = 'view-tabs__tab';
    button.id = `view-tab-${id}`;
    button.setAttribute('role', 'tab');
    button.setAttribute('aria-label', label);
    button.innerHTML = `<span class="view-tabs__icon">${icon}</span><span class="view-tabs__label">${label}</span>`;
    button.addEventListener('click', (e) => {
      // Mouse clicks release focus so WASD never gets swallowed; keyboard users keep it
      if (e.detail > 0) button.blur();
      this.setView(id);
    });
    this._tabs.set(id, button);
    this._root.appendChild(button);
  }

  private _onKeyDown(e: KeyboardEvent): void {
    const order: ViewId[] = ['explorer', 'map'];
    const index = order.indexOf(this.current);
    let next: ViewId | null = null;
    if (e.key === 'ArrowRight') next = order[(index + 1) % order.length];
    else if (e.key === 'ArrowLeft') next = order[(index + order.length - 1) % order.length];
    else if (e.key === 'Home') next = order[0];
    else if (e.key === 'End') next = order[order.length - 1];
    if (!next) return;
    e.preventDefault();
    this.setView(next);
    this._tabs.get(next)?.focus();
  }

  private _syncTabs(): void {
    for (const [id, button] of this._tabs) {
      const active = id === this.current;
      button.classList.toggle('view-tabs__tab--active', active);
      button.setAttribute('aria-selected', String(active));
      button.tabIndex = active ? 0 : -1;
    }
  }

  setView(id: ViewId): void {
    if (id === this.current) return;
    const { explorer, map, explorerCanvas, infoPanel } = this._opts;

    if (id === 'map') {
      // Stop the explorer first so two render loops never overlap
      infoPanel.hide();
      infoPanel.setClassroomEvents(false);
      explorer.pause();
      explorerCanvas.style.display = 'none';
      map.activate();
    } else {
      map.deactivate();
      infoPanel.hide();
      infoPanel.setClassroomEvents(true);
      explorerCanvas.style.display = '';
      explorer.resume();
    }

    this.current = id;
    document.body.dataset.view = id;
    this._syncTabs();
    document.title = id === 'map' ? 'ITEC Río Cuarto — Mapa' : 'ITEC Río Cuarto — Explorador 3D';
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // ignore persistence failures
    }
    history.replaceState(null, '', HASH[id]);
    this.dispatchEvent(new CustomEvent('viewchange', { detail: { id } }));
  }
}
