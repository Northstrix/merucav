

'use client';
import React, { useMemo, useRef, useEffect, useState, Suspense, lazy } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { hslToRgb } from '@/lib/color-utils';
import * as icons from 'lucide-react';
import { hexToRgb } from '@/lib/color-utils';
export type PositionOrigin =
  | 'top-left' | 'top-center' | 'top-right'
  | 'left-center' | 'center' | 'right-center'
  | 'bottom-left' | 'bottom-center' | 'bottom-right';

export type Unit = '%' | 'px' | 'rem';

export type ShapeType = 'rectangle' | 'triangle' | 'star' | 'beam' | 'quadratic' | 'half-circle';
export type NoiseType = 'fractal' | 'turbulence' | 'warped' | 'cellular' | 'electric' | 'cloudy';

export interface GradientStop {
  id: string;
  color: string;
  stop: number;
}

export interface ShapeConfig {
  id: string;
  key: string;
  disabled: boolean;
  color: string;
  shape: ShapeType;
  fillMode: 'fill' | 'stroke' | 'gradient';
  stroke: {
    width: number;
  };
  
  width: number;
  height: number;
  sizeUnit: Unit;

  positionOrigin: PositionOrigin;
  xOffset: number;
  yOffset: number;
  offsetUnit: Unit;
  zIndex?: number;

  borderRadius: { value: number; unit: Unit; };
  triangle: {
    angleA: number;
    angleB: number;
    angleC: number;
    height: number;
    base: number;
  };
  beam: {
    spreadStart: number;
    spreadEnd: number;
  },
  quadratic: {
    aperture: number;
  },
  gradient?: {
    colors: GradientStop[];
    angle: number;
  };
  rotation: number;
  corrosion: number;
  animation: {
    mode: 'none' | 'shift' | 'rotate' | 'pulsate';
    shift: {
      extentX: number;
      extentY: number;
      duration: number;
    };
    rotation: {
      speed: number;
      direction: 'clockwise' | 'counter-clockwise';
    };
    pulsate?: {
        minSize: number;
        maxSize: number;
        duration: number;
    };
  };
  transformOrigin: { x: number; y: number; };
  overflow: number;
}

export interface TextConfig {
    id: string;
    key: string;
    disabled: boolean;
    content: string;
    color: string;
    fontFamily: 'Inter' | 'Space Grotesk' | 'Roboto' | 'Montserrat' | 'Figtree' | 'Merriweather' | 'Fraunces' | 'Poppins' | 'Roboto Mono';
    fontSize: number;
    fontWeight: number;
    rotation: number;
    positionOrigin: PositionOrigin;
    xOffset: number;
    yOffset: number;
    offsetUnit: Unit;
    zIndex?: number;
    fillMode: 'fill' | 'stroke';
    strokeWidth: number;
}

