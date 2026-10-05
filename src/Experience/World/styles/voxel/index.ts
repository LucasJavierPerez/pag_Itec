import * as THREE from 'three';
import type { StyleModule } from '../types.ts';
import { createFloor } from './Floor.ts';
import { createClassrooms, getClassroomPositions } from './Classrooms.ts';
import { createRobotMesh } from './Robot.ts';
import { Environment } from './Environment.ts';
import { Lights } from './Lights.ts';
import { createBallVisual, createGoalVisual } from './BallGoal.ts';
import { createSignature } from './Signature.ts';

export const voxelStyle: StyleModule = {
  id: 'voxel',
  label: 'Voxel',
  createFloor,
  createClassrooms,
  getClassroomPositions,
  createRobot: createRobotMesh,
  createEnvironment: (scene: THREE.Scene) => new Environment(scene),
  createLights: (scene: THREE.Scene, classroomPositions: { x: number; z: number }[]) =>
    new Lights(scene, classroomPositions),
  createBallVisual,
  createGoalVisual,
  createSignature,
  accent: 0xf5b041,
  post: {
    bloom: { strength: 0.35, radius: 0.3, threshold: 0.9 },
    vignette: { offset: 0.6, darkness: 0.18 },
    grain: 0.006,
    aberration: 0.0,
    dof: { aperture: 0, maxblur: 0 },
    pixel: { size: 2, levels: 28 },
  },
  scene: { background: 0xd6efff, fogColor: 0xd6efff, fogNear: 60, fogFar: 120 },
  renderer: {
    toneMapping: THREE.NoToneMapping,
    toneMappingExposure: 1,
    shadowMapType: THREE.PCFShadowMap,
  },
};
