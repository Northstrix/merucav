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

export interface ShaderSetting {
    enabled: boolean;
    opacity: number;
    [key: string]: any;
}

export interface GradientConfig {
  paused: boolean;
  motion: number;
  shaders: {
    flow: ShaderSetting & {
        scale: number;
        phaseX: number;
        velocity: number;
        detail: number;
        twist: number;
        speed: number;
        contrast: number;
        rgbR: number;
        rgbG: number;
        rgbB: number;
        colorOffset: number;
    };
    tranquiluxe: ShaderSetting & {
        hue: number;
        saturation: number;
        speed: number;
    };
    novatrix: ShaderSetting & {
      r: number;
      g: number;
      b: number;
      speed: number;
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
  };
}


export function getDefaultGradientConfig(): GradientConfig {
  return {
    paused: false,
    motion: 0,
    shaders: {
        flow: {
            enabled: true,
            opacity: 1,
            scale: 6.0,
            phaseX: 0.1,
            velocity: 0.2,
            detail: 200.0,
            twist: 50.0,
            speed: 2.5,
            contrast: 1.0,
            rgbR: 1.0,
            rgbG: 1.0,
            rgbB: 1.0,
            colorOffset: 0.0,
        },
        tranquiluxe: {
            enabled: false,
            opacity: 1,
            hue: 200,
            saturation: 62.75,
            speed: 0.25,
        },
        novatrix: {
          enabled: false,
          opacity: 1,
          r: 0.44,
          g: 0.77,
          b: 0.85,
          speed: 0.5,
        }
    },
    grainAmount: 0.05,
    grainSize: 1.5,
    scanlines: 0,
    scanlineWidth: 1,
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
      lighten: 0.05,
      darken: 0.05,
    },
  };
}

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
uniform float uPhaseX;
uniform float uVelocity;
uniform float uDetail;
uniform float uTwist;
uniform float uSpeed;
uniform float uContrast;
uniform float uRgbMultiplierR;
uniform float uRgbMultiplierG;
uniform float uRgbMultiplierB;
uniform float uColorOffset;

float f(in vec2 p) {
    return sin(p.x + sin(p.y + uTime * uVelocity)) * sin(p.y * p.x * 0.1 + uTime * uVelocity);
}

