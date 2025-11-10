

'use client';
import { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { XIcon } from 'lucide-react';
import { AnimatePresence } from 'framer-motion';

import { GradientConfig, OrbConfig, PositionOrigin, Unit, OrbShape } from './gradient-canvas';
import { Button } from '../ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { CustomSlider } from '../ui/custom-slider';
import { Label } from '../ui/label';
import CustomCheckbox from "@/components/CustomCheckbox";
import { FloatingLabelCombobox } from '../ui/floating-label-combobox';
import { Button as RadixButton } from '../ui/radixButton';
import { UnfoldingCard } from '../ui/unfolding-card';
import useIsRTL from '@/hooks/use-is-rtl';
import { useIsMobile } from '@/hooks/use-mobile';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/radixDialog';
import { ColorCard } from '../color-card';
import { ColorPaletteTools } from './color-palette-tools';
import { FloatingLabelInput } from '../ui/floating-label-input';


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
        { value: "none", label: t('none') },
        { value: "shift", label: t('shift') },
        { value: "rotate", label: t('rotation') },
        { value: "pulsate", label: t('pulsate') },
    ];

    const shapeOptions: {value: OrbShape, label: string}[] = [
        { value: 'rectangle', label: t('rectangle') },
        { value: 'triangle', label: t('triangle') },
        { value: 'star', label: t('star') },
    ];

     const fillModeOptions: {value: 'fill' | 'stroke', label: string}[] = [
        { value: 'fill', label: t('fill') },
        { value: 'stroke', label: t('stroke') },
    ];

    const positionOrigins: {value: PositionOrigin, label: string}[] = [
        { value: 'top-left', label: t('top-left') },
        { value: 'top-center', label: t('top-center') },
        { value: 'top-right', label: t('top-right') },
        { value: 'left-center', label: t('left-center') },
        { value: 'center', label: t('center') },
        { value: 'right-center', label: t('right-center') },
        { value: 'bottom-left', label: t('bottom-left') },
        { value: 'bottom-center', label: t('bottom-center') },
        { value: 'bottom-right', label: t('bottom-right') },
    ];

    const unitOptions: {value: Unit, label: string}[] = [
        { value: '%', label: '%' },
        { value: 'px', label: 'px' },
        { value: 'rem', label: 'rem' },
    ];


    const updateOrb = (id: string, newConfig: Partial<OrbConfig> | ((c:OrbConfig)=>Partial<OrbConfig>)) => {
        const newOrbs = config.orbs.map(orb => {
            if (orb.id === id) {
                const changes = typeof newConfig === 'function' ? newConfig(orb) : newConfig;
                return { ...orb, ...changes };
            }
            return orb;
        });
        setConfig({ ...config, orbs: newOrbs });
    };
    
    const updateTriangleAngle = (id: string, angle: 'A' | 'B', value: number) => {
        updateOrb(id, (currentOrb) => {
            const newAngles = {...currentOrb.triangle};
            if(angle === 'A') newAngles.angleA = value;
            if(angle === 'B') newAngles.angleB = value;

            const sum = newAngles.angleA + newAngles.angleB;
            if (sum >= 180) {
                if(angle === 'A') newAngles.angleA = 179 - newAngles.angleB;
                if(angle === 'B') newAngles.angleB = 179 - newAngles.angleA;
            }
            newAngles.angleC = 180 - newAngles.angleA - newAngles.angleB;

            return { triangle: newAngles };
        });
    }

    const handleAnimationModeChange = (orbId: string, newMode: 'none' | 'shift' | 'rotate' | 'pulsate') => {
        updateOrb(orbId, (currentOrb) => {
            const newAnimationConfig = { ...currentOrb.animation, mode: newMode };
            let newTransformOrigin = { ...currentOrb.transformOrigin };

            if (newMode === 'rotate' || newMode === 'pulsate') {
                newTransformOrigin = { x: 50, y: 50 };
            } else {
                 newTransformOrigin = { x: 0, y: 0 };
            }

            return {
                animation: newAnimationConfig,
                transformOrigin: newTransformOrigin,
            };
        });
    };


    const addOrb = () => {
        const newOrb: OrbConfig = {
            id: uuidv4(),
            key: uuidv4(),
            disabled: false,
            color: '#0A98F0',
            shape: 'rectangle',
            fillMode: 'fill',
            stroke: { width: 2 },
            width: 200,
            height: 120,
            sizeUnit: 'px',
            positionOrigin: 'center',
            xOffset: 0,
            yOffset: 0,
            offsetUnit: '%',
            zIndex: 1,
            borderRadius: { value: 24, unit: 'px' },
            triangle: { angleA: 60, angleB: 60, angleC: 60 },
            corrosion: 20,
            animation: {
                mode: 'shift',
                shift: {
                    extentX: 0,
                    extentY: 100,
                    duration: 2,
                },
                rotation: {
                    speed: 20,
                    direction: 'clockwise',
                },
            },
            transformOrigin: { x: 0, y: 0 },
            overflow: 0,
            pulsate: { enabled: false, minSize: 0.8, maxSize: 1.2, duration: 2, opacity: false },
        };
        setConfig({ ...config, orbs: [...config.orbs, newOrb] });
    };

    const handleColorSelected = (id: string, hex: string) => {
        updateOrb(id, { color: hex });
        setColorDialogId(null);
    }

    function extractAlphaFromHex(hex: string): number {
    if (hex.length === 9) {
        const a = parseInt(hex.slice(7, 9), 16);
        return +(a / 255).toFixed(2);
    }
    return 1;
    }

    function applyAlphaToHex(hex: string, alpha: number): string {
    const alphaHex = Math.round(alpha * 255).toString(16).padStart(2, '0');
    if (hex.length === 7) {
        return hex + alphaHex;
    }
    if (hex.length === 9) {
        return hex.slice(0, 7) + alphaHex;
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
            {isRTL ? (
            <RadixButton
                variant="destructive"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                e.stopPropagation();
                openConfirmDialog(t('confirmDeletion'), t('confirmDeletionOrb'), () => removeOrb(orb.id));
                }}
            >
            </RadixButton>
            ) : (
            <></>
            )}
        <CustomCheckbox
          id={`orb-disable-${orb.id}`}
          direction={isRTL ? "rtl" : "ltr"}
          checked={!orb.disabled}
          onChange={(checked) => updateOrb(orb.id, { disabled: !checked })}
          label={`${t('orb')} ${index + 1}`}
        />
            {!isRTL ? (
            <RadixButton
                variant="destructive"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                e.stopPropagation();
                openConfirmDialog(t('confirmDeletion'), t('confirmDeletionOrb'), () => removeOrb(orb.id));
                }}
            >
            </RadixButton>
            ) : (
            <></>
            )}
      </div>
    ),
      answer: (
        <div className='grid grid-cols-1 gap-y-4 pt-4'>
            <Dialog open={colorDialogId === orb.id} onOpenChange={(isOpen) => !isOpen && setColorDialogId(null)}>
              <DialogTrigger asChild>
                <div 
                onClick={() => setColorDialogId(orb.id)} 
                className="cursor-pointer"
                >
                <ColorCard hexColor={orb.color} id={orb.id} />
                </div>
              </DialogTrigger>
                <DialogContent className="max-w-[90vw] w-full md:max-w-6xl h-[80vh] flex flex-col">
                <DialogHeader>
                    <DialogTitle>{t('colorPalette')}</DialogTitle>
                </DialogHeader>
                {orb && (
                    <ColorPaletteTools
                    initialColor={orb.color}     // pass current orb's color in #RRGGBBAA format
                    onColorAdd={(hex) => handleColorSelected(orb.id, hex)}
                    />
                )}
                </DialogContent>
            </Dialog>

            <ControlSliderRow
              label={t('alpha')}
              value={extractAlphaFromHex(orb.color)}
              onValueChange={(val) => updateOrb(orb.id, { color: applyAlphaToHex(orb.color, val) })}
              min={0}
              max={1}
              step={0.01}
              isRTL={isRTL}
            />
            
            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('appearance')}</h3>
            <FloatingLabelCombobox label={t('shape')} value={orb.shape} onValueChange={v => updateOrb(orb.id, {shape: v as OrbShape})} options={shapeOptions} />
            
            {orb.shape === 'triangle' && (
                <div className='space-y-4 pt-2 border-t border-muted/20'>
                    <h4 className="text-sm font-medium" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('triangleAngles')}</h4>
                    <ControlSliderRow label={`${t('angle')} A`} value={orb.triangle.angleA} onValueChange={v => updateTriangleAngle(orb.id, 'A', v)} min={1} max={178} step={0.1} unit="°" isRTL={isRTL} />
                    <ControlSliderRow label={`${t('angle')} B`} value={orb.triangle.angleB} onValueChange={v => updateTriangleAngle(orb.id, 'B', v)} min={1} max={178} step={0.1} unit="°" isRTL={isRTL} />
                    <div className="flex justify-between text-sm text-muted-foreground" style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}>
                        <span>{`${t('angle')} C`}</span>
                        <span>{orb.triangle.angleC.toFixed(1)}°</span>
                    </div>
                </div>
            )}
            
            <FloatingLabelCombobox label={t('fillMode')} value={orb.fillMode} onValueChange={v => updateOrb(orb.id, {fillMode: v as 'fill' | 'stroke'})} options={fillModeOptions} />
            {orb.fillMode === 'stroke' && (
               <FloatingLabelInput label={`${t('strokeWidth')} (px)`} value={String(orb.stroke.width)} onValueChange={v => updateOrb(orb.id, { stroke: { width: Number(v) } })} type="number" />
            )}

            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('position')}</h3>
            <FloatingLabelCombobox label={t('positionOrigin')} value={orb.positionOrigin} onValueChange={v => updateOrb(orb.id, {positionOrigin: v as PositionOrigin})} options={positionOrigins} />
            
            <InputWithUnit t={t} label={t('offset') + " X"} value={orb.xOffset} onValueChange={v => updateOrb(orb.id, {xOffset: v})} unit={orb.offsetUnit} onUnitChange={u => updateOrb(orb.id, {offsetUnit: u as Unit})} unitOptions={unitOptions} />
            <InputWithUnit t={t} label={t('offset') + " Y"} value={orb.yOffset} onValueChange={v => updateOrb(orb.id, {yOffset: v})} unit={orb.offsetUnit} onUnitChange={u => updateOrb(orb.id, {offsetUnit: u as Unit})} unitOptions={unitOptions} />
            
            <div className='grid grid-cols-1 gap-y-4'>
                <InputWithUnit t={t} label={t('width')} value={orb.width} onValueChange={v => updateOrb(orb.id, {width: v})} unit={orb.sizeUnit} onUnitChange={u => updateOrb(orb.id, {sizeUnit: u as Unit})} unitOptions={unitOptions} />
                <InputWithUnit t={t} label={t('height')} value={orb.height} onValueChange={v => updateOrb(orb.id, {height: v})} unit={orb.sizeUnit} onUnitChange={u => updateOrb(orb.id, {sizeUnit: u as Unit})} unitOptions={unitOptions} />
            </div>

            {orb.shape === 'rectangle' && (
                 <InputWithUnit t={t} label={t('borderRadius')} value={orb.borderRadius.value} onValueChange={v => updateOrb(orb.id, { borderRadius: {...orb.borderRadius, value: v} })} unit={orb.borderRadius.unit} onUnitChange={u => updateOrb(orb.id, { borderRadius: {...orb.borderRadius, unit: u as Unit} })} unitOptions={unitOptions} />
            )}
            
            <FloatingLabelInput 
              label={t('zIndex')} 
              value={orb.zIndex === undefined ? '' : String(orb.zIndex)}
              onValueChange={v => updateOrb(orb.id, { zIndex: v === '' ? undefined : Number(v) })}
              type="number"
            />
            
            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('effects')}</h3>
            <ControlSliderRow label={t('corrosion')} value={orb.corrosion} onValueChange={v => updateOrb(orb.id, { corrosion: v })} min={0} max={100} step={0.1} isRTL={isRTL} />
            <ControlSliderRow label={t('overflow')} value={orb.overflow} onValueChange={v => updateOrb(orb.id, { overflow: v })} min={0} max={100} step={0.1} unit="%" isRTL={isRTL} />
        
            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('animation')}</h3>
            <FloatingLabelCombobox
                label={t('animation')}
                value={orb.animation.mode}
                onValueChange={(v) => handleAnimationModeChange(orb.id, v as any)}
                options={movementModes}
            />
            
            {orb.animation.mode === 'shift' && (
                 <>
                    <div className="space-y-3 pt-3 border-t border-muted/20">
                        <FloatingLabelInput label={`${t('extent')} X`} value={String(orb.animation.shift.extentX)} onValueChange={v => updateOrb(orb.id, { animation: { ...orb.animation, shift: { ...orb.animation.shift, extentX: Number(v) } } })} type="number" />
                        <FloatingLabelInput label={`${t('extent')} Y`} value={String(orb.animation.shift.extentY)} onValueChange={(v) => updateOrb(orb.id, { animation: { ...orb.animation, shift: { ...orb.animation.shift, extentY: Number(v) } } })} type="number" />
                        <FloatingLabelInput label={`${t('duration')} (s)`} value={String(orb.animation.shift.duration)} onValueChange={(v) => updateOrb(orb.id, { animation: { ...orb.animation, shift: { ...orb.animation.shift, duration: Number(v) } } })} type="number" />
                    </div>
                 </>
            )}

            {(orb.animation.mode === 'rotate' || orb.animation.mode === 'pulsate') && (
                 <>
                    <ControlSliderRow label={t('transformOriginX')} value={orb.transformOrigin.x} onValueChange={v => updateOrb(orb.id, { transformOrigin: { ...orb.transformOrigin, x: v } })} min={-100} max={200} step={0.1} unit="%" isRTL={isRTL} />
                    <ControlSliderRow label={t('transformOriginY')} value={orb.transformOrigin.y} onValueChange={v => updateOrb(orb.id, { transformOrigin: { ...orb.transformOrigin, y: v } })} min={-100} max={200} step={0.1} unit="%" isRTL={isRTL} />
                 </>
            )}

            {orb.animation.mode === 'rotate' && (
                 <RotationSection
                    t={t}
                    isRTL={isRTL}
                    rotation={orb.animation.rotation}
                    onDirectionChange={v => updateOrb(orb.id, (o) => ({ animation: { ...o.animation, rotation: { ...o.animation.rotation, direction: v } } }))}
                    onSpeedChange={v => updateOrb(orb.id, (o) => ({ animation: { ...o.animation, rotation: { ...o.animation.rotation, speed: v } } }))}
                 />
            )}
            
            {orb.animation.mode === 'pulsate' && (
                <PulsateSection
                    t={t}
                    isRTL={isRTL}
                    pulsate={orb.pulsate}
                    onMinSizeChange={v => updateOrb(orb.id, (o) => ({ pulsate: { ...o.pulsate, minSize: v } }))}
                    onMaxSizeChange={v => updateOrb(orb.id, (o) => ({ pulsate: { ...o.pulsate, maxSize: v } }))}
                    onDurationChange={v => updateOrb(orb.id, (o) => ({ pulsate: { ...o.pulsate, duration: v } }))}
                    onOpacityChange={v => updateOrb(orb.id, (o) => ({ pulsate: { ...o.pulsate, opacity: v } }))}
                />
            )}
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
        <div className="space-y-2">
            <div className="flex justify-between" dir={isRTL ? 'rtl' : 'ltr'}>
                <Label>{label}</Label>
                <span className="text-sm text-muted-foreground">{value.toFixed(step < 1 ? 2 : 1)}{unit}</span>
            </div>
            <CustomSlider value={value} onValueChange={onValueChange} min={min} max={max} step={step} isRTL={isRTL} />
        </div>
    )
}

