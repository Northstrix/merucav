'use client';
import React, { useMemo, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { hslToRgb } from '@/lib/color-utils';

export interface OrbConfig {
  id: string;
  key: string;
  disabled: boolean;
  color: string;
  width: number;
  height: number;
  borderRadius: {
    value: number;
    unit: 'px' | '%' | 'rem';
  };
  x: number;
  y: number;
  corrosion: number;
  animation: {
    mode: 'shift' | 'rotate';
    shift: {
      extentX: number;
      extentY: number;
      duration: number;
    };
    rotation: {
      speed: number;
      direction: 'clockwise' | 'counter-clockwise';
    };
  };
  transformOrigin: { x: number; y: number; };
  overflow: number;
  pulsate: {
    enabled: boolean;
    minSize: number;
    maxSize: number;
    duration: number;
    opacity: boolean;
  };
}

export interface ShaderTransform {
    translateX: number;
    translateY: number;
    rotation: number;
    scale: number;
}

export interface ShaderSetting {
    enabled: boolean;
    opacity: number;
    transform: ShaderTransform;
    [key: string]: any;
}

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
    kaleidoscope: ShaderSetting & {
        speed: number;
        hue: number;
        saturation: number;
    };
    fate: ShaderSetting & {
        speed: number;
        hue: number;
        saturation: number;
    };
    structuredNoise: ShaderSetting & {
        speed: number;
        mirrors: number;
        noiseStrength: number;
        distortionStrength: number;
        hue: number;
        saturation: number;
        useFilter: boolean;
        filterColor: string;
    };
    balatro: ShaderSetting & {
        speed: number;
        spinRotation: number;
        spinSpeed: number;
        contrast: number;
        lighting: number;
        spinAmount: number;
        pixelFilter: number;
        spinEase: number;
        isRotate: boolean;
        color1_r: number;
        color1_g: number;
        color1_b: number;
        color2_r: number;
        color2_g: number;
        color2_b: number;
        color3_r: number;
        color3_g: number;
        color3_b: number;
    };
    electricPulse: ShaderSetting & {
        speed: number;
        hue: number;
        saturation: number;
        color1_r: number;
        color1_g: number;
        color1_b: number;
    };
    laserBlast: ShaderSetting & {
        speed: number;
        hue: number;
        saturation: number;
        power: number;
        duration: number;
        startRadius: number;
        endRadius: number;
        color1_r: number;
        color1_g: number;
        color1_b: number;
        color2_r: number;
        color2_g: number;
        color2_b: number;
    };
    novatrix: ShaderSetting & {
        speed: number;
        hue: number;
        saturation: number;
        color_r: number;
        color_g: number;
        color_b: number;
    };
    voronoi: ShaderSetting & {
        speed: number;
        scale: number;
        hue: number;
        saturation: number;
    };
  };
  grainAmount: number;
  grainSize: number;
  scanlines: number;
  scanlineWidth: number;
  orbs: OrbConfig[];
  overlay: {
    enabled: boolean;
    blur: number;
    lighten: number;
    darken: number;
    skewX: number;
    skewY: number;
  };
}


export function getDefaultGradientConfig(): GradientConfig {
  const defaultTransform = { translateX: 0, translateY: 0, rotation: 0, scale: 1 };
  const defaultHueSat = { hue: 0, saturation: 1 };
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
        kaleidoscope: {
            enabled: false,
            opacity: 1,
            transform: { ...defaultTransform },
            ...defaultHueSat,
            speed: 1
        },
        fate: {
            enabled: false,
            opacity: 1,
            transform: { ...defaultTransform },
            ...defaultHueSat,
            speed: 1
        },
        structuredNoise: {
            enabled: false,
            opacity: 1,
            transform: { ...defaultTransform },
            speed: 1,
            mirrors: 3.0,
            noiseStrength: 0.5,
            distortionStrength: 0.25,
            hue: 0,
            saturation: 1,
            useFilter: false,
            filterColor: "#ffffff"
        },
        balatro: {
            enabled: false,
            opacity: 1,
            transform: { ...defaultTransform },
            speed: 1,
            spinRotation: -2.0,
            spinSpeed: 7.0,
            contrast: 3.5,
            lighting: 0.4,
            spinAmount: 0.25,
            pixelFilter: 745.0,
            spinEase: 1.0,
            isRotate: false,
            color1_r: 0.871, color1_g: 0.267, color1_b: 0.231,
            color2_r: 0.0, color2_g: 0.42, color2_b: 0.706,
            color3_r: 0.086, color3_g: 0.137, color3_b: 0.145,
        },
        electricPulse: {
            enabled: false,
            opacity: 1,
            transform: { ...defaultTransform },
            ...defaultHueSat,
            speed: 1.2,
            color1_r: 0.2,
            color1_g: 0.1,
            color1_b: 0.4,
        },
        laserBlast: {
            enabled: false,
            opacity: 1,
            transform: { ...defaultTransform },
            ...defaultHueSat,
            speed: 1,
            power: 0.51,
            duration: 4.0,
            startRadius: 0.84,
            endRadius: 1.6,
            color1_r: 0,
            color1_g: 0.64,
            color1_b: 0.2,
            color2_r: 0.06,
            color2_g: 0.35,
            color2_b: 0.85,
        },
        novatrix: {
            enabled: false,
            opacity: 1,
            transform: { ...defaultTransform },
            ...defaultHueSat,
            speed: 1,
            color_r: 0.44,
            color_g: 0.77,
            color_b: 0.85,
        },
        voronoi: {
            enabled: false,
            opacity: 1,
            transform: { ...defaultTransform },
            speed: 1,
            scale: 8.0,
            ...defaultHueSat,
        }
    },
    grainAmount: 0,
    grainSize: 1.5,
    scanlines: 0,
    scanlineWidth: 0,
    orbs: [
        {
            id: uuidv4(),
            key: uuidv4(),
            disabled: true,
            color: '#A020F0B3',
            width: 20,
            height: 20,
            borderRadius: { value: 50, unit: '%' },
            x: 10,
            y: 10,
            corrosion: 20,
            animation: {
                mode: 'shift',
                shift: { extentX: 0, extentY: 50, duration: 30 },
                rotation: { speed: 20, direction: 'clockwise' },
            },
            transformOrigin: { x: 50, y: 50 },
            overflow: 20,
            pulsate: { enabled: false, minSize: 0.8, maxSize: 1.2, duration: 2, opacity: false },
        },
        {
            id: uuidv4(),
            key: uuidv4(),
            disabled: true,
            color: '#F020D899',
            width: 25,
            height: 25,
            borderRadius: { value: 50, unit: '%' },
            x: 50,
            y: 50,
            corrosion: 30,
            animation: {
                mode: 'rotate',
                shift: { extentX: 0, extentY: 0, duration: 20 },
                rotation: { speed: 15, direction: 'clockwise' },
            },
            transformOrigin: { x: -20, y: 70 },
            overflow: 0,
            pulsate: { enabled: false, minSize: 0.8, maxSize: 1.2, duration: 2, opacity: false },
        },
    ],
    overlay: {
      enabled: false,
      blur: 10,
      lighten: 0.0,
      darken: 0.0,
      skewX: 0,
      skewY: 0,
    },
  };
}

