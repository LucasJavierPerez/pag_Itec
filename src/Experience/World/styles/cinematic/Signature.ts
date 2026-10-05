import * as THREE from 'three';
import { Reflector } from 'three/examples/jsm/objects/Reflector.js';
import type { SignatureContext, SignatureHandle, SignatureQuality } from '../types.ts';
import { GROUND } from '../shared/groundLayers.ts';
import { GLSL_NOISE, createSoftDotTexture, disposePoints } from '../shared/signatureUtils.ts';

// --- Tunables (mirror floor & light shafts) ---------------------------------------------------
/** Mirror floor: plane height (above sand, grass and the pad; below classroom floors, paths and entrance markers) and opacity. */
const MIRROR_Y = GROUND.mirror;
const MIRROR_SIZE = 100;
const MIRROR_ALPHA = 0.32;
const MIRROR_TEXTURE_SIZE = 512;
const MIRROR_MSAA = 4;
/** Reflection weight at grazing vs. top-down views (multiplies MIRROR_ALPHA). */
const MIRROR_ALPHA_MIN_FACTOR = 0.65;

/** Cone of the follow spot. */
const CONE_COLOR = 0xfff0d8;
const CONE_INTENSITY = 0.14;
const CONE_SEGMENTS = 40;
/** Fraction of the spot's half-angle drawn by the cone (the outer part of the beam is penumbra). */
const CONE_ANGLE_FACTOR = 0.78;
/** Extra length past the target so the cone reaches the floor. */
const CONE_EXTRA_LENGTH = 0.8;

/** Rain falling through the cone. */
const RAIN_HIGH = 220;
const RAIN_LOW = 80;
const RAIN_COLOR = 0xbfdcff;
const RAIN_SIZE = 0.09;
const RAIN_HALF_EXTENT = 11; // x/z half size of the volume following the robot
const RAIN_HEIGHT = 16;
const RAIN_SPEED_MIN = 6;
const RAIN_SPEED_MAX = 10;
/** Brightness outside / inside the cone. */
const RAIN_DIM = 0.07;
const RAIN_BRIGHT = 1;

const MirrorShader = {
  name: 'MirrorFloorShader',
  uniforms: {
    color: { value: null as THREE.Color | null },
    tDiffuse: { value: null as THREE.Texture | null },
    textureMatrix: { value: null as THREE.Matrix4 | null },
    uAlpha: { value: MIRROR_ALPHA },
    uMinFactor: { value: MIRROR_ALPHA_MIN_FACTOR },
  },
  vertexShader: /* glsl */ `
    uniform mat4 textureMatrix;
    varying vec4 vUv;
    varying vec3 vWorld;
    void main() {
      vUv = textureMatrix * vec4(position, 1.0);
      vec4 wp = modelMatrix * vec4(position, 1.0);
      vWorld = wp.xyz;
      gl_Position = projectionMatrix * viewMatrix * wp;
    }
  `,
  fragmentShader: /* glsl */ `
    uniform vec3 color;
    uniform sampler2D tDiffuse;
    uniform float uAlpha;
    uniform float uMinFactor;
    varying vec4 vUv;
    varying vec3 vWorld;
    void main() {
      vec3 refl = texture2DProj(tDiffuse, vUv).rgb * color;
      // Slightly stronger reflection at grazing angles (Fresnel-like)
      float up = clamp(normalize(cameraPosition - vWorld).y, 0.0, 1.0);
      float fres = pow(1.0 - up, 1.5);
      float a = uAlpha * mix(uMinFactor, 1.0, fres);
      gl_FragColor = vec4(refl, a);
      #include <tonemapping_fragment>
      #include <colorspace_fragment>
    }
  `,
};

