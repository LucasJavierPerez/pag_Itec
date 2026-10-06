import * as THREE from 'three';
import { STYLES } from '../World/styles/index.ts';
import type { StyleId } from '../World/styles/types.ts';
import type { QualityController } from '../Post/Quality.ts';
import { getMapPoint } from '../../UI/MapData.ts';
import { MapLegend } from '../../UI/MapLegend.ts';
import { MapScene } from './MapScene.ts';
import { RobotActor } from './RobotActor.ts';
import { getMapSkin } from './skins/index.ts';
import type { MapLights } from './skins/index.ts';
import { MAP_SIZE } from './mapLayout.ts';

// ---- Tunable camera constants
/** Camera elevation above the horizon (90 = straight down). */
export const MAP_TILT_DEG = 58;
/** Camera distance along its viewing axis (orthographic: only affects clipping). */
const CAMERA_DISTANCE = 220;
/** The default view fits this many world units horizontally / vertically (incl. margins). */
const FIT_WIDTH = 98;
const FIT_DEPTH = 66;
/** Zoom limits relative to the fit zoom. */
const MIN_ZOOM_FACTOR = 0.75;
const MAX_ZOOM_FACTOR = 7;
const MAX_PPU = 150;
const ZOOM_SMOOTHING = 14;
const WHEEL_SENSITIVITY = 0.0016;
const KEY_ZOOM_STEP = 1.25;
/** A press that moves less than this (px) is a click, not a drag. */
const DRAG_THRESHOLD = 6;
/** How far the view target may leave the map. */
const PAN_LIMIT_X = MAP_SIZE.w / 2 - 4;
const PAN_LIMIT_Z_MIN = MAP_SIZE.cz - MAP_SIZE.d / 2 + 4;
const PAN_LIMIT_Z_MAX = MAP_SIZE.cz + MAP_SIZE.d / 2 - 4;

export interface MapViewOptions {
  quality: QualityController;
  /** Style currently active in the explorer (read on activation). */
  getStyleId: () => StyleId;
  /** A landmark, ring, label or legend entry was chosen. */
  onSelect: (pointId: string) => void;
}

/**
 * The "Mapa" tab: own canvas, own scene, own render loop that only runs while the tab is visible.
 */
export class MapView {
  readonly root: HTMLDivElement;
  readonly legend: MapLegend;

