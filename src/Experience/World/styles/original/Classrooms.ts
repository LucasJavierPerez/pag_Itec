import * as THREE from 'three';
import type { PhysicsWallDesc, TriggerZoneDesc, ClassroomsResult } from '../types.ts';
import { GROUND, decal } from '../shared/groundLayers.ts';
import { buildBuildingDetails, type BuildingWall, type WallFace } from './buildingDetails.ts';

export interface ClassroomDef {
  name: string;
  color: number;
  x: number;
  z: number;
  facing: number;
}

const CLASSROOMS: ClassroomDef[] = [
  { name: 'Desarrollo de Software', color: 0x2980b9, x: -12, z: -16, facing: 1 },
  { name: 'Mecatrónica', color: 0xe74c3c, x: -12, z: 0, facing: 1 },
  { name: 'Marketing Digital', color: 0xe67e22, x: -12, z: 16, facing: 1 },
  { name: 'Inteligencia Artificial', color: 0x8e44ad, x: 12, z: -8, facing: -1 },
  { name: 'Turismo y Hotelería', color: 0x27ae60, x: 12, z: 8, facing: -1 },
];

const WALL_HEIGHT = 4;
const WALL_THICKNESS = 0.3;
const ROOM_WIDTH = 8;
const ROOM_DEPTH = 8;

function makeLabel(text: string): THREE.Sprite {
  const canvas = document.createElement('canvas');
  canvas.width = 512;
  canvas.height = 128;
  const ctx = canvas.getContext('2d')!;
  ctx.fillStyle = 'rgba(0, 0, 0, 0)';
  ctx.fillRect(0, 0, 512, 128);
  ctx.font = 'bold 48px Arial';
  ctx.fillStyle = '#ffffff';
  ctx.textAlign = 'center';
  ctx.textBaseline = 'middle';
  ctx.fillText(text, 256, 64);

  const texture = new THREE.CanvasTexture(canvas);
  const mat = new THREE.SpriteMaterial({ map: texture, transparent: true, depthWrite: false });
  const sprite = new THREE.Sprite(mat);
  sprite.scale.set(4, 1, 1);
  return sprite;
}

function createPaths(classrooms: ClassroomDef[]): THREE.Group {
  const group = new THREE.Group();

  const hallwayLength = 55;
  const hallwayGeo = new THREE.BoxGeometry(3, GROUND.hallway, hallwayLength);
  const hallwayMat = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.85,
  });
  const hallway = new THREE.Mesh(hallwayGeo, decal(hallwayMat, 4));
  hallway.position.set(0, GROUND.hallway / 2, -7.5);
  hallway.receiveShadow = true;
  group.add(hallway);

  const branchMat = new THREE.MeshStandardMaterial({
    color: 0xdddddd,
    roughness: 0.85,
  });

  for (const room of classrooms) {
    const entranceX = room.x + room.facing * (ROOM_DEPTH / 2);
    const branchLength = Math.abs(entranceX);
    const branchCenterX = entranceX / 2;

    const branchGeo = new THREE.BoxGeometry(branchLength, GROUND.branch, 2);
    const branch = new THREE.Mesh(branchGeo, decal(branchMat, 5));
    branch.position.set(branchCenterX, GROUND.branch / 2, room.z);
    branch.receiveShadow = true;
    group.add(branch);

    // Larger colored circle at the entrance
    const circleGeo = new THREE.CircleGeometry(0.9, 20);
    const circleMat = new THREE.MeshStandardMaterial({
      color: room.color,
      roughness: 0.5,
    });
    const circle = new THREE.Mesh(circleGeo, decal(circleMat, 7));
    circle.rotation.x = -Math.PI / 2;
    circle.position.set(entranceX, GROUND.circle, room.z);
    circle.receiveShadow = true;
    group.add(circle);

    // Glow ring around the entrance circle
    const ringGeo = new THREE.TorusGeometry(1.1, 0.08, 8, 24);
    const ringMat = new THREE.MeshStandardMaterial({
      color: room.color,
      emissive: room.color,
      emissiveIntensity: 0.4,
      roughness: 0.3,
    });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = -Math.PI / 2;
    ring.position.set(entranceX, GROUND.ring, room.z);
    group.add(ring);
  }

  return group;
}

