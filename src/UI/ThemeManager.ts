import uiOriginal from '../styles/ui-original.css?inline';
import uiLowpoly from '../styles/ui-lowpoly.css?inline';
import uiVoxel from '../styles/ui-voxel.css?inline';
import uiCinematic from '../styles/ui-cinematic.css?inline';
import uiMobile from '../styles/ui-mobile.css?inline';
import { DEFAULT_STYLE, isStyleId } from '../Experience/World/styles/index.ts';
import type { StyleId } from '../Experience/World/styles/index.ts';

const STORAGE_KEY = 'itec-style';

const THEME_CSS: Record<StyleId, string> = {
  original: uiOriginal,
  lowpoly: uiLowpoly,
  voxel: uiVoxel,
  cinematic: uiCinematic,
};

/** Reads the persisted style, falling back to the default when missing or invalid. */
export function getStoredStyle(): StyleId {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (isStyleId(stored)) return stored;
  } catch {
    // localStorage unavailable (private mode, blocked): use the default
  }
  return DEFAULT_STYLE;
}

/** Swaps the UI stylesheet and persists the choice. */
export const ThemeManager = {
  apply(id: StyleId): void {
    let el = document.getElementById('theme-css') as HTMLStyleElement | null;
    if (!el) {
      el = document.createElement('style');
      el.id = 'theme-css';
      document.head.appendChild(el);
    }
    // The shared mobile layer comes last so it can override any theme at the same specificity
    el.textContent = `${THEME_CSS[id]}\n${uiMobile}`;
    document.documentElement.dataset.style = id;
    try {
      localStorage.setItem(STORAGE_KEY, id);
    } catch {
      // ignore persistence failures
    }
  },
};
