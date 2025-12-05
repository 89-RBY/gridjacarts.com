'use client';

import { useState } from 'react';
import { X, Save, Upload } from 'lucide-react';
import { TeamMember } from '@/types';
import ImageUploader from '@/components/ImageUploader';

interface TeamEditorProps {
    member: TeamMember;
    onSave: (member: TeamMember) => void;
    onCancel: () => void;
}

export default function TeamEditor({ member, onSave, onCancel }: TeamEditorProps) {
    const [formData, setFormData] = useState<TeamMember>(member);
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await onSave(formData);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="p-6 border-b sticky top-0 bg-white dark:bg-gray-800 z-10 flex justify-between items-center">
                    <h2 className="text-xl font-bold">{member.id ? 'Edit Team Member' : 'New Team Member'}</h2>
                    <button onClick={onCancel} className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        <X className="w-6 h-6" />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        {/* Basic Info */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg border-b pb-2">Basic Info</h3>

                            <div>
                                <label className="block text-sm font-medium mb-1">Name</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.name}
                                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Image</label>
                                <ImageUploader
                                    currentImage={formData.imageUrl}
                                    onUpload={(url) => setFormData({ ...formData, imageUrl: url })}
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Display Order</label>
                                <input
                                    type="number"
                                    value={formData.order}
                                    onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) })}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                        </div>

                        {/* Social Links */}
                        <div className="space-y-4">
                            <h3 className="font-semibold text-lg border-b pb-2">Social Links</h3>

                            <div>
                                <label className="block text-sm font-medium mb-1">LinkedIn</label>
                                <input
                                    type="text"
                                    value={formData.socialLinks.linkedin || ''}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        socialLinks: { ...formData.socialLinks, linkedin: e.target.value }
                                    })}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Twitter/X</label>
                                <input
                                    type="text"
                                    value={formData.socialLinks.twitter || ''}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        socialLinks: { ...formData.socialLinks, twitter: e.target.value }
                                    })}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium mb-1">Instagram</label>
                                <input
                                    type="text"
                                    value={formData.socialLinks.instagram || ''}
                                    onChange={(e) => setFormData({
                                        ...formData,
                                        socialLinks: { ...formData.socialLinks, instagram: e.target.value }
                                    })}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Roles */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Roles (Multilingual)</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Role (RO)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.roleRo}
                                    onChange={(e) => setFormData({ ...formData, roleRo: e.target.value })}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Role (EN)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.roleEn}
                                    onChange={(e) => setFormData({ ...formData, roleEn: e.target.value })}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Role (IT)</label>
                                <input
                                    type="text"
                                    required
                                    value={formData.roleIt}
                                    onChange={(e) => setFormData({ ...formData, roleIt: e.target.value })}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                        </div>
                    </div>

                    {/* Bio */}
                    <div className="space-y-4">
                        <h3 className="font-semibold text-lg border-b pb-2">Bio (Multilingual)</h3>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-sm font-medium mb-1">Bio (RO)</label>
                                <textarea
                                    rows={4}
                                    value={formData.bioRo || ''}
                                    onChange={(e) => setFormData({ ...formData, bioRo: e.target.value })}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Bio (EN)</label>
                                <textarea
                                    rows={4}
                                    value={formData.bioEn || ''}
                                    onChange={(e) => setFormData({ ...formData, bioEn: e.target.value })}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium mb-1">Bio (IT)</label>
                                <textarea
                                    rows={4}
                                    value={formData.bioIt || ''}
                                    onChange={(e) => setFormData({ ...formData, bioIt: e.target.value })}
                                    className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:border-gray-600"
                                />
                            </div>
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
                            {loading ? 'Saving...' : 'Save Member'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
