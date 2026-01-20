import { prisma } from './prisma';
import { BlogPost, Service, SiteSettings, PartnerPricing, Partner, PartnerApplication } from '@/types';

// Blog Posts
export async function getBlogPosts(): Promise<BlogPost[]> {
  const posts = await prisma.blogPost.findMany({
    orderBy: { publishedAt: 'desc' },
  });

  // If no posts exist, create sample posts
  if (posts.length === 0) {
    const samplePostData = {
      slug: 'importanta-seo-2024',
      slugRo: 'importanta-seo-2024',
      slugEn: 'importance-seo-2024',
      slugIt: 'importanza-seo-2024',
      titleRo: 'Importanța SEO în 2024',
      titleEn: 'The Importance of SEO in 2024',
      titleIt: "L'importanza della SEO nel 2024",
      contentRo: 'SEO rămâne unul dintre cele mai importante aspecte ale prezenței online...',
      contentEn: 'SEO remains one of the most important aspects of online presence...',
      contentIt: 'La SEO rimane uno degli aspetti più importanti della presenza online...',
      excerptRo: 'Descoperă de ce SEO este esențial pentru succesul afacerii tale online.',
      excerptEn: 'Discover why SEO is essential for your online business success.',
      excerptIt: 'Scopri perché la SEO è essenziale per il successo del tuo business online.',
      author: 'Gridjac Team',
      tags: JSON.stringify(['SEO', 'Digital Marketing']),
      status: 'published',
    };

    const samplePost = await prisma.blogPost.create({ data: samplePostData });
    return [mapBlogPost(samplePost)];
  }

  return posts.map(mapBlogPost);
}

function mapBlogPost(post: {
  id: string;
  slug: string;
  slugRo?: string;
  slugEn?: string;
  slugIt?: string;
  titleRo: string;
  titleEn: string;
  titleIt: string;
  contentRo: string;
  contentEn: string;
  contentIt: string;
  excerptRo: string;
  excerptEn: string;
  excerptIt: string;
  author: string;
  imageUrl?: string | null;
  tags: string;
  status: string;
  publishedAt: Date;
  updatedAt: Date;
}): BlogPost {
  return {
    id: post.id,
    slug: post.slug,
    slugs: {
      ro: post.slugRo || post.slug,
      en: post.slugEn || post.slug,
      it: post.slugIt || post.slug,
    },
    title: {
      ro: post.titleRo,
      en: post.titleEn,
      it: post.titleIt,
    },
    content: {
      ro: post.contentRo,
      en: post.contentEn,
      it: post.contentIt,
    },
    excerpt: {
      ro: post.excerptRo,
      en: post.excerptEn,
      it: post.excerptIt,
    },
    author: post.author,
    imageUrl: post.imageUrl,
    tags: JSON.parse(post.tags),
    status: post.status as 'draft' | 'published',
    publishedAt: post.publishedAt.toISOString(),
    updatedAt: post.updatedAt.toISOString(),
  };
}

export async function saveBlogPosts(posts: BlogPost[]): Promise<void> {
  // Delete all existing posts and insert new ones
  await prisma.blogPost.deleteMany();
  for (const post of posts) {
    await prisma.blogPost.create({
      data: {
        id: post.id,
        slug: post.slug,
        slugRo: post.slugs.ro,
        slugEn: post.slugs.en,
        slugIt: post.slugs.it,
        titleRo: post.title.ro,
        titleEn: post.title.en,
        titleIt: post.title.it,
        contentRo: post.content.ro,
        contentEn: post.content.en,
        contentIt: post.content.it,
        excerptRo: post.excerpt.ro,
        excerptEn: post.excerpt.en,
        excerptIt: post.excerpt.it,
        author: post.author,
        imageUrl: post.imageUrl,
        tags: JSON.stringify(post.tags),
        status: post.status,
        publishedAt: new Date(post.publishedAt),
      },
    });
  }
}

