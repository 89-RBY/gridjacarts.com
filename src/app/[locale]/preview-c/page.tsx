import Link from 'next/link';
import { ArrowDown, ExternalLink } from 'lucide-react';
import HeroCLazy from './HeroCLazy';
import PreviewNav from '../preview/components/PreviewNav';
import PreviewBody from '../preview/components/PreviewBody';

export const metadata = {
  title: 'gridjac arts — preview · shader',
  description: 'Concept C: fragment shader fullscreen, griglia di caratteri con flow field e reazione al mouse.',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: { locale: string };
}

export default function PreviewCPage({ params: { locale } }: PageProps) {
  return (
    <main className="relative bg-slate-950 text-slate-100 min-h-screen overflow-x-hidden">
      <PreviewNav active="c" locale={locale} />

      {/* HERO */}
      <section
        className="relative min-h-[100vh] flex items-center justify-center px-4 sm:px-6 border-b border-slate-900 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 -z-10">
          <HeroCLazy />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 0%, rgba(2,6,23,0.35) 55%, rgba(2,6,23,0.9) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center py-24">
          <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-cyan-200/90 mb-8">
            {'// '}variant c · fragment shader
          </p>
          <h1
            id="hero-heading"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8"
          >
            Un solo quad.
            <br />
            <span className="text-cyan-200">280 righe di GLSL.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Niente meshes, niente particelle, niente texture pesanti. Solo un fragment
            shader che disegna ogni pixel da zero. Muovi il cursore.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#the-diff"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-200 text-slate-950 font-semibold text-sm hover:bg-white transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-200 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Apri il diff
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-700 text-slate-200 font-semibold text-sm hover:border-slate-500 hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Parla con un ingegnere
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </section>

      <PreviewBody locale={locale} />
    </main>
  );
}
