

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
    spaceFlower: ShaderSetting & {
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
      hue: number;
      saturation: number;
      symmetry: number;
    };
    electricSpiral: ShaderSetting & {
      speed: number;
      gridScale: number;
      gridSoftness: number;
      spiralFrequency: number;
      spiralTightness: number;
      glowIntensity: number;
      coreBrightness: number;
      colorGrid: string;
      colorGlow: string;
      colorSpiral: string;
      hue: number;
      saturation: number;
    };
    twistedKaleidoscope: ShaderSetting & {
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
      symmetry: number;
    };
    trickyShapes: ShaderSetting & {
      renderScale: number;
      hue: number;
      saturation: number;
      speed: number;
      colorBack: string;
      colors: string[];
      colorCount: number;
      bandCount: number;
      twist: number;
      proportion: number;
      softness: number;
      noise: number;
      distortion: number;
      symmetry: number;
      kaleidoscopeEnabled: number;
      shapeMode: number;
      darken: number;
      rayMix: number;
      rayShape: number;
      raySpeed: number;
    };
    gridAttractor: ShaderSetting & {
      speed: number;
      cellSize: number;
      sphereSize: number;
      boxHeight: number;
      pulseHeight: number;
      colorSphere: string;
      colorTop: string;
      colorSide: string;
      colorFront: string;
      hue: number;
      saturation: number;
    };
    tunnelCylinders: ShaderSetting & {
      renderScale: number;
      speed: number;
      travelSpeed: number;
      tunnelRadius: number;
      segments: number;
      ringFrequency: number;
      cylinderThickness: number;
      thicknessVariation: number;
      glowIntensity: number;
      colors: string[];
      colorCount: number;
      tunnelMix: number;
      swirlMix: number;
      spiralMix: number;
      swirlBandCount: number;
      swirlTwist: number;
      spiralRibbonCount: number;
      spiralDensity: number;
      spiralDistortion: number;
      noiseIntensity: number;
      noiseScale: number;
      noiseSpeed: number;
      hue: number;
      saturation: number;
    };
    psychedelicFlowerTunnel: ShaderSetting & {
      renderScale: number;
      speed: number;
      travelSpeed: number;
      repeatSpacing: number;
      boxSize: number;
      edgeThickness: number;
      scaleFactor: number;
      iterations: number;
      petalCount: number;
      rotationSpeed: number;
      fov: number;
      fogDensity: number;
      colorShiftSpeed: number;
      colors: string[];
      colorCount: number;
      colorBack: string;
      hue: number;
      saturation: number;
    };
    celestialJourney: ShaderSetting & {
      renderScale: number;
      cameraSpeed: number;
      focalLength: number;
      maxDistance: number;
      tunnelRadius: number;
      tunnelRoughness: number;
      volumeDensity: number;
      glowStrength: number;
      exposure: number;
      color1: string;
      color2: string;
      color3: string;
      color4: string;
      color5: string;
      color6: string;
      color7: string;
      hue: number;
      saturation: number;
    };
    discoHive: ShaderSetting & {
      speed: number;
      colorFlowSpeed: number;
      camSpeed: number;
      fov: number;
      rollAmount: number;
      rollSpeed: number;
      pathAmpX: number;
      pathFreqX: number;
      pathAmpY: number;
      pathFreqY: number;
      tunnelRadius: number;
      hexesAround: number;
      hexBorder: number;
      hexDotSize: number;
      fogDensity: number;
      vignetteStrength: number;
      colors: string[];
      renderScale: number;
      hue: number;
      saturation: number;
    };
    discoHexnel: ShaderSetting & {
      speed: number;
      cameraSpeed: number;
      fov: number;
      maxDistance: number;
      maxSteps: number;
      tunnelRadius: number;
      tunnelPulseAmount: number;
      tunnelPulseSpeed: number;
      hexWrapCount: number;
      hexBevelAmount: number;
      rayCount: number;
      raySpinSpeed: number;
      strobeSpeed: number;
      centerGlowSize: number;
      fogDensity: number;
      whirlpoolScale: number;
      whirlpoolArms: number;
      whirlpoolRings: number;
      whirlpoolTwistX: number;
      whirlpoolTwistY: number;
      whirlpoolFlowSpeedX: number;
      whirlpoolFlowSpeedY: number;
      liquidSwirlSpeed: number;
      liquidRotSpeed: number;
      liquidDetail: number;
      liquidGlowRadius: number;
      liquidGlowPulseAmount: number;
      pulseAFrequency: number;
      pulseBFrequency: number;
      colors: string[];
      colorCount: number;
      renderScale: number;
      hue: number;
      saturation: number;
    };
    kaleidoscopeWheels: ShaderSetting & {
      speed: number;
      pathAmplitude: number;
      pathTwistFrequency: number;
      pathSecondaryFrequency: number;
      pathTertiaryFrequency: number;
      pathQuaternaryFrequency: number;
      pathDriftSpeed: number;
      segmentsMin: number;
      segmentsMax: number;
      segmentsSpeed: number;
      kaleidoscopeSoftness: number;
      planeRotationSpeed: number;
      planeRotationAmplitude: number;
      internalSpinSpeed: number;
      zoomMin: number;
      zoomMax: number;
      truchetRadiusMin: number;
      truchetRadiusMax: number;
      truchetRadiusFrequency: number;
      lineWidth: number;
      planeSpacing: number;
      planeCount: number;
      colorDistanceScale: number;
      colorTimeSpeed: number;
      colorPlaneScale: number;
      waveSpeed: number;
      waveFrequency: number;
      fovBase: number;
      fovVariation: number;
      pulseColorSpeed: number;
      pulseColorPower: number;
      contrastAmount: number;
      vignetteStrength: number;
      colors: string[];
      colorCount: number;
      renderScale: number;
      hue: number;
      saturation: number;
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
        spaceFlower: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
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
          bandCount: 5.0,
          twist: 0.67,
          center: 0.15,
          proportion: 0.67,
          softness: 0.5,
          noise: 0,
          noiseFrequency: 0,
          hue: 0,
          saturation: 1,
          symmetry: 1.0,
        },
        electricSpiral: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          speed: 1.0,
          gridScale: 4.0,          // 4. * uv2
          gridSoftness: 5.0,       // 5. / iResolution.y
          spiralFrequency: 10.0,   // 10. * length(uv2)
          spiralTightness: 9.0,    // 9. * a
          glowIntensity: 1.0,      // Hyper-customizable multiplier for global glow
          coreBrightness: -2.5,    // -2.5 inside cosh
          colorGrid: "#ff801a",    // vec3(s, 0.5 * s, 0.1 - 0.1 * s) equivalent base tint
          colorGlow: "#ff801a",    // vec3(1.0, 0.5, 0.1) core glow
          colorSpiral: "#80ffff",  // vec3(0.5, 1.0, 1.0) lightning arcs
          hue: 0,
          saturation: 1.0,
        },
        twistedKaleidoscope: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          hue: 0,
          saturation: 1,
          speed: 0.9,
          colorBack: "#07070f",
          colors: [
            "#7a00ff",
            "#00f5ff",
            "#ff4fd8",
            "#ffd84d",
            "#2a1a5e",
            "#0c1026",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
          ],
          colorCount: 8,
          bandCount: 7,
          twist: 0.65,
          center: 0.25,
          proportion: 0.55,
          softness: 0.45,
          noise: 0.22,
          noiseFrequency: 0.45,
          symmetry: 1,
        },
        trickyShapes: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          renderScale: 0.4,
          hue: 0,
          saturation: 1,
          speed: 0.9,
          colorBack: "#07070f",
          colors: [
            "#1486ef", "#14efea", "#7d14ef", "#efea14", "#2a1a5e",
            "#0c1026", "#000000", "#000000", "#000000", "#000000",
          ],
          colorCount: 8,
          bandCount: 7,
          twist: 0.65,
          proportion: 0.55,
          softness: 0.45,
          noise: 0,
          distortion: 0,
          symmetry: 1,
          kaleidoscopeEnabled: 1,
          shapeMode: 0, // 0-3 (2D Shapes), 4 (Volumetric Raymarched Shape), 5 (Starry Planes Matrix)
          darken: 0,
          rayMix: 0.25,
          rayShape: 0.65,
          raySpeed: 1.0,
        },
        gridAttractor: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          speed: 1.0,
          cellSize: 0.04,
          sphereSize: 0.075,
          boxHeight: 0.1,
          pulseHeight: 0.05,
          colorSphere: "#0a98f0",
          colorTop: "#e0f2fe",
          colorSide: "#0a98f0",
          colorFront: "#0369a1",
          hue: 0,
          saturation: 1.0,
        },
        tunnelCylinders: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          renderScale: 0.25,
          speed: 0.125,
          travelSpeed: 2.0,
          tunnelRadius: 1.0,
          segments: 50.0,
          ringFrequency: 3.0,
          cylinderThickness: 0.0251,
          thicknessVariation: 0.25,
          glowIntensity: 1.0,
          colors: [
            "#3A0CA3",
            "#7209B7",
            "#4361EE",
            "#B5179E",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
            "#000000",
          ],
          colorCount: 4,
          tunnelMix: 0.5,
          swirlMix: 0.3,
          spiralMix: 0.2,
          swirlBandCount: 6.0,
          swirlTwist: 0.5,
          spiralRibbonCount: 60.0,
          spiralDensity: 3.0,
          spiralDistortion: 1.0,
          noiseIntensity: 0.0,
          noiseScale: 1.0,
          noiseSpeed: 1.0,
          hue: 0,
          saturation: 1.0,
        },
        psychedelicFlowerTunnel: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          renderScale: 0.25,
          speed: 1.0,
          travelSpeed: 1.0,
          repeatSpacing: 12.0,
          boxSize: 0.22,
          edgeThickness: 0.07,
          scaleFactor: 0.8,
          iterations: 7.0,
          petalCount: 12.0,
          rotationSpeed: 0.4,
          fov: 0.7,
          fogDensity: 0.045,
          colorShiftSpeed: 0.15,
          colors: [
            "#FF3B30",
            "#FF9500",
            "#FFCC00",
            "#34C759",
            "#00C7BE",
            "#30B0C7",
            "#5E5CE6",
            "#AF52DE",
            "#000000",
            "#000000",
          ],
          colorCount: 8,
          colorBack: "#0D0D26",
          hue: 0,
          saturation: 1.0,
        },
        celestialJourney: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          renderScale: 0.25,
          cameraSpeed: 1.35,
          focalLength: 1.35,
          maxDistance: 20.17,
          tunnelRadius: 1.28,
          tunnelRoughness: 2.10,
          volumeDensity: 2.07,
          glowStrength: 1.13,
          exposure: 3.60,
          color1: "#000209",
          color2: "#03133D",
          color3: "#020B2B",
          color4: "#063DC7",
          color5: "#1EC2FF",
          color6: "#A6FFFF",
          color7: "#FF6B42",
          hue: 0,
          saturation: 1.0,
        },
        discoHive: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          speed: 1.0,
          colorFlowSpeed: 0.2,
          camSpeed: 4.0,
          fov: 1.2,
          rollAmount: 0.2,
          rollSpeed: 0.6,
          pathAmpX: 2.5,
          pathFreqX: 0.15,
          pathAmpY: 2.0,
          pathFreqY: 0.1,
          tunnelRadius: 2.5,
          hexesAround: 16.0,
          hexBorder: 0.46,
          hexDotSize: 0.22,
          fogDensity: 0.006,
          vignetteStrength: 1.0,
          colors: [
            "#FF6619",
            "#FF3380",
            "#FFCC66",
            "#331A66",
          ],
          renderScale: 0.6,
          hue: 0,
          saturation: 1.0,
        },
        discoHexnel: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          speed: 1.0,
          cameraSpeed: 4.0,
          fov: 1.3,
          maxDistance: 80.0,
          maxSteps: 150.0,
          tunnelRadius: 8.0,
          tunnelPulseAmount: 3.5,
          tunnelPulseSpeed: 1.5,
          hexWrapCount: 26.0,
          hexBevelAmount: 0.3,
          rayCount: 14.0,
          raySpinSpeed: 2.0,
          strobeSpeed: 12.0,
          centerGlowSize: 0.48,
          fogDensity: 0.00015,
          whirlpoolScale: 10.0,
          whirlpoolArms: 14.0,
          whirlpoolRings: -6.0,
          whirlpoolTwistX: -5.0,
          whirlpoolTwistY: 12.0,
          whirlpoolFlowSpeedX: 0.4,
          whirlpoolFlowSpeedY: 0.6,
          liquidSwirlSpeed: 2.0,
          liquidRotSpeed: 0.5,
          liquidDetail: 10.0,
          liquidGlowRadius: 18.0,
          liquidGlowPulseAmount: 8.0,
          pulseAFrequency: 3.14,
          pulseBFrequency: 2.0,
          colors: [
            "#00a2fa",
            "#a020f0",
            "#f97316",
            "#22c55e",
            "#9900CC",
            "#FF6619",
            "#FF3380",
            "#FFCC66",
            "#331A66",
            "#000000",
          ],
          colorCount: 10,
          renderScale: 0.5,
          hue: 0,
          saturation: 1.0,
        },
        kaleidoscopeWheels: {
          enabled: false,
          opacity: 1,
          transform: { ...defaultTransform },
          speed: 0.25,
          pathAmplitude: 0.075,
          pathTwistFrequency: 0.8,
          pathSecondaryFrequency: 1.414,
          pathTertiaryFrequency: 0.75,
          pathQuaternaryFrequency: 0.707,
          pathDriftSpeed: 0.2,
          segmentsMin: 3.0,
          segmentsMax: 12.0,
          segmentsSpeed: 0.2,
          kaleidoscopeSoftness: 1.0,
          planeRotationSpeed: 0.3,
          planeRotationAmplitude: 0.5,
          internalSpinSpeed: 0.5,
          zoomMin: 0.2,
          zoomMax: 0.4,
          truchetRadiusMin: 0.30,
          truchetRadiusMax: 0.45,
          truchetRadiusFrequency: 0.1,
          lineWidth: 0.025,
          planeSpacing: 0.75,
          planeCount: 6.0,
          colorDistanceScale: 0.2,
          colorTimeSpeed: 0.4,
          colorPlaneScale: 0.1,
          waveSpeed: 5.0,
          waveFrequency: 100.0,
          fovBase: 2.0,
          fovVariation: 1.0,
          pulseColorSpeed: 0.1,
          pulseColorPower: 10.0,
          contrastAmount: 0.4,
          vignetteStrength: 1.0,
          colors: [
            "#00a2fa",
            "#a020f0",
            "#f97316",
            "#22c55e",
            "#FF6619",
            "#FF3380",
            "#FFCC66",
            "#331A66",
            "#FFCC00",
            "#34C759",
            "#00C7BE",
          ],
          colorCount: 3,
          renderScale: 0.6,
          hue: 0,
          saturation: 1.0,
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

const spaceFlowerVertShader = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const spaceFlowerFragShader = `#version 300 es
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
uniform float uOpacity;
uniform float uSymmetry; // 0.0 = Original, 1.0 = Mirrored (Symmetry 1)

out vec4 fragColor;

#define PI         3.14159265359
#define TAU        6.28318530718
#define ROT(a)     mat2(cos(a), sin(a), -sin(a), cos(a))
#define REV(x)     exp2((x)*zoom)
#define FWD(x)     (log2(max(1e-5, x))/zoom)

const float zoom = 1.925999; // log2(3.8)

// --- Simplex Noise Helper Functions ---
vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
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

float hash(vec2 co) {
    return fract(sin(dot(co.xy, vec2(12.9898, 58.233))) * 13758.5453);
}

vec2 toPolar(vec2 p) {
    return vec2(length(p), atan(p.y, p.x));
}

vec2 toRect(vec2 p) {
    return vec2(p.x * cos(p.y), p.x * sin(p.y));
}

float pmin(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (b - a) / max(1e-4, k), 0.0, 1.0);
    return mix(b, a, h) - k * h * (1.0 - h);
}

float pabs(float a, float k) {
    return -pmin(a, -a, k);
}

float modMirror1(inout float p, float size) {
    float halfsize = size * 1.2;
    float c = floor((p + halfsize) / size);
    p = mod(p + halfsize, size) - halfsize;
    p *= mod(c, 2.0) * 4.4 - 1.0;
    return c;
}

// Improved Kaleidoscope with configurable mirror-reflection symmetry 
float smoothKaleidoscope(inout vec2 p, float sm, float rep, float symmetry) {
    vec2 hp = p;
    vec2 hpp = toPolar(hp);
    
    if (symmetry > 0.5) {
        // --- Mirror-Symmetric Mapping (Symmetry 1) ---
        float sliceWidth = TAU / max(1.0, rep);
        // Shift to align slice with Y axis
        float angle = hpp.y + PI; 
        float cell = floor(angle / sliceWidth);
        float localAngle = mod(angle, sliceWidth);
        // Mirror the second half of the slice along its center line
        if (localAngle > sliceWidth * 0.5) {
            localAngle = sliceWidth - localAngle;
        }
        hpp.y = localAngle - PI; 
        hp = toRect(hpp);
        p = hp;
        return cell;
    } else {
        // --- Smooth Swirling Spiral (Original Symmetry) ---
        float rn = modMirror1(hpp.y, TAU / max(1.0, rep));
        float sa = PI / rep - pabs(PI / rep - abs(hpp.y), sm);
        hpp.y = sign(hpp.y) * sa;
        hp = toRect(hpp);
        p = hp;
        return rn;
    }
}

float segment(vec2 p, vec2 a, vec2 b) {
    vec2 pa = p - a, ba = b - a;
    float h = clamp(dot(pa, ba) / max(1e-5, dot(ba, ba)), 0.20, 1.0);
    return length(pa - ba * h);
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

vec3 effect(vec2 p, vec2 pp) {
    float tm = uTime * uSpeed;
    float mtm = fract(tm);
    float ftm = floor(tm);

    float noiseFreq = 8.0 * pow(uNoiseFrequency, 2.0);
    vec2 noiseOffset = vec2(
        snoise(p * noiseFreq + tm * 0.5),
        snoise(p * noiseFreq - tm * 0.5 + 50.0)
    ) * uNoise * 0.15;
    p += noiseOffset;

    float l = length(p);
    l = max(1e-4, l);
    float spiralTwist = 3.0 * clamp(uTwist, 0.0, 1.0);
    float spiralAngle = pow(l, -spiralTwist * 0.25) * 0.5;
    p *= ROT(spiralAngle);

    mat2 rot = ROT((1.067 * mix(0.2, 2.0, uTwist)) * tm);
    float rep = max(2.0, floor(uBandCount));
    float sm  = (0.1 * 36.0 / rep) * max(0.01, uSoftness);
    p *= transpose(rot);
    
    // Pass symmetry uniform to our helper function
    float nn = smoothKaleidoscope(p, sm, rep, uSymmetry);
    
    p *= rot;

    p *= ROT((-0.5 * mix(0.1, 3.0, uProportion)) * length(p));
    p += 0.5 * cos(vec2(1.0, sqrt(0.5)) * tm * (0.18 * mix(0.5, 2.0, uNoiseFrequency)));

    float zz = REV(mtm);
    vec2 p2 = p / zz;
    vec2 s2 = sign(p2);
    p2 = abs(p2);
    vec2 fp2 = vec2(FWD(p2.x), FWD(p2.y));
    vec2 n = floor(fp2);
    float h = hash(s2.x + s2.y + n - ftm);
    vec2 x0 = vec2(REV(n.x), REV(n.y));
    vec2 x1 = vec2(REV(n.x + 1.0), REV(n.y + 1.0));
    vec2 m = (x0 + x1) * 0.5;
    vec2 w = x1 - x0;
    vec2 modi = h > 0.5 ? vec2(1.0, 1.0) : vec2(1.0, -1.0);
    vec2 p4 = p2 - m;
    float d4 = segment(p4, -0.30 * w * modi, 0.5 * w * modi);
    d4 *= zz;
    float d6 = min(abs(p.x), abs(p.y));

    vec3 col = uColorBack.rgb * uColorBack.a;
    float fo = 1.0 - exp(-10.0 * (d6 - (0.02 + uCenter * 0.05)));
    float ll = length(pp);

    vec4 c1 = uColors[int(mod(h * uColorCount, uColorCount))];
    vec4 c2 = uColors[int(mod((h + 0.1) * uColorCount, uColorCount))];
    vec3 paletteGlow = mix(c1.rgb, c2.rgb, 0.5 + 0.5 * cos(tm));
    vec3 gcol4 = 0.0025 * (1.0 + cos(vec3(0.0, 1.0, 2.0) + tm + TAU * h + ll)) * paletteGlow * 40.0;
    vec3 gcol6 = 0.005 * (1.0 + cos(vec3(0.0, 1.0, 2.0) + tm + ll)) * paletteGlow * 20.0;

    col += (fo * gcol4 / max(d4, 0.001)) * mix(0.5, 3.0, uNoise);
    col = clamp(col, 0.0, 1.0);
    col += gcol6 / max(d6, 0.0001);
    col = clamp(col, 0.0, 1.0);
    col -= 0.01 * vec3(0.0, 1.0, 2.0).zyx * (ll);
    col = max(vec3(0.0), col);
    col = sqrt(col);
    return col;
}

void main() {
    vec2 q = gl_FragCoord.xy / uResolution.xy;
    vec2 p = -1.0 + 2.0 * q;
    vec2 pp = p;
    p.x *= uResolution.x / uResolution.y;
    vec3 col = effect(p, pp);

    vec3 hsv = rgb2hsv(col);
    hsv.x += uHue / 360.0;
    hsv.y *= uSaturation;
    col = hsv2rgb(hsv);
    fragColor = vec4(col, uOpacity);
}
`;

function SpaceFlowerShader({
  config,
  globalConfig,
}: {
  config: GradientConfig["shaders"]["spaceFlower"];
  globalConfig: GradientConfig;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const configString = useMemo(() => JSON.stringify(config), [config]);

  const hexToRgbaVec = (hex: string): [number, number, number, number] => {
    const cleaned = hex.replace("#", "");
    const r = parseInt(cleaned.substring(0, 2), 16) / 255 || 0;
    const g = parseInt(cleaned.substring(2, 4), 16) / 255 || 0;
    const b = parseInt(cleaned.substring(4, 6), 16) / 255 || 0;
    const a = cleaned.length === 8 ? parseInt(cleaned.substring(6, 8), 16) / 255 : 1.0;
    return [r, g, b, a];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true });
    if (!gl) {
      console.error("WebGL2 environment not available for SpaceFlower");
      return;
    }

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(`Shader compile failed: ${info}`);
      }
      return shader;
    };

    const program = gl.createProgram()!;
    const vs = createShader(gl.VERTEX_SHADER, spaceFlowerVertShader);
    const fs = createShader(gl.FRAGMENT_SHADER, spaceFlowerFragShader);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "Linking Error");
    }

    gl.useProgram(program);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, "a_position");
    if (posAttr >= 0) {
      gl.enableVertexAttribArray(posAttr);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);
    }

    const uniforms = {
      uTime: gl.getUniformLocation(program, "uTime"),
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uSpeed: gl.getUniformLocation(program, "uSpeed"),
      uColorBack: gl.getUniformLocation(program, "uColorBack"),
      uColorCount: gl.getUniformLocation(program, "uColorCount"),
      uBandCount: gl.getUniformLocation(program, "uBandCount"),
      uTwist: gl.getUniformLocation(program, "uTwist"),
      uCenter: gl.getUniformLocation(program, "uCenter"),
      uProportion: gl.getUniformLocation(program, "uProportion"),
      uSoftness: gl.getUniformLocation(program, "uSoftness"),
      uNoise: gl.getUniformLocation(program, "uNoise"),
      uNoiseFrequency: gl.getUniformLocation(program, "uNoiseFrequency"),
      uHue: gl.getUniformLocation(program, "uHue"),
      uSaturation: gl.getUniformLocation(program, "uSaturation"),
      uOpacity: gl.getUniformLocation(program, "uOpacity"),
      uSymmetry: gl.getUniformLocation(program, "uSymmetry"),
    };

    let raf = 0;
    const startTime = performance.now();

    const render = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.useProgram(program);

      gl.uniform1f(uniforms.uTime, time);
      gl.uniform2f(uniforms.uResolution, width, height);
      gl.uniform1f(uniforms.uSpeed, config.speed ?? 1.0);

      const bg = hexToRgbaVec(config.colorBack ?? "#000000");
      gl.uniform4f(uniforms.uColorBack, bg[0], bg[1], bg[2], bg[3]);

      gl.uniform1f(uniforms.uColorCount, config.colorCount ?? 4.0);
      gl.uniform1f(uniforms.uBandCount, config.bandCount ?? 10.0);
      gl.uniform1f(uniforms.uTwist, config.twist ?? 0.5);
      gl.uniform1f(uniforms.uCenter, config.center ?? 0.15);
      gl.uniform1f(uniforms.uProportion, config.proportion ?? 0.5);
      gl.uniform1f(uniforms.uSoftness, config.softness ?? 0.5);
      gl.uniform1f(uniforms.uNoise, config.noise ?? 0.2);
      gl.uniform1f(uniforms.uNoiseFrequency, config.noiseFrequency ?? 0.4);
      gl.uniform1f(uniforms.uHue, config.hue ?? 0.0);
      gl.uniform1f(uniforms.uSaturation, config.saturation ?? 1.0);
      gl.uniform1f(uniforms.uOpacity, config.opacity ?? 1.0);
      gl.uniform1f(uniforms.uSymmetry, config.symmetry ?? 1.0); // Bind active symmetry mode

      for (let i = 0; i < 10; i++) {
        const rgba = hexToRgbaVec(config.colors?.[i] ?? "#000000");
        const loc = gl.getUniformLocation(program, `uColors[${i}]`);
        if (loc) gl.uniform4f(loc, rgba[0], rgba[1], rgba[2], rgba[3]);
      }

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const renderLoop = () => {
      const time = globalConfig.paused
        ? (globalConfig.motion / 100) * 10
        : (performance.now() - startTime) * 0.001;
      render(time);
      if (!globalConfig.paused) {
        raf = requestAnimationFrame(renderLoop);
      }
    };

    renderLoop();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      gl.deleteBuffer(positionBuffer);
      gl.deleteVertexArray(vao);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, [configString, globalConfig.paused, globalConfig.motion]);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />;
}

