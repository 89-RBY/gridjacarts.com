'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';

interface FormData {
  name: string;
  phone: string;
  email: string;
  package: string;
  message: string;
}

export default function OffertaDicembreForm() {
  const t = useTranslations('offertaDicembre.contact.form');
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    package: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          subject: `Richiesta Offerta Dicembre 2025 - ${formData.package}`,
          source: 'offerta-dicembre',
        }),
      });

      if (response.ok) {
        setSubmitStatus('success');
        setFormData({
          name: '',
          phone: '',
          email: '',
          package: '',
          message: '',
        });
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-3xl p-8 shadow-2xl space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            {t('name')}
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
            {t('phone')}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
          />
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          {t('email')}
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          {t('package')}
        </label>
        <select
          name="package"
          value={formData.package}
          onChange={handleChange}
          required
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        >
          <option value="">{t('selectPackage')}</option>
          <option value="Startup - €999/anno">Startup - €999/anno</option>
          <option value="Pro - €1.749/anno">Pro - €1.749/anno</option>
          <option value="Premium - €2.999/anno">Premium - €2.999/anno</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-bold text-gray-700 dark:text-gray-300 mb-2">
          {t('message')}
        </label>
        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 focus:border-primary-500 focus:ring-2 focus:ring-primary-500/20 outline-none transition-all bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
        ></textarea>
      </div>

      {/* Status Messages */}
      {submitStatus === 'success' && (
        <div className="bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-4 rounded-xl">
          Grazie! La tua richiesta è stata inviata con successo. Ti contatteremo presto!
        </div>
      )}
      {submitStatus === 'error' && (
        <div className="bg-red-100 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-4 rounded-xl">
          Si è verificato un errore. Riprova o contattaci direttamente via email.
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-gradient-to-r from-primary-600 to-purple-600 text-white py-4 rounded-xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
      >
        {isSubmitting ? 'Invio in corso...' : t('submit')}
      </button>
    </form>
  );
}
