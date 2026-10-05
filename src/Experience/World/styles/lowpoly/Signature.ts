import * as THREE from 'three';
import { mergeGeometries } from 'three/examples/jsm/utils/BufferGeometryUtils.js';
import type { SignatureContext, SignatureHandle, SignatureQuality } from '../types.ts';
import { flatMat } from '../shared/lowPoly.ts';
import { GLSL_NOISE, createSoftDotTexture, disposePoints } from '../shared/signatureUtils.ts';

// --- Tunables (faceted lake & mist) -----------------------------------------------------------
/** Pond center (x, z) and radius. Kept clear of the trees/bushes/rocks of lowpoly/Environment.ts. */
const POND_X = -30;
const POND_Z = 22;
const POND_RADIUS = 6.5;
/** Water surface height and wave amplitude (sum of 3 sines, so the peak is ~2.6x this). */
const WATER_Y = 0.1;
const WAVE_AMPLITUDE = 0.025;
const WAVE_SPEED = 1;
const WATER_COLOR = 0x7cc8f2;
const POND_SEGMENTS = 14;
const GLINT_COUNT = 40;
const GLINT_SIZE = 0.32;

/** Mist planes: [x, y, z, size, driftAmplitude, driftSpeed]. The first 2 stay on low quality. */
const MIST_PLANES: ReadonlyArray<readonly [number, number, number, number, number, number]> = [
  [-30, 0.5, 22, 30, 3, 0.07], // over the pond
  [0, 0.7, 40, 42, 4, 0.05], // beyond the welcome arch
  [31, 0.55, -6, 34, 3.5, 0.06],
  [-28, 0.8, -22, 36, 3, 0.05],
  [30, 0.45, 26, 32, 3, 0.08],
  [0, 0.9, -42, 44, 4, 0.04],
];
const MIST_LOW = 2;
const MIST_COLOR = 0xfff1dc;
const MIST_OPACITY = 0.34;

/** Toon outline: inverted hull colour and robot inflation (scale about each part's origin). */
const OUTLINE_COLOR = 0x16202c;
const ROBOT_OUTLINE_SCALE = 1.05;
/** Arch geometry mirrored from lowpoly/Environment.ts (createWelcomeArch) + absolute inflation per axis. */
const ARCH_POSITION = new THREE.Vector3(0, 0, 31);
const ARCH_INFLATE = 0.1;
const ARCH_PARTS: ReadonlyArray<readonly [number, number, number, number, number, number]> = [
  // sx, sy, sz, x, y, z
  [0.4, 4, 0.4, -3, 2, 0],
  [0.4, 4, 0.4, 3, 2, 0],
  [6.8, 0.5, 0.5, 0, 4.25, 0],
];

