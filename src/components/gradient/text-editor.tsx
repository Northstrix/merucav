'use client';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence } from 'framer-motion';

import { GradientConfig, TextConfig, PositionOrigin, Unit } from './gradient-canvas';
import { Button } from '../ui/button';
import { useTranslation } from '@/hooks/use-translation';
import { CustomSlider } from '../ui/custom-slider';
import { Label } from '../ui/label';
import { FloatingLabelCombobox } from '../ui/floating-label-combobox';
import { Button as RadixButton } from '../ui/radixButton';
import { UnfoldingCard } from '../ui/unfolding-card';
import useIsRTL from '@/hooks/use-is-rtl';
import { useIsMobile } from '@/hooks/use-mobile';
import { FloatingLabelInput } from '../ui/floating-label-input';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/radixDialog';
import { ColorCard } from '../color-card';
import { ColorPaletteTools } from './color-palette-tools';
import CustomCheckbox from '../CustomCheckbox';


interface TextEditorProps {
  config: GradientConfig;
  setConfig: (config: GradientConfig) => void;
  openConfirmDialog: (title: string, description: string, onConfirm: () => void) => void;
}

export function TextEditor({ config, setConfig, openConfirmDialog }: TextEditorProps) {
    const { t } = useTranslation();
    const isRTL = useIsRTL();
    const isMobile = useIsMobile();
    const [openId, setOpenId] = useState<string | null>(null);
    const [colorDialogId, setColorDialogId] = useState<string | null>(null);


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

    const fontWeightOptions = [
        { value: '100', label: '100' }, { value: '200', label: '200' },
        { value: '300', label: '300' }, { value: '400', label: '400' },
        { value: '500', label: '500' }, { value: '600', label: '600' },
        { value: '700', label: '700' }, { value: '800', label: '800' },
        { value: '900', label: '900' },
    ];

    const fontFamilyOptions: {value: TextConfig['fontFamily'], label: string}[] = [
        { value: 'Inter', label: 'Inter' },
        { value: 'Space Grotesk', label: 'Space Grotesk' },
        { value: 'Roboto', label: 'Roboto' },
        { value: 'Montserrat', label: 'Montserrat' },
        { value: 'Figtree', label: 'Figtree' },
        { value: 'Merriweather', label: 'Merriweather' },
        { value: 'Fraunces', label: 'Fraunces' },
        { value: 'Poppins', label: 'Poppins' },
        { value: 'Roboto Mono', label: 'Roboto Mono' },
    ]

    const fillModeOptions: {value: 'fill' | 'stroke', label: string}[] = [
        { value: 'fill', label: t('fill') },
        { value: 'stroke', label: t('stroke') },
    ];

    const updateText = (id: string, newConfig: Partial<TextConfig>) => {
        const newTexts = (config.texts || []).map(text => 
            text.id === id ? { ...text, ...newConfig } : text
        );
        setConfig({ ...config, texts: newTexts });
    };
    
    const addText = () => {
        const newText: TextConfig = {
            id: uuidv4(),
            key: uuidv4(),
            disabled: false,
            content: 'Hello World',
            color: '#FFFFFF',
            fontFamily: 'Figtree',
            fontSize: 48,
            fontWeight: 700,
            rotation: 0,
            positionOrigin: 'center',
            xOffset: 0,
            yOffset: 0,
            offsetUnit: 'px',
            zIndex: 10,
            fillMode: 'fill',
            strokeWidth: 1,
        };
        setConfig({ ...config, texts: [...(config.texts || []), newText] });
    };

    const handleColorSelected = (id: string, hex: string) => {
        updateText(id, { color: hex });
        setColorDialogId(null);
    }

    const removeText = (id: string) => {
        setConfig({ ...config, texts: (config.texts || []).filter((text) => text.id !== id) });
    };

    const textItems = (config.texts || []).map((text, index) => ({
    id: text.id,
    question: (
        <div className="flex items-center gap-2 flex-grow w-full" onClick={(e) => e.stopPropagation()}>
            <RadixButton
                variant="destructive"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                    e.stopPropagation();
                    openConfirmDialog(t('confirmDeletion'), t('confirmDeletionText'), () => removeText(text.id));
                }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6 L18 18 M18 6 L6 18"></path></svg>
            </RadixButton>
            <CustomCheckbox
                id={`text-disable-${text.id}`}
                direction={isRTL ? "rtl" : "ltr"}
                checked={!text.disabled}
                onChange={(checked) => updateText(text.id, { disabled: !checked })}
                label={`${t('text')} ${index + 1}`}
            />
        </div>
    ),
      answer: (
        <div className='grid grid-cols-1 gap-y-4 pt-4'>
            <FloatingLabelInput label={t('content')} value={text.content} onValueChange={v => updateText(text.id, {content: v})} textarea />
            <Dialog open={colorDialogId === text.id} onOpenChange={(isOpen) => !isOpen && setColorDialogId(null)}>
              <DialogTrigger asChild>
                <div onClick={() => setColorDialogId(text.id)} className="cursor-pointer">
                  <ColorCard hexColor={text.color} id={text.id} isPointerCursorOnHover={true}/>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] w-full md:max-w-6xl h-[80vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle>{t('colorPalette')}</DialogTitle>
                </DialogHeader>
                <ColorPaletteTools
                  initialColor={text.color}
                  onColorAdd={(hex) => handleColorSelected(text.id, hex)}
                />
              </DialogContent>
            </Dialog>
            
            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('appearance')}</h3>
            <FloatingLabelCombobox label={t('fillMode')} value={text.fillMode} onValueChange={v => updateText(text.id, {fillMode: v as 'fill' | 'stroke'})} options={fillModeOptions} />
            {text.fillMode === 'stroke' && (
              <>
                <ControlSliderRow label={t('strokeWidth')} value={text.strokeWidth} onValueChange={v => updateText(text.id, {strokeWidth: v})} min={0.1} max={10} step={0.1} unit="px" isRTL={isRTL} />
                <CustomSlider value={text.strokeWidth} onValueChange={v => updateText(text.id, {strokeWidth: v})} min={0.1} max={10} step={0.1} isRTL={isRTL} />
              </>
            )}

            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('font')}</h3>
            <FloatingLabelCombobox label={t('font')} value={text.fontFamily} onValueChange={v => updateText(text.id, {fontFamily: v as TextConfig['fontFamily']})} options={fontFamilyOptions} />
            <FloatingLabelCombobox label={t('fontWeight')} value={String(text.fontWeight)} onValueChange={v => updateText(text.id, {fontWeight: Number(v)})} options={fontWeightOptions} />
            <FloatingLabelInput label={t('fontSize')} value={String(text.fontSize)} onValueChange={v => updateText(text.id, {fontSize: Number(v)})} type="number" />
            
            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('position')}</h3>
            <FloatingLabelCombobox label={t('positionOrigin')} value={text.positionOrigin} onValueChange={v => updateText(text.id, {positionOrigin: v as PositionOrigin})} options={positionOrigins} />
            
            <InputWithUnit t={t} label={t('offset') + " X"} value={text.xOffset} onValueChange={v => updateText(text.id, {xOffset: v})} unit={text.offsetUnit} onUnitChange={u => updateText(text.id, {offsetUnit: u as Unit})} unitOptions={unitOptions} />
            <InputWithUnit t={t} label={t('offset') + " Y"} value={text.yOffset} onValueChange={v => updateText(text.id, {yOffset: v})} unit={text.offsetUnit} onUnitChange={u => updateText(text.id, {offsetUnit: u as Unit})} unitOptions={unitOptions} />
             <FloatingLabelInput 
              label={t('zIndex')} 
              value={text.zIndex === undefined ? '' : String(text.zIndex)}
              onValueChange={v => updateText(text.id, { zIndex: v === '' ? undefined : Number(v) })}
              type="number"
            />

            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('transform')}</h3>
            <ControlSliderRow label={t('rotation')} value={text.rotation} onValueChange={v => updateText(text.id, { rotation: v })} min={-360} max={360} step={0.1} unit="°" isRTL={isRTL} />
        </div>
      ),
    }));

    return (
        <div className="space-y-4 m-6">
            <div className="space-y-4">
                 <AnimatePresence>
                    {(config.texts || []).map((text) => (
                        <div 
                            key={text.id} 
                            className="bg-muted/30 rounded-lg relative"
                        >
                            <UnfoldingCard 
                                faqs={textItems.filter(item => item.id === text.id)}
                                openId={openId}
                                setOpenId={setOpenId}
                                isRTL={isRTL}
                                isMobile={isMobile}
                            />
                        </div>
                    ))}
                </AnimatePresence>
            </div>
            <Button onClick={addText} className="w-full">{t('addText')}</Button>
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
            <CustomSlider value={value} onValueChange={onValueChange} min={min} max={max} step={step} isRTL={isRTL} id={label}/>
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
