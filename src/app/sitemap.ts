import { MetadataRoute } from 'next';
import { getBlogPosts, getAllProducts, getAllServicePages } from '@/lib/data';
import { locales } from '@/i18n';
import { SITE_URL } from '@/lib/seo';

// Force dynamic rendering due to database queries
export const dynamic = 'force-dynamic';
export const revalidate = 3600; // Revalidate every hour

function withLanguageAlternates(path: string) {
  return {
    languages: Object.fromEntries(locales.map((l) => [l, `${SITE_URL}/${l}${path}`])),
  };
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // Static pages
  const staticPages = [
    { path: '', priority: 1 },
    { path: '/about', priority: 0.8 },
    { path: '/services', priority: 0.8 },
    { path: '/products', priority: 0.8 },
    { path: '/portfolio', priority: 0.8 },
    { path: '/blog', priority: 0.8 },
    { path: '/labs', priority: 0.6 },
    { path: '/contact', priority: 0.8 },
    { path: '/corsi-ai', priority: 0.7 },
  ];

  const staticRoutes = locales.flatMap((locale) =>
    staticPages.map(({ path, priority }) => ({
      url: `${SITE_URL}/${locale}${path}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority,
      alternates: withLanguageAlternates(path),
    }))
  );

  // Service detail pages (static seed data, no DB dependency)
  const serviceRoutes = locales.flatMap((locale) =>
    getAllServicePages().map((service) => ({
      url: `${SITE_URL}/${locale}/services/${service.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
      alternates: withLanguageAlternates(`/services/${service.slug}`),
    }))
  );

  // Blog posts and products - with error handling for build time
  let blogRoutes: MetadataRoute.Sitemap = [];
  try {
    const posts = await getBlogPosts();
    const publishedPosts = posts.filter((post) => post.status === 'published');

    blogRoutes = locales.flatMap((locale) =>
      publishedPosts.map((post) => ({
        url: `${SITE_URL}/${locale}/blog/${post.slug}`,
        lastModified: new Date(post.updatedAt),
        changeFrequency: 'weekly' as const,
        priority: 0.6,
      }))
    );
  } catch (error) {
    console.error('Error fetching blog posts for sitemap:', error);
    // Return static routes only if database is unavailable
  }

  let productRoutes: MetadataRoute.Sitemap = [];
  try {
    const products = await getAllProducts();

    productRoutes = locales.flatMap((locale) =>
      products.map((product) => ({
        url: `${SITE_URL}/${locale}/products/${product.slug}`,
        lastModified: new Date(),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
        alternates: withLanguageAlternates(`/products/${product.slug}`),
      }))
    );
  } catch (error) {
    console.error('Error fetching products for sitemap:', error);
  }

  return [...staticRoutes, ...serviceRoutes, ...blogRoutes, ...productRoutes];
}
