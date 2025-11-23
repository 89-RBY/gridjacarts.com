-- Update multilingual slugs for existing blog posts
-- This provides SEO-optimized URLs in each language

-- 1. Web Design 2026
UPDATE "BlogPost"
SET
  "slugRo" = 'ghid-complet-web-design-modern-2026',
  "slugEn" = 'complete-modern-web-design-guide-2026',
  "slugIt" = 'guida-completa-web-design-moderno-2026'
WHERE slug = 'ghid-complet-web-design-modern-2026';

-- 2. SEO 2026
UPDATE "BlogPost"
SET
  "slugRo" = 'seo-ghid-complet-optimizare-motoare-cautare-2026',
  "slugEn" = 'complete-seo-guide-search-engine-optimization-2026',
  "slugIt" = 'guida-completa-seo-ottimizzazione-motori-ricerca-2026'
WHERE slug = 'seo-ghid-complet-optimizare-motoare-cautare-2026';

-- 3. E-Commerce 2026
UPDATE "BlogPost"
SET
  "slugRo" = 'ghid-ecommerce-succes-2026-magazin-online',
  "slugEn" = 'ecommerce-success-guide-2026-online-store',
  "slugIt" = 'guida-ecommerce-successo-2026-negozio-online'
WHERE slug = 'ghid-ecommerce-succes-2026-magazin-online';

-- 4. Social Media Marketing 2026
UPDATE "BlogPost"
SET
  "slugRo" = 'social-media-marketing-strategie-complete-2026',
  "slugEn" = 'social-media-marketing-complete-strategies-2026',
  "slugIt" = 'social-media-marketing-strategie-complete-2026'
WHERE slug = 'social-media-marketing-strategie-complete-2026';

-- 5. Digital Advertising 2026
UPDATE "BlogPost"
SET
  "slugRo" = 'publicitate-digitala-ghid-complet-2026',
  "slugEn" = 'digital-advertising-complete-guide-2026',
  "slugIt" = 'pubblicita-digitale-guida-completa-2026'
WHERE slug = 'publicitate-digitala-ghid-complet-2026';

-- Verify updates
SELECT id, slug, "slugRo", "slugEn", "slugIt" FROM "BlogPost" WHERE status = 'published';
