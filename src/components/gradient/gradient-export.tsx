'use client';
import { useState } from 'react';
import { GradientConfig } from './gradient-canvas';
import { Button } from '../ui/button';
import { Textarea } from '../ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from '@/hooks/use-translation';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../ui/tabs';

interface GradientExportProps {
  config: GradientConfig;
  setConfig: (config: GradientConfig) => void;
}

export function GradientExport({ config, setConfig }: GradientExportProps) {
  const { t } = useTranslation();
  const { toast } = useToast();
  const [importJson, setImportJson] = useState('');

  const configString = JSON.stringify(config, null, 2);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({ title: t('copiedToClipboard') });
  };

  const handleImport = () => {
    try {
      const newConfig = JSON.parse(importJson);
      // Basic validation
      if (newConfig && typeof newConfig === 'object' && 'shaders' in newConfig) {
        setConfig(newConfig);
        toast({ title: t('configImported') });
      } else {
        throw new Error('Invalid config format');
      }
    } catch (e) {
      toast({
        title: t('importFailed'),
        description: (e as Error).message,
        variant: 'destructive',
      });
    }
  };

  return (
    <div className="space-y-4 m-6">
        <Tabs defaultValue="export">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="export">{t('export')}</TabsTrigger>
                <TabsTrigger value="import">{t('import')}</TabsTrigger>
            </TabsList>
            <TabsContent value="export">
                <div className="space-y-2 mt-4">
                    <Textarea value={configString} readOnly rows={12} />
                   {/* <Button onClick={() => handleCopy(configString)} className="w-full">{t('copy')}</Button> */}
                </div>
            </TabsContent>
            <TabsContent value="import">
                <div className="space-y-2 mt-4">
                    <Textarea
                        value={importJson}
                        onChange={(e) => setImportJson(e.target.value)}
                        placeholder={t('pasteConfig')}
                        rows={12}
                    />
                    <Button onClick={handleImport} className="w-full">{t('apply')}</Button>
                </div>
            </TabsContent>
        </Tabs>
    </div>
  );
}