const electricSpiralVertShader = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const electricSpiralFragShader = `#version 300 es
precision highp float;

uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uGridScale;
uniform float uGridSoftness;
uniform float uSpiralFrequency;
uniform float uSpiralTightness;
uniform float uGlowIntensity;
uniform float uCoreBrightness;
uniform vec4 uColorGrid;
uniform vec4 uColorGlow;
uniform vec4 uColorSpiral;
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

// Hyperbolic cosine helper since it's built-in only in certain GLSL implementations
float cosh_safe(float val) {
  return (exp(val) + exp(-val)) * 0.5;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
  float t = uTime * uSpeed;
  
  float a = atan(uv.y, uv.x);
  vec2 p = cos(a + t) * vec2(cos(0.5 * t), sin(0.3 * t));
  
  float d1 = length(uv - p);
  float d2 = length(uv);
  
  vec2 uv2 = 2. * cos(log(max(1e-5, length(uv))) * 0.25 - 0.5 * t + log(max(vec2(1e-5), vec2(d1, d2)) / max(1e-5, d1 + d2)));
  
  vec2 fpos = fract(uGridScale * uv2) - 0.5;
  float d = max(abs(fpos.x), abs(fpos.y));
  
  float k = uGridSoftness / uResolution.y;
  float s = smoothstep(-k, k, 0.25 - d);
  
  // Custom baseline Grid Color distribution
  vec3 col = s * uColorGrid.rgb;
  
  // Custom Core Glow mapping using cosh
  float coreDist = uCoreBrightness * (length(uv - p) + length(uv));
  col += (1.0 / cosh_safe(coreDist)) * uColorGlow.rgb * uGlowIntensity;
  
  // Electric Spiral Arcs
  float c = cos(uSpiralFrequency * length(uv2) + 4. * t);
  float arcWave = exp(-9. * abs(cos(uSpiralTightness * a + t) * uv.x + sin(uSpiralTightness * a + t) * uv.y + 0.1 * c));
  
  col += (0.5 + 0.5 * c) * uColorSpiral.rgb * arcWave * uGlowIntensity;
  
  // Applying Master Hue and Saturation corrections
  vec3 hsv = rgb2hsv(max(col, vec3(0.0)));
  hsv.x += uHue / 360.0;
  hsv.y *= uSaturation;
  col = hsv2rgb(hsv);
  
  fragColor = vec4(col, 1.0);
}`;

export function ElectricSpiralShader({
  config,
  globalConfig,
}: {
  config: GradientConfig["shaders"]["electricSpiral"];
  globalConfig: GradientConfig;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const configString = useMemo(() => JSON.stringify(config), [config]);

  const hexToRgbVec = (hex: string): [number, number, number, number] => {
    const cleaned = hex.replace("#", "");
    const r = parseInt(cleaned.substring(0, 2), 16) / 255 || 0;
    const g = parseInt(cleaned.substring(2, 4), 16) / 255 || 0;
    const b = parseInt(cleaned.substring(4, 6), 16) / 255 || 0;
    return [r, g, b, 1.0];
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl2", { preserveDrawingBuffer: true });
    if (!gl) {
      console.error("WebGL2 environment not available for ElectricSpiral");
      return;
    }

    const createShader = (type: number, source: string) => {
      const shader = gl.createShader(type)!;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        const info = gl.getShaderInfoLog(shader);
        gl.deleteShader(shader);
        throw new Error(`Shader compilation error: ${info}`);
      }
      return shader;
    };

    const program = gl.createProgram()!;
    const vs = createShader(gl.VERTEX_SHADER, electricSpiralVertShader);
    const fs = createShader(gl.FRAGMENT_SHADER, electricSpiralFragShader);
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || "Linking Error");
    }

    gl.useProgram(program);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, "a_position");
    if (posAttr >= 0) {
      gl.enableVertexAttribArray(posAttr);
      gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);
    }

    const uniforms = {
      uTime: gl.getUniformLocation(program, "uTime"),
      uResolution: gl.getUniformLocation(program, "uResolution"),
      uSpeed: gl.getUniformLocation(program, "uSpeed"),
      uGridScale: gl.getUniformLocation(program, "uGridScale"),
      uGridSoftness: gl.getUniformLocation(program, "uGridSoftness"),
      uSpiralFrequency: gl.getUniformLocation(program, "uSpiralFrequency"),
      uSpiralTightness: gl.getUniformLocation(program, "uSpiralTightness"),
      uGlowIntensity: gl.getUniformLocation(program, "uGlowIntensity"),
      uCoreBrightness: gl.getUniformLocation(program, "uCoreBrightness"),
      uColorGrid: gl.getUniformLocation(program, "uColorGrid"),
      uColorGlow: gl.getUniformLocation(program, "uColorGlow"),
      uColorSpiral: gl.getUniformLocation(program, "uColorSpiral"),
      uHue: gl.getUniformLocation(program, "uHue"),
      uSaturation: gl.getUniformLocation(program, "uSaturation"),
    };

    let raf = 0;
    const startTime = performance.now();

    const render = (time: number) => {
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.max(1, Math.floor(rect.width * dpr));
      const height = Math.max(1, Math.floor(rect.height * dpr));

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
      }

      gl.viewport(0, 0, width, height);
      gl.useProgram(program);

      gl.uniform1f(uniforms.uTime, time);
      gl.uniform2f(uniforms.uResolution, width, height);
      gl.uniform1f(uniforms.uSpeed, config.speed ?? 1.0);
      gl.uniform1f(uniforms.uGridScale, config.gridScale ?? 4.0);
      gl.uniform1f(uniforms.uGridSoftness, config.gridSoftness ?? 5.0);
      gl.uniform1f(uniforms.uSpiralFrequency, config.spiralFrequency ?? 10.0);
      gl.uniform1f(uniforms.uSpiralTightness, config.spiralTightness ?? 9.0);
      gl.uniform1f(uniforms.uGlowIntensity, config.glowIntensity ?? 1.0);
      gl.uniform1f(uniforms.uCoreBrightness, config.coreBrightness ?? -2.5);

      const cGrid = hexToRgbVec(config.colorGrid ?? "#ff801a");
      gl.uniform4f(uniforms.uColorGrid, cGrid[0], cGrid[1], cGrid[2], cGrid[3]);

      const cGlow = hexToRgbVec(config.colorGlow ?? "#ff801a");
      gl.uniform4f(uniforms.uColorGlow, cGlow[0], cGlow[1], cGlow[2], cGlow[3]);

      const cSpiral = hexToRgbVec(config.colorSpiral ?? "#80ffff");
      gl.uniform4f(uniforms.uColorSpiral, cSpiral[0], cSpiral[1], cSpiral[2], cSpiral[3]);

      gl.uniform1f(uniforms.uHue, config.hue ?? 0.0);
      gl.uniform1f(uniforms.uSaturation, config.saturation ?? 1.0);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
    };

    const renderLoop = () => {
      const time = globalConfig.paused
        ? (globalConfig.motion / 100) * 10
        : (performance.now() - startTime) * 0.001;
      
      render(time);
      
      if (!globalConfig.paused) {
        raf = requestAnimationFrame(renderLoop);
      }
    };

    renderLoop();

    return () => {
      if (raf) cancelAnimationFrame(raf);
      gl.deleteBuffer(positionBuffer);
      gl.deleteVertexArray(vao);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteProgram(program);
    };
  }, [configString, globalConfig.paused, globalConfig.motion]);

  return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />;
}

const twistedKaleidoscopeVertShader = `#version 300 es
precision highp float;
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const twistedKaleidoscopeFragShader = `#version 300 es
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
uniform float uSymmetry;
out vec4 fragColor;

#define PI 3.14159265359
#define TAU 6.28318530718
#define ROT(a) mat2(cos(a), sin(a), -sin(a), cos(a))

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
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

float hash(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 58.233))) * 13758.5453);
}

vec2 toPolar(vec2 p) { return vec2(length(p), atan(p.y, p.x)); }
vec2 toRect(vec2 p) { return vec2(p.x * cos(p.y), p.x * sin(p.y)); }

float pmin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / max(1e-4, k), 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float pabs(float a, float k) { return -pmin(a, -a, k); }

float modMirror1(inout float p, float size) {
  float halfsize = size * 1.2;
  float c = floor((p + halfsize) / size);
  p = mod(p + halfsize, size) - halfsize;
  p *= mod(c, 2.0) * 4.4 - 1.0;
  return c;
}

float smoothKaleidoscope(inout vec2 p, float sm, float rep, float symmetry) {
  vec2 hp = p;
  vec2 hpp = toPolar(hp);

  if (symmetry > 0.5) {
    float sliceWidth = TAU / max(1.0, rep);
    float angle = hpp.y + PI;
    float cell = floor(angle / sliceWidth);
    float localAngle = mod(angle, sliceWidth);
    if (localAngle > sliceWidth * 0.5) {
      localAngle = sliceWidth - localAngle;
    }
    hpp.y = localAngle - PI;
    hp = toRect(hpp);
    p = hp;
    return cell;
  } else {
    float rn = modMirror1(hpp.y, TAU / max(1.0, rep));
    float sa = PI / rep - pabs(PI / rep - abs(hpp.y), sm);
    hpp.y = sign(hpp.y) * sa;
    hp = toRect(hpp);
    p = hp;
    return rn;
  }
}

