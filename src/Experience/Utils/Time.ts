export class Time extends EventTarget {
  elapsed: number;
  delta: number;

  private _start: number;
  private _current: number;
  private _rafId: number;

  constructor() {
    super();
    this._start = performance.now();
    this._current = this._start;
    this.elapsed = 0;
    this.delta = 16;
    this._rafId = 0;

    this._tick = this._tick.bind(this);
    this._rafId = requestAnimationFrame(this._tick);
  }

  private _tick(now: number): void {
    this.delta = now - this._current;
    this._current = now;
    this.elapsed = now - this._start;
    this.dispatchEvent(new Event('tick'));
    this._rafId = requestAnimationFrame(this._tick);
  }

  destroy(): void {
    cancelAnimationFrame(this._rafId);
  }
}