void main() {
    vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) / min(uResolution.x, uResolution.y);
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
        
        const gl = canvas.getContext('webgl', { preserveDrawingBuffer: true });
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
        const uScaleLocation = gl.getUniformLocation(program, 'uScale');
        const uPhaseXLocation = gl.getUniformLocation(program, 'uPhaseX');
        const uVelocityLocation = gl.getUniformLocation(program, 'uVelocity');
        const uDetailLocation = gl.getUniformLocation(program, 'uDetail');
        const uTwistLocation = gl.getUniformLocation(program, 'uTwist');
        const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
        const uContrastLocation = gl.getUniformLocation(program, 'uContrast');
        const uRgbRLocation = gl.getUniformLocation(program, 'uRgbMultiplierR');
        const uRgbGLocation = gl.getUniformLocation(program, 'uRgbMultiplierG');
        const uRgbBLocation = gl.getUniformLocation(program, 'uRgbMultiplierB');
        const uColorOffsetLocation = gl.getUniformLocation(program, 'uColorOffset');

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
            gl.uniform1f(uScaleLocation, config.scale);
            gl.uniform1f(uPhaseXLocation, config.phaseX);
            gl.uniform1f(uVelocityLocation, config.velocity);
            gl.uniform1f(uDetailLocation, config.detail);
            gl.uniform1f(uTwistLocation, config.twist);
            gl.uniform1f(uSpeedLocation, config.speed);
            gl.uniform1f(uContrastLocation, config.contrast);
            gl.uniform1f(uRgbRLocation, config.rgbR);
            gl.uniform1f(uRgbGLocation, config.rgbG);
            gl.uniform1f(uRgbBLocation, config.rgbB);
            gl.uniform1f(uColorOffsetLocation, config.colorOffset);

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
uniform vec3 uResolution;
in vec2 vUv;
out vec4 fragColor;
float colormap_red(float x) { if (x < 0.0) { return 54.0 / 255.0; } else if (x < 20049.0 / 82979.0) { return (829.79 * x + 54.51) / 255.0; } else { return 1.0; } }
float colormap_green(float x) { if (x < 20049.0 / 82979.0) { return 0.0; } else if (x < 327013.0 / 810990.0) { return (8546482679670.0 / 10875673217.0 * x - 2064961390770.0 / 10875673217.0) / 255.0; } else if (x <= 1.0) { return (103806720.0 / 483977.0 * x + 19607415.0 / 483977.0) / 255.0; } else { return 1.0; } }
float colormap_blue(float x) { if (x < 0.0) { return 54.0 / 255.0; } else if (x < 7249.0 / 82979.0) { return (829.79 * x + 54.51) / 255.0; } else if (x < 20049.0 / 82979.0) { return 127.0 / 255.0; } else if (x < 327013.0 / 810990.0) { return (792.0224934136139 * x - 64.36479073560233) / 255.0; } else { return 1.0; } }
vec4 colormap(float x) { return vec4(colormap_red(x), colormap_green(x), colormap_blue(x), 1.0); }
float rand(vec2 n) { return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453); }
float noise(vec2 p){ vec2 ip = floor(p); vec2 u = fract(p); u = u*u*(3.0-2.0*u); float res = mix( mix(rand(ip),rand(ip+vec2(1.0,0.0)),u.x), mix(rand(ip+vec2(0.0,1.0)),rand(ip+vec2(1.0,1.0)),u.x), u.y); return res*res; }
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
    function createProgram(gl: WebGL2RenderingContext, vertSrc: string, fragSrc: string) { const vertShader = createShader(gl, gl.VERTEX_SHADER, vertSrc); const fragShader = createShader(gl, gl.FRAGMENT_SHADER, fragSrc); const program = gl.createProgram(); if (!program) throw new Error("Could not create program"); gl.attachShader(program, vertShader); gl.attachShader(program, fragShader); gl.bindAttribLocation(program, 0, "position"); gl.linkProgram(program); if (!gl.getProgramParameter(program, gl.LINK_STATUS)) { throw new Error(gl.getProgramInfoLog(program) || "Program link error"); } return program; }

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
      resize();
      
      const time = globalConfig.paused ? globalConfig.motion / 100 * 10 : (Date.now() - startTime) * 0.001;
      const { r, g, b } = hslToRgb(config.hue, config.saturation, 50);
      const colorVec: [number, number, number] = [r/255, g/255, b/255];

      gl.clearColor(1, 1, 1, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.useProgram(program);
      if (uTimeLoc) gl.uniform1f(uTimeLoc, time);
      if (uSpeedLoc) gl.uniform1f(uSpeedLoc, config.speed);
      if (uColorLoc) gl.uniform3fv(uColorLoc, colorVec);
      if (uResolutionLoc) gl.uniform3f(uResolutionLoc, canvas.width, canvas.height, canvas.width / Math.max(1, canvas.height));
      triangle.draw();
      
      if (!globalConfig.paused) {
          animFrameId = requestAnimationFrame(render);
      } else {
        // to render just one frame when paused
        if (animFrameId) cancelAnimationFrame(animFrameId);
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


function NovatrixShader({ config, globalConfig }: { config: GradientConfig['shaders']['novatrix'], globalConfig: GradientConfig }) {
    const ctnDom = useRef<HTMLDivElement>(null);
    const configString = useMemo(() => JSON.stringify(config), [config]);

    useEffect(() => {
        if (!ctnDom.current) return;
        const ctn = ctnDom.current;
        const canvas = document.createElement("canvas");
        ctn.appendChild(canvas);
        const gl = canvas.getContext("webgl");
        if (!gl) return;

        const vertSrc = ` attribute vec2 position; varying vec2 vUv; void main() { vUv = position * 0.5 + 0.5; gl_Position = vec4(position, 0., 1.); } `;
        const fragSrc = ` precision highp float; uniform float uTime; uniform float uSpeed; uniform vec3 uColor; uniform vec3 uResolution; varying vec2 vUv; void main() { float mr = min(uResolution.x, uResolution.y); vec2 uv = (vUv.xy * 2.0 - 1.0) * uResolution.xy / mr; float d = -uTime * uSpeed; float a = 0.0; for (float i = 0.0; i < 8.0; ++i) { a += cos(i - d - a * uv.x); d += sin(uv.y * i + a); } d += uTime * uSpeed; vec3 col = vec3(cos(uv * vec2(d, a)) * 0.6 + 0.4, cos(a + d) * 0.5 + 0.5); col = cos(col * cos(vec3(d, a, 2.5)) * 0.5 + 0.5); col = mix(col, uColor, 0.33); gl_FragColor = vec4(col,1.0); } `;

        function createShader(type: number, source: string): WebGLShader | null { const shader = gl.createShader(type); if (!shader) return null; gl.shaderSource(shader, source); gl.compileShader(shader); if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) { gl.deleteShader(shader); return null; } return shader; }
        
        function resize() {
            if (!ctnDom.current) return;
            canvas.width = ctnDom.current.offsetWidth;
            canvas.height = ctnDom.current.offsetHeight;
            gl.viewport(0, 0, canvas.width, canvas.height);
        }
        resize();
        window.addEventListener("resize", resize);

        const vs = createShader(gl.VERTEX_SHADER, vertSrc);
        const fs = createShader(gl.FRAGMENT_SHADER, fragSrc);
        if (!vs || !fs) return;

        const program = gl.createProgram();
        if (!program) return;
        gl.attachShader(program, vs);
        gl.attachShader(program, fs);
        gl.linkProgram(program);

        const position = gl.getAttribLocation(program, "position");
        const buffer = gl.createBuffer();
        if (!buffer) return;
        gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1, 3,-1, -1,3]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(position);
        gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

        const uTime = gl.getUniformLocation(program, "uTime");
        const uSpeed = gl.getUniformLocation(program, "uSpeed");
        const uColorLoc = gl.getUniformLocation(program, "uColor");
        const uResolution = gl.getUniformLocation(program, "uResolution");
        if (!uTime || !uColorLoc || !uResolution || !uSpeed) return;

        let frameId: number;
        let startTime = Date.now();
        function render() {
            if (!gl) return;
            const time = globalConfig.paused ? globalConfig.motion / 100 * 10 : (Date.now() - startTime) * 0.001;

            gl.useProgram(program);
            gl.uniform1f(uTime, time);
            gl.uniform1f(uSpeed, config.speed);
            gl.uniform3fv(uColorLoc, [config.r, config.g, config.b]);
            gl.uniform3f(uResolution, canvas.width, canvas.height, canvas.width / Math.max(1, canvas.height));
            gl.drawArrays(gl.TRIANGLES, 0, 3);
            if(!globalConfig.paused) {
                frameId = requestAnimationFrame(render);
            } else {
                 if (frameId) cancelAnimationFrame(frameId);
            }
        }
        render();

        return () => {
            if (frameId) cancelAnimationFrame(frameId);
            window.removeEventListener("resize", resize);
            if (ctn.contains(canvas)) ctn.removeChild(canvas);
            const ext = gl.getExtension("WEBGL_lose_context");
            ext?.loseContext?.();
        };
    }, [configString, globalConfig.paused, globalConfig.motion]);

    return ( <div ref={ctnDom} style={{ width: "100%", height: "100%", position: "absolute", inset: 0 }} /> );
};

