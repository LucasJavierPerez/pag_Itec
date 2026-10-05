import * as THREE from 'three';
import type { RobotMeshResult } from '../types.ts';
import { VoxelBuilder, createGlowMaterial, staticLitMaterial, FACES_ALL } from './voxel.ts';

/** Voxel unit of the robot (one cube edge). */
const U = 0.2;
/** The thin base plate lifts the whole body by this amount. */
const BASE_H = 0.1;

const WHITE = 0xf4f4f0;
const BLACK = 0x222222;
const DARK = 0x3a3a3a;
const GRAY = 0x8a8a8a;
const BLUE = 0x3498db;

export function createRobotMesh(): RobotMeshResult {
  const robot = new THREE.Group();

  const body = new VoxelBuilder(404, 0.03);
  const glow = new VoxelBuilder(405, 0);

  /**
   * Places a cube-grid box. Coordinates are in voxel units, `x0/y0/z0` is the
   * min corner (y counted from the top of the base plate), w/h/d the size.
   */
  const cube = (
    b: VoxelBuilder,
    x0: number,
    y0: number,
    z0: number,
    w: number,
    h: number,
    d: number,
    color: number,
  ): void => {
    b.box(
      (x0 + w / 2) * U,
      BASE_H + (y0 + h / 2) * U,
      (z0 + d / 2) * U,
      w * U,
      h * U,
      d * U,
      color,
      FACES_ALL,
    );
  };

  // Square base plate (6 x 6 voxels wide, half a voxel thick)
  body.box(0, BASE_H / 2, 0, 6 * U, BASE_H, 6 * U, GRAY);

  for (const s of [-1, 1]) {
    const lx = s === -1 ? -2 : 1; // leg column min x (1 voxel wide)
    // Foot (dark), toe sticks out front
    cube(body, lx, 0, -1.5, 1, 1, 4, DARK);
    // Shin
    cube(body, lx, 1, -1, 1, 1, 2, WHITE);
    // Knee joint
    cube(body, lx, 2, -1, 1, 1, 2, BLACK);
    // Thigh
    cube(body, lx, 3, -1, 1, 1, 2, WHITE);
  }

  // Waist (dark)
  cube(body, -2, 4, -1.5, 4, 1, 3, DARK);
  // Torso
  cube(body, -2, 5, -1.5, 4, 3, 3, WHITE);
  // Panel seam: vertical black stripe down the back and a belt line
  cube(body, -2, 5, -1.5, 4, 0.5, 3.05, BLACK);
  cube(body, -0.25, 6, -1.55, 0.5, 2, 0.05, BLACK);

  // Chest core: 2 x 2 glowing cubes on the front (+Z), framed by black
  cube(body, -1.5, 5.5, 1.5, 3, 2.5, 0.25, BLACK);
  for (const cx of [-1, 0]) {
    for (const cy of [6, 7]) {
      cube(glow, cx, cy - 0.25, 1.5, 1, 1, 0.5, BLUE);
    }
  }

  // Arms: shoulder, upper arm, elbow, forearm, hand
  for (const s of [-1, 1]) {
    const ax = s === -1 ? -3 : 2;
    cube(body, ax, 7, -0.5, 1, 1, 1, BLACK);
    cube(body, ax, 6, -0.5, 1, 1, 1, WHITE);
    cube(body, ax, 5, -0.5, 1, 1, 1, BLACK);
    cube(body, ax, 4, -0.5, 1, 1, 1, WHITE);
    cube(body, ax, 3, -0.5, 1, 1, 1, WHITE);
  }

  // Neck
  cube(body, -1, 8, -1, 2, 1, 2, BLACK);

  // Head: blocky, 4 x 2 x 4 voxels
  cube(body, -2, 9, -2, 4, 2, 4, WHITE);
  // Black visor strip behind the eyes
  cube(body, -2, 9.5, 1.9, 4, 1, 0.15, BLACK);
  // Eyes: two glowing cubes poking out of the front
  for (const ex of [-1.5, 0.5]) {
    cube(glow, ex, 9.5, 2, 1, 1, 0.5, BLUE);
  }

  const bodyMesh = body.build({ material: staticLitMaterial, castShadow: true, receiveShadow: false });
  robot.add(bodyMesh);
  const glowMesh = glow.build({
    material: createGlowMaterial({}, false),
    castShadow: false,
    receiveShadow: false,
  });
  robot.add(glowMesh);

  const coreLight = new THREE.PointLight(0x3498db, 1, 5);
  coreLight.position.set(0, BASE_H + 6.5 * U, 0.35 + 0.25);
  robot.add(coreLight);

  const getBounceOffset = (time: number): number => {
    return Math.sin(time * 2) * 0.03;
  };

  return { group: robot, getBounceOffset };
}