float segment(vec2 p, vec2 a, vec2 b) {
  vec2 pa = p - a, ba = b - a;
  float h = clamp(dot(pa, ba) / max(1e-5, dot(ba, ba)), 0.20, 1.0);
  return length(pa - ba * h);
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
  vec2 q = gl_FragCoord.xy / uResolution.xy;
  vec2 p = -1.0 + 2.0 * q;
  vec2 pp = p;
  p.x *= uResolution.x / uResolution.y;

  float tm = uTime * uSpeed;
  float mtm = fract(tm);
  float ftm = floor(tm);

  float noiseFreq = 8.0 * pow(uNoiseFrequency, 2.0);
  vec2 noiseOffset = vec2(
    snoise(p * noiseFreq + tm * 0.5),
    snoise(p * noiseFreq - tm * 0.5 + 50.0)
  ) * uNoise * 0.15;
  p += noiseOffset;

  float l = max(1e-4, length(p));
  float spiralTwist = 3.0 * clamp(uTwist, 0.0, 1.0);
  float spiralAngle = pow(l, -spiralTwist * 0.25) * 0.5;
  p *= ROT(spiralAngle);

  mat2 rot = ROT((1.067 * mix(0.2, 2.0, uTwist)) * tm);
  float rep = max(2.0, floor(uBandCount));
  float sm = (0.1 * 36.0 / rep) * max(0.01, uSoftness);

  p *= transpose(rot);
  float nn = smoothKaleidoscope(p, sm, rep, uSymmetry);
  p *= rot;

  p *= ROT((-0.5 * mix(0.1, 3.0, uProportion)) * length(p));
  p += 0.5 * cos(vec2(1.0, sqrt(0.5)) * tm * (0.18 * mix(0.5, 2.0, uNoiseFrequency)));

  float zz = exp2(mtm * 1.925999);
  vec2 p2 = p / zz;
  vec2 s2 = sign(p2);
  p2 = abs(p2);

  vec2 fp2 = vec2(log2(max(1e-5, p2.x)) / 1.925999, log2(max(1e-5, p2.y)) / 1.925999);
  vec2 n = floor(fp2);
  float h = hash(s2.x + s2.y + n - ftm);

  vec2 x0 = vec2(exp2(n.x * 1.925999), exp2(n.y * 1.925999));
  vec2 x1 = vec2(exp2((n.x + 1.0) * 1.925999), exp2((n.y + 1.0) * 1.925999));
  vec2 m = (x0 + x1) * 0.5;
  vec2 w = x1 - x0;
  vec2 modi = h > 0.5 ? vec2(1.0, 1.0) : vec2(1.0, -1.0);

  vec2 p4 = p2 - m;
  float d4 = segment(p4, -0.30 * w * modi, 0.5 * w * modi);
  d4 *= zz;
  float d6 = min(abs(p.x), abs(p.y));

  vec3 col = uColorBack.rgb * uColorBack.a;
  float fo = 1.0 - exp(-10.0 * (d6 - (0.02 + uCenter * 0.05)));
  float ll = length(pp);

  int colorCount = int(clamp(uColorCount, 1.0, 10.0));
  int i0 = int(mod(h * uColorCount, uColorCount));
  int i1 = int(mod((h + 0.1) * uColorCount, uColorCount));

  vec4 c1 = uColors[i0];
  vec4 c2 = uColors[i1];
  vec3 paletteGlow = mix(c1.rgb, c2.rgb, 0.5 + 0.5 * cos(tm));
  vec3 gcol4 = 0.0025 * (1.0 + cos(vec3(0.0, 1.0, 2.0) + tm + TAU * h + ll)) * paletteGlow * 40.0;
  vec3 gcol6 = 0.005 * (1.0 + cos(vec3(0.0, 1.0, 2.0) + tm + ll)) * paletteGlow * 20.0;

  col += (fo * gcol4 / max(d4, 0.001)) * mix(0.5, 3.0, uNoise);
  col = clamp(col, 0.0, 1.0);
  col += gcol6 / max(d6, 0.0001);
  col = clamp(col, 0.0, 1.0);
  col -= 0.01 * vec3(0.0, 1.0, 2.0).zyx * ll;
  col = max(vec3(0.0), col);
  col = sqrt(col);

  vec3 hsv = rgb2hsv(col);
  hsv.x += uHue / 360.0;
  hsv.y *= uSaturation;
  col = hsv2rgb(hsv);

  fragColor = vec4(col, uColorBack.a);
}
`;

function TwistedKaleidoscopeShader({ 
    config, 
    globalConfig 
}: { 
    config: any; // Replace with GradientConfig['shaders']['twistedKaleidoscope']
    globalConfig: any; // Replace with GradientConfig 
}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const configString = useMemo(() => JSON.stringify(config), [config]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl2');
        if (!gl) {
            console.error("WebGL2 not supported for Twisted Kaleidoscope Shader");
            return;
        }

        // 1. Compile Shaders
        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, twistedKaleidoscopeVertShader);
        gl.compileShader(vertexShader);
        if (!gl.getShaderParameter(vertexShader, gl.COMPILE_STATUS)) {
            console.error('Vertex shader compile error:', gl.getShaderInfoLog(vertexShader));
            return;
        }

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, twistedKaleidoscopeFragShader);
        gl.compileShader(fragmentShader);
        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Fragment shader compile error:', gl.getShaderInfoLog(fragmentShader));
            return;
        }

        // 2. Link Program
        const program = gl.createProgram()!;
        gl.attachShader(program, vertexShader);
        gl.attachShader(program, fragmentShader);
        gl.linkProgram(program);
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
            console.error('Program linking error:', gl.getProgramInfoLog(program));
            return;
        }
        gl.useProgram(program);

        // 3. Setup Full-screen Quad Buffer
        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        // Using TRIANGLE_STRIP coords matching a_position layout
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
        
        const posAttr = gl.getAttribLocation(program, "a_position");
        gl.enableVertexAttribArray(posAttr);
        gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

        // 4. Map Uniform Locations
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
            uSymmetry: gl.getUniformLocation(program, 'uSymmetry'),
        };

        // Pre-fetch array locations for execution loop optimization
        const colorArrayLocations: WebGLUniformLocation[] = [];
        for (let i = 0; i < 10; i++) {
            colorArrayLocations.push(gl.getUniformLocation(program, `uColors[${i}]`)!);
        }

        let startTime = Date.now();
        let animationFrameId: number;

        // 5. Execution Render Frame Block
        const render = (time: number) => {
            const rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clear(gl.COLOR_BUFFER_BIT);

            // Pass scalar/vector configuration options
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
            gl.uniform1f(uniforms.uSymmetry, config.symmetry ? 1.0 : 0.0);

            // Dynamically evaluate and upload the color array configurations up to length 10
            config.colors.forEach((color: string, index: number) => {
                if (index >= 10) return;
                const rgba = hexToRgbaVec(color);
                gl.uniform4f(colorArrayLocations[index], rgba[0], rgba[1], rgba[2], rgba[3]);
            });
            gl.uniform1f(uniforms.uColorCount, config.colorCount);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        // 6. Animation Processing Loop
        const renderLoop = () => {
            const time = globalConfig.paused ? (globalConfig.motion / 100) * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) {
                animationFrameId = requestAnimationFrame(renderLoop);
            }
        };

        renderLoop();

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
            // Optional: Loose context extension hooks can be executed safely here
        };
    }, [configString, globalConfig.paused, globalConfig.motion]);

    return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />;
}

const trickyShapesSceneVertShade = `#version 300 es
precision highp float;
layout(location = 0) in vec2 a_position;
out vec2 vUV;
void main() {
  vUV = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const trickyShapesFragShader = `#version 300 es
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform vec4 uColorBack;
uniform vec4 uColors[10];
uniform float uColorCount;
uniform float uBandCount;
uniform float uTwist;
uniform float uProportion;
uniform float uSoftness;
uniform float uNoise;
uniform float uDistortion;
uniform float uHue;
uniform float uSaturation;
uniform float uSymmetry;
uniform float uKaleidoscopeEnabled;
uniform float uShapeMode;
uniform float uDarken;
uniform float uRayMix;
uniform float uRayShape;
uniform float uRaySpeed;
in vec2 vUV;
out vec4 fragColor;

#define PI 3.14159265359
#define TAU 6.28318530718
#define ROT(a) mat2(cos(a), sin(a), -sin(a), cos(a))

float hash11(float p) {
  p = fract(p * .1031);
  p *= p + 33.33;
  p *= p + p;
  return fract(p);
}

vec3 permute(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
  vec2 i = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod(i, 289.0);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
  m = m * m;
  m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x = a0.x * x0.x + h.x * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

float hash(vec2 co) {
  return fract(sin(dot(co.xy, vec2(12.9898, 58.233))) * 13758.5453);
}

vec2 toPolar(vec2 p) { return vec2(length(p), atan(p.y, p.x)); }
vec2 toRect(vec2 p) { return vec2(p.x * cos(p.y), p.x * sin(p.y)); }

float pmin(float a, float b, float k) {
  float h = clamp(0.5 + 0.5 * (b - a) / max(1e-4, k), 0.0, 1.0);
  return mix(b, a, h) - k * h * (1.0 - h);
}

float pabs(float a, float k) { return -pmin(a, -a, k); }

float modMirror1(inout float p, float size) {
  float halfsize = size * 1.2;
  float c = floor((p + halfsize) / size);
  p = mod(p + halfsize, size) - halfsize;
  p *= mod(c, 2.0) * 4.4 - 1.0;
  return c;
}

void applyKaleidoscope(inout vec2 p, float rep, float symmetry, float enabled) {
  if (enabled < 0.5) return;
  vec2 hpp = toPolar(p);
  if (symmetry > 0.5) {
    float sliceWidth = TAU / max(1.0, rep);
    float angle = hpp.y + PI;
    float localAngle = mod(angle, sliceWidth);
    if (localAngle > sliceWidth * 0.5) localAngle = sliceWidth - localAngle;
    hpp.y = localAngle - PI;
    p = toRect(hpp);
  } else {
    float sm = 0.1;
    modMirror1(hpp.y, TAU / max(1.0, rep));
    float sa = PI / rep - pabs(PI / rep - abs(hpp.y), sm);
    hpp.y = sign(hpp.y) * sa;
    p = toRect(hpp);
  }
}

float valueNoiseR(vec2 st) {
  vec2 i = floor(st);
  vec2 f = fract(st);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(a, b, u.x), mix(c, d, u.x), u.y);
}

vec4 fbmR(vec2 n0, vec2 n1, vec2 n2, vec2 n3) {
  float amplitude = 0.2;
  vec4 total = vec4(0.0);
  for (int i = 0; i < 3; i++) {
    n0 = ROT(0.3) * n0;
    n1 = ROT(0.3) * n1;
    n2 = ROT(0.3) * n2;
    n3 = ROT(0.3) * n3;
    total.x += valueNoiseR(n0) * amplitude;
    total.y += valueNoiseR(n1) * amplitude;
    total.z += valueNoiseR(n2) * amplitude;
    total.w += valueNoiseR(n3) * amplitude;
    n0 *= 1.99;
    n1 *= 1.99;
    n2 *= 1.99;
    n3 *= 1.99;
    amplitude *= 0.6;
  }
  return total;
}

vec2 truchet(vec2 uv, float idx) {
  idx = fract((idx - 0.5) * 2.0);
  if (idx > 0.75) uv = vec2(1.0) - uv;
  else if (idx > 0.5) uv = vec2(1.0 - uv.x, uv.y);
  else if (idx > 0.25) uv = 1.0 - vec2(1.0 - uv.x, uv.y);
  return uv;
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

mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle);
  float c = cos(angle);
  float oc = 1.0 - c;
  return mat4(oc * axis.x * axis.x + c,           oc * axis.x * axis.y - axis.z * s,  oc * axis.z * axis.x + axis.y * s,  0.0,
              oc * axis.x * axis.y + axis.z * s,  oc * axis.y * axis.y + c,           oc * axis.y * axis.z - axis.x * s,  0.0,
              oc * axis.z * axis.x - axis.y * s,  oc * axis.y * axis.z + axis.x * s,  oc * axis.z * axis.z + c,           0.0,
              0.0,                                0.0,                                0.0,                                1.0);
}

vec3 rotate3D(vec3 v, vec3 axis, float angle) {
  return (rotationMatrix(axis, angle) * vec4(v, 1.0)).xyz;
}

float sdSphere(vec3 p, float r) { return length(p) - r; }

float sdBox(vec3 p, vec3 b) {
  vec3 q = abs(p) - b;
  return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

float sdOctahedron(vec3 p, float rad) {
  p = abs(p);
  float m = p.x + p.y + p.z - rad;
  vec3 q;
  if (3.0 * p.x < m) q = p.xyz;
  else if (3.0 * p.y < m) q = p.yzx;
  else if (3.0 * p.z < m) q = p.zxy;
  else return m * 0.57735027;
  float k = clamp(0.5 * (q.z - q.y + 0.5), 0.0, 0.5);
  return length(vec3(q.x, q.y - 0.5 + k, q.z - k));
}

float SineCrazy(vec3 p) {
  return 1.0 - (sin(p.x) - sin(p.y) + sin(p.z)) / 3.0;
}

float scene(vec3 p, float t, float shapeChoice) {
  vec3 p1 = rotate3D(p, vec3(0.1, 1.0, 0.1), t / 10.0);
  float scale = 8.0 + 5.0 * sin(t / 12.0);
  float baseGeom = 0.0;
  if (shapeChoice < 0.5) {
    baseGeom = sdOctahedron(p1, 0.8);
  } else if (shapeChoice < 1.5) {
    baseGeom = sdSphere(p1, 0.5);
  } else {
    baseGeom = sdBox(p1, vec3(0.5));
  }
  return max(baseGeom, (0.85 - SineCrazy(p1 * scale)) / scale);
}

vec3 getNormal(vec3 p, float t, float shapeChoice) {
  vec2 o = vec2(0.001, 0.0);
  return normalize(vec3(
    scene(p + o.xyy, t, shapeChoice) - scene(p - o.xyy, t, shapeChoice),
    scene(p + o.yxy, t, shapeChoice) - scene(p - o.yxy, t, shapeChoice),
    scene(p + o.yyx, t, shapeChoice) - scene(p - o.yyx, t, shapeChoice)
  ));
}

vec3 GetColorAmount(vec3 p) {
  float amount = clamp((1.5 - length(p)) / 2.0, 0.0, 1.0);
  return (0.5 + 0.5 * cos(6.28319 * (vec3(0.2, 0.0, 0.0) + amount * vec3(1.0, 1.0, 0.5)))) * amount;
}

float rayMarchSpaceFlower(vec2 uv, float t, float shapeChoice) {
  vec3 camPos = vec3(-0.5, 0.0, 2.0 + 0.5 * sin(t / 4.0));
  vec3 ray = normalize(vec3(uv, -1.0));
  vec3 rayPos = camPos;
  float rayLen = 0.0;
  vec3 light = vec3(-1.0, 1.0, 1.0);
  vec3 color = vec3(0.0);
  for (int i = 0; i < 64; ++i) {
    float curDist = scene(rayPos, t, shapeChoice);
    rayLen += 0.6 * curDist;
    rayPos = camPos + ray * rayLen;
    if (abs(curDist) < 0.001) {
      vec3 n = getNormal(rayPos, t, shapeChoice);
      color += max(dot(n, normalize(light)), 0.0) * GetColorAmount(rayPos);
      break;
    }
    color += 0.04 * GetColorAmount(rayPos);
  }
  return clamp(dot(color, vec3(0.3333)), 0.0, 1.0);
}

vec3 aces_approx(vec3 v) {
  v = max(v, 0.0) * 0.6;
  return clamp((v * (2.51 * v + 0.03)) / (v * (2.43 * v + 0.59) + 0.14), 0.0, 1.0);
}

vec3 pathOffset(float z) {
  return vec3(vec2(1.0, sqrt(0.5)) * sin(vec2(0.31, 0.41) * z), z);
}
vec3 pathDOffset(float z) {
  return vec3(vec2(0.31, 0.41) * vec2(1.0, sqrt(0.5)) * cos(vec2(0.31, 0.41) * z), 1.0);
}
vec3 pathDDOffset(float z) {
  return vec3(-vec2(0.31, 0.41) * vec2(0.31, 0.41) * vec2(1.0, sqrt(0.5)) * sin(vec2(0.31, 0.41) * z), 0.0);
}

vec4 alphaBlend(vec4 back, vec4 front) {
  float w = front.w + back.w * (1.0 - front.w);
  return w > 0.0 ? vec4((front.xyz * front.w + back.xyz * back.w * (1.0 - front.w)) / w, w) : vec4(0.0);
}

float star5(vec2 p, float r, float rf, float sm) {
  p = -p;
  const vec2 k1 = vec2(0.809016994375, -0.587785252292);
  const vec2 k2 = vec2(-k1.x, k1.y);
  p.x = abs(p.x);
  p -= 2.0 * max(dot(k1, p), 0.0) * k1;
  p -= 2.0 * max(dot(k2, p), 0.0) * k2;
  p.x = pabs(p.x, sm);
  p.y -= r;
  vec2 ba = rf * vec2(-k1.y, k1.x) - vec2(0, 1);
  return length(p - ba * clamp(dot(p, ba) / dot(ba, ba), 0.0, r)) * sign(p.y * ba.x - p.x * ba.y);
}

vec3 getDynamicPalette(float n) {
  int maxIdx = int(uColorCount) - 1;
  float param = fract(n * 0.1) * float(maxIdx);
  int idx = int(floor(param));
  float f = fract(param);
  return mix(uColors[idx].rgb, uColors[min(idx + 1, maxIdx)].rgb, f);
}

vec4 evaluatePlane(vec2 pp, vec2 npp, float pd, float n) {
  float aa = 3.0 * pd * distance(pp, npp);
  vec2 p2 = pp - pathOffset(n).xy;
  float dd = dot(pathDDOffset(n).xz, pathDOffset(n).xz);
  p2 *= ROT(dd * PI * 5.0);
  float d0 = star5(p2, 0.45, 1.6, 0.2) - 0.02;
  float d2 = length(p2);
  vec4 col = vec4(0.0);
  col.xyz = getDynamicPalette(0.5 * n + 2.0 * d2) * mix(0.5 / (d2 * d2), 1.0, smoothstep(-0.5 + aa * 200.0, 0.5 + aa * 200.0, sin(d2 * (PI * 100.0)))) / max(3.0 * d2 * d2, 1e-1);
  col.xyz = mix(col.xyz, vec3(2.0), smoothstep(aa, -aa, d0 - 0.01));
  col.w = smoothstep(aa, -aa, -d0);
  return col;
}

vec3 renderStarryPlanes(vec2 p, float t) {
  float pd = 0.5;
  float tm = pd * t;
  vec3 ro = pathOffset(tm);
  vec3 dro = pathDOffset(tm);
  vec3 ddro = pathDDOffset(tm);
  vec3 ww = normalize(dro);
  vec3 uu = normalize(cross(vec3(0.0, 1.0, 0.0) + ddro, ww));
  vec3 vv = cross(ww, uu);
  vec2 np = p + 1.0 / uResolution.xy;
  vec3 rd = normalize(p.x * uu + p.y * vv + 1.75 * ww);
  vec3 nrd = normalize(np.x * uu + np.y * vv + 1.75 * ww);
  float nz = floor(ro.z / pd);
  vec4 acol = vec4(0.0);
  vec3 aro = ro;
  float apd = 0.0;
  for (float i = 1.0; i <= 16.0; ++i) {
    if (acol.w > 0.95) break;
    float pz = pd * nz + pd * i;
    float lpd = (pz - aro.z) / rd.z;
    float npd = (pz - aro.z) / nrd.z;
    vec3 pp = aro + rd * lpd;
    vec3 npp = aro + nrd * npd;
    apd += lpd;
    float dz = pp.z - ro.z;
    float fadeIn = smoothstep(pd * 16.0, pd * 8.0, dz);
    float fadeOut = smoothstep(0.0, pd * 0.1, dz);
    vec4 pcol = evaluatePlane(pp.xy, npp.xy, apd, pz);
    pcol.w *= fadeOut * fadeIn;
    acol = alphaBlend(pcol, acol);
    aro = pp;
  }
  vec3 finalC = acol.xyz * acol.w;
  return sqrt(aces_approx(finalC));
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;
  float t = uTime * uSpeed;
  if (!(uShapeMode >= 1.5 && uShapeMode < 2.5 && uSymmetry > 0.5 && uKaleidoscopeEnabled > 0.5)) {
    uv = ROT(uTwist * length(uv) * 5.0) * uv;
  }
  applyKaleidoscope(uv, uBandCount, uSymmetry, uKaleidoscopeEnabled);
  float grainShape = 0.0;
  vec2 shape_uv = uv * 3.0;
  if (uShapeMode < 0.5) {
    float wave = cos(0.5 * shape_uv.x - 4.0 * t) * sin(1.5 * shape_uv.x + 2.0 * t) * (0.75 + 0.25 * cos(6.0 * t));
    grainShape = 1.0 - smoothstep(-1.0, 1.0, shape_uv.y + wave);
  } else if (uShapeMode < 1.5) {
    float stripeIdx = floor(2.0 * shape_uv.x / TAU);
    float randVal = hash(vec2(stripeIdx * 100.0, stripeIdx + 3.1));
    randVal = sign(randVal - 0.5) * pow(4.0 * abs(randVal), 0.3);
    grainShape = pow(abs(sin(shape_uv.x) * cos(shape_uv.y - 5.0 * randVal * t)), 4.0);
  } else if (uShapeMode < 2.5) {
    float n2 = valueNoiseR(shape_uv * 0.4 - 3.75 * t) - 0.5;
    shape_uv.x += 10.0;
    shape_uv *= 0.6;
    vec2 tile = truchet(fract(shape_uv), hash(floor(shape_uv)));
    grainShape = smoothstep(0.2, 0.55, length(tile) + n2 * 0.1) * (1.0 - smoothstep(0.45, 0.8, length(tile) - n2 * 0.1)) + smoothstep(0.2, 0.55, length(tile - vec2(1.0)) + n2 * 0.1) * (1.0 - smoothstep(0.45, 0.8, length(tile - vec2(1.0)) - n2 * 0.1));
    grainShape = pow(grainShape, 1.5);
  } else if (uShapeMode < 3.5) {
    grainShape = sin(pow(length(shape_uv), 1.2) * 5.0 - 3.0 * t) * 0.5 + 0.5;
  } else if (uShapeMode < 4.5) {
    grainShape = rayMarchSpaceFlower(uv, t * uRaySpeed, uRayShape);
  } else {
    grainShape = clamp(dot(renderStarryPlanes(uv, t), vec3(0.3333)), 0.0, 1.0);
  }
  grainShape += uNoise * 0.2 * (hash11(gl_FragCoord.x * uNoise + gl_FragCoord.y) - 0.5) + uNoise * 0.1 * (hash11(gl_FragCoord.y + t) - 0.5);
  vec2 grain_uv = uv * uDistortion * 15.0;
  vec4 fbmVals = fbmR(0.002 * grain_uv + 10.0, 0.003 * grain_uv, 0.001 * grain_uv, ROT(0.4) * grain_uv);
  grainShape += uProportion * 2.0 / max(1.0, uColorCount) * (snoise(grain_uv * 0.5) * snoise(grain_uv * 0.2) - fbmVals.x - fbmVals.y + 0.5) + uNoise * 10.0 / max(1.0, uColorCount) * clamp(0.75 * snoise(grain_uv * 0.5) - fbmVals.w - fbmVals.z, 0.0, 1.0);
  float aa = fwidth(grainShape);
  grainShape = clamp(grainShape - 0.5 / max(1.0, uColorCount), 0.0, 1.0);
  float totalShape = smoothstep(0.0, uSoftness + 2.0 * aa, clamp(grainShape * uColorCount, 0.0, 1.0));
  float mixer = grainShape * (uColorCount - 1.0);
  int cntStop = int(uColorCount) - 1;
  vec4 gradientColor = uColors[0];
  gradientColor.rgb *= gradientColor.a;
  for (int i = 1; i < 10; i++) {
    if (i > cntStop) break;
    float localT = smoothstep(0.5 - 0.5 * uSoftness - aa, 0.5 + 0.5 * uSoftness + aa, clamp(mixer - float(i - 1), 0.0, 1.0));
    vec4 c = uColors[i];
    c.rgb *= c.a;
    gradientColor = mix(gradientColor, c, localT);
  }
  vec3 finalGrainRGB = gradientColor.rgb * totalShape;
  vec3 hsv = rgb2hsv(finalGrainRGB);
  hsv.x = fract(hsv.x + uHue / 360.0);
  hsv.y = clamp(hsv.y * uSaturation, 0.0, 1.0);
  vec3 mixRGB = hsv2rgb(hsv);
  if (uShapeMode >= 3.5 && uShapeMode < 4.5) {
    mixRGB = mix(mixRGB, GetColorAmount(vec3(uv, grainShape)), uRayMix);
  } else if (uShapeMode >= 4.5) {
    mixRGB = mix(mixRGB, renderStarryPlanes(uv, t), uDarken);
  }
  vec3 bgRGB = uColorBack.rgb * uColorBack.a;
  fragColor = vec4(mix(bgRGB, mixRGB, mix(totalShape, grainShape, uDarken)), clamp(gradientColor.a * totalShape + (grainShape * uDarken), 0.0, 1.0));
}`;

const trickyShapesBlitFragShader = `#version 300 es
precision highp float;
uniform sampler2D uTexture;
in vec2 vUV;
out vec4 fragColor;
void main() {
  fragColor = texture(uTexture, vUV);
}`;

function TrickyShapesShader({ config, globalConfig }: { config: any; globalConfig: any }) {
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

    const fullscreenVerts = new Float32Array([-1, -1, 3, -1, -1, 3]);
    const vao = gl.createVertexArray()!;
    gl.bindVertexArray(vao);
    const vbo = gl.createBuffer()!;
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, fullscreenVerts, gl.STATIC_DRAW);

    const programs = {
      scene: createProgram(trickyShapesSceneVertShade, trickyShapesFragShader),
      blit: createProgram(trickyShapesSceneVertShade, trickyShapesBlitFragShader),
    };

    gl.useProgram(programs.scene);
    const pos0 = gl.getAttribLocation(programs.scene, "a_position");
    gl.enableVertexAttribArray(pos0);
    gl.vertexAttribPointer(pos0, 2, gl.FLOAT, false, 0, 0);

    gl.useProgram(programs.blit);
    const pos1 = gl.getAttribLocation(programs.blit, "a_position");
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
    gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, lowResTexture, 0);

    // Get Uniform Locations for uColors array
    const uColorsLocations: WebGLUniformLocation[] = [];
    for (let i = 0; i < 10; i++) {
      const loc = gl.getUniformLocation(programs.scene, `uColors[${i}]`);
      if (loc) uColorsLocations.push(loc);
    }

    const uniforms = {
      scene: {
        uResolution: gl.getUniformLocation(programs.scene, "uResolution"),
        uTime: gl.getUniformLocation(programs.scene, "uTime"),
        uSpeed: gl.getUniformLocation(programs.scene, "uSpeed"),
        uColorBack: gl.getUniformLocation(programs.scene, "uColorBack"),
        uColorCount: gl.getUniformLocation(programs.scene, "uColorCount"),
        uBandCount: gl.getUniformLocation(programs.scene, "uBandCount"),
        uTwist: gl.getUniformLocation(programs.scene, "uTwist"),
        uProportion: gl.getUniformLocation(programs.scene, "uProportion"),
        uSoftness: gl.getUniformLocation(programs.scene, "uSoftness"),
        uNoise: gl.getUniformLocation(programs.scene, "uNoise"),
        uDistortion: gl.getUniformLocation(programs.scene, "uDistortion"),
        uHue: gl.getUniformLocation(programs.scene, "uHue"),
        uSaturation: gl.getUniformLocation(programs.scene, "uSaturation"),
        uSymmetry: gl.getUniformLocation(programs.scene, "uSymmetry"),
        uKaleidoscopeEnabled: gl.getUniformLocation(programs.scene, "uKaleidoscopeEnabled"),
        uShapeMode: gl.getUniformLocation(programs.scene, "uShapeMode"),
        uDarken: gl.getUniformLocation(programs.scene, "uDarken"),
        uRayMix: gl.getUniformLocation(programs.scene, "uRayMix"),
        uRayShape: gl.getUniformLocation(programs.scene, "uRayShape"),
        uRaySpeed: gl.getUniformLocation(programs.scene, "uRaySpeed"),
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
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, renderWidth, renderHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

      gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
      gl.viewport(0, 0, renderWidth, renderHeight);
      gl.useProgram(programs.scene);
      gl.uniform2f(uniforms.scene.uResolution, renderWidth, renderHeight);
      gl.uniform1f(uniforms.scene.uTime, t);
      gl.uniform1f(uniforms.scene.uSpeed, config.speed ?? 1.0);

      const colorBack = hexToRgbaVec(config.colorBack ?? "#000000");
      gl.uniform4f(uniforms.scene.uColorBack, colorBack[0], colorBack[1], colorBack[2], colorBack[3]);

      const colorCount = Math.max(1, Math.min(10, Math.round(config.colorCount ?? 4)));
      gl.uniform1f(uniforms.scene.uColorCount, colorCount);

      const defaultColors = [
        "#ff0055", "#00ffcc", "#0055ff", "#ffcc00", "#ff00ff",
        "#00ffff", "#ffff00", "#ff5500", "#5500ff", "#00ff55"
      ];

      // --- FIXED: Bind uColors from config.colors array in real time ---
      for (let i = 0; i < 10; i++) {
        if (uColorsLocations[i]) {
          const hex = (config.colors && config.colors[i]) ? config.colors[i] : defaultColors[i];
          const colorVec = hexToRgbaVec(hex);
          gl.uniform4f(uColorsLocations[i], colorVec[0], colorVec[1], colorVec[2], colorVec[3]);
        }
      }

      gl.uniform1f(uniforms.scene.uBandCount, config.bandCount ?? 5.0);
      gl.uniform1f(uniforms.scene.uTwist, config.twist ?? 0.0);
      gl.uniform1f(uniforms.scene.uProportion, config.proportion ?? 0.5);
      gl.uniform1f(uniforms.scene.uSoftness, config.softness ?? 0.1);
      gl.uniform1f(uniforms.scene.uNoise, config.noise ?? 0.1);
      gl.uniform1f(uniforms.scene.uDistortion, config.distortion ?? 1.0);
      gl.uniform1f(uniforms.scene.uHue, config.hue ?? 0.0);
      gl.uniform1f(uniforms.scene.uSaturation, config.saturation ?? 1.0);
      gl.uniform1f(uniforms.scene.uSymmetry, config.symmetry ? 1.0 : 0.0);
      gl.uniform1f(uniforms.scene.uKaleidoscopeEnabled, config.kaleidoscopeEnabled ? 1.0 : 0.0);
      gl.uniform1f(uniforms.scene.uShapeMode, config.shapeMode ?? 0.0);
      gl.uniform1f(uniforms.scene.uDarken, config.darken ?? 0.0);
      gl.uniform1f(uniforms.scene.uRayMix, config.rayMix ?? 0.0);
      gl.uniform1f(uniforms.scene.uRayShape, config.rayShape ?? 0.0);
      gl.uniform1f(uniforms.scene.uRaySpeed, config.raySpeed ?? 1.0);

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
      const t = globalConfig.paused ? (globalConfig.motion / 100) * 10 : (performance.now() - startTime) * 0.001;
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

const gridAttractorVertShader = `
  attribute vec2 a_position;
  void main() {
    gl_Position = vec4(a_position, 0.0, 1.0);
  }
`;

const gridAttractorFragShader = `
precision highp float;
uniform float uTime;
uniform vec2 uResolution;
uniform float uSpeed;
uniform float uCellSize;
uniform float uSphereSize;
uniform float uBoxHeight;
uniform float uPulseHeight;
uniform vec3 uColorSphere;
uniform vec3 uColorTop;
uniform vec3 uColorSide;
uniform vec3 uColorFront;
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

const float MAX_DIST = 1000.0;
const float SURF_DIST = 0.0001;
const float EPS = 0.0001;
const float PI2 = 6.283185307;

float gaRand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

float gaSdSphere(vec3 p, float s) {
    return length(p) - s;
}

float gaSdBox(vec3 p, vec3 b) {
    vec3 q = abs(p) - b;
    return length(max(q, 0.0)) + min(max(q.x, max(q.y, q.z)), 0.0);
}

vec2 gaMinMat(vec2 d1, vec2 d2) {
    return (d1.x < d2.x) ? d1 : d2;
}

vec2 gaScene(vec3 p) {
    vec2 d = vec2(100000.0, 0.0);
    float t = uTime * uSpeed;
    vec3 q = p;
    float rep = uCellSize;

    vec3 spo = vec3(
        sin(t * 1.8) * 0.25,
        0.32,
        cos(t * 2.2) * 0.3
    );
    vec3 sp = q - spo;
    d.x = gaSdSphere(sp, uSphereSize);

    vec2 id = floor(q.xz / rep);
    float hash = gaRand(id * 0.001);

    q.xz = mod(q.xz, rep) - rep * 0.5;

    vec3 bcp = vec3(0.0);
    bcp.xz = id * rep + rep * 0.5;

    float bsDist = length(spo.xz - bcp.xz);
    float s = smoothstep(0.0, 0.5, bsDist);

    q -= vec3(
        0.0,
        uBoxHeight * 1.25 - (sin(hash * PI2 + t * (2.0 + bsDist * 0.015)) * uPulseHeight) * (1.0 - pow(s, 0.9)),
        0.0
    );

    d = gaMinMat(d, vec2(gaSdBox(q, vec3(rep * 0.5, uBoxHeight, rep * 0.5)), 1.0));

    return d;
}

vec3 gaGetNormal(vec3 p) {
    vec2 e = vec2(EPS, 0.0);
    return normalize(
        vec3(
            gaScene(p + e.xyy).x - gaScene(p - e.xyy).x,
            gaScene(p + e.yxy).x - gaScene(p - e.yxy).x,
            gaScene(p + e.yyx).x - gaScene(p - e.yyx).x
        )
    );
}

vec2 gaRaymarch(vec3 ro, vec3 rd, float side) {
    float accDist = 0.0;
    float mat = 0.0;
    float rep = uCellSize;

    for (int i = 0; i < 128; i++) {
        vec3 p = ro + rd * accDist;
        vec2 result = gaScene(p);
        float dist = result.x * side;
        vec3 rdi = 1.0 / rd;
        mat = result.y;
        if (abs(dist) < SURF_DIST || accDist > MAX_DIST) {
            break;
        }

        accDist += min(
            min(
                (step(0.0, rd.x) - mod(p.x, rep)) * rdi.x,
                (step(0.0, rd.z) - mod(p.z, rep)) * rdi.z
            ) + 0.0001,
            dist
        );
    }

    return vec2(accDist, mat);
}

vec3 gaGetRayDir(vec2 uv, vec3 p, vec3 l, float z) {
    vec3 forward = normalize(l - p);
    vec3 right = normalize(cross(forward, vec3(0.0, 1.0, 0.0)));
    vec3 up = normalize(cross(right, forward));
    return normalize(right * uv.x + up * uv.y + forward * z);
}

void main() {
    vec2 uv = (gl_FragCoord.xy * 2.0 - uResolution.xy) / min(uResolution.x, uResolution.y);

    vec3 ro = vec3(1.0, 1.0, 1.2);
    vec3 ta = vec3(0.0, 0.2, 0.0);
    vec3 rd = gaGetRayDir(uv, ro, ta, 3.5);

    vec2 result = gaRaymarch(ro, rd, 1.0);
    float dist = result.x;
    float mat = result.y;

    vec3 col = vec3(0.0);
    float alpha = 0.0;

    if (dist < MAX_DIST) {
        vec3 p = ro + rd * dist;
        vec3 l = normalize(vec3(1.0, 1.0, -1.0));
        vec3 n = gaGetNormal(p);

        float diffuse = dot(l, n) * 0.5 + 0.5;
        vec3 diffuseColor;

        if (mat < 0.5) {
            diffuseColor = diffuse * uColorSphere;
        } else {
            diffuseColor = diffuse * uColorSide;
            if (n.x > 0.5) diffuseColor = diffuse * uColorSide;
            if (n.y > 0.5) diffuseColor = diffuse * uColorTop;
            if (n.z > 0.5) diffuseColor = diffuse * uColorFront;
        }

        col = diffuseColor;
        alpha = 1.0;
    }

    vec3 hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv.x = fract(hsv.x + uHue / 360.0);
    hsv.y = clamp(hsv.y * uSaturation, 0.0, 1.0);
    col = hsv2rgb(hsv);

    col = pow(col, vec3(0.4545));

    gl_FragColor = vec4(col, alpha);
}
`;

function GridAttractorShader({ config, globalConfig }: { config: GradientConfig['shaders']['gridAttractor'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const configString = useMemo(() => JSON.stringify(config), [config]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        let rect = canvas.getBoundingClientRect();
        canvas.width = rect.width;
        canvas.height = rect.height;

        const gl = canvas.getContext('webgl2', { preserveDrawingBuffer: true, alpha: true }) || canvas.getContext('webgl', { preserveDrawingBuffer: true, alpha: true });
        if (!gl) {
            console.error("WebGL not supported for Grid Attractor Shader");
            return;
        }

        const vertexShader = gl.createShader(gl.VERTEX_SHADER)!;
        gl.shaderSource(vertexShader, gridAttractorVertShader);
        gl.compileShader(vertexShader);

        const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER)!;
        gl.shaderSource(fragmentShader, gridAttractorFragShader);
        gl.compileShader(fragmentShader);

        if (!gl.getShaderParameter(fragmentShader, gl.COMPILE_STATUS)) {
            console.error('Grid Attractor Fragment shader compile error:', gl.getShaderInfoLog(fragmentShader));
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

        const uniforms = {
            uTime: gl.getUniformLocation(program, 'uTime'),
            uResolution: gl.getUniformLocation(program, 'uResolution'),
            uSpeed: gl.getUniformLocation(program, 'uSpeed'),
            uCellSize: gl.getUniformLocation(program, 'uCellSize'),
            uSphereSize: gl.getUniformLocation(program, 'uSphereSize'),
            uBoxHeight: gl.getUniformLocation(program, 'uBoxHeight'),
            uPulseHeight: gl.getUniformLocation(program, 'uPulseHeight'),
            uColorSphere: gl.getUniformLocation(program, 'uColorSphere'),
            uColorTop: gl.getUniformLocation(program, 'uColorTop'),
            uColorSide: gl.getUniformLocation(program, 'uColorSide'),
            uColorFront: gl.getUniformLocation(program, 'uColorFront'),
            uHue: gl.getUniformLocation(program, 'uHue'),
            uSaturation: gl.getUniformLocation(program, 'uSaturation'),
        };

        let animationFrameId: number;
        let startTime = Date.now();

        const render = (time: number) => {
            if (!gl) return;
            rect = canvas.getBoundingClientRect();
            if (canvas.width !== rect.width || canvas.height !== rect.height) {
                canvas.width = rect.width;
                canvas.height = rect.height;
            }
            gl.viewport(0, 0, gl.canvas.width, gl.canvas.height);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.uniform1f(uniforms.uTime, time);
            gl.uniform2f(uniforms.uResolution, gl.canvas.width, gl.canvas.height);
            gl.uniform1f(uniforms.uSpeed, config.speed);
            gl.uniform1f(uniforms.uCellSize, config.cellSize);
            gl.uniform1f(uniforms.uSphereSize, config.sphereSize);
            gl.uniform1f(uniforms.uBoxHeight, config.boxHeight);
            gl.uniform1f(uniforms.uPulseHeight, config.pulseHeight);

            const sphereRgba = hexToRgbaVec(config.colorSphere);
            gl.uniform3f(uniforms.uColorSphere, sphereRgba[0], sphereRgba[1], sphereRgba[2]);
            const topRgba = hexToRgbaVec(config.colorTop);
            gl.uniform3f(uniforms.uColorTop, topRgba[0], topRgba[1], topRgba[2]);
            const sideRgba = hexToRgbaVec(config.colorSide);
            gl.uniform3f(uniforms.uColorSide, sideRgba[0], sideRgba[1], sideRgba[2]);
            const frontRgba = hexToRgbaVec(config.colorFront);
            gl.uniform3f(uniforms.uColorFront, frontRgba[0], frontRgba[1], frontRgba[2]);

            gl.uniform1f(uniforms.uHue, config.hue);
            gl.uniform1f(uniforms.uSaturation, config.saturation);

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
        };

        renderLoop();

        return () => {
            if (animationFrameId) cancelAnimationFrame(animationFrameId);
        };
    }, [configString, globalConfig.paused, globalConfig.motion]);

    return <canvas ref={canvasRef} style={{ width: '100%', height: '100%' }} />;
}

const tunnelCylindersBlitVertShader = `#version 300 es
in vec2 a_position;
out vec2 vUV;
void main() {
  vUV = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const tunnelCylindersBlitFragShader = `#version 300 es
precision highp float;
uniform sampler2D uTexture;
in vec2 vUV;
out vec4 fragColor;
void main() {
  fragColor = texture(uTexture, vUV);
}
`;

const tunnelCylindersVertShader = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const tunnelCylindersFragShader = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uTravelSpeed;
uniform float uTunnelRadius;
uniform float uSegments;
uniform float uRingFrequency;
uniform float uCylinderThickness;
uniform float uThicknessVariation;
uniform float uGlowIntensity;

uniform float uTunnelMix;
uniform float uSwirlMix;
uniform float uSpiralMix;

uniform float uSwirlBandCount;
uniform float uSwirlTwist;

uniform float uSpiralRibbonCount;
uniform float uSpiralDensity;
uniform float uSpiralDistortion;

uniform float uNoiseIntensity;
uniform float uNoiseScale;
uniform float uNoiseSpeed;

uniform vec4 uColors[10];
uniform float uColorCount;

uniform float uHue;
uniform float uSaturation;

out vec4 fragColor;

#define I_MAX 200.0
#define E 0.0001
#define FAR 50.0
#define TWO_PI 6.28318530718

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

// Palette sample — no background mix anymore; transparency is handled
// entirely via the output alpha in main().
vec3 paletteColor(float t) {
    float m = clamp(t * 0.5 + 0.5, 0.0, 1.0) * uColorCount;
    vec4 grad = uColors[0];
    grad.rgb *= grad.a;
    for (int i = 1; i < 10; i++) {
        if (float(i) > uColorCount) break;
        float mm = clamp(m - float(i - 1), 0.0, 1.0);
        mm = smoothstep(0.15, 0.85, mm);
        vec4 c = uColors[i - 1];
        c.rgb *= c.a;
        grad = mix(grad, c, mm);
    }
    return grad.rgb;
}

// Simplex noise (Ashima), self-contained for fine-grained turbulence.
vec3 permute3(vec3 x) { return mod(((x * 34.0) + 1.0) * x, 289.0); }
float snoise(vec2 v) {
    const vec4 C = vec4(0.211324865405187, 0.366025403784439, -0.577350269189626, 0.024390243902439);
    vec2 i  = floor(v + dot(v, C.yy));
    vec2 x0 = v - i + dot(i, C.xx);
    vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
    vec4 x12 = x0.xyxy + C.xxzz;
    x12.xy -= i1;
    i = mod(i, 289.0);
    vec3 p = permute3(permute3(i.y + vec3(0.0, i1.y, 1.0)) + i.x + vec3(0.0, i1.x, 1.0));
    vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy), dot(x12.zw, x12.zw)), 0.0);
    m = m * m;
    m = m * m;
    vec3 x = 2.0 * fract(p * C.www) - 1.0;
    vec3 h = abs(x) - 0.5;
    vec3 ox = floor(x + 0.5);
    vec3 a0 = x - ox;
    m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
    vec3 g;
    g.x = a0.x * x0.x + h.x * x0.y;
    g.yz = a0.yz * x12.xz + h.yz * x12.yw;
    return 130.0 * dot(m, g);
}

float tcT;
vec3 tcH;
float tcVar;

vec2 modA(vec2 p, float count) {
    float an = TWO_PI / count;
    float a = atan(p.y, p.x) + an * 0.5;
    a = mod(a, an) - an * 0.5;
    return vec2(cos(a), sin(a)) * length(p);
}

// Unified pattern: tunnel banding + swirl radial term + spiral ribbon term
// all computed from the same angle/radius/depth for this point, then
// mixed 50/30/20 into a single "var" that drives both geometry and color.
float scene(vec3 p) {
    vec3 op = p;
    float ang = atan(p.x, p.y);
    float rad = length(p.xy);

    float tunnelVar = cos(ang + floor(p.z) + tcT * (mod(floor(p.z), 2.0) - 1.0 == 0.0 ? -1.0 : 1.0));

    float bands = ceil(max(uSwirlBandCount, 1.0));
    float swirlAngNorm = (bands * ang + tcT * 2.0) / TWO_PI;
    float twistAmt = 3.0 * clamp(uSwirlTwist, 0.0, 1.0);
    float swirlOffset = pow(max(rad, 1e-3), -twistAmt) + swirlAngNorm;
    float swirlShape = fract(swirlOffset);
    swirlShape = 1.0 - abs(2.0 * swirlShape - 1.0);
    float swirlVar = swirlShape * 2.0 - 1.0;

    float spiralRibbons = max(floor(uSpiralRibbonCount / 10.0 + 0.5), 1.0);
    float depth = p.z * uSpiralDensity + tcT * (uTravelSpeed * 0.5);
    float spiralVar = sin(ang * spiralRibbons + depth) * cos(depth * uSpiralDistortion);

    float wSum = max(uTunnelMix + uSwirlMix + uSpiralMix, 0.0001);
    float var = (tunnelVar * uTunnelMix + swirlVar * uSwirlMix + spiralVar * uSpiralMix) / wSum;

    // Finely-tunable turbulence: uNoiseIntensity = 0 fully disables it.
    if (uNoiseIntensity > 0.0001) {
        vec2 noiseCoord = vec2(ang * 1.5, p.z * 0.35 + tcT * uNoiseSpeed) * uNoiseScale;
        var += snoise(noiseCoord) * uNoiseIntensity;
    }

    tcVar = var;

    float dist_cylinder = 1e5;
    float mind = rad - uTunnelRadius + 0.1 * var;
    mind = max(mind, -(rad - (uTunnelRadius - 0.1) + 0.1 * var));

    p.xy = modA(p.yx, uSegments + uSegments * sin(p.z * 0.25));
    p.z = fract(p.z * uRingFrequency) - 0.5;

    if (var != 0.0) {
        dist_cylinder = length(p.zy) - uCylinderThickness - uThicknessVariation * sin(op.z * 5.5);
        dist_cylinder = max(dist_cylinder, -p.x + 0.4 + clamp(var, 0.0, 1.0));
    }

    mind = min(mind, dist_cylinder);

    tcH += vec3(0.5, 0.8, 0.5) * (var != 0.0 ? 1.0 : 0.0) * 0.0125 /
        (0.01 + max(mind - var * 0.1, 0.0001) * max(mind - var * 0.1, 0.0001));

    return mind;
}

vec2 march(vec3 pos, vec3 dir) {
    vec2 dist = vec2(0.0);
    vec3 p = vec3(0.0);
    vec2 s = vec2(0.0);
    for (float i = -1.0; i < I_MAX; ++i) {
        p = pos + dir * dist.y;
        dist.x = scene(p);
        dist.y += dist.x * 0.2;
        if (dist.x < E || dist.y > FAR) break;
        s.x++;
    }
    s.y = dist.y;
    return s;
}

vec3 tunnelCamera(vec2 uv) {
    vec3 forw = vec3(0.0, 0.0, -1.0);
    vec3 right = vec3(1.0, 0.0, 0.0);
    vec3 up = vec3(0.0, 1.0, 0.0);
    return normalize(uv.x * right + uv.y * up + 1.0 * forw);
}

void main() {
    tcT = uTime * uSpeed;
    tcH = vec3(0.0);

    vec2 R = uResolution.xy;
    vec2 uv = (gl_FragCoord.xy - R * 0.5) / R.y;

    vec3 dir = tunnelCamera(uv);
    vec3 pos = vec3(0.0, 0.0, 4.5 - uTime * uTravelSpeed);

    vec2 inter = march(pos, dir);

    vec3 col = vec3(0.0);
    if (inter.y <= FAR) {
        col = paletteColor(tcVar) * (1.0 - inter.x * 0.0025);
    }
    col += tcH * 0.005125 * uGlowIntensity;

    vec3 hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv.x = fract(hsv.x + uHue / 360.0);
    hsv.y = clamp(hsv.y * uSaturation, 0.0, 1.0);
    col = hsv2rgb(hsv);

    // No background color — transparency comes straight from output alpha.
    float alpha = clamp(dot(col, vec3(0.2126, 0.7152, 0.0722)) * 1.6, 0.0, 1.0);
    fragColor = vec4(col * alpha, alpha);
}
`;

function TunnelCylindersShader({ config, globalConfig }: { config: GradientConfig['shaders']['tunnelCylinders'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl2');
        if (!gl) {
            console.error("WebGL2 not supported for Tunnel Cylinders Shader");
            return;
        }

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Tunnel Cylinders shader compile error:', gl.getShaderInfoLog(shader));
            }
            return shader;
        };

        const createProgram = (vsSrc: string, fsSrc: string) => {
            const program = gl.createProgram()!;
            gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSrc));
            gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSrc));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error('Tunnel Cylinders program link error:', gl.getProgramInfoLog(program));
            }
            return program;
        };

        const sceneProgram = createProgram(tunnelCylindersVertShader, tunnelCylindersFragShader);
        const blitProgram = createProgram(tunnelCylindersBlitVertShader, tunnelCylindersBlitFragShader);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        const scenePosLoc = gl.getAttribLocation(sceneProgram, "a_position");
        const blitPosLoc = gl.getAttribLocation(blitProgram, "a_position");

        const lowResTexture = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        const lowResFbo = gl.createFramebuffer()!;
        gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, lowResTexture, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        const sceneUniforms = {
            uTime: gl.getUniformLocation(sceneProgram, 'uTime'),
            uResolution: gl.getUniformLocation(sceneProgram, 'uResolution'),
            uSpeed: gl.getUniformLocation(sceneProgram, 'uSpeed'),
            uTravelSpeed: gl.getUniformLocation(sceneProgram, 'uTravelSpeed'),
            uTunnelRadius: gl.getUniformLocation(sceneProgram, 'uTunnelRadius'),
            uSegments: gl.getUniformLocation(sceneProgram, 'uSegments'),
            uRingFrequency: gl.getUniformLocation(sceneProgram, 'uRingFrequency'),
            uCylinderThickness: gl.getUniformLocation(sceneProgram, 'uCylinderThickness'),
            uThicknessVariation: gl.getUniformLocation(sceneProgram, 'uThicknessVariation'),
            uGlowIntensity: gl.getUniformLocation(sceneProgram, 'uGlowIntensity'),
            uTunnelMix: gl.getUniformLocation(sceneProgram, 'uTunnelMix'),
            uSwirlMix: gl.getUniformLocation(sceneProgram, 'uSwirlMix'),
            uSpiralMix: gl.getUniformLocation(sceneProgram, 'uSpiralMix'),
            uSwirlBandCount: gl.getUniformLocation(sceneProgram, 'uSwirlBandCount'),
            uSwirlTwist: gl.getUniformLocation(sceneProgram, 'uSwirlTwist'),
            uSpiralRibbonCount: gl.getUniformLocation(sceneProgram, 'uSpiralRibbonCount'),
            uSpiralDensity: gl.getUniformLocation(sceneProgram, 'uSpiralDensity'),
            uSpiralDistortion: gl.getUniformLocation(sceneProgram, 'uSpiralDistortion'),
            uNoiseIntensity: gl.getUniformLocation(sceneProgram, 'uNoiseIntensity'),
            uNoiseScale: gl.getUniformLocation(sceneProgram, 'uNoiseScale'),
            uNoiseSpeed: gl.getUniformLocation(sceneProgram, 'uNoiseSpeed'),
            uColorCount: gl.getUniformLocation(sceneProgram, 'uColorCount'),
            uHue: gl.getUniformLocation(sceneProgram, 'uHue'),
            uSaturation: gl.getUniformLocation(sceneProgram, 'uSaturation'),
        };
        const blitUniforms = {
            uTexture: gl.getUniformLocation(blitProgram, 'uTexture'),
        };

        let startTime = Date.now();
        let animationFrameId: number;

        const render = (time: number) => {
            const rect = canvas.getBoundingClientRect();
            const fullWidth = Math.max(1, Math.floor(rect.width));
            const fullHeight = Math.max(1, Math.floor(rect.height));
            if (canvas.width !== fullWidth || canvas.height !== fullHeight) {
                canvas.width = fullWidth;
                canvas.height = fullHeight;
            }

            const renderScale = Math.max(0.1, Math.min(1.0, config.renderScale ?? 0.6));
            const renderWidth = Math.max(1, Math.floor(fullWidth * renderScale));
            const renderHeight = Math.max(1, Math.floor(fullHeight * renderScale));

            gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, renderWidth, renderHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
            gl.viewport(0, 0, renderWidth, renderHeight);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(sceneProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(scenePosLoc);
            gl.vertexAttribPointer(scenePosLoc, 2, gl.FLOAT, false, 0, 0);

            gl.uniform1f(sceneUniforms.uTime, time);
            gl.uniform2f(sceneUniforms.uResolution, renderWidth, renderHeight);
            gl.uniform1f(sceneUniforms.uSpeed, config.speed);
            gl.uniform1f(sceneUniforms.uTravelSpeed, config.travelSpeed);
            gl.uniform1f(sceneUniforms.uTunnelRadius, config.tunnelRadius);
            gl.uniform1f(sceneUniforms.uSegments, config.segments);
            gl.uniform1f(sceneUniforms.uRingFrequency, config.ringFrequency);
            gl.uniform1f(sceneUniforms.uCylinderThickness, config.cylinderThickness);
            gl.uniform1f(sceneUniforms.uThicknessVariation, config.thicknessVariation);
            gl.uniform1f(sceneUniforms.uGlowIntensity, config.glowIntensity);
            gl.uniform1f(sceneUniforms.uTunnelMix, config.tunnelMix);
            gl.uniform1f(sceneUniforms.uSwirlMix, config.swirlMix);
            gl.uniform1f(sceneUniforms.uSpiralMix, config.spiralMix);
            gl.uniform1f(sceneUniforms.uSwirlBandCount, config.swirlBandCount);
            gl.uniform1f(sceneUniforms.uSwirlTwist, config.swirlTwist);
            gl.uniform1f(sceneUniforms.uSpiralRibbonCount, config.spiralRibbonCount);
            gl.uniform1f(sceneUniforms.uSpiralDensity, config.spiralDensity);
            gl.uniform1f(sceneUniforms.uSpiralDistortion, config.spiralDistortion);
            gl.uniform1f(sceneUniforms.uNoiseIntensity, config.noiseIntensity ?? 0.0);
            gl.uniform1f(sceneUniforms.uNoiseScale, config.noiseScale ?? 1.0);
            gl.uniform1f(sceneUniforms.uNoiseSpeed, config.noiseSpeed ?? 1.0);
            gl.uniform1f(sceneUniforms.uHue, config.hue ?? 0.0);
            gl.uniform1f(sceneUniforms.uSaturation, config.saturation ?? 1.0);

            config.colors.forEach((color, index) => {
                if (index >= 10) return;
                const loc = gl.getUniformLocation(sceneProgram, `uColors[${index}]`);
                const rgba = hexToRgbaVec(color);
                gl.uniform4f(loc, rgba[0], rgba[1], rgba[2], rgba[3]);
            });
            gl.uniform1f(sceneUniforms.uColorCount, config.colorCount);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, fullWidth, fullHeight);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(blitProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(blitPosLoc);
            gl.vertexAttribPointer(blitPosLoc, 2, gl.FLOAT, false, 0, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
            gl.uniform1i(blitUniforms.uTexture, 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        const renderLoop = () => {
            const time = globalConfig.paused ? (globalConfig.motion / 100) * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();
        return () => {
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(sceneProgram);
            gl.deleteProgram(blitProgram);
            gl.deleteBuffer(positionBuffer);
            gl.deleteTexture(lowResTexture);
            gl.deleteFramebuffer(lowResFbo);
        };
    }, [config, globalConfig.paused, globalConfig.motion]);

    return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />;
}

const psychedelicFlowerTunnelBlitVertShader = `#version 300 es
in vec2 a_position;
out vec2 vUV;
void main() {
  vUV = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const psychedelicFlowerTunnelBlitFragShader = `#version 300 es
precision highp float;
uniform sampler2D uTexture;
in vec2 vUV;
out vec4 fragColor;
void main() {
  fragColor = texture(uTexture, vUV);
}
`;

const psychedelicFlowerTunnelVertShader = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const psychedelicFlowerTunnelFragShader = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;
uniform float uSpeed;
uniform float uTravelSpeed;
uniform float uRepeatSpacing;
uniform float uBoxSize;
uniform float uEdgeThickness;
uniform float uScaleFactor;
uniform float uIterations;
uniform float uPetalCount;
uniform float uRotationSpeed;
uniform float uFov;
uniform float uFogDensity;
uniform float uColorShiftSpeed;
uniform vec4 uColors[10];
uniform float uColorCount;
uniform vec4 uColorBack;
uniform float uHue;
uniform float uSaturation;

out vec4 fragColor;

#define PI 3.1415
#define repeatCoord(p, o) mod(p, o) - o * .5

const float stopThreshold = .0001;

struct Light {
    vec3 position;
    float intensity;
    vec3 color;
    vec3 diffuse;
    vec3 specular;
    float attenuation;
};

struct Surface {
    float depth;
    float dist;
    vec3 position;
    vec3 baseColor;
    vec3 normal;
    float material;
};

vec2 minMat(vec2 d1, vec2 d2) {
    return (d1.x < d2.x) ? d1 : d2;
}

float n3(vec3 p) {
    vec3 r = vec3(1.0, 99.0, 999.0);
    vec4 s = dot(floor(p), r) + vec4(0.0, r.yz, r.y + r.z);
    p = smoothstep(0.0, 1.0, fract(p));
    vec4 a = mix(fract(sin(s) * 5555.0), fract(sin(s + 1.0) * 5555.0), p.x);
    vec2 b = mix(a.xz, a.yw, p.y);
    return mix(b.x, b.y, p.z);
}

mat2 rot(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, s, -s, c);
}

float sdBox(vec3 p, vec3 b) {
    vec3 d = abs(p) - b;
    return length(max(d, 0.0)) + min(max(d.x, max(d.y, d.z)), 0.0);
}

float opSub(float d1, float d2) { return max(-d1, d2); }

float sdWireBox(vec3 p, float s, float b) {
    float d = 0.0;
    float o = s + 0.01;
    float i = s - b;
    d = opSub(sdBox(p, vec3(o, i, i)), sdBox(p, vec3(s)));
    d = opSub(sdBox(p, vec3(i, o, i)), d);
    d = opSub(sdBox(p, vec3(i, i, o)), d);
    return d;
}

// Radial mirror-fold — this is what turns the recursive boxes into "petals".
vec2 pmod(vec2 p, float r) {
    float a = atan(p.x, p.y) + PI / r;
    float n = PI * 2.0 / r;
    a = floor(a / n) * n;
    return p * rot(-a);
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

vec3 paletteColor(float t) {
    float m = clamp(t, 0.0, 1.0) * uColorCount;
    vec4 grad = uColors[0];
    grad.rgb *= grad.a;
    for (int i = 1; i < 10; i++) {
        if (float(i) > uColorCount) break;
        float mm = clamp(m - float(i - 1), 0.0, 1.0);
        mm = smoothstep(0.15, 0.85, mm);
        vec4 c = uColors[i - 1];
        c.rgb *= c.a;
        grad = mix(grad, c, mm);
    }
    return grad.rgb;
}

float m_;

vec2 sceneMap(vec3 p) {
    float d = 0.0;
    vec3 _p = p;

    _p = repeatCoord(_p, uRepeatSpacing);

    d = sdWireBox(_p, uBoxSize, uEdgeThickness);
    vec2 obj = vec2(d, 1.0);

    _p.xy = pmod(_p.xy, max(uPetalCount, 1.0));
    vec3 size = vec3(1.0);

    for (int i = 0; i < 12; i++) {
        if (float(i) >= uIterations) break;

        _p.y -= size.x * 0.32;
        _p.y -= size.y;
        _p.xz *= rot(sin(uTime * uRotationSpeed + float(i) * uRotationSpeed) * PI * 2.0);

        float currentDist = sdWireBox(p, uBoxSize * size.y, uEdgeThickness * size.y);
        vec2 currentObj = vec2(currentDist, float(i) + 1.0);
        m_ = minMat(obj, currentObj).y;
        obj.x = min(obj.x, currentObj.x);
        obj.y = m_;

        p = _p;
        size *= uScaleFactor;
    }

    return obj;
}

mat3 lookCamera(vec3 o, vec3 t, vec3 u) {
    vec3 forward = normalize(t - o);
    vec3 right = cross(forward, u);
    vec3 up = cross(right, forward);
    return mat3(right, up, forward);
}

vec3 getNormal(vec3 p, float e) {
    vec2 eo = vec2(e, 0.0);
    return normalize(vec3(
        sceneMap(p + eo.xyy).x - sceneMap(p - eo.xyy).x,
        sceneMap(p + eo.yxy).x - sceneMap(p - eo.yxy).x,
        sceneMap(p + eo.yyx).x - sceneMap(p - eo.yyx).x
    ));
}

float getSpecular(vec3 position, vec3 normal, Light light, float diffuse, vec3 cameraPos) {
    vec3 lightDir = light.position - position;
    vec3 ref = reflect(-normalize(lightDir), normal);
    float specular = 0.0;
    if (diffuse > 0.0) {
        specular = max(0.0, dot(ref, normalize(cameraPos - normal)));
        specular = pow(specular, 64.0);
    }
    return specular;
}

void calcDirectionalLight(inout Light light, Surface surface, vec3 cameraPos) {
    float diffuseCoef = max(0.0, dot(surface.normal, normalize(light.position)));
    vec3 diffuse = diffuseCoef * light.attenuation * light.color * light.intensity;
    float specularCoef = getSpecular(surface.position, surface.normal, light, diffuseCoef, cameraPos);
    vec3 specular = vec3(specularCoef * light.attenuation * light.color * light.intensity);
    light.diffuse = diffuse;
    light.specular = specular;
}

vec3 lighting(Surface surface, vec3 cameraPos) {
    vec3 color = vec3(0.0);
    Light directionalLight;
    directionalLight.position = vec3(-0.2, 0.2, -1.0);
    directionalLight.intensity = 0.8;
    directionalLight.color = vec3(1.0);
    directionalLight.attenuation = 1.0;
    calcDirectionalLight(directionalLight, surface, cameraPos);

    vec3 diffuse = directionalLight.diffuse;
    vec3 ambient = vec3(0.2);

    color = surface.baseColor * diffuse + ambient;
    return color;
}

vec3 applyFog(vec3 color, float distance, vec3 fogColor, float density) {
    float fogAmount = 1.0 - exp(-distance * density);
    return mix(color, fogColor, fogAmount);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - uResolution.xy * 0.5) / min(uResolution.x, uResolution.y);

    float nois = (
        n3(vec3(normalize(uv) * 20.0, 1.0)) +
        n3(vec3(normalize(uv) * 40.0, 2.0)) * 1.5 +
        n3(vec3(normalize(uv) * 100.0, 3.0)) * 1.5
    ) / 4.0;
    nois = pow(nois, 4.0) * 2.0 - 1.0;

    float flightPhase = uTime * uSpeed * 0.11 + (nois * 0.01 + n3(vec3(uv * 600.0, 0.0)) * 0.003) * pow(dot(uv, uv), 0.3);
    vec3 movement = vec3(0.0, 0.0, flightPhase * 50.0 * uTravelSpeed);

    vec3 ro = vec3(6.0, 6.0, 4.0) + movement;
    vec3 target = ro + movement;

    vec3 up = vec3(0.0, 1.0, 0.0);
    up.xy *= rot(uTime * uRotationSpeed * 0.3);
    vec3 rd = lookCamera(ro, target, up) * normalize(vec3(uv, uFov));

    float depth = 0.0;
    float dist = 0.0;
    vec2 result = vec2(0.0);
    for (int i = 0; i < 64; i++) {
        result = sceneMap(ro + rd * depth);
        dist = result.x;
        if (dist < stopThreshold) break;
        depth += result.x;
    }

    vec3 position = ro + rd * depth;
    vec3 normal = getNormal(position, 0.01);

    Surface surface;
    surface.depth = depth;
    surface.dist = dist;
    surface.position = position;
    surface.normal = normal;
    surface.material = result.y;

    vec3 bgColor = uColorBack.rgb;
    vec3 sceneColor;

    if (dist >= stopThreshold) {
        sceneColor = bgColor;
    } else {
        surface.baseColor = paletteColor(fract(surface.material / max(uIterations, 1.0)));
        sceneColor = lighting(surface, ro);
    }

    sceneColor = applyFog(sceneColor, depth, bgColor, uFogDensity);
    sceneColor *= smoothstep(1.3, 0.6, length(uv.xy));

    vec3 hsv = rgb2hsv(clamp(sceneColor, 0.0, 1.0));
    hsv.x = fract(hsv.x + uHue / 360.0 + uTime * uColorShiftSpeed * 0.05);
    hsv.y = clamp(hsv.y * uSaturation, 0.0, 1.0);
    sceneColor = hsv2rgb(hsv);

    fragColor = vec4(sceneColor, uColorBack.a);
}
`;

function PsychedelicFlowerTunnelShader({ config, globalConfig }: { config: GradientConfig['shaders']['psychedelicFlowerTunnel'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl2');
        if (!gl) {
            console.error("WebGL2 not supported for Psychedelic Flower Tunnel Shader");
            return;
        }

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Psychedelic Flower Tunnel shader compile error:', gl.getShaderInfoLog(shader));
            }
            return shader;
        };

        const createProgram = (vsSrc: string, fsSrc: string) => {
            const program = gl.createProgram()!;
            gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSrc));
            gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSrc));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error('Psychedelic Flower Tunnel program link error:', gl.getProgramInfoLog(program));
            }
            return program;
        };

        const sceneProgram = createProgram(psychedelicFlowerTunnelVertShader, psychedelicFlowerTunnelFragShader);
        const blitProgram = createProgram(psychedelicFlowerTunnelBlitVertShader, psychedelicFlowerTunnelBlitFragShader);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        const scenePosLoc = gl.getAttribLocation(sceneProgram, "a_position");
        const blitPosLoc = gl.getAttribLocation(blitProgram, "a_position");

        const lowResTexture = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        const lowResFbo = gl.createFramebuffer()!;
        gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, lowResTexture, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        const sceneUniforms = {
            uTime: gl.getUniformLocation(sceneProgram, 'uTime'),
            uResolution: gl.getUniformLocation(sceneProgram, 'uResolution'),
            uSpeed: gl.getUniformLocation(sceneProgram, 'uSpeed'),
            uTravelSpeed: gl.getUniformLocation(sceneProgram, 'uTravelSpeed'),
            uRepeatSpacing: gl.getUniformLocation(sceneProgram, 'uRepeatSpacing'),
            uBoxSize: gl.getUniformLocation(sceneProgram, 'uBoxSize'),
            uEdgeThickness: gl.getUniformLocation(sceneProgram, 'uEdgeThickness'),
            uScaleFactor: gl.getUniformLocation(sceneProgram, 'uScaleFactor'),
            uIterations: gl.getUniformLocation(sceneProgram, 'uIterations'),
            uPetalCount: gl.getUniformLocation(sceneProgram, 'uPetalCount'),
            uRotationSpeed: gl.getUniformLocation(sceneProgram, 'uRotationSpeed'),
            uFov: gl.getUniformLocation(sceneProgram, 'uFov'),
            uFogDensity: gl.getUniformLocation(sceneProgram, 'uFogDensity'),
            uColorShiftSpeed: gl.getUniformLocation(sceneProgram, 'uColorShiftSpeed'),
            uColorCount: gl.getUniformLocation(sceneProgram, 'uColorCount'),
            uColorBack: gl.getUniformLocation(sceneProgram, 'uColorBack'),
            uHue: gl.getUniformLocation(sceneProgram, 'uHue'),
            uSaturation: gl.getUniformLocation(sceneProgram, 'uSaturation'),
        };
        const blitUniforms = {
            uTexture: gl.getUniformLocation(blitProgram, 'uTexture'),
        };

        let startTime = Date.now();
        let animationFrameId: number;

        const render = (time: number) => {
            const rect = canvas.getBoundingClientRect();
            const fullWidth = Math.max(1, Math.floor(rect.width));
            const fullHeight = Math.max(1, Math.floor(rect.height));
            if (canvas.width !== fullWidth || canvas.height !== fullHeight) {
                canvas.width = fullWidth;
                canvas.height = fullHeight;
            }

            const renderScale = Math.max(0.1, Math.min(1.0, config.renderScale ?? 0.6));
            const renderWidth = Math.max(1, Math.floor(fullWidth * renderScale));
            const renderHeight = Math.max(1, Math.floor(fullHeight * renderScale));

            gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, renderWidth, renderHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
            gl.viewport(0, 0, renderWidth, renderHeight);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(sceneProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(scenePosLoc);
            gl.vertexAttribPointer(scenePosLoc, 2, gl.FLOAT, false, 0, 0);

            gl.uniform1f(sceneUniforms.uTime, time);
            gl.uniform2f(sceneUniforms.uResolution, renderWidth, renderHeight);
            gl.uniform1f(sceneUniforms.uSpeed, config.speed);
            gl.uniform1f(sceneUniforms.uTravelSpeed, config.travelSpeed);
            gl.uniform1f(sceneUniforms.uRepeatSpacing, config.repeatSpacing);
            gl.uniform1f(sceneUniforms.uBoxSize, config.boxSize);
            gl.uniform1f(sceneUniforms.uEdgeThickness, config.edgeThickness);
            gl.uniform1f(sceneUniforms.uScaleFactor, config.scaleFactor);
            gl.uniform1f(sceneUniforms.uIterations, config.iterations);
            gl.uniform1f(sceneUniforms.uPetalCount, config.petalCount);
            gl.uniform1f(sceneUniforms.uRotationSpeed, config.rotationSpeed);
            gl.uniform1f(sceneUniforms.uFov, config.fov);
            gl.uniform1f(sceneUniforms.uFogDensity, config.fogDensity);
            gl.uniform1f(sceneUniforms.uColorShiftSpeed, config.colorShiftSpeed);
            gl.uniform1f(sceneUniforms.uHue, config.hue ?? 0.0);
            gl.uniform1f(sceneUniforms.uSaturation, config.saturation ?? 1.0);

            const bgRgba = hexToRgbaVec(config.colorBack);
            gl.uniform4f(sceneUniforms.uColorBack, bgRgba[0], bgRgba[1], bgRgba[2], bgRgba[3]);

            config.colors.forEach((color, index) => {
                if (index >= 10) return;
                const loc = gl.getUniformLocation(sceneProgram, `uColors[${index}]`);
                const rgba = hexToRgbaVec(color);
                gl.uniform4f(loc, rgba[0], rgba[1], rgba[2], rgba[3]);
            });
            gl.uniform1f(sceneUniforms.uColorCount, config.colorCount);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, fullWidth, fullHeight);
            gl.clearColor(0, 0, 0, 0);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(blitProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(blitPosLoc);
            gl.vertexAttribPointer(blitPosLoc, 2, gl.FLOAT, false, 0, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
            gl.uniform1i(blitUniforms.uTexture, 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        const renderLoop = () => {
            const time = globalConfig.paused ? (globalConfig.motion / 100) * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();
        return () => {
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(sceneProgram);
            gl.deleteProgram(blitProgram);
            gl.deleteBuffer(positionBuffer);
            gl.deleteTexture(lowResTexture);
            gl.deleteFramebuffer(lowResFbo);
        };
    }, [config, globalConfig.paused, globalConfig.motion]);

    return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />;
}

const celestialJourneyBlitVertShader = `#version 300 es
in vec2 a_position;
out vec2 vUV;
void main() {
  vUV = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const celestialJourneyBlitFragShader = `#version 300 es
precision highp float;
uniform sampler2D uTexture;
in vec2 vUV;
out vec4 fragColor;
void main() {
  fragColor = texture(uTexture, vUV);
}
`;

const celestialJourneyVertShader = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const celestialJourneyFragShader = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;

uniform float uCameraSpeed;
uniform float uFocalLength;

uniform float uMaxDistance;
uniform float uTunnelRadius;
uniform float uTunnelRoughness;
uniform float uVolumeDensity;

uniform float uGlowStrength;
uniform float uExposure;

uniform vec3 uColor1;
uniform vec3 uColor2;
uniform vec3 uColor3;
uniform vec3 uColor4;
uniform vec3 uColor5;
uniform vec3 uColor6;
uniform vec3 uColor7;

uniform float uHue;
uniform float uSaturation;

out vec4 fragColor;

const int VOLUME_STEPS = 106;
const float INV_LN2 = 1.44269504089;

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

float saturateF(float value) {
    return clamp(value, 0.0, 1.0);
}

mat2 rotation2(float angle) {
    float sineValue = sin(angle);
    float cosineValue = cos(angle);
    return mat2(cosineValue, -sineValue, sineValue, cosineValue);
}

float hash31(vec3 position) {
    position = fract(position * 0.1031);
    position += dot(position, position.yzx + 33.33);
    return fract((position.x + position.y) * position.z);
}

float noise3(vec3 position) {
    vec3 cell = floor(position);
    vec3 localPosition = fract(position);
    localPosition = localPosition * localPosition * (3.0 - 2.0 * localPosition);

    float value000 = hash31(cell + vec3(0.0, 0.0, 0.0));
    float value100 = hash31(cell + vec3(1.0, 0.0, 0.0));
    float value010 = hash31(cell + vec3(0.0, 1.0, 0.0));
    float value110 = hash31(cell + vec3(1.0, 1.0, 0.0));
    float value001 = hash31(cell + vec3(0.0, 0.0, 1.0));
    float value101 = hash31(cell + vec3(1.0, 0.0, 1.0));
    float value011 = hash31(cell + vec3(0.0, 1.0, 1.0));
    float value111 = hash31(cell + vec3(1.0, 1.0, 1.0));

    float valueX00 = mix(value000, value100, localPosition.x);
    float valueX10 = mix(value010, value110, localPosition.x);
    float valueX01 = mix(value001, value101, localPosition.x);
    float valueX11 = mix(value011, value111, localPosition.x);

    float valueXY0 = mix(valueX00, valueX10, localPosition.y);
    float valueXY1 = mix(valueX01, valueX11, localPosition.y);

    return mix(valueXY0, valueXY1, localPosition.z);
}

float layeredNoise(vec3 position, out float detail) {
    const mat3 noiseRotation = mat3(
         0.00,  0.80,  0.60,
        -0.80,  0.36, -0.48,
        -0.60, -0.48,  0.64
    );

    float octave0 = noise3(position);

    position = noiseRotation * position * 2.03 + vec3(1.71, -2.13, 0.83);
    float octave1 = noise3(position);

    position = noiseRotation * position * 2.01 + vec3(-1.17, 2.41, -0.91);
    float octave2 = noise3(position);

    position = noiseRotation * position * 2.04 + vec3(2.03, 0.37, 1.53);
    float octave3 = noise3(position);

    detail = saturateF(octave2 * 0.64 + octave3 * 0.36);

    return octave0 * 0.52 + octave1 * 0.27 + octave2 * 0.14 + octave3 * 0.07;
}

vec2 tunnelPath(float depth) {
    return vec2(
        0.16 * sin(depth * 0.190) + 0.07 * sin(depth * 0.071 + 1.20),
        0.13 * cos(depth * 0.160 + 0.30) + 0.06 * sin(depth * 0.093 - 0.80)
    );
}

float evaluateNebula(
    vec3 position,
    vec3 flowOffset,
    out float macroField,
    out float detailField,
    out float warmField
) {
    vec2 tunnelCenter = tunnelPath(position.z);
    vec2 localPosition = position.xy - tunnelCenter;

    float radius = length(localPosition);
    float angle = atan(localPosition.y, localPosition.x);

    float tunnelTwist = position.z * 0.180 + 0.12 * sin(position.z * 0.070);
    vec2 rotatedPosition = rotation2(tunnelTwist) * localPosition;

    vec3 noisePosition = vec3(rotatedPosition * 0.94, position.z * 0.285) + flowOffset;

    macroField = layeredNoise(noisePosition, detailField);

    float angularShape =
        0.110 * sin(angle * 3.0 + position.z * 0.52) +
        0.055 * sin(angle * 7.0 - position.z * 0.29) +
        0.030 * sin(angle * 13.0 + position.z * 0.17);

    float localTunnelRadius = uTunnelRadius + uTunnelRoughness * (macroField - 0.5) + angularShape;

    float shellDistance = abs(radius - localTunnelRadius);
    float broadShell = exp2(-7.0 * shellDistance * shellDistance);
    float denseShell = exp2(-38.0 * shellDistance * shellDistance);

    float innerShellDistance = radius - (localTunnelRadius - 0.30);
    float innerShell = exp2(-54.0 * innerShellDistance * innerShellDistance);

    float ridgeField = 1.0 - abs(detailField * 2.0 - 1.0);

    float cloudMask = smoothstep(0.34, 0.73, macroField + ridgeField * 0.15);
    float filamentMask = smoothstep(0.47, 0.88, detailField + macroField * 0.16);

    float density =
        broadShell * (0.09 + cloudMask * 1.05) +
        denseShell * (0.16 + filamentMask * 1.24) +
        innerShell * cloudMask * 0.42;

    density *= smoothstep(0.22, 0.54, radius);

    warmField = smoothstep(
        0.74, 0.97,
        detailField + 0.17 * sin(angle * 2.0 - position.z * 0.31) + macroField * 0.10
    );

    return max(density, 0.0);
}

vec3 getNebulaColor(float macroField, float detailField, float warmField) {
    float cloudBrightness = smoothstep(0.24, 0.78, macroField);
    float cyanAmount = smoothstep(0.54, 0.91, detailField);
    float filamentAmount = pow(smoothstep(0.58, 0.96, detailField + macroField * 0.11), 2.2);

    vec3 color = mix(uColor3, uColor4, cloudBrightness);
    color = mix(color, uColor5, cyanAmount * 0.72);
    color += uColor6 * filamentAmount * uGlowStrength;
    color = mix(color, uColor7, warmField * 0.24);

    return color;
}

vec4 renderVolume(
    vec3 rayOrigin,
    vec3 rayDirection,
    vec2 fragmentCoordinate,
    float animationTime,
    float centerIllumination
) {
    float baseStep = uMaxDistance / float(VOLUME_STEPS);
    float extinction = uVolumeDensity * baseStep * INV_LN2;

    float jitter = hash31(vec3(fragmentCoordinate, 17.0));
    float travel = 0.16 + jitter * baseStep;

    float transmittance = 1.0;
    vec3 accumulatedColor = vec3(0.0);

    vec3 flowOffset = vec3(
        0.07 * sin(animationTime * 0.11),
        0.06 * cos(animationTime * 0.09),
        animationTime * 0.035
    );

    float farFadeStart = uMaxDistance * 0.82;
    const float MIN_TRANSMITTANCE = 0.025;

    for (int index = 0; index < VOLUME_STEPS; index++) {
        if (travel > uMaxDistance || transmittance < MIN_TRANSMITTANCE) break;

        vec3 samplePosition = rayOrigin + rayDirection * travel;

        float macroField;
        float detailField;
        float warmField;

        float density = evaluateNebula(samplePosition, flowOffset, macroField, detailField, warmField);

        float nearFade = smoothstep(0.20, 0.82, travel);
        float farFade = 1.0 - smoothstep(farFadeStart, uMaxDistance, travel);

        density *= nearFade * farFade;

        if (density > 0.002) {
            vec3 sampleColor = getNebulaColor(macroField, detailField, warmField);

            float distanceBrightness = 1.20 - 0.34 * smoothstep(0.0, uMaxDistance, travel);
            sampleColor *= distanceBrightness * centerIllumination;

            float alpha = 1.0 - exp2(-density * extinction);
            alpha = saturateF(alpha);

            accumulatedColor += transmittance * sampleColor * alpha;
            transmittance *= 1.0 - alpha;

            travel += baseStep;
        } else {
            travel += baseStep * 1.22;
        }
    }

    return vec4(accumulatedColor, transmittance);
}

void createCamera(
    vec2 screenPosition,
    float animationTime,
    out vec3 rayOrigin,
    out vec3 rayDirection
) {
    float cameraDepth = animationTime * uCameraSpeed;

    rayOrigin = vec3(tunnelPath(cameraDepth), cameraDepth);

    float lookAhead = 3.60;
    vec3 cameraTarget = vec3(tunnelPath(cameraDepth + lookAhead), cameraDepth + lookAhead);

    vec3 forward = normalize(cameraTarget - rayOrigin);
    vec3 right = normalize(cross(vec3(0.0, 1.0, 0.0), forward));
    vec3 up = normalize(cross(forward, right));

    float cameraRoll = 0.060 * sin(cameraDepth * 0.095);
    float rollSine = sin(cameraRoll);
    float rollCosine = cos(cameraRoll);

    vec3 originalRight = right;
    right = originalRight * rollCosine + up * rollSine;
    up = up * rollCosine - originalRight * rollSine;

    rayDirection = normalize(forward * uFocalLength + right * screenPosition.x + up * screenPosition.y);
}

void main() {
    vec2 fragmentCoordinate = gl_FragCoord.xy;

    vec2 screenPosition = (fragmentCoordinate * 2.0 - uResolution.xy) / max(uResolution.y, 1.0);

    vec3 rayOrigin;
    vec3 rayDirection;
    createCamera(screenPosition, uTime, rayOrigin, rayDirection);

    float screenRadius = length(screenPosition);
    float backgroundAmount = exp(-screenRadius * 0.95);
    vec3 background = mix(uColor1, uColor2, backgroundAmount);

    float centerIllumination = 1.0 + 0.32 * (1.0 - smoothstep(0.10, 0.78, screenRadius));

    vec4 volume = renderVolume(rayOrigin, rayDirection, fragmentCoordinate, uTime, centerIllumination);

    vec3 color = volume.rgb + background * volume.a;

    float depthHaze = exp(-screenRadius * 3.8);
    color += uColor2 * depthHaze * 0.18;

    float vignette = 1.0 - 0.28 * smoothstep(0.48, 1.46, screenRadius);
    color *= vignette;

    color = vec3(1.0) - exp(-color * uExposure);
    color = pow(max(color, vec3(0.0)), vec3(1.0 / 2.2));

    vec3 hsv = rgb2hsv(clamp(color, 0.0, 1.0));
    hsv.x = fract(hsv.x + uHue / 360.0);
    hsv.y = clamp(hsv.y * uSaturation, 0.0, 1.0);
    color = hsv2rgb(hsv);

    fragColor = vec4(color, 1.0);
}
`;

function CelestialJourneyShader({ config, globalConfig }: { config: GradientConfig['shaders']['celestialJourney'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl2');
        if (!gl) {
            console.error("WebGL2 not supported for Celestial Journey Shader");
            return;
        }

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Celestial Journey shader compile error:', gl.getShaderInfoLog(shader));
            }
            return shader;
        };

        const createProgram = (vsSrc: string, fsSrc: string) => {
            const program = gl.createProgram()!;
            gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSrc));
            gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSrc));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error('Celestial Journey program link error:', gl.getProgramInfoLog(program));
            }
            return program;
        };

        const sceneProgram = createProgram(celestialJourneyVertShader, celestialJourneyFragShader);
        const blitProgram = createProgram(celestialJourneyBlitVertShader, celestialJourneyBlitFragShader);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        const scenePosLoc = gl.getAttribLocation(sceneProgram, "a_position");
        const blitPosLoc = gl.getAttribLocation(blitProgram, "a_position");

        const lowResTexture = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        const lowResFbo = gl.createFramebuffer()!;
        gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, lowResTexture, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        const sceneUniforms = {
            uTime: gl.getUniformLocation(sceneProgram, 'uTime'),
            uResolution: gl.getUniformLocation(sceneProgram, 'uResolution'),
            uCameraSpeed: gl.getUniformLocation(sceneProgram, 'uCameraSpeed'),
            uFocalLength: gl.getUniformLocation(sceneProgram, 'uFocalLength'),
            uMaxDistance: gl.getUniformLocation(sceneProgram, 'uMaxDistance'),
            uTunnelRadius: gl.getUniformLocation(sceneProgram, 'uTunnelRadius'),
            uTunnelRoughness: gl.getUniformLocation(sceneProgram, 'uTunnelRoughness'),
            uVolumeDensity: gl.getUniformLocation(sceneProgram, 'uVolumeDensity'),
            uGlowStrength: gl.getUniformLocation(sceneProgram, 'uGlowStrength'),
            uExposure: gl.getUniformLocation(sceneProgram, 'uExposure'),
            uColor1: gl.getUniformLocation(sceneProgram, 'uColor1'),
            uColor2: gl.getUniformLocation(sceneProgram, 'uColor2'),
            uColor3: gl.getUniformLocation(sceneProgram, 'uColor3'),
            uColor4: gl.getUniformLocation(sceneProgram, 'uColor4'),
            uColor5: gl.getUniformLocation(sceneProgram, 'uColor5'),
            uColor6: gl.getUniformLocation(sceneProgram, 'uColor6'),
            uColor7: gl.getUniformLocation(sceneProgram, 'uColor7'),
            uHue: gl.getUniformLocation(sceneProgram, 'uHue'),
            uSaturation: gl.getUniformLocation(sceneProgram, 'uSaturation'),
        };
        const blitUniforms = {
            uTexture: gl.getUniformLocation(blitProgram, 'uTexture'),
        };

        let startTime = Date.now();
        let animationFrameId: number;

        const render = (time: number) => {
            const rect = canvas.getBoundingClientRect();
            const fullWidth = Math.max(1, Math.floor(rect.width));
            const fullHeight = Math.max(1, Math.floor(rect.height));
            if (canvas.width !== fullWidth || canvas.height !== fullHeight) {
                canvas.width = fullWidth;
                canvas.height = fullHeight;
            }

            const renderScale = Math.max(0.1, Math.min(1.0, config.renderScale ?? 0.5));
            const renderWidth = Math.max(1, Math.floor(fullWidth * renderScale));
            const renderHeight = Math.max(1, Math.floor(fullHeight * renderScale));

            gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, renderWidth, renderHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
            gl.viewport(0, 0, renderWidth, renderHeight);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(sceneProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(scenePosLoc);
            gl.vertexAttribPointer(scenePosLoc, 2, gl.FLOAT, false, 0, 0);

            gl.uniform1f(sceneUniforms.uTime, time);
            gl.uniform2f(sceneUniforms.uResolution, renderWidth, renderHeight);
            gl.uniform1f(sceneUniforms.uCameraSpeed, config.cameraSpeed);
            gl.uniform1f(sceneUniforms.uFocalLength, config.focalLength);
            gl.uniform1f(sceneUniforms.uMaxDistance, config.maxDistance);
            gl.uniform1f(sceneUniforms.uTunnelRadius, config.tunnelRadius);
            gl.uniform1f(sceneUniforms.uTunnelRoughness, config.tunnelRoughness);
            gl.uniform1f(sceneUniforms.uVolumeDensity, config.volumeDensity);
            gl.uniform1f(sceneUniforms.uGlowStrength, config.glowStrength);
            gl.uniform1f(sceneUniforms.uExposure, config.exposure);
            gl.uniform1f(sceneUniforms.uHue, config.hue ?? 0.0);
            gl.uniform1f(sceneUniforms.uSaturation, config.saturation ?? 1.0);

            const color1 = hexToRgbaVec(config.color1);
            gl.uniform3f(sceneUniforms.uColor1, color1[0], color1[1], color1[2]);
            const color2 = hexToRgbaVec(config.color2);
            gl.uniform3f(sceneUniforms.uColor2, color2[0], color2[1], color2[2]);
            const color3 = hexToRgbaVec(config.color3);
            gl.uniform3f(sceneUniforms.uColor3, color3[0], color3[1], color3[2]);
            const color4 = hexToRgbaVec(config.color4);
            gl.uniform3f(sceneUniforms.uColor4, color4[0], color4[1], color4[2]);
            const color5 = hexToRgbaVec(config.color5);
            gl.uniform3f(sceneUniforms.uColor5, color5[0], color5[1], color5[2]);
            const color6 = hexToRgbaVec(config.color6);
            gl.uniform3f(sceneUniforms.uColor6, color6[0], color6[1], color6[2]);
            const color7 = hexToRgbaVec(config.color7);
            gl.uniform3f(sceneUniforms.uColor7, color7[0], color7[1], color7[2]);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, fullWidth, fullHeight);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(blitProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(blitPosLoc);
            gl.vertexAttribPointer(blitPosLoc, 2, gl.FLOAT, false, 0, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
            gl.uniform1i(blitUniforms.uTexture, 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        const renderLoop = () => {
            const time = globalConfig.paused ? (globalConfig.motion / 100) * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();
        return () => {
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(sceneProgram);
            gl.deleteProgram(blitProgram);
            gl.deleteBuffer(positionBuffer);
            gl.deleteTexture(lowResTexture);
            gl.deleteFramebuffer(lowResFbo);
        };
    }, [config, globalConfig.paused, globalConfig.motion]);

    return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />;
}

const discoHiveBlitVertShader = `#version 300 es
in vec2 a_position;
out vec2 vUV;
void main() {
  vUV = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const discoHiveBlitFragShader = `#version 300 es
precision highp float;
uniform sampler2D uTexture;
in vec2 vUV;
out vec4 fragColor;
void main() {
  fragColor = texture(uTexture, vUV);
}
`;

const discoHiveVertShader = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const discoHiveFragShader = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;

uniform float uSpeed;
uniform float uColorFlowSpeed;
uniform float uCamSpeed;
uniform float uFov;
uniform float uRollAmount;
uniform float uRollSpeed;
uniform float uPathAmpX;
uniform float uPathFreqX;
uniform float uPathAmpY;
uniform float uPathFreqY;
uniform float uTunnelRadius;
uniform float uHexesAround;
uniform float uHexBorder;
uniform float uHexDotSize;
uniform float uFogDensity;
uniform float uVignetteStrength;

uniform vec4 uColors[4];

uniform float uHue;
uniform float uSaturation;

out vec4 fragColor;

#define PI 3.1415926535

float dhTime;

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

// Hardcoded palette sampler for 4 colors (uColorCount removed)
vec3 paletteColor(float t) {
    float m = clamp(t, 0.0, 1.0) * 3.0; // 4 colors means 3 gradient intervals (0 to 3)
    vec4 grad = uColors[0];
    grad.rgb *= grad.a;
    for (int i = 1; i < 4; i++) {
        float mm = clamp(m - float(i - 1), 0.0, 1.0);
        mm = smoothstep(0.1, 0.9, mm);
        vec4 c = uColors[i];
        c.rgb *= c.a;
        grad = mix(grad, c, mm);
    }
    return grad.rgb;
}

vec3 discoColors(vec2 p) {
    p += vec2(dhTime * uColorFlowSpeed);

    float l = pow(0.5 + 0.5 * cos(p.x * PI * 2.0 + cos(p.y) * 8.0) * sin(p.y * 2.0), 4.0) * 2.0;
    vec3 c = pow(
        l * (
            paletteColor(0.5 + 0.5 * cos(p.x * PI * 12.0 + sin(p.y * 10.0) * 3.0)) +
            paletteColor(0.5 + 0.5 * cos(p.x * PI * 6.0 + sin(p.y * 3.0) * 3.0))
        ),
        vec3(1.2)
    ) * 0.7;

    vec3 highlight = paletteColor(0.95);
    c += highlight * pow(0.5 + 0.5 * cos(p.x * PI * 6.0) * sin(p.y * 12.0), 20.0) * 2.0;

    vec3 tint = paletteColor(0.05);
    c += vec3(0.1, 0.5 + 0.5 * cos(p * PI * 6.0)) * tint * 0.7;

    return c;
}

vec4 hexCoords(vec2 uv) {
    vec2 r = vec2(1.0, 1.7320508);
    vec2 h = r * 0.5;

    vec2 a = mod(uv, r) - h;
    vec2 b = mod(uv - h, r) - h;

    vec2 gv = dot(a, a) < dot(b, b) ? a : b;
    vec2 id = uv - gv;

    return vec4(gv.x, gv.y, id.x, id.y);
}

vec3 hexTex(vec2 p, float border) {
    vec4 hc = hexCoords(p);
    vec2 gv = hc.xy;
    vec2 id = hc.zw * 0.125;

    float d = max(abs(gv.x), dot(abs(gv), vec2(0.5, 0.8660254)));

    float sm = 0.03;
    float m = 1.0 - smoothstep(border - sm, border, d);
    m += 1.0 - smoothstep(0.0, uHexDotSize, length(gv));

    return m * discoColors(id);
}

vec2 tunnelPath(float z) {
    return vec2(
        sin(z * uPathFreqX) * uPathAmpX,
        cos(z * uPathFreqY) * uPathAmpY
    );
}

float sceneMap(vec3 p) {
    return uTunnelRadius - length(p.xy - tunnelPath(p.z));
}

void main() {
    dhTime = uTime * uSpeed + 1.0;

    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;

    float camZ = dhTime * uCamSpeed;

    vec3 ro = vec3(tunnelPath(camZ), camZ);
    vec3 ta = vec3(tunnelPath(camZ + 3.0), camZ + 3.0);

    vec3 fwd = normalize(ta - ro);
    vec3 right = normalize(cross(fwd, vec3(0.0, 1.0, 0.0)));
    vec3 up = cross(right, fwd);

    float roll = sin(dhTime * uRollSpeed) * uRollAmount;
    mat2 rollRot = mat2(cos(roll), -sin(roll), sin(roll), cos(roll));
    uv *= rollRot;

    vec3 rd = normalize(uv.x * right + uv.y * up + uFov * fwd);

    float t = 0.0;
    for (int i = 0; i < 80; i++) {
        vec3 p = ro + rd * t;
        float d = sceneMap(p);
        if (d < 0.01 || t > 100.0) break;
        t += d * 0.7;
    }

    vec3 col = vec3(0.0);

    if (t < 100.0) {
        vec3 p = ro + rd * t;
        vec2 tunObj = p.xy - tunnelPath(p.z);
        float a = atan(tunObj.y, tunObj.x);

        float hexesAround = max(uHexesAround, 2.0);
        float xuv = (a / PI) * (hexesAround * 0.5);
        float yuv = p.z * (hexesAround / (uTunnelRadius * 2.0 * PI));

        vec2 tUv = vec2(xuv, yuv);

        col = hexTex(tUv, uHexBorder);

        float fog = exp(-uFogDensity * t * t);
        col *= fog;

        col *= 1.3;
    }

    vec2 q = gl_FragCoord.xy / uResolution.xy;
    col *= mix(1.0, 0.5 + 0.5 * pow(16.0 * q.x * q.y * (1.0 - q.x) * (1.0 - q.y), 0.1), uVignetteStrength);

    vec3 hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv.x = fract(hsv.x + uHue / 360.0);
    hsv.y = clamp(hsv.y * uSaturation, 0.0, 1.0);
    col = hsv2rgb(hsv);

    fragColor = vec4(col, 1.0);
}
`;

export function DiscoHiveShader({ config, globalConfig }: { config: GradientConfig['shaders']['discoHive'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl2');
        if (!gl) {
            console.error("WebGL2 not supported for Disco Hive Shader");
            return;
        }

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Disco Hive shader compile error:', gl.getShaderInfoLog(shader));
            }
            return shader;
        };

        const createProgram = (vsSrc: string, fsSrc: string) => {
            const program = gl.createProgram()!;
            gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSrc));
            gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSrc));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error('Disco Hive program link error:', gl.getProgramInfoLog(program));
            }
            return program;
        };

        const sceneProgram = createProgram(discoHiveVertShader, discoHiveFragShader);
        const blitProgram = createProgram(discoHiveBlitVertShader, discoHiveBlitFragShader);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        const scenePosLoc = gl.getAttribLocation(sceneProgram, "a_position");
        const blitPosLoc = gl.getAttribLocation(blitProgram, "a_position");

        const lowResTexture = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        const lowResFbo = gl.createFramebuffer()!;
        gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, lowResTexture, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        const sceneUniforms = {
            uTime: gl.getUniformLocation(sceneProgram, 'uTime'),
            uResolution: gl.getUniformLocation(sceneProgram, 'uResolution'),
            uSpeed: gl.getUniformLocation(sceneProgram, 'uSpeed'),
            uColorFlowSpeed: gl.getUniformLocation(sceneProgram, 'uColorFlowSpeed'),
            uCamSpeed: gl.getUniformLocation(sceneProgram, 'uCamSpeed'),
            uFov: gl.getUniformLocation(sceneProgram, 'uFov'),
            uRollAmount: gl.getUniformLocation(sceneProgram, 'uRollAmount'),
            uRollSpeed: gl.getUniformLocation(sceneProgram, 'uRollSpeed'),
            uPathAmpX: gl.getUniformLocation(sceneProgram, 'uPathAmpX'),
            uPathFreqX: gl.getUniformLocation(sceneProgram, 'uPathFreqX'),
            uPathAmpY: gl.getUniformLocation(sceneProgram, 'uPathAmpY'),
            uPathFreqY: gl.getUniformLocation(sceneProgram, 'uPathFreqY'),
            uTunnelRadius: gl.getUniformLocation(sceneProgram, 'uTunnelRadius'),
            uHexesAround: gl.getUniformLocation(sceneProgram, 'uHexesAround'),
            uHexBorder: gl.getUniformLocation(sceneProgram, 'uHexBorder'),
            uHexDotSize: gl.getUniformLocation(sceneProgram, 'uHexDotSize'),
            uFogDensity: gl.getUniformLocation(sceneProgram, 'uFogDensity'),
            uVignetteStrength: gl.getUniformLocation(sceneProgram, 'uVignetteStrength'),
            uHue: gl.getUniformLocation(sceneProgram, 'uHue'),
            uSaturation: gl.getUniformLocation(sceneProgram, 'uSaturation'),
        };
        const blitUniforms = {
            uTexture: gl.getUniformLocation(blitProgram, 'uTexture'),
        };

        let startTime = Date.now();
        let animationFrameId: number;

        const render = (time: number) => {
            const rect = canvas.getBoundingClientRect();
            const fullWidth = Math.max(1, Math.floor(rect.width));
            const fullHeight = Math.max(1, Math.floor(rect.height));
            if (canvas.width !== fullWidth || canvas.height !== fullHeight) {
                canvas.width = fullWidth;
                canvas.height = fullHeight;
            }

            const renderScale = Math.max(0.1, Math.min(1.0, config.renderScale ?? 0.6));
            const renderWidth = Math.max(1, Math.floor(fullWidth * renderScale));
            const renderHeight = Math.max(1, Math.floor(fullHeight * renderScale));

            gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, renderWidth, renderHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
            gl.viewport(0, 0, renderWidth, renderHeight);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(sceneProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(scenePosLoc);
            gl.vertexAttribPointer(scenePosLoc, 2, gl.FLOAT, false, 0, 0);

            gl.uniform1f(sceneUniforms.uTime, time);
            gl.uniform2f(sceneUniforms.uResolution, renderWidth, renderHeight);
            gl.uniform1f(sceneUniforms.uSpeed, config.speed);
            gl.uniform1f(sceneUniforms.uColorFlowSpeed, config.colorFlowSpeed);
            gl.uniform1f(sceneUniforms.uCamSpeed, config.camSpeed);
            gl.uniform1f(sceneUniforms.uFov, config.fov);
            gl.uniform1f(sceneUniforms.uRollAmount, config.rollAmount);
            gl.uniform1f(sceneUniforms.uRollSpeed, config.rollSpeed);
            gl.uniform1f(sceneUniforms.uPathAmpX, config.pathAmpX);
            gl.uniform1f(sceneUniforms.uPathFreqX, config.pathFreqX);
            gl.uniform1f(sceneUniforms.uPathAmpY, config.pathAmpY);
            gl.uniform1f(sceneUniforms.uPathFreqY, config.pathFreqY);
            gl.uniform1f(sceneUniforms.uTunnelRadius, config.tunnelRadius);
            gl.uniform1f(sceneUniforms.uHexesAround, config.hexesAround);
            gl.uniform1f(sceneUniforms.uHexBorder, config.hexBorder);
            gl.uniform1f(sceneUniforms.uHexDotSize, config.hexDotSize);
            gl.uniform1f(sceneUniforms.uFogDensity, config.fogDensity);
            gl.uniform1f(sceneUniforms.uVignetteStrength, config.vignetteStrength);
            gl.uniform1f(sceneUniforms.uHue, config.hue ?? 0.0);
            gl.uniform1f(sceneUniforms.uSaturation, config.saturation ?? 1.0);

            // Pass exactly 4 colors to the shader
            for (let index = 0; index < 4; index++) {
                const loc = gl.getUniformLocation(sceneProgram, `uColors[${index}]`);
                const color = config.colors[index] || "#000000";
                const rgba = hexToRgbaVec(color);
                gl.uniform4f(loc, rgba[0], rgba[1], rgba[2], rgba[3]);
            }

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, fullWidth, fullHeight);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(blitProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(blitPosLoc);
            gl.vertexAttribPointer(blitPosLoc, 2, gl.FLOAT, false, 0, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
            gl.uniform1i(blitUniforms.uTexture, 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        const renderLoop = () => {
            const time = globalConfig.paused ? (globalConfig.motion / 100) * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();
        return () => {
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(sceneProgram);
            gl.deleteProgram(blitProgram);
            gl.deleteBuffer(positionBuffer);
            gl.deleteTexture(lowResTexture);
            gl.deleteFramebuffer(lowResFbo);
        };
    }, [config, globalConfig.paused, globalConfig.motion]);

    return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />;
}

const discoHexnelBlitVertShader = `#version 300 es
in vec2 a_position;
out vec2 vUV;
void main() {
  vUV = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const discoHexnelBlitFragShader = `#version 300 es
precision highp float;
uniform sampler2D uTexture;
in vec2 vUV;
out vec4 fragColor;
void main() {
  fragColor = texture(uTexture, vUV);
}
`;

const discoHexnelVertShader = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const discoHexnelFragShader = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;

uniform float uSpeed;
uniform float uCameraSpeed;
uniform float uFov;
uniform float uMaxDistance;
uniform float uMaxSteps;

uniform float uTunnelRadius;
uniform float uTunnelPulseAmount;
uniform float uTunnelPulseSpeed;
uniform float uHexWrapCount;
uniform float uHexBevelAmount;
uniform float uRayCount;
uniform float uRaySpinSpeed;
uniform float uStrobeSpeed;
uniform float uCenterGlowSize;
uniform float uFogDensity;

uniform float uWhirlpoolScale;
uniform float uWhirlpoolArms;
uniform float uWhirlpoolRings;
uniform float uWhirlpoolTwistX;
uniform float uWhirlpoolTwistY;
uniform float uWhirlpoolFlowSpeedX;
uniform float uWhirlpoolFlowSpeedY;
uniform float uLiquidSwirlSpeed;
uniform float uLiquidRotSpeed;
uniform float uLiquidDetail;
uniform float uLiquidGlowRadius;
uniform float uLiquidGlowPulseAmount;

uniform float uPulseAFrequency;
uniform float uPulseBFrequency;

uniform vec4 uColors[10];
uniform float uColorCount;

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

// Every color the shader uses comes from this single adjustable array.
vec3 paletteColor(float t) {
    float m = clamp(fract(t), 0.0, 1.0) * uColorCount;
    vec4 grad = uColors[0];
    grad.rgb *= grad.a;
    for (int i = 1; i < 10; i++) {
        if (float(i) > uColorCount) break;
        float mm = clamp(m - float(i - 1), 0.0, 1.0);
        mm = smoothstep(0.0, 1.0, mm);
        vec4 c = uColors[i - 1];
        c.rgb *= c.a;
        grad = mix(grad, c, mm);
    }
    return grad.rgb;
}

float hash1(float n) { return fract(sin(n) * 437518.56453) + 0.1; }

vec2 rot2(vec2 v, float t) {
    float s = sin(t), c = cos(t);
    return mat2(c, -s, s, c) * v;
}

// ACES-ish tonemap used for the whirlpool liquid, ported verbatim.
vec3 acesApprox(vec3 c) {
    mat3 m1 = mat3(0.59719, 0.07600, 0.02840, 0.35458, 0.90834, 0.13383, 0.04823, 0.01566, 0.83777);
    mat3 m2 = mat3(1.60475, -0.10208, -0.00327, -0.53108, 1.10813, -0.07276, -0.07367, -0.00605, 1.07602);
    vec3 v = m1 * c;
    vec3 av = v * (v + 0.0245786) - 0.000090537;
    vec3 b = v * (0.983729 * v + 0.4329510) + 0.238081;
    return m2 * (av / b);
}

float dotNoise(vec3 p) {
    const float PHI = 1.618033988;
    const mat3 GOLD = mat3(
        -0.571464913, 0.814921382, 0.096597072,
        -0.278044873, -0.303026659, 0.911518454,
        0.772087367, 0.494042493, 0.399753815);
    return dot(cos(GOLD * p), sin(PHI * p * GOLD));
}

vec2 hexGrid(vec2 uv, out vec2 hexCenterId) {
    vec2 hexProp = vec2(1.0, 1.7320508);
    vec2 halfProp = hexProp * 0.5;
    vec2 gA = mod(uv, hexProp) - halfProp;
    vec2 gB = mod(uv - halfProp, hexProp) - halfProp;
    if (dot(gA, gA) < dot(gB, gB)) {
        hexCenterId = uv - gA;
        return gA;
    } else {
        hexCenterId = uv - gB;
        return gB;
    }
}

vec4 sceneMap(vec3 rp, float pulseA, float pulseB) {
    float cylR = length(rp.xy);
    float cylA = atan(rp.y, rp.x);

    float smoothTunnelOsc = sin(uTime * uTunnelPulseSpeed) * 0.5 + 0.5;
    float dynTunnelRadius = uTunnelRadius + (pulseB * uTunnelPulseAmount * smoothTunnelOsc);

    float wrapScale = uHexWrapCount / (2.0 * 3.14159265359 * uTunnelRadius);
    vec2 surfCoords = vec2(cylA * uTunnelRadius, rp.z) * wrapScale;

    vec2 hexCenterId;
    vec2 hexLocal = hexGrid(surfCoords, hexCenterId);

    float distToEdge = max(abs(hexLocal.x), dot(abs(hexLocal), vec2(0.5, 0.8660254)));
    float invEdgeDist = 0.5 - distToEdge;
    float bevelHeight = clamp(invEdgeDist * 3.0, 0.0, uHexBevelAmount);

    float uHexPopAmount = 0.0;
    float uHexPopSpeed = 0.0;

    float smoothBlockOsc = sin(uTime * uHexPopSpeed + hexCenterId.y * 0.8) * 0.5 + 0.5;
    float popIntensity = pulseA * uHexPopAmount * smoothBlockOsc;

    float extrusion = bevelHeight + popIntensity;
    float sd = (dynTunnelRadius - cylR) - extrusion;

    vec2 snappedId = floor(hexCenterId * 10.0 + 0.5) / 10.0;
    float wrapAngle = (snappedId.x / uHexWrapCount) * 6.28318530718;
    vec2 seamX = vec2(cos(wrapAngle), sin(wrapAngle));

    float cellSeed = seamX.x * 12.345 + seamX.y * 67.891 + snappedId.y * 45.678;
    float hueSeed = hash1(cellSeed);

    float angle = atan(hexLocal.y, hexLocal.x);
    float radius = length(hexLocal);

    float spinDir = (hash1(hueSeed) > 0.5) ? 1.0 : -1.0;
    float rayRot = uTime * uRaySpinSpeed * spinDir;
    float rays = max(0.0, sin(angle * uRayCount + rayRot));
    rays = pow(rays, 8.0);

    float strobe = sin(uTime * uStrobeSpeed + hueSeed * 6.2831) * 0.5 + 0.5;
    float centerGlow = smoothstep(uCenterGlowSize, 0.0, radius);
    float lightIntensity = (centerGlow * 0.6) + (rays * centerGlow * strobe * 4.0);

    vec3 baseColor = paletteColor(hueSeed);
    vec3 texColor = (baseColor * 0.2) + (baseColor * lightIntensity);

    sd *= 0.25;
    return vec4(sd, texColor);
}

vec3 renderWhirlpool(vec2 fragCoord, float pulseA, float pulseB) {
    float scale = uWhirlpoolScale;
    vec2 uv = ((fragCoord - 0.5 * uResolution.xy) / uResolution.y) * scale;

    float r = length(uv);
    float aAng = atan(uv.y, uv.x);

    vec2 st = vec2(
        (aAng / 6.28318530718) * uWhirlpoolArms + log(r) * uWhirlpoolTwistX,
        (aAng / 6.28318530718) * uWhirlpoolRings + log(r) * uWhirlpoolTwistY
    );

    vec2 stTiles = st + uTime * vec2(uWhirlpoolFlowSpeedX, uWhirlpoolFlowSpeedY);
    vec2 grid = fract(stTiles);
    vec2 center = grid - 0.5;

    float dist = max(abs(center.x), abs(center.y)) * 2.0;
    float mask = smoothstep(0.98, 0.85, dist);

    vec3 normal = normalize(vec3(center.x * 2.5, center.y * 2.5, 1.0 - pow(dist, 3.0)));

    float colorProgression = (st.x / max(uWhirlpoolArms, 0.001)) + uTime * 0.05;
    vec3 armColor = paletteColor(colorProgression);

    vec3 baseColor = mix(vec3(1.0, 0.8, 0.2), armColor, smoothstep(0.02, 0.3, r));

    vec2 liquidUvScreen = fragCoord + normal.xy * (30.0 / scale);
    vec2 luv = ((liquidUvScreen - 0.5 * uResolution.xy) / uResolution.y) * scale;

    float lr = length(luv);
    float la = atan(luv.y, luv.x);
    la -= log(lr) * 2.0 + uTime * (uLiquidRotSpeed + pulseB * 0.2);
    vec2 swirledUv = lr * vec2(cos(la), sin(la));

    float t = uTime + pulseA * 0.5;
    vec3 p = vec3(0.0), l = vec3(0.0), b, d;
    p.z = -1.0 - 0.5 * sin(t * 0.1);
    d = normalize(vec3(swirledUv * 2.0, 1.0));

    float s = 0.0;
    float iStep = 0.0;

    for (int j = 0; j < 16; j++) {
        if (float(j) >= uLiquidDetail) break;
        b = p;
        b.xy = rot2(sin(b.xy * 0.25), t * uLiquidSwirlSpeed * 0.25 + b.z * 2.0);
        s = 0.001 + abs(dotNoise(b * 20.0) / 20.0 - dotNoise(b)) * 0.7;
        s += abs(p.y * 0.2 + sin(p.z * 2.0 + (abs(p.x) * 0.5))) * 0.5;
        p += d * s;
        l += baseColor * (1.0 + 1.5 * sin(iStep + length(p.xy * 0.1) + pulseA * 3.0)) / s;
        iStep += 1.0;
    }

    vec3 liquidColor = acesApprox(l * l / 400.0);

    vec3 viewDir = vec3(0.0, 0.0, 1.0);
    float fresnel = pow(1.0 - max(dot(normal, viewDir), 0.0), 4.0);

    vec3 finalCol = liquidColor;
    finalCol += baseColor * fresnel * 1.5 * mask;
    finalCol = mix(vec3(0.01, 0.01, 0.02), finalCol, mask);
    finalCol *= smoothstep(0.0, 0.15, r);

    float glowRadius = uLiquidGlowRadius - (pulseA * uLiquidGlowPulseAmount);
    finalCol += vec3(1.0, 0.8, 0.2) * exp(-r * glowRadius) * (2.0 + pulseA * 2.0);

    return finalCol;
}

vec4 raymarch(vec3 ro, vec3 rd, float pulseA, float pulseB) {
    vec4 result = vec4(-1.0);
    float dist = 0.1;
    int maxSteps = int(uMaxSteps);

    for (int i = 0; i < 220; i++) {
        if (i >= maxSteps || dist >= uMaxDistance) break;
        vec3 rp = ro + rd * dist;
        vec4 info = sceneMap(rp, pulseA, pulseB);
        if (abs(info.x) < 0.001 * dist) {
            result = vec4(dist, info.yzw);
            break;
        }
        dist += info.x;
    }
    return result;
}

vec3 surfaceNormal(vec3 p, float pulseA, float pulseB) {
    vec3 n = vec3(0.0);
    for (int i = 0; i < 4; i++) {
        vec3 e = 0.5773 * (2.0 * vec3(
            float(((i + 3) >> 1) & 1),
            float((i >> 1) & 1),
            float((i & 1) & 1)
        ) - 1.0);
        n += e * sceneMap(p + 0.0025 * e, pulseA, pulseB).x;
    }
    return normalize(n);
}

mat3 camMatrix(vec3 ro, vec3 ta) {
    vec3 fw = normalize(ta - ro);
    vec3 up = vec3(0.0, 1.0, 0.0);
    vec3 right = normalize(cross(fw, up));
    vec3 trueUp = cross(right, fw);
    return mat3(right, trueUp, fw);
}

void main() {
    float t = uTime * uSpeed;

    float pulseA = 0.5 + 0.5 * sin(t * uPulseAFrequency);
    float pulseB = 0.5 + 0.5 * cos(t * uPulseBFrequency);

    vec2 fragCoord = gl_FragCoord.xy;

    float camZ = t * uCameraSpeed;
    vec3 ro = vec3(0.0, 0.0, camZ);
    vec3 ta = ro + vec3(0.0, 0.0, 1.0);

    mat3 cm = camMatrix(ro, ta);

    vec2 nuv = (2.0 * fragCoord - uResolution.xy) / uResolution.y;
    vec3 rd = cm * normalize(vec3(nuv, uFov));

    vec4 hit = raymarch(ro, rd, pulseA, pulseB);
    float distTravelled = hit.x;

    vec3 col;
    vec3 bgFog = vec3(0.0, 0.0, 0.01);

    if (distTravelled > 0.0 && distTravelled < uMaxDistance - 0.1) {
        vec3 hitPos = ro + distTravelled * rd;
        vec3 n = surfaceNormal(hitPos, pulseA, pulseB);
        vec3 viewDir = -rd;

        vec3 surfColor = hit.yzw;
        float fres = pow(clamp(1.0 - dot(n, viewDir), 0.0, 1.0), 3.0);

        vec3 lightDir = normalize(vec3(0.0, 0.0, 1.0));
        vec3 halfV = normalize(lightDir + viewDir);
        float spec = pow(clamp(dot(n, halfV), 0.0, 1.0), 128.0) * 2.0;

        vec3 tunnelColor = surfColor + (surfColor * fres * 0.8) + vec3(spec);

        float fog = 1.0 - exp(-uFogDensity * distTravelled * distTravelled * distTravelled);
        col = mix(tunnelColor, bgFog, fog);
    } else {
        col = renderWhirlpool(fragCoord, pulseA, pulseB);
    }

    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(0.4545));

    vec3 hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv.x = fract(hsv.x + uHue / 360.0);
    hsv.y = clamp(hsv.y * uSaturation, 0.0, 1.0);
    col = hsv2rgb(hsv);

    fragColor = vec4(col, 1.0);
}
`;

export function DiscoHexnelShader({ config, globalConfig }: { config: GradientConfig['shaders']['discoHexnel'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl2');
        if (!gl) {
            console.error("WebGL2 not supported for Disco Hexnel Shader");
            return;
        }

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Disco Hexnel shader compile error:', gl.getShaderInfoLog(shader));
            }
            return shader;
        };

        const createProgram = (vsSrc: string, fsSrc: string) => {
            const program = gl.createProgram()!;
            gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSrc));
            gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSrc));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error('Disco Hexnel program link error:', gl.getProgramInfoLog(program));
            }
            return program;
        };

        const sceneProgram = createProgram(discoHexnelVertShader, discoHexnelFragShader);
        const blitProgram = createProgram(discoHexnelBlitVertShader, discoHexnelBlitFragShader);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        const scenePosLoc = gl.getAttribLocation(sceneProgram, "a_position");
        const blitPosLoc = gl.getAttribLocation(blitProgram, "a_position");

        const lowResTexture = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        const lowResFbo = gl.createFramebuffer()!;
        gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, lowResTexture, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        const sceneUniforms = {
            uTime: gl.getUniformLocation(sceneProgram, 'uTime'),
            uResolution: gl.getUniformLocation(sceneProgram, 'uResolution'),
            uSpeed: gl.getUniformLocation(sceneProgram, 'uSpeed'),
            uCameraSpeed: gl.getUniformLocation(sceneProgram, 'uCameraSpeed'),
            uFov: gl.getUniformLocation(sceneProgram, 'uFov'),
            uMaxDistance: gl.getUniformLocation(sceneProgram, 'uMaxDistance'),
            uMaxSteps: gl.getUniformLocation(sceneProgram, 'uMaxSteps'),
            uTunnelRadius: gl.getUniformLocation(sceneProgram, 'uTunnelRadius'),
            uTunnelPulseAmount: gl.getUniformLocation(sceneProgram, 'uTunnelPulseAmount'),
            uTunnelPulseSpeed: gl.getUniformLocation(sceneProgram, 'uTunnelPulseSpeed'),
            uHexWrapCount: gl.getUniformLocation(sceneProgram, 'uHexWrapCount'),
            uHexBevelAmount: gl.getUniformLocation(sceneProgram, 'uHexBevelAmount'),
            uRayCount: gl.getUniformLocation(sceneProgram, 'uRayCount'),
            uRaySpinSpeed: gl.getUniformLocation(sceneProgram, 'uRaySpinSpeed'),
            uStrobeSpeed: gl.getUniformLocation(sceneProgram, 'uStrobeSpeed'),
            uCenterGlowSize: gl.getUniformLocation(sceneProgram, 'uCenterGlowSize'),
            uFogDensity: gl.getUniformLocation(sceneProgram, 'uFogDensity'),
            uWhirlpoolScale: gl.getUniformLocation(sceneProgram, 'uWhirlpoolScale'),
            uWhirlpoolArms: gl.getUniformLocation(sceneProgram, 'uWhirlpoolArms'),
            uWhirlpoolRings: gl.getUniformLocation(sceneProgram, 'uWhirlpoolRings'),
            uWhirlpoolTwistX: gl.getUniformLocation(sceneProgram, 'uWhirlpoolTwistX'),
            uWhirlpoolTwistY: gl.getUniformLocation(sceneProgram, 'uWhirlpoolTwistY'),
            uWhirlpoolFlowSpeedX: gl.getUniformLocation(sceneProgram, 'uWhirlpoolFlowSpeedX'),
            uWhirlpoolFlowSpeedY: gl.getUniformLocation(sceneProgram, 'uWhirlpoolFlowSpeedY'),
            uLiquidSwirlSpeed: gl.getUniformLocation(sceneProgram, 'uLiquidSwirlSpeed'),
            uLiquidRotSpeed: gl.getUniformLocation(sceneProgram, 'uLiquidRotSpeed'),
            uLiquidDetail: gl.getUniformLocation(sceneProgram, 'uLiquidDetail'),
            uLiquidGlowRadius: gl.getUniformLocation(sceneProgram, 'uLiquidGlowRadius'),
            uLiquidGlowPulseAmount: gl.getUniformLocation(sceneProgram, 'uLiquidGlowPulseAmount'),
            uPulseAFrequency: gl.getUniformLocation(sceneProgram, 'uPulseAFrequency'),
            uPulseBFrequency: gl.getUniformLocation(sceneProgram, 'uPulseBFrequency'),
            uColorCount: gl.getUniformLocation(sceneProgram, 'uColorCount'),
            uHue: gl.getUniformLocation(sceneProgram, 'uHue'),
            uSaturation: gl.getUniformLocation(sceneProgram, 'uSaturation'),
        };
        const blitUniforms = { uTexture: gl.getUniformLocation(blitProgram, 'uTexture') };

        let startTime = Date.now();
        let animationFrameId: number;

        const render = (time: number) => {
            const rect = canvas.getBoundingClientRect();
            const fullWidth = Math.max(1, Math.floor(rect.width));
            const fullHeight = Math.max(1, Math.floor(rect.height));
            if (canvas.width !== fullWidth || canvas.height !== fullHeight) {
                canvas.width = fullWidth;
                canvas.height = fullHeight;
            }

            const renderScale = Math.max(0.1, Math.min(1.0, config.renderScale ?? 0.5));
            const renderWidth = Math.max(1, Math.floor(fullWidth * renderScale));
            const renderHeight = Math.max(1, Math.floor(fullHeight * renderScale));

            gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, renderWidth, renderHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
            gl.viewport(0, 0, renderWidth, renderHeight);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(sceneProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(scenePosLoc);
            gl.vertexAttribPointer(scenePosLoc, 2, gl.FLOAT, false, 0, 0);

            gl.uniform1f(sceneUniforms.uTime, time);
            gl.uniform2f(sceneUniforms.uResolution, renderWidth, renderHeight);
            gl.uniform1f(sceneUniforms.uSpeed, config.speed);
            gl.uniform1f(sceneUniforms.uCameraSpeed, config.cameraSpeed);
            gl.uniform1f(sceneUniforms.uFov, config.fov);
            gl.uniform1f(sceneUniforms.uMaxDistance, config.maxDistance);
            gl.uniform1f(sceneUniforms.uMaxSteps, config.maxSteps);
            gl.uniform1f(sceneUniforms.uTunnelRadius, config.tunnelRadius);
            gl.uniform1f(sceneUniforms.uTunnelPulseAmount, config.tunnelPulseAmount);
            gl.uniform1f(sceneUniforms.uTunnelPulseSpeed, config.tunnelPulseSpeed);
            gl.uniform1f(sceneUniforms.uHexWrapCount, config.hexWrapCount);
            gl.uniform1f(sceneUniforms.uHexBevelAmount, config.hexBevelAmount);
            gl.uniform1f(sceneUniforms.uRayCount, config.rayCount);
            gl.uniform1f(sceneUniforms.uRaySpinSpeed, config.raySpinSpeed);
            gl.uniform1f(sceneUniforms.uStrobeSpeed, config.strobeSpeed);
            gl.uniform1f(sceneUniforms.uCenterGlowSize, config.centerGlowSize);
            gl.uniform1f(sceneUniforms.uFogDensity, config.fogDensity);
            gl.uniform1f(sceneUniforms.uWhirlpoolScale, config.whirlpoolScale);
            gl.uniform1f(sceneUniforms.uWhirlpoolArms, config.whirlpoolArms);
            gl.uniform1f(sceneUniforms.uWhirlpoolRings, config.whirlpoolRings);
            gl.uniform1f(sceneUniforms.uWhirlpoolTwistX, config.whirlpoolTwistX);
            gl.uniform1f(sceneUniforms.uWhirlpoolTwistY, config.whirlpoolTwistY);
            gl.uniform1f(sceneUniforms.uWhirlpoolFlowSpeedX, config.whirlpoolFlowSpeedX);
            gl.uniform1f(sceneUniforms.uWhirlpoolFlowSpeedY, config.whirlpoolFlowSpeedY);
            gl.uniform1f(sceneUniforms.uLiquidSwirlSpeed, config.liquidSwirlSpeed);
            gl.uniform1f(sceneUniforms.uLiquidRotSpeed, config.liquidRotSpeed);
            gl.uniform1f(sceneUniforms.uLiquidDetail, config.liquidDetail);
            gl.uniform1f(sceneUniforms.uLiquidGlowRadius, config.liquidGlowRadius);
            gl.uniform1f(sceneUniforms.uLiquidGlowPulseAmount, config.liquidGlowPulseAmount);
            gl.uniform1f(sceneUniforms.uPulseAFrequency, config.pulseAFrequency);
            gl.uniform1f(sceneUniforms.uPulseBFrequency, config.pulseBFrequency);
            gl.uniform1f(sceneUniforms.uHue, config.hue ?? 0.0);
            gl.uniform1f(sceneUniforms.uSaturation, config.saturation ?? 1.0);

            config.colors.forEach((color, index) => {
                if (index >= 10) return;
                const loc = gl.getUniformLocation(sceneProgram, `uColors[${index}]`);
                const rgba = hexToRgbaVec(color);
                gl.uniform4f(loc, rgba[0], rgba[1], rgba[2], rgba[3]);
            });
            gl.uniform1f(sceneUniforms.uColorCount, config.colorCount);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, fullWidth, fullHeight);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(blitProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(blitPosLoc);
            gl.vertexAttribPointer(blitPosLoc, 2, gl.FLOAT, false, 0, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
            gl.uniform1i(blitUniforms.uTexture, 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        const renderLoop = () => {
            const time = globalConfig.paused ? (globalConfig.motion / 100) * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();
        return () => {
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(sceneProgram);
            gl.deleteProgram(blitProgram);
            gl.deleteBuffer(positionBuffer);
            gl.deleteTexture(lowResTexture);
            gl.deleteFramebuffer(lowResFbo);
        };
    }, [config, globalConfig.paused, globalConfig.motion]);

    return <canvas ref={canvasRef} className="w-full h-full absolute inset-0 block" />;
}

const kaleidoscopeWheelsBlitVertShader = `#version 300 es
in vec2 a_position;
out vec2 vUV;
void main() {
  vUV = a_position * 0.5 + 0.5;
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const kaleidoscopeWheelsBlitFragShader = `#version 300 es
precision highp float;
uniform sampler2D uTexture;
in vec2 vUV;
out vec4 fragColor;
void main() {
  fragColor = texture(uTexture, vUV);
}
`;

const kaleidoscopeWheelsVertShader = `#version 300 es
in vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}
`;

const kaleidoscopeWheelsFragShader = `#version 300 es
precision highp float;

uniform vec2 uResolution;
uniform float uTime;

uniform float uSpeed;
uniform float uPathAmplitude;
uniform float uPathTwistFrequency;
uniform float uPathSecondaryFrequency;
uniform float uPathTertiaryFrequency;
uniform float uPathQuaternaryFrequency;
uniform float uPathDriftSpeed;

uniform float uSegmentsMin;
uniform float uSegmentsMax;
uniform float uSegmentsSpeed;
uniform float uKaleidoscopeSoftness;

uniform float uPlaneRotationSpeed;
uniform float uPlaneRotationAmplitude;
uniform float uInternalSpinSpeed;

uniform float uZoomMin;
uniform float uZoomMax;

uniform float uTruchetRadiusMin;
uniform float uTruchetRadiusMax;
uniform float uTruchetRadiusFrequency;
uniform float uLineWidth;

uniform float uPlaneSpacing;
uniform float uPlaneCount;

uniform float uColorDistanceScale;
uniform float uColorTimeSpeed;
uniform float uColorPlaneScale;
uniform float uWaveSpeed;
uniform float uWaveFrequency;

uniform float uFovBase;
uniform float uFovVariation;

uniform float uPulseColorSpeed;
uniform float uPulseColorPower;
uniform float uContrastAmount;
uniform float uVignetteStrength;

uniform vec4 uColors[10];
uniform float uColorCount;

uniform float uHue;
uniform float uSaturation;

out vec4 fragColor;

#define PI 3.141592654
#define TAU (2.0 * PI)

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

// Every color the shader uses (fill AND the depth-fade "pulse" color)
// draws from this single adjustable array.
vec3 paletteColor(float t) {
    float m = clamp(fract(t), 0.0, 1.0) * uColorCount;
    vec4 grad = uColors[0];
    grad.rgb *= grad.a;
    for (int i = 1; i < 10; i++) {
        if (float(i) > uColorCount) break;
        float mm = clamp(m - float(i - 1), 0.0, 1.0);
        mm = smoothstep(0.0, 1.0, mm);
        vec4 c = uColors[i - 1];
        c.rgb *= c.a;
        grad = mix(grad, c, mm);
    }
    return grad.rgb;
}

mat2 rotate2D(float a) {
    float c = cos(a), s = sin(a);
    return mat2(c, s, -s, c);
}

float hash11(float p) { return fract(sin(p * 12.9898) * 13758.5453); }
float hash21(vec2 p) { return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123); }

