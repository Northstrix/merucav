"use client";

import React from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { ModalOverlay } from '@/components/modal-overlay';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/use-translation';

interface LoadingModalProps {
  open: boolean;
  showSpinner?: boolean;
}

const ANIMATION_DURATION = 0.3;

export const LoadingModal: React.FC<LoadingModalProps> = ({
  open,
  showSpinner = true,
}) => {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const isRTL = dir === 'rtl';

  return (
    <AnimatePresence>
      {open && (
        <ModalOverlay onClose={() => {}}>
          <motion.div
            key="loading-modal"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: ANIMATION_DURATION, ease: 'easeInOut' }}
            tabIndex={-1}
            onClick={(e) => e.stopPropagation()}
            className="relative rounded-lg shadow-xl p-6 md:p-8 min-w-[240px] max-w-[90vw] border flex flex-col items-center gap-4 outline-none"
            style={{
              backgroundColor: 'hsl(var(--background))',
              borderColor: 'hsl(var(--border))',
              direction: isRTL ? 'rtl' : 'ltr',
              textAlign: 'center',
            }}
          >
            {showSpinner && <div className="w-8 h-8 border-4 border-dashed rounded-full animate-spin border-primary"></div>}
            <div className="text-sm text-muted-foreground">
              <div>{t('loading')}</div>
              <div>{t('pleaseWait')}</div>
            </div>
          </motion.div>
        </ModalOverlay>
      )}
    </AnimatePresence>
  );
};
