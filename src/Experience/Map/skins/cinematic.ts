import * as THREE from 'three';
import type { MapLights, MapSkin } from './types.ts';
import { createDustPoints, createSunLights } from './lighting.ts';

/**
 * Adds an `aGlow` vertex attribute (0..1) that feeds the emissive term with the vertex color,
 * so windows, lamps and grid lines glow without extra meshes or draw calls.
 */
function withGlowAttribute(material: THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  material.onBeforeCompile = (shader) => {
    shader.vertexShader = shader.vertexShader
      .replace('#include <common>', '#include <common>\nattribute float aGlow;\nvarying float vGlow;')
      .replace('#include <begin_vertex>', '#include <begin_vertex>\nvGlow = aGlow;');
    shader.fragmentShader = shader.fragmentShader
      .replace('#include <common>', '#include <common>\nvarying float vGlow;')
      .replace(
        '#include <emissivemap_fragment>',
        '#include <emissivemap_fragment>\ntotalEmissiveRadiance += diffuseColor.rgb * vGlow * 1.6;',
      );
  };
  return material;
}

/** Makes the per-instance color also drive the emissive term (glowing ring markers). */
function withInstanceGlow(material: THREE.MeshStandardMaterial): THREE.MeshStandardMaterial {
  material.onBeforeCompile = (shader) => {
    shader.fragmentShader = shader.fragmentShader.replace(
      '#include <emissivemap_fragment>',
      '#include <emissivemap_fragment>\ntotalEmissiveRadiance += diffuseColor.rgb * 1.8;',
    );
  };
  return material;
}

const ROBOT_LIGHT_OFFSET = new THREE.Vector3(0, 5.5, 1.5);

export const cinematicSkin: MapSkin = {
  id: 'cinematic',
  palette: {
    ground: 0x0b1226,
    ground2: 0x0e172e,
    sidewalk: 0x1b2742,
    road: 0x121a30,
    roadLine: 0x4fd8ff,
    plaza: 0x16213b,
    plazaRing: 0x4fd8ff,
    wall: 0x2a3858,
    wall2: 0x1f2b46,
    trim: 0x0f1830,
    roof: 0x4fd8ff,
    window: 0x7fe6ff,
    door: 0x101a30,
    trunk: 0x1b2a3a,
    leaf: 0x0f4350,
    leaf2: 0x15606b,
    lamp: 0xffd58a,
  },
  voxel: false,
  flat: false,
  outline: false,
  shadows: false,
  propDensity: 0.8,
  createLitMaterial: () =>
    withGlowAttribute(new THREE.MeshStandardMaterial({ vertexColors: true, roughness: 0.55, metalness: 0.15 })),
  createRingMaterial: () =>
    withInstanceGlow(
      new THREE.MeshStandardMaterial({
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        side: THREE.DoubleSide,
        roughness: 0.5,
      }),
    ),
  createPathMaterial: (color, dashes) =>
    new THREE.MeshStandardMaterial({
      color,
      emissive: color,
      emissiveIntensity: 1.4,
      alphaMap: dashes,
      transparent: true,
      opacity: 0.95,
      depthWrite: false,
    }),
  createLights: (scene, quality): MapLights => {
    const base = createSunLights(scene, {
      ambient: { color: 0x3a5190, intensity: 1.5 },
      hemi: { sky: 0x2a4a8c, ground: 0x0a0f20, intensity: 0.9 },
      sun: { color: 0x8fb4ff, intensity: 1.1 },
      shadows: false,
      quality,
    });
    // Warm spotlight that follows the robot (the map's version of the explorer's follow spot)
    const follow = new THREE.PointLight(0xffe2b0, 110, 26, 2);
    scene.add(follow);
    return {
      update: (robot, dt) => {
        const k = 1 - Math.exp(-6 * dt);
        follow.position.x += (robot.x + ROBOT_LIGHT_OFFSET.x - follow.position.x) * k;
        follow.position.y = ROBOT_LIGHT_OFFSET.y;
        follow.position.z += (robot.z + ROBOT_LIGHT_OFFSET.z - follow.position.z) * k;
      },
      dispose: () => {
        scene.remove(follow);
        base.dispose();
      },
    };
  },
  createDustMaterial: (texture) => createDustPoints(texture, 0x8fe3ff, true),
};
