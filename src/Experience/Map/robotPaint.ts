import * as THREE from 'three';
import { accentAt } from './skins/robotSkins.ts';
import type { RobotSkin } from './skins/robotSkins.ts';

/**
 * Recolors a robot (any of the four style robots) by ROLE: body panels, joints, dark parts, the
 * gray base and the glowing accent. Roles are recognised from the source materials (standard
 * materials by their color / emissive) or from the baked vertex colors (voxel robot).
 * The painter only mutates the materials / geometries of the group it was built for.
 */

type Role = 'panel' | 'joint' | 'dark' | 'gray' | 'accent';

const luma = (c: THREE.Color): number => (c.r + c.g + c.b) / 3;

/** Reference colors of the voxel robot (its colors live in vertex attributes). */
const VOXEL_ROLES: { role: Role; color: THREE.Color }[] = [
  { role: 'panel', color: new THREE.Color(0xf4f4f0) },
  { role: 'joint', color: new THREE.Color(0x222222) },
  { role: 'dark', color: new THREE.Color(0x3a3a3a) },
  { role: 'gray', color: new THREE.Color(0x8a8a8a) },
  { role: 'accent', color: new THREE.Color(0x3498db) },
];

/** Role of a standard material from its (linear) color: thresholds fit the four style robots. */
function roleOfMaterial(m: THREE.MeshStandardMaterial): Role {
  if (luma(m.emissive) > 0.02 && m.emissiveIntensity > 0) return 'accent';
  const l = luma(m.color);
  // Linear-space averages: panels ~0.87-0.91, gray ~0.23-0.25, dark ~0.02-0.04, black ~0.01-0.02
  if (l > 0.5) return 'panel';
  if (l > 0.12) return 'gray';
  if (l > 0.026) return 'dark';
  return 'joint';
}

interface MaterialBinding {
  material: THREE.MeshStandardMaterial;
  role: Role;
  baseColor: THREE.Color;
  baseEmissive: THREE.Color;
  baseIntensity: number;
}

interface VertexBinding {
  geometry: THREE.BufferGeometry;
  attribute: THREE.BufferAttribute;
  roles: Uint8Array;
  /** Brightness of each vertex relative to its role reference (keeps the baked jitter). */
  gain: Float32Array;
  base: Float32Array;
  /** Indices of the accent vertices (the only ones an animated skin touches). */
  accent: Uint32Array;
}

const ROLE_INDEX: Role[] = VOXEL_ROLES.map((r) => r.role);

const mix = (a: number, b: number, t: number): number => new THREE.Color(a).lerp(new THREE.Color(b), t).getHex();

export class RobotPainter {
  private _materials: MaterialBinding[] = [];
  private _vertices: VertexBinding[] = [];
  private _skin: RobotSkin | null = null;
  private _color = new THREE.Color();
  private _lastAccent = -1;

  constructor(root: THREE.Object3D) {
    const seen = new Set<THREE.Material>();
    root.traverse((o) => {
      const mesh = o as THREE.Mesh;
      if (!mesh.isMesh || Array.isArray(mesh.material)) return;
      const material = mesh.material;
      const colors = mesh.geometry.getAttribute('color') as THREE.BufferAttribute | undefined;
      if (colors && (material as THREE.MeshBasicMaterial).vertexColors) {
        this._bindVertices(mesh.geometry, colors);
        return;
      }
      const std = material as THREE.MeshStandardMaterial;
      if (seen.has(material) || !std.color || !std.emissive) return;
      seen.add(material);
      this._materials.push({
        material: std,
        role: roleOfMaterial(std),
        baseColor: std.color.clone(),
        baseEmissive: std.emissive.clone(),
        baseIntensity: std.emissiveIntensity ?? 1,
      });
    });
  }