const commonVertShaderWithTransform = `
  attribute vec2 a_position;
  varying vec2 v_texCoord;
  uniform vec2 u_translation;
  uniform float u_rotation;
  uniform float u_scale;

  void main() {
    mat2 rotationMatrix = mat2(cos(u_rotation), -sin(u_rotation), sin(u_rotation), cos(u_rotation));
    vec2 rotatedPosition = rotationMatrix * a_position;
    vec2 scaledPosition = rotatedPosition * u_scale;
    vec2 translatedPosition = scaledPosition + u_translation;
    gl_Position = vec4(translatedPosition, 0.0, 1.0);
    v_texCoord = a_position * 0.5 + 0.5;
  }
`;

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
uniform float uScale;
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
    p *= 5.0; // Hardcoded internal scale

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

function FlowShader({ config, globalConfig }: { config: GradientConfig['shaders']['flow'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const configString = useMemo(() => JSON.stringify(config), [config]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;
        
        const gl = canvas.getContext('webgl2') || canvas.getContext('webgl');
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

    function resize() {
      if (!ctnDom.current) return;
      canvas.width = ctnDom.current.offsetWidth;
      canvas.height = ctnDom.current.offsetHeight;
      if (!gl) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
    }
    window.addEventListener("resize", resize);
    resize();

    class Triangle {
        gl: WebGL2RenderingContext; vao: WebGLVertexArrayObject | null = null;
        constructor(gl: WebGL2RenderingContext) { this.gl = gl; const verts = new Float32Array([-1, -1, 3, -1, -1, 3]); this.vao = gl.createVertexArray(); gl.bindVertexArray(this.vao); const buffer = gl.createBuffer(); gl.bindBuffer(gl.ARRAY_BUFFER, buffer); gl.bufferData(gl.ARRAY_BUFFER, verts, gl.STATIC_DRAW); const loc = 0; gl.enableVertexAttribArray(loc); gl.vertexAttribPointer(loc, 2, gl.FLOAT, false, 0, 0); gl.bindVertexArray(null); }
        draw() { this.gl.bindVertexArray(this.vao); this.gl.drawArrays(this.gl.TRIANGLES, 0, 3); this.gl.bindVertexArray(null); }
    }
    function createShader(gl: WebGL2RenderingContext, type: number, source: string) { const shader = gl.createShader(type); if (!shader) throw new Error("Could not create shader"); gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { throw new Error(gl.getShaderInfoLog(shader) || "Shader compile error"); } return shader; }
    function createProgram(gl: WebGL2RenderingContext, vertSrc: string, fragSrc: string) { const program = gl.createProgram(); if (!program) throw new Error("Could not create program"); const vertShader = createShader(gl, gl.VERTEX_SHADER, vertSrc); const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragSrc); gl.attachShader(program, vertShader); gl.attachShader(program, fragShader); gl.bindAttribLocation(program, 0, "position"); gl.linkProgram(program); if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { throw new Error(gl.getProgramInfoLog(program) || "Program link error"); } return program; }

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
        // Render one more frame when paused to apply the new time
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

const hueSatHelpers = `
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

const kaleidoscopeFragShader = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uHue;
uniform float uSaturation;

${hueSatHelpers}

vec3 palette( float t ) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 1.0);
    vec3 d = vec3(0.263,0.416,0.557);
    return a + b*cos( 6.28318*(c*t+d) );
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y;
    vec2 uv0 = uv;
    vec3 finalColor = vec3(0.0);
    
    for (float i = 0.0; i < 4.0; i++) {
        uv = fract(uv * 1.5) - 0.5;
        float d = length(uv) * exp(-length(uv0));
        vec3 col = palette(length(uv0) + i*.4 + uTime*uSpeed*.4);
        d = sin(d*8. + uTime*uSpeed)/8.;
        d = abs(d);
        d = pow(0.01 / d, 1.2);
        finalColor += col * d;
    }
    
    vec3 hsv = rgb2hsv(finalColor);
    hsv.x += uHue / 360.0;
    hsv.y *= uSaturation;
    finalColor = hsv2rgb(hsv);

    gl_FragColor = vec4(finalColor, 1.0);
}
`;

function KaleidoscopeShader({ config, globalConfig }: { config: GradientConfig['shaders']['kaleidoscope'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl');
        if (!gl) return;
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, commonVertShaderWithTransform);
        gl.compileShader(vertexShader);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, kaleidoscopeFragShader);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Kaleidoscope Shader compile error:', gl.getShaderInfoLog(fragmentShader));
            return;
        }
        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        const uTimeLocation = gl.getUniformLocation(program, 'uTime');
        const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
        const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
        const uHue = gl.getUniformLocation(program, 'uHue');
        const uSaturation = gl.getUniformLocation(program, 'uSaturation');
        const uTranslationLocation = gl.getUniformLocation(program, 'u_translation');
        const uRotationLocation = gl.getUniformLocation(program, 'u_rotation');
        const uScaleLocation = gl.getUniformLocation(program, 'u_scale');
        
        let animationFrameId: number;
        let startTime = Date.now();
        const render = (time: number) => {
            if(!gl) return;
            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uTimeLocation, time);
            gl.uniform1f(uSpeedLocation, config.speed);
            gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uHue, config.hue);
            gl.uniform1f(uSaturation, config.saturation);
            gl.uniform2f(uTranslationLocation, config.transform.translateX / 100, -config.transform.translateY / 100);
            gl.uniform1f(uRotationLocation, config.transform.rotation * (Math.PI / 180));
            gl.uniform1f(uScaleLocation, config.transform.scale);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        const renderLoop = () => {
            const time = globalConfig.paused ? globalConfig.motion / 100 * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
            else render(time);
        };
        renderLoop();
        return () => { if(animationFrameId) cancelAnimationFrame(animationFrameId); };
    }, [config, globalConfig.paused, globalConfig.motion]);
    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

