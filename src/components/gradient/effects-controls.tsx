'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GradientConfig } from "./types";
import { CustomSlider } from "../ui/custom-slider";
import { Label } from "../ui/label";
import { useTranslation } from "@/hooks/use-translation";
import { Checkbox } from "../ui/checkbox";

interface EffectsControlsProps {
    config: GradientConfig;
    setConfig: (config: GradientConfig) => void;
}

export function EffectsControls({ config, setConfig }: EffectsControlsProps) {
    const { t } = useTranslation();
    
    const updateConfig = (key: keyof GradientConfig | `overlay.${keyof GradientConfig['overlay']}`, value: any) => {
        if (typeof key === 'string' && key.startsWith('overlay.')) {
            const overlayKey = key.split('.')[1] as keyof GradientConfig['overlay'];
            setConfig({
                ...config,
                overlay: {
                    ...config.overlay,
                    [overlayKey]: value,
                }
            })
        } else {
            setConfig({ ...config, [key as keyof GradientConfig]: value });
        }
    };
    

    return (
        <Accordion type="multiple" defaultValue={['effects', 'overlay']} className="w-full space-y-4">
            <AccordionItem value="effects" className="border-b-0">
                <AccordionTrigger>{t('effects')}</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                    <ControlSlider label={t('grainAmount')} value={config.grainAmount} min={0} max={0.5} step={0.01} onValueChange={(v) => updateConfig('grainAmount', v)} />
                    <ControlSlider label={t('grainSize')} value={config.grainSize} min={0.1} max={10} step={0.1} onValueChange={(v) => updateConfig('grainSize', v)} />
                    <ControlSlider label={t('posterize')} value={config.posterize} min={2} max={256} step={1} onValueChange={(v) => updateConfig('posterize', v)} />
                    <ControlSlider label={t('scanlines')} value={config.scanlines} min={0} max={1} step={0.01} onValueChange={(v) => updateConfig('scanlines', v)} />
                    <ControlSlider label={t('scanlineWidth')} value={config.scanlineWidth} min={0.1} max={10} step={0.1} onValueChange={(v) => updateConfig('scanlineWidth', v)} />
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="overlay" className="border-b-0">
                 <AccordionTrigger>{t('overlay')}</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="overlay-enabled" checked={config.overlay.enabled} onCheckedChange={(c) => updateConfig('overlay.enabled', !!c)} />
                        <Label htmlFor="overlay-enabled">{t('enableOverlay')}</Label>
                    </div>
                    {config.overlay.enabled && (
                        <>
                            <ControlSlider label={t('blur')} value={config.overlay.blur} min={0} max={50} step={1} onValueChange={(v) => updateConfig('overlay.blur', v)} />
                            <ControlSlider label={t('lighten')} value={config.overlay.lighten} min={0} max={100} step={1} onValueChange={(v) => updateConfig('overlay.lighten', v)} />
                            <ControlSlider label={t('darken')} value={config.overlay.darken} min={0} max={100} step={1} onValueChange={(v) => updateConfig('overlay.darken', v)} />
                            <ControlSlider label={t('skewX')} value={config.overlay.skewX} min={-45} max={45} step={1} onValueChange={(v) => updateConfig('overlay.skewX', v)} />
                            <ControlSlider label={t('skewY')} value={config.overlay.skewY} min={-45} max={45} step={1} onValueChange={(v) => updateConfig('overlay.skewY', v)} />
                        </>
                    )}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="motion" className="border-b-0">
                <AccordionTrigger>{t('motion')}</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                    <div className="flex items-center space-x-2">
                        <Checkbox id="paused" checked={config.paused} onCheckedChange={(c) => updateConfig('paused', !!c)} />
                        <Label htmlFor="paused">{t('paused')}</Label>
                    </div>
                    {config.paused && (
                       <ControlSlider label={t('motion')} value={config.motion} min={0} max={100} step={1} onValueChange={(v) => updateConfig('motion', v)} />
                    )}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    );
}

function ControlSlider({ label, value, onValueChange, min, max, step }: { label: string, value: number, onValueChange: (v: number) => void, min: number, max: number, step: number }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between">
                <Label>{label}</Label>
                <span className="text-sm text-muted-foreground">{value.toFixed(2)}</span>
            </div>
            <CustomSlider value={value} onValueChange={onValueChange} min={min} max={max} step={step} />
        </div>
    )
}
