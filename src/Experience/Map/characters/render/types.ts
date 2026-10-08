import type * as THREE from 'three';
import type { CharacterDef, Limb, PartRole } from '../characterSpec.ts';

/** One mesh worth of geometry plus the colour role of every vertex. */
export interface GeoPiece {
  /** Animated limb this piece belongs to (geometry is relative to the limb pivot), or null. */
  limb: Limb | null;
  /**
   * 'vertex': coloured through the `color` attribute (re-painted in place);
   * a role: uniform-coloured by that role's material colour (no `color` attribute).
   */
  paint: 'vertex' | PartRole;
  /** Unlit glowing voxels (voxel style): vertex-coloured but rendered with the glow material. */
  glow?: boolean;
  geometry: THREE.BufferGeometry;
  /** Role index (see `ROLE_ORDER`) per vertex. */
  roles: Uint8Array;
  /** Brightness multiplier per vertex (baked block variation). */
  gains: Float32Array;
}

/** What differs between the four visual styles. */
export interface StyleRenderer {
  /** Splits the character into geometry pieces; limbs only when `animated`. */
  pieces(def: CharacterDef, animated: boolean): GeoPiece[];
  /** Material of the vertex-coloured pieces. */
  createMainMaterial(): THREE.Material;
  /** Material of a piece: role-coloured ones set `color` (+ `emissive` when `glowy`) from the palette. */
  createPieceMaterial(piece: GeoPiece): THREE.Material;
  /** Thin dark inverted hull around the static body (high quality only). */
  outline: boolean;
}
