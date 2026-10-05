export class Sizes extends EventTarget {
  width: number;
  height: number;
  pixelRatio: number;

  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);

    this._onResize = this._onResize.bind(this);
    window.addEventListener('resize', this._onResize);
  }

  private _onResize(): void {
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, 2);
    this.dispatchEvent(new Event('resize'));
  }

  destroy(): void {
    window.removeEventListener('resize', this._onResize);
  }
}
