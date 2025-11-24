import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import Image from 'next/image';
import {
  Code,
  Palette,
  Search,
  Share2,
  Megaphone,
  Camera,
  Layers,
  ArrowRight,
} from 'lucide-react';

interface ServicesPageProps {
  params: { locale: string };
}

// Force dynamic rendering due to next-intl usage
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
      icon: Palette,
      title: t('webDesign.title'),
      description: t('webDesign.description'),
      image: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&h=600&fit=crop',
      features: locale === 'ro'
        ? ['Design responsive', 'UI/UX optimizat', 'Branding vizual', 'Prototipare']
        : locale === 'en'
        ? ['Responsive design', 'Optimized UI/UX', 'Visual branding', 'Prototyping']
        : ['Design responsive', 'UI/UX ottimizzato', 'Branding visivo', 'Prototipazione'],
    },
    {
      icon: Code,
      title: t('webDev.title'),
      description: t('webDev.description'),
      image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800&h=600&fit=crop',
      features: locale === 'ro'
        ? ['Tehnologii moderne', 'Performanță optimă', 'Securitate avansată', 'Scalabilitate']
        : locale === 'en'
        ? ['Modern technologies', 'Optimal performance', 'Advanced security', 'Scalability']
        : ['Tecnologie moderne', 'Prestazioni ottimali', 'Sicurezza avanzata', 'Scalabilità'],
    },
    {
      icon: Search,
      title: t('seo.title'),
      description: t('seo.description'),
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
      features: locale === 'ro'
        ? ['Audit SEO complet', 'Optimizare on-page', 'Link building', 'Rapoarte detaliate']
        : locale === 'en'
        ? ['Complete SEO audit', 'On-page optimization', 'Link building', 'Detailed reports']
        : ['Audit SEO completo', 'Ottimizzazione on-page', 'Link building', 'Report dettagliati'],
    },
    {
      icon: Share2,
      title: t('smm.title'),
      description: t('smm.description'),
      image: 'https://images.unsplash.com/photo-1611926653458-09294b3142bf?w=800&h=600&fit=crop',
      features: locale === 'ro'
        ? ['Strategie de conținut', 'Gestionare conturi', 'Creștere organică', 'Analiză engagement']
        : locale === 'en'
        ? ['Content strategy', 'Account management', 'Organic growth', 'Engagement analysis']
        : ['Strategia di contenuto', 'Gestione account', 'Crescita organica', 'Analisi engagement'],
    },
    {
      icon: Megaphone,
      title: t('advertising.title'),
      description: t('advertising.description'),
      image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&h=600&fit=crop',
      features: locale === 'ro'
        ? ['Google Ads', 'Facebook Ads', 'Remarketing', 'Optimizare ROI']
        : locale === 'en'
        ? ['Google Ads', 'Facebook Ads', 'Remarketing', 'ROI optimization']
        : ['Google Ads', 'Facebook Ads', 'Remarketing', 'Ottimizzazione ROI'],
    },
    {
      icon: Camera,
      title: t('virtualTours.title'),
      description: t('virtualTours.description'),
      image: 'https://images.unsplash.com/photo-1617802690658-1173a812650d?w=800&h=600&fit=crop',
      features: locale === 'ro'
        ? ['Fotografii 360°', 'Experiențe interactive', 'Integrare Google Maps', 'Realitate virtuală']
        : locale === 'en'
        ? ['360° photography', 'Interactive experiences', 'Google Maps integration', 'Virtual reality']
        : ['Fotografie a 360°', 'Esperienze interattive', 'Integrazione Google Maps', 'Realtà virtuale'],
    },
    {
      icon: Layers,
      title: t('fullStack.title'),
      description: t('fullStack.description'),
      image: 'https://images.unsplash.com/photo-1537432376769-00f5c2f4c8d2?w=800&h=600&fit=crop',
      features: locale === 'ro'
        ? ['Aplicații web complete', 'API development', 'Baze de date', 'Cloud deployment']
        : locale === 'en'
        ? ['Complete web applications', 'API development', 'Databases', 'Cloud deployment']
        : ['Applicazioni web complete', 'Sviluppo API', 'Database', 'Deploy cloud'],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="gradient-text">{t('title')}</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Services List */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="space-y-16">
            {services.map((service, index) => (
              <div
                key={index}
                className={`grid md:grid-cols-2 gap-12 items-center ${
                  index % 2 === 1 ? 'md:grid-flow-dense' : ''
                }`}
              >
                <div className={index % 2 === 1 ? 'md:col-start-2' : ''}>
                  <div className="w-16 h-16 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/50 dark:to-accent-900/50 rounded-xl flex items-center justify-center mb-6">
                    <service.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                  </div>
                  <h2 className="text-2xl md:text-3xl font-display font-bold mb-4">
                    {service.title}
                  </h2>
                  <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  <ul className="space-y-2">
                    {service.features.map((feature, fIndex) => (
                      <li key={fIndex} className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-primary-500 rounded-full" />
                        <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </div>
                <div className={index % 2 === 1 ? 'md:col-start-1 md:row-start-1' : ''}>
                  <div className="aspect-[4/3] relative rounded-3xl overflow-hidden shadow-lg group">
                    <Image
                      src={service.image}
                      alt={service.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                    <div className="absolute inset-0 bg-gradient-to-tr from-primary-600/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom text-center">
          <h2 className="text-3xl font-display font-bold mb-6">
            {locale === 'ro' && 'Ai nevoie de un serviciu personalizat?'}
            {locale === 'en' && 'Need a custom service?'}
            {locale === 'it' && 'Hai bisogno di un servizio personalizzato?'}
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-2xl mx-auto">
            {locale === 'ro' && 'Contactează-ne pentru a discuta despre nevoile tale specifice și pentru a găsi soluția perfectă.'}
            {locale === 'en' && 'Contact us to discuss your specific needs and find the perfect solution.'}
            {locale === 'it' && 'Contattaci per discutere delle tue esigenze specifiche e trovare la soluzione perfetta.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="btn-primary inline-flex items-center gap-2"
          >
            {tCommon('contactUs')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