float smoothMax(float a, float b, float k) {
    float h = clamp(0.5 + 0.5 * (a - b) / k, 0.0, 1.0);
    return mix(b, a, h) + k * h * (1.0 - h);
}
float smoothAbs(float a, float k) { return smoothMax(a, -a, k); }

vec4 blendColors(vec4 front, vec4 back) {
    float weight = front.w + back.w * (1.0 - front.w);
    vec3 rgb = (front.xyz * front.w + back.xyz * back.w * (1.0 - front.w)) / weight;
    return weight > 0.0 ? vec4(rgb, weight) : vec4(0.0);
}

float applyKaleidoscope(inout vec2 uv, float smoothFactor, float segments) {
    float angle = atan(uv.y, uv.x);
    float radius = length(uv);
    float segAngle = TAU / segments;

    float halfSeg = segAngle * 0.5;
    float cellId = floor((angle + halfSeg) / segAngle);
    angle = mod(angle + halfSeg, segAngle) - halfSeg;
    angle *= mod(cellId, 2.0) * 2.0 - 1.0;

    float smoothAngle = PI / segments - smoothAbs(PI / segments - abs(angle), smoothFactor);
    angle = sign(angle) * smoothAngle;

    uv = radius * vec2(cos(angle), sin(angle));
    return cellId;
}

