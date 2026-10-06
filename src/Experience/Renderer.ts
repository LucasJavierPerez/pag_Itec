import * as THREE from 'three';
import type { Sizes } from './Utils/Sizes.ts';

export class Renderer {
  instance: THREE.WebGLRenderer;
  /** Effective pixel ratio: capped by Sizes (2 desktop, 1.5 coarse) on high quality, 1 on low. */
  pixelRatio: number;

  private _low = false;

  constructor(canvas: HTMLCanvasElement, sizes: Sizes) {
    this.instance = new THREE.WebGLRenderer({
      canvas,
      antialias: true,
      alpha: false,
    });

    this.pixelRatio = sizes.pixelRatio;
    this.instance.setSize(sizes.width, sizes.height);
    this.instance.setPixelRatio(this.pixelRatio);
    this.instance.outputColorSpace = THREE.SRGBColorSpace;
    this.instance.toneMapping = THREE.NoToneMapping;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFShadowMap;
  }

  resize(sizes: Sizes): void {
    this.pixelRatio = this._low ? 1 : sizes.pixelRatio;
    this.instance.setPixelRatio(this.pixelRatio);
    this.instance.setSize(sizes.width, sizes.height);
  }

  setLowQuality(low: boolean, sizes: Sizes): void {
    this._low = low;
    this.resize(sizes);
  }

  update(scene: THREE.Scene, camera: THREE.PerspectiveCamera): void {
    this.instance.render(scene, camera);
  }

  destroy(): void {
    this.instance.dispose();
  }
}
