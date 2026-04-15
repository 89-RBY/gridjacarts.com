import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, CheckCircle2, ExternalLink, Target } from 'lucide-react';
import { getProductBySlug } from '@/lib/data';

interface ProductDetailPageProps {
  params: { locale: string; slug: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale, slug } }: ProductDetailPageProps) {
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) return { title: 'Product not found' };

  const loc = locale as 'ro' | 'en' | 'it';
  return {
    title: product.metaTitle?.[loc] || `${product.name} — ${product.tagline[loc]}`,
    description: product.metaDescription?.[loc] || product.description[loc].slice(0, 160),
  };
}

export default async function ProductDetailPage({ params: { locale, slug } }: ProductDetailPageProps) {
  const product = await getProductBySlug(slug).catch(() => null);
  if (!product) notFound();

  const loc = locale as 'ro' | 'en' | 'it';
  const tCommon = await getTranslations({ locale, namespace: 'common' });
  const tProducts = await getTranslations({ locale, namespace: 'products' });

  return (
    <div className="min-h-screen">
      {/* Back link */}
      <div className="container-custom pt-28 pb-4">
        <Link
          href={`/${locale}/products`}
          className="inline-flex items-center gap-2 text-sm text-tech-text-dim hover:text-tech-accent transition-colors font-mono"
        >
          <ArrowLeft className="w-4 h-4" />
          {locale === 'ro' ? 'Toate produsele' : locale === 'it' ? 'Tutti i prodotti' : 'All products'}
        </Link>
      </div>

      {/* Hero */}
      <section className="relative pb-16 tech-grid-bg">
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-3 gap-12">
            <div className="lg:col-span-2">
              <div className="flex items-center gap-3 mb-6">
                <div
                  className={`tech-badge-accent ${product.status === 'LIVE' ? 'tech-badge-live' : ''}`}
                >
                  {product.status === 'LIVE' && tCommon('liveProduct')}
                  {product.status === 'BETA' && tCommon('inBeta')}
                  {product.status === 'DEVELOPMENT' && tCommon('inDevelopment')}
                </div>
                <span className="text-xs font-mono text-tech-text-muted uppercase">
                  {product.category}
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-bold mb-4 text-tech-text leading-[1.05]">
                {product.name}
              </h1>
              <p className="text-xl md:text-2xl text-tech-accent font-mono mb-8">
                {product.tagline[loc]}
              </p>

              <div className="flex flex-wrap gap-3">
                {product.demoUrl && (
                  <a
                    href={product.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn-primary"
                  >
                    {tProducts('card.viewLive')}
                    <ExternalLink className="w-4 h-4" />
                  </a>
                )}
                <Link href={`/${locale}/contact`} className="btn-secondary">
                  {tCommon('bookCall')}
                </Link>
              </div>
            </div>

            {/* Metrics card */}
            {(product.usersCount || product.automationSaved) && (
              <div className="tech-card-elevated tech-border-gradient h-fit">
                <div className="text-xs font-mono uppercase text-tech-text-muted mb-4">
                  // metrics
                </div>
                {product.usersCount && (
                  <div className="mb-5 pb-5 border-b border-tech-border">
                    <div className="text-3xl font-display font-bold text-tech-accent">
                      {product.usersCount}
                    </div>
                    <div className="text-xs text-tech-text-muted font-mono mt-1 uppercase">
                      users
                    </div>
                  </div>
                )}
                {product.automationSaved && (
                  <div>
                    <div className="text-3xl font-display font-bold text-tech-accent">
                      {product.automationSaved}
                    </div>
                    <div className="text-xs text-tech-text-muted font-mono mt-1 uppercase">
                      automation
                    </div>
                  </div>
                )}
              </div>
            )}
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
                    // The problem
                  </h2>
                </div>
                <p className="text-lg text-tech-text leading-relaxed">{product.problem[loc]}</p>
              </div>

              {/* Description */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <h2 className="text-xs font-mono uppercase text-tech-text-muted tracking-wider">
                    // The solution
                  </h2>
                </div>
                <p className="text-lg text-tech-text-dim leading-relaxed whitespace-pre-line">
                  {product.description[loc]}
                </p>
              </div>

              {/* Features */}
              {product.features[loc] && product.features[loc].length > 0 && (
                <div>
                  <h2 className="text-xs font-mono uppercase text-tech-text-muted tracking-wider mb-4">
                    // {tProducts('card.features')}
                  </h2>
                  <ul className="grid sm:grid-cols-2 gap-3">
                    {product.features[loc].map((feature, i) => (
                      <li
                        key={i}
                        className="flex items-start gap-3 text-tech-text-dim"
                      >
                        <CheckCircle2 className="w-5 h-5 text-tech-accent flex-shrink-0 mt-0.5" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            {/* Sidebar: Tech stack */}
            <aside className="space-y-6">
              {product.techStack.length > 0 && (
                <div className="tech-card-glass">
                  <h3 className="text-xs font-mono uppercase text-tech-text-muted tracking-wider mb-4">
                    // {tProducts('card.techStack')}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {product.techStack.map((tech) => (
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
            </aside>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="tech-card-elevated text-center py-12 px-6 max-w-3xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-tech-text">
              {locale === 'ro' && 'Vrei ceva similar pentru afacerea ta?'}
              {locale === 'en' && 'Want something similar for your business?'}
              {locale === 'it' && 'Vuoi qualcosa di simile per il tuo business?'}
            </h2>
            <p className="text-tech-text-dim mb-8">
              {locale === 'ro' && 'Construim produse custom de la zero, adaptate nevoilor tale.'}
              {locale === 'en' && 'We build custom products from scratch, tailored to your needs.'}
              {locale === 'it' && 'Costruiamo prodotti custom da zero, su misura per le tue esigenze.'}
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
