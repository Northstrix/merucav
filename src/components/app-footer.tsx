'use client';

import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/hooks/use-translation";
import NamerUiBadge from "./namer-ui-badge";
import useIsRTL from "@/hooks/use-is-rtl";
import React, { useState } from "react";

type TextPart = {
  text: string;
  isLink: boolean;
  link?: {
    href: string;
    text: string;
  };
};

type LanguageStrings = {
  line: TextPart[];
};

const productHuntBadgeHTML = `
<a href="https://www.producthunt.com/products/merucav?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-merucav" target="_blank"><img src="https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1036518&theme=dark&t=1763045126301" alt="Merucav - An&#0032;advanced&#0032;gradient&#0032;design&#0032;and&#0032;editing&#0032;tool | Product Hunt" style="width: 250px; height: 54px;" width="250" height="54" /></a>
`;

export function AppFooter() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isRTL = useIsRTL();
  const [isHovered, setIsHovered] = useState(false);

    const madeByText: Record<string, LanguageStrings> = {
        en: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.google.com/", text: "Firebase Studio" } } ]},
        he: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "מקסים בורטניקוב", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "מקסים בורטניקוב" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: " ,", isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ו", isLink: false }, { text: "פיירבייס סטודיו", isLink: true, link: { href: "https://firebase.google.com/", text: "פיירבייס סטודיו" } } ]},
        it: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.google.com/", text: "Firebase Studio" } } ]},
        es: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.google.com/", text: "Firebase Studio" } } ]},
        pt: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.google.com/", text: "Firebase Studio" } } ]},
        yue: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: "、", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.google.com/", text: "Firebase Studio" } } ]},
        ja: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: "、", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.google.com/", text: "Firebase Studio" } } ]},
        de: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.google.com/", text: "Firebase Studio" } } ]},
        fr: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.google.com/", text: "Firebase Studio" } } ]},
        ko: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.google.com/", text: "Firebase Studio" } } ]},
        vi: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.google.com/", text: "Firebase Studio" } } ] },
        pl: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.google.com/", text: "Firebase Studio" } } ]},
        cs: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.google.com/", text: "Firebase Studio" } } ]},
        hu: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.google.com/", text: "Firebase Studio" } } ]},
        nl: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.google.com/", text: "Firebase Studio" } } ]},
    };

    const renderTextParts = (parts: TextPart[]) => {
        return parts.map((part, index) => {
            if (part.isLink && part.link) {
                return (
                    <a
                        key={index}
                        href={part.link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                    >
                        {part.link.text}
                    </a>
                );
            }
            return <span key={index}>{part.text}</span>;
        });
    };

    const currentLangStrings = madeByText[language as keyof typeof madeByText] || madeByText.en;


  return (
    <footer
      dir={isRTL ? 'rtl' : 'ltr'}
      className="text-center text-muted-foreground mt-12 py-10 border-t border-border flex flex-col items-center gap-6"
    >
      <NamerUiBadge 
        isRTL={isRTL} 
        poweredByText={t('poweredBy')}
        namerUIName={t('namerUi')}
      />
    <div
      aria-label="Product Hunt badge"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        borderRadius: "12px",
        border: `1px solid ${isHovered ? "#303030" : "#242424"}`,
        background: isHovered ? "#141414" : "#111",
        transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
        display: "inline-block",
        userSelect: "none",
        maxWidth: "max-content",
        cursor: "pointer",
      }}
      dangerouslySetInnerHTML={{ __html: productHuntBadgeHTML }}
    />
      <p className="break-words px-4">{renderTextParts(currentLangStrings.line)}</p>
    </footer>
  );
}
