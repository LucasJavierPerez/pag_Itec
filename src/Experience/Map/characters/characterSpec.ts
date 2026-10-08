import { RAINBOW_PERIOD, getRobotSkin, hsvToHex, rainbowHue } from '../skins/robotSkins.ts';
import type { RobotSkin, RobotSkinId } from '../skins/robotSkins.ts';

/**
 * Selectable characters (pure data, no THREE). One style-agnostic spec per character, rendered
 * by the four style renderers. Coordinates are in explorer-robot units: ~2.3 tall, feet at y = 0,
 * front facing local +Z, the character's own LEFT on +X (so its right hand is on -X).
 * `robot` is pipeline-native: it keeps using the style's own `createRobot()` and has no parts.
 */

export type CharacterId =
  | 'robot'
  | 'programadora'
  | 'tecnico'
  | 'turista'
  | 'creativa'
  | 'estudiante'
  | 'gato'
  | 'dino';

export type PartShape = 'box' | 'sphere' | 'cylinder' | 'cone';

/**
 * Colour roles. skin / hair / eye / white / dark are fixed per character; body / bodyAlt /
 * accent / glow come from the colour palette (so the 8 palettes recolour any character).
 */
export type PartRole = 'skin' | 'hair' | 'body' | 'bodyAlt' | 'accent' | 'dark' | 'glow' | 'eye' | 'white';

export type Limb = 'armL' | 'armR' | 'legL' | 'legR' | 'tail' | 'head';

export type Vec3 = [number, number, number];

export interface Part {
  shape: PartShape;
  pos: Vec3;
  /** Full extents (x, y, z). Cylinder and cone have their axis on Y (cone apex at +Y). */
  size: Vec3;
  /** Euler XYZ in radians, multiples of 90 degrees only (keeps voxel rasterization exact). */
  rot?: Vec3;
  role: PartRole;
  limb?: Limb;
}

export interface CharacterDef {
  id: CharacterId;
  /** Spanish label shown in the picker. */
  label: string;
  /** Spanish one-liner (<= 40 chars). */
  blurb: string;
  /** Total height (feet at y = 0). */
  height: number;
  /** True for the character that keeps the style's own robot pipeline. */
  native: boolean;
  /** Character-fixed colours. */
  fixed: { skin: number; hair: number; eye: number };
  /** Palette-driven colours of the "clasico" palette (the character's own signature look). */
  signature: { body: number; bodyAlt: number; accent: number; glow: number };
  /** Palette `bodyAlt` is a light variant of the body (fur bellies) instead of a dark one (trousers). */
  altLight?: boolean;
  /** Joint position of each animated limb (defaults in `LIMB_PIVOTS`). */
  pivots?: Partial<Record<Limb, Vec3>>;
  parts: Part[];
}

/** Fixed role order: per-vertex role indices refer to it. */
export const ROLE_ORDER: readonly PartRole[] = ['skin', 'hair', 'body', 'bodyAlt', 'accent', 'dark', 'glow', 'eye', 'white'];

export const DEFAULT_CHARACTER_ID: CharacterId = 'robot';

/** Limbs that get their own pivot (and draw call) at high quality. */
export const ANIMATED_LIMBS: readonly Limb[] = ['armL', 'armR', 'legL', 'legR', 'tail'];

export const LIMB_PIVOTS: Record<Limb, Vec3> = {
  armL: [0.58, 1.44, 0],
  armR: [-0.58, 1.44, 0],
  legL: [0.27, 0.86, 0],
  legR: [-0.27, 0.86, 0],
  tail: [0, 0.85, -0.4],
  head: [0, 1.5, 0],
};

export const WHITE = 0xf4f4f0;
export const DARK = 0x23232b;

// --------------------------------------------------------------------------- part helpers

type Maker = (role: PartRole, pos: Vec3, size: Vec3, limb?: Limb, rot?: Vec3) => Part;