function InputWithUnit({ t, label, value, onValueChange, unit, onUnitChange, unitOptions }: { t: (key: string) => string; label: string; value: number; onValueChange: (v: number) => void; unit: string; onUnitChange: (u: string) => void; unitOptions: {value: string, label: string}[] }) {
    return (
        <div className="grid grid-cols-3 gap-2 items-start">
            <div className="col-span-2">
                <FloatingLabelInput label={label} value={String(value)} onValueChange={v => onValueChange(Number(v))} type="number" />
            </div>
            <div className="col-span-1">
                 <FloatingLabelCombobox label={t('unit')} value={unit} onValueChange={onUnitChange} options={unitOptions} />
            </div>
        </div>
    )
}

interface RotationSectionProps {
    t: (key: string) => string;
    isRTL: boolean;
    rotation: { speed: number; direction: 'clockwise' | 'counter-clockwise' };
    onDirectionChange: (v: 'clockwise' | 'counter-clockwise') => void;
    onSpeedChange: (v: number) => void;
}

function RotationSection({ t, rotation, onDirectionChange, onSpeedChange, isRTL }: RotationSectionProps) {
    const rotationDirections = [
        { value: "clockwise", label: t('clockwise') },
        { value: "counter-clockwise", label: t('counterClockwise') },
    ];
    return (
        <div className="space-y-3 pt-3 border-t border-muted/20">
            <FloatingLabelCombobox
                label={t('direction')}
                value={rotation.direction}
                onValueChange={onDirectionChange as (v:string)=>void}
                options={rotationDirections}
            />
            <FloatingLabelInput label={`${t('duration')} (s)`} value={String(rotation.speed)} onValueChange={(v) => onSpeedChange(Number(v))} type="number" />
        </div>
    )
}


interface PulsateSectionProps {
    t: (key: string) => string;
    pulsate: OrbConfig['pulsate'];
    onMinSizeChange: (v: number) => void;
    onMaxSizeChange: (v: number) => void;
    onDurationChange: (v: number) => void;
    onOpacityChange: (v: boolean) => void;
    isRTL: boolean;
}

function PulsateSection({ t, pulsate, onMinSizeChange, onMaxSizeChange, onDurationChange, onOpacityChange, isRTL }: PulsateSectionProps) {
    return (
        <div className="space-y-3 pt-3 border-t border-muted/20">
            <ControlSliderRow label={t('minSize')} value={pulsate.minSize} onValueChange={onMinSizeChange} min={0} max={2} step={0.1} unit="x" isRTL={isRTL} />
            <ControlSliderRow label={t('maxSize')} value={pulsate.maxSize} onValueChange={onMaxSizeChange} min={0} max={3} step={0.1} unit="x" isRTL={isRTL} />
            <FloatingLabelInput label={`${t('duration')} (s)`} value={String(pulsate.duration)} onValueChange={(v) => onDurationChange(Number(v))} type="number" />
        </div>
    )
}

