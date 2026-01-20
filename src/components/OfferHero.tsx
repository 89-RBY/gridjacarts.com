'use client';

import { useTranslations } from 'next-intl';
import { Play } from 'lucide-react';

interface OfferHeroProps {
    currentMonth: number;
}

export default function OfferHero({ currentMonth }: OfferHeroProps) {
    const t = useTranslations('offer');

    // @ts-ignore - Dynamic key usage
    const monthName = t(`months.${currentMonth}`);

    return (
        <section className="relative overflow-hidden bg-gray-900 text-white pb-20 pt-32">
            {/* Background Gradient */}
            <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-purple-900/50 via-gray-900 to-gray-900 z-0"></div>

            <div className="container mx-auto px-4 relative z-10">
                <div className="max-w-4xl mx-auto text-center mb-12">
                    <div className="inline-block bg-primary-600 text-white px-4 py-1 rounded-full text-sm font-bold mb-6 tracking-wide uppercase animate-pulse">
                        {t('video.badge')}
                    </div>
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
                        {t('hero.title', { month: monthName })}
                    </h1>
                    <p className="text-2xl md:text-3xl text-gray-200 font-bold mb-4">
                        {t('hero.headline')}
                    </p>
                    <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto">
                        {t('hero.subheadline')}
                    </p>
                </div>

                {/* Video Placeholder */}
                <div className="max-w-5xl mx-auto bg-black rounded-2xl overflow-hidden shadow-2xl border-4 border-gray-800 aspect-video relative group cursor-pointer">
                    <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-black/20 transition-all">
                        <div className="w-20 h-20 bg-primary-600 rounded-full flex items-center justify-center pl-2 shadow-lg group-hover:scale-110 transition-transform duration-300">
                            <Play className="w-10 h-10 text-white" fill="currentColor" />
                        </div>
                    </div>
                    <div className="absolute bottom-0 left-0 w-full p-6 bg-gradient-to-t from-black/80 to-transparent">
                        <p className="font-bold text-lg text-white">Guarda: Come scalare il tuo business nel 2026</p>
                    </div>
                    {/* Fallback Image or Video Thumbnail would go here */}
                    <img src="/api/placeholder/800/450" alt="Video cover" className="w-full h-full object-cover opacity-60" />
                </div>

                <div className="mt-12 text-center">
                    <a href="#offer-form" className="inline-block bg-green-500 hover:bg-green-600 text-white font-extrabold text-xl px-10 py-5 rounded-full shadow-lg hover:shadow-green-500/50 transition-all transform hover:-translate-y-1">
                        {t('hero.cta')}
                    </a>
                </div>
            </div>
        </section>
    );
}
