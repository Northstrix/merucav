'use client';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { GradientConfig } from "./types";
import { CustomSlider } from "../ui/custom-slider";
import { Label } from "../ui/label";
import { useTranslation } from "@/hooks/use-translation";
import { Checkbox } from "../ui/checkbox";
import { FloatingLabelCombobox } from "../ui/floating-label-combobox";

interface GradientControlsProps {
    config: GradientConfig;
    setConfig: (config: GradientConfig) => void;
}

export function GradientControls({ config, setConfig }: GradientControlsProps) {
    const { t } = useTranslation();
    const updateConfig = (key: keyof GradientConfig, value: any) => {
        setConfig({ ...config, [key]: value });
    };

    const movementModes = [
        { value: "0", label: t('default') },
        { value: "1", label: t('linear') },
        { value: "2", label: t('vortex') },
        { value: "3", label: t('resonance') },
        { value: "4", label: t('perturbation') },
        { value: "5", label: t('burst') },
        { value: "6", label: t('flow') },
        { value: "7", label: t('static') },
    ];

    return (
        <Accordion type="multiple" defaultValue={['parameters', 'color', 'shaping']} className="w-full space-y-4">
            <AccordionItem value="parameters" className="border-b-0">
                <AccordionTrigger>{t('parameters')}</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                    <ControlSlider label={t('scale')} value={config.scale} min={1} max={20} step={0.5} onValueChange={(v) => updateConfig('scale', v)} />
                    <ControlSlider label={t('phaseX')} value={config.phaseX} min={0} max={2} step={0.01} onValueChange={(v) => updateConfig('phaseX', v)} />
                    <ControlSlider label={t('velocity')} value={config.velocity} min={0} max={5} step={0.1} onValueChange={(v) => updateConfig('velocity', v)} />
                    <ControlSlider label={t('detail')} value={config.detail} min={10} max={1000} step={5} onValueChange={(v) => updateConfig('detail', v)} />
                    <ControlSlider label={t('twist')} value={config.twist} min={0} max={100} step={1} onValueChange={(v) => updateConfig('twist', v)} />
                    <ControlSlider label={t('speed')} value={config.speed} min={0} max={10} step={0.1} onValueChange={(v) => updateConfig('speed', v)} />
                    <div className="space-y-2">
                        <Label>{t('movementMode')}</Label>
                        <FloatingLabelCombobox 
                            label={t('movementMode')}
                            value={String(config.movementMode)} 
                            onValueChange={(v) => updateConfig('movementMode', Number(v))}
                            options={movementModes}
                        />
                    </div>
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="color" className="border-b-0">
                <AccordionTrigger>{t('color')}</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                    <ControlSlider label={t('hue')} value={config.hue} min={0} max={360} step={1} onValueChange={(v) => updateConfig('hue', v)} />
                    <ControlSlider label={t('saturation')} value={config.saturation} min={0} max={2} step={0.01} onValueChange={(v) => updateConfig('saturation', v)} />
                    <ControlSlider label={t('brightness')} value={config.brightness} min={0} max={2} step={0.01} onValueChange={(v) => updateConfig('brightness', v)} />
                    <ControlSlider label={t('contrast')} value={config.contrast} min={0} max={2} step={0.01} onValueChange={(v) => updateConfig('contrast', v)} />
                    <ControlSlider label={t('rgbR')} value={config.rgbR} min={0} max={2} step={0.01} onValueChange={(v) => updateConfig('rgbR', v)} />
                    <ControlSlider label={t('rgbG')} value={config.rgbG} min={0} max={2} step={0.01} onValueChange={(v) => updateConfig('rgbG', v)} />
                    <ControlSlider label={t('rgbB')} value={config.rgbB} min={0} max={2} step={0.01} onValueChange={(v) => updateConfig('rgbB', v)} />
                    <ControlSlider label={t('colorOffset')} value={config.colorOffset} min={-1} max={1} step={0.01} onValueChange={(v) => updateConfig('colorOffset', v)} />
                </AccordionContent>
            </AccordionItem>
             <AccordionItem value="shaping" className="border-b-0">
                <AccordionTrigger>{t('quadratic')}</AccordionTrigger>
                <AccordionContent className="space-y-4 pt-4">
                     <div className="flex items-center space-x-2">
                        <Checkbox id="use-quadratic" checked={config.useQuadratic} onCheckedChange={(c) => updateConfig('useQuadratic', !!c)} />
                        <Label htmlFor="use-quadratic">{t('useQuadratic')}</Label>
                    </div>
                    {config.useQuadratic && (
                        <ControlSlider label={t('aperture')} value={config.aperture} min={0} max={1} step={0.01} onValueChange={(v) => updateConfig('aperture', v)} />
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