const maker =
  (shape: PartShape): Maker =>
  (role, pos, size, limb, rot) => ({ shape, role, pos, size, ...(limb ? { limb } : {}), ...(rot ? { rot } : {}) });

const box = maker('box');
const sph = maker('sphere');
const cyl = maker('cylinder');
const cone = maker('cone');

const HALF_PI = Math.PI / 2;
const sides = [1, -1] as const;
const legOf = (s: number): Limb => (s > 0 ? 'legL' : 'legR');
const armOf = (s: number): Limb => (s > 0 ? 'armL' : 'armR');

/** Shared two-legged body: legs, shoes, torso, sleeves, hands, head, eyes and nose. */
function humanoid(o: { legs: PartRole; shoes: PartRole; torso: PartRole; sleeves: PartRole }): Part[] {
  const p: Part[] = [];
  for (const s of sides) {
    p.push(box(o.legs, [s * 0.27, 0.49, 0], [0.28, 0.74, 0.3], legOf(s)));
    p.push(box(o.shoes, [s * 0.27, 0.11, 0.07], [0.3, 0.22, 0.5], legOf(s)));
    p.push(box(o.sleeves, [s * 0.58, 1.15, 0], [0.22, 0.62, 0.24], armOf(s)));
    p.push(sph('skin', [s * 0.58, 0.74, 0.02], [0.22, 0.22, 0.22], armOf(s)));
    p.push(box('dark', [s * 0.15, 1.84, 0.355], [0.09, 0.13, 0.05]));
  }
  p.push(box(o.torso, [0, 1.2, 0], [0.84, 0.7, 0.5]));
  p.push(sph('skin', [0, 1.85, 0], [0.78, 0.78, 0.74]));
  p.push(sph('skin', [0, 1.77, 0.385], [0.09, 0.09, 0.08]));
  return p;
}

/** Hair cap: sits on the top/back of the head and leaves the face uncovered. */
const hairCap = (): Part => sph('hair', [0, 1.97, -0.07], [0.86, 0.68, 0.82]);

// --------------------------------------------------------------------------- characters

const robot: CharacterDef = {
  id: 'robot',
  label: 'Robot ITEC',
  blurb: 'El robot de siempre',
  height: 2.3,
  native: true,
  fixed: { skin: 0xf4f4f0, hair: 0x222222, eye: 0x3498db },
  signature: { body: 0xf0f0f0, bodyAlt: 0x222222, accent: 0x3498db, glow: 0x3498db },
  parts: [],
};

const programadora: CharacterDef = {
  id: 'programadora',
  label: 'Programadora',
  blurb: 'Código, hoodie y auriculares',
  height: 2.3,
  native: false,
  fixed: { skin: 0xd9a07c, hair: 0x3b2314, eye: 0x23232b },
  signature: { body: 0x6c5ce7, bodyAlt: 0x2f4f7f, accent: 0xff7675, glow: 0x74f2ff },
  parts: [
    ...humanoid({ legs: 'bodyAlt', shoes: 'white', torso: 'body', sleeves: 'body' }),
    // long hair
    hairCap(),
    box('hair', [0, 1.5, -0.33], [0.82, 0.85, 0.2]),
    box('hair', [0.4, 1.7, -0.05], [0.1, 0.5, 0.22]),
    box('hair', [-0.4, 1.7, -0.05], [0.1, 0.5, 0.22]),
    // glasses: frames, lenses, bridge
    box('dark', [0.17, 1.85, 0.385], [0.3, 0.22, 0.04]),
    box('dark', [-0.17, 1.85, 0.385], [0.3, 0.22, 0.04]),
    box('white', [0.17, 1.85, 0.4], [0.2, 0.14, 0.03]),
    box('white', [-0.17, 1.85, 0.4], [0.2, 0.14, 0.03]),
    box('dark', [0, 1.87, 0.4], [0.1, 0.04, 0.04]),
    // hoodie hood and pocket
    box('body', [0, 1.52, -0.28], [0.66, 0.26, 0.2]),
    box('bodyAlt', [0, 0.98, 0.27], [0.5, 0.2, 0.06]),
    // headphones around the neck
    box('accent', [0, 1.5, 0.3], [0.5, 0.1, 0.1]),
    sph('accent', [0.27, 1.42, 0.3], [0.2, 0.2, 0.14]),
    sph('accent', [-0.27, 1.42, 0.3], [0.2, 0.2, 0.14]),
    // laptop under the left arm (glowing screen on the outside)
    box('dark', [0.76, 1.08, 0.1], [0.1, 0.5, 0.62]),
    box('glow', [0.82, 1.08, 0.1], [0.04, 0.4, 0.52]),
  ],
};

