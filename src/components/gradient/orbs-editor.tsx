'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { GripVertical, XIcon } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import { GradientConfig, OrbConfig } from './gradient-canvas';
import { Button } from '../ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { CustomSlider } from '../ui/custom-slider';
import { Label } from '../ui/label';
import CustomCheckbox from "@/components/CustomCheckbox";
import { FloatingLabelCombobox } from '../ui/floating-label-combobox';
import { Button as RadixButton } from '../ui/radixButton';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Input } from '../ui/input';
import { UnfoldingCard } from '../ui/unfolding-card';
import useIsRTL from '@/hooks/use-is-rtl';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/radixDialog';
import { ColorCard } from '../color-card';
import { ColorPaletteTools } from './color-palette-tools';


interface OrbsEditorProps {
  config: GradientConfig;
  setConfig: (config: GradientConfig) => void;
  openConfirmDialog: (title: string, description: string, onConfirm: () => void) => void;
}

export function OrbsEditor({ config, setConfig, openConfirmDialog }: OrbsEditorProps) {
    const { t } = useTranslation();
    const isRTL = useIsRTL();
    const isMobile = useIsMobile();

    const [openId, setOpenId] = useState<string | null>(null);
    const [colorDialogId, setColorDialogId] = useState<string | null>(null);
    
    const movementModes = [
        { value: "shift", label: t('shift') },
        { value: "rotate", label: t('rotation') },
    ];


    const updateOrb = (id: string, newConfig: Partial<OrbConfig>) => {
        const newOrbs = config.orbs.map(orb => 
            orb.id === id ? { ...orb, ...newConfig } : orb
        );
        setConfig({ ...config, orbs: newOrbs });
    };

    const updateOrbAnimation = (id: string, animType: 'shift' | 'rotation', key: string, value: any) => {
        const newOrbs = config.orbs.map(orb => {
            if (orb.id === id) {
                return {
                    ...orb,
                    animation: {
                        ...orb.animation,
                        [animType]: {
                            ...(orb.animation as any)[animType],
                            [key]: value
                        }
                    }
                }
            }
            return orb;
        });
        setConfig({ ...config, orbs: newOrbs });
    };

    const updateOrbPulsate = (id: string, key: string, value: any) => {
        const newOrbs = config.orbs.map(orb => {
            if (orb.id === id) {
                return {
                    ...orb,
                    pulsate: {
                        ...orb.pulsate,
                        [key]: value
                    }
                }
            }
            return orb;
        });
        setConfig({ ...config, orbs: newOrbs });
    }

    const addOrb = () => {
        const newOrb: OrbConfig = {
            id: uuidv4(),
            key: uuidv4(),
            disabled: false,
            color: '#FF00FF80',
            width: 50,
            height: 50,
            borderRadius: { value: 50, unit: '%' },
            x: Math.random() * 80 + 10,
            y: Math.random() * 80 + 10,
            corrosion: 20,
            animation: {
                mode: 'rotate',
                shift: {
                    extentX: 50,
                    extentY: 0,
                    duration: 20,
                },
                rotation: {
                    speed: 20,
                    direction: 'clockwise',
                },
            },
            transformOrigin: { x: 50, y: 50 },
            overflow: 0,
            pulsate: { enabled: false, minSize: 0.8, maxSize: 1.2, duration: 2, opacity: false },
        };
        setConfig({ ...config, orbs: [...config.orbs, newOrb] });
    };

    const handleColorSelected = (id: string, hex: string) => {
        updateOrb(id, { color: hex });
        setColorDialogId(null);
    }

    // Add a helper to extract alpha from hex color with alpha
    function extractAlphaFromHex(hex: string): number {
    if (hex.length === 9) { // #RRGGBBAA format
        const a = parseInt(hex.slice(7, 9), 16);
        return +(a / 255).toFixed(2);
    }
    return 1;
    }

    // Add a helper to apply alpha to a hex string
    function applyAlphaToHex(hex: string, alpha: number): string {
    if (hex.length === 7) { // #RRGGBB
        const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
        return hex + alphaHex;
    }
    if (hex.length === 9) {
        return hex.slice(0, 7) + Math.round(alpha * 255).toString(16).padStart(2, '0');
    }
    return hex;
    }
    
  const removeOrb = (id: string) => {
    setConfig({ ...config, orbs: config.orbs.filter((orb) => orb.id !== id) });
  };

  const orbItems = config.orbs.map((orb, index) => ({
    id: orb.id,
    question: (
      <div className="flex items-center gap-2 flex-grow w-full" onClick={(e) => e.stopPropagation()}>
        <CustomCheckbox
          id={`orb-disable-${orb.id}`}
          direction={isRTL ? 'rtl' : 'ltr'}
          checked={!orb.disabled}
          onChange={(checked) => updateOrb(orb.id, { disabled: !checked })}
          label={`${t('orb')} ${index + 1}`}
        />

        <div className="flex items-center gap-2">
          <RadixButton
            variant="destructive"
            size="icon"
            className="h-6 w-6"
            onClick={(e) => {
              e.stopPropagation();
              openConfirmDialog(t('confirmDeletion'), t('confirmDeletionOrb'), () => removeOrb(orb.id));
            }}
          >
            <XIcon size={14} />
          </RadixButton>
        </div>
      </div>
    ),
      answer: (
        <div className='grid grid-cols-1 gap-y-4 pt-4'>
            <Dialog open={colorDialogId === orb.id} onOpenChange={(isOpen) => !isOpen && setColorDialogId(null)}>
              <DialogTrigger asChild>
                <div onClick={() => setColorDialogId(orb.id)} className="cursor-pointer">
                  <ColorCard hexColor={orb.color} id={orb.id} />
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] w-full md:max-w-6xl h-[80vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle>{t('colorPalette')}</DialogTitle>
                </DialogHeader>
                <ColorPaletteTools onColorAdd={(hex) => handleColorSelected(orb.id, hex)} />
              </DialogContent>
            </Dialog>

            {/* Add alpha control just below the ColorCard */}
            <ControlSliderRow
              label={t('alpha')}
              value={extractAlphaFromHex(orb.color)}
              onValueChange={(val) => updateOrb(orb.id, { color: applyAlphaToHex(orb.color, val) })}
              min={0}
              max={1}
              step={0.01}
              isRTL={isRTL}
            />
            <ControlSliderRow label={t('width')} value={orb.width} onValueChange={v => updateOrb(orb.id, { width: v })} min={1} max={200} step={1} unit="vmin" isRTL={isRTL} />
            <ControlSliderRow label={t('height')} value={orb.height} onValueChange={v => updateOrb(orb.id, { height: v })} min={1} max={200} step={1} unit="vmin" isRTL={isRTL} />
            
            <div className="grid grid-cols-3 items-center gap-4">
                <Label className="col-span-1" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('borderRadius')}</Label>
                <div className="col-span-2 flex gap-2">
                    <Input type='number' value={orb.borderRadius.value} onChange={e => updateOrb(orb.id, { borderRadius: { ...orb.borderRadius, value: Number(e.target.value) } })} className='w-2/3' />
                    <Select value={orb.borderRadius.unit} onValueChange={u => updateOrb(orb.id, { borderRadius: { ...orb.borderRadius, unit: u as any } })}>
                        <SelectTrigger className='w-1/3'>
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="%">%</SelectItem>
                            <SelectItem value="px">px</SelectItem>
                            <SelectItem value="rem">rem</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <ControlSliderRow label="X" value={orb.x} onValueChange={v => updateOrb(orb.id, { x: v })} min={-50} max={150} step={1} unit="%" isRTL={isRTL} />
            <ControlSliderRow label="Y" value={orb.y} onValueChange={v => updateOrb(orb.id, { y: v })} min={-50} max={150} step={1} unit="%" isRTL={isRTL} />
            <ControlSliderRow label={t('corrosion')} value={orb.corrosion} onValueChange={v => updateOrb(orb.id, { corrosion: v })} min={0} max={100} step={1} isRTL={isRTL} />
            <ControlSliderRow label={t('overflow')} value={orb.overflow} onValueChange={v => updateOrb(orb.id, { overflow: v })} min={0} max={100} step={1} unit="%" isRTL={isRTL} />
        
            <FloatingLabelCombobox
                parentBackground="var(--card)"
                label={t('animation')}
                value={orb.animation.mode}
                onValueChange={(v) => updateOrb(orb.id, { animation: { ...orb.animation, mode: v as any }})}
                options={movementModes}
            />
            
            {orb.animation.mode === 'shift' && (
                <AnimationSection
                    t={t}
                    title={t('shift')}
                    anim={orb.animation.shift} 
                    onExtentXChange={v => updateOrbAnimation(orb.id, 'shift', 'extentX', v)}
                    onExtentYChange={v => updateOrbAnimation(orb.id, 'shift', 'extentY', v)}
                    onDurationChange={v => updateOrbAnimation(orb.id, 'shift', 'duration', v)}
                    isRTL={isRTL}
                />
            )}

            {orb.animation.mode === 'rotate' && (
                 <RotationSection
                    t={t}
                    title={t('rotation')}
                    rotation={orb.animation.rotation}
                    onDirectionChange={v => updateOrbAnimation(orb.id, 'rotation', 'direction', v)}
                    onSpeedChange={v => updateOrbAnimation(orb.id, 'rotation', 'speed', v)}
                    isRTL={isRTL}
                />
            )}
            
            <PulsateSection
                t={t}
                pulsate={orb.pulsate}
                onEnabledChange={v => updateOrbPulsate(orb.id, 'enabled', v)}
                onMinSizeChange={v => updateOrbPulsate(orb.id, 'minSize', v)}
                onMaxSizeChange={v => updateOrbPulsate(orb.id, 'maxSize', v)}
                onDurationChange={v => updateOrbPulsate(orb.id, 'duration', v)}
                onOpacityChange={v => updateOrbPulsate(orb.id, 'opacity', v)}
                isRTL={isRTL}
            />

            <ControlSliderRow label={t('transformOriginX')} value={orb.transformOrigin.x} onValueChange={v => updateOrb(orb.id, { transformOrigin: { ...orb.transformOrigin, x: v } })} min={-100} max={200} step={1} unit="%" isRTL={isRTL} />
            <ControlSliderRow label={t('transformOriginY')} value={orb.transformOrigin.y} onValueChange={v => updateOrb(orb.id, { transformOrigin: { ...orb.transformOrigin, y: v } })} min={-100} max={200} step={1} unit="%" isRTL={isRTL} />
        </div>
      ),
    }));

    return (
        <div className="space-y-4 m-6">
            <div className="space-y-4">
                <AnimatePresence>
                    {config.orbs.map((orb) => (
                        <div 
                            key={orb.id} 
                            className="bg-muted/30 rounded-lg relative"
                        >
                            <UnfoldingCard 
                                faqs={orbItems.filter(item => item.id === orb.id)}
                                openId={openId}
                                setOpenId={setOpenId}
                                isRTL={isRTL}
                                isMobile={isMobile}
                            />
                            <div className="absolute bottom-2 cursor-grab" style={{[isRTL ? 'left' : 'right']: '0.5rem'}} onPointerDown={(e) => e.stopPropagation()}>
                                <GripVertical className="text-muted-foreground/50" size={18}/>
                            </div>
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            <Button onClick={addOrb} className="w-full">{t('addOrb')}</Button>
        </div>
    )
}


function ControlSliderRow({ label, value, onValueChange, min, max, step, unit='', isRTL }: { label: string, value: number, onValueChange: (v: number) => void, min: number, max: number, step: number, unit?:string, isRTL: boolean }) {
    return (
        <div className="grid grid-cols-3 items-center gap-4">
            <Label className="col-span-1" style={{textAlign: isRTL ? 'right' : 'left'}}>{label}</Label>
            <div className="col-span-2">
                <div className="flex justify-between items-center mb-1">
                    <span className="text-sm text-muted-foreground">{value.toFixed(step < 1 ? 2 : 0)}{unit}</span>
                </div>
                <CustomSlider value={value} onValueChange={onValueChange} min={min} max={max} step={step} isRTL={isRTL} />
            </div>
        </div>
    )
}

interface AnimationSectionProps {
    t: (key: string) => string;
    title: string;
    anim: { extentX: number; extentY: number; duration: number };
    onExtentXChange: (v: number) => void;
    onExtentYChange: (v: number) => void;
    onDurationChange: (v: number) => void;
    isRTL: boolean;
}

function AnimationSection({ t, title, anim, onExtentXChange, onExtentYChange, onDurationChange, isRTL }: AnimationSectionProps) {
    return (
        <div className="space-y-3 pt-3 border-t border-muted/20">
            <Label className="font-semibold" style={{textAlign: isRTL ? 'right' : 'left'}}>{title} {t('animation')}</Label>
            <ControlSliderRow label={`${t('extent')} X`} value={anim.extentX} onValueChange={onExtentXChange} min={-200} max={200} step={1} unit="%" isRTL={isRTL} />
            <ControlSliderRow label={`${t('extent')} Y`} value={anim.extentY} onValueChange={onExtentYChange} min={-200} max={200} step={1} unit="%" isRTL={isRTL} />
            <ControlSliderRow label={t('duration')} value={anim.duration} onValueChange={onDurationChange} min={1} max={60} step={0.5} unit="s" isRTL={isRTL} />
        </div>
    )
}


interface RotationSectionProps {
    t: (key: string) => string;
    title: string;
    rotation: { speed: number; direction: 'clockwise' | 'counter-clockwise' };
    onDirectionChange: (v: 'clockwise' | 'counter-clockwise') => void;
    onSpeedChange: (v: number) => void;
    isRTL: boolean;
}

function RotationSection({ t, title, rotation, onDirectionChange, onSpeedChange, isRTL }: RotationSectionProps) {
    const rotationDirections = [
        { value: "clockwise", label: t('clockwise') },
        { value: "counter-clockwise", label: t('counterClockwise') },
    ];
    return (
        <div className="space-y-3 pt-3 border-t border-muted/20">
            <Label className="font-semibold" style={{textAlign: isRTL ? 'right' : 'left'}}>{title} {t('animation')}</Label>
            <FloatingLabelCombobox
                parentBackground="var(--card)"
                label={t('direction')}
                value={rotation.direction}
                onValueChange={onDirectionChange as (v:string)=>void}
                options={rotationDirections}
            />
            <ControlSliderRow label={t('speed')} value={rotation.speed} onValueChange={onSpeedChange} min={1} max={60} step={1} unit="s" isRTL={isRTL} />
        </div>
    )
}


interface PulsateSectionProps {
    t: (key: string) => string;
    pulsate: OrbConfig['pulsate'];
    onEnabledChange: (v: boolean) => void;
    onMinSizeChange: (v: number) => void;
    onMaxSizeChange: (v: number) => void;
    onDurationChange: (v: number) => void;
    onOpacityChange: (v: boolean) => void;
    isRTL: boolean;
}

function PulsateSection({ t, pulsate, onEnabledChange, onMinSizeChange, onMaxSizeChange, onDurationChange, onOpacityChange, isRTL }: PulsateSectionProps) {
    return (
        <div className="space-y-3 pt-3 border-t border-muted/20">
            <CustomCheckbox
            id="pulsate-checkbox"
            direction={isRTL ? "rtl" : "ltr"}
            checked={pulsate.enabled}
            onChange={(checked) => onEnabledChange(!!checked)}
            label={t('pulsate')}
            />

            {pulsate.enabled && (
                <>
                    <ControlSliderRow label={t('minSize')} value={pulsate.minSize} onValueChange={onMinSizeChange} min={0} max={2} step={0.1} unit="x" isRTL={isRTL} />
                    <ControlSliderRow label={t('maxSize')} value={pulsate.maxSize} onValueChange={onMaxSizeChange} min={0} max={3} step={0.1} unit="x" isRTL={isRTL} />
                    <ControlSliderRow label={t('duration')} value={pulsate.duration} onValueChange={onDurationChange} min={0.1} max={10} step={0.1} unit="s" isRTL={isRTL} />
                    <CustomCheckbox
                    id="animate-opacity-checkbox"
                    direction={isRTL ? "rtl" : "ltr"}
                    checked={pulsate.opacity}
                    onChange={(checked) => onOpacityChange(!!checked)}
                    label={t('animateOpacity')}
                    />

                </>
            )}
        </div>
    )
}
