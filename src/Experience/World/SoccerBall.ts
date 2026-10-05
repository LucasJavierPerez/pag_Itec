import * as THREE from 'three';
import * as CANNON from 'cannon-es';
import { disposeObject } from './styles/shared/dispose.ts';
import {
  BALL_RADIUS,
  GOAL_X,
  GOAL_Z,
  GOAL_WIDTH,
  GOAL_HEIGHT,
  GOAL_DEPTH,
  POST,
} from './styles/shared/ballGoal.ts';

const START = new THREE.Vector3(-6, 0.5, -34);

const RESET_DELAY = 3.5;

export class SoccerBall {
  private scene: THREE.Scene;
  private world: CANNON.World;
  private body: CANNON.Body;
  private ballVisual: THREE.Object3D | null = null;
  private goalVisual: THREE.Group | null = null;
  private scored = false;
  private resetTimer = 0;
  private onVehicleReset = () => this.reset();

  constructor(scene: THREE.Scene, world: CANNON.World) {
    this.scene = scene;
    this.world = world;

    this.body = new CANNON.Body({
      mass: 0.4,
      shape: new CANNON.Sphere(BALL_RADIUS),
      linearDamping: 0.4,
      angularDamping: 0.4,
    });
    // Sleeping bodies ignore velocity/forces in cannon-es
    this.body.allowSleep = false;
    this.body.position.set(START.x, START.y, START.z);
    world.addBody(this.body);

    this.buildGoalPhysics();
    window.addEventListener('vehicle-reset', this.onVehicleReset);
  }

  /**
   * Swaps the ball and goal visuals (style change). The previous ones are removed
   * from the scene and disposed; physics state is left untouched.
   */
  setVisuals(ball: THREE.Object3D, goal: THREE.Group): void {
    if (this.ballVisual) disposeObject(this.ballVisual);
    if (this.goalVisual) disposeObject(this.goalVisual);
    this.ballVisual = ball;
    this.goalVisual = goal;
    this.syncVisual();
    this.scene.add(ball);
    this.scene.add(goal);
  }

  private syncVisual(): void {
    if (!this.ballVisual) return;
    const p = this.body.position;
    const q = this.body.quaternion;
    this.ballVisual.position.set(p.x, p.y, p.z);
    this.ballVisual.quaternion.set(q.x, q.y, q.z, q.w);
  }

  private buildGoalPhysics(): void {
    const halfW = GOAL_WIDTH / 2;
    const backX = GOAL_X + GOAL_DEPTH;
    const midX = GOAL_X + GOAL_DEPTH / 2;

    const addPhysics = (
      half: [number, number, number],
      pos: [number, number, number],
    ): void => {
      const b = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(new CANNON.Vec3(...half)),
      });
      b.position.set(...pos);
      this.world.addBody(b);
    };

    // Posts and crossbar
    for (const z of [GOAL_Z - halfW, GOAL_Z + halfW]) {
      addPhysics([POST / 2, GOAL_HEIGHT / 2, POST / 2], [GOAL_X, GOAL_HEIGHT / 2, z]);
    }
    addPhysics([POST / 2, POST / 2, halfW], [GOAL_X, GOAL_HEIGHT, GOAL_Z]);

    // Back net
    addPhysics([0.1, GOAL_HEIGHT / 2, halfW], [backX, GOAL_HEIGHT / 2, GOAL_Z]);

    // Side nets
    for (const z of [GOAL_Z - halfW, GOAL_Z + halfW]) {
      addPhysics([GOAL_DEPTH / 2, GOAL_HEIGHT / 2, 0.1], [midX, GOAL_HEIGHT / 2, z]);
    }
  }

  update(delta: number): void {
    const p = this.body.position;
    this.syncVisual();

    if (!this.scored) {
      if (p.x > GOAL_X + 0.3 && Math.abs(p.z - GOAL_Z) < 2.2 && p.y < 2.3) {
        this.scored = true;
        this.resetTimer = RESET_DELAY;
        window.dispatchEvent(new CustomEvent('goal-scored'));
      } else if (
        p.y < -3 ||
        Math.abs(p.x) > 48 ||
        Math.abs(p.z) > 48
      ) {
        this.reset();
      }
    } else {
      this.resetTimer -= delta;
      if (this.resetTimer <= 0) this.reset();
    }
  }

  reset(): void {
    this.body.position.set(START.x, START.y, START.z);
    this.body.velocity.setZero();
    this.body.angularVelocity.setZero();
    this.body.quaternion.set(0, 0, 0, 1);
    this.scored = false;
    this.resetTimer = 0;
  }

  dispose(): void {
    window.removeEventListener('vehicle-reset', this.onVehicleReset);
    if (this.ballVisual) disposeObject(this.ballVisual);
    if (this.goalVisual) disposeObject(this.goalVisual);
    this.ballVisual = null;
    this.goalVisual = null;
  }
}
