'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GradientConfig } from "./types";
import { CustomSlider } from "../ui/custom-slider";
import { Label } from "../ui/label";
import { useTranslation } from "@/hooks/use-translation";
import CustomCheckbox from "@/components/CustomCheckbox";
import useIsRTL from "@/hooks/use-is-rtl";

interface GradientPropertiesEditorProps {
    config: GradientConfig;
    setConfig: (config: GradientConfig) => void;
}

export function GradientPropertiesEditor({ config, setConfig }: GradientPropertiesEditorProps) {
    const { t } = useTranslation();
    const isRTL = useIsRTL();

    const updateShaderConfig = (shaderName: 'flow' | 'tranquiluxe' | 'novatrix', key: string, value: any) => {
        setConfig({
            ...config,
            shaders: {
                ...config.shaders,
                [shaderName]: {
                    ...config.shaders[shaderName],
                    [key]: value
                }
            }
        });
    };

    const flowConfig = config.shaders.flow;
    const tranquiluxeConfig = config.shaders.tranquiluxe;
    const novatrixConfig = config.shaders.novatrix;

    return (
        <div className="space-y-4 m-6">
            <Accordion type="multiple" defaultValue={['flow']} className="w-full space-y-4">
                <AccordionItem value="flow" className="border-b-0">
                    <AccordionTrigger>{t('flow')} Shader</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                    <CustomCheckbox
                    id="flow-enable"
                    direction={isRTL ? "rtl" : "ltr"}
                    checked={flowConfig.enabled}
                    onChange={(checked) => updateShaderConfig('flow', 'enabled', !!checked)}
                    label={t('enable')}
                    />
                        {flowConfig.enabled && (
                            <>
                                <ControlSlider label={t('opacity')} value={flowConfig.opacity} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('flow', 'opacity', v)} isRTL={isRTL} />
                                <ControlSlider label={t('scale')} value={flowConfig.scale} min={1} max={20} step={0.5} onValueChange={(v) => updateShaderConfig('flow', 'scale', v)} isRTL={isRTL} />
                                <ControlSlider label={t('phaseX')} value={flowConfig.phaseX} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('flow', 'phaseX', v)} isRTL={isRTL} />
                                <ControlSlider label={t('velocity')} value={flowConfig.velocity} min={0} max={5} step={0.1} onValueChange={(v) => updateShaderConfig('flow', 'velocity', v)} isRTL={isRTL} />
                                <ControlSlider label={t('detail')} value={flowConfig.detail} min={10} max={1000} step={5} onValueChange={(v) => updateShaderConfig('flow', 'detail', v)} isRTL={isRTL} />
                                <ControlSlider label={t('twist')} value={flowConfig.twist} min={0} max={100} step={1} onValueChange={(v) => updateShaderConfig('flow', 'twist', v)} isRTL={isRTL} />
                                <ControlSlider label={t('speed')} value={flowConfig.speed} min={0} max={10} step={0.1} onValueChange={(v) => updateShaderConfig('flow', 'speed', v)} isRTL={isRTL} />
                                <ControlSlider label={t('contrast')} value={flowConfig.contrast} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('flow', 'contrast', v)} isRTL={isRTL} />
                                <ControlSlider label={t('rgbR')} value={flowConfig.rgbR} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('flow', 'rgbR', v)} isRTL={isRTL} />
                                <ControlSlider label={t('rgbG')} value={flowConfig.rgbG} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('flow', 'rgbG', v)} isRTL={isRTL} />
                                <ControlSlider label={t('rgbB')} value={flowConfig.rgbB} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('flow', 'rgbB', v)} isRTL={isRTL} />
                                <ControlSlider label={t('colorOffset')} value={flowConfig.colorOffset} min={-1} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('flow', 'colorOffset', v)} isRTL={isRTL} />
                            </>
                        )}
                    </AccordionContent>
                </AccordionItem>
                <AccordionItem value="tranquiluxe" className="border-b-0">
                    <AccordionTrigger>{t('tranquiluxe')} Shader</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                    <CustomCheckbox
                    id="tranquiluxe-enable"
                    direction={isRTL ? "rtl" : "ltr"}
                    checked={tranquiluxeConfig.enabled}
                    onChange={(checked) => updateShaderConfig('tranquiluxe', 'enabled', !!checked)}
                    label={t('enable')}
                    />

                         {tranquiluxeConfig.enabled && (
                            <>
                                <ControlSlider label={t('opacity')} value={tranquiluxeConfig.opacity} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('tranquiluxe', 'opacity', v)} isRTL={isRTL} />
                                <ControlSlider label={t('speed')} value={tranquiluxeConfig.speed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('tranquiluxe', 'speed', v)} isRTL={isRTL} />
                                <ControlSlider label={t('hue')} value={tranquiluxeConfig.hue} min={0} max={360} step={1} onValueChange={(v) => updateShaderConfig('tranquiluxe', 'hue', v)} isRTL={isRTL} />
                                <ControlSlider label={t('saturation')} value={tranquiluxeConfig.saturation} min={0} max={100} step={1} onValueChange={(v) => updateShaderConfig('tranquiluxe', 'saturation', v)} isRTL={isRTL} />
                            </>
                         )}
                    </AccordionContent>
                </AccordionItem>
                 <AccordionItem value="novatrix" className="border-b-0">
                    <AccordionTrigger>{t('novatrix')} Shader</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                    <CustomCheckbox
                    id="novatrix-enable"
                    direction={isRTL ? "rtl" : "ltr"}
                    checked={novatrixConfig.enabled}
                    onChange={(checked) => updateShaderConfig('novatrix', 'enabled', !!checked)}
                    label={t('enable')}
                    />

                         {novatrixConfig.enabled && (
                            <>
                                <ControlSlider label={t('opacity')} value={novatrixConfig.opacity} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('novatrix', 'opacity', v)} isRTL={isRTL} />
                                <ControlSlider label={t('speed')} value={novatrixConfig.speed} min={0} max={2} step={0.01} onValueChange={(v) => updateShaderConfig('novatrix', 'speed', v)} isRTL={isRTL} />
                                <ControlSlider label={t('rgbR')} value={novatrixConfig.r} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('novatrix', 'r', v)} isRTL={isRTL} />
                                <ControlSlider label={t('rgbG')} value={novatrixConfig.g} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('novatrix', 'g', v)} isRTL={isRTL} />
                                <ControlSlider label={t('rgbB')} value={novatrixConfig.b} min={0} max={1} step={0.01} onValueChange={(v) => updateShaderConfig('novatrix', 'b', v)} isRTL={isRTL} />
                            </>
                         )}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>
        </div>
    );
}

function ControlSlider({ label, value, onValueChange, min, max, step, isRTL }: { label: string, value: number, onValueChange: (v: number) => void, min: number, max: number, step: number, isRTL: boolean }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                <Label style={{textAlign: isRTL ? 'right' : 'left'}}>{label}</Label>
                <span className="text-sm text-muted-foreground">{value.toFixed(2)}</span>
            </div>
            <CustomSlider value={value} onValueChange={onValueChange} min={min} max={max} step={step} isRTL={isRTL} />
        </div>
    )
}
