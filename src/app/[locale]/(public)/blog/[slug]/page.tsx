import { getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getBlogPostBySlug } from '@/lib/data';
import { Calendar, User, ArrowLeft, Tag } from 'lucide-react';
import BlogPostWrapper from '@/components/BlogPostWrapper';
import { marked } from 'marked';

interface BlogPostPageProps {
  params: { locale: string; slug: string };
}

// Force dynamic rendering - no static generation at build time
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale, slug } }: BlogPostPageProps) {
  try {
    const post = await getBlogPostBySlug(slug, locale);

    if (!post) {
      return { title: 'Post Not Found' };
    }

    const baseUrl = 'https://gridjacarts.com';

    return {
      title: post.title[locale as keyof typeof post.title] || post.title.en,
      description: post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en,
      alternates: {
        canonical: `${baseUrl}/${locale}/blog/${post.slugs[locale as keyof typeof post.slugs]}`,
        languages: {
          'ro': `${baseUrl}/ro/blog/${post.slugs.ro}`,
          'en': `${baseUrl}/en/blog/${post.slugs.en}`,
          'it': `${baseUrl}/it/blog/${post.slugs.it}`,
        },
      },
    };
  } catch {
    return { title: 'Blog Post' };
  }
}

export default async function BlogPostPage({ params: { locale, slug } }: BlogPostPageProps) {
  const post = await getBlogPostBySlug(slug, locale);
  const t = await getTranslations({ locale, namespace: 'blog' });

  if (!post || post.status !== 'published') {
    notFound();
  }

  // Parse markdown content to HTML
  const content = post.content[locale as keyof typeof post.content] || post.content.en;
  const htmlContent = await marked(content);

  return (
    <BlogPostWrapper slugs={post.slugs}>
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
            <div
              className="prose prose-lg dark:prose-invert max-w-none
                prose-headings:text-gray-900 dark:prose-headings:text-white
                prose-h2:text-3xl prose-h2:font-bold prose-h2:mt-12 prose-h2:mb-6 prose-h2:pb-3 prose-h2:border-b prose-h2:border-gray-200 dark:prose-h2:border-gray-700
                prose-h3:text-2xl prose-h3:font-semibold prose-h3:mt-10 prose-h3:mb-4
                prose-h4:text-xl prose-h4:font-semibold prose-h4:mt-8 prose-h4:mb-3
                prose-p:text-gray-700 dark:prose-p:text-gray-300 prose-p:leading-relaxed prose-p:mb-6
                prose-a:text-primary-600 dark:prose-a:text-primary-400 prose-a:no-underline hover:prose-a:underline
                prose-strong:text-gray-900 dark:prose-strong:text-white prose-strong:font-semibold
                prose-ul:text-gray-700 dark:prose-ul:text-gray-300 prose-ul:my-6 prose-ul:space-y-2
                prose-ol:text-gray-700 dark:prose-ol:text-gray-300 prose-ol:my-6 prose-ol:space-y-2
                prose-li:text-gray-700 dark:prose-li:text-gray-300"
              dangerouslySetInnerHTML={{
                __html: htmlContent,
              }}
            />

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
    </BlogPostWrapper>
  );
}
