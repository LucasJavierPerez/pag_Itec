import * as THREE from 'three';
import {
  BALL_RADIUS,
  GOAL_X,
  GOAL_Z,
  GOAL_WIDTH,
  GOAL_HEIGHT,
  GOAL_DEPTH,
  POST,
} from '../shared/ballGoal.ts';

/** Football (white sphere with 12 black pentagon patches), centered at the origin. */
export function createBallVisual(): THREE.Object3D {
  const mesh = new THREE.Mesh(
    new THREE.SphereGeometry(BALL_RADIUS, 32, 24),
    new THREE.MeshStandardMaterial({ color: 0xffffff, roughness: 0.45 }),
  );
  mesh.castShadow = true;

  // 12 black pentagon patches at the icosahedron vertices, like a real football
  const patchMat = new THREE.MeshStandardMaterial({ color: 0x111111, roughness: 0.5 });
  const patchGeo = new THREE.SphereGeometry(BALL_RADIUS * 1.003, 5, 2, 0, Math.PI * 2, 0, 0.4);
  const phi = (1 + Math.sqrt(5)) / 2;
  const up = new THREE.Vector3(0, 1, 0);
  for (const [a, b] of [[1, phi], [1, -phi], [-1, phi], [-1, -phi]]) {
    for (const dir of [
      new THREE.Vector3(0, a, b),
      new THREE.Vector3(a, b, 0),
      new THREE.Vector3(b, 0, a),
    ]) {
      const patch = new THREE.Mesh(patchGeo, patchMat);
      patch.quaternion.setFromUnitVectors(up, dir.normalize());
      mesh.add(patch);
    }
  }
  return mesh;
}

export function createGoalVisual(): THREE.Group {
  const goalGroup = new THREE.Group();
  const white = new THREE.MeshStandardMaterial({ color: 0xffffff });
  const net = new THREE.MeshBasicMaterial({
    color: 0xffffff,
    transparent: true,
    opacity: 0.25,
    side: THREE.DoubleSide,
  });
  const halfW = GOAL_WIDTH / 2;
  const backX = GOAL_X + GOAL_DEPTH;
  const midX = GOAL_X + GOAL_DEPTH / 2;

  const addVisual = (
    size: [number, number, number],
    pos: [number, number, number],
    mat: THREE.Material,
    shadow: boolean,
  ): void => {
    const m = new THREE.Mesh(new THREE.BoxGeometry(...size), mat);
    m.position.set(...pos);
    m.castShadow = shadow;
    goalGroup.add(m);
  };

  // Posts and crossbar
  for (const z of [GOAL_Z - halfW, GOAL_Z + halfW]) {
    addVisual([POST, GOAL_HEIGHT, POST], [GOAL_X, GOAL_HEIGHT / 2, z], white, true);
  }
  addVisual([POST, POST, GOAL_WIDTH], [GOAL_X, GOAL_HEIGHT, GOAL_Z], white, true);

  // Back net
  addVisual([0.05, GOAL_HEIGHT, GOAL_WIDTH], [backX, GOAL_HEIGHT / 2, GOAL_Z], net, false);

  // Side nets
  for (const z of [GOAL_Z - halfW, GOAL_Z + halfW]) {
    addVisual([GOAL_DEPTH, GOAL_HEIGHT, 0.05], [midX, GOAL_HEIGHT / 2, z], net, false);
  }
  return goalGroup;
}
