import * as THREE from 'three';

/** Disposes every texture referenced by a material, then the material itself. */
function disposeMaterial(material: THREE.Material): void {
  for (const value of Object.values(material)) {
    if (value instanceof THREE.Texture) value.dispose();
  }
  const uniforms = (material as THREE.ShaderMaterial).uniforms;
  if (uniforms) {
    for (const u of Object.values(uniforms)) {
      if ((u as { value?: unknown }).value instanceof THREE.Texture) {
        ((u as { value: THREE.Texture }).value).dispose();
      }
    }
  }
  material.dispose();
}

/**
 * Removes an object from its parent and frees all GPU resources below it:
 * geometries, materials and textures (including sprite label canvas textures).
 */
export function disposeObject(root: THREE.Object3D): void {
  root.traverse((child) => {
    const obj = child as THREE.Mesh;
    if (obj.geometry) obj.geometry.dispose();
    const mat = obj.material as THREE.Material | THREE.Material[] | undefined;
    if (mat) {
      if (Array.isArray(mat)) mat.forEach(disposeMaterial);
      else disposeMaterial(mat);
    }
  });
  root.parent?.remove(root);
}
