# Merucav Shader Integration & Localization Guide

- generate the exact integration snippets for the app and provide them to human, or  
- edit the repo files directly if possible to access the complete files present in the repo.

The guide uses **swirl** as the example new shader name, but the pattern applies to any new shader.

> **Absolute constraint:** Only **three** files must be modified for shader integration:
> 1. `components/gradient/gradient-canvas.tsx`  
> 2. `components/gradient/gradient-properties-editor.tsx`  
> 3. `lib/i18n.ts`  
>
> The AI must not change any other files unless the human explicitly asks for attribution or license updates.

---

## 1. Localization dictionary structure and language codes

All localization strings live in **one TypeScript file**, `lib/i18n.ts`, and share a single `dictionaries` object.

The file declares the dictionaries like this:

```ts
export const dictionaries = {
  en: {
    // English (United States)
  },
  he: {
    // Hebrew
  },
  it: {
    // Italian
  },
  es: {
    // Latin American Spanish (code must remain plain `es`)
  },
  pt: {
    // Brazilian Portuguese
  },
  yue: {
    // Cantonese (Hong Kong market, traditional script)
  },
  ja: {
    // Japanese
  },
  ko: {
    // Korean
  },
  vi: {
    // Vietnamese
  },
  hi: {
    // Hindi
  },
  pl: {
    // Polish
  },
  cs: {
    // Czech
  },
  hu: {
    // Hungarian
  },
  fr: {
    // French
  },
  de: {
    // German (Hochdeutsch)
  },
  nl: {
    // Dutch
  },
};
```

The exported type for translations depends on the English dictionary:

```ts
export type Dictionary = typeof dictionaries.en;
```

**Rules for the AI:**

- The keys in `dictionaries` (`en`, `he`, `it`, `es`, `pt`, `yue`, `ja`, `ko`, `vi`, `hi`, `pl`, `cs`, `hu`, `fr`, `de`, `nl`) are **fixed** and must be preserved exactly.  
- Do **not** change language codes or add regional variants (for example, Latin American Spanish must stay `es`, not `es-419`, `es-la`, etc.).  
- All localizations are in this one file; the AI must not create new i18n files.  
- The AI must treat `dictionaries.en` as the source of truth for translation keys and types; other languages should mirror its structure. If file access is provided, the AI only needs to add new keys to the English file and then translate them into the other languages as accurately as possible.

### 1.1 What the AI must ask the user to provide

Before adding any translation keys, the AI must explicitly instruct the user:

- “Please paste your current `en: { ... }` block from `lib/i18n.ts` (or the entire `dictionaries` object) inside a fenced code block so I can see all existing translation keys.”

The AI must **not** require the whole file; the `en` section is sufficient. If the user provides the entire `dictionaries` object, the AI may use it but must still only add new keys under `en`.

After the user provides the `en` block, the AI must:

- read the existing keys in `dictionaries.en`,  
- avoid adding duplicates, and  
- add only the new keys needed by the shader’s UI.

---

## 2. Files that must be changed

To integrate a new shader (for example, `swirl`), the AI must only modify:

1. `components/gradient/gradient-canvas.tsx`  
2. `components/gradient/gradient-properties-editor.tsx`  
3. `lib/i18n.ts`  

The AI must assume the app already has patterns for shaders (for example, `flow`, `tranquiluxe`) and must:

- follow those patterns,  
- reuse shared utilities (`ShaderWrapper`, `hexToRgbaVec`, sliders, color pickers), and  
- not introduce new architectural patterns.

Attribution or licensing changes (for example, `components/credits.tsx`, `README.md`, `Third-Party Licenses/…`) are **outside the scope** of this document and must only be done if the user explicitly requests them.

---

## 3. Integration rules for a new shader

When integrating any new shader, the AI must follow these rules:

- Treat the shader name as configurable (for example, `swirl`, `myNewShader`), but use `swirl` as the example in this guide.  
- Preserve existing shader configuration and rendering patterns (same structure as `flow` and `tranquiluxe`).  
- Every shader config must include the shared fields `enabled`, `opacity`, and `transform`.  
- Reuse existing translation keys where possible (for example, `speed`, `hue`, `saturation`).  
- Add only missing translation entries in `dictionaries.en` (and other translations if file the complete file can be accessed) in `lib/i18n.ts`.  
- Do not duplicate keys that already exist.  
- Keep all changes in the three files listed above.

---

## 4. `components/gradient/gradient-canvas.tsx`

The AI must modify this file to:

1. Extend `GradientConfig` with the new shader config type.  
2. Add default config values in `getDefaultGradientConfig()`.  
3. Add the fragment shader source string.  
4. Add a React renderer component.  
5. Register the shader inside `GradientCanvas` using `ShaderWrapper`.

### 4.1 Extend `GradientConfig` with the shader type

The `ShaderSetting` is already present in the app and must not be altered

```ts
export interface ShaderSetting {
    enabled: boolean;
    opacity: number;
    transform: ShaderTransform;
    [key: string]: any;
}
```

The AI must add a new entry under `shaders` for the shader, including all parameters. Example for `swirl`:

```ts
export interface GradientConfig {
  paused: boolean;
  motion: number;
  shaders: {
    flow: ShaderSetting & {
      velocity: number;
      detail: number;
      twist: number;
      speed: number;
      contrast: number;
      rgbR: number;
      rgbG: number;
      rgbB: number;
      colorOffset: number;
      hue: number;
      saturation: number;
    };
    tranquiluxe: ShaderSetting & {
      hue: number;
      saturation: number;
      speed: number;
    };
    swirl: ShaderSetting & {
      hue: number;
      saturation: number;
      speed: number;
      colorBack: string;
      colors: string[];
      colorCount: number;
      bandCount: number;
      twist: number;
      center: number;
      proportion: number;
      softness: number;
      noise: number;
      noiseFrequency: number;
    };
  };
}
```