export async function getBlogPostBySlug(slug: string, locale?: string): Promise<BlogPost | null> {
  let post;

  // If locale is provided, search by the appropriate language slug
  if (locale) {
    if (locale === 'ro') {
      post = await prisma.blogPost.findFirst({
        where: {
          OR: [
            { slugRo: slug },
            { slug: slug } // Fallback to legacy slug
          ]
        }
      });
    } else if (locale === 'en') {
      post = await prisma.blogPost.findFirst({
        where: {
          OR: [
            { slugEn: slug },
            { slug: slug } // Fallback to legacy slug
          ]
        }
      });
    } else if (locale === 'it') {
      post = await prisma.blogPost.findFirst({
        where: {
          OR: [
            { slugIt: slug },
            { slug: slug } // Fallback to legacy slug
          ]
        }
      });
    }
  }

  // Fallback: search by legacy slug field
  if (!post) {
    post = await prisma.blogPost.findUnique({ where: { slug } });
  }

  if (!post) return null;
  return mapBlogPost(post);
}

// Services
export async function getServices(): Promise<Service[]> {
  const services = await prisma.service.findMany();

  // If no services exist, create default services
  if (services.length === 0) {
    const defaultServicesData = [
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

    const createdServices: Awaited<ReturnType<typeof prisma.service.create>>[] = [];
    for (const serviceData of defaultServicesData) {
      const service = await prisma.service.create({ data: serviceData });
      createdServices.push(service);
    }

    return createdServices.map((s: typeof createdServices[0]) => ({
      id: s.id,
      name: s.name,
      basePrice: s.basePrice,
      description: s.description,
    }));
  }

  return services.map((s: typeof services[0]) => ({
    id: s.id,
    name: s.name,
    basePrice: s.basePrice,
    description: s.description,
  }));
}

export async function saveServices(services: Service[]): Promise<void> {
  await prisma.service.deleteMany();
  for (const service of services) {
    await prisma.service.create({
      data: {
        id: service.id,
        name: service.name,
        basePrice: service.basePrice,
        description: service.description,
      },
    });
  }
}

// Site Settings
export async function getSiteSettings(): Promise<SiteSettings> {
  let settings = await prisma.siteSettings.findUnique({ where: { id: 'main' } });

  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        id: 'main',
        analyticsCode: '',
        chatbotCode: '',
      },
    });
  }

  return {
    analyticsCode: settings.analyticsCode,
    chatbotCode: settings.chatbotCode,
    smtpHost: settings.smtpHost,
    smtpPort: settings.smtpPort,
    smtpUser: settings.smtpUser,
    smtpPassword: settings.smtpPassword,
    updatedAt: settings.updatedAt.toISOString(),
  };
}

