'use client';
import { useMemo } from 'react';
import { ColorCard } from './color-card';
import { useIsMobile } from '@/hooks/use-mobile';
import { v4 as uuidv4 } from 'uuid';

interface PalettesProps {
  harmonies: {
    [key:string]: string[];
  };
  activeMode: string;
  onColorAdd: (hex: string) => void;
}

export function Palettes({ harmonies, activeMode, onColorAdd }: PalettesProps) {
  const isMobile = useIsMobile();
  
  const colors = useMemo(() => {
    return harmonies[activeMode] || [];
  }, [activeMode, harmonies]);

  if (!colors || colors.length === 0) {
    return <div className="text-muted-foreground">{/* Invalid color input */}</div>;
  }

  const minCardWidth = isMobile ? 296 : 316;

  return (
    <div
      className="grid gap-3"
      style={{
        gridTemplateColumns: `repeat(auto-fill, minmax(${minCardWidth}px, 1fr))`,
      }}
    >
      {colors.map((color) => (
        <ColorCard key={uuidv4()} id={uuidv4()} hexColor={color} onColorAdd={onColorAdd}/>
      ))}
    </div>
  );
}