For a different shader name, the AI must replace `swirl` with that name and update the parameter list to match the shader’s needs.

### 4.2 Add default config values in `getDefaultGradientConfig`

The AI must define sensible defaults for the new shader under `shaders.<shaderName>`. Example for `swirl`:

The `enabled`, `opacity`, and `transform` properties from `ShaderSetting` msut be accounted for in `export function getDefaultGradientConfig(): GradientConfig`

```ts
export function getDefaultGradientConfig(): GradientConfig {
  const defaultTransform = {
    translateX: 0,
    translateY: 0,
    rotation: 0,
    scale: 1,
  };

  return {
    paused: false,
    motion: 0,
    shaders: {
      flow: {
        enabled: true,
        opacity: 1,
        transform: { ...defaultTransform },
        velocity: 0.2,
        detail: 200.0,
        twist: 50.0,
        speed: 2.5,
        contrast: 1.0,
        rgbR: 1.0,
        rgbG: 1.0,
        rgbB: 1.0,
        colorOffset: 0.0,
        hue: 0,
        saturation: 1.0,
      },
      tranquiluxe: {
        enabled: false,
        opacity: 1,
        transform: { ...defaultTransform },
        hue: 200,
        saturation: 62.75,
        speed: 0.25,
      },
      swirl: {
        enabled: false,
        opacity: 1,
        transform: { ...defaultTransform },
        hue: 0,
        saturation: 1,
        speed: 1.0,
        colorBack: "#000000",
        colors: [
          "#5100ff",
          "#00ff80",
          "#ffcc00",
          "#ea00ff",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
          "#000000",
        ],
        colorCount: 4,
        bandCount: 4.0,
        twist: 0.5,
        center: 0.0,
        proportion: 0.5,
        softness: 0.5,
        noise: 0.2,
        noiseFrequency: 0.4,
      },
    },
  };
}
```

The AI may adjust numeric defaults to match the shader’s intended look, but the structure must stay consistent.

### 4.3 Add the fragment shader GLSL source

The const hueSatHelpers = `
vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}
`;

Is already present in the app and must not be modifed, the shader can use it but it doesn't have to.

The AI must ensure that the shader would be rendered, if that would require the definition and usage of the vertex shader, the AI must do so.

The AI must add a fragment shader string for the new shader. Example for `swirl`:

```ts
const flowVertShader = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const flowFragShader = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uVelocity;
uniform float uDetail;
uniform float uTwist;
uniform float uSpeed;
uniform float uContrast;
uniform float uRgbMultiplierR;
uniform float uRgbMultiplierG;
uniform float uRgbMultiplierB;
uniform float uColorOffset;
uniform float uHue;
uniform float uSaturation;

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));

    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

float f(in vec2 p) {
    return sin(p.x + sin(p.y + uTime * uVelocity)) * sin(p.y * p.x * 0.1 + uTime * uVelocity);
}

void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
    float uScale = 5.0;
    p *= uScale;

    vec2 ep = vec2(0.05, 0.0);
    vec2 rz = vec2(0.0);

    for (int i = 0; i < 20; i++) {
        float t0 = f(p);
        float t1 = f(p + ep.xy);
        float t2 = f(p + ep.yx);
        vec2 g = vec2((t1 - t0), (t2 - t0)) / ep.xx;
        vec2 t = vec2(-g.y, g.x);

        p += (uTwist * 0.01) * t + g * (1.0 / uDetail);
        p.x += sin(uTime * uSpeed / 10.0) / 10.0;
        p.y += cos(uTime * uSpeed / 10.0) / 10.0;
        rz = g;
    }
    
    vec3 colorVec = vec3(rz * 0.5 + 0.5, 1.5);

    colorVec.r *= uRgbMultiplierR;
    colorVec.g *= uRgbMultiplierG;
    colorVec.b *= uRgbMultiplierB;
    
    colorVec += uColorOffset;
    
    colorVec = (colorVec - 0.5) * uContrast + 0.5;

    vec3 hsv = rgb2hsv(colorVec);
    hsv.x += uHue / 360.0;
    hsv.y *= uSaturation;
    colorVec = hsv2rgb(hsv);

    gl_FragColor = vec4(colorVec, 1.0);
}
`;

const tranquiluxeVert = `#version 300 es
precision highp float;
in vec2 position;
out vec2 vUv;
void main() {
    vUv = position * 0.5 + 0.5;
    gl_Position = vec4(position, 0.0, 1.0);
}`;

