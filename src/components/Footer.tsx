'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Check } from 'lucide-react';
import Logo from './Logo';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [email, setEmail] = useState('');
  const [honeypot, setHoneypot] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const quickLinks = [
    { name: tNav('products'), href: `/${locale}/products` },
    { name: tNav('services'), href: `/${locale}/services` },
    { name: tNav('labs'), href: `/${locale}/labs` },
    { name: tNav('about'), href: `/${locale}/about` },
    { name: tNav('blog'), href: `/${locale}/blog` },
    { name: tNav('contact'), href: `/${locale}/contact` },
  ];

  const socialLinks = [
    { name: 'Facebook', icon: Facebook, href: 'https://facebook.com/gridjacarts' },
    { name: 'Instagram', icon: Instagram, href: 'https://instagram.com/gridjacarts' },
    { name: 'LinkedIn', icon: Linkedin, href: 'https://linkedin.com/company/gridjacarts' },
  ];

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage('');
    setSuccess(false);

    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, website: honeypot }),
      });

      const data = await res.json();

      if (!res.ok) {
        setMessage(data.error || 'Errore durante la sottoscrizione');
        setSuccess(false);
      } else {
        setMessage(locale === 'ro' ? 'Te-ai abonat cu succes!' : locale === 'en' ? 'Successfully subscribed!' : 'Iscrizione completata!');
        setSuccess(true);
        setEmail('');
      }
    } catch (error) {
      setMessage(locale === 'ro' ? 'Eroare de rețea' : locale === 'en' ? 'Network error' : 'Errore di rete');
      setSuccess(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <footer className="relative bg-tech-bg border-t border-tech-border text-tech-text-dim">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-tech-accent/30 to-transparent" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-tech-text-dim leading-relaxed max-w-xs">
              {t('description')}
            </p>
            <div className="flex items-center gap-3 pt-2">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-9 h-9 rounded-lg bg-tech-surface border border-tech-border flex items-center justify-center text-tech-text-dim hover:text-tech-accent hover:border-tech-accent/40 transition-all"
                  aria-label={social.name}
                >
                  <social.icon className="w-4 h-4" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-tech-text-muted mb-4">
              {'//'} {t('quickLinks')}
            </h3>
            <ul className="space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-tech-text-dim hover:text-tech-accent transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-tech-text-muted mb-4">
              {'//'} {t('contact')}
            </h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-tech-accent flex-shrink-0" />
                <a
                  href="mailto:info@gridjacarts.com"
                  className="text-sm text-tech-text-dim hover:text-tech-accent transition-colors"
                >
                  info@gridjacarts.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-tech-accent flex-shrink-0" />
                <div className="text-sm text-tech-text-dim space-y-0.5">
                  <p>RO: +40 770 362 294</p>
                  <p>IT: +39 320 377 9506</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-tech-accent flex-shrink-0" />
                <div className="text-sm text-tech-text-dim space-y-0.5">
                  <p>Str. Principală 159</p>
                  <p>Balcauți 727025 SV, România</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-tech-cyan flex-shrink-0" />
                <div className="text-sm text-tech-text-dim space-y-0.5">
                  <p>Via Trecate 43</p>
                  <p>Roma 00166, Italia</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-xs font-mono uppercase tracking-wider text-tech-text-muted mb-4">
              {'//'} {t('newsletter')}
            </h3>
            <p className="text-sm text-tech-text-dim mb-4 leading-relaxed">{t('newsletterText')}</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              {/* Honeypot field - invisible to humans, filled by bots */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                <input
                  type="text"
                  name="website"
                  value={honeypot}
                  onChange={(e) => setHoneypot(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tCommon('email')}
                required
                disabled={loading || success}
                className="w-full px-4 py-2.5 bg-tech-surface border border-tech-border rounded-lg text-sm text-tech-text placeholder-tech-text-muted focus:outline-none focus:border-tech-accent focus:ring-1 focus:ring-tech-accent disabled:opacity-50 font-mono"
              />
              <button
                type="submit"
                disabled={loading || success}
                className="btn-primary w-full !py-2.5"
              >
                {success && <Check className="w-4 h-4" />}
                {loading
                  ? locale === 'ro' ? 'Se trimite...' : locale === 'en' ? 'Sending...' : 'Invio...'
                  : success
                  ? locale === 'ro' ? 'Abonat!' : locale === 'en' ? 'Subscribed!' : 'Iscritto!'
                  : t('subscribe')}
              </button>
              {message && (
                <p className={`text-xs font-mono ${success ? 'text-tech-accent' : 'text-tech-danger'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-16 pt-8 border-t border-tech-border">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-tech-text-muted font-mono">
              © {new Date().getFullYear()} {tCommon('brand')}. {t('rights')}.
            </p>
            <div className="flex gap-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-sm text-tech-text-muted hover:text-tech-accent transition-colors"
              >
                {t('privacy')}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-sm text-tech-text-muted hover:text-tech-accent transition-colors"
              >
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
