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
  keyStep?: number;
  label?: string; // Add label to props
  unit?: string;
}

export function CustomSlider({
  id,
  min = 0,
  max = 100,
  step = 1,
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
  colorFillDefault = '#0A98F0',
  colorFillHover = '#0A98F0',
  colorFillActive = '#0A98F0',
  colorThumbDefault = 'hsl(var(--secondary))',
  colorThumbHover = 'hsl(var(--background))',
  colorThumbActive = 'hsl(var(--secondary))',
  colorThumbBorderDefault = '#087BC2',
  colorThumbBorderHover = '#076FAF',
  colorThumbBorderActive = '#FFFFFF',
  ariaLabel = 'slider',
  isRTL = false,
  keyStep = 1,
}: CustomSliderProps) {
  const sliderRef = useRef<HTMLDivElement>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [sliderWidth, setSliderWidth] = useState(0);

  const DEAD_ZONE = 10;
  const BASE_FILL_LENGTH = 20;

  const updateSliderWidth = () => {
    if (sliderRef.current) {
      setSliderWidth(sliderRef.current.clientWidth);
    }
  };

  useEffect(() => {
    updateSliderWidth();
    window.addEventListener('resize', updateSliderWidth);
    return () => window.removeEventListener('resize', updateSliderWidth);
  }, []);

  const getPercentage = useCallback(() => ((value - min) / (max - min)) * 100, [value, min, max]);

  const handleInteraction = useCallback(
    (clientX: number) => {
      if (disabled || !sliderRef.current) return;

      const rect = sliderRef.current.getBoundingClientRect();
      const effectiveWidth = rect.width - DEAD_ZONE * 2;
      let percentage;
      if (isRTL) {
        percentage = ((rect.right - clientX - DEAD_ZONE) / effectiveWidth) * 100;
      } else {
        percentage = ((clientX - rect.left - DEAD_ZONE) / effectiveWidth) * 100;
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

  const handleMouseUp = useCallback(() => setIsDragging(false), []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') {
      e.preventDefault();
      const dir = (e.key === 'ArrowRight' ? 1 : -1) * (isRTL ? -1 : 1);
      const newVal = Math.max(min, Math.min(max, value + (keyStep ?? step) * dir));
      onValueChange(newVal);
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
  const fillColor = isDragging || isFocused ? colorFillActive : isHovered ? colorFillHover : colorFillDefault;
  const thumbColor = isDragging || isFocused ? colorThumbActive : isHovered ? colorThumbHover : colorThumbDefault;
  const thumbBorderColor = isDragging || isFocused
    ? colorThumbBorderActive
    : isHovered ? colorThumbBorderHover : colorThumbBorderDefault;

  const usableWidth = Math.max(sliderWidth - DEAD_ZONE * 2, 0);
  const computedFillWidth = (percentage / 100) * usableWidth;
  const baseFillWidth = Math.min(BASE_FILL_LENGTH, usableWidth);

  const wrapperId = `namer-ui-slider-${id}-wrapper`;
  const trackId = `namer-ui-slider-${id}-track`;
  const baseFillId = `namer-ui-slider-${id}-baseFill`;
  const fillId = `namer-ui-slider-${id}-fill`;
  const thumbId = `namer-ui-slider-${id}-thumb`;

  return (
    <div>
      <style>{`
        #${wrapperId} {
          position: relative;
          width: ${width};
          height: ${thumbHeight};
          display: flex;
          align-items: center;
          cursor: pointer;
          touch-action: none;
          outline: none;
        }
        #${wrapperId}.disabled {
          cursor: not-allowed;
          opacity: 0.5;
        }
        #${trackId}, #${baseFillId}, #${fillId} {
          position: absolute;
          height: ${trackHeight};
          border-radius: ${trackFillBorderRadius};
          top: 50%;
          transform: translateY(-50%);
          transition: background-color 0.2s ease;
        }
        #${trackId} {
          background-color: ${colorTrackBackground};
          width: 100%;
        }
        #${baseFillId} {
          background-color: ${colorFillDefault};
          opacity: 1;
          z-index: 1;
        }
        #${fillId} {
          background-color: ${fillColor};
          z-index: 2;
        }
        #${thumbId} {
          position: absolute;
          width: ${thumbWidth};
          height: ${thumbHeight};
          border-radius: ${thumbBorderRadius};
          top: 50%;
          background-color: ${thumbColor};
          border: ${thumbBorderWidth} solid ${thumbBorderColor};
          box-shadow: 0 0 2px rgba(0,0,0,0.25);
          transform: translate(-50%, -50%);
          z-index: 3;
          transition: background-color 0.25s, border-color 0.25s;
        }
      `}</style>

      <div
        ref={sliderRef}
        id={wrapperId}
        className={disabled ? 'disabled' : ''}
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
        <div id={trackId} />

        <div
          id={baseFillId}
          style={
            isRTL
              ? {
                  right: DEAD_ZONE,
                  width: baseFillWidth,
                  transform: 'translate(10px, -50%)',
                }
              : {
                  left: DEAD_ZONE,
                  width: baseFillWidth,
                  transform: 'translate(-10px, -50%)',
                }
          }
        />

        <div
          id={fillId}
          style={
            isRTL
              ? { right: DEAD_ZONE, width: computedFillWidth }
              : { left: DEAD_ZONE, width: computedFillWidth }
          }
        />

        <div
          id={thumbId}
          style={
            isRTL
              ? {
                  right: DEAD_ZONE + computedFillWidth,
                  transform: 'translate(50%, -50%)',
                  backgroundColor: thumbColor,
                  borderColor: thumbBorderColor,
                }
              : {
                  left: DEAD_ZONE + computedFillWidth,
                  transform: 'translate(-50%, -50%)',
                  backgroundColor: thumbColor,
                  borderColor: thumbBorderColor,
                }
          }
        />
      </div>
    </div>
  );
}
