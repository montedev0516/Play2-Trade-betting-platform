// import { MAX_COLOR_STOPS } from "./global";
const MAX_COLOR_STOPS = 32;

const fragmentShader = `
#define MAX_STOPS ${MAX_COLOR_STOPS}
#define PI ${Math.PI}

precision highp float;

varying vec2 vTextureCoord;
uniform vec4 inputSize;
uniform vec4 outputFrame;
uniform vec4 u_stops[MAX_STOPS];
uniform float u_stop_positions[MAX_STOPS];
uniform int u_num_stops;
uniform float u_rotation;

uniform sampler2D uSampler;

vec4 linearGradient(float position) {
  vec4 result = vec4(0.0);
  for (int i = 0; i < MAX_STOPS - 1; i++) {
    if(i >= u_num_stops - 1) break;
    if (position >= u_stop_positions[i] && position <= u_stop_positions[i + 1]) {
      float t = (position - u_stop_positions[i]) / (u_stop_positions[i + 1] - u_stop_positions[i]);
      result = mix(u_stops[i], u_stops[i + 1], t);
      break;
    }
  }
  return result;
}

float degressToRadians(float degrees) {
  return degrees * PI / 180.0;
}

void main() {
  float scale = 1.0 / (sin(degressToRadians(mod(u_rotation, 90.0))) + cos(degressToRadians(mod(u_rotation, 90.0))));
  float rotationRadians = degressToRadians(u_rotation);
  vec2 uv = vTextureCoord * inputSize.xy / outputFrame.zw;
  vec2 rotated_uv = (mat2(cos(rotationRadians), -sin(rotationRadians), sin(rotationRadians), cos(rotationRadians)) * (uv - 0.5)) + 0.5 / scale;
  vec4 fg = texture2D(uSampler, vTextureCoord);
  gl_FragColor = linearGradient(rotated_uv.x * scale) * fg.a;
}`;
/**
 * @throws {Error} if there are more than MAX_COLOR_STOPS colors
 * @throws {Error} if the stops are not in ascending order
 * @throws {Error} if the stops are not the same length as colors
 */
export function linearGradient(options) {
    const { colors, stops, rotation = 0, } = options;
    if (colors.length > MAX_COLOR_STOPS) {
        throw new Error(`Maximum number of color stops is ${MAX_COLOR_STOPS}. You can change this by setting MAX_COLOR_STOPS`);
    }
    if (stops && stops.length !== colors.length) {
        throw new Error('stopPositions must be the same length as stops');
    }
    if (stops) {
        for (let i = 0; i < stops.length - 1; i++) {
            if (stops[i] > stops[i + 1]) {
                throw new Error('stopPositions must be in ascending order');
            }
        }
    }
    return {
        fragmentShader,
        uniforms: {
            u_stops: colors.flat(),
            u_stop_positions: stops || colors.map((_, i) => i / (colors.length - 1)),
            u_num_stops: colors.length,
            u_rotation: rotation,
        }
    };
}
