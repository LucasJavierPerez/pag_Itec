/**
 * Robot skins (pure data, no THREE): 8 palettes that recolor the robot by ROLE (body panels,
 * joints, glowing accent). Not to be confused with the per-style map skins in this folder.
 */

export type RobotSkinId =
  | 'clasico'
  | 'rojo-itec'
  | 'azul-itec'
  | 'verde'
  | 'dorado'
  | 'nocturno'
  | 'rosa'
  | 'arcoiris';

export interface RobotSkin {
  id: RobotSkinId;
  /** Spanish label shown in the picker. */
  label: string;
  /** Body panels (torso, limbs, head). */
  panel: number;
  /** Joints, rings and visor strips. */
  joint: number;
  /** Glowing core and eyes (base color when `animated`). */
  accent: number;
  /** Multiplier on the emissive strength of the accent parts. */
  emissive: number;
  /** The accent cycles through the hues (see `accentAt`). */
  animated: boolean;
  /** Keep the style's own colors untouched (the "current look"). */
  original: boolean;
}

export const DEFAULT_SKIN_ID: RobotSkinId = 'clasico';

/** Seconds for one full turn of the rainbow accent. */
export const RAINBOW_PERIOD = 14;

const S = (
  id: RobotSkinId,
  label: string,
  panel: number,
  joint: number,
  accent: number,
  extra: Partial<Pick<RobotSkin, 'emissive' | 'animated' | 'original'>> = {},
): RobotSkin => ({ id, label, panel, joint, accent, emissive: 1, animated: false, original: false, ...extra });

export const ROBOT_SKINS: readonly RobotSkin[] = [
  S('clasico', 'Clásico', 0xf0f0f0, 0x222222, 0x3498db, { original: true }),
  S('rojo-itec', 'Rojo ITEC', 0xd7392f, 0x2b1614, 0xffe08a),
  S('azul-itec', 'Azul ITEC', 0x1a5276, 0x0e1d2b, 0x6fd0ff),
  S('verde', 'Verde', 0x2e9e5b, 0x10281b, 0xb6ff7a),
  S('dorado', 'Dorado', 0xe0b341, 0x3a2c0b, 0xfff1b0),
  S('nocturno', 'Nocturno', 0x1b2030, 0x0a0c14, 0x00e5ff, { emissive: 1.4 }),
  S('rosa', 'Rosa', 0xf08cb6, 0x4a1e33, 0xff5fa8),
  S('arcoiris', 'Arcoíris', 0xf3f3f6, 0x2a2a35, 0xff4d4d, { animated: true }),
];

const BY_ID = new Map<string, RobotSkin>(ROBOT_SKINS.map((s) => [s.id, s]));

export function isRobotSkinId(id: unknown): id is RobotSkinId {
  return typeof id === 'string' && BY_ID.has(id);
}

/** The skin with this id, or the default when unknown. */
export function getRobotSkin(id: string | null | undefined): RobotSkin {
  return (id ? BY_ID.get(id) : undefined) ?? BY_ID.get(DEFAULT_SKIN_ID)!;
}

/** Hue in [0, 1) of the rainbow accent at `timeSec` (deterministic). */
export function rainbowHue(timeSec: number): number {
  const t = (timeSec / RAINBOW_PERIOD) % 1;
  return t < 0 ? t + 1 : t;
}

/** HSV (all in [0, 1]) to a 0xRRGGBB integer. */
export function hsvToHex(h: number, s: number, v: number): number {
  const hh = (((h % 1) + 1) % 1) * 6;
  const i = Math.floor(hh);
  const f = hh - i;
  const p = v * (1 - s);
  const q = v * (1 - s * f);
  const t = v * (1 - s * (1 - f));
  const rgb = [
    [v, t, p],
    [q, v, p],
    [p, v, t],
    [p, q, v],
    [t, p, v],
    [v, p, q],
  ][i % 6];
  const to = (c: number) => Math.max(0, Math.min(255, Math.round(c * 255)));
  return (to(rgb[0]) << 16) | (to(rgb[1]) << 8) | to(rgb[2]);
}

/** Accent color of `skin` at `timeSec`: constant, except for the animated rainbow. */
export function accentAt(skin: RobotSkin, timeSec: number): number {
  return skin.animated ? hsvToHex(rainbowHue(timeSec), 0.75, 1) : skin.accent;
}
