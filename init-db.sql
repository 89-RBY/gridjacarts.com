-- ===================================================================
-- Script di inizializzazione database GridjaCards
-- ===================================================================
-- IMPORTANTE: Dopo aver eseguito questo script, cambia la password dell'admin!
-- Password temporanea admin: admin123
-- ===================================================================

-- Pulisci le tabelle esistenti (opzionale - decommentare se necessario)
-- TRUNCATE TABLE "NewsletterSubscriber" CASCADE;
-- TRUNCATE TABLE "Service" CASCADE;
-- TRUNCATE TABLE "SiteSettings" CASCADE;
-- TRUNCATE TABLE "BlogPost" CASCADE;
-- TRUNCATE TABLE "Partner" CASCADE;
-- TRUNCATE TABLE "PartnerApplication" CASCADE;
-- TRUNCATE TABLE "User" CASCADE;

-- ===================================================================
-- 1. UTENTE ADMIN
-- ===================================================================
-- Password: admin123 (CAMBIALA SUBITO dopo il primo login!)
-- Hash bcrypt per "admin123": $2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW

INSERT INTO "User" (id, email, name, password, role, "createdAt", "updatedAt")
VALUES (
  'admin_' || substring(md5(random()::text) from 1 for 20),
  'admin@gridjacarts.com',
  'GridjaCards Admin',
  '$2b$10$EixZaYVK1fsbw1ZfbX3OXePaWxn96p36WQoeG6Lruj3vjPGga31lW',
  'admin',
  NOW(),
  NOW()
);

-- ===================================================================
-- 2. SERVIZI
-- ===================================================================

INSERT INTO "Service" (id, name, "basePrice", description, "createdAt", "updatedAt")
VALUES
  (
    'svc_' || substring(md5(random()::text) from 1 for 20),
    'Web Design',
    800.00,
    'Design professionale e responsive per siti web moderni',
    NOW(),
    NOW()
  ),
  (
    'svc_' || substring(md5(random()::text) from 1 for 20),
    'Web Development',
    1500.00,
    'Sviluppo web completo con tecnologie moderne (Next.js, React, Node.js)',
    NOW(),
    NOW()
  ),
  (
    'svc_' || substring(md5(random()::text) from 1 for 20),
    'SEO Optimization',
    600.00,
    'Ottimizzazione SEO completa per motori di ricerca',
    NOW(),
    NOW()
  ),
  (
    'svc_' || substring(md5(random()::text) from 1 for 20),
    'Social Media Marketing',
    500.00,
    'Gestione e strategia social media per crescita organica',
    NOW(),
    NOW()
  ),
  (
    'svc_' || substring(md5(random()::text) from 1 for 20),
    'Digital Advertising',
    700.00,
    'Campagne pubblicitarie Google Ads, Facebook Ads e remarketing',
    NOW(),
    NOW()
  ),
  (
    'svc_' || substring(md5(random()::text) from 1 for 20),
    'Virtual Tours 360°',
    400.00,
    'Tour virtuali interattivi con fotografie a 360 gradi',
    NOW(),
    NOW()
  ),
  (
    'svc_' || substring(md5(random()::text) from 1 for 20),
    'Full-Stack Development',
    2500.00,
    'Sviluppo completo di applicazioni web con backend, database e API',
    NOW(),
    NOW()
  ),
  (
    'svc_' || substring(md5(random()::text) from 1 for 20),
    'E-Commerce Development',
    3000.00,
    'Piattaforme e-commerce complete con pagamenti, inventario e gestione ordini',
    NOW(),
    NOW()
  ),
  (
    'svc_' || substring(md5(random()::text) from 1 for 20),
    'Mobile App Development',
    3500.00,
    'Sviluppo applicazioni mobile iOS e Android',
    NOW(),
    NOW()
  ),
  (
    'svc_' || substring(md5(random()::text) from 1 for 20),
    'Brand Identity & Logo Design',
    450.00,
    'Creazione identità visiva completa e design logo professionale',
    NOW(),
    NOW()
  );

-- ===================================================================
-- 3. IMPOSTAZIONI SITO
-- ===================================================================

INSERT INTO "SiteSettings" (id, "analyticsCode", "chatbotCode", "updatedAt")
VALUES (
  'main',
  '',
  '',
  NOW()
);

-- ===================================================================
-- 4. BLOG POST DI ESEMPIO
-- ===================================================================

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

  -- Content RO
  '<h2>De ce afacerea ta are nevoie de un site web profesional?</h2>

<p>În era digitală actuală, prezența online nu mai este opțională – este esențială. Un site web profesional reprezintă cartea de vizită digitală a afacerii tale și primul punct de contact cu potențialii clienți.</p>

<h3>Beneficiile unui site web profesional</h3>

<ul>
  <li><strong>Credibilitate crescută:</strong> Un site web bine realizat inspiră încredere și profesionalism</li>
  <li><strong>Vizibilitate 24/7:</strong> Afacerea ta este accesibilă oricând, oriunde</li>
  <li><strong>Marketing cost-eficient:</strong> Investiție pe termen lung cu ROI măsurabil</li>
  <li><strong>Avantaj competitiv:</strong> Diferențiază-te de concurență cu o prezență online puternică</li>
</ul>

<h3>Elemente cheie ale unui site de succes</h3>

<p>Un site web modern trebuie să fie:</p>

<ol>
  <li><strong>Responsive:</strong> Optimizat pentru desktop, tablete și mobile</li>
  <li><strong>Rapid:</strong> Timp de încărcare sub 3 secunde</li>
  <li><strong>SEO-friendly:</strong> Optimizat pentru motoarele de căutare</li>
  <li><strong>Sigur:</strong> Certificat SSL și protecție împotriva atacurilor</li>
  <li><strong>User-friendly:</strong> Navigare intuitivă și experiență plăcută</li>
