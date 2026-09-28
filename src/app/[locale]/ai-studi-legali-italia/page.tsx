'use client';

import { useEffect, useState } from 'react';
import { Fraunces, IBM_Plex_Sans } from 'next/font/google';
import Link from 'next/link';
import {
  Lock,
  Phone,
  Mail,
  CheckCircle2,
  ChevronDown,
  ClipboardList,
} from 'lucide-react';

const fraunces = Fraunces({ subsets: ['latin'], weight: ['400', '600'], variable: '--font-serif' });
const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans' });

// Design tokens — matched to the approved design canvas
const BRASS = '#8A6420';
const BRASS_LIGHT = '#D9B56E';
const NAVY = '#17202E';
const NAVY_LIGHT = '#223047'; // AI reply bubble on dark hero panel
const NAVY_BORDER = '#334055'; // dividers on dark sections
const IVORY = '#F6F3EC';
const IVORY_DARK = '#EDE7DB'; // "problem" section background
const BODY_TEXT = '#3A4452';
const MUTED_TEXT = '#5B6472';
const META_TEXT = '#A9B1BD'; // small-caps labels on dark hero panel
const LIGHT_ON_DARK = '#DCE2EA';
const BORDER = '#DDD6C8';
const INPUT_BORDER = '#B9B1A2';

const problems = [
  {
    title: 'Dati su server altrui',
    desc: "Con i servizi in cloud atti e documenti vengono elaborati fuori dallo studio, spesso fuori dall'UE.",
  },
  {
    title: 'Segreto professionale',
    desc: "La riservatezza verso il cliente non si delega a condizioni d'uso che cambiano nel tempo.",
  },
  {
    title: 'Risposte generiche',
    desc: 'Gli strumenti generalisti non conoscono a fondo il diritto e la prassi italiana.',
  },
];

const steps = [
  {
    n: '01',
    title: 'Installazione in studio',
    desc: 'Configuriamo un server dedicato nei vostri locali, di vostra proprietà.',
  },
  {
    n: '02',
    title: 'Specializzazione sul diritto italiano',
    desc: "L'assistente lavora su normativa, giurisprudenza e prassi italiana, e sui vostri modelli di atti.",
  },
  {
    n: '03',
    title: 'Uso quotidiano',
    desc: 'Avvocati e collaboratori lo usano dal browser, all’interno della rete dello studio.',
  },
];

const features = [
  { title: 'Ricerca giurisprudenziale', desc: 'Individua precedenti e orientamenti pertinenti al caso.' },
  { title: 'Prime bozze di atti', desc: 'Diffide, ricorsi, contratti partendo dai modelli dello studio.' },
  { title: 'Analisi di fascicoli', desc: 'Sintesi, cronologie e punti critici da documenti lunghi.' },
  { title: 'Archivio interrogabile', desc: 'Domande in linguaggio naturale sui vostri pareri e atti passati.' },
];

const privacyPoints = [
  'Elaborazione esclusivamente sul server interno, senza invio a fornitori AI esterni.',
  'Accessi per utente e registro delle attività gestiti dallo studio.',
  'Supporto alla documentazione privacy (registro dei trattamenti, informative).',
  "L'avvocato resta sempre il responsabile di verifica e decisione finale.",
];

