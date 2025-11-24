'use client';

import { X, Package, DollarSign, Calendar, CheckCircle, XCircle, Info } from 'lucide-react';

interface ServiceDetailsModalProps {
  service: {
    id: string;
    serviceType: string;
    serviceName: string;
    category: string;
    priceRo: number;
    priceIt: number;
    priceEn: number;
    description: string;
    isActive: boolean;
    isRecurring: boolean;
    createdAt: string;
    updatedAt: string;
  };
  onClose: () => void;
  locale?: string;
}

export default function ServiceDetailsModal({ service, onClose, locale = 'ro' }: ServiceDetailsModalProps) {
  // Get price based on locale
  const getPrice = () => {
    switch (locale) {
      case 'it':
        return service.priceIt;
      case 'en':
        return service.priceEn;
      default:
        return service.priceRo;
    }
  };

  const price = getPrice();

  const translations = {
    ro: {
      title: 'Detalii Serviciu',
      serviceInfo: 'Informații Serviciu',
      pricing: 'Prețuri',
      status: 'Status',
      type: 'Tip',
      category: 'Categorie',
      recurring: 'Recurent',
      active: 'Activ',
      inactive: 'Inactiv',
      yes: 'Da',
      no: 'Nu',
      description: 'Descriere',
      noDescription: 'Nu există descriere disponibilă pentru acest serviciu.',
      priceRomania: 'Preț România',
      priceItaly: 'Preț Italia',
      priceInternational: 'Preț Internațional',
      created: 'Creat',
      updated: 'Actualizat',
      close: 'Închide',
    },
    it: {
      title: 'Dettagli Servizio',
      serviceInfo: 'Informazioni Servizio',
      pricing: 'Prezzi',
      status: 'Stato',
      type: 'Tipo',
      category: 'Categoria',
      recurring: 'Ricorrente',
      active: 'Attivo',
      inactive: 'Inattivo',
      yes: 'Sì',
      no: 'No',
      description: 'Descrizione',
      noDescription: 'Nessuna descrizione disponibile per questo servizio.',
      priceRomania: 'Prezzo Romania',
      priceItaly: 'Prezzo Italia',
      priceInternational: 'Prezzo Internazionale',
      created: 'Creato',
      updated: 'Aggiornato',
      close: 'Chiudi',
    },
    en: {
      title: 'Service Details',
      serviceInfo: 'Service Information',
      pricing: 'Pricing',
      status: 'Status',
      type: 'Type',
      category: 'Category',
      recurring: 'Recurring',
      active: 'Active',
      inactive: 'Inactive',
      yes: 'Yes',
      no: 'No',
      description: 'Description',
      noDescription: 'No description available for this service.',
      priceRomania: 'Price Romania',
      priceItaly: 'Price Italy',
      priceInternational: 'Price International',
      created: 'Created',
      updated: 'Updated',
      close: 'Close',
    },
  };

  const t = translations[locale as keyof typeof translations] || translations.ro;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex justify-between items-start">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Package className="w-6 h-6 text-primary-500" />
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                {service.serviceName}
              </h2>
              {service.isActive ? (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  {t.active}
                </span>
              ) : (
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400 flex items-center gap-1">
                  <XCircle className="w-3 h-3" />
                  {t.inactive}
                </span>
              )}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              {t.category}: {service.category}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          {/* Description */}
          <div>
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-primary-500" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                {t.description}
              </h3>
            </div>
            {service.description ? (
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed whitespace-pre-wrap bg-gray-50 dark:bg-gray-900 p-4 rounded-lg">
                {service.description}
              </p>
            ) : (
              <p className="text-gray-500 dark:text-gray-400 italic">
                {t.noDescription}
              </p>
            )}
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {/* Service Info */}
            <div>
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                {t.serviceInfo}
              </h3>
              <div className="space-y-3">
                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {t.type}
                  </label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1 font-mono">
                    {service.serviceType}
                  </p>
                </div>

                <div>
                  <label className="text-xs text-gray-500 dark:text-gray-400 uppercase tracking-wide">
                    {t.recurring}
                  </label>
                  <p className="text-sm font-medium text-gray-900 dark:text-white mt-1">
                    {service.isRecurring ? t.yes : t.no}
                  </p>
                </div>

                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="flex items-center gap-2 text-gray-500 dark:text-gray-400 mb-2">
                    <Calendar className="w-4 h-4" />
                    <label className="text-xs uppercase tracking-wide">Date</label>
                  </div>
                  <div className="space-y-2 text-sm">
                    <div>
                      <span className="text-gray-500">{t.created}:</span>{' '}
                      <span className="text-gray-900 dark:text-white">
                        {new Date(service.createdAt).toLocaleDateString()}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-500">{t.updated}:</span>{' '}
                      <span className="text-gray-900 dark:text-white">
                        {new Date(service.updatedAt).toLocaleDateString()}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Pricing */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <DollarSign className="w-5 h-5 text-primary-500" />
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {t.pricing}
                </h3>
              </div>
              <div className="space-y-3">
                <div className="bg-gradient-to-r from-primary-50 to-accent-50 dark:from-primary-900/20 dark:to-accent-900/20 p-6 rounded-lg border-2 border-primary-200 dark:border-primary-700">
                  <label className="text-sm text-gray-600 dark:text-gray-400 uppercase tracking-wide flex items-center gap-2 mb-2">
                    {locale === 'ro' && '🇷🇴'}
                    {locale === 'it' && '🇮🇹'}
                    {locale === 'en' && '🌍'}
                    {locale === 'ro' ? t.priceRomania : locale === 'it' ? t.priceItaly : t.priceInternational}
                  </label>
                  <p className="text-4xl font-bold text-primary-600 dark:text-primary-400">
                    €{price.toFixed(2)}
                  </p>
                  {service.isRecurring && (
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                      {locale === 'ro' ? 'per lună' : locale === 'it' ? 'al mese' : 'per month'}
                    </p>
                  )}
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700 rounded-lg p-3">
                  <p className="text-xs text-blue-800 dark:text-blue-300">
                    {locale === 'ro' && 'ℹ️ Preț afișat pentru regiunea ta'}
                    {locale === 'it' && 'ℹ️ Prezzo mostrato per la tua regione'}
                    {locale === 'en' && 'ℹ️ Price shown for your region'}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="p-6 border-t border-gray-200 dark:border-gray-700 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors font-medium"
          >
            {t.close}
          </button>
        </div>
      </div>
    </div>
  );
}