const CONE_VERTEX = /* glsl */ `
  varying vec3 vN;
  varying vec3 vView;
  varying vec3 vLocal;
  void main() {
    vLocal = position;
    vN = normalize(normalMatrix * normal);
    vec4 mv = modelViewMatrix * vec4(position, 1.0);
    vView = mv.xyz;
    gl_Position = projectionMatrix * mv;
  }
`;
const CONE_FRAGMENT = /* glsl */ `
  uniform vec3 uColor;
  uniform float uIntensity;
  uniform float uTime;
  varying vec3 vN;
  varying vec3 vView;
  varying vec3 vLocal;
  ${GLSL_NOISE}
  void main() {
    // Soft silhouette: bright where the surface faces the camera, fading to the cone edges
    float facing = abs(dot(normalize(vN), normalize(-vView)));
    float soft = pow(facing, 1.6);
    float len = vLocal.z; // 0 at the lamp, 1 at the floor
    float fadeLen = smoothstep(0.0, 0.14, len) * (1.0 - 0.55 * smoothstep(0.7, 1.0, len));
    float n = sigFbm(vLocal.xy * 3.0 + vec2(len * 3.0 - uTime * 0.25, uTime * 0.05));
    float a = uIntensity * soft * fadeLen * mix(0.55, 1.3, n);
    gl_FragColor = vec4(uColor * a, a);
    #include <tonemapping_fragment>
    #include <colorspace_fragment>
  }
`;

class MirrorLightSignature implements SignatureHandle {
  private _scene: THREE.Scene;
  private _spot: THREE.SpotLight | null;
  private _getRobotPosition: () => THREE.Vector3;

  private _mirror: Reflector | null = null;

  private _coneGeo: THREE.BufferGeometry | null = null;
  private _coneMat: THREE.ShaderMaterial | null = null;
  private _cone: THREE.Mesh | null = null;

  private _rain: THREE.Points | null = null;
  private _rainSpeed = new Float32Array(RAIN_HIGH);
  private _rainColors = new Float32Array(RAIN_HIGH * 3);
  private _rainCount = RAIN_HIGH;

  // Scratch values (no per-frame allocation)
  private _axis = new THREE.Vector3();

  constructor(ctx: SignatureContext) {
    this._scene = ctx.scene;
    this._spot = ctx.lights.spot ?? null;
    this._getRobotPosition = ctx.getRobotPosition;

    if (this._spot) {
      // Open cone: apex at the lamp (origin), base at z = 1, unit radius; scaled per frame
      this._coneGeo = new THREE.ConeGeometry(1, 1, CONE_SEGMENTS, 1, true)
        .translate(0, -0.5, 0)
        .rotateX(-Math.PI / 2);
      this._coneMat = new THREE.ShaderMaterial({
        uniforms: {
          uColor: { value: new THREE.Color(CONE_COLOR) },
          uIntensity: { value: CONE_INTENSITY },
          uTime: { value: 0 },
        },
        vertexShader: CONE_VERTEX,
        fragmentShader: CONE_FRAGMENT,
        transparent: true,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        side: THREE.DoubleSide,
        fog: false,
      });
      this._cone = new THREE.Mesh(this._coneGeo, this._coneMat);
      this._cone.frustumCulled = false;
      this._cone.renderOrder = 3;
      this._scene.add(this._cone);

      const geo = new THREE.BufferGeometry();
      const positions = new Float32Array(RAIN_HIGH * 3);
      const rp = this._getRobotPosition();
      for (let i = 0; i < RAIN_HIGH; i++) {
        positions[i * 3] = rp.x + (Math.random() * 2 - 1) * RAIN_HALF_EXTENT;
        positions[i * 3 + 1] = Math.random() * RAIN_HEIGHT;
        positions[i * 3 + 2] = rp.z + (Math.random() * 2 - 1) * RAIN_HALF_EXTENT;
        this._rainSpeed[i] = RAIN_SPEED_MIN + Math.random() * (RAIN_SPEED_MAX - RAIN_SPEED_MIN);
      }
      geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      geo.setAttribute('color', new THREE.BufferAttribute(this._rainColors, 3));
      this._rain = new THREE.Points(
        geo,
        new THREE.PointsMaterial({
          size: RAIN_SIZE,
          map: createSoftDotTexture(32),
          color: RAIN_COLOR,
          vertexColors: true,
          transparent: true,
          blending: THREE.AdditiveBlending,
          depthWrite: false,
          sizeAttenuation: true,
          fog: false,
        }),
      );
      this._rain.frustumCulled = false;
      this._scene.add(this._rain);
    }

    this.setQuality(ctx.quality);
  }

  setQuality(quality: SignatureQuality): void {
    const high = quality === 'high';
    this._setMirror(high);
    this._rainCount = high ? RAIN_HIGH : RAIN_LOW;
    this._rain?.geometry.setDrawRange(0, this._rainCount);
  }