const tecnico: CharacterDef = {
  id: 'tecnico',
  label: 'Técnico',
  blurb: 'Mecatrónica con casco y llave',
  height: 2.3,
  native: false,
  fixed: { skin: 0xb98055, hair: 0x1c1410, eye: 0x23232b },
  signature: { body: 0x3d5a80, bodyAlt: 0x4a5568, accent: 0xffb703, glow: 0xfff3b0 },
  parts: [
    ...humanoid({ legs: 'bodyAlt', shoes: 'dark', torso: 'body', sleeves: 'body' }),
    // overalls bib + straps and a reflective vest
    box('bodyAlt', [0, 1.22, 0.04], [0.88, 0.5, 0.48]),
    box('white', [0, 1.32, 0.04], [0.92, 0.08, 0.5]),
    box('glow', [0, 1.1, 0.04], [0.92, 0.07, 0.5]),
    box('white', [0.26, 1.35, 0.3], [0.1, 0.4, 0.05]),
    box('white', [-0.26, 1.35, 0.3], [0.1, 0.4, 0.05]),
    // tool belt with pouches
    box('dark', [0, 0.93, 0], [0.9, 0.1, 0.54]),
    box('dark', [0.36, 0.84, 0.3], [0.18, 0.2, 0.14]),
    box('dark', [-0.36, 0.84, 0.3], [0.18, 0.2, 0.14]),
    // sideburns and hard hat
    box('hair', [0.38, 1.82, -0.05], [0.06, 0.24, 0.2]),
    box('hair', [-0.38, 1.82, -0.05], [0.06, 0.24, 0.2]),
    sph('accent', [0, 2.09, 0], [0.9, 0.5, 0.9]),
    box('accent', [0, 1.93, 0.44], [0.54, 0.06, 0.28]),
    box('white', [0, 2.3, 0.0], [0.1, 0.06, 0.5]),
    // wrench in the right hand
    cyl('dark', [-0.58, 0.9, 0.24], [0.08, 0.62, 0.08], 'armR'),
    box('dark', [-0.58, 1.24, 0.24], [0.2, 0.12, 0.1], 'armR'),
  ],
};

