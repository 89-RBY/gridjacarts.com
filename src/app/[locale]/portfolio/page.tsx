import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';
import { ExternalLink } from 'lucide-react';

interface PortfolioPageProps {
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PortfolioPageProps) {
  const t = await getTranslations({ locale, namespace: 'portfolio' });
  return {
    title: t('title'),
  };
}

export default function PortfolioPage({ params: { locale } }: PortfolioPageProps) {
  const t = useTranslations('portfolio');

  // Sample portfolio projects (these would come from a database in production)
  const projects = [
    {
      id: 1,
      title: 'E-Commerce Platform',
      category: locale === 'ro' ? 'Web Development' : locale === 'en' ? 'Web Development' : 'Sviluppo Web',
      client: 'TechStore SRL',
      description: locale === 'ro'
        ? 'Platformă completă de e-commerce cu sistem de plăți integrat și gestionare stocuri.'
        : locale === 'en'
        ? 'Complete e-commerce platform with integrated payment system and inventory management.'
        : 'Piattaforma e-commerce completa con sistema di pagamento integrato e gestione inventario.',
      color: 'from-blue-500 to-cyan-500',
    },
    {
      id: 2,
      title: 'Restaurant Website',
      category: 'Web Design',
      client: 'La Bella Italia',
      description: locale === 'ro'
        ? 'Website modern cu meniu interactiv, sistem de rezervări și tur virtual 360°.'
        : locale === 'en'
        ? 'Modern website with interactive menu, reservation system and 360° virtual tour.'
        : 'Sito web moderno con menu interattivo, sistema di prenotazioni e tour virtuale a 360°.',
      color: 'from-orange-500 to-red-500',
    },
    {
      id: 3,
      title: 'Corporate Branding',
      category: locale === 'ro' ? 'Branding & Design' : locale === 'en' ? 'Branding & Design' : 'Branding & Design',
      client: 'Global Solutions',
      description: locale === 'ro'
        ? 'Identitate vizuală completă incluzând logo, materiale tipărite și ghid de brand.'
        : locale === 'en'
        ? 'Complete visual identity including logo, print materials and brand guidelines.'
        : 'Identità visiva completa con logo, materiali stampati e linee guida del brand.',
      color: 'from-purple-500 to-pink-500',
    },
    {
      id: 4,
      title: 'SEO Campaign',
      category: 'SEO',
      client: 'MedClinic Plus',
      description: locale === 'ro'
        ? 'Campanie SEO completă cu creștere de 300% în trafic organic în 6 luni.'
        : locale === 'en'
        ? 'Complete SEO campaign with 300% increase in organic traffic in 6 months.'
        : 'Campagna SEO completa con aumento del 300% del traffico organico in 6 mesi.',
      color: 'from-green-500 to-emerald-500',
    },
    {
      id: 5,
      title: 'Social Media Strategy',
      category: locale === 'ro' ? 'Social Media Marketing' : locale === 'en' ? 'Social Media Marketing' : 'Social Media Marketing',
      client: 'Fashion Brand X',
      description: locale === 'ro'
        ? 'Strategie completă de social media cu creștere a engagement-ului de 500%.'
        : locale === 'en'
        ? 'Complete social media strategy with 500% engagement growth.'
        : 'Strategia completa di social media con crescita del 500% dell\'engagement.',
      color: 'from-pink-500 to-rose-500',
    },
    {
      id: 6,
      title: 'Virtual Tour',
      category: locale === 'ro' ? 'Tururi Virtuale' : locale === 'en' ? 'Virtual Tours' : 'Tour Virtuali',
      client: 'Luxury Hotel Chain',
      description: locale === 'ro'
        ? 'Tur virtual 360° pentru 12 locații hoteliere cu integrare Google Maps.'
        : locale === 'en'
        ? '360° virtual tour for 12 hotel locations with Google Maps integration.'
        : 'Tour virtuale a 360° per 12 sedi alberghiere con integrazione Google Maps.',
      color: 'from-yellow-500 to-amber-500',
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
              <div
                key={project.id}
                className="card overflow-hidden group cursor-pointer"
              >
                {/* Project Image Placeholder */}
                <div className={`aspect-video bg-gradient-to-br ${project.color} relative overflow-hidden`}>
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="bg-white/90 backdrop-blur-sm rounded-full p-4">
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
                  <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-white">
                    {project.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">
                    {t('client')}: {project.client}
                  </p>
                  <p className="text-gray-600 dark:text-gray-300 text-sm leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
