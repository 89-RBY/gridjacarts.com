export interface User {
  id: string;
  email: string;
  name: string;
  role: 'admin' | 'partner';
  createdAt: string;
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
