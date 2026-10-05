import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { BokehPass } from 'three/examples/jsm/postprocessing/BokehPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { FinalLookShader } from './FinalLookShader.ts';
import { STYLES } from '../World/styles/index.ts';
import type { PostSettings, StyleId } from '../World/styles/types.ts';

/** Exponential smoothing rate: ~95% of the way after 0.6 s. */
const SETTINGS_RATE = 5;
const MSAA_SAMPLES = 4;
/** Vignette values while the cinematic intro is at full weight. */
const INTRO_VIGNETTE_OFFSET = 0.15;
const INTRO_VIGNETTE_DARKNESS = 0.92;

/** DoF is fully off below this blur amount (UV units). */
const DOF_EPSILON = 0.00005;

/** BokehPass that keeps flagged objects (additive shafts, motes...) out of its depth pre-pass. */
class DofPass extends BokehPass {
  exclude: (() => readonly THREE.Object3D[]) | null = null;

  override render(...args: Parameters<BokehPass['render']>): void {
    const list = this.exclude ? this.exclude() : null;
    if (list) for (let i = 0; i < list.length; i++) list[i].visible = false;
    super.render(...args);
    if (list) for (let i = 0; i < list.length; i++) list[i].visible = true;
  }
}

/** Flat, allocation-free mirror of PostSettings used for interpolation. */
interface Look {
  bloomStrength: number;
  bloomRadius: number;
  bloomThreshold: number;
  vignetteOffset: number;
  vignetteDarkness: number;
  grain: number;
  aberration: number;
  dofAperture: number;
  dofMaxblur: number;
  pixelSize: number;
  /** Posterize step (1 / levels), 0 = off. Interpolating the step avoids a harsh pass through low level counts. */
  posterStep: number;
}

function toLook(s: PostSettings, out: Look): Look {
  out.bloomStrength = s.bloom.strength;
  out.bloomRadius = s.bloom.radius;
  out.bloomThreshold = s.bloom.threshold;
  out.vignetteOffset = s.vignette.offset;
  out.vignetteDarkness = s.vignette.darkness;
  out.grain = s.grain;
  out.aberration = s.aberration;
  out.dofAperture = s.dof?.aperture ?? 0;
  out.dofMaxblur = s.dof?.maxblur ?? 0;
  out.pixelSize = s.pixel?.size ?? 1;
  out.posterStep = s.pixel && s.pixel.levels > 0 ? 1 / s.pixel.levels : 0;
  return out;
}

/**
 * EffectComposer pipeline: RenderPass -> UnrealBloomPass -> FinalLook -> OutputPass.
 * The composer (and every GPU resource it owns) only exists while `enabled`; when disabled the
 * caller renders straight with the renderer. All look/transition state lives in plain fields
 * so the pipeline can be torn down and rebuilt at any time.
 */
export class PostProcessing {
  private _renderer: THREE.WebGLRenderer;
  private _scene: THREE.Scene;
  private _camera: THREE.PerspectiveCamera;

  private _composer: EffectComposer | null = null;
  private _bloomPass: UnrealBloomPass | null = null;
  private _finalPass: ShaderPass | null = null;
  private _passes: { dispose(): void }[] = [];
  private _dofPass: DofPass | null = null;
  private _target: THREE.WebGLRenderTarget | null = null;

  private _width = 1;
  private _height = 1;
  private _pixelRatio = 1;

  private _current: Look;
  private _goal: Look;
  private _intro = 0;
  private _time = 0;

  private _transition = 0;
  private _reveal = 0;
  private _seed = 0;
  private _accent = new THREE.Color(0xffffff);

  private _onStyleChange: (e: Event) => void;
  private _focusDir = new THREE.Vector3();
  private _focusDelta = new THREE.Vector3();

  /** World point the depth of field focuses on (the robot). */
  focusTarget: THREE.Vector3 | null = null;
  /** Objects hidden while the DoF depth pre-pass renders (provided by the active signature). */
  depthExclude: (() => readonly THREE.Object3D[]) | null = null;