export interface IconConfig {
    id: string;
    key: string;
    disabled: boolean;
    iconName: string;
    color: string;
    size: number;
    strokeWidth: number;
    rotation: number;
    positionOrigin: PositionOrigin;
    xOffset: number;
    yOffset: number;
    offsetUnit: Unit;
    zIndex?: number;
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
     discGlare: ShaderSetting & {
        phase: number;
        distortion: number;
        zoom: number;
        contrast: number;
        gamma: number;
        hue: number;
    };
    hydrogen: ShaderSetting & {
        n: number;
        l: number;
        m: number;
        zoom: number;
        contrast: number;
        gamma: number;
        hue: number;
        saturation: number;
        color1_r: number;
        color1_g: number;
        color1_b: number;
        color2_r: number;
        color2_g: number;
        color2_b: number;
    };
    pulse: ShaderSetting & {
        speed: number;
        factor: number;
        hue: number;
        saturation: number;
        contrast: number;
    };
    melt: ShaderSetting & {
      speed: number;
      zoom: number;
      detail: number;
      hue: number;
      saturation: number;
      contrast: number;
    };
    truchet: ShaderSetting & {
      speed: number;
      zoom: number;
      hue: number;
      saturation: number;
      sectors: number;
    };
    neonPolygon: ShaderSetting & {
      speed: number;
      sides: number;
      glow: number;
      color1_r: number; color1_g: number; color1_b: number;
      color2_r: number; color2_g: number; color2_b: number;
      hue: number;
      saturation: number;
    };
    exposedFilm: ShaderSetting & {
      sectors: number;
      rotationSpeed: number;
      hue: number;
      saturation: number;
    };
    psychedelicGlass: ShaderSetting & {
      speed: number;
      sides: number;
      hue: number;
      saturation: number;
      contrast: number;
      density: number;
      glow: number;
    };
    solarWhirls: ShaderSetting & {
      speed: number;
      hue: number;
      saturation: number;
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
    chargedCells: ShaderSetting & {
      speed: number;
      scale: number;
      hue: number;
      saturation: number;
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
    refractedWave: ShaderSetting & {
      speed: number;
      softness: number;
      intensity: number;
      noise: number;
      shape: number;
      colors: string[];
      colorCount: number;
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
    spiral: ShaderSetting & {
      scale: number;
      colorBack: string;
      colorFront: string;
      density: number;
      distortion: number;
      strokeWidth: number;
      strokeTaper: number;
      noise: number;
      noiseFrequency: number;
      softness: number;
      speed: number;
    };
    neuralNoise: ShaderSetting & {
      speed: number;
      hue: number;
      saturation: number;
      iterations: number;
      complexity: number;
      distance: number;
      brightness: number;
      contrast: number;
      color: string;
      colorShiftSpeed: number;
      vignette: number;
    };
    interstellar: ShaderSetting & {
      passes: number;
      speed: number;
      grain: number;
      luminance: number;
      precision: number;
      iterations: number;
      solidity: number;
      camX: number;
      camY: number;
      camPitch: number;
      camFov: number;
      camShiftX: number;
      camShiftY: number;
    };
    corrodedSpiral: ShaderSetting & {
      hue: number;
      saturation: number;
      speed: number;
      corrosionZoom: number;
      octaves: number;
      persistence: number;
      lacunarity: number;
      spiralDensity: number;
      intensity: number;
    };
    spiralTunnel: ShaderSetting & {
      enabled: boolean;
      opacity: number;
      flightSpeed: number;
      fieldOfView: number;
      luminosity: number;
      openingSize: number;
      ribbonCount: number;
      ribbonWidth: number;
      spiralDensity: number;
      spiralCount: number;
      lightIntensity: number;
      distortion: number;
      lineColor1: string;
      lineColor2: string;
      lineColor3: string;
      lineColor4: string;
      hue: number;
      saturation: number;
    };
    fractalVortex: ShaderSetting & {
      renderScale: number;
      traceSteps: number;
      cameraSpeed: number;
      fractalSpeed: number;
      fov: number;
      fractalScale: number;
      turbulence: number;
      boxSize: number;
      glowStrength: number;
      glowWidth: number;
      mirrorTileSize: number;
      wallNormalScale: number;
      exposure: number;
      hue: number;
      saturation: number;
    };
    infiniteCorridor: ShaderSetting & {
      hue: number;
      saturation: number;
      floorY: number;
      apexY: number;
      halfWidth: number;
      focalLength: number;
      fogDensity: number;
      fractalTimeScale: number;
      trailTimeScale: number;
      fractalScaleX: number;
      fractalScaleY: number;
      fractalScroll: number;
      fractalLevels: number;
      lineWidthNear: number;
      lineWidthFar: number;
      lineSoftness: number;
      cameraSpeed: number;
      cameraX: number;
      cameraY: number;
      cameraZ: number;
      cameraSwayX: number;
      cameraSwayY: number;
      seamStrength: number;
      lightColor: string;
      glowColor: string;
      substrateColor: string;
      backgroundColor: string;
      trailBrightness: number;
      // Integrated Fate Parameters
      fateSpeed: number;
      // Integrated Kaleidoscope Parameters
      kaleidoscopeSpeed: number;
      // Integrated Structured Noise Parameters
      mirrors: number;
      noiseStrength: number;
      distortionStrength: number;
      useFilter: boolean;
      filterColor: string;
    };
  };
  grainAmount: number;
  grainSize: number;
  scanlines: number;
  scanlineWidth: number;
  shapes: ShapeConfig[];
  orbs?: ShapeConfig[]; // For backward compatibility
  texts: TextConfig[];
  icons: IconConfig[];
  overlay: {
    enabled: boolean;
    blur: number;
    lighten: number;
    darken: number;
    skewX: number;
    skewY: number;
    invert: boolean;
    noise: {
        enabled: boolean;
        type: NoiseType;
        frequency: number;
        octaves: number;
        seed: number;
        opacity: number;
        scale: number;
        levels: number;
    }
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
        },
         discGlare: {
            enabled: false,
            opacity: 1,
            transform: { ...defaultTransform },
            phase: 1.5,
            distortion: 0.7,
            zoom: 1.0,
            contrast: 5.0,
            gamma: 1.5,
            hue: 0,
        },
        hydrogen: {
            enabled: false,
            opacity: 1,
            transform: { ...defaultTransform },
            n: 8.0,
            l: 4.0,
            m: 3.0,
            zoom: 20,
            contrast: 10.0,
            gamma: 0.2,
            hue: 129,
            saturation: 1.20,
            color1_r: 0.0, color1_g: 1.0, color1_b: 0.4,
            color2_r: 0.1, color2_g: 1.0, color2_b: 0.46,
        },
        pulse: {
            enabled: false,
            opacity: 1,
            transform: { ...defaultTransform },
            speed: 1,
            factor: 0.2,
            hue: 0,
            saturation: 1,
            contrast: 1,
        },
        melt: {
            enabled: false, opacity: 1, transform: { ...defaultTransform },
            speed: 2, zoom: 5.0, detail: 0.2,
            hue: 0, saturation: 1, contrast: 1.5,
        },
        truchet: {
            enabled: false, opacity: 1, transform: { ...defaultTransform },
            speed: 0.25, zoom: 10.0, borderThickness: 0.22, sectors: 6.0,
            hue: 114, saturation: 1,
        },
        neonPolygon: {
            enabled: false,
            opacity: 1,
            transform: { ...defaultTransform },
            speed: 1.8,
            sides: 6,
            glow: 0.014,
            color1_r: 1.47,
            color1_g: 0.8,
            color1_b: 2.0,
            color2_r: 1.47,
            color2_g: 0.8,
            color2_b: 2.0,
            hue: 0, saturation: 1,
        },
        exposedFilm: {
          enabled: false,
          opacity: 1,
          transform: { translateX: 0, translateY: 0, rotation: 0, scale: 1 },
          sectors: 6,
          rotationSpeed: 0.1,
          hue: 0,
          saturation: 1,
        },
        psychedelicGlass: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          speed: 0.8,
          sides: 6,
          hue: 0,
          saturation: 1,
          contrast: 1,
          density: 15.0,
          glow: 1.2
        },
        solarWhirls: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          speed: 1.0,
          hue: 0,
          saturation: 1,
          color1_r: 0,
          color1_g: 0.76,
          color1_b: 0.4,
          color2_r: 1.0,
          color2_g: 1.0,
          color2_b: 0.2,
          color3_r: 0.1,
          color3_g: 0.2,
          color3_b: 0.5,
        },
        chargedCells: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          speed: 1.0,
          scale: 5.0,
          hue: 0,
          saturation: 1,
          color1_r: 0.18,
          color1_g: 0.7,
          color1_b: 0.4,
          color2_r: 0.58,
          color2_g: 1.0,
          color2_b: 0.15,
          color3_r: 0,
          color3_g: 0.65,
          color3_b: 0.31,
        },
        refractedWave: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          speed: 1.0,
          softness: 0.5,
          intensity: 0.5,
          noise: 0.2,
          shape: 3,
          colors: ['#5100ff', '#00ff80', '#ffcc00', '#ea00ff', '#000000', '#000000', '#000000'],
          colorCount: 4,
        },
        swirl: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          hue: 0,
          saturation: 1,
          speed: 1.0,
          colorBack: "#000000",
          colors: ['#5100ff', '#00ff80', '#ffcc00', '#ea00ff', '#000000', '#000000', '#000000', '#000000', '#000000', '#000000'],
          colorCount: 4,
          bandCount: 4.0,
          twist: 0.5,
          center: 0.0,
          proportion: 0.5,
          softness: 0.5,
          noise: 0.2,
          noiseFrequency: 0.4,
        },
        spiral: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          scale: 1,
          colorBack: '#0A98F0',
          colorFront: '#EEF9FF',
          density: 3.5,
          distortion: 0,
          strokeWidth: 0.9,
          strokeTaper: 0,
          noise: 0.5,
          noiseFrequency: 1.5,
          softness: 0,
          speed: 0.25,
        },
        neuralNoise: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform }, // scale is contained inside this shared object
          speed: 1.0,
          hue: 0,
          saturation: 1.0,
          iterations: 15,
          complexity: 2.4,
          distance: 1.2,
          brightness: 1.2,
          contrast: 0.5,
          color: '#00E5FF',
          colorShiftSpeed: 1.0,
          vignette: 1.0,
        },
        interstellar: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          passes: 1,
          speed: 1.0,
          grain: 0.04,
          luminance: 5.1,
          precision: 0.5,
          iterations: 28.6,
          solidity: 1.1,
          camX: 2.8,
          camY: -1.0,
          camPitch: -0.38,
          camFov: 2.5,
          camShiftX: 1.0,
          camShiftY: 1.0,
        },
        corrodedSpiral: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          hue: 180,
          saturation: 0.8,
          speed: 0.5,
          corrosionZoom: 3.0,
          octaves: 6,
          persistence: 0.5,
          lacunarity: 2.0,
          spiralDensity: 6.0,
          intensity: 1.5,
        },
        spiralTunnel: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          flightSpeed: 3.0,
          fieldOfView: 100.0,
          luminosity: 10.0,
          openingSize: 42.0,
          ribbonCount: 140,
          ribbonWidth: 0.09,
          spiralDensity: 19.0,
          spiralCount: 4,
          lightIntensity: 1.70,
          distortion: 63,
          lineColor1: "#00a2fa",
          lineColor2: "#a020f0",
          lineColor3: "#f97316",
          lineColor4: "#22c55e",
          hue: 0,
          saturation: 1.0,
        },
        fractalVortex: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          renderScale: 0.2,
          traceSteps: 380,
          cameraSpeed: 2.6,
          fractalSpeed: 1.0,
          fov: 1.5,
          fractalScale: 1.0,
          turbulence: 1.0,
          boxSize: 3.2,
          glowStrength: 0.06,
          glowWidth: 0.05,
          mirrorTileSize: 4.0,
          wallNormalScale: 4.0,
          exposure: 2.0,
          hue: 0,
          saturation: 1.0,
        },
        infiniteCorridor: {
          enabled: false,
          opacity: 1.0,
          transform: { ...defaultTransform },
          hue: 0,
          saturation: 1.0,
          floorY: -1.22,
          apexY: 1.65,
          halfWidth: 1.19,
          focalLength: 1.1,
          fogDensity: 0.089,
          fractalTimeScale: 1.0,
          trailTimeScale: 0.92,
          fractalScaleX: 0.54,
          fractalScaleY: 0.30,
          fractalScroll: 0.26,
          fractalLevels: 6.0,
          lineWidthNear: -0.009,
          lineWidthFar: 0.038,
          lineSoftness: 0.01,
          cameraSpeed: 1.10,
          cameraX: 0.0,
          cameraY: -0.97,
          cameraZ: 0.0,
          cameraSwayX: 0.045,
          cameraSwayY: 0.0,
          seamStrength: 0,
          lightColor: "#47b8ff",
          glowColor: "#1fe0ff",
          substrateColor: "#000000",
          backgroundColor: "#1fe0ff",
          trailBrightness: 0.19,
          // Integrated Fate Parameters
          fateSpeed: 0.8,
          // Integrated Kaleidoscope Parameters (Controlled dynamically by mirrors conditional UI logic)
          kaleidoscopeSpeed: 0.5,
          // Integrated Structured Noise Parameters
          mirrors: 0,
          noiseStrength: 0.25,
          distortionStrength: 0.35,
          useFilter: true,
          filterColor: "#ffffff",
        },
    },
    grainAmount: 0,
    grainSize: 1.5,
    scanlines: 0,
    scanlineWidth: 1,
    shapes: [],
    texts: [],
    icons: [],
    overlay: {
      enabled: false,
      blur: 10,
      lighten: 0.0,
      darken: 0.0,
      skewX: 0,
      skewY: 0,
      invert: false,
      noise: {
        enabled: false,
        type: 'fractal',
        frequency: 0.65,
        octaves: 3,
        seed: 0,
        opacity: 0.1,
        scale: 50,
        levels: 6
      }
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
    return a + b*cos( 6.283185*(c*t+d) );
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
        const uTransformScaleLocation = gl.getUniformLocation(program, 'u_scale');
        const uRotationLocation = gl.getUniformLocation(program, 'u_rotation');
        
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

const discGlareFragShader = `
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uPhase;
uniform float uDistortion;
uniform float uZoom;
uniform float uContrast;
uniform float uGamma;
uniform float uHue;

${hueSatHelpers}

const float PI = 3.14159265359;

vec3 palette(float t) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(0.5, 0.5, 0.5);
    vec3 c = vec3(1.0, 1.0, 0.5);
    vec3 d = vec3(0.8, 0.9, 0.3);
    return a + b*cos(6.28318*(c*t+d));
}

void main() {
    vec2 uv = (2.0 * gl_FragCoord.xy - uResolution.xy) / min(uResolution.x, uResolution.y);
    uv *= uZoom;

    float t = uTime * 0.1;

    vec2 p = uv;
    p.x += 0.5 * sin(2.0 * PI * p.y + t);
    p.y += 0.5 * cos(2.0 * PI * p.x + t);

    float r = length(p);
    float a = atan(p.y, p.x);
    
    float v = sin(uPhase * 10.0 * r - a * 5.0 + t * 2.0);
    v *= cos(a * 3.0 + t);
    
    float distortion = sin(r * 10.0 + t) * uDistortion;
    v += distortion;

    float val = pow(abs(v), uGamma) * uContrast;
    val = mod(val, 1.0);

    vec3 color = palette(val);
    
    vec3 hsv = rgb2hsv(color);
    hsv.x += uHue / 360.0;
    color = hsv2rgb(hsv);

    gl_FragColor = vec4(color, 1.0);
}
`;

function DiscGlareShader({ config, globalConfig }: { config: GradientConfig['shaders']['discGlare'], globalConfig: GradientConfig }) {
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
        gl.shaderSource(fragmentShader, discGlareFragShader);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Disc Glare Shader compile error:', gl.getShaderInfoLog(fragmentShader));
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
        const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
        const uPhase = gl.getUniformLocation(program, 'uPhase');
        const uDistortion = gl.getUniformLocation(program, 'uDistortion');
        const uZoom = gl.getUniformLocation(program, 'uZoom');
        const uContrast = gl.getUniformLocation(program, 'uContrast');
        const uGamma = gl.getUniformLocation(program, 'uGamma');
        const uHue = gl.getUniformLocation(program, 'uHue');
        
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
            gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
            
            gl.uniform1f(uPhase, config.phase);
            gl.uniform1f(uDistortion, config.distortion);
            gl.uniform1f(uZoom, config.zoom);
            gl.uniform1f(uContrast, config.contrast);
            gl.uniform1f(uGamma, config.gamma);
            gl.uniform1f(uHue, config.hue);

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

const hydrogenFragShader = `
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uN;
uniform float uL;
uniform float uM;
uniform float uZoom;
uniform float uContrast;
uniform float uGamma;
uniform float uHue;
uniform float uSaturation;
uniform vec3 uColor1;
uniform vec3 uColor2;

${hueSatHelpers}

const float PI = 3.14159265359;
const float a0 = 1.0;

float fact(float n_float) {
    if (n_float <= 1.0) return 1.0;
    if (n_float == 2.0) return 2.0;
    if (n_float == 3.0) return 6.0;
    if (n_float == 4.0) return 24.0;
    if (n_float == 5.0) return 120.0;
    if (n_float == 6.0) return 720.0;
    if (n_float == 7.0) return 5040.0;
    if (n_float == 8.0) return 40320.0;
    if (n_float == 9.0) return 362880.0;
    if (n_float == 10.0) return 3628800.0;
    return 1.0; 
}


float laguerre(float p_float, float q_float, float x) {
    int p = int(p_float);
    if (p == 0) return 1.0;
    if (p == 1) return 1.0 + q_float - x;
    if (p == 2) return (x*x - 2.0*(q_float+2.0)*x + (q_float+1.0)*(q_float+2.0)) / 2.0;
    if (p == 3) return (-x*x*x + 3.0*(q_float+3.0)*x*x - 3.0*(q_float+2.0)*(q_float+3.0)*x + (q_float+1.0)*(q_float+2.0)*(q_float+3.0)) / 6.0;
    
    return 1.0 - x / (q_float + 1.0);
}

float legendre(float l_float, float m_float, float x) {
    int l = int(l_float);
    int m = int(abs(m_float));

    if (l == 0 && m == 0) return 1.0;
    if (l == 1 && m == 0) return x;
    if (l == 1 && m == 1) return -sqrt(1.0 - x*x);
    if (l == 2 && m == 0) return 0.5 * (3.0*x*x - 1.0);
    if (l == 2 && m == 1) return -3.0*x*sqrt(1.0 - x*x);
    if (l == 2 && m == 2) return 3.0 * (1.0 - x*x);
    if (l == 3 && m == 0) return 0.5 * x * (5.0*x*x - 3.0);
    if (l == 3 && m == 1) return -1.5 * (5.0*x*x - 1.0) * sqrt(1.0 - x*x);
    if (l == 3 && m == 2) return 15.0 * x * (1.0 - x*x);
    if (l == 3 && m == 3) return -15.0 * pow(1.0 - x*x, 1.5);
    
    return 1.0;
}


float wave_function(float r, float theta, float phi) {
    float n_f = uN;
    float l_f = uL;
    float m_f = uM;
    
    float rho = 2.0 * r / (n_f * a0);
    float radial_part = exp(-rho / 2.0) * pow(rho, l_f);
    
    float L = laguerre(n_f - l_f - 1.0, 2.0 * l_f + 1.0, rho);

    float P = legendre(l_f, m_f, cos(theta));

    float angular_part = P;
    
    if(uM != 0.0){
      angular_part *= cos(m_f * phi);
    }

    float psi = radial_part * angular_part * L;
    return psi;
}

vec3 palette(float t) {
    return mix(uColor1, uColor2, t);
}

void main() {
    vec2 uv = (2.0 * gl_FragCoord.xy - uResolution.xy) / uResolution.y;
    uv *= uZoom;
    vec3 pos = vec3(uv.x, uv.y, 0.0);

    float r = length(pos) * 15.0; 
    float theta = acos(clamp(pos.z / (r + 1e-5), -1.0, 1.0));
    float phi = atan(pos.y, pos.x);

    float psi = wave_function(r, theta, phi);
    
    float probability = psi * psi;

    float val = pow(probability * uContrast, uGamma);
    
    vec3 color = palette(val);

    vec3 hsv = rgb2hsv(color);
    hsv.x += uHue / 360.0;
    hsv.y *= uSaturation;
    color = hsv2rgb(hsv);
    
    color = mix(vec3(0.0), color, clamp(val, 0.0, 1.0));

    gl_FragColor = vec4(color, 1.0);
}
`;

function HydrogenShader({ config, globalConfig }: { config: GradientConfig['shaders']['hydrogen'], globalConfig: GradientConfig }) {
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
        gl.shaderSource(fragmentShader, hydrogenFragShader);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Hydrogen Shader compile error:', gl.getShaderInfoLog(fragmentShader));
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
        const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
        const uN = gl.getUniformLocation(program, 'uN');
        const uL = gl.getUniformLocation(program, 'uL');
        const uM = gl.getUniformLocation(program, 'uM');
        const uZoom = gl.getUniformLocation(program, 'uZoom');
        const uContrast = gl.getUniformLocation(program, 'uContrast');
        const uGamma = gl.getUniformLocation(program, 'uGamma');
        const uHue = gl.getUniformLocation(program, 'uHue');
        const uSaturation = gl.getUniformLocation(program, 'uSaturation');
        const uColor1 = gl.getUniformLocation(program, 'uColor1');
        const uColor2 = gl.getUniformLocation(program, 'uColor2');
        
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
            gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
            
            gl.uniform1f(uN, config.n);
            gl.uniform1f(uL, config.l);
            gl.uniform1f(uM, config.m);
            gl.uniform1f(uZoom, config.zoom);
            gl.uniform1f(uContrast, config.contrast);
            gl.uniform1f(uGamma, config.gamma);
            gl.uniform1f(uHue, config.hue);
            gl.uniform1f(uSaturation, config.saturation);
            gl.uniform3f(uColor1, config.color1_r, config.color1_g, config.color1_b);
            gl.uniform3f(uColor2, config.color2_r, config.color2_g, config.color2_b);

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

const pulseFragShader = `
#ifdef GL_ES
precision mediump float;
#endif

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_speed;
uniform float u_factor;
uniform float u_hue;
uniform float u_saturation;
uniform float u_contrast;

${hueSatHelpers}

const float pi  = 3.1415926;

vec3 palette3(float t, float factor) {
    vec3 a = vec3(0.5) + 0.3 * sin(vec3(0.1, 0.3, 0.5) * factor);
    vec3 b = vec3(0.5) + 0.3 * cos(vec3(0.2, 0.4, 0.6) * factor);
    vec3 c = vec3(1.0) + 0.5 * sin(vec3(0.3, 0.7, 0.9) * factor);
    vec3 d = vec3(0.25, 0.4, 0.55) + 0.2 * cos(vec3(0.5, 0.6, 0.7) * factor);
    return a + b * cos(6.28318 * (c * t + d));
}

vec2 rotate(vec2 pos, float angle) {
    float cosAngle = cos(angle);
    float sinAngle = sin(angle);
    mat2 rotationMatrix = mat2(cosAngle, -sinAngle, sinAngle, cosAngle);
    return rotationMatrix * pos;
}

float oscillate(float time, float minVal, float maxVal) {
    float sineWave = sin(time);
    float normalizedSine = (sineWave + 1.0) / 2.0;
    return mix(minVal, maxVal, normalizedSine);
}

float hash(vec2 p) {
    return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    vec2 u = f * f * (3.0 - 2.0 * f);
    
    return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
               mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
               u.y);
}

void main(){
  vec2 uv = (gl_FragCoord.xy/u_resolution)*2.0 - 1.0;
  uv.x *= u_resolution.x/u_resolution.y;
  uv = rotate(uv, u_time * u_speed * 0.03);
  uv *= 15.0;
  float t = u_time * u_speed * 0.2;
  float r = length(uv);
  float a = atan(uv.y, uv.x);

  float N = 18.0;
  a = abs(mod(a, (pi * 2.0)/N) - pi/N);
  uv = vec2(cos(a), sin(a)) * r;
  uv *= noise(uv + u_time * oscillate(u_time * 0.01, 0.01, 0.1)) * 0.05;

  float v = 5.0 + 0.5*sin(5.0*uv.x + 10.0*uv.y + t*3.0) * (0.5 + 0.2*sin(0.5*r - t*5.0));

  vec3 col = 0.5 + 0.5*cos(pi * 2.0 * (vec3(0.9,0.2,0.1)*v + vec3(0.0,0.2,0.35)));
  
  col = palette3(-length(col) * 1.9, length(col) * u_factor);
  col = (col - 0.5) * u_contrast + 0.5;

  vec3 hsv = rgb2hsv(col);
  hsv.x += u_hue / 360.0;
  hsv.y *= u_saturation;
  col = hsv2rgb(hsv);

  gl_FragColor = vec4(col, 1.0);
}
`;

function PulseShader({ config, globalConfig }: { config: GradientConfig['shaders']['pulse'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl');
        if (!gl) return;
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, flowVertShader);
        gl.compileShader(vertexShader);
        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, pulseFragShader);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Pulse Shader compile error:', gl.getShaderInfoLog(fragmentShader));
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

        const uTimeLocation = gl.getUniformLocation(program, 'u_time');
        const uResolutionLocation = gl.getUniformLocation(program, 'u_resolution');
        const uSpeedLocation = gl.getUniformLocation(program, 'u_speed');
        const uFactorLocation = gl.getUniformLocation(program, 'u_factor');
        const uHueLocation = gl.getUniformLocation(program, 'u_hue');
        const uSaturationLocation = gl.getUniformLocation(program, 'u_saturation');
        const uContrastLocation = gl.getUniformLocation(program, 'u_contrast');

        let animationFrameId: number;
        let startTime = Date.now();
        const render = (time: number) => {
            if (!gl) return;
            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uTimeLocation, time);
            gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uSpeedLocation, config.speed);
            gl.uniform1f(uFactorLocation, config.factor);
            gl.uniform1f(uHueLocation, config.hue);
            gl.uniform1f(uSaturationLocation, config.saturation);
            gl.uniform1f(uContrastLocation, config.contrast);


            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        const renderLoop = () => {
            const time = globalConfig.paused ? globalConfig.motion / 100 * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
            else render(time);
        };
        renderLoop();
        return () => { if (animationFrameId) cancelAnimationFrame(animationFrameId); };
    }, [config, globalConfig.paused, globalConfig.motion]);
    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

const meltFragShader = `precision highp float;

uniform float uTime;
uniform vec2  uResolution;

uniform float uSpeed;
uniform float uZoom;
uniform float uDetail;
uniform float uHue;
uniform float uSaturation;
uniform float uContrast;

${hueSatHelpers}

// base field function, time‑scaled by uSpeed
float f(in vec2 p) {
  float t = uTime * uSpeed;
  return sin(p.x + sin(p.y + t * 0.2)) *
         sin(p.y * p.x * 0.1 + t * 0.2);
}

void main() {
  vec2 p = (gl_FragCoord.xy * 2.0 - uResolution) /
           min(uResolution.x, uResolution.y);

  float scale = max(0.1, uZoom);
  p *= scale;

  vec2 rz = vec2(0.0);
  float stepMul = mix(0.0, 0.1, clamp(uDetail, 0.0, 1.0));

  for (int i = 0; i < 15; i++) {
    float t0 = f(p);
    float t1 = f(p + vec2(0.05, 0.0));
    vec2 g = vec2(
      (t1 - t0),
      (f(p + vec2(0.0, 0.05)) - t0)
    ) / 0.05;
    vec2 t = vec2(-g.y, g.x);
    p += 0.05 * t + g * (0.2 + stepMul);
    rz = g;
  }

  // base color from flow field
  vec3 col = vec3(rz * 0.5 + 0.5, 1.0);

  // per‑shader hue / saturation overlay, same style as other shaders
  vec3 hsv = rgb2hsv(col);
  hsv.x += uHue / 360.0;
  hsv.y *= uSaturation;
  col = hsv2rgb(hsv);

  // per‑shader contrast
  col = (col - 0.5) * uContrast + 0.5;

  gl_FragColor = vec4(col, 1.0);
}`;

function MeltShader({
  config,
  globalConfig,
}: {
  config: GradientConfig['shaders']['melt'];
  globalConfig: GradientConfig;
}) {
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
    gl.shaderSource(fragmentShader, meltFragShader);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Melt Shader compile error:', gl.getShaderInfoLog(fragmentShader));
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    const uTimeLocation        = gl.getUniformLocation(program, 'uTime');
    const uResolutionLocation  = gl.getUniformLocation(program, 'uResolution');
    const uSpeedLocation       = gl.getUniformLocation(program, 'uSpeed');
    const uZoomLocation        = gl.getUniformLocation(program, 'uZoom');
    const uDetailLocation      = gl.getUniformLocation(program, 'uDetail');
    const uHueLocation         = gl.getUniformLocation(program, 'uHue');
    const uSaturationLocation  = gl.getUniformLocation(program, 'uSaturation');
    const uContrastLocation    = gl.getUniformLocation(program, 'uContrast');
    const uTranslationLocation = gl.getUniformLocation(program, 'u_translation');
    const uRotationLocation    = gl.getUniformLocation(program, 'u_rotation');
    const uScaleLocation       = gl.getUniformLocation(program, 'u_scale');

    let animationFrameId: number;
    let startTime = Date.now();

    const render = (time: number) => {
      if (!gl) return;

      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);

      gl.uniform1f(uTimeLocation, time);
      gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);

      gl.uniform1f(uSpeedLocation, config.speed);
      gl.uniform1f(uZoomLocation, config.zoom);
      gl.uniform1f(uDetailLocation, config.detail);
      gl.uniform1f(uHueLocation, config.hue);
      gl.uniform1f(uSaturationLocation, config.saturation);
      gl.uniform1f(uContrastLocation, config.contrast);

      gl.uniform2f(
        uTranslationLocation,
        config.transform.translateX / 100,
        -config.transform.translateY / 100
      );
      gl.uniform1f(
        uRotationLocation,
        (config.transform.rotation * Math.PI) / 180
      );
      gl.uniform1f(uScaleLocation, config.transform.scale);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const renderLoop = () => {
      const time = globalConfig.paused
        ? (globalConfig.motion / 100) * 10
        : (Date.now() - startTime) * 0.001;
      render(time);
      if (!globalConfig.paused) {
        animationFrameId = requestAnimationFrame(renderLoop);
      } else {
        render(time);
      }
    };

    renderLoop();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [config, globalConfig.paused, globalConfig.motion]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

const truchetFragShader = `precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uZoom;
uniform float uBorderThickness;
uniform float uSectors;
uniform float uHue;
uniform float uSaturation;

${hueSatHelpers}

const vec2 s = vec2(1, 1.7320508); // sqrt(3)

float calcHexDistance(vec2 p){
  p = abs(p);
  return max(dot(p, s * .5), p.x);
}

float random(vec2 co){
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

vec4 calcHexInfo(vec2 uv){
  vec4 uv2 = vec4(uv, uv - vec2(.5, 1.)) / s.xyxy;
  vec4 hexCenter = vec4(floor(uv2.x + 0.5),floor(uv2.y + 0.5),floor(uv2.z + 0.5),floor(uv2.w + 0.5));
  vec4 offset = vec4(uv - hexCenter.xy * s, uv - (hexCenter.zw + .5) * s);
  return dot(offset.xy, offset.xy) < dot(offset.zw, offset.zw) ? vec4(offset.xy, hexCenter.xy) : vec4(offset.zw, hexCenter.zw);
}

vec3 palette( float t ) {
  vec3 a = vec3(0.8, 0.5, 0.4);
  vec3 b = vec3(1.0, 1.0, 0.2);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.00, 0.25, 0.25);
  return a + b*cos( 6.28318*(c*t+d) );
}

float circle( vec2 uv, vec2 c, float r ) {
  float s = 0.01;
  float l = 0.05;
  return smoothstep(l, l + s, length(uv.xy + c) * r)+ 1. - smoothstep(l, l + s, length(uv.xy + c) * (r * 2.));
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy*2.-1.;
  uv.y *= uResolution.y/uResolution.x;
  uv *= uZoom;
  
  float PI = 3.14159;
  float sectors = uSectors;
  float halfSector = sectors * 0.5;
  float angle = atan(uv.y, uv.x);
  angle = abs(mod(angle, PI / halfSector) - PI / sectors);
  uv = vec2(cos(angle), sin(angle)) * length(uv);
  
  vec4 hexInfo = calcHexInfo(uv);
  float totalDist = calcHexDistance(hexInfo.xy) + uBorderThickness;
  float rand = random(hexInfo.zw);
  float d = 1.0;
  
  float t = 0.25 * uTime * uSpeed;
  
  int index1 = int(mod(rand * 117.0 + t, 5.0));
  int index2 = int(mod(rand * 13.0 - t, 5.0));
  int index3 = int(mod(rand * 53.0 - t, 5.0));
  int index4 = int(mod(rand * 22.0 - t, 5.0));
  
  vec2 cv = hexInfo.xy;
  
  if (index1 == 0) {d = min(d, circle(cv, vec2(0.5, 0.25), 0.15));}
  if (index1 == 1) {d = min(d, circle(cv, vec2(-0.5, 0.25), 0.15));}
  if (index1 == 2) {d = min(d, circle(cv, vec2(0., -0.6), 0.15));}
  if (index1 == 3) {d = min(d, circle(cv, vec2(0.5, -0.3), 0.15));}
  if (index1 == 4) {d = min(d, circle(cv, vec2(-0.5, -0.3), 0.15));}
  
  if (index2 == 0) {d = min(d, circle(cv, vec2(0.5, 0.25), 0.15));}
  if (index2 == 1) {d = min(d, circle(cv, vec2(-0.5, 0.25), 0.15));}
  if (index2 == 2) {d = min(d, circle(cv, vec2(0., -0.6), 0.15));}
  if (index2 == 3) {d = min(d, circle(cv, vec2(0.5, -0.3), 0.15));}
  if (index2 == 4) {d = min(d, circle(cv, vec2(-0.5, -0.3), 0.15));}
  
  if (index3 == 0) {d = min(d, circle(cv, vec2(0.5, 0.25), 0.15));}
  if (index3 == 1) {d = min(d, circle(cv, vec2(-0.5, 0.25), 0.15));}
  if (index3 == 2) {d = min(d, circle(cv, vec2(0., -0.6), 0.15));}
  if (index3 == 3) {d = min(d, circle(cv, vec2(0.5, -0.3), 0.15));}
  if (index3 == 4) {d = min(d, circle(cv, vec2(-0.5, -0.3), 0.15));}
  
  if (index4 == 0) {d = min(d, circle(cv, vec2(0.5, 0.25), 0.15));}
  if (index4 == 1) {d = min(d, circle(cv, vec2(-0.5, 0.25), 0.15));}
  if (index4 == 2) {d = min(d, circle(cv, vec2(0., -0.6), 0.15));}
  if (index4 == 3) {d = min(d, circle(cv, vec2(0.5, -0.3), 0.15));}
  if (index4 == 4) {d = min(d, circle(cv, vec2(-0.5, -0.3), 0.15));}
  
  vec3 fgColor = vec3(0., 0., 0.);
  vec3 bgColor = palette(uTime * 0.1 + float(index1) * 0.05);
  bgColor = vec3(length(bgColor)) * palette(0.5);
  vec3 color = mix(fgColor, bgColor, 1. - d);
  
  vec3 hsv = rgb2hsv(color);
  hsv.x += uHue / 360.0;
  hsv.y *= uSaturation;
  color = hsv2rgb(hsv);
  
  gl_FragColor = vec4(color, 1.);
}`;

function TruchetShader({ config, globalConfig }: { config: GradientConfig['shaders']['truchet'], globalConfig: GradientConfig }) {
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
    gl.shaderSource(fragmentShader, truchetFragShader);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Truchet Shader compile error:', gl.getShaderInfoLog(fragmentShader));
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

    // ALL 6 uniforms + transform
    const uTimeLocation = gl.getUniformLocation(program, 'uTime');
    const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
    const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
    const uZoomLocation = gl.getUniformLocation(program, 'uZoom');
    const uBorderThicknessLocation = gl.getUniformLocation(program, 'uBorderThickness');
    const uSectorsLocation = gl.getUniformLocation(program, 'uSectors');
    const uHueLocation = gl.getUniformLocation(program, 'uHue');
    const uSaturationLocation = gl.getUniformLocation(program, 'uSaturation');
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
      gl.uniform1f(uZoomLocation, config.zoom);
      gl.uniform1f(uBorderThicknessLocation, config.borderThickness);
      gl.uniform1f(uSectorsLocation, config.sectors);
      gl.uniform1f(uHueLocation, config.hue);
      gl.uniform1f(uSaturationLocation, config.saturation);

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

    return () => { 
      if(animationFrameId) cancelAnimationFrame(animationFrameId); 
    };
  }, [config, globalConfig.paused, globalConfig.motion]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

const neonPolygonFragShader = `precision highp float;

uniform vec2  uResolution; // like r
uniform float uTime;       // like t

uniform float uSpeed;      // config.speed
uniform float uSides;      // config.sides
uniform float uGlow;       // config.glow

uniform vec3  uColor1;     // config.color1_*
uniform vec3  uColor2;     // config.color2_*

uniform float uHue;        // config.hue (degrees)
uniform float uSaturation; // config.saturation

${hueSatHelpers}

float bandRadius(float i, float sides) {
  float base = 0.5 + (i - 7.0) * 0.01;
  return base;
}

void main() {
  vec2 FC = gl_FragCoord.xy;
  vec2 p = (FC * 2.0 - uResolution) / uResolution.y;

  float time = uTime * uSpeed;

  float a = atan(p.y, p.x);
  float l = length(p);

  vec3 c = vec3(0.0);

  float edgeFreq = max(uSides, 3.0);

  for (float i = 0.0; i < 15.0; i++) {
    float radius = bandRadius(i, edgeFreq);

    float m = sin(a * edgeFreq + time * (2.0 + i * 0.5) - l * 20.0) * 0.05;

    float tCol = i / 14.0;
    vec3 bandColor = mix(uColor1, uColor2, tCol);

    float dist = abs(l - radius - m + i * 0.015);
    float intensity = uGlow / dist;

    c += bandColor * 0.0008 * intensity * 150.0;
  }

  // Apply global hue/saturation like other shaders
  vec3 hsv = rgb2hsv(c);
  hsv.x += uHue / 360.0;
  hsv.y *= uSaturation;
  c = hsv2rgb(hsv);

  gl_FragColor = vec4(c, 1.0);
}`;

function NeonPolygonShader({
  config,
  globalConfig,
}: {
  config: GradientConfig['shaders']['neonPolygon'];
  globalConfig: GradientConfig;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext('webgl2', { preserveDrawingBuffer: true }) ||
      canvas.getContext('webgl', { preserveDrawingBuffer: true });
    if (!gl) {
      console.error('WebGL not supported for Neon Polygon Shader');
      return;
    }

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, commonVertShaderWithTransform);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, neonPolygonFragShader);
    gl.compileShader(fragmentShader);
    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error(
        'Neon Polygon Shader compile error:',
        gl.getShaderInfoLog(fragmentShader),
      );
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const positionAttributeLocation = gl.getAttribLocation(
      program,
      'a_position',
    );
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(
      positionAttributeLocation,
      2,
      gl.FLOAT,
      false,
      0,
      0,
    );

    const uTimeLocation = gl.getUniformLocation(program, 'uTime');
    const uResolutionLocation = gl.getUniformLocation(program, 'uResolution');
    const uSpeedLocation = gl.getUniformLocation(program, 'uSpeed');
    const uSidesLocation = gl.getUniformLocation(program, 'uSides');
    const uGlowLocation = gl.getUniformLocation(program, 'uGlow');
    const uColor1Location = gl.getUniformLocation(program, 'uColor1');
    const uColor2Location = gl.getUniformLocation(program, 'uColor2');
    const uHueLocation = gl.getUniformLocation(program, 'uHue');
    const uSaturationLocation = gl.getUniformLocation(program, 'uSaturation');

    const uTranslationLocation = gl.getUniformLocation(
      program,
      'u_translation',
    );
    const uRotationLocation = gl.getUniformLocation(program, 'u_rotation');
    const uScaleLocation = gl.getUniformLocation(program, 'u_scale');

    let animationFrameId: number;
    let startTime = Date.now();

    const render = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      gl.viewport(0, 0, canvas.width, canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTimeLocation, time);
      gl.uniform2f(uResolutionLocation, canvas.width, canvas.height);

      gl.uniform1f(uSpeedLocation, config.speed);
      gl.uniform1f(uSidesLocation, config.sides);
      gl.uniform1f(uGlowLocation, config.glow);

      gl.uniform3f(
        uColor1Location,
        config.color1_r,
        config.color1_g,
        config.color1_b,
      );
      gl.uniform3f(
        uColor2Location,
        config.color2_r,
        config.color2_g,
        config.color2_b,
      );

      gl.uniform1f(uHueLocation, config.hue);
      gl.uniform1f(uSaturationLocation, config.saturation);

      gl.uniform2f(
        uTranslationLocation,
        config.transform.translateX / 100,
        -config.transform.translateY / 100,
      );
      gl.uniform1f(
        uRotationLocation,
        (config.transform.rotation * Math.PI) / 180,
      );
      gl.uniform1f(uScaleLocation, config.transform.scale);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = () => {
      const time = globalConfig.paused
        ? (globalConfig.motion / 100) * 10
        : (Date.now() - startTime) * 0.001;
      render(time);
      if (!globalConfig.paused) {
        animationFrameId = requestAnimationFrame(loop);
      } else {
        render(time);
      }
    };

    loop();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [config, globalConfig.paused, globalConfig.motion]);

  return (
    <canvas
      ref={canvasRef}
      style={{ width: '100%', height: '100%' }}
    />
  );
}

