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
      category: locale === 'ro' ? 'E-Commerce Full-Stack' : locale === 'en' ? 'Full-Stack E-Commerce' : 'E-Commerce Full-Stack',
      client: 'Vreau Proaspat',
      description: locale === 'ro'
        ? 'Platformă completă de vânzare produse proaspete online cu sistem de comenzi, livrări și gestionare inventar în timp real.'
        : locale === 'en'
          ? 'Complete fresh products online sales platform with order system, deliveries and real-time inventory management.'
          : 'Piattaforma completa di vendita prodotti freschi online con sistema ordini, consegne e gestione inventario in tempo reale.',
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
      title: 'ContactFirma.ro',
      url: 'https://contactfirma.ro',
      category: locale === 'ro' ? 'Platformă Marketing' : locale === 'en' ? 'Marketing Platform' : 'Piattaforma Marketing',
      client: 'Contact Firma',
      description: locale === 'ro'
        ? 'Platformă de marketing B2B pentru businessuri, cu lead generation, CRM integrat și campanii automate de outreach.'
        : locale === 'en'
          ? 'B2B marketing platform for businesses, with lead generation, integrated CRM and automated outreach campaigns.'
          : 'Piattaforma marketing B2B per aziende, con lead generation, CRM integrato e campagne outreach automatizzate.',
      tags: ['B2B', 'Lead Generation', 'CRM', 'Marketing Automation', 'Email Campaigns'],
    },
    {
      id: 7,
      title: 'IonelAnistor.ro',
      url: 'https://ionelanistor.ro',
      category: locale === 'ro' ? 'Site Prezentare & Cursuri' : locale === 'en' ? 'Presentation & Courses' : 'Sito Presentazione & Corsi',
      client: 'Ionel Anistor',
      description: locale === 'ro'
        ? 'Website personal și platformă de cursuri online cu sistem de membri, video streaming și progres de învățare.'
        : locale === 'en'
          ? 'Personal website and online course platform with membership system, video streaming and learning progress.'
          : 'Sito web personale e piattaforma corsi online con sistema membri, video streaming e progresso apprendimento.',
      tags: ['LMS', 'Video Streaming', 'Membership', 'Progress Tracking'],
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
        ? 'Clientul avea un magazin online pe WordPress care se strica frecvent și genera costuri și pierderi de timp. L-am reconstruit complet în cod cu PHP Laravel: încărcări dramatic mai rapide pentru site, dashboard și statistici, ore economisite săptămânal, experiență client îmbunătățită și costuri de mentenanță reduse drastic.'
        : locale === 'en'
          ? 'The client had a WordPress ecommerce that broke often, wasting time and money. We rebuilt it entirely in code with PHP Laravel: dramatically faster load times for site, dashboard and stats, several hours saved every week, better customer experience and drastically lower maintenance costs.'
          : "Il cliente aveva un ecommerce in WordPress che si rompeva spesso, facendogli perdere tempo e denaro. Lo abbiamo ricostruito completamente in codice con PHP Laravel: caricamenti drasticamente più veloci per sito, dashboard e statistiche, diverse ore risparmiate ogni settimana, esperienza cliente migliorata e costi di manutenzione ridotti drasticamente.",
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
  ];
}
