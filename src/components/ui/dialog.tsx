'use client';

import React, { useCallback } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import ChronicleButton from '@/components/ui/RefinedChronicleButton';
import { ModalOverlay } from '@/components/modal-overlay';
import { useTranslation } from '@/hooks/use-translation';
import { useLanguage } from '@/contexts/language-context';

interface CustomDialogProps {
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title: string;
  description?: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm?: () => void;
  onCancel?: () => void;
}

const ANIMATION_DURATION = 0.3;

export const CustomDialog: React.FC<CustomDialogProps> = ({
  open,
  onOpenChange,
  title,
  description,
  confirmText,
  cancelText,
  onConfirm,
  onCancel,
}) => {
  const { t } = useTranslation();
  const { dir } = useLanguage();
  const isRTL = dir === 'rtl';

  const handleCancel = useCallback(() => {
    onOpenChange?.(false);
    onCancel?.();
  }, [onOpenChange, onCancel]);

  const handleConfirm = useCallback(() => {
    onOpenChange?.(false);
    onConfirm?.();
  }, [onOpenChange, onConfirm]);

  return (
    <AnimatePresence>
      {open && (
        <ModalOverlay onClose={handleCancel}>
          <motion.div
            key="custom-dialog"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: ANIMATION_DURATION, ease: 'easeInOut' }}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="relative rounded-lg shadow-xl p-4 md:p-6 min-w-[280px] max-w-[90vw] border flex flex-col items-center gap-5 outline-none"
            style={{
              backgroundColor: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              direction: isRTL ? 'rtl' : 'ltr',
              textAlign: isRTL ? 'right' : 'left',
              boxShadow:
                '0 10px 15px -3px rgba(0, 0, 0, 0.4), 0 4px 6px -2px rgba(0,0,0,0.1)',
            }}
          >
            <h2 className="text-lg font-semibold">{title}</h2>
            {description && (
              <p className="text-sm text-muted-foreground">{description}</p>
            )}
            <div className="flex w-full gap-3 pt-4">
              <ChronicleButton
                onClick={handleCancel}
                backgroundColor="hsl(var(--foreground))"
                hoverBackgroundColor="hsl(var(--accent))"
                textColor="hsl(var(--background))"
                hoverTextColor="hsl(var(--foreground))"
                borderVisible={false}
                borderRadius="var(--radius)"
                fontWeight={500}
                className="flex-1"
              >
                {t('cancel')}
              </ChronicleButton>

              <ChronicleButton
                onClick={handleConfirm}
                backgroundColor="hsl(var(--background))"
                textColor="hsl(var(--foreground))"
                hoverTextColor="hsl(var(--foreground))"
                borderColor="hsl(var(--border))"
                borderVisible
                hoverBorderVisible
                hoverBorderColor="var(--delete-accent)"
                hoverBackgroundColor="var(--delete-accent)"
                borderRadius="var(--radius)"
                fontWeight={500}
                className="flex-1"
              >
                {t('delete')}
              </ChronicleButton>
            </div>
          </motion.div>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};