const fateFragShader = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uHue;
uniform float uSaturation;
#define TAU 6.283185
#define s1(v) (sin(v)*.5+.5)
${hueSatHelpers}
vec3 palette( in float t ){
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(2.0, 1.0, 0.0);
  vec3 d = vec3(0.5, 0.2, 0.25);
  return a + b*cos( 6.283185*(c*t+d) );
}
float hash13(vec3 p3){
	p3  = fract(p3 * .1031);
    p3 += dot(p3, p3.zyx + 31.32);
    return fract((p3.x + p3.y) * p3.z);
}
vec3 randomGradient(vec3 p){
  float the = hash13(p)*TAU;
  float phi = hash13(p+vec3(3,2,1))*TAU;
  return vec3(sin(the)*cos(phi), sin(the)*sin(phi), cos(the));
}
float noise(vec3 p){
  vec3 i = floor(p);
  vec3 f = fract(p);
  vec3 g000 = randomGradient(i+vec3(0,0,0)); vec3 g100 = randomGradient(i+vec3(1,0,0));
  vec3 g010 = randomGradient(i+vec3(0,1,0)); vec3 g001 = randomGradient(i+vec3(0,0,1));
  vec3 g011 = randomGradient(i+vec3(0,1,1)); vec3 g101 = randomGradient(i+vec3(1,0,1));
  vec3 g110 = randomGradient(i+vec3(1,1,0)); vec3 g111 = randomGradient(i+vec3(1,1,1));
  float v000 = dot(g000, f-vec3(0,0,0)); float v100 = dot(g100, f-vec3(1,0,0));
  float v010 = dot(g010, f-vec3(0,1,0)); float v001 = dot(g001, f-vec3(0,0,1));
  float v011 = dot(g011, f-vec3(0,1,1)); float v101 = dot(g101, f-vec3(1,0,1));
  float v110 = dot(g110, f-vec3(1,1,0)); float v111 = dot(g111, f-vec3(1,1,1));
  vec3 u = f*f*f*(f*(f*6.0 - 15.0) + 10.0);
  return mix(mix(mix(v000, v100, u.x), mix(v010, v110, u.x),u.y), mix(mix(v001, v101, u.x), mix(v011, v111, u.x), u.y), u.z);
}
float fbm(vec3 p){
  float amp = 1.; float fre = 1.; float n = 0.;
  for(float i =0.;i<4.;i++){ n += noise(fre*p)*amp; amp *= .5; fre *= 2.; }
  return n;
}
float fbmWrap(vec3 p){
  vec3 q = vec3(fbm(p+vec3(13.24,42.74,44.32)), fbm(p+vec3(51.16,17.93,98.23)), fbm(p+vec3(43.46,85.43,64.91)));
  return fbm(q);
}
void main(){
  vec2 uv = (gl_FragCoord.xy-vec2(uResolution.x/2.,uResolution.y/2.))/uResolution.y;
  uv = vec2(atan(uv.y,uv.x), length(uv));
  vec3 O = vec3(0.);
  float T = uTime * uSpeed;
  float k = .8;
  float d = fbmWrap( vec3( k*sin(uv.x), k*cos(uv.x), uv.y - T*1.2 ) ); 
  d -= uv.y-.4;
  d = 1.-d;
  vec3 col = mix(vec3(1), s1(vec3(3,2,1)+d*4.+T), d);
  d = pow(.5/d,2.);
  O += d*col;
  vec3 hsv = rgb2hsv(O);
  hsv.x += uHue / 360.0;
  hsv.y *= uSaturation;
  O = hsv2rgb(hsv);
  gl_FragColor = vec4(O, 1.0);
}
`;

function FateShader({ config, globalConfig }: { config: GradientConfig['shaders']['fate'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl');
        if (!gl) return;
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, commonVertShaderWithTransform);
        gl.compileShader(vertexShader);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, fateFragShader);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Fate Shader compile error:', gl.getShaderInfoLog(fragmentShader));
            return;
        }
        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        const uTimeLocation = gl.getUniformLocation(program, 'uTime');
        const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
        const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
        const uHue = gl.getUniformLocation(program, 'uHue');
        const uSaturation = gl.getUniformLocation(program, 'uSaturation');
        const uTranslationLocation = gl.getUniformLocation(program, 'u_translation');
        const uRotationLocation = gl.getUniformLocation(program, 'u_rotation');
        const uScaleLocation = gl.getUniformLocation(program, 'u_scale');
        
        let animationFrameId: number;
        let startTime = Date.now();
        const render = (time: number) => {
            if(!gl) return;
            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uTimeLocation, time);
            gl.uniform1f(uSpeedLocation, config.speed);
            gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uHue, config.hue);
            gl.uniform1f(uSaturation, config.saturation);
            gl.uniform2f(uTranslationLocation, config.transform.translateX / 100, -config.transform.translateY / 100);
            gl.uniform1f(uRotationLocation, config.transform.rotation * (Math.PI / 180));
            gl.uniform1f(uScaleLocation, config.transform.scale);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        const renderLoop = () => {
            const time = globalConfig.paused ? globalConfig.motion / 100 * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
            else render(time);
        };
        renderLoop();
        return () => { if(animationFrameId) cancelAnimationFrame(animationFrameId); };
    }, [config, globalConfig.paused, globalConfig.motion]);
    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

const structuredNoiseFragShader = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uMirrors;
uniform float uNoiseStrength;
uniform float uDistortionStrength;
uniform float uHue;
uniform float uSaturation;
uniform bool u_useFilter;
uniform vec3 u_filterColor;

${hueSatHelpers}

const float PI = 3.14159265359;

float snoise(vec2 v) {
    return fract(sin(dot(v, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 p = (2.0 * gl_FragCoord.xy - uResolution.xy) / uResolution.y;
    float angle = atan(p.y, p.x);
    float radius = length(p);
    float t = uTime * uSpeed;

    float symmetricDistort = sin(angle * 6.0 + t) * 0.05 + cos(radius * 8.0 - t) * 0.05;
    float newAngle = angle + symmetricDistort * uDistortionStrength * 10.0;
    p = vec2(cos(newAngle), sin(newAngle)) * radius;

    radius = length(p);
    angle = atan(p.y, p.x);
    float normalizedAngle = 0.0;
    float mirrorStrength = 1.0;

    if (uMirrors >= 1.0) {
        float sectorAngle = 2.0 * PI / uMirrors;
        float wrappedAngle = mod(angle, 2.0 * PI);
        float rawAngle = mod(wrappedAngle, sectorAngle);
        float mirroredAngle = rawAngle > sectorAngle * 0.5 ? sectorAngle - rawAngle : rawAngle;
        normalizedAngle = mirroredAngle / (sectorAngle * 0.5 + 1e-5);
        p = radius * vec2(cos(mirroredAngle), sin(mirroredAngle));
        float angleMask = pow(abs(cos(normalizedAngle * PI)), 3.0);
        mirrorStrength = mix(0.5, 2.5, angleMask);
    } else {
        normalizedAngle = mod(angle, 2.0 * PI) / (2.0 * PI);
    }

    radius = length(p);
    vec2 uv = vec2(0.0, radius);
    uv = (2.0 * uv) - 1.0;

    float noiseVal = snoise(p + t * 0.1) * uNoiseStrength;
    float beamWidth = abs(5.0 / (30.0 * uv.y)) + noiseVal;
    beamWidth *= mirrorStrength;

    vec3 color = vec3(beamWidth);
    vec3 hsv = rgb2hsv(color);
    hsv.x += uHue / 360.0;
    hsv.y *= uSaturation;
    color = hsv2rgb(hsv);
    
    if (u_useFilter) {
      color *= u_filterColor;
    }
    
    gl_FragColor = vec4(color, 1.0);
}
`;

