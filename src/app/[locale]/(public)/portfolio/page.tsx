import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';
import { localeAlternates } from '@/lib/seo';
import { getPortfolioProjects, screenshotFor } from '@/lib/portfolio';

interface PortfolioPageProps {
  params: { locale: string };
}

// Force dynamic rendering due to next-intl usage
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: PortfolioPageProps) {
  const t = await getTranslations({ locale, namespace: 'portfolio' });
  return {
    title: t('title'),
    description: t('subtitle'),
    alternates: localeAlternates(locale, '/portfolio'),
  };
}

export default function PortfolioPage({ params: { locale } }: PortfolioPageProps) {
  const t = useTranslations('portfolio');

  const projects = getPortfolioProjects(locale);

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="gradient-text">{t('title')}</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const shot = screenshotFor(project.url);
              return (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
              >
                {/* Project preview in a browser frame */}
                <div className="relative overflow-hidden border-b border-tech-border bg-tech-bg">
                  <div className="flex items-center gap-1.5 px-3 py-2 bg-tech-surface border-b border-tech-border">
                    <span className="w-2.5 h-2.5 rounded-full bg-[#ff5f57]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#febc2e]" />
                    <span className="w-2.5 h-2.5 rounded-full bg-[#28c840]" />
                    <span className="ml-3 flex-1 truncate rounded bg-tech-bg px-2 py-0.5 text-[11px] font-mono text-tech-text-muted">
                      {shot.domain}
                    </span>
                  </div>
                  <div className="aspect-[11/5] relative">
                    {shot.src ? (
                      <Image
                        src={shot.src}
                        alt={`Screenshot del sito ${shot.domain}`}
                        fill
                        className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 tech-grid-bg">
                        <span className="text-2xl font-display font-bold text-tech-text">{project.title}</span>
                        <span className="text-xs font-mono text-tech-accent">{project.category}</span>
                      </div>
                    )}
                  </div>
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform">
                      <ExternalLink className="w-6 h-6 text-gray-900" />
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {t('client')}: {project.client}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}
