export class LoadingScreen {
  private overlay: HTMLDivElement;

  constructor() {
    this.overlay = document.createElement('div');
    this.overlay.id = 'loading-screen';
    this.overlay.innerHTML = `
      <div class="loading-screen__skyline" aria-hidden="true"></div>
      <div class="loading-screen__content">
        <h1 class="loading-screen__title">ITEC Rio Cuarto</h1>
        <p class="loading-screen__subtitle">Explorador 3D</p>
        <p class="loading-screen__motto">Educación para transformar</p>
        <p class="loading-screen__motto">EDUCACION PARA TRANSFORMAR</p>
        <div class="loading-screen__spinner"></div>
        <p class="loading-screen__hint">Usa WASD o flechas para explorar</p>
      </div>
    `;
    document.body.appendChild(this.overlay);
  }

  hide(): void {
    this.overlay.classList.add('loading-screen--hidden');
    this.overlay.addEventListener(
      'transitionend',
      () => {
        this.overlay.remove();
      },
      { once: true },
    );
  }
}
