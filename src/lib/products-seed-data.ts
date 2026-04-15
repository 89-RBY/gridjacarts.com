// Shared product seed data — used by prisma/seed.ts and lib/data.ts auto-seed
// Edit this file to add/remove projects that should appear by default

export const PRODUCTS_SEED_DATA = [
  {
    slug: 'leachatix',
    name: 'Leachatix',
    taglineRo: 'AI chatbot inteligent pentru conversie',
    taglineEn: 'Intelligent AI chatbot for conversions',
    taglineIt: 'Chatbot AI intelligente per la conversione',
    problemRo:
      'Vizitatorii site-ului pleacă fără să cumpere sau să lase datele de contact. Suportul manual 24/7 este imposibil de susținut financiar.',
    problemEn:
      'Website visitors leave without buying or sharing contact info. 24/7 manual support is financially unsustainable.',
    problemIt:
      'I visitatori del sito se ne vanno senza acquistare o lasciare i contatti. Il supporto manuale 24/7 è finanziariamente insostenibile.',
    descriptionRo:
      'Leachatix este un chatbot AI care converteste vizitatorii în lead-uri calificate automat, 24/7. Înțelege contextul afacerii tale, răspunde inteligent la întrebări și colectează datele potrivite în momentul potrivit.',
    descriptionEn:
      'Leachatix is an AI chatbot that converts visitors into qualified leads automatically, 24/7. It understands your business context, answers questions intelligently, and collects the right data at the right moment.',
    descriptionIt:
      'Leachatix è un chatbot AI che converte i visitatori in lead qualificati automaticamente, 24/7. Capisce il contesto del tuo business, risponde intelligentemente alle domande e raccoglie i dati giusti al momento giusto.',
    featuresRo: JSON.stringify([
      'Conversații naturale cu context de afacere',
      'Colectare lead-uri automată',
      'Integrare CRM și email marketing',
      'Analize conversații și insights',
      'Suport multilingv nativ',
      'Deploy în 5 minute',
    ]),
    featuresEn: JSON.stringify([
      'Natural conversations with business context',
      'Automatic lead capture',
      'CRM & email marketing integration',
      'Conversation analytics & insights',
      'Native multilingual support',
      'Deploy in 5 minutes',
    ]),
    featuresIt: JSON.stringify([
      'Conversazioni naturali con contesto aziendale',
      'Cattura lead automatica',
      'Integrazione CRM ed email marketing',
      'Analytics conversazioni e insights',
      'Supporto multilingua nativo',
      'Deploy in 5 minuti',
    ]),
    techStack: JSON.stringify(['Next.js', 'OpenAI', 'Anthropic', 'PostgreSQL', 'Redis', 'Vercel']),
    demoUrl: 'https://leachatix.com',
    status: 'LIVE' as const,
    category: 'AI Automation',
    automationSaved: '30h/week',
    featured: true,
    order: 1,
  },
  {
    slug: 'watable-ai',
    name: 'Watable AI',
    taglineRo: 'Automatizare inteligentă pentru restaurante',
    taglineEn: 'Smart automation for restaurants',
    taglineIt: 'Automazione intelligente per ristoranti',
    problemRo:
      'Restaurantele pierd comenzi, gestionează manual rezervările și nu au timp să analizeze datele pentru decizii de business.',
    problemEn:
      'Restaurants lose orders, manually manage reservations and have no time to analyze data for business decisions.',
    problemIt:
      'I ristoranti perdono ordini, gestiscono manualmente le prenotazioni e non hanno tempo per analizzare i dati per decisioni di business.',
    descriptionRo:
      'Watable AI automatizează gestionarea meselor, rezervărilor și comenzilor pentru restaurante. AI-ul înțelege cererea, optimizează ocuparea și generează insights acționabile din datele tale.',
    descriptionEn:
      'Watable AI automates table, reservation and order management for restaurants. AI understands demand, optimizes occupancy and generates actionable insights from your data.',
    descriptionIt:
      "Watable AI automatizza la gestione di tavoli, prenotazioni e ordini per ristoranti. L'AI capisce la domanda, ottimizza l'occupazione e genera insights azionabili dai tuoi dati.",
    featuresRo: JSON.stringify([
      'Gestionare rezervări automată',
      'Optimizare ocupare mese',
      'Predicții cerere bazate pe AI',
      'Dashboard analytics în timp real',
      'Integrare POS existente',
      'Notificări automate clienți',
    ]),
    featuresEn: JSON.stringify([
      'Automatic reservation management',
      'Table occupancy optimization',
      'AI-based demand predictions',
      'Real-time analytics dashboard',
      'Existing POS integration',
      'Automated client notifications',
    ]),
    featuresIt: JSON.stringify([
      'Gestione prenotazioni automatica',
      'Ottimizzazione occupazione tavoli',
      'Previsioni domanda basate su AI',
      'Dashboard analytics in tempo reale',
      'Integrazione POS esistente',
      'Notifiche automatiche clienti',
    ]),
    techStack: JSON.stringify(['Next.js', 'TypeScript', 'OpenAI', 'PostgreSQL', 'TailwindCSS']),
    demoUrl: 'https://watable.ai',
    status: 'LIVE' as const,
    category: 'AI / Vertical SaaS',
    automationSaved: '15h/week',
    featured: true,
    order: 2,
  },
  {
    slug: 'cumparatura-ro',
    name: 'Cumparatura.ro',
    taglineRo: 'Marketplace simplificat pentru vehicule',
    taglineEn: 'Simplified vehicle marketplace',
    taglineIt: 'Marketplace semplificato per veicoli',
    problemRo:
      'Vânzarea și cumpărarea de vehicule implică procese complicate, multiple platforme și lipsă de transparență.',
    problemEn:
      'Selling and buying vehicles involves complicated processes, multiple platforms and lack of transparency.',
    problemIt:
      'Vendere e comprare veicoli implica processi complicati, multiple piattaforme e mancanza di trasparenza.',
    descriptionRo:
      'Cumparatura.ro simplifică întreg procesul de cumpărare și vânzare de vehicule noi sau second-hand în România. O singură platformă, contact direct cu vânzătorii, preturi avantajoase.',
    descriptionEn:
      'Cumparatura.ro simplifies the entire process of buying and selling new or used vehicles in Romania. One single platform, direct contact with sellers, advantageous prices.',
    descriptionIt:
      "Cumparatura.ro semplifica l'intero processo di acquisto e vendita di veicoli nuovi o usati in Romania. Una singola piattaforma, contatto diretto con i venditori, prezzi vantaggiosi.",
    featuresRo: JSON.stringify([
      'Listări vehicule noi și second-hand',
      'Contact direct vânzători și dealeri',
      'Filtrare avansată',
      'Verificări automate',
      'Istoric vehicul',
    ]),
    featuresEn: JSON.stringify([
      'New and used vehicle listings',
      'Direct contact with sellers and dealers',
      'Advanced filtering',
      'Automated verifications',
      'Vehicle history',
    ]),
    featuresIt: JSON.stringify([
      'Annunci veicoli nuovi e usati',
      'Contatto diretto con venditori e dealer',
      'Filtri avanzati',
      'Verifiche automatiche',
      'Storico veicolo',
    ]),
    techStack: JSON.stringify(['Next.js', 'PostgreSQL', 'Prisma', 'TailwindCSS', 'Vercel']),
    demoUrl: 'https://cumparatura.ro',
    status: 'LIVE' as const,
    category: 'Marketplace',
    featured: true,
    order: 3,
  },
  {
    slug: 'vreauproaspat-ro',
    name: 'VreauProaspat.ro',
    taglineRo: 'Produse locale direct de la producători',
    taglineEn: 'Local products direct from producers',
    taglineIt: 'Prodotti locali direttamente dai produttori',
    problemRo:
      'Producătorii mici nu au vizibilitate online, iar consumatorii nu găsesc ușor produse proaspete și de calitate direct de la sursă.',
    problemEn:
      'Small producers lack online visibility, and consumers struggle to find fresh quality products directly from the source.',
    problemIt:
      'I piccoli produttori non hanno visibilità online, e i consumatori faticano a trovare prodotti freschi di qualità direttamente dalla fonte.',
    descriptionRo:
      'VreauProaspat.ro este un marketplace care conectează producătorii locali români cu consumatori, oferind produse proaspete direct de la sursă. Platforma suportă mici și mari producători cu fotografie profesională inclusă.',
    descriptionEn:
      'VreauProaspat.ro is a marketplace connecting local Romanian producers with consumers, offering fresh products direct from source. The platform supports small and large producers with professional photography included.',
    descriptionIt:
      'VreauProaspat.ro è un marketplace che collega produttori locali rumeni con i consumatori, offrendo prodotti freschi direttamente dalla fonte. La piattaforma supporta piccoli e grandi produttori con fotografia professionale inclusa.',
    featuresRo: JSON.stringify([
      'Marketplace producători verificați',
      'Livrare rapidă națională',
      'Fotografie profesională produse',
      'Comisioane favorabile',
      'Verificări calitate și prospețime',
      'Dashboard producător',
    ]),
    featuresEn: JSON.stringify([
      'Verified producers marketplace',
      'Fast national delivery',
      'Professional product photography',
      'Favorable commissions',
      'Quality & freshness checks',
      'Producer dashboard',
    ]),
    featuresIt: JSON.stringify([
      'Marketplace produttori verificati',
      'Consegna rapida nazionale',
      'Fotografia prodotti professionale',
      'Commissioni favorevoli',
      'Controlli qualità e freschezza',
      'Dashboard produttore',
    ]),
    techStack: JSON.stringify(['Next.js', 'PostgreSQL', 'Prisma', 'Stripe', 'Vercel']),
    demoUrl: 'https://vreauproaspat.ro',
    status: 'LIVE' as const,
    category: 'E-commerce / Marketplace',
    featured: true,
    order: 4,
  },
  {
    slug: 'bestseller-copilot',
    name: 'Bestseller Copilot',
    taglineRo: 'AI copilot pentru vânzători Amazon',
    taglineEn: 'AI copilot for Amazon sellers',
    taglineIt: 'Copilot AI per venditori Amazon',
    problemRo:
      'Vânzătorii Amazon pierd ore analizând manual date, optimizând listări și cercetând produse. Scalarea este blocată de procese repetitive.',
    problemEn:
      'Amazon sellers waste hours manually analyzing data, optimizing listings and researching products. Scaling is blocked by repetitive processes.',
    problemIt:
      'I venditori Amazon sprecano ore analizzando manualmente dati, ottimizzando listings e facendo ricerca prodotti. Lo scaling è bloccato da processi ripetitivi.',
    descriptionRo:
      'Bestseller Copilot este un asistent AI pentru vânzători Amazon care automatizează cercetarea de produse, optimizarea listărilor și analiza competiției. Economisește ore în fiecare săptămână și scalează mai rapid.',
    descriptionEn:
      'Bestseller Copilot is an AI assistant for Amazon sellers that automates product research, listing optimization and competition analysis. Save hours every week and scale faster.',
    descriptionIt:
      "Bestseller Copilot è un assistente AI per venditori Amazon che automatizza la ricerca prodotti, l'ottimizzazione delle listing e l'analisi della concorrenza. Risparmia ore ogni settimana e scala più velocemente.",
    featuresRo: JSON.stringify([
      'Cercetare produse AI-powered',
      'Optimizare listări automată',
      'Analiză competiție în timp real',
      'Sugestii de preț bazate pe AI',
      'Dashboard metrici vânzări',
      'Alerts personalizate',
    ]),
    featuresEn: JSON.stringify([
      'AI-powered product research',
      'Automatic listing optimization',
      'Real-time competition analysis',
      'AI-based pricing suggestions',
      'Sales metrics dashboard',
      'Custom alerts',
    ]),
    featuresIt: JSON.stringify([
      'Ricerca prodotti AI-powered',
      'Ottimizzazione listing automatica',
      'Analisi concorrenza in tempo reale',
      'Suggerimenti prezzo basati su AI',
      'Dashboard metriche vendite',
      'Alert personalizzati',
    ]),
    techStack: JSON.stringify(['Next.js', 'TypeScript', 'OpenAI', 'PostgreSQL', 'Redis']),
    demoUrl: 'https://bestsellercopilot.com',
    status: 'BETA' as const,
    category: 'AI / E-commerce Tools',
    automationSaved: '20h/week',
    featured: true,
    order: 5,
  },
];
