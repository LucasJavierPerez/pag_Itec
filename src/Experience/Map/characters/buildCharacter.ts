import * as THREE from 'three';
import type { StyleId } from '../../World/styles/types.ts';
import type { MapQuality } from '../skins/types.ts';
import { getRobotSkin } from '../skins/robotSkins.ts';
import type { RobotSkin, RobotSkinId } from '../skins/robotSkins.ts';
import { PALETTE_ROLES, ROLE_ORDER, getCharacterDef, resolveRoleColors } from './characterSpec.ts';
import type { CharacterDef, CharacterId, Limb, PartRole, RoleColors } from './characterSpec.ts';
import { pivotOf } from './render/primitives.ts';
import { cinematicRenderer } from './render/cinematic.ts';
import { lowpolyRenderer } from './render/lowpoly.ts';
import { originalRenderer } from './render/original.ts';
import { voxelRenderer } from './render/voxel.ts';
import type { GeoPiece, StyleRenderer } from './render/types.ts';

const RENDERERS: Record<StyleId, StyleRenderer> = {
  voxel: voxelRenderer,
  lowpoly: lowpolyRenderer,
  original: originalRenderer,
  cinematic: cinematicRenderer,
};

/** Seconds between repaints of an animated palette (rainbow). */
const RAINBOW_STEP = 1 / 20;
/** Push of the outline hull along the normals. */
const OUTLINE_THICKNESS = 0.035;
const OUTLINE_COLOR = 0x2a2f3d;
/** Peak limb swings (radians) at full speed. */
const LEG_SWING = 0.8;
const ARM_SWING = 0.7;

const PALETTE_INDEX = new Set(PALETTE_ROLES.map((r) => ROLE_ORDER.indexOf(r)));

export interface BuildCharacterOptions {
  characterId: CharacterId;
  paletteId: RobotSkinId;
  styleId: StyleId;
  timeSeconds?: number;
  quality?: MapQuality;
}

export interface CharacterMotion {
  /** 0 = standing, 1 = full run (scales the limb swing). */
  speed01: number;
  /** 0..1: how much the right arm is raised (greeting). */
  wave?: number;
  /** Stride phase in radians; defaults to an internal clock driven by `speed01`. */
  phase?: number;
  /** prefers-reduced-motion: no swinging, the greeting is a held pose. */
  reduced?: boolean;
}

export interface CharacterInstance {
  /** Origin at the feet, ~2.3 tall, front on +Z (add it where a robot would go). */
  readonly group: THREE.Group;
  readonly characterId: CharacterId;
  /** Meshes drawn per frame (hull and glow pieces included). */
  readonly drawCalls: number;
  update(dt: number, timeSeconds: number): void;
  setPalette(paletteId: RobotSkinId): void;
  setMotion(motion: CharacterMotion): void;
  dispose(): void;
}

interface VertexTarget {
  attribute: THREE.BufferAttribute;
  roles: Uint8Array;
  gains: Float32Array;
  /** Vertices whose colour comes from the palette (the only ones a rainbow repaints). */
  palette: Uint32Array;
}

interface RoleTarget {
  role: PartRole;
  material: THREE.MeshStandardMaterial;
}

class Character implements CharacterInstance {
  readonly group = new THREE.Group();
  readonly characterId: CharacterId;
  drawCalls = 0;

  private _def: CharacterDef;
  private _palette: RobotSkin;
  private _body = new THREE.Group();
  private _limbs = new Map<Limb, THREE.Group>();
  private _vertex: VertexTarget[] = [];
  private _roles: RoleTarget[] = [];
  private _geometries: THREE.BufferGeometry[] = [];
  private _materials: THREE.Material[] = [];
  private _rgb = new Float32Array(ROLE_ORDER.length * 3);
  private _colors!: RoleColors;
  private _tmp = new THREE.Color();
  private _lastPaint = -Infinity;
  private _time = 0;
  private _animated: boolean;

  // Motion
  private _speed = 0;
  private _speedTarget = 0;
  private _wave = 0;
  private _waveTarget = 0;
  private _phase = 0;
  private _phaseGiven: number | null = null;
  private _reduced = false;

  constructor(o: BuildCharacterOptions) {
    this.characterId = o.characterId;
    this._def = getCharacterDef(o.characterId);
    if (this._def.native) throw new Error('The robot is built by its style, not by buildCharacter');
    this._palette = getRobotSkin(o.paletteId);
    this._animated = (o.quality ?? 'high') === 'high';
    this.group.add(this._body);

    const renderer = RENDERERS[o.styleId];
    const mainMaterial = renderer.createMainMaterial();
    this._materials.push(mainMaterial);
    let hullSource: GeoPiece | null = null;

    for (const piece of renderer.pieces(this._def, this._animated)) {
      this._geometries.push(piece.geometry);
      const vertex = piece.paint === 'vertex';
      let material: THREE.Material = mainMaterial;
      if (!vertex || piece.glow) {
        material = renderer.createPieceMaterial(piece);
        this._materials.push(material);
      }
      if (vertex) this._addVertexTarget(piece);
      else this._roles.push({ role: piece.paint as PartRole, material: material as THREE.MeshStandardMaterial });

      const mesh = new THREE.Mesh(piece.geometry, material);
      mesh.castShadow = true;
      if (piece.limb) {
        const pivot = new THREE.Group();
        pivot.position.fromArray(pivotOf(this._def, piece.limb));
        pivot.add(mesh);
        this._body.add(pivot);
        this._limbs.set(piece.limb, pivot);
      } else {
        this._body.add(mesh);
        if (vertex && !piece.glow) hullSource = piece;
      }
      this.drawCalls++;
    }

    if (renderer.outline && this._animated && hullSource) this._addHull(hullSource.geometry);

    this._time = o.timeSeconds ?? 0;
    this._resolve(this._time);
    this._paint(false);
  }

