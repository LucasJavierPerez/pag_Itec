import * as THREE from 'three';
import { disposeObject } from '../shared/dispose.ts';
import { SIGN_POSITION, SIGN_YAW, SIGN_FACE, createAddressTexture } from '../shared/addressSign.ts';
import { seededRandom } from '../shared/lowPoly.ts';
import { VoxelBuilder, createGlowMaterial, staticLitMaterial, shade } from './voxel.ts';

export class Environment {
  private group: THREE.Group;

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();

    this.createSkyDome();
    this.createTrees();
    this.createBushes();
    this.createWelcomeArch();
    this.createAddressSign();
    this.createRocks();
    this.createClouds();
    this.createHills();

    scene.add(this.group);
  }

  private createSkyDome(): void {
    // Cube sky pinned to the camera (depth forced to the far plane), so it
    // can never be clipped no matter where the robot drives.
    const skyGeo = new THREE.BoxGeometry(2, 2, 2);

    // Flat hard bands of a cheerful daytime palette, horizon (0) to zenith (4)
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        band0: { value: new THREE.Color(0xd6efff) },
        band1: { value: new THREE.Color(0xb8e2ff) },
        band2: { value: new THREE.Color(0x93d2fb) },
        band3: { value: new THREE.Color(0x6fbdf3) },
        band4: { value: new THREE.Color(0x4aa6e8) },
      },
      vertexShader: `
        varying vec3 vDir;
        void main() {
          vDir = position;
          vec4 pos = projectionMatrix * mat4(mat3(viewMatrix)) * vec4(position, 1.0);
          gl_Position = pos.xyww;
        }
      `,
      fragmentShader: `
        uniform vec3 band0;
        uniform vec3 band1;
        uniform vec3 band2;
        uniform vec3 band3;
        uniform vec3 band4;
        varying vec3 vDir;
        void main() {
          float h = normalize(vDir).y;
          vec3 color = band0;
          if (h > 0.08) color = band1;
          if (h > 0.2) color = band2;
          if (h > 0.4) color = band3;
          if (h > 0.65) color = band4;
          gl_FragColor = vec4(color, 1.0);
          #include <colorspace_fragment>
        }
      `,
    });

    const sky = new THREE.Mesh(skyGeo, skyMat);
    sky.frustumCulled = false;
    sky.renderOrder = -1;
    this.group.add(sky);
  }

  /** Tree of 0.5-unit cubes: a 1 x 1 trunk column topped with shrinking leaf layers. */
  private addTree(
    b: VoxelBuilder,
    x: number,
    z: number,
    scale: number,
    rand: () => number,
  ): void {
    const U = 0.5;
    const cx = Math.round(x);
    const cz = Math.round(z);
    const trunkCells = Math.max(2, Math.round(3 * scale));
    const trunkH = trunkCells * U;
    const BARK = [0x8d5a3b, 0x7d4e32];
    b.fill(cx, trunkH / 2, cz, 1, trunkH, 1, U, (_ix, iy) => BARK[iy & 1]);

    const leafTones = rand() > 0.5 ? [0x2e8b57, 0x3aa76d] : [0x3aa76d, 0x4cba7f];
    const base = 2 * Math.max(2, Math.round(2.4 * scale));
    const widths = base >= 6 ? [base, base - 2, 2] : [base, 2];
    let y = trunkH - U; // first leaf layer overlaps the top of the trunk
    for (const wCells of widths) {
      const w = wCells * U;
      b.fill(cx, y + 0.5, cz, w, 1, w, U, (ix, iy, iz) => leafTones[(ix + iy + iz) & 1]);
      y += 1;
    }
  }

  private createTrees(): void {
    const treePositions: [number, number, number][] = [
      [-40, -30, 1.2],
      [-38, -18, 0.9],
      [-42, -5, 1.4],
      [-36, 10, 1.0],
      [-40, 22, 1.3],
      [-44, 35, 0.8],
      [-35, 40, 1.1],
      [40, -28, 1.3],
      [38, -12, 0.9],
      [42, 5, 1.1],
      [36, 18, 1.4],
      [40, 30, 1.0],
      [44, 42, 0.8],
      [-25, -42, 1.2],
      [0, -44, 0.9],
      [25, -42, 1.1],
      [-28, 42, 1.0],
      [5, 44, 1.3],
      [28, 42, 0.8],
      [-30, 38, 1.1],
    ];

    const rand = seededRandom(1234);
    const b = new VoxelBuilder(1235, 0.07);
    for (const [x, z, scale] of treePositions) {
      this.addTree(b, x, z, scale, rand);
    }
    this.group.add(b.build());
  }

  private createBushes(): void {
    const rand = seededRandom(555);
    const b = new VoxelBuilder(556, 0.08);
    const tones = [0x4caf50, 0x43a047, 0x56b95a];

    const bushPositions: [number, number][] = [
      [-32, -25],
      [-34, 5],
      [32, -20],
      [34, 15],
      [-20, -38],
      [20, -38],
      [-22, 38],
      [22, 38],
      [-30, 30],
      [30, -30],
    ];

    for (const [x, z] of bushPositions) {
      const cx = Math.round(x);
      const cz = Math.round(z);
      // Main 1 x 1 x 1 block plus 1-3 half-blocks hugging it
      b.box(cx, 0.5, cz, 1, 1, 1, tones[Math.floor(rand() * tones.length)]);
      const extras = 1 + Math.floor(rand() * 3);
      const spots: [number, number, number][] = [
        [0.75, 0.25, 0.25],
        [-0.75, 0.25, -0.25],
        [0.25, 0.25, -0.75],
        [-0.25, 0.75, 0.25],
      ];
      for (let i = 0; i < extras; i++) {
        const [ox, oy, oz] = spots[(i + Math.floor(rand() * 4)) % spots.length];
        b.box(cx + ox, oy, cz + oz, 0.5, 0.5, 0.5, tones[Math.floor(rand() * tones.length)]);
      }
    }
    this.group.add(b.build());
  }

  private createWelcomeArch(): void {
    const arch = new THREE.Group();
    const ARCH = 0x1a5276;
    const ARCH_LIGHT = 0x2471a3;

    // Built from 1 x 1 x 1 blocks: two 4-high pillars and a 7-wide lintel
    const b = new VoxelBuilder(808, 0.05);
    const tone = (ix: number, iy: number, iz: number): number =>
      (ix + iy + iz) & 1 ? ARCH : ARCH_LIGHT;
    b.fill(-3, 2, 0, 1, 4, 1, 1, tone);
    b.fill(3, 2, 0, 1, 4, 1, 1, tone);
    b.fill(0, 4.5, 0, 7, 1, 1, 1, tone);
    arch.add(b.build());

    const canvas = document.createElement('canvas');
    canvas.width = 512;
    canvas.height = 128;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = 'rgba(0, 0, 0, 0)';
    ctx.fillRect(0, 0, 512, 128);
    ctx.font = 'bold 56px Arial';
    ctx.fillStyle = '#ffffff';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('ITEC Río Cuarto', 256, 64);

    const texture = new THREE.CanvasTexture(canvas);
    const signMat = new THREE.SpriteMaterial({
      map: texture,
      transparent: true,
      depthWrite: false,
    });
    const sign = new THREE.Sprite(signMat);
    sign.scale.set(6, 1.5, 1);
    sign.position.set(0, 5.5, 0);
    arch.add(sign);

    arch.position.set(0, 0, 31);
    this.group.add(arch);
  }

  /** Decorative rocks: small clusters of gray cubes, outside the building and paths. */
  private createRocks(): void {
    const rand = seededRandom(77);
    const b = new VoxelBuilder(78, 0.07);
    const spots: [number, number][] = [
      [-24, -12], [-27, 14], [24, -14], [27, 12], [-22, 28], [22, 26],
      [-30, -34], [30, -36], [-20, -30], [18, -40], [10, 36], [-12, 36],
    ];
    const grays = [0x9a9a96, 0x8a8c8e, 0xb0aea6, 0x7c7f82];
    for (const [x, z] of spots) {
      const cx = Math.round(x);
      const cz = Math.round(z);
      const tone = grays[Math.floor(rand() * grays.length)];
      // Big base block, a couple of neighbours and a cap
      b.box(cx, 0.25, cz, 1, 0.5, 1, tone);
      b.box(cx + 0.75, 0.25, cz + 0.25, 0.5, 0.5, 0.5, shade(tone, 0.92));
      if (rand() > 0.4) b.box(cx - 0.75, 0.25, cz - 0.25, 0.5, 0.5, 0.5, shade(tone, 1.06));
      if (rand() > 0.3) b.box(cx - 0.25, 0.75, cz + 0.25, 0.5, 0.5, 0.5, shade(tone, 1.1));
    }
    this.group.add(b.build());
  }

  /** Bright cube clouds high in the sky (unlit, unaffected by fog). */
  private createClouds(): void {
    const rand = seededRandom(9);
    const b = new VoxelBuilder(10, 0.03);
    const TOP = 0xffffff;
    const UNDER = 0xdbe9f7;
    for (let i = 0; i < 6; i++) {
      const angle = (i / 6) * Math.PI * 2 + rand() * 0.5;
      const dist = 45 + rand() * 40;
      const ox = Math.round(Math.cos(angle) * dist / 2) * 2;
      const oy = 38 + Math.round(rand() * 6) * 2;
      const oz = Math.round(Math.sin(angle) * dist / 2) * 2;
      const puffs = 3 + Math.floor(rand() * 2);
      for (let j = 0; j < puffs; j++) {
        const w = 4 + Math.floor(rand() * 2) * 2;
        const d = 4 + Math.floor(rand() * 2) * 2;
        const px = ox + j * 4 - puffs * 2;
        const pz = oz + Math.round(rand() * 2 - 1) * 2;
        // Flat underside slab plus a bright top block
        b.box(px, oy, pz, w, 2, d, UNDER);
        b.box(px, oy + 2, pz, w - 2, 2, d - 2, TOP);
      }
    }
    this.group.add(
      b.build({
        material: createGlowMaterial({ fog: false }, false),
        castShadow: false,
        receiveShadow: false,
      }),
    );
  }

  /** Far stepped cube pyramids beyond the border walls, purely decorative. */
  private createHills(): void {
    const rand = seededRandom(31);
    const b = new VoxelBuilder(32, 0.06);
    const colors = [0x7bc043, 0x8fd14f, 0x6fb03a];
    const spots: [number, number, number][] = [
      [-64, -30, 6], [-66, 20, 8], [64, -20, 7], [66, 34, 6], [-30, -64, 6],
      [20, -66, 8], [34, 64, 6], [-40, 66, 8], [-62, 58, 4], [62, -62, 4],
    ];
    for (const [x, z, half] of spots) {
      const tone = colors[Math.floor(rand() * colors.length)];
      const cell = 2;
      const layers = Math.floor(half / cell);
      for (let k = 0; k < layers; k++) {
        const w = (half - k * cell) * 2;
        b.fill(x, cell * k + cell / 2, z, w, cell, w, cell, (ix, iy, iz) =>
          (ix + iy + iz) & 1 ? tone : shade(tone, 0.93),
        );
      }
    }
    this.group.add(b.build({ material: staticLitMaterial, castShadow: false }));
  }

  /** Blocky signpost: cube post and board, pixelated address face. */
  private createAddressSign(): void {
    const sign = new THREE.Group();
    const WOOD = 0x7a5a3c;
    const WOOD_LIGHT = 0x8f6d49;
    const BOARD = 0xa9835a;

    const b = new VoxelBuilder(909, 0.05);
    // Post: 0.25 cubes, 8 high
    b.fill(0, 1, 0, 0.25, 2, 0.25, 0.25, (_ix, iy) => (iy & 1 ? WOOD : WOOD_LIGHT));
    // Board frame: 2.25 x 1.25 x 0.25 slab of cubes behind the face
    b.fill(0, 1.95, 0.125, SIGN_FACE.width + 0.25, SIGN_FACE.height + 0.25, 0.25, 0.25, (ix, iy) =>
      (ix + iy) & 1 ? BOARD : shade(BOARD, 0.93),
    );
    sign.add(b.build());

    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(SIGN_FACE.width, SIGN_FACE.height),
      new THREE.MeshBasicMaterial({
        map: createAddressTexture(
          { background: '#f4ecd2', text: '#1a5276', accent: '#c0392b' },
          { width: 128, pixelated: true },
        ),
      }),
    );
    face.position.set(0, 1.95, 0.27);
    sign.add(face);

    sign.position.set(SIGN_POSITION.x, SIGN_POSITION.y, SIGN_POSITION.z);
    sign.rotation.y = SIGN_YAW;
    this.group.add(sign);
  }

  destroy(): void {
    disposeObject(this.group);
  }
}