</ol>

<h3>Investiția în viitor</h3>

<p>Un site web profesional nu este o cheltuială, ci o investiție strategică în creșterea afacerii tale. În 2024, consumatorii se așteaptă să găsească orice business online – asigură-te că te pot găsi și pe tine!</p>

<p>La GridjaCards, creăm site-uri web care nu doar arată bine, ci aduc rezultate concrete pentru afacerea ta.</p>',

  -- Content EN
  '<h2>Why your business needs a professional website?</h2>

<p>In today''s digital age, online presence is no longer optional – it''s essential. A professional website represents your business''s digital business card and the first point of contact with potential customers.</p>

<h3>Benefits of a professional website</h3>

<ul>
  <li><strong>Increased credibility:</strong> A well-crafted website inspires trust and professionalism</li>
  <li><strong>24/7 visibility:</strong> Your business is accessible anytime, anywhere</li>
  <li><strong>Cost-effective marketing:</strong> Long-term investment with measurable ROI</li>
  <li><strong>Competitive advantage:</strong> Stand out from competitors with a strong online presence</li>
</ul>

<h3>Key elements of a successful website</h3>

<p>A modern website must be:</p>

<ol>
  <li><strong>Responsive:</strong> Optimized for desktop, tablets, and mobile</li>
  <li><strong>Fast:</strong> Loading time under 3 seconds</li>
  <li><strong>SEO-friendly:</strong> Optimized for search engines</li>
  <li><strong>Secure:</strong> SSL certificate and protection against attacks</li>
  <li><strong>User-friendly:</strong> Intuitive navigation and pleasant experience</li>
</ol>

<h3>Investment in the future</h3>

<p>A professional website is not an expense, but a strategic investment in your business growth. In 2024, consumers expect to find any business online – make sure they can find you too!</p>

<p>At GridjaCards, we create websites that not only look great but deliver concrete results for your business.</p>',

  -- Content IT
  '<h2>Perché la tua azienda ha bisogno di un sito web professionale?</h2>

<p>Nell''era digitale attuale, la presenza online non è più opzionale – è essenziale. Un sito web professionale rappresenta il biglietto da visita digitale della tua azienda e il primo punto di contatto con i potenziali clienti.</p>

<h3>Vantaggi di un sito web professionale</h3>

<ul>
  <li><strong>Credibilità aumentata:</strong> Un sito ben realizzato ispira fiducia e professionalità</li>
  <li><strong>Visibilità 24/7:</strong> La tua azienda è accessibile sempre, ovunque</li>
  <li><strong>Marketing cost-effective:</strong> Investimento a lungo termine con ROI misurabile</li>
  <li><strong>Vantaggio competitivo:</strong> Differenziati dalla concorrenza con una forte presenza online</li>
</ul>

<h3>Elementi chiave di un sito di successo</h3>

<p>Un sito web moderno deve essere:</p>

<ol>
  <li><strong>Responsive:</strong> Ottimizzato per desktop, tablet e mobile</li>
  <li><strong>Veloce:</strong> Tempo di caricamento sotto i 3 secondi</li>
  <li><strong>SEO-friendly:</strong> Ottimizzato per i motori di ricerca</li>
  <li><strong>Sicuro:</strong> Certificato SSL e protezione contro gli attacchi</li>
  <li><strong>User-friendly:</strong> Navigazione intuitiva ed esperienza piacevole</li>
</ol>

<h3>Investimento nel futuro</h3>

<p>Un sito web professionale non è una spesa, ma un investimento strategico nella crescita della tua azienda. Nel 2024, i consumatori si aspettano di trovare qualsiasi business online – assicurati che possano trovare anche te!</p>

<p>Da GridjaCards, creiamo siti web che non solo hanno un bell''aspetto, ma portano risultati concreti per la tua azienda.</p>',

  -- Excerpts
  'Un site web profesional este esențial pentru succesul afacerii tale în 2024. Descoperă de ce prezența online face diferența și cum să creezi un site care aduce rezultate.',
  'A professional website is essential for your business success in 2024. Discover why online presence makes the difference and how to create a website that delivers results.',
  'Un sito web professionale è essenziale per il successo della tua azienda nel 2024. Scopri perché la presenza online fa la differenza e come creare un sito che porta risultati.',

  'GridjaCards Team',
  '["Web Design", "Digital Marketing", "SEO", "Business Growth"]',
  'published',
  NOW(),
  NOW(),
  NOW()
);

-- ===================================================================
-- VERIFICA INSERIMENTI
-- ===================================================================

-- Conta record inseriti
SELECT 'Users' as table_name, COUNT(*) as count FROM "User"
UNION ALL
SELECT 'Services', COUNT(*) FROM "Service"
UNION ALL
SELECT 'SiteSettings', COUNT(*) FROM "SiteSettings"
UNION ALL
SELECT 'BlogPosts', COUNT(*) FROM "BlogPost";

-- Mostra dettagli admin user
SELECT
  email,
  name,
  role,
  'Password temporanea: admin123' as note,
  'CAMBIALA SUBITO!' as warning
FROM "User"
WHERE role = 'admin';

-- ===================================================================
-- ISTRUZIONI FINALI
-- ===================================================================
-- 1. Esegui questo script: psql -h <host> -U <user> -d <database> -f init-db.sql
-- 2. Login con: admin@gridjacarts.com / admin123
-- 3. CAMBIA IMMEDIATAMENTE la password dell'admin!
-- 4. Aggiungi il tuo codice Google Analytics in SiteSettings
-- 5. Personalizza i servizi e i prezzi secondo necessità
-- ===================================================================
