import * as THREE from 'three';
import type { StyleModule } from '../types.ts';
import { createFloor } from './Floor.ts';
import { createClassrooms, getClassroomPositions } from './Classrooms.ts';
import { createRobotMesh } from './Robot.ts';
import { Environment } from './Environment.ts';
import { Lights } from './Lights.ts';
import { createBallVisual, createGoalVisual } from './BallGoal.ts';
import { createSignature } from './Signature.ts';

export const lowpolyStyle: StyleModule = {
  id: 'lowpoly',
  label: 'Low-Poly',
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
  accent: 0x2980b9,
  post: {
    bloom: { strength: 0.2, radius: 0.4, threshold: 0.95 },
    vignette: { offset: 0.6, darkness: 0.2 },
    grain: 0.015,
    aberration: 0.0008,
    dof: { aperture: 0, maxblur: 0 },
    pixel: { size: 1, levels: 0 },
  },
  scene: { background: 0xfbe3c2, fogColor: 0xfbe3c2, fogNear: 60, fogFar: 120 },
  renderer: {
    toneMapping: THREE.NoToneMapping,
    toneMappingExposure: 1,
    shadowMapType: THREE.PCFShadowMap,
  },
};
