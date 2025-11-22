import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/data';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPageProps {
  params: { locale: string };
}

// Force dynamic rendering due to database queries and next-intl usage
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: BlogPageProps) {
  const t = await getTranslations({ locale, namespace: 'blog' });
  return {
    title: t('title'),
  };
}

export default async function BlogPage({ params: { locale } }: BlogPageProps) {
  const t = await getTranslations({ locale, namespace: 'blog' });
  const tCommon = await getTranslations({ locale, namespace: 'common' });

  const allPosts = await getBlogPosts();
  const posts = allPosts.filter((post) => post.status === 'published');

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

      {/* Blog Posts */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-500 dark:text-gray-400">
                {locale === 'ro' && 'Nu există articole publicate încă.'}
                {locale === 'en' && 'No published articles yet.'}
                {locale === 'it' && 'Nessun articolo pubblicato ancora.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((post) => (
                <article key={post.id} className="card overflow-hidden group">
                  {/* Featured Image Placeholder */}
                  <div className="aspect-video bg-gradient-to-br from-primary-100 to-accent-100 dark:from-primary-900/30 dark:to-accent-900/30 relative overflow-hidden">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-4xl font-display font-bold text-primary-600/20">
                        Blog
                      </span>
                    </div>
                  </div>

                  {/* Post Content */}
                  <div className="p-6">
                    {/* Meta Info */}
                    <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-4">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-4 h-4" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString(
                            locale === 'ro' ? 'ro-RO' : locale === 'it' ? 'it-IT' : 'en-US',
                            { year: 'numeric', month: 'long', day: 'numeric' }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-4 h-4" />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h2 className="text-xl font-semibold mb-3 text-gray-900 dark:text-white group-hover:text-primary-600 transition-colors">
                      {post.title[locale as keyof typeof post.title] || post.title.en}
                    </h2>

                    {/* Excerpt */}
                    <p className="text-gray-600 dark:text-gray-400 mb-4 line-clamp-3">
                      {post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en}
                    </p>

                    {/* Tags */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-full text-gray-600 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    {/* Read More */}
                    <Link
                      href={`/${locale}/blog/${post.slug}`}
                      className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 font-medium hover:gap-3 transition-all"
                    >
                      {tCommon('readMore')}
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
