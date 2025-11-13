'use client';
import { GradientConfig, NoiseType } from "./types";
import { CustomSlider } from "../ui/custom-slider";
import { Label } from "../ui/label";
import { useTranslation } from "@/hooks/use-translation";
import CustomCheckbox from "@/components/CustomCheckbox";
import useIsRTL from "@/hooks/use-is-rtl";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "../ui/accordion";
import { FloatingLabelCombobox } from "../ui/floating-label-combobox";

interface GradientOverlayEditorProps {
    config: GradientConfig;
    setConfig: (config: GradientConfig) => void;
}

export function GradientOverlayEditor({ config, setConfig }: GradientOverlayEditorProps) {
    const { t } = useTranslation();
    const isRTL = useIsRTL();
    
    const updateConfig = (key: keyof GradientConfig['overlay'] | keyof GradientConfig, value: any) => {
        if (key in config.overlay) {
             setConfig({
                ...config,
                overlay: {
                    ...config.overlay,
                    [key as keyof GradientConfig['overlay']]: value,
                }
            })
        } else {
            setConfig({ ...config, [key as keyof GradientConfig]: value });
        }
    };

    const updateNoiseConfig = (key: keyof GradientConfig['overlay']['noise'], value: any) => {
        setConfig({
            ...config,
            overlay: {
                ...config.overlay,
                noise: {
                    ...config.overlay.noise,
                    [key]: value
                }
            }
        });
    }

    const noiseTypes: { value: NoiseType, label: string }[] = [
        { value: 'fractal', label: t('fractal') },
        { value: 'turbulence', label: t('turbulence') },
        { value: 'warped', label: t('warped') },
        { value: 'cellular', label: t('cellular') },
        { value: 'electric', label: t('electric') },
        { value: 'cloudy', label: t('cloudy') },
    ];
    
    return (
        <div className="space-y-4 m-6">
            <Accordion type="multiple" defaultValue={['overlay-section', 'effects-section', 'motion-section']} className="w-full space-y-4">
                 <AccordionItem value="overlay-section" className="border-b-0">
                    <AccordionTrigger>{t('overlay')}</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                direction: isRTL ? "rtl" : "ltr",
                            }}
                        >
                            <CustomCheckbox
                                id="enable-overlay"
                                direction={isRTL ? "rtl" : "ltr"}
                                checked={config.overlay.enabled}
                                onChange={(checked) => updateConfig('enabled', !!checked)}
                                label={t('enableOverlay')}
                            />
                        </div>
                        {config.overlay.enabled && (
                            <>
                                <ControlSlider label={t('blur')} value={config.overlay.blur} min={0} max={300} step={0.1} onValueChange={(v) => updateConfig('blur', v)} isRTL={isRTL} />
                                <ControlSlider label={t('lighten')} value={config.overlay.lighten} min={0} max={1} step={0.01} onValueChange={(v) => updateConfig('lighten', v)} isRTL={isRTL} />
                                <ControlSlider label={t('darken')} value={config.overlay.darken} min={0} max={1} step={0.01} onValueChange={(v) => updateConfig('darken', v)} isRTL={isRTL} />
                                <ControlSlider label={t('skewX')} value={config.overlay.skewX} min={-45} max={45} step={0.1} onValueChange={(v) => updateConfig('skewX', v)} isRTL={isRTL} />
                                <ControlSlider label={t('skewY')} value={config.overlay.skewY} min={-45} max={45} step={0.1} onValueChange={(v) => updateConfig('skewY', v)} isRTL={isRTL} />
                            </>
                        )}
                    </AccordionContent>
                 </AccordionItem>
                 <AccordionItem value="effects-section" className="border-b-0">
                    <AccordionTrigger>{t('effects')}</AccordionTrigger>
                     <AccordionContent className="space-y-4 pt-4">
                        <ControlSlider label={t('grainAmount')} value={config.grainAmount} min={0} max={0.5} step={0.01} onValueChange={(v) => updateConfig('grainAmount', v)} isRTL={isRTL} />
                        <ControlSlider label={t('grainSize')} value={config.grainSize} min={0.1} max={10} step={0.1} onValueChange={(v) => updateConfig('grainSize', v)} isRTL={isRTL} />
                        <ControlSlider label={t('scanlines')} value={config.scanlines} min={0} max={1} step={0.01} onValueChange={(v) => updateConfig('scanlines', v)} isRTL={isRTL} />
                        <ControlSlider label={t('scanlineWidth')} value={config.scanlineWidth} min={0.1} max={10} step={0.1} onValueChange={(v) => updateConfig('scanlineWidth', v)} isRTL={isRTL} />
                    
                        <div className="space-y-4 pt-4 border-t border-border">
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                direction: isRTL ? "rtl" : "ltr",
                            }}
                        >
                            <CustomCheckbox id="enable-noise" direction={isRTL ? "rtl" : "ltr"} checked={config.overlay.noise.enabled} onChange={(c) => updateNoiseConfig('enabled', !!c)} label={t('enableNoise')} />

                        </div>
                            {config.overlay.noise.enabled && (
                                <>
                                    <FloatingLabelCombobox label={t('noiseType')} value={config.overlay.noise.type} onValueChange={(v) => updateNoiseConfig('type', v as NoiseType)} options={noiseTypes} />
                                    <ControlSlider label={t('opacity')} value={config.overlay.noise.opacity} min={0} max={1} step={0.01} onValueChange={(v) => updateNoiseConfig('opacity', v)} isRTL={isRTL} />

                                    {(config.overlay.noise.type === 'fractal' || config.overlay.noise.type === 'turbulence') && (
                                        <>
                                            <ControlSlider label={t('frequency')} value={config.overlay.noise.frequency} min={0} max={2} step={0.01} onValueChange={(v) => updateNoiseConfig('frequency', v)} isRTL={isRTL} />
                                            <ControlSlider label={t('octaves')} value={config.overlay.noise.octaves} min={1} max={10} step={1} onValueChange={(v) => updateNoiseConfig('octaves', v)} isRTL={isRTL} />
                                            <ControlSlider label={t('seed')} value={config.overlay.noise.seed} min={0} max={100} step={1} onValueChange={(v) => updateNoiseConfig('seed', v)} isRTL={isRTL} />
                                        </>
                                    )}
                                    {config.overlay.noise.type === 'warped' && (
                                        <ControlSlider label={t('scale')} value={config.overlay.noise.scale} min={1} max={200} step={1} onValueChange={(v) => updateNoiseConfig('scale', v)} isRTL={isRTL} />
                                    )}
                                    {config.overlay.noise.type === 'cellular' && (
                                        <ControlSlider label={t('scale')} value={config.overlay.noise.scale} min={1} max={50} step={1} onValueChange={(v) => updateNoiseConfig('scale', v)} isRTL={isRTL} />
                                    )}
                                     {config.overlay.noise.type === 'electric' && (
                                        <ControlSlider label={t('levels')} value={config.overlay.noise.levels} min={2} max={16} step={1} onValueChange={(v) => updateNoiseConfig('levels', v)} isRTL={isRTL} />
                                    )}
                                    {config.overlay.noise.type === 'cloudy' && (
                                        <ControlSlider label={t('frequency')} value={config.overlay.noise.frequency} min={0.001} max={0.1} step={0.001} onValueChange={(v) => updateNoiseConfig('frequency', v)} isRTL={isRTL} />
                                    )}
                                </>
                            )}
                        </div>
                     </AccordionContent>
                 </AccordionItem>
                 <AccordionItem value="motion-section" className="border-b-0">
                    <AccordionTrigger>{t('motion')}</AccordionTrigger>
                    <AccordionContent className="space-y-4 pt-4">
                        <div
                            style={{
                                width: "100%",
                                display: "flex",
                                direction: isRTL ? "rtl" : "ltr",
                            }}
                        >
                            <CustomCheckbox
                                id="paused"
                                direction={isRTL ? "rtl" : "ltr"}
                                checked={config.paused}
                                onChange={(checked) => updateConfig('paused', !!checked)}
                                label={t('paused')}
                            />
                        </div>
                        {config.paused && (
                            <ControlSlider label={t('motion')} value={config.motion} min={0} max={100} step={0.1} onValueChange={(v) => updateConfig('motion', v)} isRTL={isRTL} />
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
                <span className="text-sm text-muted-foreground">{value.toFixed(step < 1 ? 2 : 0)}</span>
            </div>
            <CustomSlider value={value} onValueChange={onValueChange} min={min} max={max} step={step} isRTL={isRTL} />
        </div>
    )
}
