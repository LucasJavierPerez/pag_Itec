import { DEFAULT_SKIN_ID, getRobotSkin, isRobotSkinId } from './skins/robotSkins.ts';
import type { RobotSkin, RobotSkinId } from './skins/robotSkins.ts';
import { DEFAULT_CHARACTER_ID, isCharacterId } from './characters/characterSpec.ts';
import type { CharacterId } from './characters/characterSpec.ts';

/**
 * The look the player picked: a character plus a colour palette. Persisted in localStorage and
 * announced with a `skin-change` event ({ detail: { id: paletteId, character: characterId } }).
 * Both ids are plain strings, so the pair can travel to other players as is.
 */

/** Palette key (kept as `itec-skin` for backward compatibility). */
export const SKIN_STORAGE_KEY = 'itec-skin';
export const CHARACTER_STORAGE_KEY = 'itec-character';

export interface SkinSelection {
  characterId: CharacterId;
  paletteId: RobotSkinId;
}

export interface SkinChangeDetail {
  /** Palette id (the original field, kept for compatibility). */
  id: RobotSkinId;
  character: CharacterId;
}

let currentPalette: RobotSkinId | null = null;
let currentCharacter: CharacterId | null = null;

function read<T extends string>(key: string, valid: (v: unknown) => v is T, fallback: T): T {
  try {
    const stored = localStorage.getItem(key);
    if (valid(stored)) return stored;
  } catch {
    // storage may be blocked (private mode): fall back to the default
  }
  return fallback;
}

function write(key: string, value: string): void {
  try {
    localStorage.setItem(key, value);
  } catch {
    // ignore persistence failures
  }
}

export function getSkinId(): RobotSkinId {
  if (currentPalette === null) currentPalette = read(SKIN_STORAGE_KEY, isRobotSkinId, DEFAULT_SKIN_ID);
  return currentPalette;
}

export function getCharacterId(): CharacterId {
  if (currentCharacter === null) currentCharacter = read(CHARACTER_STORAGE_KEY, isCharacterId, DEFAULT_CHARACTER_ID);
  return currentCharacter;
}

/** The palette the player picked. */
export function getSkin(): RobotSkin {
  return getRobotSkin(getSkinId());
}

export function getSelection(): SkinSelection {
  return { characterId: getCharacterId(), paletteId: getSkinId() };
}

function announce(): void {
  const detail: SkinChangeDetail = { id: getSkinId(), character: getCharacterId() };
  window.dispatchEvent(new CustomEvent('skin-change', { detail }));
}

/** Selects a palette, persists it and dispatches `skin-change`. */
export function setPalette(id: RobotSkinId): void {
  if (!isRobotSkinId(id)) return;
  const changed = id !== getSkinId();
  currentPalette = id;
  write(SKIN_STORAGE_KEY, id);
  if (changed) announce();
}

/** Selects a character, persists it and dispatches `skin-change`. */
export function setCharacter(id: CharacterId): void {
  if (!isCharacterId(id)) return;
  const changed = id !== getCharacterId();
  currentCharacter = id;
  write(CHARACTER_STORAGE_KEY, id);
  if (changed) announce();
}

/** Alias of `setPalette` (the original name). */
export const setSkinId = setPalette;
