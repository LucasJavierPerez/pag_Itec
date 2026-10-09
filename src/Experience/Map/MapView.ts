import * as THREE from 'three';
import { maxPixelRatio } from '../../utils/device.ts';
import { onViewportResize } from '../../utils/viewport.ts';
import { STYLES } from '../World/styles/index.ts';
import type { StyleId } from '../World/styles/types.ts';
import type { QualityController } from '../Post/Quality.ts';
import { MAP_POINTS, getMapPoint } from '../../UI/MapData.ts';
import { MapLegend } from '../../UI/MapLegend.ts';
import { MapScene } from './MapScene.ts';
import { RobotActor } from './RobotActor.ts';
import { getMapSkin } from './skins/index.ts';
import type { MapLights } from './skins/index.ts';
import { MAP_SIZE, PAD_TRIGGER_RADIUS, PLACEMENTS } from './mapLayout.ts';
import { createLayoutGraph } from './roadGraph.ts';
import { RobotRunner } from './RobotRunner.ts';
import { getCharacterId, getSkin } from './skinState.ts';
import type { CharacterId } from './characters/characterSpec.ts';
import { getRobotSkin } from './skins/robotSkins.ts';
import { SkinPicker } from '../../UI/SkinPicker.ts';
import { BotBubble } from '../../UI/BotBubble.ts';
import { BotCrowd } from './BotCrowd.ts';
import { BOTS } from './botSim.ts';
import { botLine, buildBotFacts } from './botFacts.ts';
import { getSharedTimeMs, stepSharedClock } from './sharedTime.ts';
import { MAP_ROBOT_SCALE } from './RobotActor.ts';
import { RemotePlayers } from './RemotePlayers.ts';
import { NameTag, NameTagLayer, SELF_ACCENT, TAG_PRIORITY, tagHeight } from './nameTag.ts';
import { ChatBubbles } from './ChatBubbles.ts';
import type { ChatStore } from '../../UI/chat/ChatStore.ts';
import type { MapOnline } from './net/MapOnline.ts';
import { PlayerMotion } from './playerMotion.ts';
import { PLAYER_RADIUS, SECRET_WALK, createWalkable } from './walkable.ts';
import { SecretSpot, isAdaFound, markAdaFound } from './Secret.ts';
import type { InfoEntry } from '../../UI/InfoPanel.ts';
import type { StickDirection } from '../../UI/joystickMapping.ts';

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
/** How quickly the camera glides after the robot (higher = tighter). */
const FOLLOW_DAMPING = 3.2;
/** A press that moves less than this (px) is a click, not a drag. */
const DRAG_THRESHOLD = 6;
/** Fingers wobble more than a mouse: touch taps tolerate more movement. */
const DRAG_THRESHOLD_TOUCH = 8;
/** Extra pick radius (px) around a touch tap: ~1.4x bigger targets for fingertips. */
const TOUCH_PICK_RADIUS = 14;
/** Two taps within this time (ms) and distance (px) on empty ground zoom in one step. */
const DOUBLE_TAP_MS = 320;
const DOUBLE_TAP_DIST = 30;
const DOUBLE_TAP_ZOOM = 1.8;
/** Standing this long (s) on a stop pad opens its card; leaving for longer than the second value re-arms it. */
const PAD_DWELL_SECONDS = 0.6;
const PAD_REARM_SECONDS = 2;
/** How far the view target may leave the map. */
const PAN_LIMIT_X = MAP_SIZE.w / 2 - 4;
const PAN_LIMIT_Z_MIN = MAP_SIZE.cz - MAP_SIZE.d / 2 + 4;
const PAN_LIMIT_Z_MAX = MAP_SIZE.cz + MAP_SIZE.d / 2 - 4;

/** Non-ASCII characters in the URL path are percent-encoded. */
const ADA_URL = encodeURI('https://www.itecriocuarto.org.ar/adabyron/quién-fue-ada-byron');

const ADA_ENTRY: InfoEntry = {
  title: 'Secreto descubierto: Ada Byron',
  subtitle: 'La primera programadora',
  tag: 'Easter egg',
  description:
    'Ada Byron, condesa de Lovelace, publicó en 1843 lo que hoy se considera el primer algoritmo pensado para ser ejecutado por una máquina. Nuestro Secundario lleva su nombre.',
  highlights: ['1843', 'Primer algoritmo', 'Secundario Ada Byron'],
  accent: '#c0392b',
  link: { label: 'Quién fue Ada Byron →', url: ADA_URL },
};