function StructuredNoiseShader({ config, globalConfig }: { config: GradientConfig['shaders']['structuredNoise'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl');
        if (!gl) return;
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, commonVertShaderWithTransform);
        gl.compileShader(vertexShader);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, structuredNoiseFragShader);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Structured Noise Shader compile error:', gl.getShaderInfoLog(fragmentShader));
            return;
        }
        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        const uTimeLocation = gl.getUniformLocation(program, 'uTime');
        const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
        const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
        const uMirrors = gl.getUniformLocation(program, 'uMirrors');
        const uNoiseStrength = gl.getUniformLocation(program, 'uNoiseStrength');
        const uDistortionStrength = gl.getUniformLocation(program, 'uDistortionStrength');
        const uHue = gl.getUniformLocation(program, 'uHue');
        const uSaturation = gl.getUniformLocation(program, 'uSaturation');
        const uTranslationLocation = gl.getUniformLocation(program, 'u_translation');
        const uRotationLocation = gl.getUniformLocation(program, 'u_rotation');
        const uScaleLocation = gl.getUniformLocation(program, 'u_scale');
        const uUseFilterLocation = gl.getUniformLocation(program, 'u_useFilter');
        const uFilterColorLocation = gl.getUniformLocation(program, 'u_filterColor');
        
        let animationFrameId: number;
        let startTime = Date.now();
        const render = (time: number) => {
            if(!gl) return;
            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uTimeLocation, time);
            gl.uniform1f(uSpeedLocation, config.speed);
            gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uMirrors, config.mirrors);
            gl.uniform1f(uNoiseStrength, config.noiseStrength);
            gl.uniform1f(uDistortionStrength, config.distortionStrength);
            gl.uniform1f(uHue, config.hue);
            gl.uniform1f(uSaturation, config.saturation);
            gl.uniform2f(uTranslationLocation, config.transform.translateX / 100, -config.transform.translateY / 100);
            gl.uniform1f(uRotationLocation, config.transform.rotation * (Math.PI / 180));
            gl.uniform1f(uScaleLocation, config.transform.scale);
            gl.uniform1i(uUseFilterLocation, config.useFilter ? 1 : 0);
            if (config.useFilter) {
                const rgb = hexToRgb(config.filterColor);
                gl.uniform3f(uFilterColorLocation, rgb.r / 255, rgb.g / 255, rgb.b / 255);
            }

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        const renderLoop = () => {
            const time = globalConfig.paused ? globalConfig.motion / 100 * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
            else render(time);
        };
        renderLoop();
        return () => { if(animationFrameId) cancelAnimationFrame(animationFrameId); };
    }, [config, globalConfig.paused, globalConfig.motion]);

    function hexToRgb(hex: string) {
        const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
        return result ? {
            r: parseInt(result[1], 16),
            g: parseInt(result[2], 16),
            b: parseInt(result[3], 16)
        } : { r: 255, g: 255, b: 255 };
    }

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

const balatroFragShader = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;

uniform float uSpinRotation;
uniform float uSpinSpeed;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform float uContrast;
uniform float uLighting;
uniform float uSpinAmount;
uniform float uPixelFilter;
uniform float uSpinEase;
uniform bool uIsRotate;

#define PI 3.14159265359

vec4 effect(vec2 screenSize, vec2 screen_coords) {
    float pixel_size = length(screenSize.xy) / uPixelFilter;
    vec2 uv = (floor(screen_coords.xy*(1./pixel_size))*pixel_size - 0.5*screenSize.xy)/length(screenSize.xy) - vec2(0.0);
    float uv_len = length(uv);
    
    float speed = (uSpinRotation*uSpinEase*0.2);
    if(uIsRotate){
       speed = uTime * speed;
    }
    speed += 302.2;
    float new_pixel_angle = atan(uv.y, uv.x) + speed - uSpinEase*20.*(1.*uSpinAmount*uv_len + (1. - 1.*uSpinAmount));
    vec2 mid = (screenSize.xy/length(screenSize.xy))/2.;
    uv = (vec2((uv_len * cos(new_pixel_angle) + mid.x), (uv_len * sin(new_pixel_angle) + mid.y)) - mid);
    
    uv *= 30.;
    speed = uTime*(uSpinSpeed);
    vec2 uv2 = vec2(uv.x+uv.y);
    
    for(int i=0; i < 5; i++) {
        uv2 += sin(max(uv.x, uv.y)) + uv;
        uv  += 0.5*vec2(cos(5.1123314 + 0.353*uv2.y + speed*0.131121),sin(uv2.x - 0.113*speed));
        uv  -= 1.0*cos(uv.x + uv.y) - 1.0*sin(uv.x*0.711 - uv.y);
    }
    
    float contrast_mod = (0.25*uContrast + 0.5*uSpinAmount + 1.2);
    float paint_res = min(2., max(0.,length(uv)*(0.035)*contrast_mod));
    float c1p = max(0.,1. - contrast_mod*abs(1.-paint_res));
    float c2p = max(0.,1. - contrast_mod*abs(paint_res));
    float c3p = 1. - min(1., c1p + c2p);
    float light = (uLighting - 0.2)*max(c1p*5. - 4., 0.) + uLighting*max(c2p*5. - 4., 0.);
    return (0.3/uContrast)*vec4(uColor1,1.0) + (1. - 0.3/uContrast)*(vec4(uColor1,1.0)*c1p + vec4(uColor2,1.0)*c2p + vec4(c3p*uColor3.rgb, c3p*1.0)) + light;
}