const tranquiluxeFrag = `#version 300 es
precision highp float;
uniform float uTime;
uniform float uSpeed;
uniform vec3 uColor;
uniform vec2 uResolution;
in vec2 vUv;
out vec4 fragColor;
float colormap_red(float x) { if (x < 0.0) { return 54.0 / 255.0; } else if (x < 20049.0 / 82979.0) { return (829.79 * x + 54.51) / 255.0; } else { return 1.0; } }
float colormap_green(float x) { if (x < 20049.0 / 82979.0) { return 0.0; } else if (x < 327013.0 / 810990.0) { return (8546482679670.0 / 10875673217.0 * x - 2064961390770.0 / 10875673217.0) / 255.0; } else if (x <= 1.0) { return (103806720.0 / 483977.0 * x + 19607415.0 / 483977.0) / 255.0; } else { return 1.0; } }
float colormap_blue(float x) { if (x < 0.0) { return 54.0 / 255.0; } else if (x < 7249.0 / 82979.0) { return (829.79 * x + 54.51) / 255.0; } else if (x < 20049.0 / 82979.0) { return 127.0 / 255.0; } else if (x < 327013.0 / 810990.0) { return (792.0224934136139 * x - 64.36479073560233) / 255.0; } else { return 1.0; } }
vec4 colormap(float x) { return vec4(colormap_red(x), colormap_green(x), colormap_blue(x), 1.0); }
float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
float noise(vec2 p){ vec2 ip = floor(p); vec2 u = fract(p); u = u*u*(3.0-2.0*u); float res = mix( mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x), mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x),u.y); return res*res; }
const mat2 mtx = mat2(0.80, 0.60, -0.60, 0.80);
float fbm(vec2 p) { float f = 0.0; float time = uTime * uSpeed; f += 0.500000*noise(p + time); p = mtx*p*2.02; f += 0.031250*noise(p); p = mtx*p*2.01; f += 0.250000*noise(p); p = mtx*p*2.03; f += 0.125000*noise(p); p = mtx*p*2.01; f += 0.062500*noise(p); p = mtx*p*2.04; f += 0.015625*noise(p + sin(time)); return f/0.96875; }
float pattern(vec2 p) { return fbm(p + fbm(p + fbm(p))); }
void main() { vec2 uv = vUv.xy * uResolution.xy / uResolution.x; float shade = pattern(uv); fragColor = vec4(colormap(shade).rgb * uColor, shade); }`;


const swirlFragShader = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform vec4 uColorBack;
uniform vec4 uColors[10];
uniform float uColorCount;
uniform float uBandCount;
uniform float uTwist;
uniform float uCenter;
uniform float uProportion;
uniform float uSoftness;
uniform float uNoise;
uniform float uNoiseFrequency;
uniform float uHue;
uniform float uSaturation;

out vec4 fragColor;

const float TWO_PI = 6.28318530718;

vec3 rgb2hsv(vec3 c) {
    vec4 K = vec4(0.0, -1.0 / 3.0, 2.0 / 3.0, -1.0);
    vec4 p = mix(vec4(c.bg, K.wz), vec4(c.gb, K.xy), step(c.b, c.g));
    vec4 q = mix(vec4(p.xyw, c.r), vec4(c.r, p.yzx), step(p.x, c.r));
    float d = q.x - min(q.w, q.y);
    float e = 1.0e-10;
    return vec3(abs(q.z + (q.w - q.y) / (6.0 * d + e)), d / (q.x + e), q.x);
}

vec3 hsv2rgb(vec3 c) {
    vec4 K = vec4(1.0, 2.0 / 3.0, 1.0 / 3.0, 3.0);
    vec3 p = abs(fract(c.xxx + K.xyz) * 6.0 - K.www);
    return c.z * mix(K.xxx, clamp(p - K.xxx, 0.0, 1.0), c.y);
}

vec3 permute(vec3 x) { return mod(((x*34.0)+1.0)*x, 289.0); }

float snoise(vec2 v){
    const vec4 C = vec4(0.211324865405187, 0.366025403784439,
            -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy) );
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1;
    i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute( permute( i.y + vec3(0.0, i1.y, 1.0 ))
    + i.x + vec3(0.0, i1.x, 1.0 ));
    vec3 m = max(0.5 - vec3(dot(x0,x0), dot(x12.xy,x12.xy),
        dot(x12.zw,x12.zw)), 0.0);
    m = m*m ;
    m = m*m ;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * ( a0*a0 + h*h );
    vec3 g;
    g.x  = a0.x * x0.x  + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    vec2 shape_uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y;

    float l = length(shape_uv);
    l = max(1e-4, l);

    float t = uTime * uSpeed;

    float angle = ceil(uBandCount) * atan(shape_uv.y, shape_uv.x) + t;
    float angle_norm = angle / TWO_PI;

    float twist = 3.0 * clamp(uTwist, 0.0, 1.0);
    float offset = pow(l, -twist) + angle_norm;

    float shape = fract(offset);
    shape = 1.0 - abs(2.0 * shape - 1.0);
    shape += uNoise * snoise(15.0 * pow(uNoiseFrequency, 2.0) * shape_uv);

    float mid = smoothstep(0.2, 0.2 + 0.8 * uCenter, pow(l, twist));
    shape = mix(0.0, shape, mid);

    float proportion = clamp(uProportion, 0.0, 1.0);
    float exponent = mix(0.25, 1.0, proportion * 2.0);
    exponent = mix(exponent, 10.0, max(0.0, proportion * 2.0 - 1.0));
    shape = pow(shape, exponent);

    float mixer = shape * uColorCount;
    vec4 gradient = uColors[0];
    gradient.rgb *= gradient.a;

    float outerShape = 0.0;
    for (int i = 1; i < 11; i++) {
        if (float(i) > uColorCount) break;

        float m = clamp(mixer - float(i - 1), 0.0, 1.0);
        float aa = fwidth(m);
        m = smoothstep(0.5 - 0.5 * uSoftness - aa, 0.5 + 0.5 * uSoftness + aa, m);

        if (i == 1) {
            outerShape = m;
        }

        vec4 c = uColors[i - 1];
        c.rgb *= c.a;
        gradient = mix(gradient, c, m);
    }

    float midAA = 0.1 * fwidth(pow(l, -twist));
    float outerMid = smoothstep(0.2, 0.2 + midAA, pow(l, twist));
    outerShape = mix(0.0, outerShape, outerMid);

    vec3 baseColor = gradient.rgb * outerShape;
    float opacity = gradient.a * outerShape;

    vec3 bgColor = uColorBack.rgb * uColorBack.a;
    baseColor = baseColor + bgColor * (1.0 - opacity);
    opacity = opacity + uColorBack.a * (1.0 - opacity);

    vec3 hsv = rgb2hsv(baseColor);
    hsv.x += uHue / 360.0;
    hsv.y *= uSaturation;
    baseColor = hsv2rgb(hsv);

    fragColor = vec4(baseColor, opacity);
}
`;
```

