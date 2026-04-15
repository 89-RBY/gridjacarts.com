import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, ExternalLink, Package } from 'lucide-react';
import { getProducts } from '@/lib/data';

interface ProductsPageProps {
  params: { locale: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: ProductsPageProps) {
  const t = await getTranslations({ locale, namespace: 'products' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default async function ProductsPage({ params: { locale } }: ProductsPageProps) {
  let products: Awaited<ReturnType<typeof getProducts>> = [];
  try {
    products = await getProducts();
  } catch {
    products = [];
  }

  return <ProductsPageContent locale={locale} products={products} />;
}

function ProductsPageContent({
  locale,
  products,
}: {
  locale: string;
  products: Awaited<ReturnType<typeof getProducts>>;
}) {
  const t = useTranslations('products');
  const tCommon = useTranslations('common');

  return (
    <div className="min-h-screen">
      {/* Header */}
      <section className="relative pt-32 pb-16 tech-grid-bg">
        <div className="absolute inset-0 bg-tech-radial pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="tech-badge-accent mb-6">
              <span className="font-mono text-[11px]">// PRODUCTS</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-tech-text leading-tight">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-tech-text-dim leading-relaxed">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Products Grid */}
      <section className="pb-24">
        <div className="container-custom">
          {products.length === 0 ? (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-tech-surface border border-tech-border mb-6">
                <Package className="w-8 h-8 text-tech-text-muted" />
              </div>
              <p className="text-tech-text-dim font-mono">
                {locale === 'ro' ? 'Produsele vor fi disponibile în curând.' :
                 locale === 'it' ? 'I prodotti saranno disponibili a breve.' :
                 'Products will be available soon.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {products.map((product) => (
                <article
                  key={product.id}
                  className="tech-card group flex flex-col h-full relative overflow-hidden"
                >
                  {/* Status badge */}
                  <div className="flex items-center justify-between mb-4">
                    <div
                      className={`tech-badge-accent ${product.status === 'LIVE' ? 'tech-badge-live' : ''}`}
                    >
                      {product.status === 'LIVE' && tCommon('liveProduct')}
                      {product.status === 'BETA' && tCommon('inBeta')}
                      {product.status === 'DEVELOPMENT' && tCommon('inDevelopment')}
                    </div>
                    <span className="text-[10px] font-mono text-tech-text-muted uppercase">
                      {product.category}
                    </span>
                  </div>

                  {/* Name & tagline */}
                  <h2 className="text-2xl font-display font-bold mb-2 text-tech-text group-hover:text-tech-accent transition-colors">
                    {product.name}
                  </h2>
                  <p className="text-sm text-tech-accent/80 font-mono mb-3">
                    {product.tagline[locale as 'ro' | 'en' | 'it']}
                  </p>
                  <p className="text-sm text-tech-text-dim mb-5 leading-relaxed flex-1">
                    {product.description[locale as 'ro' | 'en' | 'it']}
                  </p>

                  {/* Metrics */}
                  {(product.usersCount || product.automationSaved) && (
                    <div className="flex gap-4 mb-5 pb-5 border-b border-tech-border text-xs">
                      {product.usersCount && (
                        <div>
                          <div className="text-tech-accent font-semibold">{product.usersCount}</div>
                          <div className="text-tech-text-muted font-mono mt-0.5">users</div>
                        </div>
                      )}
                      {product.automationSaved && (
                        <div>
                          <div className="text-tech-accent font-semibold">{product.automationSaved}</div>
                          <div className="text-tech-text-muted font-mono mt-0.5">saved</div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Tech stack */}
                  {product.techStack.length > 0 && (
                    <div className="mb-5">
                      <div className="text-[10px] font-mono text-tech-text-muted uppercase mb-2">
                        {t('card.techStack')}
                      </div>
                      <div className="flex flex-wrap gap-1.5">
                        {product.techStack.slice(0, 5).map((tech) => (
                          <span
                            key={tech}
                            className="text-[10px] font-mono px-2 py-0.5 rounded bg-tech-elevated border border-tech-border text-tech-text-dim"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Actions */}
                  <div className="flex items-center gap-3 mt-auto">
                    <Link
                      href={`/${locale}/products/${product.slug}`}
                      className="text-sm font-medium text-tech-accent hover:text-tech-accent-hover inline-flex items-center gap-1.5 transition-colors"
                    >
                      {t('card.learnMore')}
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                    {product.demoUrl && (
                      <a
                        href={product.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm font-medium text-tech-text-dim hover:text-tech-text inline-flex items-center gap-1.5 transition-colors ml-auto"
                      >
                        {t('card.viewLive')}
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="tech-card-elevated text-center py-12 px-6 tech-border-gradient">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-tech-text">
              {locale === 'ro' && 'Ai o idee pentru un produs similar?'}
              {locale === 'en' && 'Got an idea for a similar product?'}
              {locale === 'it' && 'Hai un\'idea per un prodotto simile?'}
            </h2>
            <p className="text-tech-text-dim mb-8 max-w-xl mx-auto">
              {locale === 'ro' && 'Construim produse SaaS și platforme custom de la zero. Hai să discutăm viziunea ta.'}
              {locale === 'en' && 'We build SaaS products and custom platforms from scratch. Let\'s discuss your vision.'}
              {locale === 'it' && 'Costruiamo prodotti SaaS e piattaforme custom da zero. Discutiamo la tua visione.'}
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
