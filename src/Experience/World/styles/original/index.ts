import * as THREE from 'three';
import type { StyleModule } from '../types.ts';
import { createFloor } from './Floor.ts';
import { createClassrooms, getClassroomPositions } from './Classrooms.ts';
import { createRobotMesh } from './Robot.ts';
import { Environment } from './Environment.ts';
import { Lights } from './Lights.ts';
import { createBallVisual, createGoalVisual } from './BallGoal.ts';
import { createSignature } from './Signature.ts';

export const originalStyle: StyleModule = {
  id: 'original',
  label: 'Original',
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
    bloom: { strength: 0.25, radius: 0.5, threshold: 0.92 },
    vignette: { offset: 0.55, darkness: 0.28 },
    grain: 0.03,
    aberration: 0.0015,
    dof: { aperture: 0.0003, maxblur: 0.004 },
    pixel: { size: 1, levels: 0 },
  },
  scene: { background: 0xf0e6d3, fogColor: 0xf0e6d3, fogNear: 60, fogFar: 120 },
  renderer: {
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.2,
    shadowMapType: THREE.PCFSoftShadowMap,
  },
};
