'use client';

import { useTranslations } from 'next-intl';
import { Check, Zap, Rocket, Crown, ArrowRight, Phone, Mail, Clock, MapPin, Award, Users, Star, MessageCircle } from 'lucide-react';
import OffertaDicembreContactButtons from '@/components/OffertaDicembreContactButtons';
import ThemeToggle from '@/components/ThemeToggle';
import { useScrollReveal } from '@/hooks/useScrollReveal';
import { useCountUp } from '@/hooks/useCountUp';
import { useScrollDepth, usePageEngagement, usePackageViewTracking } from '@/hooks/useAnalytics';
import { trackCTAClick, trackFloatingButtonClick } from '@/lib/analytics';

export const dynamic = 'force-dynamic';

export default function OffertaDicembreTestPage({ params }: { params: { locale: string } }) {
    const t = useTranslations('offertaDicembre');

    // Analytics hooks
    useScrollDepth();
    usePageEngagement();

    // Count up hooks for stats
    const { ref: ref1, count: count1 } = useCountUp({ end: 500, duration: 2000 });
    const { ref: ref2, count: count2 } = useCountUp({ end: 49, duration: 2000 });
    const { ref: ref3, count: count3 } = useCountUp({ end: 72, duration: 2000 });

    const packages = [
        {
            id: 'startup',
            name: t('packages.startup.name'),
            tagline: t('packages.startup.tagline'),
            price: '999',
            originalPrice: '1.499',
            savings: '500',
            icon: Zap,
            color: 'brutal-yellow',
            bgColor: 'bg-brutal-yellow',
            popular: false,
            features: [
                t('packages.startup.features.0'),
                t('packages.startup.features.1'),
                t('packages.startup.features.2'),
                t('packages.startup.features.3'),
                t('packages.startup.features.4'),
                t('packages.startup.features.5'),
                t('packages.startup.features.6'),
                t('packages.startup.features.7'),
                t('packages.startup.features.8'),
                t('packages.startup.features.9'),
            ],
        },
        {
            id: 'pro',
            name: t('packages.pro.name'),
            tagline: t('packages.pro.tagline'),
            price: '1.749',
            originalPrice: '2.499',
            savings: '750',
            icon: Rocket,
            color: 'brutal-magenta',
            bgColor: 'bg-brutal-magenta',
            popular: true,
            features: [
                t('packages.pro.features.0'),
                t('packages.pro.features.1'),
                t('packages.pro.features.2'),
                t('packages.pro.features.3'),
                t('packages.pro.features.4'),
                t('packages.pro.features.5'),
                t('packages.pro.features.6'),
                t('packages.pro.features.7'),
                t('packages.pro.features.8'),
                t('packages.pro.features.9'),
                t('packages.pro.features.10'),
                t('packages.pro.features.11'),
                t('packages.pro.features.12'),
                t('packages.pro.features.13'),
                t('packages.pro.features.14'),
            ],
        },
        {
            id: 'premium',
            name: t('packages.premium.name'),
            tagline: t('packages.premium.tagline'),
            price: '2.999',
            originalPrice: '4.499',
            savings: '1.500',
            icon: Crown,
            color: 'brutal-cyan',
            bgColor: 'bg-brutal-cyan',
            popular: false,
            features: [
                t('packages.premium.features.0'),
                t('packages.premium.features.1'),
                t('packages.premium.features.2'),
                t('packages.premium.features.3'),
                t('packages.premium.features.4'),
                t('packages.premium.features.5'),
                t('packages.premium.features.6'),
                t('packages.premium.features.7'),
                t('packages.premium.features.8'),
                t('packages.premium.features.9'),
                t('packages.premium.features.10'),
                t('packages.premium.features.11'),
                t('packages.premium.features.12'),
                t('packages.premium.features.13'),
            ],
        },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-black">
            {/* Theme Toggle */}
            <ThemeToggle />

            {/* Urgent Banner - BRUTAL STYLE */}
            <div className="bg-brutal-red border-t-8 border-b-8 border-black dark:border-white text-black dark:text-white py-4 px-4 text-center brutal-text animate-blink">
                <Clock className="inline-block w-6 h-6 mr-2" />
                {t('urgentBanner')}
            </div>

            {/* Hero Section - BRUTAL STYLE */}
            <section className="relative py-20 px-4 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto relative z-10">
                    <div className="text-center space-y-8">
                        {/* Badge - BRUTAL */}
                        <div className="inline-flex items-center gap-2 bg-brutal-orange brutal-border brutal-shadow px-8 py-3 font-black uppercase text-black">
                            <Award className="w-6 h-6" />
                            {t('hero.badge')}
                        </div>

                        {/* Main Heading - BRUTAL */}
                        <h1 className="text-6xl md:text-8xl brutal-text text-black dark:text-white uppercase">
                            {t('hero.title.line1')}<br />
                            <span className="text-brutal-magenta dark:text-brutal-cyan">
                                {t('hero.title.line2')}
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="text-xl md:text-2xl font-bold text-black dark:text-white max-w-3xl mx-auto">
                            {t('hero.subtitle')}
                        </p>

                        {/* Stats - BRUTAL CARDS */}
                        <div className="flex flex-wrap justify-center gap-8 py-12">
                            <div className="brutal-border brutal-shadow-yellow bg-white dark:bg-black p-6 hover:animate-shake">
                                <div className="text-5xl brutal-text text-black dark:text-white">500+</div>
                                <div className="text-sm font-bold text-black dark:text-white mt-2 uppercase">{t('hero.stats.clients')}</div>
                            </div>
                            <div className="brutal-border brutal-shadow-cyan bg-white dark:bg-black p-6 hover:animate-shake">
                                <div className="text-5xl brutal-text text-black dark:text-white">4.9/5</div>
                                <div className="text-sm font-bold text-black dark:text-white mt-2 uppercase">{t('hero.stats.rating')}</div>
                            </div>
                            <div className="brutal-border brutal-shadow-magenta bg-white dark:bg-black p-6 hover:animate-shake">
                                <div className="text-5xl brutal-text text-black dark:text-white">72h</div>
                                <div className="text-sm font-bold text-black dark:text-white mt-2 uppercase">{t('hero.stats.delivery')}</div>
                            </div>
                        </div>

                        {/* CTA Buttons - BRUTAL */}
                        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                            <a
                                href="#pacchetti"
                                onClick={() => trackCTAClick('hero', t('hero.cta.primary'))}
                                className="group bg-brutal-magenta dark:bg-brutal-cyan brutal-btn brutal-shadow px-10 py-5 text-black text-xl inline-flex items-center gap-3 hover:animate-brutal-pop"
                            >
                                {t('hero.cta.primary')}
                                <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-100" />
                            </a>
                            <a
                                href="#contatti"
                                onClick={() => trackCTAClick('hero', t('hero.cta.secondary'))}
                                className="bg-white dark:bg-black brutal-btn brutal-shadow px-10 py-5 text-black dark:text-white text-xl hover:animate-brutal-pop"
                            >
                                {t('hero.cta.secondary')}
                            </a>
                        </div>

                        {/* Trust Signals */}
                        <div className="flex flex-wrap justify-center items-center gap-8 pt-8">
                            <div className="flex items-center gap-2 brutal-border bg-brutal-lime px-4 py-2">
                                <Check className="w-5 h-5 text-black" />
                                <span className="font-black text-black uppercase text-sm">{t('hero.trust.0')}</span>
                            </div>
                            <div className="flex items-center gap-2 brutal-border bg-brutal-lime px-4 py-2">
                                <Check className="w-5 h-5 text-black" />
                                <span className="font-black text-black uppercase text-sm">{t('hero.trust.1')}</span>
                            </div>
                            <div className="flex items-center gap-2 brutal-border bg-brutal-lime px-4 py-2">
                                <Check className="w-5 h-5 text-black" />
                                <span className="font-black text-black uppercase text-sm">{t('hero.trust.2')}</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Geometric Elements */}
                <div className="absolute top-20 left-10 w-24 h-24 bg-brutal-yellow border-4 border-black dark:border-white rotate-45"></div>
                <div className="absolute bottom-20 right-10 w-32 h-32 bg-brutal-cyan border-4 border-black dark:border-white"></div>
            </section>

            {/* Why Now Section - BRUTAL */}
            <section className="py-16 px-4 bg-brutal-red border-t-8 border-b-8 border-black dark:border-white">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-8">
                        <h2 className="text-5xl md:text-6xl brutal-text text-black dark:text-white uppercase">
                            {t('whyNow.title')}
                        </h2>
                        <div className="grid md:grid-cols-3 gap-8 mt-12">
                            <BrutalCard
                                title={t('whyNow.reasons.0.title')}
                                description={t('whyNow.reasons.0.description')}
                                highlight="-33%"
                                bgColor="bg-brutal-yellow"
                            />
                            <BrutalCard
                                title={t('whyNow.reasons.1.title')}
                                description={t('whyNow.reasons.1.description')}
                                icon={Clock}
                                bgColor="bg-brutal-cyan"
                            />
                            <BrutalCard
                                title={t('whyNow.reasons.2.title')}
                                description={t('whyNow.reasons.2.description')}
                                icon={Users}
                                bgColor="bg-brutal-magenta"
                            />
                        </div>
                    </div>
                </div>
            </section>

            {/* Packages Section - BRUTAL */}
            <section id="pacchetti" className="py-20 px-4 bg-white dark:bg-black">
                <div className="max-w-7xl mx-auto">
                    <div className="text-center space-y-4 mb-16">
                        <h2 className="text-5xl md:text-6xl brutal-text text-black dark:text-white uppercase">
                            {t('packages.title')}
                        </h2>
                        <p className="text-xl font-bold text-black dark:text-white uppercase">
                            {t('packages.subtitle')}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-8">
                        {packages.map((pkg, index) => {
                            const Icon = pkg.icon;
                            return (
                                <PackageCard key={pkg.id} pkg={pkg} Icon={Icon} index={index} t={t} />
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* Social Proof - BRUTAL */}
            <section className="py-16 px-4 bg-brutal-lime border-t-8 border-b-8 border-black dark:border-white">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-5xl brutal-text text-center mb-12 text-black uppercase">{t('socialProof.title')}</h2>
                    <div className="grid md:grid-cols-3 gap-8">
                        {[0, 1, 2].map((i) => (
                            <div key={i} className="bg-white brutal-border brutal-shadow p-6 hover:translate-x-2 hover:translate-y-2 transition-transform duration-100">
                                <div className="flex items-center gap-1 mb-4">
                                    {[...Array(5)].map((_, idx) => (
                                        <Star key={idx} className="w-6 h-6 stroke-black stroke-2 fill-brutal-yellow" />
                                    ))}
                                </div>
                                <p className="text-black mb-4 font-bold italic">
                                    &quot;{t(`socialProof.testimonials.${i}.text`)}&quot;
                                </p>
                                <div className="brutal-text text-black">{t(`socialProof.testimonials.${i}.author`)}</div>
                                <div className="text-sm text-black font-bold uppercase">{t(`socialProof.testimonials.${i}.company`)}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Contact Section - BRUTAL */}
            <section id="contatti" className="py-20 px-4 bg-black dark:bg-white text-white dark:text-black">
                <div className="max-w-3xl mx-auto">
                    <div className="text-center space-y-4 mb-12">
                        <h2 className="text-5xl md:text-6xl brutal-text uppercase">
                            {t('contact.title')}
                        </h2>
                        <p className="text-xl font-bold uppercase">
                            Scegli il tuo metodo di contatto preferito
                        </p>
                    </div>

                    <OffertaDicembreContactButtons />

                    <div className="mt-12 grid md:grid-cols-3 gap-6 text-center">
                        <div className="flex flex-col items-center gap-2 brutal-border border-white dark:border-black p-4">
                            <Phone className="w-8 h-8" />
                            <a href="tel:+390612345678" className="font-black hover:underline uppercase">
                                +39 06 1234 5678
                            </a>
                        </div>
                        <div className="flex flex-col items-center gap-2 brutal-border border-white dark:border-black p-4">
                            <Mail className="w-8 h-8" />
                            <a href="mailto:info@gridjacarts.com" className="font-black hover:underline uppercase">
                                info@gridjacarts.com
                            </a>
                        </div>
                        <div className="flex flex-col items-center gap-2 brutal-border border-white dark:border-black p-4">
                            <MapPin className="w-8 h-8" />
                            <span className="font-black uppercase">Roma, Italia</span>
                        </div>
                    </div>
                </div>
            </section>

            {/* Final CTA - BRUTAL */}
            <section className="py-16 px-4 bg-brutal-orange border-t-8 border-black dark:border-white">
                <div className="max-w-4xl mx-auto text-center space-y-8">
                    <h2 className="text-5xl md:text-6xl brutal-text text-black uppercase">
                        {t('finalCta.title')}
                    </h2>
                    <p className="text-xl font-bold text-black uppercase">
                        {t('finalCta.subtitle')}
                    </p>
                    <a
                        href="#pacchetti"
                        onClick={() => trackCTAClick('final_cta', t('finalCta.button'))}
                        className="bg-black text-white brutal-btn brutal-shadow px-10 py-5 text-xl inline-flex items-center gap-3 hover:animate-brutal-pop border-white"
                    >
                        {t('finalCta.button')}
                        <ArrowRight className="w-6 h-6" />
                    </a>
                </div>
            </section>

            {/* Floating Action Buttons - BRUTAL */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-40 flex gap-4">
                <a
                    href="tel:+393203779506"
                    onClick={() => trackFloatingButtonClick('phone')}
                    className="bg-brutal-lime brutal-border brutal-shadow-sm w-16 h-16 flex items-center justify-center hover:animate-shake transition-all duration-100 group"
                    aria-label="Chiamaci"
                >
                    <Phone className="w-7 h-7 text-black" />
                </a>

                <a
                    href={`https://wa.me/393203779506?text=${encodeURIComponent(
                        params.locale === 'it'
                            ? 'Ciao! Sono interessato ai vostri pacchetti di Dicembre 2025. Vorrei ricevere maggiori informazioni.'
                            : params.locale === 'ro'
                                ? 'Bună! Sunt interesat de pachetele voastre din Decembrie 2025. Aș dori să primesc mai multe informații.'
                                : 'Hello! I am interested in your December 2025 packages. I would like to receive more information.'
                    )}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackFloatingButtonClick('whatsapp')}
                    className="bg-brutal-lime brutal-border brutal-shadow-sm w-16 h-16 flex items-center justify-center hover:animate-shake transition-all duration-100 group"
                    aria-label="WhatsApp"
                >
                    <MessageCircle className="w-7 h-7 text-black" />
                </a>

                <a
                    href={`mailto:info@gridjacarts.com?subject=${encodeURIComponent(
                        params.locale === 'it'
                            ? 'Richiesta Informazioni - Offerta Dicembre 2025'
                            : params.locale === 'ro'
                                ? 'Cerere Informații - Oferta Decembrie 2025'
                                : 'Information Request - December 2025 Offer'
                    )}`}
                    onClick={() => trackFloatingButtonClick('email')}
                    className="bg-brutal-lime brutal-border brutal-shadow-sm w-16 h-16 flex items-center justify-center hover:animate-shake transition-all duration-100 group"
                    aria-label="Email"
                >
                    <Mail className="w-7 h-7 text-black" />
                </a>
            </div>
        </div>
    );
}

// Brutal Card Component
function BrutalCard({
    title,
    description,
    highlight,
    icon: Icon,
    bgColor
}: {
    title: string;
    description: string;
    highlight?: string;
    icon?: any;
    bgColor: string;
}) {
    return (
        <div
            className={`${bgColor} brutal-border brutal-shadow p-8 hover:translate-x-2 hover:translate-y-2 transition-transform duration-100`}
        >
            {highlight && <div className="text-7xl brutal-text text-black mb-4">{highlight}</div>}
            {Icon && <Icon className="w-20 h-20 text-black mb-4 mx-auto" />}
            <h3 className="text-2xl brutal-text text-black mb-3 uppercase">{title}</h3>
            <p className="text-black font-bold">{description}</p>
        </div>
    );
}

// Package Card Component
function PackageCard({ pkg, Icon, index, t }: any) {
    return (
        <div
            className={`relative bg-white dark:bg-black brutal-border brutal-shadow ${pkg.popular ? 'scale-105 rotate-2' : ''}`}
        >
            {/* Popular Badge */}
            {pkg.popular && (
                <div className="absolute -top-4 -right-4 bg-brutal-red brutal-border px-6 py-2 font-black uppercase text-black rotate-6 z-10">
                    <Star className="inline-block w-5 h-5 mr-1" />
                    {t('packages.popular')}
                </div>
            )}

            {/* Header */}
            <div className={`${pkg.bgColor} p-8 text-black brutal-border border-t-0 border-x-0`}>
                <Icon className="w-16 h-16 mb-4" />
                <h3 className="text-3xl brutal-text mb-2 uppercase">{pkg.name}</h3>
                <p className="font-bold uppercase text-sm">{pkg.tagline}</p>

                {/* Price */}
                <div className="mt-6">
                    <div className="text-sm line-through font-bold">€{pkg.originalPrice}</div>
                    <div className="text-6xl brutal-text">€{pkg.price}</div>
                    {pkg.id !== 'startup' && <div className="text-sm mt-1 font-bold uppercase">{t('packages.perYear')}</div>}
                    <div className="mt-3 bg-black text-white px-4 py-2 inline-block font-black uppercase">
                        {t('packages.save')} €{pkg.savings}!
                    </div>
                </div>
            </div>

            {/* Features */}
            <div className="p-8">
                <ul className="space-y-3 mb-8">
                    {pkg.features.map((feature: string, idx: number) => (
                        <li key={idx} className="flex items-start gap-3">
                            <Check className="w-5 h-5 text-black dark:text-white flex-shrink-0 mt-0.5 stroke-[3]" />
                            <span className="text-sm text-black dark:text-white font-bold">{feature}</span>
                        </li>
                    ))}
                </ul>

                {/* CTA Button */}
                <a
                    href="#contatti"
                    onClick={() => trackCTAClick(`package_${pkg.id}`, t('packages.cta'))}
                    className={`block w-full text-center ${pkg.bgColor} brutal-btn brutal-shadow py-4 text-black text-lg hover:animate-brutal-pop`}
                >
                    {t('packages.cta')}
                </a>
            </div>
        </div>
    );
}
