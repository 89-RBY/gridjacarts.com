'use client';

import { ReactNode } from 'react';

interface TooltipProps {
  children: ReactNode;
  content: string;
  className?: string;
}

export default function Tooltip({ children, content, className = '' }: TooltipProps) {
  return (
    <span className={`relative inline-block group ${className}`}>
      <span className="border-b border-dotted border-tech-accent/50 cursor-help">
        {children}
      </span>
      <span className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 px-3 py-2 bg-tech-surface border border-tech-border-strong rounded-lg text-xs text-tech-text whitespace-nowrap opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 pointer-events-none z-50 shadow-lg">
        {content}
        <span className="absolute top-full left-1/2 -translate-x-1/2 -mt-px border-4 border-transparent border-t-tech-border-strong" />
      </span>
    </span>
  );
}
