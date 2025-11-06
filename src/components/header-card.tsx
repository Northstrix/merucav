'use client';

import React, { useRef } from 'react';
import { useLanguage } from '@/contexts/language-context';
import { useTranslation } from '@/hooks/use-translation';
import { GithubIcon } from './ui/github-icon';
import { GlobeIcon } from './ui/globe-icon';
import { Card } from './ui/card';
import { LanguageSelector, LanguageSelectorHandle } from '@/components/LanguageSelector';

export function HeaderCard() {
  const { dir } = useLanguage();
  const { t } = useTranslation();
  const isRTL = dir === 'rtl';
  const languageSelectorRef = useRef<LanguageSelectorHandle>(null);

  const openLanguageSelector = () => {
    languageSelectorRef.current?.open();
  };

  return (
    <>
      <Card>
        <div
          className="container flex h-14 max-w-screen-2xl items-center justify-between"
          style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
        >
          <a
            href="/"
            className="flex items-center gap-[10px] transition-colors duration-300 ease-in-out group"
            style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
          >
            <img
              src="/logo.png"
              alt="logo"
              width={32}
              height={32}
              className="rounded-md"
            />
            <span className="font-bold font-headline sm:inline-block transition-colors duration-300 ease-in-out text-[hsl(var(--foreground))] group-hover:text-[hsl(var(--accent))]">
              {t('appName')}
            </span>
          </a>

          <div
            className="flex items-center gap-2"
            style={{ flexDirection: isRTL ? 'row-reverse' : 'row' }}
          >
            <a
              href="https://github.com/Northstrix/merucav"
              target="_blank"
              rel="noopener noreferrer"
              className="group h-10 w-10 inline-flex items-center justify-center rounded-md transition-colors duration-300 ease-in-out hover:bg-[hsl(var(--accent))]"
            >
              <GithubIcon
                size={20}
                className="text-[hsl(var(--foreground))] transition-colors duration-300 ease-in-out group-hover:text-[hsl(var(--background))]"
              />
            </a>

            <div
              className="group h-10 w-10 inline-flex items-center justify-center rounded-md cursor-pointer transition-colors duration-300 ease-in-out hover:bg-[hsl(var(--accent))]"
              onClick={openLanguageSelector}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  openLanguageSelector();
                }
              }}
              aria-label={t('toggleLanguageSelector')}
            >
              <GlobeIcon
                size={20}
                className="text-[hsl(var(--foreground))] transition-colors duration-300 ease-in-out group-hover:text-[hsl(var(--background))]"
              />
              <span className="sr-only">Toggle language selector</span>
            </div>
          </div>
        </div>
      </Card>

      <LanguageSelector ref={languageSelectorRef} />
    </>
  );
}