function createFurniture(room: ClassroomDef): THREE.Group {
  const furniture = new THREE.Group();

  const deskMat = new THREE.MeshStandardMaterial({
    color: 0x8b7355,
    roughness: 0.7,
  });

  // 3 desks inside the room
  const deskPositions = [-2, 0, 2];
  for (const dz of deskPositions) {
    const deskTop = new THREE.Mesh(
      new THREE.BoxGeometry(1.8, 0.08, 0.9),
      deskMat,
    );
    const deskZ = room.z + dz;
    const deskX = room.x - room.facing * 1.5;
    deskTop.position.set(deskX, 0.75, deskZ);
    deskTop.castShadow = true;
    deskTop.receiveShadow = true;
    furniture.add(deskTop);

    // Desk legs
    const legGeo = new THREE.BoxGeometry(0.08, 0.7, 0.08);
    const legMat = new THREE.MeshStandardMaterial({
      color: 0x555555,
      roughness: 0.8,
    });
    const offsets: [number, number][] = [
      [-0.8, -0.35],
      [0.8, -0.35],
      [-0.8, 0.35],
      [0.8, 0.35],
    ];
    for (const [dx, ddz] of offsets) {
      const leg = new THREE.Mesh(legGeo, legMat);
      leg.position.set(deskX + dx, 0.35, deskZ + ddz);
      furniture.add(leg);
    }
  }

  // Whiteboard on the back wall
  const backWallX = room.x - room.facing * (ROOM_DEPTH / 2);
  const wbGeo = new THREE.BoxGeometry(0.05, 1.8, 4);
  const wbMat = new THREE.MeshStandardMaterial({
    color: 0xf5f5f5,
    roughness: 0.3,
    metalness: 0.05,
  });
  const whiteboard = new THREE.Mesh(wbGeo, wbMat);
  whiteboard.position.set(
    backWallX + room.facing * 0.2,
    2.2,
    room.z,
  );
  whiteboard.receiveShadow = true;
  furniture.add(whiteboard);

  // Whiteboard frame
  const frameMat = new THREE.MeshStandardMaterial({
    color: 0x444444,
    roughness: 0.6,
  });
  const frameTop = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.06, 4.1),
    frameMat,
  );
  frameTop.position.set(backWallX + room.facing * 0.2, 3.12, room.z);
  furniture.add(frameTop);
  const frameBottom = new THREE.Mesh(
    new THREE.BoxGeometry(0.06, 0.06, 4.1),
    frameMat,
  );
  frameBottom.position.set(backWallX + room.facing * 0.2, 1.28, room.z);
  furniture.add(frameBottom);

  return furniture;
}

function addWall(
  group: THREE.Group,
  physicsWalls: PhysicsWallDesc[],
  pos: { x: number; z: number },
  size: { x: number; z: number },
  mat: THREE.Material,
  detail: Omit<BuildingWall, 'x' | 'z' | 'sx' | 'sz'>,
  detailWalls: BuildingWall[],
): void {
  const mesh = new THREE.Mesh(
    new THREE.BoxGeometry(size.x, WALL_HEIGHT, size.z),
    mat,
  );
  mesh.position.set(pos.x, WALL_HEIGHT / 2, pos.z);
  mesh.castShadow = true;
  mesh.receiveShadow = true;
  group.add(mesh);
  physicsWalls.push({
    position: { x: pos.x, y: WALL_HEIGHT / 2, z: pos.z },
    size: { x: size.x, y: WALL_HEIGHT, z: size.z },
  });
  detailWalls.push({ x: pos.x, z: pos.z, sx: size.x, sz: size.z, ...detail });
}

