import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Mail, Phone, MapPin, Calendar, Facebook, Instagram, Linkedin } from 'lucide-react';
import Link from 'next/link';

interface ContactPageProps {
  params: { locale: string };
}

export const dynamic = 'force-dynamic';

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
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 tech-grid-bg">
        <div className="absolute inset-0 bg-tech-radial pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="tech-badge-accent mb-6">
              <span className="font-mono text-[11px]">{'//'} CONTACT</span>
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

      {/* Contact Channels */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="grid md:grid-cols-3 gap-6">
            {/* Email */}
            <a
              href="mailto:info@gridjacarts.com"
              className="tech-card group hover:border-tech-accent/40"
            >
              <div className="w-12 h-12 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center mb-4 group-hover:bg-tech-accent/20 transition-colors">
                <Mail className="w-5 h-5 text-tech-accent" />
              </div>
              <div className="text-xs font-mono uppercase text-tech-text-muted mb-2">
                {'//'} email
              </div>
              <div className="text-lg font-semibold text-tech-text group-hover:text-tech-accent transition-colors">
                info@gridjacarts.com
              </div>
              <div className="text-sm text-tech-text-dim mt-1">
                {t('sendEmail')}
              </div>
            </a>

            {/* Book a call */}
            <Link
              href={`/${locale}/contact#form`}
              className="tech-card group hover:border-tech-accent/40 tech-border-gradient"
            >
              <div className="w-12 h-12 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center mb-4 group-hover:bg-tech-accent/20 transition-colors">
                <Calendar className="w-5 h-5 text-tech-accent" />
              </div>
              <div className="text-xs font-mono uppercase text-tech-text-muted mb-2">
                {'//'} book call
              </div>
              <div className="text-lg font-semibold text-tech-text group-hover:text-tech-accent transition-colors">
                {tCommon('bookCall')}
              </div>
              <div className="text-sm text-tech-text-dim mt-1">
                {locale === 'ro' ? 'Call gratuit de 30 min' : locale === 'it' ? 'Call gratuita di 30 min' : 'Free 30-min call'}
              </div>
            </Link>

            {/* Phone */}
            <div className="tech-card">
              <div className="w-12 h-12 rounded-lg bg-tech-cyan/10 border border-tech-cyan/30 flex items-center justify-center mb-4">
                <Phone className="w-5 h-5 text-tech-cyan" />
              </div>
              <div className="text-xs font-mono uppercase text-tech-text-muted mb-2">
                {'//'} phone
              </div>
              <div className="space-y-1">
                <a href="tel:+40770362294" className="block text-tech-text hover:text-tech-accent transition-colors">
                  🇷🇴 +40 770 362 294
                </a>
                <a href="tel:+393203779506" className="block text-tech-text hover:text-tech-accent transition-colors">
                  🇮🇹 +39 320 377 9506
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Locations */}
      <section className="pb-16">
        <div className="container-custom">
          <div className="mb-8">
            <div className="tech-badge mb-4">
              <span className="font-mono">{'//'} LOCATIONS</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-display font-bold text-tech-text">
              {tCommon('address')}
            </h2>
          </div>
          <div className="grid md:grid-cols-2 gap-6">
            {locations.map((location, index) => (
              <div key={index} className="tech-card">
                <div className="flex items-center gap-3 mb-5">
                  <span className="text-3xl">{location.flag}</span>
                  <h3 className="text-xl font-semibold text-tech-text">{location.country}</h3>
                </div>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <MapPin className="w-4 h-4 text-tech-accent mt-1 flex-shrink-0" />
                    <div className="text-tech-text-dim">
                      <p>{location.address}</p>
                      <p>{location.city}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-tech-accent flex-shrink-0" />
                    <a
                      href={`tel:${location.phone.replace(/\s/g, '')}`}
                      className="text-tech-text-dim hover:text-tech-accent transition-colors"
                    >
                      {location.phone}
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Social */}
      <section className="pb-24">
        <div className="container-custom text-center">
          <h2 className="text-xs font-mono uppercase text-tech-text-muted tracking-wider mb-6">
            {'//'} {tCommon('followUs')}
          </h2>
          <div className="flex justify-center gap-4">
            {[
              { icon: Facebook, href: 'https://facebook.com/gridjacarts', label: 'Facebook' },
              { icon: Instagram, href: 'https://instagram.com/gridjacarts', label: 'Instagram' },
              { icon: Linkedin, href: 'https://linkedin.com/company/gridjacarts', label: 'LinkedIn' },
            ].map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-12 h-12 rounded-xl bg-tech-surface border border-tech-border flex items-center justify-center text-tech-text-dim hover:text-tech-accent hover:border-tech-accent/40 transition-all"
                aria-label={social.label}
              >
                <social.icon className="w-5 h-5" />
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
