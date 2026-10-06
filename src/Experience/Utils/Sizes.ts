import { maxPixelRatio } from '../../utils/device.ts';
import { onViewportResize } from '../../utils/viewport.ts';

export class Sizes extends EventTarget {
  width: number;
  height: number;
  pixelRatio: number;

  private _unsubscribe: () => void;

  constructor() {
    super();
    this.width = window.innerWidth;
    this.height = window.innerHeight;
    this.pixelRatio = Math.min(window.devicePixelRatio, maxPixelRatio());

    // Debounced: resize, orientationchange and visualViewport (mobile URL bar) all funnel here
    this._unsubscribe = onViewportResize(() => this._onResize());
  }

  private _onResize(): void {
    const width = window.innerWidth;
    const height = window.innerHeight;
    const pixelRatio = Math.min(window.devicePixelRatio, maxPixelRatio());
    if (width === this.width && height === this.height && pixelRatio === this.pixelRatio) return;
    this.width = width;
    this.height = height;
    this.pixelRatio = pixelRatio;
    this.dispatchEvent(new Event('resize'));
  }

  destroy(): void {
    this._unsubscribe();
  }
}
