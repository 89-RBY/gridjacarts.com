import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/admin/', '/partner/', '/api/', '/login/'],
      },
    ],
    sitemap: 'https://gridjacarts.com/sitemap.xml',
  };
}
