import * as THREE from 'three';
import type { Sizes } from './Utils/Sizes.ts';

const POSITION_DAMPING = 3.5;
const LOOK_DAMPING = 5;
const LOOK_AHEAD = 2.5;
const LOOK_HEIGHT = 1;
const MAX_DT = 0.1;

const BASE_FOV = 45;
const BASE_OFFSET_Y = 8;
const BASE_OFFSET_Z = 10;

// Cinematic intro: extra offset/FOV on top of the normal follow, decaying to zero
const INTRO_OFFSET_X = 28;
const INTRO_OFFSET_Y = 34 - BASE_OFFSET_Y;
const INTRO_OFFSET_Z = 46 - BASE_OFFSET_Z;
const INTRO_FOV_EXTRA = 62 - BASE_FOV;

// Motion response
const MAX_SPEED = 5; // robot top speed (matches the vehicle controller)
const SPEED_SMOOTHING = 6;
const FOV_MAX_EXTRA = 6;
const FOV_DAMPING = 3;
const ROLL_MAX = 0.025;
const ROLL_PER_YAW_RATE = 0.012; // rad of roll per rad/s of yaw rate
const ROLL_DAMPING = 4;
/** Frame displacement above this is a teleport (vehicle reset), not motion. */
const TELEPORT_DISTANCE = 4;