const faq: [string, string][] = [
  ['Serve un reparto IT interno?', 'No. Installazione, aggiornamenti e assistenza sono a cura nostra.'],
  ['Quanto costa?', 'Dipende dal numero di utenti e dal volume di documenti; lo indichiamo nella scheda informativa.'],
  ['Funziona senza internet?', "L'elaborazione avviene in locale; la connessione serve solo per gli aggiornamenti concordati."],
  ["Sostituisce l'avvocato?", 'No: è uno strumento di supporto. Ogni output va verificato dal professionista.'],
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
    'h-12 rounded-md border px-3.5 text-[16px] font-sans text-[#17202E] placeholder:text-[#8A6420]/0 focus:outline-none focus:border-[#8A6420]';
  const inputStyle = { borderColor: INPUT_BORDER, fontFamily: 'inherit' };
  const labelClass = 'flex flex-col gap-1.5 text-sm font-medium text-[#17202E]';
  const serif = fraunces.className;
  const sans = plexSans.className;
  const eyebrowClass = 'text-[14px] tracking-[0.12em] uppercase font-semibold';

  return (
    <div className={sans} style={{ color: NAVY }}>
      {/* Hero */}
      <section className="pt-16 pb-16 md:pt-20 md:pb-24">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="flex flex-col gap-7">
              <div className={eyebrowClass} style={{ color: BRASS }}>
                Assistente AI personale &middot; installato in studio
              </div>
              <h1 className={`${serif} font-normal text-4xl md:text-5xl lg:text-[56px] leading-[1.1]`}>
                L&apos;intelligenza artificiale che lavora nel vostro studio. I fascicoli restano
                lì.
              </h1>
              <p className="text-lg md:text-xl leading-relaxed max-w-xl" style={{ color: BODY_TEXT }}>
                Un assistente AI su un server di vostra proprietà, specializzato sul diritto
                italiano. Nessun dato dei clienti passa da cloud esterni: in linea con il GDPR e
                con il segreto professionale.
              </p>
              <div className="flex flex-wrap gap-5 items-center pt-1">
                <a
                  href="#contatto"
                  className="inline-flex items-center rounded-md px-7 py-4 text-white font-medium text-[17px] hover:opacity-90 transition-opacity"
                  style={{ background: NAVY }}
                >
                  Sono interessato
                </a>
                <a href="#come" className="text-[17px] font-medium hover:opacity-70 transition-opacity">
                  Scopri come funziona
                </a>
              </div>
            </div>

            {/* Chat mockup visual — dark panel, matches design canvas */}
            <div className="rounded-2xl p-9 flex flex-col gap-5 text-[#F6F3EC]" style={{ background: NAVY }}>
              <div
                className="flex items-center justify-between text-xs uppercase tracking-wider"
                style={{ color: META_TEXT }}
              >
                <span>Server dello studio</span>
                <span>Offline dalla rete esterna</span>
              </div>
              <div className="rounded-lg border p-5 text-[16px] leading-relaxed" style={{ borderColor: NAVY_BORDER }}>
                &laquo;Riassumi il fascicolo e individua la giurisprudenza di legittimità più
                recente sul punto.&raquo;
              </div>
              <div
                className="rounded-lg p-5 text-[16px] leading-relaxed"
                style={{ background: NAVY_LIGHT, color: LIGHT_ON_DARK }}
              >
                Sintesi del fascicolo, questioni rilevanti e precedenti pertinenti, con i
                riferimenti da verificare. Elaborato interamente sul server interno.
              </div>
              <div className="flex items-center gap-2.5 text-sm" style={{ color: BRASS_LIGHT }}>
                <Lock className="w-[18px] h-[18px] flex-shrink-0" strokeWidth={1.8} />
                Nessun dato inviato a servizi esterni
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-20" style={{ background: IVORY_DARK }}>
        <div className="container-custom flex flex-col gap-12">
          <h2 className={`${serif} font-normal text-3xl md:text-[42px] leading-tight max-w-3xl`}>
            Usare ChatGPT &amp; simili con i documenti dei clienti è un rischio che uno studio
            non può correre.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((p) => (
              <div key={p.title} className="flex flex-col gap-3">
                <div className={`${serif} text-[22px] font-semibold`}>{p.title}</div>
                <p className="text-[17px] leading-relaxed" style={{ color: BODY_TEXT }}>{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="come" className="py-24">
        <div className="container-custom flex flex-col gap-14">
          <div className="flex flex-col gap-3.5">
            <div className={eyebrowClass} style={{ color: BRASS }}>Come funziona</div>
            <h2 className={`${serif} font-normal text-3xl md:text-[48px]`}>
              Tre passaggi, zero dati all&apos;esterno
            </h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.n} className="flex flex-col gap-3 pt-6" style={{ borderTop: `2px solid ${NAVY}` }}>
                <div className={`${serif} text-4xl`} style={{ color: BRASS }}>{s.n}</div>
                <div className="text-[21px] font-semibold">{s.title}</div>
                <p className="text-[17px] leading-relaxed" style={{ color: BODY_TEXT }}>{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features — flows directly after "come funziona", no heading (matches canvas) */}
      <section className="pb-24">
        <div className="container-custom grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((f) => (
            <div
              key={f.title}
              className="rounded-xl bg-white p-7 flex flex-col gap-2.5"
              style={{ border: `1px solid ${BORDER}` }}
            >
              <div className="text-[19px] font-semibold">{f.title}</div>
              <p className="text-[16px] leading-relaxed" style={{ color: BODY_TEXT }}>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Privacy / dark section */}
      <section id="privacy" className="py-24" style={{ background: NAVY, color: IVORY }}>
        <div className="container-custom grid lg:grid-cols-2 gap-20">
          <div className="flex flex-col gap-5">
            <div className={eyebrowClass} style={{ color: BRASS_LIGHT }}>Riservatezza by design</div>
            <h2 className={`${serif} font-normal text-3xl md:text-[46px] leading-tight`}>
              In linea con il GDPR perché i dati non escono dallo studio.
            </h2>
          </div>
          <ul className="flex flex-col gap-5 text-lg leading-relaxed list-none p-0 m-0" style={{ color: LIGHT_ON_DARK }}>
            {privacyPoints.map((point, i) => (
              <li
                key={point}
                className="pb-5"
                style={i < privacyPoints.length - 1 ? { borderBottom: `1px solid ${NAVY_BORDER}` } : undefined}
              >
                {point}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* FAQ accordion */}
      <section id="faq" className="py-24">
        <div className="container-custom max-w-3xl flex flex-col gap-8">
          <h2 className={`${serif} font-normal text-3xl md:text-[46px]`}>Domande frequenti</h2>
          <div style={{ borderTop: `1px solid ${BORDER}`, borderBottom: `1px solid ${BORDER}` }}>
            {faq.map(([q, a], i) => {
              const isOpen = openFaq === i;
              return (
                <div key={q} style={i > 0 ? { borderTop: `1px solid ${BORDER}` } : undefined}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="text-[19px] font-semibold">{q}</span>
                    <ChevronDown
                      className={`w-4 h-4 flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                      style={{ color: BRASS }}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-[17px] leading-relaxed max-w-2xl" style={{ color: BODY_TEXT }}>{a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contatto" className="pb-24">
        <div className="container-custom">
          <div
            className="rounded-2xl bg-white p-8 md:p-16 grid lg:grid-cols-2 gap-16"
            style={{ border: `1px solid ${BORDER}` }}
          >
            <div className="flex flex-col gap-4.5">
              <h2 className={`${serif} font-normal text-3xl md:text-[42px] leading-tight`}>
                Siete interessati a saperne di più?
              </h2>
              <p className="text-lg leading-relaxed" style={{ color: BODY_TEXT }}>
                Lasciateci un contatto: vi inviamo una breve scheda o fissiamo una demo nel
                vostro studio. Nessun impegno.
              </p>
              <div className="text-[17px] leading-loose pt-2">
                Robert Gridjac &middot; Gridjac Arts
                <br />
                <a href="mailto:info@gridjacarts.com" className="inline-flex items-center gap-2 hover:opacity-70">
                  <Mail className="w-4 h-4" />
                  info@gridjacarts.com
                </a>
                <br />
                <a href="tel:+393203779506" className="inline-flex items-center gap-2 hover:opacity-70">
                  <Phone className="w-4 h-4" />
                  +39 320 377 9506
                </a>
              </div>
            </div>

            <div>
              {submitted ? (
                <div className="text-center py-10">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full mb-5" style={{ background: `${BRASS}1A` }}>
                    <CheckCircle2 className="w-7 h-7" style={{ color: BRASS }} />
                  </div>
                  <h3 className={`${serif} text-xl font-semibold mb-2`}>Grazie</h3>
                  <p style={{ color: BODY_TEXT }}>Vi ricontatteremo entro 2 giorni lavorativi.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
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

                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className={labelClass}>
                      Nome e cognome
                      <input
                        type="text"
                        required
                        value={form.name}
                        onChange={(e) => update('name', e.target.value)}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </label>
                    <label className={labelClass}>
                      Studio legale
                      <input
                        type="text"
                        required
                        value={form.studio}
                        onChange={(e) => update('studio', e.target.value)}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className={labelClass}>
                      Città
                      <input
                        type="text"
                        required
                        value={form.city}
                        onChange={(e) => update('city', e.target.value)}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </label>
                    <label className={labelClass}>
                      Email
                      <input
                        type="email"
                        required
                        value={form.email}
                        onChange={(e) => update('email', e.target.value)}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </label>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <label className={labelClass}>
                      Telefono (facoltativo)
                      <input
                        type="tel"
                        value={form.phone}
                        onChange={(e) => update('phone', e.target.value)}
                        className={inputClass}
                        style={inputStyle}
                      />
                    </label>
                    <label className={labelClass}>
                      Numero di avvocati
                      <select
                        value={form.lawyers}
                        onChange={(e) => update('lawyers', e.target.value)}
                        className={inputClass}
                        style={inputStyle}
                      >
                        <option value="">Seleziona...</option>
                        {lawyerCounts.map((c) => (
                          <option key={c} value={c}>{c}</option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <fieldset className="flex flex-col gap-2">
                    <legend className="text-sm font-medium mb-1">Cosa preferite</legend>
                    <div className="flex flex-col sm:flex-row gap-4">
                      <label className="flex items-center gap-2 text-[15px]">
                        <input
                          type="radio"
                          name="preference"
                          value="Ricevere la scheda informativa"
                          checked={form.preference === 'Ricevere la scheda informativa'}
                          onChange={(e) => update('preference', e.target.value)}
                          style={{ accentColor: BRASS }}
                        />
                        Ricevere la scheda informativa
                      </label>
                      <label className="flex items-center gap-2 text-[15px]">
                        <input
                          type="radio"
                          name="preference"
                          value="Una demo in studio"
                          checked={form.preference === 'Una demo in studio'}
                          onChange={(e) => update('preference', e.target.value)}
                          style={{ accentColor: BRASS }}
                        />
                        Una demo in studio
                      </label>
                    </div>
                  </fieldset>

                  <label className={labelClass}>
                    Messaggio (facoltativo)
                    <textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => update('message', e.target.value)}
                      className="rounded-md border px-3.5 py-3 text-[16px] font-sans focus:outline-none focus:border-[#8A6420]"
                      style={inputStyle}
                    />
                  </label>

                  <label className="flex items-start gap-2.5 text-sm leading-relaxed" style={{ color: BODY_TEXT }}>
                    <input
                      type="checkbox"
                      required
                      checked={form.privacyAccepted}
                      onChange={(e) => update('privacyAccepted', e.target.checked)}
                      className="mt-0.5 w-[18px] h-[18px] flex-shrink-0"
                      style={{ accentColor: BRASS }}
                    />
                    <span>
                      Acconsento al trattamento dei dati per essere ricontattato, secondo l&apos;
                      <Link href={`/${locale}/privacy`} className="underline hover:opacity-70">
                        informativa privacy
                      </Link>
                      . (obbligatorio)
                    </span>
                  </label>

                  {error && (
                    <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-sm text-red-700">
                      {error}
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={loading}
                    className="h-[54px] rounded-md text-white font-medium text-[17px] hover:opacity-90 transition-opacity disabled:opacity-60 disabled:cursor-not-allowed"
                    style={{ background: NAVY }}
                  >
                    {loading ? 'Invio in corso...' : 'Richiedi informazioni'}
                  </button>

                  <p className="flex items-center gap-2 text-xs" style={{ color: MUTED_TEXT }}>
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
