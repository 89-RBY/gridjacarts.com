-- Seed Service Pricing Data
-- Populates the ServicePricing table with initial pricing

-- Clear existing data (optional - comment out if you want to keep existing data)
-- DELETE FROM "ServicePricing";

-- Web Design Services
INSERT INTO "ServicePricing" ("id", "serviceType", "serviceName", "category", "priceRo", "priceIt", "priceEn", "description", "isActive", "isRecurring", "createdAt", "updatedAt")
VALUES
  ('sp_web_basic', 'web-design-basic', 'Web Design Basic', 'web-design', 800, 1500, 1200, 'Sito web responsive 3-5 pagine', true, false, NOW(), NOW()),
  ('sp_web_premium', 'web-design-premium', 'Web Design Premium', 'web-design', 2000, 3500, 2800, 'Sito web completo con CMS e funzionalità avanzate', true, false, NOW(), NOW()),
  ('sp_web_complete', 'web-design-complete', 'Web Design Complete', 'web-design', 3000, 5000, 4000, 'Sito web enterprise con integrazioni custom', true, false, NOW(), NOW())
ON CONFLICT ("serviceType") DO UPDATE SET
  "serviceName" = EXCLUDED."serviceName",
  "priceRo" = EXCLUDED."priceRo",
  "priceIt" = EXCLUDED."priceIt",
  "priceEn" = EXCLUDED."priceEn",
  "description" = EXCLUDED."description",
  "updatedAt" = NOW();

-- E-Commerce Services
INSERT INTO "ServicePricing" ("id", "serviceType", "serviceName", "category", "priceRo", "priceIt", "priceEn", "description", "isActive", "isRecurring", "createdAt", "updatedAt")
VALUES
  ('sp_ecom_basic', 'ecommerce-basic', 'E-Commerce Basic', 'ecommerce', 2500, 4500, 3500, 'Negozio online fino a 50 prodotti', true, false, NOW(), NOW()),
  ('sp_ecom_pro', 'ecommerce-pro', 'E-Commerce Pro', 'ecommerce', 4000, 7000, 5500, 'Negozio online fino a 500 prodotti con funzionalità avanzate', true, false, NOW(), NOW())
ON CONFLICT ("serviceType") DO UPDATE SET
  "serviceName" = EXCLUDED."serviceName",
  "priceRo" = EXCLUDED."priceRo",
  "priceIt" = EXCLUDED."priceIt",
  "priceEn" = EXCLUDED."priceEn",
  "description" = EXCLUDED."description",
  "updatedAt" = NOW();

-- SEO Services
INSERT INTO "ServicePricing" ("id", "serviceType", "serviceName", "category", "priceRo", "priceIt", "priceEn", "description", "isActive", "isRecurring", "createdAt", "updatedAt")
VALUES
  ('sp_seo_audit', 'seo-audit', 'SEO Audit Completo', 'seo', 400, 600, 500, 'Analisi SEO completa del sito', true, false, NOW(), NOW()),
  ('sp_seo_base', 'seo-base', 'SEO Base (mese)', 'seo', 400, 800, 600, 'Ottimizzazione SEO mensile base', true, true, NOW(), NOW()),
  ('sp_seo_pro', 'seo-pro', 'SEO Pro (mese)', 'seo', 700, 1200, 900, 'Ottimizzazione SEO mensile professionale', true, true, NOW(), NOW()),
  ('sp_seo_6months', 'seo-6-months', 'SEO 6 Mesi', 'seo', 2400, 4800, 3600, 'Pacchetto SEO 6 mesi (sconto incluso)', true, false, NOW(), NOW()),
  ('sp_seo_12months', 'seo-12-months', 'SEO 12 Mesi', 'seo', 4800, 9600, 7200, 'Pacchetto SEO 12 mesi (sconto incluso)', true, false, NOW(), NOW())
ON CONFLICT ("serviceType") DO UPDATE SET
  "serviceName" = EXCLUDED."serviceName",
  "priceRo" = EXCLUDED."priceRo",
  "priceIt" = EXCLUDED."priceIt",
  "priceEn" = EXCLUDED."priceEn",
  "description" = EXCLUDED."description",
  "updatedAt" = NOW();