vec3 cameraPath(float z) {
    float shift = z * uPathTwistFrequency;
    vec2 xy = -uPathAmplitude * (
        vec2(cos(shift), sin(shift * uPathSecondaryFrequency)) +
        vec2(cos(shift * uPathTertiaryFrequency), sin(shift * uPathQuaternaryFrequency + uTime * uSpeed * uPathDriftSpeed))
    );
    return vec3(xy, z);
}

vec3 cameraDerivative(float z) {
    return 0.5 * (cameraPath(z + 0.1) - cameraPath(z - 0.1)) / 0.1;
}

vec2 truchetField(float radius, vec2 uv) {
    vec2 cellId = floor(uv + 0.5);
    vec2 localUv = fract(uv + 0.5) - 0.5;

    float randVal = hash21(cellId);
    vec2 absUv = abs(localUv) - 0.5;
    float circleDist = length(absUv);
    float lineDist = abs(circleDist - radius);

    float diag1 = abs(dot(normalize(vec2(1.0, 1.0)), localUv));
    float diag2 = abs(dot(normalize(vec2(1.0, -1.0)), localUv));

    float dist = min(circleDist, lineDist);
    if (randVal > 0.85) dist = min(dist, min(diag1, diag2));
    else if (randVal > 0.5) dist = min(dist, diag1);
    else if (randVal > 0.15) dist = min(dist, diag2);

    return vec2(dist, circleDist - radius);
}