void main() {
    vec2 uv = gl_FragCoord.xy/uResolution.xy;
    gl_FragColor = effect(uResolution.xy, uv * uResolution.xy);
}
`;

function BalatroShader({ config, globalConfig }: { config: GradientConfig['shaders']['balatro'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl');
        if (!gl) return;
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, commonVertShaderWithTransform);
        gl.compileShader(vertexShader);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, balatroFragShader);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Balatro Shader compile error:', gl.getShaderInfoLog(fragmentShader));
            return;
        }
        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        const uTimeLocation = gl.getUniformLocation(program, 'uTime');
        const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
        const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
        const uSpinRotation = gl.getUniformLocation(program, 'uSpinRotation');
        const uSpinSpeed = gl.getUniformLocation(program, 'uSpinSpeed');
        const uColor1 = gl.getUniformLocation(program, 'uColor1');
        const uColor2 = gl.getUniformLocation(program, 'uColor2');
        const uColor3 = gl.getUniformLocation(program, 'uColor3');
        const uContrast = gl.getUniformLocation(program, 'uContrast');
        const uLighting = gl.getUniformLocation(program, 'uLighting');
        const uSpinAmount = gl.getUniformLocation(program, 'uSpinAmount');
        const uPixelFilter = gl.getUniformLocation(program, 'uPixelFilter');
        const uSpinEase = gl.getUniformLocation(program, 'uSpinEase');
        const uIsRotate = gl.getUniformLocation(program, 'uIsRotate');
        
        const uTranslationLocation = gl.getUniformLocation(program, 'u_translation');
        const uRotationLocation = gl.getUniformLocation(program, 'u_rotation');
        const uScaleLocation = gl.getUniformLocation(program, 'u_scale');
        
        let animationFrameId: number;
        let startTime = Date.now();
        const render = (time: number) => {
            if(!gl) return;
            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uTimeLocation, time * config.speed);
            gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
            
            gl.uniform1f(uSpinRotation, config.spinRotation);
            gl.uniform1f(uSpinSpeed, config.spinSpeed);
            gl.uniform3f(uColor1, config.color1_r, config.color1_g, config.color1_b);
            gl.uniform3f(uColor2, config.color2_r, config.color2_g, config.color2_b);
            gl.uniform3f(uColor3, config.color3_r, config.color3_g, config.color3_b);
            gl.uniform1f(uContrast, config.contrast);
            gl.uniform1f(uLighting, config.lighting);
            gl.uniform1f(uSpinAmount, config.spinAmount);
            gl.uniform1f(uPixelFilter, config.pixelFilter);
            gl.uniform1f(uSpinEase, config.spinEase);
            gl.uniform1i(uIsRotate, config.isRotate ? 1 : 0);

            gl.uniform2f(uTranslationLocation, config.transform.translateX / 100, -config.transform.translateY / 100);
            gl.uniform1f(uRotationLocation, config.transform.rotation * (Math.PI / 180));
            gl.uniform1f(uScaleLocation, config.transform.scale);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        const renderLoop = () => {
            const time = globalConfig.paused ? globalConfig.motion / 100 * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
            else render(time);
        };
        renderLoop();
        return () => { if(animationFrameId) cancelAnimationFrame(animationFrameId); };
    }, [config, globalConfig.paused, globalConfig.motion]);
    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

const electricPulseFragShader = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform sampler2D iChannel0;
uniform float uHue;
uniform float uSaturation;
uniform vec3 uColor1;

${hueSatHelpers}

mat2 makem2(in float theta){float c = cos(theta);float s = sin(theta);return mat2(c,-s,s,c);}
float noise( in vec2 x ){return texture2D(iChannel0, x*.01).x;}

float fbm(in vec2 p)
{	
	float z=2.;
	float rz = 0.;
	vec2 bp = p;
	for (float i= 1.;i < 6.;i++)
	{
		rz+= abs((noise(p)-0.5)*2.)/z;
		z = z*2.;
		p = p*2.;
	}
	return rz;
}

float dualfbm(in vec2 p)
{
	vec2 p2 = p*.7;
	vec2 basis = vec2(fbm(p2-uTime*uSpeed*1.6),fbm(p2+uTime*uSpeed*1.7));
	basis = (basis-.5)*.2;
	p += basis;
	
	return fbm(p*makem2(uTime*uSpeed*0.2));
}

float circ(vec2 p) 
{
	float r = length(p);
	r = log(sqrt(r));
	return abs(mod(r*4., 6.2831853)-3.14)*3.+.2;
}

void main(void)
{
	vec2 p = gl_FragCoord.xy / uResolution.xy-0.5;
	p.x *= uResolution.x/uResolution.y;
	p*=4.;
	
    float rz = dualfbm(p);
	
	p /= exp(mod(uTime*uSpeed*10.,3.14159));
	rz *= pow(abs((0.1-circ(p))),.9);
	
	vec3 col = uColor1/rz;
	col=pow(abs(col),vec3(.99));

    vec3 hsv = rgb2hsv(col);
    hsv.x += uHue / 360.0;
    hsv.y *= uSaturation;
    col = hsv2rgb(hsv);

	gl_FragColor = vec4(col,1.);
}
`;

function ElectricPulseShader({ config, globalConfig }: { config: GradientConfig['shaders']['electricPulse'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl');
        if (!gl) return;

        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        const noise = new Uint8Array(256 * 256 * 4);
        for (let i = 0; i < noise.length; i++) {
            noise[i] = Math.random() * 255;
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, noise);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, commonVertShaderWithTransform);
        gl.compileShader(vertexShader);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, electricPulseFragShader);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Electric Pulse Shader compile error:', gl.getShaderInfoLog(fragmentShader));
            return;
        }
        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        const uTimeLocation = gl.getUniformLocation(program, 'uTime');
        const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
        const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
        const iChannel0Location = gl.getUniformLocation(program, "iChannel0");
        const uHue = gl.getUniformLocation(program, 'uHue');
        const uSaturation = gl.getUniformLocation(program, 'uSaturation');
        const uColor1 = gl.getUniformLocation(program, 'uColor1');
        const uTranslationLocation = gl.getUniformLocation(program, 'u_translation');
        const uRotationLocation = gl.getUniformLocation(program, 'u_rotation');
        const uScaleLocation = gl.getUniformLocation(program, 'u_scale');
        
        let animationFrameId: number;
        let startTime = Date.now();
        const render = (time: number) => {
            if(!gl) return;
            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uTimeLocation, time);
            gl.uniform1f(uSpeedLocation, config.speed * 0.15);
            gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uHue, config.hue);
            gl.uniform1f(uSaturation, config.saturation);
            gl.uniform3f(uColor1, config.color1_r, config.color1_g, config.color1_b);
            gl.uniform2f(uTranslationLocation, config.transform.translateX / 100, -config.transform.translateY / 100);
            gl.uniform1f(uRotationLocation, config.transform.rotation * (Math.PI / 180));
            gl.uniform1f(uScaleLocation, config.transform.scale);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(iChannel0Location, 0);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        const renderLoop = () => {
            const time = globalConfig.paused ? globalConfig.motion / 100 * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
            else render(time);
        };
        renderLoop();
        return () => { if(animationFrameId) cancelAnimationFrame(animationFrameId); };
    }, [config, globalConfig.paused, globalConfig.motion]);
    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

const laserBlastFragShader = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform vec3 uStartColor;
uniform vec3 uEndColor;
uniform float uStartRadius;
uniform float uEndRadius;
uniform float uPower;
uniform float uDuration;
uniform float uHue;
uniform float uSaturation;

${hueSatHelpers}