-- Social Media Services
INSERT INTO "ServicePricing" ("id", "serviceType", "serviceName", "category", "priceRo", "priceIt", "priceEn", "description", "isActive", "isRecurring", "createdAt", "updatedAt")
VALUES
  ('sp_social_setup', 'social-media-setup', 'Social Media Setup', 'social-media', 300, 600, 450, 'Setup profili social e strategia iniziale', true, false, NOW(), NOW()),
  ('sp_social_base', 'social-media-base', 'Social Media Base (mese)', 'social-media', 300, 600, 450, 'Gestione social media mensile base', true, true, NOW(), NOW()),
  ('sp_social_pro', 'social-media-pro', 'Social Media Pro (mese)', 'social-media', 500, 900, 700, 'Gestione social media mensile professionale', true, true, NOW(), NOW())
ON CONFLICT ("serviceType") DO UPDATE SET
  "serviceName" = EXCLUDED."serviceName",
  "priceRo" = EXCLUDED."priceRo",
  "priceIt" = EXCLUDED."priceIt",
  "priceEn" = EXCLUDED."priceEn",
  "description" = EXCLUDED."description",
  "updatedAt" = NOW();

-- Branding Services
INSERT INTO "ServicePricing" ("id", "serviceType", "serviceName", "category", "priceRo", "priceIt", "priceEn", "description", "isActive", "isRecurring", "createdAt", "updatedAt")
VALUES
  ('sp_logo', 'logo-design', 'Logo Design', 'branding', 200, 500, 350, 'Design logo professionale con 3 revisioni', true, false, NOW(), NOW()),
  ('sp_logo_brand', 'logo-design-brand', 'Logo + Brand Kit', 'branding', 400, 700, 550, 'Logo + manuale del brand completo', true, false, NOW(), NOW()),
  ('sp_branding_complete', 'branding-complete', 'Branding Completo', 'branding', 800, 1500, 1200, 'Pacchetto branding completo con manuale', true, false, NOW(), NOW())
ON CONFLICT ("serviceType") DO UPDATE SET
  "serviceName" = EXCLUDED."serviceName",
  "priceRo" = EXCLUDED."priceRo",
  "priceIt" = EXCLUDED."priceIt",
  "priceEn" = EXCLUDED."priceEn",
  "description" = EXCLUDED."description",
  "updatedAt" = NOW();

-- Landing Pages
INSERT INTO "ServicePricing" ("id", "serviceType", "serviceName", "category", "priceRo", "priceIt", "priceEn", "description", "isActive", "isRecurring", "createdAt", "updatedAt")
VALUES
  ('sp_landing', 'landing-page', 'Landing Page Premium', 'web-design', 400, 800, 600, 'Landing page ottimizzata per conversioni', true, false, NOW(), NOW())
ON CONFLICT ("serviceType") DO UPDATE SET
  "serviceName" = EXCLUDED."serviceName",
  "priceRo" = EXCLUDED."priceRo",
  "priceIt" = EXCLUDED."priceIt",
  "priceEn" = EXCLUDED."priceEn",
  "description" = EXCLUDED."description",
  "updatedAt" = NOW();

-- Digital Advertising
INSERT INTO "ServicePricing" ("id", "serviceType", "serviceName", "category", "priceRo", "priceIt", "priceEn", "description", "isActive", "isRecurring", "createdAt", "updatedAt")
VALUES
  ('sp_ads_setup', 'ads-campaign-setup', 'Campagna Ads Setup', 'advertising', 500, 800, 650, 'Setup campagna pubblicitaria (Google/Facebook)', true, false, NOW(), NOW()),
  ('sp_ads_manage', 'ads-management', 'Gestione Ads (mese)', 'advertising', 400, 700, 550, 'Gestione mensile campagne pubblicitarie', true, true, NOW(), NOW())
ON CONFLICT ("serviceType") DO UPDATE SET
  "serviceName" = EXCLUDED."serviceName",
  "priceRo" = EXCLUDED."priceRo",
  "priceIt" = EXCLUDED."priceIt",
  "priceEn" = EXCLUDED."priceEn",
  "description" = EXCLUDED."description",
  "updatedAt" = NOW();

-- Verify inserted data
SELECT COUNT(*) as total_services FROM "ServicePricing";
SELECT "category", COUNT(*) as count FROM "ServicePricing" GROUP BY "category" ORDER BY "category";