The AI must ensure:

- uniform names match those used in the React renderer,  
- array uniforms (like `uColors[10]`) use the same size in GLSL and in the WebGL uniform uploads,  
- it uses `uTime` and `uResolution` consistently with other shaders.

### 4.4 Add the React renderer component

The AI must add a renderer that creates a WebGL2 context, compiles the shader, sets uniforms, and draws a full-screen quad. Example for `swirl`:

```tsx
function FlowShader({ config, globalConfig }: { config: GradientConfig['shaders']['flow'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const configString = useMemo(() => JSON.stringify(config), [config]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        const gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true }) || canvas.getContext('webgl', { preserveDrawingBuffer: true });
        if (!gl) {
            console.error("WebGL not supported for Flow Shader");
            return;
        }

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, flowVertShader);
        gl.compileShader(vertexShader);

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, flowFragShader);
        gl.compileShader(fragmentShader);

        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Flow Fragment shader compile error:', gl.getShaderInfoLog(fragmentShader));
            return;
        }

        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        const positions = [-1, -1, 1, -1, -1, 1, 1, 1];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(positions), gl.STATIC_DRAW);

        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        const uTimeLocation = gl.getUniformLocation(program, 'uTime');
        const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
        const uVelocityLocation = gl.getUniformLocation(program, 'uVelocity');
        const uDetailLocation = gl.getUniformLocation(program, 'uDetail');
        const uTwistLocation = gl.getUniformLocation(program, 'uTwist');
        const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
        const uContrastLocation = gl.getUniformLocation(program, 'uContrast');
        const uRgbRLocation = gl.getUniformLocation(program, 'uRgbMultiplierR');
        const uRgbGLocation = gl.getUniformLocation(program, 'uRgbMultiplierG');
        const uRgbBLocation = gl.getUniformLocation(program, 'uRgbMultiplierB');
        const uColorOffsetLocation = gl.getUniformLocation(program, 'uColorOffset');
        const uHue = gl.getUniformLocation(program, 'uHue');
        const uSaturation = gl.getUniformLocation(program, 'uSaturation');

        let animationFrameId: number;
        let startTime = Date.now();

        const render = (time: number) => {
            if(!gl) return;
            rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform1f(uTimeLocation, time);
            gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uVelocityLocation, config.velocity);
            gl.uniform1f(uDetailLocation, config.detail);
            gl.uniform1f(uTwistLocation, config.twist);
            gl.uniform1f(uSpeedLocation, config.speed);
            gl.uniform1f(uContrastLocation, config.contrast);
            gl.uniform1f(uRgbRLocation, config.rgbR);
            gl.uniform1f(uRgbGLocation, config.rgbG);
            gl.uniform1f(uRgbBLocation, config.rgbB);
            gl.uniform1f(uColorOffsetLocation, config.colorOffset);
            gl.uniform1f(uHue, config.hue);
            gl.uniform1f(uSaturation, config.saturation);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        
        const renderLoop = () => {
            const time = globalConfig.paused ? globalConfig.motion / 100 * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) {
                animationFrameId = requestAnimationFrame(renderLoop);
            } else {
                 render(time);
            }
        }
        
        renderLoop();

        return () => {
            if(animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [configString, globalConfig.paused, globalConfig.motion]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

function TranquiluxeShader({ config, globalConfig }: { config: GradientConfig['shaders']['tranquiluxe'], globalConfig: GradientConfig }) {
  const ctnDom = useRef<HTMLDivElement>(null);
  const configString = useMemo(() => JSON.stringify(config), [config]);

  useEffect(() => {
    if (!ctnDom.current) return;
    const ctn = ctnDom.current;
    const canvas = document.createElement("canvas");
    ctn.appendChild(canvas);
    const gl = canvas.getContext("webgl2");
    if (!gl) return;

    class Triangle {
        gl: WebGL2RenderingContext; vao: WebGLVertexArrayObject | null = null;
        constructor(gl: WebGL2RenderingContext) { this.gl = gl; const verts = new Float32Array([-1, -1, 3, -1, -1, 3]); this.vao = gl.createVertexArray(); gl.bindVertexArray(this.vao); const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW); const loc = 0; gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0); gl.bindVertexArray(null); }
        draw() { if(!this.vao) return; this.gl.bindVertexArray(this.vao); this.gl.drawArrays(this.gl.TRIANGLES, 0, 3); this.gl.bindVertexArray(null); }
    }
    function createShader(gl: WebGL2RenderingContext, type: number, source: string) { const shader = gl.createShader(type); if (!shader) throw new Error("Could not create shader"); gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { throw new Error(gl.getShaderInfoLog(shader) || "Shader compile error"); } return shader; }
    function createProgram(gl: WebGL2RenderingContext, vertSrc: string, fragSrc: string) { const program = gl.createProgram(); if (!program) throw new Error("Could not create program"); const vertShader = createShader(gl, gl.VERTEX_SHADER, vertSrc); const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragSrc); gl.attachShader(program, vertShader); gl.attachShader(program, fragShader); gl.bindAttribLocation(program, 0, "position"); gl.linkProgram(program); if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { throw new Error(gl.getProgramInfoLog(program) || "Program link error"); } return program; }
    
    function resize() {
      if (!ctnDom.current || !gl) return;
      canvas.width = ctnDom.current.offsetWidth;
      canvas.height = ctnDom.current.offsetHeight;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener("resize", resize);
    resize();

    const triangle = new Triangle(gl);
    const program = createProgram(gl, tranquiluxeVert, tranquiluxeFrag);
    gl.useProgram(program);
    const uTimeLoc = gl.getUniformLocation(program, "uTime");
    const uSpeedLoc = gl.getUniformLocation(program, "uSpeed");
    const uColorLoc = gl.getUniformLocation(program, "uColor");
    const uResolutionLoc = gl.getUniformLocation(program, "uResolution");
    
    let running = true;
    let startTime = Date.now();
    let animFrameId: number;

    function render() {
      if (!running || !gl) return;
      
      const time = globalConfig.paused ? globalConfig.motion / 100 * 10 : (Date.now() - startTime) * 0.001;
      const { r, g, b } = hslToRgb(config.hue, config.saturation, 50);
      const colorVec: [number, number, number] = [r/255, g/255, b/255];

      gl.clearColor(1, 1, 1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      if (uTimeLoc) gl.uniform1f(uTimeLoc, time);
      if (uSpeedLoc) gl.uniform1f(uSpeedLoc, config.speed);
      if (uColorLoc) gl.uniform3fv(uColorLoc, colorVec);
      if (uResolutionLoc) gl.uniform2f(uResolutionLoc, canvas.width, canvas.height);
      triangle.draw();
      
      if (!globalConfig.paused) {
          animFrameId = requestAnimationFrame(render);
      } else {
        if (animFrameId) cancelAnimationFrame(animFrameId);
        gl.uniform1f(uTimeLoc, time);
        triangle.draw();
      }
    }

    render();
    
    return () => {
      running = false;
      if (animFrameId) cancelAnimationFrame(animFrameId);
      window.removeEventListener("resize", resize);
      if(ctn.contains(canvas)) ctn.removeChild(canvas);
      const ext = gl.getExtension("WEBGL_lose_context");
      if (ext) ext.loseContext();
    };
  }, [configString, globalConfig.paused, globalConfig.motion]);

  return <div style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} ref={ctnDom} />;
};

export function SwirlShader({ config, globalConfig }: { config: GradientConfig['shaders']['swirl'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl2');
        if (!gl) return;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, `#version 300 es
        in vec4 a_position;
        void main() {
            gl_Position = a_position;
        }`);
        gl.compileShader(vertexShader);

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, swirlFragShader);
        gl.compileShader(fragmentShader);

        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const posAttr = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(posAttr);
        gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

        const uniforms = {
            uTime: gl.getUniformLocation(program, 'uTime'),
            uResolution: gl.getUniformLocation(program, 'uResolution'),
            uSpeed: gl.getUniformLocation(program, 'uSpeed'),
            uColorBack: gl.getUniformLocation(program, 'uColorBack'),
            uColorCount: gl.getUniformLocation(program, 'uColorCount'),
            uBandCount: gl.getUniformLocation(program, 'uBandCount'),
            uTwist: gl.getUniformLocation(program, 'uTwist'),
            uCenter: gl.getUniformLocation(program, 'uCenter'),
            uProportion: gl.getUniformLocation(program, 'uProportion'),
            uSoftness: gl.getUniformLocation(program, 'uSoftness'),
            uNoise: gl.getUniformLocation(program, 'uNoise'),
            uNoiseFrequency: gl.getUniformLocation(program, 'uNoiseFrequency'),
            uHue: gl.getUniformLocation(program, 'uHue'),
            uSaturation: gl.getUniformLocation(program, 'uSaturation'),
        };

        let startTime = Date.now();
        let animationFrameId: number;

        const render = (time: number) => {
            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uniforms.uTime, time);
            gl.uniform2f(uniforms.uResolution, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uniforms.uSpeed, config.speed);
            
            const bgRgba = hexToRgbaVec(config.colorBack);
            gl.uniform4f(uniforms.uColorBack, bgRgba[0], bgRgba[1], bgRgba[2], bgRgba[3]);
            
            gl.uniform1f(uniforms.uBandCount, config.bandCount);
            gl.uniform1f(uniforms.uTwist, config.twist);
            gl.uniform1f(uniforms.uCenter, config.center);
            gl.uniform1f(uniforms.uProportion, config.proportion);
            gl.uniform1f(uniforms.uSoftness, config.softness);
            gl.uniform1f(uniforms.uNoise, config.noise);
            gl.uniform1f(uniforms.uNoiseFrequency, config.noiseFrequency);
            gl.uniform1f(uniforms.uHue, config.hue ?? 0.0);
            gl.uniform1f(uniforms.uSaturation, config.saturation ?? 1.0);

            config.colors.forEach((color, index) => {
                if (index >= 10) return;
                const loc = gl.getUniformLocation(program, `uColors[${index}]`);
                const rgba = hexToRgbaVec(color);
                gl.uniform4f(loc, rgba[0], rgba[1], rgba[2], rgba[3]);
            });
            gl.uniform1f(uniforms.uColorCount, config.colorCount);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        const renderLoop = () => {
            const time = globalConfig.paused ? (globalConfig.motion / 100) * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();
        return () => cancelAnimationFrame(animationFrameId);
    }, [config, globalConfig.paused, globalConfig.motion]);

    return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />;
}
```

