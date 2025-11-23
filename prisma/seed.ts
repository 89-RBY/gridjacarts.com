import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create admin user
  const adminPassword = await bcrypt.hash('admin123', 10);
  const admin = await prisma.user.upsert({
    where: { email: 'admin@gridjacarts.com' },
    update: {},
    create: {
      email: 'admin@gridjacarts.com',
      name: 'Admin',
      password: adminPassword,
      role: 'admin',
    },
  });
  console.log('Created admin user:', admin.email);

  // Create default services
  const services = [
    { name: 'Web Design - Basic', basePrice: 500, description: 'Single page website' },
    { name: 'Web Design - Standard', basePrice: 1500, description: 'Multi-page website' },
    { name: 'Web Design - Premium', basePrice: 3000, description: 'Custom web application' },
    { name: 'SEO Audit', basePrice: 300, description: 'Complete SEO analysis' },
    { name: 'SEO Monthly', basePrice: 500, description: 'Monthly SEO optimization' },
    { name: 'Social Media Setup', basePrice: 200, description: 'Social media account setup' },
    { name: 'Social Media Monthly', basePrice: 400, description: 'Monthly social media management' },
    { name: 'Virtual Tour - Basic', basePrice: 300, description: 'Up to 5 locations' },
    { name: 'Virtual Tour - Premium', basePrice: 800, description: 'Up to 20 locations' },
    { name: 'Full Stack App - Basic', basePrice: 5000, description: 'Basic web application' },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { id: service.name.toLowerCase().replace(/\s+/g, '-') },
      update: service,
      create: {
        id: service.name.toLowerCase().replace(/\s+/g, '-'),
        ...service,
      },
    });
  }
  console.log('Created', services.length, 'services');

  // Create default site settings
  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {},
    create: {
      id: 'main',
      analyticsCode: '',
      chatbotCode: '',
    },
  });
  console.log('Created site settings');

  // Create sample blog post
  await prisma.blogPost.upsert({
    where: { slug: 'welcome-to-gridjac-arts' },
    update: {},
    create: {
      slug: 'welcome-to-gridjac-arts',
      slugRo: 'bine-ai-venit-la-gridjac-arts',
      slugEn: 'welcome-to-gridjac-arts',
      slugIt: 'benvenuto-su-gridjac-arts',
      titleRo: 'Bine ai venit la Gridjac Arts',
      titleEn: 'Welcome to Gridjac Arts',
      titleIt: 'Benvenuto su Gridjac Arts',
      contentRo: 'Suntem bucuroși să lansăm noul nostru website...',
      contentEn: 'We are excited to launch our new website...',
      contentIt: 'Siamo entusiasti di lanciare il nostro nuovo sito web...',
      excerptRo: 'Descoperă serviciile noastre digitale.',
      excerptEn: 'Discover our digital services.',
      excerptIt: 'Scopri i nostri servizi digitali.',
      author: 'Gridjac Team',
      tags: '["News", "Launch"]',
      status: 'published',
    },
  });
  console.log('Created sample blog post');

  console.log('Seeding completed!');
}

main()
  .catch((e) => {
    console.error('Error seeding database:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
