import { getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { getBlogPosts } from '@/lib/data';
import { Calendar, User, ArrowRight } from 'lucide-react';

interface BlogPageProps {
  params: { locale: string };
}

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

  let posts: Awaited<ReturnType<typeof getBlogPosts>> = [];
  try {
    const allPosts = await getBlogPosts();
    posts = allPosts.filter((post) => post.status === 'published');
  } catch {
    posts = [];
  }

  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative pt-32 pb-16 tech-grid-bg">
        <div className="absolute inset-0 bg-tech-radial pointer-events-none" />
        <div className="container-custom relative z-10">
          <div className="max-w-3xl">
            <div className="tech-badge-accent mb-6">
              <span className="font-mono text-[11px]">{'//'} BLOG</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-bold mb-6 text-tech-text leading-tight">
              {t('title')}
            </h1>
            <p className="text-lg md:text-xl text-tech-text-dim leading-relaxed">{t('subtitle')}</p>
          </div>
        </div>
      </section>

      {/* Posts */}
      <section className="pb-24">
        <div className="container-custom">
          {posts.length === 0 ? (
            <div className="text-center py-20">
              <p className="text-tech-text-dim font-mono">
                {locale === 'ro' && 'Nu există articole publicate încă.'}
                {locale === 'en' && 'No published articles yet.'}
                {locale === 'it' && 'Nessun articolo pubblicato ancora.'}
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {posts.map((post) => (
                <article key={post.id} className="tech-card group overflow-hidden flex flex-col !p-0">
                  {/* Featured Image */}
                  <div className="aspect-video bg-tech-elevated relative overflow-hidden border-b border-tech-border">
                    {post.imageUrl ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={post.imageUrl}
                        alt={post.title[locale as keyof typeof post.title] || post.title.en}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    ) : (
                      <div className="absolute inset-0 flex items-center justify-center bg-tech-surface">
                        <span className="text-5xl font-display font-bold text-tech-accent/20 font-mono">
                          &lt;/&gt;
                        </span>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex flex-col flex-1">
                    {/* Meta */}
                    <div className="flex items-center gap-4 text-xs text-tech-text-muted mb-3 font-mono">
                      <div className="flex items-center gap-1">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>
                          {new Date(post.publishedAt).toLocaleDateString(
                            locale === 'ro' ? 'ro-RO' : locale === 'it' ? 'it-IT' : 'en-US',
                            { year: 'numeric', month: 'short', day: 'numeric' }
                          )}
                        </span>
                      </div>
                      <div className="flex items-center gap-1">
                        <User className="w-3.5 h-3.5" />
                        <span>{post.author}</span>
                      </div>
                    </div>

                    <h2 className="text-xl font-semibold mb-3 text-tech-text group-hover:text-tech-accent transition-colors">
                      {post.title[locale as keyof typeof post.title] || post.title.en}
                    </h2>

                    <p className="text-sm text-tech-text-dim mb-4 line-clamp-3 leading-relaxed flex-1">
                      {post.excerpt[locale as keyof typeof post.excerpt] || post.excerpt.en}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-4">
                      {post.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-tech-elevated border border-tech-border text-[10px] font-mono rounded text-tech-text-dim"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <Link
                      href={`/${locale}/blog/${post.slugs[locale as keyof typeof post.slugs]}`}
                      className="inline-flex items-center gap-1.5 text-tech-accent hover:text-tech-accent-hover font-medium text-sm mt-auto"
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
