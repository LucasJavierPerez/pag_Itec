import * as THREE from 'three';
import type { PhysicsWallDesc, TriggerZoneDesc, ClassroomsResult } from '../types.ts';
import { VoxelBuilder, createGlowMaterial, mix, shade } from './voxel.ts';
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

interface RoomBuilders {
  solid: VoxelBuilder;
  glow: VoxelBuilder;
}

/** Stone hallway, side branches and the colored entrance pads with glow rings. */
function addPaths(b: RoomBuilders, classrooms: ClassroomDef[]): void {
  const STONE_A = 0xcfc7b8;
  const STONE_B = 0xc3bba9;
  const BRANCH_A = 0xe8d6a8;
  const BRANCH_B = 0xdcc998;
  // Unique top height per layer (>= 0.04 apart) so adjacent fills never share a coplanar top face
  const PATH_H = 0.08; // hallway
  const BRANCH_H = 0.12; // side branches rise over the hallway where they join
  const PAD_H = 0.16; // entrance pads

  // Main hallway, 3 blocks wide, z -35 .. 20 (top face at PATH_H)
  b.solid.fill(0, PATH_H / 2, -7.5, 3, PATH_H, 55, [1, PATH_H, 1], (ix, _iy, iz) =>
    (ix + iz) & 1 ? STONE_A : STONE_B,
  );

  for (const room of classrooms) {
    const entranceX = room.x + room.facing * (ROOM_DEPTH / 2);
    const branchLength = Math.abs(entranceX);
    const branchCenterX = entranceX / 2;

    // Side branch towards the entrance, 3 blocks wide
    b.solid.fill(branchCenterX, BRANCH_H / 2, room.z, branchLength, BRANCH_H, 3, [1, BRANCH_H, 1], (ix, _iy, iz) =>
      (ix + iz) & 1 ? BRANCH_A : BRANCH_B,
    );

    // Entrance marker: colored 3 x 3 block pad
    const padLight = mix(room.color, 0xffffff, 0.18);
    b.solid.fill(entranceX, PAD_H / 2, room.z, 3, PAD_H, 3, [1, PAD_H, 1], (ix, _iy, iz) =>
      (ix + iz) & 1 ? room.color : padLight,
    );

    // Glow ring: square ring of emissive half-blocks around the pad
    const ringColor = mix(room.color, 0xffffff, 0.35);
    const step = 0.5;
    for (let i = -4; i <= 4; i++) {
      for (let j = -4; j <= 4; j++) {
        if (Math.abs(i) !== 4 && Math.abs(j) !== 4) continue;
        b.glow.box(
          entranceX + i * step,
          0.1,
          room.z + j * step,
          step,
          0.2,
          step,
          ringColor,
        );
      }
    }
  }
}

function addFurniture(b: RoomBuilders, room: ClassroomDef): void {
  const WOOD = 0x8b7355;
  const WOOD_TOP = 0x9c8262;
  const LEG = 0x555555;

  // 3 desks inside the room, built from half-unit blocks
  for (const dz of [-2, 0, 2]) {
    const deskZ = room.z + dz;
    const deskX = room.x - room.facing * 1.5;
    // Top: 2 x 0.5 x 1
    b.solid.fill(deskX, 0.75, deskZ, 2, 0.5, 1, 0.5, (ix, _iy, iz) =>
      (ix + iz) & 1 ? WOOD : WOOD_TOP,
    );
    // Four cube legs
    for (const [ox, oz] of [
      [-0.75, -0.25],
      [0.75, -0.25],
      [-0.75, 0.25],
      [0.75, 0.25],
    ]) {
      b.solid.box(deskX + ox, 0.25, deskZ + oz, 0.5, 0.5, 0.5, LEG);
    }
    // Small monitor on the desk (dark screen, light stand)
    b.solid.box(deskX, 1.125, deskZ, 0.5, 0.25, 0.5, 0x777777);
    b.solid.box(deskX - room.facing * 0.1, 1.5, deskZ, 0.1, 0.5, 0.75, 0x23313f);
  }

  // Whiteboard on the back wall, framed by half-unit blocks
  const backWallX = room.x - room.facing * (ROOM_DEPTH / 2);
  const boardX = backWallX + room.facing * 0.3;
  b.solid.fill(boardX, 2.25, room.z, 0.25, 1.5, 4, 0.5, (ix, iy) =>
    (ix + iy) & 1 ? 0xf5f5f5 : 0xe9eaea,
  );
  const FRAME = 0x444444;
  b.solid.fill(boardX, 3.25, room.z, 0.3, 0.5, 5, 0.5, FRAME);
  b.solid.fill(boardX, 1.25, room.z, 0.3, 0.5, 5, 0.5, FRAME);
  for (const sz of [-2.25, 2.25]) {
    b.solid.fill(boardX, 2.25, room.z + sz, 0.3, 1.5, 0.5, 0.5, FRAME);
  }
  // Accent pixel marks on the board
  const markX = boardX + room.facing * 0.14;
  b.solid.box(markX, 2.5, room.z - 1.25, 0.06, 0.5, 1.5, room.color);
  b.solid.box(markX, 2.0, room.z + 0.5, 0.06, 0.5, 2.5, shade(room.color, 0.85));
}

