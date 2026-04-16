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
  {
    id: 'custom-web-development',
    slug: 'custom-web-development',
    name: 'Custom Web Development',
    icon: 'Code2',
    taglineRo: 'Aplicații web custom scalabile și performante',
    taglineEn: 'Scalable and performant custom web applications',
    taglineIt: 'Applicazioni web personalizzate scalabili e performanti',
    problemRo:
      'Soluțiile standard (WordPress, template-uri) sunt limitate și nu se adaptează nevoilor tale specifice. Ai nevoie de software exact pentru procesele tale de business.',
    problemEn:
      "Standard solutions (WordPress, templates) are limited and don't adapt to your specific needs. You need software built exactly for your business processes.",
    problemIt:
      'Le soluzioni standard (WordPress, template) sono limitate e non si adattano alle tue esigenze specifiche. Hai bisogno di software costruito esattamente per i tuoi processi aziendali.',
    descriptionRo:
      'Dezvoltăm aplicații web custom de la zero, exact pentru nevoile tale. Arhitectură scalabilă, performanță optimă, design modern. Posibilități nelimitate, 100% proprietate ta.',
    descriptionEn:
      'We develop custom web applications from scratch, exactly for your needs. Scalable architecture, optimal performance, modern design. Unlimited possibilities, 100% your property.',
    descriptionIt:
      'Sviluppiamo applicazioni web personalizzate da zero, esattamente per le tue esigenze. Architettura scalabile, performance ottimali, design moderno. Possibilità illimitate, 100% di tua proprietà.',
    benefitsRo: [
      'Sviluppo 100% custom per le tue esigenze',
      'Architettura scalabile production-ready',
      'Performance ottimizzate (Core Web Vitals)',
      'Design moderno e responsive',
      'Proprietà completa del codice',
      'Documentazione tecnica inclusa',
    ],
    benefitsEn: [
      '100% custom development for your needs',
      'Scalable production-ready architecture',
      'Optimized performance (Core Web Vitals)',
      'Modern responsive design',
      'Full code ownership',
      'Technical documentation included',
    ],
    benefitsIt: [
      'Sviluppo 100% custom per le tue esigenze',
      'Architettura scalabile production-ready',
      'Performance ottimizzate (Core Web Vitals)',
      'Design moderno e responsive',
      'Proprietà completa del codice',
      'Documentazione tecnica inclusa',
    ],
    processRo: [
      { step: 'Discovery Workshop', description: 'Analizăm în detaliu procesele și nevoile tale' },
      { step: 'Architecture & Design', description: 'Proiectăm arhitectura tehnică și UX/UI' },
      { step: 'Agile Development', description: 'Dezvoltare iterativă cu demo-uri săptămânale' },
      { step: 'Deploy & Support', description: 'Lansare și suport tehnic dedicat' },
    ],
    processEn: [
      { step: 'Discovery Workshop', description: 'We analyze your processes and needs in detail' },
      { step: 'Architecture & Design', description: 'We design technical architecture and UX/UI' },
      { step: 'Agile Development', description: 'Iterative development with weekly demos' },
      { step: 'Deploy & Support', description: 'Launch and dedicated technical support' },
    ],
    processIt: [
      { step: 'Discovery Workshop', description: 'Analizziamo in dettaglio i tuoi processi ed esigenze' },
      { step: 'Architecture & Design', description: 'Progettiamo architettura tecnica e UX/UI' },
      { step: 'Agile Development', description: 'Sviluppo iterativo con demo settimanali' },
      { step: 'Deploy & Support', description: 'Lancio e supporto tecnico dedicato' },
    ],
    techStack: ['Next.js', 'React', 'TypeScript', 'Node.js', 'PostgreSQL', 'TailwindCSS'],
    relatedProducts: [],
    featured: true,
    order: 6,
  },
  {
    id: 'mvp-sprint',
    slug: 'mvp-sprint',
    name: 'MVP Sprint',
    icon: 'Rocket',
    taglineRo: 'De la idee la prototip funcțional în 4 săptămâni',
    taglineEn: 'From idea to functional prototype in 4 weeks',
    taglineIt: "Dall'idea al prototipo funzionale in 4 settimane",
    problemRo:
      'Ai o idee de produs dar nu vrei să investești 6-12 luni fără să validezi cererea. Riști să construiești ceva ce nimeni nu vrea.',
    problemEn:
      "You have a product idea but don't want to invest 6-12 months without validating demand. You risk building something nobody wants.",
    problemIt:
      'Hai un\'idea di prodotto ma non vuoi investire 6-12 mesi senza validare la domanda. Rischi di costruire qualcosa che nessuno vuole.',
    descriptionRo:
      'Construim un MVP funcțional în doar 4 săptămâni. Feature principal perfect executat, utilizatorii reali pot testa, colectezi feedback și validezi cererea rapid și ieftin înainte de investiții mari.',
    descriptionEn:
      'We build a functional MVP in just 4 weeks. Main feature perfectly executed, real users can test, you collect feedback and validate demand quickly and cheaply before major investments.',
    descriptionIt:
      'Costruiamo un MVP funzionale in sole 4 settimane. Feature principale perfettamente eseguita, utenti reali possono testare, raccogli feedback e validi la domanda velocemente ed economicamente prima di investimenti importanti.',
    benefitsRo: [
      'Prototip funcțional în 4 săptămâni',
      'Budget fix și predictibil',
      'Focus pe 1 feature core perfect',
      'Deploy production-ready',
      'Testabil cu utilizatori reali',
      'Path clar către versiunea completă',
    ],
    benefitsEn: [
      'Functional prototype in 4 weeks',
      'Fixed and predictable budget',
      'Focus on 1 perfect core feature',
      'Production-ready deploy',
      'Testable with real users',
      'Clear path to full version',
    ],
    benefitsIt: [
      'Prototipo funzionale in 4 settimane',
      'Budget fisso e prevedibile',
      'Focus su 1 feature core perfetta',
      'Deploy production-ready',
      'Testabile con utenti reali',
      'Percorso chiaro verso versione completa',
    ],
    processRo: [
      { step: 'Week 1: Discovery', description: 'Identificăm feature-ul CORE și proiectăm UX' },
      { step: 'Week 2: Build', description: 'Dezvoltăm feature-ul principal + auth' },
      { step: 'Week 3: Polish', description: 'Integrări (plăți, email) și refinements' },
      { step: 'Week 4: Launch', description: 'Beta testers, feedback și plan scalare' },
    ],
    processEn: [
      { step: 'Week 1: Discovery', description: 'We identify CORE feature and design UX' },
      { step: 'Week 2: Build', description: 'We develop main feature + auth' },
      { step: 'Week 3: Polish', description: 'Integrations (payments, email) and refinements' },
      { step: 'Week 4: Launch', description: 'Beta testers, feedback and scaling plan' },
    ],
    processIt: [
      { step: 'Week 1: Discovery', description: 'Identifichiamo feature CORE e progettiamo UX' },
      { step: 'Week 2: Build', description: 'Sviluppiamo feature principale + auth' },
      { step: 'Week 3: Polish', description: 'Integrazioni (pagamenti, email) e refinement' },
      { step: 'Week 4: Launch', description: 'Beta tester, feedback e piano scaling' },
    ],
    techStack: ['Next.js', 'TypeScript', 'Vercel', 'PostgreSQL', 'Stripe'],
    relatedProducts: ['bestseller-copilot'],
    featured: true,
    order: 7,
  },
  {
    id: 'process-automation',
    slug: 'process-automation',
    name: 'Process Automation',
    icon: 'Workflow',
    taglineRo: 'Automatizează task-uri repetitive și economisește 20h/săptămână',
    taglineEn: 'Automate repetitive tasks and save 20h/week',
    taglineIt: 'Automatizza task ripetitivi e risparmia 20h/settimana',
    problemRo:
      'Echipa ta pierde ore cu task-uri manuale repetitive: copiere date între sisteme, email-uri duplicate, rapoarte manuale. Timpul și erorile costă bani.',
    problemEn:
      'Your team wastes hours on repetitive manual tasks: copying data between systems, duplicate emails, manual reports. Time and errors cost money.',
    problemIt:
      'Il tuo team spreca ore in task manuali ripetitivi: copiare dati tra sistemi, email duplicate, report manuali. Tempo ed errori costano denaro.',
    descriptionRo:
      'Automatizăm workflow-urile tale de business: integrări între sisteme, procesare automată documente, sincronizare date, rapoarte automate. Economisești 20+ ore/săptămână și elimini erorile umane.',
    descriptionEn:
      'We automate your business workflows: integrations between systems, automatic document processing, data synchronization, automated reports. Save 20+ hours/week and eliminate human errors.',
    descriptionIt:
      'Automatizziamo i tuoi workflow aziendali: integrazioni tra sistemi, elaborazione automatica documenti, sincronizzazione dati, report automatici. Risparmia 20+ ore/settimana ed elimina errori umani.',
    benefitsRo: [
      'Economii 20-40 ore/săptămână',
      'Eliminare errori manuali',
      'Integrări între orice sisteme',
      'Workflow-uri personalizate',
      'Rapoarte și notificări automate',
      'ROI în 3-4 luni',
    ],
    benefitsEn: [
      'Save 20-40 hours/week',
      'Eliminate manual errors',
      'Integrations between any systems',
      'Custom workflows',
      'Automated reports and notifications',
      '3-4 months ROI',
    ],
    benefitsIt: [
      'Risparmia 20-40 ore/settimana',
      'Elimina errori manuali',
      'Integrazioni tra qualsiasi sistema',
      'Workflow personalizzati',
      'Report e notifiche automatici',
      'ROI in 3-4 mesi',
    ],
    processRo: [
      { step: 'Process Audit', description: 'Mapăm procesele repetitive și identificăm economii' },
      { step: 'Automation Design', description: 'Proiectăm workflow-urile automate' },
      { step: 'Implementation', description: 'Construim și testăm automatizările' },
      { step: 'Monitor & Optimize', description: 'Monitorizăm și optimizăm continuu' },
    ],
    processEn: [
      { step: 'Process Audit', description: 'We map repetitive processes and identify savings' },
      { step: 'Automation Design', description: 'We design automated workflows' },
      { step: 'Implementation', description: 'We build and test automations' },
      { step: 'Monitor & Optimize', description: 'We continuously monitor and optimize' },
    ],
    processIt: [
      { step: 'Process Audit', description: 'Mappiamo processi ripetitivi e identifichiamo risparmi' },
      { step: 'Automation Design', description: 'Progettiamo workflow automatizzati' },
      { step: 'Implementation', description: 'Costruiamo e testiamo automazioni' },
      { step: 'Monitor & Optimize', description: 'Monitoriamo e ottimizziamo continuamente' },
    ],
    techStack: ['Node.js', 'n8n', 'Zapier', 'Make', 'API Integrations', 'Webhooks'],
    relatedProducts: ['leachatix', 'watable-ai'],
    featured: true,
    order: 8,
  },
  {
    id: 'system-integration',
    slug: 'system-integration',
    name: 'System Integration',
    icon: 'Layers',
    taglineRo: 'Conectează toate tool-urile tale într-un ecosistem unificat',
    taglineEn: 'Connect all your tools into a unified ecosystem',
    taglineIt: 'Collega tutti i tuoi strumenti in un ecosistema unificato',
    problemRo:
      'Folosești multiple tool-uri (CRM, ERP, e-commerce, contabilitate) dar nu comunică între ele. Introduci manual aceleași date în sisteme diferite.',
    problemEn:
      'You use multiple tools (CRM, ERP, e-commerce, accounting) but they don\'t communicate. You manually enter the same data in different systems.',
    problemIt:
      'Usi più strumenti (CRM, ERP, e-commerce, contabilità) ma non comunicano tra loro. Inserisci manualmente gli stessi dati in sistemi diversi.',
    descriptionRo:
      'Integrăm toate sistemele tale existente: CRM, ERP, e-commerce, contabilitate, marketing. Date sincronizate automat, workflow-uri unificate, o singură sursă de adevăr.',
    descriptionEn:
      'We integrate all your existing systems: CRM, ERP, e-commerce, accounting, marketing. Automatically synchronized data, unified workflows, single source of truth.',
    descriptionIt:
      'Integriamo tutti i tuoi sistemi esistenti: CRM, ERP, e-commerce, contabilità, marketing. Dati sincronizzati automaticamente, workflow unificati, unica fonte di verità.',
    benefitsRo: [
      'Sincronizare automată date',
      'Integrare cu orice sistem (API/webhook)',
      'Dashboard unificat multi-sistem',
      'Eliminare introducere manuală',
      'Real-time data consistency',
      'Audit trail complet',
    ],
    benefitsEn: [
      'Automatic data synchronization',
      'Integration with any system (API/webhook)',
      'Unified multi-system dashboard',
      'Eliminate manual data entry',
      'Real-time data consistency',
      'Complete audit trail',
    ],
    benefitsIt: [
      'Sincronizzazione automatica dati',
      'Integrazione con qualsiasi sistema (API/webhook)',
      'Dashboard unificato multi-sistema',
      'Elimina inserimento manuale',
      'Consistenza dati real-time',
      'Audit trail completo',
    ],
    processRo: [
      { step: 'Systems Mapping', description: 'Identificăm toate sistemele și fluxurile de date' },
      { step: 'Integration Architecture', description: 'Proiectăm arhitectura integrărilor' },
      { step: 'API Development', description: 'Dezvoltăm conectori custom și API middleware' },
      { step: 'Testing & Deploy', description: 'Testăm și lansăm cu zero downtime' },
    ],
    processEn: [
      { step: 'Systems Mapping', description: 'We identify all systems and data flows' },
      { step: 'Integration Architecture', description: 'We design integration architecture' },
      { step: 'API Development', description: 'We develop custom connectors and API middleware' },
      { step: 'Testing & Deploy', description: 'We test and launch with zero downtime' },
    ],
    processIt: [
      { step: 'Systems Mapping', description: 'Identifichiamo tutti i sistemi e flussi dati' },
      { step: 'Integration Architecture', description: 'Progettiamo architettura integrazioni' },
      { step: 'API Development', description: 'Sviluppiamo connettori custom e API middleware' },
      { step: 'Testing & Deploy', description: 'Testiamo e lanciamo con zero downtime' },
    ],
    techStack: ['REST API', 'GraphQL', 'Webhooks', 'Node.js', 'Redis', 'Message Queues'],
    relatedProducts: [],
    featured: true,
    order: 9,
  },
];
