import * as THREE from 'three';
import type { SignatureContext, SignatureHandle, SignatureQuality } from '../types.ts';
import { GLSL_NOISE, createSoftDotTexture, disposePoints } from '../shared/signatureUtils.ts';

// --- Tunables (golden hour) -------------------------------------------------------------------
/** Warm shaft tint. */
const SHAFT_COLOR = 0xffd9a0;
/** Peak alpha of a shaft (additive). Raise for stronger god-rays. */
const SHAFT_INTENSITY = 0.16;
/** Length of each shaft along the sun direction (world units). */
const SHAFT_LENGTH = 26;
/** Sun direction as in original/Lights.ts (position of the directional light). */
const SUN_POSITION = new THREE.Vector3(15, 25, 10);
/** Sway amplitude (world units) and speed (rad/s). */
const SWAY_AMPLITUDE = 1.1;
const SWAY_SPEED = 0.18;
/** Feet of the shafts on the ground: [x, z, width]. The first 3 stay on low quality. */
const SHAFTS: ReadonlyArray<readonly [number, number, number]> = [
  [-4, 29, 4.5], // around the welcome arch
  [4.5, 34, 3.4],
  [0, 39, 6],
  [-26, 2, 5],
  [27, -6, 4],
  [-23, -26, 5.5],
  [25, 22, 3.8],
];
const SHAFTS_LOW = 3;

const MOTES_HIGH = 70;
const MOTES_LOW = 20;
const MOTE_SIZE = 0.16;
const MOTE_COLOR = 0xffd9a0;
/** Mote volume: boxes outside the building footprint (x, z centers; half extents). */
const MOTE_ZONES: ReadonlyArray<readonly [number, number, number, number]> = [
  [0, 34, 9, 7], // welcome arch
  [-27, 4, 6, 20], // west lawn
  [27, -2, 6, 20], // east lawn
];
const MOTE_MAX_HEIGHT = 7;

const SHAFT_VERTEX = /* glsl */ `
  uniform vec3 uCenter;
  uniform vec3 uAxis;
  uniform vec2 uSize;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    // Cylindrical billboard: the quad spins around its axis to face the camera
    vec3 side = normalize(cross(uAxis, cameraPosition - uCenter));
    vec3 wp = uCenter + side * position.x * uSize.x + uAxis * position.y * uSize.y;
    gl_Position = projectionMatrix * viewMatrix * vec4(wp, 1.0);
  }
`;

