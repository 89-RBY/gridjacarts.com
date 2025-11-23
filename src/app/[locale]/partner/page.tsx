'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { LogOut, DollarSign, TrendingUp, Gift, Award, Package } from 'lucide-react';
import Logo from '@/components/Logo';
import { User, Partner, ServicePricing, BonusService, Order } from '@/types';

export default function PartnerPortal({ params: { locale } }: { params: { locale: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [services, setServices] = useState<ServicePricing[]>([]);
  const [bonusServices, setBonusServices] = useState<BonusService[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [tierProgress, setTierProgress] = useState<any>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user && user.role === 'partner') {
      fetchPartnerData();
    }
  }, [user]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();

      if (!res.ok || data.user?.role !== 'partner') {
        router.push(`/${locale}/login`);
        return;
      }

      setUser(data.user);
    } catch {
      router.push(`/${locale}/login`);
    } finally {
      setLoading(false);
    }
  };

  const fetchPricing = async () => {
    const res = await fetch('/api/services');
    const data = await res.json();
    if (res.ok) setPricing(data.pricing);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push(`/${locale}/login`);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  const labels = {
    ro: {
      title: 'Portal Parteneri',
      welcome: 'Bine ai venit',
      pricing: 'Prețuri Servicii',
      service: 'Serviciu',
      basePrice: 'Preț Bază',
      markup: 'Adaos (%)',
      finalPrice: 'Preț Final',
      description: 'Aici găsești prețurile noastre de bază cu adaosul tău de partener. Poți folosi aceste prețuri pentru a-ți calcula ofertele către clienți.',
    },
    en: {
      title: 'Partner Portal',
      welcome: 'Welcome',
      pricing: 'Service Pricing',
      service: 'Service',
      basePrice: 'Base Price',
      markup: 'Markup (%)',
      finalPrice: 'Final Price',
      description: 'Here you can find our base prices with your partner markup. You can use these prices to calculate your offers to clients.',
    },
    it: {
      title: 'Portale Partner',
      welcome: 'Benvenuto',
      pricing: 'Prezzi Servizi',
      service: 'Servizio',
      basePrice: 'Prezzo Base',
      markup: 'Margine (%)',
      finalPrice: 'Prezzo Finale',
      description: 'Qui trovi i nostri prezzi base con il tuo margine partner. Puoi usare questi prezzi per calcolare le tue offerte ai clienti.',
    },
  };

  const t = labels[locale as keyof typeof labels] || labels.en;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Header */}
      <header className="bg-white dark:bg-gray-800 shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <Logo size="md" />
          <div className="flex items-center gap-4">
            <span className="text-gray-600 dark:text-gray-300">
              {t.welcome}, {user?.name}
            </span>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 text-red-600 hover:text-red-800"
            >
              <LogOut className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {t.title}
          </h1>
        </div>

        {/* Pricing Info */}
        <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-6 mb-8 text-white">
          <div className="flex items-center gap-4 mb-4">
            <DollarSign className="w-10 h-10" />
            <h2 className="text-2xl font-semibold">{t.pricing}</h2>
          </div>
          <p className="text-white/90">{t.description}</p>
        </div>

        {/* Pricing Table */}
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-medium">{t.service}</th>
                <th className="px-6 py-4 text-right text-sm font-medium">{t.basePrice}</th>
                <th className="px-6 py-4 text-right text-sm font-medium">{t.markup}</th>
                <th className="px-6 py-4 text-right text-sm font-medium">{t.finalPrice}</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {pricing.map((item) => (
                <tr key={item.serviceId} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                  <td className="px-6 py-4 font-medium">{item.serviceName}</td>
                  <td className="px-6 py-4 text-right text-gray-500">
                    €{item.basePrice.toFixed(2)}
                  </td>
                  <td className="px-6 py-4 text-right text-yellow-600">
                    +{item.partnerMarkup}%
                  </td>
                  <td className="px-6 py-4 text-right font-semibold text-green-600">
                    €{item.finalPrice.toFixed(2)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
