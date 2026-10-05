import * as THREE from 'three';

/** Where the address signpost stands: right of the welcome arch as seen from the start. */
export const SIGN_POSITION = { x: 5.2, y: 0, z: 31.6 } as const;
/** Slight yaw so the board faces the follow camera (which sits at +Z and x ~ 0). */
export const SIGN_YAW = -0.25;
/** World size of the board face. */
export const SIGN_FACE = { width: 2.0, height: 1.0 } as const;

export interface AddressSignPalette {
  background: string;
  text: string;
  accent: string;
}

/**
 * Draws the board face: map pin on the left, "¿Cómo llegar?" over "ITEC Río Cuarto".
 * The canvas is fully opaque (it is the face of the board, not a floating label).
 */
export function createAddressTexture(
  palette: AddressSignPalette,
  options: { width?: number; pixelated?: boolean } = {},
): THREE.CanvasTexture {
  const width = options.width ?? 512;
  const height = width / 2;
  const u = width / 512; // scale factor relative to the 512 x 256 design
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d')!;

  ctx.fillStyle = palette.background;
  ctx.fillRect(0, 0, width, height);
  // Inner frame
  ctx.strokeStyle = palette.accent;
  ctx.lineWidth = 8 * u;
  ctx.strokeRect(14 * u, 14 * u, width - 28 * u, height - 28 * u);

  // Map pin (teardrop with a hole)
  const px = 96 * u;
  const py = 112 * u;
  const r = 38 * u;
  ctx.fillStyle = palette.accent;
  ctx.beginPath();
  ctx.arc(px, py, r, Math.PI * 0.82, Math.PI * 0.18, false);
  ctx.lineTo(px, py + r * 2.1);
  ctx.closePath();
  ctx.fill();
  ctx.fillStyle = palette.background;
  ctx.beginPath();
  ctx.arc(px, py, r * 0.38, 0, Math.PI * 2);
  ctx.fill();

  ctx.fillStyle = palette.text;
  ctx.textAlign = 'left';
  ctx.textBaseline = 'middle';
  ctx.font = `bold ${58 * u}px Arial`;
  ctx.fillText('¿Cómo llegar?', 160 * u, 100 * u, 320 * u);
  ctx.font = `${40 * u}px Arial`;
  ctx.fillText('ITEC Río Cuarto', 160 * u, 160 * u, 320 * u);

  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  texture.anisotropy = 4;
  if (options.pixelated) {
    texture.magFilter = THREE.NearestFilter;
    texture.minFilter = THREE.NearestFilter;
    texture.generateMipmaps = false;
  }
  return texture;
}
