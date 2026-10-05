import type { QualityController } from '../Experience/Post/Quality.ts';

/** Bottom-right toggle between high and low graphics quality. */
export class QualityToggle {
  private _button: HTMLButtonElement;
  private _quality: QualityController;
  private _onChange: () => void;
  private _onClick: () => void;

  constructor(quality: QualityController) {
    this._quality = quality;
    this._button = document.createElement('button');
    this._button.type = 'button';
    this._button.className = 'quality-toggle';
    this._button.setAttribute('aria-label', 'Calidad gráfica');

    this._onClick = () => {
      // Release focus so WASD / arrows never get swallowed by the button
      this._button.blur();
      quality.toggle();
    };
    this._onChange = () => this._render();

    this._button.addEventListener('click', this._onClick);
    quality.addEventListener('change', this._onChange);
    this._render();
    document.body.appendChild(this._button);
  }

  private _render(): void {
    const high = this._quality.level === 'high';
    this._button.textContent = `Calidad: ${high ? 'Alta' : 'Baja'}`;
    this._button.setAttribute('aria-pressed', String(high));
    this._button.classList.toggle('quality-toggle--low', !high);
  }

  destroy(): void {
    this._button.removeEventListener('click', this._onClick);
    this._quality.removeEventListener('change', this._onChange);
    this._button.remove();
  }
}
