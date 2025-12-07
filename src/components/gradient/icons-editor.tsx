'use client';
import React, { useState, useMemo, useEffect, useCallback } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { AnimatePresence } from 'framer-motion';
import * as allIcons from 'lucide-react';

import { GradientConfig, IconConfig, PositionOrigin, Unit } from './gradient-canvas';
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
import { ScrollArea } from '../ui/scroll-area';
import { LoadingModal } from '../ui/loading-modal';

const iconNames = Object.keys(allIcons).filter(key => key !== 'createLucideIcon' && key !== 'LucideIcon' && key !== 'icons' && !key.endsWith('Icon'));

interface IconsEditorProps {
  config: GradientConfig;
  setConfig: (config: GradientConfig) => void;
  openConfirmDialog: (title: string, description: string, onConfirm: () => void) => void;
}

const Icon = ({ name, ...props }: { name: string } & allIcons.LucideProps) => {
    const LucideIcon = allIcons[name as keyof typeof allIcons] as React.FC<allIcons.LucideProps>;
    if (!LucideIcon) return <allIcons.HelpCircle {...props} />;
    return <LucideIcon {...props} />;
};

const useResponsiveColumns = () => {
    const [columns, setColumns] = useState(3);

    useEffect(() => {
        const calculateColumns = () => {
            if (typeof window === 'undefined') return;
            const width = window.innerWidth;
            if (width >= 1200) {
                setColumns(3);
            } else if (width >= 800) {
                setColumns(2);
            } else {
                setColumns(1);
            }
        };

        calculateColumns();
        window.addEventListener('resize', calculateColumns);
        return () => window.removeEventListener('resize', calculateColumns);
    }, []);

    return columns;
};

