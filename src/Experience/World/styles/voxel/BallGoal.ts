import * as THREE from 'three';
import { VoxelBuilder, createGlowMaterial, staticLitMaterial, FACES_ALL } from './voxel.ts';
import {
  BALL_RADIUS,
  GOAL_X,
  GOAL_Z,
  GOAL_WIDTH,
  GOAL_HEIGHT,
  GOAL_DEPTH,
  POST,
} from '../shared/ballGoal.ts';

/** Voxel sphere of radius ~0.5 made of 0.2-sized cubes, centered at the origin. */
export function createBallVisual(): THREE.Object3D {
  const CUBE = 0.2;
  const RANGE = 2;
  const cells: [number, number, number][] = [];
  for (let i = -RANGE; i <= RANGE; i++) {
    for (let j = -RANGE; j <= RANGE; j++) {
      for (let k = -RANGE; k <= RANGE; k++) {
        const d = Math.hypot(i, j, k) * CUBE;
        if (d <= BALL_RADIUS) cells.push([i, j, k]);
      }
    }
  }

  // Black "pentagon" cubes: the surface cube closest to each icosahedron vertex
  const phi = (1 + Math.sqrt(5)) / 2;
  const dirs: THREE.Vector3[] = [];
  for (const [a, b] of [[1, phi], [1, -phi], [-1, phi], [-1, -phi]]) {
    dirs.push(new THREE.Vector3(0, a, b), new THREE.Vector3(a, b, 0), new THREE.Vector3(b, 0, a));
  }
  const black = new Set<string>();
  for (const dir of dirs) {
    dir.normalize();
    let best = cells[0];
    let bestDot = -Infinity;
    for (const c of cells) {
      const dot = c[0] * dir.x + c[1] * dir.y + c[2] * dir.z;
      if (dot > bestDot) {
        bestDot = dot;
        best = c;
      }
    }
    black.add(best.join(','));
  }

  const b = new VoxelBuilder(606, 0.03);
  for (const c of cells) {
    const isBlack = black.has(c.join(','));
    b.box(c[0] * CUBE, c[1] * CUBE, c[2] * CUBE, CUBE, CUBE, CUBE, isBlack ? 0x111111 : 0xffffff, FACES_ALL);
  }
  return b.build({ material: staticLitMaterial, castShadow: true, receiveShadow: false });
}

export function createGoalVisual(): THREE.Group {
  const goalGroup = new THREE.Group();
  const white = 0xffffff;
  const halfW = GOAL_WIDTH / 2;
  const backX = GOAL_X + GOAL_DEPTH;
  const midX = GOAL_X + GOAL_DEPTH / 2;

  // Frame: white / light-gray blocks of the post size
  const frame = new VoxelBuilder(707, 0.03);
  const netBuilder = new VoxelBuilder(708, 0);
  const NET_COLOR = 0xffffff;

  const addFrame = (
    size: [number, number, number],
    pos: [number, number, number],
  ): void => {
    frame.fill(pos[0], pos[1], pos[2], size[0], size[1], size[2], POST, (ix, iy, iz) =>
      (ix + iy + iz) & 1 ? white : 0xe4e4e4,
    );
  };

  // Net: a single layer of spaced half-blocks
  const addNet = (
    size: [number, number, number],
    pos: [number, number, number],
  ): void => {
    netBuilder.fill(pos[0], pos[1], pos[2], size[0], size[1], size[2], 0.5, NET_COLOR, { inset: 0.06 });
  };

  // Posts and crossbar
  for (const z of [GOAL_Z - halfW, GOAL_Z + halfW]) {
    addFrame([POST, GOAL_HEIGHT, POST], [GOAL_X, GOAL_HEIGHT / 2, z]);
  }
  addFrame([POST, POST, GOAL_WIDTH], [GOAL_X, GOAL_HEIGHT, GOAL_Z]);

  // Back net
  addNet([0.1, GOAL_HEIGHT, GOAL_WIDTH], [backX, GOAL_HEIGHT / 2, GOAL_Z]);

  // Side nets
  for (const z of [GOAL_Z - halfW, GOAL_Z + halfW]) {
    addNet([GOAL_DEPTH, GOAL_HEIGHT, 0.1], [midX, GOAL_HEIGHT / 2, z]);
  }

  goalGroup.add(frame.build({ material: staticLitMaterial, receiveShadow: false }));
  goalGroup.add(
    netBuilder.build({
      material: createGlowMaterial({
        transparent: true,
        opacity: 0.3,
        side: THREE.DoubleSide,
        depthWrite: false,
      }, false),
      castShadow: false,
      receiveShadow: false,
    }),
  );
  return goalGroup;
}
