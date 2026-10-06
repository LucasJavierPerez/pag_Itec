/**
 * Debounced viewport-change notifications: window resize, orientation change and the visual
 * viewport (mobile URL bar showing/hiding, on-screen keyboard). Returns an unsubscribe function.
 */
export function onViewportResize(cb: () => void, delayMs = 100): () => void {
  let timer: number | null = null;
  const fire = () => {
    if (timer !== null) window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      timer = null;
      cb();
    }, delayMs);
  };
  const vv = window.visualViewport;
  window.addEventListener('resize', fire);
  window.addEventListener('orientationchange', fire);
  vv?.addEventListener('resize', fire);
  return () => {
    if (timer !== null) window.clearTimeout(timer);
    window.removeEventListener('resize', fire);
    window.removeEventListener('orientationchange', fire);
    vv?.removeEventListener('resize', fire);
  };
}
