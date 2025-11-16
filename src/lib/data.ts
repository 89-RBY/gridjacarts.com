import { promises as fs } from 'fs';
import path from 'path';
import { BlogPost, Service, SiteSettings, PartnerPricing } from '@/types';

const DATA_DIR = path.join(process.cwd(), 'data');

// Ensure data directory exists
async function ensureDataDir() {
  try {
    await fs.access(DATA_DIR);
  } catch {
    await fs.mkdir(DATA_DIR, { recursive: true });
  }
}

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'posts.json'), 'utf-8');
    return JSON.parse(data);
  } catch {
    // Return sample posts if file doesn't exist
    const samplePosts: BlogPost[] = [
      {
        id: '1',
        slug: 'importanta-seo-2024',
        title: {
          ro: 'Importanța SEO în 2024',
          en: 'The Importance of SEO in 2024',
          it: "L'importanza della SEO nel 2024",
        },
        content: {
          ro: 'SEO rămâne unul dintre cele mai importante aspecte ale prezenței online...',
          en: 'SEO remains one of the most important aspects of online presence...',
          it: 'La SEO rimane uno degli aspetti più importanti della presenza online...',
        },
        excerpt: {
          ro: 'Descoperă de ce SEO este esențial pentru succesul afacerii tale online.',
          en: 'Discover why SEO is essential for your online business success.',
          it: 'Scopri perché la SEO è essenziale per il successo del tuo business online.',
        },
        author: 'Gridjac Team',
        publishedAt: '2024-01-15T10:00:00Z',
        updatedAt: '2024-01-15T10:00:00Z',
        tags: ['SEO', 'Digital Marketing'],
        status: 'published',
      },
      {
        id: '2',
        slug: 'tendinte-web-design',
        title: {
          ro: 'Tendințe Web Design pentru 2024',
          en: 'Web Design Trends for 2024',
          it: 'Tendenze Web Design per il 2024',
        },
        content: {
          ro: 'Design-ul web evoluează constant, iar anul 2024 aduce noi tendințe...',
          en: 'Web design is constantly evolving, and 2024 brings new trends...',
          it: 'Il web design è in continua evoluzione e il 2024 porta nuove tendenze...',
        },
        excerpt: {
          ro: 'Explorează cele mai noi tendințe în design-ul web.',
          en: 'Explore the latest trends in web design.',
          it: 'Esplora le ultime tendenze nel web design.',
        },
        author: 'Gridjac Team',
        publishedAt: '2024-02-01T10:00:00Z',
        updatedAt: '2024-02-01T10:00:00Z',
        tags: ['Web Design', 'UI/UX'],
        status: 'published',
      },
    ];
    await saveBlogPosts(samplePosts);
    return samplePosts;
  }
}

export async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(path.join(DATA_DIR, 'posts.json'), JSON.stringify(posts, null, 2));
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const posts = await getBlogPosts();
  return posts.find((p) => p.slug === slug) || null;
}

// Services
export async function getServices(): Promise<Service[]> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'services.json'), 'utf-8');
    return JSON.parse(data);
  } catch {
    const defaultServices: Service[] = [
      { id: '1', name: 'Web Design - Basic', basePrice: 500, description: 'Single page website' },
      { id: '2', name: 'Web Design - Standard', basePrice: 1500, description: 'Multi-page website' },
      { id: '3', name: 'Web Design - Premium', basePrice: 3000, description: 'Custom web application' },
      { id: '4', name: 'SEO Audit', basePrice: 300, description: 'Complete SEO analysis' },
      { id: '5', name: 'SEO Monthly', basePrice: 500, description: 'Monthly SEO optimization' },
      { id: '6', name: 'Social Media Setup', basePrice: 200, description: 'Social media account setup' },
      { id: '7', name: 'Social Media Monthly', basePrice: 400, description: 'Monthly social media management' },
      { id: '8', name: 'Virtual Tour - Basic', basePrice: 300, description: 'Up to 5 locations' },
      { id: '9', name: 'Virtual Tour - Premium', basePrice: 800, description: 'Up to 20 locations' },
      { id: '10', name: 'Full Stack App - Basic', basePrice: 5000, description: 'Basic web application' },
    ];
    await saveServices(defaultServices);
    return defaultServices;
  }
}

export async function saveServices(services: Service[]): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(path.join(DATA_DIR, 'services.json'), JSON.stringify(services, null, 2));
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  await ensureDataDir();
  try {
    const data = await fs.readFile(path.join(DATA_DIR, 'settings.json'), 'utf-8');
    return JSON.parse(data);
  } catch {
    const defaultSettings: SiteSettings = {
      analyticsCode: '',
      chatbotCode: '',
      updatedAt: new Date().toISOString(),
    };
    await saveSiteSettings(defaultSettings);
    return defaultSettings;
  }
}

export async function saveSiteSettings(settings: SiteSettings): Promise<void> {
  await ensureDataDir();
  await fs.writeFile(path.join(DATA_DIR, 'settings.json'), JSON.stringify(settings, null, 2));
}

// Partner Pricing Calculator
export function calculatePartnerPricing(services: Service[], markup: number = 20): PartnerPricing[] {
  return services.map((service) => ({
    serviceId: service.id,
    serviceName: service.name,
    basePrice: service.basePrice,
    partnerMarkup: markup,
    finalPrice: service.basePrice * (1 + markup / 100),
  }));
}