  private _setMirror(on: boolean): void {
    if (on && !this._mirror) {
      const mirror = new Reflector(new THREE.PlaneGeometry(MIRROR_SIZE, MIRROR_SIZE), {
        color: 0xffffff,
        textureWidth: MIRROR_TEXTURE_SIZE,
        textureHeight: MIRROR_TEXTURE_SIZE,
        clipBias: 0.003,
        multisample: MIRROR_MSAA,
        shader: MirrorShader,
      });
      mirror.rotation.x = -Math.PI / 2;
      mirror.position.y = MIRROR_Y;
      const mirrorMat = mirror.material as THREE.ShaderMaterial;
      mirrorMat.transparent = true;
      mirrorMat.depthWrite = false;
      mirror.renderOrder = 1;
      this._scene.add(mirror);
      this._mirror = mirror;
    } else if (!on && this._mirror) {
      const mirror = this._mirror;
      this._scene.remove(mirror);
      mirror.dispose(); // render target + material
      mirror.geometry.dispose();
      this._mirror = null;
    }
  }

  update(dt: number, time: number): void {
    const spot = this._spot;
    if (!spot || !this._cone || !this._coneMat || !this._rain) return;

    // --- Cone follows the lamp and its target (the lights handle owns the follow logic)
    const target = spot.target.position;
    const length = spot.position.distanceTo(target) + CONE_EXTRA_LENGTH;
    const radius = length * Math.tan(spot.angle * CONE_ANGLE_FACTOR);
    this._cone.position.copy(spot.position);
    this._cone.lookAt(target);
    this._cone.scale.set(radius, radius, length);
    this._coneMat.uniforms.uTime.value = time;

    // --- Rain: fall, recycle on top, follow the robot, light up inside the cone
    const robot = this._getRobotPosition();
    const axis = this._axis.subVectors(target, spot.position).normalize();
    const tanA = Math.tan(spot.angle * CONE_ANGLE_FACTOR);
    const sx = spot.position.x;
    const sy = spot.position.y;
    const sz = spot.position.z;
    const pos = this._rain.geometry.getAttribute('position') as THREE.BufferAttribute;
    const arr = pos.array as Float32Array;
    const col = this._rainColors;
    const ext = RAIN_HALF_EXTENT;
    for (let i = 0; i < this._rainCount; i++) {
      let x = arr[i * 3];
      let y = arr[i * 3 + 1] - this._rainSpeed[i] * dt;
      let z = arr[i * 3 + 2];
      if (y < 0) y += RAIN_HEIGHT;
      const dx = x - robot.x;
      if (dx > ext) x -= 2 * ext;
      else if (dx < -ext) x += 2 * ext;
      const dz = z - robot.z;
      if (dz > ext) z -= 2 * ext;
      else if (dz < -ext) z += 2 * ext;
      arr[i * 3] = x;
      arr[i * 3 + 1] = y;
      arr[i * 3 + 2] = z;

      const vx = x - sx;
      const vy = y - sy;
      const vz = z - sz;
      const along = vx * axis.x + vy * axis.y + vz * axis.z;
      let k = 0;
      if (along > 0.5) {
        const radial2 = vx * vx + vy * vy + vz * vz - along * along;
        const coneR = along * tanA;
        const ratio = Math.sqrt(Math.max(radial2, 0)) / coneR;
        k = 1 - THREE.MathUtils.smoothstep(ratio, 0.6, 1);
      }
      // Fade right at the floor and at the very top so recycling never pops
      const edge = Math.min(y / 0.6, (RAIN_HEIGHT - y) / 1.5, 1);
      const b = (RAIN_DIM + (RAIN_BRIGHT - RAIN_DIM) * k) * edge;
      col[i * 3] = b * 0.85;
      col[i * 3 + 1] = b * 0.93;
      col[i * 3 + 2] = b;
    }
    pos.needsUpdate = true;
    (this._rain.geometry.getAttribute('color') as THREE.BufferAttribute).needsUpdate = true;
  }

  destroy(): void {
    this._setMirror(false);
    if (this._cone) {
      this._scene.remove(this._cone);
      this._coneGeo?.dispose();
      this._coneMat?.dispose();
      this._cone = null;
    }
    if (this._rain) {
      disposePoints(this._rain);
      this._rain = null;
    }
  }
}

export function createSignature(ctx: SignatureContext): SignatureHandle {
  return new MirrorLightSignature(ctx);
}
