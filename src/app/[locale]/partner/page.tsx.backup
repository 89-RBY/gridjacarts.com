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

  const fetchPartnerData = async () => {
    try {
      // Fetch dashboard data
      const dashboardRes = await fetch('/api/partner/dashboard');
      if (dashboardRes.ok) {
        const dashboardData = await dashboardRes.json();
        setPartner(dashboardData.partner);
        setTierProgress(dashboardData.tierProgress);
        setBonusServices(dashboardData.bonusServices || []);
        setOrders(dashboardData.orders || []);
      }

      // Fetch services pricing
      const servicesRes = await fetch('/api/partner/services');
      if (servicesRes.ok) {
        const servicesData = await servicesRes.json();
        setServices(servicesData.services || []);
      }
    } catch (error) {
      console.error('Error fetching partner data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push(`/${locale}/login`);
  };

  useEffect(() => {
    checkAuth();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user && user.role === 'partner') {
      fetchPartnerData();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

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
      basePrice: 'Preț Client',
      markup: 'Sconto (%)',
      finalPrice: 'Cost Partener',
      description: 'Prețurile fixe pentru clienți și costurile tale ca partener (după aplicarea scontului tier).',
    },
    en: {
      title: 'Partner Portal',
      welcome: 'Welcome',
      pricing: 'Service Pricing',
      service: 'Service',
      basePrice: 'Client Price',
      markup: 'Discount (%)',
      finalPrice: 'Partner Cost',
      description: 'Fixed client prices and your partner costs (after tier discount).',
    },
    it: {
      title: 'Portale Partner',
      welcome: 'Benvenuto',
      pricing: 'Prezzi Servizi',
      service: 'Servizio',
      basePrice: 'Prezzo Cliente',
      markup: 'Sconto (%)',
      finalPrice: 'Costo Partner',
      description: 'Prezzi fissi per i clienti e i tuoi costi da partner (dopo lo sconto tier).',
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
              {services.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-gray-500">
                    {locale === 'ro' && 'Se încarcă prețurile...'}
                    {locale === 'en' && 'Loading pricing...'}
                    {locale === 'it' && 'Caricamento prezzi...'}
                  </td>
                </tr>
              ) : (
                services.map((service) => {
                  const price = locale === 'ro' ? service.priceRo : locale === 'it' ? service.priceIt : service.priceEn;
                  const discount = partner?.currentTier ? (partner.currentTier === 'BRONZE' ? 15 : partner.currentTier === 'SILVER' ? 20 : partner.currentTier === 'GOLD' ? 25 : 30) : 15;
                  const partnerCost = price * (1 - discount / 100);

                  return (
                    <tr key={service.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 font-medium">{service.serviceName}</td>
                      <td className="px-6 py-4 text-right text-gray-500">
                        €{price.toFixed(2)}
                      </td>
                      <td className="px-6 py-4 text-right text-green-600">
                        -{discount}%
                      </td>
                      <td className="px-6 py-4 text-right font-semibold text-green-600">
                        €{partnerCost.toFixed(2)}
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </main>
    </div>
  );
}