vec4 renderDepthPlane(vec3 hitPos, vec3 pathOffset, float antiAlias, float planeId) {
    float h = hash11(planeId);
    float distToCam = length(hitPos);

    vec2 uv = (hitPos - pathOffset * vec3(1.0, 1.0, 0.0)).xy;

    uv *= rotate2D(sin(uTime * uSpeed * uPlaneRotationSpeed) * uPlaneRotationAmplitude);

    float segRange = uTime * uSpeed * uSegmentsSpeed + h * TAU;
    float segments = 2.0 * floor(mix(uSegmentsMin, uSegmentsMax, 0.5 + 0.5 * sin(segRange)) / 2.0 + 0.5);
    float smoothFactor = 0.05 * 20.0 * uKaleidoscopeSoftness / segments;

    applyKaleidoscope(uv, smoothFactor, segments);

    uv *= rotate2D(TAU * fract(1777.0 * h) + uTime * uSpeed * uInternalSpinSpeed);

    float zoom = mix(uZoomMin, uZoomMax, fract(3167.0 * h));
    uv /= zoom;
    uv += 0.5 + floor(fract(2087.0 * h) * 1000.0);

    float radius = mix(uTruchetRadiusMin, uTruchetRadiusMax, 0.5 + 0.5 * cos(uTruchetRadiusFrequency * planeId));
    vec2 truchetDist = truchetField(radius, uv);
    truchetDist *= zoom;

    float lineW = uLineWidth * zoom;
    float dist = truchetDist.x - lineW;

    vec3 psychColor = paletteColor(distToCam * uColorDistanceScale - uTime * uSpeed * uColorTimeSpeed + planeId * uColorPlaneScale);

    vec3 col = mix(psychColor, vec3(0.0), smoothstep(antiAlias, -antiAlias, dist));

    float wave = sin(PI * uWaveFrequency * dist + uTime * uSpeed * uWaveSpeed);
    col = mix(col, psychColor * 0.2, smoothstep(0.5, 1.0, wave));
    col = mix(col, vec3(0.0), step(truchetDist.y, 0.0));

    float alpha = smoothstep(antiAlias, -antiAlias, -truchetDist.y - 3.0 * lineW) *
                  mix(0.5, 1.0, smoothstep(antiAlias, -antiAlias, -truchetDist.y - lineW));

    return vec4(col, alpha);
}