// GLSL fragment shader
const exposedFilmFragShader = `precision highp float;

uniform float uTime;
uniform vec2  uResolution;
uniform float uSectors;
uniform float uRotationSpeed;
uniform float uHue;
uniform float uSaturation;

${hueSatHelpers}

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);

  float a = hash(i + vec2(0.0, 0.0));
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));

  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

float fbm(vec2 p) {
  float f = 0.0;
  float amp = 0.5;
  mat2 m = mat2(0.8, 0.6, -0.6, 0.8);
  for (int i = 0; i < 4; i++) {
    f += amp * noise(p);
    p = m * p * 2.0;
    amp *= 0.5;
  }
  return f;
}

void main() {
  // Normalized coordinates, centered
  vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
  uv.x *= uResolution.x / uResolution.y;

  float time = uTime;
  float sym  = max(uSectors, 1.0);
  float rot  = uRotationSpeed;

  // polar coords
  float angle  = atan(uv.y, uv.x);
  float radius = length(uv);

  // kaleidoscopic sectors
  float sector = 6.2831853 / sym;
  float a = mod(angle + time * rot, sector) - 0.5 * sector;

  // warp radius a little with fbm for richness
  vec2 p = vec2(
    radius * cos(a * sym),
    radius * sin(a * sym)
  );
  float field = fbm(p * 4.0 + time * 0.3);

  // petal shape
  float petal = cos(a * sym * 0.5);
  petal = max(petal, 0.0);

  // ring falloff
  float ring = exp(-pow(radius * 2.5, 2.0));

  float energy = field * petal * ring * 3.0;

  vec3 base = vec3(energy);
  base = clamp(base, 0.0, 1.0);

  // apply global hue/saturation like your other shaders
  vec3 hsv = rgb2hsv(base);
  hsv.x += uHue / 360.0;
  hsv.y *= uSaturation;
  vec3 color = hsv2rgb(hsv);

  gl_FragColor = vec4(color, 1.0);
}`;

type ExposedFilmConfig = GradientConfig['shaders']['exposedFilm'];

function ExposedFilmShader({
  config,
  globalConfig,
}: {
  config: ExposedFilmConfig;
  globalConfig: GradientConfig;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext('webgl2', { preserveDrawingBuffer: true }) ||
      canvas.getContext('webgl', { preserveDrawingBuffer: true });

    if (!gl) {
      console.error('WebGL not supported for Harmonic Mandala Shader');
      return;
    }

    // vertex shader
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, commonVertShaderWithTransform);
    gl.compileShader(vertexShader);

    // fragment shader
    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, exposedFilmFragShader);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error(
        'Harmonic Mandala Shader compile error:',
        gl.getShaderInfoLog(fragmentShader)
      );
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uTimeLocation        = gl.getUniformLocation(program, 'uTime');
    const uResolutionLocation  = gl.getUniformLocation(program, 'uResolution');
    const uSectorsLocation    = gl.getUniformLocation(program, 'uSectors');
    const uRotationSpeedLocation = gl.getUniformLocation(
      program,
      'uRotationSpeed'
    );
    const uHueLocation         = gl.getUniformLocation(program, 'uHue');
    const uSaturationLocation  = gl.getUniformLocation(program, 'uSaturation');
    const uTranslationLocation = gl.getUniformLocation(program, 'u_translation');
    const uRotationLocation    = gl.getUniformLocation(program, 'u_rotation');
    const uScaleLocation       = gl.getUniformLocation(program, 'u_scale');

    let animationFrameId: number;
    const startTime = Date.now();

    const render = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
      }

      gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uTimeLocation, time);
      gl.uniform2f(uResolutionLocation, gl.canvas.width, gl.canvas.height);
      gl.uniform1f(uSectorsLocation, config.sectors);
      gl.uniform1f(uRotationSpeedLocation, config.rotationSpeed);
      gl.uniform1f(uHueLocation, config.hue);
      gl.uniform1f(uSaturationLocation, config.saturation);

      gl.uniform2f(
        uTranslationLocation,
        config.transform.translateX / 100,
        -config.transform.translateY / 100
      );
      gl.uniform1f(
        uRotationLocation,
        (config.transform.rotation * Math.PI) / 180
      );
      gl.uniform1f(uScaleLocation, config.transform.scale);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const renderLoop = () => {
      const time = globalConfig.paused
        ? (globalConfig.motion / 100) * 10
        : (Date.now() - startTime) * 0.001;
      render(time);
      if (!globalConfig.paused) {
        animationFrameId = requestAnimationFrame(renderLoop);
      } else {
        render(time);
      }
    };

    renderLoop();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [config, globalConfig.paused, globalConfig.motion]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

const psychedelicGlassFragShader = `precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uSides;
uniform float uHue;
uniform float uSaturation;
uniform float uContrast;
uniform float uDensity;
uniform float uGlow;

${hueSatHelpers}

vec3 palette(float t) {
  vec3 a = vec3(0.8, 0.5, 0.4);
  vec3 b = vec3(1.0, 1.0, 0.2);
  vec3 c = vec3(1.0, 1.0, 1.0);
  vec3 d = vec3(0.00, 0.25, 0.25);
  return a + b * cos(6.28318 * (c * t + d));
}

// SDF Parallelogram (glass pane primitive)
float sdParallelogram(in vec2 p, float wi, float he, float sk) {
    vec2 e = vec2(sk, he);
    p = (p.y < 0.0) ? -p : p;
    vec2 w = p - e; 
    w.x -= clamp(w.x, -wi, wi);
    vec2 d = vec2(dot(w, w), -w.y);
    float s = p.x * e.y - p.y * e.x;
    p = (s < 0.0) ? -p : p;
    vec2 v = p - vec2(wi, 0.0);
    v -= e * clamp(dot(v, e)/dot(e, e), -1.0, 1.0);
    d = min(d, vec2(dot(v,v), wi*he - abs(s)));
    return sqrt(d.x) * sign(-d.y);
}

// Line segment made of parallelograms
float sdLine(in vec2 p) {
    float size = 0.5;
    float width = size * 0.33;
    return min(
      sdParallelogram(p + vec2(-0.12, -0.5), 0.1, size * 1.5, size * 0.75),
      sdParallelogram(p + vec2(width + size * 0.175, size * 1.52), 0.1, size, 0.)
    );
}

// DON pattern (3 parallel lines)
float sdfDon(vec2 uv) {
  float d1 = sdLine(uv);
  float d2 = sdLine(uv + vec2(0.315, 0.0));
  float d3 = sdLine(uv + vec2(0.63, 0.0));
  return min(min(d1, d2), d3);
}

void main() {
  vec2 uv = (gl_FragCoord.xy / uResolution.xy) * 2.0 - 1.0;
  uv.y *= uResolution.y / uResolution.x;

  float t = uTime * uSpeed;
  float PI = 3.14159;
  float sectors = max(uSides, 2.0);
  float halfSector = sectors * 0.5;

  // Kaleidoscopic symmetry
  float angle = atan(uv.y, uv.x);
  angle = abs(mod(angle, PI / halfSector) - PI / sectors);
  uv = vec2(cos(angle), sin(angle)) * length(uv);

  // Pattern grid animation
  vec2 puv = uv + vec2(0.1, 0.05);
  float ind = floor((uv.y + uv.x) * 6.0) + t * 0.1;
  float g = mod(((uv.y + uv.x) * 6.0), 1.0);
  
  uv = vec2(uv.x + ind * 0.285, uv.y + uv.x) + t * 0.1;
  uv *= uDensity;
  uv = mod(uv, 2.5) - 1.25;
  
  puv = vec2(puv.x + ind * 0.285, puv.y + puv.x) + t * 0.1;
  puv *= uDensity;
  puv = mod(puv, 2.5) - 1.25;

  // SDF distance fields
  float d = sdfDon(uv);
  float p = sdfDon(puv);
  d = smoothstep(0.0, 0.02, d);
  p = smoothstep(0.0, 0.01, p);

  // Psychedelic palette with glass-like glow
  vec3 fgColor = palette(-t + ind * 0.1) * g * 1.579 * uGlow;
  vec3 bgColor = palette(-t + ind * 0.1) * g * 0.1;
  if (g > 0.95) {
    bgColor = mix(fgColor, palette(-t + uv.x + uv.y), 0.5);
  }

  vec3 color = mix(fgColor, bgColor, d);
  color = mix(color * 2.0, color, p);
  
  // Glass-like contrast + HSV adjustment
  color = (color - 0.5) * uContrast + 0.5;
  vec3 hsv = rgb2hsv(color);
  hsv.x += uHue / 360.0;
  hsv.y *= uSaturation;
  color = hsv2rgb(hsv);

  gl_FragColor = vec4(color, 1.0);
}`;

function PsychedelicGlassShader({ config, globalConfig }: {
  config: GradientConfig['shaders']['psychedelicGlass'],
  globalConfig: GradientConfig
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true }) ||
               canvas.getContext('webgl', { preserveDrawingBuffer: true });
    if (!gl) {
      console.error('WebGL not supported for Psychedelic Glass');
      return;
    }

    // Vertex shader (reuse your common one)
    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, commonVertShaderWithTransform);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, psychedelicGlassFragShader);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Psychedelic Glass compile error:', gl.getShaderInfoLog(fragmentShader));
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    // Quad setup
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1,-1,1,-1,-1,1,1,1]), gl.STATIC_DRAW);
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    // Uniform locations
    const uniforms = {
      uTime: gl.getUniformLocation(program, 'uTime'),
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uSpeed: gl.getUniformLocation(program, 'uSpeed'),
      uSides: gl.getUniformLocation(program, 'uSides'),
      uHue: gl.getUniformLocation(program, 'uHue'),
      uSaturation: gl.getUniformLocation(program, 'uSaturation'),
      uContrast: gl.getUniformLocation(program, 'uContrast'),
      uDensity: gl.getUniformLocation(program, 'uDensity'),
      uGlow: gl.getUniformLocation(program, 'uGlow'),
      u_translation: gl.getUniformLocation(program, 'u_translation'),
      u_rotation: gl.getUniformLocation(program, 'u_rotation'),
      u_scale: gl.getUniformLocation(program, 'u_scale')
    };

    let startTime = Date.now();
    let animationFrameId: number;

    const render = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uniforms.uTime!, time);
      gl.uniform2f(uniforms.uResolution!, canvas.width, canvas.height);
      gl.uniform1f(uniforms.uSpeed!, config.speed);
      gl.uniform1f(uniforms.uSides!, config.sides);
      gl.uniform1f(uniforms.uHue!, config.hue);
      gl.uniform1f(uniforms.uSaturation!, config.saturation);
      gl.uniform1f(uniforms.uContrast!, config.contrast);
      gl.uniform1f(uniforms.uDensity!, config.density);
      gl.uniform1f(uniforms.uGlow!, config.glow);
      gl.uniform2f(uniforms.u_translation!, 
        config.transform.translateX / 100, 
        -config.transform.translateY / 100
      );
      gl.uniform1f(uniforms.u_rotation!, (config.transform.rotation * Math.PI) / 180);
      gl.uniform1f(uniforms.u_scale!, config.transform.scale);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = () => {
      const elapsed = globalConfig.paused 
        ? (globalConfig.motion / 100) * 10 
        : (Date.now() - startTime) * 0.001;
      render(elapsed);
      if (!globalConfig.paused) {
        animationFrameId = requestAnimationFrame(loop);
      }
    };

    loop();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [config, globalConfig.paused, globalConfig.motion]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

const solarWhirlsFragShader = `precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uHue;
uniform float uSaturation;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

${hueSatHelpers}

#define PI 3.14159

float hash1( float n ) { return fract(sin(n)*43758.5453); }
vec2  hash2( vec2  p ) {
  p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );
  return fract(sin(p)*43758.5453);
}

vec4 voronoi( in vec2 x, float w, float time )
{
  vec2 n = floor( x );
  vec2 f = fract( x );

  vec4 m = vec4( 8.0, 0.0, 0.0, 0.0 );
  for( int j=-2; j<=2; j++ )
  for( int i=-2; i<=2; i++ )
  {
    vec2 g = vec2( float(i),float(j) );
    vec2 o = hash2( n + g );

    // animate
    o = 0.5 + 0.5*sin( time + 6.2831*o );

    // distance to cell
    float d = length(g - f + o);

    // cell color
    vec3 col = 0.5 + 0.5*sin(
      hash1(dot(n+g,vec2(7.0,113.0)))*2.5 +
      3.5 +
      vec3(2.0,3.0,0.0)
    );
    col = col * col;

    // smooth min
    float h = smoothstep( -1.0, 1.0, (m.x-d)/w );
    m.x   = mix( m.x,     d, h ) - h*(1.0-h)*w/(1.0+3.0*w);
    m.yzw = mix( m.yzw, col, h ) - h*(1.0-h)*w/(1.0+3.0*w);
  }

  return m;
}

// 3‑stop palette: color1 -> color2 -> color3
vec3 paletteSolar(float t) {
  t = clamp(t, 0.0, 1.0);
  if (t < 0.5) {
    float k = t / 0.5;
    return mix(uColor1, uColor2, k);
  } else {
    float k = (t - 0.5) / 0.5;
    return mix(uColor2, uColor3, k);
  }
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy * 2.0 - 1.0;
  uv.y *= uResolution.y / uResolution.x;

  float t = uTime * 0.1 * uSpeed;

  vec4 v = voronoi(2.0 * uv + t, 1.0, t);
  v = voronoi(3.0 * v.xy, 1.0, t);
  v = voronoi(3.0 * v.xy, 1.0, t);
  v = voronoi(3.0 * v.xy, 1.0, t);

  float d = 0.0;
  d = max(v.x, d);
  d = smoothstep(0.1, 0.5 + v.y * 0.1, d);

  vec3 fgColor = paletteSolar(v.x);
  vec3 bgColor = paletteSolar(v.y);

  vec3 color = mix(bgColor, fgColor, d);

  vec3 hsv = rgb2hsv(color);
  hsv.x += uHue / 360.0;
  hsv.y *= uSaturation;
  color = hsv2rgb(hsv);

  gl_FragColor = vec4(color, 1.0);
}`;

function SolarWhirlsShader({
  config,
  globalConfig,
}: {
  config: GradientConfig['shaders']['solarWhirls'];
  globalConfig: GradientConfig;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const configString = useMemo(() => JSON.stringify(config), [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext('webgl2', { preserveDrawingBuffer: true }) ||
      canvas.getContext('webgl', { preserveDrawingBuffer: true });
    if (!gl) {
      console.error('WebGL not supported for Solar Whirls');
      return;
    }

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, commonVertShaderWithTransform);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, solarWhirlsFragShader);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Solar Whirls compile error:', gl.getShaderInfoLog(fragmentShader));
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      uTime: gl.getUniformLocation(program, 'uTime'),
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uSpeed: gl.getUniformLocation(program, 'uSpeed'),
      uHue: gl.getUniformLocation(program, 'uHue'),
      uSaturation: gl.getUniformLocation(program, 'uSaturation'),
      uColor1: gl.getUniformLocation(program, 'uColor1'),
      uColor2: gl.getUniformLocation(program, 'uColor2'),
      uColor3: gl.getUniformLocation(program, 'uColor3'),
      u_translation: gl.getUniformLocation(program, 'u_translation'),
      u_rotation: gl.getUniformLocation(program, 'u_rotation'),
      u_scale: gl.getUniformLocation(program, 'u_scale'),
    };

    let startTime = Date.now();
    let animationFrameId: number;

    const render = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uniforms.uTime!, time);
      gl.uniform2f(uniforms.uResolution!, canvas.width, canvas.height);
      gl.uniform1f(uniforms.uSpeed!, config.speed);
      gl.uniform1f(uniforms.uHue!, config.hue);
      gl.uniform1f(uniforms.uSaturation!, config.saturation);

      gl.uniform3f(
        uniforms.uColor1!,
        config.color1_r,
        config.color1_g,
        config.color1_b
      );
      gl.uniform3f(
        uniforms.uColor2!,
        config.color2_r,
        config.color2_g,
        config.color2_b
      );
      gl.uniform3f(
        uniforms.uColor3!,
        config.color3_r,
        config.color3_g,
        config.color3_b
      );

      gl.uniform2f(
        uniforms.u_translation!,
        config.transform.translateX / 100,
        -config.transform.translateY / 100
      );
      gl.uniform1f(
        uniforms.u_rotation!,
        (config.transform.rotation * Math.PI) / 180
      );
      gl.uniform1f(uniforms.u_scale!, config.transform.scale);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = () => {
      const elapsed = globalConfig.paused
        ? (globalConfig.motion / 100) * 10
        : (Date.now() - startTime) * 0.001;
      render(elapsed);
      if (!globalConfig.paused) {
        animationFrameId = requestAnimationFrame(loop);
      } else {
        render(elapsed);
      }
    };

    loop();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [configString, globalConfig.paused, globalConfig.motion]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

const chargedCellsFragShader = `precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uScale;
uniform float uHue;
uniform float uSaturation;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

${hueSatHelpers}

#define PI 3.14159

float hash1( float n ) { return fract(sin(n)*43758.5453); }
vec2  hash2( vec2  p ) {
  p = vec2( dot(p,vec2(127.1,311.7)), dot(p,vec2(269.5,183.3)) );
  return fract(sin(p)*43758.5453);
}

vec4 voronoi( in vec2 x, float w )
{
  vec2 n = floor( x );
  vec2 f = fract( x );

  vec4 m = vec4( 8.0, 0.0, 0.0, 0.0 );
  for( int j=-2; j<=2; j++ )
  for( int i=-2; i<=2; i++ )
  {
    vec2 g = vec2( float(i),float(j) );
    vec2 o = hash2( n + g );

    // animate
    o = 0.5 + 0.5*sin( uTime + 6.2831*o );

    // distance to cell
    float d = length(g - f + o);

    // cell color
    vec3 col = 0.5 + 0.5*sin(
      hash1(dot(n+g,vec2(7.0,113.0)))*2.5 +
      3.5 +
      vec3(2.0,3.0,0.0)
    );
    col = col * col;

    // smooth min
    float h = smoothstep( -1.0, 1.0, (m.x-d)/w );
    m.x   = mix( m.x,     d, h ) - h*(1.0-h)*w/(1.0+3.0*w);
    m.yzw = mix( m.yzw, col, h ) - h*(1.0-h)*w/(1.0+3.0*w);
  }

  return m;
}

float random(vec2 co)
{
  return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

float sdfGrid(vec2 uv, float r) {
  vec2 c = uv * 4.0 * r;
  float angle = r;
  float thickness = 0.5 + r;
  float one = abs(0.5 - mod(c.y + cos(angle) * c.x, 1.0)) * thickness;
  float two = abs(0.5 - mod(c.y - cos(angle) * c.x, 1.0)) * thickness;
  return min(one, two);
}

// 3‑stop palette: color1 -> color2 -> color3
vec3 paletteCharged(float t) {
  t = clamp(t, 0.0, 1.0);
  if (t < 0.5) {
    float k = t / 0.5;
    return mix(uColor1, uColor2, k);
  } else {
    float k = (t - 0.5) / 0.5;
    return mix(uColor2, uColor3, k);
  }
}

void main() {
  vec2 uv = gl_FragCoord.xy / uResolution.xy * 2.0 - 1.0;
  uv.y *= uResolution.y / uResolution.x;

  float t = sin(uTime * 0.1 * uSpeed);

  vec4 v = voronoi(uScale * uv, 0.5);
  float r = pow(v.y, 0.5);

  float d = 0.0;
  d = max(sdfGrid(uv - t, r), d);
  d = max(sdfGrid(uv + t, 1.0 - r), -d);
  d = smoothstep(0.1, 0.15 + r * 0.1, d);

  vec3 fgColor = paletteCharged(0.6 * r);
  vec3 bgColor = paletteCharged(0.1 * r);

  // Add a slight edge accent using d
  vec3 edgeColor = paletteCharged(clamp(r + d * 0.5, 0.0, 1.0));
  vec3 color = mix(fgColor, bgColor, d);
  color = mix(color, edgeColor, 0.35);

  vec3 hsv = rgb2hsv(color);
  hsv.x += uHue / 360.0;
  hsv.y *= uSaturation;
  color = hsv2rgb(hsv);

  gl_FragColor = vec4(color, 1.0);
}`;


