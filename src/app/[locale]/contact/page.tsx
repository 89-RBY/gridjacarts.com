import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Mail, Phone, MapPin, ExternalLink } from 'lucide-react';

interface ContactPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: ContactPageProps) {
  const t = await getTranslations({ locale, namespace: 'contact' });
  return {
    title: t('title'),
  };
}

export default function ContactPage({ params: { locale } }: ContactPageProps) {
  const t = useTranslations('contact');
  const tCommon = useTranslations('common');

  const locations = [
    {
      country: t('locations.romania'),
      address: 'Str. Principală, nr. 159',
      city: 'Balcauți 727025 SV',
      phone: '+40 770 362 294',
      flag: '🇷🇴',
    },
    {
      country: t('locations.italy'),
      address: 'Via Trecate 43',
      city: 'Roma 00166',
      phone: '+39 320 377 9506',
      flag: '🇮🇹',
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

      {/* Contact Info */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Email Contact */}
            <div className="text-center p-8 card">
              <div className="w-20 h-20 bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Mail className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">{t('sendEmail')}</h2>
              <a
                href="mailto:info@gridjacarts.com"
                className="text-xl text-primary-600 dark:text-primary-400 hover:underline inline-flex items-center gap-2"
              >
                info@gridjacarts.com
                <ExternalLink className="w-5 h-5" />
              </a>
            </div>

            {/* Phone Contact */}
            <div className="text-center p-8 card">
              <div className="w-20 h-20 bg-gradient-to-br from-accent-500 to-accent-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Phone className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-semibold mb-4">{t('callUs')}</h2>
              <div className="space-y-2">
                <a
                  href="tel:+40770362294"
                  className="block text-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  🇷🇴 +40 770 362 294
                </a>
                <a
                  href="tel:+393203779506"
                  className="block text-lg text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                >
                  🇮🇹 +39 320 377 9506
                </a>
              </div>
            </div>
          </div>

          {/* Locations */}
          <div className="mt-16">
            <h2 className="text-3xl font-display font-bold text-center mb-12 gradient-text">
              {tCommon('address')}
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {locations.map((location, index) => (
                <div key={index} className="card p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <span className="text-4xl">{location.flag}</span>
                    <h3 className="text-2xl font-semibold">{location.country}</h3>
                  </div>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <MapPin className="w-5 h-5 text-primary-600 dark:text-primary-400 mt-1 flex-shrink-0" />
                      <div>
                        <p className="text-gray-700 dark:text-gray-300">{location.address}</p>
                        <p className="text-gray-700 dark:text-gray-300">{location.city}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Phone className="w-5 h-5 text-primary-600 dark:text-primary-400 flex-shrink-0" />
                      <a
                        href={`tel:${location.phone.replace(/\s/g, '')}`}
                        className="text-gray-700 dark:text-gray-300 hover:text-primary-600 dark:hover:text-primary-400"
                      >
                        {location.phone}
                      </a>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Social Media */}
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-semibold mb-6">{tCommon('followUs')}</h2>
            <div className="flex justify-center gap-6">
              <a
                href="https://facebook.com/gridjacarts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                </svg>
              </a>
              <a
                href="https://instagram.com/gridjacarts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-gradient-to-br from-purple-600 to-pink-500 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <rect x="2" y="2" width="20" height="20" rx="5" ry="5" fill="none" stroke="currentColor" strokeWidth="2" />
                  <path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z" fill="none" stroke="currentColor" strokeWidth="2" />
                  <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" stroke="currentColor" strokeWidth="2" />
                </svg>
              </a>
              <a
                href="https://linkedin.com/company/gridjacarts"
                target="_blank"
                rel="noopener noreferrer"
                className="w-14 h-14 bg-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
