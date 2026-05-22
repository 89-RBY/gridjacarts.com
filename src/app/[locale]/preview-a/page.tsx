import Link from 'next/link';
import { ArrowDown, ExternalLink } from 'lucide-react';
import HeroALazy from './HeroALazy';
import PreviewNav from '../preview/components/PreviewNav';
import PreviewBody from '../preview/components/PreviewBody';

export const metadata = {
  title: 'gridjac arts — preview · architecture morph',
  description:
    'Concept A: lettere 3D estruse che si auto-organizzano in architettura software.',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: { locale: string };
}

export default function PreviewAPage({ params: { locale } }: PageProps) {
  return (
    <main className="relative bg-slate-950 text-slate-100 min-h-screen overflow-x-hidden">
      <PreviewNav active="a" locale={locale} />

      {/* HERO — 3D letters fill the viewport, copy at the bottom */}
      <section
        className="relative min-h-screen flex flex-col items-center justify-end px-4 sm:px-6 border-b border-slate-900 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0">
          <HeroALazy />
        </div>

        <div
          className="absolute inset-x-0 bottom-0 h-2/3 pointer-events-none"
          style={{
            background:
              'linear-gradient(180deg, transparent 0%, rgba(2,6,23,0.65) 55%, rgb(2,6,23) 100%)',
          }}
        />

        <div className="relative z-20 max-w-3xl mx-auto text-center pb-16 sm:pb-24">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-violet-300/90 mb-6">
            {'// '}variant a · code → architecture
          </p>
          <h1
            id="hero-heading"
            className="text-3xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            Caos in input.
            <br />
            <span className="text-violet-300">Architettura in output.</span>
          </h1>
          <p className="text-base sm:text-lg text-slate-300 max-w-xl mx-auto leading-relaxed mb-8">
            Lettere 3D vere, non puntini. Aspetta qualche secondo: si riorganizzano.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <a
              href="#the-diff"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-300 text-slate-950 font-semibold text-sm hover:bg-violet-200 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Apri il diff
              <ArrowDown className="w-4 h-4" aria-hidden="true" />
            </a>
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-600 text-slate-200 font-semibold text-sm hover:border-slate-400 hover:bg-slate-900 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950"
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
