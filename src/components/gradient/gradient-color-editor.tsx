'use client';
import { hsvaToHex } from '@uiw/color-convert';
import { useTranslation } from '@/hooks/use-translation';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '../ui/dialog';
import { ColorPaletteTools } from './color-palette-tools';
import { Button } from '../ui/button';
import { GradientConfig } from './types';


interface GradientColorEditorProps {
    config: GradientConfig;
    setConfig: (config: GradientConfig) => void;
}

export function GradientColorEditor({ config, setConfig }: GradientColorEditorProps) {
    const { t } = useTranslation();

    const handleAddColor = (hex: string) => {
        // This function is now a no-op since colors are not in the main config
        // Or it could be adapted to add a new orb with that color
        console.log("Add color:", hex);
    };

    return (
        <div className="grid gap-3" style={{ gridTemplateColumns: 'repeat(auto-fill, minmax(316px, 1fr))' }}>
            <Dialog>
                <DialogTrigger asChild>
                    <Button variant="outline" className="w-full" style={{ minWidth: 316, minHeight: 200, height: '100%' }}>{t('colorPalette')}</Button>
                </DialogTrigger>
                <DialogContent className="max-w-[90vw] w-full md:max-w-6xl h-[80vh] flex flex-col">
                    <DialogHeader>
                        <DialogTitle>{t('colorPalette')}</DialogTitle>
                    </DialogHeader>
                    <ColorPaletteTools onColorAdd={handleAddColor}/>
                </DialogContent>
            </Dialog>
        </div>
    );
}