  private _bindVertices(geometry: THREE.BufferGeometry, attribute: THREE.BufferAttribute): void {
    const n = attribute.count;
    const base = new Float32Array(n * 3);
    const roles = new Uint8Array(n);
    const gain = new Float32Array(n);
    const c = new THREE.Color();
    for (let i = 0; i < n; i++) {
      c.setRGB(attribute.getX(i), attribute.getY(i), attribute.getZ(i), THREE.LinearSRGBColorSpace);
      base[i * 3] = c.r;
      base[i * 3 + 1] = c.g;
      base[i * 3 + 2] = c.b;
      let best = 0;
      let bestD = Infinity;
      for (let r = 0; r < VOXEL_ROLES.length; r++) {
        const ref = VOXEL_ROLES[r].color;
        const d = (c.r - ref.r) ** 2 + (c.g - ref.g) ** 2 + (c.b - ref.b) ** 2;
        if (d < bestD) {
          bestD = d;
          best = r;
        }
      }
      roles[i] = best;
      const refLuma = luma(VOXEL_ROLES[best].color) || 1;
      gain[i] = luma(c) / refLuma;
    }
    const accentIdx: number[] = [];
    for (let i = 0; i < n; i++) if (ROLE_INDEX[roles[i]] === 'accent') accentIdx.push(i);
    this._vertices.push({ geometry, attribute, roles, gain, base, accent: Uint32Array.from(accentIdx) });
  }

  /** Applies `skin` (call again after every change; call `update` per frame for animated skins). */
  apply(skin: RobotSkin, timeSec = 0): void {
    this._skin = skin;
    this._lastAccent = -1;
    const colorOf = (role: Role): number => {
      switch (role) {
        case 'panel':
          return skin.panel;
        case 'joint':
          return skin.joint;
        case 'dark':
          return mix(skin.joint, skin.panel, 0.18);
        case 'gray':
          return mix(skin.joint, skin.panel, 0.5);
        default:
          return accentAt(skin, timeSec);
      }
    };

    for (const b of this._materials) {
      if (skin.original) {
        b.material.color.copy(b.baseColor);
        b.material.emissive.copy(b.baseEmissive);
        b.material.emissiveIntensity = b.baseIntensity;
        continue;
      }
      const hex = colorOf(b.role);
      b.material.color.setHex(hex);
      if (b.role === 'accent') {
        b.material.emissive.setHex(hex);
        b.material.emissiveIntensity = b.baseIntensity * skin.emissive;
      }
    }

    for (const v of this._vertices) this._paintVertices(v, skin, colorOf);
  }

  private _paintVertices(v: VertexBinding, skin: RobotSkin, colorOf: (role: Role) => number): void {
    const arr = v.attribute.array as Float32Array;
    if (skin.original) {
      arr.set(v.base);
    } else {
      const palette = ROLE_INDEX.map((role) => new THREE.Color(colorOf(role)));
      for (let i = 0; i < v.roles.length; i++) {
        const c = palette[v.roles[i]];
        const g = v.gain[i];
        arr[i * 3] = Math.min(1, c.r * g);
        arr[i * 3 + 1] = Math.min(1, c.g * g);
        arr[i * 3 + 2] = Math.min(1, c.b * g);
      }
    }
    v.attribute.needsUpdate = true;
  }

  /** Animated skins (rainbow): re-tints only the accent parts. Cheap enough to call every frame. */
  update(timeSec: number): void {
    const skin = this._skin;
    if (!skin || !skin.animated) return;
    const hex = accentAt(skin, timeSec);
    if (hex === this._lastAccent) return;
    this._lastAccent = hex;
    for (const b of this._materials) {
      if (b.role !== 'accent') continue;
      b.material.color.setHex(hex);
      b.material.emissive.setHex(hex);
    }
    this._color.setHex(hex);
    for (const v of this._vertices) {
      const arr = v.attribute.array as Float32Array;
      for (let k = 0; k < v.accent.length; k++) {
        const i = v.accent[k];
        const g = v.gain[i];
        arr[i * 3] = Math.min(1, this._color.r * g);
        arr[i * 3 + 1] = Math.min(1, this._color.g * g);
        arr[i * 3 + 2] = Math.min(1, this._color.b * g);
      }
      if (v.accent.length > 0) v.attribute.needsUpdate = true;
    }
  }
}
