import Link from 'next/link';
import { ArrowDown, ExternalLink } from 'lucide-react';
import HeroALazy from './HeroALazy';
import PreviewNav from '../preview/components/PreviewNav';
import PreviewBody from '../preview/components/PreviewBody';

export const metadata = {
  title: 'gridjac arts — preview · architecture morph',
  description: 'Concept A: caos di particelle che si auto-organizzano in architettura software.',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: { locale: string };
}

export default function PreviewAPage({ params: { locale } }: PageProps) {
  return (
    <main className="relative bg-slate-950 text-slate-100 min-h-screen overflow-x-hidden">
      <PreviewNav active="a" locale={locale} />

      {/* HERO */}
      <section
        className="relative min-h-[100vh] flex items-center justify-center px-4 sm:px-6 border-b border-slate-900 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 -z-10">
          <HeroALazy />
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at 50% 40%, transparent 0%, rgba(2,6,23,0.55) 60%, rgba(2,6,23,0.92) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center py-24">
          <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-violet-300/90 mb-8">
            {'// '}variant a · code → architecture
          </p>
          <h1
            id="hero-heading"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8"
          >
            Trasformiamo il caos
            <br />
            <span className="text-violet-300">in architettura.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Le particelle là sopra sono un&apos;animazione. Il diff qui sotto è codice
            spedito in produzione il mese scorso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#the-diff"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-violet-400 text-slate-950 font-semibold text-sm hover:bg-violet-300 transition-colors focus:outline-none focus:ring-2 focus:ring-violet-300 focus:ring-offset-2 focus:ring-offset-slate-950"
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
