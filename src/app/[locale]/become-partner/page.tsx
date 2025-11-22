'use client';

import { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import Logo from '@/components/Logo';

export default function BecomePartnerPage({ params: { locale } }: { params: { locale: string } }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    message: '',
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

  const labels = {
    ro: {
      title: 'Devino Partener',
      subtitle: 'Alătură-te rețelei noastre de parteneri și oferă servicii digitale premium clienților tăi.',
      companyName: 'Numele Companiei',
      contactPerson: 'Persoană de Contact',
      email: 'Email',
      phone: 'Telefon',
      address: 'Adresa',
      taxId: 'CUI/CIF',
      message: 'De ce vrei să devii partener?',
      submit: 'Trimite Aplicația',
      submitting: 'Se trimite...',
      successTitle: 'Aplicație Trimisă!',
      successMessage: 'Mulțumim pentru interesul tău! Te vom contacta în curând.',
      benefits: 'Beneficii Parteneriat',
      benefit1: 'Acces la prețuri preferențiale',
      benefit2: 'Markup personalizat pentru servicii',
      benefit3: 'Suport tehnic dedicat',
      benefit4: 'Training și resurse exclusive',
    },
    en: {
      title: 'Become a Partner',
      subtitle: 'Join our partner network and offer premium digital services to your clients.',
      companyName: 'Company Name',
      contactPerson: 'Contact Person',
      email: 'Email',
      phone: 'Phone',
      address: 'Address',
      taxId: 'Tax ID',
      message: 'Why do you want to become a partner?',
      submit: 'Submit Application',
      submitting: 'Submitting...',
      successTitle: 'Application Submitted!',
      successMessage: 'Thank you for your interest! We will contact you soon.',
      benefits: 'Partnership Benefits',
      benefit1: 'Access to preferential pricing',
      benefit2: 'Custom markup for services',
      benefit3: 'Dedicated technical support',
      benefit4: 'Exclusive training and resources',
    },
    it: {
      title: 'Diventa Partner',
      subtitle: 'Unisciti alla nostra rete di partner e offri servizi digitali premium ai tuoi clienti.',
      companyName: 'Nome Azienda',
      contactPerson: 'Persona di Contatto',
      email: 'Email',
      phone: 'Telefono',
      address: 'Indirizzo',
      taxId: 'Partita IVA',
      message: 'Perché vuoi diventare partner?',
      submit: 'Invia Candidatura',
      submitting: 'Invio in corso...',
      successTitle: 'Candidatura Inviata!',
      successMessage: 'Grazie per il tuo interesse! Ti contatteremo presto.',
      benefits: 'Vantaggi Partnership',
      benefit1: 'Accesso a prezzi preferenziali',
      benefit2: 'Margine personalizzato sui servizi',
      benefit3: 'Supporto tecnico dedicato',
      benefit4: 'Formazione e risorse esclusive',
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  if (submitted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-gray-800 p-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 max-w-md text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold mb-4">{t.successTitle}</h1>
          <p className="text-gray-600 dark:text-gray-300">{t.successMessage}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="section-padding bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
      <div className="container-custom">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-display font-bold mb-4 gradient-text">{t.title}</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">{t.subtitle}</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefits */}
            <div className="md:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-lg sticky top-24">
                <h3 className="text-lg font-semibold mb-4">{t.benefits}</h3>
                <ul className="space-y-3">
                  {[t.benefit1, t.benefit2, t.benefit3, t.benefit4].map((benefit, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-sm text-gray-600 dark:text-gray-300">{benefit}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="md:col-span-2">
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg space-y-6">
                {error && (
                  <div className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg text-red-700 dark:text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium mb-2">{t.companyName} *</label>
                  <input
                    type="text"
                    required
                    value={formData.companyName}
                    onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t.contactPerson} *</label>
                  <input
                    type="text"
                    required
                    value={formData.contactPerson}
                    onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.email} *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-2">{t.phone} *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t.address} *</label>
                  <input
                    type="text"
                    required
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t.taxId} *</label>
                  <input
                    type="text"
                    required
                    value={formData.taxId}
                    onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-2">{t.message} *</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full p-3 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary py-4 disabled:opacity-50 inline-flex items-center justify-center gap-2"
                >
                  {loading ? (
                    t.submitting
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      {t.submit}
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