export function createClassrooms(): ClassroomsResult {
  const group = new THREE.Group();
  const physicsWalls: PhysicsWallDesc[] = [];
  const triggerZones: TriggerZoneDesc[] = [];
  const detailWalls: BuildingWall[] = [];

  const wallMat = new THREE.MeshStandardMaterial({
    color: 0xcccccc,
    roughness: 0.8,
  });

  for (const room of CLASSROOMS) {
    const roomGroup = new THREE.Group();

    const accentMat = new THREE.MeshStandardMaterial({
      color: room.color,
      roughness: 0.6,
      metalness: 0.1,
    });

    // Back wall
    const backWallX = room.x - room.facing * (ROOM_DEPTH / 2);
    const backGeo = new THREE.BoxGeometry(WALL_THICKNESS, WALL_HEIGHT, ROOM_WIDTH);
    const backMesh = new THREE.Mesh(backGeo, accentMat);
    backMesh.position.set(backWallX, WALL_HEIGHT / 2, room.z);
    backMesh.castShadow = true;
    backMesh.receiveShadow = true;
    roomGroup.add(backMesh);
    physicsWalls.push({
      position: { x: backWallX, y: WALL_HEIGHT / 2, z: room.z },
      size: { x: WALL_THICKNESS, y: WALL_HEIGHT, z: ROOM_WIDTH },
    });
    detailWalls.push({ x: backWallX, z: room.z, sx: WALL_THICKNESS, sz: ROOM_WIDTH, accent: room.color, mid: false });

    // Side wall 1
    const sideZ1 = room.z - ROOM_WIDTH / 2;
    const sideGeo = new THREE.BoxGeometry(ROOM_DEPTH, WALL_HEIGHT, WALL_THICKNESS);
    const sideMesh1 = new THREE.Mesh(sideGeo, wallMat);
    sideMesh1.position.set(room.x, WALL_HEIGHT / 2, sideZ1);
    sideMesh1.castShadow = true;
    sideMesh1.receiveShadow = true;
    roomGroup.add(sideMesh1);
    physicsWalls.push({
      position: { x: room.x, y: WALL_HEIGHT / 2, z: sideZ1 },
      size: { x: ROOM_DEPTH, y: WALL_HEIGHT, z: WALL_THICKNESS },
    });
    detailWalls.push({ x: room.x, z: sideZ1, sx: ROOM_DEPTH, sz: WALL_THICKNESS, mid: true });

    // Side wall 2
    const sideZ2 = room.z + ROOM_WIDTH / 2;
    const sideMesh2 = new THREE.Mesh(sideGeo, wallMat);
    sideMesh2.position.set(room.x, WALL_HEIGHT / 2, sideZ2);
    sideMesh2.castShadow = true;
    sideMesh2.receiveShadow = true;
    roomGroup.add(sideMesh2);
    physicsWalls.push({
      position: { x: room.x, y: WALL_HEIGHT / 2, z: sideZ2 },
      size: { x: ROOM_DEPTH, y: WALL_HEIGHT, z: WALL_THICKNESS },
    });
    detailWalls.push({ x: room.x, z: sideZ2, sx: ROOM_DEPTH, sz: WALL_THICKNESS, mid: true });

    // Colored floor inside the classroom
    const floorGeo = new THREE.PlaneGeometry(ROOM_DEPTH - 0.5, ROOM_WIDTH - 0.5);
    const floorColor = new THREE.Color(room.color);
    floorColor.lerp(new THREE.Color(0xffffff), 0.7);
    const floorMat = new THREE.MeshStandardMaterial({
      color: floorColor,
      roughness: 0.85,
    });
    const floorMesh = new THREE.Mesh(floorGeo, decal(floorMat, 3));
    floorMesh.rotation.x = -Math.PI / 2;
    floorMesh.position.set(room.x, GROUND.room, room.z);
    floorMesh.receiveShadow = true;
    roomGroup.add(floorMesh);

    // Floating label
    const label = makeLabel(room.name);
    const labelX = room.x + room.facing * (ROOM_DEPTH / 2);
    label.position.set(labelX, WALL_HEIGHT + 1, room.z);
    roomGroup.add(label);

    // Furniture
    const furniture = createFurniture(room);
    roomGroup.add(furniture);

    group.add(roomGroup);

    // Trigger zone
    const triggerX = room.x + room.facing * (ROOM_DEPTH / 2);
    triggerZones.push({
      name: room.name,
      position: { x: triggerX, y: WALL_HEIGHT / 2, z: room.z },
      size: { x: 2, y: WALL_HEIGHT, z: ROOM_WIDTH },
    });
  }

  // Enclosure walls
  const T = WALL_THICKNESS;
  const L = 8;
  const lookRight: WallFace[] = ['+x'];
  const lookLeft: WallFace[] = ['-x'];
  // Left corridor wall (x=-8)
  addWall(group, physicsWalls, { x: -8, z: -8 }, { x: T, z: L }, wallMat, { mid: true, windows: lookRight }, detailWalls);
  addWall(group, physicsWalls, { x: -8, z: 8 }, { x: T, z: L }, wallMat, { mid: true, windows: lookRight }, detailWalls);
  // Right corridor wall (x=8)
  addWall(group, physicsWalls, { x: 8, z: -16 }, { x: T, z: L }, wallMat, { mid: true, windows: lookLeft }, detailWalls);
  addWall(group, physicsWalls, { x: 8, z: 0 }, { x: T, z: L }, wallMat, { mid: true, windows: lookLeft }, detailWalls);
  addWall(group, physicsWalls, { x: 8, z: 16 }, { x: T, z: L }, wallMat, { mid: true, windows: lookLeft }, detailWalls);
  // Outer wall gaps
  addWall(group, physicsWalls, { x: -16, z: -8 }, { x: T, z: L }, wallMat, { mid: true }, detailWalls);
  addWall(group, physicsWalls, { x: -16, z: 8 }, { x: T, z: L }, wallMat, { mid: true }, detailWalls);
  addWall(group, physicsWalls, { x: 16, z: -16 }, { x: T, z: L }, wallMat, { mid: true }, detailWalls);
  addWall(group, physicsWalls, { x: 16, z: 16 }, { x: T, z: L }, wallMat, { mid: true }, detailWalls);
  // North end wall
  addWall(group, physicsWalls, { x: 0, z: -20 }, { x: 32, z: T }, wallMat, { mid: true, windows: ['+z'] }, detailWalls);
  // South end wall with patio door (x=-2..2)
  addWall(group, physicsWalls, { x: -9, z: 20 }, { x: 14, z: T }, wallMat, { mid: true, windows: ['+z'], openEnds: ['max'] }, detailWalls);
  addWall(group, physicsWalls, { x: 9, z: 20 }, { x: 14, z: T }, wallMat, { mid: true, windows: ['+z'], openEnds: ['min'] }, detailWalls);

  // Decorative building details (outlines, plinth, cornice, pilasters, windows, portals, props)
  group.add(
    buildBuildingDetails({
      walls: detailWalls,
      rooms: CLASSROOMS,
      wallHeight: WALL_HEIGHT,
      roomDepth: ROOM_DEPTH,
    }),
  );

  // Ground paths
  const paths = createPaths(CLASSROOMS);
  group.add(paths);

  return { meshGroup: group, physicsWalls, triggerZones };
}

export function getClassroomPositions(): { x: number; z: number }[] {
  return CLASSROOMS.map((c) => ({ x: c.x, z: c.z }));
}