vec3 renderScene(vec3 camForward, vec3 camRight, vec3 camUp, vec3 rayOrigin, vec2 uv) {
    float fov = uFovBase + uFovVariation * clamp(length(uv), -1.0, 1.0);
    vec3 rayDir = normalize(uv.x * camRight + uv.y * camUp + fov * camForward);

    vec2 uvOffset = uv + 1.0 / uResolution.xy;
    vec3 rayDirAA = normalize(uvOffset.x * camRight + uvOffset.y * camUp + fov * camForward);

    float startZ = floor(rayOrigin.z / uPlaneSpacing);
    vec4 accumColor = vec4(0.0);

    vec3 pulseColor = paletteColor(uTime * uSpeed * uPulseColorSpeed) * pow(max(dot(rayDir, vec3(0.0, 0.0, 1.0)), 0.0), uPulseColorPower);

    int maxPlanes = int(uPlaneCount);
    for (int i = 1; i <= 16; i++) {
        if (i > maxPlanes) break;
        float planeZ = uPlaneSpacing * startZ + uPlaneSpacing * float(i);
        float t = (planeZ - rayOrigin.z) / rayDir.z;

        if (t > 0.0 && accumColor.w < 0.95) {
            vec3 hitPos = rayOrigin + rayDir * t;
            vec3 hitPosAA = rayOrigin + rayDirAA * t;
            float antiAlias = 3.0 * length(hitPos - hitPosAA);
            vec3 pathOffset = cameraPath(hitPos.z);

            vec4 planeCol = renderDepthPlane(hitPos, pathOffset, antiAlias, startZ + float(i));

            float distZ = hitPos.z - rayOrigin.z;
            float fadeIn = smoothstep(uPlaneSpacing * uPlaneCount, uPlaneSpacing, distZ);
            float fadeOut = smoothstep(0.0, uPlaneSpacing * 0.1, distZ);

            planeCol.xyz = mix(pulseColor, planeCol.xyz, fadeIn);
            planeCol.w *= fadeOut;
            planeCol = clamp(planeCol, 0.0, 1.0);

            accumColor = blendColors(planeCol, accumColor);
        } else {
            break;
        }
    }

    return mix(pulseColor, accumColor.xyz, accumColor.w);
}

