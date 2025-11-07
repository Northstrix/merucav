'use client';

import { useState, useEffect } from 'react';
import {
  GradientCanvas,
  type GradientConfig,
  getDefaultGradientConfig,
} from '@/components/gradient/gradient-canvas';
import { GradientControlsPanel } from '@/components/gradient/gradient-controls-panel';
import { CustomDialog } from '@/components/ui/dialog';

export default function Home() {
  const [config, setConfig] = useState<GradientConfig | null>(null);

  // Dialog state
  const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogAction, setDialogAction] = useState<(() => void) | null>(null);
  const [dialogMessage, setDialogMessage] = useState({ title: '', description: '' });

  useEffect(() => {
    setConfig(getDefaultGradientConfig());
  }, []);

  // Called from children through openConfirmDialog
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

  return (
    <div className="flex flex-col min-h-screen bg-black text-foreground">
      <main className="flex-grow grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-6 p-6">
        <div className="relative rounded-lg border border-border overflow-hidden h-[calc(100vh-48px)]">
          <GradientCanvas config={config} />
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
