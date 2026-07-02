"use client";
import React, { useState } from "react";
import { useTranslation } from "@/hooks/use-translation";

interface PoweredByBadgesProps {
  isRTL?: boolean;
  isMobile?: boolean;
}

export default function PoweredByBadges({
  isRTL = false,
  isMobile = false,
}: PoweredByBadgesProps) {
  const { t } = useTranslation();

  // Track hover states individually per badge ID
  const [hoveredBadgeId, setHoveredBadgeId] = useState<string | null>(null);

  // Translation keys mapping dynamically based on the hook system
  const badgesData = [
    {
      id: "namer-ui-badge",
      href: "https://namer-ui.vercel.app/",
      logo: "/Namer.png",
      topText: t("namerUi"),
      subText: t("poweredBy"),
      logoBg: "linear-gradient(135deg, #4776cb, #a19fe5, #6cc606)",
      hasImageBorder: false,
    },
    {
      id: "paper-badge",
      href: "https://shaders.paper.design/",
      logo: "/paper-logo.webp",
      topText: isRTL ? "פייפר שיידרס" : "Paper Shaders",
      subText: t("poweredBy"),
      logoBg: "#000000",
      hasImageBorder: true,
    },
  ];

  return (
    <>
      <div className="flex flex-col items-center gap-6 w-fit mt-4">
        {badgesData.map((badge) => {
          const isHovered = hoveredBadgeId === badge.id;
          return (
            <a
              key={badge.id}
              href={badge.href}
              target="_blank"
              rel="noopener noreferrer"
              dir={isRTL ? "rtl" : "ltr"}
              className="badge-card flex flex-col justify-between rounded-[12px] select-none cursor-pointer w-fit"
              style={{
                background: isHovered ? "#141414" : "#111",
                border: `1px solid ${isHovered ? "#303030" : "#242424"}`,
                padding: isMobile ? "8px 16px 16px 16px" : "16px 24px 24px 24px",
                textAlign: isRTL ? "right" : "left",
                transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
              }}
              onClick={(e) => e.stopPropagation()}
              onMouseEnter={() => setHoveredBadgeId(badge.id)}
              onMouseLeave={() => setHoveredBadgeId(null)}
            >
              {/* Sub-text Banner Row */}
              <span className="text-muted-foreground text-[12px] mb-2 select-none block">
                {badge.subText}
              </span>

              {/* Logo / Text row */}
              <div
                className="flex items-center gap-3"
                style={{
                  justifyContent: isRTL ? "flex-end" : "flex-start",
                }}
              >
                {/* Logo Frame Box */}
                <span
                  style={{
                    width: "32px",
                    height: "32px",
                    minWidth: "32px",
                    minHeight: "32px",
                    boxSizing: "border-box",
                    background: badge.logoBg,
                    borderRadius: "8px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    overflow: "hidden",
                    border: badge.hasImageBorder
                      ? `1px solid ${isHovered ? "#303030" : "#242424"}`
                      : "none",
                  }}
                >
                  <img
                    src={badge.logo}
                    alt={badge.topText}
                    width={32}
                    height={32}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "contain",
                      display: "block",
                    }}
                    draggable={false}
                  />
                </span>

                {/* 3D Rolling Flip Text */}
                <span className="flip-wrapper">
                  <span>
                    <em className="flip-text">
                      <span className="font-bold text-base text-foreground select-none whitespace-nowrap block">
                        {badge.topText}
                      </span>
                    </em>
                  </span>
                  <span>
                    <em className="flip-text">
                      <span className="font-bold text-base text-foreground select-none whitespace-nowrap block">
                        {badge.topText}
                      </span>
                    </em>
                  </span>
                </span>
              </div>
            </a>
          );
        })}
      </div>

      {/* Styled JSX Stylesheet */}
      <style jsx>{`
        .flip-wrapper {
          position: relative;
          display: block;
          perspective: 108px;
        }
        .flip-wrapper span {
          display: block;
        }
        .flip-wrapper span:nth-of-type(2) {
          position: absolute;
          top: 0;
          left: 0;
        }
        .flip-text {
          font-style: normal;
          display: inline-block;
          font-size: inherit;
          font-weight: inherit;
          line-height: inherit;
          will-change: transform, opacity;
          transition: transform 0.55s cubic-bezier(0.645, 0.045, 0.355, 1),
            opacity 0.35s linear 0.2s;
        }
        .flip-wrapper span:nth-of-type(1) .flip-text {
          transform-origin: top;
          opacity: 1;
          transform: rotateX(0deg);
        }
        .flip-wrapper span:nth-of-type(2) .flip-text {
          opacity: 0;
          transform: rotateX(-90deg) scaleX(0.9) translate3d(0, 10px, 0);
          transform-origin: bottom;
        }
        .badge-card:hover .flip-wrapper span:nth-of-type(1) .flip-text {
          opacity: 0;
          transform: rotateX(90deg) scaleX(0.9) translate3d(0, -10px, 0);
        }
        .badge-card:hover .flip-wrapper span:nth-of-type(2) .flip-text {
          opacity: 1;
          transform: rotateX(0deg) scaleX(1) translateZ(0);
          transition: transform 0.75s cubic-bezier(0.645, 0.045, 0.355, 1),
            opacity 0.35s linear 0.3s;
        }
      `}</style>
    </>
  );
}