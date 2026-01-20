'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { Send, CheckCircle, AlertCircle } from 'lucide-react';

export default function OfferForm() {
    const t = useTranslations('offer.form');
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        website: '',
        revenue: '',
    });
    const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setStatus('submitting');

        try {
            const response = await fetch('/api/contact', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    ...formData,
                    subject: 'Richiesta Piano Crescita Gratuito (Offer Page)',
                    source: 'offer-page-funnel'
                }),
            });

            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', phone: '', website: '', revenue: '' });
            } else {
                setStatus('error');
            }
        } catch (error) {
            console.error('Error submitting form:', error);
            setStatus('error');
        }
    };

    return (
        <div id="offer-form" className="max-w-2xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-100 dark:bg-gray-800 dark:border-gray-700">
            <div className="bg-primary-600 p-8 text-center">
                <h3 className="text-2xl font-bold text-white mb-2">{t('header')}</h3>
                <p className="text-blue-100">{t('subHeader')}</p>
            </div>

            <div className="p-8">
                {status === 'success' ? (
                    <div className="text-center py-10">
                        <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                        <h4 className="text-xl font-bold text-gray-800 dark:text-gray-100">Richiesta Inviata!</h4>
                        <p className="text-gray-600 dark:text-gray-400 mt-2">Ti contatteremo al più presto per la tua consulenza gratuita.</p>
                        <button
                            onClick={() => setStatus('idle')}
                            className="mt-6 text-primary-600 hover:text-primary-700 font-medium underline"
                        >
                            Invia un&apos;altra richiesta
                        </button>
                    </div>
                ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('name')}</label>
                            <input
                                type="text" name="name" required
                                value={formData.name} onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                                placeholder="Mario Rossi"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('email')}</label>
                            <input
                                type="email" name="email" required
                                value={formData.email} onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                                placeholder="mario@azienda.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('phone')}</label>
                            <input
                                type="tel" name="phone" required
                                value={formData.phone} onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                                placeholder="+39 333 1234567"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('website')}</label>
                            <input
                                type="url" name="website"
                                value={formData.website} onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                                placeholder="https://www.latuaazienda.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">{t('revenue')}</label>
                            <select
                                name="revenue"
                                value={formData.revenue} onChange={handleChange}
                                className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all dark:bg-gray-900 dark:border-gray-600 dark:text-white"
                            >
                                <option value="">Seleziona fatturato annuo</option>
                                <option value="< 50k">&lt; €50.000</option>
                                <option value="50k-100k">€50.000 - €100.000</option>
                                <option value="100k-500k">€100.000 - €500.000</option>
                                <option value="> 500k">&gt; €500.000</option>
                            </select>
                        </div>

                        {status === 'error' && (
                            <div className="flex items-center text-red-600 bg-red-50 p-3 rounded-lg dark:bg-red-900/30 dark:text-red-300">
                                <AlertCircle className="w-5 h-5 mr-2" />
                                <span>Si è verificato un errore. Riprova più tardi.</span>
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={status === 'submitting'}
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-4 rounded-lg shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 flex items-center justify-center text-lg disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            {status === 'submitting' ? 'Invio in corso...' : (
                                <>
                                    {t('submit')} <Send className="ml-2 w-5 h-5" />
                                </>
                            )}
                        </button>

                        <p className="text-xs text-center text-gray-500 mt-4 dark:text-gray-400">
                            {t('privacy')}
                        </p>
                    </form>
                )}
            </div>
        </div>
    );
}
