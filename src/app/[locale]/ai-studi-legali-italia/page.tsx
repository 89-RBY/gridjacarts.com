'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ShieldCheck,
  ArrowRight,
  Lock,
  Search,
  FilePenLine,
  FileSearch2,
  Archive,
  Building2,
  Languages,
  Server,
  ChevronDown,
  CheckCircle2,
  ClipboardList,
} from 'lucide-react';

const problems = [
  {
    icon: Server,
    title: 'Dati su server altrui',
    desc: "Atti e documenti elaborati fuori dallo studio, spesso fuori dall'UE.",
  },
  {
    icon: Lock,
    title: 'Segreto professionale',
    desc: "La riservatezza non si delega a condizioni d'uso che cambiano.",
  },
  {
    icon: Search,
    title: 'Risposte generiche',
    desc: 'Gli strumenti generalisti non conoscono a fondo il diritto italiano.',
  },
];

const steps = [
  {
    title: 'Installazione in studio',
    desc: 'Server dedicato nei vostri locali, di vostra proprietà.',
  },
  {
    title: 'Specializzazione sul diritto italiano',
    desc: 'Normativa, giurisprudenza, prassi e i vostri modelli di atti.',
  },
  {
    title: 'Uso quotidiano',
    desc: 'Dal browser, solo all’interno della rete dello studio.',
  },
];

const features = [
  { icon: Search, title: 'Ricerca giurisprudenziale', desc: 'Individua precedenti e orientamenti pertinenti al caso.' },
  { icon: FilePenLine, title: 'Prime bozze di atti', desc: 'A partire dai modelli dello studio.' },
  { icon: FileSearch2, title: 'Analisi di fascicoli', desc: 'Sintesi, cronologie, punti critici.' },
  { icon: Archive, title: 'Archivio interrogabile', desc: 'Domande in linguaggio naturale su pareri e atti passati.' },
];

const whyUs = [
  { icon: Building2, text: 'Gridjac Arts — software house attiva in Italia, Svizzera e Romania dal 2020' },
  { icon: Languages, text: 'Specializzazione sul diritto e sulla prassi italiana' },
];

const privacyPoints = [
  'Elaborazione solo sul server interno, nessun invio a fornitori AI esterni.',
  'Accessi per utente e registro delle attività gestiti dallo studio.',
  'Supporto alla documentazione privacy (registro dei trattamenti, informative).',
  "L'avvocato resta sempre responsabile di verifica e decisione finale.",
];

const faq: [string, string][] = [
  ['Serve un reparto IT interno?', 'No, installazione, aggiornamenti e assistenza sono a cura nostra.'],
  ['Quanto costa?', 'Dipende dal numero di utenti e dal volume di documenti; lo indichiamo nella scheda informativa.'],
  ['Funziona senza internet?', "L'elaborazione avviene in locale; la connessione serve solo per gli aggiornamenti concordati."],
  ["Sostituisce l'avvocato?", 'No, è uno strumento di supporto: ogni risultato va verificato dal professionista.'],
  ['Chi siete?', 'Gridjac Arts, software house attiva in Italia, Svizzera e Romania dal 2020.'],
];

const lawyerCounts = ['1', '2–5', '6–15', '16–30', 'Oltre 30'];

const initialForm = {
  name: '',
  studio: '',
  city: '',
  email: '',
  phone: '',
  lawyers: '',
  preference: '',
  message: '',
  privacyAccepted: false,
  confirm_email: '', // honeypot
};

