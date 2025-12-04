import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Check, Zap, Rocket, Crown, ArrowRight, Phone, Mail, Clock, MapPin, TrendingUp, Award, Users, Star, MessageCircle } from 'lucide-react';
import type { Metadata } from 'next';
import OffertaDicembreForm from '@/components/OffertaDicembreForm';

// Force dynamic rendering due to next-intl usage
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params }: { params: { locale: string } }): Promise<Metadata> {
  const t = await getTranslations({ locale: params.locale, namespace: 'offertaDicembre' });

  return {
    title: t('meta.title'),
    description: t('meta.description'),
    keywords: 'sito web Roma, agenzia web Roma, web design Roma, offerta sito web, pacchetti web dicembre 2025, sito economico Roma, sviluppo web Roma',
    openGraph: {
      title: t('meta.title'),
      description: t('meta.description'),
      type: 'website',
      locale: params.locale === 'it' ? 'it_IT' : params.locale === 'ro' ? 'ro_RO' : 'en_US',
    },
    alternates: {
      canonical: `/${params.locale}/offerta-dicembre`,
      languages: {
        'it': '/it/offerta-dicembre',
        'ro': '/ro/offerta-dicembre',
        'en': '/en/offerta-dicembre',
      },
    },
  };
}

export default function OffertaDicembrePage({ params }: { params: { locale: string } }) {
  const t = useTranslations('offertaDicembre');

  const packages = [
    {
      id: 'startup',
      name: t('packages.startup.name'),
      tagline: t('packages.startup.tagline'),
      price: '999',
      originalPrice: '1.499',
      savings: '500',
      icon: Zap,
      color: 'from-blue-500 to-cyan-500',
      popular: false,
      features: [
        t('packages.startup.features.0'),
        t('packages.startup.features.1'),
        t('packages.startup.features.2'),
        t('packages.startup.features.3'),
        t('packages.startup.features.4'),
        t('packages.startup.features.5'),
        t('packages.startup.features.6'),
        t('packages.startup.features.7'),
        t('packages.startup.features.8'),
        t('packages.startup.features.9'),
      ],
    },
    {
      id: 'pro',
      name: t('packages.pro.name'),
      tagline: t('packages.pro.tagline'),
      price: '1.749',
      originalPrice: '2.499',
      savings: '750',
      icon: Rocket,
      color: 'from-purple-500 to-pink-500',
      popular: true,
      features: [
        t('packages.pro.features.0'),
        t('packages.pro.features.1'),
        t('packages.pro.features.2'),
        t('packages.pro.features.3'),
        t('packages.pro.features.4'),
        t('packages.pro.features.5'),
        t('packages.pro.features.6'),
        t('packages.pro.features.7'),
        t('packages.pro.features.8'),
        t('packages.pro.features.9'),
        t('packages.pro.features.10'),
        t('packages.pro.features.11'),
        t('packages.pro.features.12'),
        t('packages.pro.features.13'),
        t('packages.pro.features.14'),
      ],
    },
    {
      id: 'premium',
      name: t('packages.premium.name'),
      tagline: t('packages.premium.tagline'),
      price: '2.999',
      originalPrice: '4.499',
      savings: '1.500',
      icon: Crown,
      color: 'from-amber-500 to-orange-500',
      popular: false,
      features: [
        t('packages.premium.features.0'),
        t('packages.premium.features.1'),
        t('packages.premium.features.2'),
        t('packages.premium.features.3'),
        t('packages.premium.features.4'),
        t('packages.premium.features.5'),
        t('packages.premium.features.6'),
        t('packages.premium.features.7'),
        t('packages.premium.features.8'),
        t('packages.premium.features.9'),
        t('packages.premium.features.10'),
        t('packages.premium.features.11'),
        t('packages.premium.features.12'),
        t('packages.premium.features.13'),
      ],
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
      {/* Urgent Banner */}
      <div className="bg-gradient-to-r from-red-600 to-rose-600 text-white py-3 px-4 text-center font-semibold animate-pulse">
        <Clock className="inline-block w-5 h-5 mr-2 animate-spin" />
        {t('urgentBanner')}
      </div>

      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 px-4">
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 via-purple-500/10 to-pink-500/10"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="text-center space-y-8">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-6 py-2 rounded-full font-bold shadow-lg animate-bounce">
              <Award className="w-5 h-5" />
              {t('hero.badge')}
            </div>

            {/* Main Heading */}
            <h1 className="text-5xl md:text-7xl font-black text-gray-900 dark:text-white leading-tight">
              {t('hero.title.line1')}<br />
              <span className="bg-gradient-to-r from-primary-600 to-purple-600 bg-clip-text text-transparent">
                {t('hero.title.line2')}
              </span>
            </h1>

            {/* Subheading */}
            <p className="text-xl md:text-2xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto font-semibold">
              {t('hero.subtitle')}
            </p>

            {/* Stats */}
            <div className="flex flex-wrap justify-center gap-8 py-8">
              <div className="text-center">
                <div className="text-4xl font-black text-primary-600">500+</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.clients')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-purple-600">4.9/5</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.rating')}</div>
              </div>
              <div className="text-center">
                <div className="text-4xl font-black text-pink-600">72h</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{t('hero.stats.delivery')}</div>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#pacchetti"
                className="group bg-gradient-to-r from-primary-600 to-purple-600 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center gap-2"
              >
                {t('hero.cta.primary')}
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </a>
              <a
                href="#contatti"
                className="bg-white dark:bg-gray-800 text-gray-900 dark:text-white px-8 py-4 rounded-full font-bold text-lg shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105 border-2 border-gray-200 dark:border-gray-700"
              >
                {t('hero.cta.secondary')}
              </a>
            </div>

            {/* Trust Signals */}
            <div className="flex flex-wrap justify-center items-center gap-6 pt-8 text-sm text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>{t('hero.trust.0')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>{t('hero.trust.1')}</span>
              </div>
              <div className="flex items-center gap-2">
                <Check className="w-5 h-5 text-green-500" />
                <span>{t('hero.trust.2')}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary-500/20 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </section>

      {/* Why Now Section */}
      <section className="py-16 px-4 bg-gradient-to-r from-red-50 to-rose-50 dark:from-red-900/20 dark:to-rose-900/20 border-y-4 border-red-500">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-6">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
              {t('whyNow.title')}
            </h2>
            <div className="grid md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                <div className="text-6xl font-black text-red-600 mb-4">-33%</div>
                <h3 className="text-xl font-bold mb-2">{t('whyNow.reasons.0.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('whyNow.reasons.0.description')}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                <Clock className="w-16 h-16 text-amber-500 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">{t('whyNow.reasons.1.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('whyNow.reasons.1.description')}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-xl">
                <Users className="w-16 h-16 text-green-500 mb-4 mx-auto" />
                <h3 className="text-xl font-bold mb-2">{t('whyNow.reasons.2.title')}</h3>
                <p className="text-gray-600 dark:text-gray-400">{t('whyNow.reasons.2.description')}</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Packages Section */}
      <section id="pacchetti" className="py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-gray-900 dark:text-white">
              {t('packages.title')}
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-400">
              {t('packages.subtitle')}
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {packages.map((pkg) => {
              const Icon = pkg.icon;
              return (
                <div
                  key={pkg.id}
                  className={`relative bg-white dark:bg-gray-800 rounded-3xl shadow-2xl overflow-hidden transition-all duration-300 hover:scale-105 ${
                    pkg.popular ? 'ring-4 ring-purple-500 scale-105' : ''
                  }`}
                >
                  {/* Popular Badge */}
                  {pkg.popular && (
                    <div className="absolute top-0 right-0 bg-gradient-to-r from-purple-600 to-pink-600 text-white px-6 py-2 rounded-bl-3xl font-bold">
                      <Star className="inline-block w-4 h-4 mr-1" />
                      {t('packages.popular')}
                    </div>
                  )}

                  {/* Header */}
                  <div className={`bg-gradient-to-br ${pkg.color} p-8 text-white`}>
                    <Icon className="w-12 h-12 mb-4" />
                    <h3 className="text-2xl font-black mb-2">{pkg.name}</h3>
                    <p className="text-sm opacity-90">{pkg.tagline}</p>

                    {/* Price */}
                    <div className="mt-6">
                      <div className="text-sm line-through opacity-75">€{pkg.originalPrice}</div>
                      <div className="text-5xl font-black">€{pkg.price}</div>
                      <div className="text-sm mt-1">{t('packages.perYear')}</div>
                      <div className="mt-3 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full inline-block font-bold">
                        {t('packages.save')} €{pkg.savings}!
                      </div>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="p-8">
                    <ul className="space-y-3 mb-8">
                      {pkg.features.map((feature, index) => (
                        <li key={index} className="flex items-start gap-3">
                          <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
                          <span className="text-sm text-gray-700 dark:text-gray-300">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA Button */}
                    <a
                      href="#contatti"
                      className={`block w-full text-center bg-gradient-to-r ${pkg.color} text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105`}
                    >
                      {t('packages.cta')}
                    </a>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Social Proof Section */}
      <section className="py-16 px-4 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl font-black text-center mb-12">{t('socialProof.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                &quot;{t('socialProof.testimonials.0.text')}&quot;
              </p>
              <div className="font-bold">{t('socialProof.testimonials.0.author')}</div>
              <div className="text-sm text-gray-500">{t('socialProof.testimonials.0.company')}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                &quot;{t('socialProof.testimonials.1.text')}&quot;
              </p>
              <div className="font-bold">{t('socialProof.testimonials.1.author')}</div>
              <div className="text-sm text-gray-500">{t('socialProof.testimonials.1.company')}</div>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg">
              <div className="flex items-center gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-gray-700 dark:text-gray-300 mb-4 italic">
                &quot;{t('socialProof.testimonials.2.text')}&quot;
              </p>
              <div className="font-bold">{t('socialProof.testimonials.2.author')}</div>
              <div className="text-sm text-gray-500">{t('socialProof.testimonials.2.company')}</div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form Section */}
      <section id="contatti" className="py-20 px-4 bg-gradient-to-br from-primary-600 to-purple-600 text-white">
        <div className="max-w-3xl mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-4xl md:text-5xl font-black">
              {t('contact.title')}
            </h2>
            <p className="text-xl opacity-90">
              {t('contact.subtitle')}
            </p>
          </div>

          <OffertaDicembreForm />

          <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
            <div className="flex flex-col items-center gap-2">
              <Phone className="w-8 h-8" />
              <a href="tel:+390612345678" className="font-bold hover:underline">
                +39 06 1234 5678
              </a>
            </div>
            <div className="flex flex-col items-center gap-2">
              <Mail className="w-8 h-8" />
              <a href="mailto:info@gridjacarts.com" className="font-bold hover:underline">
                info@gridjacarts.com
              </a>
            </div>
            <div className="flex flex-col items-center gap-2">
              <MapPin className="w-8 h-8" />
              <span className="font-bold">Roma, Italia</span>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-4xl mx-auto text-center space-y-6">
          <h2 className="text-4xl md:text-5xl font-black">
            {t('finalCta.title')}
          </h2>
          <p className="text-xl opacity-90">
            {t('finalCta.subtitle')}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="#pacchetti"
              className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-2xl hover:shadow-amber-500/50 transition-all duration-300 hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              {t('finalCta.button')}
              <ArrowRight className="w-5 h-5" />
            </a>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 flex gap-4">
        {/* Phone Button */}
        <a
          href="tel:+393203779506"
          className="bg-green-500 hover:bg-green-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          aria-label="Chiamaci"
        >
          <Phone className="w-6 h-6 group-hover:animate-pulse" />
        </a>

        {/* WhatsApp Button */}
        <a
          href={`https://wa.me/393203779506?text=${encodeURIComponent(
            params.locale === 'it'
              ? 'Ciao! Sono interessato ai vostri pacchetti di Dicembre 2025. Vorrei ricevere maggiori informazioni.'
              : params.locale === 'ro'
              ? 'Bună! Sunt interesat de pachetele voastre din Decembrie 2025. Aș dori să primesc mai multe informații.'
              : 'Hello! I am interested in your December 2025 packages. I would like to receive more information.'
          )}`}
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#25D366] hover:bg-[#20BA5A] text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          aria-label="WhatsApp"
        >
          <MessageCircle className="w-6 h-6 group-hover:animate-pulse" />
        </a>

        {/* Email Button */}
        <a
          href={`mailto:info@gridjacarts.com?subject=${encodeURIComponent(
            params.locale === 'it'
              ? 'Richiesta Informazioni - Offerta Dicembre 2025'
              : params.locale === 'ro'
              ? 'Cerere Informații - Oferta Decembrie 2025'
              : 'Information Request - December 2025 Offer'
          )}&body=${encodeURIComponent(
            params.locale === 'it'
              ? 'Buongiorno,\n\nSono interessato ai vostri pacchetti promozionali di Dicembre 2025.\n\nVorrei ricevere maggiori informazioni su:\n- Pacchetto: [specificare Startup/Pro/Premium]\n- Nome:\n- Telefono:\n- Tipo di attività:\n\nGrazie,\nCordiali saluti'
              : params.locale === 'ro'
              ? 'Bună ziua,\n\nSunt interesat de pachetele voastre promoționale din Decembrie 2025.\n\nAș dori să primesc mai multe informații despre:\n- Pachet: [specificați Startup/Pro/Premium]\n- Nume:\n- Telefon:\n- Tip activitate:\n\nMulțumesc,\nCu stimă'
              : 'Good morning,\n\nI am interested in your December 2025 promotional packages.\n\nI would like to receive more information about:\n- Package: [specify Startup/Pro/Premium]\n- Name:\n- Phone:\n- Business type:\n\nThank you,\nBest regards'
          )}`}
          className="bg-blue-500 hover:bg-blue-600 text-white w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 hover:scale-110 group"
          aria-label="Email"
        >
          <Mail className="w-6 h-6 group-hover:animate-pulse" />
        </a>
      </div>
    </div>
  );
}
