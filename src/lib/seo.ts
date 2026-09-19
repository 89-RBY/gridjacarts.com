import { locales } from '@/i18n';

export const SITE_URL = 'https://gridjacarts.com';

/**
 * Canonical + hreflang alternates for a page that uses the same path
 * across all locales (e.g. /about, /services). For pages with per-locale
 * slugs (like blog posts), build the `languages` map manually instead.
 */
export function localeAlternates(locale: string, path: string = '') {
  return {
    canonical: `${SITE_URL}/${locale}${path}`,
    languages: Object.fromEntries(
      locales.map((l) => [l, `${SITE_URL}/${l}${path}`])
    ),
  };
}