function easeInOutCubic(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

export class Camera {
  instance: THREE.PerspectiveCamera;

  private _offset: THREE.Vector3;
  private _lookTarget: THREE.Vector3;
  private _desired: THREE.Vector3;
  private _forward: THREE.Vector3;
  private _initialized: boolean;

  // Intro state: weight 1 = full wide shot, 0 = normal follow
  private _introWeight = 0;
  private _introHold = false;
  private _introTime = 0;
  private _introDuration = 0;
  private _introPlaying = false;
  private _snap = false;

  // Motion state (scalars only, no per-frame allocation)
  private _hasPrev = false;
  private _prevX = 0;
  private _prevZ = 0;
  private _prevHeading = 0;
  private _speed = 0;
  private _fovExtra = 0;
  private _roll = 0;

  constructor(sizes: Sizes, scene: THREE.Scene) {
    this.instance = new THREE.PerspectiveCamera(
      BASE_FOV,
      sizes.width / sizes.height,
      0.5,
      200
    );
    this._offset = new THREE.Vector3(0, BASE_OFFSET_Y, BASE_OFFSET_Z);
    this._lookTarget = new THREE.Vector3();
    this._desired = new THREE.Vector3();
    this._forward = new THREE.Vector3();
    this._initialized = false;

    this.instance.position.set(0, BASE_OFFSET_Y, BASE_OFFSET_Z);
    this.instance.lookAt(0, 0, 0);
    scene.add(this.instance);
  }

  /** 1 while the wide intro shot is held/playing, easing to 0 when it lands on the normal view. */
  get introWeight(): number {
    return this._introWeight;
  }

  resize(sizes: Sizes): void {
    this.instance.aspect = sizes.width / sizes.height;
    this.instance.updateProjectionMatrix();
  }

  /** Holds the wide intro framing (behind the loading screen) until `playIntro` is called. */
  holdIntro(): void {
    this._introHold = true;
    this._introPlaying = false;
    this._introWeight = 1;
    this._snap = true;
  }

  /** Flies from the wide shot down to the normal framing; the player may move meanwhile. */
  playIntro(durationSeconds: number): void {
    if (durationSeconds <= 0) {
      this._introHold = false;
      this._introPlaying = false;
      this._introWeight = 0;
      return;
    }
    this._introHold = false;
    this._introPlaying = true;
    this._introTime = 0;
    this._introDuration = durationSeconds;
    this._introWeight = 1;
  }

  /**
   * Frame-rate independent follow with exponential damping.
   * @param targetPosition robot position
   * @param targetQuaternion robot orientation (local +Z is its facing direction); optional
   * @param deltaSeconds elapsed time since the previous frame
   */
  update(
    targetPosition: THREE.Vector3,
    targetQuaternion?: THREE.Quaternion,
    deltaSeconds = 1 / 60,
  ): void {
    const dt = Math.min(Math.max(deltaSeconds, 0), MAX_DT);

    // Look-ahead point along the robot's facing direction (horizontal plane)
    this._forward.set(0, 0, 1);
    if (targetQuaternion) this._forward.applyQuaternion(targetQuaternion);
    this._forward.y = 0;
    if (this._forward.lengthSq() > 1e-6) this._forward.normalize();
    else this._forward.set(0, 0, -1);

    this._updateMotion(targetPosition, dt);
    this._updateIntro(dt);

    this._desired.set(
      targetPosition.x + this._forward.x * LOOK_AHEAD,
      targetPosition.y + LOOK_HEIGHT,
      targetPosition.z + this._forward.z * LOOK_AHEAD,
    );

    if (!this._initialized) {
      this._lookTarget.copy(this._desired);
      this._initialized = true;
    } else {
      this._lookTarget.lerp(this._desired, 1 - Math.exp(-LOOK_DAMPING * dt));
    }

    const w = this._introWeight;
    this._desired
      .copy(targetPosition)
      .add(this._offset);
    this._desired.x += INTRO_OFFSET_X * w;
    this._desired.y += INTRO_OFFSET_Y * w;
    this._desired.z += INTRO_OFFSET_Z * w;

    if (this._snap) {
      this.instance.position.copy(this._desired);
      this._snap = false;
    } else {
      this.instance.position.lerp(this._desired, 1 - Math.exp(-POSITION_DAMPING * dt));
    }

    this.instance.lookAt(this._lookTarget);
    // Roll is applied after lookAt (which rebuilds the orientation every frame, so it never accumulates)
    if (Math.abs(this._roll) > 1e-5) this.instance.rotateZ(this._roll);

    const fov = BASE_FOV + INTRO_FOV_EXTRA * w + this._fovExtra;
    if (Math.abs(fov - this.instance.fov) > 1e-3) {
      this.instance.fov = fov;
      this.instance.updateProjectionMatrix();
    }
  }

  private _updateIntro(dt: number): void {
    if (this._introHold) {
      this._introWeight = 1;
      return;
    }
    if (!this._introPlaying) return;
    this._introTime += dt;
    const p = Math.min(this._introTime / this._introDuration, 1);
    this._introWeight = 1 - easeInOutCubic(p);
    if (p >= 1) {
      this._introPlaying = false;
      this._introWeight = 0;
    }
  }

  /** Derives horizontal speed and yaw rate from consecutive poses; drives FOV widening and roll. */
  private _updateMotion(pos: THREE.Vector3, dt: number): void {
    const heading = Math.atan2(this._forward.x, this._forward.z);
    let rawSpeed = 0;
    let yawRate = 0;

    if (this._hasPrev && dt > 1e-5) {
      const dx = pos.x - this._prevX;
      const dz = pos.z - this._prevZ;
      const dist = Math.sqrt(dx * dx + dz * dz);
      if (dist < TELEPORT_DISTANCE) {
        rawSpeed = dist / dt;
        let dh = heading - this._prevHeading;
        if (dh > Math.PI) dh -= Math.PI * 2;
        else if (dh < -Math.PI) dh += Math.PI * 2;
        yawRate = dh / dt;
      }
    }
    this._hasPrev = true;
    this._prevX = pos.x;
    this._prevZ = pos.z;
    this._prevHeading = heading;

    this._speed += (rawSpeed - this._speed) * (1 - Math.exp(-SPEED_SMOOTHING * dt));
    const speedFactor = Math.min(this._speed / MAX_SPEED, 1);

    const fovTarget = FOV_MAX_EXTRA * speedFactor;
    this._fovExtra += (fovTarget - this._fovExtra) * (1 - Math.exp(-FOV_DAMPING * dt));

    // Lean into the turn; fades out when nearly stopped so jitter does not tilt the view
    const turnFade = Math.min(this._speed / 2, 1);
    let rollTarget = -yawRate * ROLL_PER_YAW_RATE * turnFade;
    rollTarget = Math.max(-ROLL_MAX, Math.min(ROLL_MAX, rollTarget));
    this._roll += (rollTarget - this._roll) * (1 - Math.exp(-ROLL_DAMPING * dt));
  }
}
