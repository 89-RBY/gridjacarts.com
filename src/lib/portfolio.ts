import { existsSync } from 'fs';
import path from 'path';

// Real screenshots live in public/images/portfolio/<domain>.webp; until one exists, a browser frame with the domain is shown.
export function screenshotFor(url: string) {
  const domain = new URL(url).hostname.replace(/^www\./, '');
  const src = `/images/portfolio/${domain}.webp`;
  return { domain, src: existsSync(path.join(process.cwd(), 'public', src)) ? src : null };
}

export function getPortfolioProjects(locale: string) {
  return [
    {
      id: 1,
      title: 'Cumparatura.ro',
      url: 'https://cumparatura.ro',
      category: locale === 'ro' ? 'Platformă Full-Stack' : locale === 'en' ? 'Full-Stack Platform' : 'Piattaforma Full-Stack',
      client: 'Cumparatura',
      ownProduct: true,
      description: locale === 'ro'
        ? 'Platformă avansată de vânzări auto online cu sistem de listări, căutare avansată, gestionare anunțuri și integrare plăți.'
        : locale === 'en'
          ? 'Advanced car sales platform with listing system, advanced search, ad management and payment integration.'
          : 'Piattaforma avanzata di vendita auto con sistema di inserzioni, ricerca avanzata, gestione annunci e integrazione pagamenti.',
      tags: ['Next.js', 'PostgreSQL', 'Payment Integration', 'Advanced Search'],
    },
    {
      id: 2,
      title: 'BFMNSerrandeRoma.it',
      url: 'https://bfmnserranderoma.it',
      category: locale === 'ro' ? 'Site de Prezentare' : locale === 'en' ? 'Presentation Website' : 'Sito Vetrina',
      client: 'BFMN Serrande Roma',
      description: locale === 'ro'
        ? 'Website profesional pentru companie specializată în serrande și sisteme de securitate din Roma, Italia.'
        : locale === 'en'
          ? 'Professional website for a company specialized in shutters and security systems in Rome, Italy.'
          : 'Sito web professionale per azienda specializzata in serrande e sistemi di sicurezza a Roma, Italia.',
      tags: ['Web Design', 'SEO', 'Responsive', 'Italian Market'],
    },
    {
      id: 3,
      title: 'SoluzionePraticheAuto.it',
      url: 'https://soluzionepraticheauto.it',
      category: locale === 'ro' ? 'Site de Prezentare' : locale === 'en' ? 'Presentation Website' : 'Sito Vetrina',
      client: 'Soluzione Pratiche Auto',
      description: locale === 'ro'
        ? 'Site modern pentru servicii de asistență practici auto în Italia, cu formular contact și prezentare servicii.'
        : locale === 'en'
          ? 'Modern website for automotive documentation services in Italy, with contact form and service presentation.'
          : 'Sito moderno per servizi di assistenza pratiche auto in Italia, con form contatto e presentazione servizi.',
      tags: ['Web Design', 'Contact Forms', 'Service Showcase', 'Italian'],
    },
    {
      id: 4,
      title: 'VreauProaspat.ro',
      url: 'https://vreauproaspat.ro',
      category: locale === 'ro' ? 'E-Commerce · În lansare' : locale === 'en' ? 'E-Commerce · Launching soon' : 'E-Commerce · In lancio',
      client: 'Vreau Proaspat',
      description: locale === 'ro'
        ? 'Platformă de vânzare online a produselor proaspete, cu comenzi, livrări și gestionare a stocului, în curs de lansare. Între timp, site-ul colectează înscrieri pentru a anunța lansarea.'
        : locale === 'en'
          ? 'Online sales platform for fresh products, with orders, deliveries and stock management, launching soon. Meanwhile the site collects sign-ups to announce the launch.'
          : 'Piattaforma di vendita online di prodotti freschi, con ordini, consegne e gestione del magazzino, in fase di lancio. Nel frattempo il sito raccoglie le iscrizioni per annunciare l\u2019apertura.',
      tags: ['E-Commerce', 'Real-time Inventory', 'Delivery System', 'Payment Gateway'],
    },
    {
      id: 5,
      title: 'LeaChatix.com',
      url: 'https://leachatix.com',
      category: locale === 'ro' ? 'SaaS AI Platform' : locale === 'en' ? 'SaaS AI Platform' : 'Piattaforma SaaS AI',
      client: 'LeaChatix',
      description: locale === 'ro'
        ? 'Platformă SaaS avansată pentru crearea și gestionarea chatboților AI, cu integrări multiple și dashboard analitic.'
        : locale === 'en'
          ? 'Advanced SaaS platform for creating and managing AI chatbots, with multiple integrations and analytics dashboard.'
          : 'Piattaforma SaaS avanzata per la creazione e gestione di chatbot AI, con integrazioni multiple e dashboard analitico.',
      tags: ['AI/ML', 'Chatbots', 'SaaS', 'API Integration', 'Analytics'],
    },
    {
      id: 6,
      title: 'FirmaContact',
      url: 'https://firmacontact.ro',
      category: locale === 'ro' ? 'Platformă B2B' : locale === 'en' ? 'B2B Platform' : 'Piattaforma B2B',
      client: 'FirmaContact',
      ownProduct: true,
      description: locale === 'ro'
        ? 'Bază de date cu firmele active din România, cu cifră de afaceri, profit și angajați din datele ONRC, plus campanii SMS și email trimise din aceeași platformă.'
        : locale === 'en'
          ? 'Database of active companies in Romania, with turnover, profit and employees from official registry data, plus SMS and email campaigns sent from the same platform.'
          : 'Database delle aziende attive in Romania, con fatturato, utile e dipendenti dai dati ufficiali del registro imprese, più campagne SMS ed email inviate dalla stessa piattaforma.',
      tags: ['B2B', 'Company Database', 'Lead Generation', 'SMS Campaigns', 'Email Campaigns'],
    },
    {
      id: 7,
      title: 'Ionela Nistor Academy',
      url: 'https://ionelanistor.ro',
      category: locale === 'ro' ? 'Site Academie & Cursuri' : locale === 'en' ? 'Academy & Courses Website' : 'Sito Academy & Corsi',
      client: 'Ionela Nistor Academy',
      description: locale === 'ro'
        ? 'Site pentru o academie acreditată de manichiură și pedichiură din Rădăuți: cursuri cu diplomă, echipă, servicii, galerie și rezervări online.'
        : locale === 'en'
          ? 'Website for an accredited manicure and pedicure academy in Rădăuți, Romania: certified courses, team, services, gallery and online booking.'
          : 'Sito per un\u2019accademia accreditata di manicure e pedicure a Rădăuți, in Romania: corsi con diploma, team, servizi, galleria e prenotazioni online.',
      tags: ['Web Design', 'Courses', 'Online Booking', 'Gallery', 'Local SEO'],
    },
    {
      id: 8,
      title: 'Keep Smiling · DMD Dental',
      url: 'https://dmddental.ro/home/',
      category: locale === 'ro' ? 'Site Medical' : locale === 'en' ? 'Medical Website' : 'Sito Medico',
      client: 'DMD Dental Clinic (Keep Smiling)',
      description: locale === 'ro'
        ? 'Website modern pentru clinică stomatologică cu prezentare servicii, echipă medicală, sistem de programări și galerie before/after.'
        : locale === 'en'
          ? 'Modern website for dental clinic with services showcase, medical team, appointment system and before/after gallery.'
          : 'Sito moderno per clinica dentale con presentazione servizi, team medico, sistema prenotazioni e galleria prima/dopo.',
      tags: ['Medical', 'Appointment System', 'SEO Local', 'Gallery'],
    },
    {
      id: 9,
      title: 'LifeBody.ch',
      url: 'https://lifebody.ch',
      category: locale === 'ro' ? 'Migrare E-Commerce' : locale === 'en' ? 'E-Commerce Migration' : 'Migrazione E-Commerce',
      client: 'LifeBody',
      description: locale === 'ro'
        ? 'Clientul avea un magazin online pe WordPress care se strica frecvent și genera costuri și pierderi de timp. L-am reconstruit complet în cod cu PHP Laravel: timpul de încărcare a scăzut de la 7–12 secunde la sub o secundă, ore economisite săptămânal, experiență client îmbunătățită și costuri de mentenanță reduse drastic.'
        : locale === 'en'
          ? 'The client had a WordPress ecommerce that broke often, wasting time and money. We rebuilt it entirely in code with PHP Laravel: load time dropped from 7–12 seconds to under one second, several hours saved every week, better customer experience and drastically lower maintenance costs.'
          : "Il cliente aveva un ecommerce in WordPress che si rompeva spesso, facendogli perdere tempo e denaro. Lo abbiamo ricostruito completamente in codice con PHP Laravel: tempo di caricamento sceso da 7–12 secondi a meno di un secondo, diverse ore risparmiate ogni settimana, esperienza cliente migliorata e costi di manutenzione ridotti drasticamente.",
      result: locale === 'ro'
        ? 'Încărcare: de la 7–12 s la sub 1 s'
        : locale === 'en'
          ? 'Load time: from 7–12 s to under 1 s'
          : 'Caricamento: da 7–12 s a meno di 1 s',
      tags: ['PHP', 'Laravel', 'E-Commerce', 'WordPress Migration', 'Performance'],
    },
    {
      id: 10,
      title: 'BemaServiceSerrande.it',
      url: 'https://bemaserviceserrande.it',
      category: locale === 'ro' ? 'Site de Prezentare' : locale === 'en' ? 'Presentation Website' : 'Sito Vetrina',
      client: 'Bema Service Serrande',
      description: locale === 'ro'
        ? 'Site pentru intervenții rapide la obloane în Roma: montaj, motorizare și reparații, cu apel și WhatsApp la un click pentru a transforma vizitele în cereri.'
        : locale === 'en'
          ? 'Website for emergency shutter repairs in Rome: installation, motorisation and repair, with one-tap call and WhatsApp to turn visits into requests.'
          : 'Sito per il pronto intervento serrande a Roma: montaggio, motorizzazione e riparazione, con chiamata e WhatsApp a un tocco per trasformare le visite in richieste.',
      tags: ['Web Design', 'SEO Local', 'Click-to-Call', 'WhatsApp', 'Italian Market'],
    },
    {
      id: 11,
      title: 'BranCleanSolutions.de',
      url: 'https://brancleansolutions.de',
      category: locale === 'ro' ? 'Site de Prezentare' : locale === 'en' ? 'Presentation Website' : 'Sito Vetrina',
      client: 'Bran Clean Solutions',
      description: locale === 'ro'
        ? 'Site de prezentare pentru o firmă de curățenie din Germania, activă în Renania-Palatinat, NRW și Hessa: servicii pentru birouri, cabinete, industrie și locuințe, cu cerere de ofertă și contact rapid prin telefon, email și chat.'
        : locale === 'en'
          ? 'Showcase website for a cleaning company in Germany, serving Rhineland-Palatinate, NRW and Hesse: offices, practices, industry and private homes, with quote requests and quick contact by phone, email and chat.'
          : 'Sito vetrina per un\u2019impresa di pulizie in Germania, attiva in Renania-Palatinato, NRW e Assia: uffici, studi, industria e abitazioni private, con richiesta di preventivo e contatto rapido via telefono, email e chat.',
      tags: ['Web Design', 'Quote Request', 'SEO Local', 'German Market'],
    },
  ];
}