const turista: CharacterDef = {
  id: 'turista',
  label: 'Turista',
  blurb: 'De paseo con sombrero y cámara',
  height: 2.3,
  native: false,
  fixed: { skin: 0xf3d2b5, hair: 0xe6c36a, eye: 0x23232b },
  signature: { body: 0xe4572e, bodyAlt: 0x2ec4b6, accent: 0xffd23f, glow: 0x9be7ff },
  parts: [
    // legs: shorts (palette) + bare calves (skin), sandals
    ...(() => {
      const p: Part[] = [];
      for (const s of sides) {
        p.push(box('body', [s * 0.27, 0.68, 0], [0.3, 0.36, 0.32], legOf(s)));
        p.push(box('skin', [s * 0.27, 0.34, 0], [0.2, 0.36, 0.22], legOf(s)));
        p.push(box('white', [s * 0.27, 0.07, 0.07], [0.3, 0.14, 0.5], legOf(s)));
        p.push(box('bodyAlt', [s * 0.58, 1.18, 0], [0.22, 0.56, 0.24], armOf(s)));
        p.push(sph('skin', [s * 0.58, 0.8, 0.02], [0.22, 0.22, 0.22], armOf(s)));
        p.push(box('dark', [s * 0.17, 1.86, 0.385], [0.26, 0.14, 0.04]));
      }
      return p;
    })(),
    // Hawaiian shirt with dots
    box('bodyAlt', [0, 1.2, 0], [0.84, 0.74, 0.5]),
    sph('accent', [-0.22, 1.42, 0.25], [0.12, 0.12, 0.06]),
    sph('accent', [0.2, 1.3, 0.25], [0.12, 0.12, 0.06]),
    sph('accent', [-0.1, 1.08, 0.25], [0.12, 0.12, 0.06]),
    sph('accent', [0.28, 1.0, 0.25], [0.12, 0.12, 0.06]),
    // head, nose, sunglasses bridge
    sph('skin', [0, 1.85, 0], [0.78, 0.78, 0.74]),
    sph('skin', [0, 1.77, 0.385], [0.09, 0.09, 0.08]),
    box('dark', [0, 1.88, 0.395], [0.12, 0.04, 0.04]),
    // wide-brim straw hat
    cyl('hair', [0, 2.05, 0], [1.36, 0.07, 1.36]),
    cyl('hair', [0, 2.2, 0], [0.78, 0.3, 0.78]),
    cyl('accent', [0, 2.12, 0], [0.8, 0.08, 0.8]),
    // camera on the chest
    box('dark', [0, 1.22, 0.34], [0.32, 0.2, 0.16]),
    sph('glow', [0, 1.22, 0.43], [0.13, 0.13, 0.1]),
    box('dark', [0, 1.45, 0.3], [0.5, 0.05, 0.05]),
    // backpack
    box('accent', [0, 1.15, -0.4], [0.7, 0.82, 0.3]),
    box('bodyAlt', [0, 0.95, -0.58], [0.46, 0.3, 0.08]),
  ],
};

const creativa: CharacterDef = {
  id: 'creativa',
  label: 'Creativa',
  blurb: 'Marketing con megáfono y gorra',
  height: 2.3,
  native: false,
  fixed: { skin: 0x7a4a2d, hair: 0x14100c, eye: 0x23232b },
  signature: { body: 0xff6b9d, bodyAlt: 0x3a3f58, accent: 0xffd166, glow: 0xff8fb8 },
  parts: [
    ...humanoid({ legs: 'bodyAlt', shoes: 'white', torso: 'white', sleeves: 'body' }),
    // colourful jacket over a white tee
    box('body', [0.3, 1.2, 0.04], [0.26, 0.72, 0.5]),
    box('body', [-0.3, 1.2, 0.04], [0.26, 0.72, 0.5]),
    box('accent', [0, 0.97, 0.3], [0.84, 0.07, 0.05]),
    // backwards cap
    sph('accent', [0, 2.09, -0.02], [0.88, 0.5, 0.88]),
    box('accent', [0, 1.97, -0.52], [0.5, 0.06, 0.28]),
    // short curly hair peeking out
    sph('hair', [0.38, 1.9, -0.05], [0.24, 0.24, 0.24]),
    sph('hair', [-0.38, 1.9, -0.05], [0.24, 0.24, 0.24]),
    sph('hair', [0.3, 1.74, -0.3], [0.24, 0.24, 0.24]),
    sph('hair', [-0.3, 1.74, -0.3], [0.24, 0.24, 0.24]),
    sph('hair', [0, 1.8, -0.4], [0.26, 0.26, 0.26]),
    sph('hair', [0.16, 2.0, 0.34], [0.2, 0.2, 0.2]),
    sph('hair', [-0.16, 2.0, 0.34], [0.2, 0.2, 0.2]),
    // earbuds
    sph('white', [0.4, 1.84, 0.02], [0.1, 0.1, 0.1]),
    sph('white', [-0.4, 1.84, 0.02], [0.1, 0.1, 0.1]),
    // megaphone in the right hand
    cone('accent', [-0.58, 1.0, 0.42], [0.46, 0.5, 0.46], 'armR', [-HALF_PI, 0, 0]),
    box('dark', [-0.58, 0.9, 0.12], [0.1, 0.22, 0.1], 'armR'),
    box('dark', [-0.58, 1.0, 0.16], [0.14, 0.14, 0.14], 'armR'),
    // phone-sized badge on the jacket
    box('glow', [0.3, 1.34, 0.3], [0.12, 0.12, 0.04]),
  ],
};

