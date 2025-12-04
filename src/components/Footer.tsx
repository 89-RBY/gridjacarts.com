'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { Facebook, Instagram, Linkedin, Mail, Phone, MapPin, Check } from 'lucide-react';
import Logo from './Logo';
import ChatbotScript from './ChatbotScript';

interface FooterProps {
  locale: string;
}

export default function Footer({ locale }: FooterProps) {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const tCommon = useTranslations('common');
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [success, setSuccess] = useState(false);

  const quickLinks = [
    { name: tNav('home'), href: `/${locale}` },
    { name: tNav('about'), href: `/${locale}/about` },
    { name: tNav('services'), href: `/${locale}/services` },
    { name: tNav('portfolio'), href: `/${locale}/portfolio` },
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
        body: JSON.stringify({ email }),
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
    <footer className="bg-gray-900 text-gray-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Logo size="lg" />
            <p className="text-sm text-gray-400 leading-relaxed">
              {t('description')}
            </p>
            <div className="flex space-x-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-400 hover:text-primary-400 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('quickLinks')}</h3>
            <ul className="space-y-2">
              {quickLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('contact')}</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <Mail className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                <a
                  href="mailto:info@gridjacarts.com"
                  className="text-sm text-gray-400 hover:text-primary-400 transition-colors"
                >
                  info@gridjacarts.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <p>RO: +40 770 362 294</p>
                  <p>IT: +39 320 377 9506</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-primary-400 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <p>Str. Principală, nr. 159</p>
                  <p>Balcauți 727025 SV, România</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-4 h-4 mt-0.5 text-accent-400 flex-shrink-0" />
                <div className="text-sm text-gray-400">
                  <p>Via Trecate 43</p>
                  <p>Roma 00166, Italia</p>
                </div>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h3 className="text-white font-semibold mb-4">{t('newsletter')}</h3>
            <p className="text-sm text-gray-400 mb-4">{t('newsletterText')}</p>
            <form onSubmit={handleNewsletterSubmit} className="space-y-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={tCommon('email')}
                required
                disabled={loading || success}
                className="w-full px-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-sm text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || success}
                className="w-full bg-gradient-to-r from-primary-600 to-accent-600 text-white px-4 py-2 rounded-lg text-sm font-medium hover:shadow-lg transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-2"
              >
                {success && <Check className="w-4 h-4" />}
                {loading ? (locale === 'ro' ? 'Se trimite...' : locale === 'en' ? 'Sending...' : 'Invio...') : success ? (locale === 'ro' ? 'Abonat!' : locale === 'en' ? 'Subscribed!' : 'Iscritto!') : t('subscribe')}
              </button>
              {message && (
                <p className={`text-xs ${success ? 'text-green-400' : 'text-red-400'}`}>
                  {message}
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 pt-8 border-t border-gray-800">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-500">
              © {new Date().getFullYear()} {tCommon('brand')}. {t('rights')}.
            </p>
            <div className="flex gap-6">
              <Link
                href={`/${locale}/privacy`}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                {t('privacy')}
              </Link>
              <Link
                href={`/${locale}/terms`}
                className="text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                {t('terms')}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Chatbot Script Injection */}
      <ChatbotScript />
    </footer>
  );
}
