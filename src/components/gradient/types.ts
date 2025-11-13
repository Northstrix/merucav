

import type { GradientConfig as GradientConfigBase, ShaderSetting, NoiseType, TextConfig, ShapeConfig } from './gradient-canvas';

export interface GradientConfig extends GradientConfigBase {
    texts: TextConfig[];
    shapes: ShapeConfig[];
    orbs?: ShapeConfig[]; // For backward compatibility
}

export type { ShapeConfig, ShaderSetting, NoiseType, TextConfig };