const SHAFT_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uTime;
  uniform float uSeed;
  varying vec2 vUv;
  ${GLSL_NOISE}
  void main() {
    // vUv.y: 0 at the sun end, 1 at the ground end
    float fadeTop = smoothstep(0.0, 0.18, vUv.y);
    float fadeFoot = 1.0 - smoothstep(0.55, 1.0, vUv.y);
    float edge = sin(3.14159265 * vUv.x);
    edge = edge * edge;
    float streak = sigFbm(vec2(vUv.x * 4.0 + uSeed, vUv.y * 1.6 - uTime * 0.05));
    float shimmer = 0.75 + 0.25 * sin(uTime * 0.5 + uSeed * 6.0);
    float a = uIntensity * fadeTop * fadeFoot * edge * mix(0.35, 1.2, streak) * shimmer;
    gl_FragColor = vec4(uColor * a, a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

interface Shaft {
  mesh: THREE.Mesh;
  material: THREE.ShaderMaterial;
  footX: number;
  footZ: number;
  phase: number;
}

class GoldenHourSignature implements SignatureHandle {
  readonly depthExclude: THREE.Object3D[] = [];

  private _scene: THREE.Scene;
  private _group = new THREE.Group();
  private _shaftGeo = new THREE.PlaneGeometry(1, 1);
  private _shafts: Shaft[] = [];
  private _axis = new THREE.Vector3();
  private _motes: THREE.Points;
  private _moteBase: Float32Array;
  private _movePhase: Float32Array;
  private _moteColors: Float32Array;
  private _moteCount = MOTES_HIGH;

  constructor(ctx: SignatureContext) {
    this._scene = ctx.scene;
    this._axis.copy(SUN_POSITION).negate().normalize(); // direction of the light travel (downwards)

    SHAFTS.forEach(([x, z, width], i) => {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          uCenter: { value: new THREE.Vector3() },
          uAxis: { value: this._axis },
          uSize: { value: new THREE.Vector2(width, SHAFT_LENGTH) },
          uColor: { value: new THREE.Color(SHAFT_COLOR) },
          uIntensity: { value: SHAFT_INTENSITY },
          uTime: { value: 0 },
          uSeed: { value: i * 3.7 },
        },
        vertexShader: SHAFT_VERTEX,
        fragmentShader: SHAFT_FRAGMENT,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: false,
      });
      const mesh = new THREE.Mesh(this._shaftGeo, material);
      mesh.frustumCulled = false;
      mesh.renderOrder = 2;
      this._group.add(mesh);
      this._shafts.push({ mesh, material, footX: x, footZ: z, phase: i * 1.7 });
      this.depthExclude.push(mesh);
    });

    // Pollen / dust motes
    const geo = new THREE.BufferGeometry();
    geo.setAttribute('position', new THREE.BufferAttribute(new Float32Array(MOTES_HIGH * 3), 3));
    this._moteColors = new Float32Array(MOTES_HIGH * 3);
    geo.setAttribute('color', new THREE.BufferAttribute(this._moteColors, 3));
    const mat = new THREE.PointsMaterial({
      size: MOTE_SIZE,
      map: createSoftDotTexture(),
      color: MOTE_COLOR,
      vertexColors: true,
      transparent: true,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      sizeAttenuation: true,
      fog: false,
    });
    this._motes = new THREE.Points(geo, mat);
    this._motes.frustumCulled = false;
    this._moteBase = new Float32Array(MOTES_HIGH * 3);
    this._movePhase = new Float32Array(MOTES_HIGH * 2);
    for (let i = 0; i < MOTES_HIGH; i++) {
      const zone = MOTE_ZONES[i % MOTE_ZONES.length];
      this._moteBase[i * 3] = zone[0] + (Math.random() * 2 - 1) * zone[2];
      this._moteBase[i * 3 + 1] = 0.6 + Math.random() * MOTE_MAX_HEIGHT;
      this._moteBase[i * 3 + 2] = zone[1] + (Math.random() * 2 - 1) * zone[3];
      this._movePhase[i * 2] = Math.random() * 6.28;
      this._movePhase[i * 2 + 1] = 0.4 + Math.random() * 0.8;
    }
    this._group.add(this._motes);
    this.depthExclude.push(this._motes);

    this._scene.add(this._group);
    this.setQuality(ctx.quality);
  }

  setQuality(quality: SignatureQuality): void {
    const high = quality === 'high';
    for (let i = 0; i < this._shafts.length; i++) this._shafts[i].mesh.visible = high || i < SHAFTS_LOW;
    this._moteCount = high ? MOTES_HIGH : MOTES_LOW;
    this._motes.geometry.setDrawRange(0, this._moteCount);
  }

  update(_dt: number, time: number): void {
    const axis = this._axis;
    const half = SHAFT_LENGTH / 2;
    for (let i = 0; i < this._shafts.length; i++) {
      const s = this._shafts[i];
      if (!s.mesh.visible) continue;
      const u = s.material.uniforms;
      const sway = Math.sin(time * SWAY_SPEED + s.phase) * SWAY_AMPLITUDE;
      const sway2 = Math.cos(time * SWAY_SPEED * 0.7 + s.phase * 1.3) * SWAY_AMPLITUDE * 0.6;
      // Center = foot - axis * half (axis points down, so this lifts the center toward the sun)
      (u.uCenter.value as THREE.Vector3).set(
        s.footX + sway - axis.x * half,
        -axis.y * half,
        s.footZ + sway2 - axis.z * half,
      );
      u.uTime.value = time;
    }

    const pos = this._motes.geometry.getAttribute('position') as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const col = this._moteColors;
    for (let i = 0; i < this._moteCount; i++) {
      const ph = this._movePhase[i * 2];
      const sp = this._movePhase[i * 2 + 1];
      const t = time * sp + ph;
      arr[i * 3] = this._moteBase[i * 3] + Math.sin(t * 0.7) * 1.4 + Math.sin(t * 0.21 + ph) * 2.2;
      arr[i * 3 + 1] = this._moteBase[i * 3 + 1] + Math.sin(t * 0.9 + 1.3) * 0.5;
      arr[i * 3 + 2] = this._moteBase[i * 3 + 2] + Math.cos(t * 0.6) * 1.4;
      const tw = 0.35 + 0.65 * (0.5 + 0.5 * Math.sin(t * 1.7));
      col[i * 3] = tw;
      col[i * 3 + 1] = tw * 0.92;
      col[i * 3 + 2] = tw * 0.75;
    }
    pos.needsUpdate = true;
    (this._motes.geometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
  }

  destroy(): void {
    for (const s of this._shafts) s.material.dispose();
    this._shaftGeo.dispose();
    disposePoints(this._motes);
    this._scene.remove(this._group);
    this._shafts.length = 0;
    this.depthExclude.length = 0;
  }
}

export function createSignature(ctx: SignatureContext): SignatureHandle {
  return new GoldenHourSignature(ctx);
}
