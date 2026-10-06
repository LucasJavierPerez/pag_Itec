import { careerData } from './CareerData.ts';

/** Content of a card (classroom or map point). */
export interface InfoEntry {
  title: string;
  subtitle: string;
  tag: string;
  description: string;
  highlights: string[];
  /** Hex color (#rrggbb). */
  accent: string;
  link?: { label: string; url: string };
}

const SWIPE_PX = 40;

/** Turns a chip text into a tappable contact link, only when it is a real contact string. */
function contactHref(text: string): string | null {
  const wa = /^WhatsApp:?\s*(\d{10})$/i.exec(text.trim());
  if (wa) return `https://wa.me/549${wa[1]}`;
  const phone = /^0(\d{3})-?(\d{6,7})$/.exec(text.trim());
  if (phone) return `tel:+54${phone[1]}${phone[2]}`;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(text.trim())) return `mailto:${text.trim()}`;
  return null;
}

const DEFAULT_LINK = { label: 'Más info en itecriocuarto.org.ar →', url: 'https://www.itecriocuarto.org.ar' };

export class InfoPanel {
  private panel: HTMLDivElement;
  private isVisible = false;
  /** False while the explorer is paused (map tab): classroom events must not touch the card. */
  private classroomEvents = true;
  private source: 'classroom' | 'entry' | null = null;

  private onEnter: (e: Event) => void;
  private onLeave: (e: Event) => void;
  private onKey: (e: KeyboardEvent) => void;

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

    this.onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && this.isVisible) this.hide();
    };

    window.addEventListener('classroom-enter', this.onEnter);
    window.addEventListener('classroom-leave', this.onLeave);
    window.addEventListener('keydown', this.onKey);
  }

  private createPanel(): HTMLDivElement {
    const panel = document.createElement('div');
    panel.id = 'info-panel';
    panel.setAttribute('aria-live', 'polite');
    panel.innerHTML = `
      <div class="info-panel__bar">
        <button type="button" class="info-panel__handle" aria-label="Cerrar tarjeta"><span class="info-panel__grip"></span></button>
        <button type="button" class="info-panel__sheet-close" aria-label="Cerrar">&times;</button>
      </div>
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
    this.setupSheetControls(panel);

    return panel;
  }

  /** Phone sheet: handle tap, close button and swipe-to-dismiss (hidden by CSS on desktop). */
  private setupSheetControls(panel: HTMLDivElement): void {
    const handle = panel.querySelector('.info-panel__handle') as HTMLButtonElement;
    const sheetClose = panel.querySelector('.info-panel__sheet-close') as HTMLButtonElement;
    const bar = panel.querySelector('.info-panel__bar') as HTMLDivElement;
    handle.addEventListener('click', () => this.hide());
    sheetClose.addEventListener('click', () => this.hide());

    let startY: number | null = null;
    bar.addEventListener('pointerdown', (e) => {
      startY = e.clientY;
    });
    const finish = (e: PointerEvent) => {
      if (startY === null) return;
      const dy = e.clientY - startY;
      startY = null;
      // Map sheet is docked at the bottom (swipe down), explorer sheet at the top (swipe up)
      const dismiss = document.body.dataset.view === 'map' ? dy > SWIPE_PX : dy < -SWIPE_PX;
      if (dismiss) this.hide();
    };
    bar.addEventListener('pointerup', finish);
    bar.addEventListener('pointercancel', () => {
      startY = null;
    });
  }

  /** Classroom card (explorer): image, duration pill and the fixed default link. */
  show(careerName: string): void {
    const info = careerData[careerName];
    if (!info) return;
    this.render({
      title: info.title,
      subtitle: info.subtitle,
      tag: info.duration,
      description: info.description,
      highlights: info.highlights,
      accent: info.color,
      imageUrl: info.imageUrl,
      link: DEFAULT_LINK,
    });
    this.source = 'classroom';
  }

  /** Card for a map point of interest: no image, optional per-entry link. */
  showEntry(entry: InfoEntry): void {
    this.render({ ...entry, imageUrl: '' });
    this.source = 'entry';
  }

  private render(info: InfoEntry & { imageUrl: string }): void {
    const card = this.panel.querySelector('.info-panel__card') as HTMLDivElement;
    const accent = card.querySelector('.info-panel__accent') as HTMLDivElement;
    const title = card.querySelector('.info-panel__title') as HTMLHeadingElement;
    const subtitle = card.querySelector('.info-panel__subtitle') as HTMLParagraphElement;
    const duration = card.querySelector('.info-panel__duration') as HTMLSpanElement;
    const description = card.querySelector('.info-panel__description') as HTMLParagraphElement;
    const highlights = card.querySelector('.info-panel__highlights') as HTMLDivElement;
    const imageContainer = card.querySelector('.info-panel__image-container') as HTMLDivElement;
    const image = card.querySelector('.info-panel__image') as HTMLImageElement;
    const link = card.querySelector('.info-panel__link') as HTMLAnchorElement;

    // Set accent bar color
    accent.style.background = info.accent;

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
    duration.textContent = info.tag;
    description.textContent = info.description;

    highlights.innerHTML = '';
    for (const h of info.highlights) {
      const href = contactHref(h);
      const chip = document.createElement(href ? 'a' : 'span');
      chip.className = 'info-panel__chip';
      if (chip instanceof HTMLAnchorElement && href) {
        chip.href = href;
        chip.classList.add('info-panel__chip--link');
        if (href.startsWith('https:')) {
          chip.target = '_blank';
          chip.rel = 'noopener';
        }
      }
      chip.style.background = info.accent + '33'; // color with low opacity
      chip.style.borderColor = info.accent + '80';
      chip.textContent = h;
      highlights.appendChild(chip);
    }

    if (info.link) {
      link.href = info.link.url;
      link.textContent = info.link.label;
      link.hidden = false;
    } else {
      link.hidden = true;
    }

    this.panel.classList.add('info-panel--visible');
    document.body.classList.add('info-open');
    this.isVisible = true;
  }

  /** Enables/disables reactions to classroom-enter/leave (off while the map tab is active). */
  setClassroomEvents(enabled: boolean): void {
    this.classroomEvents = enabled;
  }

  hide(): void {
    if (!this.isVisible) return;
    this.panel.classList.remove('info-panel--visible');
    document.body.classList.remove('info-open');
    this.isVisible = false;
    this.source = null;
  }

  dispose(): void {
    window.removeEventListener('classroom-enter', this.onEnter);
    window.removeEventListener('classroom-leave', this.onLeave);
    window.removeEventListener('keydown', this.onKey);
    document.body.classList.remove('info-open');
    this.panel.remove();
  }
}
