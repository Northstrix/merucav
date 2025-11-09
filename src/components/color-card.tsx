'use client';
import React from 'react';
import { hsvaToHex, type HsvaColor, hexToHsva, hsvaToRgbaString } from '@uiw/color-convert';
import { Button } from './ui/button';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { ContrastRatioInfo } from './color-picker';
import useIsRTL from '@/hooks/use-is-rtl';
import { motion } from 'framer-motion';

interface ColorCardProps {
  id: string;
  hexColor: string;
  percentage?: number;
  onColorAdd?: (hex: string) => void;
  isDraggable?: boolean;
  onLighten?: () => void;
  onDarken?: () => void;
  onMix?: () => void;
}

export const ColorCard = React.memo(function ColorCard({
  hexColor,
  percentage,
  onColorAdd,
  isDraggable = false,
  onLighten,
  onDarken,
  onMix
}: ColorCardProps) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const [isHovered, setIsHovered] = React.useState(false);

  const deferredColor = React.useDeferredValue(hexColor);
  const colorHsv = React.useMemo(() => {
    try {
      return hexToHsva(deferredColor);
    } catch {
      return { h: 0, s: 0, v: 0, a: 1 } as HsvaColor;
    }
  }, [deferredColor]);

  const displayColor = React.useMemo(() => {
    try {
        if (hexColor.length === 9) { // #RRGGBBAA
            return hsvaToRgbaString(hexToHsva(hexColor));
        }
        return hexColor;
    } catch {
        return '#000000';
    }
  }, [hexColor]);

  const handleCopy = React.useCallback(() => {
    navigator.clipboard.writeText(hexColor.toUpperCase());
    toast({
      title: t('copied'),
      description: hexColor.toUpperCase(),
    });
  }, [hexColor, t, toast]);

  return (
    <motion.div
      layoutId={hexColor}
      className="bg-black border border-border rounded-lg p-3 space-y-3 flex flex-col"
      style={{ minWidth: isDraggable ? 'auto' : 316, cursor: isDraggable ? 'grab' : 'default' }}
      whileTap={isDraggable ? { cursor: 'grabbing', scale: 1.05 } : {}}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="relative w-full h-24 rounded-lg bg-grid" // bg-grid for transparency
        style={{ backgroundColor: displayColor, cursor: 'pointer' }}
      >
        {percentage !== undefined && (
          <div
            className="absolute top-2 text-white text-xs font-mono bg-black/30 backdrop-blur-sm rounded-full px-2 py-0.5"
            style={{ [isRTL ? 'right' : 'left']: '0.5rem', direction: 'ltr' }}
          >
            {percentage.toFixed(0)}%
          </div>
        )}
      </div>
      <div className="flex items-center justify-between gap-2">
        <code className="font-mono text-sm truncate" style={{ direction: 'ltr' }}>{hexColor.toUpperCase()}</code>
      </div>
      <ContrastRatioInfo color={colorHsv} />
      {onColorAdd && (
         <Button onClick={() => onColorAdd(hexColor)}>{t('useThisColor')}</Button>
      )}
       <div className="flex gap-2">
        {onLighten && <Button variant="outline" className="w-full" onClick={onLighten}>{t('lighten')}</Button>}
        {onDarken && <Button variant="outline" className="w-full" onClick={onDarken}>{t('darken')}</Button>}
      </div>
      {onMix && <Button variant="outline" className="w-full" onClick={onMix}>{t('mix')}</Button>}
    </motion.div>
  );
});
