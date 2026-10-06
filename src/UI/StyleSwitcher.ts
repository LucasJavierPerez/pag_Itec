import { STYLES, STYLE_IDS } from '../Experience/World/styles/index.ts';
import type { StyleId } from '../Experience/World/styles/index.ts';

/** Always-visible top-left widget to pick the visual style at runtime. */
export class StyleSwitcher {
  private root: HTMLDivElement;
  private buttons = new Map<StyleId, HTMLButtonElement>();

  constructor(initial: StyleId, transition: { request(id: StyleId): void }) {
    this.root = document.createElement('div');
    this.root.className = 'style-switcher';
    this.root.setAttribute('role', 'group');
    this.root.setAttribute('aria-label', 'Estilo visual');

    const label = document.createElement('span');
    label.className = 'style-switcher__label';
    label.textContent = 'Estilo';
    this.root.appendChild(label);

    for (const id of STYLE_IDS) {
      const button = document.createElement('button');
      button.type = 'button';
      button.className = 'style-switcher__button';
      button.textContent = STYLES[id].label;
      button.addEventListener('click', () => {
        // Release focus so WASD / arrows never get swallowed by the button
        button.blur();
        this.setActive(id);
        transition.request(id);
      });
      this.buttons.set(id, button);
      this.root.appendChild(button);
    }

    this.setActive(initial);
    document.body.appendChild(this.root);
  }

  get element(): HTMLElement {
    return this.root;
  }

  setActive(id: StyleId): void {
    for (const [key, button] of this.buttons) {
      const active = key === id;
      button.classList.toggle('style-switcher__button--active', active);
      button.setAttribute('aria-pressed', String(active));
    }
  }
}
