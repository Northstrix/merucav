'use client';
import React, { useState, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence } from 'framer-motion';

import { GradientConfig, ShapeConfig, PositionOrigin, Unit, ShapeType } from './gradient-canvas';
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
import { Separator } from '../ui/separator';


interface ShapesEditorProps {
  config: GradientConfig;
  setConfig: (config: GradientConfig) => void;
  openConfirmDialog: (title: string, description: string, onConfirm: () => void) => void;
}

export function ShapesEditor({ config, setConfig, openConfirmDialog }: ShapesEditorProps) {
    const { t } = useTranslation();
    const isRTL = useIsRTL();
    const isMobile = useIsMobile();

    const [openId, setOpenId] = useState<string | null>(null);
    const [colorDialogId, setColorDialogId] = useState<string | null>(null);
    
    const animationModes = [
        { value: "none", label: t('none') },
        { value: "shift", label: t('shift') },
        { value: "rotate", label: t('rotation') },
        { value: "pulsate", label: t('pulsate') },
    ];

    const shapeOptions: {value: ShapeType, label: string}[] = [
        { value: 'rectangle', label: t('rectangle') },
        { value: 'triangle', label: t('triangle') },
        { value: 'star', label: t('star') },
        { value: 'beam', label: t('beam') },
        { value: 'quadratic', label: t('quadratic') },
        { value: 'half-circle', label: t('half-circle') },
    ];

     const fillModeOptions: {value: 'fill' | 'stroke' | 'gradient', label: string}[] = [
        { value: 'fill', label: t('fill') },
        { value: 'stroke', label: t('stroke') },
        { value: 'gradient', label: t('gradient') },
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

    const shapes = config.shapes || config.orbs || [];


    const updateShape = (id: string, newConfig: Partial<ShapeConfig> | ((c:ShapeConfig)=>Partial<ShapeConfig>)) => {
        const newShapes = (shapes).map(shape => {
            if (shape.id === id) {
                const changes = typeof newConfig === 'function' ? newConfig(shape) : newConfig;

                 if (changes.fillMode === 'gradient' && !shape.gradient) {
                    changes.gradient = { 
                        colors: [
                            {id: uuidv4(), color: '#0A98F0', stop: 0},
                            {id: uuidv4(), color: '#D50AF0', stop: 100}
                        ], 
                        angle: 90 
                    };
                }

                if (changes.triangle) {
                    const currentTriangle = shape.triangle || { angleA: 60, angleB: 60, height: 100, base: 100, angleC: 60 };
                    const { angleA, angleB } = { ...currentTriangle, ...changes.triangle };
                    changes.triangle.angleC = 180 - angleA - angleB;
                }
                return { ...shape, ...changes };
            }
            return shape;
        });
        setConfig({ ...config, shapes: newShapes });
    };

    const handleAnimationModeChange = (shapeId: string, newMode: 'none' | 'shift' | 'rotate' | 'pulsate') => {
        updateShape(shapeId, (currentShape) => {
            const newAnimationConfig = { ...currentShape.animation, mode: newMode };
            let newTransformOrigin = { ...currentShape.transformOrigin };

            if (newMode === 'rotate' || newMode === 'pulsate') {
                newTransformOrigin = { x: 50, y: 50 };
            }
            
            if (newMode === 'pulsate' && !newAnimationConfig.pulsate) {
                newAnimationConfig.pulsate = { minSize: 0.8, maxSize: 1.2, duration: 2 };
            }

            return {
                animation: newAnimationConfig,
                transformOrigin: newTransformOrigin,
            };
        });
    };

    const handleColorSelected = (id: string, hex: string, isGradient?: boolean, gradIndex?: number) => {
        if (isGradient && gradIndex !== undefined) {
            updateShape(id, (current) => {
                const newGradient = { ...(current.gradient || { colors: [], angle: 90 }) };
                const newColors = [...newGradient.colors];
                newColors[gradIndex] = { ...newColors[gradIndex], color: hex };
                return { gradient: { ...newGradient, colors: newColors }};
            })
        } else {
            updateShape(id, { color: hex });
        }
        setColorDialogId(null);
    }
    
    const addGradientColor = (shapeId: string) => {
        updateShape(shapeId, current => {
            const newGradient = current.gradient || { colors: [], angle: 90 };
            const newColors = [...newGradient.colors, { id: uuidv4(), color: '#FFFFFF', stop: 100 }];
            return { gradient: { ...newGradient, colors: newColors }};
        })
    }
    
    const removeGradientColor = (shapeId: string, colorId: string) => {
        updateShape(shapeId, current => {
            if (!current.gradient) return {};
            const newColors = current.gradient.colors.filter(c => c.id !== colorId);
            return { gradient: { ...current.gradient, colors: newColors } };
        })
    }

    const addShape = () => {
        const newShape: ShapeConfig = {
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
            offsetUnit: 'px',
            zIndex: 1,
            borderRadius: { value: 24, unit: 'px' },
            triangle: { angleA: 60, angleB: 60, angleC: 60, height: 100, base: 100 },
            beam: { spreadStart: 50, spreadEnd: 100 },
            quadratic: { aperture: 0.5 },
            gradient: { colors: [{id: uuidv4(), color: '#0A98F0', stop: 0}, {id: uuidv4(), color: '#D50AF0', stop: 100}], angle: 90 },
            rotation: 0,
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
                pulsate: {
                    minSize: 0.8,
                    maxSize: 1.2,
                    duration: 2,
                },
            },
            transformOrigin: { x: 50, y: 50 },
            overflow: 0,
        };
        setConfig({ ...config, shapes: [...shapes, newShape] });
    };

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
    
  const removeShape = (id: string) => {
    setConfig({ ...config, shapes: (shapes).filter((shape) => shape.id !== id) });
  };

  const shapeItems = (shapes).map((shape, index) => ({
    id: shape.id,
    question: (
      <div className="flex items-center gap-2 flex-grow w-full" onClick={(e) => e.stopPropagation()}>
            <RadixButton
                variant="destructive"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                e.stopPropagation();
                openConfirmDialog(t('confirmDeletion'), t('confirmDeletionShape'), () => removeShape(shape.id));
                }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6 L18 18 M18 6 L6 18"></path></svg>
            </RadixButton>
        <CustomCheckbox
          id={`shape-disable-${shape.id}`}
          direction={isRTL ? "rtl" : "ltr"}
          checked={!shape.disabled}
          onChange={(checked) => updateShape(shape.id, { disabled: !checked })}
          label={`${t('shape')} ${index + 1}`}
        />
      </div>
    ),
      answer: (
        <div className='grid grid-cols-1 gap-y-4 pt-4'>
            {shape.fillMode !== 'gradient' && (
                <Dialog open={colorDialogId === shape.id} onOpenChange={(isOpen) => !isOpen && setColorDialogId(null)}>
                <DialogTrigger asChild>
                    <div 
                    onClick={() => setColorDialogId(shape.id)} 
                    className="cursor-pointer"
                    >
                    <ColorCard hexColor={shape.color} id={shape.id} isPointerCursorOnHover={true}/>
                    </div>
                </DialogTrigger>
                    <DialogContent className="max-w-[90vw] w-full md:max-w-6xl h-[80vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>{t('colorPalette')}</DialogTitle>
                    </DialogHeader>
                    {shape && (
                        <ColorPaletteTools
                        initialColor={shape.color}
                        onColorAdd={(hex) => handleColorSelected(shape.id, hex)}
                        />
                    )}
                    </DialogContent>
                </Dialog>
            )}

            <ControlSliderRow
              id={`shape-alpha-${shape.id}`}
              label={t('alpha')}
              value={extractAlphaFromHex(shape.color)}
              onValueChange={(val) => updateShape(shape.id, { color: applyAlphaToHex(shape.color, val) })}
              min={0}
              max={1}
              step={0.01}
              isRTL={isRTL}
            />
            
            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('appearance')}</h3>
            <FloatingLabelCombobox label={t('shape')} value={shape.shape} onValueChange={v => updateShape(shape.id, {shape: v as ShapeType})} options={shapeOptions} />
            
            {shape.shape === 'triangle' && (
                <div className='space-y-4 pt-2 border-t border-muted/20'>
                    <ControlSliderRow id={`shape-angleA-${shape.id}`} label={`${t('angle')} A`} value={shape.triangle.angleA} onValueChange={v => updateShape(shape.id, {triangle: {...shape.triangle, angleA: v}})} min={1} max={178} step={0.1} unit="°" isRTL={isRTL} />
                    <CustomSlider id={`shape-angleA-slider-${shape.id}`} value={shape.triangle.angleA} onValueChange={v => updateShape(shape.id, {triangle: {...shape.triangle, angleA: v}})} min={1} max={178} step={0.1} isRTL={isRTL} />
                    <ControlSliderRow id={`shape-angleB-${shape.id}`} label={`${t('angle')} B`} value={shape.triangle.angleB} onValueChange={v => updateShape(shape.id, {triangle: {...shape.triangle, angleB: v}})} min={1} max={178} step={0.1} unit="°" isRTL={isRTL} />
                    <CustomSlider id={`shape-angleB-slider-${shape.id}`} value={shape.triangle.angleB} onValueChange={v => updateShape(shape.id, {triangle: {...shape.triangle, angleB: v}})} min={1} max={178} step={0.1} isRTL={isRTL} />
                    <div className="space-y-2">
                        <div className="flex justify-between" dir={isRTL ? 'rtl' : 'ltr'}>
                            <Label>{t('angle')} C</Label>
                            <span className="text-sm text-muted-foreground">{shape.triangle.angleC.toFixed(1)}°</span>
                        </div>
                    </div>
                    <ControlSliderRow id={`shape-height-${shape.id}`} label={t('height')} value={shape.triangle.height} onValueChange={v => updateShape(shape.id, {triangle: {...shape.triangle, height: v}})} min={0.1} max={500} step={0.1} unit="px" isRTL={isRTL} />
                    <CustomSlider id={`shape-height-slider-${shape.id}`} value={shape.triangle.height} onValueChange={v => updateShape(shape.id, {triangle: {...shape.triangle, height: v}})} min={0.1} max={500} step={0.1} isRTL={isRTL} />
                    <ControlSliderRow id={`shape-base-${shape.id}`} label={t('base')} value={shape.triangle.base} onValueChange={v => updateShape(shape.id, {triangle: {...shape.triangle, base: v}})} min={0.1} max={500} step={0.1} unit="px" isRTL={isRTL} />
                    <CustomSlider id={`shape-base-slider-${shape.id}`} value={shape.triangle.base} onValueChange={v => updateShape(shape.id, {triangle: {...shape.triangle, base: v}})} min={0.1} max={500} step={0.1} isRTL={isRTL} />
                </div>
            )}
             {shape.shape === 'beam' && (
                <div className='space-y-4 pt-2 border-t border-muted/20'>
                    <ControlSliderRow id={`shape-spreadStart-${shape.id}`} label={t('startSpread')} value={shape.beam.spreadStart} onValueChange={v => updateShape(shape.id, {beam: {...shape.beam, spreadStart: v}})} min={0} max={500} step={1} unit="px" isRTL={isRTL} />
                    <CustomSlider id={`shape-spreadStart-slider-${shape.id}`} value={shape.beam.spreadStart} onValueChange={v => updateShape(shape.id, {beam: {...shape.beam, spreadStart: v}})} min={0} max={500} step={1} isRTL={isRTL} />
                    <ControlSliderRow id={`shape-spreadEnd-${shape.id}`} label={t('endSpread')} value={shape.beam.spreadEnd} onValueChange={v => updateShape(shape.id, {beam: {...shape.beam, spreadEnd: v}})} min={0} max={500} step={1} unit="px" isRTL={isRTL} />
                    <CustomSlider id={`shape-spreadEnd-slider-${shape.id}`} value={shape.beam.spreadEnd} onValueChange={v => updateShape(shape.id, {beam: {...shape.beam, spreadEnd: v}})} min={0} max={500} step={1} isRTL={isRTL} />
                </div>
            )}

            {shape.shape === 'quadratic' && (
                <div className='space-y-4 pt-2 border-t border-muted/20'>
                    <ControlSliderRow id={`shape-aperture-${shape.id}`} label={t('aperture')} value={shape.quadratic.aperture} onValueChange={v => updateShape(shape.id, {quadratic: {...shape.quadratic, aperture: v}})} min={0} max={1} step={0.01} isRTL={isRTL} />
                    <CustomSlider id={`shape-aperture-slider-${shape.id}`} value={shape.quadratic.aperture} onValueChange={v => updateShape(shape.id, {quadratic: {...shape.quadratic, aperture: v}})} min={0} max={1} step={0.01} isRTL={isRTL} />
                </div>
            )}
            
            <FloatingLabelCombobox label={t('fillMode')} value={shape.fillMode} onValueChange={v => updateShape(shape.id, {fillMode: v as 'fill' | 'stroke' | 'gradient'})} options={fillModeOptions} />
            
            {shape.fillMode === 'stroke' && (
               <FloatingLabelInput label={`${t('strokeWidth')} (px)`} value={String(shape.stroke.width)} onValueChange={v => updateShape(shape.id, { stroke: { width: Number(v) } })} type="number" />
            )}

             {shape.fillMode === 'gradient' && (
                 <div className="space-y-4 pt-4 border-t border-muted/20">
                    <h4 className="font-semibold" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('gradient')}</h4>
                    {(shape.gradient?.colors || []).map((color, idx, arr) => (
                        <React.Fragment key={color.id}>
                            <div className="space-y-2">
                                <Dialog open={colorDialogId === color.id} onOpenChange={(isOpen) => !isOpen && setColorDialogId(null)}>
                                    <DialogTrigger asChild>
                                        <div onClick={() => setColorDialogId(color.id)} className="cursor-pointer">
                                            <ColorCard hexColor={color.color} id={color.id} isPointerCursorOnHover={true} />
                                        </div>
                                    </DialogTrigger>
                                    <DialogContent className="max-w-[90vw] w-full md:max-w-6xl h-[80vh] flex flex-col">
                                        <DialogHeader>
                                        <DialogTitle>{t('colorPalette')}</DialogTitle>
                                        </DialogHeader>
                                        <ColorPaletteTools
                                            initialColor={color.color}
                                            onColorAdd={(hex) => handleColorSelected(shape.id, hex, true, idx)}
                                        />
                                    </DialogContent>
                                </Dialog>
                                <div className="flex items-center gap-2">
                                    <div className="flex-grow">
                                        <ControlSliderRow
                                            id={`shape-grad-stop-${color.id}`}
                                            label={t('stop')}
                                            value={color.stop}
                                            onValueChange={val => updateShape(shape.id, (current) => {
                                                const newGradient = { ...(current.gradient || { colors: [], angle: 90 }) };
                                                const newColors = [...newGradient.colors];
                                                newColors[idx] = { ...newColors[idx], stop: val };
                                                return { gradient: { ...newGradient, colors: newColors }};
                                            })}
                                            min={0} max={100} step={0.1} unit="%" isRTL={isRTL}
                                        />
                                        <CustomSlider id={`shape-grad-stop-slider-${color.id}`} value={color.stop} onValueChange={val => updateShape(shape.id, (current) => {
                                                const newGradient = { ...(current.gradient || { colors: [], angle: 90 }) };
                                                const newColors = [...newGradient.colors];
                                                newColors[idx] = { ...newColors[idx], stop: val };
                                                return { gradient: { ...newGradient, colors: newColors }};
                                            })} min={0} max={100} step={0.1} isRTL={isRTL} />
                                    </div>
                                    <RadixButton variant="destructive" size="icon" className="h-8 w-8 mt-4" onClick={() => removeGradientColor(shape.id, color.id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6 L18 18 M18 6 L6 18"></path></svg>
                                    </RadixButton>
                                </div>
                            </div>
                            {idx < arr.length - 1 && <Separator style={{ backgroundColor: 'var(--float-input-lbl-def-outline)'}} />}
                        </React.Fragment>
                    ))}
                    <Button variant="outline" onClick={() => addGradientColor(shape.id)}>{t('addColor')}</Button>
                    <ControlSliderRow id={`shape-grad-angle-${shape.id}`} label={t('angle')} value={shape.gradient?.angle ?? 90} onValueChange={v => updateShape(shape.id, { gradient: { ...(shape.gradient || {colors:[]}), angle: v } })} min={0} max={360} step={1} unit="°" isRTL={isRTL} />
                    <CustomSlider id={`shape-grad-angle-slider-${shape.id}`} value={shape.gradient?.angle ?? 90} onValueChange={v => updateShape(shape.id, { gradient: { ...(shape.gradient || {colors:[]}), angle: v } })} min={0} max={360} step={1} isRTL={isRTL} />
                 </div>
            )}


            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('position')}</h3>
            <FloatingLabelCombobox label={t('positionOrigin')} value={shape.positionOrigin} onValueChange={v => updateShape(shape.id, {positionOrigin: v as PositionOrigin})} options={positionOrigins} />
            
            <InputWithUnit t={t} label={t('offset') + " X"} value={shape.xOffset} onValueChange={v => updateShape(shape.id, {xOffset: v})} unit={shape.offsetUnit} onUnitChange={u => updateShape(shape.id, {offsetUnit: u as Unit})} unitOptions={unitOptions} />
            <InputWithUnit t={t} label={t('offset') + " Y"} value={shape.yOffset} onValueChange={v => updateShape(shape.id, {yOffset: v})} unit={shape.offsetUnit} onUnitChange={u => updateShape(shape.id, {offsetUnit: u as Unit})} unitOptions={unitOptions} />
            
            <div className='grid grid-cols-1 gap-y-4'>
                <InputWithUnit t={t} label={t('width')} value={shape.width} onValueChange={v => updateShape(shape.id, {width: v})} unit={shape.sizeUnit} onUnitChange={u => updateShape(shape.id, {sizeUnit: u as Unit})} unitOptions={unitOptions} />
                <InputWithUnit t={t} label={t('height')} value={shape.height} onValueChange={v => updateShape(shape.id, {height: v})} unit={shape.sizeUnit} onUnitChange={u => updateShape(shape.id, {sizeUnit: u as Unit})} unitOptions={unitOptions} />
            </div>

            {shape.shape === 'rectangle' && (
                 <InputWithUnit t={t} label={t('borderRadius')} value={shape.borderRadius.value} onValueChange={v => updateShape(shape.id, { borderRadius: {...shape.borderRadius, value: v} })} unit={shape.borderRadius.unit} onUnitChange={u => updateShape(shape.id, { borderRadius: {...shape.borderRadius, unit: u as Unit} })} unitOptions={unitOptions} />
            )}
            
            <FloatingLabelInput 
              label={t('zIndex')} 
              value={shape.zIndex === undefined ? '' : String(shape.zIndex)}
              onValueChange={v => updateShape(shape.id, { zIndex: v === '' ? undefined : Number(v) })}
              type="number"
            />
            
            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('effects')}</h3>
            <ControlSliderRow id={`shape-rotation-${shape.id}`} label={t('rotation')} value={shape.rotation} onValueChange={v => updateShape(shape.id, { rotation: v })} min={-360} max={360} step={0.1} unit="°" isRTL={isRTL} />
            <CustomSlider id={`shape-rotation-slider-${shape.id}`} value={shape.rotation} onValueChange={v => updateShape(shape.id, { rotation: v })} min={-360} max={360} step={0.1} isRTL={isRTL} />
            <ControlSliderRow id={`shape-corrosion-${shape.id}`} label={t('corrosion')} value={shape.corrosion} onValueChange={v => updateShape(shape.id, { corrosion: v })} min={0} max={100} step={0.1} isRTL={isRTL} />
            <CustomSlider id={`shape-corrosion-slider-${shape.id}`} value={shape.corrosion} onValueChange={v => updateShape(shape.id, { corrosion: v })} min={0} max={100} step={0.1} isRTL={isRTL} />
            <ControlSliderRow id={`shape-overflow-${shape.id}`} label={t('overflow')} value={shape.overflow} onValueChange={v => updateShape(shape.id, { overflow: v })} min={0} max={400} step={0.1} unit="px" isRTL={isRTL} />
            <CustomSlider id={`shape-overflow-slider-${shape.id}`} value={shape.overflow} onValueChange={v => updateShape(shape.id, { overflow: v })} min={0} max={400} step={0.1} isRTL={isRTL} />
        
            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('animation')}</h3>
            <FloatingLabelCombobox
                label={t('animation')}
                value={shape.animation.mode}
                onValueChange={(v) => handleAnimationModeChange(shape.id, v as any)}
                options={animationModes.filter(mode => shape.shape === 'triangle' ? mode.value !== 'pulsate' : true)}
            />
            
            {shape.animation.mode === 'shift' && (
                 <>
                    <div className="space-y-3 pt-3 border-t border-muted/20">
                        <FloatingLabelInput label={`${t('extent')} X`} value={String(shape.animation.shift.extentX)} onValueChange={v => updateShape(shape.id, { animation: { ...shape.animation, shift: { ...shape.animation.shift, extentX: Number(v) } } })} type="number" />
                        <FloatingLabelInput label={`${t('extent')} Y`} value={String(shape.animation.shift.extentY)} onValueChange={(v) => updateShape(shape.id, { animation: { ...shape.animation, shift: { ...shape.animation.shift, extentY: Number(v) } } })} type="number" />
                        <FloatingLabelInput label={`${t('duration')} (s)`} value={String(shape.animation.shift.duration)} onValueChange={(v) => updateShape(shape.id, { animation: { ...shape.animation, shift: { ...shape.animation.shift, duration: Number(v) } } })} type="number" />
                    </div>
                 </>
            )}

            {(shape.animation.mode === 'rotate' || shape.animation.mode === 'pulsate') && (
                 <div className="space-y-3 pt-3 border-t border-muted/20">
                    <ControlSliderRow id={`shape-originX-${shape.id}`} label={t('transformOriginX')} value={shape.transformOrigin.x} onValueChange={v => updateShape(shape.id, { transformOrigin: { ...shape.transformOrigin, x: v } })} min={-100} max={200} step={0.1} unit="%" isRTL={isRTL} />
                    <CustomSlider id={`shape-originX-slider-${shape.id}`} value={shape.transformOrigin.x} onValueChange={v => updateShape(shape.id, { transformOrigin: { ...shape.transformOrigin, x: v } })} min={-100} max={200} step={0.1} isRTL={isRTL} />
                    <ControlSliderRow id={`shape-originY-${shape.id}`} label={t('transformOriginY')} value={shape.transformOrigin.y} onValueChange={v => updateShape(shape.id, { transformOrigin: { ...shape.transformOrigin, y: v } })} min={-100} max={200} step={0.1} unit="%" isRTL={isRTL} />
                    <CustomSlider id={`shape-originY-slider-${shape.id}`} value={shape.transformOrigin.y} onValueChange={v => updateShape(shape.id, { transformOrigin: { ...shape.transformOrigin, y: v } })} min={-100} max={200} step={0.1} isRTL={isRTL} />
                 </div>
            )}

            {shape.animation.mode === 'rotate' && (
                <div className="space-y-3 pt-3 border-t border-muted/20">
                    <RotationSection
                        t={t}
                        isRTL={isRTL}
                        rotation={shape.animation.rotation}
                        onDirectionChange={v => updateShape(shape.id, (o) => ({ animation: { ...o.animation, rotation: { ...o.animation.rotation, direction: v } } }))}
                        onSpeedChange={v => updateShape(shape.id, (o) => ({ animation: { ...o.animation, rotation: { ...o.animation.rotation, speed: v } } }))}
                    />
                </div>
            )}
            
            {shape.animation.mode === 'pulsate' && (
                 <div className="space-y-3 pt-3 border-t border-muted/20">
                    <PulsateSection
                        t={t}
                        isRTL={isRTL}
                        pulsate={shape.animation.pulsate}
                        onMinSizeChange={v => updateShape(shape.id, o => ({ animation: {...o.animation, pulsate: {...(o.animation.pulsate || {minSize:0.8, maxSize: 1.2, duration: 2}), minSize: v}}}))}
                        onMaxSizeChange={v => updateShape(shape.id, o => ({ animation: {...o.animation, pulsate: {...(o.animation.pulsate || {minSize:0.8, maxSize: 1.2, duration: 2}), maxSize: v}}}))}
                        onDurationChange={v => updateShape(shape.id, o => ({ animation: {...o.animation, pulsate: {...(o.animation.pulsate || {minSize:0.8, maxSize: 1.2, duration: 2}), duration: Number(v)}}}))}
                    />
                </div>
            )}
        </div>
      ),
    }));

    return (
        <div className="space-y-4 m-6">
            <div className="space-y-4">
                <AnimatePresence>
                    {shapes.map((shape) => (
                        <div 
                            key={shape.id} 
                            className="bg-muted/30 rounded-lg relative"
                        >
                            <UnfoldingCard 
                                faqs={shapeItems.filter(item => item.id === shape.id)}
                                openId={openId}
                                setOpenId={setOpenId}
                                isRTL={isRTL}
                                isMobile={isMobile}
                            />
                        </div>
                    ))}
                </AnimatePresence>
            </div>

            <Button onClick={addShape} className="w-full">{t('addShape')}</Button>
        </div>
    )
}


