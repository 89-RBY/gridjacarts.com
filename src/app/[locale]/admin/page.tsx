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
} from 'lucide-react';
import Logo from '@/components/Logo';
import { User, BlogPost, SiteSettings } from '@/types';

export default function AdminDashboard({ params: { locale } }: { params: { locale: string } }) {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<BlogPost | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  useEffect(() => {
    checkAuth();
  }, []);

  useEffect(() => {
    if (user && user.role === 'admin') {
      fetchPosts();
      fetchSettings();
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
    if (res.ok) {
      alert('Settings saved successfully!');
    }
  };

  const handleDeletePost = async (id: string) => {
    if (!confirm('Are you sure you want to delete this post?')) return;
    const res = await fetch(`/api/blog?id=${id}`, { method: 'DELETE' });
    if (res.ok) {
      setPosts(posts.filter((p) => p.id !== id));
    }
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
    title: { ro: '', en: '', it: '' },
    content: { ro: '', en: '', it: '' },
    excerpt: { ro: '', en: '', it: '' },
    author: user?.name || 'Admin',
    publishedAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    tags: [],
    status: 'draft',
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 h-full w-64 bg-white dark:bg-gray-800 shadow-lg z-40">
        <div className="p-6">
          <Logo size="md" />
        </div>

        <nav className="mt-6">
          <button
            onClick={() => setActiveTab('dashboard')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'dashboard'
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 border-r-4 border-primary-600'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <LayoutDashboard className="w-5 h-5" />
            Dashboard
          </button>
          <button
            onClick={() => setActiveTab('blog')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'blog'
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 border-r-4 border-primary-600'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <FileText className="w-5 h-5" />
            Blog
          </button>
          <button
            onClick={() => setActiveTab('settings')}
            className={`w-full flex items-center gap-3 px-6 py-3 text-left ${
              activeTab === 'settings'
                ? 'bg-primary-50 dark:bg-primary-900/20 text-primary-600 border-r-4 border-primary-600'
                : 'text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700'
            }`}
          >
            <Settings className="w-5 h-5" />
            Settings
          </button>
        </nav>

        <div className="absolute bottom-0 left-0 right-0 p-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="ml-64 p-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            {activeTab === 'dashboard' && 'Dashboard'}
            {activeTab === 'blog' && 'Blog Management'}
            {activeTab === 'settings' && 'Site Settings'}
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-2">
            Welcome back, {user?.name}
          </p>
        </div>

        {/* Dashboard Tab */}
        {activeTab === 'dashboard' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-2">Total Posts</h3>
              <p className="text-3xl font-bold text-primary-600">{posts.length}</p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-2">Published</h3>
              <p className="text-3xl font-bold text-green-600">
                {posts.filter((p) => p.status === 'published').length}
              </p>
            </div>
            <div className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow">
              <h3 className="text-lg font-semibold mb-2">Drafts</h3>
              <p className="text-3xl font-bold text-yellow-600">
                {posts.filter((p) => p.status === 'draft').length}
              </p>
            </div>
          </div>
        )}

        {/* Blog Tab */}
        {activeTab === 'blog' && (
          <div>
            {!editingPost && !isCreating && (
              <>
                <button
                  onClick={() => setIsCreating(true)}
                  className="mb-6 btn-primary inline-flex items-center gap-2"
                >
                  <Plus className="w-5 h-5" />
                  New Post
                </button>

                <div className="bg-white dark:bg-gray-800 rounded-xl shadow overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-gray-50 dark:bg-gray-700">
                      <tr>
                        <th className="px-6 py-3 text-left text-sm font-medium">Title</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Status</th>
                        <th className="px-6 py-3 text-left text-sm font-medium">Date</th>
                        <th className="px-6 py-3 text-right text-sm font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      {posts.map((post) => (
                        <tr key={post.id}>
                          <td className="px-6 py-4">{post.title.en}</td>
                          <td className="px-6 py-4">
                            <span
                              className={`px-2 py-1 rounded-full text-xs ${
                                post.status === 'published'
                                  ? 'bg-green-100 text-green-800'
                                  : 'bg-yellow-100 text-yellow-800'
                              }`}
                            >
                              {post.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-sm text-gray-500">
                            {new Date(post.publishedAt).toLocaleDateString()}
                          </td>
                          <td className="px-6 py-4 text-right">
                            <button
                              onClick={() => setEditingPost(post)}
                              className="text-primary-600 hover:text-primary-800 mr-3"
                            >
                              <Edit className="w-5 h-5" />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
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
              </>
            )}

            {(editingPost || isCreating) && (
              <PostEditor
                post={editingPost || newPost}
                onSave={handleSavePost}
                onCancel={() => {
                  setEditingPost(null);
                  setIsCreating(false);
                }}
              />
            )}
          </div>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && settings && (
          <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium mb-2">
                  Google Analytics Code
                </label>
                <textarea
                  value={settings.analyticsCode}
                  onChange={(e) =>
                    setSettings({ ...settings, analyticsCode: e.target.value })
                  }
                  rows={6}
                  className="w-full p-3 border rounded-lg font-mono text-sm dark:bg-gray-700 dark:border-gray-600"
                  placeholder="<!-- Paste your Google Analytics code here -->"
                />
              </div>

              <div>
                <label className="block text-sm font-medium mb-2">
                  Chatbot Code (Footer)
                </label>
                <textarea
                  value={settings.chatbotCode}
                  onChange={(e) =>
                    setSettings({ ...settings, chatbotCode: e.target.value })
                  }
                  rows={6}
                  className="w-full p-3 border rounded-lg font-mono text-sm dark:bg-gray-700 dark:border-gray-600"
                  placeholder="<!-- Paste your chatbot widget code here -->"
                />
              </div>

              <button onClick={handleSaveSettings} className="btn-primary inline-flex items-center gap-2">
                <Save className="w-5 h-5" />
                Save Settings
              </button>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}

// Post Editor Component
function PostEditor({
  post,
  onSave,
  onCancel,
}: {
  post: BlogPost;
  onSave: (post: BlogPost) => void;
  onCancel: () => void;
}) {
  const [formData, setFormData] = useState(post);

  return (
    <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-6">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">
          {post.id ? 'Edit Post' : 'Create New Post'}
        </h2>
        <button onClick={onCancel} className="text-gray-500 hover:text-gray-700">
          <X className="w-6 h-6" />
        </button>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">Slug</label>
            <input
              type="text"
              value={formData.slug}
              onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
              className="w-full p-2 border rounded dark:bg-gray-700"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Status</label>
            <select
              value={formData.status}
              onChange={(e) =>
                setFormData({ ...formData, status: e.target.value as 'draft' | 'published' })
              }
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
              <div>
                <label className="block text-sm font-medium mb-2">Title</label>
                <input
                  type="text"
                  value={formData.title[lang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      title: { ...formData.title, [lang]: e.target.value },
                    })
                  }
                  className="w-full p-2 border rounded dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Excerpt</label>
                <textarea
                  value={formData.excerpt[lang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      excerpt: { ...formData.excerpt, [lang]: e.target.value },
                    })
                  }
                  rows={2}
                  className="w-full p-2 border rounded dark:bg-gray-700"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Content</label>
                <textarea
                  value={formData.content[lang]}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      content: { ...formData.content, [lang]: e.target.value },
                    })
                  }
                  rows={6}
                  className="w-full p-2 border rounded dark:bg-gray-700"
                />
              </div>
            </div>
          </div>
        ))}

        <div className="flex gap-4">
          <button
            onClick={() => onSave(formData)}
            className="btn-primary inline-flex items-center gap-2"
          >
            <Save className="w-5 h-5" />
            Save Post
          </button>
          <button onClick={onCancel} className="btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