function ChargedCellsShader({
  config,
  globalConfig,
}: {
  config: GradientConfig['shaders']['chargedCells'];
  globalConfig: GradientConfig;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const configString = useMemo(() => JSON.stringify(config), [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext('webgl2', { preserveDrawingBuffer: true }) ||
      canvas.getContext('webgl', { preserveDrawingBuffer: true });
    if (!gl) {
      console.error('WebGL not supported for Charged Cells');
      return;
    }

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, commonVertShaderWithTransform);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, chargedCellsFragShader);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Charged Cells compile error:', gl.getShaderInfoLog(fragmentShader));
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );
    const positionLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionLocation);
    gl.vertexAttribPointer(positionLocation, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      uTime: gl.getUniformLocation(program, 'uTime'),
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uSpeed: gl.getUniformLocation(program, 'uSpeed'),
      uScale: gl.getUniformLocation(program, 'uScale'),
      uHue: gl.getUniformLocation(program, 'uHue'),
      uSaturation: gl.getUniformLocation(program, 'uSaturation'),
      uColor1: gl.getUniformLocation(program, 'uColor1'),
      uColor2: gl.getUniformLocation(program, 'uColor2'),
      uColor3: gl.getUniformLocation(program, 'uColor3'),
      u_translation: gl.getUniformLocation(program, 'u_translation'),
      u_rotation: gl.getUniformLocation(program, 'u_rotation'),
      u_scale: gl.getUniformLocation(program, 'u_scale'),
    };

    let startTime = Date.now();
    let animationFrameId: number;

    const render = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      if (canvas.width !== rect.width || canvas.height !== rect.height) {
        canvas.width = rect.width;
        canvas.height = rect.height;
        gl.viewport(0, 0, canvas.width, canvas.height);
      }

      gl.clearColor(0, 0, 0, 1);
      gl.clear(gl.COLOR_BUFFER_BIT);

      gl.uniform1f(uniforms.uTime!, time);
      gl.uniform2f(uniforms.uResolution!, canvas.width, canvas.height);
      gl.uniform1f(uniforms.uSpeed!, config.speed);
      gl.uniform1f(uniforms.uScale!, config.scale);
      gl.uniform1f(uniforms.uHue!, config.hue);
      gl.uniform1f(uniforms.uSaturation!, config.saturation);

      gl.uniform3f(
        uniforms.uColor1!,
        config.color1_r,
        config.color1_g,
        config.color1_b
      );
      gl.uniform3f(
        uniforms.uColor2!,
        config.color2_r,
        config.color2_g,
        config.color2_b
      );
      gl.uniform3f(
        uniforms.uColor3!,
        config.color3_r,
        config.color3_g,
        config.color3_b
      );

      gl.uniform2f(
        uniforms.u_translation!,
        config.transform.translateX / 100,
        -config.transform.translateY / 100
      );
      gl.uniform1f(
        uniforms.u_rotation!,
        (config.transform.rotation * Math.PI) / 180
      );
      gl.uniform1f(uniforms.u_scale!, config.transform.scale);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const loop = () => {
      const elapsed = globalConfig.paused
        ? (globalConfig.motion / 100) * 10
        : (Date.now() - startTime) * 0.001;
      render(elapsed);
      if (!globalConfig.paused) {
        animationFrameId = requestAnimationFrame(loop);
      } else {
        render(elapsed);
      }
    };

    loop();

    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [configString, globalConfig.paused, globalConfig.motion]);

  return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

const refractedWaveFragShader = `#version 300 es
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uSoftness;
uniform float uIntensity;
uniform float uNoise;
uniform float uShape;
uniform vec4 uColorBack;
uniform vec4 uColors[7];
uniform float uColorCount;

out vec4 fragColor;

// Procedural Simplex, Noise, and Shapes built out from your paper-design repository code
float hash11(float p) {
    p = fract(p * .1031);
    p *= p + 33.33;
    p *= p + p;
    return fract(p);
}

void main() {
    vec2 shape_uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y;
    float t = 0.1 * uTime * uSpeed;
    float shape = 0.0;

    // Simplified procedural generation engine variant for browser standalone compatibility
    if (uShape < 1.5) {
        float wave = cos(0.5 * shape_uv.x - 4. * t) * sin(1.5 * shape_uv.x + 2. * t);
        shape = 1. - smoothstep(-1., 1., shape_uv.y + wave);
    } else if (uShape < 2.5) {
        shape = sin(shape_uv.x * 5.0) * cos(shape_uv.y * 5.0 - t);
        shape = pow(abs(shape), 4.0);
    } else {
        // Fallback procedural blob layer warp
        float dist = length(shape_uv);
        shape = sin(dist * 4.0 - t * 5.0) * 0.5 + 0.5;
    }

    // Swirl/Warp noise distortion injected using uIntensity
    float warpNoise = hash11(gl_FragCoord.x * uIntensity + gl_FragCoord.y);
    shape += uIntensity * 0.2 * (warpNoise - 0.5);
    shape += uNoise * 0.1 * (hash11(gl_FragCoord.y + t) - 0.5);

    shape = clamp(shape, 0.0, 1.0);
    float mixer = shape * (uColorCount - 1.0);
    
    vec4 gradient = uColors[0];
    for (int i = 1; i < 7; i++) {
        if (float(i) > uColorCount - 1.0) break;
        float localT = clamp(mixer - float(i - 1), 0.0, 1.0);
        localT = smoothstep(0.5 - 0.5 * uSoftness, 0.5 + 0.5 * uSoftness, localT);
        gradient = mix(gradient, uColors[i], localT);
    }

    fragColor = mix(uColorBack, gradient, gradient.a);
}
`;

