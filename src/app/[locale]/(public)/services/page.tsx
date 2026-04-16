import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import {
  Code2,
  Palette,
  Search,
  Workflow,
  Sparkles,
  Rocket,
  Layers,
  ArrowRight,
  Check,
  MessageSquare,
  Utensils,
  Store,
  BookOpen,
} from 'lucide-react';
import { getAllServicePages } from '@/lib/data';

interface ServicesPageProps {
  params: { locale: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: ServicesPageProps) {
  const t = await getTranslations({ locale, namespace: 'services' });
  return {
    title: t('title'),
  };
}

export default function ServicesPage({ params: { locale } }: ServicesPageProps) {
  const t = useTranslations('services');
  const tCommon = useTranslations('common');
  const loc = locale as 'ro' | 'en' | 'it';

  // Get dynamic services from seed data
  const servicePages = getAllServicePages();

  // Icon mapping
  const iconMap: Record<string, typeof MessageSquare> = {
    MessageSquare,
    Utensils,
    Store,
    BookOpen,
    Layers,
    Code2,
    Workflow,
    Sparkles,
    Rocket,
    Palette,
    Search,
  };

  const services = servicePages.map((service) => ({
    slug: service.slug,
    icon: iconMap[service.icon] || Layers,
    title: service.name,
    description: service.tagline[loc],
    features: service.benefits[loc].slice(0, 4), // Take first 4 benefits as features
  }));

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 tech-grid-bg">
        <div className="absolute inset-0 bg-tech-radial pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="tech-badge-accent mb-6">
              <span className="font-mono text-[11px]">{'//'} SERVICES</span>
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

      {/* Services List */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {services.map((service, index) => (
              <Link
                key={index}
                href={`/${locale}/services/${service.slug}`}
                className="tech-card group hover:border-tech-accent/50 transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center flex-shrink-0 group-hover:bg-tech-accent/20 transition-colors">
                    <service.icon className="w-5 h-5 text-tech-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-2">
                      <h2 className="text-xl font-display font-bold text-tech-text group-hover:text-tech-accent transition-colors">
                        {service.title}
                      </h2>
                      <ArrowRight className="w-4 h-4 text-tech-text-muted group-hover:text-tech-accent transition-colors flex-shrink-0" />
                    </div>
                    <p className="text-sm text-tech-text-dim leading-relaxed mb-4">
                      {service.description}
                    </p>
                    <ul className="space-y-1.5">
                      {service.features.map((feature, fIndex) => (
                        <li key={fIndex} className="flex items-center gap-2 text-sm text-tech-text-dim">
                          <Check className="w-3.5 h-3.5 text-tech-accent flex-shrink-0" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="pb-24">
        <div className="container-custom">
          <div className="tech-card-elevated text-center py-12 px-6 max-w-3xl mx-auto tech-border-gradient">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-tech-text">
              {locale === 'ro' && 'Ai nevoie de un serviciu personalizat?'}
              {locale === 'en' && 'Need a custom service?'}
              {locale === 'it' && 'Hai bisogno di un servizio personalizzato?'}
            </h2>
            <p className="text-tech-text-dim mb-8 max-w-xl mx-auto">
              {locale === 'ro' && 'Discută-ne viziunea ta. Construim soluții custom care se potrivesc exact nevoilor tale.'}
              {locale === 'en' && 'Share your vision. We build custom solutions that fit your needs exactly.'}
              {locale === 'it' && 'Condividi la tua visione. Costruiamo soluzioni custom che si adattano esattamente alle tue esigenze.'}
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
