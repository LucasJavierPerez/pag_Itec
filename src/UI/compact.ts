/**
 * The compact (phone) HUD breakpoint. Keep in sync with the `@media` block of ui-mobile.css
 * ("Compact HUD") and the identical query in the theme files.
 */
export const COMPACT_QUERY = '(max-width: 640px), (max-height: 480px) and (orientation: landscape)';

export function isCompactLayout(): boolean {
  try {
    return window.matchMedia(COMPACT_QUERY).matches;
  } catch {
    return false;
  }
}

/** Calls `cb` when the layout crosses the breakpoint. Returns an unsubscribe function. */
export function onCompactChange(cb: (compact: boolean) => void): () => void {
  let mq: MediaQueryList;
  try {
    mq = window.matchMedia(COMPACT_QUERY);
  } catch {
    return () => {};
  }
  const fire = (): void => cb(mq.matches);
  mq.addEventListener('change', fire);
  return () => mq.removeEventListener('change', fire);
}
