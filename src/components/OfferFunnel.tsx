'use client';

import { useTranslations } from 'next-intl';
import { CheckCircle2, TrendingUp, ShieldCheck, Zap } from 'lucide-react';

export default function OfferFunnel() {
    const t = useTranslations('offer.benefits');

    return (
        <div className="py-20 bg-gray-50 dark:bg-gray-900">
            <div className="container mx-auto px-4">
                <div className="max-w-4xl mx-auto">
                    <h2 className="text-3xl md:text-4xl font-extrabold text-center mb-12 text-gray-900 dark:text-white">
                        {t('title')}
                    </h2>

                    <div className="grid md:grid-cols-3 gap-8">
                        {/* Benefit 1 */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-b-4 border-green-500">
                            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <TrendingUp className="w-8 h-8 text-green-600" />
                            </div>
                            <h3 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">
                                {t('list.1')}
                            </h3>
                        </div>

                        {/* Benefit 2 */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-b-4 border-blue-500">
                            <div className="w-14 h-14 bg-blue-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <ShieldCheck className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">
                                {t('list.2')}
                            </h3>
                        </div>

                        {/* Benefit 3 */}
                        <div className="bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-lg border-b-4 border-purple-500">
                            <div className="w-14 h-14 bg-purple-100 rounded-full flex items-center justify-center mb-6 mx-auto">
                                <Zap className="w-8 h-8 text-purple-600" />
                            </div>
                            <h3 className="text-xl font-bold text-center mb-4 text-gray-800 dark:text-white">
                                {t('list.3')}
                            </h3>
                        </div>
                    </div>

                    <div className="mt-16 bg-blue-50 dark:bg-blue-900/20 border border-blue-100 dark:border-blue-900 rounded-2xl p-8 flex items-start gap-4">
                        <CheckCircle2 className="w-8 h-8 text-blue-600 flex-shrink-0 mt-1" />
                        <div>
                            <h4 className="text-lg font-bold text-blue-900 dark:text-blue-100 mb-2">Garanzia Totale</h4>
                            <p className="text-blue-800 dark:text-blue-200">
                                Siamo così sicuri delle nostre strategie che se non vedi un miglioramento nelle metriche concordate entro 90 giorni, lavoreremo gratis fino al raggiungimento dell&apos;obiettivo.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
