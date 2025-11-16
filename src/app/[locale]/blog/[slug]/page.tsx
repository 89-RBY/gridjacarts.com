import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug } from '@/lib/data';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';

interface BlogPostPageProps {
  params: { locale: string; slug: string };
}

// Force dynamic rendering - no static generation at build time
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale, slug } }: BlogPostPageProps) {
  try {
    const post = await getBlogPostBySlug(slug);

    if (!post) {
      return { title: 'Post Not Found' };
    }

    return {
      title: post.title[locale as keyof typeof post.title] || post.title.en,
      description: post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en,
    };
  } catch {
    return { title: 'Blog Post' };
  }
}

export default async function BlogPostPage({ params: { locale, slug } }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(slug);
  const t = await getTranslations({ locale, namespace: 'blog' });

  if (!post || post.status !== 'published') {
    notFound();
  }

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            <Link
              href={`/${locale}/blog`}
              className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 mb-6 hover:gap-3 transition-all"
            >
              <ArrowLeft className="w-4 h-4" />
              {locale === 'ro' && 'Înapoi la blog'}
              {locale === 'en' && 'Back to blog'}
              {locale === 'it' && 'Torna al blog'}
            </Link>

            <h1 className="text-3xl md:text-4xl lg:text-5xl font-display font-bold mb-6 text-gray-900 dark:text-white">
              {post.title[locale as keyof typeof post.title] || post.title.en}
            </h1>

            <div className="flex flex-wrap items-center gap-6 text-gray-600 dark:text-gray-400">
              <div className="flex items-center gap-2">
                <Calendar className="w-5 h-5" />
                <span>
                  {t('publishedOn')}{' '}
                  {new Date(post.publishedAt).toLocaleDateString(
                    locale === 'ro' ? 'ro-RO' : locale === 'it' ? 'it-IT' : 'en-US',
                    { year: 'numeric', month: 'long', day: 'numeric' }
                  )}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <User className="w-5 h-5" />
                <span>
                  {t('by')} {post.author}
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Post Content */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-8">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm"
                >
                  <Tag className="w-3 h-3" />
                  {tag}
                </span>
              ))}
            </div>

            {/* Content */}
            <div className="prose prose-lg dark:prose-invert max-w-none">
              <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300 leading-relaxed">
                {post.content[locale as keyof typeof post.content] || post.content.en}
              </div>
            </div>

            {/* Share */}
            <div className="mt-12 pt-8 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                {locale === 'ro' && 'Distribuie acest articol'}
                {locale === 'en' && 'Share this article'}
                {locale === 'it' && 'Condividi questo articolo'}
              </p>
              <div className="flex gap-4">
                <a
                  href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                    `https://gridjacarts.com/${locale}/blog/${slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                  </svg>
                </a>
                <a
                  href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                    `https://gridjacarts.com/${locale}/blog/${slug}`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 bg-blue-700 rounded-full flex items-center justify-center text-white hover:scale-110 transition-transform"
                >
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
