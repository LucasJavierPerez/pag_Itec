import * as THREE from 'three';
import { Sizes } from './Utils/Sizes.ts';
import { Time } from './Utils/Time.ts';
import { Camera } from './Camera.ts';
import { Renderer } from './Renderer.ts';
import { World } from './World/World.ts';
import { STYLES } from './World/styles/index.ts';
import type { StyleId } from './World/styles/types.ts';
import { PostProcessing } from './Post/PostProcessing.ts';
import { StyleTransition } from './Post/StyleTransition.ts';
import { FpsMonitor, QualityController } from './Post/Quality.ts';

const INTRO_SECONDS = 3.2;

export class Experience {
  scene: THREE.Scene;
  sizes: Sizes;
  time: Time;
  camera: Camera;
  renderer: Renderer;
  world: World;
  post: PostProcessing;
  styleTransition: StyleTransition;
  quality: QualityController;

  private _fps: FpsMonitor;
  private _onQualityChange: () => void;
  private _onResize: () => void;
  private _onTick: () => void;

  private _robotPosition: THREE.Vector3;
  private _robotQuaternion: THREE.Quaternion;

  /**
   * @param applyStyle runs while the transition covers the screen (swap the 3D style + UI theme)
   */
  constructor(canvas: HTMLCanvasElement, styleId: StyleId, applyStyle: (id: StyleId) => void) {
    // Background, fog and renderer settings are applied by the World for the chosen style.
    this.scene = new THREE.Scene();

    this.sizes = new Sizes();
    this.time = new Time();
    this.camera = new Camera(this.sizes, this.scene);
    this.renderer = new Renderer(canvas, this.sizes);
    this.quality = new QualityController();
    this.world = new World(this.scene, this.renderer.instance, this.camera.instance, styleId, this.quality.level);
    this.post = new PostProcessing(
      this.renderer.instance,
      this.scene,
      this.camera.instance,
      STYLES[styleId].post,
    );
    this.styleTransition = new StyleTransition(this.post, styleId, applyStyle);
    this._fps = new FpsMonitor(() => this.quality.set('low'));
    this.camera.holdIntro();

    this._onQualityChange = () => this._applyQuality();
    this.quality.addEventListener('change', this._onQualityChange);
    this._applyQuality();

    this._robotPosition = new THREE.Vector3();
    this._robotQuaternion = new THREE.Quaternion();
    this.post.focusTarget = this._robotPosition;
    this.post.depthExclude = () => this.world.depthExclude;

    this._onResize = () => {
      this.camera.resize(this.sizes);
      this.renderer.resize(this.sizes);
      this.post.resize(this.sizes.width, this.sizes.height, this.renderer.pixelRatio);
    };

    this._onTick = () => {
      const dt = this.time.delta / 1000;
      this.camera.update(this._robotPosition, this._robotQuaternion, dt);
      this.styleTransition.update(dt);
      this._fps.update(dt, this.styleTransition.busy);
      if (this.post.enabled) {
        this.post.setIntro(this.camera.introWeight);
        this.post.render(dt);
      } else {
        this.renderer.update(this.scene, this.camera.instance);
      }
    };

    this.sizes.addEventListener('resize', this._onResize);
    this.time.addEventListener('tick', this._onTick);
  }

  /** Starts the cinematic fly-in (call once the loading screen is gone). Skipped for reduced motion. */
  playIntro(): void {
    const reduce = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;
    this.camera.playIntro(reduce ? 0 : INTRO_SECONDS);
    this.world.enterSignature();
  }

  /** Pauses/resumes the whole explorer render loop (used while the map tab is shown). */
  setPaused(paused: boolean): void {
    if (paused) {
      this.time.pause();
      return;
    }
    this.world.resetClock();
    this._fps.reset();
    this.time.resume();
  }

  /** High: composer + native pixel ratio + trail. Low: direct render, pixel ratio 1, no trail. */
  private _applyQuality(): void {
    const high = this.quality.level === 'high';
    this.renderer.setLowQuality(!high, this.sizes);
    this.post.resize(this.sizes.width, this.sizes.height, this.renderer.pixelRatio);
    this.post.setEnabled(high);
    this.world.setTrailEnabled(high);
    this.world.setQuality(this.quality.level);
    this._fps.reset();
  }

  /** Called externally (e.g. by physics) to sync the robot visual with its physics body */
  update(robotPosition: THREE.Vector3, robotQuaternion: THREE.Quaternion): void {
    this._robotPosition.copy(robotPosition);
    this._robotQuaternion.copy(robotQuaternion);
    this.world.update(robotPosition, robotQuaternion);
  }

  destroy(): void {
    this.sizes.removeEventListener('resize', this._onResize);
    this.time.removeEventListener('tick', this._onTick);
    this.quality.removeEventListener('change', this._onQualityChange);
    this.styleTransition.destroy();
    this.post.dispose();
    this.sizes.destroy();
    this.time.destroy();
    this.renderer.destroy();
    this.world.destroy();
  }
}
