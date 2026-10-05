import * as THREE from 'three';

export class Lights {
  ambient: THREE.AmbientLight;
  directional: THREE.DirectionalLight;
  hemisphere: THREE.HemisphereLight;
  private interiorLights: THREE.PointLight[] = [];
  private scene: THREE.Scene;

  constructor(
    scene: THREE.Scene,
    classroomPositions?: { x: number; z: number }[],
  ) {
    this.scene = scene;
    this.ambient = new THREE.AmbientLight(0xffffff, 0.5);

    this.hemisphere = new THREE.HemisphereLight(
      0xcfe6ff,
      0x8a7a5a,
      0.35,
    );

    this.directional = new THREE.DirectionalLight(0xfff4d6, 2.2);
    this.directional.position.set(15, 25, 10);
    this.directional.target.position.set(0, 0, 0);
    this.directional.castShadow = true;
    this.directional.shadow.mapSize.set(4096, 4096);
    this.directional.shadow.camera.near = 0.5;
    this.directional.shadow.camera.far = 130;
    this.directional.shadow.camera.left = -62;
    this.directional.shadow.camera.right = 62;
    this.directional.shadow.camera.top = 62;
    this.directional.shadow.camera.bottom = -62;
    this.directional.shadow.normalBias = 0.03;

    scene.add(this.ambient);
    scene.add(this.hemisphere);
    scene.add(this.directional);
    scene.add(this.directional.target);

    if (classroomPositions) {
      for (const pos of classroomPositions) {
        const light = new THREE.PointLight(0xffaa44, 0.3, 15);
        light.position.set(pos.x, 3, pos.z);
        scene.add(light);
        this.interiorLights.push(light);
      }
    }
  }

  destroy(): void {
    this.scene.remove(this.ambient, this.hemisphere, this.directional, this.directional.target);
    this.ambient.dispose();
    this.directional.dispose();
    this.hemisphere.dispose();
    for (const light of this.interiorLights) {
      this.scene.remove(light);
      light.dispose();
    }
    this.interiorLights = [];
  }
}
