import * as THREE from 'three';
import type { RobotMeshResult } from '../types.ts';

export function createRobotMesh(): RobotMeshResult {
  const robot = new THREE.Group();

  const whiteMat = new THREE.MeshStandardMaterial({
    color: 0xf0f0f0,
    roughness: 0.4,
    metalness: 0.1,
  });
  const blackMat = new THREE.MeshStandardMaterial({
    color: 0x222222,
    roughness: 0.6,
    metalness: 0.3,
  });
  const darkMat = new THREE.MeshStandardMaterial({
    color: 0x333333,
    roughness: 0.6,
    metalness: 0.3,
  });
  const grayMat = new THREE.MeshStandardMaterial({
    color: 0x888888,
    roughness: 0.7,
    metalness: 0.2,
  });
  const blueMat = new THREE.MeshStandardMaterial({
    color: 0x3498db,
    emissive: 0x3498db,
    emissiveIntensity: 0.9,
  });

  const add = (
    geo: THREE.BufferGeometry,
    mat: THREE.Material,
    x: number,
    y: number,
    z: number,
    shadow = true,
  ): THREE.Mesh => {
    const m = new THREE.Mesh(geo, mat);
    m.position.set(x, y, z);
    m.castShadow = shadow;
    robot.add(m);
    return m;
  };

  // Base disc
  add(new THREE.CylinderGeometry(0.6, 0.65, 0.05, 24), grayMat, 0, 0.025, 0);

  // Legs (both sides)
  for (const s of [-1, 1]) {
    const x = s * 0.2;
    // Foot
    add(new THREE.BoxGeometry(0.22, 0.1, 0.38), darkMat, x, 0.1, 0.05);
    // Shin
    add(new THREE.CylinderGeometry(0.075, 0.09, 0.55, 12), whiteMat, x, 0.42, 0);
    // Knee joint
    add(new THREE.SphereGeometry(0.1, 12, 12), blackMat, x, 0.75, 0);
    // Thigh
    add(new THREE.CylinderGeometry(0.1, 0.08, 0.45, 12), whiteMat, x, 0.98, 0);
    // Hip joint
    add(new THREE.SphereGeometry(0.11, 12, 12), blackMat, x, 1.22, 0);
  }

  // Waist / lower torso (dark)
  add(new THREE.BoxGeometry(0.5, 0.22, 0.3), darkMat, 0, 1.3, 0);

  // Upper torso (wider at shoulders)
  add(new THREE.BoxGeometry(0.7, 0.5, 0.36), whiteMat, 0, 1.66, 0);
  // Panel seam lines on torso
  add(new THREE.BoxGeometry(0.72, 0.015, 0.38), blackMat, 0, 1.5, 0, false);
  add(new THREE.BoxGeometry(0.015, 0.5, 0.38), blackMat, 0, 1.66, 0, false);

  // Chest core reactor
  const coreRing = add(new THREE.TorusGeometry(0.11, 0.025, 8, 24), blackMat, 0, 1.66, 0.19, false);
  coreRing.rotation.x = 0;
  add(new THREE.SphereGeometry(0.09, 20, 20), blueMat, 0, 1.66, 0.19, false);
  const coreLight = new THREE.PointLight(0x3498db, 1, 5);
  coreLight.position.set(0, 1.66, 0.35);
  robot.add(coreLight);

  // Arms (both sides)
  for (const s of [-1, 1]) {
    const x = s * 0.47;
    // Shoulder joint
    add(new THREE.SphereGeometry(0.11, 12, 12), blackMat, x, 1.85, 0);
    // Upper arm
    add(new THREE.CylinderGeometry(0.07, 0.06, 0.38, 12), whiteMat, x, 1.64, 0);
    // Elbow joint
    add(new THREE.SphereGeometry(0.075, 12, 12), blackMat, x, 1.43, 0);
    // Forearm
    add(new THREE.CylinderGeometry(0.06, 0.05, 0.34, 12), whiteMat, x, 1.24, 0);
    // Hand
    add(new THREE.BoxGeometry(0.08, 0.12, 0.1), whiteMat, x, 1.03, 0);
  }

  // Neck
  add(new THREE.CylinderGeometry(0.05, 0.06, 0.12, 12), blackMat, 0, 1.97, 0);

  // Head (squished sphere)
  const head = add(new THREE.SphereGeometry(0.2, 24, 24), whiteMat, 0, 2.08, 0);
  head.scale.set(1, 1.05, 0.95);
  // Panel seam lines on head
  add(new THREE.BoxGeometry(0.41, 0.012, 0.01), blackMat, 0, 2.15, 0.185, false);
  add(new THREE.BoxGeometry(0.012, 0.2, 0.01), blackMat, 0, 2.1, 0.19, false);

  // Eyes
  const eyeGeo = new THREE.SphereGeometry(0.03, 10, 10);
  for (const s of [-1, 1]) {
    add(eyeGeo, blueMat, s * 0.08, 2.1, 0.18, false);
  }

  const getBounceOffset = (time: number): number => {
    return Math.sin(time * 2) * 0.03;
  };

  return { group: robot, getBounceOffset };
}
