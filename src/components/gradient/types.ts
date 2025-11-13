

import type { GradientConfig as GradientConfigBase, ShaderSetting, NoiseType, TextConfig, ShapeConfig, IconConfig } from './gradient-canvas';

export interface GradientConfig extends GradientConfigBase {
    texts: TextConfig[];
    shapes: ShapeConfig[];
    icons: IconConfig[];
    orbs?: ShapeConfig[]; // For backward compatibility
}

export type { ShapeConfig, ShaderSetting, NoiseType, TextConfig, IconConfig };
