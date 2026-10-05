import * as THREE from 'three';
import { disposeObject } from '../shared/dispose.ts';
import { SIGN_POSITION, SIGN_YAW, SIGN_FACE, createAddressTexture } from '../shared/addressSign.ts';

export class Environment {
  private group: THREE.Group;

  constructor(scene: THREE.Scene) {
    this.group = new THREE.Group();

    this.createStars();
    this.createTrees();
    this.createBushes();
    this.createWelcomeArch();
    this.createAddressSign();

    scene.add(this.group);
  }

  /** ~200 small stars scattered on a high dome (upper hemisphere). */
  private createStars(): void {
    const count = 200;
    const radius = 120;
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      // Uniform on the sphere, restricted to elevations above ~8 degrees
      const theta = Math.random() * Math.PI * 2;
      const y = 0.14 + Math.random() * 0.86;
      const r = Math.sqrt(1 - y * y);
      positions[i * 3] = Math.cos(theta) * r * radius;
      positions[i * 3 + 1] = y * radius;
      positions[i * 3 + 2] = Math.sin(theta) * r * radius;
    }
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const mat = new THREE.PointsMaterial({
      color: 0xcfe0ff,
      size: 1.1,
      sizeAttenuation: true,
      transparent: true,
      opacity: 0.85,
      depthWrite: false,
      fog: false,
    });
    const stars = new THREE.Points(geo, mat);
    stars.frustumCulled = false;
    this.group.add(stars);
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
      color: 0x3a2e1c,
      roughness: 0.7,
    });
    const trunk = new THREE.Mesh(trunkGeo, trunkMat);
    trunk.position.y = trunkHeight / 2;
    trunk.castShadow = true;
    tree.add(trunk);

    const canopyColors = [0x1d3a2a, 0x234530, 0x1a3328, 0x16302a];
    const canopyColor =
      canopyColors[Math.floor(Math.random() * canopyColors.length)];
    const canopyHeight = 2.5 * scale;
    const canopyRadius = 1.2 * scale;
    const canopyGeo = new THREE.ConeGeometry(canopyRadius, canopyHeight, 7);
    const canopyMat = new THREE.MeshStandardMaterial({
      color: canopyColor,
      roughness: 0.6,
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
      color: 0x1f3d2c,
      roughness: 0.6,
    });
    const bushMat2 = new THREE.MeshStandardMaterial({
      color: 0x193326,
      roughness: 0.6,
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
      color: 0x1a4a78,
      emissive: 0x1a5a9a,
      emissiveIntensity: 0.35,
      roughness: 0.3,
      metalness: 0.5,
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

  /** Brushed-metal signpost with a softly emissive address board. */
  private createAddressSign(): void {
    const sign = new THREE.Group();
    const metal = new THREE.MeshStandardMaterial({ color: 0x2b3550, roughness: 0.35, metalness: 0.7 });

    const base = new THREE.Mesh(new THREE.CylinderGeometry(0.32, 0.36, 0.1, 20), metal);
    base.position.y = 0.05;
    sign.add(base);

    const post = new THREE.Mesh(new THREE.CylinderGeometry(0.07, 0.07, 2.2, 16), metal);
    post.position.y = 1.1;
    post.castShadow = true;
    sign.add(post);

    const frame = new THREE.Mesh(
      new THREE.BoxGeometry(SIGN_FACE.width + 0.16, SIGN_FACE.height + 0.16, 0.08),
      metal,
    );
    frame.position.set(0, 1.95, 0.1);
    frame.castShadow = true;
    sign.add(frame);

    const texture = createAddressTexture({ background: '#10213a', text: '#e8f4ff', accent: '#4cc3ff' });
    const face = new THREE.Mesh(
      new THREE.PlaneGeometry(SIGN_FACE.width, SIGN_FACE.height),
      new THREE.MeshStandardMaterial({
        map: texture,
        emissive: 0xffffff,
        emissiveMap: texture,
        emissiveIntensity: 0.55,
        roughness: 0.4,
        metalness: 0.1,
      }),
    );
    face.position.set(0, 1.95, 0.145);
    sign.add(face);

    sign.position.set(SIGN_POSITION.x, SIGN_POSITION.y, SIGN_POSITION.z);
    sign.rotation.y = SIGN_YAW;
    this.group.add(sign);
  }

  destroy(): void {
    disposeObject(this.group);
  }
}
