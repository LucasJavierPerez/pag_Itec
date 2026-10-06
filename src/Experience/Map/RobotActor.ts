import * as THREE from 'three';
import { STYLES } from '../World/styles/index.ts';
import type { StyleId } from '../World/styles/types.ts';
import { disposeObject } from '../World/styles/shared/dispose.ts';

/** Visual scale of the robot on the map (the style robots are ~1 m tall). */
export const MAP_ROBOT_SCALE = 1.4;

/**
 * The robot that lives on the map. `holder` carries the ground position and heading, `tilt`
 * the run animation (lean / sway), and the style robot sits inside it.
 */
export class RobotActor {
  readonly holder = new THREE.Group();
  readonly tilt = new THREE.Group();

  private _body: THREE.Group | null = null;
  private _bounce: (time: number) => number = () => 0;
  private _shadows = false;

  constructor(parent: THREE.Object3D, styleId: StyleId) {
    this.tilt.scale.setScalar(MAP_ROBOT_SCALE);
    this.holder.add(this.tilt);
    parent.add(this.holder);
    this.setStyle(styleId);
  }

  /** Replaces the robot visual by the one of `styleId`, keeping position and heading. */
  setStyle(styleId: StyleId): void {
    if (this._body) disposeObject(this._body);
    const result = STYLES[styleId].createRobot();
    this._body = result.group;
    this._bounce = result.getBounceOffset;
    this.tilt.add(this._body);
    this.setShadows(this._shadows);
  }

  setShadows(enabled: boolean): void {
    this._shadows = enabled;
    this._body?.traverse((o) => {
      if ((o as THREE.Mesh).isMesh) o.castShadow = enabled;
    });
  }

  get position(): THREE.Vector3 {
    return this.holder.position;
  }

  setPosition(x: number, z: number): void {
    this.holder.position.set(x, 0, z);
  }

  setHeading(yaw: number): void {
    this.holder.rotation.y = yaw;
  }

  /** The style's own idle bob (the explorer uses the same function). */
  idleBounce(time: number): number {
    return this._bounce(time) * MAP_ROBOT_SCALE;
  }

  dispose(): void {
    if (this._body) disposeObject(this._body);
    this._body = null;
    this.holder.parent?.remove(this.holder);
  }
}
