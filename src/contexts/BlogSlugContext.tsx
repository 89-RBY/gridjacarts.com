'use client';

import { createContext, useContext, ReactNode } from 'react';

interface BlogSlugs {
  ro: string;
  en: string;
  it: string;
}

const BlogSlugContext = createContext<BlogSlugs | null>(null);

export function BlogSlugProvider({
  children,
  slugs
}: {
  children: ReactNode;
  slugs: BlogSlugs;
}) {
  return (
    <BlogSlugContext.Provider value={slugs}>
      {children}
    </BlogSlugContext.Provider>
  );
}

export function useBlogSlugs() {
  return useContext(BlogSlugContext);
}
