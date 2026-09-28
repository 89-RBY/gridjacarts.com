'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  ShieldCheck,
  ArrowRight,
  Server,
  Building2,
  Languages,
  Headset,
  CheckCircle2,
  FileWarning,
  FolderSearch,
  Clock,
  Quote,
} from 'lucide-react';

const risks = [
  {
    n: '01',
    icon: FileWarning,
    title: 'Fuga di dati e violazione del segreto professionale',
    desc: 'I documenti caricati su ChatGPT e strumenti simili lasciano lo studio e finiscono su server esteri di terzi — un rischio concreto rispetto al segreto professionale e alla LPD, spesso senza che la direzione dello studio lo sappia.',
  },
  {
    n: '02',
    icon: FolderSearch,
    title: 'Archivi dispersi e frammentati',
    desc: 'Vecchie pratiche, pareri passati e precedenti sono sparsi tra cartelle di rete, email e archivi cartacei: ritrovarli richiede un dispendio enorme di tempo prezioso.',
  },
  {
    n: '03',
    icon: Clock,
    title: 'Analisi manuale che consuma ore',
    desc: 'Contratti complessi e pareri lunghi decine di pagine vanno letti e riassunti manualmente da soci o collaboratori prima di poter rispondere al cliente.',
  },
];

const useCases = [
  {
    scenario:
      'Un cliente storico contatta lo studio per una contestazione commerciale legata a una vertenza iniziata tre anni prima. Il fascicolo contiene centinaia di email, lettere e bozze sparse in diverse cartelle.',
    question:
      'Quali sono stati i punti di disaccordo principali con la controparte tra il 2023 e il 2024, e quali impegni abbiamo assunto per iscritto?',
    result:
      "L'AI analizza l'intero fascicolo autorizzato in pochi secondi e compila una sintesi cronologica con, per ogni punto, il file sorgente e il numero di pagina esatto. Il professionista ha il quadro completo prima ancora di aprire i singoli file.",
    time: 'Secondi invece di ore',
  },
  {
    scenario:
      'Lo studio deve esaminare un contratto di locazione commerciale di 60 pagine per verificare clausole di recesso anticipato, penali o limitazioni di responsabilità.',
    question:
      'Analizza questo contratto ed elenca tutte le clausole che prevedono penali a carico del nostro cliente, con articolo e condizione di attivazione.',
    result:
      "Il server estrae ogni riscontro rilevante in una lista puntuale. Un'analisi che richiederebbe un'ora di lettura intensiva viene completata in un minuto, azzerando il rischio di sviste.",
    time: 'Un minuto invece di un’ora',
  },
  {
    scenario:
      'Un collaboratore deve redigere un parere che ricalchi lo stile e l’impostazione già usati con successo dallo studio in casi analoghi.',
    question:
      'Prendi a modello il parere depositato nel caso [X] e adatta l’impostazione per la nuova posizione del cliente [Y], evidenziando le parti variabili.',
    result:
      'L’AI genera una bozza coerente con lo stile dello studio, attingendo solo ai precedenti interni archiviati in locale — nessun dato esce mai per generarla.',
    time: 'Bozza pronta in pochi minuti',
  },
];

const whyUs = [
  { icon: Building2, text: 'Core business nativo: sviluppiamo AI ogni giorno, non rivendiamo un plugin di terzi' },
  { icon: Server, text: 'Prodotto gestito chiavi in mano: hardware, installazione, aggiornamenti e assistenza in un canone unico' },
  { icon: Languages, text: 'Software house attiva dal 2020 in Svizzera, Italia e Romania — installazione e supporto in italiano' },
  { icon: ShieldCheck, text: 'Sicurezza assoluta: nessun cloud, zero elaborazione esterna, conformità al segreto professionale' },
];

const faq: [string, string][] = [
  ['I dati escono mai dallo studio?', 'No, in modo assoluto. Il server lavora sulla vostra rete locale — mai su internet per l’elaborazione dei documenti.'],
  ['Serve un tecnico interno?', 'No. Ci occupiamo noi di installazione, aggiornamenti e assistenza; il team usa solo una chat in linguaggio naturale.'],
  ['Quanto sono affidabili le risposte?', 'Ogni risposta include la citazione esatta della fonte (documento e pagina): zero scatole nere, e potete sempre verificare.'],
  ['Cosa copre l’assistenza in caso di guasto?', 'Hardware sostitutivo e backup rapido sono previsti nel contratto, per non fermare mai lo studio.'],
  ['Si integra con i nostri programmi?', 'Lavora con i documenti nelle cartelle condivise; integrazioni specifiche su richiesta.'],
  ['È conforme alla LPD svizzera?', 'La gestione locale e i permessi ereditati dall’archivio supportano pienamente il rispetto della LPD e del segreto professionale.'],
];

