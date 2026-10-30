/**
 * Utility to detect WebGL / WebGL2 availability and handle GPU capabilities safely.
 */
export function isWebGLAvailable(): boolean {
  if (typeof window === "undefined") return false;

  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl2") ||
      canvas.getContext("webgl") ||
      canvas.getContext("experimental-webgl");
    return Boolean(gl && gl instanceof WebGLRenderingContext || (typeof WebGL2RenderingContext !== "undefined" && gl instanceof WebGL2RenderingContext));
  } catch {
    return false;
  }
}

/**
 * Returns a clamped device pixel ratio to prevent GPU thermal throttling.
 */
export function getSafePixelRatio(maxRatio: number = 1.75): number {
  if (typeof window === "undefined") return 1;
  return Math.min(window.devicePixelRatio || 1, maxRatio);
}
