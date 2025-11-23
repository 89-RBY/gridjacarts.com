# Migration Guide: Multilingual Slugs for SEO

This migration adds multilingual slug support to improve SEO by having language-specific URLs for blog posts.

## What Changes

### Before (Single slug for all languages):
```
RO: /ro/blog/ghid-complet-web-design-modern-2026
EN: /en/blog/ghid-complet-web-design-modern-2026  ❌
IT: /it/blog/ghid-complet-web-design-modern-2026  ❌
```

### After (Language-specific slugs):
```
RO: /ro/blog/ghid-complet-web-design-modern-2026
EN: /en/blog/complete-modern-web-design-guide-2026  ✅
IT: /it/blog/guida-completa-web-design-moderno-2026  ✅
```

## SEO Benefits

1. **Better local rankings** - Google understands page language
2. **Higher CTR** - Native language URLs are more inviting
3. **Keywords in URL** - Localized keywords help SEO
4. **Better UX** - Users see understandable URLs
5. **hreflang tags** - Automatic alternate language signals

## Migration Steps

### 1. Add new columns to database

```bash
# Connect to your Railway PostgreSQL database
railway run psql

# Execute the migration
\i prisma/migrations/add_multilingual_slugs.sql
```

Or execute this SQL directly:

```sql
-- Add multilingual slug columns to BlogPost table
ALTER TABLE "BlogPost"
ADD COLUMN IF NOT EXISTS "slugRo" TEXT,
ADD COLUMN IF NOT EXISTS "slugEn" TEXT,
ADD COLUMN IF NOT EXISTS "slugIt" TEXT;

-- Copy existing slug to all language versions temporarily
UPDATE "BlogPost" SET "slugRo" = slug WHERE "slugRo" IS NULL;
UPDATE "BlogPost" SET "slugEn" = slug WHERE "slugEn" IS NULL;
UPDATE "BlogPost" SET "slugIt" = slug WHERE "slugIt" IS NULL;

-- Add unique constraints
CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_slugRo_key" ON "BlogPost"("slugRo");
CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_slugEn_key" ON "BlogPost"("slugEn");
CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_slugIt_key" ON "BlogPost"("slugIt");

-- Make columns NOT NULL after data is populated
ALTER TABLE "BlogPost" ALTER COLUMN "slugRo" SET NOT NULL;
ALTER TABLE "BlogPost" ALTER COLUMN "slugEn" SET NOT NULL;
ALTER TABLE "BlogPost" ALTER COLUMN "slugIt" SET NOT NULL;
```

### 2. Update existing article slugs

```bash
# Still in psql
\i scripts/update-blog-slugs.sql
```

Or execute:

```sql
-- Update multilingual slugs for existing blog posts

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
```

### 3. Deploy updated code

```bash
# Commit and push changes
git add .
git commit -m "feat: Add multilingual slug support for SEO optimization"
git push

# Deploy to Railway
# Railway will automatically detect the changes and redeploy
```

### 4. Update future articles

When creating new articles in `scripts/insert-blog-articles.sql`, include all three slugs:

```sql
INSERT INTO "BlogPost" (
  id, slug, "slugRo", "slugEn", "slugIt",
  "titleRo", "titleEn", "titleIt",
  -- ... other fields
)
VALUES (
  'post_' || substring(md5(random()::text) from 1 for 20),
  'slug-romanesc',                        -- Legacy
  'slug-romanesc',                        -- RO slug
  'romanian-slug-english',                -- EN slug
  'slug-rumeno-italiano',                 -- IT slug
  -- ... other values
);
```

## Verification

After migration, verify:

1. **Database check:**
   ```sql
   SELECT slug, "slugRo", "slugEn", "slugIt" FROM "BlogPost";
   ```

2. **URL check:** Visit these URLs and confirm they work:
   - `/ro/blog/ghid-complet-web-design-modern-2026`
   - `/en/blog/complete-modern-web-design-guide-2026`
   - `/it/blog/guida-completa-web-design-moderno-2026`

3. **SEO check:** View page source and confirm hreflang tags:
   ```html
   <link rel="alternate" hreflang="ro" href="..." />
   <link rel="alternate" hreflang="en" href="..." />
   <link rel="alternate" hreflang="it" href="..." />
   ```

## Rollback (if needed)

If something goes wrong, the `slug` field is kept for backwards compatibility. Old URLs will still work.

## Notes

- Old URLs with single slug will still work (backwards compatible)
- New multilingual slugs will be used for all new links
- hreflang tags are automatically generated for SEO
- Each language now has its own SEO-optimized URL
