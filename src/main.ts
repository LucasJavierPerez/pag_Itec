import * as THREE from 'three';
import { Experience } from './Experience/Experience.ts';
import { PhysicsWorld } from './Experience/Physics/PhysicsWorld.ts';
import { Vehicle } from './Experience/Physics/Vehicle.ts';
import { Controls } from './Experience/Controls.ts';
import { Triggers } from './Experience/Physics/Triggers.ts';
import { InfoPanel } from './UI/InfoPanel.ts';
import { GoalCelebration } from './UI/GoalCelebration.ts';
import { SoccerBall } from './Experience/World/SoccerBall.ts';
import { LoadingScreen } from './UI/LoadingScreen.ts';
import { ThemeManager, getStoredStyle } from './UI/ThemeManager.ts';
import { StyleSwitcher } from './UI/StyleSwitcher.ts';
import { QualityToggle } from './UI/QualityToggle.ts';
import { ViewManager, getInitialView } from './UI/ViewManager.ts';
import { MapView } from './Experience/Map/MapView.ts';
import { getMapPoint } from './UI/MapData.ts';
import { HudMenu } from './UI/HudMenu.ts';
import { TouchControls } from './UI/TouchControls.ts';
import { getCharacterId, getSkinId } from './Experience/Map/skinState.ts';

// Apply the saved UI theme synchronously so the first paint already uses it
const initialStyle = getStoredStyle();
ThemeManager.apply(initialStyle);

// Boot
const loadingScreen = new LoadingScreen();

const canvas = document.querySelector<HTMLCanvasElement>('#webgl')!;
// The chosen character + palette also dress the explorer (re-applied by World after every style swap)
const experience = new Experience(canvas, initialStyle, (id) => {
  // Runs while the style-change wipe fully covers the screen
  ThemeManager.apply(id);
  experience.world.setStyle(id);
});
experience.world.setAppearance(getCharacterId(), getSkinId());
window.addEventListener('skin-change', () => {
  experience.world.setAppearance(getCharacterId(), getSkinId());
});

const physicsWorld = new PhysicsWorld();

// Add static collision boxes from the world
for (const wall of experience.world.physicsDescriptions) {
  const pos = wall.position;
  const sz = wall.size;
  physicsWorld.addStaticBox(
    [pos.x, pos.y, pos.z],
    [sz.x, sz.y, sz.z],
  );
}

// Create vehicle and add to physics world
const vehicle = new Vehicle(physicsWorld.world);

// Soccer ball easter egg in the south patio
const ball = new SoccerBall(experience.scene, physicsWorld.world);
// The ball only owns physics; its visuals come from the current style
experience.world.attachBall(ball);

// Which tab is showing (set by the ViewManager hooks below)
let mapActive = false;

// Controls
const controls = new Controls();
// The joystick drives the explorer vehicle or, in the Mapa tab, the map robot
const touchControls = new TouchControls((dir) => {
  if (mapActive) mapView.setStickDirection(dir);
  else controls.setTouchDirection(dir);
});
touchControls.setTapHandler((x, y) => {
  if (mapActive) mapView.tapAt(x, y);
});

// Trigger zones
const triggers = new Triggers(
  experience.world.triggerDescriptions,
  physicsWorld.world,
  vehicle.chassisBody,
);

// Info panel (auto-listens to classroom-enter/leave events)
const infoPanel = new InfoPanel();
new GoalCelebration();

// Runtime style switcher: UI theme + 3D re-skin (physics untouched)
// Map tab: own canvas + render loop, created hidden and only active while its tab is shown
const mapView = new MapView({
  quality: experience.quality,
  getStyleId: () => experience.world.styleId,
  onArrive: (id) => {
    const p = getMapPoint(id);
    if (!p) return;
    infoPanel.showEntry({
      title: p.title,
      subtitle: p.subtitle,
      tag: p.tag,
      description: p.description,
      highlights: p.highlights,
      accent: p.accent,
      link: p.link,
    });
  },
  onDepart: () => infoPanel.hide(),
  onSecret: (entry) => infoPanel.showEntry(entry),
});

// While the map tab is active the explorer loop is paused, so the wipe cannot run: apply directly
const styleSwitcher = new StyleSwitcher(initialStyle, {
  request: (id) =>
    mapActive ? experience.styleTransition.applyImmediately(id) : experience.styleTransition.request(id),
});
const qualityToggle = new QualityToggle(experience.quality);
// Wraps both in a menu on small screens; on desktop the wrapper is layout-neutral
new HudMenu([styleSwitcher.element, qualityToggle.element]);

// Vehicle reset handler
window.addEventListener('vehicle-reset', () => {
  vehicle.reset();
});

// Hide loading screen after a short delay to let assets load
setTimeout(() => {
  loadingScreen.hide();
  experience.playIntro();
}, 1500);

// Reusable objects for the animation loop
const vehiclePosition = new THREE.Vector3();
const vehicleQuaternion = new THREE.Quaternion();

let lastTime = performance.now();
let rafId = 0;

// Animation loop
function animate(): void {
  rafId = requestAnimationFrame(animate);

  const now = performance.now();
  const delta = (now - lastTime) / 1000;
  lastTime = now;

  // Clamp delta to avoid physics explosion on tab switch
  const clampedDelta = Math.min(delta, 0.1);

  // Update controls
  controls.update(vehicle, clampedDelta);

  // Step physics
  physicsWorld.step(clampedDelta);
  ball.update(clampedDelta);

  // Check triggers
  triggers.check();

  // Sync Three.js with Cannon-es
  const chassisPos = vehicle.getChassisPosition();
  const chassisQuat = vehicle.getChassisQuaternion();

  vehiclePosition.set(chassisPos.x, chassisPos.y, chassisPos.z);
  vehicleQuaternion.set(
    chassisQuat.x,
    chassisQuat.y,
    chassisQuat.z,
    chassisQuat.w,
  );

  experience.world.updateAppearance(now / 1000);

  // Update experience (camera follow + render)
  experience.update(vehiclePosition, vehicleQuaternion);
}

animate();

// Hidden tab: stop whichever loop is running; resume without a delta spike when visible again
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (mapActive) {
      mapView.pause();
    } else {
      cancelAnimationFrame(rafId);
      experience.setPaused(true);
    }
    return;
  }
  if (mapActive) {
    mapView.resume();
  } else {
    lastTime = performance.now();
    experience.setPaused(false);
    cancelAnimationFrame(rafId);
    rafId = requestAnimationFrame(animate);
  }
});

// Explorer <-> map switching: exactly one render loop runs at any time
new ViewManager(
  {
    explorer: {
      pause: () => {
        cancelAnimationFrame(rafId);
        experience.setPaused(true);
      },
      resume: () => {
        lastTime = performance.now();
        experience.setPaused(false);
        rafId = requestAnimationFrame(animate);
      },
    },
    map: {
      activate: () => {
        mapActive = true;
        controls.setTouchDirection(null);
        mapView.activate();
      },
      deactivate: () => {
        mapActive = false;
        mapView.setStickDirection({ active: false, dirX: 0, dirZ: 0, strength: 0 });
        mapView.deactivate();
      },
    },
    explorerCanvas: canvas,
    infoPanel,
  },
  getInitialView(),
);
