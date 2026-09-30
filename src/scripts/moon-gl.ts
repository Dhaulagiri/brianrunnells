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
uniform float uPhase;  // illuminated fraction for a single moon, 0 to 1
uniform float uCells;  // moons across this canvas; 1 for a lone moon
uniform float uCellAspect; // cell width / canvas height, to keep discs round
uniform float uAA;     // one pixel, in disc radii

const float PI = 3.14159265359;
const float TAU = 6.28318530718;

void main() {
  // A strip canvas holds several moons side by side, each waxing a little more
  // than the last. Work out which cell this pixel is in and recentre on it.
  float cellWidth = 2.0 / uCells;
  float index = clamp(floor((vPos.x + 1.0) / cellWidth), 0.0, uCells - 1.0);
  float centre = -1.0 + cellWidth * (index + 0.5);
  vec2 pos = uCells > 1.0 ? vec2((vPos.x - centre) / (cellWidth * 0.5), vPos.y) : vPos;
  // Widen x into height units so the disc stays circular in a wide cell.
  pos.x *= uCellAspect;
  float phase = uCells > 1.0 ? index / max(uCells - 1.0, 1.0) : uPhase;

  float r = length(pos);
  float alpha = 1.0 - smoothstep(1.0 - uAA, 1.0, r);
  if (alpha <= 0.0) {
    gl_FragColor = vec4(0.0);
    return;
  }

  float z = sqrt(max(0.0, 1.0 - r * r));
  vec3 view = vec3(pos.x, pos.y, z);

  // Libration: the near side always faces us, but it nods a little over a
  // lunation. Derived from the phase so each cell in a strip differs.
  float spin = (phase - 0.5) * 0.42;
  float tilt = sin(phase * TAU) * 0.16;

  float ct = cos(tilt);
  float st = sin(tilt);
  vec3 n = vec3(view.x, ct * view.y - st * view.z, st * view.y + ct * view.z);

  float lon = atan(n.x, n.z) + spin;
  float lat = asin(clamp(n.y, -1.0, 1.0));
  vec2 uv = vec2(fract(lon / TAU + 0.5), clamp(0.5 - lat / PI, 0.0, 1.0));
  vec3 albedo = texture2D(uTex, uv).rgb;

  // Sun swings from behind the moon (new) round to behind the viewer (full),
  // so a waxing moon lights from the right.
  float a = PI * (1.0 - phase);
  vec3 sun = vec3(sin(a), 0.0, cos(a));

  float d = dot(view, sun);
  float lit = smoothstep(-0.05, 0.12, d);
  float diffuse = max(d, 0.0);

  vec3 paper = vec3(0.941, 0.925, 0.886);
  vec3 col = albedo * paper * (0.12 + 0.98 * diffuse) * lit;
  // Earthshine, so the unlit limb reads as shadow rather than a hole.
  col += albedo * vec3(0.10, 0.105, 0.125) * (1.0 - lit);
  // Faint rim so an unlit limb still describes a sphere.
  col += vec3(0.20, 0.20, 0.22) * smoothstep(0.90, 1.0, r) * (1.0 - lit);

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
  const uCells = gl.getUniformLocation(program, 'uCells');
  const uCellAspect = gl.getUniformLocation(program, 'uCellAspect');
  const uAA = gl.getUniformLocation(program, 'uAA');

  const attr = canvas.dataset.phase;
  const fixedPhase = attr ? Number(attr) : undefined;
  const cells = Math.max(1, Number(canvas.dataset.moonCells ?? 1));

  let width = 0;
  let height = 0;

  return {
    fixedPhase,
    draw(progress: number) {
      const rect = canvas.getBoundingClientRect();
      if (rect.width === 0 || rect.height === 0) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const nextWidth = Math.round(rect.width * dpr);
      const nextHeight = Math.round(rect.height * dpr);
      if (nextWidth !== width || nextHeight !== height) {
        width = nextWidth;
        height = nextHeight;
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }

      gl.uniform1f(uPhase, fixedPhase ?? progress);
      gl.uniform1f(uCells, cells);
      const cellWidth = width / cells;
      gl.uniform1f(uCellAspect, cells > 1 ? cellWidth / height : 1);
      // One pixel expressed in disc radii, for the antialiased limb.
      gl.uniform1f(uAA, 2 / (Math.min(cellWidth, height) / 2));

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
