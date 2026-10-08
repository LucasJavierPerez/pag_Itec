/** Lightweight transient message near the top of the screen (polite live region). */
export const TOAST_MS = 4000;

export class ChatToast {
  readonly element: HTMLDivElement;
  private _timer: number | null = null;

  constructor() {
    this.element = document.createElement('div');
    this.element.className = 'chat-toast';
    this.element.setAttribute('role', 'status');
    this.element.setAttribute('aria-live', 'polite');
    this.element.hidden = true;
    document.body.appendChild(this.element);
  }

  show(text: string): void {
    this.element.textContent = text;
    this.element.hidden = false;
    // Restart the CSS animation when a toast replaces another one
    this.element.classList.remove('chat-toast--in');
    void this.element.offsetWidth;
    this.element.classList.add('chat-toast--in');
    if (this._timer !== null) window.clearTimeout(this._timer);
    this._timer = window.setTimeout(() => this.hide(), TOAST_MS);
  }

  hide(): void {
    if (this._timer !== null) window.clearTimeout(this._timer);
    this._timer = null;
    this.element.hidden = true;
    this.element.classList.remove('chat-toast--in');
  }

  dispose(): void {
    this.hide();
    this.element.remove();
  }
}
