import * as THREE from 'three';
import { disposeObject } from '../shared/dispose.ts';
import { SIGN_POSITION, SIGN_YAW, SIGN_FACE, createAddressTexture } from '../shared/addressSign.ts';

export class Environment {
  private group: THREE.Group;

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();

    this.createSkyDome();
    this.createTrees();
    this.createBushes();
    this.createWelcomeArch();
    this.createAddressSign();

    scene.add(this.group);
  }

  private createSkyDome(): void {
    const skyGeo = new THREE.SphereGeometry(150, 32, 32);

    const skyMat = new THREE.ShaderMaterial({
      side: THREE.BackSide,
      depthWrite: false,
      uniforms: {
        topColor: { value: new THREE.Color(0x87ceeb) },
        horizonColor: { value: new THREE.Color(0xf5deb3) },
        bottomColor: { value: new THREE.Color(0xf0e6d3) },
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
        uniform vec3 topColor;
        uniform vec3 horizonColor;
        uniform vec3 bottomColor;
        varying vec3 vWorldPosition;
        void main() {
          float h = normalize(vWorldPosition).y;
          vec3 color;
          if (h > 0.0) {
            color = mix(horizonColor, topColor, pow(h, 0.6));
          } else {
            color = mix(horizonColor, bottomColor, pow(-h, 0.4));
          }
          gl_FragColor = vec4(color, 1.0);
        }
      `,
    });

    const sky = new THREE.Mesh(skyGeo, skyMat);
    this.group.add(sky);
  }

  private createTree(x: number, z: number, scale: number): THREE.Group {
    const tree = new THREE.Group();

    const trunkHeight = 1.5 * scale;
    const trunkRadius = 0.15 * scale;
    const trunkGeo = new THREE.CylinderGeometry(
      trunkRadius * 0.7,
      trunkRadius,
      trunkHeight,
      6,
    );
    const trunkMat = new THREE.MeshStandardMaterial({
      color: 0x8b6914,
      roughness: 0.9,
    });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = trunkHeight / 2;
    trunk.castShadow = true;
    tree.add(trunk);

    const canopyColors = [0x4a7c2e, 0x5c8a3c, 0x6b9e4a, 0x3d6b24];
    const canopyColor =
      canopyColors[Math.floor(Math.random() * canopyColors.length)];
    const canopyHeight = 2.5 * scale;
    const canopyRadius = 1.2 * scale;
    const canopyGeo = new THREE.ConeGeometry(canopyRadius, canopyHeight, 7);
    const canopyMat = new THREE.MeshStandardMaterial({
      color: canopyColor,
      roughness: 0.8,
      flatShading: true,
    });
    const canopy = new THREE.Mesh(canopyGeo, canopyMat);
    canopy.position.y = trunkHeight + canopyHeight * 0.4;
    canopy.castShadow = true;
    canopy.receiveShadow = true;
    tree.add(canopy);

    const topCanopyGeo = new THREE.ConeGeometry(
      canopyRadius * 0.65,
      canopyHeight * 0.7,
      7,
    );
    const topCanopy = new THREE.Mesh(topCanopyGeo, canopyMat);
    topCanopy.position.y = trunkHeight + canopyHeight * 0.85;
    topCanopy.castShadow = true;
    tree.add(topCanopy);

    tree.position.set(x, 0, z);
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

    for (const [x, z, scale] of treePositions) {
      const tree = this.createTree(x, z, scale);
      this.group.add(tree);
    }
  }

  private createBushes(): void {
    const bushMat = new THREE.MeshStandardMaterial({
      color: 0x5a8f3c,
      roughness: 0.85,
      flatShading: true,
    });
    const bushMat2 = new THREE.MeshStandardMaterial({
      color: 0x4a7a2e,
      roughness: 0.85,
      flatShading: true,
    });

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
    const archMat = new THREE.MeshStandardMaterial({
      color: 0x1a5276,
      roughness: 0.5,
      metalness: 0.3,
    });

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

  /** Wooden signpost with the address board, right of the welcome arch. */
  private createAddressSign(): void {
    const sign = new THREE.Group();
    const wood = new THREE.MeshStandardMaterial({ color: 0x6b4f3a, roughness: 0.85 });
    const boardWood = new THREE.MeshStandardMaterial({ color: 0x8b6b4a, roughness: 0.75 });

    const base = new THREE.Mesh(new THREE.BoxGeometry(0.6, 0.12, 0.6), wood);
    base.position.y = 0.06;
    sign.add(base);

    const post = new THREE.Mesh(new THREE.BoxGeometry(0.2, 2.2, 0.2), wood);
    post.position.y = 1.1;
    post.castShadow = true;
    sign.add(post);

    const board = new THREE.Mesh(
      new THREE.BoxGeometry(SIGN_FACE.width + 0.2, SIGN_FACE.height + 0.2, 0.1),
      boardWood,
    );
    board.position.set(0, 1.95, 0.13);
    board.castShadow = true;
    sign.add(board);

    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(SIGN_FACE.width, SIGN_FACE.height),
      new THREE.MeshStandardMaterial({
        map: createAddressTexture({ background: '#f3ead8', text: '#1a5276', accent: '#c0392b' }),
        roughness: 0.8,
      }),
    );
    face.position.set(0, 1.95, 0.185);
    sign.add(face);

    sign.position.set(SIGN_POSITION.x, SIGN_POSITION.y, SIGN_POSITION.z);
    sign.rotation.y = SIGN_YAW;
    this.group.add(sign);
  }

  destroy(): void {
    disposeObject(this.group);
  }
}
