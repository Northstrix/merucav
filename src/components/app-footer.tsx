"use client";

import { useLanguage } from "@/contexts/language-context";
import { useTranslation } from "@/hooks/use-translation";
import NamerUiBadge from "./namer-ui-badge";
import useIsRTL from "@/hooks/use-is-rtl";
import React, { useState, useEffect } from "react";

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
  line2?: TextPart[];
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

  const [isProductHuntBadgeHovered, setIsProductHuntBadgeHovered] =
    useState(false);
  const [isFoundrListBadgeHovered, setIsFoundrListBadgeHovered] =
    useState(false);
  const [foundrListBadgeVisible, setFoundrListBadgeVisible] = useState(false);
  const [productHuntBadgeVisible, setProductHuntBadgeVisible] = useState(false);

  const [verifiedToolsLoaded, setVerifiedToolsLoaded] = useState(false);
  const [twelveToolsLoaded, setTwelveToolsLoaded] = useState(false);
  const [auraPlusPlusLoaded, setAuraPlusPlusLoaded] = useState(false);
  const [startupFameLoaded, setStartupFameLoaded] = useState(false);
  const [launchItLoaded, setLaunchItLoaded] = useState(false);

  const foundrListBadgeImg = "https://www.foundrlist.me/api/badge/merucav?style=featured";
  const foundrListBadgeLink = "https://www.foundrlist.me/product/merucav";

  const productHuntBadgeImg =
    "https://api.producthunt.com/widgets/embed-image/v1/featured.svg?post_id=1036518&theme=dark&t=1763045126301";
  const productHuntBadgeLink =
    "https://www.producthunt.com/products/merucav?embed=true&utm_source=badge-featured&utm_medium=badge&utm_source=badge-merucav";

  const verifiedToolsImg = "https://www.verifiedtools.info/badge.png";
  const verifiedToolsLink = "https://www.verifiedtools.info";

  const twelveToolsImg = "https://twelve.tools/badge0-dark.svg";
  const twelveToolsLink = "https://twelve.tools";

  const auraPlusPlusImg = "https://auraplusplus.com/images/badges/featured-on-light.svg";
  const auraPlusPlusLink = "https://auraplusplus.com/projects/merucav";

  const startupFameImg = "https://startupfa.me/badges/featured/dark.webp";
  const startupFameLink =
    "https://startupfa.me/s/merucav.netlify.app?utm_source=merucav.netlify.app";

  const launchItImg = "https://launchit.site/badges/featured-light-v2.svg";
  const launchItLink = "https://launchit.site/launches/merucav";

  const safeFoundrListBadgeLink = sanitizeUrl(foundrListBadgeLink);
  const safeProductHuntBadgeLink = sanitizeUrl(productHuntBadgeLink);
  const safeVerifiedToolsLink = sanitizeUrl(verifiedToolsLink);
  const safeTwelveToolsLink = sanitizeUrl(twelveToolsLink);
  const safeAuraPlusPlusLink = sanitizeUrl(auraPlusPlusLink);
  const safeStartupFameLink = sanitizeUrl(startupFameLink);
  const safeLaunchItLink = sanitizeUrl(launchItLink);

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
      he: { 
        line: [ // FIRST LINE: "נוצר על ידי מקסים בורטניקוב"
          { text: `${t('madeBy')} `, isLink: false },
          { text: "מקסים בורטניקוב", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "מקסים בורטניקוב" } }
        ],
        line2: [ // SECOND LINE: "באמצעות Next.js, Perplexity ופיירבייס סטודיו"
          { text: ` ${t('using')} `, isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: " ,", isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ו", isLink: false }, { text: "פיירבייס סטודיו", isLink: true, link: { href: "https://firebase.studio/", text: "פיירבייס סטודיו" } }
        ]
      },
      it: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
      es: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
      pt: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
      yue: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: "、", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
      ja: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: "、", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
      de: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
      fr: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
      ko: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ]},
      vi: { line: [ { text: `${t('madeBy')} `, isLink: false }, { text: "Maxim Bortnikov", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "Maxim Bortnikov" } }, { text: ` ${t('using')} `, isLink: false }, { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, { text: ", ", isLink: false }, { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, { text: t('and'), isLink: false }, { text: "Firebase Studio", isLink: true, link: { href: "https://firebase.studio/", text: "Firebase Studio" } } ] },
      hi: { line: [ 
        { text: `${t('madeBy')} `, isLink: false }, 
        { text: "मैक्सिम बोर्टनिकोव", isLink: true, link: { href: "https://maxim-bortnikov.netlify.app/", text: "मैक्सिम बोर्टनिकोव" } }, 
        { text: ` ${t('using')} `, isLink: false }, 
        { text: "Next.js", isLink: true, link: { href: "https://nextjs.org/", text: "Next.js" } }, 
        { text: ", ", isLink: false }, 
        { text: "Perplexity", isLink: true, link: { href: "https://www.perplexity.ai/", text: "Perplexity" } }, 
        { text: t('and'), isLink: false }, 
        { text: "फायरबेस स्टूडियो", isLink: true, link: { href: "https://firebase.studio/", text: "फायरबेस स्टूडियो" } } 
      ]},     
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

  return (
    <footer
      dir={isRTL ? "rtl" : "ltr"}
      className="text-center text-muted-foreground mt-12 py-10 border-t border-border flex flex-col items-center gap-6"
    >
      <NamerUiBadge
        isRTL={isRTL}
        poweredByText={t("poweredBy")}
        namerUIName={t("namerUi")}
      />

      {/* Foundr List Badge */}
      {foundrListBadgeVisible && safeFoundrListBadgeLink && (
        <div
          aria-label="Foundr badge"
          onMouseEnter={() => setIsFoundrListBadgeHovered(true)}
          onMouseLeave={() => setIsFoundrListBadgeHovered(false)}
          style={{
            borderRadius: "12px",
            border: `1px solid ${
              isFoundrListBadgeHovered ? "#303030" : "#242424"
            }`,
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
          <a
            href={safeFoundrListBadgeLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={foundrListBadgeImg}
              alt="Merucav on FoundrList"
              width={200}
              height={64}
              loading="lazy"
              draggable={false}
              style={{ width: 200, height: 64, borderRadius: "12px" }}
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
            border: `1px solid ${
              isProductHuntBadgeHovered ? "#303030" : "#242424"
            }`,
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
          <a
            href={safeProductHuntBadgeLink}
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src={productHuntBadgeImg}
              alt="Merucav - An advanced gradient design and editing tool | Product Hunt"
              width={250}
              height={54}
              loading="lazy"
              draggable={false}
              style={{ width: 250, height: 54, borderRadius: "12px" }}
            />
          </a>
        </div>
      )}

      {/* Verified Tools badge */}
      {safeVerifiedToolsLink && (
        <a
          href={verifiedToolsLoaded ? safeVerifiedToolsLink : undefined}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
            pointerEvents: verifiedToolsLoaded ? "auto" : "none",
          }}
        >
          <img
            src={verifiedToolsImg}
            alt={verifiedToolsLoaded ? "Verified on Verified Tools" : ""}
            loading="lazy"
            onLoad={() => setVerifiedToolsLoaded(true)}
            onError={() => setVerifiedToolsLoaded(false)}
            style={{
              borderRadius: 6,
              opacity: verifiedToolsLoaded ? 1 : 0.01,
              height: verifiedToolsLoaded ? "72px" : "1px",
              width: "auto",
              objectFit: "contain",
              transition: "opacity 0.2s ease-out",
            }}
          />
        </a>
      )}

      {/* Aura++ badge – outline wraps around badge, no padding */}
      {safeAuraPlusPlusLink && (
        <div
          aria-label="Aura++ badge"
          style={{
            borderRadius: "12px",
            transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            display: "inline-block",
            userSelect: "none",
            maxWidth: "max-content",
            cursor: auraPlusPlusLoaded ? "pointer" : "default",
            height: "auto",
          }}
        >
          <a
            href={auraPlusPlusLoaded ? safeAuraPlusPlusLink : undefined}
            target="_blank"
            rel="noopener noreferrer"
            style={{
              pointerEvents: auraPlusPlusLoaded ? "auto" : "none",
              display: "inline-flex",
              justifyContent: "center",
              alignItems: "center",
              textDecoration: "none",
            }}
          >
            <img
              src={auraPlusPlusImg}
              alt={auraPlusPlusLoaded ? "Featured on Aura++" : ""}
              loading="lazy"
              onLoad={() => setAuraPlusPlusLoaded(true)}
              onError={() => setAuraPlusPlusLoaded(false)}
              style={{
                borderRadius: "12px",
                opacity: auraPlusPlusLoaded ? 1 : 0.01,
                height: auraPlusPlusLoaded ? "54px" : "1px",
                width: "auto",
                objectFit: "contain",
                display: "block",
                transition: "opacity 0.2s ease-out",
              }}
            />
          </a>
        </div>
      )}

      {/* LaunchIt badge */}
      {safeLaunchItLink && (
        <a
          href={launchItLoaded ? safeLaunchItLink : undefined}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
            pointerEvents: launchItLoaded ? "auto" : "none",
          }}
        >
          <img
            src={launchItImg}
            alt={launchItLoaded ? "Merucav - Featured on LaunchIt" : ""}
            width={250}
            height={54}
            loading="lazy"
            onLoad={() => setLaunchItLoaded(true)}
            onError={() => setLaunchItLoaded(false)}
            style={{
              borderRadius: 6,
              opacity: launchItLoaded ? 1 : 0.01,
              height: launchItLoaded ? "54px" : "1px",
              width: "auto",
              objectFit: "contain",
              transition: "opacity 0.2s ease-out",
            }}
          />
        </a>
      )}

      {/* Twelve Tools badge */}
      {safeTwelveToolsLink && (
        <a
          href={twelveToolsLoaded ? safeTwelveToolsLink : undefined}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
            pointerEvents: twelveToolsLoaded ? "auto" : "none",
          }}
        >
          <img
            src={twelveToolsImg}
            alt={twelveToolsLoaded ? "Featured on Twelve Tools" : ""}
            loading="lazy"
            onLoad={() => setTwelveToolsLoaded(true)}
            onError={() => setTwelveToolsLoaded(false)}
            style={{
              borderRadius: 6,
              opacity: twelveToolsLoaded ? 1 : 0.01,
              height: twelveToolsLoaded ? "54px" : "1px",
              width: "auto",
              objectFit: "contain",
              transition: "opacity 0.2s ease-out",
            }}
          />
        </a>
      )}

      {/* Startup Fame badge */}
      {safeStartupFameLink && (
        <a
          href={startupFameLoaded ? safeStartupFameLink : undefined}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            justifyContent: "center",
            alignItems: "center",
            textDecoration: "none",
            pointerEvents: startupFameLoaded ? "auto" : "none",
          }}
        >
          <img
            src={startupFameImg}
            alt={
              startupFameLoaded ? "Merucav - Featured on Startup Fame" : ""
            }
            width={171}
            height={54}
            loading="lazy"
            onLoad={() => setStartupFameLoaded(true)}
            onError={() => setStartupFameLoaded(false)}
            style={{
              borderRadius: 6,
              opacity: startupFameLoaded ? 1 : 0.01,
              height: startupFameLoaded ? "54px" : "1px",
              width: "auto",
              objectFit: "contain",
              transition: "opacity 0.2s ease-out",
            }}
          />
        </a>
      )}

      {/* Made-by credits - FULLY TYPE SAFE */}
      {language === 'he' ? (
        <>
          <p className="break-words px-4 text-right" dir="rtl">
            {renderTextParts((madeByText.he as { line: TextPart[]; line2: TextPart[] }).line)}
          </p>
          <p className="break-words px-4 text-right mt-[-18px]" dir="rtl">
            {renderTextParts((madeByText.he as { line: TextPart[]; line2: TextPart[] }).line2)}
          </p>
        </>
      ) : (
        <p className="break-words px-4">
          {renderTextParts(
            'line' in (madeByText[language as keyof typeof madeByText] || madeByText.en)
              ? (madeByText[language as keyof typeof madeByText] || madeByText.en).line
              : madeByText.en.line
          )}
        </p>
      )}

    </footer>
  );
}