export interface MapViewOptions {
  quality: QualityController;
  /** Style currently active in the explorer (read on activation). */
  getStyleId: () => StyleId;
  /** The robot reached the point (or was already there): open its card. */
  onArrive: (pointId: string) => void;
  /** A new run starts: close the previous card. */
  onDepart: () => void;
  /** Shows a card that is not a map point (the Ada Byron easter egg). */
  onSecret: (entry: InfoEntry) => void;
  /** Multiplayer glue: nickname, connection and position reports. */
  online: MapOnline;
  /** Chat messages, shown as speech bubbles above the characters. */
  chat: ChatStore;
}

/**
 * The "Mapa" tab: own canvas, own scene, own render loop that only runs while the tab is visible.
 */
export class MapView {
  readonly root: HTMLDivElement;
  readonly legend: MapLegend;
  readonly skinPicker: SkinPicker;
  readonly botBubble = new BotBubble();

  private _opts: MapViewOptions;
  private _canvas: HTMLCanvasElement;
  private _tooltip: HTMLDivElement;
  private _renderer: THREE.WebGLRenderer | null = null;
  private _three = new THREE.Scene();
  private _camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 1, 600);
  private _scene: MapScene | null = null;
  private _lights: MapLights | null = null;
  private _robot: RobotActor | null = null;
  private _runner: RobotRunner | null = null;
  private _crowd: BotCrowd | null = null;
  private _remote: RemotePlayers | null = null;
  private _tagLayer = new NameTagLayer();
  private _bubbles = new ChatBubbles();
  private _selfTag: NameTag | null = null;
  private _botFacts = buildBotFacts(MAP_POINTS);
  private _lastFact = -1;
  private _bubbleBot = -1;
  private _head = new THREE.Vector3();
  private _graph = createLayoutGraph();
  private _walkable = createWalkable(SECRET_WALK);
  private _secret: SecretSpot | null = null;
  private _adaFound = isAdaFound();
  private _player = new PlayerMotion();
  private _clamp = (x: number, z: number, out: { x: number; z: number }): void =>
    this._walkable.clampInto(x, z, PLAYER_RADIUS, out);
  private _keys = { up: false, down: false, left: false, right: false };
  private _stick: StickDirection = { active: false, dirX: 0, dirZ: 0, strength: 0 };
  private _wasPushing = false;
  private _cardOpen = false;
  private _forward = new THREE.Vector3();
  private _inputX = 0;
  private _inputZ = 0;
  private _inputStrength = 0;
  /** Stop pads: where standing still opens the card of a point. */
  private _pads = PLACEMENTS.map((p) => ({ id: p.pointId, x: 0, z: 0, placement: p }));
  private _padCurrent: string | null = null;
  private _padDwell = 0;
  private _padFired = new Map<string, number>();
  private _follow = false;
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
  private _drag: { moved: boolean; startX: number; startY: number; downTime: number; threshold: number } | null = null;
  private _lastTap: { time: number; x: number; y: number } | null = null;
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
  private _unsubResize: (() => void) | null = null;
  private _onKey = (e: KeyboardEvent): void => this._handleKey(e);
  private _onKeyUp = (e: KeyboardEvent): void => this._setMoveKey(e.code, false);
  private _onBlur = (): void => this._releaseInput();
  /** Typing in a text field (the chat) must never leave a movement key stuck down. */
  private _onFocusIn = (e: FocusEvent): void => {
    const el = e.target as HTMLElement | null;
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.isContentEditable)) this._releaseInput();
  };
  private _onSkin = (e: Event): void => {
    const detail = (e as CustomEvent<{ id: string; character?: CharacterId }>).detail;
    this._robot?.setSkin(getRobotSkin(detail?.id));
    this._robot?.setCharacter(detail?.character ?? getCharacterId());
  };
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

    this._bubbles.setHeadResolver((id, self, out) => {
      if (self) {
        const robot = this._robot;
        if (!robot) return false;
        out.set(robot.position.x, tagHeight(MAP_ROBOT_SCALE) + robot.tilt.position.y, robot.position.z);
        return true;
      }
      return this._remote?.headPosition(id, out) ?? false;
    });
    opts.chat.onChat((m) => {
      if (this._active) this._bubbles.show(m.id ?? '', m.self, m.text, performance.now());
    });
    opts.chat.subscribe(() => {
      // Muting someone also removes the bubble they have on screen right now
      for (const id of opts.chat.mutedIds) this._bubbles.remove(id);
    });

    this.legend = new MapLegend((id, e) => this.select(id, e.shiftKey));

    this.skinPicker = new SkinPicker({ getStyleId: () => this._opts.getStyleId() });

    const hud = document.createElement('div');
    hud.className = 'map-hud';
    hud.setAttribute('role', 'group');
    hud.setAttribute('aria-label', 'Controles del mapa');
    hud.append(
      this._hudButton('+', 'Acercar', () => this._zoomBy(KEY_ZOOM_STEP), 'map-hud__desktop-only'),
      this._hudButton('−', 'Alejar', () => this._zoomBy(1 / KEY_ZOOM_STEP), 'map-hud__desktop-only'),
      this._hudButton('Centrar', 'Centrar el mapa en el robot', () => this.centerOnRobot(), 'map-hud__button--wide map-hud__desktop-only'),
      this._hudButton('Ver todo', 'Ver todo el mapa', () => this.resetView(), 'map-hud__button--wide map-hud__desktop-only'),
      this.skinPicker.toggle,
      this._centerIconButton(),
    );
    this.skinPicker.toggle.classList.add('map-hud__desktop-only');

    this.root.append(this._canvas, this._tooltip, hud, this.skinPicker.panel, this.botBubble.element, this.legend.element);
    document.body.appendChild(this.root);

    this._canvas.addEventListener('pointerdown', (e) => this._onPointerDown(e));
    this._canvas.addEventListener('pointermove', (e) => this._onPointerMove(e));
    this._canvas.addEventListener('pointerup', (e) => this._onPointerUp(e));
    this._canvas.addEventListener('pointercancel', (e) => this._onPointerUp(e, true));
    this._canvas.addEventListener('pointerleave', () => this._setHover(null));
    this._canvas.addEventListener('wheel', (e) => this._onWheel(e), { passive: false });

    this._camera.up.set(0, 1, 0);
    for (const pad of this._pads) {
      const stop = this._graph.nodes.get(pad.placement.stop)!;
      pad.x = stop.x;
      pad.z = stop.z;
    }
  }

  /** Compact HUD (phones): the only map button left on screen; hidden on desktop via CSS. */
  private _centerIconButton(): HTMLButtonElement {
    const b = document.createElement('button');
    b.type = 'button';
    b.className = 'map-hud__center';
    b.setAttribute('aria-label', 'Centrar en mi personaje');
    b.innerHTML =
      '<svg viewBox="0 0 24 24" width="22" height="22" aria-hidden="true" focusable="false"><circle cx="12" cy="12" r="6.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="12" r="2" fill="currentColor"/><path d="M12 1.5v5M12 17.5v5M1.5 12h5M17.5 12h5" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
    b.addEventListener('click', (e) => {
      if (e.detail > 0) b.blur();
      this.centerOnRobot();
    });
    return b;
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
      window.addEventListener('skin-change', this._onSkin);
      this._opts.quality.addEventListener('change', this._onQuality);
      this._resize();
      this.resetView(true);
    } else {
      this._resize();
    }
    this._unsubResize = onViewportResize(this._onResize);
    window.addEventListener('keydown', this._onKey);
    window.addEventListener('keyup', this._onKeyUp);
    window.addEventListener('blur', this._onBlur);
    window.addEventListener('focusin', this._onFocusIn);

    if (this._dirty || this._builtStyle !== this._opts.getStyleId()) this._rebuild();
    this._lastTime = performance.now();
    this._rafId = requestAnimationFrame(this._frame);
    this._opts.online.mapShown();
  }

  /** Stops the render loop while the page is hidden (view stays active). */
  pause(): void {
    if (!this._active) return;
    cancelAnimationFrame(this._rafId);
  }

  /** Restarts the loop after `pause`; the hidden time never shows up as a delta. */
  resume(): void {
    if (!this._active) return;
    cancelAnimationFrame(this._rafId);
    this._lastTime = performance.now();
    this._rafId = requestAnimationFrame(this._frame);
  }

  deactivate(): void {
    if (!this._active) return;
    this._active = false;
    cancelAnimationFrame(this._rafId);
    this._unsubResize?.();
    this._unsubResize = null;
    window.removeEventListener('keydown', this._onKey);
    window.removeEventListener('keyup', this._onKeyUp);
    window.removeEventListener('blur', this._onBlur);
    window.removeEventListener('focusin', this._onFocusIn);
    this._bubbles.clear();
    this.skinPicker.close();
    this.botBubble.hide();
    this._opts.online.mapHidden();
    this._releaseInput();
    this._pointers.clear();
    this._drag = null;
    this._pinch = null;
    this._lastTap = null;
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
    renderer.setPixelRatio(quality === 'high' ? Math.min(window.devicePixelRatio, maxPixelRatio()) : 1);
    renderer.setSize(this._w, this._h, false);

    this._scene = new MapScene(skin, quality);
    this._three.add(this._scene.root);
    this._lights = skin.createLights(this._three, quality);

    if (!this._robot) {
      this._robot = new RobotActor(this._three, styleId, getSkin(), undefined, getCharacterId(), quality);
      this._robot.setPosition(0, 0);
      this._runner = new RobotRunner(this._robot, this._graph, this._three, {
        onArrive: (id) => {
          this._scene?.pop(id);
          this._markPadFired(id);
          this._showCard(id);
        },
      });
    } else {
      this._robot.setSkin(getSkin());
      this._robot.setCharacter(getCharacterId());
      this._robot.setQuality(quality);
      if (this._builtStyle !== styleId) this._robot.setStyle(styleId);
    }
    this._robot.setShadows(shadows);
    this._runner?.setSkin(skin);

    if (!this._crowd) this._crowd = new BotCrowd(this._three, styleId, quality);
    else {
      this._crowd.setStyle(styleId);
      this._crowd.setQuality(quality);
    }
    this._crowd.setShadows(shadows);
    this._crowd.setMapSkin(skin);

    if (!this._remote) {
      this._remote = new RemotePlayers(this._three, styleId, quality);
      this._opts.online.onClient((client) => this._remote?.bind(client));
    } else {
      this._remote.setStyle(styleId);
      this._remote.setQuality(quality);
    }
    this._remote.setShadows(shadows);
    this._remote.setMapSkin(skin);
    if (!this._selfTag) {
      this._selfTag = new NameTag({ text: this._opts.online.nick || ' ', accent: SELF_ACCENT, self: true }, quality === 'high');
      this._three.add(this._selfTag.sprite);
    }
    this._bubbles.attach(this._three);

    this._secret?.dispose();
    this._secret = new SecretSpot(skin, quality, this._adaFound);
    this._three.add(this._secret.root);

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

  /** Glides the view target towards the robot; stops once it is centered and idle. */
  private _followRobot(p: THREE.Vector3, dt: number): void {
    const k = this._reduceMotion ? 1 : 1 - Math.exp(-FOLLOW_DAMPING * dt);
    this._target.x += (p.x - this._target.x) * k;
    this._target.y += (p.z - this._target.y) * k;
    this._applyCamera();
    const settled = Math.hypot(p.x - this._target.x, p.z - this._target.y) < 0.05;
    if (settled && !this._runner?.running) this._follow = false;
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
    try {
      this._canvas.setPointerCapture(e.pointerId);
    } catch {
      // the pointer may already be gone; tracking by pointer id still works
    }
    this._pointers.set(e.pointerId, { x: e.clientX, y: e.clientY });
    if (this._pointers.size === 1) {
      this._drag = { moved: false, startX: e.clientX, startY: e.clientY,
        downTime: performance.now(),
        threshold: e.pointerType === 'mouse' ? DRAG_THRESHOLD : DRAG_THRESHOLD_TOUCH,
      };
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
      this._follow = false;
      this._panByPixels(dx / 2, dy / 2);
      return;
    }

    const drag = this._drag;
    if (!drag) return;
    if (!drag.moved && Math.hypot(e.clientX - drag.startX, e.clientY - drag.startY) > drag.threshold) {
      drag.moved = true;
      this._canvas.classList.add('map-view__canvas--dragging');
      this._setHover(null);
    }
    if (drag.moved) {
      this._follow = false;
      this._panByPixels(dx, dy);
    }
  }

  private _onPointerUp(e: PointerEvent, cancelled = false): void {
    this._pointers.delete(e.pointerId);
    if (this._pointers.size < 2) this._pinch = null;
    const drag = this._drag;
    if (this._pointers.size === 0) {
      this._drag = null;
      this._canvas.classList.remove('map-view__canvas--dragging');
      if (drag && !drag.moved && !cancelled && performance.now() - drag.downTime < 700) {
        const touch = e.pointerType !== 'mouse';
        const bot = this._pickBot(e.clientX, e.clientY, touch);
        if (bot >= 0) {
          this._lastTap = null;
          this._talkTo(bot);
          return;
        }
        const id = touch ? this._pickTolerant(e.clientX, e.clientY) : this._pick(e.clientX, e.clientY);
        if (id) {
          this._lastTap = null;
          this.select(id, e.shiftKey);
        } else if (touch) {
          const now = performance.now();
          const last = this._lastTap;
          if (last && now - last.time < DOUBLE_TAP_MS && Math.hypot(e.clientX - last.x, e.clientY - last.y) < DOUBLE_TAP_DIST) {
            this._lastTap = null;
            this._zoomBy(DOUBLE_TAP_ZOOM, e.clientX, e.clientY);
          } else {
            this._lastTap = { time: now, x: e.clientX, y: e.clientY };
          }
        }
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
    if (el && (el.tagName === 'INPUT' || el.tagName === 'TEXTAREA' || el.tagName === 'SELECT' || el.isContentEditable)) return;
    if (this._isMoveCode(e.code)) {
      // Arrow keys belong to the tab bar while it has focus (tab navigation)
      if (e.code.startsWith('Arrow') && el?.closest('[role="tablist"], .skin-picker')) return;
      this._setMoveKey(e.code, true);
      e.preventDefault();
      return;
    }
    if (e.key === '+' || e.key === '=') {
      this._zoomBy(KEY_ZOOM_STEP);
      e.preventDefault();
    } else if (e.key === '-' || e.key === '_') {
      this._zoomBy(1 / KEY_ZOOM_STEP);
      e.preventDefault();
    }
  }

  private _isMoveCode(code: string): boolean {
    return (
      code === 'KeyW' || code === 'KeyA' || code === 'KeyS' || code === 'KeyD' ||
      code === 'ArrowUp' || code === 'ArrowDown' || code === 'ArrowLeft' || code === 'ArrowRight'
    );
  }

  private _setMoveKey(code: string, down: boolean): void {
    const k = this._keys;
    switch (code) {
      case 'KeyW': case 'ArrowUp': k.up = down; break;
      case 'KeyS': case 'ArrowDown': k.down = down; break;
      case 'KeyA': case 'ArrowLeft': k.left = down; break;
      case 'KeyD': case 'ArrowRight': k.right = down; break;
    }
  }

  private _releaseInput(): void {
    this._keys.up = this._keys.down = this._keys.left = this._keys.right = false;
    this._stick = { active: false, dirX: 0, dirZ: 0, strength: 0 };
  }

  /** Virtual joystick (touch): screen-relative direction, same controller as the keys. */
  setStickDirection(dir: StickDirection): void {
    this._stick = dir;
  }

  /** A short tap that landed on the joystick zone: still selects what is under the finger. */
  tapAt(x: number, y: number): void {
    if (!this._active) return;
    const id = this._pickTolerant(x, y);
    if (id) this.select(id);
  }

  /**
   * Wanted ground direction from keys / stick, rotated by the camera yaw so that screen up is
   * away from the viewer and screen right is right on screen (also with a tilted camera).
   */
  private _readInput(): void {
    const k = this._keys;
    let sx = (k.right ? 1 : 0) - (k.left ? 1 : 0);
    let sy = (k.up ? 1 : 0) - (k.down ? 1 : 0);
    let strength = 1;
    if (sx === 0 && sy === 0 && this._stick.active) {
      sx = this._stick.dirX;
      sy = -this._stick.dirZ;
      strength = this._stick.strength;
    } else if (sx !== 0 || sy !== 0) {
      const l = Math.hypot(sx, sy);
      sx /= l;
      sy /= l;
    } else {
      strength = 0;
    }
    this._camera.getWorldDirection(this._forward);
    let fx = this._forward.x;
    let fz = this._forward.z;
    const fl = Math.hypot(fx, fz) || 1;
    fx /= fl;
    fz /= fl;
    // forward = (fx, fz) is "up on screen"; right = (-fz, fx)
    this._inputX = fx * sy - fz * sx;
    this._inputZ = fz * sy + fx * sx;
    this._inputStrength = strength;
  }

  /** Index of the bot under the screen position (head/body area), or -1. Bots are not raycast. */
  private _pickBot(px: number, py: number, touch: boolean): number {
    const crowd = this._crowd;
    if (!crowd) return -1;
    const radius = Math.max(touch ? 26 : 18, this._ppu * 1.0);
    let best = -1;
    let bestD = radius;
    for (let i = 0; i < crowd.states.length; i++) {
      crowd.headPosition(i, this._head).project(this._camera);
      const sx = (this._head.x * 0.5 + 0.5) * this._w;
      const sy = (-this._head.y * 0.5 + 0.5) * this._h;
      const d = Math.hypot(sx - px, sy - py);
      if (d < bestD) {
        bestD = d;
        best = i;
      }
    }
    return best;
  }

  /** Tap / click on a bot: it waves and says a short line with a real ITEC fact. */
  private _talkTo(index: number): void {
    const bot = BOTS[index];
    if (!bot || this._botFacts.length === 0) return;
    let k = Math.floor(Math.random() * this._botFacts.length);
    if (k === this._lastFact) k = (k + 1) % this._botFacts.length;
    this._lastFact = k;
    this._crowd?.wave(index, this._time);
    this._bubbleBot = index;
    const point = getMapPoint(this._botFacts[k].pointId);
    this.botBubble.show(bot.name, botLine(bot.name, this._botFacts[k]), point?.accent ?? '#3498db');
  }

  /** `_pick` with a ring of extra samples around the tap, so fingertips can hit small targets. */
  private _pickTolerant(px: number, py: number): string | null {
    const direct = this._pick(px, py);
    if (direct) return direct;
    for (let i = 0; i < 8; i++) {
      const a = (i / 8) * Math.PI * 2;
      const id = this._pick(px + Math.cos(a) * TOUCH_PICK_RADIUS, py + Math.sin(a) * TOUCH_PICK_RADIUS);
      if (id) return id;
    }
    return null;
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

  /** Centers the camera on the robot and keeps following it while it runs. */
  centerOnRobot(): void {
    this._follow = true;
  }

  /**
   * User chose a point (map click or legend): the robot runs there along the roads and the
   * card opens on arrival (immediately when `immediate`, e.g. Shift+click). Re-routes mid-run.
   */
  select(id: string, immediate = false): void {
    const point = getMapPoint(id);
    const placement = PLACEMENTS.find((p) => p.pointId === id);
    const runner = this._runner;
    const stop = placement ? this._graph.nodes.get(placement.stop) : undefined;
    if (!point || !placement || !stop || !runner) return;

    this.setSelected(id);
    if (runner.isParkedAt(stop.x, stop.z)) {
      // Already standing there: just open the card
      this._scene?.pop(id);
      this._markPadFired(id);
      this._showCard(id);
      return;
    }

    this._closeCard();
    const started = runner.runTo(id, placement.stop, point.accent, { x: placement.x, z: placement.z });
    if (!started) {
      this._scene?.pop(id);
      this._showCard(id);
      return;
    }
    this._player.vx = this._player.vz = 0;
    // A fresh run re-enables auto-follow (the user's own panning cancelled the previous one)
    this._follow = true;
    if (immediate) this._showCard(id);
  }

  private _showCard(id: string): void {
    this._cardOpen = true;
    this._opts.onArrive(id);
  }

  private _closeCard(): void {
    this._cardOpen = false;
    this._opts.onDepart();
  }

  /** The player stood on the hidden pad: binary rain + the Ada Byron card (shorter once found). */
  private _discoverAda(): void {
    const first = !this._adaFound;
    this._secret?.playRain(this._reduceMotion);
    this._adaFound = true;
    this._secret?.setFound(true);
    markAdaFound();
    this._opts.onSecret(ADA_ENTRY);
    window.dispatchEvent(new CustomEvent('secret-found', { detail: { id: 'ada', first } }));
  }

  private _markPadFired(id: string): void {
    this._padFired.set(id, 0);
  }

  /** Free movement: takeover from a run, drive the player, release when stopped. */
  private _updatePlayer(robot: RobotActor, runner: RobotRunner, dt: number): void {
    this._readInput();
    const pushing = this._inputStrength > 0;
    if (pushing && !this._wasPushing) this._follow = true;
    this._wasPushing = pushing;

    if (pushing && !runner.manual) {
      // Takeover: cancel the auto-run (and its dashed line) and continue from where the robot is
      const speed = runner.speed;
      runner.cancelRun();
      this._player.reset(robot.position.x, robot.position.z, runner.heading, speed);
      if (this._cardOpen) this._closeCard();
    }
    if (!runner.manual && !pushing) return;

    this._player.step(dt, this._inputX, this._inputZ, this._inputStrength, this._clamp);
    robot.setPosition(this._player.x, this._player.z);
    runner.driveManual(this._player.speed, this._player.heading, this._player.turnRate);
    if (!pushing && this._player.speed < 0.05) {
      this._player.vx = this._player.vz = 0;
      runner.endManual();
    }
  }

  /** Own name tag above the player and the position reports for the other players. */
  private _updateOnline(now: number, robot: RobotActor, runner: RobotRunner): void {
    const online = this._opts.online;
    const nick = online.nick;
    const tag = this._selfTag;
    if (tag && nick) {
      tag.update({ text: nick, accent: SELF_ACCENT, self: true }, this._opts.quality.level === 'high');
      this._tagLayer.add(
        tag,
        robot.position.x,
        tagHeight(MAP_ROBOT_SCALE) + robot.tilt.position.y,
        robot.position.z,
        TAG_PRIORITY.self,
        0,
      );
    }
    online.tick(now, robot.position.x, robot.position.z, robot.holder.rotation.y, runner.speed);
  }

  /** Standing on a stop pad for a moment opens its card (WASD / joystick users get cards too). */
  private _updatePads(robot: RobotActor, runner: RobotRunner, dt: number): void {
    let current: string | null = null;
    if (!runner.running) {
      const p = robot.position;
      let best = PAD_TRIGGER_RADIUS;
      for (const pad of this._pads) {
        const d = Math.hypot(p.x - pad.x, p.z - pad.z);
        if (d < best) {
          best = d;
          current = pad.id;
        }
      }
    }
    if (current !== this._padCurrent) {
      this._padCurrent = current;
      this._padDwell = 0;
    } else if (current) {
      this._padDwell += dt;
    }
    for (const [id, away] of this._padFired) {
      if (id === current) {
        this._padFired.set(id, 0);
      } else if (away + dt > PAD_REARM_SECONDS) {
        this._padFired.delete(id);
      } else {
        this._padFired.set(id, away + dt);
      }
    }
    if (current && this._padDwell >= PAD_DWELL_SECONDS && !this._padFired.has(current)) {
      this._markPadFired(current);
      this.setSelected(current);
      this._scene?.pop(current);
      this._showCard(current);
    }
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
    stepSharedClock();
    this._tagLayer.begin();

    this._updateZoom(dt);

    if (this._hoverRequest) {
      const overBot = this._pickBot(this._hoverRequest.x, this._hoverRequest.y, false) >= 0;
      this._setHover(overBot ? null : this._pick(this._hoverRequest.x, this._hoverRequest.y));
      if (overBot) this._canvas.style.cursor = 'pointer';
      else if (!this._hoverId) this._canvas.style.cursor = '';
      this._hoverRequest = null;
    }

    const robot = this._robot;
    if (robot && this._runner) {
      this._updatePlayer(robot, this._runner, dt);
      this._updatePads(robot, this._runner, dt);
      if (this._secret?.update(dt, this._time, this._ppu, robot.position.x, robot.position.z, this._reduceMotion)) {
        this._discoverAda();
      }
    }
    if (robot) {
      this._runner?.update(dt, this._time, this._ppu, this._reduceMotion);
      robot.update(this._time);
      this._lights?.update(robot.position, dt);
      if (this._follow) this._followRobot(robot.position, dt);
    }

    if (robot && this._runner) this._updateOnline(now, robot, this._runner);

    if (this._remote && robot) {
      this._remote.update(dt, this._time, this._ppu, this._reduceMotion, robot.position, this._camera, this._tagLayer);
    }

    if (this._crowd && robot) {
      this._crowd.update(dt, this._time, getSharedTimeMs(), this._ppu, this._reduceMotion, robot.position, this._tagLayer);
      if (this.botBubble.visible && this._bubbleBot >= 0) {
        this._crowd.headPosition(this._bubbleBot, this._head).project(this._camera);
        this.botBubble.setPosition((this._head.x * 0.5 + 0.5) * this._w, (-this._head.y * 0.5 + 0.5) * this._h);
      }
    }

    this._tagLayer.resolve(this._camera, this._w, this._h, this._ppu);
    this._bubbles.update(now, this._ppu, this._reduceMotion);

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
