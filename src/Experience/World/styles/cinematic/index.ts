import * as THREE from 'three';
import type { StyleModule } from '../types.ts';
import { createFloor } from './Floor.ts';
import { createClassrooms, getClassroomPositions } from './Classrooms.ts';
import { createRobotMesh } from './Robot.ts';
import { Environment } from './Environment.ts';
import { Lights } from './Lights.ts';
import { createBallVisual, createGoalVisual } from './BallGoal.ts';
import { createSignature } from './Signature.ts';

export const cinematicStyle: StyleModule = {
  id: 'cinematic',
  label: 'Cinemático',
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
  accent: 0x4fd8ff,
  post: {
    bloom: { strength: 0.6, radius: 0.8, threshold: 0.75 },
    vignette: { offset: 0.4, darkness: 0.55 },
    grain: 0.09,
    aberration: 0.003,
    dof: { aperture: 0, maxblur: 0 },
    pixel: { size: 1, levels: 0 },
  },
  scene: { background: 0x05070f, fogColor: 0x05070f, fogNear: 30, fogFar: 100 },
  renderer: {
    toneMapping: THREE.ACESFilmicToneMapping,
    toneMappingExposure: 1.0,
    shadowMapType: THREE.PCFSoftShadowMap,
  },
};