const MIST_VERTEX = /* glsl */ `
  varying vec2 vUv;
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const MIST_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uOpacity;
  uniform float uTime;
  uniform float uSeed;
  varying vec2 vUv;
  ${GLSL_NOISE}
  void main() {
    float d = length(vUv - 0.5) * 2.0;
    float edge = 1.0 - smoothstep(0.3, 1.0, d);
    float n = sigFbm(vUv * 4.5 + vec2(uTime * 0.025 + uSeed, uTime * 0.012));
    float a = edge * smoothstep(0.3, 0.8, n) * uOpacity;
    gl_FragColor = vec4(uColor, a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

function waveY(x: number, z: number, t: number, fade: number): number {
  return (
    WAVE_AMPLITUDE *
    fade *
    (Math.sin(x * 0.9 + t * 1.3) + Math.sin(z * 1.1 - t) + 0.6 * Math.sin((x + z) * 0.6 + t * 1.7))
  );
}

/** Merges the parts of `root` into one position-only geometry, inflated for an inverted-hull outline. */
function buildRobotHull(root: THREE.Object3D, scale: number): THREE.BufferGeometry | null {
  root.updateWorldMatrix(true, true);
  const inv = new THREE.Matrix4().copy(root.matrixWorld).invert();
  const rel = new THREE.Matrix4();
  const scaleM = new THREE.Matrix4().makeScale(scale, scale, scale);
  const parts: THREE.BufferGeometry[] = [];
  root.traverse((o) => {
    const m = o as THREE.Mesh;
    if (!m.isMesh || !m.visible) return;
    const mat = m.material as THREE.Material;
    if (mat.transparent) return;
    const g = m.geometry.index ? m.geometry.toNonIndexed() : m.geometry.clone();
    for (const name of Object.keys(g.attributes)) if (name !== 'position') g.deleteAttribute(name);
    rel.multiplyMatrices(inv, m.matrixWorld).multiply(scaleM);
    g.applyMatrix4(rel);
    parts.push(g);
  });
  if (parts.length === 0) return null;
  const merged = mergeGeometries(parts, false);
  for (const g of parts) g.dispose();
  return merged;
}

function buildArchHull(): THREE.BufferGeometry {
  const parts = ARCH_PARTS.map(([sx, sy, sz, x, y, z]) => {
    const g = new THREE.BoxGeometry(sx + ARCH_INFLATE, sy + ARCH_INFLATE, sz + ARCH_INFLATE).toNonIndexed();
    g.deleteAttribute('normal');
    g.deleteAttribute('uv');
    g.translate(x, y, z);
    return g;
  });
  const merged = mergeGeometries(parts, false);
  for (const g of parts) g.dispose();
  return merged;
}

interface MistPlane {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  baseX: number;
  baseZ: number;
  amplitude: number;
  speed: number;
  phase: number;
}

class FacetedLakeSignature implements SignatureHandle {
  private _scene: THREE.Scene;
  private _ctx: SignatureContext;
  private _group = new THREE.Group();

  // Pond
  private _waterGeo: THREE.PlaneGeometry;
  private _waterMesh: THREE.Mesh;
  private _waterXZ: Float32Array;
  private _waterFade: Float32Array;
  private _glints: THREE.Points;
  private _glintBase: Float32Array;
  private _glintPhase: Float32Array;
  private _glintColors: Float32Array;
  private _pondParts: THREE.Mesh[] = [];

  // Mist
  private _mistGeo = new THREE.PlaneGeometry(1, 1).rotateX(-Math.PI / 2);
  private _mist: MistPlane[] = [];

  // Outlines (high quality only)
  private _outlineMat = new THREE.MeshBasicMaterial({ color: OUTLINE_COLOR, side: THREE.BackSide });
  private _robotOutline: THREE.Mesh | null = null;
  private _archOutline: THREE.Mesh | null = null;
  private _robotRef: THREE.Object3D | null = null;

  constructor(ctx: SignatureContext) {
    this._ctx = ctx;
    this._scene = ctx.scene;
    this._group.position.set(0, 0, 0);

    // --- Pond: squircle grid mapped onto a disc, flat shaded so every wave facet catches the sun
    const n = POND_SEGMENTS;
    this._waterGeo = new THREE.PlaneGeometry(2, 2, n, n).rotateX(-Math.PI / 2);
    const pos = this._waterGeo.getAttribute('position') as THREE.BufferAttribute;
    this._waterXZ = new Float32Array(pos.count * 2);
    this._waterFade = new Float32Array(pos.count);
    for (let i = 0; i < pos.count; i++) {
      const u = pos.getX(i);
      const v = pos.getZ(i);
      const x = POND_RADIUS * u * Math.sqrt(1 - (v * v) / 2);
      const z = POND_RADIUS * v * Math.sqrt(1 - (u * u) / 2);
      this._waterXZ[i * 2] = x;
      this._waterXZ[i * 2 + 1] = z;
      const r = Math.hypot(x, z) / POND_RADIUS;
      this._waterFade[i] = 1 - THREE.MathUtils.smoothstep(r, 0.75, 1);
      pos.setXYZ(i, x, 0, z);
    }
    const waterMat = new THREE.MeshStandardMaterial({
      color: WATER_COLOR,
      emissive: 0x1d4f7a,
      emissiveIntensity: 0.3,
      roughness: 0.28,
      metalness: 0.05,
      flatShading: true,
      transparent: true,
      opacity: 0.86,
    });
    this._waterMesh = new THREE.Mesh(this._waterGeo, waterMat);
    this._waterMesh.position.set(POND_X, WATER_Y, POND_Z);
    this._waterMesh.receiveShadow = true;
    this._waterMesh.frustumCulled = false; // vertices move on the CPU
    this._group.add(this._waterMesh);

    // Deep bed below the surface and a sandy faceted rim
    const bed = new THREE.Mesh(
      new THREE.CircleGeometry(POND_RADIUS * 0.98, 20),
      flatMat(0x2f6f9f, { roughness: 1 }),
    );
    bed.rotation.x = -Math.PI / 2;
    bed.position.set(POND_X, 0.04, POND_Z);
    bed.receiveShadow = true;
    const rim = new THREE.Mesh(
      new THREE.RingGeometry(POND_RADIUS - 0.45, POND_RADIUS + 0.9, 20, 1),
      flatMat(0xd9c59a, { roughness: 1 }),
    );
    rim.rotation.x = -Math.PI / 2;
    rim.position.set(POND_X, 0.06, POND_Z);
    rim.receiveShadow = true;
    this._group.add(bed, rim);
    this._pondParts.push(bed, rim);

    // Glints
    const gGeo = new THREE.BufferGeometry();
    gGeo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(GLINT_COUNT * 3), 3));
    this._glintColors = new Float32Array(GLINT_COUNT * 3);
    gGeo.setAttribute('color', new THREE.BufferAttribute(this._glintColors, 3));
    this._glints = new THREE.Points(
      gGeo,
      new THREE.PointsMaterial({
        size: GLINT_SIZE,
        map: createSoftDotTexture(),
        color: 0xffffff,
        vertexColors: true,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        sizeAttenuation: true,
      }),
    );
    this._glints.frustumCulled = false;
    this._glintBase = new Float32Array(GLINT_COUNT * 2);
    this._glintPhase = new Float32Array(GLINT_COUNT * 2);
    for (let i = 0; i < GLINT_COUNT; i++) {
      const a = Math.random() * Math.PI * 2;
      const r = Math.sqrt(Math.random()) * POND_RADIUS * 0.85;
      this._glintBase[i * 2] = Math.cos(a) * r;
      this._glintBase[i * 2 + 1] = Math.sin(a) * r;
      this._glintPhase[i * 2] = Math.random() * 6.28;
      this._glintPhase[i * 2 + 1] = 1.2 + Math.random() * 2.2;
    }
    this._group.add(this._glints);

    // --- Mist
    MIST_PLANES.forEach(([x, y, z, size, amp, speed], i) => {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(MIST_COLOR) },
          uOpacity: { value: MIST_OPACITY },
          uTime: { value: 0 },
          uSeed: { value: i * 5.3 },
        },
        vertexShader: MIST_VERTEX,
        fragmentShader: MIST_FRAGMENT,
        transparent: true,
        depthWrite: false,
        fog: false,
      });
      const mesh = new THREE.Mesh(this._mistGeo, material);
      mesh.scale.set(size, 1, size);
      mesh.position.set(x, y, z);
      mesh.renderOrder = 1;
      mesh.frustumCulled = false;
      this._group.add(mesh);
      this._mist.push({ mesh, material, baseX: x, baseZ: z, amplitude: amp, speed, phase: i * 2.1 });
    });

    this._scene.add(this._group);
    this._applyWaves(0);
    this.setQuality(ctx.quality);
  }

  setQuality(quality: SignatureQuality): void {
    const high = quality === 'high';
    for (let i = 0; i < this._mist.length; i++) this._mist[i].mesh.visible = high || i < MIST_LOW;
    this._setOutlines(high);
  }

  private _setOutlines(on: boolean): void {
    if (on && !this._robotOutline) {
      const robot = this._ctx.getRobot();
      const robotHull = buildRobotHull(robot, ROBOT_OUTLINE_SCALE);
      if (robotHull) {
        this._robotOutline = new THREE.Mesh(robotHull, this._outlineMat);
        this._robotOutline.frustumCulled = false;
        this._robotRef = robot;
        this._scene.add(this._robotOutline);
      }
      this._archOutline = new THREE.Mesh(buildArchHull(), this._outlineMat);
      this._archOutline.position.copy(ARCH_POSITION);
      this._scene.add(this._archOutline);
    } else if (!on) {
      for (const m of [this._robotOutline, this._archOutline]) {
        if (!m) continue;
        m.parent?.remove(m);
        m.geometry.dispose();
      }
      this._robotOutline = null;
      this._archOutline = null;
      this._robotRef = null;
    }
  }

  private _applyWaves(time: number): void {
    const t = time * WAVE_SPEED;
    const pos = this._waterGeo.getAttribute('position') as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    for (let i = 0; i < pos.count; i++) {
      const x = this._waterXZ[i * 2];
      const z = this._waterXZ[i * 2 + 1];
      arr[i * 3 + 1] = waveY(x, z, t, this._waterFade[i]);
    }
    pos.needsUpdate = true;

    const gp = this._glints.geometry.getAttribute('position') as THREE.BufferAttribute;
    const garr = gp.array as Float32Array;
    for (let i = 0; i < GLINT_COUNT; i++) {
      const x = this._glintBase[i * 2];
      const z = this._glintBase[i * 2 + 1];
      garr[i * 3] = POND_X + x;
      garr[i * 3 + 1] = WATER_Y + 0.05 + waveY(x, z, t, 1);
      garr[i * 3 + 2] = POND_Z + z;
      // Sharp, short sparkle peaks
      const s = Math.sin(time * this._glintPhase[i * 2 + 1] + this._glintPhase[i * 2]);
      const k = Math.pow(Math.max(s, 0), 6);
      this._glintColors[i * 3] = k * 0.9;
      this._glintColors[i * 3 + 1] = k;
      this._glintColors[i * 3 + 2] = k;
    }
    gp.needsUpdate = true;
    (this._glints.geometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
  }

  update(_dt: number, time: number): void {
    this._applyWaves(time);

    for (let i = 0; i < this._mist.length; i++) {
      const m = this._mist[i];
      if (!m.mesh.visible) continue;
      const a = time * m.speed + m.phase;
      m.mesh.position.x = m.baseX + Math.sin(a) * m.amplitude;
      m.mesh.position.z = m.baseZ + Math.cos(a * 0.8) * m.amplitude * 0.7;
      m.material.uniforms.uTime.value = time;
    }

    if (this._robotOutline && this._robotRef) {
      this._robotOutline.position.copy(this._robotRef.position);
      this._robotOutline.quaternion.copy(this._robotRef.quaternion);
    }
  }

  destroy(): void {
    this._setOutlines(false);
    this._outlineMat.dispose();
    this._waterGeo.dispose();
    (this._waterMesh.material as THREE.Material).dispose();
    for (const p of this._pondParts) {
      p.geometry.dispose();
      (p.material as THREE.Material).dispose();
    }
    disposePoints(this._glints);
    for (const m of this._mist) m.material.dispose();
    this._mistGeo.dispose();
    this._scene.remove(this._group);
    this._mist.length = 0;
  }
}

export function createSignature(ctx: SignatureContext): SignatureHandle {
  return new FacetedLakeSignature(ctx);
}