void main()
{
    float t = uTime * uSpeed + 5.;
	float z = 6.;

	const int n = 100;
    
	float power = uPower;
	float duration = uDuration;
    
	vec2 
		s = uResolution.xy,
		v = z*(2.*gl_FragCoord.xy-s)/s.y;
    
	vec3 col = vec3(0.);
    
	float mb = 0.;
	float sum = 0.;
	for(int i=0;i<n;i++)
	{
		float d = fract(t*power+48934.4238*sin(float(i)*692.7398));
    	 		
        float a = 6.28*float(i)/float(n);

        float x = d*cos(a)*duration;
        float y = d*sin(a)*duration;
        
		float distRatio = d/duration;
        
		float mbRadius = mix(uStartRadius, uEndRadius, distRatio); 
        
		vec2 p = v - vec2(x,y);
        
		mb = mbRadius/dot(p,p);
    	
		sum += mb;
        
		col = mix(col, mix(uStartColor, uEndColor, distRatio), mb/sum);
	}
    
	sum /= float(n);
    
	col = normalize(col) * sum;
    
	sum = clamp(sum, 0., .4);
    
	vec3 tex = vec3(1.);
     
	col *= smoothstep(tex, vec3(0.), vec3(sum));
    
    vec3 hsv = rgb2hsv(col);
    hsv.x += uHue / 360.0;
    hsv.y *= uSaturation;
    col = hsv2rgb(hsv);
        
	gl_FragColor.rgb = col;
}
`;

function LaserBlastShader({ config, globalConfig }: { config: GradientConfig['shaders']['laserBlast'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl');
        if (!gl) return;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, commonVertShaderWithTransform);
        gl.compileShader(vertexShader);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, laserBlastFragShader);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Laser Blast Shader compile error:', gl.getShaderInfoLog(fragmentShader));
            return;
        }
        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        const uTimeLocation = gl.getUniformLocation(program, 'uTime');
        const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
        const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
        const uStartColor = gl.getUniformLocation(program, 'uStartColor');
        const uEndColor = gl.getUniformLocation(program, 'uEndColor');
        const uStartRadius = gl.getUniformLocation(program, 'uStartRadius');
        const uEndRadius = gl.getUniformLocation(program, 'uEndRadius');
        const uPower = gl.getUniformLocation(program, 'uPower');
        const uDuration = gl.getUniformLocation(program, 'uDuration');
        const uHue = gl.getUniformLocation(program, 'uHue');
        const uSaturation = gl.getUniformLocation(program, 'uSaturation');
        const uTranslationLocation = gl.getUniformLocation(program, 'u_translation');
        const uRotationLocation = gl.getUniformLocation(program, 'u_rotation');
        const uScaleLocation = gl.getUniformLocation(program, 'u_scale');
        
        let animationFrameId: number;
        let startTime = Date.now();
        const render = (time: number) => {
            if(!gl) return;
            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uTimeLocation, time);
            gl.uniform1f(uSpeedLocation, config.speed);
            gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
            gl.uniform3f(uStartColor, config.color1_r, config.color1_g, config.color1_b);
            gl.uniform3f(uEndColor, config.color2_r, config.color2_g, config.color2_b);
            gl.uniform1f(uStartRadius, config.startRadius);
            gl.uniform1f(uEndRadius, config.endRadius);
            gl.uniform1f(uPower, config.power);
            gl.uniform1f(uDuration, config.duration);
            gl.uniform1f(uHue, config.hue);
            gl.uniform1f(uSaturation, config.saturation);

            gl.uniform2f(uTranslationLocation, config.transform.translateX / 100, -config.transform.translateY / 100);
            gl.uniform1f(uRotationLocation, config.transform.rotation * (Math.PI / 180));
            gl.uniform1f(uScaleLocation, config.transform.scale);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        const renderLoop = () => {
            const time = globalConfig.paused ? globalConfig.motion / 100 * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
            else render(time);
        };
        renderLoop();
        return () => { if(animationFrameId) cancelAnimationFrame(animationFrameId); };
    }, [config, globalConfig.paused, globalConfig.motion]);
    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

function NovatrixShader({ config, globalConfig }: { config: GradientConfig['shaders']['novatrix'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext("webgl");
        if (!gl) return;
        
        const vertSrc = `
            attribute vec2 a_position;
            varying vec2 vUv;
            void main() {
                vUv = a_position * 0.5 + 0.5;
                gl_Position = vec4(a_position, 0., 1.);
            }
        `;

        const fragSrc = `
            precision highp float;
            uniform float uTime;
            uniform vec3 uColor;
            uniform vec2 uResolution;
            uniform float uHue;
            uniform float uSaturation;
            varying vec2 vUv;

            ${hueSatHelpers}

            void main() {
                float mr = min(uResolution.x, uResolution.y);
                vec2 uv = (vUv * 2.0 - 1.0) * uResolution / mr;
                float d = -uTime * 0.5;
                float a = 0.0;
                for (float i = 0.0; i < 8.0; ++i) {
                    a += cos(i - d - a * uv.x);
                    d += sin(uv.y * i + a);
                }
                d += uTime * 0.5;
                vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5);
                col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5);
                vec3 mixedColor = mix(col, uColor, 0.33);

                vec3 hsv = rgb2hsv(mixedColor);
                hsv.x += uHue / 360.0;
                hsv.y *= uSaturation;
                mixedColor = hsv2rgb(hsv);
        
                gl_FragColor = vec4(mixedColor,1.0);
            }
        `;

        const vs = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vs, vertSrc);
        gl.compileShader(vs);
        
        const fs = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fs, fragSrc);
        gl.compileShader(fs);
        
        const program = gl.createProgram()!;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        const buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
        
        const uTime = gl.getUniformLocation(program, "uTime");
        const uColorLoc = gl.getUniformLocation(program, "uColor");
        const uResolution = gl.getUniformLocation(program, "uResolution");
        const uHueLoc = gl.getUniformLocation(program, "uHue");
        const uSaturationLoc = gl.getUniformLocation(program, "uSaturation");

        let startTime = Date.now();
        let animationFrameId: number;

        const render = (time: number) => {
            if (!gl) return;
            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
              canvas.width = rect.width;
              canvas.height = rect.height;
              gl.viewport(0, 0, canvas.width, canvas.height);
            }
            
            gl.useProgram(program);
            gl.uniform1f(uTime, time * config.speed);
            gl.uniform3f(uColorLoc, config.color_r, config.color_g, config.color_b);
            gl.uniform2f(uResolution, gl.drawingBufferWidth, gl.drawingBufferHeight);
            gl.uniform1f(uHueLoc, config.hue);
            gl.uniform1f(uSaturationLoc, config.saturation);
            
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        }
        
        const renderLoop = () => {
            const time = globalConfig.paused ? globalConfig.motion / 100 * 5 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) {
                animationFrameId = requestAnimationFrame(renderLoop);
            } else {
                render(time);
            }
        };

        renderLoop();

        return () => {
            cancelAnimationFrame(animationFrameId);
        };
    }, [config, globalConfig.paused, globalConfig.motion]);

    return <canvas ref={canvasRef} style={{ width: "100%", height: "100%" }} />;
}

const voronoiFragShader = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float iTime;
uniform sampler2D iChannel0;
uniform float uSpeed;
uniform float uScale;
uniform float uHue;
uniform float uSaturation;

${hueSatHelpers}

vec2 hash2( vec2 p ) {
	return texture2D( iChannel0, (p+0.5)/256.0, 0.0 ).xy;
}

vec3 voronoi( in vec2 x )
{
    vec2 ip = floor(x);
    vec2 fp = fract(x);
    vec2 mg, mr;
    float md = 8.0;

    for( int j=-1; j<=1; j++ )
    for( int i=-1; i<=1; i++ )
    {
        vec2 g = vec2(float(i),float(j));
		vec2 o = hash2( ip + g );
        o = 0.5 + 0.5*sin( uTime * uSpeed + 6.2831*o );
        vec2 r = g + o - fp;
        float d = dot(r,r);

        if( d<md )
        {
            md = d;
            mr = r;
            mg = g;
        }
    }

    md = 8.0;
    for( int j=-2; j<=2; j++ )
    for( int i=-2; i<=2; i++ )
    {
        vec2 g = mg + vec2(float(i),float(j));
		vec2 o = hash2( ip + g );
        o = 0.5 + 0.5*sin( uTime * uSpeed + 6.2831*o );
        vec2 r = g + o - fp;

        if( dot(mr-r,mr-r)>0.00001 )
        md = min( md, dot( 0.5*(mr+r), normalize(r-mr) ) );
    }

    return vec3( md, mr );
}

void main()
{
    vec2 p = gl_FragCoord.xy/uResolution.xx;
    vec3 c = voronoi( uScale*p );

    vec3 col = c.x*(0.5 + 0.5*sin(64.0*c.x))*vec3(1.0);
    col = mix( vec3(1.0,0.6,0.0), col, smoothstep( 0.04, 0.07, c.x ) );
	float dd = length( c.yz );
	col = mix( vec3(1.0,0.6,0.1), col, smoothstep( 0.0, 0.12, dd) );
	col += vec3(1.0,0.6,0.1)*(1.0-smoothstep( 0.0, 0.04, dd));

    vec3 hsv = rgb2hsv(col);
    hsv.x += uHue / 360.0;
    hsv.y *= uSaturation;
    col = hsv2rgb(hsv);

	gl_FragColor = vec4(col,1.0);
}
`;

