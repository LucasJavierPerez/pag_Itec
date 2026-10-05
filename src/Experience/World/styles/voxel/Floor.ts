import * as THREE from 'three';
import type { PhysicsBodyDesc, FloorResult } from '../types.ts';
import { VoxelBuilder, FACES_TOP_ONLY, staticLitMaterial } from './voxel.ts';

const SAND = [0xe8d6a8, 0xe2cf9d];
const GRASS_A = [0x8fd14f, 0x84c846];
const GRASS_B = [0x7bc043, 0x72b73b];
const STONE = [0xd8d1c2, 0xcdc5b4];

interface GrassPatch {
  x: number;
  z: number;
  w: number;
  h: number;
  tones: number[];
}

const GRASS_PATCHES: GrassPatch[] = [
  { x: -35, z: -35, w: 20, h: 18, tones: GRASS_A },
  { x: 35, z: -35, w: 20, h: 18, tones: GRASS_B },
  { x: -38, z: 35, w: 16, h: 16, tones: GRASS_A },
  { x: 38, z: 35, w: 16, h: 16, tones: GRASS_B },
  { x: -40, z: 10, w: 10, h: 12, tones: GRASS_A },
  { x: 40, z: -10, w: 10, h: 12, tones: GRASS_B },
  { x: 0, z: 40, w: 25, h: 12, tones: GRASS_A },
  { x: 0, z: -42, w: 20, h: 8, tones: GRASS_B },
];

export function createFloor(): FloorResult {
  const group = new THREE.Group();
  const bodies: PhysicsBodyDesc[] = [];

  // --- Terrain: 1 x 1 flat blocks with a dark seam slab underneath ----------
  const terrain = new VoxelBuilder(11, 0.05);
  // Seam slab, its top sits just below the tiles so grooves read as grid lines
  // (own static mesh: it is far bigger than a voxel, so it stays put while the tiles assemble)
  const seam = new VoxelBuilder(10, 0.05);
  seam.box(0, -0.3, 0, 100, 0.5, 100, 0xb9a577);
  group.add(seam.build({ material: staticLitMaterial, castShadow: false, receiveShadow: true }));

  const TILE = 0.94;
  for (let x = -49; x <= 49; x++) {
    for (let z = -49; z <= 49; z++) {
      let tones = SAND;
      for (const p of GRASS_PATCHES) {
        if (Math.abs(x - p.x) <= p.w / 2 && Math.abs(z - p.z) <= p.h / 2) {
          tones = p.tones;
          break;
        }
      }
      // Light stone path under the main hallway / patio
      if (Math.abs(x) <= 2 && z >= -35 && z <= 24) tones = STONE;

      const tone = tones[(x + z) & 1 ? 1 : 0];
      terrain.box(x, -0.05, z, TILE, 0.1, TILE, tone, FACES_TOP_ONLY);
    }
  }
  group.add(terrain.build({ castShadow: false, receiveShadow: true }));

  // Floor physics (thin box at y=0)
  bodies.push({
    position: { x: 0, y: -0.5, z: 0 },
    size: { x: 100, y: 1, z: 100 },
  });

  // --- Border walls: stacked 1 x 1 blocks with alternating tint -------------
  const wallHeight = 2;
  const wallThickness = 1;
  const halfFloor = 50;
  const BRICK_A = 0x9aa5a6;
  const BRICK_B = 0x848f91;
  const CAP = 0xaeb8b9;

  const wallDefs: { pos: [number, number, number]; size: [number, number, number] }[] = [
    { pos: [0, wallHeight / 2, halfFloor], size: [100, wallHeight, wallThickness] },
    { pos: [0, wallHeight / 2, -halfFloor], size: [100, wallHeight, wallThickness] },
    { pos: [halfFloor, wallHeight / 2, 0], size: [wallThickness, wallHeight, 100] },
    { pos: [-halfFloor, wallHeight / 2, 0], size: [wallThickness, wallHeight, 100] },
  ];

  const walls = new VoxelBuilder(12, 0.04);
  for (const def of wallDefs) {
    const alongX = def.size[0] > def.size[2];
    walls.fill(
      def.pos[0],
      def.pos[1],
      def.pos[2],
      def.size[0],
      def.size[1],
      def.size[2],
      1,
      (ix, iy, iz) => {
        const i = alongX ? ix : iz;
        if (iy === wallHeight - 1) return (i & 1) === 0 ? CAP : BRICK_A;
        // Staggered rows like brickwork
        return ((i + iy) & 1) === 0 ? BRICK_A : BRICK_B;
      },
    );

    bodies.push({
      position: { x: def.pos[0], y: def.pos[1], z: def.pos[2] },
      size: { x: def.size[0], y: def.size[1], z: def.size[2] },
    });
  }
  group.add(walls.build());

  return { meshGroup: group, physicsBodies: bodies };
}
