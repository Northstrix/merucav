'use client';

import React from 'react';
import {
  hsvaToHex,
  hexToHsva,
  type HsvaColor
} from '@uiw/color-convert';
import { Button } from './ui/button';
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
  isPointerCursorOnHover?: boolean; // New prop to control pointer cursor
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
  isPointerCursorOnHover = false, // default false
  onLighten,
  onDarken,
  onMix,
}: ColorCardProps) {
  const { t } = useTranslation();
  const isRTL = useIsRTL();

  // Reliable color parsing
  const colorHsv = React.useMemo(() => {
    try {
      return hexToHsva(hexColor);
    } catch {
      return { h: 0, s: 0, v: 0, a: 1 } as HsvaColor;
    }
  }, [hexColor]);

  // Uniform display color calculation
  const displayColor = React.useMemo(() => {
    try {
      if (hexColor.startsWith('#') && hexColor.length >= 7) return hexColor;
      return hsvaToHex(colorHsv);
    } catch {
      return '#000000';
    }
  }, [hexColor, colorHsv]);

  // Determine cursor style based on props
  const cursorStyle = isDraggable
    ? 'grab'
    : isPointerCursorOnHover
    ? 'pointer'
    : 'default';

  return (
    <>
      <style>
        {`
          .color-card {
          background: ${
            isPointerCursorOnHover ? 'hsl(var(--card))' : 'hsl(var(--background))'
          };
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
            background: ${
              isPointerCursorOnHover ? '#141414' : 'hsl(var(--background))'
            };
            border-color: ${
              isPointerCursorOnHover ? '#303030' : 'hsl(var(--border));'
            };
          }

          .color-preview {
            height: 6rem;
            border: 1px solid hsl(var(--border));
            border-radius: 10px;
            position: relative;
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
            user-select: all;
          }

          .action-buttons {
            display: flex;
            gap: 8px;
            width: 100%;
          }
        `}
      </style>

      <motion.div
        layoutId={id}
        className="color-card"
        style={{
          cursor: cursorStyle,
          direction: isRTL ? 'rtl' : 'ltr',
        }}
        whileTap={isDraggable ? { cursor: 'grabbing', scale: 1.05 } : {}}
      >
        <div
          className="color-preview"
          style={{ backgroundColor: displayColor }}
        >
          {percentage !== undefined && (
            <div
              className="percentage-tag"
              style={{
                [isRTL ? 'right' : 'left']: '10px',
                direction: 'ltr',
              }}
            >
              {percentage.toFixed(0)}%
            </div>
          )}
        </div>

        <div className="hex-row" style={{ direction: 'ltr' }}>
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