import * as THREE from 'three';
import { disposeObject } from '../shared/dispose.ts';
import { SIGN_POSITION, SIGN_YAW, SIGN_FACE, createAddressTexture } from '../shared/addressSign.ts';
import { flatMat, seededRandom } from '../shared/lowPoly.ts';

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
    const skyGeo = new THREE.SphereGeometry(150, 24, 16);

    // Posterized pastel bands, from the horizon (index 0) up to the zenith
    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        band0: { value: new THREE.Color(0xfbe3c2) },
        band1: { value: new THREE.Color(0xf8d3b9) },
        band2: { value: new THREE.Color(0xd5d9ea) },
        band3: { value: new THREE.Color(0xa9d0ee) },
        band4: { value: new THREE.Color(0x7fb9e8) },
      },
      vertexShader: `
        varying vec3 vWorldPosition;
        void main() {
          vec4 worldPos = modelMatrix * vec4(position, 1.0);
          vWorldPosition = worldPos.xyz;
          gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
        }
      `,
      fragmentShader: `
        uniform vec3 band0;
        uniform vec3 band1;
        uniform vec3 band2;
        uniform vec3 band3;
        uniform vec3 band4;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
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
    this.group.add(sky);
  }

  private createTree(x: number, z: number, scale: number, rand: () => number): THREE.Group {
    const tree = new THREE.Group();

    const trunkHeight = 1.5 * scale;
    const trunkRadius = 0.15 * scale;
    const trunk = new THREE.Mesh(
      new THREE.CylinderGeometry(trunkRadius * 0.7, trunkRadius, trunkHeight, 6),
      flatMat(0x8d5a3b),
    );
    trunk.position.y = trunkHeight / 2;
    trunk.castShadow = true;
    tree.add(trunk);

    const canopyColors = [0x2e8b57, 0x3aa76d];
    const canopyMat = flatMat(canopyColors[Math.floor(rand() * canopyColors.length)]);
    const canopyHeight = 2.5 * scale;
    const canopyRadius = 1.2 * scale;

    // Three stacked cones, each smaller than the one below
    const tiers: [number, number, number][] = [
      [1, 0.7, 0.3],
      [0.75, 0.6, 0.62],
      [0.5, 0.5, 0.92],
    ];
    for (const [r, h, y] of tiers) {
      const cone = new THREE.Mesh(
        new THREE.ConeGeometry(canopyRadius * r, canopyHeight * h, 6),
        canopyMat,
      );
      cone.position.y = trunkHeight + canopyHeight * y;
      cone.castShadow = true;
      cone.receiveShadow = true;
      tree.add(cone);
    }

    tree.position.set(x, 0, z);
    tree.rotation.y = rand() * Math.PI * 2;
    const jitter = 0.9 + rand() * 0.25;
    tree.scale.set(jitter, 0.9 + rand() * 0.3, jitter);
    return tree;
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
    for (const [x, z, scale] of treePositions) {
      const tree = this.createTree(x, z, scale, rand);
      this.group.add(tree);
    }
  }

  private createBushes(): void {
    const bushMat = flatMat(0x4caf50);
    const bushMat2 = flatMat(0x43a047);

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
      const bush = new THREE.Group();
      const mat = Math.random() > 0.5 ? bushMat : bushMat2;

      const mainGeo = new THREE.DodecahedronGeometry(0.6, 0);
      const main = new THREE.Mesh(mainGeo, mat);
      main.position.y = 0.4;
      main.castShadow = true;
      bush.add(main);

      const sideGeo = new THREE.DodecahedronGeometry(0.45, 0);
      const side1 = new THREE.Mesh(sideGeo, mat);
      side1.position.set(0.5, 0.3, 0.2);
      side1.castShadow = true;
      bush.add(side1);

      const side2 = new THREE.Mesh(sideGeo, mat);
      side2.position.set(-0.4, 0.3, -0.3);
      side2.castShadow = true;
      bush.add(side2);

      bush.position.set(x, 0, z);
      this.group.add(bush);
    }
  }

  private createWelcomeArch(): void {
    const arch = new THREE.Group();
    const archMat = flatMat(0x1a5276);

    const pillarGeo = new THREE.BoxGeometry(0.4, 4, 0.4);
    const leftPillar = new THREE.Mesh(pillarGeo, archMat);
    leftPillar.position.set(-3, 2, 0);
    leftPillar.castShadow = true;
    arch.add(leftPillar);

    const rightPillar = new THREE.Mesh(pillarGeo, archMat);
    rightPillar.position.set(3, 2, 0);
    rightPillar.castShadow = true;
    arch.add(rightPillar);

    const beamGeo = new THREE.BoxGeometry(6.8, 0.5, 0.5);
    const beam = new THREE.Mesh(beamGeo, archMat);
    beam.position.set(0, 4.25, 0);
    beam.castShadow = true;
    arch.add(beam);

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

  /** Decorative faceted rocks, all outside the building footprint and paths. */
  private createRocks(): void {
    const rand = seededRandom(77);
    const spots: [number, number][] = [
      [-24, -12], [-27, 14], [24, -14], [27, 12], [-22, 28], [22, 26],
      [-30, -34], [30, -36], [-20, -30], [18, -40], [10, 36], [-12, 36],
    ];
    const grays = [0x9a9a96, 0x8a8c8e, 0xb0aea6, 0x7c7f82];
    for (const [x, z] of spots) {
      const s = 0.5 + rand() * 0.9;
      const geo = rand() > 0.5
        ? new THREE.DodecahedronGeometry(1, 0)
        : new THREE.IcosahedronGeometry(1, 0);
      const rock = new THREE.Mesh(geo, flatMat(grays[Math.floor(rand() * grays.length)]));
      rock.scale.set(s * (0.9 + rand() * 0.5), s * (0.6 + rand() * 0.4), s * (0.9 + rand() * 0.5));
      rock.position.set(x, s * 0.35, z);
      rock.rotation.set(rand() * 0.5, rand() * Math.PI * 2, rand() * 0.5);
      rock.castShadow = true;
      rock.receiveShadow = true;
      this.group.add(rock);
    }
  }

  /** Bright low-poly clouds high in the sky (unaffected by fog). */
  private createClouds(): void {
    const rand = seededRandom(9);
    const cloudMat = flatMat(0xffffff, {
      emissive: 0xffffff,
      emissiveIntensity: 0.75,
      fog: false,
    });
    for (let i = 0; i < 6; i++) {
      const cloud = new THREE.Group();
      const puffs = 3 + Math.floor(rand() * 2);
      for (let j = 0; j < puffs; j++) {
        const r = 3 + rand() * 2.5;
        const puff = new THREE.Mesh(new THREE.IcosahedronGeometry(r, 0), cloudMat);
        puff.position.set(j * 4 - puffs * 2 + rand() * 1.5, rand() * 1.5, rand() * 3 - 1.5);
        puff.scale.y = 0.65;
        cloud.add(puff);
      }
      const angle = (i / 6) * Math.PI * 2 + rand() * 0.5;
      const dist = 45 + rand() * 40;
      cloud.position.set(Math.cos(angle) * dist, 38 + rand() * 14, Math.sin(angle) * dist);
      cloud.rotation.y = rand() * Math.PI;
      this.group.add(cloud);
    }
  }

  /** Far low-poly hills beyond the border walls, purely decorative. */
  private createHills(): void {
    const rand = seededRandom(31);
    const colors = [0x7bc043, 0x8fd14f, 0x6fb03a];
    const spots: [number, number][] = [
      [-64, -30], [-66, 20], [64, -20], [66, 34], [-30, -64],
      [20, -66], [34, 64], [-40, 66], [-62, 58], [62, -62],
    ];
    for (const [x, z] of spots) {
      const r = 8 + rand() * 6;
      const hill = new THREE.Mesh(
        new THREE.IcosahedronGeometry(r, 0),
        flatMat(colors[Math.floor(rand() * colors.length)]),
      );
      hill.scale.set(1.2, 0.45 + rand() * 0.2, 1.2);
      hill.position.set(x, -r * 0.1, z);
      hill.rotation.y = rand() * Math.PI;
      hill.receiveShadow = true;
      this.group.add(hill);
    }
  }

  /** Faceted wooden signpost with the address board, right of the welcome arch. */
  private createAddressSign(): void {
    const sign = new THREE.Group();
    const wood = flatMat(0x6b4f3a);
    const boardWood = flatMat(0x8b6b4a);

    const base = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.12, 0.6), wood);
    base.position.y = 0.06;
    sign.add(base);

    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.09, 0.12, 2.2, 6), wood);
    post.position.y = 1.1;
    post.castShadow = true;
    sign.add(post);

    const board = new THREE.Mesh(
      new THREE.BoxGeometry(SIGN_FACE.width + 0.2, SIGN_FACE.height + 0.2, 0.1),
      boardWood,
    );
    board.position.set(0, 1.95, 0.13);
    board.rotation.z = 0.07; // angled board
    board.castShadow = true;
    sign.add(board);

    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(SIGN_FACE.width, SIGN_FACE.height),
      flatMat(0xffffff, {
        map: createAddressTexture({ background: '#f6edd6', text: '#1a5276', accent: '#e67e22' }),
      }),
    );
    face.position.set(0, 1.95, 0.185);
    face.rotation.z = 0.07;
    sign.add(face);

    sign.position.set(SIGN_POSITION.x, SIGN_POSITION.y, SIGN_POSITION.z);
    sign.rotation.y = SIGN_YAW;
    this.group.add(sign);
  }

  destroy(): void {
    disposeObject(this.group);
  }
}
