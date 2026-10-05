import * as THREE from 'three';

/** Value-noise helpers shared by the signature ShaderMaterials (prepend to a fragment shader). */
export const GLSL_NOISE = /* glsl */ `
  float sigHash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
  }
  float sigNoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = sigHash(i);
    float b = sigHash(i + vec2(1.0, 0.0));
    float c = sigHash(i + vec2(0.0, 1.0));
    float d = sigHash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }
  float sigFbm(vec2 p) {
    return 0.6 * sigNoise(p) + 0.3 * sigNoise(p * 2.1 + 7.3) + 0.1 * sigNoise(p * 4.3 + 3.1);
  }
`;

/** Soft round white dot (radial falloff) used as a point sprite map. Caller disposes it. */
export function createSoftDotTexture(size = 64): THREE.CanvasTexture {
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d')!;
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.35, 'rgba(255,255,255,0.5)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

/** Removes an object from its parent and disposes its geometry and material (textures included). */
export function disposePoints(obj: THREE.Points | THREE.Mesh): void {
  obj.parent?.remove(obj);
  obj.geometry.dispose();
  const mat = obj.material as THREE.Material & { map?: THREE.Texture | null };
  mat.map?.dispose();
  mat.dispose();
}
