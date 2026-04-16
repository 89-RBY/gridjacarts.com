'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  FileText,
  Settings,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Briefcase,
  ClipboardList,
  Check,
  XCircle,
  Package,
  Mail,
  FileSignature,
  Cookie,
  Users,
  Rocket,
  Menu,
} from 'lucide-react';
import Logo from '@/components/Logo';
import ContractModal from '@/components/ContractModal';
import ServiceDetailsModal from '@/components/ServiceDetailsModal';
import CookieConsentsPanel from '@/components/admin/CookieConsentsPanel';
import TeamEditor from '@/components/admin/TeamEditor';
import ProductEditor from '@/components/admin/ProductEditor';
import { User, BlogPost, SiteSettings, Partner, PartnerApplication, ServicePricing, Contract, NewsletterSubscriber, TeamMember, Product } from '@/types';
import ImageUploader from '@/components/ImageUploader';

export const dynamic = 'force-dynamic';

export default function AdminDashboard({ params: { locale } }: { params: { locale: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [partners, setPartners] = useState<Partner[]>([]);
  const [applications, setApplications] = useState<PartnerApplication[]>([]);
  const [services, setServices] = useState<ServicePricing[]>([]);
  const [contracts, setContracts] = useState<Contract[]>([]);

  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [editingService, setEditingService] = useState<ServicePricing | null>(null);
  const [editingPartner, setEditingPartner] = useState<Partner | null>(null);
  const [editingContract, setEditingContract] = useState<Contract | null>(null);
  const [selectedContract, setSelectedContract] = useState<Contract | null>(null);
  const [selectedService, setSelectedService] = useState<ServicePricing | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [isCreatingService, setIsCreatingService] = useState(false);
  const [isCreatingPartner, setIsCreatingPartner] = useState(false);
  const [editingMember, setEditingMember] = useState<TeamMember | null>(null);
  const [isCreatingMember, setIsCreatingMember] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isCreatingProduct, setIsCreatingProduct] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });
  const [passwordMessage, setPasswordMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchAllData();
    }
  }, [user]);

  const checkAuth = async () => {
    try {
      const res = await fetch('/api/auth/me');
      const data = await res.json();
      if (!res.ok || data.user?.role !== 'admin') {
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

  const fetchAllData = async () => {
    await Promise.all([fetchPosts(), fetchSettings(), fetchPartners(), fetchApplications(), fetchServices(), fetchContracts(), fetchSubscribers(), fetchTeamMembers(), fetchProducts()]);
  };

  const fetchProducts = async () => {
    const res = await fetch('/api/admin/products');
    const data = await res.json();
    if (res.ok) setProducts(data.products);
  };

  const fetchPosts = async () => {
    const res = await fetch('/api/blog');
    const data = await res.json();
    if (res.ok) setPosts(data.posts);
  };

  const fetchSettings = async () => {
    const res = await fetch('/api/settings');
    const data = await res.json();
    if (res.ok) setSettings(data.settings);
  };

  const fetchPartners = async () => {
    const res = await fetch('/api/partners');
    const data = await res.json();
    if (res.ok) setPartners(data.partners);
  };

  const fetchApplications = async () => {
    const res = await fetch('/api/partner-applications');
    const data = await res.json();
    if (res.ok) setApplications(data.applications);
  };

  const fetchServices = async () => {
    const res = await fetch('/api/services');
    const data = await res.json();
    if (res.ok) setServices(data.services);
  };

  const fetchSubscribers = async () => {
    const res = await fetch('/api/newsletter');
    const data = await res.json();
    if (res.ok) setSubscribers(data.subscribers);
  };

  const fetchContracts = async () => {
    const res = await fetch('/api/admin/contracts');
    const data = await res.json();
    if (res.ok) setContracts(data.contracts);
  };

  const fetchTeamMembers = async () => {
    const res = await fetch('/api/team');
    const data = await res.json();
    if (res.ok) setTeamMembers(data.members);
  };

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push(`/${locale}/login`);
  };

  const handleSaveSettings = async () => {
    if (!settings) return;
    const res = await fetch('/api/settings', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(settings),
    });
    if (res.ok) alert('Settings saved!');
  };

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordMessage(null);

    // Validazione client-side
    if (passwordForm.newPassword !== passwordForm.confirmPassword) {
      setPasswordMessage({ type: 'error', text: 'New passwords do not match' });
      return;
    }

    if (passwordForm.newPassword.length < 6) {
      setPasswordMessage({ type: 'error', text: 'Password must be at least 6 characters' });
      return;
    }

    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          currentPassword: passwordForm.currentPassword,
          newPassword: passwordForm.newPassword,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setPasswordMessage({ type: 'success', text: 'Password changed successfully!' });
        setPasswordForm({ currentPassword: '', newPassword: '', confirmPassword: '' });
      } else {
        setPasswordMessage({ type: 'error', text: data.error || 'Failed to change password' });
      }
    } catch (error) {
      setPasswordMessage({ type: 'error', text: 'An error occurred. Please try again.' });
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Delete this post?')) return;
    const res = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
    if (res.ok) setPosts(posts.filter((p) => p.id !== id));
  };

  const handleSavePost = async (post: BlogPost) => {
    const res = await fetch('/api/blog', {
      method: post.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(post),
    });
    if (res.ok) {
      fetchPosts();
      setEditingPost(null);
      setIsCreating(false);
    }
  };

  const handleDeleteService = async (id: string) => {
    if (!confirm('Delete this service?')) return;
    const res = await fetch(`/api/services?id=${id}`, { method: 'DELETE' });
    if (res.ok) setServices(services.filter((s) => s.id !== id));
  };

  const handleSaveService = async (service: ServicePricing) => {
    const res = await fetch('/api/services', {
      method: service.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(service),
    });
    if (res.ok) {
      fetchServices();
      setEditingService(null);
      setIsCreatingService(false);
    }
  };

  const handleApplicationAction = async (id: string, action: 'approve' | 'reject', markup?: number) => {
    const res = await fetch('/api/partner-applications', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, action, markup }),
    });
    if (res.ok) {
      const data = await res.json();
      alert(data.message);
      fetchApplications();
      fetchPartners();
    }
  };

  const handleUpdatePartner = async (partner: Partner) => {
    const res = await fetch('/api/partners', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partner),
    });
    if (res.ok) {
      fetchPartners();
      setEditingPartner(null);
    }
  };

  const handleDeletePartner = async (id: string) => {
    if (!confirm('Delete this partner?')) return;
    const res = await fetch(`/api/partners?id=${id}`, { method: 'DELETE' });
    if (res.ok) setPartners(partners.filter((p) => p.id !== id));
  };

  const handleCreatePartner = async (partnerData: Record<string, unknown>) => {
    const res = await fetch('/api/partners', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(partnerData),
    });
    if (res.ok) {
      fetchPartners();
      setIsCreatingPartner(false);
      alert('Partner created!');
    } else {
      const data = await res.json();
      alert(data.error || 'Failed');
    }
  };

  const handleUpdateContract = async (contract: Contract) => {
    const res = await fetch('/api/admin/contracts', {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(contract),
    });
    if (res.ok) {
      fetchContracts();
      setEditingContract(null);
      alert('Contract updated successfully!');
    }
  };

  const handleDeleteContract = async (id: string) => {
    if (!confirm('Delete this contract?')) return;
    const res = await fetch(`/api/admin/contracts?id=${id}`, { method: 'DELETE' });
    if (res.ok) setContracts(contracts.filter((c) => c.id !== id));
  };

  const handleSaveMember = async (member: TeamMember) => {
    const res = await fetch('/api/team', {
      method: member.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(member),
    });
    if (res.ok) {
      fetchTeamMembers();
      setEditingMember(null);
      setIsCreatingMember(false);
    }
  };

  const handleDeleteMember = async (id: string) => {
    if (!confirm('Delete this member?')) return;
    const res = await fetch(`/api/team?id=${id}`, { method: 'DELETE' });
    if (res.ok || res.status === 404) setTeamMembers(teamMembers.filter((m) => m.id !== id));
  };

  const handleSaveProduct = async (product: Product) => {
    const res = await fetch('/api/admin/products', {
      method: product.id ? 'PUT' : 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(product),
    });
    if (res.ok) {
      fetchProducts();
      setEditingProduct(null);
      setIsCreatingProduct(false);
    } else {
      const data = await res.json().catch(() => ({}));
      alert(data.error || 'Failed to save project');
    }
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    const res = await fetch(`/api/admin/products?id=${id}`, { method: 'DELETE' });
    if (res.ok || res.status === 404) setProducts(products.filter((p) => p.id !== id));
  };

  const handleReseedProducts = async () => {
    if (!confirm('Load the 5 default projects (Leachatix, Watable AI, Cumparatura, VreauProaspat, Bestseller Copilot)? Existing projects with the same slug will be updated.')) return;
    const res = await fetch('/api/admin/products/reseed', { method: 'POST' });
    const data = await res.json();
    if (res.ok) {
      alert(data.message);
      fetchProducts();
    } else {
      alert(data.error || 'Failed to reseed projects');
    }
  };

  const handleRunMigration = async () => {
    if (!confirm('Run database migration? This will create the Product table and any missing SiteSettings columns. Safe to run multiple times.')) return;
    const res = await fetch('/api/admin/migrate', { method: 'POST' });
    const data = await res.json();
    if (res.ok) {
      alert(`Migration completed:\n\n${(data.log || []).join('\n')}`);
      fetchProducts();
      fetchSettings();
    } else {
      alert(`Migration failed: ${data.error}\n\nCompleted steps:\n${(data.log || []).join('\n')}`);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600" />
      </div>
    );
  }

  const newPost: BlogPost = {
    id: '',
    slug: '',
    slugs: { ro: '', en: '', it: '' },
    title: { ro: '', en: '', it: '' },
    content: { ro: '', en: '', it: '' },
    excerpt: { ro: '', en: '', it: '' },
    author: user?.name || 'Admin',
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: [],
    status: 'draft',
  };

  const newService: ServicePricing = {
    id: '',
    serviceType: '',
    serviceName: '',
    category: '',
    priceRo: 0,
    priceIt: 0,
    priceEn: 0,
    description: '',
    isActive: true,
    isRecurring: false,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const newMember: TeamMember = {
    id: '',
    name: '',
    roleRo: '',
    roleEn: '',
    roleIt: '',
    socialLinks: {},
    order: 0,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const newProduct: Product = {
    id: '',
    slug: '',
    name: '',
    tagline: { ro: '', en: '', it: '' },
    problem: { ro: '', en: '', it: '' },
    description: { ro: '', en: '', it: '' },
    features: { ro: [], en: [], it: [] },
    techStack: [],
    status: 'LIVE',
    category: '',
    metaTitle: { ro: '', en: '', it: '' },
    metaDescription: { ro: '', en: '', it: '' },
    featured: false,
    order: products.length,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };

  const pendingApplications = applications.filter((a) => a.status === 'pending').length;

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-40 transition-transform duration-300 ${
        sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}>
        <div className="p-6 flex items-center justify-between">
          <Logo size="md" />
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        <nav className="mt-6">
          {[
            { id: 'dashboard', icon: LayoutDashboard, label: 'Dashboard' },
            { id: 'applications', icon: ClipboardList, label: 'Applications', badge: pendingApplications },
            { id: 'partners', icon: Briefcase, label: 'Partners' },
            { id: 'services', icon: Package, label: 'Services' },
            { id: 'projects', icon: Rocket, label: 'Projects' },
            { id: 'contracts', icon: FileSignature, label: 'Contracts' },
            { id: 'blog', icon: FileText, label: 'Blog' },
            { id: 'newsletter', icon: Mail, label: 'Newsletter' },
            { id: 'team', icon: Users, label: 'Team' },
            { id: 'cookies', icon: Cookie, label: 'Cookie Consents' },
            { id: 'settings', icon: Settings, label: 'Settings' },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setSidebarOpen(false); // Close sidebar on mobile when tab clicked
              }}
              className={`w-full flex items-center justify-between px-6 py-3 text-left ${activeTab === item.id
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 border-r-4 border-primary-600'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
                }`}
            >
              <div className="flex items-center gap-3">
                <item.icon className="w-5 h-5" />
                {item.label}
              </div>
              {item.badge ? (
                <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">{item.badge}</span>
              ) : null}
            </button>
          ))}
        </nav>
        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main content */}
      <main className="lg:ml-64 p-4 md:p-8">
        {/* Mobile header with hamburger */}
        <div className="lg:hidden mb-4 flex items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
          >
            <Menu className="w-6 h-6" />
          </button>
          <h1 className="text-xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
        </div>

        {/* Desktop header */}
        <div className="hidden lg:block mb-8">
          <h1 className="text-3xl font-bold">{activeTab.charAt(0).toUpperCase() + activeTab.slice(1)}</h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">Welcome, {user?.name}</p>
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-2">Posts</h3>
                <p className="text-3xl font-bold text-primary-600">{posts.length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-2">Partners</h3>
                <p className="text-3xl font-bold text-green-600">{partners.length}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-2">Pending</h3>
                <p className="text-3xl font-bold text-yellow-600">{pendingApplications}</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-2">Services</h3>
                <p className="text-3xl font-bold text-purple-600">{services.length}</p>
              </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-2">Newsletter Subscribers</h3>
                <p className="text-3xl font-bold text-blue-600">{subscribers.filter(s => s.status === 'active').length}</p>
                <p className="text-sm text-gray-500 mt-2">Active subscribers</p>
              </div>
              <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
                <h3 className="text-lg font-semibold mb-2">Unsubscribed</h3>
                <p className="text-3xl font-bold text-gray-400">{subscribers.filter(s => s.status === 'unsubscribed').length}</p>
                <p className="text-sm text-gray-500 mt-2">Total unsubscribed</p>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'applications' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Partner Applications</h2>
            </div>
            {applications.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No applications</div>
            ) : (
              <div className="divide-y">
                {applications.map((app) => (
                  <div key={app.id} className="p-6">
                    <div className="flex justify-between">
                      <div>
                        <h3 className="font-semibold text-lg">{app.companyName}</h3>
                        <p className="text-gray-600">{app.contactPerson}</p>
                        <p className="text-sm text-gray-500">
                          {app.email} | {app.phone}
                        </p>
                        <p className="text-sm text-gray-500">{app.address}</p>
                        <p className="text-sm text-gray-500">Tax ID: {app.taxId}</p>
                        <p className="mt-2 text-sm">{app.message}</p>
                      </div>
                      <div className="flex flex-col items-end gap-2">
                        <span
                          className={`px-3 py-1 rounded-full text-sm ${app.status === 'pending'
                            ? 'bg-yellow-100 text-yellow-800'
                            : app.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {app.status}
                        </span>
                        {app.status === 'pending' && (
                          <div className="flex gap-2 mt-2">
                            <button
                              onClick={() => {
                                const markup = prompt('Markup %:', '20');
                                if (markup) handleApplicationAction(app.id, 'approve', Number(markup));
                              }}
                              className="flex items-center gap-1 px-3 py-1 bg-green-600 text-white rounded"
                            >
                              <Check className="w-4 h-4" /> Approve
                            </button>
                            <button
                              onClick={() => handleApplicationAction(app.id, 'reject')}
                              className="flex items-center gap-1 px-3 py-1 bg-red-600 text-white rounded"
                            >
                              <XCircle className="w-4 h-4" /> Reject
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}

        {activeTab === 'partners' && !editingPartner && !isCreatingPartner && (
          <div>
            <button
              onClick={() => setIsCreatingPartner(true)}
              className="mb-6 btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> New Partner
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium whitespace-nowrap">Company</th>
                    <th className="px-6 py-3 text-left text-sm font-medium whitespace-nowrap">Contact</th>
                    <th className="px-6 py-3 text-center text-sm font-medium whitespace-nowrap">Markup</th>
                    <th className="px-6 py-3 text-center text-sm font-medium whitespace-nowrap">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-medium whitespace-nowrap">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {partners.map((partner) => (
                    <tr key={partner.id}>
                      <td className="px-6 py-4 font-medium">{partner.companyName}</td>
                      <td className="px-6 py-4">{partner.contactPerson}</td>
                      <td className="px-6 py-4 text-center font-semibold text-primary-600">{partner.markup}%</td>
                      <td className="px-6 py-4 text-center">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${partner.status === 'approved' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}
                        >
                          {partner.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => setEditingPartner(partner)} className="text-primary-600 mr-3">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDeletePartner(partner.id)} className="text-red-600">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'partners' && isCreatingPartner && (
          <PartnerForm onSave={handleCreatePartner} onCancel={() => setIsCreatingPartner(false)} />
        )}

        {activeTab === 'partners' && editingPartner && (
          <PartnerEditor
            partner={editingPartner}
            onSave={handleUpdatePartner}
            onCancel={() => setEditingPartner(null)}
          />
        )}

        {activeTab === 'services' && !editingService && !isCreatingService && (
          <div>
            <button
              onClick={() => setIsCreatingService(true)}
              className="mb-6 btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> New Service
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">Service Type</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Service Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
                    <th className="px-6 py-3 text-right text-sm font-medium">Price RO</th>
                    <th className="px-6 py-3 text-right text-sm font-medium">Price IT</th>
                    <th className="px-6 py-3 text-right text-sm font-medium">Price EN</th>
                    <th className="px-6 py-3 text-center text-sm font-medium">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {services.map((service) => (
                    <tr
                      key={service.id}
                      className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer transition-colors"
                      onClick={() => setSelectedService(service)}
                    >
                      <td className="px-6 py-4 font-mono text-xs">{service.serviceType}</td>
                      <td className="px-6 py-4 font-medium">{service.serviceName}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{service.category}</td>
                      <td className="px-6 py-4 text-right font-semibold">€{service.priceRo.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right font-semibold">€{service.priceIt.toFixed(2)}</td>
                      <td className="px-6 py-4 text-right font-semibold">€{service.priceEn.toFixed(2)}</td>
                      <td className="px-6 py-4 text-center">
                        <span className={`px-2 py-1 rounded-full text-xs ${service.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'}`}>
                          {service.isActive ? 'Active' : 'Inactive'}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setEditingService(service);
                          }}
                          className="text-primary-600 mr-3 hover:text-primary-800"
                        >
                          <Edit className="w-5 h-5" />
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteService(service.id);
                          }}
                          className="text-red-600 hover:text-red-800"
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'services' && (editingService || isCreatingService) && (
          <ServiceEditor
            service={editingService || newService}
            onSave={handleSaveService}
            onCancel={() => {
              setEditingService(null);
              setIsCreatingService(false);
            }}
          />
        )}

        {activeTab === 'blog' && !editingPost && !isCreating && (
          <div>
            <button onClick={() => setIsCreating(true)} className="mb-6 btn-primary inline-flex items-center gap-2">
              <Plus className="w-5 h-5" /> New Post
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                    <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {posts.map((post) => (
                    <tr key={post.id}>
                      <td className="px-6 py-4">{post.title.en}</td>
                      <td className="px-6 py-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs ${post.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                            }`}
                        >
                          {post.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => setEditingPost(post)} className="text-primary-600 mr-3">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDeletePost(post.id)} className="text-red-600">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'blog' && (editingPost || isCreating) && (
          <PostEditor
            post={editingPost || newPost}
            onSave={handleSavePost}
            onCancel={() => {
              setEditingPost(null);
              setIsCreating(false);
            }}
          />
        )}

        {activeTab === 'newsletter' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Newsletter Subscribers ({subscribers.length})</h2>
              <p className="text-sm text-gray-500 mt-1">
                Active: {subscribers.filter(s => s.status === 'active').length} |
                Unsubscribed: {subscribers.filter(s => s.status === 'unsubscribed').length}
              </p>
            </div>
            {subscribers.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No subscribers yet</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium">Email</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Source</th>
                      <th className="px-6 py-3 text-center text-sm font-medium">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Subscribed</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {subscribers.map((subscriber) => (
                      <tr key={subscriber.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 font-medium">{subscriber.email}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 capitalize">
                          {subscriber.source}
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs ${subscriber.status === 'active'
                              ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                              : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                              }`}
                          >
                            {subscriber.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                          {new Date(subscriber.createdAt).toLocaleDateString(locale, {
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                          })}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'team' && !editingMember && !isCreatingMember && (
          <div>
            <button
              onClick={() => setIsCreatingMember(true)}
              className="mb-6 btn-primary inline-flex items-center gap-2"
            >
              <Plus className="w-5 h-5" /> New Member
            </button>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-sm font-medium">Order</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                    <th className="px-6 py-3 text-left text-sm font-medium">Role (EN)</th>
                    <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y">
                  {teamMembers.map((member) => (
                    <tr key={member.id}>
                      <td className="px-6 py-4">{member.order}</td>
                      <td className="px-6 py-4 font-medium">{member.name}</td>
                      <td className="px-6 py-4">{member.roleEn}</td>
                      <td className="px-6 py-4 text-right">
                        <button onClick={() => setEditingMember(member)} className="text-primary-600 mr-3">
                          <Edit className="w-5 h-5" />
                        </button>
                        <button onClick={() => handleDeleteMember(member.id)} className="text-red-600">
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {activeTab === 'team' && (editingMember || isCreatingMember) && (
          <TeamEditor
            member={editingMember || newMember}
            onSave={handleSaveMember}
            onCancel={() => {
              setEditingMember(null);
              setIsCreatingMember(false);
            }}
          />
        )}

        {activeTab === 'projects' && !editingProduct && !isCreatingProduct && (
          <div>
            <div className="flex items-center justify-between mb-6">
              <div className="flex gap-3 flex-wrap">
                <button
                  onClick={() => setIsCreatingProduct(true)}
                  className="btn-primary inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" /> New Project
                </button>
                <button
                  onClick={handleReseedProducts}
                  className="px-4 py-2 border border-primary-600 text-primary-600 rounded-lg hover:bg-primary-50 dark:hover:bg-primary-900/20 inline-flex items-center gap-2"
                  title="Load the 5 default Gridjac projects"
                >
                  <Rocket className="w-5 h-5" /> Load defaults
                </button>
                <button
                  onClick={handleRunMigration}
                  className="px-4 py-2 border border-orange-500 text-orange-600 rounded-lg hover:bg-orange-50 dark:hover:bg-orange-900/20 inline-flex items-center gap-2"
                  title="Create Product table if missing (first-time setup)"
                >
                  <Settings className="w-5 h-5" /> Run DB migration
                </button>
              </div>
              <div className="text-sm text-gray-500">
                {products.length} project{products.length !== 1 ? 's' : ''} total
              </div>
            </div>
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-x-auto">
              {products.length === 0 ? (
                <div className="p-12 text-center text-gray-500">
                  No projects yet. Click &quot;New Project&quot; to add one.
                </div>
              ) : (
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium">Order</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Name</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Slug</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Category</th>
                      <th className="px-6 py-3 text-center text-sm font-medium">Status</th>
                      <th className="px-6 py-3 text-center text-sm font-medium">Featured</th>
                      <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {products.map((product) => (
                      <tr key={product.id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                        <td className="px-6 py-4 text-sm">{product.order}</td>
                        <td className="px-6 py-4">
                          <div className="font-medium">{product.name}</div>
                          <div className="text-xs text-gray-500 truncate max-w-xs">
                            {product.tagline.en}
                          </div>
                        </td>
                        <td className="px-6 py-4 font-mono text-xs text-gray-500">{product.slug}</td>
                        <td className="px-6 py-4 text-sm">{product.category}</td>
                        <td className="px-6 py-4 text-center">
                          <span
                            className={`px-2 py-1 rounded-full text-xs font-medium ${
                              product.status === 'LIVE'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : product.status === 'BETA'
                                ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400'
                                : product.status === 'DEVELOPMENT'
                                ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                            }`}
                          >
                            {product.status}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center">
                          {product.featured ? (
                            <Check className="w-5 h-5 text-green-600 inline" />
                          ) : (
                            <X className="w-5 h-5 text-gray-300 inline" />
                          )}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            onClick={() => setEditingProduct(product)}
                            className="text-primary-600 mr-3"
                            title="Edit"
                          >
                            <Edit className="w-5 h-5" />
                          </button>
                          <button
                            onClick={() => handleDeleteProduct(product.id)}
                            className="text-red-600"
                            title="Delete"
                          >
                            <Trash2 className="w-5 h-5" />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        )}

        {activeTab === 'projects' && (editingProduct || isCreatingProduct) && (
          <ProductEditor
            product={editingProduct || newProduct}
            onSave={handleSaveProduct}
            onCancel={() => {
              setEditingProduct(null);
              setIsCreatingProduct(false);
            }}
          />
        )}

        {activeTab === 'contracts' && !editingContract && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow">
            <div className="p-6 border-b">
              <h2 className="text-xl font-semibold">Partner Contracts ({contracts.length})</h2>
              <p className="text-sm text-gray-500 mt-1">
                Pending: {contracts.filter(c => c.status === 'PENDING').length} |
                Signed: {contracts.filter(c => c.status === 'SIGNED').length}
              </p>
            </div>
            {contracts.length === 0 ? (
              <div className="p-6 text-center text-gray-500">No contracts uploaded</div>
            ) : (
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 dark:bg-gray-700">
                    <tr>
                      <th className="px-6 py-3 text-left text-sm font-medium">Contract #</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Partner</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Type</th>
                      <th className="px-6 py-3 text-center text-sm font-medium">Status</th>
                      <th className="px-6 py-3 text-left text-sm font-medium">Uploaded</th>
                      <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {contracts.map((contract) => {
                      const partner = partners.find(p => p.id === contract.partnerId);
                      return (
                        <tr
                          key={contract.id}
                          className="hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                          onClick={() => setSelectedContract(contract)}
                        >
                          <td className="px-6 py-4 font-mono text-sm">{contract.contractNumber}</td>
                          <td className="px-6 py-4">
                            <div className="font-medium">{partner?.companyName || 'Unknown'}</div>
                            <div className="text-xs text-gray-500">{partner?.contactPerson}</div>
                          </td>
                          <td className="px-6 py-4 text-sm">{contract.contractType}</td>
                          <td className="px-6 py-4 text-center">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${contract.status === 'SIGNED'
                                ? 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400'
                                : contract.status === 'PENDING'
                                  ? 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400'
                                  : contract.status === 'EXPIRED'
                                    ? 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400'
                                    : 'bg-gray-100 text-gray-800 dark:bg-gray-700 dark:text-gray-400'
                                }`}
                            >
                              {contract.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">
                            {new Date(contract.uploadedAt).toLocaleDateString(locale, {
                              year: 'numeric',
                              month: 'short',
                              day: 'numeric',
                            })}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                setEditingContract(contract);
                              }}
                              className="text-primary-600 mr-3"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                handleDeleteContract(contract.id);
                              }}
                              className="text-red-600"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}

        {activeTab === 'contracts' && editingContract && (
          <ContractEditor
            contract={editingContract}
            onSave={handleUpdateContract}
            onCancel={() => setEditingContract(null)}
          />
        )}

        {activeTab === 'cookies' && (
          <CookieConsentsPanel />
        )}

        {activeTab === 'settings' && settings && (
          <div className="space-y-6">
            {/* Site Settings */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Site Settings</h2>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium mb-2">Google Analytics Code</label>
                  <textarea
                    value={settings.analyticsCode}
                    onChange={(e) => setSettings({ ...settings, analyticsCode: e.target.value })}
                    rows={6}
                    className="w-full p-3 border rounded-lg font-mono text-sm dark:bg-gray-700"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Chatbot Code (Footer)</label>
                  <textarea
                    value={settings.chatbotCode}
                    onChange={(e) => setSettings({ ...settings, chatbotCode: e.target.value })}
                    rows={6}
                    className="w-full p-3 border rounded-lg font-mono text-sm dark:bg-gray-700"
                  />
                </div>
                <button onClick={handleSaveSettings} className="btn-primary inline-flex items-center gap-2">
                  <Save className="w-5 h-5" /> Save Settings
                </button>
              </div>
            </div>

            {/* Change Password */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
              <h2 className="text-xl font-semibold mb-6">Change Password</h2>
              <form onSubmit={handleChangePassword} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium mb-2">Current Password</label>
                  <input
                    type="password"
                    value={passwordForm.currentPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
                    className="w-full max-w-md p-3 border rounded-lg dark:bg-gray-700"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">New Password</label>
                  <input
                    type="password"
                    value={passwordForm.newPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
                    className="w-full max-w-md p-3 border rounded-lg dark:bg-gray-700"
                    required
                    minLength={6}
                  />
                  <p className="text-xs text-gray-500 mt-1">Minimum 6 characters</p>
                </div>
                <div>
                  <label className="block text-sm font-medium mb-2">Confirm New Password</label>
                  <input
                    type="password"
                    value={passwordForm.confirmPassword}
                    onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
                    className="w-full max-w-md p-3 border rounded-lg dark:bg-gray-700"
                    required
                  />
                </div>

                {passwordMessage && (
                  <div
                    className={`p-4 rounded-lg ${passwordMessage.type === 'success'
                      ? 'bg-green-50 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                      : 'bg-red-50 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                      }`}
                  >
                    {passwordMessage.text}
                  </div>
                )}

                <button type="submit" className="btn-primary inline-flex items-center gap-2">
                  <Save className="w-5 h-5" /> Change Password
                </button>
              </form>
            </div>
          </div>
        )}
      </main>

      {/* Contract Modal */}
      {selectedContract && (
        <ContractModal
          contract={selectedContract}
          partnerName={partners.find(p => p.id === selectedContract.partnerId)?.companyName}
          onClose={() => setSelectedContract(null)}
        />
      )}

      {/* Service Details Modal */}
      {selectedService && (
        <ServiceDetailsModal
          service={selectedService}
          onClose={() => setSelectedService(null)}
          locale={locale}
        />
      )}
    </div>
  );
}

function PostEditor({ post, onSave, onCancel }: { post: BlogPost; onSave: (p: BlogPost) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState(post);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">{post.id ? 'Edit Post' : 'New Post'}</h2>
        <button onClick={onCancel}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Cover Image</label>
            <ImageUploader
              currentImage={formData.imageUrl || ''}
              onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
              uploadType="blog"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })}
              className="w-full p-2 border rounded dark:bg-gray-700"
            >
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </div>
        </div>
        {(['ro', 'en', 'it'] as const).map((lang) => (
          <div key={lang} className="border-t pt-4">
            <h3 className="text-lg font-medium mb-4 uppercase">{lang}</h3>
            <div className="space-y-4">
              <input
                placeholder="Title"
                value={formData.title[lang]}
                onChange={(e) => setFormData({ ...formData, title: { ...formData.title, [lang]: e.target.value } })}
                className="w-full p-2 border rounded dark:bg-gray-700"
              />
              <textarea
                placeholder="Excerpt"
                value={formData.excerpt[lang]}
                onChange={(e) => setFormData({ ...formData, excerpt: { ...formData.excerpt, [lang]: e.target.value } })}
                rows={2}
                className="w-full p-2 border rounded dark:bg-gray-700"
              />
              <textarea
                placeholder="Content"
                value={formData.content[lang]}
                onChange={(e) => setFormData({ ...formData, content: { ...formData.content, [lang]: e.target.value } })}
                rows={6}
                className="w-full p-2 border rounded dark:bg-gray-700"
              />
            </div>
          </div>
        ))}
        <div className="flex gap-4">
          <button onClick={() => onSave(formData)} className="btn-primary">
            <Save className="w-5 h-5 inline mr-2" /> Save
          </button>
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ServiceEditor({ service, onSave, onCancel }: { service: ServicePricing; onSave: (s: ServicePricing) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState(service);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-4xl">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">{service.id ? 'Edit Service' : 'New Service'}</h2>
        <button onClick={onCancel}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Service Type (ID)</label>
            <input
              placeholder="e.g., logo-design"
              value={formData.serviceType}
              onChange={(e) => setFormData({ ...formData, serviceType: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
            <p className="text-xs text-gray-500 mt-1">Unique identifier (lowercase, hyphenated)</p>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Service Name</label>
            <input
              placeholder="e.g., Logo Design"
              value={formData.serviceName}
              onChange={(e) => setFormData({ ...formData, serviceName: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
            <p className="text-xs text-gray-500 mt-1">Display name</p>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <input
            placeholder="e.g., Design, Development, SEO"
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Price RO (€)</label>
            <input
              type="number"
              placeholder="0.00"
              value={formData.priceRo}
              onChange={(e) => setFormData({ ...formData, priceRo: Number(e.target.value) })}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price IT (€)</label>
            <input
              type="number"
              placeholder="0.00"
              value={formData.priceIt}
              onChange={(e) => setFormData({ ...formData, priceIt: Number(e.target.value) })}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Price EN (€)</label>
            <input
              type="number"
              placeholder="0.00"
              value={formData.priceEn}
              onChange={(e) => setFormData({ ...formData, priceEn: Number(e.target.value) })}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Description</label>
          <textarea
            placeholder="Service description..."
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            rows={3}
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
        </div>

        <div className="flex gap-6">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isActive}
              onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm">Active</span>
          </label>
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={formData.isRecurring}
              onChange={(e) => setFormData({ ...formData, isRecurring: e.target.checked })}
              className="rounded"
            />
            <span className="text-sm">Recurring Service</span>
          </label>
        </div>

        <div className="flex gap-4 pt-4">
          <button onClick={() => onSave(formData)} className="btn-primary">
            <Save className="w-5 h-5 inline mr-2" /> Save
          </button>
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function PartnerEditor({ partner, onSave, onCancel }: { partner: Partner; onSave: (p: Partner) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState(partner);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-2xl">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Edit Partner</h2>
        <button onClick={onCancel}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-4">
        <input
          placeholder="Company"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700"
        />
        <input
          placeholder="Contact"
          value={formData.contactPerson}
          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700"
        />
        <input
          type="number"
          placeholder="Markup %"
          value={formData.markup}
          onChange={(e) => setFormData({ ...formData, markup: Number(e.target.value) })}
          className="w-full p-2 border rounded dark:bg-gray-700"
        />
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value as Partner['status'] })}
          className="w-full p-2 border rounded dark:bg-gray-700"
        >
          <option value="approved">Approved</option>
          <option value="suspended">Suspended</option>
        </select>
        <textarea
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="w-full p-2 border rounded dark:bg-gray-700"
        />
        <div className="flex gap-4">
          <button onClick={() => onSave(formData)} className="btn-primary">
            <Save className="w-5 h-5 inline mr-2" /> Save
          </button>
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function PartnerForm({ onSave, onCancel }: { onSave: (d: Record<string, unknown>) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState({
    companyName: '',
    contactPerson: '',
    email: '',
    phone: '',
    address: '',
    taxId: '',
    markup: 20,
    password: 'partner123',
    notes: '',
  });
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-2xl">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Create Partner</h2>
        <button onClick={onCancel}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-4">
        <input
          placeholder="Company Name"
          value={formData.companyName}
          onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700"
        />
        <input
          placeholder="Contact Person"
          value={formData.contactPerson}
          onChange={(e) => setFormData({ ...formData, contactPerson: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={(e) => setFormData({ ...formData, email: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
          <input
            placeholder="Phone"
            value={formData.phone}
            onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
        </div>
        <input
          placeholder="Address"
          value={formData.address}
          onChange={(e) => setFormData({ ...formData, address: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700"
        />
        <div className="grid grid-cols-2 gap-4">
          <input
            placeholder="Tax ID"
            value={formData.taxId}
            onChange={(e) => setFormData({ ...formData, taxId: e.target.value })}
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
          <input
            type="number"
            placeholder="Markup %"
            value={formData.markup}
            onChange={(e) => setFormData({ ...formData, markup: Number(e.target.value) })}
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
        </div>
        <input
          placeholder="Password"
          value={formData.password}
          onChange={(e) => setFormData({ ...formData, password: e.target.value })}
          className="w-full p-2 border rounded dark:bg-gray-700"
        />
        <textarea
          placeholder="Notes"
          value={formData.notes}
          onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
          rows={3}
          className="w-full p-2 border rounded dark:bg-gray-700"
        />
        <div className="flex gap-4">
          <button onClick={() => onSave(formData)} className="btn-primary">
            <Save className="w-5 h-5 inline mr-2" /> Create
          </button>
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

function ContractEditor({ contract, onSave, onCancel }: { contract: Contract; onSave: (c: Contract) => void; onCancel: () => void }) {
  const [formData, setFormData] = useState(contract);
  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6 max-w-3xl">
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold">Edit Contract</h2>
        <button onClick={onCancel}>
          <X className="w-6 h-6" />
        </button>
      </div>
      <div className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Contract Number</label>
            <input
              value={formData.contractNumber}
              disabled
              className="w-full p-2 border rounded dark:bg-gray-700 bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Contract Type</label>
            <input
              value={formData.contractType}
              disabled
              className="w-full p-2 border rounded dark:bg-gray-700 bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) => setFormData({ ...formData, status: e.target.value as Contract['status'] })}
              className="w-full p-2 border rounded dark:bg-gray-700"
            >
              <option value="PENDING">Pending</option>
              <option value="SIGNED">Signed</option>
              <option value="EXPIRED">Expired</option>
              <option value="REJECTED">Rejected</option>
              <option value="ARCHIVED">Archived</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">File Name</label>
            <input
              value={formData.fileName}
              disabled
              className="w-full p-2 border rounded dark:bg-gray-700 bg-gray-100 dark:bg-gray-600 cursor-not-allowed"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Signed At</label>
            <input
              type="date"
              value={formData.signedAt ? new Date(formData.signedAt).toISOString().split('T')[0] : ''}
              onChange={(e) => setFormData({ ...formData, signedAt: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Expires At</label>
            <input
              type="date"
              value={formData.expiresAt ? new Date(formData.expiresAt).toISOString().split('T')[0] : ''}
              onChange={(e) => setFormData({ ...formData, expiresAt: e.target.value ? new Date(e.target.value).toISOString() : undefined })}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Notes</label>
          <textarea
            placeholder="Admin notes..."
            value={formData.notes}
            onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
            rows={4}
            className="w-full p-2 border rounded dark:bg-gray-700"
          />
        </div>

        <div className="border-t pt-4">
          <p className="text-sm text-gray-500 mb-2">File Information</p>
          <div className="grid grid-cols-2 gap-2 text-sm">
            <div>
              <span className="text-gray-600">Size:</span> {(formData.fileSize / 1024).toFixed(2)} KB
            </div>
            <div>
              <span className="text-gray-600">Type:</span> {formData.mimeType}
            </div>
            <div className="col-span-2">
              <a
                href={formData.fileUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary-600 hover:underline"
              >
                View Contract File →
              </a>
            </div>
          </div>
        </div>

        <div className="flex gap-4 pt-4">
          <button onClick={() => onSave(formData)} className="btn-primary">
            <Save className="w-5 h-5 inline mr-2" /> Save
          </button>
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
