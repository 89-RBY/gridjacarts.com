'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LogOut,
  LayoutDashboard,
  ShoppingCart,
  Gift,
  FileText,
  DollarSign,
  User,
  TrendingUp,
  Award,
  Upload,
  Download,
  Menu,
  X,
} from 'lucide-react';
import Logo from '@/components/Logo';
import ContractModal from '@/components/ContractModal';
import { User as UserType, Partner, ServicePricing, BonusService, Order, Contract } from '@/types';

type TabType = 'dashboard' | 'orders' | 'bonuses' | 'contracts' | 'pricing' | 'profile';

export default function PartnerPortal({ params: { locale } }: { params: { locale: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<UserType | null>(null);
  const [partner, setPartner] = useState<Partner | null>(null);
  const [services, setServices] = useState<ServicePricing[]>([]);
  const [bonusServices, setBonusServices] = useState<BonusService[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [loading, setLoading] = useState(true);
  const [tierProgress, setTierProgress] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<TabType>('dashboard');
  const [uploading, setUploading] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
      const dashboardRes = await fetch('/api/partner/dashboard');
      if (dashboardRes.ok) {
        const dashboardData = await dashboardRes.json();
        setPartner(dashboardData.partner);
        setTierProgress(dashboardData.tierProgress);
        setBonusServices(dashboardData.bonusServices || []);
        setOrders(dashboardData.orders || []);
      }

      const servicesRes = await fetch('/api/partner/services');
      if (servicesRes.ok) {
        const servicesData = await servicesRes.json();
        setServices(servicesData.services || []);
      }

      const contractsRes = await fetch('/api/partner/contracts');
      if (contractsRes.ok) {
        const contractsData = await contractsRes.json();
        setContracts(contractsData.contracts || []);
      }
    } catch (error) {
      console.error('Error fetching partner data:', error);
    }
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push(`/${locale}/login`);
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('contractType', 'partnership');

      const res = await fetch('/api/partner/contracts', {
        method: 'POST',
        body: formData,
      });

      if (res.ok) {
        const data = await res.json();
        setContracts([data.contract, ...contracts]);
        alert(t.contractUploadSuccess);
      } else {
        alert(t.contractUploadError);
      }
    } catch (error) {
      console.error('Upload error:', error);
      alert(t.contractUploadError);
    } finally {
      setUploading(false);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user && user.role === 'partner') {
      fetchPartnerData();
    }
  }, [user]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-500" />
      </div>
    );
  }

  const t = translations[locale as keyof typeof translations] || translations.en;

  const tabs = [
    { id: 'dashboard' as TabType, label: t.dashboard, icon: LayoutDashboard },
    { id: 'orders' as TabType, label: t.orders, icon: ShoppingCart },
    { id: 'bonuses' as TabType, label: t.bonuses, icon: Gift },
    { id: 'contracts' as TabType, label: t.contracts, icon: FileText },
    { id: 'pricing' as TabType, label: t.pricing, icon: DollarSign },
    { id: 'profile' as TabType, label: t.profile, icon: User },
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case 'BRONZE': return 'text-amber-600 bg-amber-100';
      case 'SILVER': return 'text-gray-600 bg-gray-200';
      case 'GOLD': return 'text-yellow-600 bg-yellow-100';
      case 'PLATINUM': return 'text-purple-600 bg-purple-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
      case 'SIGNED':
        return 'text-green-600 bg-green-100';
      case 'PENDING':
        return 'text-yellow-600 bg-yellow-100';
      case 'IN_PROGRESS':
        return 'text-blue-600 bg-blue-100';
      case 'CANCELLED':
      case 'EXPIRED':
      case 'REJECTED':
        return 'text-red-600 bg-red-100';
      default:
        return 'text-gray-600 bg-gray-100';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      {/* Mobile menu button */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        className="fixed top-4 left-4 z-50 lg:hidden p-2 bg-gray-800 rounded-lg text-white"
      >
        {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-gray-800 border-r border-gray-700 z-40 transform transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full'
      } lg:translate-x-0`}>
        <div className="p-6 border-b border-gray-700">
          <Logo size="md" />
          <div className="mt-4 text-sm text-gray-400">{user?.name}</div>
          {partner && (
            <div className={`mt-2 inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold ${getTierColor(partner.currentTier)}`}>
              <Award className="w-3 h-3 mr-1" />
              {partner.currentTier}
            </div>
          )}
        </div>

        <nav className="p-4 space-y-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
                activeTab === tab.id ? 'bg-primary-600 text-white' : 'text-gray-300 hover:bg-gray-700'
              }`}
            >
              <tab.icon className="w-5 h-5" />
              {tab.label}
            </button>
          ))}
        </nav>

        <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-red-400 hover:bg-gray-700 transition-colors"
          >
            <LogOut className="w-5 h-5" />
            {t.logout}
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="lg:ml-64 p-4 lg:p-8">
        <div className="max-w-7xl mx-auto pt-16 lg:pt-0">
          {/* Dashboard Tab */}
          {activeTab === 'dashboard' && partner && tierProgress && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-white">{t.welcome}, {user?.name}!</h1>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{t.currentTier}</p>
                      <p className="text-2xl font-bold text-white mt-1">{tierProgress.currentTier}</p>
                    </div>
                    <Award className="w-10 h-10 text-amber-500" />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{t.annualRevenue}</p>
                      <p className="text-2xl font-bold text-white mt-1">€{(partner?.annualRevenue ?? 0).toFixed(2)}</p>
                    </div>
                    <TrendingUp className="w-10 h-10 text-green-500" />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{t.discount}</p>
                      <p className="text-2xl font-bold text-white mt-1">{tierProgress.discount}%</p>
                    </div>
                    <DollarSign className="w-10 h-10 text-primary-500" />
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">{t.totalOrders}</p>
                      <p className="text-2xl font-bold text-white mt-1">{orders.length}</p>
                    </div>
                    <ShoppingCart className="w-10 h-10 text-blue-500" />
                  </div>
                </div>
              </div>

              {/* Tier Progress */}
              {tierProgress.nextTier && (
                <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                  <h2 className="text-xl font-semibold text-white mb-4">{t.tierProgress}</h2>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm text-gray-400">
                      <span>{t.progressToNext} {tierProgress.nextTier}</span>
                      <span>{(tierProgress.progressPercent ?? 0).toFixed(0)}%</span>
                    </div>
                    <div className="w-full bg-gray-700 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-primary-500 to-accent-500 h-3 rounded-full transition-all"
                        style={{ width: `${tierProgress.progressPercent ?? 0}%` }}
                      />
                    </div>
                    <p className="text-sm text-gray-400">€{(tierProgress.remainingRevenue ?? 0).toFixed(2)} {t.toNextTier}</p>
                  </div>
                </div>
              )}

              {/* Recent Orders */}
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <h2 className="text-xl font-semibold text-white mb-4">{t.recentOrders}</h2>
                <div className="space-y-3">
                  {orders.slice(0, 5).map((order) => (
                    <div key={order.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between p-4 bg-gray-700 rounded-lg gap-2">
                      <div className="flex-1">
                        <p className="font-medium text-white">{order.serviceName}</p>
                        <p className="text-sm text-gray-400">{order.clientName}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-white font-semibold">€{(order.amount ?? 0).toFixed(2)}</span>
                        <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                          {order.status}
                        </span>
                      </div>
                    </div>
                  ))}
                  {orders.length === 0 && <p className="text-center text-gray-400 py-8">{t.noOrders}</p>}
                </div>
              </div>
            </div>
          )}

          {/* Orders Tab */}
          {activeTab === 'orders' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-white">{t.orders}</h1>
              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-4 text-left text-sm font-medium text-gray-300">{t.service}</th>
                      <th className="px-4 py-4 text-left text-sm font-medium text-gray-300">{t.client}</th>
                      <th className="px-4 py-4 text-right text-sm font-medium text-gray-300">{t.amount}</th>
                      <th className="px-4 py-4 text-right text-sm font-medium text-gray-300">{t.cost}</th>
                      <th className="px-4 py-4 text-center text-sm font-medium text-gray-300">{t.status}</th>
                      <th className="px-4 py-4 text-left text-sm font-medium text-gray-300">{t.date}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {orders.map((order) => (
                      <tr key={order.id} className="hover:bg-gray-700">
                        <td className="px-4 py-4 text-white">{order.serviceName}</td>
                        <td className="px-4 py-4 text-gray-300">{order.clientName}</td>
                        <td className="px-4 py-4 text-right text-white">€{(order.amount ?? 0).toFixed(2)}</td>
                        <td className="px-4 py-4 text-right text-green-400">€{(order.partnerCost ?? 0).toFixed(2)}</td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(order.status)}`}>
                            {order.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-400 whitespace-nowrap">
                          {new Date(order.orderDate).toLocaleDateString(locale)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {orders.length === 0 && <div className="text-center py-12 text-gray-400">{t.noOrders}</div>}
              </div>
            </div>
          )}

          {/* Bonuses Tab */}
          {activeTab === 'bonuses' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-white">{t.bonuses}</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {bonusServices.map((bonus) => (
                  <div key={bonus.id} className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                    <div className="flex items-start justify-between mb-4">
                      <Gift className="w-8 h-8 text-primary-500" />
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(bonus.status)}`}>
                        {bonus.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-white mb-2">{bonus.serviceName}</h3>
                    <p className="text-2xl font-bold text-primary-500 mb-4">€{(bonus.value ?? 0).toFixed(2)}</p>
                    <div className="text-sm text-gray-400 space-y-1">
                      <p>{t.assigned}: {new Date(bonus.assignedAt).toLocaleDateString(locale)}</p>
                      <p>{t.expires}: {new Date(bonus.expiresAt).toLocaleDateString(locale)}</p>
                    </div>
                  </div>
                ))}
                {bonusServices.length === 0 && (
                  <div className="col-span-full text-center py-12 text-gray-400">{t.noBonuses}</div>
                )}
              </div>
            </div>
          )}

          {/* Contracts Tab */}
          {activeTab === 'contracts' && (
            <div className="space-y-6">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <h1 className="text-3xl font-bold text-white">{t.contracts}</h1>
                <label className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 cursor-pointer transition-colors">
                  <Upload className="w-5 h-5" />
                  {uploading ? t.uploading : t.uploadContract}
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={handleFileUpload}
                    disabled={uploading}
                    className="hidden"
                  />
                </label>
              </div>

              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-4 text-left text-sm font-medium text-gray-300">{t.contractNumber}</th>
                      <th className="px-4 py-4 text-left text-sm font-medium text-gray-300">{t.fileName}</th>
                      <th className="px-4 py-4 text-left text-sm font-medium text-gray-300">{t.type}</th>
                      <th className="px-4 py-4 text-center text-sm font-medium text-gray-300">{t.status}</th>
                      <th className="px-4 py-4 text-left text-sm font-medium text-gray-300">{t.uploadedDate}</th>
                      <th className="px-4 py-4 text-center text-sm font-medium text-gray-300">{t.actions}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {contracts.map((contract) => (
                      <tr
                        key={contract.id}
                        className="hover:bg-gray-700 cursor-pointer"
                        onClick={() => setSelectedContract(contract)}
                      >
                        <td className="px-4 py-4 font-medium text-white whitespace-nowrap">{contract.contractNumber}</td>
                        <td className="px-4 py-4 text-gray-300">{contract.fileName}</td>
                        <td className="px-4 py-4 text-gray-300">{contract.contractType}</td>
                        <td className="px-4 py-4 text-center">
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${getStatusColor(contract.status)}`}>
                            {contract.status}
                          </span>
                        </td>
                        <td className="px-4 py-4 text-gray-400 whitespace-nowrap">
                          {new Date(contract.uploadedAt).toLocaleDateString(locale)}
                        </td>
                        <td className="px-4 py-4 text-center">
                          <a
                            href={contract.fileUrl}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-primary-400 hover:text-primary-300"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <Download className="w-4 h-4" />
                          </a>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                {contracts.length === 0 && <div className="text-center py-12 text-gray-400">{t.noContracts}</div>}
              </div>
            </div>
          )}
          {/* Pricing Tab */}
          {activeTab === 'pricing' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-white">{t.pricing}</h1>
              <div className="bg-gradient-to-r from-primary-600 to-accent-600 rounded-xl p-6 text-white">
                <h2 className="text-xl font-semibold mb-2">{t.pricingInfo}</h2>
                <p className="text-white/90">{t.pricingDescription}</p>
              </div>

              <div className="bg-gray-800 rounded-xl border border-gray-700 overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-700">
                    <tr>
                      <th className="px-4 py-4 text-left text-sm font-medium text-gray-300">{t.service}</th>
                      <th className="px-4 py-4 text-left text-sm font-medium text-gray-300">{t.category}</th>
                      <th className="px-4 py-4 text-right text-sm font-medium text-gray-300">{t.clientPrice}</th>
                      <th className="px-4 py-4 text-right text-sm font-medium text-gray-300">{t.yourDiscount}</th>
                      <th className="px-4 py-4 text-right text-sm font-medium text-gray-300">{t.yourCost}</th>
                      <th className="px-4 py-4 text-right text-sm font-medium text-gray-300">{t.yourMargin}</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-700">
                    {services.map((service) => {
                      const price = locale === 'ro' ? (service.priceRo ?? 0) : locale === 'it' ? (service.priceIt ?? 0) : (service.priceEn ?? 0);
                      const discount = partner?.currentTier
                        ? partner.currentTier === 'BRONZE' ? 15
                        : partner.currentTier === 'SILVER' ? 20
                        : partner.currentTier === 'GOLD' ? 25 : 30
                        : 15;
                      const partnerCost = price * (1 - discount / 100);
                      const margin = price - partnerCost;

                      return (
                        <tr key={service.id} className="hover:bg-gray-700">
                          <td className="px-4 py-4 font-medium text-white">{service.serviceName}</td>
                          <td className="px-4 py-4 text-gray-300">{service.category}</td>
                          <td className="px-4 py-4 text-right text-gray-300">€{price.toFixed(2)}</td>
                          <td className="px-4 py-4 text-right text-green-400">-{discount}%</td>
                          <td className="px-4 py-4 text-right text-white font-semibold">€{partnerCost.toFixed(2)}</td>
                          <td className="px-4 py-4 text-right text-green-400 font-semibold">€{margin.toFixed(2)}</td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
                {services.length === 0 && <div className="text-center py-12 text-gray-400">{t.noPricing}</div>}
              </div>
            </div>
          )}

          {/* Profile Tab */}
          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h1 className="text-3xl font-bold text-white">{t.profile}</h1>
              <div className="bg-gray-800 rounded-xl p-6 border border-gray-700">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.companyName}</label>
                    <p className="text-white">{partner?.companyName}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.contactPerson}</label>
                    <p className="text-white">{partner?.contactPerson}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.email}</label>
                    <p className="text-white">{partner?.email}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.phone}</label>
                    <p className="text-white">{partner?.phone}</p>
                  </div>
                  <div className="md:col-span-2">
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.address}</label>
                    <p className="text-white">{partner?.address}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.taxId}</label>
                    <p className="text-white">{partner?.taxId}</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-400 mb-2">{t.fiscalYear}</label>
                    <p className="text-white">
                      {partner?.fiscalYearStart && new Date(partner.fiscalYearStart).toLocaleDateString(locale)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Contract Modal */}
      {selectedContract && (
        <ContractModal
          contract={selectedContract}
          onClose={() => setSelectedContract(null)}
        />
      )}
    </div>
  );
}

const translations = {
  ro: {
    welcome: 'Bine ai venit',
    dashboard: 'Dashboard',
    orders: 'Comenzi',
    bonuses: 'Servicii Bonus',
    contracts: 'Contracte',
    pricing: 'Listino Prezzi',
    profile: 'Profil',
    logout: 'Logout',
    currentTier: 'Tier Curent',
    annualRevenue: 'Fatturato Anual',
    discount: 'Sconto',
    totalOrders: 'Total Comenzi',
    tierProgress: 'Progress Tier',
    progressToNext: 'Progress către',
    toNextTier: 'până la următorul tier',
    recentOrders: 'Comenzi Recente',
    noOrders: 'Nicio comandă încă',
    service: 'Serviciu',
    client: 'Client',
    amount: 'Sumă',
    cost: 'Cost',
    status: 'Status',
    date: 'Dată',
    assigned: 'Asignat',
    expires: 'Expiră',
    noBonuses: 'Niciun serviciu bonus',
    uploadContract: 'Încarcă Contract',
    uploading: 'Se încarcă...',
    contractNumber: 'Număr Contract',
    fileName: 'Nume Fișier',
    type: 'Tip',
    uploadedDate: 'Data Încărcării',
    actions: 'Acțiuni',
    noContracts: 'Niciun contract',
    contractUploadSuccess: 'Contract încărcat cu succes!',
    contractUploadError: 'Eroare la încărcarea contractului',
    pricingInfo: 'Informații Prețuri',
    pricingDescription: 'Prețurile fixe pentru clienți și costurile tale ca partener (după aplicarea scontului tier).',
    category: 'Categorie',
    clientPrice: 'Preț Client',
    yourDiscount: 'Sconto Tău',
    yourCost: 'Cost Tău',
    yourMargin: 'Marja Ta',
    noPricing: 'Niciun preț disponibil',
    companyName: 'Nume Companie',
    contactPerson: 'Persoană Contact',
    email: 'Email',
    phone: 'Telefon',
    address: 'Adresă',
    taxId: 'CUI',
    fiscalYear: 'An Fiscal',
  },
  en: {
    welcome: 'Welcome',
    dashboard: 'Dashboard',
    orders: 'Orders',
    bonuses: 'Bonus Services',
    contracts: 'Contracts',
    pricing: 'Pricing List',
    profile: 'Profile',
    logout: 'Logout',
    currentTier: 'Current Tier',
    annualRevenue: 'Annual Revenue',
    discount: 'Discount',
    totalOrders: 'Total Orders',
    tierProgress: 'Tier Progress',
    progressToNext: 'Progress to',
    toNextTier: 'to next tier',
    recentOrders: 'Recent Orders',
    noOrders: 'No orders yet',
    service: 'Service',
    client: 'Client',
    amount: 'Amount',
    cost: 'Cost',
    status: 'Status',
    date: 'Date',
    assigned: 'Assigned',
    expires: 'Expires',
    noBonuses: 'No bonus services',
    uploadContract: 'Upload Contract',
    uploading: 'Uploading...',
    contractNumber: 'Contract Number',
    fileName: 'File Name',
    type: 'Type',
    uploadedDate: 'Upload Date',
    actions: 'Actions',
    noContracts: 'No contracts',
    contractUploadSuccess: 'Contract uploaded successfully!',
    contractUploadError: 'Error uploading contract',
    pricingInfo: 'Pricing Information',
    pricingDescription: 'Fixed client prices and your partner costs (after tier discount).',
    category: 'Category',
    clientPrice: 'Client Price',
    yourDiscount: 'Your Discount',
    yourCost: 'Your Cost',
    yourMargin: 'Your Margin',
    noPricing: 'No pricing available',
    companyName: 'Company Name',
    contactPerson: 'Contact Person',
    email: 'Email',
    phone: 'Phone',
    address: 'Address',
    taxId: 'Tax ID',
    fiscalYear: 'Fiscal Year',
  },
  it: {
    welcome: 'Benvenuto',
    dashboard: 'Dashboard',
    orders: 'Ordini',
    bonuses: 'Servizi Bonus',
    contracts: 'Contratti',
    pricing: 'Listino Prezzi',
    profile: 'Profilo',
    logout: 'Logout',
    currentTier: 'Tier Attuale',
    annualRevenue: 'Fatturato Annuale',
    discount: 'Sconto',
    totalOrders: 'Ordini Totali',
    tierProgress: 'Progresso Tier',
    progressToNext: 'Progresso verso',
    toNextTier: 'al prossimo tier',
    recentOrders: 'Ordini Recenti',
    noOrders: 'Nessun ordine ancora',
    service: 'Servizio',
    client: 'Cliente',
    amount: 'Importo',
    cost: 'Costo',
    status: 'Stato',
    date: 'Data',
    assigned: 'Assegnato',
    expires: 'Scade',
    noBonuses: 'Nessun servizio bonus',
    uploadContract: 'Carica Contratto',
    uploading: 'Caricamento...',
    contractNumber: 'Numero Contratto',
    fileName: 'Nome File',
    type: 'Tipo',
    uploadedDate: 'Data Caricamento',
    actions: 'Azioni',
    noContracts: 'Nessun contratto',
    contractUploadSuccess: 'Contratto caricato con successo!',
    contractUploadError: 'Errore nel caricamento del contratto',
    pricingInfo: 'Informazioni Prezzi',
    pricingDescription: 'Prezzi fissi per i clienti e i tuoi costi da partner (dopo lo sconto tier).',
    category: 'Categoria',
    clientPrice: 'Prezzo Cliente',
    yourDiscount: 'Il Tuo Sconto',
    yourCost: 'Il Tuo Costo',
    yourMargin: 'Il Tuo Margine',
    noPricing: 'Nessun prezzo disponibile',
    companyName: 'Nome Azienda',
    contactPerson: 'Persona di Contatto',
    email: 'Email',
    phone: 'Telefono',
    address: 'Indirizzo',
    taxId: 'Partita IVA',
    fiscalYear: 'Anno Fiscale',
  },
};
