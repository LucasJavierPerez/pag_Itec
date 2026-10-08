/** Auto-dismissing speech bubble that follows a bot on screen (polite live region). */
const SHOW_MS = 5000;
const MARGIN = 8;

export class BotBubble {
  readonly element: HTMLDivElement;

  private _name: HTMLElement;
  private _text: HTMLParagraphElement;
  private _timer: number | null = null;
  private _visible = false;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'bot-bubble';
    this.element.setAttribute('role', 'status');
    this.element.setAttribute('aria-live', 'polite');
    this.element.hidden = true;
    this._name = document.createElement('strong');
    this._name.className = 'bot-bubble__name';
    this._text = document.createElement('p');
    this._text.className = 'bot-bubble__text';
    this.element.append(this._name, this._text);
  }

  get visible(): boolean {
    return this._visible;
  }

  show(name: string, text: string, accent: string): void {
    this._name.textContent = name;
    this._text.textContent = text;
    this.element.style.setProperty('--bubble-accent', accent);
    this.element.hidden = false;
    this._visible = true;
    if (this._timer !== null) window.clearTimeout(this._timer);
    this._timer = window.setTimeout(() => this.hide(), SHOW_MS);
  }

  /** Puts the tip of the bubble at the screen point (x, y), keeping it inside the viewport. */
  setPosition(x: number, y: number): void {
    if (!this._visible) return;
    const w = this.element.offsetWidth;
    const h = this.element.offsetHeight;
    const left = Math.min(window.innerWidth - MARGIN - w / 2, Math.max(MARGIN + w / 2, x));
    const top = Math.max(MARGIN + h, y);
    this.element.style.transform = `translate(${Math.round(left)}px, ${Math.round(top)}px) translate(-50%, calc(-100% - 12px))`;
    this.element.style.setProperty('--bubble-tip', `${Math.round(x - left)}px`);
  }

  hide(): void {
    if (this._timer !== null) window.clearTimeout(this._timer);
    this._timer = null;
    this._visible = false;
    this.element.hidden = true;
  }

  dispose(): void {
    this.hide();
    this.element.remove();
  }
}
