import Link from 'next/link';
import {
  GitPullRequest,
  Clock,
  Users,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import CodeDiff from './CodeDiff';
import { PROJECT_META } from '../data/diff-content';

export default function PreviewBody({ locale }: { locale: string }) {
  return (
    <>
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
                <span className="font-mono text-xs text-slate-500">
                  #42 &middot; main &larr; feat/ai-triage
                </span>
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

          <CodeDiff />

          <p className="mt-6 text-xs font-mono text-slate-500 text-center">
            {'// '}codice anonimizzato e ridotto. La logica reale è equivalente.
          </p>
        </div>
      </section>

      {/* OUTCOMES */}
      <section
        className="px-4 sm:px-6 py-20 border-b border-slate-900"
        aria-labelledby="outcomes-heading"
      >
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
            {'// '}preview &mdash; non indicizzato &mdash; v0.2
          </p>
        </div>
      </section>
    </>
  );
}