The AI must reuse existing helpers exactly as in the repo and must not introduce new dependencies.

### 4.5 Register the shader in `GradientCanvas`

The AI must register the shader to render when its `enabled` flag is true, using the same pattern as existing shaders:

```tsx
export function GradientCanvas({ config }: { config: GradientConfig }) {
  const {
    shaders,
    grainAmount, grainSize, scanlines, scanlineWidth,
    overlay
  } = config;

  const shapes = config.shapes || config.orbs || [];
  const texts = config.texts || [];
  const icons = config.icons || [];
  
  const corrosionFreq = useMemo(() => {
    const shapeCorrosionMap: { [key: string]: number } = {};
    (shapes).forEach(shape => {
        shapeCorrosionMap[shape.id] = shape.corrosion / 1000;
    });
    return shapeCorrosionMap;
  }, [shapes]);

  const allElements = [
    ...shapes.map(s => ({...s, type: 'shape'})),
    ...texts.map(t => ({...t, type: 'text'})),
    ...icons.map(i => ({...i, type: 'icon'}))
  ].sort((a, b) => (a.zIndex || 0) - (b.zIndex || 0));
  
  return (
    <div 
        id="gradient-canvas-container"
        className="w-full h-full relative overflow-hidden bg-black" 
        style={{
          transform: `skewX(${overlay.skewX}deg) skewY(${overlay.skewY}deg)`
        }}
    >
      <div className="absolute inset-0 w-full h-full">
        {shaders.flow.enabled && (
            <ShaderWrapper config={shaders.flow} globalConfig={config}>
                <FlowShader config={shaders.flow} globalConfig={config} />
            </ShaderWrapper>
        )}

        {shaders.tranquiluxe.enabled && (
            <ShaderWrapper config={shaders.tranquiluxe} globalConfig={config}>
                <TranquiluxeShader config={shaders.tranquiluxe} globalConfig={config} />
            </ShaderWrapper>
        )}
        
        {shaders.swirl?.enabled && (
          <ShaderWrapper config={shaders.swirl} globalConfig={config}>
            <SwirlShader config={shaders.swirl} globalConfig={config} />
          </ShaderWrapper>
        )}
```