export function GradientCanvas({ config }: { config: GradientConfig }) {
  const {
    paused,
    motion,
    shaders,
    grainAmount, grainSize, scanlines, scanlineWidth,
    orbs, overlay
  } = config;

  const animationPlayState = paused ? 'paused' : 'running';
  const motionTime = useMemo(() => paused ? `${-motion}s` : '0s', [paused, motion]);
  
  return (
    <div 
        id="gradient-canvas-container"
        className="w-full h-full relative overflow-hidden bg-black" 
        style={{
            '--anim-play-state': animationPlayState,
            '--motion-time': motionTime
        } as React.CSSProperties}
    >
        {shaders.flow.enabled && (
            <div className="absolute inset-0 w-full h-full z-0" style={{opacity: shaders.flow.opacity}}>
                <FlowShader config={shaders.flow} globalConfig={config} />
            </div>
        )}

        {shaders.tranquiluxe.enabled && (
            <div className="absolute inset-0 w-full h-full z-0" style={{opacity: shaders.tranquiluxe.opacity}}>
                <TranquiluxeShader config={shaders.tranquiluxe} globalConfig={config} />
            </div>
        )}

        {shaders.novatrix.enabled && (
            <div className="absolute inset-0 w-full h-full z-0" style={{opacity: shaders.novatrix.opacity}}>
                <NovatrixShader config={shaders.novatrix} globalConfig={config} />
            </div>
        )}
        
        <div className="absolute inset-0 w-full h-full z-10">
            {orbs.map((orb, index) => !orb.disabled && <Orb key={orb.key} orb={orb} zIndex={index + 1} />)}
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
            animation: grain-anim 1s steps(10) infinite;
            animation-play-state: var(--anim-play-state, running);
            will-change: transform;
            mix-blend-mode: screen;
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


const Orb = ({ orb, zIndex }: { orb: OrbConfig, zIndex: number }) => {
    const overflowValue = orb.overflow || 0;
    const corrosionFreq = useMemo(() => orb.corrosion / 1000, [orb.corrosion]);


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
        @keyframes corrosion_anim_${orb.id} {
            0% { --freq: ${corrosionFreq}; }
            50% { --freq: ${corrosionFreq * 2}; }
            100% { --freq: ${corrosionFreq}; }
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
                animationPlayState: 'var(--anim-play-state, running)',
                animationDelay: 'var(--motion-time, 0s)',
                transformOrigin: `${orb.transformOrigin.x}% ${orb.transformOrigin.y}%`,
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
                                style={{
                                    animationPlayState: 'var(--anim-play-state, running)',
                                }}
                            />
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2={`noise-${orb.id}`} scale={orb.corrosion * 2} />
                    </filter>
                </defs>
            </svg>
        </>
    )
}
