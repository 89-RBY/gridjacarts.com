import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Handshake, Lightbulb, Award, Eye } from 'lucide-react';
import TeamList from '@/components/TeamList';

interface AboutPageProps {
  params: { locale: string };
}

// Force dynamic rendering due to next-intl usage
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: AboutPageProps) {
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('title'),
  };
}

export default function AboutPage({ params: { locale } }: AboutPageProps) {
  const t = useTranslations('about');

  const values = [
    { icon: Handshake, name: t('values.partnership') },
    { icon: Lightbulb, name: t('values.innovation') },
    { icon: Award, name: t('values.quality') },
    { icon: Eye, name: t('values.transparency') },
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
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-display font-bold mb-6 gradient-text">
                {t('mission.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('mission.content')}
              </p>
            </div>
            <div className="relative">
              <div className="aspect-square bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 rounded-3xl flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-primary-500 to-accent-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Handshake className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative">
              <div className="aspect-square bg-gradient-to-br from-accent-100 to-primary-100 dark:from-accent-900/30 dark:to-primary-900/30 rounded-3xl flex items-center justify-center">
                <div className="w-32 h-32 bg-gradient-to-br from-accent-500 to-primary-500 rounded-2xl flex items-center justify-center shadow-2xl">
                  <Eye className="w-16 h-16 text-white" />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <h2 className="text-3xl font-display font-bold mb-6 gradient-text">
                {t('vision.title')}
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 leading-relaxed">
                {t('vision.content')}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="section-padding bg-gray-50 dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold gradient-text">
              {t('team.title')}
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mt-4 max-w-2xl mx-auto">
              {t('team.subtitle')}
            </p>
          </div>
          <TeamList locale={locale} />
        </div>
      </section>

      {/* Values Section */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-display font-bold gradient-text">
              {t('values.title')}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/50 dark:to-accent-900/50 rounded-2xl flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  <value.icon className="w-10 h-10 text-primary-600 dark:text-primary-400" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-white">{value.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}