For a different shader name, all `swirl` references must be replaced consistently.

---

## 5. `components/gradient/gradient-properties-editor.tsx`

The AI must modify this file to:

1. Add the new shader to the destructuring of `config.shaders`.  
2. Add a UI control group for the shader using the existing control components.  
3. Ensure every label uses translation keys that exist (or will be added) in `dictionaries.en`.

### 5.1 Include the shader in destructuring

The AI must add the shader to the destructuring:

```ts
const {
  flow,
  tranquiluxe,
  swirl,
} = config.shaders;
```

For a different shader name, use that name instead of `swirl`.

### 5.2 Add control group for the shader

The AI must use `renderShaderControls` to group controls and must use `ControlSlider`, `CustomSlider`, `ColorPicker`, and `updateShaderConfig` exactly as in existing shaders. Example for `swirl`:

```tsx
return (
  <div className="space-y-4 m-6">
    <Accordion
      type="multiple"
      defaultValue={["flow"]}
      className="w-full space-y-4"
    >
      {renderShaderControls(
        "flow",
        flow,
        <>
          <ControlSlider
            label={t("velocity")}
            value={flow.velocity}
            min={0}
            max={5}
            step={0.1}
            onValueChange={(v) => updateShaderConfig("flow", "velocity", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="flow-velocity"
            value={flow.velocity}
            min={0}
            max={5}
            step={0.1}
            onValueChange={(v) => updateShaderConfig("flow", "velocity", v)}
            isRTL={isRTL}
          />
          <ControlSlider
            label={t("detail")}
            value={flow.detail}
            min={10}
            max={1000}
            step={5}
            onValueChange={(v) => updateShaderConfig("flow", "detail", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="flow-detail"
            value={flow.detail}
            min={10}
            max={1000}
            step={5}
            onValueChange={(v) => updateShaderConfig("flow", "detail", v)}
            isRTL={isRTL}
          />
          <ControlSlider
            label={t("twist")}
            value={flow.twist}
            min={0}
            max={100}
            step={1}
            onValueChange={(v) => updateShaderConfig("flow", "twist", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="flow-twist"
            value={flow.twist}
            min={0}
            max={100}
            step={1}
            onValueChange={(v) => updateShaderConfig("flow", "twist", v)}
            isRTL={isRTL}
          />
          <ControlSlider
            label={t("speed")}
            value={flow.speed}
            min={0}
            max={10}
            step={0.1}
            onValueChange={(v) => updateShaderConfig("flow", "speed", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="flow-speed"
            value={flow.speed}
            min={0}
            max={10}
            step={0.1}
            onValueChange={(v) => updateShaderConfig("flow", "speed", v)}
            isRTL={isRTL}
          />
          <ControlSlider
            label={t("contrast")}
            value={flow.contrast}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("flow", "contrast", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="flow-contrast"
            value={flow.contrast}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("flow", "contrast", v)}
            isRTL={isRTL}
          />
          <ControlSlider
            label={t("rgbR")}
            value={flow.rgbR}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("flow", "rgbR", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="flow-rgbR"
            value={flow.rgbR}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("flow", "rgbR", v)}
            isRTL={isRTL}
          />
          <ControlSlider
            label={t("rgbG")}
            value={flow.rgbG}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("flow", "rgbG", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="flow-rgbG"
            value={flow.rgbG}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("flow", "rgbG", v)}
            isRTL={isRTL}
          />
          <ControlSlider
            label={t("rgbB")}
            value={flow.rgbB}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("flow", "rgbB", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="flow-rgbB"
            value={flow.rgbB}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("flow", "rgbB", v)}
            isRTL={isRTL}
          />
          <ControlSlider
            label={t("colorOffset")}
            value={flow.colorOffset}
            min={-1}
            max={1}
            step={0.01}
            onValueChange={(v) =>
              updateShaderConfig("flow", "colorOffset", v)
            }
            isRTL={isRTL}
          />
          <CustomSlider
            id="flow-colorOffset"
            value={flow.colorOffset}
            min={-1}
            max={1}
            step={0.01}
            onValueChange={(v) =>
              updateShaderConfig("flow", "colorOffset", v)
            }
            isRTL={isRTL}
          />
          <ControlSlider
            label={t("hue")}
            value={flow.hue}
            min={0}
            max={360}
            step={1}
            onValueChange={(v) => updateShaderConfig("flow", "hue", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="flow-hue"
            value={flow.hue}
            min={0}
            max={360}
            step={1}
            onValueChange={(v) => updateShaderConfig("flow", "hue", v)}
            isRTL={isRTL}
          />
          <ControlSlider
            label={t("saturation")}
            value={flow.saturation}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("flow", "saturation", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="flow-saturation"
            value={flow.saturation}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) => updateShaderConfig("flow", "saturation", v)}
            isRTL={isRTL}
          />
        </>
      )}
      {renderShaderControls(
        "tranquiluxe",
        tranquiluxe,
        <>
          <ControlSlider
            label={t("speed")}
            value={tranquiluxe.speed}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) =>
              updateShaderConfig("tranquiluxe", "speed", v)
            }
            isRTL={isRTL}
          />
          <CustomSlider
            id="tranquiluxe-speed"
            value={tranquiluxe.speed}
            min={0}
            max={2}
            step={0.01}
            onValueChange={(v) =>
              updateShaderConfig("tranquiluxe", "speed", v)
            }
            isRTL={isRTL}
          />
          <ControlSlider
            label={t("hue")}
            value={tranquiluxe.hue}
            min={0}
            max={360}
            step={1}
            onValueChange={(v) => updateShaderConfig("tranquiluxe", "hue", v)}
            isRTL={isRTL}
          />
          <CustomSlider
            id="tranquiluxe-hue"
            value={tranquiluxe.hue}
            min={0}
            max={360}
            step={1}
            onValueChange={(v) => updateShaderConfig("tranquiluxe", "hue", v)}
            isRTL={isRTL}
          />
          <ControlSlider
            label={t("saturation")}
            value={tranquiluxe.saturation}
            min={0}
            max={100}
            step={1}
            onValueChange={(v) =>
              updateShaderConfig("tranquiluxe", "saturation", v)
            }
            isRTL={isRTL}
          />
          <CustomSlider
            id="tranquiluxe-saturation"
            value={tranquiluxe.saturation}
            min={0}
            max={100}
            step={1}
            onValueChange={(v) =>
              updateShaderConfig("tranquiluxe", "saturation", v)
            }
            isRTL={isRTL}
          />
        </>
      )}
      {renderShaderControls(
        "swirl",
        swirl,
        <>
          {/* SPEED */}
          <ControlSlider label={t("speed")} value={swirl.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "speed", v)} isRTL={isRTL} />
          <CustomSlider id="swirl-speed" value={swirl.speed} min={0} max={3} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "speed", v)} isRTL={isRTL} />

          {/* HUE */}
          <ControlSlider label={t("hue")} value={swirl.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("swirl", "hue", v)} isRTL={isRTL} />
          <CustomSlider id="swirl-hue" value={swirl.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig("swirl", "hue", v)} isRTL={isRTL} />

          {/* SATURATION */}
          <ControlSlider label={t("saturation")} value={swirl.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "saturation", v)} isRTL={isRTL} />
          <CustomSlider id="swirl-saturation" value={swirl.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "saturation", v)} isRTL={isRTL} />

          {/* BAND COUNT */}
          <ControlSlider label={t("bandCount")} value={swirl.bandCount} min={0} max={15} step={1} onValueChange={(v) => updateShaderConfig("swirl", "bandCount", v)} isRTL={isRTL} />
          <CustomSlider id="swirl-bandCount" value={swirl.bandCount} min={0} max={15} step={1} onValueChange={(v) => updateShaderConfig("swirl", "bandCount", v)} isRTL={isRTL} />

          {/* TWIST */}
          <ControlSlider label={t("twist")} value={swirl.twist} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "twist", v)} isRTL={isRTL} />
          <CustomSlider id="swirl-twist" value={swirl.twist} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "twist", v)} isRTL={isRTL} />

          {/* CENTER */}
          <ControlSlider label={t("center")} value={swirl.center} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "center", v)} isRTL={isRTL} />
          <CustomSlider id="swirl-center" value={swirl.center} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "center", v)} isRTL={isRTL} />

          {/* PROPORTION */}
          <ControlSlider label={t("proportion")} value={swirl.proportion} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "proportion", v)} isRTL={isRTL} />
          <CustomSlider id="swirl-proportion" value={swirl.proportion} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "proportion", v)} isRTL={isRTL} />

          {/* SOFTNESS */}
          <ControlSlider label={t("softness")} value={swirl.softness} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "softness", v)} isRTL={isRTL} />
          <CustomSlider id="swirl-softness" value={swirl.softness} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "softness", v)} isRTL={isRTL} />

          {/* NOISE */}
          <ControlSlider label={t("noise")} value={swirl.noise} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "noise", v)} isRTL={isRTL} />
          <CustomSlider id="swirl-noise" value={swirl.noise} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "noise", v)} isRTL={isRTL} />

          {/* NOISE FREQUENCY */}
          <ControlSlider label={t("noiseFrequency")} value={swirl.noiseFrequency} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "noiseFrequency", v)} isRTL={isRTL} />
          <CustomSlider id="swirl-noiseFrequency" value={swirl.noiseFrequency} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig("swirl", "noiseFrequency", v)} isRTL={isRTL} />

          {/* COLOR COUNT */}
          <ControlSlider label={t("colorCount")} value={swirl.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("swirl", "colorCount", v)} isRTL={isRTL} />
          <CustomSlider id="swirl-colorCount" value={swirl.colorCount} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig("swirl", "colorCount", v)} isRTL={isRTL} />

          {/* BACKGROUND COLOR PICKER */}
          <div className="flex flex-col gap-1 my-2">
            <span className="text-sm font-medium">
              {t("backgroundColor")}
            </span>
            <ColorPicker value={swirl.colorBack} onValueChange={(c) => {
              updateShaderConfig("swirl", "colorBack", hsvaToHex(c));
            }} hideAlpha hideContrastRatio />
          </div>

          {/* DYNAMIC GRADIENT PICKERS */}
          {swirl.colors.slice(0, swirl.colorCount).map((color, index) => (
            <div key={index} className="flex flex-col gap-1 my-2">
              <span className="text-sm font-medium">
                {t("color")} {index + 1}
              </span>
              <ColorPicker value={color} onValueChange={(c) => {
                const updatedColors = [...swirl.colors];
                updatedColors[index] = hsvaToHex(c);
                updateShaderConfig("swirl", "colors", updatedColors);
              }} hideAlpha hideContrastRatio />
            </div>
          ))}
        </>
      )}
```