export function IconsEditor({ config, setConfig, openConfirmDialog }: IconsEditorProps) {
    const { t } = useTranslation();
    const isRTL = useIsRTL();
    const isMobile = useIsMobile();
    const [openId, setOpenId] = useState<string | null>(null);
    const [colorDialogId, setColorDialogId] = useState<string | null>(null);
    const [searchQuery, setSearchQuery] = useState('');
    const [pickerOpen, setPickerOpen] = useState(false);
    const [isPickerLoading, setIsPickerLoading] = useState(false);
    const columns = useResponsiveColumns();

    const filteredIcons = useMemo(() => 
        iconNames.filter(name => name.toLowerCase().includes(searchQuery.toLowerCase())),
    [searchQuery]);
    
    useEffect(() => {
        if (isPickerLoading) {
            const timer = setTimeout(() => {
                setPickerOpen(true);
                setIsPickerLoading(false);
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [isPickerLoading]);


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

    const updateIcon = (id: string, newConfig: Partial<IconConfig>) => {
        const newIcons = (config.icons || []).map(icon => 
            icon.id === id ? { ...icon, ...newConfig } : icon
        );
        setConfig({ ...config, icons: newIcons });
    };
    
    const addIcon = () => {
        const newIcon: IconConfig = {
            id: uuidv4(),
            key: uuidv4(),
            disabled: false,
            iconName: 'Activity',
            color: '#FFFFFF',
            size: 48,
            strokeWidth: 2,
            rotation: 0,
            positionOrigin: 'center',
            xOffset: 0,
            yOffset: 0,
            offsetUnit: 'px',
            zIndex: 10,
        };
        setConfig({ ...config, icons: [...(config.icons || []), newIcon] });
    };

    const handleColorSelected = (id: string, hex: string) => {
        updateIcon(id, { color: hex });
        setColorDialogId(null);
    }
    
    const handleIconSelect = (id: string, iconName: string) => {
        updateIcon(id, { iconName });
        setPickerOpen(false);
    }

    const removeIcon = (id: string) => {
        setConfig({ ...config, icons: (config.icons || []).filter((icon) => icon.id !== id) });
    };

    const openPickerWithLoading = () => {
        setIsPickerLoading(true);
    }

    const iconItems = (config.icons || []).map((icon, index) => ({
    id: icon.id,
    question: (
        <div className="flex items-center gap-2 flex-grow w-full" onClick={(e) => e.stopPropagation()}>
            <RadixButton
                variant="destructive"
                size="icon"
                className="h-6 w-6"
                onClick={(e) => {
                    e.stopPropagation();
                    openConfirmDialog(t('confirmDeletion'), t('confirmDeletionIcon'), () => removeIcon(icon.id));
                }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6 L18 18 M18 6 L6 18"></path></svg>
            </RadixButton>
            <CustomCheckbox
                id={`icon-disable-${icon.id}`}
                direction={isRTL ? "rtl" : "ltr"}
                checked={!icon.disabled}
                onChange={(checked) => updateIcon(icon.id, { disabled: !checked })}
                label={`${t('icon')} ${index + 1}`}
            />
        </div>
    ),
      answer: (
        <div className='grid grid-cols-1 gap-y-4 pt-4'>
            <div className='min-w-[300px]'>
                <Button variant='outline' onClick={openPickerWithLoading} className='w-full'>
                    <Icon name={icon.iconName} className="mr-2 h-4 w-4" />
                    {icon.iconName}
                </Button>
            </div>
            <Dialog open={pickerOpen} onOpenChange={setPickerOpen}>
                <DialogContent
                    isRTL={isRTL}
                    className="max-w-[1104px] w-[90vw] max-h-[90vh] h-[800px] flex flex-col"
                >
                    <DialogHeader>
                        <DialogTitle>{t('selectIcon')}</DialogTitle>
                    </DialogHeader>
                    <FloatingLabelInput label={t('search')} parentBackground='hsl(var(--background))' value={searchQuery} onValueChange={setSearchQuery} />
                    <ScrollArea className='h-full'>
                        <div className='grid gap-2' style={{ gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))` }}>
                            {filteredIcons.map(name => (
                                <Button key={name} variant='ghost' onClick={() => handleIconSelect(icon.id, name)} className='flex flex-col h-auto gap-2 p-2'>
                                    <Icon name={name} />
                                    <span className="text-xs text-center w-full break-words whitespace-normal">{name}</span>
                                </Button>
                            ))}
                        </div>
                    </ScrollArea>
                </DialogContent>
            </Dialog>

            <Dialog open={colorDialogId === icon.id} onOpenChange={(isOpen) => !isOpen && setColorDialogId(null)}>
              <DialogTrigger asChild>
                <div onClick={() => setColorDialogId(icon.id)} className="cursor-pointer">
                  <ColorCard hexColor={icon.color} id={icon.id} isPointerCursorOnHover={true}/>
                </div>
              </DialogTrigger>
              <DialogContent className="max-w-[90vw] w-full md:max-w-6xl h-[80vh] flex flex-col">
                <DialogHeader>
                  <DialogTitle>{t('colorPalette')}</DialogTitle>
                </DialogHeader>
                <ColorPaletteTools
                  initialColor={icon.color}
                  onColorAdd={(hex) => handleColorSelected(icon.id, hex)}
                />
              </DialogContent>
            </Dialog>
            
            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('appearance')}</h3>
            <ControlSliderRow label={t('size')} value={icon.size} onValueChange={v => updateIcon(icon.id, {size: v})} min={1} max={768} step={0.1} unit="px" isRTL={isRTL} />
            <ControlSliderRow label={t('strokeWidth')} value={icon.strokeWidth} onValueChange={v => updateIcon(icon.id, {strokeWidth: v})} min={0.1} max={5} step={0.1} isRTL={isRTL} />
            <CustomSlider label={t('strokeWidth')} value={icon.strokeWidth} onValueChange={v => updateIcon(icon.id, {strokeWidth: v})} min={0.1} max={5} step={0.1} isRTL={isRTL} />

            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('position')}</h3>
            <FloatingLabelCombobox label={t('positionOrigin')} value={icon.positionOrigin} onValueChange={v => updateIcon(icon.id, {positionOrigin: v as PositionOrigin})} options={positionOrigins} />
            
            <InputWithUnit t={t} label={t('offset') + " X"} value={icon.xOffset} onValueChange={v => updateIcon(icon.id, {xOffset: v})} unit={icon.offsetUnit} onUnitChange={u => updateIcon(icon.id, {offsetUnit: u as Unit})} unitOptions={unitOptions} />
            <InputWithUnit t={t} label={t('offset') + " Y"} value={icon.yOffset} onValueChange={v => updateIcon(icon.id, {yOffset: v})} unit={icon.offsetUnit} onUnitChange={u => updateIcon(icon.id, {offsetUnit: u as Unit})} unitOptions={unitOptions} />
             <FloatingLabelInput 
              label={t('zIndex')} 
              value={icon.zIndex === undefined ? '' : String(icon.zIndex)}
              onValueChange={v => updateIcon(icon.id, { zIndex: v === '' ? undefined : Number(v) })}
              type="number"
            />

            <h3 className="font-semibold pt-2 border-t border-muted/20" style={{textAlign: isRTL ? 'right' : 'left'}}>{t('transform')}</h3>
            <ControlSliderRow label={t('rotation')} value={icon.rotation} onValueChange={v => updateIcon(icon.id, { rotation: v })} min={-360} max={360} step={0.1} unit="°" isRTL={isRTL} />
        </div>
      ),
    }));

    return (
        <div className="space-y-4 m-6">
            <LoadingModal open={isPickerLoading} showSpinner={false} />
            <div className="space-y-4">
                 <AnimatePresence>
                    {(config.icons || []).map((icon) => (
                        <div 
                            key={icon.id} 
                            className="bg-muted/30 rounded-lg relative"
                        >
                            <UnfoldingCard 
                                faqs={iconItems.filter(item => item.id === icon.id)}
                                openId={openId}
                                setOpenId={setOpenId}
                                isRTL={isRTL}
                                isMobile={isMobile}
                            />
                        </div>
                    ))}
                </AnimatePresence>
            </div>
            <Button onClick={addIcon} className="w-full">{t('addIcon')}</Button>
        </div>
    )
}

function ControlSliderRow({ label, value, onValueChange, min, max, step, unit='', isRTL }: { label: string, value: number, onValueChange: (v: number) => void, min: number, max: number, step: number, unit?:string, isRTL: boolean }) {
    return (
        <div className="space-y-2">
            <div className="flex justify-between" dir={isRTL ? 'rtl' : 'ltr'}>
                <Label>{label}</Label>
                <span className="text-sm text-muted-foreground">{(value || 0).toFixed(step < 1 ? 2 : 1)}{unit}</span>
            </div>
            <CustomSlider id={label} value={value || 0} onValueChange={onValueChange} min={min} max={max} step={step} isRTL={isRTL} />
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

    