void main() {
    vec2 uv = (gl_FragCoord.xy - 0.5 * uResolution.xy) / uResolution.y;

    float timeScaled = uTime * uSpeed;
    vec3 rayOrigin = cameraPath(timeScaled);
    vec3 camForward = normalize(cameraDerivative(timeScaled));

    vec3 camDeriv2 = 0.125 * (cameraDerivative(timeScaled + 0.1) - cameraDerivative(timeScaled - 0.1)) / 0.1;
    vec3 camRight = normalize(cross(normalize(vec3(0.0, 1.0, 0.0) + camDeriv2), camForward));
    vec3 camUp = normalize(cross(camForward, camRight));

    vec3 col = renderScene(camForward, camRight, camUp, rayOrigin, uv);

    col = clamp(col, 0.0, 1.0);
    col = pow(col, vec3(1.0 / 2.2));
    col = mix(col, col * col * (3.0 - 2.0 * col), uContrastAmount);

    vec2 screenUv = gl_FragCoord.xy / uResolution.xy;
    col *= mix(1.0, 0.5 + 0.5 * pow(16.0 * screenUv.x * screenUv.y * (1.0 - screenUv.x) * (1.0 - screenUv.y), 0.3), uVignetteStrength);

    vec3 hsv = rgb2hsv(clamp(col, 0.0, 1.0));
    hsv.x = fract(hsv.x + uHue / 360.0);
    hsv.y = clamp(hsv.y * uSaturation, 0.0, 1.0);
    col = hsv2rgb(hsv);

    fragColor = vec4(col, 1.0);
}
`;

export function KaleidoscopeWheelsShader({ config, globalConfig }: { config: GradientConfig['shaders']['kaleidoscopeWheels'], globalConfig: GradientConfig }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const gl = canvas.getContext('webgl2');
        if (!gl) {
            console.error("WebGL2 not supported for Kaleidoscope Wheels Shader");
            return;
        }

        const createShader = (type: number, source: string) => {
            const shader = gl.createShader(type)!;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error('Kaleidoscope Wheels shader compile error:', gl.getShaderInfoLog(shader));
            }
            return shader;
        };

        const createProgram = (vsSrc: string, fsSrc: string) => {
            const program = gl.createProgram()!;
            gl.attachShader(program, createShader(gl.VERTEX_SHADER, vsSrc));
            gl.attachShader(program, createShader(gl.FRAGMENT_SHADER, fsSrc));
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error('Kaleidoscope Wheels program link error:', gl.getProgramInfoLog(program));
            }
            return program;
        };

        const sceneProgram = createProgram(kaleidoscopeWheelsVertShader, kaleidoscopeWheelsFragShader);
        const blitProgram = createProgram(kaleidoscopeWheelsBlitVertShader, kaleidoscopeWheelsBlitFragShader);

        const positionBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);

        const scenePosLoc = gl.getAttribLocation(sceneProgram, "a_position");
        const blitPosLoc = gl.getAttribLocation(blitProgram, "a_position");

        const lowResTexture = gl.createTexture()!;
        gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        const lowResFbo = gl.createFramebuffer()!;
        gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
        gl.framebufferTexture2D(gl.FRAMEBUFFER, gl.COLOR_ATTACHMENT0, gl.TEXTURE_2D, lowResTexture, 0);
        gl.bindFramebuffer(gl.FRAMEBUFFER, null);

        const sceneUniforms = {
            uTime: gl.getUniformLocation(sceneProgram, 'uTime'),
            uResolution: gl.getUniformLocation(sceneProgram, 'uResolution'),
            uSpeed: gl.getUniformLocation(sceneProgram, 'uSpeed'),
            uPathAmplitude: gl.getUniformLocation(sceneProgram, 'uPathAmplitude'),
            uPathTwistFrequency: gl.getUniformLocation(sceneProgram, 'uPathTwistFrequency'),
            uPathSecondaryFrequency: gl.getUniformLocation(sceneProgram, 'uPathSecondaryFrequency'),
            uPathTertiaryFrequency: gl.getUniformLocation(sceneProgram, 'uPathTertiaryFrequency'),
            uPathQuaternaryFrequency: gl.getUniformLocation(sceneProgram, 'uPathQuaternaryFrequency'),
            uPathDriftSpeed: gl.getUniformLocation(sceneProgram, 'uPathDriftSpeed'),
            uSegmentsMin: gl.getUniformLocation(sceneProgram, 'uSegmentsMin'),
            uSegmentsMax: gl.getUniformLocation(sceneProgram, 'uSegmentsMax'),
            uSegmentsSpeed: gl.getUniformLocation(sceneProgram, 'uSegmentsSpeed'),
            uKaleidoscopeSoftness: gl.getUniformLocation(sceneProgram, 'uKaleidoscopeSoftness'),
            uPlaneRotationSpeed: gl.getUniformLocation(sceneProgram, 'uPlaneRotationSpeed'),
            uPlaneRotationAmplitude: gl.getUniformLocation(sceneProgram, 'uPlaneRotationAmplitude'),
            uInternalSpinSpeed: gl.getUniformLocation(sceneProgram, 'uInternalSpinSpeed'),
            uZoomMin: gl.getUniformLocation(sceneProgram, 'uZoomMin'),
            uZoomMax: gl.getUniformLocation(sceneProgram, 'uZoomMax'),
            uTruchetRadiusMin: gl.getUniformLocation(sceneProgram, 'uTruchetRadiusMin'),
            uTruchetRadiusMax: gl.getUniformLocation(sceneProgram, 'uTruchetRadiusMax'),
            uTruchetRadiusFrequency: gl.getUniformLocation(sceneProgram, 'uTruchetRadiusFrequency'),
            uLineWidth: gl.getUniformLocation(sceneProgram, 'uLineWidth'),
            uPlaneSpacing: gl.getUniformLocation(sceneProgram, 'uPlaneSpacing'),
            uPlaneCount: gl.getUniformLocation(sceneProgram, 'uPlaneCount'),
            uColorDistanceScale: gl.getUniformLocation(sceneProgram, 'uColorDistanceScale'),
            uColorTimeSpeed: gl.getUniformLocation(sceneProgram, 'uColorTimeSpeed'),
            uColorPlaneScale: gl.getUniformLocation(sceneProgram, 'uColorPlaneScale'),
            uWaveSpeed: gl.getUniformLocation(sceneProgram, 'uWaveSpeed'),
            uWaveFrequency: gl.getUniformLocation(sceneProgram, 'uWaveFrequency'),
            uFovBase: gl.getUniformLocation(sceneProgram, 'uFovBase'),
            uFovVariation: gl.getUniformLocation(sceneProgram, 'uFovVariation'),
            uPulseColorSpeed: gl.getUniformLocation(sceneProgram, 'uPulseColorSpeed'),
            uPulseColorPower: gl.getUniformLocation(sceneProgram, 'uPulseColorPower'),
            uContrastAmount: gl.getUniformLocation(sceneProgram, 'uContrastAmount'),
            uVignetteStrength: gl.getUniformLocation(sceneProgram, 'uVignetteStrength'),
            uColorCount: gl.getUniformLocation(sceneProgram, 'uColorCount'),
            uHue: gl.getUniformLocation(sceneProgram, 'uHue'),
            uSaturation: gl.getUniformLocation(sceneProgram, 'uSaturation'),
        };
        const blitUniforms = { uTexture: gl.getUniformLocation(blitProgram, 'uTexture') };

        let startTime = Date.now();
        let animationFrameId: number;

        const render = (time: number) => {
            const rect = canvas.getBoundingClientRect();
            const fullWidth = Math.max(1, Math.floor(rect.width));
            const fullHeight = Math.max(1, Math.floor(rect.height));
            if (canvas.width !== fullWidth || canvas.height !== fullHeight) {
                canvas.width = fullWidth;
                canvas.height = fullHeight;
            }

            const renderScale = Math.max(0.1, Math.min(1.0, config.renderScale ?? 0.6));
            const renderWidth = Math.max(1, Math.floor(fullWidth * renderScale));
            const renderHeight = Math.max(1, Math.floor(fullHeight * renderScale));

            gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, renderWidth, renderHeight, 0, gl.RGBA, gl.UNSIGNED_BYTE, null);

            gl.bindFramebuffer(gl.FRAMEBUFFER, lowResFbo);
            gl.viewport(0, 0, renderWidth, renderHeight);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(sceneProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(scenePosLoc);
            gl.vertexAttribPointer(scenePosLoc, 2, gl.FLOAT, false, 0, 0);

            gl.uniform1f(sceneUniforms.uTime, time);
            gl.uniform2f(sceneUniforms.uResolution, renderWidth, renderHeight);
            gl.uniform1f(sceneUniforms.uSpeed, config.speed);
            gl.uniform1f(sceneUniforms.uPathAmplitude, config.pathAmplitude);
            gl.uniform1f(sceneUniforms.uPathTwistFrequency, config.pathTwistFrequency);
            gl.uniform1f(sceneUniforms.uPathSecondaryFrequency, config.pathSecondaryFrequency);
            gl.uniform1f(sceneUniforms.uPathTertiaryFrequency, config.pathTertiaryFrequency);
            gl.uniform1f(sceneUniforms.uPathQuaternaryFrequency, config.pathQuaternaryFrequency);
            gl.uniform1f(sceneUniforms.uPathDriftSpeed, config.pathDriftSpeed);
            gl.uniform1f(sceneUniforms.uSegmentsMin, config.segmentsMin);
            gl.uniform1f(sceneUniforms.uSegmentsMax, config.segmentsMax);
            gl.uniform1f(sceneUniforms.uSegmentsSpeed, config.segmentsSpeed);
            gl.uniform1f(sceneUniforms.uKaleidoscopeSoftness, config.kaleidoscopeSoftness);
            gl.uniform1f(sceneUniforms.uPlaneRotationSpeed, config.planeRotationSpeed);
            gl.uniform1f(sceneUniforms.uPlaneRotationAmplitude, config.planeRotationAmplitude);
            gl.uniform1f(sceneUniforms.uInternalSpinSpeed, config.internalSpinSpeed);
            gl.uniform1f(sceneUniforms.uZoomMin, config.zoomMin);
            gl.uniform1f(sceneUniforms.uZoomMax, config.zoomMax);
            gl.uniform1f(sceneUniforms.uTruchetRadiusMin, config.truchetRadiusMin);
            gl.uniform1f(sceneUniforms.uTruchetRadiusMax, config.truchetRadiusMax);
            gl.uniform1f(sceneUniforms.uTruchetRadiusFrequency, config.truchetRadiusFrequency);
            gl.uniform1f(sceneUniforms.uLineWidth, config.lineWidth);
            gl.uniform1f(sceneUniforms.uPlaneSpacing, config.planeSpacing);
            gl.uniform1f(sceneUniforms.uPlaneCount, config.planeCount);
            gl.uniform1f(sceneUniforms.uColorDistanceScale, config.colorDistanceScale);
            gl.uniform1f(sceneUniforms.uColorTimeSpeed, config.colorTimeSpeed);
            gl.uniform1f(sceneUniforms.uColorPlaneScale, config.colorPlaneScale);
            gl.uniform1f(sceneUniforms.uWaveSpeed, config.waveSpeed);
            gl.uniform1f(sceneUniforms.uWaveFrequency, config.waveFrequency);
            gl.uniform1f(sceneUniforms.uFovBase, config.fovBase);
            gl.uniform1f(sceneUniforms.uFovVariation, config.fovVariation);
            gl.uniform1f(sceneUniforms.uPulseColorSpeed, config.pulseColorSpeed);
            gl.uniform1f(sceneUniforms.uPulseColorPower, config.pulseColorPower);
            gl.uniform1f(sceneUniforms.uContrastAmount, config.contrastAmount);
            gl.uniform1f(sceneUniforms.uVignetteStrength, config.vignetteStrength);
            gl.uniform1f(sceneUniforms.uHue, config.hue ?? 0.0);
            gl.uniform1f(sceneUniforms.uSaturation, config.saturation ?? 1.0);

            config.colors.forEach((color, index) => {
                if (index >= 10) return;
                const loc = gl.getUniformLocation(sceneProgram, `uColors[${index}]`);
                const rgba = hexToRgbaVec(color);
                gl.uniform4f(loc, rgba[0], rgba[1], rgba[2], rgba[3]);
            });
            gl.uniform1f(sceneUniforms.uColorCount, config.colorCount);

            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);

            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
            gl.viewport(0, 0, fullWidth, fullHeight);
            gl.clearColor(0, 0, 0, 1);
            gl.clear(gl.COLOR_BUFFER_BIT);

            gl.useProgram(blitProgram);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.enableVertexAttribArray(blitPosLoc);
            gl.vertexAttribPointer(blitPosLoc, 2, gl.FLOAT, false, 0, 0);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, lowResTexture);
            gl.uniform1i(blitUniforms.uTexture, 0);
            gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
        };

        const renderLoop = () => {
            const time = globalConfig.paused ? (globalConfig.motion / 100) * 10 : (Date.now() - startTime) * 0.001;
            render(time);
            if (!globalConfig.paused) animationFrameId = requestAnimationFrame(renderLoop);
        };

        renderLoop();
        return () => {
            cancelAnimationFrame(animationFrameId);
            gl.deleteProgram(sceneProgram);
            gl.deleteProgram(blitProgram);
            gl.deleteBuffer(positionBuffer);
            gl.deleteTexture(lowResTexture);
            gl.deleteFramebuffer(lowResFbo);
        };
    }, [config, globalConfig.paused, globalConfig.motion]);

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
        {shaders.spaceFlower?.enabled && (
          <ShaderWrapper config={shaders.spaceFlower} globalConfig={config}>
            <SpaceFlowerShader config={shaders.spaceFlower} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.electricSpiral?.enabled && (
          <ShaderWrapper config={shaders.electricSpiral} globalConfig={config}>
            <ElectricSpiralShader config={shaders.electricSpiral} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.twistedKaleidoscope?.enabled && (
          <ShaderWrapper config={shaders.twistedKaleidoscope} globalConfig={config}>
            <TwistedKaleidoscopeShader config={shaders.twistedKaleidoscope} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.trickyShapes?.enabled && (
          <ShaderWrapper config={shaders.trickyShapes} globalConfig={config}>
            <TrickyShapesShader config={shaders.trickyShapes} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.gridAttractor?.enabled && (
          <ShaderWrapper config={shaders.gridAttractor} globalConfig={config}>
            <GridAttractorShader config={shaders.gridAttractor} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.tunnelCylinders?.enabled && (
          <ShaderWrapper config={shaders.tunnelCylinders} globalConfig={config}>
            <TunnelCylindersShader config={shaders.tunnelCylinders} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.psychedelicFlowerTunnel?.enabled && (
          <ShaderWrapper config={shaders.psychedelicFlowerTunnel} globalConfig={config}>
            <PsychedelicFlowerTunnelShader config={shaders.psychedelicFlowerTunnel} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.celestialJourney?.enabled && (
          <ShaderWrapper config={shaders.celestialJourney} globalConfig={config}>
            <CelestialJourneyShader config={shaders.celestialJourney} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.discoHive?.enabled && (
          <ShaderWrapper config={shaders.discoHive} globalConfig={config}>
            <DiscoHiveShader config={shaders.discoHive} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.discoHexnel?.enabled && (
          <ShaderWrapper config={shaders.discoHexnel} globalConfig={config}>
            <DiscoHexnelShader config={shaders.discoHexnel} globalConfig={config} />
          </ShaderWrapper>
        )}
        {shaders.kaleidoscopeWheels?.enabled && (
          <ShaderWrapper config={shaders.kaleidoscopeWheels} globalConfig={config}>
            <KaleidoscopeWheelsShader config={shaders.kaleidoscopeWheels} globalConfig={config} />
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