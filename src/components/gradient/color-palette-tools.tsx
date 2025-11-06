'use client'
import { useState, useMemo } from 'react';
import { hsvaToHex, hexToHsva, HsvaColor } from '@uiw/color-convert';
import { useTranslation } from '@/hooks/use-translation';
import { ColorPicker } from '@/components/color-picker';
import { ColorTools } from '@/components/color-tools';
import * as colorUtil from '@/lib/color-utils';
import { ModeSelector } from '../mode-selector';
import { Palettes } from '../palettes';
import { ScrollArea } from '../ui/scroll-area';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '../ui/accordion';

interface ColorPaletteToolsProps {
  onColorAdd: (hex: string) => void;
}

export function ColorPaletteTools({ onColorAdd }: ColorPaletteToolsProps) {
  const { t } = useTranslation();
  const [baseColor, setBaseColor] = useState<HsvaColor>(hexToHsva('#00A7FA'));

  const harmonyTypes = useMemo(
    () => ['analogous', 'triad', 'complementary', 'splitComplementary', 'square', 'tetradic', 'convergence'],
    []
  );

  const [activeMode, setActiveMode] = useState(harmonyTypes[0]);

  const harmonies = useMemo(() => {
    try {
      return colorUtil.getColorHarmonies(hsvaToHex(baseColor));
    } catch (e) {
      console.error(e);
      return {
        analogous: [], triad: [], complementary: [], splitComplementary: [], square: [], tetradic: [], convergence: [],
      };
    }
  }, [baseColor]);

  return (
    <ScrollArea className="h-full p-1">
      <div className="space-y-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className='lg:col-span-1 space-y-4'>
              <ColorPicker value={baseColor} onValueChange={setBaseColor} />
              <ModeSelector
                  options={harmonyTypes.map(key => ({ label: t(key), value: key }))}
                  value={activeMode}
                  onValueChange={setActiveMode}
              />
          </div>
          <div className='lg:col-span-2'>
              <Palettes harmonies={harmonies} activeMode={activeMode} onColorAdd={onColorAdd} />
          </div>
        </div>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="color-tools">
              <AccordionTrigger>{t('colorTools')}</AccordionTrigger>
              <AccordionContent>
                  <ColorTools baseColor={hsvaToHex(baseColor)} onColorAdd={onColorAdd} />
              </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </ScrollArea>
  );
}