function VoronoiShader({ config, globalConfig }: { config: GradientConfig['shaders']['voronoi'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl');
        if (!gl) return;

        const texture = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, texture);
        const noise = new Uint8Array(256 * 256 * 4);
        for (let i = 0; i < noise.length; i++) {
            noise[i] = Math.random() * 255;
        }
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 256, 256, 0, gl.RGBA, gl.UNSIGNED_BYTE, noise);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.generateMipmap(gl.TEXTURE_2D);

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, commonVertShaderWithTransform);
        gl.compileShader(vertexShader);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, voronoiFragShader);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Voronoi Shader compile error:', gl.getShaderInfoLog(fragmentShader));
            return;
        }
        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(positionAttributeLocation);
        gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

        const uTimeLocation = gl.getUniformLocation(program, 'uTime');
        const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
        const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
        const iChannel0Location = gl.getUniformLocation(program, "iChannel0");
        const uScaleLocation = gl.getUniformLocation(program, 'uScale');
        const uHue = gl.getUniformLocation(program, 'uHue');
        const uSaturation = gl.getUniformLocation(program, 'uSaturation');
        const uTranslationLocation = gl.getUniformLocation(program, 'u_translation');
        const uRotationLocation = gl.getUniformLocation(program, 'u_rotation');
        const uTransformScaleLocation = gl.getUniformLocation(program, 'u_scale');
        
        let animationFrameId: number;
        let startTime = Date.now();
        const render = (time: number) => {
            if(!gl) return;
            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uTimeLocation, time);
            gl.uniform1f(uSpeedLocation, config.speed);
            gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uScaleLocation, config.scale);
            gl.uniform1f(uHue, config.hue);
            gl.uniform1f(uSaturation, config.saturation);

            gl.uniform2f(uTranslationLocation, config.transform.translateX / 100, -config.transform.translateY / 100);
            gl.uniform1f(uRotationLocation, config.transform.rotation * (Math.PI / 180));
            gl.uniform1f(uTransformScaleLocation, config.transform.scale);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(iChannel0Location, 0);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };
        const renderLoop = () => {
            const time = globalConfig.paused ? globalConfig.motion / 100 * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
            else render(time);
        };
        renderLoop();
        return () => { if(animationFrameId) cancelAnimationFrame(animationFrameId); };
    }, [config, globalConfig.paused, globalConfig.motion]);
    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}


function ShaderWrapper({ config, globalConfig, children }: { config: ShaderSetting, globalConfig: GradientConfig, children: React.ReactNode}) {
    const { transform } = config;
    const style: React.CSSProperties = {
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: config.opacity,
        transform: `translate(${transform.translateX}%, ${transform.translateY}%) rotate(${transform.rotation}deg) scale(${transform.scale})`,
        willChange: 'transform, opacity',
    };
    return <div style={style}>{children}</div>
}