function RefractedWaveShader({ config, globalConfig }: { config: GradientConfig['shaders']['refractedWave'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl2'); // Require WebGL2 context for ES 300 shaders
        if (!gl) return;

        // Compile logic blocks matching your framework style
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, `#version 300 es
            in vec4 a_position;
            void main() { gl_Position = a_position; }
        `);
        gl.compileShader(vertexShader);

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, refractedWaveFragShader);
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

        // Uniform pointers mapping
        const uniforms = {
            uTime: gl.getUniformLocation(program, 'uTime'),
            uResolution: gl.getUniformLocation(program, 'uResolution'),
            uSpeed: gl.getUniformLocation(program, 'uSpeed'),
            uSoftness: gl.getUniformLocation(program, 'uSoftness'),
            uIntensity: gl.getUniformLocation(program, 'uIntensity'),
            uNoise: gl.getUniformLocation(program, 'uNoise'),
            uShape: gl.getUniformLocation(program, 'uShape'),
            uColorBack: gl.getUniformLocation(program, 'uColorBack'),
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
            gl.uniform1f(uniforms.uSoftness, config.softness);
            gl.uniform1f(uniforms.uIntensity, config.intensity);
            gl.uniform1f(uniforms.uNoise, config.noise);
            gl.uniform1f(uniforms.uShape, config.shape);
            
            gl.uniform4f(uniforms.uColorBack, 0, 0, 0, 0);

            // Bind individual dynamic gradient color channels sequentially inside the uniform arrays block
            config.colors.forEach((color, index) => {
                const loc = gl.getUniformLocation(program, `uColors[${index}]`);
                const rgba = hexToRgbaVec(color);
                gl.uniform4f(loc, rgba[0], rgba[1], rgba[2], rgba[3]);
            });

            gl.uniform1f(gl.getUniformLocation(program, 'uColorCount'), config.colorCount);
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

function SwirlShader({ config, globalConfig }: { config: GradientConfig['shaders']['swirl'], globalConfig: GradientConfig }) {
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

export const spiralFragmentShader = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;

// Own Uniforms
uniform vec4 u_colorBack;
uniform vec4 u_colorFront;
uniform float u_density;
uniform float u_distortion;
uniform float u_strokeWidth;
uniform float u_strokeTaper;
uniform float u_noiseFrequency;
uniform float u_noise;
uniform float u_softness;

// Sizing Uniforms
uniform int u_fit;
uniform float u_scale;
uniform float u_rotation;
uniform float u_offsetX;
uniform float u_offsetY;
uniform float u_originX;
uniform float u_originY;
uniform float u_worldWidth;
uniform float u_worldHeight;

out vec4 fragColor;

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v -   i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m; m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x  = a0.x * x0.x  + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

void main() {
    vec2 st = gl_FragCoord.xy / uResolution.xy;
    float aspect = uResolution.x / uResolution.y;
    
    vec2 uv = st - vec2(u_originX, u_originY);
    uv.x *= aspect;

    float cosR = cos(u_rotation);
    float sinR = sin(u_rotation);
    uv = vec2(uv.x * cosR - uv.y * sinR, uv.x * sinR + uv.y * cosR);
    
    uv /= max(0.001, u_scale);
    uv -= vec2(u_offsetX, u_offsetY);

    float radius = length(uv);
    float angle = atan(uv.y, uv.x);
    
    if (u_noise > 0.0) {
        vec2 noiseUV = uv * u_noiseFrequency + vec2(0.0, uTime * 0.2);
        float n = snoise(noiseUV);
        radius += n * u_noise * 0.15;
        angle += n * u_noise * 0.25;
    }
    
    float spiralValue = angle / 6.28318530718 + (radius * u_density) - uTime;
    
    if (u_distortion > 0.0) {
        spiralValue += sin(radius * 8.0 - uTime) * u_distortion * 0.1;
    }
    
    float pattern = fract(spiralValue);
    float currentStrokeWidth = u_strokeWidth;
    if (u_strokeTaper > 0.0) {
        currentStrokeWidth *= mix(1.0, clamp(radius, 0.0, 1.0), u_strokeTaper);
    }
    
    float halfWidth = currentStrokeWidth * 0.5;
    float edgeDist = abs(pattern - 0.5);
    
    // Stroke Cap logic entirely omitted since it's hardcoded to 0.0
    
    float aaRange = fwidth(edgeDist) + u_softness * 0.1;
    float mask = smoothstep(halfWidth + aaRange, halfWidth - aaRange, edgeDist);
    
    vec4 backColor = u_colorBack;
    vec4 frontColor = u_colorFront;
    backColor.rgb *= backColor.a;
    frontColor.rgb *= frontColor.a;
    
    fragColor = mix(backColor, frontColor, mask);
}`;

function SpiralShader({ config, globalConfig }: { config: any, globalConfig: any }) {
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
    gl.shaderSource(fragmentShader, spiralFragmentShader);
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
      u_colorBack: gl.getUniformLocation(program, 'u_colorBack'),
      u_colorFront: gl.getUniformLocation(program, 'u_colorFront'),
      u_density: gl.getUniformLocation(program, 'u_density'),
      u_distortion: gl.getUniformLocation(program, 'u_distortion'),
      u_strokeWidth: gl.getUniformLocation(program, 'u_strokeWidth'),
      u_strokeTaper: gl.getUniformLocation(program, 'u_strokeTaper'),
      u_noise: gl.getUniformLocation(program, 'u_noise'),
      u_noiseFrequency: gl.getUniformLocation(program, 'u_noiseFrequency'),
      u_softness: gl.getUniformLocation(program, 'u_softness'),
      // Sizing Uniforms
      u_fit: gl.getUniformLocation(program, 'u_fit'),
      u_scale: gl.getUniformLocation(program, 'u_scale'),
      u_rotation: gl.getUniformLocation(program, 'u_rotation'),
      u_offsetX: gl.getUniformLocation(program, 'u_offsetX'),
      u_offsetY: gl.getUniformLocation(program, 'u_offsetY'),
      u_originX: gl.getUniformLocation(program, 'u_originX'),
      u_originY: gl.getUniformLocation(program, 'u_originY'),
      u_worldWidth: gl.getUniformLocation(program, 'u_worldWidth'),
      u_worldHeight: gl.getUniformLocation(program, 'u_worldHeight'),
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
      gl.uniform2f(uniforms.uResolution, gl.canvas.width, gl.canvas.height);
      
      const currentSpeed = config.speed ?? 1.0;
      gl.uniform1f(uniforms.uTime, time * currentSpeed);

      const bgRgba = hexToRgbaVec(config.colorBack || '#001429');
      gl.uniform4f(uniforms.u_colorBack, bgRgba[0], bgRgba[1], bgRgba[2], bgRgba[3]);

      const fgRgba = hexToRgbaVec(config.colorFront || '#79D1FF');
      gl.uniform4f(uniforms.u_colorFront, fgRgba[0], fgRgba[1], fgRgba[2], fgRgba[3]);

      gl.uniform1f(uniforms.u_density, config.density ?? 1.0);
      gl.uniform1f(uniforms.u_distortion, config.distortion ?? 0.0);
      gl.uniform1f(uniforms.u_strokeWidth, config.strokeWidth ?? 0.5);
      gl.uniform1f(uniforms.u_strokeTaper, config.strokeTaper ?? 0.0);
      gl.uniform1f(uniforms.u_noise, config.noise ?? 0.0);
      gl.uniform1f(uniforms.u_noiseFrequency, config.noiseFrequency ?? 0.0);
      gl.uniform1f(uniforms.u_softness, config.softness ?? 0.0);

      gl.uniform1i(uniforms.u_fit, 0);
      gl.uniform1f(uniforms.u_scale, config.scale ?? 1.0);
      gl.uniform1f(uniforms.u_rotation, config.rotation ?? 0.0);
      gl.uniform1f(uniforms.u_offsetX, config.offsetX ?? 0.0);
      gl.uniform1f(uniforms.u_offsetY, config.offsetY ?? 0.0);
      gl.uniform1f(uniforms.u_originX, config.originX ?? 0.5);
      gl.uniform1f(uniforms.u_originY, config.originY ?? 0.5);
      gl.uniform1f(uniforms.u_worldWidth, gl.canvas.width);
      gl.uniform1f(uniforms.u_worldHeight, gl.canvas.height);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const renderLoop = () => {
      const time = globalConfig.paused ? (globalConfig.motion / 100) * 10 : (Date.now() - startTime) * 0.001;
      render(time);
      if (!globalConfig.paused) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    renderLoop();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [config, globalConfig.paused, globalConfig.motion]);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />;
}

export const neuralNoiseFragmentShader = `#version 300 es
precision mediump float;

uniform float u_time;
uniform float u_ratio;

// Global App Transform Scale used directly instead of custom internal shader scale
uniform float u_scale; 

// Customizable Parameters
uniform vec4 u_baseColor;
uniform float u_hue;
uniform float u_saturation;
uniform int u_iterations;
uniform float u_complexity;
uniform float u_distance;
uniform float u_brightness;
uniform float u_contrast;
uniform float u_colorShiftSpeed;
uniform float u_vignette;

in vec2 vUv;
out vec4 fragColor;

// Shared Hue Saturation Color Utilities
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

vec2 rotate(vec2 uv, float th) {
    return mat2(cos(th), sin(th), -sin(th), cos(th)) * uv;
}

float neuro_shape(vec2 uv, float t, float initialScale) {
    vec2 sine_acc = vec2(0.);
    vec2 res = vec2(0.);
    float currentScale = initialScale;
    
    for (int j = 0; j < 32; j++) {
        if (j >= u_iterations) break;
        uv = rotate(uv, 1.);
        sine_acc = rotate(sine_acc, 1.);
        vec2 layer = uv * currentScale + float(j) + sine_acc - t;
        sine_acc += sin(layer) + u_complexity;
        res += (.5 + .5 * cos(layer)) / currentScale;
        currentScale *= u_distance;
    }
    return res.x + res.y;
}

void main() {
    vec2 uv = .5 * vUv;
    uv.x *= u_ratio;
    
    float t = .001 * u_time;
    
    // Scale tracking mapped straight out of app defaults layout rules
    float initialScale = 8.0 / max(0.001, u_scale);
    
    float noise = neuro_shape(uv, t, initialScale);
    noise = u_brightness * pow(noise, 3.);
    noise += pow(noise, 10.);
    noise = max(.0, noise - u_contrast);
    noise *= (1. - u_vignette * length(vUv - .5));
    
    // Process color shift using base color input as origin point
    vec3 baseHsv = rgb2hsv(u_baseColor.rgb);
    
    // Metamorphose the hue dynamically over time from the baseline origin index
    float dynamicHue = baseHsv.x + (u_hue / 360.0) + (t * u_colorShiftSpeed * 0.1);
    float targetSat = baseHsv.y * u_saturation;
    
    vec3 finalColor = hsv2rgb(vec3(fract(dynamicHue), targetSat, baseHsv.z));
    finalColor = finalColor * noise * u_baseColor.a;
    
    fragColor = vec4(finalColor, noise * u_baseColor.a);
}`;

function NeuralNoiseShader({ config, globalConfig }: { config: any, globalConfig: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, `#version 300 es
      precision mediump float;
      in vec4 a_position;
      out vec2 vUv;
      void main() {
        vUv = .5 * (a_position.xy + 1.);
        gl_Position = vec4(a_position.xy, 0.0, 1.0);
      }`);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, neuralNoiseFragmentShader);
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
      u_time: gl.getUniformLocation(program, 'u_time'),
      u_ratio: gl.getUniformLocation(program, 'u_ratio'),
      u_scale: gl.getUniformLocation(program, 'u_scale'),
      u_baseColor: gl.getUniformLocation(program, 'u_baseColor'),
      u_hue: gl.getUniformLocation(program, 'u_hue'),
      u_saturation: gl.getUniformLocation(program, 'u_saturation'),
      u_iterations: gl.getUniformLocation(program, 'u_iterations'),
      u_complexity: gl.getUniformLocation(program, 'u_complexity'),
      u_distance: gl.getUniformLocation(program, 'u_distance'),
      u_brightness: gl.getUniformLocation(program, 'u_brightness'),
      u_contrast: gl.getUniformLocation(program, 'u_contrast'),
      u_colorShiftSpeed: gl.getUniformLocation(program, 'u_colorShiftSpeed'),
      u_vignette: gl.getUniformLocation(program, 'u_vignette'),
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
      gl.uniform1f(uniforms.u_ratio, gl.canvas.width / gl.canvas.height);
      gl.uniform1f(uniforms.u_time, time);

      // Map global uniform transforms
      gl.uniform1f(uniforms.u_scale, config.transform?.scale ?? 1.0);

      const parsedColor = hexToRgbaVec(config.color || '#00E5FF');
      gl.uniform4f(uniforms.u_baseColor, parsedColor[0], parsedColor[1], parsedColor[2], parsedColor[3]);

      gl.uniform1f(uniforms.u_hue, config.hue ?? 0.0);
      gl.uniform1f(uniforms.u_saturation, config.saturation ?? 1.0);
      gl.uniform1i(uniforms.u_iterations, config.iterations ?? 15);
      gl.uniform1f(uniforms.u_complexity, config.complexity ?? 2.4);
      gl.uniform1f(uniforms.u_distance, config.distance ?? 1.2);
      gl.uniform1f(uniforms.u_brightness, config.brightness ?? 1.2);
      gl.uniform1f(uniforms.u_contrast, config.contrast ?? 0.5);
      gl.uniform1f(uniforms.u_colorShiftSpeed, config.colorShiftSpeed ?? 1.0);
      gl.uniform1f(uniforms.u_vignette, config.vignette ?? 1.0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const renderLoop = () => {
      const speedModifier = config.speed ?? 1.0;
      const time = globalConfig.paused 
        ? (globalConfig.motion / 100) * 10000 
        : (Date.now() - startTime) * speedModifier;
        
      render(time);
      if (!globalConfig.paused) {
        animationFrameId = requestAnimationFrame(renderLoop);
      }
    };

    renderLoop();
    
    return () => {
      cancelAnimationFrame(animationFrameId);
      gl.deleteProgram(program);
      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);
      gl.deleteBuffer(positionBuffer);
    };
  }, [config, globalConfig.paused, globalConfig.motion]);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />;
}

const interstellarVertShader = `#version 300 es
in vec3 position;
void main() {
    gl_Position = vec4(position, 1.0);
}`;

const interstellarFragShader = `#version 300 es
precision highp float;
uniform vec3 iResolution;
uniform float iTime;
uniform int u_renderPasses;
uniform float u_sceneTimeScale;
uniform float u_grainIntensity;
uniform float u_globalLuminance;
uniform float u_stepPrecision;
uniform float u_rayIterations;
uniform float u_surfaceSolidity;
uniform float u_camPosX;
uniform float u_camPosY;
uniform float u_camPitch;
uniform float u_camFov;
uniform float u_camShiftX;
uniform float u_camShiftY;
out vec4 outColor;

mat2 calcRotation(float theta) {
    float sine = sin(theta);
    float cosine = cos(theta);
    return mat2(cosine, -sine, sine, cosine);
}

vec3 applyCinematicGrade(vec3 rawColor) {
    mat3 colorSpaceA = mat3(
        0.59719, 0.07600, 0.02840,
        0.35458, 0.90834, 0.13383,
        0.04823, 0.01566, 0.83777
    );
    mat3 colorSpaceB = mat3(
        1.60475, -0.10208, -0.00327,
        -0.53108, 1.10813, -0.07276,
        -0.07367, -0.00605, 1.07602
    );
    vec3 graded = colorSpaceA * rawColor;
    vec3 numerator = graded * (graded + 0.0945786) - 0.000090537;
    vec3 denominator = graded * (0.783729 * graded + 0.4329510) + 0.238081;
    return colorSpaceB * (numerator / denominator);
}

float computeStructuralDensity(vec3 pos) {
    const float phaseShift = 0.228033988;
    const mat3 structuralBasis = mat3(
        0.388535087,  0.054921382, -0.743402928,
        0.441955127,  4.336973341,  0.258518454,
        0.272087367,  0.174042493, -0.021246185
    );
    return dot(cos(structuralBasis * pos), sin(phaseShift * pos * structuralBasis));
}

float getFilmGrain(vec3 seed3D) {
    seed3D = fract(seed3D * 0.1031);
    seed3D += dot(seed3D, seed3D.zyx + 31.32);
    return fract((seed3D.x + seed3D.y) * seed3D.z);
}

void mainImage(out vec4 fragColor, in vec2 fragCoord) {
    vec3 finalImage = vec3(0.0);
    float globalTime = iTime * u_sceneTimeScale;
    for(int passX = 0; passX < 4; passX++) {
        if (passX >= u_renderPasses) break;
        for(int passY = 0; passY < 4; passY++) {
            if (passY >= u_renderPasses) break;
            vec2 pixelOffset = (vec2(float(passX), float(passY)) + 0.5) / float(u_renderPasses) - 0.5;
            vec2 uv = fragCoord + pixelOffset;
            vec3 rayOrigin = vec3(u_camPosX, u_camPosY, globalTime);
            vec3 lightAccumulator = vec3(0.0);
            vec3 viewDir = normalize(vec3(u_camFov * uv - iResolution.xy * vec2(u_camShiftX, u_camShiftY), iResolution.y));
            viewDir.yz = calcRotation(u_camPitch) * viewDir.yz;
            float stepDistance;
            for(float iter = 0.0; iter < 100.0; iter += 1.0) {
                if (iter >= u_rayIterations) break;
                vec3 samplePos = rayOrigin;
                float detailNoise = computeStructuralDensity(samplePos * 20.0) / 20.0;
                float baseNoise = computeStructuralDensity(samplePos);
                stepDistance = 0.005 + abs(detailNoise - baseNoise) * 0.7;
                float heightMod = sin(samplePos.z * 2.0 + abs(samplePos.x) * 0.5) * 0.5;
                stepDistance += abs(rayOrigin.y + heightMod) * 0.4;
                float safeStep = stepDistance * u_stepPrecision;
                rayOrigin += viewDir * safeStep;
                float colorPhase = (iter * u_stepPrecision) - 0.4;
                float wavePhase = colorPhase + length(rayOrigin.xz * 0.1) + 2.0;
                vec3 spectrumShift = vec3(3.0, 1.5, 0.5);
                vec3 spectralGlow = 1.0 + 1.5 * sin(wavePhase + spectrumShift);
                float rawDensity = 1.0 / stepDistance;
                float sharpDensity = pow(rawDensity, u_surfaceSolidity) * 0.15;
                lightAccumulator += (spectralGlow * sharpDensity) * u_stepPrecision;
            }
            lightAccumulator *= u_globalLuminance;
            finalImage += applyCinematicGrade(lightAccumulator * lightAccumulator / 1000.0);
        }
    }
    finalImage *= (4.0 / float(u_renderPasses * u_renderPasses));
    finalImage = (finalImage - 0.5) * 0.5 + 0.5;
    finalImage *= 0.3;
    float grainValue = getFilmGrain(vec3(fragCoord, iTime));
    finalImage += (grainValue - 0.5) * u_grainIntensity;
    fragColor = vec4(finalImage, 1.0);
}

void main() {
    mainImage(outColor, gl_FragCoord.xy);
}`;

function InterstellarShader({ config, globalConfig }: { config: GradientConfig['shaders']['interstellar'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl2');
        if (!gl) return;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, interstellarVertShader);
        gl.compileShader(vertexShader);

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, interstellarFragShader);
        gl.compileShader(fragmentShader);

        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        const posAttr = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(posAttr);
        gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

        const uniforms = {
            iResolution: gl.getUniformLocation(program, 'iResolution'),
            iTime: gl.getUniformLocation(program, 'iTime'),
            u_renderPasses: gl.getUniformLocation(program, 'u_renderPasses'),
            u_sceneTimeScale: gl.getUniformLocation(program, 'u_sceneTimeScale'),
            u_grainIntensity: gl.getUniformLocation(program, 'u_grainIntensity'),
            u_globalLuminance: gl.getUniformLocation(program, 'u_globalLuminance'),
            u_stepPrecision: gl.getUniformLocation(program, 'u_stepPrecision'),
            u_rayIterations: gl.getUniformLocation(program, 'u_rayIterations'),
            u_surfaceSolidity: gl.getUniformLocation(program, 'u_surfaceSolidity'),
            u_camPosX: gl.getUniformLocation(program, 'u_camPosX'),
            u_camPosY: gl.getUniformLocation(program, 'u_camPosY'),
            u_camPitch: gl.getUniformLocation(program, 'u_camPitch'),
            u_camFov: gl.getUniformLocation(program, 'u_camFov'),
            u_camShiftX: gl.getUniformLocation(program, 'u_camShiftX'),
            u_camShiftY: gl.getUniformLocation(program, 'u_camShiftY'),
        };

        let startTime = Date.now();
        let animationFrameId: number;

        const render = (time: number) => {
            const rect = canvas.getBoundingClientRect();
            // Handle high-density rendering directly using a 0.7 ratio layout mapping
            const dpr = 0.7;
            const w = rect.width * dpr;
            const h = rect.height * dpr;
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w;
                canvas.height = h;
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            
            gl.uniform3f(uniforms.iResolution, gl.canvas.width, gl.canvas.height, 1.0);
            gl.uniform1f(uniforms.iTime, time);
            gl.uniform1i(uniforms.u_renderPasses, Math.round(config.passes));
            gl.uniform1f(uniforms.u_sceneTimeScale, config.speed);
            gl.uniform1f(uniforms.u_grainIntensity, config.grain);
            gl.uniform1f(uniforms.u_globalLuminance, config.luminance);
            gl.uniform1f(uniforms.u_stepPrecision, config.precision);
            gl.uniform1f(uniforms.u_rayIterations, config.iterations);
            gl.uniform1f(uniforms.u_surfaceSolidity, config.solidity);
            gl.uniform1f(uniforms.u_camPosX, config.camX);
            gl.uniform1f(uniforms.u_camPosY, config.camY);
            gl.uniform1f(uniforms.u_camPitch, config.camPitch);
            gl.uniform1f(uniforms.u_camFov, config.camFov);
            gl.uniform1f(uniforms.u_camShiftX, config.camShiftX);
            gl.uniform1f(uniforms.u_camShiftY, config.camShiftY);

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
// === CORRODED SPIRAL SHADER ===
const corrodedSpiralVert = `#version 300 es
precision highp float;
in vec2 position;
out vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}`;

const corrodedSpiralFrag = `#version 300 es
precision highp float;
uniform float uTime;
uniform float uSpeed;
uniform float uCorrosionZoom;
uniform float uOctaves;
uniform float uPersistence;
uniform float uLacunarity;
uniform float uSpiralDensity;
uniform float uColorShift;
uniform float uIntensity;
uniform float uHue;
uniform float uSaturation;
uniform vec2 uResolution;
in vec2 vUv;
out vec4 fragColor;

${hueSatHelpers}

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 ip = floor(p);
  vec2 u = fract(p);
  u = u * u * (3.0 - 2.0 * u);
  float res = mix(
    mix(rand(ip), rand(ip + vec2(1.0, 0.0)), u.x),
    mix(rand(ip + vec2(0.0, 1.0)), rand(ip + vec2(1.0, 1.0)), u.x),
    u.y
  );
  return res * res;
}

const mat2 mtx = mat2(0.80, 0.60, -0.60, 0.80);

float fbm(vec2 p) {
  float f = 0.0;
  float amp = 1.0;
  float freq = 1.0;
  float time = uTime * uSpeed; // Integrated speed directly into noise time tracking
  
  for (float i = 0.0; i < 8.0; i++) {
    if (i >= uOctaves) break;
    f += amp * noise(p * freq + time);
    freq *= uLacunarity;
    amp *= uPersistence;
  }
  return f;
}

void main() {
  vec2 uv = vUv;
  vec2 centered = uv * 2.0 - 1.0;
  float angle = atan(centered.y, centered.x);
  float radius = length(centered);
  
  float time = uTime * uSpeed;
  
  vec2 vortexUV = centered;
  vortexUV.x += sin(angle * 3.0 + time * 0.5) * 0.1;
  vortexUV.y += cos(angle * 2.0 + time * 0.3) * 0.1;
  
  float pattern = fbm(vortexUV * uCorrosionZoom);
  pattern = pow(pattern, uIntensity);
  
  // Customisable Spiral Density dictates the line frequency pattern dynamically
  float spiral = sin(angle * uSpiralDensity + radius * (uSpiralDensity * 1.25) - time);
  pattern = mix(pattern, spiral * 0.5 + 0.5, 0.3);
  
  vec3 color = vec3(pattern);
  // uColorShift is treated as 0 here, simplifying the time term out of the sine/cosine inputs
  color.r += sin(pattern * 6.28) * 0.2;
  color.g += cos(pattern * 6.28) * 0.2;
  color.b += sin(pattern * 6.28 + 2.0) * 0.2;
  
  vec3 hsv = rgb2hsv(color);
  hsv.x += uHue / 360.0;
  hsv.y *= uSaturation;
  color = hsv2rgb(hsv);
  
  float vignette = 1.0 - radius * 0.5;
  color *= vignette;
  
  fragColor = vec4(color, 1.0);
}`;

function CorrodedSpiralShader({ config, globalConfig }: { config: GradientConfig['shaders']['corrodedSpiral'], globalConfig: GradientConfig }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, corrodedSpiralVert);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, corrodedSpiralFrag);
    gl.compileShader(fragmentShader);

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      uTime: gl.getUniformLocation(program, 'uTime'),
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uSpeed: gl.getUniformLocation(program, 'uSpeed'),
      uCorrosionZoom: gl.getUniformLocation(program, 'uCorrosionZoom'),
      uOctaves: gl.getUniformLocation(program, 'uOctaves'),
      uPersistence: gl.getUniformLocation(program, 'uPersistence'),
      uLacunarity: gl.getUniformLocation(program, 'uLacunarity'),
      uSpiralDensity: gl.getUniformLocation(program, 'uSpiralDensity'),
      uColorShift: gl.getUniformLocation(program, 'uColorShift'),
      uIntensity: gl.getUniformLocation(program, 'uIntensity'),
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
      gl.uniform1f(uniforms.uCorrosionZoom, config.corrosionZoom);
      gl.uniform1f(uniforms.uOctaves, config.octaves);
      gl.uniform1f(uniforms.uPersistence, config.persistence);
      gl.uniform1f(uniforms.uLacunarity, config.lacunarity);
      gl.uniform1f(uniforms.uSpiralDensity, config.spiralDensity);
      gl.uniform1f(uniforms.uColorShift, config.colorShift);
      gl.uniform1f(uniforms.uIntensity, config.intensity);
      gl.uniform1f(uniforms.uHue, config.hue ?? 0.0);
      gl.uniform1f(uniforms.uSaturation, config.saturation ?? 1.0);

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

const spiralTunnelVertShader = `#version 300 es
in vec2 position;
void main() {
    gl_Position = vec4(position, 0.0, 1.0);
}`;

const spiralTunnelFragShader = `#version 300 es
precision highp float;
uniform vec2 uResolution;
uniform float uTime;
uniform float uFlightSpeed;
uniform float uFieldOfView;
uniform float uLuminosity;
uniform float uOpeningSize;
uniform float uRibbonCount;
uniform float uRibbonWidth;
uniform float uSpiralDensity;
uniform float uSpiralCount;
uniform float uLightIntensity;
uniform float uDistortion;
uniform vec4 uLineColors[4];
uniform float uHue;
uniform float uSaturation;

out vec4 fragColor;

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

void main() {
    // 1. Map Field of View (Fov Alters base UV Scale)
    float fovFactor = tan(radians(uFieldOfView * 0.5));
    vec2 uv = ((gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y) * fovFactor;
    float r = length(uv);
    float angle = atan(uv.y, uv.x);

    // 2. Adjust central opening size mask
    float openingMask = smoothstep(uOpeningSize * 0.002, uOpeningSize * 0.005, r);
    if(openingMask <= 0.0) {
        fragColor = vec4(0.0, 0.0, 0.0, 1.0);
        return;
    }

    float depth = 1.0 / max(r, 0.001) + uTime * (uFlightSpeed * 0.1);
    vec3 outColor = vec3(0.0);

    // 3. Dynamic Spiral & Ribbon rendering engine loops
    float ribbons = uRibbonCount / 10.0;
    for(int i = 0; i < 4; i++) {
        if(float(i) >= uSpiralCount) break;
        float offset = float(i) * (6.28318 / max(uSpiralCount, 1.0));
        
        // Ribbon widths and count pattern calculations with distortion variables
        float stripPattern = sin(angle * ribbons + depth * uSpiralDensity + offset) * cos(depth * uDistortion + float(i));
        
        // Use ribbon width dynamic parameters
        float edgeWidth = uRibbonWidth * 2.0;
        vec3 segmentColor = uLineColors[i].rgb * smoothstep(0.5 - edgeWidth, 0.5 + edgeWidth, stripPattern);
        outColor += segmentColor;
    }

    // 4. Reversed Luminosity application: Higher value = less bloom-stretch radius range
    // Max slider limit protection handled via clamping the 19.0 upper bounds scale
    outColor *= uLightIntensity * (1.0 / (r * (19.0 - uLuminosity) * 0.1)) * openingMask;

    // 5. Highpass Emissive Shader Bloom Filter Processor (Hardcoded values)
    float brightness = dot(outColor, vec3(0.2126, 0.7152, 0.0722));
    if (brightness > 0.3) {
        outColor += outColor * 0.3 * (1.0 + 0.15);
    }

    // Hue/Saturation shift passes
    vec3 hsv = rgb2hsv(outColor);
    hsv.x += uHue / 360.0;
    hsv.y *= uSaturation;
    outColor = hsv2rgb(hsv);

    fragColor = vec4(outColor, 1.0);
}`;

function SpiralTunnelShader({ config, globalConfig }: { config: any; globalConfig: any }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const configString = useMemo(() => JSON.stringify(config), [config]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        
        const gl = canvas.getContext('webgl2');
        if (!gl) return;

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, spiralTunnelVertShader);
        gl.compileShader(vertexShader);

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, spiralTunnelFragShader);
        gl.compileShader(fragmentShader);

        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        gl.useProgram(program);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

        const posAttr = gl.getAttribLocation(program, "position");
        gl.enableVertexAttribArray(posAttr);
        gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

        const uniforms = {
            uTime: gl.getUniformLocation(program, 'uTime'),
            uResolution: gl.getUniformLocation(program, 'uResolution'),
            uFlightSpeed: gl.getUniformLocation(program, 'uFlightSpeed'),
            uFieldOfView: gl.getUniformLocation(program, 'uFieldOfView'),
            uLuminosity: gl.getUniformLocation(program, 'uLuminosity'),
            uOpeningSize: gl.getUniformLocation(program, 'uOpeningSize'),
            uRibbonCount: gl.getUniformLocation(program, 'uRibbonCount'),
            uRibbonWidth: gl.getUniformLocation(program, 'uRibbonWidth'),
            uSpiralDensity: gl.getUniformLocation(program, 'uSpiralDensity'),
            uSpiralCount: gl.getUniformLocation(program, 'uSpiralCount'),
            uLightIntensity: gl.getUniformLocation(program, 'uLightIntensity'),
            uDistortion: gl.getUniformLocation(program, 'uDistortion'),
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
            gl.uniform1f(uniforms.uFlightSpeed, config.flightSpeed);
            gl.uniform1f(uniforms.uFieldOfView, config.fieldOfView ?? 90.0);
            gl.uniform1f(uniforms.uLuminosity, config.luminosity);
            gl.uniform1f(uniforms.uOpeningSize, config.openingSize);
            gl.uniform1f(uniforms.uRibbonCount, config.ribbonCount);
            gl.uniform1f(uniforms.uRibbonWidth, config.ribbonWidth);
            gl.uniform1f(uniforms.uSpiralDensity, config.spiralDensity ?? 8.0);
            gl.uniform1f(uniforms.uSpiralCount, config.spiralCount ?? 4.0);
            gl.uniform1f(uniforms.uLightIntensity, config.lightIntensity);
            gl.uniform1f(uniforms.uDistortion, config.distortion);
            gl.uniform1f(uniforms.uHue, config.hue ?? 0.0);
            gl.uniform1f(uniforms.uSaturation, config.saturation ?? 1.0);

            const colors = [config.lineColor1, config.lineColor2, config.lineColor3, config.lineColor4];
            colors.forEach((color, index) => {
                const loc = gl.getUniformLocation(program, `uLineColors[${index}]`);
                if (loc) {
                    const rgba = hexToRgbaVec(color);
                    gl.uniform4f(loc, rgba[0], rgba[1], rgba[2], rgba[3]);
                }
            });

            gl.drawArrays(gl.TRIANGLES, 0, 3);
        };

        const renderLoop = () => {
            const time = globalConfig.paused ? (globalConfig.motion / 100) * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();

        return () => cancelAnimationFrame(animationFrameId);
    }, [configString, globalConfig.paused, globalConfig.motion]);

    return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />;
}

const fractalVortexSceneVertShader = `#version 300 es
layout(location = 0) in vec2 position;
out vec2 vUV;
void main() {
  vUV = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const fractalVortexFragShader = `#version 300 es
precision highp float;
precision highp int;

#define MAX_TRACE_STEPS 128

uniform vec2 uResolution;      // internal render resolution
uniform float uTime;
uniform int uTraceSteps;
uniform float uCameraSpeed;
uniform float uFractalSpeed;
uniform float uFov;
uniform float uFractalScale;
uniform float uTurbulence;
uniform float uBoxSize;
uniform float uGlowStrength;
uniform float uGlowWidth;
uniform float uMirrorTileSize;
uniform float uWallNormalScale;
uniform vec3 uSoftTint;
uniform vec3 uCoreTint;
uniform vec3 uBackgroundColor;
uniform float uExposure;
uniform float uHue;
uniform float uSaturation;
uniform float uContrast;
uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;

out vec4 fragColor;

${hueSatHelpers}

const vec2 TUNNEL_HALF_SIZE = vec2(4.6, 2.15);
const vec3 COLOR_OFFSET = vec3(-0.750, 0.409, 1.310);

vec3 buildTransformAxis(float time) {
  vec3 axisPhase = vec3(5.0, 0.0, 1.0) + time * 0.25;
  return normalize(cos(axisPhase));
}

vec3 transformPoint(vec3 point, vec3 axis) {
  return axis * dot(axis, point) - cross(axis, point);
}

float sampleLightField(vec3 point, vec3 axis, float time, out float animationPhase) {
  vec3 basePoint = transformPoint(point, axis);
  vec3 distortedPoint = basePoint;
  float frequency = uFractalScale;
  vec3 cells = floor(distortedPoint * frequency + 0.5);
  distortedPoint -= sin(cells + time).zxy * (uTurbulence / max(frequency, 0.0001)) * 0.6;
  animationPhase = distortedPoint.y + time;
  vec3 boxPoint = abs(basePoint);
  float boxField = max(boxPoint.x, max(boxPoint.y, boxPoint.z)) - uBoxSize;
  float foldedField = max(boxField, -boxField * 0.2);
  float animatedSurface = 0.2 * abs(cos(animationPhase));
  return foldedField + animatedSurface;
}

float computeFieldGlow(float fieldValue) {
  return uGlowStrength / (uGlowWidth + fieldValue * fieldValue + 0.0001);
}

float mirroredTileCoordinate(float coordinate, float tileSize) {
  float safeTileSize = max(tileSize, 0.001);
  float doubleTile = safeTileSize * 2.0;
  float localCoordinate = mod(abs(coordinate), doubleTile);
  return 1.0 - abs(localCoordinate - safeTileSize) / safeTileSize;
}

vec3 getTunnelSurfaceData(vec2 point) {
  float signedVerticalWall = abs(point.x) - TUNNEL_HALF_SIZE.x;
  float signedHorizontalWall = abs(point.y) - TUNNEL_HALF_SIZE.y;

  float verticalDistance = abs(signedVerticalWall);
  float horizontalDistance = abs(signedHorizontalWall);

  float wallDistance;
  float normalCoordinate;
  float tangentCoordinate;

  if (verticalDistance < horizontalDistance) {
    wallDistance = verticalDistance;
    normalCoordinate = signedVerticalWall * uWallNormalScale;
    tangentCoordinate = point.y;
  } else {
    wallDistance = horizontalDistance;
    normalCoordinate = signedHorizontalWall * uWallNormalScale;
    tangentCoordinate = point.x;
  }

  float mirrorCoordinate = mirroredTileCoordinate(tangentCoordinate, uMirrorTileSize);
  return vec3(wallDistance, normalCoordinate, mirrorCoordinate);
}

vec3 computeEmissionColor(float phase, float time, float fieldGlow) {
  // uPaletteShift replaced with 0.0
  float colorPhase = phase - time * 0.3 + 0.0;
  vec3 originalPalette = cos(vec3(colorPhase) + COLOR_OFFSET) + 1.1;
  float coreMix = clamp(fieldGlow * 0.22, 0.0, 1.0);
  vec3 tint = mix(uSoftTint, uCoreTint, coreMix);
  return originalPalette * tint;
}

float computeWallDensity(
  float wallDistance,
  float mirrorCoordinate,
  float repeatedDepth,
  float fieldGlow
) {
  float squaredDistance = wallDistance * wallDistance;
  float softWall = 1.0 / (1.0 + squaredDistance * 120.0);
  float sharpWall = 1.2 / (1.0 + squaredDistance * 1400.0);
  float reflectionPattern = 0.55 + 0.45 * cos(mirrorCoordinate * 10.0 + repeatedDepth * 0.45);
  float density = softWall * (0.08 + fieldGlow * 0.76);
  density += sharpWall * (0.14 + fieldGlow * 3.4);
  density *= 0.81 + reflectionPattern * 0.16;
  return density;
}

float computeDepthAttenuation(float distanceFromCamera) {
  return 1.0 / (1.0 + distanceFromCamera * 0.06 + distanceFromCamera * distanceFromCamera * 0.0025);
}

vec3 renderTunnel(vec3 rayOrigin, vec3 rayDirection, float animationTime) {
  vec3 accumulatedLight = vec3(0.0);
  vec3 transformAxis = buildTransformAxis(animationTime);

  float travelDistance = 2.86;
  int steps = min(uTraceSteps, MAX_TRACE_STEPS);

  for (int stepIndex = 0; stepIndex < MAX_TRACE_STEPS; stepIndex++) {
    if (stepIndex >= steps) break;

    vec3 samplePoint = rayOrigin + rayDirection * travelDistance;
    vec3 surfaceData = getTunnelSurfaceData(samplePoint.xy);

    float wallDistance = surfaceData.x;
    float normalCoordinate = surfaceData.y;
    float mirrorCoordinate = surfaceData.z * 2.0 - 1.0;
    float repeatedDepth = mod(samplePoint.z + 3.1, 10.0) - 5.0;

    vec3 fieldPoint = vec3(
      normalCoordinate,
      mirrorCoordinate * 2.8,
      repeatedDepth * 0.82
    );

    float animationPhase;
    float fieldValue = sampleLightField(fieldPoint, transformAxis, animationTime, animationPhase);
    float fieldGlow = computeFieldGlow(fieldValue);
    vec3 emissionColor = computeEmissionColor(animationPhase, animationTime, fieldGlow);
    float wallDensity = computeWallDensity(wallDistance, mirrorCoordinate, repeatedDepth, fieldGlow);
    float depthAttenuation = computeDepthAttenuation(travelDistance);

    accumulatedLight += emissionColor * wallDensity * depthAttenuation * 0.09;

    if (dot(accumulatedLight, vec3(0.333)) > 4.5) break;
    travelDistance += 0.15 - travelDistance * 0.0008;
  }

  return accumulatedLight;
}

vec3 renderScene(vec2 fragCoord, vec2 resolution) {
  vec2 screenPosition = (fragCoord * 2.0 - resolution) / resolution.y;

  float animationTime = uTime * uFractalSpeed;
  vec3 cameraOrigin = vec3(0.0, 0.0, uTime * uCameraSpeed);
  vec3 cameraDirection = normalize(vec3(screenPosition * vec2(1.0, 1.19), uFov));

  vec3 color = renderTunnel(cameraOrigin, cameraDirection, animationTime);

  float distanceFromCenter = length(screenPosition);
  float blackOpening = smoothstep(-0.04, 0.1, distanceFromCenter);
  color *= blackOpening;

  color = 1.0 - exp(-color * uExposure);
  color = pow(color, vec3(max(uContrast, 0.001)));

  vec3 hsv = rgb2hsv(max(color, vec3(0.0)));
  hsv.x += uHue / 360.0;
  hsv.y *= uSaturation;
  color = hsv2rgb(hsv);

  color = mix(uBackgroundColor, color, blackOpening);

  float tintMix = clamp(blackOpening, 0.0, 1.0);
  vec3 balatroTint = uColor1 * (1.0 - tintMix) + uColor2 * (tintMix * 0.5) + uColor3 * (tintMix * 0.5);
  color = mix(color, balatroTint, 0.15);

  return color;
}

void main() {
  vec3 color = renderScene(gl_FragCoord.xy, uResolution);
  fragColor = vec4(color, 1.0);
}
`;

const fractalVortexBlitFragShader = `#version 300 es
precision highp float;

uniform sampler2D uTexture;
in vec2 vUV;
out vec4 fragColor;

void main() {
  fragColor = texture(uTexture, vUV);
}
`;

function FractalVortexShader({ config, globalConfig }: { config: any; globalConfig: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const configString = useMemo(() => JSON.stringify(config), [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", {
      antialias: false,
      alpha: false,
      depth: false,
      stencil: false,
      powerPreference: "high-performance",
      preserveDrawingBuffer: false,
    });

    if (!gl) return;

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        throw new Error(gl.getShaderInfoLog(shader) || "Shader compile failed");
      }
      return shader;
    };

    const createProgram = (vs: string, fs: string) => {
      const program = gl.createProgram()!;
      gl.attachShader(program, createShader(gl.VERTEX_SHADER, vs));
      gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fs));
      gl.linkProgram(program);
      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        throw new Error(gl.getProgramInfoLog(program) || "Program link failed");
      }
      return program;
    };

    const fullscreenVerts = new Float32Array([
      -1, -1,
       3, -1,
      -1,  3,
    ]);

    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);

    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, fullscreenVerts, gl.STATIC_DRAW);

    const programs = {
      scene: createProgram(fractalVortexSceneVertShader, fractalVortexFragShader), 
      blit: createProgram(fractalVortexSceneVertShader, fractalVortexBlitFragShader),
    };

    gl.useProgram(programs.scene);
    const pos0 = gl.getAttribLocation(programs.scene, "position");
    gl.enableVertexAttribArray(pos0);
    gl.vertexAttribPointer(pos0, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(programs.blit);
    const pos1 = gl.getAttribLocation(programs.blit, "position");
    gl.enableVertexAttribArray(pos1);
    gl.vertexAttribPointer(pos1, 2, gl.FLOAT, false, 0, 0);

    const lowResTexture = gl.createTexture()!;
    const lowResFbo = gl.createFramebuffer()!;

    gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.NEAREST);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
    gl.framebufferTexture2D(
      gl.FRAMEBUFFER,
      gl.COLOR_ATTACHMENT0,
      gl.TEXTURE_2D,
      lowResTexture,
      0
    );

    const uniforms = {
      scene: {
        uResolution: gl.getUniformLocation(programs.scene, "uResolution"),
        uTime: gl.getUniformLocation(programs.scene, "uTime"),
        uTraceSteps: gl.getUniformLocation(programs.scene, "uTraceSteps"),
        uCameraSpeed: gl.getUniformLocation(programs.scene, "uCameraSpeed"),
        uFractalSpeed: gl.getUniformLocation(programs.scene, "uFractalSpeed"),
        uFov: gl.getUniformLocation(programs.scene, "uFov"),
        uFractalScale: gl.getUniformLocation(programs.scene, "uFractalScale"),
        uTurbulence: gl.getUniformLocation(programs.scene, "uTurbulence"),
        uBoxSize: gl.getUniformLocation(programs.scene, "uBoxSize"),
        uGlowStrength: gl.getUniformLocation(programs.scene, "uGlowStrength"),
        uGlowWidth: gl.getUniformLocation(programs.scene, "uGlowWidth"),
        uMirrorTileSize: gl.getUniformLocation(programs.scene, "uMirrorTileSize"),
        uWallNormalScale: gl.getUniformLocation(programs.scene, "uWallNormalScale"),
        uSoftTint: gl.getUniformLocation(programs.scene, "uSoftTint"),
        uCoreTint: gl.getUniformLocation(programs.scene, "uCoreTint"),
        uBackgroundColor: gl.getUniformLocation(programs.scene, "uBackgroundColor"),
        uExposure: gl.getUniformLocation(programs.scene, "uExposure"),
        uHue: gl.getUniformLocation(programs.scene, "uHue"),
        uSaturation: gl.getUniformLocation(programs.scene, "uSaturation"),
        uContrast: gl.getUniformLocation(programs.scene, "uContrast"),
        uColor1: gl.getUniformLocation(programs.scene, "uColor1"),
        uColor2: gl.getUniformLocation(programs.scene, "uColor2"),
        uColor3: gl.getUniformLocation(programs.scene, "uColor3"),
      },
      blit: {
        uTexture: gl.getUniformLocation(programs.blit, "uTexture"),
      },
    };

    let raf = 0;
    const startTime = performance.now();

    const render = (t: number) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 1.0);
      const fullWidth = Math.max(1, Math.floor(rect.width * dpr));
      const fullHeight = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== fullWidth || canvas.height !== fullHeight) {
        canvas.width = fullWidth;
        canvas.height = fullHeight;
      }

      const renderScale = Math.max(0.1, Math.min(1.0, config.renderScale ?? 0.6));
      const renderWidth = Math.max(1, Math.floor(fullWidth * renderScale));
      const renderHeight = Math.max(1, Math.floor(fullHeight * renderScale));

      gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        gl.RGBA,
        renderWidth,
        renderHeight,
        0,
        gl.RGBA,
        gl.UNSIGNED_BYTE,
        null
      );

      gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
      gl.viewport(0, 0, renderWidth, renderHeight);
      gl.useProgram(programs.scene);
      gl.uniform2f(uniforms.scene.uResolution, renderWidth, renderHeight);
      gl.uniform1f(uniforms.scene.uTime, t);
      gl.uniform1i(
        uniforms.scene.uTraceSteps,
        Math.max(1, Math.min(128, Math.round(config.traceSteps ?? 64)))
      );
      gl.uniform1f(uniforms.scene.uCameraSpeed, config.cameraSpeed);
      gl.uniform1f(uniforms.scene.uFractalSpeed, config.fractalSpeed);
      gl.uniform1f(uniforms.scene.uFov, config.fov);
      gl.uniform1f(uniforms.scene.uFractalScale, config.fractalScale);
      gl.uniform1f(uniforms.scene.uTurbulence, config.turbulence);
      gl.uniform1f(uniforms.scene.uBoxSize, config.boxSize);
      gl.uniform1f(uniforms.scene.uGlowStrength, config.glowStrength);
      gl.uniform1f(uniforms.scene.uGlowWidth, config.glowWidth);
      gl.uniform1f(uniforms.scene.uMirrorTileSize, config.mirrorTileSize);
      gl.uniform1f(uniforms.scene.uWallNormalScale, config.wallNormalScale);
      gl.uniform1f(uniforms.scene.uExposure, config.exposure);
      gl.uniform1f(uniforms.scene.uHue, config.hue ?? 0.0);
      gl.uniform1f(uniforms.scene.uSaturation, config.saturation ?? 1.0);
      gl.uniform1f(uniforms.scene.uContrast, config.contrast ?? 1.0);
      gl.uniform3f(
        uniforms.scene.uColor1,
        config.color1_r ?? 0.871,
        config.color1_g ?? 0.267,
        config.color1_b ?? 0.231
      );
      gl.uniform3f(
        uniforms.scene.uColor2,
        config.color2_r ?? 0.0,
        config.color2_g ?? 0.42,
        config.color2_b ?? 0.706
      );
      gl.uniform3f(
        uniforms.scene.uColor3,
        config.color3_r ?? 0.086,
        config.color3_g ?? 0.137,
        config.color3_b ?? 0.145
      );

      const softTint = hexToRgbaVec(config.softTint ?? "#ffffff");
      const coreTint = hexToRgbaVec(config.coreTint ?? "#ffffff");
      const background = hexToRgbaVec(config.backgroundColor ?? "#000000");

      gl.uniform3f(uniforms.scene.uSoftTint, softTint[0], softTint[1], softTint[2]);
      gl.uniform3f(uniforms.scene.uCoreTint, coreTint[0], coreTint[1], coreTint[2]);
      gl.uniform3f(
        uniforms.scene.uBackgroundColor,
        background[0],
        background[1],
        background[2]
      );

      gl.drawArrays(gl.TRIANGLES, 0, 3);

      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.viewport(0, 0, fullWidth, fullHeight);
      gl.useProgram(programs.blit);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
      gl.uniform1i(uniforms.blit.uTexture, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const renderLoop = () => {
      const t = globalConfig.paused
        ? (globalConfig.motion / 100) * 10
        : (performance.now() - startTime) * 0.001;

      render(t);

      if (!globalConfig.paused) {
        raf = requestAnimationFrame(renderLoop);
      }
    };

    renderLoop();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      gl.deleteProgram(programs.scene);
      gl.deleteProgram(programs.blit);
      gl.deleteShader(gl.getAttachedShaders(programs.scene)?.[0] ?? null);
      gl.deleteShader(gl.getAttachedShaders(programs.scene)?.[1] ?? null);
      gl.deleteShader(gl.getAttachedShaders(programs.blit)?.[0] ?? null);
      gl.deleteShader(gl.getAttachedShaders(programs.blit)?.[1] ?? null);
      gl.deleteBuffer(vbo);
      gl.deleteVertexArray(vao);
      gl.deleteTexture(lowResTexture);
      gl.deleteFramebuffer(lowResFbo);
    };
  }, [configString, globalConfig.paused, globalConfig.motion]);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />;
}
const infiniteCorridorFragShader = `
precision highp float;

// Output configuration required for WebGL2 ESSL 3.00
out vec4 fragColor;

uniform float uTime;
uniform vec2 uResolution;
uniform float uHue;
uniform float uSaturation;

// Corridor Matrices Uniforms
uniform float uFloorY;
uniform float uApexY;
uniform float uHalfWidth;
uniform float uFocalLength;
uniform float uFogDensity;
uniform float uFractalTimeScale;
uniform float uTrailTimeScale;
uniform vec2  uFractalScale;
uniform float uFractalScroll;
uniform float uFractalLevels;
uniform float uLineWidthNear;
uniform float uLineWidthFar;
uniform float uLineSoftness;
uniform float uCameraSpeed;
uniform vec3  uCameraPosition;
uniform vec2  uCameraSway;
uniform float uSeamStrength;
uniform float uTrailBrightness;
uniform float uKaleidoscopeSpeed;
uniform float uFateSpeed;
uniform float uMirrors;
uniform float uNoiseStrength;
uniform float uDistortionStrength;

// Color System Uniforms
uniform bool  u_useFilter;
uniform vec3  u_filterColor;
uniform vec4  uLightColor;
uniform vec4  uGlowColor;
uniform vec4  uSubstrateColor;
uniform vec4  uBackgroundColor;

// Missing Math Constants Setup
const float PI = 3.14159265359;
const float TAU = 6.28318530718;
const float FAR_DISTANCE = 1000.0;

float hash21(vec2 p) {
    p = fract(p * vec2(123.34, 345.44));
    p += dot(p, p + 34.345);
    return fract(p.x * p.y);
}

float hash13(vec3 p3){
    p3 = fract(p3 * .1031);
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
    vec3 g000 = randomGradient(i+vec3(0,0,0));
    vec3 g100 = randomGradient(i+vec3(1,0,0));
    vec3 g010 = randomGradient(i+vec3(0,1,0));
    vec3 g001 = randomGradient(i+vec3(0,0,1));
    vec3 g011 = randomGradient(i+vec3(0,1,1));
    vec3 g101 = randomGradient(i+vec3(1,0,1));
    vec3 g110 = randomGradient(i+vec3(1,1,0));
    vec3 g111 = randomGradient(i+vec3(1,1,1));
    
    float v000 = dot(g000, f-vec3(0,0,0));
    float v100 = dot(g100, f-vec3(1,0,0));
    float v010 = dot(g010, f-vec3(0,1,0));
    float v001 = dot(g001, f-vec3(0,0,1));
    float v011 = dot(g011, f-vec3(0,1,1));
    float v101 = dot(g101, f-vec3(1,0,1));
    float v110 = dot(g110, f-vec3(1,1,0));
    float v111 = dot(g111, f-vec3(1,1,1));
    
    vec3 u = f*f*f*(f*(f*6.0 - 15.0) + 10.0);
    return mix(mix(mix(v000, v100, u.x), mix(v010, v110, u.x), u.y), mix(mix(v001, v101, u.x), mix(v011, v111, u.x), u.y), u.z);
}

float fbm(vec3 p){
    float amp = 1.;
    float fre = 1.;
    float n = 0.;
    for(float i = 0.; i < 4.; i++){
        n += noise(fre*p)*amp;
        amp *= .5;
        fre *= 2.;
    }
    return n;
}

float fbmWrap(vec3 p){
    vec3 q = vec3(fbm(p+vec3(13.24,42.74,44.32)), fbm(p+vec3(51.16,17.93,98.23)), fbm(p+vec3(43.46,85.43,64.91)));
    return fbm(q);
}

float snoise(vec2 v) {
    return fract(sin(dot(v, vec2(12.9898, 78.233))) * 43758.5453123);
}

// --- Geometries ---
float sdBox2D(vec2 p, vec2 b) {
    vec2 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, d.y), 0.0);
}

float sdSegment2D(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a;
    vec2 ba = b - a;
    float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
    return length(pa - ba * h);
}

float lineMask(float distanceToLine, float width) {
    return 1.0 - smoothstep(width, width + uLineSoftness, distanceToLine);
}

float periodicDistance(float a, float b) {
    float d = abs(a - b);
    return min(d, 1.0 - d);
}

float movingTrailOnSegment(vec2 p, vec2 a, vec2 b, float width, float trailTime, float speed, float phase, float direction) {
    vec2 ba = b - a;
    float segmentLength = max(length(ba), 0.0001);
    vec2 axis = ba / segmentLength;
    vec2 pa = p - a;
    float projection = clamp(dot(pa, axis), 0.1, segmentLength);
    float distanceToSegment = length(pa - axis * projection);
    float line = 1.0 - smoothstep(width, width + 0.008, distanceToSegment);
    float u = projection / segmentLength;
    float flow = fract(direction * u - trailTime * speed + phase);
    float headDistance = periodicDistance(flow, 0.0);
    float tailDistance = periodicDistance(flow, -0.325);
    float sparkDistance = periodicDistance(flow, 0.53);
    float head = exp(-190.0 * headDistance * headDistance);
    float tail = 0.50 * exp(-72.0 * tailDistance * tailDistance);
    float spark = 0.32 * exp(-260.0 * sparkDistance * sparkDistance);
    return line * clamp(head + tail + spark, 0.0, 1.0);
}

float movingTrailOnBox(vec2 p, vec2 halfSize, float width, float trailTime, float speed, float phase, float direction) {
    vec2 topLeft = vec2(-halfSize.x, halfSize.y);
    vec2 topRight = vec2(halfSize.x, halfSize.y);
    vec2 bottomRight = vec2(halfSize.x, -halfSize.y);
    vec2 bottomLeft = vec2(-halfSize.x, -halfSize.y);
    float trail = 0.0;
    trail += movingTrailOnSegment(p, topLeft, topRight, width, trailTime, speed, phase + 0.00, direction);
    trail += movingTrailOnSegment(p, topRight, bottomRight, width, trailTime, speed, phase + 0.07, direction);
    trail += movingTrailOnSegment(p, bottomRight, bottomLeft, width, trailTime, speed, phase + 0.19, direction);
    trail += movingTrailOnSegment(p, bottomLeft, topLeft, width, trailTime, speed, phase + 0.32, direction);
    return clamp(trail, 0.0, 1.0);
}

vec3 cyberPalette(float position, float accent) {
    float blendA = 1.1 + 0.1 * sin(position * 0.22);
    float blendB = 0.5 + 0.5 * sin(position * 0.81 + 1.3);
    vec3 dynamicBase = vec3(0.02, 0.02, 0.07);
    vec3 neon = mix(dynamicBase, vec3(0.137, 0.373, 0.624), blendA);
    neon = mix(neon, vec3(0.120, 0.880, 1.000), accent * 0.71 + blendB * 0.14);
    return mix(vec3(0.0), mix(uSubstrateColor.rgb, neon, 0.29), 1.39);
}

// --- Combined Structural Map Matrix Generator ---
vec3 renderInterestingFractal(vec2 surfacePosition, float geometryTime, float trailTime) {
    float fateT = geometryTime * uFateSpeed;
    float kFate = 0.8;
    vec3 fateCoord = vec3(kFate * sin(surfacePosition.x), kFate * cos(surfacePosition.x), surfacePosition.y - fateT * 1.2);
    float fateNoiseVal = fbmWrap(fateCoord);
    surfacePosition.x += fateNoiseVal * uNoiseStrength;
    surfacePosition.y += sin(fateNoiseVal * PI) * uDistortionStrength;
    vec2 p = surfacePosition * uFractalScale;
    p.y -= geometryTime * uFractalScroll;
    vec2 recursiveP = p;
    float core = 0.0;
    float halo = 0.0;
    float trailLight = 0.0;
    float colorIndex = 0.0;
    
    for (int level = 0; level < 6; level++) {
        if (float(level) >= uFractalLevels) break;
        float levelF = float(level);
        vec2 cellId = floor(recursiveP);
        vec2 q = fract(recursiveP) - 0.5;
        float randomValue = hash21(cellId + levelF * 18.94);
        float randomB = hash21(cellId.yx + levelF * 37.11 + 4.7);
        float randomD = hash21(cellId.yx + levelF * 7.43 + 17.6);
        if (randomValue > 0.2) q = q.yx;
        q.x *= randomB > 0.3 ? 1.0 : -1.0;
        q.y *= fract(randomValue * 4.31) > 0.5 ? 1.0 : -1.0;
        float levelWeight = exp(-0.17 * levelF);
        float lineWidth = mix(uLineWidthNear, uLineWidthFar, levelF / 5.0);
        float microWidth = lineWidth * 0.52;
        float frameDistance = abs(sdBox2D(q, vec2(0.355)));
        float frame = lineMask(frameDistance, lineWidth);
        float innerFrameDistance = abs(sdBox2D(q, vec2(0.235)));
        float innerFrame = lineMask(innerFrameDistance, microWidth * 0.85);
        float horizontalGap = smoothstep(0.055, 0.105, abs(q.y));
        float verticalGap = smoothstep(0.045, 0.095, abs(q.x));
        frame *= (randomValue > 0.5 ? horizontalGap : verticalGap);
        vec2 corner = vec2(0.355, 0.355);
        vec2 bend = vec2(0.0, 0.355);
        vec2 terminal = vec2(0.0, 0.045);
        if (randomB > 0.5) {
            bend = vec2(0.355, 0.0);
            terminal = vec2(0.045, 0.0);
        }
        float traceA = lineMask(sdSegment2D(q, corner, bend), lineWidth * 0.72);
        float traceB = lineMask(sdSegment2D(q, bend, terminal), lineWidth * 0.72);
        float trace = max(traceA, traceB);
        float terminalDistance = abs(sdBox2D(q - terminal, vec2(0.034)));
        float terminalMask = lineMask(terminalDistance, lineWidth * 0.68);
        float visibility = 1.0;
        if (level == 3) visibility = step(0.34, randomValue);
        if (level == 4) visibility = step(0.58, randomValue);
        float structure = (frame * 0.80 + innerFrame * 0.34 + trace * 1.00 + terminalMask * 1.24) * levelWeight * visibility;
        float directionMain = randomValue > 0.5 ? 1.0 : -1.0;
        float directionFrame = randomD > 0.5 ? 1.0 : -1.0;
        float frameTrail = movingTrailOnBox(q, vec2(0.425), lineWidth * 0.92, trailTime, 0.24 + levelF * 0.022, randomValue * 0.81, directionFrame);
        float bigTrail = frameTrail * 0.60;
        bigTrail += movingTrailOnSegment(q, corner, bend, lineWidth * 0.95, trailTime, 0.38 + levelF * 0.028, randomValue * 0.73, directionMain);
        core += structure;
        halo += structure * mix(0.72, 0.25, levelF / 4.0);
        trailLight += bigTrail * levelWeight * visibility;
        colorIndex += randomValue * structure;
        vec2 offset = vec2(randomValue > 0.5 ? 0.37 : -0.37, randomB > 0.5 ? 0.29 : -0.29);
        recursiveP = recursiveP * 2.02 + offset;
    }
    
    core = clamp(core, 0.0, 0.9);
    halo = clamp(halo, 0.0, 3.6);
    trailLight = clamp(trailLight, 0.0, 1.6);
    float normalizedColorIndex = colorIndex / max(core, 0.001);
    float accent = clamp(trailLight * 0.95, 0.0, 1.0);
    vec3 neon = cyberPalette(surfacePosition.y * 0.22 + normalizedColorIndex * 2.4, accent);
    float beamSnoise = snoise(surfacePosition + geometryTime * 0.1) * uNoiseStrength;
    float structuredBeam = abs(1.0 / (30.0 * (p.x - 0.5))) + beamSnoise;
    vec3 color = uSubstrateColor.rgb * (1.0 - core) + neon * core * 0.86 + neon * halo * 0.16 + vec3(0.280, 0.720, 1.000) * trailLight * uTrailBrightness;
    color += vec3(structuredBeam * 0.15);
    
    if (u_useFilter) {
        color *= u_filterColor;
    }
    return color;
}

float intersectCorridorPlane(vec3 rayOrigin, vec3 rayDirection, vec3 inwardNormal, float planeOffset) {
    float originDistance = dot(inwardNormal, rayOrigin) + planeOffset;
    float denominator = dot(inwardNormal, rayDirection);
    if (denominator >= -0.00001) return FAR_DISTANCE;
    float distance = -originDistance / denominator;
    return distance > 0.0 ? distance : FAR_DISTANCE;
}

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

void main() {
    float fovFactor = tan(radians(90.0 * 0.5));
    vec2 uv = ((gl_FragCoord.xy * 2.0 - uResolution.xy) / uResolution.y) * fovFactor;
    vec2 uv0 = uv;
    
    for (float i = 0.0; i < 4.0; i++) {
        if (i >= uMirrors) break;
        uv = fract(uv * 1.5) - 0.5;
        float kDist = length(uv) * exp(-length(uv0));
        kDist = sin(kDist * 8.0 + uTime * uKaleidoscopeSpeed) / 8.0;
        uv += abs(kDist);
    }
    
    float time = uTime;
    vec3 rayOrigin = vec3(uCameraPosition.x + sin(time * 0.18) * uCameraSway.x, uCameraPosition.y, uCameraPosition.z + time * uCameraSpeed);
    vec3 cameraTarget = rayOrigin + vec3(0.0, 0.028, 1.0);
    vec3 forward = normalize(cameraTarget - rayOrigin);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));
    vec3 up = normalize(cross(forward, right));
    vec3 rayDirection = normalize(forward * uFocalLength + right * uv.x + up * uv.y);
    
    float corridorHeight = uApexY - uFloorY;
    float slope = uHalfWidth / corridorHeight;
    vec3 leftNormalUnnormalized = vec3(1.0, -slope, 0.0);
    vec3 rightNormalUnnormalized = vec3(-1.0, -slope, 0.0);
    float sideOffset = uHalfWidth + slope * uFloorY;
    
    float floorDistance = intersectCorridorPlane(rayOrigin, rayDirection, vec3(0.0, 1.0, 0.0), -uFloorY);
    float leftDistance = intersectCorridorPlane(rayOrigin, rayDirection, leftNormalUnnormalized, sideOffset);
    float rightDistance = intersectCorridorPlane(rayOrigin, rayDirection, rightNormalUnnormalized, sideOffset);
    
    float hitDistance = floorDistance;
    float surfaceID = 0.0;
    vec3 surfaceNormal = vec3(0.0, 1.0, 0.0);
    
    if (leftDistance < hitDistance) {
        hitDistance = leftDistance;
        surfaceID = 1.0;
        surfaceNormal = normalize(leftNormalUnnormalized);
    }
    if (rightDistance < hitDistance) {
        hitDistance = rightDistance;
        surfaceID = 2.0;
        surfaceNormal = normalize(rightNormalUnnormalized);
    }
    
    if (hitDistance >= FAR_DISTANCE) {
        fragColor = uBackgroundColor;
        return;
    }
    
    vec3 hitPosition = rayOrigin + rayDirection * hitDistance;
    float wallLength = length(vec2(uHalfWidth, corridorHeight));
    float surfaceU = 0.0;
    
    if (surfaceID < 0.5) {
        surfaceU = hitPosition.x;
    } else if (surfaceID < 1.5) {
        surfaceU = dot(hitPosition.xy - vec2(-uHalfWidth, uFloorY), normalize(vec2(uHalfWidth, corridorHeight))) - wallLength * 0.5;
    } else {
        surfaceU = dot(hitPosition.xy - vec2(uHalfWidth, uFloorY), normalize(vec2(-uHalfWidth, corridorHeight))) - wallLength * 0.7;
    }
    
    vec3 fractalColor = renderInterestingFractal(vec2(surfaceU, hitPosition.z), time * uFractalTimeScale, time * uTrailTimeScale);
    float facing = max(dot(surfaceNormal, normalize(rayOrigin - hitPosition)), 0.0);
    vec3 color = fractalColor * (0.61 + -0.59 * facing) + vec3(-0.05, -0.02, 0.01) + fractalColor * pow(clamp(1.0 - facing, 0.0, 1.0), 3.5) * 0.08;
    
    float seamDistance = (surfaceID < 0.5) ? min((hitPosition.xy - vec2(-uHalfWidth, uFloorY)).x, (hitPosition.xy - vec2(uHalfWidth, uFloorY)).x) : hitPosition.y - uFloorY;
    color += mix(vec3(0.180, 0.030, 0.260), vec3(0.020, 0.320, 0.520), 0.96) * exp(-max(seamDistance, -2.0) * 6.9) * uSeamStrength;
    
    vec3 farGlowColor = mix(uLightColor.rgb, uGlowColor.rgb, 0.14);
    color = mix(farGlowColor, color, exp(-hitDistance * uFogDensity));
    
    vec3 hsv = rgb2hsv(color);
    hsv.x += uHue / 360.0;
    hsv.y *= uSaturation;
    color = hsv2rgb(hsv);
    
    fragColor = vec4(color, uLightColor.a);
}
`;

