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

[Velustro](https://uvcanvas.com/docs/components/velustro) by [UVCanvas](https://uvcanvas.com/)

[Tranquiluxe](https://uvcanvas.com/docs/components/tranquiluxe) by [UVCanvas](https://uvcanvas.com/)

[Shader Art Coding Introduction](https://www.shadertoy.com/view/mtyGWy) by [kishimisu](https://www.shadertoy.com/user/kishimisu)

[流尾4](https://www.shadertoy.com/view/tXSBD1) by [yufengjie](https://www.shadertoy.com/user/yufengjie)

[Kaleidoscope Beam](https://www.shadertoy.com/view/t3SfW1) by [jshguo](https://www.shadertoy.com/user/jshguo)

[Balatro Background Shaders](https://www.shadertoy.com/view/XXtBRr) by [xxidbr9](https://www.shadertoy.com/user/xxidbr9)

[Noise animation - Electric](https://www.shadertoy.com/view/ldlXRS) by [nimitz](https://www.shadertoy.com/user/nimitz)

[Particle Experiment 7](https://www.shadertoy.com/view/MddGWN) by [aiekick](https://www.shadertoy.com/user/aiekick)

[Novatrix](https://uvcanvas.com/docs/components/novatrix) by [UVCanvas](https://uvcanvas.com/)

[Voronoi - distances](https://www.shadertoy.com/view/ldl3W8) by [iq](https://www.shadertoy.com/user/iq)

[pulse](https://codepen.io/VaaLaa/pen/yyeQdMZ) by [Andrei V](https://codepen.io/VaaLaa)

[Truchet tiles](https://codepen.io/lekzd/pen/myPyoGM) by [Alexander Korotaev](https://codepen.io/lekzd)

[🌌 Pulsating Neon Shape GLSL](https://codepen.io/equant_org/pen/ByKxPrr) by [Fabio E Zola](https://codepen.io/equant_org)

[Harmonic Mandala in p5.js](https://codepen.io/VoXelo/pen/QwymLwW) by [Techartist](https://codepen.io/VoXelo)

[Non liquid glass](https://codepen.io/lekzd/pen/dPGYjdj) by [Alexander Korotaev](https://codepen.io/lekzd)

[Voronoi from Voronoi from Voronoi from Voronoi](https://codepen.io/lekzd/pen/JoYzXpR) by [Alexander Korotaev](https://codepen.io/lekzd)

[Floating voronoi lines](https://codepen.io/lekzd/pen/xbwMMzR) by [Alexander Korotaev](https://codepen.io/lekzd)

[grain gradient](https://shaders.paper.design/grain-gradient) by [Paper Shaders](https://shaders.paper.design/)

[swirl](https://shaders.paper.design/swirl) by [Paper Shaders](https://shaders.paper.design/)

[spiral](https://shaders.paper.design/spiral) by [Paper Shaders](https://shaders.paper.design/)

[shaders](https://github.com/paper-design/shaders) by [paper design](https://github.com/paper-design)

[Neuro Noise (GLSL Shader)](https://codepen.io/ksenia-k/pen/vYwgrWv) by [Ksenia Kondrashova](https://codepen.io/ksenia-k)

[Highway to Heaven](https://codepen.io/sabosugi/pen/azpqWKE) by [Sabo Sugi](https://codepen.io/sabosugi)

[Hall of Fractals](https://codepen.io/sabosugi/pen/gbgeXja) by [Sabo Sugi](https://codepen.io/sabosugi)

[Rails in Space](https://codepen.io/sabosugi/pen/xbgWXMP) by [Sabo Sugi](https://codepen.io/sabosugi)

[Inside UFO Spaceship](https://codepen.io/sabosugi/pen/XJpqjpo) by [Sabo Sugi](https://codepen.io/sabosugi)

[Fork B of - A space flower](https://www.shadertoy.com/view/tfBXzD) by [bennoH](https://www.shadertoy.com/user/bennoH)

[Golden Electric Spiral](https://www.shadertoy.com/view/csj3zt) by [SnoopethDuckDuck](https://www.shadertoy.com/user/SnoopethDuckDuck)

[yee1212](https://www.shadertoy.com/view/sldGRS) by [dspindler](https://www.shadertoy.com/user/dspindler)

[Starry planes](https://www.shadertoy.com/view/MfjyWK) by [mrange](https://www.shadertoy.com/user/mrange)

[Grid Attractor](https://www.shadertoy.com/view/43cBzn) by [takumifukasawa](https://www.shadertoy.com/user/takumifukasawa)

[Tunnel Cylinders](https://www.shadertoy.com/view/MlsfWS) by [balkhan](https://www.shadertoy.com/user/balkhan)

[psychedelic flower tunnel](https://www.shadertoy.com/view/WtsXzs) by [takumifukasawa](https://www.shadertoy.com/user/takumifukasawa)

[Falling Through the Sky](https://codepen.io/editor/sabosugi/pen/019fb43d-e522-7293-9ac9-9ca77a280155) by [Sabo Sugi](https://codepen.io/sabosugi)

[Disco Hive](https://www.shadertoy.com/view/7c3XRj) by [noztol](https://www.shadertoy.com/user/noztol)

[Disco Hexnel](https://www.shadertoy.com/view/fcdSDM) by [noztol](https://www.shadertoy.com/user/noztol)

[Kaleidoscope Wheels](https://www.shadertoy.com/view/fctXWM) by [noztol](https://www.shadertoy.com/user/noztol)

[Disco Fever](https://www.shadertoy.com/view/NftXzj) by [noztol](https://www.shadertoy.com/user/noztol)

[Fly in Particles CIty](https://codepen.io/editor/sabosugi/pen/019fd6d0-e2fe-7d58-a1c3-69c53d13b500) by [Sabo Sugi](https://codepen.io/sabosugi)

[Quantum Shapes](https://www.shadertoy.com/view/ff3SR4) by [noztol](https://www.shadertoy.com/user/noztol)

[Glass Origin](https://www.shadertoy.com/view/scS3Wy) by [Frostbyte_](https://www.shadertoy.com/user/Frostbyte_)

[Mandala Dice](https://www.shadertoy.com/view/NfG3zm) by [noztol](https://www.shadertoy.com/user/noztol)

[Rainbow Travel](https://www.shadertoy.com/view/f3XGWS) by [noztol](https://www.shadertoy.com/user/noztol)

[Cubic Spin](https://www.shadertoy.com/view/scV3DR) by [noztol](https://www.shadertoy.com/user/noztol)

[Formless](https://www.shadertoy.com/view/Ncy3R3) by [noztol](https://www.shadertoy.com/user/noztol)

[Inside Quantum Core](https://codepen.io/editor/sabosugi/pen/01a02fca-0d14-7e50-a9b8-283d419ccaea) by [Sabo Sugi](https://codepen.io/sabosugi)

[Neon Kaleidoscope](https://codepen.io/editor/sabosugi/pen/01a02f92-c5a4-7680-9919-88d6778ba369) by [Sabo Sugi](https://codepen.io/sabosugi)

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

[Google Gemini](https://gemini.google.com/app)

[Anthropic's Claude Sonnet 5](https://claude.ai/)

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
