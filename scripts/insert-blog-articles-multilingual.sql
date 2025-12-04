-- ===================================================================
-- Articoli Blog SEO-Optimized per i Servizi GridjaCards
-- VERSIONE MULTILINGUAL con slugRo, slugEn, slugIt
-- ===================================================================
-- Per nuove installazioni - include tutti i campi slug multilingua
-- ===================================================================

-- 1. WEB DESIGN
INSERT INTO "BlogPost" (
  id, slug, "slugRo", "slugEn", "slugIt",
  "titleRo", "titleEn", "titleIt",
  "contentRo", "contentEn", "contentIt",
  "excerptRo", "excerptEn", "excerptIt",
  author, tags, status, "publishedAt", "createdAt", "updatedAt"
)
SELECT
  'post_' || substring(md5(random()::text) from 1 for 20),
  'ghid-complet-web-design-modern-2026',
  'ghid-complet-web-design-modern-2026',
  'complete-modern-web-design-guide-2026',
  'guida-completa-web-design-moderno-2026',
  'Ghid Complet Web Design Modern: Tendințe și Best Practices 2026',
  'Complete Modern Web Design Guide: Trends and Best Practices 2026',
  'Guida Completa al Web Design Moderno: Tendenze e Best Practices 2026',
  '...',  -- contentRo (use full content from original file)
  '...',  -- contentEn
  '...',  -- contentIt
  'Descoperă principiile web design-ului modern, tendințele 2026 și cum un design profesional poate transforma vizitatorii în clienți. Ghid complet cu best practices.',
  'Discover modern web design principles, 2026 trends, and how professional design can transform visitors into customers. Complete guide with best practices.',
  'Scopri i principi del web design moderno, le tendenze 2026 e come un design professionale può trasformare i visitatori in clienti. Guida completa con best practices.',
  'GridjaCards Team',
  '["Web Design", "UX/UI", "Responsive Design", "Web Development", "Digital Marketing"]',
  'published',
  NOW(),
  NOW(),
  NOW()
WHERE NOT EXISTS (SELECT 1 FROM "BlogPost" WHERE "slugEn" = 'complete-modern-web-design-guide-2026');

-- NOTE: This is a simplified version. For full article content,
-- use the migration approach:
-- 1. Run: prisma/migrations/add_multilingual_slugs.sql
-- 2. Insert articles with: scripts/insert-blog-articles.sql (old version)
-- 3. Update slugs with: scripts/update-blog-slugs.sql
