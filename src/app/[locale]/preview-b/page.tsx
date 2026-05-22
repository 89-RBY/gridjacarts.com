import Link from 'next/link';
import { ArrowDown, ExternalLink } from 'lucide-react';
import HeroBLazy from './HeroBLazy';
import PreviewNav from '../preview/components/PreviewNav';
import PreviewBody from '../preview/components/PreviewBody';

export const metadata = {
  title: 'gridjac arts — preview · glass',
  description: 'Concept B: pannello di vetro 3D con codice rifratto al suo interno.',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: { locale: string };
}

export default function PreviewBPage({ params: { locale } }: PageProps) {
  return (
    <main className="relative bg-slate-950 text-slate-100 min-h-screen overflow-x-hidden">
      <PreviewNav active="b" locale={locale} />

      {/* HERO */}
      <section
        className="relative min-h-[100vh] flex items-center justify-center px-4 sm:px-6 border-b border-slate-900 overflow-hidden"
        aria-labelledby="hero-heading"
      >
        <div className="absolute inset-0 -z-10">
          <HeroBLazy />
          <div
            className="absolute inset-x-0 bottom-0 h-1/3 pointer-events-none"
            style={{
              background:
                'linear-gradient(180deg, transparent 0%, rgba(2,6,23,0.9) 80%, rgb(2,6,23) 100%)',
            }}
          />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto py-24 grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-center lg:text-left">
            <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-cyan-300/90 mb-8">
              {'// '}variant b · glass
            </p>
            <h1
              id="hero-heading"
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight leading-[1.05] mb-8"
            >
              Software che sembra
              <br />
              <span className="text-cyan-200">scolpito nel vetro.</span>
            </h1>
            <p className="text-lg text-slate-300 max-w-xl mx-auto lg:mx-0 leading-relaxed mb-10">
              Quello che vedi a fianco è un{' '}
              <strong className="text-slate-100">MeshPhysicalMaterial</strong> con
              transmission, IOR e attenuation. Il codice dentro è quello che gira
              davvero sui server del cliente.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 items-center lg:items-start justify-center lg:justify-start">
              <a
                href="#the-diff"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-300 text-slate-950 font-semibold text-sm hover:bg-cyan-200 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
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
          <div className="hidden lg:block" aria-hidden="true">
            {/* Glass slab visually occupies this column on desktop; canvas is full-width behind everything */}
          </div>
        </div>
      </section>

      <PreviewBody locale={locale} />
    </main>
  );
}