const estudiante: CharacterDef = {
  id: 'estudiante',
  label: 'Estudiante',
  blurb: 'Mochila grande y cuaderno',
  height: 2.3,
  native: false,
  fixed: { skin: 0xc68e5e, hair: 0x2a1b12, eye: 0x23232b },
  signature: { body: 0x2c6e9b, bodyAlt: 0x3b3f4a, accent: 0xe9622b, glow: 0xfff0a8 },
  parts: [
    ...humanoid({ legs: 'bodyAlt', shoes: 'white', torso: 'body', sleeves: 'body' }),
    hairCap(),
    box('hair', [0, 1.7, -0.33], [0.7, 0.4, 0.14]),
    // white collar and sweater hem
    box('white', [0, 1.5, 0.22], [0.5, 0.1, 0.1]),
    box('accent', [0, 1.3, 0.27], [0.1, 0.4, 0.04]),
    box('bodyAlt', [0, 0.88, 0.0], [0.86, 0.08, 0.52]),
    // big backpack with pocket and straps
    box('accent', [0, 1.14, -0.44], [0.8, 0.9, 0.36]),
    box('bodyAlt', [0, 0.92, -0.66], [0.5, 0.3, 0.1]),
    box('dark', [0.27, 1.25, 0.27], [0.1, 0.62, 0.05]),
    box('dark', [-0.27, 1.25, 0.27], [0.1, 0.62, 0.05]),
    // notebook in the left hand
    box('accent', [0.58, 0.96, 0.28], [0.34, 0.44, 0.05], 'armL'),
    box('white', [0.58, 0.96, 0.24], [0.3, 0.4, 0.05], 'armL'),
  ],
};

