'use client';
import { useState, useMemo, useEffect, useRef } from 'react';
import { useTranslation } from '@/hooks/use-translation';
import { FloatingLabelInput } from './ui/floating-label-input';
import * as colorUtil from '@/lib/color-utils';
import { ColorCard } from './color-card';
import { CustomSlider } from './ui/custom-slider';
import { Label } from './ui/label';
import CustomCheckbox from "@/components/CustomCheckbox";
import { RadioGroup, RadioGroupItem } from './ui/radio-group';
import { useIsMobile } from '@/hooks/use-mobile';
import { v4 as uuidv4 } from "uuid";
import { FloatingLabelCombobox } from './ui/floating-label-combobox';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from './ui/accordion';

interface ColorToolsProps {
  baseColor: string;
  onColorAdd: (hex: string) => void;
}

type Scale = 'linear' | 'log';

export function ColorTools({ baseColor: initialBaseColor, onColorAdd }: ColorToolsProps) {
  const { t } = useTranslation();
  const isMobile = useIsMobile();

  const [baseColor, setBaseColor] = useState(initialBaseColor);
  
  const [brightnessMode, setBrightnessMode] = useState<'lighten' | 'darken'>('lighten');
  const [brightnessPercentage, setBrightnessPercentage] = useState(50);
  const [brightnessScale, setBrightnessScale] = useState<Scale>('linear');
  const [brightnessType, setBrightnessType] = useState<'amount' | 'steps'>('amount');
  const [brightnessSteps, setBrightnessSteps] = useState(5);

  const [mixColor, setMixColor] = useState('#FA00A7');
  const [mixMode, setMixMode] = useState<colorUtil.MixMode>('rgb');
  const [mixPercentage, setMixPercentage] = useState(50);
  const [mixType, setMixType] = useState<'percentage' | 'steps'>('percentage');
  const [showOriginals, setShowOriginals] = useState(true);
  const [aperture, setAperture] = useState(0.5);
  const [mixScale, setMixScale] = useState<Scale>('linear');
  const [mixSteps, setMixSteps] = useState(5);

  useEffect(() => {
    setBaseColor(initialBaseColor);
  }, [initialBaseColor]);

  const applyScale = (ratio: number, scale: Scale) => {
    if (scale === 'log') {
      return Math.log(ratio * (Math.E - 1) + 1);
    }
    return ratio;
  };

  const brightnessResults = useMemo(() => {
    try {
      const operation = brightnessMode === 'lighten' ? colorUtil.lighten : colorUtil.darken;
      
      if (brightnessType === 'amount') {
        const ratio = brightnessPercentage / 100;
        const scaledRatio = applyScale(ratio, brightnessScale);
        return [{ color: operation(baseColor, scaledRatio) }];
      }
      
      // Steps mode
      const steps = colorUtil.generateBrightnessSteps(baseColor, brightnessSteps, operation, (r) => applyScale(r, brightnessScale));
      let results = steps.map((color, i) => ({
        color,
        percentage: ((i + 1) / (brightnessSteps + 1)) * 100
      }));

      if (showOriginals) {
        const targetColor = brightnessMode === 'lighten' ? '#FFFFFF' : '#000000';
        return [
          { color: baseColor, percentage: 0 },
          ...results,
          { color: targetColor, percentage: 100 }
        ];
      }
      return results;

    } catch(e) {
      return [];
    }
  }, [baseColor, brightnessMode, brightnessPercentage, brightnessScale, brightnessType, brightnessSteps, showOriginals]);

  const mixResults = useMemo(() => {
    try {
        let results: string[];
        if (mixType === 'steps') {
            results = colorUtil.generateSteps(baseColor, mixColor, mixSteps, (start, end, r) => {
                const scaledRatio = applyScale(r, mixScale);
                return colorUtil.mix(start, end, scaledRatio, mixMode, aperture);
            });
            if(showOriginals) {
                return [{color: baseColor}, ...results.map(c => ({color: c})), {color: mixColor}];
            }
        } else {
            const ratio = mixPercentage / 100;
            const scaledRatio = applyScale(ratio, mixScale);
            const mixedColor = colorUtil.mix(baseColor, mixColor, scaledRatio, mixMode, aperture);
            results = [mixedColor];
            if(showOriginals) {
                return [{color: baseColor}, {color: mixedColor}, {color: mixColor}];
            }
        }
        return results.map(color => ({color}));
    } catch(e) {
        return [];
    }
  }, [baseColor, mixColor, mixPercentage, mixMode, mixSteps, mixType, showOriginals, aperture, mixScale]);
  
  const minCardWidth = isMobile ? 296 : 316;
  
  const renderPalette = (
    colors: { color: string; percentage?: number }[],
    useStableKeys = false
  ) => (
    <div
      className="grid gap-3"
      style={{ gridTemplateColumns: `repeat(auto-fill, minmax(${minCardWidth}px, 1fr))` }}
    >
      {colors.map((item, i) => {
        const color = typeof item === "string" ? item : item.color;
        // Create a stable key based on color and percentage (if exists)
        const key = useStableKeys
          ? item.percentage !== undefined
            ? `${color}-${item.percentage.toFixed(2)}`
            : color
          : uuidv4();

        return (
          <ColorCard
            key={key}
            id={key} // use the same stable key for id as well
            hexColor={color}
            percentage={item.percentage}
            onColorAdd={onColorAdd}
          />
        );
      })}
    </div>
  );

  const mixModeOptions = [
    { value: "rgb", label: "RGB" },
    { value: "hsl", label: "HSL" },
    { value: "hsv", label: "HSV" },
    { value: "lab", label: "LAB" },
    { value: "lch", label: "LCH" },
    { value: "log", label: t('logarithmic') },
    { value: "parabolic", label: t('parabolic') },
    { value: "quadratic", label: t('quadratic') },
  ];

  return (
    <div className="w-full mt-4 space-y-8">
        <Accordion type="multiple" defaultValue={['mix-section']} className="w-full">
            <AccordionItem value="mix-section">
                <AccordionTrigger>{t('mix')}</AccordionTrigger>
                <AccordionContent className="pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-4 mb-6 items-end">
                        <FloatingLabelInput
                            label={t('firstColor')}
                            value={baseColor}
                            onValueChange={setBaseColor}
                            type="text"
                        />

                        {mixType === 'percentage' ? (
                          <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-2">
                               {t('percentage')} ({100 - mixPercentage}% - {mixPercentage}%)
                            </label>
                            <CustomSlider
                                min={0}
                                max={100}
                                step={1}
                                value={mixPercentage}
                                onValueChange={setMixPercentage}
                            />
                          </div>
                        ) : (
                          <div>
                            <label className="block text-sm font-medium text-muted-foreground mb-2">
                              {t('steps')} ({mixSteps})
                            </label>
                            <CustomSlider
                              min={1}
                              max={25}
                              step={1}
                              value={mixSteps}
                              onValueChange={setMixSteps}
                            />
                          </div>
                        )}
                        
                        <FloatingLabelInput
                            label={t('secondColor')}
                            value={mixColor}
                            onValueChange={setMixColor}
                            type="text"
                        />
                        <FloatingLabelCombobox
                          label={t('mixMode')}
                          value={mixMode}
                          onValueChange={(value) => setMixMode(value as colorUtil.MixMode)}
                          options={mixModeOptions}
                        />
                        {mixMode === 'quadratic' && (
                            <div className='lg:col-span-4'>
                                <label className="block text-sm font-medium text-muted-foreground mb-2">
                                    {t('aperture')} ({aperture})
                                </label>
                                <CustomSlider
                                    min={0}
                                    max={1}
                                    step={0.01}
                                    value={aperture}
                                    onValueChange={setAperture}
                                />
                            </div>
                        )}
                        <CustomCheckbox
                          id="mix-use-steps"
                          checked={mixType === 'steps'}
                          onChange={(checked) => setMixType(checked ? 'steps' : 'percentage')}
                          label={t('useSteps')}
                        />
                        <CustomCheckbox
                          id="mix-show-originals"
                          checked={showOriginals}
                          onChange={(checked) => setShowOriginals(!!checked)}
                          label={t('showOriginals')}
                        />
                        <div>
                          <Label className="block text-sm font-medium text-muted-foreground mb-2">{t('scale')}</Label>
                          <RadioGroup value={mixScale} onValueChange={(v) => setMixScale(v as Scale)} className="flex gap-4">
                              <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="linear" id="mix-linear" />
                                  <Label htmlFor="mix-linear">{t('linear')}</Label>
                              </div>
                              <div className="flex items-center space-x-2">
                                  <RadioGroupItem value="log" id="mix-log" />
                                  <Label htmlFor="mix-log">{t('logarithmic')}</Label>
                              </div>
                          </RadioGroup>
                        </div>
                    </div>
                    {renderPalette(mixResults, true)}
                </AccordionContent>
            </AccordionItem>
            <AccordionItem value="brightness-section">
                <AccordionTrigger>{t('brightness')}</AccordionTrigger>
                <AccordionContent className="pt-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-4 mb-6 items-end">
                      <div>
                        <Label className="block text-sm font-medium text-muted-foreground mb-2">{t('mode')}</Label>
                        <RadioGroup value={brightnessMode} onValueChange={(v) => setBrightnessMode(v as 'lighten' | 'darken')} className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="lighten" id="lighten" />
                            <Label htmlFor="lighten">{t('lighten')}</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="darken" id="darken" />
                            <Label htmlFor="darken">{t('darken')}</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      
                      {brightnessType === 'amount' ? (
                          <div>
                              <label className="block text-sm font-medium text-muted-foreground mb-2">
                                  {t('amount')} ({brightnessPercentage.toFixed(1)}%)
                              </label>
                              <CustomSlider
                                  min={0}
                                  max={100}
                                  step={0.1}
                                  value={brightnessPercentage}
                                  onValueChange={setBrightnessPercentage}
                              />
                          </div>
                      ) : (
                          <div>
                              <label className="block text-sm font-medium text-muted-foreground mb-2">
                                  {t('steps')} ({brightnessSteps})
                              </label>
                              <CustomSlider
                                  min={1}
                                  max={25}
                                  step={1}
                                  value={brightnessSteps}
                                  onValueChange={setBrightnessSteps}
                              />
                          </div>
                      )}
                      
                      <CustomCheckbox
                        id="bright-use-steps"
                        checked={brightnessType === 'steps'}
                        onChange={(checked) => setBrightnessType(checked ? 'steps' : 'amount')}
                        label={t('useSteps')}
                      />
                      {brightnessType === 'steps' && (
                        <CustomCheckbox
                          id="bright-show-originals"
                          checked={showOriginals}
                          onChange={(checked) => setShowOriginals(!!checked)}
                          label={t('showOriginals')}
                        />
                      )}

                      <div>
                        <Label className="block text-sm font-medium text-muted-foreground mb-2">{t('scale')}</Label>
                        <RadioGroup value={brightnessScale} onValueChange={(v) => setBrightnessScale(v as Scale)} className="flex gap-4">
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="linear" id="brightness-linear" />
                                <Label htmlFor="brightness-linear">{t('linear')}</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <RadioGroupItem value="log" id="brightness-log" />
                                <Label htmlFor="brightness-log">{t('logarithmic')}</Label>
                            </div>
                        </RadioGroup>
                      </div>
                    </div>
                    {renderPalette(brightnessResults, true)}
                </AccordionContent>
            </AccordionItem>
        </Accordion>
    </div>
  );
}