export function GradientCanvas({ config }: { config: GradientConfig }) {
  const {
    shaders,
    grainAmount, grainSize, scanlines, scanlineWidth,
    orbs, overlay
  } = config;
  
  const corrosionFreq = useMemo(() => {
    const orbCorrosionMap: { [key: string]: number } = {};
    orbs.forEach(orb => {
        orbCorrosionMap[orb.id] = orb.corrosion / 1000;
    });
    return orbCorrosionMap;
  }, [orbs]);
  
  return (
    <div 
        id="gradient-canvas-container"
        className="w-full h-full relative overflow-hidden bg-black" 
        style={{
          transform: `skewX(${overlay.skewX}deg) skewY(${overlay.skewY}deg)`
        }}
    >
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
        
        {shaders.kaleidoscope.enabled && (
            <ShaderWrapper config={shaders.kaleidoscope} globalConfig={config}>
                <KaleidoscopeShader config={shaders.kaleidoscope} globalConfig={config} />
            </ShaderWrapper>
        )}

        {shaders.fate.enabled && (
            <ShaderWrapper config={shaders.fate} globalConfig={config}>
                <FateShader config={shaders.fate} globalConfig={config} />
            </ShaderWrapper>
        )}
        
        {shaders.structuredNoise.enabled && (
            <ShaderWrapper config={shaders.structuredNoise} globalConfig={config}>
                <StructuredNoiseShader config={shaders.structuredNoise} globalConfig={config} />
            </ShaderWrapper>
        )}

        {shaders.balatro.enabled && (
            <ShaderWrapper config={shaders.balatro} globalConfig={config}>
                <BalatroShader config={shaders.balatro} globalConfig={config} />
            </ShaderWrapper>
        )}

        {shaders.electricPulse.enabled && (
            <ShaderWrapper config={shaders.electricPulse} globalConfig={config}>
                <ElectricPulseShader config={shaders.electricPulse} globalConfig={config} />
            </ShaderWrapper>
        )}

        {shaders.laserBlast.enabled && (
            <ShaderWrapper config={shaders.laserBlast} globalConfig={config}>
                <LaserBlastShader config={shaders.laserBlast} globalConfig={config} />
            </ShaderWrapper>
        )}
        
        {shaders.novatrix.enabled && (
            <ShaderWrapper config={shaders.novatrix} globalConfig={config}>
                <NovatrixShader config={shaders.novatrix} globalConfig={config} />
            </ShaderWrapper>
        )}
        
        {shaders.voronoi.enabled && (
            <ShaderWrapper config={shaders.voronoi} globalConfig={config}>
                <VoronoiShader config={shaders.voronoi} globalConfig={config} />
            </ShaderWrapper>
        )}
        
        <div className="absolute inset-0 w-full h-full z-10">
            {orbs.map((orb, index) => !orb.disabled && <Orb key={orb.key} orb={orb} zIndex={index + 1} corrosionFreq={corrosionFreq[orb.id]} />)}
        </div>

        {overlay.enabled && (
            <div className="absolute inset-0 pointer-events-none z-20" style={{
                backdropFilter: `blur(${overlay.blur}px)`,
                backgroundColor: `rgba(255,255,255, ${overlay.lighten})`,
            }}>
                <div className="absolute inset-0" style={{
                    backgroundColor: `rgba(0,0,0, ${overlay.darken})`,
                }}></div>
            </div>
        )}

        {(grainAmount > 0 || scanlines > 0) && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
                {grainAmount > 0 && <div className="grain-overlay" style={{'--grain-amount': grainAmount, '--grain-size': grainSize} as React.CSSProperties}></div>}
                {scanlines > 0 && <div className="scanlines-overlay" style={{'--scanlines': scanlines, '--scanline-width': scanlineWidth}}></div>}
            </div>
        )}
        
      <style jsx>{`
        .grain-overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
            overflow: hidden;
        }

        .grain-overlay::before {
            content: "";
            position: absolute;
            top: -100%;
            left: -100%;
            width: 300%;
            height: 300%;
            background-image: url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIzMDAiIGhlaWdodD0iMzAwIj48ZmlsdGVyIGlkPSJub2lzZSI+PGZlVHVyYnVsZW5jZSB0eXBlPSJmcmFjdGFsTm9pc2UiIGJhc2VGUmVxdWVuY3k9IjAuNjUiIG51bU9jdGF2ZXM9IjMiIHN0aXRjaFRpbGVzPSJzdGl0Y2giLz48L2ZpbHRlcj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWx0ZXI9InVybCgjbm9pc2UpIi8+PC9zdmc+');
            background-size: calc(var(--grain-size, 1.5) * 100px);
            opacity: var(--grain-amount, 0.05);
            mix-blend-mode: screen;
            animation: grain-anim 1s steps(10) infinite;
            will-change: transform;
        }

        @keyframes grain-anim {
          0%, 100% { transform: translate(0, 0); } 10% { transform: translate(-5%, -10%); }
          20% { transform: translate(-15%, 5%); } 30% { transform: translate(7%, -25%); }
          40% { transform: translate(-5%, 25%); } 50% { transform: translate(-15%, 10%); }
          60% { transform: translate(15%, 0%); } 70% { transform: translate(0%, 15%); }
          80% { transform: translate(3%, 35%); } 90% { transform: translate(-10%, 10%); }
        }
        .scanlines-overlay {
            position: absolute; inset: 0;
            background: linear-gradient(to bottom, rgba(255,255,255,0) 50%, rgba(0,0,0,1) 50%);
            background-size: 100% calc(var(--scanline-width, 1) * 2px);
            opacity: var(--scanlines, 0);
        }
      `}</style>
    </div>
  );
}


const Orb = ({ orb, zIndex, corrosionFreq }: { orb: OrbConfig, zIndex: number, corrosionFreq: number }) => {
    const overflowValue = orb.overflow || 0;

    const keyframes = `
        @keyframes shift_${orb.id} {
            0%, 100% { transform: translate(0, 0); }
            50% { transform: translate(${orb.animation.shift.extentX}%, ${orb.animation.shift.extentY}%); }
        }
        @keyframes rotate_${orb.id} {
            from { transform: rotate(0deg); }
            to { transform: rotate(${orb.animation.rotation.direction === 'clockwise' ? '360deg' : '-360deg'}); }
        }
        @keyframes pulsate_${orb.id} {
            0%, 100% { transform: scale(${orb.pulsate.minSize}); opacity: ${orb.pulsate.opacity ? 0.5 : 1}; }
            50% { transform: scale(${orb.pulsate.maxSize}); opacity: 1; }
        }
    `;

    let animationName = [];
    let animationDuration = [];
    let animationTimingFunction = [];
    let animationIterationCount = [];

    if(orb.animation.mode === 'shift') {
        animationName.push(`shift_${orb.id}`);
        animationDuration.push(`${orb.animation.shift.duration}s`);
        animationTimingFunction.push('ease-in-out');
        animationIterationCount.push('infinite');
    }
    if(orb.animation.mode === 'rotate') {
        animationName.push(`rotate_${orb.id}`);
        animationDuration.push(`${orb.animation.rotation.speed}s`);
        animationTimingFunction.push('linear');
        animationIterationCount.push('infinite');
    }
    if (orb.pulsate.enabled) {
        animationName.push(`pulsate_${orb.id}`);
        animationDuration.push(`${orb.pulsate.duration}s`);
        animationTimingFunction.push('ease-in-out');
        animationIterationCount.push('infinite');
    }
    
    return (
        <>
            <style>{keyframes}</style>
             <div style={{
                position: 'absolute',
                top: `${orb.y}%`,
                left: `${orb.x}%`,
                width: `${orb.width}vmin`,
                height: `${orb.height}vmin`,
                transform: 'translate(-50%, -50%)',
                zIndex: zIndex,
                animationName: animationName.join(', '),
                animationDuration: animationDuration.join(', '),
                animationTimingFunction: animationTimingFunction.join(', '),
                animationIterationCount: animationIterationCount.join(', '),
                willChange: 'transform, opacity',
             }}>
                <div style={{
                    position: 'absolute',
                    top: `-${overflowValue}%`,
                    left: `-${overflowValue}%`,
                    width: `${100 + overflowValue * 2}%`,
                    height: `${100 + overflowValue * 2}%`,
                    backgroundColor: orb.color,
                    borderRadius: `${orb.borderRadius.value}${orb.borderRadius.unit}`,
                    mixBlendMode: 'screen',
                    filter: `url(#orb-corrosion-${orb.id})`,
                }}/>
            </div>
            
             <svg width="0" height="0" className="absolute">
                <defs>
                    <filter id={`orb-corrosion-${orb.id}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feTurbulence 
                            type="fractalNoise" 
                            baseFrequency={corrosionFreq}
                            numOctaves="2" 
                            result={`noise-${orb.id}`} 
                        >
                            <animate 
                                attributeName="baseFrequency" 
                                dur={`${orb.animation.rotation.speed}s`} 
                                values={`${corrosionFreq};${corrosionFreq * 1.5};${corrosionFreq}`} 
                                repeatCount="indefinite" 
                                restart="always"
                                begin="0s"
                                keyTimes="0;0.5;1"
                                calcMode="spline"
                                keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                            />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2={`noise-${orb.id}`} scale={orb.corrosion * 2} />
                    </filter>
                </defs>
            </svg>
        </>
    )
}




