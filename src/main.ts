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

// Apply the saved UI theme synchronously so the first paint already uses it
const initialStyle = getStoredStyle();
ThemeManager.apply(initialStyle);

// Boot
const loadingScreen = new LoadingScreen();

const canvas = document.querySelector<HTMLCanvasElement>('#webgl')!;
const experience = new Experience(canvas, initialStyle, (id) => {
  // Runs while the style-change wipe fully covers the screen
  ThemeManager.apply(id);
  experience.world.setStyle(id);
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

// Controls
const controls = new Controls();

// Trigger zones
const triggers = new Triggers(
  experience.world.triggerDescriptions,
  physicsWorld.world,
  vehicle.chassisBody,
);

// Info panel (auto-listens to classroom-enter/leave events)
new InfoPanel();
new GoalCelebration();

// Runtime style switcher: UI theme + 3D re-skin (physics untouched)
new StyleSwitcher(initialStyle, experience.styleTransition);
new QualityToggle(experience.quality);

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

// Animation loop
function animate(): void {
  requestAnimationFrame(animate);

  const now = performance.now();
  const delta = (now - lastTime) / 1000;
  lastTime = now;

  // Clamp delta to avoid physics explosion on tab switch
  const clampedDelta = Math.min(delta, 0.1);

  // Update controls
  controls.update(vehicle);

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

  // Update experience (camera follow + render)
  experience.update(vehiclePosition, vehicleQuaternion);
}

animate();
