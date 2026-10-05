import * as THREE from 'three';

/**
 * Last look before tone mapping/sRGB conversion (OutputPass):
 * chromatic aberration -> vignette -> film grain -> style-transition wipe.
 * Runs in linear HDR space.
 */
export const FinalLookShader = {
  name: 'FinalLookShader',
  uniforms: {
    tDiffuse: { value: null as THREE.Texture | null },
    uTime: { value: 0 },
    uAspect: { value: 1 },
    uVignetteOffset: { value: 0.55 },
    uVignetteDarkness: { value: 0.3 },
    uGrain: { value: 0.03 },
    uAberration: { value: 0.0015 },
    /** Render-target size in pixels (for pixelation). */
    uResolution: { value: new THREE.Vector2(1, 1) },
    /** Pixelation block size in render pixels; <= 1 disables it. */
    uPixelSize: { value: 1 },
    /** Posterize step in perceptual (gamma) space, e.g. 1/28; 0 disables it. */
    uPosterStep: { value: 0 },
    /** Wipe coverage 0 (none) .. 1 (full screen). */
    uTransition: { value: 0 },
    /** 0 = covering (closes toward the center), 1 = revealing (opens from the center). */
    uReveal: { value: 0 },
    uSeed: { value: 0 },
    uAccent: { value: new THREE.Color(0xffffff) },
  },
  vertexShader: /* glsl */ `
    varying vec2 vUv;
    void main() {
      vUv = uv;
      gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
    }
  `,
  fragmentShader: /* glsl */ `
    uniform sampler2D tDiffuse;
    uniform float uTime;
    uniform float uAspect;
    uniform float uVignetteOffset;
    uniform float uVignetteDarkness;
    uniform float uGrain;
    uniform float uAberration;
    uniform vec2 uResolution;
    uniform float uPixelSize;
    uniform float uPosterStep;
    uniform float uTransition;
    uniform float uReveal;
    uniform float uSeed;
    uniform vec3 uAccent;
    varying vec2 vUv;

    float hash(vec2 p) {
      p = fract(p * vec2(123.34, 456.21));
      p += dot(p, p + 45.32);
      return fract(p.x * p.y);
    }

    float vnoise(vec2 p) {
      vec2 i = floor(p);
      vec2 f = fract(p);
      f = f * f * (3.0 - 2.0 * f);
      float a = hash(i);
      float b = hash(i + vec2(1.0, 0.0));
      float c = hash(i + vec2(0.0, 1.0));
      float d = hash(i + vec2(1.0, 1.0));
      return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
    }

    float fbm(vec2 p) {
      return 0.6 * vnoise(p) + 0.3 * vnoise(p * 2.1 + 7.3) + 0.1 * vnoise(p * 4.3 + 3.1);
    }

    void main() {
      vec2 c = vUv - 0.5;
      float r2 = dot(c, c);

      // Pixelation: snap the sampling position to a coarse grid of render pixels
      vec2 suv = vUv;
      if (uPixelSize > 1.001) {
        vec2 cell = uResolution / uPixelSize;
        suv = (floor(vUv * cell) + 0.5) / cell;
      }

      // Chromatic aberration: grows with the squared distance from the center
      vec2 off = c * r2 * uAberration * 2.0;
      vec4 base = texture2D(tDiffuse, suv);
      vec3 col = vec3(
        texture2D(tDiffuse, suv + off).r,
        base.g,
        texture2D(tDiffuse, suv - off).b
      );

      // Palette reduction: quantize in gamma space so the steps look even after sRGB output
      if (uPosterStep > 0.0005) {
        vec3 g3 = pow(max(col, vec3(0.0)), vec3(1.0 / 2.2));
        g3 = floor(g3 / uPosterStep + 0.5) * uPosterStep;
        col = pow(g3, vec3(2.2));
      }

      // Vignette
      float d = length(c) * 1.4142;
      float vig = smoothstep(uVignetteOffset, uVignetteOffset + 0.65, d);
      col *= 1.0 - vig * uVignetteDarkness;

      // Film grain (multiplicative, ~24 fps)
      float frame = floor(uTime * 24.0);
      float g = hash(gl_FragCoord.xy + vec2(frame * 17.13, frame * 31.77)) - 0.5;
      col *= 1.0 + g * uGrain * 2.0;

      // Style-change wipe: noisy radial iris tinted with the target accent
      if (uTransition > 0.0) {
        vec2 q = c * vec2(uAspect, 1.0);
        float dist = length(q) / length(vec2(uAspect, 1.0) * 0.5);
        float n = fbm(vUv * vec2(uAspect, 1.0) * 5.0 + uSeed * 13.7);
        float t = dist * 0.8 + n * 0.4;          // 0 .. ~1.2
        t = mix(t, 1.2 - t, uReveal);            // reveal opens from the center
        float x = uTransition * 1.4;
        float m = smoothstep(t, t + 0.12, x);
        float rim = smoothstep(0.0, 0.5, m) * (1.0 - smoothstep(0.5, 1.0, m));
        vec3 cover = uAccent * (0.82 + 0.18 * n);
        col = mix(col, cover, m) + uAccent * rim * 0.8;
      }

      gl_FragColor = vec4(col, base.a);
    }
  `,
};