The AI must ensure every `t("...")` key will be present in `dictionaries.en`.

---

## 6. `lib/i18n.ts` – English translation keys

The AI must only modify the **English** dictionary inside `dictionaries.en` if it doesn't have access to the `lib/i18n.ts` file. and it must modify all translations if it can access the `lib/i18n.ts` file and must:

Refer to ## 1. Localization dictionary structure and language codes

1. Read the current `en: { ... }` block provided by the user, request it if it weren't provided.  
2. Detect which keys already exist.  
3. Add only missing translation keys needed by the new shader’s controls.

### 6.1 Keys to add for the `swirl` example

For the `swirl` shader, the AI must add (if not already present):

```ts
swirl: "Swirl",
bandCount: "Band Count",
proportion: "Proportion",
noiseFrequency: "Noise Frequency",
backgroundColor: "Background Color",
```

It must also ensure the following generic keys exist (used by other shaders and by `swirl`):

```ts
center: "Center",
softness: "Softness",
noise: "Noise",
colorCount: "Color Count",
twist: "Twist",
speed: "Speed",
hue: "Hue",
saturation: "Saturation",
color: "Color",
```

The AI must:

- check if each key already exists and skip adding duplicates,  
- only add keys under `dictionaries.en` if it doesn't have access to the entire file,  
- not change or add keys to other languages unless the user explicitly asks for that.

