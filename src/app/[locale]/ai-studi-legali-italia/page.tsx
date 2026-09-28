'use client';

import { useEffect, useState } from 'react';
import { Fraunces, IBM_Plex_Sans } from 'next/font/google';
import Link from 'next/link';
import {
  Lock,
  ShieldCheck,
  Building2,
  ScrollText,
  Search,
  FilePenLine,
  FileSearch2,
  Archive,
  UserCheck,
  ClipboardList,
  ChevronDown,
  Phone,
  Mail,
  CheckCircle2,
} from 'lucide-react';

const fraunces = Fraunces({ subsets: ['latin'], weight: ['500', '600', '700'], variable: '--font-serif' });
const plexSans = IBM_Plex_Sans({ subsets: ['latin'], weight: ['400', '500', '600'], variable: '--font-sans' });

const NAVY = '#17202E';
const BRASS = '#8A6420';
const IVORY = '#F6F3EC';

const problems = [
  {
    icon: ScrollText,
    title: 'Dati su server altrui',
    desc: 'Atti e documenti elaborati fuori dallo studio, spesso fuori dalla UE.',
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
    n: '01',
    title: 'Installazione in studio',
    desc: 'Server dedicato nei vostri locali, di vostra proprietà.',
  },
  {
    n: '02',
    title: 'Specializzazione sul diritto italiano',
    desc: 'Normativa, giurisprudenza, prassi e i vostri modelli di atti.',
  },
  {
    n: '03',
    title: 'Uso quotidiano',
    desc: 'Dal browser, solo all’interno della rete dello studio.',
  },
];