  constructor(
    renderer: THREE.WebGLRenderer,
    scene: THREE.Scene,
    camera: THREE.PerspectiveCamera,
    initial: PostSettings,
  ) {
    this._renderer = renderer;
    this._scene = scene;
    this._camera = camera;
    const blank: Look = {
      bloomStrength: 0, bloomRadius: 0, bloomThreshold: 1,
      vignetteOffset: 0.5, vignetteDarkness: 0, grain: 0, aberration: 0,
      dofAperture: 0, dofMaxblur: 0, pixelSize: 1, posterStep: 0,
    };
    this._current = toLook(initial, { ...blank });
    this._goal = toLook(initial, { ...blank });

    // Every style swap (including the ones triggered by the transition) retargets the look
    this._onStyleChange = (e: Event) => {
      const id = (e as CustomEvent<{ id: StyleId }>).detail?.id;
      if (id && STYLES[id]) this.setSettings(STYLES[id].post);
    };
    window.addEventListener('style-change', this._onStyleChange);
  }

  get enabled(): boolean {
    return this._composer !== null;
  }

  /** Builds or tears down the composer. Idempotent. */
  setEnabled(enabled: boolean): void {
    if (enabled === this.enabled) return;
    if (enabled) this._build();
    else this._teardown();
  }

  private _build(): void {
    const target = new THREE.WebGLRenderTarget(
      this._width * this._pixelRatio,
      this._height * this._pixelRatio,
      { type: THREE.HalfFloatType, samples: MSAA_SAMPLES },
    );
    target.texture.name = 'Post.rt';
    const composer = new EffectComposer(this._renderer, target);
    composer.setPixelRatio(this._pixelRatio);
    composer.setSize(this._width, this._height);

    const renderPass = new RenderPass(this._scene, this._camera);
    const bloomPass = new UnrealBloomPass(
      new THREE.Vector2(this._width * this._pixelRatio, this._height * this._pixelRatio),
      this._current.bloomStrength,
      this._current.bloomRadius,
      this._current.bloomThreshold,
    );
    const finalPass = new ShaderPass(FinalLookShader);
    const outputPass = new OutputPass();

    composer.addPass(renderPass);
    composer.addPass(bloomPass);
    composer.addPass(finalPass);
    composer.addPass(outputPass);

    this._target = target;
    this._composer = composer;
    this._bloomPass = bloomPass;
    this._finalPass = finalPass;
    this._passes = [renderPass, bloomPass, finalPass, outputPass];
  }

  private _teardown(): void {
    for (const pass of this._passes) pass.dispose();
    this._composer?.dispose(); // disposes the two ping-pong targets + copy pass
    this._target?.dispose(); // the original target is renderTarget1; safe to dispose twice
    this._passes = [];
    this._dofPass = null;
    this._composer = null;
    this._bloomPass = null;
    this._finalPass = null;
    this._target = null;
  }

  /** Adds the Bokeh pass lazily (its depth target is full-size) and removes it once the blur fades out. */
  private _syncDof(): void {
    const composer = this._composer;
    if (!composer) return;
    const wanted = this._current.dofMaxblur > DOF_EPSILON || this._goal.dofMaxblur > DOF_EPSILON;
    if (wanted && !this._dofPass) {
      const pass = new DofPass(this._scene, this._camera, {
        focus: 12,
        aperture: this._current.dofAperture,
        maxblur: this._current.dofMaxblur,
      });
      pass.exclude = () => (this.depthExclude ? this.depthExclude() : []);
      composer.insertPass(pass, 1); // right after the RenderPass, before bloom
      pass.setSize(this._width * this._pixelRatio, this._height * this._pixelRatio);
      this._dofPass = pass;
      this._passes.push(pass);
    } else if (!wanted && this._dofPass) {
      const pass = this._dofPass;
      composer.removePass(pass);
      this._passes.splice(this._passes.indexOf(pass), 1);
      pass.dispose();
      this._dofPass = null;
    }
  }

  /** Smoothly retargets the look (set `instant` to snap). */
  setSettings(settings: PostSettings, instant = false): void {
    toLook(settings, this._goal);
    if (instant) Object.assign(this._current, this._goal);
  }

  /** 1 = heavy intro vignette, 0 = style's normal vignette. */
  setIntro(amount: number): void {
    this._intro = Math.min(Math.max(amount, 0), 1);
  }

