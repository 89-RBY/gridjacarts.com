import { MetadataRoute } from 'next';
import { getBlogPosts } from '@/lib/data';

// Force dynamic generation
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://gridjacarts.com';
  const locales = ['ro', 'en', 'it'];

  // Static pages
  const staticPages = ['', '/about', '/services', '/portfolio', '/blog', '/contact'];

  const staticRoutes = locales.flatMap((locale) =>
    staticPages.map((page) => ({
      url: `${baseUrl}/${locale}${page}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: page === '' ? 1 : 0.8,
    }))
  );

  // Blog posts - with error handling for build time
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    const publishedPosts = posts.filter((post) => post.status === 'published');

    blogRoutes = locales.flatMap((locale) =>
      publishedPosts.map((post) => ({
        url: `${baseUrl}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    );
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Return static routes only if database is unavailable
  }

  return [...staticRoutes, ...blogRoutes];
}
