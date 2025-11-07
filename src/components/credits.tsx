'use client';
import { useTranslation } from "@/hooks/use-translation";
import { useLanguage } from "@/contexts/language-context";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "./ui/card";

export const Credits = () => {
    const { t } = useTranslation();
    const { language } = useLanguage();
    const isRTL = language === 'he';
    
    const creditsMarkdown = `
[GradientGen](https://github.com/noegarsoux/GradientGen) by [noegarsoux](https://github.com/noegarsoux)

[Tranquiluxe](https://uvcanvas.com/docs/components/tranquiluxe) by [UVCanvas](https://uvcanvas.com/)

[Shader Art Coding Introduction](https://www.shadertoy.com/view/mtyGWy) by [kishimisu](https://www.shadertoy.com/user/kishimisu)

[流尾4](https://www.shadertoy.com/view/tXSBD1) by [yufengjie](https://www.shadertoy.com/user/yufengjie)

[Kaleidoscope Beam](https://www.shadertoy.com/view/t3SfW1) by [jshguo](https://www.shadertoy.com/user/jshguo)

[Balatro Background Shaders](https://www.shadertoy.com/view/XXtBRr) by [xxidbr9](https://www.shadertoy.com/user/xxidbr9)

[Voronoi - distances](https://www.shadertoy.com/view/ldl3W8) by [iq](https://www.shadertoy.com/user/iq)

[Noise animation - Electric](https://www.shadertoy.com/view/ldlXRS) by [nimitz](https://www.shadertoy.com/user/nimitz)

[Novatrix](https://uvcanvas.com/docs/components/novatrix) by [UVCanvas](https://uvcanvas.com/)

[Color Picker](https://21st.dev/community/components/uplusion23/color-picker/color-picker-with-swatches-and-onchange) by [Trevor McIntire](https://21st.dev/community/uplusion23)

[vue-color-wheel](https://vue-color-wheel.vercel.app/) by [Robert Shaw](https://github.com/xiaoluoboding)

[Resizable Navbar](https://ui.aceternity.com/components/resizable-navbar) by [Aceternity UI](https://ui.aceternity.com/)

[Chronicle Button](https://codepen.io/Haaguitos/pen/OJrVZdJ) by [Haaguitos](https://codepen.io/Haaguitos)

[Wheel Picker](https://21st.dev/ncdai/wheel-picker/default) by [Chánh Đại](https://21st.dev/ncdai)

[React Wheel Picker](https://www.npmjs.com/package/@ncdai/react-wheel-picker) by [Chánh Đại](https://github.com/ncdai)

[すりガラスなプロフィールカード](https://codepen.io/ash_creator/pen/zYaPZLB) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[framer-motion](https://www.npmjs.com/package/framer-motion)

[motion](https://www.npmjs.com/package/motion)

[AnimateIcons](https://animateicons.vercel.app/)

[i18next](https://www.npmjs.com/package/i18next)

[Lucide React](https://www.npmjs.com/package/lucide-react)

[uuid](https://www.npmjs.com/package/uuid)

[radix-ui](https://www.npmjs.com/package/radix-ui)

[Custom Checkbox](https://21st.dev/Edil-ozi/custom-checkbox/default) by [Edil Ozi](https://21st.dev/Edil-ozi)

[チェックしないと押せないボタン](https://codepen.io/ash_creator/pen/JjZReNm) by [あしざわ - Webクリエイター](https://codepen.io/ash_creator)

[Input Floating Label animation](https://codepen.io/Mahe76/pen/qBQgXyK) by [Elpeeda](https://codepen.io/Mahe76)

[Accordion](https://21st.dev/molecule-lab-rushil/accordion/default) by [Molecule UI](https://21st.dev/molecule-ui)

[View transitions - Demo](https://codepen.io/stefanjudis/pen/ByBbNGQ) by [Stefan Judis](https://codepen.io/stefanjudis)
`;

    function renderEntry(entry: string) {
        const regex = /\[([^\]]+)\]\(([^)]+)\)/g;
        const parts: React.ReactNode[] = [];
        let lastIndex = 0;
        let match: RegExpExecArray | null;
        let key = 0;
    
        while ((match = regex.exec(entry)) !== null) {
          if (match.index > lastIndex) {
            parts.push(<span key={key++}>{entry.slice(lastIndex, match.index)}</span>);
          }
          let label = match[1];
          parts.push(
            <a key={key++} href={match[2]} target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              {label}
            </a>
          );
          lastIndex = regex.lastIndex;
        }
    
        if (lastIndex < entry.length) {
          parts.push(<span key={key++}>{entry.slice(lastIndex)}</span>);
        }
    
        return parts;
    }

    const creditEntries = creditsMarkdown.trim().split('\n').map(e => e.trim()).filter(Boolean);

    return (
        <Card className="bg-transparent border-0 shadow-none">
            <CardHeader style={{textAlign: isRTL ? 'right' : 'left'}}>
                <CardDescription style={{ direction: isRTL ? 'rtl' : 'ltr'}}>{t('creditDescription')}</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-start gap-6 h-auto" dir={isRTL ? 'rtl' : 'ltr'}>
                 <ul style={{ listStyleType: "none", padding: 0, margin: 0, lineHeight: 1.75, textAlign: isRTL ? "right" : "left", direction: isRTL ? "rtl" : "ltr", alignSelf: isRTL ? 'flex-end' : 'flex-start' }} >
                    {creditEntries.map((entry, idx) => (
                        <li key={idx} style={{ marginBottom: idx === creditEntries.length - 1 ? 0 : 20, wordWrap: "break-word", wordBreak: "break-word", whiteSpace: "normal", fontSize: "1rem" }} >
                            {renderEntry(entry)}
                        </li>
                    ))}
                </ul>
            </CardContent>
        </Card>
    );
};
