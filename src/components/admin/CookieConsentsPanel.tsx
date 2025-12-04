'use client';

import { useState, useEffect } from 'react';
import { Download, Trash2, Search, Filter, Cookie } from 'lucide-react';

interface CookieConsent {
  id: string;
  sessionId: string;
  userId: string | null;
  ipAddress: string | null;
  necessary: boolean;
  analytics: boolean;
  marketing: boolean;
  preferences: boolean;
  locale: string;
  consentDate: string;
  expiresAt: string;
  consentVersion: string;
}

interface Stats {
  total: number;
  analytics: number;
  marketing: number;
  preferences: number;
  byLocale: Record<string, number>;
}

export default function CookieConsentsPanel() {
  const [consents, setConsents] = useState<CookieConsent[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterLocale, setFilterLocale] = useState('all');

  useEffect(() => {
    fetchConsents();
  }, []);

  const fetchConsents = async () => {
    try {
      const res = await fetch('/api/admin/cookie-consents');
      const data = await res.json();
      setConsents(data.consents);
      setStats(data.stats);
    } catch (error) {
      console.error('Error fetching consents:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleExportCSV = () => {
    window.open('/api/admin/cookie-consents?export=csv', '_blank');
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this consent record?')) return;

    try {
      const res = await fetch(`/api/admin/cookie-consents?id=${id}`, {
        method: 'DELETE',
      });

      if (res.ok) {
        fetchConsents();
      }
    } catch (error) {
      console.error('Error deleting consent:', error);
    }
  };

  const filteredConsents = consents.filter(consent => {
    const matchesSearch =
      consent.sessionId.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (consent.userId && consent.userId.toLowerCase().includes(searchTerm.toLowerCase())) ||
      (consent.ipAddress && consent.ipAddress.toLowerCase().includes(searchTerm.toLowerCase()));

    const matchesLocale = filterLocale === 'all' || consent.locale === filterLocale;

    return matchesSearch && matchesLocale;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center p-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Stats Cards */}
      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="flex items-center gap-3">
              <div className="p-3 bg-primary-100 dark:bg-primary-900/30 rounded-lg">
                <Cookie className="w-6 h-6 text-primary-600" />
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">Total Consents</p>
                <p className="text-2xl font-bold text-gray-900 dark:text-white">{stats.total}</p>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Analytics</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-600 h-2 rounded-full"
                    style={{ width: `${(stats.analytics / stats.total * 100)}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{Math.round(stats.analytics / stats.total * 100)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Marketing</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-green-600 h-2 rounded-full"
                    style={{ width: `${(stats.marketing / stats.total * 100)}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{Math.round(stats.marketing / stats.total * 100)}%</span>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div>
              <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Preferences</p>
              <div className="flex items-center gap-2">
                <div className="flex-1 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-purple-600 h-2 rounded-full"
                    style={{ width: `${(stats.preferences / stats.total * 100)}%` }}
                  />
                </div>
                <span className="text-sm font-semibold">{Math.round(stats.preferences / stats.total * 100)}%</span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Filters and Actions */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
        <div className="flex flex-wrap gap-4 items-center">
          <div className="flex-1 min-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search by session, user, or IP..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-5 h-5 text-gray-400" />
            <select
              value={filterLocale}
              onChange={(e) => setFilterLocale(e.target.value)}
              className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-gray-900 dark:text-white"
            >
              <option value="all">All Locales</option>
              <option value="ro">Romanian</option>
              <option value="en">English</option>
              <option value="it">Italian</option>
            </select>
          </div>

          <button
            onClick={handleExportCSV}
            className="btn-primary inline-flex items-center gap-2 px-4 py-2"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>
      </div>

      {/* Consents Table */}
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 dark:bg-gray-700">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Session / User
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  IP Address
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Consents
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Locale
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {filteredConsents.map((consent) => (
                <tr key={consent.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm">
                      <div className="font-mono text-xs text-gray-500 dark:text-gray-400">
                        {consent.sessionId.substring(0, 20)}...
                      </div>
                      {consent.userId && (
                        <div className="text-primary-600 font-medium mt-1">
                          User: {consent.userId.substring(0, 8)}...
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {consent.ipAddress || 'N/A'}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-1">
                      {consent.analytics && (
                        <span className="px-2 py-1 text-xs bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-300 rounded">
                          Analytics
                        </span>
                      )}
                      {consent.marketing && (
                        <span className="px-2 py-1 text-xs bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-300 rounded">
                          Marketing
                        </span>
                      )}
                      {consent.preferences && (
                        <span className="px-2 py-1 text-xs bg-purple-100 dark:bg-purple-900/30 text-purple-800 dark:text-purple-300 rounded">
                          Preferences
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white uppercase">
                    {consent.locale}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                    {new Date(consent.consentDate).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <button
                      onClick={() => handleDelete(consent.id)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredConsents.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No cookie consents found
          </div>
        )}
      </div>
    </div>
  );
}