export async function saveSiteSettings(settingsData: SiteSettings): Promise<void> {
  await prisma.siteSettings.upsert({
    where: { id: 'main' },
    update: {
      analyticsCode: settingsData.analyticsCode,
      chatbotCode: settingsData.chatbotCode,
      smtpHost: settingsData.smtpHost,
      smtpPort: settingsData.smtpPort,
      smtpUser: settingsData.smtpUser,
      smtpPassword: settingsData.smtpPassword,
    },
    create: {
      id: 'main',
      analyticsCode: settingsData.analyticsCode,
      chatbotCode: settingsData.chatbotCode,
      smtpHost: settingsData.smtpHost || '',
      smtpPort: settingsData.smtpPort || '465',
      smtpUser: settingsData.smtpUser || '',
      smtpPassword: settingsData.smtpPassword || '',
    },
  });
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

// Partners Management
export async function getPartners(): Promise<Partner[]> {
  const partners = await prisma.partner.findMany();
  return partners.map((p: typeof partners[0]) => ({
    id: p.id,
    userId: p.userId,
    companyName: p.companyName,
    contactPerson: p.contactPerson,
    email: p.email,
    phone: p.phone,
    address: p.address,
    taxId: p.taxId,

    // Tier System fields
    currentTier: p.currentTier as 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM',
    annualRevenue: p.annualRevenue,
    fiscalYearStart: p.fiscalYearStart.toISOString(),
    lastTierUpdate: p.lastTierUpdate.toISOString(),

    // Legacy field (optional)
    markup: p.markup ?? undefined,

    status: p.status as 'pending' | 'approved' | 'rejected' | 'suspended',
    notes: p.notes,
    createdAt: p.createdAt.toISOString(),
    approvedAt: p.approvedAt?.toISOString(),
    approvedBy: p.approvedBy || undefined,
  }));
}

export async function savePartners(partners: Partner[]): Promise<void> {
  // This is a bulk operation - delete all and recreate
  // In production, you'd want more granular updates
  await prisma.partner.deleteMany();
  for (const partner of partners) {
    await prisma.partner.create({
      data: {
        id: partner.id,
        userId: partner.userId,
        companyName: partner.companyName,
        contactPerson: partner.contactPerson,
        email: partner.email,
        phone: partner.phone,
        address: partner.address,
        taxId: partner.taxId,

        // Tier System fields
        currentTier: partner.currentTier,
        annualRevenue: partner.annualRevenue,
        fiscalYearStart: new Date(partner.fiscalYearStart),
        lastTierUpdate: new Date(partner.lastTierUpdate),

        // Legacy field (optional)
        markup: partner.markup,

        status: partner.status,
        notes: partner.notes,
        approvedAt: partner.approvedAt ? new Date(partner.approvedAt) : null,
        approvedBy: partner.approvedBy || null,
      },
    });
  }
}

export async function getPartnerById(id: string): Promise<Partner | null> {
  const partner = await prisma.partner.findUnique({ where: { id } });
  if (!partner) return null;
  return {
    id: partner.id,
    userId: partner.userId,
    companyName: partner.companyName,
    contactPerson: partner.contactPerson,
    email: partner.email,
    phone: partner.phone,
    address: partner.address,
    taxId: partner.taxId,

    // Tier System fields
    currentTier: partner.currentTier as 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM',
    annualRevenue: partner.annualRevenue,
    fiscalYearStart: partner.fiscalYearStart.toISOString(),
    lastTierUpdate: partner.lastTierUpdate.toISOString(),

    // Legacy field (optional)
    markup: partner.markup ?? undefined,

    status: partner.status as 'pending' | 'approved' | 'rejected' | 'suspended',
    notes: partner.notes,
    createdAt: partner.createdAt.toISOString(),
    approvedAt: partner.approvedAt?.toISOString(),
    approvedBy: partner.approvedBy || undefined,
  };
}

export async function getPartnerByUserId(userId: string): Promise<Partner | null> {
  const partner = await prisma.partner.findUnique({ where: { userId } });
  if (!partner) return null;
  return {
    id: partner.id,
    userId: partner.userId,
    companyName: partner.companyName,
    contactPerson: partner.contactPerson,
    email: partner.email,
    phone: partner.phone,
    address: partner.address,
    taxId: partner.taxId,

    // Tier System fields
    currentTier: partner.currentTier as 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM',
    annualRevenue: partner.annualRevenue,
    fiscalYearStart: partner.fiscalYearStart.toISOString(),
    lastTierUpdate: partner.lastTierUpdate.toISOString(),

    // Legacy field (optional)
    markup: partner.markup ?? undefined,

    status: partner.status as 'pending' | 'approved' | 'rejected' | 'suspended',
    notes: partner.notes,
    createdAt: partner.createdAt.toISOString(),
    approvedAt: partner.approvedAt?.toISOString(),
    approvedBy: partner.approvedBy || undefined,
  };
}

export async function createPartner(
  partnerData: Omit<Partner, 'id' | 'createdAt'>
): Promise<Partner> {
  const newPartner = await prisma.partner.create({
    data: {
      userId: partnerData.userId,
      companyName: partnerData.companyName,
      contactPerson: partnerData.contactPerson,
      email: partnerData.email,
      phone: partnerData.phone,
      address: partnerData.address,
      taxId: partnerData.taxId,

      // Tier System fields
      currentTier: partnerData.currentTier,
      annualRevenue: partnerData.annualRevenue,
      fiscalYearStart: new Date(partnerData.fiscalYearStart),
      lastTierUpdate: new Date(partnerData.lastTierUpdate),

      // Legacy field (optional)
      markup: partnerData.markup,

      status: partnerData.status,
      notes: partnerData.notes,
      approvedAt: partnerData.approvedAt ? new Date(partnerData.approvedAt) : null,
      approvedBy: partnerData.approvedBy || null,
    },
  });

  return {
    id: newPartner.id,
    userId: newPartner.userId,
    companyName: newPartner.companyName,
    contactPerson: newPartner.contactPerson,
    email: newPartner.email,
    phone: newPartner.phone,
    address: newPartner.address,
    taxId: newPartner.taxId,

    // Tier System fields
    currentTier: newPartner.currentTier as 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM',
    annualRevenue: newPartner.annualRevenue,
    fiscalYearStart: newPartner.fiscalYearStart.toISOString(),
    lastTierUpdate: newPartner.lastTierUpdate.toISOString(),

    // Legacy field (optional)
    markup: newPartner.markup ?? undefined,

    status: newPartner.status as 'pending' | 'approved' | 'rejected' | 'suspended',
    notes: newPartner.notes,
    createdAt: newPartner.createdAt.toISOString(),
    approvedAt: newPartner.approvedAt?.toISOString(),
    approvedBy: newPartner.approvedBy || undefined,
  };
}

export async function updatePartner(id: string, updates: Partial<Partner>): Promise<Partner | null> {
  try {
    const updateData: Record<string, unknown> = {};

    if (updates.companyName) updateData.companyName = updates.companyName;
    if (updates.contactPerson) updateData.contactPerson = updates.contactPerson;
    if (updates.email) updateData.email = updates.email;
    if (updates.phone) updateData.phone = updates.phone;
    if (updates.address) updateData.address = updates.address;
    if (updates.taxId) updateData.taxId = updates.taxId;

    // Tier System fields
    if (updates.currentTier) updateData.currentTier = updates.currentTier;
    if (updates.annualRevenue !== undefined) updateData.annualRevenue = updates.annualRevenue;
    if (updates.fiscalYearStart) updateData.fiscalYearStart = new Date(updates.fiscalYearStart);
    if (updates.lastTierUpdate) updateData.lastTierUpdate = new Date(updates.lastTierUpdate);

    // Legacy field
    if (updates.markup !== undefined) updateData.markup = updates.markup;

    if (updates.status) updateData.status = updates.status;
    if (updates.notes !== undefined) updateData.notes = updates.notes;
    if (updates.approvedAt) updateData.approvedAt = new Date(updates.approvedAt);
    if (updates.approvedBy) updateData.approvedBy = updates.approvedBy;

    const updatedPartner = await prisma.partner.update({
      where: { id },
      data: updateData,
    });

    return {
      id: updatedPartner.id,
      userId: updatedPartner.userId,
      companyName: updatedPartner.companyName,
      contactPerson: updatedPartner.contactPerson,
      email: updatedPartner.email,
      phone: updatedPartner.phone,
      address: updatedPartner.address,
      taxId: updatedPartner.taxId,

      // Tier System fields
      currentTier: updatedPartner.currentTier as 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM',
      annualRevenue: updatedPartner.annualRevenue,
      fiscalYearStart: updatedPartner.fiscalYearStart.toISOString(),
      lastTierUpdate: updatedPartner.lastTierUpdate.toISOString(),

      // Legacy field (optional)
      markup: updatedPartner.markup ?? undefined,

      status: updatedPartner.status as 'pending' | 'approved' | 'rejected' | 'suspended',
      notes: updatedPartner.notes,
      createdAt: updatedPartner.createdAt.toISOString(),
      approvedAt: updatedPartner.approvedAt?.toISOString(),
      approvedBy: updatedPartner.approvedBy || undefined,
    };
  } catch {
    return null;
  }
}

export async function deletePartner(id: string): Promise<boolean> {
  try {
    await prisma.partner.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

// Partner Applications
export async function getPartnerApplications(): Promise<PartnerApplication[]> {
  const applications = await prisma.partnerApplication.findMany({
    orderBy: { createdAt: 'desc' },
  });

  return applications.map((a: typeof applications[0]) => ({
    id: a.id,
    companyName: a.companyName,
    contactPerson: a.contactPerson,
    email: a.email,
    phone: a.phone,
    address: a.address,
    taxId: a.taxId,
    message: a.message,
    status: a.status as 'pending' | 'approved' | 'rejected',
    createdAt: a.createdAt.toISOString(),
    reviewedAt: a.reviewedAt?.toISOString(),
    reviewedBy: a.reviewedBy || undefined,
  }));
}

export async function savePartnerApplications(applications: PartnerApplication[]): Promise<void> {
  await prisma.partnerApplication.deleteMany();
  for (const app of applications) {
    await prisma.partnerApplication.create({
      data: {
        id: app.id,
        companyName: app.companyName,
        contactPerson: app.contactPerson,
        email: app.email,
        phone: app.phone,
        address: app.address,
        taxId: app.taxId,
        message: app.message,
        status: app.status,
        reviewedAt: app.reviewedAt ? new Date(app.reviewedAt) : null,
        reviewedBy: app.reviewedBy || null,
      },
    });
  }
}

export async function createPartnerApplication(
  applicationData: Omit<PartnerApplication, 'id' | 'status' | 'createdAt'>
): Promise<PartnerApplication> {
  const newApplication = await prisma.partnerApplication.create({
    data: {
      companyName: applicationData.companyName,
      contactPerson: applicationData.contactPerson,
      email: applicationData.email,
      phone: applicationData.phone,
      address: applicationData.address,
      taxId: applicationData.taxId,
      message: applicationData.message,
      status: 'pending',
    },
  });

  return {
    id: newApplication.id,
    companyName: newApplication.companyName,
    contactPerson: newApplication.contactPerson,
    email: newApplication.email,
    phone: newApplication.phone,
    address: newApplication.address,
    taxId: newApplication.taxId,
    message: newApplication.message,
    status: newApplication.status as 'pending' | 'approved' | 'rejected',
    createdAt: newApplication.createdAt.toISOString(),
    reviewedAt: newApplication.reviewedAt?.toISOString(),
    reviewedBy: newApplication.reviewedBy || undefined,
  };
}

export async function updatePartnerApplication(
  id: string,
  updates: Partial<PartnerApplication>
): Promise<PartnerApplication | null> {
  try {
    const updateData: Record<string, unknown> = {};

    if (updates.status) updateData.status = updates.status;
    if (updates.reviewedAt) updateData.reviewedAt = new Date(updates.reviewedAt);
    if (updates.reviewedBy) updateData.reviewedBy = updates.reviewedBy;

    const updatedApp = await prisma.partnerApplication.update({
      where: { id },
      data: updateData,
    });

    return {
      id: updatedApp.id,
      companyName: updatedApp.companyName,
      contactPerson: updatedApp.contactPerson,
      email: updatedApp.email,
      phone: updatedApp.phone,
      address: updatedApp.address,
      taxId: updatedApp.taxId,
      message: updatedApp.message,
      status: updatedApp.status as 'pending' | 'approved' | 'rejected',
      createdAt: updatedApp.createdAt.toISOString(),
      reviewedAt: updatedApp.reviewedAt?.toISOString(),
      reviewedBy: updatedApp.reviewedBy || undefined,
    };
  } catch {
    return null;
  }
}

export async function deletePartnerApplication(id: string): Promise<boolean> {
  try {
    await prisma.partnerApplication.delete({ where: { id } });
    return true;
  } catch {
    return false;
  }
}

// Team Members
export async function getTeamMembers() {
  const members = await prisma.teamMember.findMany({
    orderBy: { order: 'asc' },
  });
  return members.map((m) => ({
    ...m,
    socialLinks: JSON.parse(m.socialLinks || '{}'),
  }));
}

export async function saveTeamMember(member: any) {
  const data = {
    name: member.name,
    roleRo: member.roleRo,
    roleEn: member.roleEn,
    roleIt: member.roleIt,
    bioRo: member.bioRo,
    bioEn: member.bioEn,
    bioIt: member.bioIt,
    imageUrl: member.imageUrl,
    socialLinks: JSON.stringify(member.socialLinks || {}),
    order: member.order,
  };

  if (member.id) {
    return await prisma.teamMember.update({
      where: { id: member.id },
      data,
    });
  } else {
    return await prisma.teamMember.create({
      data,
    });
  }
}

export async function deleteTeamMember(id: string) {
  return await prisma.teamMember.delete({
    where: { id },
  });
}