  private _addVertexTarget(piece: GeoPiece): void {
    const count = piece.geometry.attributes.position.count;
    const attribute = new THREE.BufferAttribute(new Float32Array(count * 3), 3);
    piece.geometry.setAttribute('color', attribute);
    const palette: number[] = [];
    for (let i = 0; i < count; i++) if (PALETTE_INDEX.has(piece.roles[i])) palette.push(i);
    this._vertex.push({ attribute, roles: piece.roles, gains: piece.gains, palette: Uint32Array.from(palette) });
  }

  private _addHull(source: THREE.BufferGeometry): void {
    const geometry = source.clone();
    geometry.deleteAttribute('color');
    const pos = geometry.attributes.position as THREE.BufferAttribute;
    const nor = geometry.attributes.normal as THREE.BufferAttribute;
    for (let i = 0; i < pos.count; i++) {
      pos.setXYZ(
        i,
        pos.getX(i) + nor.getX(i) * OUTLINE_THICKNESS,
        pos.getY(i) + nor.getY(i) * OUTLINE_THICKNESS,
        pos.getZ(i) + nor.getZ(i) * OUTLINE_THICKNESS,
      );
    }
    const material = new THREE.MeshBasicMaterial({ color: OUTLINE_COLOR, side: THREE.BackSide });
    const hull = new THREE.Mesh(geometry, material);
    hull.userData.noShadow = true;
    this._geometries.push(geometry);
    this._materials.push(material);
    this._body.add(hull);
    this.drawCalls++;
  }

  // ------------------------------------------------------------------ colour

  private _resolve(time: number): void {
    this._colors = resolveRoleColors(this._def, this._palette, time);
    ROLE_ORDER.forEach((role, i) => {
      this._tmp.setHex(this._colors[role]);
      this._rgb[i * 3] = this._tmp.r;
      this._rgb[i * 3 + 1] = this._tmp.g;
      this._rgb[i * 3 + 2] = this._tmp.b;
    });
  }

  /** Writes the resolved colours; `paletteOnly` skips the fixed roles (rainbow frames). */
  private _paint(paletteOnly: boolean): void {
    const rgb = this._rgb;
    for (const t of this._vertex) {
      const write = (i: number): void => {
        const r = t.roles[i] * 3;
        const g = t.gains[i];
        t.attribute.setXYZ(i, Math.min(1, rgb[r] * g), Math.min(1, rgb[r + 1] * g), Math.min(1, rgb[r + 2] * g));
      };
      if (paletteOnly) for (let k = 0; k < t.palette.length; k++) write(t.palette[k]);
      else for (let i = 0; i < t.roles.length; i++) write(i);
      t.attribute.needsUpdate = true;
    }
    for (const t of this._roles) {
      if (paletteOnly && !PALETTE_ROLES.includes(t.role)) continue;
      const hex = this._colors[t.role];
      t.material.color.setHex(hex);
      if (t.material.userData.glowy) t.material.emissive.setHex(hex);
    }
  }

  setPalette(paletteId: RobotSkinId): void {
    this._palette = getRobotSkin(paletteId);
    this._resolve(this._time);
    this._paint(false);
  }

  // ------------------------------------------------------------------ motion

  setMotion(m: CharacterMotion): void {
    this._speedTarget = Math.max(0, Math.min(1, m.speed01));
    this._waveTarget = Math.max(0, Math.min(1, m.wave ?? 0));
    this._phaseGiven = m.phase ?? null;
    this._reduced = !!m.reduced;
  }

  update(dt: number, time: number): void {
    this._time = time;
    if (this._palette.animated && time - this._lastPaint >= RAINBOW_STEP) {
      this._lastPaint = time;
      this._resolve(time);
      this._paint(true);
    }
    if (!this._animated) return;

    const blend = 1 - Math.exp(-10 * Math.min(dt, 0.1));
    this._speed += (this._speedTarget - this._speed) * blend;
    this._wave += (this._waveTarget - this._wave) * blend;
    if (this._phaseGiven !== null) this._phase = this._phaseGiven;
    else this._phase += dt * Math.PI * 2 * 3.4 * (0.35 + 0.65 * this._speed);

    const moving = this._reduced ? 0 : this._speed;
    const swing = Math.sin(this._phase) * moving;
    const rot = (limb: Limb, x: number, y = 0, z = 0): void => {
      this._limbs.get(limb)?.rotation.set(x, y, z);
    };
    rot('legL', swing * LEG_SWING);
    rot('legR', -swing * LEG_SWING);
    rot('armL', -swing * ARM_SWING);
    const flap = this._reduced ? 0 : Math.sin(time * 12) * 0.35;
    rot('armR', swing * ARM_SWING * (1 - this._wave), 0, -this._wave * (2.4 + flap));
    const wag = this._reduced ? 0 : Math.sin(time * (3 + 4 * this._speed)) * (0.3 + 0.25 * this._speed);
    rot('tail', this._reduced ? 0 : -0.1 * this._speed, wag);

    // Idle breathing, fading out while running
    this._body.scale.y = 1 + (this._reduced ? 0 : Math.sin(time * 2.2) * 0.012 * (1 - this._speed));
  }

  dispose(): void {
    for (const g of this._geometries) g.dispose();
    for (const m of this._materials) m.dispose();
    this._geometries = [];
    this._materials = [];
    this._vertex = [];
    this._roles = [];
    this._limbs.clear();
    this.group.clear();
    this.group.parent?.remove(this.group);
  }
}

/** Builds a (non-robot) character in the given style, ready to be added to a scene. */
export function buildCharacter(options: BuildCharacterOptions): CharacterInstance {
  return new Character(options);
}
