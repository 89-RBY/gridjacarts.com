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
} from 'lucide-react';

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

  const services = [
    {
      icon: Code2,
      title: t('webDev.title'),
      description: t('webDev.description'),
      features: locale === 'ro'
        ? ['Aplicații scalate pentru producție', 'Arhitectură modulară', 'CI/CD automat', 'Performanță optimă']
        : locale === 'en'
        ? ['Production-grade applications', 'Modular architecture', 'Automated CI/CD', 'Optimal performance']
        : ['Applicazioni production-grade', 'Architettura modulare', 'CI/CD automatizzato', 'Performance ottimali'],
    },
    {
      icon: Workflow,
      title: t('smm.title'),
      description: t('smm.description'),
      features: locale === 'ro'
        ? ['Integrări API', 'Workflow-uri automate', 'Sincronizări bidirecționale', 'AI agents']
        : locale === 'en'
        ? ['API integrations', 'Automated workflows', 'Bidirectional syncs', 'AI agents']
        : ['Integrazioni API', 'Workflow automatizzati', 'Sync bidirezionali', 'AI agent'],
    },
    {
      icon: Sparkles,
      title: t('advertising.title'),
      description: t('advertising.description'),
      features: locale === 'ro'
        ? ['Chatboți inteligenți', 'Clasificare automată', 'Generare conținut', 'Decizii data-driven']
        : locale === 'en'
        ? ['Intelligent chatbots', 'Automated classification', 'Content generation', 'Data-driven decisions']
        : ['Chatbot intelligenti', 'Classificazione automatica', 'Generazione contenuti', 'Decisioni data-driven'],
    },
    {
      icon: Rocket,
      title: t('virtualTours.title'),
      description: t('virtualTours.description'),
      features: locale === 'ro'
        ? ['Prototip funcțional în 4 săptămâni', 'Validare rapidă', 'Feedback loop strâns', 'Path clar spre v1']
        : locale === 'en'
        ? ['Functional prototype in 4 weeks', 'Fast validation', 'Tight feedback loop', 'Clear path to v1']
        : ['Prototipo funzionale in 4 settimane', 'Validazione rapida', 'Feedback loop stretto', 'Path chiaro verso v1'],
    },
    {
      icon: Palette,
      title: t('webDesign.title'),
      description: t('webDesign.description'),
      features: locale === 'ro'
        ? ['Design systems', 'Conversion-focused UX', 'Prototipare Figma', 'Design tokens']
        : locale === 'en'
        ? ['Design systems', 'Conversion-focused UX', 'Figma prototyping', 'Design tokens']
        : ['Design systems', 'UX focalizzato su conversione', 'Prototipazione Figma', 'Design tokens'],
    },
    {
      icon: Search,
      title: t('seo.title'),
      description: t('seo.description'),
      features: locale === 'ro'
        ? ['Core Web Vitals', 'Structured data', 'Sitemap dinamic', 'Performanță edge']
        : locale === 'en'
        ? ['Core Web Vitals', 'Structured data', 'Dynamic sitemap', 'Edge performance']
        : ['Core Web Vitals', 'Structured data', 'Sitemap dinamica', 'Performance edge'],
    },
    {
      icon: Layers,
      title: t('fullStack.title'),
      description: t('fullStack.description'),
      features: locale === 'ro'
        ? ['Backend + Frontend', 'Infrastructure as code', 'DevOps & monitoring', 'Un singur partener']
        : locale === 'en'
        ? ['Backend + Frontend', 'Infrastructure as code', 'DevOps & monitoring', 'One single partner']
        : ['Backend + Frontend', 'Infrastructure as code', 'DevOps & monitoring', 'Un unico partner'],
    },
  ];

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
              <div key={index} className="tech-card group">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center flex-shrink-0 group-hover:bg-tech-accent/20 transition-colors">
                    <service.icon className="w-5 h-5 text-tech-accent" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-xl font-display font-bold mb-2 text-tech-text">
                      {service.title}
                    </h2>
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
              </div>
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
