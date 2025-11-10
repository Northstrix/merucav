'use client';

import { useState, useEffect, useRef } from 'react';
import {
  GradientCanvas,
  type GradientConfig,
  getDefaultGradientConfig,
} from '@/components/gradient/gradient-canvas';
import { GradientControlsPanel } from '@/components/gradient/gradient-controls-panel';
import { CustomDialog } from '@/components/ui/dialog';
import useIsRTL from '@/hooks/use-is-rtl';
import { AnimatePresence, motion } from 'framer-motion';

function getAspectRatio(width: number, height: number) {
    if (height === 0) return 'N/A';
    const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b));
    const r = gcd(width, height);
    return `${width / r}:${height / r}`;
}

export default function Home() {
  const [config, setConfig] = useState<GradientConfig | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<(() => void) | null>(null);
  const [dialogMessage, setDialogMessage] = useState({ title: '', description: '' });

  const [previewSize, setPreviewSize] = useState({ width: 0, height: 0, aspectRatio: '' });
  const [isHoveringPreview, setIsHoveringPreview] = useState(false);
  const previewRef = useRef<HTMLDivElement>(null);
  const isRTL = useIsRTL();

  useEffect(() => {
    setConfig(getDefaultGradientConfig());
  }, []);

  useEffect(() => {
    const observer = new ResizeObserver(entries => {
      for (let entry of entries) {
        const { width, height } = entry.contentRect;
        setPreviewSize({ 
            width: Math.round(width), 
            height: Math.round(height), 
            aspectRatio: getAspectRatio(Math.round(width), Math.round(height))
        });
      }
    });

    if (previewRef.current) {
      observer.observe(previewRef.current);
    }
    
    // Initial size check
    if(previewRef.current){
        const { width, height } = previewRef.current.getBoundingClientRect();
         setPreviewSize({ 
            width: Math.round(width), 
            height: Math.round(height), 
            aspectRatio: getAspectRatio(Math.round(width), Math.round(height))
        });
    }
    
    return () => {
      if (previewRef.current) {
        observer.unobserve(previewRef.current);
      }
    };
  }, []);

  const openConfirmDialog = (title: string, description: string, onConfirm: () => void) => {
    setDialogMessage({ title, description });
    setDialogAction(() => onConfirm);
    setDialogOpen(true);
  };

  const handleConfirm = () => {
    if (dialogAction) dialogAction();
    setDialogOpen(false);
  };

  const handleCancel = () => {
    setDialogOpen(false);
  };

  if (!config) {
    return (
      <div className="flex flex-col min-h-screen bg-black text-foreground">
        <main className="flex-grow grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 p-6">
          <div className="relative rounded-lg border border-border h-[calc(100vh-48px)] bg-muted/20 animate-pulse"></div>
          <div className="relative h-[calc(100vh-48px)]"></div>
        </main>
      </div>
    );
  }

  const labelPositionStyle: React.CSSProperties = isRTL 
    ? { top: '0.5rem', right: '0.5rem' } 
    : { top: '0.5rem', left: '0.5rem' };

  return (
    <div className="flex flex-col min-h-screen bg-black text-foreground">
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 p-6">
        <div 
          className="relative h-[calc(100vh-48px)]" 
          onMouseEnter={() => setIsHoveringPreview(true)}
          onMouseLeave={() => setIsHoveringPreview(false)}
          ref={previewRef}
        >
          <AnimatePresence>
            {isHoveringPreview && previewSize.width > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.3 }}
                className="absolute bg-black/30 backdrop-blur-sm text-white text-xs font-mono px-2 py-1 z-40"
                style={{...labelPositionStyle, borderRadius: '2px' }}
              >
                {previewSize.width} x {previewSize.height} ({previewSize.aspectRatio})
              </motion.div>
            )}
          </AnimatePresence>
          <div className="relative rounded-lg border border-border overflow-hidden h-full w-full">
            <GradientCanvas config={config} />
          </div>
        </div>

        <div className="relative h-[calc(100vh-48px)]">
          <GradientControlsPanel
            config={config}
            setConfig={setConfig}
            openConfirmDialog={openConfirmDialog}
          />
        </div>
      </main>

      {/* Shared global confirmation dialog */}
      <CustomDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={dialogMessage.title}
        description={dialogMessage.description}
        confirmText="Delete"
        cancelText="Cancel"
        onConfirm={handleConfirm}
        onCancel={handleCancel}
      />
    </div>
  );
}
