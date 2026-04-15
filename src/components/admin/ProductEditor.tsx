'use client';

import { useState } from 'react';
import { X, Save, Plus, Trash2 } from 'lucide-react';
import { Product, ProductStatus } from '@/types';
import ImageUploader from '@/components/ImageUploader';

interface ProductEditorProps {
  product: Product;
  onSave: (product: Product) => void;
  onCancel: () => void;
}

const STATUS_OPTIONS: ProductStatus[] = ['LIVE', 'BETA', 'DEVELOPMENT', 'ARCHIVED'];

export default function ProductEditor({ product, onSave, onCancel }: ProductEditorProps) {
  const [formData, setFormData] = useState<Product>(product);
  const [loading, setLoading] = useState(false);
  const [techStackInput, setTechStackInput] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSave(formData);
    } finally {
      setLoading(false);
    }
  };

  const updateFeature = (locale: 'ro' | 'en' | 'it', index: number, value: string) => {
    const next = [...formData.features[locale]];
    next[index] = value;
    setFormData({ ...formData, features: { ...formData.features, [locale]: next } });
  };

  const addFeature = (locale: 'ro' | 'en' | 'it') => {
    setFormData({
      ...formData,
      features: { ...formData.features, [locale]: [...formData.features[locale], ''] },
    });
  };

  const removeFeature = (locale: 'ro' | 'en' | 'it', index: number) => {
    const next = formData.features[locale].filter((_, i) => i !== index);
    setFormData({ ...formData, features: { ...formData.features, [locale]: next } });
  };

  const addTech = () => {
    const trimmed = techStackInput.trim();
    if (!trimmed || formData.techStack.includes(trimmed)) return;
    setFormData({ ...formData, techStack: [...formData.techStack, trimmed] });
    setTechStackInput('');
  };

  const removeTech = (tech: string) => {
    setFormData({ ...formData, techStack: formData.techStack.filter((t) => t !== tech) });
  };

  const slugify = (value: string) =>
    value
      .toLowerCase()
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/(^-|-$)/g, '');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-5xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b sticky top-0 bg-white dark:bg-gray-800 z-10 flex justify-between items-center">
          <h2 className="text-xl font-bold">{product.id ? 'Edit Project' : 'New Project'}</h2>
          <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic info */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Basic Info</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => {
                    const name = e.target.value;
                    setFormData({
                      ...formData,
                      name,
                      slug: formData.slug || slugify(name),
                    });
                  }}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Slug *</label>
                <input
                  type="text"
                  required
                  value={formData.slug}
                  onChange={(e) => setFormData({ ...formData, slug: slugify(e.target.value) })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 font-mono text-sm"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Category *</label>
                <input
                  type="text"
                  required
                  placeholder="AI Automation, Marketplace, SaaS..."
                  value={formData.category}
                  onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Status *</label>
                <select
                  required
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value as ProductStatus })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                >
                  {STATUS_OPTIONS.map((s) => (
                    <option key={s} value={s}>{s}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Demo URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.demoUrl || ''}
                  onChange={(e) => setFormData({ ...formData, demoUrl: e.target.value })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Case Study URL</label>
                <input
                  type="url"
                  placeholder="https://..."
                  value={formData.caseStudyUrl || ''}
                  onChange={(e) => setFormData({ ...formData, caseStudyUrl: e.target.value })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Users Count</label>
                <input
                  type="text"
                  placeholder="1000+ users"
                  value={formData.usersCount || ''}
                  onChange={(e) => setFormData({ ...formData, usersCount: e.target.value })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Automation Saved</label>
                <input
                  type="text"
                  placeholder="30h/week"
                  value={formData.automationSaved || ''}
                  onChange={(e) => setFormData({ ...formData, automationSaved: e.target.value })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Display Order</label>
                <input
                  type="number"
                  value={formData.order}
                  onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                />
              </div>
              <div className="flex items-center gap-3 pt-6">
                <input
                  type="checkbox"
                  id="featured"
                  checked={formData.featured}
                  onChange={(e) => setFormData({ ...formData, featured: e.target.checked })}
                  className="w-5 h-5"
                />
                <label htmlFor="featured" className="text-sm font-medium">Featured on homepage</label>
              </div>
            </div>
          </div>

          {/* Media */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Media</h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Cover Image</label>
                <ImageUploader
                  currentImage={formData.imageUrl}
                  onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
                  uploadType="blog"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">Logo</label>
                <ImageUploader
                  currentImage={formData.logoUrl}
                  onUpload={(url) => setFormData({ ...formData, logoUrl: url })}
                  uploadType="blog"
                />
              </div>
            </div>
          </div>

          {/* Tagline */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Tagline (Multilingual) *</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {(['ro', 'en', 'it'] as const).map((loc) => (
                <div key={loc}>
                  <label className="block text-sm font-medium mb-1">Tagline ({loc.toUpperCase()})</label>
                  <input
                    type="text"
                    required
                    value={formData.tagline[loc]}
                    onChange={(e) =>
                      setFormData({ ...formData, tagline: { ...formData.tagline, [loc]: e.target.value } })
                    }
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Problem */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">The Problem (Multilingual) *</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {(['ro', 'en', 'it'] as const).map((loc) => (
                <div key={loc}>
                  <label className="block text-sm font-medium mb-1">Problem ({loc.toUpperCase()})</label>
                  <textarea
                    required
                    rows={4}
                    value={formData.problem[loc]}
                    onChange={(e) =>
                      setFormData({ ...formData, problem: { ...formData.problem, [loc]: e.target.value } })
                    }
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Description */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Description (Multilingual) *</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {(['ro', 'en', 'it'] as const).map((loc) => (
                <div key={loc}>
                  <label className="block text-sm font-medium mb-1">Description ({loc.toUpperCase()})</label>
                  <textarea
                    required
                    rows={5}
                    value={formData.description[loc]}
                    onChange={(e) =>
                      setFormData({ ...formData, description: { ...formData.description, [loc]: e.target.value } })
                    }
                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Features */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Features (Multilingual)</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {(['ro', 'en', 'it'] as const).map((loc) => (
                <div key={loc}>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-medium">Features ({loc.toUpperCase()})</label>
                    <button
                      type="button"
                      onClick={() => addFeature(loc)}
                      className="text-primary-600 hover:text-primary-700"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="space-y-2">
                    {formData.features[loc].map((feature, i) => (
                      <div key={i} className="flex gap-2">
                        <input
                          type="text"
                          value={feature}
                          onChange={(e) => updateFeature(loc, i, e.target.value)}
                          className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-sm"
                        />
                        <button
                          type="button"
                          onClick={() => removeFeature(loc, i)}
                          className="text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Tech Stack */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">Tech Stack</h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={techStackInput}
                onChange={(e) => setTechStackInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addTech();
                  }
                }}
                placeholder="Next.js, PostgreSQL, OpenAI..."
                className="flex-1 p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
              />
              <button
                type="button"
                onClick={addTech}
                className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.techStack.map((tech) => (
                <span
                  key={tech}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-gray-100 dark:bg-gray-700 rounded-full text-sm"
                >
                  {tech}
                  <button type="button" onClick={() => removeTech(tech)} className="text-red-500 hover:text-red-700">
                    <X className="w-3 h-3" />
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* SEO */}
          <div className="space-y-4">
            <h3 className="font-semibold text-lg border-b pb-2">SEO (Optional)</h3>
            <div className="grid md:grid-cols-3 gap-4">
              {(['ro', 'en', 'it'] as const).map((loc) => (
                <div key={loc} className="space-y-2">
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta Title ({loc.toUpperCase()})</label>
                    <input
                      type="text"
                      value={formData.metaTitle?.[loc] || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metaTitle: { ...formData.metaTitle, [loc]: e.target.value },
                        })
                      }
                      className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium mb-1">Meta Description ({loc.toUpperCase()})</label>
                    <textarea
                      rows={3}
                      value={formData.metaDescription?.[loc] || ''}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          metaDescription: { ...formData.metaDescription, [loc]: e.target.value },
                        })
                      }
                      className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600 text-sm"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-6 border-t">
            <button
              type="button"
              onClick={onCancel}
              className="px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg dark:text-gray-300 dark:hover:bg-gray-700"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="btn-primary flex items-center gap-2"
            >
              <Save className="w-5 h-5" />
              {loading ? 'Saving...' : 'Save Project'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
