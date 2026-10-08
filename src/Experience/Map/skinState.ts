import { DEFAULT_SKIN_ID, getRobotSkin, isRobotSkinId } from './skins/robotSkins.ts';
import type { RobotSkin, RobotSkinId } from './skins/robotSkins.ts';

/** The skin the player picked: persisted in localStorage and announced with a `skin-change` event. */

export const SKIN_STORAGE_KEY = 'itec-skin';

let current: RobotSkinId | null = null;

function read(): RobotSkinId {
  try {
    const stored = localStorage.getItem(SKIN_STORAGE_KEY);
    if (isRobotSkinId(stored)) return stored;
  } catch {
    // storage may be blocked (private mode): fall back to the default
  }
  return DEFAULT_SKIN_ID;
}

export function getSkinId(): RobotSkinId {
  if (current === null) current = read();
  return current;
}

export function getSkin(): RobotSkin {
  return getRobotSkin(getSkinId());
}

/** Selects a skin, persists it and dispatches `skin-change` ({ detail: { id } }). */
export function setSkinId(id: RobotSkinId): void {
  if (!isRobotSkinId(id)) return;
  const changed = id !== getSkinId();
  current = id;
  try {
    localStorage.setItem(SKIN_STORAGE_KEY, id);
  } catch {
    // ignore persistence failures
  }
  if (changed) window.dispatchEvent(new CustomEvent('skin-change', { detail: { id } }));
}