const features = [
  { icon: Search, title: 'Ricerca giurisprudenziale' },
  { icon: FilePenLine, title: 'Prime bozze di atti', desc: 'A partire dai modelli dello studio.' },
  { icon: FileSearch2, title: 'Analisi di fascicoli', desc: 'Sintesi, cronologie, punti critici.' },
  { icon: Archive, title: 'Archivio interrogabile', desc: 'Domande in linguaggio naturale su pareri e atti passati.' },
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
    'w-full rounded-md bg-white border border-[#17202E]/15 px-4 py-3 text-[#17202E] placeholder:text-[#17202E]/35 focus:outline-none focus:border-[#8A6420] focus:ring-1 focus:ring-[#8A6420] transition-colors';
  const labelClass = 'block text-sm font-medium text-[#17202E]/80 mb-2';
  const serif = fraunces.className;
  const sans = plexSans.className;

  return (
    <div className={sans}>
      {/* Hero */}
      <section className="pt-16 pb-20">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8A6420]/30 bg-[#8A6420]/10 px-4 py-1.5 mb-6">
                <span className="text-xs font-medium tracking-wide text-[#8A6420] uppercase">
                  Assistente AI personale &middot; installato in studio
                </span>
              </div>
              <h1 className={`${serif} text-4xl md:text-5xl font-semibold text-[#17202E] leading-[1.15] mb-6`}>
                L&apos;intelligenza artificiale che lavora nel vostro studio. I fascicoli restano lì.
              </h1>
              <p className="text-lg text-[#17202E]/70 leading-relaxed mb-8 max-w-xl">
                Un assistente AI su un server di vostra proprietà, specializzato sul diritto
                italiano. Nessun dato dei clienti passa da cloud esterni: in linea con il GDPR e
                con il segreto professionale.
              </p>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#contatto"
                  className="inline-flex items-center rounded-md bg-[#17202E] px-6 py-3 text-white font-medium hover:bg-[#8A6420] transition-colors"
                >
                  Sono interessato
                </a>
                <a
                  href="#come"
                  className="inline-flex items-center rounded-md border border-[#17202E]/20 px-6 py-3 text-[#17202E] font-medium hover:border-[#8A6420] hover:text-[#8A6420] transition-colors"
                >
                  Scopri come funziona
                </a>
              </div>
            </div>

            {/* Chat mockup visual */}
            <div className="rounded-xl border border-[#17202E]/10 bg-white shadow-sm overflow-hidden">
              <div className="flex items-center gap-2 px-5 py-3 border-b border-[#17202E]/10 bg-[#F6F3EC]">
                <div className={`${serif} text-sm font-semibold text-[#17202E]`}>Assistente di studio</div>
              </div>
              <div className="p-5 space-y-4">
                <div className="flex justify-end">
                  <div className="max-w-[85%] rounded-lg rounded-tr-none bg-[#17202E] text-[#F6F3EC] px-4 py-3 text-sm leading-relaxed">
                    Riassumi il fascicolo e individua la giurisprudenza di legittimità più
                    recente sul punto.
                  </div>
                </div>
                <div className="flex justify-start">
                  <div className="max-w-[90%] rounded-lg rounded-tl-none bg-[#F6F3EC] border border-[#17202E]/10 text-[#17202E] px-4 py-3 text-sm leading-relaxed">
                    Ecco la sintesi del fascicolo con le tre pronunce di legittimità più
                    recenti sul punto, con riferimento a sezione e numero.
                  </div>
                </div>
                <div className="flex items-center gap-2 rounded-md bg-[#8A6420]/10 border border-[#8A6420]/25 px-3 py-2 text-xs text-[#8A6420] font-medium">
                  <Lock className="w-3.5 h-3.5 flex-shrink-0" />
                  Nessun dato inviato a servizi esterni
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Problem */}
      <section className="py-16 border-t border-[#17202E]/10">
        <div className="container-custom">
          <h2 className={`${serif} text-2xl md:text-3xl font-semibold text-[#17202E] max-w-3xl mb-12`}>
            Usare ChatGPT e simili con i documenti dei clienti è un rischio che uno studio non
            può correre.
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {problems.map((p) => (
              <div key={p.title}>
                <div className="w-10 h-10 rounded-full bg-[#17202E]/5 flex items-center justify-center mb-4">
                  <p.icon className="w-5 h-5 text-[#8A6420]" />
                </div>
                <h3 className="font-semibold text-[#17202E] mb-2">{p.title}</h3>
                <p className="text-sm text-[#17202E]/65 leading-relaxed">{p.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="come" className="py-16 border-t border-[#17202E]/10 bg-white">
        <div className="container-custom">
          <h2 className={`${serif} text-3xl font-semibold text-[#17202E] mb-12`}>Come funziona</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {steps.map((s) => (
              <div key={s.n}>
                <div className={`${serif} text-3xl text-[#8A6420] mb-3`}>{s.n}</div>
                <h3 className="font-semibold text-[#17202E] mb-2">{s.title}</h3>
                <p className="text-sm text-[#17202E]/65 leading-relaxed">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What it does */}
      <section className="py-16 border-t border-[#17202E]/10">
        <div className="container-custom">
          <h2 className={`${serif} text-3xl font-semibold text-[#17202E] mb-12`}>Cosa fa</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((f) => (
              <div key={f.title} className="rounded-lg border border-[#17202E]/10 bg-white p-6">
                <div className="w-10 h-10 rounded-full bg-[#8A6420]/10 flex items-center justify-center mb-4">
                  <f.icon className="w-5 h-5 text-[#8A6420]" />
                </div>
                <h3 className="font-semibold text-[#17202E] mb-2 text-sm">{f.title}</h3>
                {f.desc && <p className="text-xs text-[#17202E]/60 leading-relaxed">{f.desc}</p>}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Privacy / dark section */}
      <section id="privacy" className="py-20 bg-[#17202E]">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <div className="inline-flex items-center gap-2 rounded-full border border-[#8A6420]/40 bg-[#8A6420]/10 px-4 py-1.5 mb-6">
                <ShieldCheck className="w-3.5 h-3.5 text-[#c9a35f]" />
                <span className="text-xs font-medium tracking-wide text-[#c9a35f] uppercase">Riservatezza</span>
              </div>
              <h2 className={`${serif} text-3xl md:text-4xl font-semibold text-[#F6F3EC] leading-tight`}>
                In linea con il GDPR perché i dati non escono dallo studio.
              </h2>
            </div>
            <ul className="space-y-5">
              {privacyPoints.map((point) => (
                <li key={point} className="flex items-start gap-3 text-[#F6F3EC]/85">
                  <UserCheck className="w-5 h-5 text-[#c9a35f] flex-shrink-0 mt-0.5" />
                  <span className="leading-relaxed">{point}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* FAQ accordion */}
      <section id="faq" className="py-16 border-t border-[#17202E]/10 bg-white">
        <div className="container-custom max-w-3xl">
          <h2 className={`${serif} text-3xl font-semibold text-[#17202E] mb-8`}>Domande frequenti</h2>
          <div className="divide-y divide-[#17202E]/10 border-t border-b border-[#17202E]/10">
            {faq.map(([q, a], i) => {
              const isOpen = openFaq === i;
              return (
                <div key={q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    aria-expanded={isOpen}
                    className="w-full flex items-center justify-between gap-4 py-5 text-left"
                  >
                    <span className="font-medium text-[#17202E]">{q}</span>
                    <ChevronDown
                      className={`w-4 h-4 text-[#8A6420] flex-shrink-0 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                  </button>
                  {isOpen && (
                    <p className="pb-5 text-sm text-[#17202E]/65 leading-relaxed max-w-2xl">{a}</p>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section id="contatto" className="py-20 border-t border-[#17202E]/10">
        <div className="container-custom">
          <div className="grid lg:grid-cols-5 gap-12">
            <div className="lg:col-span-2">
              <h2 className={`${serif} text-3xl font-semibold text-[#17202E] mb-4`}>
                Siete interessati a saperne di più?
              </h2>
              <p className="text-[#17202E]/70 leading-relaxed mb-8">
                Lasciateci un contatto: vi inviamo una breve scheda o fissiamo una demo nel
                vostro studio. Nessun impegno.
              </p>
              <div className="space-y-3 text-sm">
                <div className={`${serif} text-[#17202E] font-semibold`}>Robert Gridjac</div>
                <div className="text-[#17202E]/70">Gridjac Arts</div>
                <a
                  href="mailto:info@gridjacarts.com"
                  className="flex items-center gap-2 text-[#17202E]/80 hover:text-[#8A6420] transition-colors"
                >
                  <Mail className="w-4 h-4" />
                  info@gridjacarts.com
                </a>
                <a
                  href="tel:+393203779506"
                  className="flex items-center gap-2 text-[#17202E]/80 hover:text-[#8A6420] transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  +39 320 377 9506
                </a>
              </div>
            </div>

            <div className="lg:col-span-3">
              {submitted ? (
                <div className="rounded-lg border border-[#17202E]/10 bg-white p-10 text-center">
                  <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-[#8A6420]/10 mb-5">
                    <CheckCircle2 className="w-7 h-7 text-[#8A6420]" />
                  </div>
                  <h3 className={`${serif} text-xl font-semibold text-[#17202E] mb-2`}>Grazie</h3>
                  <p className="text-[#17202E]/70 leading-relaxed">
                    Vi ricontatteremo entro 2 giorni lavorativi.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="rounded-lg border border-[#17202E]/10 bg-white p-6 md:p-8 space-y-5">
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
                      <label className="flex items-center gap-2 text-sm text-[#17202E]">
                        <input
                          type="radio"
                          name="preference"
                          value="Ricevere la scheda informativa"
                          checked={form.preference === 'Ricevere la scheda informativa'}
                          onChange={(e) => update('preference', e.target.value)}
                          className="accent-[#8A6420]"
                        />
                        Ricevere la scheda informativa
                      </label>
                      <label className="flex items-center gap-2 text-sm text-[#17202E]">
                        <input
                          type="radio"
                          name="preference"
                          value="Una demo in studio"
                          checked={form.preference === 'Una demo in studio'}
                          onChange={(e) => update('preference', e.target.value)}
                          className="accent-[#8A6420]"
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

                  <label className="flex items-start gap-3 text-xs text-[#17202E]/70 leading-relaxed">
                    <input
                      type="checkbox"
                      required
                      checked={form.privacyAccepted}
                      onChange={(e) => update('privacyAccepted', e.target.checked)}
                      className="mt-0.5 accent-[#8A6420]"
                    />
                    <span>
                      Ho letto e accetto l&apos;
                      <Link href={`/${locale}/privacy`} className="underline hover:text-[#8A6420]">
                        informativa sulla privacy
                      </Link>{' '}
                      (obbligatorio). *
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
                    className="w-full inline-flex items-center justify-center rounded-md bg-[#17202E] px-6 py-3 text-white font-medium hover:bg-[#8A6420] transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Invio in corso...' : 'Richiedi informazioni'}
                  </button>

                  <p className="flex items-center gap-2 text-xs text-[#17202E]/50">
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