const gato: CharacterDef = {
  id: 'gato',
  label: 'Gato',
  blurb: 'Mascota curiosa que camina en dos patas',
  height: 2.3,
  native: false,
  fixed: { skin: 0xf0a04b, hair: 0x23232b, eye: 0x7bd96f },
  signature: { body: 0xf0a04b, bodyAlt: 0xfff0d6, accent: 0xff8fa3, glow: 0xffe27a },
  altLight: true,
  pivots: { tail: [0, 0.8, -0.35] },
  parts: [
    // legs and feet
    ...(() => {
      const p: Part[] = [];
      for (const s of sides) {
        p.push(cyl('body', [s * 0.25, 0.48, 0], [0.3, 0.72, 0.3], legOf(s)));
        p.push(sph('bodyAlt', [s * 0.25, 0.12, 0.08], [0.34, 0.24, 0.46], legOf(s)));
        p.push(cyl('body', [s * 0.52, 1.1, 0.04], [0.2, 0.56, 0.22], armOf(s)));
        p.push(sph('bodyAlt', [s * 0.52, 0.8, 0.06], [0.24, 0.22, 0.24], armOf(s)));
        // big eyes with pupils and glints
        p.push(sph('eye', [s * 0.22, 1.92, 0.36], [0.22, 0.28, 0.12]));
        p.push(sph('dark', [s * 0.22, 1.92, 0.42], [0.1, 0.2, 0.06]));
        p.push(sph('white', [s * 0.25, 1.98, 0.45], [0.05, 0.05, 0.04]));
        // ears: outer and pink inner
        p.push(cone('body', [s * 0.31, 2.19, -0.02], [0.32, 0.38, 0.22]));
        p.push(cone('accent', [s * 0.31, 2.17, 0.06], [0.17, 0.24, 0.1]));
        // whiskers
        p.push(box('dark', [s * 0.55, 1.8, 0.34], [0.34, 0.025, 0.025]));
        p.push(box('dark', [s * 0.55, 1.72, 0.32], [0.34, 0.025, 0.025]));
      }
      return p;
    })(),
    // body, belly, head
    sph('body', [0, 1.1, 0], [0.86, 0.92, 0.72]),
    sph('bodyAlt', [0, 1.05, 0.26], [0.56, 0.64, 0.2]),
    sph('body', [0, 1.88, 0], [1.0, 0.84, 0.84]),
    sph('accent', [0, 1.78, 0.43], [0.13, 0.09, 0.08]),
    box('dark', [0, 1.68, 0.4], [0.2, 0.025, 0.04]),
    // tail: curls up behind
    sph('body', [0, 0.78, -0.46], [0.22, 0.22, 0.22], 'tail'),
    sph('body', [0, 0.96, -0.6], [0.22, 0.22, 0.22], 'tail'),
    sph('body', [0, 1.2, -0.66], [0.22, 0.22, 0.22], 'tail'),
    sph('bodyAlt', [0, 1.44, -0.62], [0.26, 0.26, 0.26], 'tail'),
  ],
};

const dino: CharacterDef = {
  id: 'dino',
  label: 'Dino',
  blurb: 'Dinosaurio mascota de lomo con púas',
  height: 2.3,
  native: false,
  fixed: { skin: 0x6bbf59, hair: 0x23232b, eye: 0xffd23f },
  signature: { body: 0x6bbf59, bodyAlt: 0xf3e8b5, accent: 0xff8c42, glow: 0xfff0a8 },
  altLight: true,
  pivots: { tail: [0, 0.85, -0.4] },
  parts: [
    ...(() => {
      const p: Part[] = [];
      for (const s of sides) {
        p.push(cyl('body', [s * 0.27, 0.5, 0], [0.32, 0.74, 0.32], legOf(s)));
        p.push(box('bodyAlt', [s * 0.27, 0.1, 0.1], [0.36, 0.2, 0.52], legOf(s)));
        p.push(cyl('body', [s * 0.52, 1.15, 0.12], [0.18, 0.4, 0.2], armOf(s)));
        p.push(box('white', [s * 0.52, 0.93, 0.2], [0.1, 0.08, 0.06], armOf(s)));
        // eyes on the sides of the head
        p.push(sph('white', [s * 0.27, 2.0, 0.28], [0.22, 0.24, 0.14]));
        p.push(sph('dark', [s * 0.27, 2.0, 0.35], [0.11, 0.16, 0.06]));
        p.push(sph('eye', [s * 0.27, 2.0, 0.37], [0.05, 0.07, 0.04]));
        // nostrils
        p.push(box('dark', [s * 0.12, 1.82, 0.74], [0.06, 0.05, 0.04]));
      }
      return p;
    })(),
    // torso, belly
    sph('body', [0, 1.1, -0.02], [0.94, 1.0, 0.8]),
    sph('bodyAlt', [0, 1.04, 0.3], [0.6, 0.72, 0.2]),
    // head with a long snout and teeth
    sph('body', [0, 1.88, 0.0], [0.9, 0.82, 0.82]),
    sph('body', [0, 1.74, 0.5], [0.56, 0.4, 0.56]),
    box('dark', [0, 1.6, 0.58], [0.34, 0.025, 0.04]),
    box('white', [0.12, 1.6, 0.74], [0.06, 0.07, 0.04]),
    box('white', [-0.12, 1.6, 0.74], [0.06, 0.07, 0.04]),
    // dorsal spikes
    cone('accent', [0, 2.22, -0.3], [0.26, 0.34, 0.22]),
    cone('accent', [0, 1.7, -0.5], [0.26, 0.36, 0.22], undefined, [-HALF_PI, 0, 0]),
    cone('accent', [0, 1.2, -0.52], [0.28, 0.4, 0.24], undefined, [-HALF_PI, 0, 0]),
    // tail
    sph('body', [0, 0.8, -0.5], [0.5, 0.5, 0.5], 'tail'),
    sph('body', [0, 0.76, -0.86], [0.36, 0.36, 0.4], 'tail'),
    cone('body', [0, 0.74, -1.2], [0.28, 0.5, 0.28], 'tail', [-HALF_PI, 0, 0]),
  ],
};

