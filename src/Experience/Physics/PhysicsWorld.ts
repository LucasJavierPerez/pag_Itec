import * as CANNON from 'cannon-es';

export class PhysicsWorld {
  world: CANNON.World;

  constructor() {
    this.world = new CANNON.World();
    this.world.gravity.set(0, -9.82, 0);
    this.world.broadphase = new CANNON.NaiveBroadphase();
    this.world.allowSleep = true;

    this.createGround();
  }

  private createGround(): void {
    const groundBody = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Plane(),
    });
    groundBody.quaternion.setFromEuler(-Math.PI / 2, 0, 0);
    this.world.addBody(groundBody);
  }

  addStaticBox(
    position: [number, number, number],
    size: [number, number, number],
  ): CANNON.Body {
    const halfExtents = new CANNON.Vec3(
      size[0] / 2,
      size[1] / 2,
      size[2] / 2,
    );
    const body = new CANNON.Body({
      type: CANNON.Body.STATIC,
      shape: new CANNON.Box(halfExtents),
    });
    body.position.set(position[0], position[1], position[2]);
    this.world.addBody(body);
    return body;
  }

  step(delta: number): void {
    this.world.step(1 / 60, delta, 3);
  }
}
