'use client';

import { useState, useEffect } from 'react';
import { Cookie, X, Settings, Check } from 'lucide-react';

interface CookieBannerProps {
  locale: string;
}

interface ConsentPreferences {
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
}

export default function CookieBanner({ locale }: CookieBannerProps) {
  const [showBanner, setShowBanner] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [consent, setConsent] = useState<ConsentPreferences>({
    necessary: true,
    analytics: false,
    marketing: false,
    preferences: false,
  });

  // Translations
  const t = {
    ro: {
      title: 'Politica de Cookie-uri',
      description: 'Folosim cookie-uri pentru a îmbunătăți experiența ta pe site-ul nostru. Alege ce cookie-uri accepți.',
      acceptAll: 'Accept Toate',
      acceptSelected: 'Salvează Preferințele',
      customize: 'Personalizează',
      necessary: 'Cookie-uri Necesare',
      necessaryDesc: 'Esențiale pentru funcționarea site-ului',
      analytics: 'Cookie-uri Analitice',
      analyticsDesc: 'Ne ajută să înțelegem cum folosești site-ul',
      marketing: 'Cookie-uri Marketing',
      marketingDesc: 'Utilizate pentru publicitate personalizată',
      preferencesLabel: 'Cookie-uri de Preferințe',
      preferencesDesc: 'Salvează setările tale',
    },
    en: {
      title: 'Cookie Policy',
      description: 'We use cookies to improve your experience on our website. Choose which cookies you accept.',
      acceptAll: 'Accept All',
      acceptSelected: 'Save Preferences',
      customize: 'Customize',
      necessary: 'Necessary Cookies',
      necessaryDesc: 'Essential for website functionality',
      analytics: 'Analytics Cookies',
      analyticsDesc: 'Help us understand how you use the site',
      marketing: 'Marketing Cookies',
      marketingDesc: 'Used for personalized advertising',
      preferencesLabel: 'Preference Cookies',
      preferencesDesc: 'Save your settings',
    },
    it: {
      title: 'Politica sui Cookie',
      description: 'Utilizziamo i cookie per migliorare la tua esperienza sul nostro sito. Scegli quali cookie accettare.',
      acceptAll: 'Accetta Tutti',
      acceptSelected: 'Salva Preferenze',
      customize: 'Personalizza',
      necessary: 'Cookie Necessari',
      necessaryDesc: 'Essenziali per il funzionamento del sito',
      analytics: 'Cookie Analitici',
      analyticsDesc: 'Ci aiutano a capire come usi il sito',
      marketing: 'Cookie di Marketing',
      marketingDesc: 'Utilizzati per pubblicità personalizzata',
      preferencesLabel: 'Cookie di Preferenze',
      preferencesDesc: 'Salvano le tue impostazioni',
    },
  };

  const text = t[locale as keyof typeof t] || t.en;

  useEffect(() => {
    // Generate or retrieve session ID
    let sid = localStorage.getItem('cookie_session_id');
    if (!sid) {
      sid = `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('cookie_session_id', sid);
    }
    setSessionId(sid);

    // Check if user has already given consent
    fetch(`/api/cookie-consent?sessionId=${sid}`)
      .then(res => res.json())
      .then(data => {
        if (!data.consent || data.isExpired) {
          setShowBanner(true);
        } else {
          setConsent(data.consent);
        }
      })
      .catch(() => setShowBanner(true));
  }, []);

  const saveConsent = async (preferences: ConsentPreferences) => {
    if (!sessionId) return;

    try {
      const response = await fetch('/api/cookie-consent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          sessionId,
          ...preferences,
          locale,
        }),
      });

      if (response.ok) {
        setConsent(preferences);
        setShowBanner(false);
        setShowSettings(false);

        // Store in localStorage for quick check
        localStorage.setItem('cookie_consent', JSON.stringify(preferences));
        localStorage.setItem('cookie_consent_date', new Date().toISOString());
      }
    } catch (error) {
      console.error('Error saving cookie consent:', error);
    }
  };

  const handleAcceptAll = () => {
    saveConsent({
      necessary: true,
      analytics: true,
      marketing: true,
      preferences: true,
    });
  };

  const handleAcceptSelected = () => {
    saveConsent(consent);
  };

  const handleRejectAll = () => {
    saveConsent({
      necessary: true,
      analytics: false,
      marketing: false,
      preferences: false,
    });
  };

  if (!showBanner) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center pointer-events-none">
      <div className="pointer-events-auto w-full max-w-4xl mx-4 mb-4">
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Main Banner */}
          {!showSettings ? (
            <div className="p-6">
              <div className="flex items-start gap-4">
                <div className="flex-shrink-0">
                  <Cookie className="w-8 h-8 text-primary-600" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">
                    {text.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">
                    {text.description}
                  </p>
                  <div className="flex flex-wrap gap-3">
                    <button
                      onClick={handleAcceptAll}
                      className="btn-primary px-6 py-2 inline-flex items-center gap-2"
                    >
                      <Check className="w-4 h-4" />
                      {text.acceptAll}
                    </button>
                    <button
                      onClick={handleRejectAll}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                    >
                      {locale === 'ro' ? 'Doar Necesare' : locale === 'en' ? 'Only Necessary' : 'Solo Necessari'}
                    </button>
                    <button
                      onClick={() => setShowSettings(true)}
                      className="px-6 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors inline-flex items-center gap-2"
                    >
                      <Settings className="w-4 h-4" />
                      {text.customize}
                    </button>
                  </div>
                </div>
                <button
                  onClick={() => setShowBanner(false)}
                  className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
            </div>
          ) : (
            // Settings Panel
            <div className="p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                  {text.customize}
                </h3>
                <button
                  onClick={() => setShowSettings(false)}
                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>

              <div className="space-y-4">
                {/* Necessary Cookies */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={true}
                    disabled
                    className="mt-1 w-5 h-5 rounded"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {text.necessary}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {text.necessaryDesc}
                    </p>
                  </div>
                </div>

                {/* Analytics Cookies */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={consent.analytics}
                    onChange={(e) => setConsent({ ...consent, analytics: e.target.checked })}
                    className="mt-1 w-5 h-5 rounded accent-primary-600"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {text.analytics}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {text.analyticsDesc}
                    </p>
                  </div>
                </div>

                {/* Marketing Cookies */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={consent.marketing}
                    onChange={(e) => setConsent({ ...consent, marketing: e.target.checked })}
                    className="mt-1 w-5 h-5 rounded accent-primary-600"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {text.marketing}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {text.marketingDesc}
                    </p>
                  </div>
                </div>

                {/* Preferences Cookies */}
                <div className="flex items-start gap-4 p-4 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                  <input
                    type="checkbox"
                    checked={consent.preferences}
                    onChange={(e) => setConsent({ ...consent, preferences: e.target.checked })}
                    className="mt-1 w-5 h-5 rounded accent-primary-600"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 dark:text-white">
                      {text.preferencesLabel}
                    </h4>
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      {text.preferencesDesc}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  onClick={handleAcceptSelected}
                  className="flex-1 btn-primary py-3"
                >
                  {text.acceptSelected}
                </button>
                <button
                  onClick={handleAcceptAll}
                  className="flex-1 px-6 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
                >
                  {text.acceptAll}
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