function InfiniteCorridorShader({ config, globalConfig }: { config: any; globalConfig: any }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const configString = useMemo(() => JSON.stringify(config), [config]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext('webgl2');
    if (!gl) return;

    const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
    gl.shaderSource(vertexShader, `#version 300 es
      in vec2 position;
      void main() {
        gl_Position = vec4(position, 0.0, 1.0);
      }
    `);
    gl.compileShader(vertexShader);

    const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
    gl.shaderSource(fragmentShader, `#version 300 es\n` + infiniteCorridorFragShader);
    gl.compileShader(fragmentShader);

    if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
      console.error('Unified Shader compilation error:', gl.getShaderInfoLog(fragmentShader));
      return;
    }

    const program = gl.createProgram()!;
    gl.attachShader(program, vertexShader);
    gl.attachShader(program, fragmentShader);
    gl.linkProgram(program);
    gl.useProgram(program);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, "position");
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uniforms = {
      uTime: gl.getUniformLocation(program, 'uTime'),
      uResolution: gl.getUniformLocation(program, 'uResolution'),
      uHue: gl.getUniformLocation(program, 'uHue'),
      uSaturation: gl.getUniformLocation(program, 'uSaturation'),
      uFloorY: gl.getUniformLocation(program, 'uFloorY'),
      uApexY: gl.getUniformLocation(program, 'uApexY'),
      uHalfWidth: gl.getUniformLocation(program, 'uHalfWidth'),
      uFocalLength: gl.getUniformLocation(program, 'uFocalLength'),
      uFogDensity: gl.getUniformLocation(program, 'uFogDensity'),
      uFractalTimeScale: gl.getUniformLocation(program, 'uFractalTimeScale'),
      uTrailTimeScale: gl.getUniformLocation(program, 'uTrailTimeScale'),
      uFractalScale: gl.getUniformLocation(program, 'uFractalScale'),
      uFractalScroll: gl.getUniformLocation(program, 'uFractalScroll'),
      uFractalLevels: gl.getUniformLocation(program, 'uFractalLevels'),
      uLineWidthNear: gl.getUniformLocation(program, 'uLineWidthNear'),
      uLineWidthFar: gl.getUniformLocation(program, 'uLineWidthFar'),
      uLineSoftness: gl.getUniformLocation(program, 'uLineSoftness'),
      uCameraSpeed: gl.getUniformLocation(program, 'uCameraSpeed'),
      uCameraPosition: gl.getUniformLocation(program, 'uCameraPosition'),
      uCameraSway: gl.getUniformLocation(program, 'uCameraSway'),
      uSeamStrength: gl.getUniformLocation(program, 'uSeamStrength'),
      uLightColor: gl.getUniformLocation(program, 'uLightColor'),
      uGlowColor: gl.getUniformLocation(program, 'uGlowColor'),
      uSubstrateColor: gl.getUniformLocation(program, 'uSubstrateColor'),
      uBackgroundColor: gl.getUniformLocation(program, 'uBackgroundColor'),
      uTrailBrightness: gl.getUniformLocation(program, 'uTrailBrightness'),
      uKaleidoscopeSpeed: gl.getUniformLocation(program, 'uKaleidoscopeSpeed'),
      uFateSpeed: gl.getUniformLocation(program, 'uFateSpeed'),
      uMirrors: gl.getUniformLocation(program, 'uMirrors'),
      uNoiseStrength: gl.getUniformLocation(program, 'uNoiseStrength'),
      uDistortionStrength: gl.getUniformLocation(program, 'uDistortionStrength'),
      uUseFilter: gl.getUniformLocation(program, 'u_useFilter'),
      uFilterColor: gl.getUniformLocation(program, 'u_filterColor'),
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
      gl.uniform1f(uniforms.uHue, config.hue ?? 0.0);
      gl.uniform1f(uniforms.uSaturation, config.saturation ?? 1.0);
      gl.uniform1f(uniforms.uFloorY, config.floorY ?? -1.22);
      gl.uniform1f(uniforms.uApexY, config.apexY ?? 1.65);
      gl.uniform1f(uniforms.uHalfWidth, config.halfWidth ?? 1.19);
      gl.uniform1f(uniforms.uFocalLength, config.focalLength ?? 1.1);
      gl.uniform1f(uniforms.uFogDensity, config.fogDensity ?? 0.089);
      gl.uniform1f(uniforms.uFractalTimeScale, config.fractalTimeScale ?? 1.0);
      gl.uniform1f(uniforms.uTrailTimeScale, config.trailTimeScale ?? 0.92);
      gl.uniform2f(uniforms.uFractalScale, config.fractalScaleX ?? 0.54, config.fractalScaleY ?? 0.30);
      gl.uniform1f(uniforms.uFractalScroll, config.fractalScroll ?? 0.26);
      gl.uniform1f(uniforms.uFractalLevels, config.fractalLevels ?? 6.0);
      gl.uniform1f(uniforms.uLineWidthNear, config.lineWidthNear ?? -0.009);
      gl.uniform1f(uniforms.uLineWidthFar, config.lineWidthFar ?? 0.038);
      gl.uniform1f(uniforms.uLineSoftness, config.lineSoftness ?? 0.010);
      gl.uniform1f(uniforms.uCameraSpeed, config.cameraSpeed ?? 1.10);
      gl.uniform3f(uniforms.uCameraPosition, config.cameraX ?? 0.0, config.cameraY ?? -0.97, config.cameraZ ?? 0.0);
      gl.uniform2f(uniforms.uCameraSway, config.cameraSwayX ?? 0.045, config.cameraSwayY ?? 0.000);
      gl.uniform1f(uniforms.uSeamStrength, config.seamStrength ?? 2.64);
      gl.uniform1f(uniforms.uTrailBrightness, config.trailBrightness ?? 0.19);
      gl.uniform1f(uniforms.uKaleidoscopeSpeed, config.kaleidoscopeSpeed ?? 0.50);
      gl.uniform1f(uniforms.uFateSpeed, config.fateSpeed ?? 0.80);
      gl.uniform1f(uniforms.uMirrors, config.mirrors ?? 0.0);
      gl.uniform1f(uniforms.uNoiseStrength, config.noiseStrength ?? 0.25);
      gl.uniform1f(uniforms.uDistortionStrength, config.distortionStrength ?? 0.35);
      gl.uniform1i(uniforms.uUseFilter, config.useFilter ? 1 : 0);

      const filterRgb = hexToRgbaVec(config.filterColor || "#ffffff");
      gl.uniform3f(uniforms.uFilterColor, filterRgb[0], filterRgb[1], filterRgb[2]);

      const lightRgba = hexToRgbaVec(config.lightColor || "#ffffff");
      const glowRgba = hexToRgbaVec(config.glowColor || "#ffffff");
      const substrateRgba = hexToRgbaVec(config.substrateColor || "#ffffff");
      const backgroundRgba = hexToRgbaVec(config.backgroundColor || "#000000");

      gl.uniform4f(uniforms.uLightColor, lightRgba[0], lightRgba[1], lightRgba[2], lightRgba[3]);
      gl.uniform4f(uniforms.uGlowColor, glowRgba[0], glowRgba[1], glowRgba[2], glowRgba[3]);
      gl.uniform4f(uniforms.uSubstrateColor, substrateRgba[0], substrateRgba[1], substrateRgba[2], substrateRgba[3]);
      gl.uniform4f(uniforms.uBackgroundColor, backgroundRgba[0], backgroundRgba[1], backgroundRgba[2], backgroundRgba[3]);

      gl.drawArrays(gl.TRIANGLES, 0, 3);
    };

    const renderLoop = () => {
      const time = globalConfig.paused ? (globalConfig.motion / 100) * 10 : (Date.now() - startTime) * 0.001;
      render(time);
      if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
    };

    renderLoop();
    return () => cancelAnimationFrame(animationFrameId);
  }, [configString, globalConfig.paused, globalConfig.motion]);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />;
}

