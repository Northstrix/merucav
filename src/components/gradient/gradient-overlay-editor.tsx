'use client';
import { GradientConfig } from "./types";
import { CustomSlider } from "../ui/custom-slider";
import { Label } from "../ui/label";
import { useTranslation } from "@/hooks/use-translation";
import CustomCheckbox from "@/components/CustomCheckbox";
import useIsRTL from "@/hooks/use-is-rtl";

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
    
    return (
        <div className="space-y-4 m-6">
            <CustomCheckbox
                id="enable-overlay"
                direction={isRTL ? "rtl" : "ltr"}
                checked={config.overlay.enabled}
                onChange={(checked) => updateConfig('enabled', !!checked)}
                label={t('enableOverlay')}
            />
            {config.overlay.enabled && (
                <>
                    <ControlSlider label={t('blur')} value={config.overlay.blur} min={0} max={100} step={0.1} onValueChange={(v) => updateConfig('blur', v)} isRTL={isRTL} />
                    <ControlSlider label={t('lighten')} value={config.overlay.lighten} min={0} max={1} step={0.01} onValueChange={(v) => updateConfig('lighten', v)} isRTL={isRTL} />
                    <ControlSlider label={t('darken')} value={config.overlay.darken} min={0} max={1} step={0.01} onValueChange={(v) => updateConfig('darken', v)} isRTL={isRTL} />
                    <ControlSlider label={t('skewX')} value={config.overlay.skewX} min={-45} max={45} step={0.1} onValueChange={(v) => updateConfig('skewX', v)} isRTL={isRTL} />
                    <ControlSlider label={t('skewY')} value={config.overlay.skewY} min={-45} max={45} step={0.1} onValueChange={(v) => updateConfig('skewY', v)} isRTL={isRTL} />
                </>
            )}
            <div className="space-y-4 pt-4">
                <ControlSlider label={t('grainAmount')} value={config.grainAmount} min={0} max={0.5} step={0.01} onValueChange={(v) => updateConfig('grainAmount', v)} isRTL={isRTL} />
                <ControlSlider label={t('grainSize')} value={config.grainSize} min={0.1} max={10} step={0.1} onValueChange={(v) => updateConfig('grainSize', v)} isRTL={isRTL} />
                <ControlSlider label={t('scanlines')} value={config.scanlines} min={0} max={1} step={0.01} onValueChange={(v) => updateConfig('scanlines', v)} isRTL={isRTL} />
                <ControlSlider label={t('scanlineWidth')} value={config.scanlineWidth} min={0.1} max={10} step={0.1} onValueChange={(v) => updateConfig('scanlineWidth', v)} isRTL={isRTL} />
                <CustomCheckbox
                    id="paused"
                    direction={isRTL ? "rtl" : "ltr"}
                    checked={config.paused}
                    onChange={(checked) => updateConfig('paused', !!checked)}
                    label={t('paused')}
                />
                {config.paused && (
                    <ControlSlider label={t('motion')} value={config.motion} min={0} max={100} step={0.1} onValueChange={(v) => updateConfig('motion', v)} isRTL={isRTL} />
                )}
            </div>
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