/** Tiles a wall (center + size) with 1-block cells; thin axes stay one cell thick. */
function addWall(
  b: RoomBuilders,
  physicsWalls: PhysicsWallDesc[],
  pos: { x: number; z: number },
  size: { x: number; z: number },
  colorA: number,
  colorB: number,
  detail: Omit<BuildingWall, 'x' | 'z' | 'sx' | 'sz'>,
  detailWalls: BuildingWall[],
): void {
  const alongX = size.x > size.z;
  b.solid.fill(pos.x, WALL_HEIGHT / 2, pos.z, size.x, WALL_HEIGHT, size.z, 1, (ix, iy, iz) =>
    ((alongX ? ix : iz) + iy) & 1 ? colorB : colorA,
  );
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

  const builders: RoomBuilders = {
    solid: new VoxelBuilder(21, 0.05),
    glow: new VoxelBuilder(22, 0.03),
  };

  const WALL_A = 0xf2ead8;
  const WALL_B = 0xe6dcc4;

  for (const room of CLASSROOMS) {
    // Back wall (accent colored)
    const backWallX = room.x - room.facing * (ROOM_DEPTH / 2);
    addWall(
      builders,
      physicsWalls,
      { x: backWallX, z: room.z },
      { x: WALL_THICKNESS, z: ROOM_WIDTH },
      room.color,
      shade(room.color, 0.88),
      { accent: room.color, mid: false },
      detailWalls,
    );

    // Side walls
    addWall(builders, physicsWalls, { x: room.x, z: room.z - ROOM_WIDTH / 2 }, { x: ROOM_DEPTH, z: WALL_THICKNESS }, WALL_A, WALL_B, { mid: true }, detailWalls);
    addWall(builders, physicsWalls, { x: room.x, z: room.z + ROOM_WIDTH / 2 }, { x: ROOM_DEPTH, z: WALL_THICKNESS }, WALL_A, WALL_B, { mid: true }, detailWalls);

    // Colored floor inside the classroom: 7 x 7 checker of light tiles
    const floorLight = mix(room.color, 0xffffff, 0.7);
    const floorLighter = mix(room.color, 0xffffff, 0.8);
    builders.solid.fill(room.x, 0.02, room.z, 7, 0.04, 7, [1, 0.04, 1], (ix, _iy, iz) =>
      (ix + iz) & 1 ? floorLight : floorLighter,
    );

    // Floating label
    const label = makeLabel(room.name);
    const labelX = room.x + room.facing * (ROOM_DEPTH / 2);
    label.position.set(labelX, WALL_HEIGHT + 1, room.z);
    group.add(label);

    addFurniture(builders, room);

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
  const add = (x: number, z: number, sx: number, sz: number, detail: Omit<BuildingWall, 'x' | 'z' | 'sx' | 'sz'>): void =>
    addWall(builders, physicsWalls, { x, z }, { x: sx, z: sz }, WALL_A, WALL_B, detail, detailWalls);
  // Left corridor wall (x=-8)
  add(-8, -8, T, L, { mid: true, windows: lookRight });
  add(-8, 8, T, L, { mid: true, windows: lookRight });
  // Right corridor wall (x=8)
  add(8, -16, T, L, { mid: true, windows: lookLeft });
  add(8, 0, T, L, { mid: true, windows: lookLeft });
  add(8, 16, T, L, { mid: true, windows: lookLeft });
  // Outer wall gaps
  add(-16, -8, T, L, { mid: true });
  add(-16, 8, T, L, { mid: true });
  add(16, -16, T, L, { mid: true });
  add(16, 16, T, L, { mid: true });
  // North end wall
  add(0, -20, 32, T, { mid: true, windows: ['+z'] });
  // South end wall with patio door (x=-2..2)
  add(-9, 20, 14, T, { mid: true, windows: ['+z'], openEnds: ['max'] });
  add(9, 20, 14, T, { mid: true, windows: ['+z'], openEnds: ['min'] });

  // Decorative building details (cube rims, plinth, cornice, pilasters, windows, portals, props)
  group.add(
    buildBuildingDetails({ walls: detailWalls, rooms: CLASSROOMS, wallHeight: WALL_HEIGHT, roomDepth: ROOM_DEPTH }),
  );

  // Ground paths and entrance markers
  addPaths(builders, CLASSROOMS);

  group.add(builders.solid.build());
  group.add(
    builders.glow.build({
      material: createGlowMaterial(),
      castShadow: false,
      receiveShadow: false,
    }),
  );

  return { meshGroup: group, physicsWalls, triggerZones };
}

export function getClassroomPositions(): { x: number; z: number }[] {
  return CLASSROOMS.map((c) => ({ x: c.x, z: c.z }));
}
