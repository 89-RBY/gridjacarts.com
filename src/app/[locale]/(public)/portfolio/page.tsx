import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import Image from 'next/image';
import { ExternalLink } from 'lucide-react';

interface PortfolioPageProps {
  params: { locale: string };
}

// Force dynamic rendering due to next-intl usage
export const dynamic = 'force-dynamic';

export async function generateMetadata({ params: { locale } }: PortfolioPageProps) {
  const t = await getTranslations({ locale, namespace: 'portfolio' });
  return {
    title: t('title'),
  };
}

export default function PortfolioPage({ params: { locale } }: PortfolioPageProps) {
  const t = useTranslations('portfolio');

  // Real portfolio projects
  const projects = [
    {
      id: 1,
      title: 'Cumparatura.ro',
      url: 'https://cumparatura.ro',
      category: locale === 'ro' ? 'Platformă Full-Stack' : locale === 'en' ? 'Full-Stack Platform' : 'Piattaforma Full-Stack',
      client: 'Cumparatura',
      image: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=800&h=600&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&h=600&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=800&h=600&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?w=800&h=600&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?w=800&h=600&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=800&h=600&fit=crop',
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
      image: 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=600&fit=crop',
      description: locale === 'ro'
        ? 'Website personal și platformă de cursuri online cu sistem de membri, video streaming și progres de învățare.'
        : locale === 'en'
        ? 'Personal website and online course platform with membership system, video streaming and learning progress.'
        : 'Sito web personale e piattaforma corsi online con sistema membri, video streaming e progresso apprendimento.',
      tags: ['LMS', 'Video Streaming', 'Membership', 'Progress Tracking'],
    },
    {
      id: 8,
      title: 'DMDDentalClinic.ro',
      url: 'https://dmddentalclinic.ro',
      category: locale === 'ro' ? 'Site Medical' : locale === 'en' ? 'Medical Website' : 'Sito Medico',
      client: 'DMD Dental Clinic',
      image: 'https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?w=800&h=600&fit=crop',
      description: locale === 'ro'
        ? 'Website modern pentru clinică stomatologică cu prezentare servicii, echipă medicală, sistem de programări și galerie before/after.'
        : locale === 'en'
        ? 'Modern website for dental clinic with services showcase, medical team, appointment system and before/after gallery.'
        : 'Sito moderno per clinica dentale con presentazione servizi, team medico, sistema prenotazioni e galleria prima/dopo.',
      tags: ['Medical', 'Appointment System', 'SEO Local', 'Gallery'],
    },
  ];

  return (
    <div>
      {/* Hero Section */}
      <section className="section-padding bg-gradient-to-br from-gray-50 to-primary-50 dark:from-gray-900 dark:to-gray-800">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-display font-bold mb-6">
              <span className="gradient-text">{t('title')}</span>
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              {t('subtitle')}
            </p>
          </div>
        </div>
      </section>

      {/* Portfolio Grid */}
      <section className="section-padding bg-white dark:bg-gray-900">
        <div className="container-custom">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <a
                key={project.id}
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="card overflow-hidden group cursor-pointer hover:shadow-2xl transition-all duration-300"
              >
                {/* Project Image */}
                <div className="aspect-video relative overflow-hidden bg-gray-200 dark:bg-gray-700">
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-colors duration-300" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4 transform scale-75 group-hover:scale-100 transition-transform">
                      <ExternalLink className="w-6 h-6 text-gray-900" />
                    </div>
                  </div>
                </div>

                {/* Project Info */}
                <div className="p-6">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-sm font-medium text-primary-600 dark:text-primary-400">
                      {project.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {t('client')}: {project.client}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed mb-4">
                    {project.description}
                  </p>
                  {/* Tags */}
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag, index) => (
                      <span
                        key={index}
                        className="text-xs px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
