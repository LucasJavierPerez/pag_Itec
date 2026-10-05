import * as THREE from 'three';
import type { LightsHandle } from '../types.ts';
import { getClassroomAccents } from './Classrooms.ts';

// Physically-based units (three r155+): spot intensity in candela, ~15 units above the floor.
const SPOT_INTENSITY = 2000;
const SPOT_OFFSET = new THREE.Vector3(0, 14, 5);
const SPOT_FOLLOW_K = 6;
const INTERIOR_INTENSITY = 60;

export class Lights implements LightsHandle {
  ambient: THREE.AmbientLight;
  spot: THREE.SpotLight;
  private spotTarget: THREE.Object3D;
  private interiorLights: THREE.PointLight[] = [];
  private scene: THREE.Scene;
  private lastTime: number;
  private snapped = false;

  constructor(
    scene: THREE.Scene,
    classroomPositions?: { x: number; z: number }[],
  ) {
    this.scene = scene;
    this.lastTime = performance.now();

    this.ambient = new THREE.AmbientLight(0x1a2a55, 0.3);

    this.spotTarget = new THREE.Object3D();
    this.spot = new THREE.SpotLight(0xfff0d8, SPOT_INTENSITY, 0, 0.55, 0.6, 2);
    this.spot.position.copy(SPOT_OFFSET);
    this.spot.target = this.spotTarget;
    this.spot.castShadow = true;
    this.spot.shadow.mapSize.set(2048, 2048);
    this.spot.shadow.camera.near = 4;
    this.spot.shadow.camera.far = 40;
    this.spot.shadow.bias = -0.0004;
    this.spot.shadow.normalBias = 0.03;

    scene.add(this.ambient, this.spot, this.spotTarget);

    if (classroomPositions) {
      const accents = getClassroomAccents();
      classroomPositions.forEach((pos, i) => {
        const light = new THREE.PointLight(accents[i] ?? 0xffaa44, INTERIOR_INTENSITY, 14, 2);
        light.position.set(pos.x, 3, pos.z);
        scene.add(light);
        this.interiorLights.push(light);
      });
    }
  }

  /** Called every frame: the spotlight glides after the robot. */
  update(robotPosition: THREE.Vector3): void {
    const now = performance.now();
    const dt = Math.min((now - this.lastTime) / 1000, 0.1);
    this.lastTime = now;
    // First call (build / style switch): snap onto the robot instead of gliding from the origin
    const a = this.snapped ? 1 - Math.exp(-SPOT_FOLLOW_K * dt) : 1;
    this.snapped = true;

    this.spotTarget.position.lerp(robotPosition, a);
    this.spot.position.x += (robotPosition.x + SPOT_OFFSET.x - this.spot.position.x) * a;
    this.spot.position.y += (robotPosition.y + SPOT_OFFSET.y - this.spot.position.y) * a;
    this.spot.position.z += (robotPosition.z + SPOT_OFFSET.z - this.spot.position.z) * a;
  }

  destroy(): void {
    this.scene.remove(this.ambient, this.spot, this.spotTarget);
    this.ambient.dispose();
    this.spot.dispose(); // frees the shadow map
    for (const light of this.interiorLights) {
      this.scene.remove(light);
      light.dispose();
    }
    this.interiorLights = [];
  }
}
