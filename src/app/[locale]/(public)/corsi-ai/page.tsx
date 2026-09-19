'use client';

import { useState } from 'react';
import {
  Sparkles,
  CheckCircle,
  ArrowRight,
  Clock,
  MapPin,
  Users,
  Wrench,
  HeartHandshake,
  ShieldCheck,
} from 'lucide-react';
import { copy } from './copy';

interface CorsiAiPageProps {
  params: { locale: string };
}

const initialForm = {
  name: '',
  email: '',
  phone: '',
  profile: '',
  availability: '',
  volunteer: '',
  format: '',
  message: '',
  confirm_email: '', // honeypot
};

export default function CorsiAiPage({ params: { locale } }: CorsiAiPageProps) {
  const t = copy[locale as keyof typeof copy] || copy.it;

  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');

  const update = (field: keyof typeof initialForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const details = [
      `${t.fields.profile}: ${form.profile || '-'}`,
      `${t.fields.availability}: ${form.availability || '-'}`,
      `${t.fields.volunteer}: ${form.volunteer || '-'}`,
      `${t.fields.format}: ${form.format || '-'}`,
      '',
      form.message,
    ].join('\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: details,
          source: 'corsi-ai-roma',
          subject: `Corsi AI Roma - ${form.name}${form.volunteer ? ` (volontario: ${form.volunteer})` : ''}`,
          confirm_email: form.confirm_email,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || t.errorGeneric);
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : t.errorGeneric);
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full rounded-lg bg-tech-bg border border-tech-border px-4 py-3 text-tech-text placeholder:text-tech-text-muted focus:outline-none focus:border-tech-accent transition-colors';
  const labelClass = 'block text-sm font-medium text-tech-text-dim mb-2';

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-20 tech-grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-tech-radial pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="tech-badge-accent mb-6">
                <Sparkles className="w-3 h-3" />
                <span className="font-mono text-[11px]">{t.badge}</span>
              </div>

              <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-tech-text leading-[1.08]">
                {t.title}
              </h1>
              <p className="text-xl md:text-2xl tech-gradient-text font-display font-semibold mb-6">
                {t.titleAccent}
              </p>
              <p className="text-lg text-tech-text-dim leading-relaxed mb-8 max-w-xl">
                {t.subtitle}
              </p>

              <div className="flex flex-wrap gap-4">
                <a href="#iscrizione" className="btn-primary inline-flex items-center gap-2">
                  {t.ctaPrimary}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#programma" className="btn-secondary inline-flex items-center gap-2">
                  {t.ctaSecondary}
                </a>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 mt-12">
                {t.stats.map((s) => (
                  <div key={s.label}>
                    <div className="text-3xl font-display font-bold text-tech-accent">{s.value}</div>
                    <div className="text-xs text-tech-text-muted mt-1 leading-snug">{s.label}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pain points card */}
            <div className="tech-card-elevated p-8">
              <h2 className="text-xl font-display font-semibold text-tech-text mb-6">
                {t.painTitle}
              </h2>
              <ul className="space-y-4">
                {t.pains.map((p) => (
                  <li key={p} className="flex items-start gap-3 text-tech-text-dim leading-relaxed">
                    <CheckCircle className="w-5 h-5 text-tech-accent mt-0.5 flex-shrink-0" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Levels */}
      <section id="programma" className="section-padding bg-tech-surface/30">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-tech-text mb-3">
            {t.programTitle}
          </h2>
          <p className="text-tech-text-dim mb-12">{t.programSubtitle}</p>

          <div className="grid md:grid-cols-3 gap-6">
            {t.levels.map((level, i) => (
              <div key={level.title} className="tech-card p-8 flex flex-col">
                <div className="tech-badge mb-5">
                  <span className="font-mono text-[10px]">{level.tag}</span>
                </div>
                <div className="mb-4 text-tech-accent">
                  {i === 0 ? <Clock className="w-6 h-6" /> : i === 1 ? <Wrench className="w-6 h-6" /> : <HeartHandshake className="w-6 h-6" />}
                </div>
                <h3 className="text-xl font-display font-semibold text-tech-text mb-2">
                  {level.title}
                </h3>
                <p className="text-xs font-mono text-tech-text-muted mb-4">{level.meta}</p>
                <p className="text-tech-text-dim leading-relaxed">{level.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-tech-text mb-12">
            {t.modulesTitle}
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {t.modules.map(([title, desc], i) => (
              <div key={title} className="tech-card p-6">
                <div className="font-mono text-xs text-tech-accent mb-3">
                  {String(i + 1).padStart(2, '0')}
                </div>
                <h3 className="font-display font-semibold text-tech-text mb-2">{title}</h3>
                <p className="text-sm text-tech-text-dim leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Volunteers */}
      <section className="section-padding bg-tech-surface/30">
        <div className="container-custom">
          <div className="tech-border-gradient rounded-2xl">
            <div className="grid lg:grid-cols-2 gap-10 p-8 md:p-12">
              <div>
                <div className="tech-badge-accent mb-6">
                  <Users className="w-3 h-3" />
                  <span className="font-mono text-[11px]">BUILDER LAB</span>
                </div>
                <h2 className="text-3xl font-display font-bold text-tech-text mb-5">
                  {t.volunteerTitle}
                </h2>
                <p className="text-tech-text-dim leading-relaxed">{t.volunteerBody}</p>
              </div>
              <div className="flex flex-col justify-center">
                <ul className="space-y-4">
                  {t.volunteerPoints.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-tech-text">
                      <ShieldCheck className="w-5 h-5 text-tech-accent mt-0.5 flex-shrink-0" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
                <a href="#iscrizione" className="btn-primary inline-flex items-center gap-2 mt-8 self-start">
                  {t.ctaPrimary}
                  <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Form */}
      <section id="iscrizione" className="section-padding">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            {submitted ? (
              <div className="tech-card-elevated p-12 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-tech-accent/10 mb-6">
                  <CheckCircle className="w-8 h-8 text-tech-accent" />
                </div>
                <h2 className="text-2xl font-display font-bold text-tech-text mb-4">
                  {t.successTitle}
                </h2>
                <p className="text-tech-text-dim leading-relaxed">{t.successBody}</p>
              </div>
            ) : (
              <div className="tech-card-elevated p-8 md:p-10">
                <div className="flex items-center gap-2 text-tech-accent mb-4">
                  <MapPin className="w-4 h-4" />
                  <span className="font-mono text-xs">ROMA</span>
                </div>
                <h2 className="text-3xl font-display font-bold text-tech-text mb-3">
                  {t.formTitle}
                </h2>
                <p className="text-tech-text-dim mb-8">{t.formSubtitle}</p>

                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* honeypot */}
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
                      <label htmlFor="name" className={labelClass}>
                        {t.fields.name} *
                      </label>
                      <input
                        id="name"
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="phone" className={labelClass}>
                        {t.fields.phone} *
                      </label>
                      <input
                        id="phone"
                        type="tel"
                        required
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className={labelClass}>
                      {t.fields.email} *
                    </label>
                    <input
                      id="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={(e) => update('email', e.target.value)}
                      className={inputClass}
                    />
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="profile" className={labelClass}>
                        {t.fields.profile}
                      </label>
                      <select
                        id="profile"
                        value={form.profile}
                        onChange={(e) => update('profile', e.target.value)}
                        className={inputClass}
                      >
                        <option value="">{t.fields.select}</option>
                        {t.profiles.map((p) => (
                          <option key={p} value={p}>
                            {p}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="availability" className={labelClass}>
                        {t.fields.availability}
                      </label>
                      <select
                        id="availability"
                        value={form.availability}
                        onChange={(e) => update('availability', e.target.value)}
                        className={inputClass}
                      >
                        <option value="">{t.fields.select}</option>
                        {t.availabilities.map((a) => (
                          <option key={a} value={a}>
                            {a}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="volunteer" className={labelClass}>
                        {t.fields.volunteer}
                      </label>
                      <select
                        id="volunteer"
                        value={form.volunteer}
                        onChange={(e) => update('volunteer', e.target.value)}
                        className={inputClass}
                      >
                        <option value="">{t.fields.select}</option>
                        {t.volunteers.map((v) => (
                          <option key={v} value={v}>
                            {v}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label htmlFor="format" className={labelClass}>
                        {t.fields.format}
                      </label>
                      <select
                        id="format"
                        value={form.format}
                        onChange={(e) => update('format', e.target.value)}
                        className={inputClass}
                      >
                        <option value="">{t.fields.select}</option>
                        {t.formats.map((f) => (
                          <option key={f} value={f}>
                            {f}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className={labelClass}>
                      {t.fields.message}
                    </label>
                    <textarea
                      id="message"
                      rows={4}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      className={inputClass}
                    />
                  </div>

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
                    {loading ? t.fields.sending : t.fields.submit}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>

                  <p className="text-xs text-tech-text-muted leading-relaxed">{t.privacy}</p>
                </form>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding bg-tech-surface/30">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-tech-text mb-12">
            {t.faqTitle}
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            {t.faq.map(([q, a]) => (
              <div key={q} className="tech-card p-6">
                <h3 className="font-display font-semibold text-tech-text mb-2">{q}</h3>
                <p className="text-tech-text-dim leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