function ControlSliderRow({ id, label, value = 0, onValueChange, min, max, step, unit='', isRTL }: { id: string, label: string, value: number, onValueChange: (v: number) => void, min: number, max: number, step: number, unit?:string, isRTL: boolean }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between" dir={isRTL ? 'rtl' : 'ltr'}>
                <Label>{label}</Label>
                <span className="text-sm text-muted-foreground">{value.toFixed(step < 1 ? 2 : 1)}{unit}</span>
            </div>
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
  rotation: {
    speed: number;
    direction: 'clockwise' | 'counter-clockwise';
  };
  onDirectionChange: (v: 'clockwise' | 'counter-clockwise') => void;
  onSpeedChange: (v: number) => void;
}

function RotationSection({ t, rotation, onDirectionChange, onSpeedChange, isRTL }: RotationSectionProps) {
  const rotationDirections = [
      { value: "clockwise", label: t('clockwise') },
      { value: "counter-clockwise", label: t('counterClockwise') },
  ];

  return (
    <div className="space-y-3">
      <FloatingLabelCombobox
        label={t('direction')}
        value={rotation.direction}
        onValueChange={onDirectionChange as (v:string)=>void}
        options={rotationDirections}
      />
      <FloatingLabelInput
        label={`${t('duration')} (s)`}
        value={String(rotation.speed)}
        onValueChange={(v) => onSpeedChange(Number(v))}
        type="number"
      />
    </div>
  )
}

