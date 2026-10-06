import * as THREE from 'three';
import type { MapLights, MapQuality } from './types.ts';

interface SunOptions {
  ambient: { color: number; intensity: number };
  sun: { color: number; intensity: number };
  hemi?: { sky: number; ground: number; intensity: number };
  shadows: boolean;
  quality: MapQuality;
}

/** Ambient + directional (+ optional hemisphere) lighting with an optional soft shadow map. */
export function createSunLights(scene: THREE.Scene, o: SunOptions): MapLights {
  const objects: THREE.Object3D[] = [];
  const ambient = new THREE.AmbientLight(o.ambient.color, o.ambient.intensity);
  objects.push(ambient);

  if (o.hemi) {
    objects.push(new THREE.HemisphereLight(o.hemi.sky, o.hemi.ground, o.hemi.intensity));
  }

  const sun = new THREE.DirectionalLight(o.sun.color, o.sun.intensity);
  sun.position.set(-40, 70, 45);
  const useShadows = o.shadows && o.quality === 'high';
  if (useShadows) {
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    const cam = sun.shadow.camera;
    cam.left = -62;
    cam.right = 62;
    cam.top = 50;
    cam.bottom = -50;
    cam.near = 10;
    cam.far = 180;
    sun.shadow.bias = -0.0004;
    sun.shadow.normalBias = 0.04;
    sun.shadow.radius = 3;
  }
  objects.push(sun, sun.target);
  for (const obj of objects) scene.add(obj);

  return {
    update: () => {},
    dispose: () => {
      for (const obj of objects) scene.remove(obj);
      sun.shadow.map?.dispose();
    },
  };
}

const DUST_BASE: THREE.PointsMaterialParameters = {
  size: 1.1,
  sizeAttenuation: true,
  transparent: true,
  depthWrite: false,
  opacity: 0.6,
};

/** Soft round sprite material for ground dust (lit styles: normal blending). */
export function createDustPoints(texture: THREE.Texture, color: number, additive: boolean): THREE.PointsMaterial {
  return new THREE.PointsMaterial({
    ...DUST_BASE,
    map: texture,
    color,
    blending: additive ? THREE.AdditiveBlending : THREE.NormalBlending,
  });
}
