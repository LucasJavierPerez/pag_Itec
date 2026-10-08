import * as THREE from 'three';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { STYLES } from '../Experience/World/styles/index.ts';
import type { StyleId } from '../Experience/World/styles/types.ts';
import { disposeObject } from '../Experience/World/styles/shared/dispose.ts';
import { buildCharacter } from '../Experience/Map/characters/buildCharacter.ts';
import type { CharacterId } from '../Experience/Map/characters/characterSpec.ts';
import { RobotPainter } from '../Experience/Map/robotPaint.ts';
import { getRobotSkin } from '../Experience/Map/skins/robotSkins.ts';
import type { RobotSkinId } from '../Experience/Map/skins/robotSkins.ts';

/** Edge in pixels of a thumbnail (the cards show it at ~64 css px, so it stays crisp on HiDPI). */
export const THUMB_SIZE = 96;

const TARGET_Y = 1.12;
const CAMERA_DISTANCE = 5.6;
/** Turn of the character towards the camera's right so the thumbnail reads as 3/4 view. */
const YAW = 0.5;

/**
 * Renders each character once into a tiny offscreen WebGL canvas and hands back PNG data URLs,
 * cached per (character, style, palette). If WebGL is unavailable `render` returns null and the
 * picker keeps its flat initial-letter badges.
 */
export class CharacterThumbs {
  private _renderer: THREE.WebGLRenderer | null = null;
  private _failed = false;
  private _scene = new THREE.Scene();
  private _camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);
  private _environment: THREE.WebGLRenderTarget | null = null;
  private _cache = new Map<string, string>();

  private static _key(character: CharacterId, style: StyleId, palette: RobotSkinId): string {
    return `${character}|${style}|${palette}`;
  }

  /** The cached thumbnail, if it was already rendered. */
  get(character: CharacterId, style: StyleId, palette: RobotSkinId): string | null {
    return this._cache.get(CharacterThumbs._key(character, style, palette)) ?? null;
  }

  private _ensure(): THREE.WebGLRenderer | null {
    if (this._renderer) return this._renderer;
    if (this._failed) return null;
    try {
      const canvas = document.createElement('canvas');
      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, preserveDrawingBuffer: true });
      renderer.setPixelRatio(1);
      renderer.setSize(THUMB_SIZE, THUMB_SIZE, false);
      renderer.setClearColor(0x000000, 0);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      renderer.toneMapping = THREE.NoToneMapping;

      const hemisphere = new THREE.HemisphereLight(0xffffff, 0x8795a8, 1.3);
      const sun = new THREE.DirectionalLight(0xffffff, 2);
      sun.position.set(3, 5, 4);
      this._scene.add(hemisphere, sun);

      // Image-based light so the glossy cinematic materials do not render black
      const pmrem = new THREE.PMREMGenerator(renderer);
      this._environment = pmrem.fromScene(new RoomEnvironment(), 0.04);
      pmrem.dispose();
      this._scene.environment = this._environment.texture;
      this._scene.environmentIntensity = 0.55;

      this._camera.position.set(0, TARGET_Y + 0.5, CAMERA_DISTANCE);
      this._camera.lookAt(0, TARGET_Y, 0);
      this._renderer = renderer;
    } catch {
      this._failed = true;
      this._renderer = null;
    }
    return this._renderer;
  }

  /** Renders (or returns the cached) thumbnail as a data URL; null when WebGL is unavailable. */
  render(character: CharacterId, style: StyleId, palette: RobotSkinId): string | null {
    const cached = this.get(character, style, palette);
    if (cached) return cached;
    const renderer = this._ensure();
    if (!renderer) return null;

    let url: string | null = null;
    try {
      let object: THREE.Object3D;
      let dispose: () => void;
      if (character === 'robot') {
        const group = STYLES[style].createRobot().group;
        new RobotPainter(group).apply(getRobotSkin(palette));
        object = group;
        dispose = () => disposeObject(group);
      } else {
        const instance = buildCharacter({ characterId: character, paletteId: palette, styleId: style, quality: 'high' });
        instance.update(0, 0);
        object = instance.group;
        dispose = () => instance.dispose();
      }
      object.rotation.y = YAW;
      this._scene.add(object);
      renderer.render(this._scene, this._camera);
      url = renderer.domElement.toDataURL('image/png');
      this._scene.remove(object);
      dispose();
    } catch {
      url = null;
    }
    if (url) this._cache.set(CharacterThumbs._key(character, style, palette), url);
    return url;
  }

  dispose(): void {
    this._environment?.dispose();
    this._environment = null;
    this._renderer?.dispose();
    this._renderer = null;
    this._cache.clear();
  }
}
