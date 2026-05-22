'use client';

import Link from 'next/link';

const VARIANTS = [
  { id: 'd', label: 'D · Mass ★', slug: 'preview-d' },
  { id: 'baseline', label: 'Particles', slug: 'preview' },
  { id: 'a', label: 'A · Architecture', slug: 'preview-a' },
  { id: 'b', label: 'B · Glass', slug: 'preview-b' },
  { id: 'c', label: 'C · Shader', slug: 'preview-c' },
];

export default function PreviewNav({
  active,
  locale,
}: {
  active: 'baseline' | 'a' | 'b' | 'c' | 'd';
  locale: string;
}) {
  return (
    <nav
      aria-label="Preview variants"
      className="fixed top-3 left-1/2 -translate-x-1/2 z-50 flex gap-1 p-1 rounded-full border border-slate-800/80 bg-slate-950/80 backdrop-blur-md shadow-lg shadow-black/40"
    >
      {VARIANTS.map((v) => {
        const isActive = v.id === active;
        return (
          <Link
            key={v.id}
            href={`/${locale}/${v.slug}`}
            className={`px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-mono whitespace-nowrap transition-colors ${
              isActive
                ? 'bg-cyan-400 text-slate-950'
                : 'text-slate-400 hover:text-slate-100 hover:bg-slate-800/60'
            }`}
            aria-current={isActive ? 'page' : undefined}
          >
            {v.label}
          </Link>
        );
      })}
    </nav>
  );
}
