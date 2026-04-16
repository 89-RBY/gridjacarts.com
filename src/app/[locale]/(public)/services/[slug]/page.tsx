import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Target,
  Lightbulb,
  Workflow,
  Package
} from 'lucide-react';
import { getServicePageBySlug, getAllProducts } from '@/lib/data';

interface ServiceDetailPageProps {
  params: { locale: string; slug: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale, slug } }: ServiceDetailPageProps) {
  const service = getServicePageBySlug(slug);
  if (!service) return { title: 'Service not found' };

  const loc = locale as 'ro' | 'en' | 'it';
  return {
    title: service.metaTitle?.[loc] || `${service.name} — ${service.tagline[loc]}`,
    description: service.metaDescription?.[loc] || service.description[loc].slice(0, 160),
  };
}

export default async function ServiceDetailPage({ params: { locale, slug } }: ServiceDetailPageProps) {
  const service = getServicePageBySlug(slug);
  if (!service) notFound();

  const loc = locale as 'ro' | 'en' | 'it';
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  // Get related products
  const allProducts = await getAllProducts();
  const relatedProducts = allProducts.filter((p) =>
    service.relatedProducts.includes(p.slug)
  );

  return (
    <div className="min-h-screen">
      {/* Back link */}
      <div className="container-custom pt-28 pb-4">
        <Link
          href={`/${locale}/services`}
          className="inline-flex items-center gap-2 text-sm text-tech-text-dim hover:text-tech-accent transition-colors font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          {locale === 'ro' ? 'Toate serviciile' : locale === 'it' ? 'Tutti i servizi' : 'All services'}
        </Link>
      </div>

      {/* Hero */}
      <section className="relative pb-16 tech-grid-bg">
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <div className="tech-badge-accent mb-6">
              <span className="font-mono text-[11px]">{'//'} SERVICE</span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-tech-text leading-[1.05]">
              {service.name}
            </h1>
            <p className="text-xl md:text-2xl text-tech-accent font-mono mb-8">
              {service.tagline[loc]}
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href={`/${locale}/contact`} className="btn-primary">
                {tCommon('bookCall')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`/${locale}/portfolio`} className="btn-secondary">
                {locale === 'ro' ? 'Vezi proiecte' : locale === 'it' ? 'Vedi progetti' : 'View projects'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2 space-y-12">
              {/* Problem */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="w-5 h-5 text-tech-accent" />
                  <h2 className="text-xs font-mono uppercase text-tech-text-muted tracking-wider">
                    {'//'} {locale === 'ro' ? 'Problema' : locale === 'it' ? 'Il problema' : 'The problem'}
                  </h2>
                </div>
                <p className="text-lg text-tech-text leading-relaxed">{service.problem[loc]}</p>
              </div>

              {/* Solution */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="w-5 h-5 text-tech-accent" />
                  <h2 className="text-xs font-mono uppercase text-tech-text-muted tracking-wider">
                    {'//'} {locale === 'ro' ? 'Soluția' : locale === 'it' ? 'La soluzione' : 'The solution'}
                  </h2>
                </div>
                <p className="text-lg text-tech-text-dim leading-relaxed whitespace-pre-line">
                  {service.description[loc]}
                </p>
              </div>

              {/* Benefits */}
              {service.benefits[loc] && service.benefits[loc].length > 0 && (
                <div>
                  <h2 className="text-xs font-mono uppercase text-tech-text-muted tracking-wider mb-4">
                    {'//'} {locale === 'ro' ? 'Beneficii' : locale === 'it' ? 'Benefici' : 'Benefits'}
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {service.benefits[loc].map((benefit, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-tech-text-dim"
                      >
                        <CheckCircle2 className="w-5 h-5 text-tech-accent flex-shrink-0 mt-0.5" />
                        <span>{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}

              {/* Process */}
              {service.process[loc] && service.process[loc].length > 0 && (
                <div>
                  <div className="flex items-center gap-2 mb-6">
                    <Workflow className="w-5 h-5 text-tech-accent" />
                    <h2 className="text-xs font-mono uppercase text-tech-text-muted tracking-wider">
                      {'//'} {locale === 'ro' ? 'Procesul nostru' : locale === 'it' ? 'Il nostro processo' : 'Our process'}
                    </h2>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    {service.process[loc].map((step, i) => (
                      <div key={i} className="tech-card-glass">
                        <div className="flex items-center gap-3 mb-2">
                          <div className="w-8 h-8 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center flex-shrink-0">
                            <span className="text-tech-accent font-mono text-sm font-bold">
                              {i + 1}
                            </span>
                          </div>
                          <h3 className="font-display font-bold text-tech-text">
                            {step.step}
                          </h3>
                        </div>
                        <p className="text-sm text-tech-text-dim leading-relaxed pl-11">
                          {step.description}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Sidebar */}
            <aside className="space-y-6">
              {/* Tech stack */}
              {service.techStack.length > 0 && (
                <div className="tech-card-glass">
                  <h3 className="text-xs font-mono uppercase text-tech-text-muted tracking-wider mb-4">
                    {'//'} Tech stack
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {service.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="text-xs font-mono px-2.5 py-1 rounded bg-tech-elevated border border-tech-border-strong text-tech-text"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {/* Related products */}
              {relatedProducts.length > 0 && (
                <div className="tech-card-glass">
                  <div className="flex items-center gap-2 mb-4">
                    <Package className="w-4 h-4 text-tech-accent" />
                    <h3 className="text-xs font-mono uppercase text-tech-text-muted tracking-wider">
                      {'//'} {locale === 'ro' ? 'Proiecte relevante' : locale === 'it' ? 'Progetti rilevanti' : 'Related projects'}
                    </h3>
                  </div>
                  <div className="space-y-3">
                    {relatedProducts.map((product) => (
                      <Link
                        key={product.id}
                        href={`/${locale}/products/${product.slug}`}
                        className="block p-3 rounded-lg bg-tech-elevated border border-tech-border hover:border-tech-accent/50 transition-colors group"
                      >
                        <div className="flex items-center justify-between mb-1">
                          <h4 className="font-display font-bold text-sm text-tech-text group-hover:text-tech-accent transition-colors">
                            {product.name}
                          </h4>
                          <ArrowRight className="w-3.5 h-3.5 text-tech-text-muted group-hover:text-tech-accent transition-colors" />
                        </div>
                        <p className="text-xs text-tech-text-muted line-clamp-2">
                          {product.tagline[loc]}
                        </p>
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="tech-card-elevated text-center py-12 px-6 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-tech-text">
              {locale === 'ro' && 'Hai să discutăm despre proiectul tău'}
              {locale === 'en' && "Let's talk about your project"}
              {locale === 'it' && 'Parliamo del tuo progetto'}
            </h2>
            <p className="text-tech-text-dim mb-8">
              {locale === 'ro' && 'Programează o întâlnire gratuită de 30 minute. Discutăm viziunea ta și cum te putem ajuta.'}
              {locale === 'en' && "Schedule a free 30-minute call. We'll discuss your vision and how we can help."}
              {locale === 'it' && 'Prenota una chiamata gratuita di 30 minuti. Discutiamo della tua visione e di come possiamo aiutarti.'}
            </p>
            <Link href={`/${locale}/contact`} className="btn-primary">
              {tCommon('bookCall')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
