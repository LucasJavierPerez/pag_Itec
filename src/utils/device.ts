/** Tiny helpers to adapt behavior to touch devices. All safe to call in any environment. */

const COARSE_QUERY = '(pointer: coarse)';
const HOVER_QUERY = '(hover: hover)';
const REDUCED_MOTION_QUERY = '(prefers-reduced-motion: reduce)';

function matches(query: string): boolean {
  try {
    return window.matchMedia(query).matches;
  } catch {
    return false;
  }
}

/** True on phones/tablets: a coarse primary pointer, or touch points without hover. */
export function isCoarsePointer(): boolean {
  if (matches(COARSE_QUERY)) return true;
  return typeof navigator !== 'undefined' && navigator.maxTouchPoints > 0 && !matches(HOVER_QUERY);
}

/** Calls `cb` whenever the coarse-pointer state may have changed. Returns an unsubscribe function. */
export function onCoarsePointerChange(cb: (coarse: boolean) => void): () => void {
  const fire = () => cb(isCoarsePointer());
  let queries: MediaQueryList[] = [];
  try {
    queries = [window.matchMedia(COARSE_QUERY), window.matchMedia(HOVER_QUERY)];
  } catch {
    return () => {};
  }
  for (const q of queries) q.addEventListener('change', fire);
  return () => {
    for (const q of queries) q.removeEventListener('change', fire);
  };
}

export function prefersReducedMotion(): boolean {
  return matches(REDUCED_MOTION_QUERY);
}

/** Short vibration for feedback; no-op without support or when reduced motion is requested. */
export function haptic(ms = 8): void {
  if (prefersReducedMotion()) return;
  try {
    navigator.vibrate?.(ms);
  } catch {
    // ignore: some browsers throw without a user gesture
  }
}