export default function AiStudiLegaliItaliaPage({ params: { locale } }: { params: { locale: string } }) {
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [utmSource, setUtmSource] = useState('');
  const [utmCampaign, setUtmCampaign] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUtmSource(params.get('utm_source') || '');
    setUtmCampaign(params.get('utm_campaign') || '');
  }, []);

  const update = <K extends keyof typeof initialForm>(field: K, value: (typeof initialForm)[K]) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.privacyAccepted) {
      setError("Devi accettare l'informativa privacy per inviare la richiesta.");
      return;
    }
    setLoading(true);
    setError('');

    const details = [
      `Studio legale: ${form.studio || '-'}`,
      `Città: ${form.city || '-'}`,
      `Numero di avvocati: ${form.lawyers || '-'}`,
      `Preferenza: ${form.preference || '-'}`,
      utmSource || utmCampaign ? `Tracking: utm_source=${utmSource || '-'}, utm_campaign=${utmCampaign || '-'}` : '',
      '',
      form.message,
    ]
      .filter(Boolean)
      .join('\n');

    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          message: details,
          source: 'ai-studi-legali-italia',
          subject: `Richiesta informazioni AI studi legali - ${form.studio || form.name}`,
          confirm_email: form.confirm_email,
          autoReply: {
            subject: 'Gridjac Arts — Richiesta ricevuta',
            text: `Gentile ${form.name || 'avvocato/a'},\n\nabbiamo ricevuto la vostra richiesta di informazioni sull'assistente AI per studi legali. Vi ricontatteremo entro 2 giorni lavorativi all'indirizzo o al numero che ci avete lasciato.\n\nCordiali saluti,\nRobert Gridjac\nGridjac Arts\ninfo@gridjacarts.com · +39 320 377 9506`,
          },
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Non siamo riusciti a inviare la richiesta. Riprova tra poco.');
      }

      if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
        window.gtag('event', 'generate_lead', { event_category: 'ai-studi-legali-italia' });
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Non siamo riusciti a inviare la richiesta. Riprova tra poco.');
    } finally {
      setLoading(false);
    }
  };

  const inputClass =
    'w-full rounded-lg bg-tech-bg border border-tech-border px-4 py-3 text-tech-text placeholder:text-tech-text-muted focus:outline-none focus:border-tech-accent transition-colors';
  const labelClass = 'block text-sm font-medium text-tech-text-dim mb-2';

  return (
    <div>
      {/* Hero */}
      <section className="relative pt-20 pb-20 tech-grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-tech-radial pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="tech-badge-accent mb-6">
                <ShieldCheck className="w-3 h-3" />
                <span className="font-mono text-[11px]">ASSISTENTE AI PERSONALE &middot; INSTALLATO IN STUDIO</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-tech-text leading-[1.08] mb-6">
                L&apos;intelligenza artificiale che lavora nel vostro studio.{' '}
                <span className="tech-gradient-text">I fascicoli restano lì.</span>
              </h1>
              <p className="text-lg text-tech-text-dim leading-relaxed mb-8 max-w-xl">
                Un assistente AI su un server di vostra proprietà, specializzato sul diritto
                italiano. Nessun dato dei clienti passa da cloud esterni: in linea con il GDPR e
                con il segreto professionale.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#contatto" className="btn-primary inline-flex items-center gap-2">
                  Sono interessato
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#come" className="btn-secondary inline-flex items-center gap-2">
                  Scopri come funziona
                </a>
              </div>
            </div>

            {/* Chat mockup visual */}
            <div className="tech-card-elevated tech-border-gradient p-8">
              <div className="terminal">
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-dot bg-[#ff5f57]" />
                    <div className="terminal-dot bg-[#febc2e]" />
                    <div className="terminal-dot bg-[#28c840]" />
                  </div>
                  <div className="flex-1 text-center text-xs text-tech-text-muted font-mono">
                    assistente di studio
                  </div>
                </div>
                <div className="terminal-body space-y-3 text-sm">
                  <div className="pt-1 text-tech-text">
                    <span className="text-tech-accent font-mono">&gt;</span> Riassumi il fascicolo
                    e individua la giurisprudenza di legittimità più recente sul punto.
                  </div>
                  <div className="text-tech-text-dim pl-3 border-l-2 border-tech-accent/40 leading-relaxed">
                    Sintesi del fascicolo, questioni rilevanti e precedenti pertinenti, con i
                    riferimenti da verificare. Elaborato interamente sul server interno.
                  </div>
                  <div className="flex items-center gap-2 pt-3 border-t border-tech-border text-tech-accent text-xs font-mono">
                    <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                    Nessun dato inviato a servizi esterni
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="section-padding bg-tech-surface/30">
        <div className="container-custom">
          <h2 className="text-2xl md:text-3xl font-display font-bold text-tech-text max-w-3xl mb-12">
            Usare ChatGPT e simili con i documenti dei clienti è un rischio che uno studio non
            può correre.
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {problems.map((p) => (
              <div key={p.title} className="tech-card p-6">
                <div className="w-10 h-10 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-tech-accent" />
                </div>
                <h3 className="font-semibold text-tech-text mb-2">{p.title}</h3>
                <p className="text-sm text-tech-text-dim leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="come" className="section-padding">
        <div className="container-custom">
          <div className="tech-badge mb-4">
            <span className="font-mono">{'//'} COME FUNZIONA</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-bold text-tech-text mb-12">
            Tre passaggi, zero dati all&apos;esterno
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {steps.map((s, i) => (
              <div key={s.title} className="tech-card p-8">
                <div className="w-10 h-10 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center font-mono font-bold text-tech-accent mb-5">
                  {i + 1}
                </div>
                <h3 className="text-lg font-display font-semibold text-tech-text mb-2">
                  {s.title}
                </h3>
                <p className="text-tech-text-dim leading-relaxed text-sm">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="section-padding bg-tech-surface/30">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-tech-text mb-12">
            Cosa fa
          </h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="tech-card p-6">
                <div className="w-10 h-10 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-tech-accent" />
                </div>
                <h3 className="font-semibold text-tech-text mb-2 text-sm">{f.title}</h3>
                <p className="text-xs text-tech-text-dim leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid sm:grid-cols-2 gap-6 max-w-3xl">
            {whyUs.map((item) => (
              <div key={item.text} className="tech-card p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-tech-accent" />
                </div>
                <p className="text-tech-text-dim leading-relaxed pt-1.5 text-sm">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy / dark section */}
      <section id="privacy" className="section-padding bg-tech-surface/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="tech-badge-accent mb-6">
                <ShieldCheck className="w-3 h-3" />
                <span className="font-mono text-[11px]">RISERVATEZZA BY DESIGN</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold text-tech-text leading-tight">
                In linea con il GDPR perché i dati non escono dallo studio.
              </h2>
            </div>
            <ul className="space-y-4">
              {privacyPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-tech-text-dim">
                  <CheckCircle2 className="w-5 h-5 text-tech-accent flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section id="faq" className="section-padding">
        <div className="container-custom max-w-3xl">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-tech-text mb-8">
            Domande frequenti
          </h2>
          <div className="tech-card !p-0 divide-y divide-tech-border overflow-hidden">
            {faq.map(([q, a], i) => {
              const isOpen = openFaq === i;
              return (
                <div key={q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left"
                  >
                    <span className="font-medium text-tech-text">{q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-tech-accent flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="px-6 pb-5 text-sm text-tech-text-dim leading-relaxed">{a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contatto" className="section-padding bg-tech-surface/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-tech-text mb-4">
                Siete interessati a saperne di più?
              </h2>
              <p className="text-tech-text-dim leading-relaxed mb-8">
                Lasciateci un contatto: vi inviamo una breve scheda o fissiamo una demo nel
                vostro studio. Nessun impegno.
              </p>
              <div className="space-y-2 text-sm">
                <div className="text-tech-text font-semibold">Robert Gridjac</div>
                <div className="text-tech-text-dim">Gridjac Arts</div>
                <a href="mailto:info@gridjacarts.com" className="block text-tech-text-dim hover:text-tech-accent transition-colors">
                  info@gridjacarts.com
                </a>
                <a href="tel:+393203779506" className="block text-tech-text-dim hover:text-tech-accent transition-colors">
                  +39 320 377 9506
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              {submitted ? (
                <div className="tech-card-elevated p-10 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-tech-accent/10 mb-5">
                    <CheckCircle2 className="w-7 h-7 text-tech-accent" />
                  </div>
                  <h3 className="text-xl font-display font-bold text-tech-text mb-2">Grazie</h3>
                  <p className="text-tech-text-dim leading-relaxed">
                    Vi ricontatteremo entro 2 giorni lavorativi.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="tech-card-elevated p-6 md:p-8 space-y-5">
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
                  {/* hidden UTM fields */}
                  <input type="hidden" name="utm_source" value={utmSource} />
                  <input type="hidden" name="utm_campaign" value={utmCampaign} />

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="name" className={labelClass}>Nome e cognome *</label>
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
                      <label htmlFor="studio" className={labelClass}>Studio legale *</label>
                      <input
                        id="studio"
                        type="text"
                        required
                        value={form.studio}
                        onChange={(e) => update('studio', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="city" className={labelClass}>Città *</label>
                      <input
                        id="city"
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) => update('city', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className={labelClass}>Email *</label>
                      <input
                        id="email"
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="phone" className={labelClass}>Telefono (facoltativo)</label>
                      <input
                        id="phone"
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className={inputClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="lawyers" className={labelClass}>Numero di avvocati</label>
                      <select
                        id="lawyers"
                        value={form.lawyers}
                        onChange={(e) => update('lawyers', e.target.value)}
                        className={inputClass}
                      >
                        <option value="">Seleziona...</option>
                        {lawyerCounts.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </div>
                  </div>

                  <fieldset>
                    <legend className={labelClass}>Cosa preferite</legend>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <label className="flex items-center gap-2 text-sm text-tech-text">
                        <input
                          type="radio"
                          name="preference"
                          value="Ricevere la scheda informativa"
                          checked={form.preference === 'Ricevere la scheda informativa'}
                          onChange={(e) => update('preference', e.target.value)}
                          className="accent-tech-accent"
                        />
                        Ricevere la scheda informativa
                      </label>
                      <label className="flex items-center gap-2 text-sm text-tech-text">
                        <input
                          type="radio"
                          name="preference"
                          value="Una demo in studio"
                          checked={form.preference === 'Una demo in studio'}
                          onChange={(e) => update('preference', e.target.value)}
                          className="accent-tech-accent"
                        />
                        Una demo in studio
                      </label>
                    </div>
                  </fieldset>

                  <div>
                    <label htmlFor="message" className={labelClass}>Messaggio (facoltativo)</label>
                    <textarea
                      id="message"
                      rows={3}
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
                      Ho letto e accetto l&apos;
                      <Link href={`/${locale}/privacy`} className="underline hover:text-tech-accent">
                        informativa sulla privacy
                      </Link>{' '}
                      (obbligatorio). *
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
                    {loading ? 'Invio in corso...' : 'Richiedi informazioni'}
                    {!loading && <ArrowRight className="w-4 h-4" />}
                  </button>

                  <p className="flex items-center gap-2 text-xs text-tech-text-muted">
                    <ClipboardList className="w-3.5 h-3.5 flex-shrink-0" />
                    Nessun impegno: vi ricontatteremo entro 2 giorni lavorativi.
                  </p>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
