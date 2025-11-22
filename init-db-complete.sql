-- ===================================================================
-- Script COMPLETO di inizializzazione database GridjaCards
-- Include creazione tabelle + dati iniziali
-- ===================================================================
-- IMPORTANTE: Password admin temporanea: admin123
-- CAMBIALA SUBITO dopo il primo login!
-- ===================================================================

-- DROP existing tables (opzionale - decommentare se vuoi ricominciare da zero)
-- DROP TABLE IF EXISTS "NewsletterSubscriber" CASCADE;
-- DROP TABLE IF EXISTS "SiteSettings" CASCADE;
-- DROP TABLE IF EXISTS "Service" CASCADE;
-- DROP TABLE IF EXISTS "BlogPost" CASCADE;
-- DROP TABLE IF EXISTS "PartnerApplication" CASCADE;
-- DROP TABLE IF EXISTS "Partner" CASCADE;
-- DROP TABLE IF EXISTS "User" CASCADE;

-- ===================================================================
-- CREAZIONE TABELLE
-- ===================================================================

-- Tabella User
CREATE TABLE IF NOT EXISTS "User" (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    name TEXT NOT NULL,
    password TEXT NOT NULL,
    role TEXT NOT NULL DEFAULT 'partner',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Partner
CREATE TABLE IF NOT EXISTS "Partner" (
    id TEXT PRIMARY KEY,
    "userId" TEXT UNIQUE NOT NULL,
    "companyName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    "taxId" TEXT NOT NULL,
    markup DOUBLE PRECISION NOT NULL DEFAULT 20,
    status TEXT NOT NULL DEFAULT 'pending',
    notes TEXT NOT NULL DEFAULT '',
    "approvedAt" TIMESTAMP(3),
    "approvedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Partner_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"(id) ON DELETE CASCADE ON UPDATE CASCADE
);

-- Tabella PartnerApplication
CREATE TABLE IF NOT EXISTS "PartnerApplication" (
    id TEXT PRIMARY KEY,
    "companyName" TEXT NOT NULL,
    "contactPerson" TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    address TEXT NOT NULL,
    "taxId" TEXT NOT NULL,
    message TEXT NOT NULL,
    status TEXT NOT NULL DEFAULT 'pending',
    "reviewedAt" TIMESTAMP(3),
    "reviewedBy" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabella BlogPost
CREATE TABLE IF NOT EXISTS "BlogPost" (
    id TEXT PRIMARY KEY,
    slug TEXT UNIQUE NOT NULL,
    "titleRo" TEXT NOT NULL,
    "titleEn" TEXT NOT NULL,
    "titleIt" TEXT NOT NULL,
    "contentRo" TEXT NOT NULL,
    "contentEn" TEXT NOT NULL,
    "contentIt" TEXT NOT NULL,
    "excerptRo" TEXT NOT NULL,
    "excerptEn" TEXT NOT NULL,
    "excerptIt" TEXT NOT NULL,
    author TEXT NOT NULL,
    tags TEXT NOT NULL DEFAULT '[]',
    status TEXT NOT NULL DEFAULT 'draft',
    "publishedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabella Service
CREATE TABLE IF NOT EXISTS "Service" (
    id TEXT PRIMARY KEY,
    name TEXT NOT NULL,
    "basePrice" DOUBLE PRECISION NOT NULL,
    description TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabella SiteSettings
CREATE TABLE IF NOT EXISTS "SiteSettings" (
    id TEXT PRIMARY KEY DEFAULT 'main',
    "analyticsCode" TEXT NOT NULL DEFAULT '',
    "chatbotCode" TEXT NOT NULL DEFAULT '',
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- Tabella NewsletterSubscriber
CREATE TABLE IF NOT EXISTS "NewsletterSubscriber" (
    id TEXT PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    status TEXT NOT NULL DEFAULT 'active',
    source TEXT NOT NULL DEFAULT 'website',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

-- ===================================================================
-- INSERIMENTO DATI INIZIALI
-- ===================================================================

-- 1. UTENTE ADMIN
-- Password: admin123 (CAMBIALA SUBITO!)
-- Hash bcrypt: $2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW

INSERT INTO "User" (id, email, name, password, role, "createdAt", "updatedAt")
VALUES (
  'admin_' || substring(md5(random()::text) from 1 for 20),
  'admin@gridjacarts.com',
  'GridjaCards Admin',
  '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
  'admin',
  NOW(),
  NOW()
)
ON CONFLICT (email) DO NOTHING;

-- 2. SERVIZI

INSERT INTO "Service" (id, name, "basePrice", description, "createdAt", "updatedAt")
VALUES
  (
    'svc_webdesign_' || substring(md5(random()::text) from 1 for 15),
    'Web Design',
    800.00,
    'Design professionale e responsive per siti web moderni',
    NOW(),
    NOW()
  ),
  (
    'svc_webdev_' || substring(md5(random()::text) from 1 for 15),
    'Web Development',
    1500.00,
    'Sviluppo web completo con tecnologie moderne (Next.js, React, Node.js)',
    NOW(),
    NOW()
  ),
  (
    'svc_seo_' || substring(md5(random()::text) from 1 for 15),
    'SEO Optimization',
    600.00,
    'Ottimizzazione SEO completa per motori di ricerca',
    NOW(),
    NOW()
  ),
  (
    'svc_smm_' || substring(md5(random()::text) from 1 for 15),
    'Social Media Marketing',
    500.00,
    'Gestione e strategia social media per crescita organica',
    NOW(),
    NOW()
  ),
  (
    'svc_ads_' || substring(md5(random()::text) from 1 for 15),
    'Digital Advertising',
    700.00,
    'Campagne pubblicitarie Google Ads, Facebook Ads e remarketing',
    NOW(),
    NOW()
  ),
  (
    'svc_vr_' || substring(md5(random()::text) from 1 for 15),
    'Virtual Tours 360°',
    400.00,
    'Tour virtuali interattivi con fotografie a 360 gradi',
    NOW(),
    NOW()
  ),
  (
    'svc_fullstack_' || substring(md5(random()::text) from 1 for 15),
    'Full-Stack Development',
    2500.00,
    'Sviluppo completo di applicazioni web con backend, database e API',
    NOW(),
    NOW()
  ),
  (
    'svc_ecommerce_' || substring(md5(random()::text) from 1 for 15),
    'E-Commerce Development',
    3000.00,
    'Piattaforme e-commerce complete con pagamenti, inventario e gestione ordini',
    NOW(),
    NOW()
  ),
  (
    'svc_mobile_' || substring(md5(random()::text) from 1 for 15),
    'Mobile App Development',
    3500.00,
    'Sviluppo applicazioni mobile iOS e Android',
    NOW(),
    NOW()
  ),
  (
    'svc_branding_' || substring(md5(random()::text) from 1 for 15),
    'Brand Identity & Logo Design',
    450.00,
    'Creazione identità visiva completa e design logo professionale',
    NOW(),
    NOW()
  );

-- 3. IMPOSTAZIONI SITO

INSERT INTO "SiteSettings" (id, "analyticsCode", "chatbotCode", "updatedAt")
VALUES ('main', '', '', NOW())
ON CONFLICT (id) DO NOTHING;

-- 4. BLOG POST DI ESEMPIO

INSERT INTO "BlogPost" (
  id,
  slug,
  "titleRo",
  "titleEn",
  "titleIt",
  "contentRo",
  "contentEn",
  "contentIt",
  "excerptRo",
  "excerptEn",
  "excerptIt",
  author,
  tags,
  status,
  "publishedAt",
  "createdAt",
  "updatedAt"
)
VALUES (
  'post_' || substring(md5(random()::text) from 1 for 20),
  'importanta-unui-site-web-profesional-2024',
  'Importanța unui site web profesional în 2024',
  'The importance of a professional website in 2024',
  'L''importanza di un sito web professionale nel 2024',
  '<h2>De ce afacerea ta are nevoie de un site web profesional?</h2><p>În era digitală actuală, prezența online nu mai este opțională – este esențială. Un site web profesional reprezintă cartea de vizită digitală a afacerii tale și primul punct de contact cu potențialii clienți.</p><h3>Beneficiile unui site web profesional</h3><ul><li><strong>Credibilitate crescută:</strong> Un site web bine realizat inspiră încredere și profesionalism</li><li><strong>Vizibilitate 24/7:</strong> Afacerea ta este accesibilă oricând, oriunde</li><li><strong>Marketing cost-eficient:</strong> Investiție pe termen lung cu ROI măsurabil</li><li><strong>Avantaj competitiv:</strong> Diferențiază-te de concurență cu o prezență online puternică</li></ul><h3>Elemente cheie ale unui site de succes</h3><p>Un site web modern trebuie să fie:</p><ol><li><strong>Responsive:</strong> Optimizat pentru desktop, tablete și mobile</li><li><strong>Rapid:</strong> Timp de încărcare sub 3 secunde</li><li><strong>SEO-friendly:</strong> Optimizat pentru motoarele de căutare</li><li><strong>Sigur:</strong> Certificat SSL și protecție împotriva atacurilor</li><li><strong>User-friendly:</strong> Navigare intuitivă și experiență plăcută</li></ol><h3>Investiția în viitor</h3><p>Un site web profesional nu este o cheltuială, ci o investiție strategică în creșterea afacerii tale. În 2024, consumatorii se așteaptă să găsească orice business online – asigură-te că te pot găsi și pe tine!</p><p>La GridjaCards, creăm site-uri web care nu doar arată bine, ci aduc rezultate concrete pentru afacerea ta.</p>',
  '<h2>Why your business needs a professional website?</h2><p>In today''s digital age, online presence is no longer optional – it''s essential. A professional website represents your business''s digital business card and the first point of contact with potential customers.</p><h3>Benefits of a professional website</h3><ul><li><strong>Increased credibility:</strong> A well-crafted website inspires trust and professionalism</li><li><strong>24/7 visibility:</strong> Your business is accessible anytime, anywhere</li><li><strong>Cost-effective marketing:</strong> Long-term investment with measurable ROI</li><li><strong>Competitive advantage:</strong> Stand out from competitors with a strong online presence</li></ul><h3>Key elements of a successful website</h3><p>A modern website must be:</p><ol><li><strong>Responsive:</strong> Optimized for desktop, tablets, and mobile</li><li><strong>Fast:</strong> Loading time under 3 seconds</li><li><strong>SEO-friendly:</strong> Optimized for search engines</li><li><strong>Secure:</strong> SSL certificate and protection against attacks</li><li><strong>User-friendly:</strong> Intuitive navigation and pleasant experience</li></ol><h3>Investment in the future</h3><p>A professional website is not an expense, but a strategic investment in your business growth. In 2024, consumers expect to find any business online – make sure they can find you too!</p><p>At GridjaCards, we create websites that not only look great but deliver concrete results for your business.</p>',
  '<h2>Perché la tua azienda ha bisogno di un sito web professionale?</h2><p>Nell''era digitale attuale, la presenza online non è più opzionale – è essenziale. Un sito web professionale rappresenta il biglietto da visita digitale della tua azienda e il primo punto di contatto con i potenziali clienti.</p><h3>Vantaggi di un sito web professionale</h3><ul><li><strong>Credibilità aumentata:</strong> Un sito ben realizzato ispira fiducia e professionalità</li><li><strong>Visibilità 24/7:</strong> La tua azienda è accessibile sempre, ovunque</li><li><strong>Marketing cost-effective:</strong> Investimento a lungo termine con ROI misurabile</li><li><strong>Vantaggio competitivo:</strong> Differenziati dalla concorrenza con una forte presenza online</li></ul><h3>Elementi chiave di un sito di successo</h3><p>Un sito web moderno deve essere:</p><ol><li><strong>Responsive:</strong> Ottimizzato per desktop, tablet e mobile</li><li><strong>Veloce:</strong> Tempo di caricamento sotto i 3 secondi</li><li><strong>SEO-friendly:</strong> Ottimizzato per i motori di ricerca</li><li><strong>Sicuro:</strong> Certificato SSL e protezione contro gli attacchi</li><li><strong>User-friendly:</strong> Navigazione intuitiva ed esperienza piacevole</li></ol><h3>Investimento nel futuro</h3><p>Un sito web professionale non è una spesa, ma un investimento strategico nella crescita della tua azienda. Nel 2024, i consumatori si aspettano di trovare qualsiasi business online – assicurati che possano trovare anche te!</p><p>Da GridjaCards, creiamo siti web che non solo hanno un bell''aspetto, ma portano risultati concreti per la tua azienda.</p>',
  'Un site web profesional este esențial pentru succesul afacerii tale în 2024. Descoperă de ce prezența online face diferența și cum să creezi un site care aduce rezultate.',
  'A professional website is essential for your business success in 2024. Discover why online presence makes the difference and how to create a website that delivers results.',
  'Un sito web professionale è essenziale per il successo della tua azienda nel 2024. Scopri perché la presenza online fa la differenza e come creare un sito che porta risultati.',
  'GridjaCards Team',
  '["Web Design", "Digital Marketing", "SEO", "Business Growth"]',
  'published',
  NOW(),
  NOW(),
  NOW()
)
ON CONFLICT (slug) DO NOTHING;

-- ===================================================================
-- VERIFICA INSERIMENTI
-- ===================================================================

SELECT 'Users' as table_name, COUNT(*) as count FROM "User"
UNION ALL
SELECT 'Services', COUNT(*) FROM "Service"
UNION ALL
SELECT 'SiteSettings', COUNT(*) FROM "SiteSettings"
UNION ALL
SELECT 'BlogPosts', COUNT(*) FROM "BlogPost"
UNION ALL
SELECT 'Partners', COUNT(*) FROM "Partner"
UNION ALL
SELECT 'PartnerApplications', COUNT(*) FROM "PartnerApplication"
UNION ALL
SELECT 'NewsletterSubscribers', COUNT(*) FROM "NewsletterSubscriber";

-- Mostra dettagli admin user
SELECT
  email,
  name,
  role,
  'Password: admin123' as credentials,
  'CAMBIALA SUBITO!' as warning
FROM "User"
WHERE role = 'admin';

-- ===================================================================
-- ✅ COMPLETATO!
-- ===================================================================
-- Login admin: admin@gridjacarts.com / admin123
-- IMPORTANTE: Cambia la password dopo il primo login!
-- ===================================================================
