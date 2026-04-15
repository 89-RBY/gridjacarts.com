import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { ArrowRight, Bot, Database, Rocket, FlaskConical, Github, Zap } from 'lucide-react';

interface LabsPageProps {
  params: { locale: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: LabsPageProps) {
  const t = await getTranslations({ locale, namespace: 'labs' });
  return {
    title: t('meta.title'),
    description: t('meta.description'),
  };
}

export default function LabsPage({ params: { locale } }: LabsPageProps) {
  const t = useTranslations('labs');
  const tCommon = useTranslations('common');

  const areas = [
    {
      icon: Bot,
      title: t('areas.ai.title'),
      description: t('areas.ai.description'),
      tags: ['LLM', 'Agents', 'RAG', 'Embeddings'],
    },
    {
      icon: Database,
      title: t('areas.data.title'),
      description: t('areas.data.description'),
      tags: ['ETL', 'Scraping', 'APIs', 'Warehousing'],
    },
    {
      icon: Rocket,
      title: t('areas.saas.title'),
      description: t('areas.saas.description'),
      tags: ['SaaS', 'Vertical', 'MVP', 'PMF'],
    },
  ];

  const experiments = [
    {
      name: 'ai-classifier',
      status: 'LIVE',
      description: locale === 'ro'
        ? 'Clasificator AI pentru ticketing automat'
        : locale === 'it'
        ? 'Classificatore AI per ticketing automatico'
        : 'AI classifier for automated ticketing',
    },
    {
      name: 'scraper-engine',
      status: 'BETA',
      description: locale === 'ro'
        ? 'Motor de scraping etic cu proxy rotation'
        : locale === 'it'
        ? 'Motore di scraping etico con proxy rotation'
        : 'Ethical scraping engine with proxy rotation',
    },
    {
      name: 'voice-agent',
      status: 'R&D',
      description: locale === 'ro'
        ? 'Agent vocal AI pentru call center'
        : locale === 'it'
        ? 'Agente vocale AI per call center'
        : 'AI voice agent for call centers',
    },
    {
      name: 'auto-seo',
      status: 'LIVE',
      description: locale === 'ro'
        ? 'Optimizare SEO automată pe baza datelor'
        : locale === 'it'
        ? 'Ottimizzazione SEO automatica basata sui dati'
        : 'Data-driven automatic SEO optimization',
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-24 tech-grid-bg overflow-hidden">
        <div className="absolute inset-0 bg-tech-radial pointer-events-none" />

        {/* Floating code decoration */}
        <div className="absolute top-40 right-10 opacity-10 font-mono text-xs text-tech-accent hidden lg:block pointer-events-none">
          <div>{`{`}</div>
          <div className="pl-4">&quot;experiment&quot;: true,</div>
          <div className="pl-4">&quot;status&quot;: &quot;active&quot;,</div>
          <div className="pl-4">&quot;impact&quot;: &quot;high&quot;</div>
          <div>{`}`}</div>
        </div>

        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="tech-badge-accent mb-6">
              <FlaskConical className="w-3 h-3" />
              <span className="font-mono text-[11px]">{t('badge')}</span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold mb-6 text-tech-text leading-[1.05]">
              {t('title')}
            </h1>
            <p className="text-xl md:text-2xl tech-gradient-text font-display font-semibold mb-6">
              {t('titleAccent')}
            </p>
            <p className="text-lg text-tech-text-dim leading-relaxed max-w-2xl">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Research Areas */}
      <section className="section-padding bg-tech-surface/30">
        <div className="container-custom">
          <div className="mb-16">
            <div className="tech-badge mb-4">
              <span className="font-mono">// AREAS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-tech-text">
              {t('areas.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {areas.map((area, i) => (
              <div key={i} className="tech-card tech-border-gradient group h-full flex flex-col">
                <div className="w-12 h-12 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center mb-4">
                  <area.icon className="w-5 h-5 text-tech-accent" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-tech-text">{area.title}</h3>
                <p className="text-sm text-tech-text-dim leading-relaxed flex-1 mb-4">
                  {area.description}
                </p>
                <div className="flex flex-wrap gap-1.5">
                  {area.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-[10px] font-mono px-2 py-0.5 rounded bg-tech-elevated border border-tech-border text-tech-text-dim"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Experiments list */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="mb-12">
            <div className="tech-badge mb-4">
              <span className="font-mono">// EXPERIMENTS</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-tech-text mb-4">
              {locale === 'ro' && 'Experimente active'}
              {locale === 'en' && 'Active experiments'}
              {locale === 'it' && 'Esperimenti attivi'}
            </h2>
            <p className="text-lg text-tech-text-dim">
              {locale === 'ro' && 'Proiecte R&D pe care le dezvoltăm acum'}
              {locale === 'en' && 'R&D projects we\'re currently working on'}
              {locale === 'it' && 'Progetti R&D su cui stiamo lavorando ora'}
            </p>
          </div>

          <div className="terminal tech-border-gradient max-w-4xl">
            <div className="terminal-header">
              <div className="flex gap-2">
                <div className="terminal-dot bg-[#ff5f57]" />
                <div className="terminal-dot bg-[#febc2e]" />
                <div className="terminal-dot bg-[#28c840]" />
              </div>
              <div className="flex-1 text-center text-xs text-tech-text-muted font-mono">
                labs/experiments.log
              </div>
            </div>
            <div className="terminal-body space-y-2">
              {experiments.map((exp, i) => (
                <div key={i} className="flex items-start gap-4 py-2 border-b border-tech-border last:border-0">
                  <span className="text-tech-text-muted font-mono text-xs pt-0.5">
                    [{String(i + 1).padStart(2, '0')}]
                  </span>
                  <span className="text-tech-accent font-mono text-sm min-w-[140px] pt-0.5">
                    {exp.name}
                  </span>
                  <span
                    className={`inline-block px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase border ${
                      exp.status === 'LIVE'
                        ? 'bg-tech-accent/10 border-tech-accent/40 text-tech-accent'
                        : exp.status === 'BETA'
                        ? 'bg-tech-cyan/10 border-tech-cyan/40 text-tech-cyan'
                        : 'bg-tech-warning/10 border-tech-warning/40 text-tech-warning'
                    }`}
                  >
                    {exp.status}
                  </span>
                  <span className="text-tech-text-dim text-sm flex-1">{exp.description}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Philosophy */}
      <section className="section-padding bg-tech-surface/30">
        <div className="container-custom">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="tech-badge mb-4">
                <span className="font-mono">// PHILOSOPHY</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-tech-text">
                {locale === 'ro' && 'De la experiment la produs'}
                {locale === 'en' && 'From experiment to product'}
                {locale === 'it' && 'Dall\'esperimento al prodotto'}
              </h2>
              <p className="text-lg text-tech-text-dim leading-relaxed mb-6">
                {locale === 'ro' && 'Labs este unde ne permitem să greșim. Testăm idei noi, construim prototipuri, validăm ipoteze — rapid și fără presiunea producției.'}
                {locale === 'en' && 'Labs is where we allow ourselves to fail. We test new ideas, build prototypes, validate hypotheses — fast and without production pressure.'}
                {locale === 'it' && 'Labs è dove ci permettiamo di sbagliare. Testiamo idee nuove, costruiamo prototipi, validiamo ipotesi — veloci e senza la pressione della produzione.'}
              </p>
              <p className="text-lg text-tech-text-dim leading-relaxed">
                {locale === 'ro' && 'Cele mai bune experimente devin produse. Restul ne învață lecții valoroase pe care le aplicăm în proiectele clienților.'}
                {locale === 'en' && 'The best experiments become products. The rest teach us valuable lessons we apply in client projects.'}
                {locale === 'it' && 'I migliori esperimenti diventano prodotti. Gli altri ci insegnano lezioni preziose che applichiamo nei progetti dei clienti.'}
              </p>
            </div>

            <div className="tech-card-glass">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 rounded-lg bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center">
                  <Zap className="w-5 h-5 text-tech-accent" />
                </div>
                <div className="text-xs font-mono uppercase text-tech-text-muted tracking-wider">
                  // principles
                </div>
              </div>
              <ul className="space-y-4 text-tech-text-dim">
                <li className="flex items-start gap-3">
                  <span className="text-tech-accent font-mono">01.</span>
                  <span>{locale === 'ro' ? 'Învățare prin construcție' : locale === 'it' ? 'Imparare costruendo' : 'Learn by building'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-tech-accent font-mono">02.</span>
                  <span>{locale === 'ro' ? 'Validare rapidă, iterație continuă' : locale === 'it' ? 'Validazione rapida, iterazione continua' : 'Fast validation, continuous iteration'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-tech-accent font-mono">03.</span>
                  <span>{locale === 'ro' ? 'Open knowledge, selective open source' : locale === 'it' ? 'Open knowledge, open source selettivo' : 'Open knowledge, selective open source'}</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="text-tech-accent font-mono">04.</span>
                  <span>{locale === 'ro' ? 'Impact > hype' : locale === 'it' ? 'Impatto > hype' : 'Impact > hype'}</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="tech-card-elevated text-center py-12 px-6 max-w-3xl mx-auto tech-border-gradient">
            <h2 className="text-2xl md:text-3xl font-display font-bold mb-4 text-tech-text">
              {locale === 'ro' && 'Vrei să colaborezi cu Labs?'}
              {locale === 'en' && 'Want to collaborate with Labs?'}
              {locale === 'it' && 'Vuoi collaborare con Labs?'}
            </h2>
            <p className="text-tech-text-dim mb-8 max-w-xl mx-auto">
              {locale === 'ro' && 'Căutăm proiecte pilot, parteneriate R&D și provocări tehnice interesante.'}
              {locale === 'en' && 'We\'re looking for pilot projects, R&D partnerships and interesting technical challenges.'}
              {locale === 'it' && 'Cerchiamo progetti pilota, partnership R&D e sfide tecniche interessanti.'}
            </p>
            <Link href={`/${locale}/contact`} className="btn-primary">
              {tCommon('bookCall')}
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
