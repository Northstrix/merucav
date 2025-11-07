'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GradientConfig } from "./types";
import { CustomSlider } from "../ui/custom-slider";
import { Label } from "../ui/label";
import { useTranslation } from "@/hooks/use-translation";
import CustomCheckbox from "@/components/CustomCheckbox";
import useIsRTL from "@/hooks/use-is-rtl";
import { ColorPicker } from "../color-picker";
import { hsvaToHex } from "@uiw/color-convert";

interface GradientPropertiesEditorProps {
    config: GradientConfig;
    setConfig: (config: GradientConfig) => void;
}

export function GradientPropertiesEditor({ config, setConfig }: GradientPropertiesEditorProps) {
    const { t } = useTranslation();
    const isRTL = useIsRTL();

    const updateShaderConfig = (shaderName: keyof GradientConfig['shaders'], key: string, value: any) => {
        const currentShader = config.shaders[shaderName];
        if (key === 'translateX' || key === 'translateY' || key === 'rotation' || key === 'scale') {
             setConfig({
                ...config,
                shaders: {
                    ...config.shaders,
                    [shaderName]: {
                        ...currentShader,
                        transform: {
                            ...currentShader.transform,
                            [key]: value
                        }
                    }
                }
            });
        } else {
            setConfig({
                ...config,
                shaders: {
                    ...config.shaders,
                    [shaderName]: {
                        ...currentShader,
                        [key]: value
                    }
                }
            });
        }
    };
    

    const { flow, tranquiluxe, kaleidoscope, fate, structuredNoise, balatro, electricPulse, laserBlast, novatrix, voronoi } = config.shaders;

    const renderShaderControls = (shaderName: keyof GradientConfig['shaders'], shaderConfig: any, children: React.ReactNode) => (
        <AccordionItem value={shaderName} className="border-b-0">
            <AccordionTrigger>{t(shaderName)}</AccordionTrigger>
            <AccordionContent className="space-y-4 pt-4">
                <CustomCheckbox id={`${shaderName}-enable`} direction={isRTL ? "rtl" : "ltr"} checked={shaderConfig.enabled} onChange={(checked) => updateShaderConfig(shaderName, 'enabled', !!checked)} label={t('enable')} />
                {shaderConfig.enabled && (
                    <>
                        <ControlSlider label={t('opacity')} value={shaderConfig.opacity} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig(shaderName, 'opacity', v)} isRTL={isRTL} />
                        <h3 className="text-sm font-medium pt-2" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('transform')}</h3>
                        <ControlSlider label={t('translateX')} value={shaderConfig.transform.translateX} min={-200} max={200} step={0.1} onValueChange={(v) => updateShaderConfig(shaderName, 'translateX', v)} isRTL={isRTL} unit="%" />
                        <ControlSlider label={t('translateY')} value={shaderConfig.transform.translateY} min={-200} max={200} step={0.1} onValueChange={(v) => updateShaderConfig(shaderName, 'translateY', v)} isRTL={isRTL} unit="%" />
                        <ControlSlider label={t('rotation')} value={shaderConfig.transform.rotation} min={-360} max={360} step={0.1} onValueChange={(v) => updateShaderConfig(shaderName, 'rotation', v)} isRTL={isRTL} unit="°" />
                        <ControlSlider label={t('scale')} value={shaderConfig.transform.scale} min={0.1} max={10} step={0.1} onValueChange={(v) => updateShaderConfig(shaderName, 'scale', v)} isRTL={isRTL} />

                        <h3 className="text-sm font-medium pt-2" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('parameters')}</h3>
                        {children}
                    </>
                )}
            </AccordionContent>
        </AccordionItem>
    );

    return (
        <div className="space-y-4 m-6">
            <Accordion type="multiple" defaultValue={['flow']} className="w-full space-y-4">
                {renderShaderControls('flow', flow, (
                    <>
                        <ControlSlider label={t('velocity')} value={flow.velocity} min={0} max={5} step={0.1} onValueChange={(v) => updateShaderConfig('flow', 'velocity', v)} isRTL={isRTL} />
                        <ControlSlider label={t('detail')} value={flow.detail} min={10} max={1000} step={5} onValueChange={(v) => updateShaderConfig('flow', 'detail', v)} isRTL={isRTL} />
                        <ControlSlider label={t('twist')} value={flow.twist} min={0} max={100} step={1} onValueChange={(v) => updateShaderConfig('flow', 'twist', v)} isRTL={isRTL} />
                        <ControlSlider label={t('speed')} value={flow.speed} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig('flow', 'speed', v)} isRTL={isRTL} />
                        <ControlSlider label={t('contrast')} value={flow.contrast} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('flow', 'contrast', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbR')} value={flow.rgbR} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('flow', 'rgbR', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbG')} value={flow.rgbG} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('flow', 'rgbG', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbB')} value={flow.rgbB} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('flow', 'rgbB', v)} isRTL={isRTL} />
                        <ControlSlider label={t('colorOffset')} value={flow.colorOffset} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('flow', 'colorOffset', v)} isRTL={isRTL} />
                        <ControlSlider label={t('hue')} value={flow.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig('flow', 'hue', v)} isRTL={isRTL} />
                        <ControlSlider label={t('saturation')} value={flow.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('flow', 'saturation', v)} isRTL={isRTL} />
                    </>
                ))}
                {renderShaderControls('tranquiluxe', tranquiluxe, (
                     <>
                        <ControlSlider label={t('speed')} value={tranquiluxe.speed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('tranquiluxe', 'speed', v)} isRTL={isRTL} />
                        <ControlSlider label={t('hue')} value={tranquiluxe.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig('tranquiluxe', 'hue', v)} isRTL={isRTL} />
                        <ControlSlider label={t('saturation')} value={tranquiluxe.saturation} min={0} max={100} step={1} onValueChange={(v) => updateShaderConfig('tranquiluxe', 'saturation', v)} isRTL={isRTL} />
                    </>
                ))}
                 {renderShaderControls('kaleidoscope', kaleidoscope, (
                    <>
                        <ControlSlider label={t('speed')} value={kaleidoscope.speed} min={0} max={5} step={0.1} onValueChange={(v) => updateShaderConfig('kaleidoscope', 'speed', v)} isRTL={isRTL} />
                        <ControlSlider label={t('hue')} value={kaleidoscope.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig('kaleidoscope', 'hue', v)} isRTL={isRTL} />
                        <ControlSlider label={t('saturation')} value={kaleidoscope.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('kaleidoscope', 'saturation', v)} isRTL={isRTL} />
                    </>
                ))}
                {renderShaderControls('fate', fate, (
                    <>
                        <ControlSlider label={t('speed')} value={fate.speed} min={0} max={5} step={0.1} onValueChange={(v) => updateShaderConfig('fate', 'speed', v)} isRTL={isRTL} />
                        <ControlSlider label={t('hue')} value={fate.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig('fate', 'hue', v)} isRTL={isRTL} />
                        <ControlSlider label={t('saturation')} value={fate.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('fate', 'saturation', v)} isRTL={isRTL} />
                    </>
                ))}
                 {renderShaderControls('structuredNoise', structuredNoise, (
                    <>
                        <ControlSlider label={t('speed')} value={structuredNoise.speed} min={0} max={5} step={0.1} onValueChange={(v) => updateShaderConfig('structuredNoise', 'speed', v)} isRTL={isRTL} />
                        <ControlSlider label={t('mirrors')} value={structuredNoise.mirrors} min={1} max={10} step={1} onValueChange={(v) => updateShaderConfig('structuredNoise', 'mirrors', v)} isRTL={isRTL} />
                        <ControlSlider label={t('noiseStrength')} value={structuredNoise.noiseStrength} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('structuredNoise', 'noiseStrength', v)} isRTL={isRTL} />
                        <ControlSlider label={t('distortionStrength')} value={structuredNoise.distortionStrength} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('structuredNoise', 'distortionStrength', v)} isRTL={isRTL} />
                        <ControlSlider label={t('hue')} value={structuredNoise.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig('structuredNoise', 'hue', v)} isRTL={isRTL} />
                        <ControlSlider label={t('saturation')} value={structuredNoise.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('structuredNoise', 'saturation', v)} isRTL={isRTL} />
                        <CustomCheckbox id="structuredNoise-useFilter" direction={isRTL ? "rtl" : "ltr"} checked={structuredNoise.useFilter} onChange={(checked) => updateShaderConfig('structuredNoise', 'useFilter', !!checked)} label={t('useFilter')} />
                        {structuredNoise.useFilter && (
                            <ColorPicker
                                value={structuredNoise.filterColor}
                                onValueChange={(c) => updateShaderConfig('structuredNoise', 'filterColor', hsvaToHex(c))}
                                hideAlpha
                                hideContrastRatio
                            />
                        )}
                    </>
                ))}
                 {renderShaderControls('balatro', balatro, (
                    <>
                        <ControlSlider label={t('speed')} value={balatro.speed} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig('balatro', 'speed', v)} isRTL={isRTL} />
                        <ControlSlider label={t('spinRotation')} value={balatro.spinRotation} min={-10} max={10} step={0.1} onValueChange={(v) => updateShaderConfig('balatro', 'spinRotation', v)} isRTL={isRTL} />
                        <ControlSlider label={t('spinSpeed')} value={balatro.spinSpeed} min={0} max={20} step={0.1} onValueChange={(v) => updateShaderConfig('balatro', 'spinSpeed', v)} isRTL={isRTL} />
                        <ControlSlider label={t('contrast')} value={balatro.contrast} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig('balatro', 'contrast', v)} isRTL={isRTL} />
                        <ControlSlider label={t('lighting')} value={balatro.lighting} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('balatro', 'lighting', v)} isRTL={isRTL} />
                        <ControlSlider label={t('spinAmount')} value={balatro.spinAmount} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('balatro', 'spinAmount', v)} isRTL={isRTL} />
                        <ControlSlider label={t('pixelFilter')} value={balatro.pixelFilter} min={100} max={2000} step={1} onValueChange={(v) => updateShaderConfig('balatro', 'pixelFilter', v)} isRTL={isRTL} />
                        <ControlSlider label={t('spinEase')} value={balatro.spinEase} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('balatro', 'spinEase', v)} isRTL={isRTL} />
                        <CustomCheckbox id="balatro-is-rotate" direction={isRTL ? "rtl" : "ltr"} checked={balatro.isRotate} onChange={(checked) => updateShaderConfig('balatro', 'isRotate', !!checked)} label={t('isRotate')} />
                        <h4 className="text-xs font-medium pt-2" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('color')} 1</h4>
                        <ControlSlider label={t('rgbR')} value={balatro.color1_r} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('balatro', 'color1_r', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbG')} value={balatro.color1_g} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('balatro', 'color1_g', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbB')} value={balatro.color1_b} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('balatro', 'color1_b', v)} isRTL={isRTL} />
                        <h4 className="text-xs font-medium pt-2" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('color')} 2</h4>
                        <ControlSlider label={t('rgbR')} value={balatro.color2_r} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('balatro', 'color2_r', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbG')} value={balatro.color2_g} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('balatro', 'color2_g', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbB')} value={balatro.color2_b} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('balatro', 'color2_b', v)} isRTL={isRTL} />
                        <h4 className="text-xs font-medium pt-2" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('color')} 3</h4>
                        <ControlSlider label={t('rgbR')} value={balatro.color3_r} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('balatro', 'color3_r', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbG')} value={balatro.color3_g} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('balatro', 'color3_g', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbB')} value={balatro.color3_b} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('balatro', 'color3_b', v)} isRTL={isRTL} />
                    </>
                ))}
                {renderShaderControls('electricPulse', electricPulse, (
                    <>
                        <ControlSlider label={t('speed')} value={electricPulse.speed} min={0} max={40} step={0.1} onValueChange={(v) => updateShaderConfig('electricPulse', 'speed', v)} isRTL={isRTL} />
                        <ControlSlider label={t('hue')} value={electricPulse.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig('electricPulse', 'hue', v)} isRTL={isRTL} />
                        <ControlSlider label={t('saturation')} value={electricPulse.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('electricPulse', 'saturation', v)} isRTL={isRTL} />
                        <h4 className="text-xs font-medium pt-2" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('color')}</h4>
                        <ControlSlider label={t('rgbR')} value={electricPulse.color1_r} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('electricPulse', 'color1_r', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbG')} value={electricPulse.color1_g} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('electricPulse', 'color1_g', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbB')} value={electricPulse.color1_b} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('electricPulse', 'color1_b', v)} isRTL={isRTL} />
                    </>
                ))}
                {renderShaderControls('laserBlast', laserBlast, (
                     <>
                        <ControlSlider label={t('speed')} value={laserBlast.speed} min={0} max={5} step={0.1} onValueChange={(v) => updateShaderConfig('laserBlast', 'speed', v)} isRTL={isRTL} />
                        <ControlSlider label={t('power')} value={laserBlast.power} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('laserBlast', 'power', v)} isRTL={isRTL} />
                        <ControlSlider label={t('duration')} value={laserBlast.duration} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig('laserBlast', 'duration', v)} isRTL={isRTL} />
                        <ControlSlider label={t('startRadius')} value={laserBlast.startRadius} min={0} max={5} step={0.1} onValueChange={(v) => updateShaderConfig('laserBlast', 'startRadius', v)} isRTL={isRTL} />
                        <ControlSlider label={t('endRadius')} value={laserBlast.endRadius} min={0} max={5} step={0.1} onValueChange={(v) => updateShaderConfig('laserBlast', 'endRadius', v)} isRTL={isRTL} />
                        <ControlSlider label={t('hue')} value={laserBlast.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig('laserBlast', 'hue', v)} isRTL={isRTL} />
                        <ControlSlider label={t('saturation')} value={laserBlast.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('laserBlast', 'saturation', v)} isRTL={isRTL} />
                        <h4 className="text-xs font-medium pt-2" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('startColor')}</h4>
                        <ControlSlider label={t('rgbR')} value={laserBlast.color1_r} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('laserBlast', 'color1_r', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbG')} value={laserBlast.color1_g} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('laserBlast', 'color1_g', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbB')} value={laserBlast.color1_b} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('laserBlast', 'color1_b', v)} isRTL={isRTL} />
                        <h4 className="text-xs font-medium pt-2" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('endColor')}</h4>
                        <ControlSlider label={t('rgbR')} value={laserBlast.color2_r} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('laserBlast', 'color2_r', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbG')} value={laserBlast.color2_g} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('laserBlast', 'color2_g', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbB')} value={laserBlast.color2_b} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('laserBlast', 'color2_b', v)} isRTL={isRTL} />
                    </>
                ))}
                {renderShaderControls('novatrix', novatrix, (
                    <>
                        <ControlSlider label={t('speed')} value={novatrix.speed} min={0} max={5} step={0.1} onValueChange={(v) => updateShaderConfig('novatrix', 'speed', v)} isRTL={isRTL} />
                        <ControlSlider label={t('hue')} value={novatrix.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig('novatrix', 'hue', v)} isRTL={isRTL} />
                        <ControlSlider label={t('saturation')} value={novatrix.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('novatrix', 'saturation', v)} isRTL={isRTL} />
                        <h4 className="text-xs font-medium pt-2" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('color')}</h4>
                        <ControlSlider label={t('rgbR')} value={novatrix.color_r} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('novatrix', 'color_r', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbG')} value={novatrix.color_g} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('novatrix', 'color_g', v)} isRTL={isRTL} />
                        <ControlSlider label={t('rgbB')} value={novatrix.color_b} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('novatrix', 'color_b', v)} isRTL={isRTL} />
                    </>
                ))}
                 {renderShaderControls('voronoi', voronoi, (
                    <>
                        <ControlSlider label={t('speed')} value={voronoi.speed} min={0} max={5} step={0.1} onValueChange={(v) => updateShaderConfig('voronoi', 'speed', v)} isRTL={isRTL} />
                        <ControlSlider label={t('scale')} value={voronoi.scale} min={1} max={50} step={0.5} onValueChange={(v) => updateShaderConfig('voronoi', 'scale', v)} isRTL={isRTL} />
                        <ControlSlider label={t('hue')} value={voronoi.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig('voronoi', 'hue', v)} isRTL={isRTL} />
                        <ControlSlider label={t('saturation')} value={voronoi.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('voronoi', 'saturation', v)} isRTL={isRTL} />
                    </>
                ))}
            </Accordion>
        </div>
    );
}

function ControlSlider({ label, value, onValueChange, min, max, step, isRTL, unit = '' }: { label: string, value: number, onValueChange: (v: number) => void, min: number, max: number, step: number, isRTL: boolean, unit?: string }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <Label style={{textAlign: isRTL ? 'right' : 'left'}}>{label}</Label>
                <span className="text-sm text-muted-foreground">{value.toFixed(step < 1 ? 2 : 0)}{unit}</span>
            </div>
            <CustomSlider value={value} onValueChange={onValueChange} min={min} max={max} step={step} isRTL={isRTL} />
        </div>
    )
}
