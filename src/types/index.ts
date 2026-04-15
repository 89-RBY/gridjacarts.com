export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'partner';
  createdAt: string;
}

export type TierLevel = 'BRONZE' | 'SILVER' | 'GOLD' | 'PLATINUM';

export interface Partner {
  id: string;
  userId: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;

  // Tier System
  currentTier: TierLevel;
  annualRevenue: number;
  fiscalYearStart: string;
  lastTierUpdate: string;

  // Legacy field - kept for backward compatibility
  markup?: number;

  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  notes: string;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;

  // Optional relations
  bonusServices?: BonusService[];
  orders?: Order[];
}

export interface PartnerApplication {
  id: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  message: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
  reviewedAt?: string;
  reviewedBy?: string;
}

export interface BlogPost {
  id: string;
  slug: string; // Legacy - for backwards compatibility
  slugs: {
    ro: string;
    en: string;
    it: string;
  };
  title: {
    ro: string;
    en: string;
    it: string;
  };
  content: {
    ro: string;
    en: string;
    it: string;
  };
  excerpt: {
    ro: string;
    en: string;
    it: string;
  };
  author: string;
  imageUrl?: string | null;
  publishedAt: string;
  updatedAt: string;
  tags: string[];
  status: 'draft' | 'published';
}

export interface Service {
  id: string;
  name: string;
  basePrice: number;
  description: string;
}

export interface PartnerPricing {
  serviceId: string;
  serviceName: string;
  basePrice: number;
  partnerMarkup: number;
  finalPrice: number;
}

export interface SiteSettings {
  analyticsCode: string;
  chatbotCode: string;
  smtpHost?: string;
  smtpPort?: string;
  smtpUser?: string;
  smtpPassword?: string;
  updatedAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  source: string;
  createdAt: string;
}

// Tier System Types

export type BonusStatus = 'AVAILABLE' | 'USED' | 'EXPIRED';
export type OrderStatus = 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';

export interface BonusService {
  id: string;
  partnerId: string;
  serviceName: string;
  serviceType: string;
  value: number;
  locale: 'ro' | 'it' | 'en';
  status: BonusStatus;
  assignedAt: string;
  usedAt?: string;
  expiresAt: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

export interface ServicePricing {
  id: string;
  serviceType: string;
  serviceName: string;
  category: string;
  priceRo: number;
  priceIt: number;
  priceEn: number;
  description: string;
  isActive: boolean;
  isRecurring: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Order {
  id: string;
  partnerId: string;
  serviceType: string;
  serviceName: string;
  clientName: string;
  clientEmail: string;
  amount: number;
  partnerCost: number;
  discount: number;
  locale: 'ro' | 'it' | 'en';
  status: OrderStatus;
  orderDate: string;
  completedAt?: string;
  cancelledAt?: string;
  notes: string;
  createdAt: string;
  updatedAt: string;
}

// Tier Configuration
export interface TierConfig {
  level: TierLevel;
  name: string;
  minRevenue: number;
  maxRevenue: number;
  discount: number; // Percentage 15, 20, 25, 30
  benefits: string[];
  bonusServices: {
    serviceType: string;
    quantity: number;
  }[];
}

export const TIER_CONFIGS: Record<TierLevel, TierConfig> = {
  BRONZE: {
    level: 'BRONZE',
    name: 'Starter',
    minRevenue: 0,
    maxRevenue: 10000,
    discount: 15,
    benefits: ['Accesso piattaforma', 'Supporto email'],
    bonusServices: [],
  },
  SILVER: {
    level: 'SILVER',
    name: 'Professional',
    minRevenue: 10001,
    maxRevenue: 50000,
    discount: 20,
    benefits: ['Logo personalizzato', 'Supporto prioritario'],
    bonusServices: [
      { serviceType: 'logo-design', quantity: 1 },
    ],
  },
  GOLD: {
    level: 'GOLD',
    name: 'Premium',
    minRevenue: 50001,
    maxRevenue: 150000,
    discount: 25,
    benefits: ['Landing page', 'Materiali marketing dedicati'],
    bonusServices: [
      { serviceType: 'landing-page', quantity: 1 },
      { serviceType: 'seo-audit', quantity: 1 },
      { serviceType: 'logo-design-brand', quantity: 1 },
    ],
  },
  PLATINUM: {
    level: 'PLATINUM',
    name: 'Elite',
    minRevenue: 150001,
    maxRevenue: Infinity,
    discount: 30,
    benefits: ['Account manager dedicato', 'Early access nuovi servizi'],
    bonusServices: [
      { serviceType: 'web-design-complete', quantity: 1 },
      { serviceType: 'seo-6-months', quantity: 1 },
    ],
  },
};

// Contract Types
export type ContractStatus = 'PENDING' | 'SIGNED' | 'EXPIRED' | 'REJECTED' | 'ARCHIVED';

export interface Contract {
  id: string;
  partnerId: string;
  orderId?: string;
  contractNumber: string;
  contractType: string;
  fileName: string;
  fileUrl: string;
  fileSize: number;
  mimeType: string;
  status: ContractStatus;
  signedAt?: string;
  expiresAt?: string;
  notes: string;
  uploadedAt: string;
  createdAt: string;
  updatedAt: string;
}

export interface TeamMember {
  id: string;
  name: string;
  roleRo: string;
  roleEn: string;
  roleIt: string;
  bioRo?: string;
  bioEn?: string;
  bioIt?: string;
  imageUrl?: string;
  socialLinks: {
    linkedin?: string;
    twitter?: string;
    github?: string;
    instagram?: string;
  };
  order: number;
  createdAt: string;
  updatedAt: string;
}

// Product Types
export type ProductStatus = 'LIVE' | 'BETA' | 'DEVELOPMENT' | 'ARCHIVED';

export interface Product {
  id: string;
  slug: string;
  name: string;

  tagline: {
    ro: string;
    en: string;
    it: string;
  };

  problem: {
    ro: string;
    en: string;
    it: string;
  };

  description: {
    ro: string;
    en: string;
    it: string;
  };

  features: {
    ro: string[];
    en: string[];
    it: string[];
  };

  techStack: string[];

  imageUrl?: string;
  logoUrl?: string;
  demoUrl?: string;
  caseStudyUrl?: string;

  usersCount?: string;
  automationSaved?: string;

  status: ProductStatus;
  category: string;

  metaTitle?: {
    ro?: string;
    en?: string;
    it?: string;
  };

  metaDescription?: {
    ro?: string;
    en?: string;
    it?: string;
  };

  featured: boolean;
  order: number;

  createdAt: string;
  updatedAt: string;
}
