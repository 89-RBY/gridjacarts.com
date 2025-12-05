'use client';

import { useEffect, useState } from 'react';
import { TeamMember } from '@/types';
import { Linkedin, Twitter, Instagram, Github } from 'lucide-react';

export default function TeamList({ locale }: { locale: string }) {
    const [members, setMembers] = useState<TeamMember[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/api/team')
            .then((res) => res.json())
            .then((data) => {
                if (data.members) setMembers(data.members);
            })
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <div className="grid md:grid-cols-3 gap-8">
                {[1, 2, 3].map((i) => (
                    <div key={i} className="animate-pulse">
                        <div className="bg-gray-200 dark:bg-gray-700 h-64 rounded-2xl mb-4" />
                        <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
                    </div>
                ))}
            </div>
        );
    }

    return (
        <div className="grid md:grid-cols-3 gap-8">
            {members.map((member) => {
                const role = locale === 'ro' ? member.roleRo : locale === 'it' ? member.roleIt : member.roleEn;
                const bio = locale === 'ro' ? member.bioRo : locale === 'it' ? member.bioIt : member.bioEn;

                return (
                    <div key={member.id} className="group">
                        <div className="relative overflow-hidden rounded-2xl mb-6 bg-gray-100 dark:bg-gray-700 aspect-[3/4]">
                            {member.imageUrl ? (
                                <img
                                    src={member.imageUrl}
                                    alt={member.name}
                                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}

                            {/* Social Overlay */}
                            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-4">
                                {member.socialLinks.linkedin && (
                                    <a href={member.socialLinks.linkedin} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-400 transition-colors">
                                        <Linkedin className="w-6 h-6" />
                                    </a>
                                )}
                                {member.socialLinks.twitter && (
                                    <a href={member.socialLinks.twitter} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-400 transition-colors">
                                        <Twitter className="w-6 h-6" />
                                    </a>
                                )}
                                {member.socialLinks.instagram && (
                                    <a href={member.socialLinks.instagram} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-400 transition-colors">
                                        <Instagram className="w-6 h-6" />
                                    </a>
                                )}
                                {member.socialLinks.github && (
                                    <a href={member.socialLinks.github} target="_blank" rel="noopener noreferrer" className="text-white hover:text-primary-400 transition-colors">
                                        <Github className="w-6 h-6" />
                                    </a>
                                )}
                            </div>
                        </div>

                        <div className="text-center">
                            <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                            <p className="text-primary-600 dark:text-primary-400 font-medium mb-3">{role}</p>
                            {bio && (
                                <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                                    {bio}
                                </p>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
}
