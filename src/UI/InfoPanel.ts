import { careerData } from './CareerData.ts';

export class InfoPanel {
  private panel: HTMLDivElement;
  private isVisible = false;
  /** False while the explorer is paused (map tab): classroom events must not touch the card. */
  private classroomEvents = true;
  private source: 'classroom' | 'entry' | null = null;

  private onEnter: (e: Event) => void;
  private onLeave: (e: Event) => void;

  constructor() {
    this.panel = this.createPanel();
    document.body.appendChild(this.panel);

    this.onEnter = (e: Event) => {
      if (!this.classroomEvents) return;
      const detail = (e as CustomEvent<{ name: string }>).detail;
      this.show(detail.name);
    };

    this.onLeave = () => {
      // A card opened from the map is never closed by the explorer's zone events
      if (!this.classroomEvents || this.source !== 'classroom') return;
      this.hide();
    };

    window.addEventListener('classroom-enter', this.onEnter);
    window.addEventListener('classroom-leave', this.onLeave);
  }

  private createPanel(): HTMLDivElement {
    const panel = document.createElement('div');
    panel.id = 'info-panel';
    panel.innerHTML = `
      <div class="info-panel__card">
        <div class="info-panel__accent"></div>
        <button class="info-panel__close" aria-label="Cerrar">&times;</button>
        <div class="info-panel__image-container">
          <img class="info-panel__image" src="" alt="" />
        </div>
        <h2 class="info-panel__title"></h2>
        <p class="info-panel__subtitle"></p>
        <span class="info-panel__duration"></span>
        <p class="info-panel__description"></p>
        <div class="info-panel__highlights"></div>
        <a class="info-panel__link" href="https://www.itecriocuarto.org.ar" target="_blank" rel="noopener">
          Más info en itecriocuarto.org.ar →
        </a>
      </div>
    `;

    const closeBtn = panel.querySelector('.info-panel__close') as HTMLButtonElement;
    closeBtn.addEventListener('click', () => this.hide());

    return panel;
  }

  show(careerName: string): void {
    const info = careerData[careerName];
    if (!info) return;

    const card = this.panel.querySelector('.info-panel__card') as HTMLDivElement;
    const accent = card.querySelector('.info-panel__accent') as HTMLDivElement;
    const title = card.querySelector('.info-panel__title') as HTMLHeadingElement;
    const subtitle = card.querySelector('.info-panel__subtitle') as HTMLParagraphElement;
    const duration = card.querySelector('.info-panel__duration') as HTMLSpanElement;
    const description = card.querySelector('.info-panel__description') as HTMLParagraphElement;
    const highlights = card.querySelector('.info-panel__highlights') as HTMLDivElement;
    const imageContainer = card.querySelector('.info-panel__image-container') as HTMLDivElement;
    const image = card.querySelector('.info-panel__image') as HTMLImageElement;

    // Set accent bar color
    accent.style.background = info.color;

    // Set image
    if (info.imageUrl) {
      image.src = info.imageUrl;
      image.alt = info.title;
      imageContainer.style.display = '';
    } else {
      image.src = '';
      imageContainer.style.display = 'none';
    }

    title.textContent = info.title;
    subtitle.textContent = info.subtitle;
    duration.textContent = info.duration;
    description.textContent = info.description;

    highlights.innerHTML = '';
    for (const h of info.highlights) {
      const chip = document.createElement('span');
      chip.className = 'info-panel__chip';
      chip.style.background = info.color + '33'; // color with low opacity
      chip.style.borderColor = info.color + '80';
      chip.textContent = h;
      highlights.appendChild(chip);
    }

    this.panel.classList.add('info-panel--visible');
    this.isVisible = true;
    this.source = 'classroom';
  }

  /** Enables/disables reactions to classroom-enter/leave (off while the map tab is active). */
  setClassroomEvents(enabled: boolean): void {
    this.classroomEvents = enabled;
  }

  hide(): void {
    if (!this.isVisible) return;
    this.panel.classList.remove('info-panel--visible');
    this.isVisible = false;
    this.source = null;
  }

  dispose(): void {
    window.removeEventListener('classroom-enter', this.onEnter);
    window.removeEventListener('classroom-leave', this.onLeave);
    this.panel.remove();
  }
}
