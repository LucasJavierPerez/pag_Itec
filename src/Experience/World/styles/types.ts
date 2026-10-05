import type * as THREE from 'three';

export type StyleId = 'original' | 'lowpoly' | 'voxel' | 'cinematic';

export interface PhysicsBodyDesc {
  position: { x: number; y: number; z: number };
  size: { x: number; y: number; z: number };
}

export interface FloorResult {
  meshGroup: THREE.Group;
  physicsBodies: PhysicsBodyDesc[];
}

export interface PhysicsWallDesc {
  position: { x: number; y: number; z: number };
  size: { x: number; y: number; z: number };
}

export interface TriggerZoneDesc {
  name: string;
  position: { x: number; y: number; z: number };
  size: { x: number; y: number; z: number };
}

export interface ClassroomsResult {
  meshGroup: THREE.Group;
  physicsWalls: PhysicsWallDesc[];
  triggerZones: TriggerZoneDesc[];
}

export interface RobotMeshResult {
  group: THREE.Group;
  getBounceOffset: (time: number) => number;
}

export interface Destroyable {
  destroy(): void;
}

/** Lights may optionally track the robot (e.g. the cinematic follow spotlight). */
export interface LightsHandle extends Destroyable {
  update?(robotPosition: THREE.Vector3): void;
  /** Follow spotlight, when the style has one (read-only access for visual effects such as light cones). */
  readonly spot?: THREE.SpotLight;
}

export type SignatureQuality = 'high' | 'low';

/** Everything a style's signature effect set may need; resolved by the World. */
export interface SignatureContext {
  scene: THREE.Scene;
  camera: THREE.PerspectiveCamera;
  renderer: THREE.WebGLRenderer;
  quality: SignatureQuality;
  /** Live robot position (the vector is owned by the World; do not keep or mutate it). */
  getRobotPosition(): THREE.Vector3;
  /** Live robot visual root (swapped on every style change, so read it each frame). */
  getRobot(): THREE.Object3D;
  /** Lights of the current style (e.g. to read the follow spot). */
  lights: LightsHandle;
  /** True while the first reveal is pending (loading screen): entry animations wait for `enter()`. */
  awaitReveal: boolean;
}

/** Style-specific visual flourishes: purely visual, no colliders. Created after the style is built. */
export interface SignatureHandle {
  update(dt: number, time: number): void;
  setQuality(quality: SignatureQuality): void;
  /** Removes everything from the scene and frees geometries, materials, textures and render targets. */
  destroy(): void;
  /** The scene became visible (end of loading / start of the reveal): start entry animations. */
  enter?(): void;
  /** Objects that must not be written into the depth-of-field depth pass (additive shafts, motes...). */
  readonly depthExclude?: readonly THREE.Object3D[];
}

/** Per-style post-processing parameters (smoothly interpolated by PostProcessing). */
export interface PostSettings {
  bloom: { strength: number; radius: number; threshold: number };
  /** `offset`: normalized distance from the center where darkening starts (0..1); `darkness`: strength at the corners. */
  vignette: { offset: number; darkness: number };
  /** Multiplicative film grain amplitude (0 = off). */
  grain: number;
  /** Radial chromatic aberration strength (0 = off). */
  aberration: number;
  /** Depth of field (BokehPass). `maxblur` 0 = off. World units: blur = clamp(|focus - depth| * aperture, maxblur). */
  dof?: { aperture: number; maxblur: number };
  /** Pixelation block size in render pixels (1 = off) and posterize levels per channel (0 = off). */
  pixel?: { size: number; levels: number };
}

export interface StyleModule {
  id: StyleId;
  label: string;
  createFloor(): FloorResult;
  createClassrooms(): ClassroomsResult;
  getClassroomPositions(): { x: number; z: number }[];
  createRobot(): RobotMeshResult;
  /** Sky, trees, arch, etc. `destroy()` removes them from the scene (disposal is done by the World). */
  createEnvironment(scene: THREE.Scene): Destroyable;
  createLights(scene: THREE.Scene, classroomPositions: { x: number; z: number }[]): LightsHandle;
  /** Optional signature effect set (god-rays, pond, build-in, mirror floor...). */
  createSignature?(ctx: SignatureContext): SignatureHandle;
  /** Ball visual centered at the origin, radius ~0.5. */
  createBallVisual(): THREE.Object3D;
  /** Goal visual placed in world coordinates (shares GOAL_X/GOAL_Z with the physics). */
  createGoalVisual(): THREE.Group;
  /** UI/transition accent color (hex), used to tint the style-change wipe. */
  accent: number;
  post: PostSettings;
  scene: { background: number; fogColor: number; fogNear: number; fogFar: number };
  renderer: {
    toneMapping: THREE.ToneMapping;
    toneMappingExposure: number;
    shadowMapType: THREE.ShadowMapType;
  };
}