  private _opts: MapViewOptions;
  private _canvas: HTMLCanvasElement;
  private _tooltip: HTMLDivElement;
  private _renderer: THREE.WebGLRenderer | null = null;
  private _three = new THREE.Scene();
  private _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 600);
  private _scene: MapScene | null = null;
  private _lights: MapLights | null = null;
  private _robot: RobotActor | null = null;
  private _builtStyle: StyleId | null = null;
  private _dirty = true;
  private _active = false;
  private _rafId = 0;
  private _lastTime = 0;
  private _time = 0;
  private _reduceMotion = false;

  private _w = 1;
  private _h = 1;
  private _fitPpu = 10;
  private _ppu = 10;
  private _ppuGoal = 10;
  private _target = new THREE.Vector2(0, 2);
  private _anchor: { x: number; y: number } | null = null;

  private _pointers = new Map<number, { x: number; y: number }>();
  private _drag: { moved: boolean; startX: number; startY: number; downTime: number } | null = null;
  private _pinch: { dist: number; ppu: number } | null = null;
  private _hoverRequest: { x: number; y: number } | null = null;
  private _hoverId: string | null = null;
  private _selectedId: string | null = null;

  private _raycaster = new THREE.Raycaster();
  private _plane = new THREE.Plane(new THREE.Vector3(0, 1, 0), 0);
  private _ndc = new THREE.Vector2();
  private _hit = new THREE.Vector3();
  private _hitB = new THREE.Vector3();

  private _onResize = (): void => this._resize();
  private _onKey = (e: KeyboardEvent): void => this._handleKey(e);
  private _onStyle = (): void => {
    this._dirty = true;
    if (this._active) this._rebuild();
  };
  private _onQuality = (): void => {
    this._dirty = true;
    if (this._active) this._rebuild();
  };

  constructor(opts: MapViewOptions) {
    this._opts = opts;

    this.root = document.createElement('div');
    this.root.className = 'map-view';
    this.root.id = 'map-view';
    this.root.hidden = true;

    this._canvas = document.createElement('canvas');
    this._canvas.className = 'map-view__canvas';
    this._canvas.setAttribute('aria-label', 'Mapa interactivo de ITEC Río Cuarto. Usá la lista de puntos de interés para navegarlo con el teclado.');
    this._canvas.setAttribute('role', 'img');

    this._tooltip = document.createElement('div');
    this._tooltip.className = 'map-tooltip';
    this._tooltip.setAttribute('aria-hidden', 'true');
    this._tooltip.hidden = true;

    this.legend = new MapLegend((id) => this.select(id));

    const hud = document.createElement('div');
    hud.className = 'map-hud';
    hud.setAttribute('role', 'group');
    hud.setAttribute('aria-label', 'Controles del mapa');
    hud.append(
      this._hudButton('+', 'Acercar', () => this._zoomBy(KEY_ZOOM_STEP)),
      this._hudButton('−', 'Alejar', () => this._zoomBy(1 / KEY_ZOOM_STEP)),
      this._hudButton('Ver todo', 'Ver todo el mapa', () => this.resetView(), 'map-hud__button--wide'),
    );

    this.root.append(this._canvas, this._tooltip, hud, this.legend.element);
    document.body.appendChild(this.root);

    this._canvas.addEventListener('pointerdown', (e) => this._onPointerDown(e));
    this._canvas.addEventListener('pointermove', (e) => this._onPointerMove(e));
    this._canvas.addEventListener('pointerup', (e) => this._onPointerUp(e));
    this._canvas.addEventListener('pointercancel', (e) => this._onPointerUp(e, true));
    this._canvas.addEventListener('pointerleave', () => this._setHover(null));
    this._canvas.addEventListener('wheel', (e) => this._onWheel(e), { passive: false });

    this._camera.up.set(0, 1, 0);
  }

  private _hudButton(label: string, aria: string, onClick: () => void, extra = ''): HTMLButtonElement {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = `map-hud__button ${extra}`.trim();
    b.textContent = label;
    b.setAttribute('aria-label', aria);
    b.addEventListener('click', (e) => {
      if (e.detail > 0) b.blur();
      onClick();
    });
    return b;
  }

  // ------------------------------------------------------------- lifecycle

  activate(): void {
    if (this._active) return;
    this._active = true;
    this.root.hidden = false;
    this._reduceMotion = window.matchMedia?.('(prefers-reduced-motion: reduce)').matches ?? false;

    if (!this._renderer) {
      this._renderer = new THREE.WebGLRenderer({ canvas: this._canvas, antialias: true });
      this._renderer.outputColorSpace = THREE.SRGBColorSpace;
      window.addEventListener('style-change', this._onStyle);
      this._opts.quality.addEventListener('change', this._onQuality);
      this._resize();
      this.resetView(true);
    } else {
      this._resize();
    }
    window.addEventListener('resize', this._onResize);
    window.addEventListener('keydown', this._onKey);

    if (this._dirty || this._builtStyle !== this._opts.getStyleId()) this._rebuild();
    this._lastTime = performance.now();
    this._rafId = requestAnimationFrame(this._frame);
  }

  deactivate(): void {
    if (!this._active) return;
    this._active = false;
    cancelAnimationFrame(this._rafId);
    window.removeEventListener('resize', this._onResize);
    window.removeEventListener('keydown', this._onKey);
    this._pointers.clear();
    this._drag = null;
    this._pinch = null;
    this._setHover(null);
    this.root.hidden = true;
  }

  // --------------------------------------------------------------- content

  private _rebuild(): void {
    const renderer = this._renderer;
    if (!renderer) return;
    const styleId = this._opts.getStyleId();
    const skin = getMapSkin(styleId);
    const quality = this._opts.quality.level;

    this._scene?.dispose();
    this._lights?.dispose();

    const style = STYLES[styleId];
    this._three.background = new THREE.Color(style.scene.background);
    renderer.toneMapping = style.renderer.toneMapping;
    renderer.toneMappingExposure = style.renderer.toneMappingExposure;
    const shadows = skin.shadows && quality === 'high';
    renderer.shadowMap.enabled = shadows;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.shadowMap.needsUpdate = true;
    renderer.setPixelRatio(quality === 'high' ? Math.min(window.devicePixelRatio, 2) : 1);
    renderer.setSize(this._w, this._h, false);

    this._scene = new MapScene(skin, quality);
    this._three.add(this._scene.root);
    this._lights = skin.createLights(this._three, quality);

    if (!this._robot) {
      this._robot = new RobotActor(this._three, styleId);
      this._robot.setPosition(0, 0);
    } else if (this._builtStyle !== styleId) {
      this._robot.setStyle(styleId);
    }
    this._robot.setShadows(shadows);

    this._scene.setSelected(this._selectedId);
    this._builtStyle = styleId;
    this._dirty = false;
  }

  // ----------------------------------------------------------------- camera

  private _resize(): void {
    this._w = window.innerWidth;
    this._h = window.innerHeight;
    const sinT = Math.sin((MAP_TILT_DEG * Math.PI) / 180);
    this._fitPpu = Math.min(this._w / FIT_WIDTH, this._h / (FIT_DEPTH * sinT + 7));
    this._clampPpu();
    this._renderer?.setSize(this._w, this._h, false);
    this._applyCamera();
  }

  private _clampPpu(): void {
    const min = this._fitPpu * MIN_ZOOM_FACTOR;
    const max = Math.min(MAX_PPU, this._fitPpu * MAX_ZOOM_FACTOR);
    this._ppu = Math.min(max, Math.max(min, this._ppu));
    this._ppuGoal = Math.min(max, Math.max(min, this._ppuGoal));
  }

  private _applyCamera(): void {
    const c = this._camera;
    const halfW = this._w / 2 / this._ppu;
    const halfH = this._h / 2 / this._ppu;
    c.left = -halfW;
    c.right = halfW;
    c.top = halfH;
    c.bottom = -halfH;
    c.near = 1;
    c.far = CAMERA_DISTANCE * 3;
    const t = (MAP_TILT_DEG * Math.PI) / 180;
    this._target.x = Math.min(PAN_LIMIT_X, Math.max(-PAN_LIMIT_X, this._target.x));
    this._target.y = Math.min(PAN_LIMIT_Z_MAX, Math.max(PAN_LIMIT_Z_MIN, this._target.y));
    c.position.set(
      this._target.x,
      Math.sin(t) * CAMERA_DISTANCE,
      this._target.y + Math.cos(t) * CAMERA_DISTANCE,
    );
    c.lookAt(this._target.x, 0, this._target.y);
    c.updateProjectionMatrix();
    c.updateMatrixWorld();
  }

  /** Pixels per world unit horizontally. */
  get pixelsPerUnit(): number {
    return this._ppu;
  }

  resetView(instant = false): void {
    this._ppuGoal = this._fitPpu;
    this._anchor = null;
    this._target.set(0, MAP_SIZE.cz + 1);
    if (instant) this._ppu = this._fitPpu;
    this._applyCamera();
  }

  /** Smoothly zoom by `factor`, keeping the screen center (or the given point) fixed. */
  private _zoomBy(factor: number, px?: number, py?: number): void {
    this._ppuGoal = this._ppuGoal * factor;
    this._clampPpu();
    this._anchor = px === undefined || py === undefined ? null : { x: px, y: py };
  }

  private _groundAt(px: number, py: number, out: THREE.Vector3): THREE.Vector3 | null {
    this._ndc.set((px / this._w) * 2 - 1, -((py / this._h) * 2 - 1));
    this._raycaster.setFromCamera(this._ndc, this._camera);
    return this._raycaster.ray.intersectPlane(this._plane, out);
  }

  private _panByPixels(dx: number, dy: number): void {
    const sinT = Math.sin((MAP_TILT_DEG * Math.PI) / 180);
    this._target.x -= dx / this._ppu;
    this._target.y -= dy / (this._ppu * sinT);
    this._applyCamera();
  }

  private _updateZoom(dt: number): void {
    if (Math.abs(this._ppuGoal - this._ppu) < this._ppu * 0.0005) {
      if (this._ppu !== this._ppuGoal) this._ppu = this._ppuGoal;
      return;
    }
    const before = this._anchor ? this._groundAt(this._anchor.x, this._anchor.y, this._hit) : null;
    const k = this._reduceMotion ? 1 : 1 - Math.exp(-ZOOM_SMOOTHING * dt);
    this._ppu += (this._ppuGoal - this._ppu) * k;
    this._applyCamera();
    if (before && this._anchor) {
      const after = this._groundAt(this._anchor.x, this._anchor.y, this._hitB);
      if (after) {
        this._target.x += before.x - after.x;
        this._target.y += before.z - after.z;
        this._applyCamera();
      }
    }
  }

  // ------------------------------------------------------------- interaction

  private _onPointerDown(e: PointerEvent): void {
    this._canvas.setPointerCapture(e.pointerId);
    this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this._pointers.size === 1) {
      this._drag = { moved: false, startX: e.clientX, startY: e.clientY, downTime: performance.now() };
    } else if (this._pointers.size === 2) {
      const [a, b] = [...this._pointers.values()];
      this._pinch = { dist: Math.hypot(a.x - b.x, a.y - b.y) || 1, ppu: this._ppuGoal };
      if (this._drag) this._drag.moved = true;
    }
  }

  private _onPointerMove(e: PointerEvent): void {
    const prev = this._pointers.get(e.pointerId);
    if (!prev) {
      if (e.pointerType === 'mouse') {
        this._hoverRequest = { x: e.clientX, y: e.clientY };
        this._moveTooltip(e.clientX, e.clientY);
      }
      return;
    }
    const dx = e.clientX - prev.x;
    const dy = e.clientY - prev.y;
    this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });

    if (this._pointers.size >= 2 && this._pinch) {
      const [a, b] = [...this._pointers.values()];
      const dist = Math.hypot(a.x - b.x, a.y - b.y) || 1;
      const mid = { x: (a.x + b.x) / 2, y: (a.y + b.y) / 2 };
      const before = this._groundAt(mid.x, mid.y, this._hit);
      this._ppuGoal = this._pinch.ppu * (dist / this._pinch.dist);
      this._clampPpu();
      this._ppu = this._ppuGoal;
      this._anchor = null;
      this._applyCamera();
      const after = before ? this._groundAt(mid.x, mid.y, this._hitB) : null;
      if (before && after) {
        this._target.x += before.x - after.x;
        this._target.y += before.z - after.z;
        this._applyCamera();
      }
      // Two-finger pan: the midpoint moves by half of each finger's movement
      this._panByPixels(dx / 2, dy / 2);
      return;
    }

    const drag = this._drag;
    if (!drag) return;
    if (!drag.moved && Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > DRAG_THRESHOLD) {
      drag.moved = true;
      this._canvas.classList.add('map-view__canvas--dragging');
      this._setHover(null);
    }
    if (drag.moved) this._panByPixels(dx, dy);
  }

  private _onPointerUp(e: PointerEvent, cancelled = false): void {
    this._pointers.delete(e.pointerId);
    if (this._pointers.size < 2) this._pinch = null;
    const drag = this._drag;
    if (this._pointers.size === 0) {
      this._drag = null;
      this._canvas.classList.remove('map-view__canvas--dragging');
      if (drag && !drag.moved && !cancelled && performance.now() - drag.downTime < 700) {
        const id = this._pick(e.clientX, e.clientY);
        if (id) this.select(id);
      }
    }
  }

  private _onWheel(e: WheelEvent): void {
    e.preventDefault();
    const unit = e.deltaMode === 1 ? 16 : e.deltaMode === 2 ? 100 : 1;
    const factor = Math.exp(-e.deltaY * unit * WHEEL_SENSITIVITY);
    this._zoomBy(factor, e.clientX, e.clientY);
  }

  private _handleKey(e: KeyboardEvent): void {
    if (e.ctrlKey || e.metaKey || e.altKey) return;
    const el = e.target as HTMLElement | null;
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) return;
    if (e.key === '+' || e.key === '=') {
      this._zoomBy(KEY_ZOOM_STEP);
      e.preventDefault();
    } else if (e.key === '-' || e.key === '_') {
      this._zoomBy(1 / KEY_ZOOM_STEP);
      e.preventDefault();
    }
  }

  /** Id of the point under the screen position, or null. */
  private _pick(px: number, py: number): string | null {
    if (!this._scene) return null;
    this._ndc.set((px / this._w) * 2 - 1, -((py / this._h) * 2 - 1));
    this._raycaster.setFromCamera(this._ndc, this._camera);
    const candidates = this._scene.pickables.filter((o) => o.visible);
    const hits = this._raycaster.intersectObjects(candidates, false);
    for (const hit of hits) {
      const direct = hit.object.userData.pointId as string | undefined;
      if (direct) return direct;
      if (hit.instanceId !== undefined) {
        const id = this._scene.pointIdForRingInstance(hit.instanceId);
        if (id) return id;
      }
    }
    return null;
  }

  private _setHover(id: string | null): void {
    if (id === this._hoverId) {
      if (!id) this._tooltip.hidden = true;
      return;
    }
    this._hoverId = id;
    this._scene?.setHover(id);
    this._canvas.style.cursor = id ? 'pointer' : '';
    const point = id ? getMapPoint(id) : undefined;
    if (point) {
      this._tooltip.replaceChildren();
      const name = document.createElement('strong');
      name.textContent = point.name;
      const tag = document.createElement('span');
      tag.textContent = point.tag;
      this._tooltip.append(name, tag);
      this._tooltip.style.setProperty('--map-accent', point.accent);
      this._tooltip.hidden = false;
    } else {
      this._tooltip.hidden = true;
    }
  }

  private _moveTooltip(x: number, y: number): void {
    this._tooltip.style.transform = `translate(${Math.round(x + 14)}px, ${Math.round(y + 16)}px)`;
  }

  /** Marks `id` as the current destination (ring + landmark highlight, legend entry). */
  setSelected(id: string | null): void {
    this._selectedId = id;
    this._scene?.setSelected(id);
    this.legend.setActive(id);
  }

  /** User chose a point (map click or legend). */
  select(id: string): void {
    this._opts.onSelect(id);
  }

  // ------------------------------------------------------------------ frame

  private _frame = (now: number): void => {
    if (!this._active) return;
    this._rafId = requestAnimationFrame(this._frame);
    const renderer = this._renderer;
    if (!renderer || !this._scene) return;

    const dt = Math.min((now - this._lastTime) / 1000, 0.1);
    this._lastTime = now;
    this._time += dt;

    this._updateZoom(dt);

    if (this._hoverRequest) {
      this._setHover(this._pick(this._hoverRequest.x, this._hoverRequest.y));
      this._hoverRequest = null;
    }

    const robot = this._robot;
    if (robot) {
      const bob = this._reduceMotion ? 0 : robot.idleBounce(this._time);
      robot.tilt.position.y = bob;
      this._lights?.update(robot.position, dt);
    }

    this._scene.update({
      dt,
      time: this._time,
      ppu: this._ppu,
      camera: this._camera,
      width: this._w,
      height: this._h,
      reduceMotion: this._reduceMotion,
    });
    renderer.render(this._three, this._camera);
  };
}
