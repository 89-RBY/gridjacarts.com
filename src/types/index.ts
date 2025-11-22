export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'partner';
  createdAt: string;
}

export interface Partner {
  id: string;
  userId: string;
  companyName: string;
  contactPerson: string;
  email: string;
  phone: string;
  address: string;
  taxId: string;
  markup: number; // Percentage markup for this partner
  status: 'pending' | 'approved' | 'rejected' | 'suspended';
  notes: string;
  createdAt: string;
  approvedAt?: string;
  approvedBy?: string;
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
  slug: string;
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
  updatedAt: string;
}

export interface NewsletterSubscriber {
  id: string;
  email: string;
  status: 'active' | 'unsubscribed';
  source: string;
  createdAt: string;
}
