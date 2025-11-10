'use client';
import React from 'react';
import { hsvaToHex, hexToHsva, hsvaToRgbaString, type HsvaColor } from '@uiw/color-convert';
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
  id,
  hexColor,
  percentage,
  onColorAdd,
  isDraggable = false,
  onLighten,
  onDarken,
  onMix,
}: ColorCardProps) {
  const { toast } = useToast();
  const { t } = useTranslation();
  const isRTL = useIsRTL();
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
      if (hexColor.length === 9) return hsvaToRgbaString(hexToHsva(hexColor));
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
    <>
      <style>{`
        .color-card {
          background: hsl(var(--card));
          border: 1px solid hsl(var(--border));
          border-radius: 12px;
          padding: 12px;
          display: flex;
          flex-direction: column;
          gap: 10px;
          color: #fafafa;
          min-width: 280px;
          transition: all 0.3s ease;
        }
        .color-card:hover {
          background: #141414;
          border-color: #303030;
        }
        .color-preview {
          height: 6rem;
          border: 1px solid hsl(var(--border));
          border-radius: 10px;
          position: relative;
          background-color: ${displayColor};
          transition: all 0.3s ease;
        }
        .percentage-tag {
          position: absolute;
          top: 8px;
          padding: 3px 7px;
          background: rgba(0,0,0,0.5);
          color: #fff;
          font-size: 0.75rem;
          border-radius: 8px;
        }
        .hex-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-family: monospace;
          font-size: 0.875rem;
          cursor: pointer;
          user-select: all;
        }
        .action-buttons {
          display: flex;
          gap: 8px;
          width: 100%;
        }
      `}</style>

      <motion.div
        layoutId={id}
        className="color-card"
        style={{
          cursor: isDraggable ? 'grab' : 'default',
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        whileTap={isDraggable ? { cursor: 'grabbing', scale: 1.05 } : {}}
      >
        <div className="color-preview">
          {percentage !== undefined && (
            <div
              className="percentage-tag"
              style={{ [isRTL ? 'right' : 'left']: '10px', direction: 'ltr' }}
            >
              {percentage.toFixed(0)}%
            </div>
          )}
        </div>

        <div className="hex-row" style={{direction: "ltr"}} onClick={handleCopy}>
          <code>{hexColor.toUpperCase()}</code>
        </div>

        <ContrastRatioInfo color={colorHsv} />

        {onColorAdd && (
          <Button onClick={() => onColorAdd(hexColor)}>{t('useThisColor')}</Button>
        )}

        <div className="action-buttons">
          {onLighten && (
            <Button variant="outline" className="w-full" onClick={onLighten}>
              {t('lighten')}
            </Button>
          )}
          {onDarken && (
            <Button variant="outline" className="w-full" onClick={onDarken}>
              {t('darken')}
            </Button>
          )}
        </div>

        {onMix && (
          <Button variant="outline" className="w-full" onClick={onMix}>
            {t('mix')}
          </Button>
        )}
      </motion.div>
    </>
  );
});
