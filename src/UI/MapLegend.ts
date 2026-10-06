import { DISTRICTS, MAP_POINTS } from './MapData.ts';

/**
 * Accessible list of every point of interest, grouped by district. Each entry is a real
 * button, so the map is fully usable without a mouse. Collapsible (collapsed by default on phones).
 */
export class MapLegend {
  readonly element: HTMLElement;

  private _toggle: HTMLButtonElement;
  private _body: HTMLDivElement;
  private _items = new Map<string, HTMLButtonElement>();

  constructor(onSelect: (id: string) => void) {
    this.element = document.createElement('nav');
    this.element.className = 'map-legend';
    this.element.setAttribute('aria-label', 'Puntos de interés del mapa');

    this._toggle = document.createElement('button');
    this._toggle.type = 'button';
    this._toggle.className = 'map-legend__toggle';
    this._toggle.setAttribute('aria-controls', 'map-legend-body');
    this._toggle.innerHTML = `<span class="map-legend__title">Puntos de interés</span><span class="map-legend__count">${MAP_POINTS.length}</span><span class="map-legend__chevron" aria-hidden="true"></span>`;
    this._toggle.addEventListener('click', (e) => {
      if (e.detail > 0) this._toggle.blur();
      this.setOpen(this._toggle.getAttribute('aria-expanded') !== 'true');
    });

    this._body = document.createElement('div');
    this._body.id = 'map-legend-body';
    this._body.className = 'map-legend__body';

    for (const district of DISTRICTS) {
      const group = document.createElement('section');
      group.className = 'map-legend__group';
      const heading = document.createElement('h3');
      heading.className = 'map-legend__heading';
      const dot = document.createElement('span');
      dot.className = 'map-legend__dot';
      dot.style.background = district.accent;
      heading.append(dot, district.name);
      group.appendChild(heading);

      const list = document.createElement('ul');
      list.className = 'map-legend__list';
      for (const point of MAP_POINTS.filter((p) => p.district === district.id)) {
        const li = document.createElement('li');
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'map-legend__item';
        button.dataset.pointId = point.id;
        const swatch = document.createElement('span');
        swatch.className = 'map-legend__swatch';
        swatch.style.background = point.accent;
        const name = document.createElement('span');
        name.className = 'map-legend__name';
        name.textContent = point.name;
        button.append(swatch, name);
        button.addEventListener('click', () => onSelect(point.id));
        li.appendChild(button);
        list.appendChild(li);
        this._items.set(point.id, button);
      }
      group.appendChild(list);
      this._body.appendChild(group);
    }

    this.element.append(this._toggle, this._body);
    this.setOpen(window.matchMedia?.('(min-width: 900px)').matches ?? true);
  }

  setOpen(open: boolean): void {
    this._toggle.setAttribute('aria-expanded', String(open));
    this.element.classList.toggle('map-legend--open', open);
    this._body.hidden = !open;
  }

  /** Marks the current destination in the list. */
  setActive(id: string | null): void {
    for (const [key, button] of this._items) {
      const active = key === id;
      button.classList.toggle('map-legend__item--active', active);
      if (active) button.setAttribute('aria-current', 'true');
      else button.removeAttribute('aria-current');
    }
  }
}
