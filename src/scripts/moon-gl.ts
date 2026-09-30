/**
 * Renders the moon as a lit sphere in WebGL.
 *
 * No 3D library and no geometry: the whole thing is one full-quad fragment
 * shader. For each pixel inside the disc it reconstructs the sphere normal,
 * converts that to latitude/longitude, samples NASA's equirectangular LROC
 * albedo map, and lights it with a sun direction derived from the phase. That
 * gives real lunar features and a physically correct curved terminator, which
 * the CSS moon (a straight-edged clip over gradients) cannot.
 *
 * If WebGL or the texture is unavailable, nothing is enabled and the CSS moon
 * underneath stays visible.
 */

const TEXTURE_URL = '/images/moon-albedo.jpg';

const VERTEX_SHADER = `
attribute vec2 aPos;
varying vec2 vPos;
void main() {
  vPos = aPos;
  gl_Position = vec4(aPos, 0.0, 1.0);
}`;

const FRAGMENT_SHADER = `
precision highp float;
varying vec2 vPos;
uniform sampler2D uTex;
uniform float uPhase;  // illuminated fraction, 0 (new) to 1 (full)
uniform float uRot;    // libration in longitude, radians
uniform float uTilt;   // libration in latitude, radians
uniform float uAA;     // one pixel, in disc radii

const float PI = 3.14159265359;

void main() {
  float r = length(vPos);
  float alpha = 1.0 - smoothstep(1.0 - uAA, 1.0, r);
  if (alpha <= 0.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float z = sqrt(max(0.0, 1.0 - r * r));
  vec3 view = vec3(vPos.x, vPos.y, z);

  // Tilt the globe for libration in latitude, then read off lat/long.
  float ct = cos(uTilt);
  float st = sin(uTilt);
  vec3 n = vec3(view.x, ct * view.y - st * view.z, st * view.y + ct * view.z);

  float lon = atan(n.x, n.z) + uRot;
  float lat = asin(clamp(n.y, -1.0, 1.0));
  vec2 uv = vec2(fract(lon / (2.0 * PI) + 0.5), clamp(0.5 - lat / PI, 0.0, 1.0));
  vec3 albedo = texture2D(uTex, uv).rgb;

  // Sun swings from behind the moon (new) round to behind the viewer (full),
  // so a waxing moon lights from the right.
  float a = PI * (1.0 - uPhase);
  vec3 sun = vec3(sin(a), 0.0, cos(a));

  float d = dot(view, sun);
  float lit = smoothstep(-0.05, 0.12, d);
  float diffuse = max(d, 0.0);

  vec3 paper = vec3(0.941, 0.925, 0.886);
  vec3 col = albedo * paper * (0.12 + 0.98 * diffuse) * lit;
  // Earthshine, so the unlit limb reads as shadow rather than a hole.
  col += albedo * vec3(0.05, 0.055, 0.07) * (1.0 - lit);

  gl_FragColor = vec4(col, alpha);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string): WebGLShader | null {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

interface Renderer {
  /** Undefined when the moon follows scroll; a number pins it. */
  fixedPhase?: number;
  draw(progress: number): void;
}

function createRenderer(canvas: HTMLCanvasElement, image: HTMLImageElement): Renderer | null {
  const gl = canvas.getContext('webgl', {
    alpha: true,
    premultipliedAlpha: false,
    antialias: false,
  });
  if (!gl) return null;

  const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
  const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
  if (!vertex || !fragment) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertex);
  gl.attachShader(program, fragment);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
  const aPos = gl.getAttribLocation(program, 'aPos');
  gl.enableVertexAttribArray(aPos);
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

  const texture = gl.createTexture();
  gl.bindTexture(gl.TEXTURE_2D, texture);
  // The map wraps in longitude and is clamped at the poles.
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
  gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
  gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 0);
  gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
  gl.generateMipmap(gl.TEXTURE_2D);

  gl.enable(gl.BLEND);
  gl.blendFuncSeparate(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA, gl.ONE, gl.ONE_MINUS_SRC_ALPHA);

  const uPhase = gl.getUniformLocation(program, 'uPhase');
  const uRot = gl.getUniformLocation(program, 'uRot');
  const uTilt = gl.getUniformLocation(program, 'uTilt');
  const uAA = gl.getUniformLocation(program, 'uAA');

  const attr = canvas.dataset.phase;
  const fixedPhase = attr ? Number(attr) : undefined;

  let size = 0;

  return {
    fixedPhase,
    draw(progress: number) {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const next = Math.round(rect.width * dpr);
      if (next !== size) {
        size = next;
        canvas.width = size;
        canvas.height = size;
        gl.viewport(0, 0, size, size);
      }

      const phase = fixedPhase ?? progress;
      // Real libration is roughly +/-8 degrees; a little more reads clearly
      // without looking like the moon is spinning.
      gl.uniform1f(uPhase, phase);
      gl.uniform1f(uRot, (phase - 0.5) * 0.42);
      gl.uniform1f(uTilt, Math.sin(phase * Math.PI * 2) * 0.16);
      gl.uniform1f(uAA, 2 / (size / 2));

      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    },
  };
}

/**
 * Sets up every `[data-moon-gl]` canvas. Resolves to a draw function, or to
 * null when WebGL or the texture is unavailable and the CSS moon should stand.
 */
export function initMoonGL(): Promise<((progress: number) => void) | null> {
  const canvases = [...document.querySelectorAll<HTMLCanvasElement>('[data-moon-gl]')];
  if (canvases.length === 0) return Promise.resolve(null);

  return new Promise((resolve) => {
    const image = new Image();
    image.decoding = 'async';
    image.onload = () => {
      const renderers = canvases
        .map((canvas) => {
          const renderer = createRenderer(canvas, image);
          if (renderer) canvas.closest('.moon')?.classList.add('is-gl');
          return renderer;
        })
        .filter((renderer): renderer is Renderer => renderer !== null);

      if (renderers.length === 0) {
        resolve(null);
        return;
      }
      const draw = (progress: number) => {
        for (const renderer of renderers) renderer.draw(progress);
      };
      resolve(draw);
    };
    image.onerror = () => resolve(null);
    image.src = TEXTURE_URL;
  });
}
