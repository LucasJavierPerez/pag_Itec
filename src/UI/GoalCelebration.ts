const COLORS = ['#2980b9', '#e74c3c', '#e67e22', '#8e44ad', '#27ae60', '#f1c40f'];
const CONFETTI_COUNT = 60;
const BANNER_MS = 3000;

export class GoalCelebration {
  private banner: HTMLDivElement;
  private hideTimer: number | null = null;
  private confetti = new Set<HTMLDivElement>();
  private onGoal = () => this.celebrate();

  constructor() {
    this.banner = document.createElement('div');
    this.banner.className = 'goal-banner';
    this.banner.innerHTML =
      '<div class="goal-banner__title">¡GOOOL de ITEC!</div>' +
      '<div class="goal-banner__subtitle">Descubriste el easter egg del patio ⚽</div>';
    document.body.appendChild(this.banner);
    window.addEventListener('goal-scored', this.onGoal);
  }

  private celebrate(): void {
    this.banner.classList.add('goal-banner--visible');
    if (this.hideTimer !== null) window.clearTimeout(this.hideTimer);
    this.hideTimer = window.setTimeout(() => {
      this.banner.classList.remove('goal-banner--visible');
      this.hideTimer = null;
    }, BANNER_MS);

    for (let i = 0; i < CONFETTI_COUNT; i++) {
      const piece = document.createElement('div');
      piece.className = 'goal-confetti';
      piece.style.left = `${Math.random() * 100}vw`;
      piece.style.backgroundColor = COLORS[Math.floor(Math.random() * COLORS.length)];
      piece.style.animationDuration = `${2 + Math.random() * 1.5}s`;
      piece.style.animationDelay = `${Math.random() * 0.6}s`;
      piece.addEventListener('animationend', () => {
        piece.remove();
        this.confetti.delete(piece);
      });
      this.confetti.add(piece);
      document.body.appendChild(piece);
    }
  }

  dispose(): void {
    window.removeEventListener('goal-scored', this.onGoal);
    if (this.hideTimer !== null) window.clearTimeout(this.hideTimer);
    this.confetti.forEach((c) => c.remove());
    this.confetti.clear();
    this.banner.remove();
  }
}
