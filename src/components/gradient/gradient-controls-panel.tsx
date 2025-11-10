'use client';

import { GradientConfig } from './types';
import { GradientPropertiesEditor } from './gradient-properties-editor';
import { GradientOverlayEditor } from './gradient-overlay-editor';
import { GradientExport } from './gradient-export';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { OrbsEditor } from './orbs-editor';
import { useTranslation } from '@/hooks/use-translation';
import { ScrollArea } from '../ui/scroll-area';
import { Credits } from '../credits';
import { AppFooter } from '../app-footer';
import { HeaderCard } from '../header-card';
import { Card } from '../ui/card';

interface GradientControlsPanelProps {
  config: GradientConfig;
  setConfig: (config: GradientConfig) => void;
  openConfirmDialog: (title: string, description: string, onConfirm: () => void) => void;
}

export function GradientControlsPanel({
  config,
  setConfig,
  openConfirmDialog,
}: GradientControlsPanelProps) {
  const { t } = useTranslation();

  return (
    <ScrollArea className="w-full h-full pr-2 no-scrollbar">
      <div className="space-y-4">
        <HeaderCard />

        <Card>
          <Accordion
            type="multiple"
            defaultValue={['shaders']}
            className="w-full"
          >
            <AccordionItem value="shaders" className="border-b-0">
              <AccordionTrigger className="px-4">{t('shaders')}</AccordionTrigger>
              <AccordionContent>
                <GradientPropertiesEditor config={config} setConfig={setConfig} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        <Card>
          <Accordion
            type="multiple"
            defaultValue={['orbs']}
            className="w-full"
          >
            <AccordionItem value="orbs" className="border-b-0">
              <AccordionTrigger className="px-4">{t('orbs')}</AccordionTrigger>
              <AccordionContent>
                <OrbsEditor
                  config={config}
                  setConfig={setConfig}
                  openConfirmDialog={openConfirmDialog}
                />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
        
        <Card>
           <Accordion
            type="multiple"
            className="w-full"
          >
            <AccordionItem value="effects" className="border-b-0">
              <AccordionTrigger className="px-4">{t('effects')}</AccordionTrigger>
              <AccordionContent>
                <GradientOverlayEditor config={config} setConfig={setConfig} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        <Card>
           <Accordion
            type="multiple"
            className="w-full"
          >
            <AccordionItem value="export" className="border-b-0">
              <AccordionTrigger className="px-4">{t('config')}</AccordionTrigger>
              <AccordionContent>
                <GradientExport config={config} setConfig={setConfig} />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>

        <Card>
           <Accordion
            type="multiple"
            className="w-full"
          >
            <AccordionItem value="credits" className="border-b-0">
              <AccordionTrigger className="px-4">{t('creditTitle')}</AccordionTrigger>
              <AccordionContent>
                <Credits />
                <AppFooter />
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </Card>
      </div>
    </ScrollArea>
  );
}