interface PulsateSectionProps {
    t: (key: string) => string;
    pulsate?: { minSize: number; maxSize: number; duration: number };
    onMinSizeChange: (v: number) => void;
    onMaxSizeChange: (v: number) => void;
    onDurationChange: (v: number) => void;
    isRTL: boolean;
}

function PulsateSection({ t, pulsate, onMinSizeChange, onMaxSizeChange, onDurationChange, isRTL }: PulsateSectionProps) {
    if (!pulsate) return null;

    return (
        <div className="space-y-3">
            <ControlSliderRow id="pulsate-min-size" label={t('minSize')} value={pulsate.minSize} onValueChange={onMinSizeChange} min={0} max={2} step={0.1} unit="x" isRTL={isRTL} />
            <CustomSlider id="pulsate-min-size-slider" value={pulsate.minSize} onValueChange={onMinSizeChange} min={0} max={2} step={0.1} isRTL={isRTL} />
            <ControlSliderRow id="pulsate-max-size" label={t('maxSize')} value={pulsate.maxSize} onValueChange={onMaxSizeChange} min={0} max={3} step={0.1} unit="x" isRTL={isRTL} />
            <CustomSlider id="pulsate-max-size-slider" value={pulsate.maxSize} onValueChange={onMaxSizeChange} min={0} max={3} step={0.1} isRTL={isRTL} />
            <FloatingLabelInput label={`${t('duration')} (s)`} value={String(pulsate.duration)} onValueChange={(v) => onDurationChange(Number(v))} type="number" />
        </div>
    )
}