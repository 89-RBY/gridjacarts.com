'use client';

import { useState } from 'react';
import {
  Send,
  CheckCircle,
  TrendingUp,
  Users,
  Zap,
  Award,
  Sparkles,
  Shield,
  Rocket,
  Target,
  DollarSign,
  HeadphonesIcon,
  BookOpen,
  Globe,
  ChevronRight,
} from 'lucide-react';

export default function BecomePartnerPage({ params: { locale } }: { params: { locale: string } }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    message: '',
    website: '', // honeypot
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      const res = await fetch('/api/partner-applications', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.error || 'Failed to submit');
      }

      setSubmitted(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit');
    } finally {
      setLoading(false);
    }
  };

  const t = translations[locale as keyof typeof translations] || translations.en;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-12 max-w-2xl text-center">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 dark:bg-green-900/30">
            <CheckCircle className="w-12 h-12 text-green-600 dark:text-green-400" />
          </div>
          <h1 className="text-3xl font-bold mb-4 text-gray-900 dark:text-white">{t.successTitle}</h1>
          <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">{t.successMessage}</p>
          <div className="bg-primary-50 dark:bg-primary-900/20 rounded-xl p-6 text-left">
            <h3 className="font-semibold mb-2 text-gray-900 dark:text-white">{t.nextSteps}</h3>
            <ul className="space-y-2 text-sm text-gray-600 dark:text-gray-400">
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                {t.step1}
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                {t.step2}
              </li>
              <li className="flex items-start gap-2">
                <ChevronRight className="w-4 h-4 text-primary-600 mt-0.5 flex-shrink-0" />
                {t.step3}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-900 dark:via-gray-900 dark:to-purple-900">
      {/* Hero Section */}
      <section className="section-padding border-b dark:border-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary-100 dark:bg-primary-900/30 rounded-full text-primary-700 dark:text-primary-300 text-sm font-medium mb-6">
              <Sparkles className="w-4 h-4" />
              {t.badge}
            </div>
            <h1 className="text-5xl md:text-6xl font-display font-bold mb-6 gradient-text">{t.title}</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">{t.subtitle}</p>
            <div className="flex flex-wrap justify-center gap-4">
              <a href="#form" className="btn-primary py-4 px-8 text-lg">
                {t.getStarted}
              </a>
              <a href="#benefits" className="btn-secondary py-4 px-8 text-lg">
                {t.learnMore}
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="grid md:grid-cols-4 gap-8 max-w-5xl mx-auto">
            {[
              { icon: Users, number: '150+', label: t.stat1 },
              { icon: Globe, number: '3', label: t.stat2 },
              { icon: Award, number: '4', label: t.stat3 },
              { icon: TrendingUp, number: '30%', label: t.stat4 },
            ].map((stat, i) => (
              <div key={i} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 mb-4">
                  <stat.icon className="w-8 h-8 text-primary-600 dark:text-primary-400" />
                </div>
                <div className="text-4xl font-bold text-gray-900 dark:text-white mb-2">{stat.number}</div>
                <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section id="benefits" className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">{t.benefitsTitle}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">{t.benefitsSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {[
              {
                icon: DollarSign,
                title: t.benefit1Title,
                description: t.benefit1Desc,
                color: 'from-green-500 to-emerald-600',
              },
              {
                icon: Target,
                title: t.benefit2Title,
                description: t.benefit2Desc,
                color: 'from-blue-500 to-cyan-600',
              },
              {
                icon: HeadphonesIcon,
                title: t.benefit3Title,
                description: t.benefit3Desc,
                color: 'from-purple-500 to-pink-600',
              },
              {
                icon: BookOpen,
                title: t.benefit4Title,
                description: t.benefit4Desc,
                color: 'from-orange-500 to-red-600',
              },
              {
                icon: Zap,
                title: t.benefit5Title,
                description: t.benefit5Desc,
                color: 'from-yellow-500 to-amber-600',
              },
              {
                icon: Shield,
                title: t.benefit6Title,
                description: t.benefit6Desc,
                color: 'from-indigo-500 to-purple-600',
              },
            ].map((benefit, i) => (
              <div
                key={i}
                className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all hover:-translate-y-1"
              >
                <div className={`inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br ${benefit.color} mb-6`}>
                  <benefit.icon className="w-7 h-7 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{benefit.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tier System Section */}
      <section className="section-padding bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">{t.tierTitle}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">{t.tierSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {[
              {
                name: 'Bronze',
                icon: Award,
                color: 'from-amber-700 to-orange-600',
                discount: '15%',
                revenue: '€0 - €10k',
                features: [t.tierBronze1, t.tierBronze2, t.tierBronze3],
              },
              {
                name: 'Silver',
                icon: Award,
                color: 'from-gray-400 to-gray-600',
                discount: '20%',
                revenue: '€10k - €50k',
                features: [t.tierSilver1, t.tierSilver2, t.tierSilver3],
              },
              {
                name: 'Gold',
                icon: Award,
                color: 'from-yellow-400 to-yellow-600',
                discount: '25%',
                revenue: '€50k - €150k',
                features: [t.tierGold1, t.tierGold2, t.tierGold3],
              },
              {
                name: 'Platinum',
                icon: Sparkles,
                color: 'from-purple-500 to-pink-600',
                discount: '30%',
                revenue: '€150k+',
                features: [t.tierPlatinum1, t.tierPlatinum2, t.tierPlatinum3],
              },
            ].map((tier, i) => (
              <div
                key={i}
                className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-6 shadow-lg border-2 border-gray-100 dark:border-gray-700 hover:border-primary-500 dark:hover:border-primary-500 transition-all"
              >
                <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl bg-gradient-to-br ${tier.color} mb-4`}>
                  <tier.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-2xl font-bold mb-2 text-gray-900 dark:text-white">{tier.name}</h3>
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400 mb-2">{tier.discount}</div>
                <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">{tier.revenue}</div>
                <ul className="space-y-2">
                  {tier.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-2 text-sm text-gray-600 dark:text-gray-400">
                      <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-12 p-6 bg-primary-50 dark:bg-primary-900/20 rounded-xl max-w-4xl mx-auto text-center">
            <Rocket className="w-12 h-12 text-primary-600 dark:text-primary-400 mx-auto mb-4" />
            <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
              {t.tierNote}
            </p>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="section-padding">
        <div className="container-custom">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">{t.howItWorksTitle}</h2>
            <p className="text-xl text-gray-600 dark:text-gray-300">{t.howItWorksSubtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            {[
              { number: '01', title: t.how1Title, description: t.how1Desc, icon: Send },
              { number: '02', title: t.how2Title, description: t.how2Desc, icon: CheckCircle },
              { number: '03', title: t.how3Title, description: t.how3Desc, icon: Rocket },
            ].map((step, i) => (
              <div key={i} className="relative">
                {i < 2 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-0.5 bg-gradient-to-r from-primary-200 to-transparent dark:from-primary-800 -translate-x-4" />
                )}
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg relative">
                  <div className="absolute -top-6 left-8 w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center text-white font-bold text-lg shadow-lg">
                    {step.number}
                  </div>
                  <div className="mt-8">
                    <step.icon className="w-10 h-10 text-primary-600 dark:text-primary-400 mb-4" />
                    <h3 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white">{step.title}</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">{step.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Form Section */}
      <section id="form" className="section-padding bg-white dark:bg-gray-800">
        <div className="container-custom">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold mb-4 gradient-text">{t.formTitle}</h2>
              <p className="text-xl text-gray-600 dark:text-gray-300">{t.formSubtitle}</p>
            </div>

            <form onSubmit={handleSubmit} className="bg-gradient-to-br from-white to-gray-50 dark:from-gray-900 dark:to-gray-800 rounded-2xl p-8 md:p-12 shadow-xl border border-gray-100 dark:border-gray-700">
              {/* Honeypot field - invisible to humans, filled by bots */}
              <div aria-hidden="true" style={{ position: 'absolute', left: '-9999px', opacity: 0, pointerEvents: 'none' }}>
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {error && (
                <div className="mb-6 p-4 bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500 rounded-lg">
                  <p className="text-red-700 dark:text-red-400 text-sm font-medium">{error}</p>
                </div>
              )}

              <div className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      {t.companyName} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.companyName}
                      onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 transition-all"
                      placeholder={t.companyNamePlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      {t.contactPerson} *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.contactPerson}
                      onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 transition-all"
                      placeholder={t.contactPersonPlaceholder}
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      {t.email} *
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 transition-all"
                      placeholder={t.emailPlaceholder}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                      {t.phone} *
                    </label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 transition-all"
                      placeholder={t.phonePlaceholder}
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    {t.address} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 transition-all"
                    placeholder={t.addressPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    {t.taxId} *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 transition-all"
                    placeholder={t.taxIdPlaceholder}
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold mb-2 text-gray-700 dark:text-gray-300">
                    {t.message} *
                  </label>
                  <textarea
                    required
                    rows={5}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl bg-white dark:bg-gray-800 focus:border-primary-500 focus:ring-2 focus:ring-primary-200 dark:focus:ring-primary-800 transition-all resize-none"
                    placeholder={t.messagePlaceholder}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-5 text-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed inline-flex items-center justify-center gap-3 shadow-lg hover:shadow-xl transition-all"
                >
                  {loading ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      {t.submitting}
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.submit}
                    </>
                  )}
                </button>

                <p className="text-center text-sm text-gray-500 dark:text-gray-400">
                  {t.privacyNote}
                </p>
              </div>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

const translations = {
  ro: {
    // Hero
    badge: 'Program Parteneriat',
    title: 'Devino Partener GridjacArts',
    subtitle: 'Alătură-te rețelei noastre de parteneri și oferă servicii digitale premium clienților tăi. Câștigă până la 30% discount pe baza veniturilor anuale.',
    getStarted: 'Înscrie-te Acum',
    learnMore: 'Află Mai Mult',

    // Stats
    stat1: 'Parteneri Activi',
    stat2: 'Țări',
    stat3: 'Niveluri Tier',
    stat4: 'Discount Max',

    // Benefits
    benefitsTitle: 'De Ce Să Devii Partener?',
    benefitsSubtitle: 'Beneficii exclusive pentru partenerii noștri',
    benefit1Title: 'Prețuri Preferențiale',
    benefit1Desc: 'Primești discount-uri progresive între 15-30% bazate pe volumul anual de vânzări. Cu cât vinzi mai mult, cu atât economisești mai mult.',
    benefit2Title: 'Sistem Tier Transparent',
    benefit2Desc: 'Avansezi automat prin 4 niveluri (Bronze, Silver, Gold, Platinum) pe măsură ce crești. Fiecare nivel deblochează noi beneficii și servicii bonus gratuite.',
    benefit3Title: 'Suport Dedicat',
    benefit3Desc: 'Acces direct la echipa noastră de suport tehnic. Răspunsuri rapide, asistență prioritară și consultanță pentru proiectele tale.',
    benefit4Title: 'Training Continuu',
    benefit4Desc: 'Resurse educaționale exclusive, webinarii, documentație detaliată și actualizări despre noile servicii și tehnologii.',
    benefit5Title: 'Dashboard Profesional',
    benefit5Desc: 'Platformă completă pentru gestionarea comenzilor, tracking-ul veniturilor, bonus-uri automate și rapoarte detaliate în timp real.',
    benefit6Title: 'Servicii Bonus',
    benefit6Desc: 'Primești servicii gratuite la fiecare avansare de nivel: logo design, landing page, SEO audit și multe altele.',

    // Tier System
    tierTitle: 'Sistem Tier cu Beneficii Progresive',
    tierSubtitle: 'Crești automat pe baza veniturilor anuale generate',
    tierBronze1: 'Acces platformă',
    tierBronze2: 'Suport email',
    tierBronze3: 'Discount 15%',
    tierSilver1: 'Logo design gratuit',
    tierSilver2: 'Suport prioritar',
    tierSilver3: 'Discount 20%',
    tierGold1: 'Landing page gratuită',
    tierGold2: 'SEO audit gratuit',
    tierGold3: 'Discount 25%',
    tierPlatinum1: 'Website complet gratuit',
    tierPlatinum2: 'SEO 6 luni gratuit',
    tierPlatinum3: 'Discount 30%',
    tierNote: '💡 Toți partenerii încep de la Bronze. Avansarea este automată și se bazează pe veniturile generate în anul fiscal curent. Bonus-urile se acordă la fiecare nivel atins!',

    // How It Works
    howItWorksTitle: 'Cum Funcționează?',
    howItWorksSubtitle: 'Procesul simplu în 3 pași',
    how1Title: 'Aplică',
    how1Desc: 'Completează formularul de mai jos cu datele companiei tale. Procesul de aplicare durează doar câteva minute.',
    how2Title: 'Evaluare',
    how2Desc: 'Echipa noastră va verifica aplicația în maximum 48 de ore și te vom contacta cu detaliile de acces.',
    how3Title: 'Activare',
    how3Desc: 'Primești acces la dashboard, documentație completă și poți începe imediat să vinzi servicii premium clienților tăi.',

    // Form
    formTitle: 'Înscrie-te Acum',
    formSubtitle: 'Completează formularul și te vom contacta în 48 de ore',
    companyName: 'Numele Companiei',
    companyNamePlaceholder: 'SC Example SRL',
    contactPerson: 'Persoană de Contact',
    contactPersonPlaceholder: 'Ion Popescu',
    email: 'Email',
    emailPlaceholder: 'contact@compania.ro',
    phone: 'Telefon',
    phonePlaceholder: '+40 722 123 456',
    address: 'Adresa',
    addressPlaceholder: 'Str. Exemplu, Nr. 1, București',
    taxId: 'CUI/CIF',
    taxIdPlaceholder: 'RO12345678',
    message: 'De ce vrei să devii partener?',
    messagePlaceholder: 'Spune-ne pe scurt despre compania ta și de ce vrei să devii partener GridjacArts...',
    submit: 'Trimite Aplicația',
    submitting: 'Se trimite...',
    privacyNote: 'Datele tale sunt protejate și vor fi folosite doar pentru procesarea aplicației.',

    // Success
    successTitle: 'Aplicație Trimisă Cu Succes!',
    successMessage: 'Mulțumim pentru interesul tău de a deveni partener GridjacArts!',
    nextSteps: 'Ce urmează:',
    step1: 'Vom revizui aplicația ta în maximum 48 de ore',
    step2: 'Te vom contacta pe email cu detalii despre următorii pași',
    step3: 'După aprobare, vei primi credențialele de acces la dashboard',
  },
  en: {
    // Hero
    badge: 'Partnership Program',
    title: 'Become a GridjacArts Partner',
    subtitle: 'Join our partner network and offer premium digital services to your clients. Earn up to 30% discount based on annual revenue.',
    getStarted: 'Apply Now',
    learnMore: 'Learn More',

    // Stats
    stat1: 'Active Partners',
    stat2: 'Countries',
    stat3: 'Tier Levels',
    stat4: 'Max Discount',

    // Benefits
    benefitsTitle: 'Why Become a Partner?',
    benefitsSubtitle: 'Exclusive benefits for our partners',
    benefit1Title: 'Preferential Pricing',
    benefit1Desc: 'Get progressive discounts between 15-30% based on annual sales volume. The more you sell, the more you save.',
    benefit2Title: 'Transparent Tier System',
    benefit2Desc: 'Automatically advance through 4 levels (Bronze, Silver, Gold, Platinum) as you grow. Each level unlocks new benefits and free bonus services.',
    benefit3Title: 'Dedicated Support',
    benefit3Desc: 'Direct access to our technical support team. Fast responses, priority assistance and consulting for your projects.',
    benefit4Title: 'Continuous Training',
    benefit4Desc: 'Exclusive educational resources, webinars, detailed documentation and updates about new services and technologies.',
    benefit5Title: 'Professional Dashboard',
    benefit5Desc: 'Complete platform for managing orders, revenue tracking, automatic bonuses and detailed real-time reports.',
    benefit6Title: 'Bonus Services',
    benefit6Desc: 'Receive free services at each level advancement: logo design, landing page, SEO audit and many more.',

    // Tier System
    tierTitle: 'Progressive Tier System',
    tierSubtitle: 'Automatically grow based on annual generated revenue',
    tierBronze1: 'Platform access',
    tierBronze2: 'Email support',
    tierBronze3: '15% discount',
    tierSilver1: 'Free logo design',
    tierSilver2: 'Priority support',
    tierSilver3: '20% discount',
    tierGold1: 'Free landing page',
    tierGold2: 'Free SEO audit',
    tierGold3: '25% discount',
    tierPlatinum1: 'Free complete website',
    tierPlatinum2: 'Free 6-month SEO',
    tierPlatinum3: '30% discount',
    tierNote: '💡 All partners start at Bronze. Advancement is automatic and based on revenue generated in the current fiscal year. Bonuses are awarded at each level reached!',

    // How It Works
    howItWorksTitle: 'How It Works?',
    howItWorksSubtitle: 'Simple 3-step process',
    how1Title: 'Apply',
    how1Desc: 'Fill out the form below with your company details. The application process takes only a few minutes.',
    how2Title: 'Evaluation',
    how2Desc: 'Our team will review your application within 48 hours and contact you with access details.',
    how3Title: 'Activation',
    how3Desc: 'Get access to the dashboard, complete documentation and start selling premium services to your clients immediately.',

    // Form
    formTitle: 'Apply Now',
    formSubtitle: 'Fill out the form and we will contact you within 48 hours',
    companyName: 'Company Name',
    companyNamePlaceholder: 'Example Inc.',
    contactPerson: 'Contact Person',
    contactPersonPlaceholder: 'John Doe',
    email: 'Email',
    emailPlaceholder: 'contact@company.com',
    phone: 'Phone',
    phonePlaceholder: '+1 555 123 4567',
    address: 'Address',
    addressPlaceholder: '123 Main St, City, State',
    taxId: 'Tax ID',
    taxIdPlaceholder: 'US12345678',
    message: 'Why do you want to become a partner?',
    messagePlaceholder: 'Tell us briefly about your company and why you want to become a GridjacArts partner...',
    submit: 'Submit Application',
    submitting: 'Submitting...',
    privacyNote: 'Your data is protected and will only be used to process your application.',

    // Success
    successTitle: 'Application Submitted Successfully!',
    successMessage: 'Thank you for your interest in becoming a GridjacArts partner!',
    nextSteps: 'What\'s next:',
    step1: 'We will review your application within 48 hours',
    step2: 'We will contact you via email with details about next steps',
    step3: 'After approval, you will receive dashboard access credentials',
  },
  it: {
    // Hero
    badge: 'Programma Partnership',
    title: 'Diventa Partner GridjacArts',
    subtitle: 'Unisciti alla nostra rete di partner e offri servizi digitali premium ai tuoi clienti. Guadagna fino al 30% di sconto in base al fatturato annuale.',
    getStarted: 'Candidati Ora',
    learnMore: 'Scopri di Più',

    // Stats
    stat1: 'Partner Attivi',
    stat2: 'Paesi',
    stat3: 'Livelli Tier',
    stat4: 'Sconto Max',

    // Benefits
    benefitsTitle: 'Perché Diventare Partner?',
    benefitsSubtitle: 'Vantaggi esclusivi per i nostri partner',
    benefit1Title: 'Prezzi Preferenziali',
    benefit1Desc: 'Ottieni sconti progressivi tra 15-30% basati sul volume annuale di vendite. Più vendi, più risparmi.',
    benefit2Title: 'Sistema Tier Trasparente',
    benefit2Desc: 'Avanza automaticamente attraverso 4 livelli (Bronze, Silver, Gold, Platinum) mentre cresci. Ogni livello sblocca nuovi vantaggi e servizi bonus gratuiti.',
    benefit3Title: 'Supporto Dedicato',
    benefit3Desc: 'Accesso diretto al nostro team di supporto tecnico. Risposte rapide, assistenza prioritaria e consulenza per i tuoi progetti.',
    benefit4Title: 'Formazione Continua',
    benefit4Desc: 'Risorse educative esclusive, webinar, documentazione dettagliata e aggiornamenti su nuovi servizi e tecnologie.',
    benefit5Title: 'Dashboard Professionale',
    benefit5Desc: 'Piattaforma completa per gestire ordini, tracciare entrate, bonus automatici e report dettagliati in tempo reale.',
    benefit6Title: 'Servizi Bonus',
    benefit6Desc: 'Ricevi servizi gratuiti ad ogni avanzamento di livello: logo design, landing page, audit SEO e molto altro.',

    // Tier System
    tierTitle: 'Sistema Tier Progressivo',
    tierSubtitle: 'Cresci automaticamente in base alle entrate annuali generate',
    tierBronze1: 'Accesso piattaforma',
    tierBronze2: 'Supporto email',
    tierBronze3: 'Sconto 15%',
    tierSilver1: 'Logo design gratuito',
    tierSilver2: 'Supporto prioritario',
    tierSilver3: 'Sconto 20%',
    tierGold1: 'Landing page gratuita',
    tierGold2: 'Audit SEO gratuito',
    tierGold3: 'Sconto 25%',
    tierPlatinum1: 'Sito web completo gratuito',
    tierPlatinum2: 'SEO 6 mesi gratuito',
    tierPlatinum3: 'Sconto 30%',
    tierNote: '💡 Tutti i partner iniziano da Bronze. L\'avanzamento è automatico e basato sulle entrate generate nell\'anno fiscale corrente. I bonus vengono assegnati ad ogni livello raggiunto!',

    // How It Works
    howItWorksTitle: 'Come Funziona?',
    howItWorksSubtitle: 'Processo semplice in 3 passaggi',
    how1Title: 'Candidati',
    how1Desc: 'Compila il modulo sottostante con i dettagli della tua azienda. Il processo di candidatura richiede solo pochi minuti.',
    how2Title: 'Valutazione',
    how2Desc: 'Il nostro team esaminerà la tua candidatura entro 48 ore e ti contatterà con i dettagli di accesso.',
    how3Title: 'Attivazione',
    how3Desc: 'Ottieni accesso alla dashboard, documentazione completa e inizia immediatamente a vendere servizi premium ai tuoi clienti.',

    // Form
    formTitle: 'Candidati Ora',
    formSubtitle: 'Compila il modulo e ti contatteremo entro 48 ore',
    companyName: 'Nome Azienda',
    companyNamePlaceholder: 'Esempio SRL',
    contactPerson: 'Persona di Contatto',
    contactPersonPlaceholder: 'Mario Rossi',
    email: 'Email',
    emailPlaceholder: 'contatto@azienda.it',
    phone: 'Telefono',
    phonePlaceholder: '+39 333 123 4567',
    address: 'Indirizzo',
    addressPlaceholder: 'Via Esempio, 1, Milano',
    taxId: 'Partita IVA',
    taxIdPlaceholder: 'IT12345678901',
    message: 'Perché vuoi diventare partner?',
    messagePlaceholder: 'Raccontaci brevemente della tua azienda e perché vuoi diventare partner GridjacArts...',
    submit: 'Invia Candidatura',
    submitting: 'Invio in corso...',
    privacyNote: 'I tuoi dati sono protetti e verranno utilizzati solo per elaborare la tua candidatura.',

    // Success
    successTitle: 'Candidatura Inviata con Successo!',
    successMessage: 'Grazie per il tuo interesse a diventare partner GridjacArts!',
    nextSteps: 'Cosa succede ora:',
    step1: 'Esamineremo la tua candidatura entro 48 ore',
    step2: 'Ti contatteremo via email con i dettagli sui prossimi passi',
    step3: 'Dopo l\'approvazione, riceverai le credenziali di accesso alla dashboard',
  },
};
