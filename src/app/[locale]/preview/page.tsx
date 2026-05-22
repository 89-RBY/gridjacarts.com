import Link from 'next/link';
import { ArrowDown, GitPullRequest, ExternalLink, Clock, Users, AlertCircle, CheckCircle2 } from 'lucide-react';
import HeroCanvasLazy from './components/HeroCanvasLazy';
import CodeDiff from './components/CodeDiff';
import { PROJECT_META } from './data/diff-content';

export const metadata = {
  title: 'gridjac arts — engineering preview',
  description: 'Non vendiamo slide. Spediamo codice. Apri il diff di una nostra integrazione AI in produzione.',
  robots: { index: false, follow: false },
};

interface PageProps {
  params: { locale: string };
}

export default function PreviewPage({ params: { locale } }: PageProps) {
  return (
    <main className="relative bg-slate-950 text-slate-100 min-h-screen overflow-x-hidden">
      {/* HERO */}
      <section
        className="relative min-h-[88vh] flex items-center justify-center px-4 sm:px-6 border-b border-slate-900"
        aria-labelledby="hero-heading"
      >
        {/* Background canvas — lazy, behind content */}
        <div className="absolute inset-0 -z-10">
          <HeroCanvasLazy />
          {/* Vignette for legibility */}
          <div
            className="absolute inset-0 pointer-events-none"
            style={{
              background:
                'radial-gradient(ellipse at center, transparent 0%, transparent 40%, rgba(2,6,23,0.7) 90%)',
            }}
          />
          {/* Grid overlay */}
          <div
            className="absolute inset-0 opacity-[0.04] pointer-events-none"
            style={{
              backgroundImage:
                'linear-gradient(rgba(148,163,184,1) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,1) 1px, transparent 1px)',
              backgroundSize: '64px 64px',
            }}
          />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto text-center py-24">
          <p className="font-mono text-[11px] sm:text-xs uppercase tracking-[0.3em] text-cyan-400/90 mb-8">
            {'// '}gridjac arts &middot; engineering
          </p>
          <h1
            id="hero-heading"
            className="text-4xl sm:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-8"
          >
            Non vendiamo slide.
            <br />
            <span className="text-cyan-300">Spediamo codice.</span>
          </h1>
          <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto leading-relaxed mb-10">
            Le agency mostrano case study. Noi apriamo il <strong className="text-slate-100">Pull Request</strong>.
            Qui sotto il diff di un&apos;integrazione AI che abbiamo spedito in produzione il mese scorso.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 items-center justify-center">
            <a
              href="#the-diff"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 text-slate-950 font-semibold text-sm hover:bg-cyan-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
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

      {/* PR HEADER */}
      <section
        id="the-diff"
        className="px-4 sm:px-6 py-16 sm:py-24 border-b border-slate-900"
        aria-labelledby="pr-heading"
      >
        <div className="max-w-6xl mx-auto">
          <div className="flex items-start gap-4 mb-8">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-emerald-500/15 border border-emerald-500/30 flex items-center justify-center">
              <GitPullRequest className="w-5 h-5 text-emerald-400" aria-hidden="true" />
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 mb-2">
                <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-500/15 text-emerald-300 border border-emerald-500/30">
                  Merged
                </span>
                <span className="font-mono text-xs text-slate-500">#42 &middot; main &larr; feat/ai-triage</span>
              </div>
              <h2
                id="pr-heading"
                className="text-2xl sm:text-3xl font-bold tracking-tight text-slate-100 mb-3"
              >
                feat(inbox): replace rule-based triage with Claude classifier
              </h2>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-slate-400">
                <span className="inline-flex items-center gap-1.5">
                  <Users className="w-3.5 h-3.5" aria-hidden="true" />
                  {PROJECT_META.client}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" aria-hidden="true" />
                  11 giorni da kickoff a prod
                </span>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="grid sm:grid-cols-2 gap-4 mb-12">
            <div className="rounded-lg border border-rose-500/20 bg-rose-500/5 p-5">
              <div className="flex items-center gap-2 mb-2">
                <AlertCircle className="w-4 h-4 text-rose-400" aria-hidden="true" />
                <h3 className="font-semibold text-sm text-rose-300">Problema</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{PROJECT_META.problem}</p>
            </div>
            <div className="rounded-lg border border-emerald-500/20 bg-emerald-500/5 p-5">
              <div className="flex items-center gap-2 mb-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" aria-hidden="true" />
                <h3 className="font-semibold text-sm text-emerald-300">Soluzione</h3>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">{PROJECT_META.solution}</p>
            </div>
          </div>

          {/* The actual diff */}
          <CodeDiff />

          <p className="mt-6 text-xs font-mono text-slate-500 text-center">
            {'// '}codice anonimizzato e ridotto. La logica reale è equivalente.
          </p>
        </div>
      </section>

      {/* OUTCOMES */}
      <section className="px-4 sm:px-6 py-20 border-b border-slate-900" aria-labelledby="outcomes-heading">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-cyan-400/90 mb-4">
            {'// '}post-merge
          </p>
          <h2
            id="outcomes-heading"
            className="text-3xl sm:text-4xl font-bold tracking-tight mb-12"
          >
            Cosa misuriamo dopo lo squash.
          </h2>
          <dl className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-slate-800 rounded-xl overflow-hidden border border-slate-800">
            {PROJECT_META.outcomes.map((o) => (
              <div key={o.label} className="bg-slate-950 p-6 sm:p-8">
                <dt className="text-xs sm:text-sm text-slate-500 mb-2">{o.label}</dt>
                <dd className="text-3xl sm:text-4xl font-bold text-cyan-300 tracking-tight">
                  {o.metric}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 sm:px-6 py-24" aria-labelledby="cta-heading">
        <div className="max-w-3xl mx-auto text-center">
          <h2
            id="cta-heading"
            className="text-3xl sm:text-5xl font-bold tracking-tight mb-6"
          >
            Vuoi una PR così sul tuo stack?
          </h2>
          <p className="text-lg text-slate-400 mb-10 leading-relaxed">
            Mandaci il problema più noioso del tuo team. Ti rispondiamo con un&apos;ipotesi
            di architettura e un&apos;estimate di effort. Niente call generiche, niente Calendly da 30 min.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 items-center justify-center">
            <Link
              href={`/${locale}/contact`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-cyan-400 text-slate-950 font-semibold text-sm hover:bg-cyan-300 transition-colors focus:outline-none focus:ring-2 focus:ring-cyan-300 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Mandaci il problema
            </Link>
            <Link
              href={`/${locale}/products`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg border border-slate-800 text-slate-300 font-semibold text-sm hover:border-slate-600 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-950"
            >
              Vedi i nostri prodotti
            </Link>
          </div>
          <p className="mt-12 font-mono text-[11px] text-slate-600">
            {'// '}preview &mdash; non indicizzato &mdash; v0.1
          </p>
        </div>
      </section>
    </main>
  );
}