### 6.2 Language codes and dialects

The AI must keep these language codes exactly:

- `en`: English (United States)  
- `he`: Hebrew  
- `it`: Italian  
- `es`: Latin American Spanish (code `es`)  
- `pt`: Brazilian Portuguese  
- `yue`: Cantonese (Hong Kong market, traditional script)  
- `ja`: Japanese  
- `ko`: Korean  
- `vi`: Vietnamese  
- `hi`: Hindi  
- `pl`: Polish  
- `cs`: Czech  
- `hu`: Hungarian  
- `fr`: French  
- `de`: German (Hochdeutsch)  
- `nl`: Dutch  

The AI must not introduce or rename codes such as `es-419`, `pt-BR`, etc.

---

## 7. AI step-by-step procedure

When the AI receives:

- this guide,  
- a new shader implementation (GLSL or TS/JS), and  
- the `en: { ... }` block (or full `dictionaries` object) from `lib/i18n.ts`,

it must perform these steps:

1. **Identify the shader name** (for example, `swirl`) from the implementation or user instructions.  
2. In `components/gradient/gradient-canvas.tsx`:
   - extend `GradientConfig` with `shaders.<shaderName>`,  
   - add default config values in `getDefaultGradientConfig()` for `shaders.<shaderName>` including `enabled`, `opacity`, `transform`, and shader-specific fields,  
   - add a fragment shader source string if necessary (for example, `const swirlFragShader = \`...\`;`),  
   - add a React renderer component (for example, `SwirlShader`).  
3. In `GradientCanvas` within `gradient-canvas.tsx`, **register the shader** using `ShaderWrapper` and render it only when `config.shaders.<shaderName>.enabled` is true.  
4. In `components/gradient/gradient-properties-editor.tsx`:
   - include the new shader in the destructuring of `config.shaders`,  
   - add a `renderShaderControls` block using sliders and color pickers, wired to `updateShaderConfig`.  
5. In `lib/i18n.ts`:
   - read existing keys from `dictionaries.en`,  
   - add only missing entries for all labels used in the new controls starting with English, and continuing with other localizations if the complete `dictionaries.en` file can be accessed.  
6. Confirm that no other files were modified.

By following these rules and examples, the AI can integrate any new shader into the app safely while touching only the three required files:

- `components/gradient/gradient-canvas.tsx`  
- `components/gradient/gradient-properties-editor.tsx`  
- `lib/i18n.ts`