export const CHARACTERS: readonly CharacterDef[] = [
  robot,
  programadora,
  tecnico,
  turista,
  creativa,
  estudiante,
  gato,
  dino,
];

const BY_ID = new Map<string, CharacterDef>(CHARACTERS.map((c) => [c.id, c]));

export function isCharacterId(id: unknown): id is CharacterId {
  return typeof id === 'string' && BY_ID.has(id);
}

/** The character with this id, or the default one when unknown. */
export function getCharacterDef(id: string | null | undefined): CharacterDef {
  return (id ? BY_ID.get(id) : undefined) ?? BY_ID.get(DEFAULT_CHARACTER_ID)!;
}

// --------------------------------------------------------------------------- colours

export type RoleColors = Record<PartRole, number>;

/** Roles recoloured by the palette (the rest are fixed per character). */
export const PALETTE_ROLES: readonly PartRole[] = ['body', 'bodyAlt', 'accent', 'glow'];

function mixHex(a: number, b: number, t: number): number {
  const ch = (shift: number): number => {
    const x = (a >> shift) & 255;
    const y = (b >> shift) & 255;
    return Math.round(x + (y - x) * t) & 255;
  };
  return (ch(16) << 16) | (ch(8) << 8) | ch(0);
}

/**
 * Hex colour of every role for `character` wearing the palette `paletteId` at `timeSeconds`.
 * Pure and deterministic: `clasico` keeps the character's own colours, the other palettes
 * recolour the body / bodyAlt / accent / glow roles, and `arcoiris` cycles them over
 * `RAINBOW_PERIOD`.
 */
export function resolveRoleColors(
  character: CharacterDef,
  palette: RobotSkin | RobotSkinId,
  timeSeconds: number,
): RoleColors {
  const skin = typeof palette === 'string' ? getRobotSkin(palette) : palette;
  const fixed: Pick<RoleColors, 'skin' | 'hair' | 'eye' | 'white' | 'dark'> = {
    skin: character.fixed.skin,
    hair: character.fixed.hair,
    eye: character.fixed.eye,
    white: WHITE,
    dark: DARK,
  };
  if (skin.original) return { ...fixed, ...character.signature };
  if (skin.animated) {
    const h = rainbowHue(timeSeconds);
    return {
      ...fixed,
      body: hsvToHex(h, 0.55, 0.95),
      bodyAlt: hsvToHex(h + 0.5, character.altLight ? 0.25 : 0.5, character.altLight ? 0.97 : 0.62),
      accent: hsvToHex(h + 0.25, 0.8, 1),
      glow: hsvToHex(h + 0.75, 0.65, 1),
    };
  }
  return {
    ...fixed,
    body: skin.panel,
    bodyAlt: character.altLight ? mixHex(skin.panel, 0xffffff, 0.6) : mixHex(skin.panel, skin.joint, 0.55),
    accent: skin.accent,
    glow: mixHex(skin.accent, 0xffffff, 0.25),
  };
}

export { RAINBOW_PERIOD };
