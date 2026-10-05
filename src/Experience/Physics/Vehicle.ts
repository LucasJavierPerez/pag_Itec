import * as CANNON from 'cannon-es';

export class Vehicle {
  chassisBody: CANNON.Body;
  private yaw = Math.PI; // start facing toward classrooms (toward +Z)

  constructor(world: CANNON.World) {
    this.chassisBody = new CANNON.Body({ mass: 5 });
    this.chassisBody.addShape(new CANNON.Box(new CANNON.Vec3(0.6, 0.4, 0.8)));
    this.chassisBody.position.set(0, 1, 35);
    this.chassisBody.linearDamping = 0.5;
    this.chassisBody.angularDamping = 0.99;
    this.chassisBody.allowSleep = false;
    world.addBody(this.chassisBody);
  }

  applyMovement(forward: boolean, backward: boolean, left: boolean, right: boolean): void {
    const speed = 5;
    const turnSpeed = 2;

    // Turning
    if (left) this.yaw += turnSpeed * (1 / 60);
    if (right) this.yaw -= turnSpeed * (1 / 60);

    // Force body upright — only Y rotation
    this.chassisBody.quaternion.setFromEuler(0, this.yaw, 0);
    // Zero out non-Y angular velocity
    this.chassisBody.angularVelocity.set(0, 0, 0);

    // Forward/backward movement in facing direction
    if (forward || backward) {
      const dir = new CANNON.Vec3(0, 0, 1); // local forward
      this.chassisBody.quaternion.vmult(dir, dir);
      const force = forward ? speed : -speed * 0.6;
      this.chassisBody.velocity.x = dir.x * force;
      this.chassisBody.velocity.z = dir.z * force;
    }

    // Keep Y velocity for gravity (don't override it)
  }

  reset(): void {
    this.chassisBody.position.set(0, 1, 35);
    this.yaw = Math.PI;
    this.chassisBody.quaternion.setFromEuler(0, this.yaw, 0);
    this.chassisBody.velocity.setZero();
    this.chassisBody.angularVelocity.setZero();
  }

  getChassisPosition(): CANNON.Vec3 {
    return this.chassisBody.position;
  }

  getChassisQuaternion(): CANNON.Quaternion {
    return this.chassisBody.quaternion;
  }
}
