'use client';
import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/hooks/use-translation";
import NamerUiBadge from "./namer-ui-badge";
import useIsRTL from "@/hooks/use-is-rtl";
import React, { useState, useEffect } from "react";

type TextPart = {
  text: string;
  isLink: boolean;
  link?: { href: string; text: string };
};

type LanguageStrings = {
  line: TextPart[];
};

// Basic sanitization: allow only http(s) links (add more rules as needed)
function sanitizeUrl(url: string): string | null {
  try {
    const parsed = new URL(url);
    if (parsed.protocol === "http:" || parsed.protocol === "https:") {
      return url;
    }
    return null;
  } catch {
    return null;
  }
}

export function AppFooter() {
  const { language } = useLanguage();
  const { t } = useTranslation();
  const isRTL = useIsRTL();

  const [isProductHuntBadgeHovered, setIsProductHuntBadgeHovered] = useState(false);
  const [isFoundrListBadgeHovered, setIsFoundrListBadgeHovered] = useState(false);

  const [foundrListBadgeVisible, setFoundrListBadgeVisible] = useState(false);
  const [productHuntBadgeVisible, setProductHuntBadgeVisible] = useState(false);

  // Badge image URLs and links (sanitized)
  const foundrListBadgeImg = "https://www.foundrlist.me/api/badge/merucav?style=featured";
  const foundrListBadgeLink = "https://www.foundrlist.me/product/merucav";

  const productHuntBadgeImg =
    "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1036518&theme=dark&t=1763045126301";
  const productHuntBadgeLink =
    "https://www.producthunt.com/products/merucav?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-merucav";

  // Sanitize links
  const safeFoundrListBadgeLink = sanitizeUrl(foundrListBadgeLink);
  const safeProductHuntBadgeLink = sanitizeUrl(productHuntBadgeLink);

  useEffect(() => {
    let foundrTimeout: NodeJS.Timeout;
    const img = new Image();

    img.onload = () => {
      clearTimeout(foundrTimeout);
      setFoundrListBadgeVisible(true);
    };

    img.onerror = () => {
      clearTimeout(foundrTimeout);
      setFoundrListBadgeVisible(false);
    };

    img.src = foundrListBadgeImg;

    foundrTimeout = setTimeout(() => {
      // If not loaded within 5 seconds hide badge
      setFoundrListBadgeVisible(false);
    }, 5000);

    return () => {
      clearTimeout(foundrTimeout);
    };
  }, [foundrListBadgeImg]);

  useEffect(() => {
    let productHuntTimeout: NodeJS.Timeout;
    const img = new Image();

    img.onload = () => {
      clearTimeout(productHuntTimeout);
      setProductHuntBadgeVisible(true);
    };

    img.onerror = () => {
      clearTimeout(productHuntTimeout);
      setProductHuntBadgeVisible(false);
    };

    img.src = productHuntBadgeImg;

    productHuntTimeout = setTimeout(() => {
      setProductHuntBadgeVisible(false);
    }, 5000);

    return () => {
      clearTimeout(productHuntTimeout);
    };
  }, [productHuntBadgeImg]);

    const madeByText: Record<string, LanguageStrings> = {
        en: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
        he: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "מקסים בורטניקוב", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "מקסים בורטניקוב" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: " ,", isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ו", isLink: false }, { text: "פיירבייס סטודיו", isLink: true, link: { href: "https://firebase.studio/", text: "פיירבייס סטודיו" } } ]},
        it: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
        es: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
        pt: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
        yue: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: "、", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
        ja: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: "、", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
        de: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
        fr: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
        ko: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
        vi: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ] },
        pl: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
        cs: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
        hu: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
        nl: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
    };

  const renderTextParts = (parts: TextPart[]) =>
    parts.map((part, index) =>
      part.isLink && part.link && sanitizeUrl(part.link.href) ? (
        <a
          key={index}
          href={sanitizeUrl(part.link.href) || "#"}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {part.link.text}
        </a>
      ) : (
        <span key={index}>{part.text}</span>
      )
    );

  const currentLangStrings = madeByText[language as keyof typeof madeByText] || madeByText.en;

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className="text-center text-muted-foreground mt-12 py-10 border-t border-border flex flex-col items-center gap-6"
    >
      {/* Internal stable component */}
      <NamerUiBadge isRTL={isRTL} poweredByText={t("poweredBy")} namerUIName={t("namerUi")} />

      {/* Foundr List Badge */}
      {foundrListBadgeVisible && safeFoundrListBadgeLink && (
        <div
          aria-label="Foundr badge"
          onMouseEnter={() => setIsFoundrListBadgeHovered(true)}
          onMouseLeave={() => setIsFoundrListBadgeHovered(false)}
          style={{
            borderRadius: "12px",
            border: `1px solid ${isFoundrListBadgeHovered ? "#303030" : "#242424"}`,
            background: isFoundrListBadgeHovered ? "#141414" : "#111",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "inline-block",
            userSelect: "none",
            maxWidth: "max-content",
            cursor: "pointer",
            minHeight: 64,
            minWidth: 200,
          }}
        >
          <a href={safeFoundrListBadgeLink} target="_blank" rel="noopener noreferrer">
            <img
              src={foundrListBadgeImg}
              alt="Merucav on FoundrList"
              width={200}
              height={64}
              loading="lazy"
              draggable={false}
              style={{ width: 200, height: 64 }}
            />
          </a>
        </div>
      )}

      {/* Product Hunt Badge */}
      {productHuntBadgeVisible && safeProductHuntBadgeLink && (
        <div
          aria-label="Product Hunt badge"
          onMouseEnter={() => setIsProductHuntBadgeHovered(true)}
          onMouseLeave={() => setIsProductHuntBadgeHovered(false)}
          style={{
            borderRadius: "12px",
            border: `1px solid ${isProductHuntBadgeHovered ? "#303030" : "#242424"}`,
            background: isProductHuntBadgeHovered ? "#141414" : "#111",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "inline-block",
            userSelect: "none",
            maxWidth: "max-content",
            cursor: "pointer",
            minHeight: 54,
            minWidth: 250,
          }}
        >
          <a href={safeProductHuntBadgeLink} target="_blank" rel="noopener noreferrer">
            <img
              src={productHuntBadgeImg}
              alt="Merucav - An advanced gradient design and editing tool | Product Hunt"
              width={250}
              height={54}
              loading="lazy"
              draggable={false}
              style={{ width: 250, height: 54 }}
            />
          </a>
        </div>
      )}

      <p className="break-words px-4">{renderTextParts(currentLangStrings.line)}</p>
    </footer>
  );
}