function hexToRgbaVec(hex: string): [number, number, number, number] {
  let c = hex.substring(1);
  if(c.length === 3) c = c.split('').map(x => x + x).join('');
  const num = parseInt(c, 16);
  return [
    ((num >> 16) & 255) / 255, 
    ((num >> 8) & 255) / 255, 
    (num & 255) / 255, 
    c.length === 8 ? ((num >> 24) & 255) / 255 : 1.0
  ];
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
    return <div style={style}>{children}</div>;
}

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
        {shaders.discGlare.enabled && (
            <ShaderWrapper config={shaders.discGlare} globalConfig={config}>
                <DiscGlareShader config={shaders.discGlare} globalConfig={config} />
            </ShaderWrapper>
        )}
        {shaders.hydrogen.enabled && (
            <ShaderWrapper config={shaders.hydrogen} globalConfig={config}>
                <HydrogenShader config={shaders.hydrogen} globalConfig={config} />
            </ShaderWrapper>
        )}
        {shaders.pulse.enabled && (
            <ShaderWrapper config={shaders.pulse} globalConfig={config}>
                <PulseShader config={shaders.pulse} globalConfig={config} />
            </ShaderWrapper>
        )}
        {shaders.melt.enabled && (
            <ShaderWrapper config={shaders.melt} globalConfig={config}>
                <MeltShader config={shaders.melt} globalConfig={config} />
            </ShaderWrapper>
        )}
        {shaders.truchet.enabled && (
            <ShaderWrapper config={shaders.truchet} globalConfig={config}>
                <TruchetShader config={shaders.truchet} globalConfig={config} />
            </ShaderWrapper>
        )}
        {shaders.neonPolygon.enabled && (
            <ShaderWrapper config={shaders.neonPolygon} globalConfig={config}>
                <NeonPolygonShader config={shaders.neonPolygon} globalConfig={config} />
            </ShaderWrapper>
        )}
        {shaders.exposedFilm.enabled && (
            <ShaderWrapper config={shaders.exposedFilm} globalConfig={config}>
              <ExposedFilmShader config={shaders.exposedFilm} globalConfig={config} />
            </ShaderWrapper>
        )}
        {shaders.psychedelicGlass?.enabled && (
            <ShaderWrapper config={shaders.psychedelicGlass} globalConfig={config}>
                <PsychedelicGlassShader 
                    config={shaders.psychedelicGlass} 
                    globalConfig={config} 
                />
            </ShaderWrapper>
        )}
        {shaders.solarWhirls.enabled && (
            <ShaderWrapper config={shaders.solarWhirls} globalConfig={config}>
              <SolarWhirlsShader config={shaders.solarWhirls} globalConfig={config} />
            </ShaderWrapper>
        )}
        {shaders.chargedCells.enabled && (
            <ShaderWrapper config={shaders.chargedCells} globalConfig={config}>
              <ChargedCellsShader config={shaders.chargedCells} globalConfig={config} />
            </ShaderWrapper>
        )}
        {shaders.refractedWave?.enabled && (
            <ShaderWrapper config={shaders.refractedWave} globalConfig={config}>
                <RefractedWaveShader config={shaders.refractedWave} globalConfig={config} />
            </ShaderWrapper>
        )}
        {shaders.swirl?.enabled && (
          <ShaderWrapper config={shaders.swirl} globalConfig={config}>
            <SwirlShader config={shaders.swirl} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.spiral?.enabled && (
          <ShaderWrapper config={shaders.spiral} globalConfig={config}>
            <SpiralShader config={shaders.spiral} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.neuralNoise?.enabled && (
          <ShaderWrapper config={shaders.neuralNoise} globalConfig={config}>
            <NeuralNoiseShader config={shaders.neuralNoise} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.interstellar?.enabled && (
          <ShaderWrapper config={shaders.interstellar} globalConfig={config}>
            <InterstellarShader config={shaders.interstellar} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.corrodedSpiral?.enabled && (
          <ShaderWrapper config={shaders.corrodedSpiral} globalConfig={config}>
            <CorrodedSpiralShader config={shaders.corrodedSpiral} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.spiralTunnel?.enabled && (
          <ShaderWrapper config={shaders.spiralTunnel} globalConfig={config}>
            <SpiralTunnelShader config={shaders.spiralTunnel} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.fractalVortex?.enabled && (
          <ShaderWrapper config={shaders.fractalVortex} globalConfig={config}>
            <FractalVortexShader config={shaders.fractalVortex} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.infiniteCorridor?.enabled && (
          <ShaderWrapper config={shaders.infiniteCorridor} globalConfig={config}>
            <InfiniteCorridorShader config={shaders.infiniteCorridor} globalConfig={config} />
          </ShaderWrapper>
        )}
      </div>
      <div className="absolute inset-0 w-full h-full z-10 pointer-events-none">
          {allElements.map((el) => {
              if(el.disabled) return null;
              if (el.type === 'shape') {
                  const shapeConfig = el as ShapeConfig;
                  return <Shape key={shapeConfig.key} shapeConfig={shapeConfig} corrosionFreq={corrosionFreq[shapeConfig.id]} config={config} />
              }
              if (el.type === 'text') {
                  const textConfig = el as TextConfig;
                  return <TextElement key={textConfig.key} textConfig={textConfig} />
              }
              if (el.type === 'icon') {
                  const iconConfig = el as IconConfig;
                  return <IconElement key={iconConfig.key} iconConfig={iconConfig} />;
              }
              return null;
          })}
      </div>

        {overlay.enabled && (
            <div className="absolute inset-0 pointer-events-none z-20" style={{
                backdropFilter: `blur(${overlay.blur}px)${overlay.invert ? ' invert(1)' : ''}`,
                backgroundColor: `rgba(255,255,255, ${overlay.lighten})`,
            }}>
                <div className="absolute inset-0" style={{
                    backgroundColor: `rgba(0,0,0, ${overlay.darken})`,
                }}></div>
            </div>
        )}

        {(grainAmount > 0 || scanlines > 0 || (overlay.noise && overlay.noise.enabled)) && (
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-30">
                {grainAmount > 0 && <div className="grain-overlay" style={{'--grain-amount': grainAmount, '--grain-size': grainSize} as React.CSSProperties}></div>}
                {scanlines > 0 && <div className="scanlines-overlay" style={{'--scanlines-opacity': scanlines, '--scanlines-width': scanlineWidth} as React.CSSProperties}></div>}
                {overlay.noise && overlay.noise.enabled && (
                    <div className="noise-overlay" style={{opacity: overlay.noise.opacity}}>
                        <svg width="100%" height="100%" className='absolute inset-0'>
                            <defs>
                                <filter id="warped-noise">
                                    <feTurbulence type="fractalNoise" baseFrequency="0.01 0.03" numOctaves="1" seed={overlay.noise.seed} result="warp" />
                                    <feDisplacementMap in="SourceGraphic" in2="warp" scale={overlay.noise.scale} />
                                </filter>
                                <filter id="cellular-noise">
                                    <feTurbulence type="fractalNoise" baseFrequency={overlay.noise.frequency.toString()} numOctaves="1" seed={overlay.noise.seed} result="noise" />
                                    <feColorMatrix in="noise" type="matrix" values="1 0 0 0 0, 0 1 0 0 0, 0 0 1 0 0, 0 0 0 -1 1" result="map" />
                                    <feConvolveMatrix in="map" order="3" kernelMatrix="1 1 1 1 -8 1 1 1 1" />
                                    <feGaussianBlur stdDeviation="0.5" />
                                </filter>
                                <filter id="electric-noise">
                                    <feTurbulence type="fractalNoise" baseFrequency={overlay.noise.frequency.toString()} numOctaves="3" seed={overlay.noise.seed} />
                                    <feComponentTransfer>
                                        <feFuncA type="discrete" tableValues={`0 ${'1 '.repeat(overlay.noise.levels - 1)}`} />
                                    </feComponentTransfer>
                                </filter>
                                <filter id="cloudy-noise">
                                    <feTurbulence type="fractalNoise" baseFrequency={overlay.noise.frequency.toString()} numOctaves="5" seed={overlay.noise.seed} stitchTiles="stitch" />
                                    <feColorMatrix type="saturate" values="0"/>
                                </filter>
                            </defs>
                            {overlay.noise.type === 'fractal' && <rect width="100%" height="100%" filter={`url(#fractal-noise-filter-${overlay.noise.seed})`} />}
                            <filter id={`fractal-noise-filter-${overlay.noise.seed}`}>
                                <feTurbulence type="fractalNoise" baseFrequency={overlay.noise.frequency} numOctaves={overlay.noise.octaves} seed={overlay.noise.seed} stitchTiles="stitch" />
                            </filter>
                             {overlay.noise.type === 'turbulence' && <rect width="100%" height="100%" filter={`url(#turbulence-noise-filter-${overlay.noise.seed})`} />}
                            <filter id={`turbulence-noise-filter-${overlay.noise.seed}`}>
                                <feTurbulence type="turbulence" baseFrequency={overlay.noise.frequency} numOctaves={overlay.noise.octaves} seed={overlay.noise.seed} stitchTiles="stitch" />
                            </filter>
                            {overlay.noise.type === 'warped' && <rect width="100%" height="100%" filter="url(#warped-noise)" />}
                            {overlay.noise.type === 'cellular' && <rect width="100%" height="100%" filter="url(#cellular-noise)" />}
                            {overlay.noise.type === 'electric' && <rect width="100%" height="100%" filter="url(#electric-noise)" />}
                            {overlay.noise.type === 'cloudy' && <rect width="100%" height="100%" filter="url(#cloudy-noise)" />}
                        </svg>
                    </div>
                )}
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
            z-index: 100;
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
        
        .noise-overlay {
            position: absolute;
            inset: 0;
            width: 100%;
            height: 100%;
            pointer-events: none;
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
            background-size: 100% calc(var(--scanlines-width, 1) * 2px);
            opacity: var(--scanlines-opacity, 0);
            z-index: 101;
        }
      `}</style>
    </div>
  );
}

function getTrianglePath(shapeConfig: ShapeConfig): string {
    const { angleA, angleB } = shapeConfig.triangle;
    const h = shapeConfig.triangle.height;
    const w = shapeConfig.width; // Use main width as bounding box
    
    if (angleA <= 0 || angleB <= 0 || (angleA + angleB >= 180) || h <= 0) {
        return `M ${w / 2},0 L ${w},${h} L 0,${h} Z`;
    }

    const rad = (deg: number) => deg * Math.PI / 180;
    
    // Find bottom length (base) based on height and angles
    const base = h * (1/Math.tan(rad(angleA)) + 1/Math.tan(rad(angleB)));
    
    const scaleFactor = w / base;
    const scaledHeight = h * scaleFactor;

    // Position of vertex B is (0, h), C is (b, h)
    const xA = w * (1/Math.tan(rad(angleB))) / (1/Math.tan(rad(angleA)) + 1/Math.tan(rad(angleB)));
    const yA = 0;
    
    // Fallback for extreme angles
    const topX = isNaN(xA) ? w/2 : xA;

    return `M ${topX},${yA} L ${w},${scaledHeight} L 0,${scaledHeight} Z`;
}

function getBeamPath(shapeConfig: ShapeConfig): string {
    const { height, beam } = shapeConfig;
    const { spreadStart, spreadEnd } = beam;
    const width = Math.max(spreadStart, spreadEnd);

    const halfSpreadStart = spreadStart / 2;
    const halfSpreadEnd = spreadEnd / 2;

    const topL = { x: (width - spreadStart) / 2, y: 0 };
    const topR = { x: topL.x + spreadStart, y: 0 };
    const botL = { x: (width - spreadEnd) / 2, y: height };
    const botR = { x: botL.x + spreadEnd, y: height };

    return `M ${topL.x},${topL.y} L ${topR.x},${topR.y} L ${botR.x},${botR.y} L ${botL.x},${botL.y} Z`;
}

function getQuadraticPath(shapeConfig: ShapeConfig): string {
    const { width, height, quadratic } = shapeConfig;
    const aperture = quadratic.aperture;

    // Control point for the curve, influenced by aperture
    // aperture = 0 -> flat line, aperture = 1 -> deep curve
    const controlY = height * (1 - aperture);

    return `M 0,${height} Q ${width / 2},${controlY} ${width},${height}`;
}

function getHalfCirclePath(shapeConfig: ShapeConfig): string {
    const { width, height } = shapeConfig;
    const radiusX = width / 2;
    const radiusY = height;
    return `M 0,${radiusY} A ${radiusX},${radiusY} 0 0 1 ${width},${radiusY} L 0,${radiusY} Z`;
}


function getPositionStyles(
    positionOrigin: PositionOrigin, 
    xOffset: number, 
    yOffset: number, 
    offsetUnit: Unit
) {
    let top: string | number = 'auto', left: string | number = 'auto', right: string | number = 'auto', bottom: string | number = 'auto';
    let transformParts: string[] = [];

    const xVal = `${xOffset}${offsetUnit}`;
    const yVal = `${yOffset}${offsetUnit}`;

    if (positionOrigin.includes('top')) { top = yVal; }
    if (positionOrigin.includes('bottom')) { bottom = yVal; }
    if (positionOrigin.includes('left')) { left = xVal; }
    if (positionOrigin.includes('right')) { right = xVal; }

    if (positionOrigin === 'center') {
        top = '50%';
        left = '50%';
        transformParts.push(`translate(calc(-50% + ${xVal}), calc(-50% + ${yVal}))`);
    } else {
        if(positionOrigin.includes('-center')) { // vertical or horizontal center
             if (positionOrigin.startsWith('left') || positionOrigin.startsWith('right')) {
                top = '50%';
                transformParts.push(`translateY(calc(-50% + ${yVal}))`);
             } else { // top-center, bottom-center
                left = '50%';
                transformParts.push(`translateX(calc(-50% + ${xVal}))`);
             }
        }
    }
    
    return { top, left, right, bottom, transform: transformParts.join(' ') };
}

const TextElement = ({ textConfig }: { textConfig: TextConfig }) => {
    const {
        content, color, fontSize, fontWeight, rotation, zIndex, fontFamily,
        positionOrigin, xOffset, yOffset, offsetUnit, fillMode, strokeWidth
    } = textConfig;

    const { top, left, right, bottom, transform: positionTransform } = getPositionStyles(positionOrigin, xOffset, yOffset, offsetUnit);

    const style: React.CSSProperties = {
        position: 'absolute',
        color: fillMode === 'fill' ? color : 'transparent',
        fontFamily: `'${fontFamily}', sans-serif`,
        fontSize: `${fontSize}px`,
        fontWeight: fontWeight,
        transform: [positionTransform, `rotate(${rotation}deg)`].filter(Boolean).join(' '),
        top, left, right, bottom,
        zIndex: zIndex,
        whiteSpace: 'pre-wrap',
        textAlign: 'center',
        WebkitTextStroke: fillMode === 'stroke' ? `${strokeWidth}px ${color}` : 'none',
        transformOrigin: 'center center',
    };

    return <div style={style}>{content}</div>;
};

const Icon = ({ name, ...props }: { name: string } & icons.LucideProps) => {
    const LucideIcon = icons[name as keyof typeof icons] as React.FC<icons.LucideProps>;
  
    if (!LucideIcon) {
      // Fallback for invalid icon names
      return <icons.HelpCircle {...props} />;
    }
  
    return <LucideIcon {...props} />;
};
  
const IconElement = ({ iconConfig }: { iconConfig: IconConfig }) => {
    const {
        iconName, color, size, strokeWidth, rotation, zIndex,
        positionOrigin, xOffset, yOffset, offsetUnit
    } = iconConfig;

    const { top, left, right, bottom, transform: positionTransform } = getPositionStyles(positionOrigin, xOffset, yOffset, offsetUnit);

    const style: React.CSSProperties = {
        position: 'absolute',
        transform: [positionTransform, `rotate(${rotation}deg)`].filter(Boolean).join(' '),
        top, left, right, bottom,
        zIndex: zIndex,
        transformOrigin: 'center center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    };

    return (
        <div style={style}>
            <Icon 
                name={iconName}
                color={color}
                size={size}
                strokeWidth={strokeWidth}
            />
        </div>
    );
};


const Shape = ({ shapeConfig, corrosionFreq, config }: { shapeConfig: ShapeConfig, corrosionFreq: number, config: GradientConfig }) => {
    const {
        positionOrigin, xOffset, yOffset, offsetUnit, 
        width, height, sizeUnit,
        zIndex, animation, shape, fillMode, stroke, overflow,
        rotation: staticRotation,
    } = shapeConfig;

    const { top, left, right, bottom, transform: positionTransform } = getPositionStyles(positionOrigin, xOffset, yOffset, offsetUnit);
    const [dynamicTransform, setDynamicTransform] = useState('');
    const pathRef = useRef<SVGPathElement>(null);
    const shapeConfigString = JSON.stringify(shapeConfig);
    
    const keyframes = `
        @keyframes rotate_${shapeConfig.id} {
            from { transform: rotate(0deg); }
            to { transform: rotate(${shapeConfig.animation.rotation.direction === 'clockwise' ? '360deg' : '-360deg'}); }
        }
    `;

    useEffect(() => {
      let frameId: number;

      const animate = () => {
        let transforms = [];
        const now = Date.now();

        if (animation.mode === 'shift' && animation.shift.duration > 0) {
            const time = (now / 1000) % animation.shift.duration;
            const cycle = time / animation.shift.duration;
            const shiftProgress = Math.sin(cycle * Math.PI * 2);
            const x = shiftProgress * animation.shift.extentX;
            const y = shiftProgress * animation.shift.extentY;
            transforms.push(`translate(${x}px, ${y}px)`);
        }
        
        if (animation.mode === 'pulsate' && animation.pulsate && animation.pulsate.duration > 0) {
            const time = (now / 1000) % animation.pulsate.duration;
            const cycle = 0.5 - Math.cos(time * Math.PI * 2 / animation.pulsate.duration) * 0.5;
            const scale = (animation.pulsate.minSize) + ((animation.pulsate.maxSize) - (animation.pulsate.minSize)) * cycle;
            transforms.push(`scale(${scale})`);
        }
        
        setDynamicTransform(transforms.join(' '));
        
        if (!config.paused && (animation.mode === 'shift' || animation.mode === 'pulsate')) {
            frameId = requestAnimationFrame(animate);
        }
      }
      
      if (!config.paused && (animation.mode === 'shift' || animation.mode === 'pulsate')) {
        frameId = requestAnimationFrame(animate);
      } else {
        setDynamicTransform('');
      }

      return () => cancelAnimationFrame(frameId);

    }, [config.paused, animation, shapeConfigString]);
    
    useEffect(() => {
        let transforms = [];
        if (config.paused) {
            const time = config.motion / 100;
            if (animation.mode === 'shift' && animation.shift.duration > 0) {
                const shiftTime = time * animation.shift.duration;
                const shiftProgress = Math.sin(shiftTime * Math.PI * 2);
                const x = shiftProgress * animation.shift.extentX;
                const y = shiftProgress * animation.shift.extentY;
                transforms.push(`translate(${x}px, ${y}px)`);
            }
             if (animation.mode === 'pulsate' && shapeConfig.animation.pulsate && shapeConfig.animation.pulsate.duration > 0) {
                const pulsateTime = time * shapeConfig.animation.pulsate.duration;
                const pulsateProgress = 0.5 - Math.cos(pulsateTime * Math.PI * 2) * 0.5;
                const scale = (shapeConfig.animation.pulsate.minSize || 0.8) + ((shapeConfig.animation.pulsate.maxSize || 1.2) - (shapeConfig.animation.pulsate.minSize || 0.8)) * pulsateProgress;
                transforms.push(`scale(${scale})`);
            }
        }
        setDynamicTransform(transforms.join(' '));
    }, [config.paused, config.motion, animation, shapeConfig]);

     const shapeWrapperStyle: React.CSSProperties = {
        position: 'absolute',
        width: `${width}${sizeUnit}`,
        height: `${height}${sizeUnit}`,
        zIndex: zIndex,
        willChange: 'transform, opacity',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        top,
        left,
        right,
        bottom,
        transform: [positionTransform, dynamicTransform].filter(Boolean).join(' '),
        transformOrigin: `center center`,
     };
     
     const animationWrapperStyle: React.CSSProperties = {
        position: 'absolute',
        width: `calc(100% + ${overflow * 2}px)`,
        height: `calc(100% + ${overflow * 2}px)`,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'visible',
        animation: (!config.paused && animation.mode === 'rotate') ? `rotate_${shapeConfig.id} ${animation.rotation.speed}s linear infinite` : 'none',
        transform: `rotate(${staticRotation}deg)`,
        transformOrigin: `${shapeConfig.transformOrigin.x}% ${shapeConfig.transformOrigin.y}%`,
     }

    const gradient = shapeConfig.gradient || { colors: [], angle: 90 };
    const gradientColors = (gradient.colors || [])
        .sort((a,b) => a.stop - b.stop)
        .map(c => `${c.color} ${c.stop}%`)
        .join(', ');

    const innerShapeStyle: React.CSSProperties = {
        width: '100%',
        height: '100%',
        backgroundColor: fillMode === 'fill' ? shapeConfig.color : 'transparent',
        backgroundImage: (fillMode === 'gradient' && gradientColors) ? `linear-gradient(${gradient.angle}deg, ${gradientColors})` : 'none',
        border: (fillMode === 'stroke') ? `${stroke.width}px solid ${shapeConfig.color}` : 'none',
        borderRadius: (shape === 'rectangle') ? `${shapeConfig.borderRadius.value}${shapeConfig.borderRadius.unit}` : undefined,
        mixBlendMode: 'screen',
        filter: `url(#shape-corrosion-${shapeConfig.id})`,
        opacity: 1
    };

    let viewBox = `0 0 ${width} ${height}`;
    if (shape === 'triangle') viewBox = `0 0 ${shapeConfig.width} ${shapeConfig.height}`;
    if (shape === 'beam') viewBox = `0 0 ${Math.max(shapeConfig.beam.spreadStart, shapeConfig.beam.spreadEnd)} ${shapeConfig.height}`;
    if (shape === 'quadratic' || shape === 'half-circle') viewBox = `0 0 ${width} ${height}`;
    
    const gradientId = `gradient-${shapeConfig.id}`;
    const svgFill = (fillMode === 'gradient' && gradient.colors && gradient.colors.length > 0)
        ? `url(#${gradientId})` 
        : (fillMode === 'fill' ? shapeConfig.color : 'none');

    return (
        <>
            <style>{keyframes}</style>
             <div style={shapeWrapperStyle}>
                <div id={`anim-wrapper-${shapeConfig.id}`} style={animationWrapperStyle}>
                     {(shape === 'rectangle' || shape === 'star') && (
                        <div style={{
                            ...innerShapeStyle,
                            clipPath: shape === 'star' ? 'polygon(50% 0%, 61% 35%, 98% 35%, 68% 57%, 79% 91%, 50% 70%, 21% 91%, 32% 57%, 2% 35%, 39% 35%)' : undefined,
                        }} />
                     )}

                     {(shape === 'triangle' || shape === 'beam' || shape === 'quadratic' || shape === 'half-circle') && (
                        <svg viewBox={viewBox} width="100%" height="100%" style={{filter: `url(#shape-corrosion-${shapeConfig.id})`, mixBlendMode: 'screen', overflow: 'visible'}}>
                            {fillMode === 'gradient' && gradient.colors && gradient.colors.length > 0 && (
                                <defs>
                                    <linearGradient id={gradientId} x1="0%" y1="0%" x2="100%" y2="0%" gradientTransform={`rotate(${gradient.angle})`}>
                                        {gradient.colors.sort((a,b) => a.stop - b.stop).map(c => (
                                            <stop key={c.id} offset={`${c.stop}%`} stopColor={c.color} />
                                        ))}
                                    </linearGradient>
                                </defs>
                            )}
                            <path 
                                ref={pathRef}
                                d={
                                    shape === 'triangle' ? getTrianglePath(shapeConfig) : 
                                    shape === 'beam' ? getBeamPath(shapeConfig) :
                                    shape === 'quadratic' ? getQuadraticPath(shapeConfig) :
                                    shape === 'half-circle' ? getHalfCirclePath(shapeConfig) : ''
                                }
                                fill={svgFill}
                                stroke={fillMode === 'stroke' ? shapeConfig.color : 'none'}
                                strokeWidth={fillMode === 'stroke' ? stroke.width : 0}
                            />
                        </svg>
                     )}
                </div>
            </div>
            
             <svg width="0" height="0" className="absolute">
                <defs>
                    <filter id={`shape-corrosion-${shapeConfig.id}`} x="-50%" y="-50%" width="200%" height="200%">
                        <feTurbulence 
                            type="fractalNoise" 
                            baseFrequency={corrosionFreq}
                            numOctaves="2" 
                            result={`noise-${shapeConfig.id}`} 
                        >
                             {!config.paused && (
                                <animate 
                                    attributeName="baseFrequency" 
                                    dur={`${animation.rotation.speed}s`} 
                                    values={`${corrosionFreq};${corrosionFreq * 1.5};${corrosionFreq}`} 
                                    repeatCount="indefinite" 
                                    restart="always"
                                    begin="0s"
                                    keyTimes="0;0.5;1"
                                    calcMode="spline"
                                    keySplines="0.42 0 0.58 1;0.42 0 0.58 1"
                                />
                             )}
                        </feTurbulence>
                        <feDisplacementMap in="SourceGraphic" in2={`noise-${shapeConfig.id}`} scale={shapeConfig.corrosion * 2} />
                    </filter>
                </defs>
            </svg>
        </>
    )
}