  /** Drives the wipe (see StyleTransition). `progress` 0..1; `reveal` true while opening. */
  setTransition(progress: number, reveal: boolean): void {
    this._transition = progress;
    this._reveal = reveal ? 1 : 0;
  }

  setTransitionStyle(accent: number, seed: number): void {
    this._accent.set(accent);
    this._seed = seed;
  }

  resize(width: number, height: number, pixelRatio: number): void {
    this._width = width;
    this._height = height;
    this._pixelRatio = pixelRatio;
    if (!this._composer) return;
    this._composer.setPixelRatio(pixelRatio);
    this._composer.setSize(width, height);
  }

  /** Advances the look smoothing and renders the frame through the composer. */
  render(deltaSeconds: number): void {
    const composer = this._composer;
    if (!composer || !this._bloomPass || !this._finalPass) return;
    const dt = Math.min(Math.max(deltaSeconds, 0), 0.1);
    this._time = (this._time + dt) % 1000;

    const a = 1 - Math.exp(-SETTINGS_RATE * dt);
    const c = this._current;
    const g = this._goal;
    c.bloomStrength += (g.bloomStrength - c.bloomStrength) * a;
    c.bloomRadius += (g.bloomRadius - c.bloomRadius) * a;
    c.bloomThreshold += (g.bloomThreshold - c.bloomThreshold) * a;
    c.vignetteOffset += (g.vignetteOffset - c.vignetteOffset) * a;
    c.vignetteDarkness += (g.vignetteDarkness - c.vignetteDarkness) * a;
    c.grain += (g.grain - c.grain) * a;
    c.aberration += (g.aberration - c.aberration) * a;
    c.dofAperture += (g.dofAperture - c.dofAperture) * a;
    c.dofMaxblur += (g.dofMaxblur - c.dofMaxblur) * a;
    c.pixelSize += (g.pixelSize - c.pixelSize) * a;
    c.posterStep += (g.posterStep - c.posterStep) * a;
    // Snap tiny tails so the passes switch off for real
    if (Math.abs(g.pixelSize - c.pixelSize) < 0.01) c.pixelSize = g.pixelSize;
    if (Math.abs(g.posterStep - c.posterStep) < 0.0004) c.posterStep = g.posterStep;
    if (g.dofMaxblur === 0 && c.dofMaxblur < DOF_EPSILON) c.dofMaxblur = 0;

    this._syncDof();
    const dof = this._dofPass;
    if (dof) {
      dof.enabled = c.dofMaxblur > DOF_EPSILON;
      const du = dof.materialBokeh.uniforms;
      du['aperture'].value = c.dofAperture;
      du['maxblur'].value = c.dofMaxblur;
      if (this.focusTarget) {
        // Linear view-space depth of the robot along the camera's forward axis
        const cam = this._camera;
        cam.getWorldDirection(this._focusDir);
        this._focusDelta.subVectors(this.focusTarget, cam.position);
        du['focus'].value = Math.max(this._focusDelta.dot(this._focusDir), cam.near);
      }
    }

    const bloom = this._bloomPass;
    bloom.strength = c.bloomStrength;
    bloom.radius = c.bloomRadius;
    bloom.threshold = c.bloomThreshold;

    const u = this._finalPass.uniforms;
    u.uTime.value = this._time;
    u.uAspect.value = this._width / Math.max(this._height, 1);
    u.uVignetteOffset.value = c.vignetteOffset + (INTRO_VIGNETTE_OFFSET - c.vignetteOffset) * this._intro;
    u.uVignetteDarkness.value = c.vignetteDarkness + (INTRO_VIGNETTE_DARKNESS - c.vignetteDarkness) * this._intro;
    u.uGrain.value = c.grain;
    u.uAberration.value = c.aberration;
    (u.uResolution.value as THREE.Vector2).set(
      this._width * this._pixelRatio,
      this._height * this._pixelRatio,
    );
    u.uPixelSize.value = c.pixelSize;
    u.uPosterStep.value = c.posterStep;
    u.uTransition.value = this._transition;
    u.uReveal.value = this._reveal;
    u.uSeed.value = this._seed;
    (u.uAccent.value as THREE.Color).copy(this._accent);

    composer.render(dt);
  }

  dispose(): void {
    window.removeEventListener('style-change', this._onStyleChange);
    this._teardown();
  }
}
