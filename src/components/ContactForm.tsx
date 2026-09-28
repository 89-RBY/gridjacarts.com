'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { ArrowRight, CheckCircle2 } from 'lucide-react';

const initialForm = {
  name: '',
  email: '',
  phone: '',
  company: '',
  message: '',
  privacyAccepted: false,
  confirm_email: '', // honeypot
};

export default function ContactForm({ locale }: { locale: string }) {
  const t = useTranslations('contact.form');
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [utm, setUtm] = useState({ source: '', medium: '', campaign: '' });

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtm({
      source: params.get('utm_source') || '',
      medium: params.get('utm_medium') || '',
      campaign: params.get('utm_campaign') || '',
    });
  }, []);

  const update = <K extends keyof typeof initialForm>(field: K, value: (typeof initialForm)[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.privacyAccepted) {
      setError(t('privacyRequired'));
      return;
    }
    setLoading(true);
    setError('');

    const message = [form.company ? `Azienda: ${form.company}` : '', form.message]
      .filter(Boolean)
      .join('\n\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message,
          source: 'contact-page',
          subject: `Richiesta dal sito (${locale}) - ${form.company || form.name}`,
          confirm_email: form.confirm_email,
          utm_source: utm.source,
          utm_medium: utm.medium,
          utm_campaign: utm.campaign,
          autoReply: {
            subject: t('autoReplySubject'),
            text: t('autoReplyBody', { name: form.name }),
          },
        }),
      });

      if (!res.ok) throw new Error();

      if (typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { event_category: 'contact-page' });
      }
      setSubmitted(true);
    } catch {
      setError(t('error'));
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full rounded-lg bg-tech-bg border border-tech-border px-4 py-3 text-tech-text placeholder:text-tech-text-muted focus:outline-none focus:border-tech-accent transition-colors';
  const labelClass = 'block text-sm font-medium text-tech-text-dim mb-2';

  if (submitted) {
    return (
      <div className="tech-card-elevated p-10 text-center">
        <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-tech-accent/10 mb-5">
          <CheckCircle2 className="w-7 h-7 text-tech-accent" />
        </div>
        <h3 className="text-xl font-display font-bold text-tech-text mb-2">{t('successTitle')}</h3>
        <p className="text-tech-text-dim leading-relaxed">{t('successBody')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="tech-card-elevated p-6 md:p-8 space-y-5">
      <input
        type="text"
        name="confirm_email"
        value={form.confirm_email}
        onChange={(e) => update('confirm_email', e.target.value)}
        tabIndex={-1}
        autoComplete="off"
        aria-hidden="true"
        className="hidden"
      />

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-name" className={labelClass}>{t('name')} *</label>
          <input
            id="cf-name"
            type="text"
            required
            autoComplete="name"
            value={form.name}
            onChange={(e) => update('name', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cf-email" className={labelClass}>{t('email')} *</label>
          <input
            id="cf-email"
            type="email"
            required
            autoComplete="email"
            value={form.email}
            onChange={(e) => update('email', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-5">
        <div>
          <label htmlFor="cf-phone" className={labelClass}>{t('phone')}</label>
          <input
            id="cf-phone"
            type="tel"
            autoComplete="tel"
            value={form.phone}
            onChange={(e) => update('phone', e.target.value)}
            className={inputClass}
          />
        </div>
        <div>
          <label htmlFor="cf-company" className={labelClass}>{t('company')}</label>
          <input
            id="cf-company"
            type="text"
            autoComplete="organization"
            value={form.company}
            onChange={(e) => update('company', e.target.value)}
            className={inputClass}
          />
        </div>
      </div>

      <div>
        <label htmlFor="cf-message" className={labelClass}>{t('message')} *</label>
        <textarea
          id="cf-message"
          rows={5}
          required
          placeholder={t('messagePlaceholder')}
          value={form.message}
          onChange={(e) => update('message', e.target.value)}
          className={inputClass}
        />
      </div>

      <label className="flex items-start gap-3 text-xs text-tech-text-muted leading-relaxed">
        <input
          type="checkbox"
          required
          checked={form.privacyAccepted}
          onChange={(e) => update('privacyAccepted', e.target.checked)}
          className="mt-0.5 accent-tech-accent"
        />
        <span>
          {t('privacyPrefix')}
          <Link href={`/${locale}/privacy`} className="underline hover:text-tech-accent">
            {t('privacyLink')}
          </Link>
          . *
        </span>
      </label>

      {error && (
        <div className="rounded-lg border border-tech-danger/40 bg-tech-danger/10 px-4 py-3 text-sm text-tech-danger">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className="btn-primary w-full inline-flex items-center justify-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {loading ? t('sending') : t('submit')}
        {!loading && <ArrowRight className="w-4 h-4" />}
      </button>
    </form>
  );
}
