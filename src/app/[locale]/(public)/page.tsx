import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import {
  ArrowRight,
  Code2,
  Palette,
  Search,
  Workflow,
  Sparkles,
  Rocket,
  Layers,
  Terminal,
  Zap,
  Target,
  GitBranch,
  CheckCircle2,
} from 'lucide-react';
import TerminalHero from '@/components/TerminalHero';
import { getFeaturedProducts } from '@/lib/data';

interface HomePageProps {
  params: { locale: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: HomePageProps) {
  const t = await getTranslations({ locale, namespace: 'home' });
  const tMeta = await getTranslations({ locale, namespace: 'metadata' });
  return {
    title: t('hero.title'),
    description: tMeta('description'),
  };
}

export default async function HomePage({ params: { locale } }: HomePageProps) {
  let featuredProducts: Awaited<ReturnType<typeof getFeaturedProducts>> = [];
  try {
    featuredProducts = await getFeaturedProducts();
  } catch {
    featuredProducts = [];
  }

  return <HomePageContent locale={locale} featuredProducts={featuredProducts} />;
}

function HomePageContent({
  locale,
  featuredProducts,
}: {
  locale: string;
  featuredProducts: Awaited<ReturnType<typeof getFeaturedProducts>>;
}) {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const tServices = useTranslations('services');

  const services = [
    { icon: Code2, title: tServices('webDev.title'), description: tServices('webDev.description') },
    { icon: Workflow, title: tServices('smm.title'), description: tServices('smm.description') },
    { icon: Sparkles, title: tServices('advertising.title'), description: tServices('advertising.description') },
    { icon: Rocket, title: tServices('virtualTours.title'), description: tServices('virtualTours.description') },
    { icon: Palette, title: tServices('webDesign.title'), description: tServices('webDesign.description') },
    { icon: Search, title: tServices('seo.title'), description: tServices('seo.description') },
    { icon: Layers, title: tServices('fullStack.title'), description: tServices('fullStack.description') },
  ];

  const valuePropIcons = [Target, Zap, GitBranch, CheckCircle2];

  const terminalLines = [
    t('hero.terminal.line1'),
    t('hero.terminal.line2'),
    t('hero.terminal.line3'),
    t('hero.terminal.line4'),
    t('hero.terminal.line5'),
  ];

  const processSteps = [
    {
      number: t('process.steps.0.number'),
      title: t('process.steps.0.title'),
      description: t('process.steps.0.description'),
    },
    {
      number: t('process.steps.1.number'),
      title: t('process.steps.1.title'),
      description: t('process.steps.1.description'),
    },
    {
      number: t('process.steps.2.number'),
      title: t('process.steps.2.title'),
      description: t('process.steps.2.description'),
    },
    {
      number: t('process.steps.3.number'),
      title: t('process.steps.3.title'),
      description: t('process.steps.3.description'),
    },
  ];

  const valueProps = [
    {
      title: t('valueProps.props.0.title'),
      description: t('valueProps.props.0.description'),
    },
    {
      title: t('valueProps.props.1.title'),
      description: t('valueProps.props.1.description'),
    },
    {
      title: t('valueProps.props.2.title'),
      description: t('valueProps.props.2.description'),
    },
    {
      title: t('valueProps.props.3.title'),
      description: t('valueProps.props.3.description'),
    },
  ];

  const techStack = [
    { name: 'Next.js', category: 'Framework' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'React', category: 'UI' },
    { name: 'Node.js', category: 'Runtime' },
    { name: 'PostgreSQL', category: 'Database' },
    { name: 'Prisma', category: 'ORM' },
    { name: 'OpenAI', category: 'AI' },
    { name: 'Anthropic', category: 'AI' },
    { name: 'Vercel', category: 'Hosting' },
    { name: 'Railway', category: 'Infra' },
    { name: 'Tailwind', category: 'Styling' },
    { name: 'Stripe', category: 'Payments' },
  ];

  return (
    <div className="overflow-hidden">
      {/* ======================= HERO ======================= */}
      <section className="relative min-h-screen flex items-center pt-24 pb-16 tech-grid-bg">
        {/* Radial glow */}
        <div className="absolute inset-0 bg-tech-radial pointer-events-none" />

        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left: Content */}
            <div className="animate-fade-in">
              <div className="tech-badge-accent mb-6 animate-slide-up">
                <span className="font-mono text-[11px]">{t('hero.badge')}</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold mb-6 leading-[1.05] tracking-tight">
                <span className="text-tech-text">{t('hero.title')}</span>
                <br />
                <span className="tech-gradient-text">{t('hero.titleAccent')}</span>
              </h1>

              <p className="text-lg md:text-xl text-tech-text-dim mb-10 leading-relaxed max-w-xl">
                {t('hero.subtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 mb-12">
                <Link href={`/${locale}/contact`} className="btn-primary">
                  {t('hero.cta')}
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link href={`/${locale}/products`} className="btn-secondary">
                  {t('hero.ctaSecondary')}
                </Link>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-tech-border max-w-lg">
                <div>
                  <div className="text-3xl font-display font-bold text-tech-accent">
                    {featuredProducts.length || 5}+
                  </div>
                  <div className="text-xs text-tech-text-muted font-mono uppercase tracking-wider mt-1">
                    {t('hero.stats.products')}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-tech-accent">20+</div>
                  <div className="text-xs text-tech-text-muted font-mono uppercase tracking-wider mt-1">
                    {t('hero.stats.clients')}
                  </div>
                </div>
                <div>
                  <div className="text-3xl font-display font-bold text-tech-accent">1k+</div>
                  <div className="text-xs text-tech-text-muted font-mono uppercase tracking-wider mt-1">
                    {t('hero.stats.savings')}
                  </div>
                </div>
              </div>
            </div>

            {/* Right: Terminal */}
            <div className="animate-slide-up">
              <TerminalHero lines={terminalLines} />
            </div>
          </div>
        </div>
      </section>

      {/* ======================= VALUE PROPS ======================= */}
      <section className="section-padding relative">
        <div className="absolute inset-0 tech-dots-bg opacity-30 pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="tech-badge mb-4">
              <span className="font-mono">{'//'} VALUE</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-tech-text">
              {t('valueProps.title')}
            </h2>
            <p className="text-lg text-tech-text-dim">{t('valueProps.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {valueProps.map((prop, i) => {
              const Icon = valuePropIcons[i];
              return (
                <div key={i} className="tech-card group">
                  <div className="w-12 h-12 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center mb-4 group-hover:bg-tech-accent/20 transition-colors">
                    <Icon className="w-5 h-5 text-tech-accent" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-tech-text">{prop.title}</h3>
                  <p className="text-sm text-tech-text-dim leading-relaxed">{prop.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ======================= PRODUCTS ======================= */}
      {featuredProducts.length > 0 && (
        <section className="section-padding bg-tech-surface/30 relative overflow-hidden">
          <div className="container-custom relative z-10">
            <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-12 gap-4">
              <div>
                <div className="tech-badge mb-4">
                  <span className="font-mono">{'//'} PRODUCTS</span>
                </div>
                <h2 className="text-3xl md:text-5xl font-display font-bold text-tech-text">
                  {t('products.title')}
                </h2>
                <p className="text-lg text-tech-text-dim mt-3">{t('products.subtitle')}</p>
              </div>
              <Link
                href={`/${locale}/products`}
                className="btn-ghost whitespace-nowrap"
              >
                {t('products.viewAll')}
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProducts.map((product) => (
                <Link
                  key={product.id}
                  href={`/${locale}/products/${product.slug}`}
                  className="tech-card group flex flex-col h-full"
                >
                  <div className="flex items-center justify-between mb-4">
                    <div className="tech-badge-accent tech-badge-live">
                      {product.status === 'LIVE' ? tCommon('liveProduct') : tCommon('inBeta')}
                    </div>
                    <span className="text-xs font-mono text-tech-text-muted">{product.category}</span>
                  </div>
                  <h3 className="text-xl font-display font-bold mb-2 text-tech-text group-hover:text-tech-accent transition-colors">
                    {product.name}
                  </h3>
                  <p className="text-sm text-tech-text-dim mb-4 leading-relaxed flex-1">
                    {product.tagline[locale as 'ro' | 'en' | 'it']}
                  </p>
                  <div className="flex flex-wrap gap-1.5 mt-auto">
                    {product.techStack.slice(0, 4).map((tech) => (
                      <span
                        key={tech}
                        className="text-[10px] font-mono px-2 py-0.5 rounded bg-tech-elevated border border-tech-border text-tech-text-dim"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ======================= PROCESS ======================= */}
      <section className="section-padding relative">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="tech-badge mb-4">
              <span className="font-mono">{'//'} PROCESS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-tech-text">
              {t('process.title')}
            </h2>
            <p className="text-lg text-tech-text-dim">{t('process.subtitle')}</p>
          </div>

          <div className="relative">
            {/* Connecting line */}
            <div className="hidden lg:block absolute top-12 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tech-border-strong to-transparent" />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
              {processSteps.map((step) => (
                <div key={step.number} className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-12 h-12 rounded-xl bg-tech-surface border border-tech-border-strong flex items-center justify-center font-mono font-bold text-tech-accent text-sm relative z-10">
                      {step.number}
                    </div>
                    <div className="flex-1 h-px bg-tech-border" />
                  </div>
                  <h3 className="text-lg font-semibold mb-2 text-tech-text">{step.title}</h3>
                  <p className="text-sm text-tech-text-dim leading-relaxed">{step.description}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ======================= SERVICES ======================= */}
      <section className="section-padding bg-tech-surface/30 relative">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="tech-badge mb-4">
              <span className="font-mono">{'//'} SERVICES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-tech-text">
              {t('services.title')}
            </h2>
            <p className="text-lg text-tech-text-dim">{t('services.subtitle')}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <div key={i} className="tech-card group">
                <div className="w-12 h-12 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center mb-4 group-hover:bg-tech-accent/20 transition-colors">
                  <service.icon className="w-5 h-5 text-tech-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-tech-text">{service.title}</h3>
                <p className="text-sm text-tech-text-dim leading-relaxed">{service.description}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${locale}/services`}
              className="btn-ghost"
            >
              {tCommon('viewAll')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* ======================= TECH STACK ======================= */}
      <section className="section-padding relative">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="tech-badge mb-4">
              <span className="font-mono">{'//'} STACK</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4 text-tech-text">
              {t('techStack.title')}
            </h2>
            <p className="text-lg text-tech-text-dim">{t('techStack.subtitle')}</p>
          </div>

          <div className="max-w-4xl mx-auto grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
            {techStack.map((tech) => (
              <div
                key={tech.name}
                className="tech-card-glass text-center !p-4 hover:border-tech-accent/40 transition-colors"
              >
                <div className="text-sm font-semibold text-tech-text">{tech.name}</div>
                <div className="text-[10px] font-mono text-tech-text-muted uppercase mt-1">
                  {tech.category}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= WHY US ======================= */}
      <section className="section-padding bg-tech-surface/30 relative">
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <div className="tech-badge mb-4">
              <span className="font-mono">{'//'} WHY</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-4 text-tech-text">
              {t('whyUs.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { icon: Terminal, title: t('whyUs.partner.title'), description: t('whyUs.partner.description') },
              { icon: Code2, title: t('whyUs.technology.title'), description: t('whyUs.technology.description') },
              { icon: Rocket, title: t('whyUs.growth.title'), description: t('whyUs.growth.description') },
            ].map((item, i) => (
              <div key={i} className="tech-card tech-border-gradient">
                <div className="w-12 h-12 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center mb-4">
                  <item.icon className="w-5 h-5 text-tech-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-tech-text">{item.title}</h3>
                <p className="text-tech-text-dim leading-relaxed">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ======================= FINAL CTA ======================= */}
      <section className="section-padding relative overflow-hidden">
        <div className="absolute inset-0 bg-tech-radial pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <div className="tech-badge-accent mb-6">
              <span className="font-mono">{'//'} LET&apos;S BUILD</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold mb-6 text-tech-text text-balance">
              {t('cta.title')}
            </h2>
            <p className="text-lg md:text-xl text-tech-text-dim mb-10 leading-relaxed max-w-2xl mx-auto">
              {t('cta.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href={`/${locale}/contact`} className="btn-primary">
                {t('cta.primary')}
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link href={`mailto:contact@gridjacarts.com`} className="btn-secondary">
                {t('cta.secondary')}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
