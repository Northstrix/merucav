'use client';
import React, { useState, useRef, useEffect, useCallback } from 'react';

export interface CustomSliderProps {
  id?: string;
  min?: number;
  max?: number;
  step?: number;
  value: number;
  onValueChange: (value: number) => void;
  disabled?: boolean;
  trackHeight?: string;
  thumbWidth?: string;
  thumbHeight?: string;
  width?: string;
  trackFillBorderRadius?: string;
  thumbBorderRadius?: string;
  thumbBorderWidth?: string;
  colorTrackBackground?: string;
  colorFillDefault?: string;
  colorFillHover?: string;
  colorFillActive?: string;
  colorThumbDefault?: string;
  colorThumbHover?: string;
  colorThumbActive?: string;
  colorThumbBorderDefault?: string;
  colorThumbBorderHover?: string;
  colorThumbBorderActive?: string;
  ariaLabel?: string;
  isRTL?: boolean;
}

export function CustomSlider({
  id,
  min = 0,
  max = 100,
  step = 0.1,
  value,
  onValueChange,
  disabled = false,
  trackHeight = '8px',
  thumbWidth = '20px',
  thumbHeight = '20px',
  width = '100%',
  trackFillBorderRadius = '8px',
  thumbBorderRadius = '50%',
  thumbBorderWidth = '2px',
  colorTrackBackground = 'hsl(var(--secondary))',
  colorFillDefault = 'hsl(var(--primary))',
  colorFillHover = 'hsl(var(--primary))',
  colorFillActive = 'hsl(var(--primary))',
  colorThumbDefault = 'hsl(var(--background))',
  colorThumbHover = 'hsl(var(--background))',
  colorThumbActive = 'hsl(var(--background))',
  colorThumbBorderDefault = 'hsl(var(--primary))',
  colorThumbBorderHover = 'hsl(var(--ring))',
  colorThumbBorderActive = 'hsl(var(--ring))',
  ariaLabel = 'slider',
  isRTL = false,
}: CustomSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const getPercentage = useCallback(() => {
    return ((value - min) / (max - min)) * 100;
  }, [value, min, max]);

  const handleInteraction = useCallback(
    (clientX: number) => {
      if (disabled || !sliderRef.current) return;
      const rect = sliderRef.current.getBoundingClientRect();
      let percentage;
      if (isRTL) {
        percentage = ((rect.right - clientX) / rect.width) * 100;
      } else {
        percentage = ((clientX - rect.left) / rect.width) * 100;
      }
      percentage = Math.max(0, Math.min(100, percentage));
      let newValue = min + (percentage / 100) * (max - min);
      if (step !== 0) newValue = Math.round(newValue / step) * step;
      newValue = Math.max(min, Math.min(max, newValue));
      onValueChange(newValue);
    },
    [disabled, min, max, step, onValueChange, isRTL]
  );

  const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    setIsDragging(true);
    handleInteraction(e.clientX);
    sliderRef.current?.focus();
  };

  const handleMouseMove = useCallback(
    (e: MouseEvent) => {
      if (isDragging) handleInteraction(e.clientX);
    },
    [isDragging, handleInteraction]
  );

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const direction = (e.key === 'ArrowRight' ? 1 : -1) * (isRTL ? -1 : 1);
      const increment = e.shiftKey ? (max - min) / 10 : step;
      const newValue = Math.max(min, Math.min(max, value + direction * increment));
      onValueChange(newValue);
    }
  };

  useEffect(() => {
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, [handleMouseMove, handleMouseUp]);

  const percentage = getPercentage();
  const fillColor = isFocused || isDragging ? colorFillActive : isHovered ? colorFillHover : colorFillDefault;
  const thumbColor = isFocused || isDragging ? colorThumbActive : isHovered ? colorThumbHover : colorThumbDefault;
  const thumbBorderColor = isFocused || isDragging ? colorThumbBorderActive : isHovered ? colorThumbBorderHover : colorThumbBorderDefault;

  const uniqueId = id || React.useId();
  const wrapperClasses = `namer-ui-custom-slider-${uniqueId}-wrapper${disabled ? ' disabled' : ''}`;
  const trackClass = `namer-ui-custom-slider-${uniqueId}-track`;
  const rangeClass = `namer-ui-custom-slider-${uniqueId}-range`;
  const thumbClass = `namer-ui-custom-slider-${uniqueId}-thumb`;

  return (
    <div>
      <style>{`
        .${wrapperClasses} {
          position: relative;
          width: ${width};
          height: ${thumbHeight};
          display: flex;
          align-items: center;
          cursor: pointer;
          touch-action: none;
          outline: none;
          border-radius: ${trackFillBorderRadius};
        }
        .${wrapperClasses}.disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        .${trackClass}, .${rangeClass} {
          position: absolute;
          height: ${trackHeight};
          border-radius: ${trackFillBorderRadius};
          top: 50%;
          transform: translateY(-50%);
          transition: background-color 0.3s ease;
        }
        .${trackClass} {
          background-color: ${colorTrackBackground};
          width: 100%;
        }
        .${rangeClass} {
          background-color: ${fillColor};
        }
        .${wrapperClasses}[dir="ltr"] .${rangeClass} {
            left: 0;
            width: ${percentage}%;
        }
        .${wrapperClasses}[dir="rtl"] .${rangeClass} {
            right: 0;
            width: ${percentage}%;
        }
        .${thumbClass} {
          position: absolute;
          width: ${thumbWidth};
          height: ${thumbHeight};
          border-radius: ${thumbBorderRadius};
          top: 50%;
          background-color: ${thumbColor};
          border: ${thumbBorderWidth} solid ${thumbBorderColor};
          box-shadow: 0 2px 4px rgba(0,0,0,0.1);
          transition: background-color 0.3s ease, border-color 0.3s ease;
        }
        .${wrapperClasses}[dir="ltr"] .${thumbClass} {
            left: ${percentage}%;
            transform: translate(-50%, -50%);
        }
        .${wrapperClasses}[dir="rtl"] .${thumbClass} {
            right: ${percentage}%;
            transform: translate(50%, -50%);
        }
      `}</style>
      <div
        ref={sliderRef}
        className={wrapperClasses}
        onMouseDown={handleMouseDown}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onKeyDown={handleKeyDown}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        tabIndex={disabled ? -1 : 0}
        role="slider"
        aria-label={ariaLabel}
        aria-valuemin={min}
        aria-valuemax={max}
        aria-valuenow={value}
        aria-disabled={disabled}
        dir={isRTL ? 'rtl' : 'ltr'}
      >
        <div className={trackClass} />
        <div className={rangeClass} />
        <div className={thumbClass} />
      </div>
    </div>
  );
}
