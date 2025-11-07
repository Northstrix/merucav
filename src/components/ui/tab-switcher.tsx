'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

interface Tab {
  id: string;
  label: string;
}

interface TabSwitcherProps {
  tabs: Tab[];
  activeTab: string;
  onTabChange: (id: string) => void;
}

export const TabSwitcher: React.FC<TabSwitcherProps> = ({ tabs, activeTab, onTabChange }) => {
  
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>, tabId: string) => {
    e.preventDefault();
    onTabChange(tabId);
  };

  return (
    <nav className="view-transition-nav rounded-xl bg-[#111] p-2 md:p-3 flex items-center gap-2 md:gap-4 justify-center flex-wrap">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={(e) => handleClick(e, tab.id)}
          className={cn(
            'px-3 py-1.5 md:px-4 md:py-2 relative no-underline rounded-lg text-sm md:text-base transition-colors isolation-isolate',
            activeTab === tab.id
              ? 'text-primary-foreground'
              : 'text-muted-foreground hover:bg-muted/50 hover:text-foreground'
          )}
        >
          <span className="relative z-10">{tab.label}</span>
          {activeTab === tab.id && (
             <motion.div
                layoutId="active-indicator-alt"
                className="active-indicator absolute inset-0 bg-primary z-0 rounded-lg"
            ></motion.div>
          )}
        </button>
      ))}
    </nav>
  );
};
