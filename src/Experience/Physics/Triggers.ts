import * as CANNON from 'cannon-es';

export interface TriggerZoneDescription {
  name: string;
  position: { x: number; y: number; z: number } | [number, number, number];
  size: { x: number; y: number; z: number } | [number, number, number];
}

function toXYZ(v: { x: number; y: number; z: number } | [number, number, number]): [number, number, number] {
  if (Array.isArray(v)) return v;
  return [v.x, v.y, v.z];
}

interface TriggerBody {
  name: string;
  body: CANNON.Body;
}

export class Triggers {
  private triggers: TriggerBody[] = [];
  private activeZones: Set<string> = new Set();
  private chassisBody: CANNON.Body;

  constructor(
    descriptions: TriggerZoneDescription[],
    world: CANNON.World,
    chassisBody: CANNON.Body,
  ) {
    this.chassisBody = chassisBody;

    for (const desc of descriptions) {
      const pos = toXYZ(desc.position);
      const sz = toXYZ(desc.size);
      const halfExtents = new CANNON.Vec3(sz[0] / 2, sz[1] / 2, sz[2] / 2);
      const body = new CANNON.Body({
        type: CANNON.Body.STATIC,
        shape: new CANNON.Box(halfExtents),
        collisionResponse: false, // acts as sensor / trigger
      });
      body.position.set(pos[0], pos[1], pos[2]);
      world.addBody(body);

      this.triggers.push({ name: desc.name, body });
    }

    world.addEventListener('beginContact', (event: { bodyA: CANNON.Body; bodyB: CANNON.Body }) => {
      this.handleContact(event.bodyA, event.bodyB, 'enter');
    });

    world.addEventListener('endContact', (event: { bodyA: CANNON.Body; bodyB: CANNON.Body }) => {
      this.handleContact(event.bodyA, event.bodyB, 'leave');
    });
  }

  private handleContact(
    bodyA: CANNON.Body,
    bodyB: CANNON.Body,
    type: 'enter' | 'leave',
  ): void {
    const isChassis = bodyA === this.chassisBody || bodyB === this.chassisBody;
    if (!isChassis) return;

    const otherBody = bodyA === this.chassisBody ? bodyB : bodyA;
    const trigger = this.triggers.find((t) => t.body === otherBody);
    if (!trigger) return;

    if (type === 'enter') {
      if (this.activeZones.has(trigger.name)) return;
      this.activeZones.add(trigger.name);
      window.dispatchEvent(
        new CustomEvent('classroom-enter', { detail: { name: trigger.name } }),
      );
    } else {
      if (!this.activeZones.has(trigger.name)) return;
      this.activeZones.delete(trigger.name);
      window.dispatchEvent(
        new CustomEvent('classroom-leave', { detail: { name: trigger.name } }),
      );
    }
  }

  check(): void {
    // Contact events are handled by the physics world callbacks.
    // This method exists as a hook for any per-frame trigger logic if needed.
  }
}
