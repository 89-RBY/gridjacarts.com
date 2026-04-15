import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { Handshake, Lightbulb, Award, Eye, Target, Compass } from 'lucide-react';
import TeamList from '@/components/TeamList';

interface AboutPageProps {
  params: { locale: string };
}

export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: AboutPageProps) {
  const t = await getTranslations({ locale, namespace: 'about' });
  return {
    title: t('title'),
  };
}

export default function AboutPage({ params: { locale } }: AboutPageProps) {
  const t = useTranslations('about');

  const values = [
    { icon: Handshake, name: t('values.partnership') },
    { icon: Lightbulb, name: t('values.innovation') },
    { icon: Award, name: t('values.quality') },
    { icon: Eye, name: t('values.transparency') },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 tech-grid-bg">
        <div className="absolute inset-0 bg-tech-radial pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="tech-badge-accent mb-6">
              <span className="font-mono text-[11px]">// ABOUT</span>
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

      {/* Mission */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Target className="w-5 h-5 text-tech-accent" />
                <span className="text-xs font-mono uppercase text-tech-text-muted tracking-wider">
                  // {t('mission.title')}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-tech-text">
                {t('mission.title')}
              </h2>
              <p className="text-lg text-tech-text-dim leading-relaxed">{t('mission.content')}</p>
            </div>
            <div className="tech-card-glass tech-border-gradient min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center mx-auto mb-4">
                  <Handshake className="w-10 h-10 text-tech-accent" />
                </div>
                <div className="font-mono text-xs text-tech-text-muted uppercase tracking-wider">
                  // partnership.init()
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="section-padding bg-tech-surface/30">
        <div className="container-custom">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 tech-card-glass tech-border-gradient min-h-[300px] flex items-center justify-center">
              <div className="text-center">
                <div className="w-20 h-20 rounded-2xl bg-tech-cyan/10 border border-tech-cyan/30 flex items-center justify-center mx-auto mb-4">
                  <Compass className="w-10 h-10 text-tech-cyan" />
                </div>
                <div className="font-mono text-xs text-tech-text-muted uppercase tracking-wider">
                  // vision.forward()
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="flex items-center gap-2 mb-4">
                <Compass className="w-5 h-5 text-tech-accent" />
                <span className="text-xs font-mono uppercase text-tech-text-muted tracking-wider">
                  // {t('vision.title')}
                </span>
              </div>
              <h2 className="text-3xl md:text-4xl font-display font-bold mb-6 text-tech-text">
                {t('vision.title')}
              </h2>
              <p className="text-lg text-tech-text-dim leading-relaxed">{t('vision.content')}</p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="tech-badge mb-4">
              <span className="font-mono">// VALUES</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-tech-text">
              {t('values.title')}
            </h2>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {values.map((value, index) => (
              <div key={index} className="tech-card text-center group">
                <div className="w-14 h-14 mx-auto mb-4 rounded-xl bg-tech-accent/10 border border-tech-accent/30 flex items-center justify-center group-hover:bg-tech-accent/20 transition-colors">
                  <value.icon className="w-6 h-6 text-tech-accent" />
                </div>
                <h3 className="font-semibold text-tech-text">{value.name}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="section-padding bg-tech-surface/30">
        <div className="container-custom">
          <div className="text-center mb-12">
            <div className="tech-badge mb-4">
              <span className="font-mono">// TEAM</span>
            </div>
            <h2 className="text-3xl md:text-5xl font-display font-bold text-tech-text">
              {t('team.title')}
            </h2>
            <p className="text-lg text-tech-text-dim mt-4 max-w-2xl mx-auto">{t('team.subtitle')}</p>
          </div>
          <TeamList locale={locale} />
        </div>
      </section>
    </div>
  );
}
