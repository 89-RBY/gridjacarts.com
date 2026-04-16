// Service pages seed data for marketing/landing pages
// These are different from the Service type used in partner pricing

export const SERVICES_SEED_DATA = [
  {
    id: 'ai-chatbots',
    slug: 'ai-chatbots',
    name: 'AI Chatbots',
    icon: 'MessageSquare',
    taglineRo: 'Chatbot AI personalizat pentru conversii 24/7',
    taglineEn: 'Custom AI chatbot for 24/7 conversions',
    taglineIt: 'Chatbot AI personalizzato per conversioni 24/7',
    problemRo:
      'Vizitatorii site-ului tău pleacă fără să cumpere sau să lase date de contact. Nu poți fi disponibil 24/7 pentru a răspunde la întrebări și suportul manual costă prea mult.',
    problemEn:
      "Your website visitors leave without buying or sharing contact info. You can't be available 24/7 to answer questions and manual support costs too much.",
    problemIt:
      'I visitatori del tuo sito se ne vanno senza acquistare o lasciare contatti. Non puoi essere disponibile 24/7 per rispondere alle domande e il supporto manuale costa troppo.',
    descriptionRo:
      'Dezvoltăm chatbot-uri AI care înțeleg contextul afacerii tale, răspund inteligent la întrebări și convertesc vizitatori în lead-uri calificate automat. Integrare cu CRM, email marketing și analytics incluse.',
    descriptionEn:
      'We develop AI chatbots that understand your business context, answer questions intelligently and convert visitors into qualified leads automatically. CRM, email marketing and analytics integration included.',
    descriptionIt:
      'Sviluppiamo chatbot AI che capiscono il contesto del tuo business, rispondono intelligentemente alle domande e convertono i visitatori in lead qualificati automaticamente. Integrazione CRM, email marketing e analytics inclusa.',
    benefitsRo: [
      'Conversații naturale cu context de afacere',
      'Colectare lead-uri automată 24/7',
      'Integrare CRM și email marketing',
      'Analytics conversații și insights',
      'Suport multilingv nativ',
      'Deploy în 5 minute pe orice site',
    ],
    benefitsEn: [
      'Natural conversations with business context',
      'Automatic 24/7 lead capture',
      'CRM & email marketing integration',
      'Conversation analytics & insights',
      'Native multilingual support',
      'Deploy in 5 minutes on any site',
    ],
    benefitsIt: [
      'Conversazioni naturali con contesto aziendale',
      'Cattura lead automatica 24/7',
      'Integrazione CRM ed email marketing',
      'Analytics conversazioni e insights',
      'Supporto multilingua nativo',
      'Deploy in 5 minuti su qualsiasi sito',
    ],
    processRo: [
      { step: 'Discovery & Training', description: 'Analizăm afacerea ta și antrenăm AI-ul pe contextul tău' },
      { step: 'Design conversații', description: 'Proiectăm flow-uri conversaționale pentru conversie maximă' },
      { step: 'Integrări', description: 'Conectăm chatbot-ul cu CRM, email și alte tool-uri' },
      { step: 'Deploy & Optimize', description: 'Lansăm și optimizăm continuu pe baza datelor' },
    ],
    processEn: [
      { step: 'Discovery & Training', description: 'We analyze your business and train the AI on your context' },
      { step: 'Conversation design', description: 'We design conversation flows for maximum conversion' },
      { step: 'Integrations', description: 'We connect the chatbot with CRM, email and other tools' },
      { step: 'Deploy & Optimize', description: 'We launch and continuously optimize based on data' },
    ],
    processIt: [
      { step: 'Discovery & Training', description: 'Analizziamo il tuo business e addestriamo l\'AI sul tuo contesto' },
      { step: 'Design conversazioni', description: 'Progettiamo flussi conversazionali per massima conversione' },
      { step: 'Integrazioni', description: 'Colleghiamo il chatbot con CRM, email e altri strumenti' },
      { step: 'Deploy & Optimize', description: 'Lanciamo e ottimizziamo continuamente in base ai dati' },
    ],
    techStack: ['Next.js', 'OpenAI', 'Anthropic', 'PostgreSQL', 'Redis', 'Vercel'],
    relatedProducts: ['leachatix'],
    featured: true,
    order: 1,
  },
  {
    id: 'restaurant-automation',
    slug: 'restaurant-automation',
    name: 'Restaurant Automation',
    icon: 'Utensils',
    taglineRo: 'Automatizare inteligentă pentru restaurante',
    taglineEn: 'Smart automation for restaurants',
    taglineIt: 'Automazione intelligente per ristoranti',
    problemRo:
      'Pierzi comenzi, gestionezi manual rezervările, nu ai timp să analizezi datele. Sistemele tradizionale sunt rigide și nu se adaptează cererii în timp real.',
    problemEn:
      "You lose orders, manually manage reservations, don't have time to analyze data. Traditional systems are rigid and don't adapt to demand in real-time.",
    problemIt:
      'Perdi ordini, gestisci manualmente le prenotazioni, non hai tempo per analizzare i dati. I sistemi tradizionali sono rigidi e non si adattano alla domanda in tempo reale.',
    descriptionRo:
      'Dezvoltăm soluții AI care automatizează gestionarea meselor, rezervărilor și comenzilor. AI-ul înțelege cererea, optimizează ocuparea și generează insights acționabile din datele tale.',
    descriptionEn:
      'We develop AI solutions that automate table, reservation and order management. AI understands demand, optimizes occupancy and generates actionable insights from your data.',
    descriptionIt:
      "Sviluppiamo soluzioni AI che automatizzano la gestione di tavoli, prenotazioni e ordini. L'AI capisce la domanda, ottimizza l'occupazione e genera insights azionabili dai tuoi dati.",
    benefitsRo: [
      'Gestionare rezervări automată cu AI',
      'Optimizare ocupare mese în timp real',
      'Predicții cerere bazate pe AI',
      'Dashboard analytics și insights',
      'Integrare POS existente',
      'Notificări automate clienți',
    ],
    benefitsEn: [
      'Automatic AI reservation management',
      'Real-time table occupancy optimization',
      'AI-based demand predictions',
      'Analytics dashboard & insights',
      'Existing POS integration',
      'Automated client notifications',
    ],
    benefitsIt: [
      'Gestione prenotazioni automatica con AI',
      'Ottimizzazione occupazione tavoli in tempo reale',
      'Previsioni domanda basate su AI',
      'Dashboard analytics e insights',
      'Integrazione POS esistente',
      'Notifiche automatiche clienti',
    ],
    processRo: [
      { step: 'Audit procese', description: 'Analizăm workflow-urile actuale și punctele de durere' },
      { step: 'Design sistem', description: 'Proiectăm soluția cu focus pe UX staff și clienți' },
      { step: 'Integrare POS', description: 'Conectăm cu sistemele existente fără disrupție' },
      { step: 'Training & Launch', description: 'Formăm echipa și lansăm cu suport dedicat' },
    ],
    processEn: [
      { step: 'Process audit', description: 'We analyze current workflows and pain points' },
      { step: 'System design', description: 'We design the solution focused on staff & client UX' },
      { step: 'POS integration', description: 'We connect with existing systems without disruption' },
      { step: 'Training & Launch', description: 'We train the team and launch with dedicated support' },
    ],
    processIt: [
      { step: 'Audit processi', description: 'Analizziamo i workflow attuali e i pain point' },
      { step: 'Design sistema', description: 'Progettiamo la soluzione con focus su UX staff e clienti' },
      { step: 'Integrazione POS', description: 'Colleghiamo con i sistemi esistenti senza disruzione' },
      { step: 'Training & Launch', description: 'Formiamo il team e lanciamo con supporto dedicato' },
    ],
    techStack: ['Next.js', 'TypeScript', 'OpenAI', 'PostgreSQL', 'TailwindCSS', 'Vercel'],
    relatedProducts: ['watable-ai'],
    featured: true,
    order: 2,
  },
  {
    id: 'marketplace-development',
    slug: 'marketplace-development',
    name: 'Marketplace Development',
    icon: 'Store',
    taglineRo: 'Marketplace custom pentru afacerea ta',
    taglineEn: 'Custom marketplace for your business',
    taglineIt: 'Marketplace personalizzato per il tuo business',
    problemRo:
      'Vrei să conectezi vânzători cu cumpărători, dar platformele existente sunt limitate, costisitoare și nu se adaptează nevoilor tale specifice.',
    problemEn:
      "You want to connect sellers with buyers, but existing platforms are limited, expensive and don't adapt to your specific needs.",
    problemIt:
      'Vuoi connettere venditori con acquirenti, ma le piattaforme esistenti sono limitate, costose e non si adattano alle tue esigenze specifiche.',
    descriptionRo:
      'Construim marketplace-uri scalabile de la zero: verificare vânzători, sistem de review-uri, plăți integrate, dashboard venditori, filtrare avansată. Totul customizat pentru industria ta.',
    descriptionEn:
      'We build scalable marketplaces from scratch: seller verification, review system, integrated payments, seller dashboard, advanced filtering. All customized for your industry.',
    descriptionIt:
      'Costruiamo marketplace scalabili da zero: verifica venditori, sistema di recensioni, pagamenti integrati, dashboard venditori, filtri avanzati. Tutto personalizzato per la tua industria.',
    benefitsRo: [
      'Platformă custom 100% tua',
      'Verificare automată vânzători',
      'Sistem review-uri și ratings',
      'Plăți integrate (Stripe/PayPal)',
      'Dashboard venditori complet',
      'SEO optimizat pentru produse',
    ],
    benefitsEn: [
      '100% your custom platform',
      'Automatic seller verification',
      'Review & rating system',
      'Integrated payments (Stripe/PayPal)',
      'Complete seller dashboard',
      'SEO optimized for products',
    ],
    benefitsIt: [
      'Piattaforma personalizzata 100% tua',
      'Verifica automatica venditori',
      'Sistema recensioni e rating',
      'Pagamenti integrati (Stripe/PayPal)',
      'Dashboard venditori completo',
      'SEO ottimizzato per prodotti',
    ],
    processRo: [
      { step: 'Discovery verticale', description: 'Înțelegem industria, utenti e competiția' },
      { step: 'Prototip MVP', description: 'Lansăm versiunea funcțională în 6-8 săptămâni' },
      { step: 'Feedback loop', description: 'Iterăm rapid pe baza utilizatorilor reali' },
      { step: 'Scale & Optimize', description: 'Scalăm infrastructura și optimizăm conversiile' },
    ],
    processEn: [
      { step: 'Vertical discovery', description: 'We understand the industry, users and competition' },
      { step: 'MVP prototype', description: 'We launch functional version in 6-8 weeks' },
      { step: 'Feedback loop', description: 'We iterate quickly based on real users' },
      { step: 'Scale & Optimize', description: 'We scale infrastructure and optimize conversions' },
    ],
    processIt: [
      { step: 'Discovery verticale', description: 'Capiamo l\'industria, utenti e concorrenza' },
      { step: 'Prototipo MVP', description: 'Lanciamo versione funzionale in 6-8 settimane' },
      { step: 'Feedback loop', description: 'Iteriamo rapidamente in base a utenti reali' },
      { step: 'Scale & Optimize', description: 'Scaliamo l\'infrastruttura e ottimizziamo conversioni' },
    ],
    techStack: ['Next.js', 'PostgreSQL', 'Prisma', 'Stripe', 'TailwindCSS', 'Vercel'],
    relatedProducts: ['cumparatura-ro', 'vreauproaspat-ro'],
    featured: true,
    order: 3,
  },
  {
    id: 'ai-writing-tools',
    slug: 'ai-writing-tools',
    name: 'AI Writing Tools',
    icon: 'BookOpen',
    taglineRo: 'Platformă AI completă pentru scriitori',
    taglineEn: 'Complete AI platform for writers',
    taglineIt: 'Piattaforma AI completa per scrittori',
    problemRo:
      'Scriitorii pierd ore luptându-se cu blocajul scrisului, organizând personaje și trame manual, căutând inspirație vizuală. Lipsa unui sistem unificat face procesul haotic.',
    problemEn:
      "Writers waste hours struggling with writer's block, manually organizing characters and plots, searching for visual inspiration. Lack of a unified system makes the process chaotic.",
    problemIt:
      "Gli scrittori sprecano ore lottando con il blocco dello scrittore, organizzando manualmente personaggi e trame, cercando ispirazione visiva. La mancanza di un sistema unificato rende il processo caotico.",
    descriptionRo:
      'Construim platforme complete pentru scriitori: asistență AI la scriere, organizare trame și personaje, generare imagini AI pentru personaje și coperte, world-building, ghiduri și tricks pentru self-publishing.',
    descriptionEn:
      'We build complete platforms for writers: AI writing assistance, plot and character organization, AI image generation for characters and covers, world-building, self-publishing guides and tricks.',
    descriptionIt:
      'Costruiamo piattaforme complete per scrittori: assistenza scrittura AI, organizzazione trame e personaggi, generazione immagini AI per personaggi e copertine, world-building, guide e tricks per self-publishing.',
    benefitsRo: [
      'Asistență AI la scriere în timp real',
      'Organizare trame și plot points',
      'Schede personaggio cu foto AI',
      'Generare coperte cu AI',
      'World-building și locuri',
      'Guide self-publishing integrate',
    ],
    benefitsEn: [
      'Real-time AI writing assistance',
      'Plot & story points organization',
      'Character profiles with AI photos',
      'AI-powered cover generation',
      'World-building & locations',
      'Integrated self-publishing guides',
    ],
    benefitsIt: [
      'Assistenza scrittura AI in tempo reale',
      'Organizzazione trame e punti storia',
      'Schede personaggio con foto AI',
      'Generazione copertine con AI',
      'World-building e luoghi',
      'Guide self-publishing integrate',
    ],
    processRo: [
      { step: 'Research target', description: 'Înțelegem genurile și nevoile scriitorilor' },
      { step: 'Design UX', description: 'Proiectăm interfață intuitivă pentru creație' },
      { step: 'AI Integration', description: 'Integrăm modele AI pentru scriere și imagini' },
      { step: 'Beta & Iterate', description: 'Lansăm beta cu scriitori reali și iterăm' },
    ],
    processEn: [
      { step: 'Target research', description: 'We understand genres and writer needs' },
      { step: 'UX design', description: 'We design intuitive interface for creation' },
      { step: 'AI Integration', description: 'We integrate AI models for writing and images' },
      { step: 'Beta & Iterate', description: 'We launch beta with real writers and iterate' },
    ],
    processIt: [
      { step: 'Research target', description: 'Capiamo generi e bisogni degli scrittori' },
      { step: 'Design UX', description: 'Progettiamo interfaccia intuitiva per creazione' },
      { step: 'Integrazione AI', description: 'Integriamo modelli AI per scrittura e immagini' },
      { step: 'Beta & Iterate', description: 'Lanciamo beta con scrittori reali e iteriamo' },
    ],
    techStack: ['Next.js', 'TypeScript', 'OpenAI', 'DALL-E', 'PostgreSQL', 'Redis'],
    relatedProducts: ['bestseller-copilot'],
    featured: true,
    order: 4,
  },
  {
    id: 'custom-saas-development',
    slug: 'custom-saas-development',
    name: 'Custom SaaS Development',
    icon: 'Layers',
    taglineRo: 'Dezvoltare SaaS custom de la zero',
    taglineEn: 'Custom SaaS development from scratch',
    taglineIt: 'Sviluppo SaaS personalizzato da zero',
    problemRo:
      'Ai o idee de SaaS dar nu știi de unde să începi. Vrei full control și ownership, nu să depinzi de no-code tools limitate.',
    problemEn:
      "You have a SaaS idea but don't know where to start. You want full control and ownership, not to depend on limited no-code tools.",
    problemIt:
      'Hai un\'idea SaaS ma non sai da dove iniziare. Vuoi pieno controllo e ownership, non dipendere da tool no-code limitati.',
    descriptionRo:
      'Construim SaaS-uri scalabile de la zero: arhitectură multi-tenant, billing Stripe, autentificare, admin dashboard, API, email automations, analytics. Full stack, production-ready.',
    descriptionEn:
      'We build scalable SaaS from scratch: multi-tenant architecture, Stripe billing, authentication, admin dashboard, API, email automations, analytics. Full stack, production-ready.',
    descriptionIt:
      'Costruiamo SaaS scalabili da zero: architettura multi-tenant, billing Stripe, autenticazione, admin dashboard, API, email automations, analytics. Full stack, production-ready.',
    benefitsRo: [
      'Arhitectură multi-tenant scalabilă',
      'Billing și subscriptions Stripe',
      'Autentificare și roles',
      'Admin dashboard complet',
      'API REST + webhooks',
      'Email automations integrate',
    ],
    benefitsEn: [
      'Scalable multi-tenant architecture',
      'Stripe billing & subscriptions',
      'Authentication & roles',
      'Complete admin dashboard',
      'REST API + webhooks',
      'Integrated email automations',
    ],
    benefitsIt: [
      'Architettura multi-tenant scalabile',
      'Billing e subscriptions Stripe',
      'Autenticazione e ruoli',
      'Dashboard admin completo',
      'API REST + webhooks',
      'Email automations integrate',
    ],
    processRo: [
      { step: 'Product Strategy', description: 'Definim MVP și roadmap product' },
      { step: 'Architecture Design', description: 'Proiectăm arhitectura scalabilă' },
      { step: 'Develop MVP', description: 'Construim versiunea funcțională in 8-12 săptămâni' },
      { step: 'Launch & Scale', description: 'Lansăm și scalăm pe baza feedback-ului' },
    ],
    processEn: [
      { step: 'Product Strategy', description: 'We define MVP and product roadmap' },
      { step: 'Architecture Design', description: 'We design scalable architecture' },
      { step: 'Develop MVP', description: 'We build functional version in 8-12 weeks' },
      { step: 'Launch & Scale', description: 'We launch and scale based on feedback' },
    ],
    processIt: [
      { step: 'Product Strategy', description: 'Definiamo MVP e roadmap prodotto' },
      { step: 'Architecture Design', description: 'Progettiamo architettura scalabile' },
      { step: 'Develop MVP', description: 'Costruiamo versione funzionale in 8-12 settimane' },
      { step: 'Launch & Scale', description: 'Lanciamo e scaliamo in base al feedback' },
    ],
    techStack: ['Next.js', 'TypeScript', 'PostgreSQL', 'Prisma', 'Stripe', 'Vercel', 'Redis'],
    relatedProducts: ['leachatix', 'watable-ai', 'bestseller-copilot'],
    featured: true,
    order: 5,
  },
];
