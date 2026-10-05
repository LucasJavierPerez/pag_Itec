import * as THREE from 'three';
import type { PhysicsBodyDesc, FloorResult } from '../types.ts';
import { GROUND, decal } from '../shared/groundLayers.ts';
import { flatMat } from '../shared/lowPoly.ts';

export function createFloor(): FloorResult {
  const group = new THREE.Group();
  const bodies: PhysicsBodyDesc[] = [];

  // Floor plane — warm sandy tone
  const floorGeo = new THREE.PlaneGeometry(100, 100);
  const floorMat = flatMat(0xe8d6a8);
  const floorMesh = new THREE.Mesh(floorGeo, floorMat);
  floorMesh.rotation.x = -Math.PI / 2;
  floorMesh.receiveShadow = true;
  group.add(floorMesh);

  // Floor physics (thin box at y=0)
  bodies.push({
    position: { x: 0, y: -0.5, z: 0 },
    size: { x: 100, y: 1, z: 100 },
  });

  // Concrete pad under the main hallway
  const concreteMat = flatMat(0xcfc7b8);
  const concreteGeo = new THREE.PlaneGeometry(5, 60);
  const concrete = new THREE.Mesh(concreteGeo, decal(concreteMat, 2));
  concrete.rotation.x = -Math.PI / 2;
  concrete.position.set(0, GROUND.pad, -5);
  concrete.receiveShadow = true;
  group.add(concrete);

  // Grass patches around the edges
  const grassMat = flatMat(0x8fd14f);
  const grassMat2 = flatMat(0x7bc043);

  const grassPatches: { x: number; z: number; w: number; h: number; mat: THREE.MeshStandardMaterial }[] = [
    { x: -35, z: -35, w: 20, h: 18, mat: grassMat },
    { x: 35, z: -35, w: 20, h: 18, mat: grassMat2 },
    { x: -38, z: 35, w: 16, h: 16, mat: grassMat },
    { x: 38, z: 35, w: 16, h: 16, mat: grassMat2 },
    { x: -40, z: 10, w: 10, h: 12, mat: grassMat },
    { x: 40, z: -10, w: 10, h: 12, mat: grassMat2 },
    { x: 0, z: 40, w: 25, h: 12, mat: grassMat },
    { x: 0, z: -42, w: 20, h: 8, mat: grassMat2 },
  ];

  for (const patch of grassPatches) {
    const geo = new THREE.PlaneGeometry(patch.w, patch.h);
    const mesh = new THREE.Mesh(geo, decal(patch.mat, 1));
    mesh.rotation.x = -Math.PI / 2;
    mesh.position.set(patch.x, GROUND.grass, patch.z);
    mesh.receiveShadow = true;
    group.add(mesh);
  }

  // Subtle path-edge markings instead of full grid
  const markingMat = flatMat(0xdccfae);

  // Dashed centerline along the main hallway
  for (let z = -34; z <= 20; z += 4) {
    const dashGeo = new THREE.BoxGeometry(0.15, 0.01, 1.5);
    const dash = new THREE.Mesh(dashGeo, decal(markingMat, 6));
    dash.position.set(0, GROUND.marking - 0.005, z);
    dash.receiveShadow = true;
    group.add(dash);
  }

  // Border walls — warmer gray
  const wallHeight = 2;
  const wallThickness = 1;
  const halfFloor = 50;
  const wallMat = flatMat(0x9aa5a6);

  const wallDefs: { pos: [number, number, number]; size: [number, number, number] }[] = [
    { pos: [0, wallHeight / 2, halfFloor], size: [100, wallHeight, wallThickness] },
    { pos: [0, wallHeight / 2, -halfFloor], size: [100, wallHeight, wallThickness] },
    { pos: [halfFloor, wallHeight / 2, 0], size: [wallThickness, wallHeight, 100] },
    { pos: [-halfFloor, wallHeight / 2, 0], size: [wallThickness, wallHeight, 100] },
  ];

  for (const def of wallDefs) {
    const geo = new THREE.BoxGeometry(def.size[0], def.size[1], def.size[2]);
    const mesh = new THREE.Mesh(geo, wallMat);
    mesh.position.set(def.pos[0], def.pos[1], def.pos[2]);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    group.add(mesh);

    bodies.push({
      position: { x: def.pos[0], y: def.pos[1], z: def.pos[2] },
      size: { x: def.size[0], y: def.size[1], z: def.size[2] },
    });
  }

  return { meshGroup: group, physicsBodies: bodies };
}
