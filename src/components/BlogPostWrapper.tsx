'use client';

import { ReactNode } from 'react';
import { BlogSlugProvider } from '@/contexts/BlogSlugContext';

interface BlogPostWrapperProps {
  children: ReactNode;
  slugs: {
    ro: string;
    en: string;
    it: string;
  };
}

export default function BlogPostWrapper({ children, slugs }: BlogPostWrapperProps) {
  return (
    <BlogSlugProvider slugs={slugs}>
      {children}
    </BlogSlugProvider>
  );
}
