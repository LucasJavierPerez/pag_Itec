import * as THREE from 'three';

/**
 * Shared "blocks assemble" animation for the voxel style. Every patched material reads the same
 * uniform object, so a single number (`buildUniform.value`, 0 -> 1) drives the whole map.
 * At 1 (the default) the vertex shader does nothing, so finished scenes pay no visual cost.
 */
export const buildUniform = { value: 1 };

// --- Tunables -----------------------------------------------------------------------------------
/** Quantization cell (world units) of the voxel center: voxels in the same cell fall together. */
const CELL = 1.0;
/** Starting height above the final position. */
export const BUILD_DROP_HEIGHT = 26;
/** Delay mix: height (low -> high), distance from the center (center -> outside), per-voxel random. */
const DELAY_BY_HEIGHT = 0.3;
const DELAY_BY_RADIUS = 0.3;
const DELAY_BY_HASH = 0.1;
/** Heights/radii at which the delay terms reach their maximum. */
const HEIGHT_RANGE = 14;
const RADIUS_RANGE = 55;
/** Share of each voxel's own timeline spent falling (the rest is the bounce) and bounce height. */
const FALL_SHARE = 0.78;
const BOUNCE_HEIGHT = 0.45;

const GLSL_BUILD = /* glsl */ `
  uniform float uBuild;
  attribute vec3 aVoxel;
  float bHash(vec3 p) {
    p = fract(p * vec3(0.1031, 0.1030, 0.0973));
    p += dot(p, p.yxz + 33.33);
    return fract((p.x + p.y) * p.z);
  }
`;

const GLSL_BUILD_BODY = /* glsl */ `
  #include <begin_vertex>
  if (uBuild < 0.9999) {
    // Cell of the voxel this vertex belongs to (its center is baked per vertex, so a voxel never tears)
    vec3 bCell = floor(aVoxel / ${CELL.toFixed(2)});
    float bDelay = ${DELAY_BY_HEIGHT.toFixed(2)} * clamp(bCell.y / ${HEIGHT_RANGE.toFixed(1)}, 0.0, 1.0)
                 + ${DELAY_BY_RADIUS.toFixed(2)} * clamp(length(bCell.xz) / ${RADIUS_RANGE.toFixed(1)}, 0.0, 1.0)
                 + ${DELAY_BY_HASH.toFixed(2)} * bHash(bCell);
    float bT = clamp((uBuild - bDelay) / ${(1 - DELAY_BY_HEIGHT - DELAY_BY_RADIUS - DELAY_BY_HASH).toFixed(2)}, 0.0, 1.0);
    float bFall = clamp(bT / ${FALL_SHARE.toFixed(2)}, 0.0, 1.0);
    float bTb = clamp((bT - ${FALL_SHARE.toFixed(2)}) / ${(1 - FALL_SHARE).toFixed(2)}, 0.0, 1.0);
    // Gravity-like fall, then a small damped hop on landing
    transformed.y += ${BUILD_DROP_HEIGHT.toFixed(1)} * (1.0 - bFall * bFall)
                   + ${BOUNCE_HEIGHT.toFixed(2)} * sin(3.14159265 * bTb) * (1.0 - 0.5 * bTb);
  }
`;

/**
 * Patches a Lambert/Basic voxel material so its vertices follow the shared build-in animation.
 * Needs the `aVoxel` attribute baked by VoxelBuilder. Huge slabs (ground, hills) keep a static material.
 */
export function applyBuildIn<T extends THREE.Material>(material: T): T {
  material.onBeforeCompile = (shader) => {
    shader.uniforms.uBuild = buildUniform;
    shader.vertexShader = GLSL_BUILD + shader.vertexShader.replace('#include <begin_vertex>', GLSL_BUILD_BODY);
  };
  material.customProgramCacheKey = () => 'voxel-build-in';
  return material;
}