const teamSizes = ['1–5 persone', '6–15 persone', '16–30 persone', 'Oltre 30 persone'];

const initialForm = {
  name: '',
  studio: '',
  email: '',
  phone: '',
  teamSize: '',
  message: '',
  confirm_email: '', // honeypot
};

export default function AiStudiPage({ params: { locale } }: { params: { locale: string } }) {
  const router = useRouter();
  const [form, setForm] = useState(initialForm);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [utm, setUtm] = useState('');

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const source = params.get('utm_source');
    const campaign = params.get('utm_campaign');
    if (source || campaign) {
      setUtm(`utm_source=${source || '-'}, utm_campaign=${campaign || '-'}`);
    }
  }, []);

  const update = (field: keyof typeof initialForm, value: string) =>
    setForm((prev) => ({ ...prev, [field]: value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const details = [
      `Studio: ${form.studio || '-'}`,
      `Numero persone nello studio: ${form.teamSize || '-'}`,
      utm ? `Tracking: ${utm}` : '',
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
          source: 'ai-studi-ticino',
          subject: `Demo AI studi Ticino - ${form.studio || form.name}`,
          confirm_email: form.confirm_email,
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || 'Non siamo riusciti a inviare la richiesta. Riprova tra poco.');
      }

      router.push(`/${locale}/ai-studi-professionali/grazie`);
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
                <span className="font-mono text-[11px]">TICINO · DATI SEMPRE IN STUDIO</span>
              </div>
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-display font-bold text-tech-text leading-[1.08] mb-6">
                L&apos;intelligenza artificiale che lavora sui documenti del vostro studio.{' '}
                <span className="tech-gradient-text">Senza che escano dallo studio.</span>
              </h1>
              <p className="text-lg text-tech-text-dim leading-relaxed mb-8 max-w-xl">
                Per studi legali, fiduciarie e commercialisti in Ticino. Un server installato nel
                vostro ufficio, che risponde in italiano sulle vostre pratiche.
              </p>
              <div className="flex flex-wrap gap-4">
                <a href="#demo" className="btn-primary inline-flex items-center gap-2">
                  Prenota una demo nel tuo studio
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a href="#come-funziona" className="btn-secondary inline-flex items-center gap-2">
                  Come funziona ↓
                </a>
              </div>
            </div>

            {/* Visual: local server, not a stock photo */}
            <div className="tech-card-elevated tech-border-gradient p-8">
              <div className="terminal">
                <div className="terminal-header">
                  <div className="flex gap-2">
                    <div className="terminal-dot bg-[#ff5f57]" />
                    <div className="terminal-dot bg-[#febc2e]" />
                    <div className="terminal-dot bg-[#28c840]" />
                  </div>
                  <div className="flex-1 text-center text-xs text-tech-text-muted font-mono">
                    studio-server — locale
                  </div>
                </div>
                <div className="terminal-body space-y-3 font-mono text-sm">
                  <div className="flex items-center gap-2 text-tech-text-dim">
                    <Server className="w-4 h-4 text-tech-accent flex-shrink-0" />
                    <span>rete: 192.168.1.42 (solo LAN interna)</span>
                  </div>
                  <div className="flex items-center gap-2 text-tech-text-dim">
                    <ShieldCheck className="w-4 h-4 text-tech-accent flex-shrink-0" />
                    <span>internet: disconnesso → servizio attivo ✓</span>
                  </div>
                  <div className="pt-3 border-t border-tech-border text-tech-text">
                    <span className="text-tech-accent">&gt;</span> Abbiamo già gestito un caso simile
                    a questo contratto di locazione?
                  </div>
                  <div className="text-tech-text-dim pl-3 border-l-2 border-tech-accent/40">
                    Sì — pratica &quot;Locazione_Rossi_2023.pdf&quot;, pag. 4, clausola di recesso
                    anticipato a 6 mesi.
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
          <h2 className="text-2xl md:text-3xl font-display font-bold text-tech-text mb-4 max-w-3xl">
            Dove rischia il vostro studio
          </h2>
          <p className="text-tech-text-dim leading-relaxed text-lg mb-10 max-w-3xl">
            La pressione a lavorare più velocemente spinge a usare strumenti AI cloud sui
            documenti dei clienti — spesso senza che la direzione dello studio lo sappia.
          </p>
          <div className="grid md:grid-cols-3 gap-6">
            {risks.map((r) => (
              <div key={r.n} className="tech-card p-6 border-l-2 border-l-tech-danger">
                <div className="flex items-center gap-3 mb-4">
                  <span className="font-mono text-xs text-tech-text-muted">{r.n}</span>
                  <r.icon className="w-5 h-5 text-tech-accent" />
                </div>
                <h3 className="font-display font-semibold text-tech-text mb-2">{r.title}</h3>
                <p className="text-sm text-tech-text-dim leading-relaxed">{r.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works */}
      <section id="come-funziona" className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-tech-text mb-12">
            Come funziona
          </h2>
          <div className="grid md:grid-cols-3 gap-6 mb-10">
            {[
              {
                title: 'Installiamo un server nel vostro studio',
                desc: 'Un piccolo computer dedicato, silenzioso, collegato solo alla vostra rete interna.',
              },
              {
                title: 'Carichiamo i vostri documenti',
                desc: "Pratiche, contratti, modelli, circolari: l'AI li indicizza e rispetta i permessi di chi può vedere cosa.",
              },
              {
                title: 'Fate domande in italiano',
                desc: 'Ricevete risposte con la fonte citata: documento e pagina da cui arriva l’informazione.',
              },
            ].map((step, i) => (
              <div key={step.title} className="tech-card p-8">
                <div className="w-10 h-10 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center font-mono font-bold text-tech-accent mb-5">
                  {i + 1}
                </div>
                <h3 className="text-lg font-display font-semibold text-tech-text mb-2">
                  {step.title}
                </h3>
                <p className="text-tech-text-dim leading-relaxed text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="tech-card-elevated tech-border-gradient p-6 flex items-start gap-4 max-w-3xl mx-auto">
            <div className="w-10 h-10 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center flex-shrink-0">
              <ShieldCheck className="w-5 h-5 text-tech-accent" />
            </div>
            <div>
              <div className="font-display font-semibold text-tech-text mb-1">
                Fonte citata, zero scatole nere
              </div>
              <p className="text-sm text-tech-text-dim leading-relaxed">
                Ogni risposta non è una deduzione astratta: è corredata dal riferimento esatto al
                documento e alla pagina d&apos;origine, per un controllo immediato. Nessun
                abbonamento a servizi esteri, nessun dato in cloud — se staccate internet,
                continua a funzionare.
              </p>
            </div>
          </div>
          <p className="text-center text-tech-text-dim leading-relaxed max-w-2xl mx-auto mt-10">
            <span className="text-tech-text font-semibold">A chi è rivolto:</span> studi legali,
            fiduciarie e studi di commercialisti in Ticino che gestiscono informazioni riservate e
            vogliono i vantaggi dell&apos;intelligenza artificiale senza mettere a rischio la
            confidenzialità dei dati dei propri clienti.
          </p>
        </div>
      </section>

      {/* Use cases */}
      <section className="section-padding bg-tech-surface/30">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-tech-text mb-4">
            Cosa può fare per il vostro studio
          </h2>
          <p className="text-tech-text-dim leading-relaxed text-lg mb-12 max-w-2xl">
            Tre esempi concreti di come l&apos;AI locale accelera le attività ad alto valore
            aggiunto.
          </p>
          <div className="grid lg:grid-cols-3 gap-6">
            {useCases.map((u, i) => (
              <div key={i} className="tech-card p-6 flex flex-col gap-4">
                <p className="text-sm text-tech-text-dim leading-relaxed">{u.scenario}</p>
                <div className="flex items-start gap-2 bg-tech-bg border border-tech-border rounded-lg p-4">
                  <Quote className="w-4 h-4 text-tech-accent flex-shrink-0 mt-0.5" />
                  <p className="text-sm text-tech-text italic leading-relaxed">{u.question}</p>
                </div>
                <p className="text-sm text-tech-text-dim leading-relaxed flex-1">{u.result}</p>
                <div className="flex items-center gap-2 text-xs font-mono text-tech-accent pt-2 border-t border-tech-border">
                  <Clock className="w-3.5 h-3.5 flex-shrink-0" />
                  {u.time}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-tech-text mb-12">
            Perché Gridjac Arts è il partner ideale
          </h2>
          <div className="grid sm:grid-cols-2 gap-6">
            {whyUs.map((item) => (
              <div key={item.text} className="tech-card p-6 flex items-start gap-4">
                <div className="w-10 h-10 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center flex-shrink-0">
                  <item.icon className="w-5 h-5 text-tech-accent" />
                </div>
                <p className="text-tech-text-dim leading-relaxed pt-1.5">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section-padding bg-tech-surface/30">
        <div className="container-custom">
          <div className="tech-card-elevated tech-border-gradient max-w-3xl mx-auto p-8 md:p-10 text-center">
            <h2 className="text-2xl md:text-3xl font-display font-bold text-tech-text mb-4">
              Quanto costa
            </h2>
            <p className="text-tech-text-dim leading-relaxed mb-8 max-w-xl mx-auto">
              Il prezzo dipende dalle dimensioni dello studio e dal volume di documenti da
              indicizzare. Include l&apos;installazione, l&apos;hardware e l&apos;assistenza
              continuativa. Ve lo presentiamo durante la demo, insieme a una stima su misura.
            </p>
            <div className="grid sm:grid-cols-2 gap-4 text-left mb-8">
              <div className="tech-card !p-5">
                <div className="text-xs font-mono uppercase text-tech-text-muted mb-2">
                  {'//'} una tantum
                </div>
                <div className="text-tech-text font-semibold">Installazione e configurazione</div>
                <p className="text-sm text-tech-text-dim mt-1">Hardware incluso</p>
              </div>
              <div className="tech-card !p-5">
                <div className="text-xs font-mono uppercase text-tech-text-muted mb-2">
                  {'//'} ricorrente
                </div>
                <div className="text-tech-text font-semibold">Assistenza e aggiornamenti</div>
                <p className="text-sm text-tech-text-dim mt-1">Canone mensile fisso</p>
              </div>
            </div>
            <a href="#demo" className="btn-primary inline-flex items-center gap-2">
              Richiedi un preventivo su misura
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section-padding">
        <div className="container-custom">
          <h2 className="text-3xl md:text-4xl font-display font-bold text-tech-text mb-12">
            Domande frequenti
          </h2>
          <div className="grid md:grid-cols-2 gap-6 max-w-5xl">
            {faq.map(([q, a]) => (
              <div key={q} className="tech-card p-6">
                <h3 className="font-display font-semibold text-tech-text mb-2">{q}</h3>
                <p className="text-tech-text-dim leading-relaxed text-sm">{a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA + Form */}
      <section id="demo" className="section-padding bg-tech-surface/30">
        <div className="container-custom">
          <div className="max-w-2xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-display font-bold text-tech-text mb-4">
                Vedetelo funzionare nel vostro studio
              </h2>
              <p className="text-tech-text-dim leading-relaxed">
                Portiamo il server da voi, stacchiamo il cavo di rete e facciamo domande su
                alcuni vostri documenti di esempio (anche anonimizzati, se preferite). 30 minuti,
                senza impegno.
              </p>
            </div>

            <div className="tech-card-elevated p-8 md:p-10">
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
                      Nome e cognome *
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
                    <label htmlFor="studio" className={labelClass}>
                      Nome dello studio *
                    </label>
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
                    <label htmlFor="email" className={labelClass}>
                      Email *
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
                  <div>
                    <label htmlFor="phone" className={labelClass}>
                      Telefono *
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
                  <label htmlFor="teamSize" className={labelClass}>
                    Numero di persone nello studio
                  </label>
                  <select
                    id="teamSize"
                    value={form.teamSize}
                    onChange={(e) => update('teamSize', e.target.value)}
                    className={inputClass}
                  >
                    <option value="">Seleziona...</option>
                    {teamSizes.map((size) => (
                      <option key={size} value={size}>
                        {size}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label htmlFor="message" className={labelClass}>
                    Messaggio (facoltativo)
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
                  {loading ? 'Invio in corso...' : 'Prenota la demo'}
                  {!loading && <ArrowRight className="w-4 h-4" />}
                </button>

                <p className="text-xs text-tech-text-muted leading-relaxed flex items-start gap-2">
                  <Headset className="w-3.5 h-3.5 flex-shrink-0 mt-0.5" />
                  Inviando il modulo acconsentite al trattamento dei vostri dati per essere
                  ricontattati riguardo alla demo. Nessuna cessione a terzi.
                </p>
              </form>
            </div>
            <div className="flex items-center justify-center gap-2 mt-6 text-sm text-tech-text-muted">
              <CheckCircle2 className="w-4 h-4 text-tech-accent" />
              <span>Nessun impegno, nessun costo per la demo</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
