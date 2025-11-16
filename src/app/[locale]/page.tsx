import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import {
  ArrowRight,
  Code,
  Palette,
  Search,
  Share2,
  Megaphone,
  Camera,
  Layers,
  Handshake,
  Cpu,
  TrendingUp,
} from 'lucide-react';

interface HomePageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: HomePageProps) {
  const t = await getTranslations({ locale, namespace: 'home' });
  return {
    title: t('hero.title'),
  };
}

export default function HomePage({ params: { locale } }: HomePageProps) {
  const t = useTranslations('home');
  const tCommon = useTranslations('common');
  const tServices = useTranslations('services');

  const services = [
    { icon: Palette, title: tServices('webDesign.title'), description: tServices('webDesign.description') },
    { icon: Code, title: tServices('webDev.title'), description: tServices('webDev.description') },
    { icon: Search, title: tServices('seo.title'), description: tServices('seo.description') },
    { icon: Share2, title: tServices('smm.title'), description: tServices('smm.description') },
    { icon: Megaphone, title: tServices('advertising.title'), description: tServices('advertising.description') },
    { icon: Camera, title: tServices('virtualTours.title'), description: tServices('virtualTours.description') },
    { icon: Layers, title: tServices('fullStack.title'), description: tServices('fullStack.description') },
  ];

  return (
    <div className="overflow-hidden">
      {/* Hero Section */}
      <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-primary-50 dark:from-gray-900 dark:via-gray-900 dark:to-gray-800">
        {/* Background decoration */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-primary-200 dark:bg-primary-900/30 rounded-full blur-3xl opacity-50" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-accent-200 dark:bg-accent-900/30 rounded-full blur-3xl opacity-50" />

          {/* Grid pattern */}
          <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]" />
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-display font-bold mb-6 animate-fade-in">
              <span className="gradient-text">{t('hero.title')}</span>
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 leading-relaxed animate-slide-up">
              {t('hero.subtitle')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center animate-slide-up">
              <Link href={`/${locale}/contact`} className="btn-primary inline-flex items-center justify-center gap-2">
                {t('hero.cta')}
                <ArrowRight className="w-5 h-5" />
              </Link>
              <Link href={`/${locale}/services`} className="btn-secondary inline-flex items-center justify-center">
                {tCommon('learnMore')}
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 border-2 border-gray-400 dark:border-gray-600 rounded-full flex justify-center">
            <div className="w-1.5 h-3 bg-gray-400 dark:bg-gray-600 rounded-full mt-2 animate-pulse" />
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('services.title')}
            </h2>
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {t('services.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div
                key={index}
                className="card p-6 group hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-14 h-14 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/50 dark:to-accent-900/50 rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <service.icon className="w-7 h-7 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">
                  {service.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                  {service.description}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              href={`/${locale}/services`}
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:gap-4 transition-all"
            >
              {tCommon('viewAll')}
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Us Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">
              {t('whyUs.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Handshake className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('whyUs.partner.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('whyUs.partner.description')}</p>
            </div>

            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Cpu className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('whyUs.technology.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('whyUs.technology.description')}</p>
            </div>

            <div className="text-center p-8">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <TrendingUp className="w-10 h-10 text-white" />
              </div>
              <h3 className="text-xl font-semibold mb-4">{t('whyUs.growth.title')}</h3>
              <p className="text-gray-600 dark:text-gray-400">{t('whyUs.growth.description')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="section-padding bg-gradient-to-r from-primary-600 via-violet-600 to-accent-600 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff12_1px,transparent_1px),linear-gradient(to_bottom,#ffffff12_1px,transparent_1px)] bg-[size:24px_24px]" />
        <div className="container-custom relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-display font-bold mb-6">
            {locale === 'ro' && 'Pregătit să crești?'}
            {locale === 'en' && 'Ready to grow?'}
            {locale === 'it' && 'Pronto a crescere?'}
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            {locale === 'ro' && 'Hai să discutăm despre cum putem transforma viziunea ta digitală în realitate.'}
            {locale === 'en' && 'Let\'s discuss how we can transform your digital vision into reality.'}
            {locale === 'it' && 'Parliamo di come possiamo trasformare la tua visione digitale in realtà.'}
          </p>
          <Link
            href={`/${locale}/contact`}
            className="inline-flex items-center gap-2 bg-white text-primary-600 px-8 py-4 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all duration-200"
          >
            {tCommon('contactUs')}
            <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
