import { prisma } from './prisma';
import {
  Partner,
  TierLevel,
  TIER_CONFIGS,
  BonusService,
  ServicePricing,
  Order,
} from '@/types';

/**
 * Calculate which tier a partner should be in based on annual revenue
 */
export function calculateTierLevel(annualRevenue: number): TierLevel {
  if (annualRevenue >= TIER_CONFIGS.PLATINUM.minRevenue) return 'PLATINUM';
  if (annualRevenue >= TIER_CONFIGS.GOLD.minRevenue) return 'GOLD';
  if (annualRevenue >= TIER_CONFIGS.SILVER.minRevenue) return 'SILVER';
  return 'BRONZE';
}

/**
 * Get tier discount percentage
 */
export function getTierDiscount(tier: TierLevel): number {
  return TIER_CONFIGS[tier].discount;
}

/**
 * Calculate partner cost for a service based on tier discount
 */
export function calculatePartnerCost(
  servicePrice: number,
  tier: TierLevel
): number {
  const discount = getTierDiscount(tier);
  return servicePrice * (1 - discount / 100);
}

/**
 * Check if it's time to reset annual revenue (new fiscal year)
 */
export function shouldResetAnnualRevenue(fiscalYearStart: Date): boolean {
  const now = new Date();
  const currentFiscalYear = new Date(now.getFullYear(), 0, 1); // January 1st of current year
  const partnerFiscalYear = new Date(fiscalYearStart);

  // If partner's fiscal year start is from previous year, it's time to reset
  return partnerFiscalYear.getFullYear() < currentFiscalYear.getFullYear();
}

/**
 * Reset partner's annual revenue for new fiscal year
 */
export async function resetPartnerAnnualRevenue(partnerId: string): Promise<void> {
  const now = new Date();
  const newFiscalYearStart = new Date(now.getFullYear(), 0, 1);

  await prisma.partner.update({
    where: { id: partnerId },
    data: {
      annualRevenue: 0,
      fiscalYearStart: newFiscalYearStart,
      currentTier: 'BRONZE',
    },
  });

  // Expire all unused bonus services from previous year
  await prisma.bonusService.updateMany({
    where: {
      partnerId,
      status: 'AVAILABLE',
      expiresAt: {
        lt: now,
      },
    },
    data: {
      status: 'EXPIRED',
    },
  });
}

/**
 * Update partner tier based on current revenue and assign bonus services if upgraded
 */
export async function updatePartnerTier(partnerId: string): Promise<{
  previousTier: TierLevel;
  newTier: TierLevel;
  upgraded: boolean;
}> {
  const partner = await prisma.partner.findUnique({
    where: { id: partnerId },
  });

  if (!partner) {
    throw new Error('Partner not found');
  }

  // Check if we need to reset for new fiscal year
  if (shouldResetAnnualRevenue(partner.fiscalYearStart)) {
    await resetPartnerAnnualRevenue(partnerId);
    return {
      previousTier: partner.currentTier as TierLevel,
      newTier: 'BRONZE',
      upgraded: false,
    };
  }

  const previousTier = partner.currentTier as TierLevel;
  const newTier = calculateTierLevel(partner.annualRevenue);

  if (newTier !== previousTier) {
    await prisma.partner.update({
      where: { id: partnerId },
      data: { currentTier: newTier },
    });

    // If upgraded, assign bonus services
    if (TIER_CONFIGS[newTier].minRevenue > TIER_CONFIGS[previousTier].minRevenue) {
      await assignBonusServices(partnerId, newTier);
    }

    return { previousTier, newTier, upgraded: true };
  }

  return { previousTier, newTier, upgraded: false };
}

/**
 * Assign bonus services to a partner based on their tier
 */
export async function assignBonusServices(
  partnerId: string,
  tier: TierLevel
): Promise<void> {
  const partner = await prisma.partner.findUnique({ where: { id: partnerId } });
  if (!partner) throw new Error('Partner not found');

  const config = TIER_CONFIGS[tier];
  const fiscalYearEnd = new Date(partner.fiscalYearStart);
  fiscalYearEnd.setFullYear(fiscalYearEnd.getFullYear() + 1);
  fiscalYearEnd.setDate(fiscalYearEnd.getDate() - 1); // Last day of fiscal year

  for (const bonusService of config.bonusServices) {
    // Get service pricing to determine value
    const pricing = await prisma.servicePricing.findUnique({
      where: { serviceType: bonusService.serviceType },
    });

    if (!pricing) {
      console.warn(`Service pricing not found for ${bonusService.serviceType}`);
      continue;
    }

    // Create bonus service entries (one per quantity)
    for (let i = 0; i < bonusService.quantity; i++) {
      await prisma.bonusService.create({
        data: {
          partnerId,
          serviceName: pricing.serviceName,
          serviceType: pricing.serviceType,
          value: pricing.priceRo, // Default to RO price
          locale: 'ro',
          status: 'AVAILABLE',
          expiresAt: fiscalYearEnd,
          notes: `Assegnato per tier ${tier}`,
        },
      });
    }
  }
}

/**
 * Get all bonus services for a partner
 */
export async function getPartnerBonusServices(
  partnerId: string
): Promise<BonusService[]> {
  const services = await prisma.bonusService.findMany({
    where: { partnerId },
    orderBy: { assignedAt: 'desc' },
  });

  return services.map((service: any) => ({
    ...service,
    assignedAt: service.assignedAt.toISOString(),
    usedAt: service.usedAt?.toISOString(),
    expiresAt: service.expiresAt.toISOString(),
    createdAt: service.createdAt.toISOString(),
    updatedAt: service.updatedAt.toISOString(),
    locale: service.locale as 'ro' | 'it' | 'en',
    status: service.status as 'AVAILABLE' | 'USED' | 'EXPIRED',
  }));
}

/**
 * Mark a bonus service as used
 */
export async function consumeBonusService(bonusServiceId: string): Promise<void> {
  await prisma.bonusService.update({
    where: { id: bonusServiceId },
    data: {
      status: 'USED',
      usedAt: new Date(),
    },
  });
}

/**
 * Get all service pricing
 */
export async function getServicePricing(): Promise<ServicePricing[]> {
  const services = await prisma.servicePricing.findMany({
    where: { isActive: true },
    orderBy: { category: 'asc' },
  });

  return services.map((service: any) => ({
    ...service,
    createdAt: service.createdAt.toISOString(),
    updatedAt: service.updatedAt.toISOString(),
  }));
}

/**
 * Get service price for a specific locale
 */
export function getServicePrice(
  service: ServicePricing,
  locale: 'ro' | 'it' | 'en'
): number {
  switch (locale) {
    case 'ro':
      return service.priceRo;
    case 'it':
      return service.priceIt;
    case 'en':
      return service.priceEn;
    default:
      return service.priceRo;
  }
}

/**
 * Create a new order and update partner revenue
 */
export async function createOrder(data: {
  partnerId: string;
  serviceType: string;
  clientName: string;
  clientEmail: string;
  locale: 'ro' | 'it' | 'en';
  notes?: string;
}): Promise<Order> {
  const partner = await prisma.partner.findUnique({
    where: { id: data.partnerId },
  });

  if (!partner) {
    throw new Error('Partner not found');
  }

  const serviceFromDb = await prisma.servicePricing.findUnique({
    where: { serviceType: data.serviceType },
  });

  if (!serviceFromDb) {
    throw new Error('Service not found');
  }

  // Convert Prisma result to ServicePricing type
  const service: ServicePricing = {
    id: serviceFromDb.id,
    serviceType: serviceFromDb.serviceType,
    serviceName: serviceFromDb.serviceName,
    category: serviceFromDb.category,
    priceRo: serviceFromDb.priceRo,
    priceIt: serviceFromDb.priceIt,
    priceEn: serviceFromDb.priceEn,
    description: serviceFromDb.description,
    isActive: serviceFromDb.isActive,
    isRecurring: serviceFromDb.isRecurring,
    createdAt: serviceFromDb.createdAt.toISOString(),
    updatedAt: serviceFromDb.updatedAt.toISOString(),
  };

  const amount = getServicePrice(service, data.locale);
  const discount = getTierDiscount(partner.currentTier as TierLevel);
  const partnerCost = calculatePartnerCost(amount, partner.currentTier as TierLevel);

  // Create the order
  const order = await prisma.order.create({
    data: {
      partnerId: data.partnerId,
      serviceType: data.serviceType,
      serviceName: service.serviceName,
      clientName: data.clientName,
      clientEmail: data.clientEmail,
      amount,
      partnerCost,
      discount,
      locale: data.locale,
      status: 'PENDING',
      notes: data.notes || '',
    },
  });

  // Update partner annual revenue (only count completed orders)
  // This will be updated when order status changes to COMPLETED

  return {
    ...order,
    orderDate: order.orderDate.toISOString(),
    completedAt: order.completedAt?.toISOString(),
    cancelledAt: order.cancelledAt?.toISOString(),
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    locale: order.locale as 'ro' | 'it' | 'en',
    status: order.status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
  };
}

/**
 * Complete an order and update partner revenue/tier
 */
export async function completeOrder(orderId: string): Promise<void> {
  const order = await prisma.order.findUnique({
    where: { id: orderId },
  });

  if (!order) {
    throw new Error('Order not found');
  }

  if (order.status === 'COMPLETED') {
    return; // Already completed
  }

  // Update order status
  await prisma.order.update({
    where: { id: orderId },
    data: {
      status: 'COMPLETED',
      completedAt: new Date(),
    },
  });

  // Update partner annual revenue
  await prisma.partner.update({
    where: { id: order.partnerId },
    data: {
      annualRevenue: {
        increment: order.amount,
      },
    },
  });

  // Check if partner should be upgraded
  await updatePartnerTier(order.partnerId);
}

/**
 * Get partner orders with pagination
 */
export async function getPartnerOrders(
  partnerId: string,
  options?: {
    skip?: number;
    take?: number;
    status?: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  }
): Promise<Order[]> {
  const orders = await prisma.order.findMany({
    where: {
      partnerId,
      ...(options?.status && { status: options.status }),
    },
    orderBy: { orderDate: 'desc' },
    skip: options?.skip,
    take: options?.take,
  });

  return orders.map((order: any) => ({
    ...order,
    orderDate: order.orderDate.toISOString(),
    completedAt: order.completedAt?.toISOString(),
    cancelledAt: order.cancelledAt?.toISOString(),
    createdAt: order.createdAt.toISOString(),
    updatedAt: order.updatedAt.toISOString(),
    locale: order.locale as 'ro' | 'it' | 'en',
    status: order.status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
  }));
}

/**
 * Get tier progress information for display
 */
export function getTierProgress(partner: Partner): {
  currentTier: TierLevel;
  currentTierName: string;
  nextTier: TierLevel | null;
  nextTierName: string | null;
  progress: number;
  revenueToNext: number;
  currentRevenue: number;
  discount: number;
} {
  const currentTier = partner.currentTier;
  const currentRevenue = partner.annualRevenue;
  const currentConfig = TIER_CONFIGS[currentTier];

  let nextTier: TierLevel | null = null;
  let nextTierName: string | null = null;
  let progress = 0;
  let revenueToNext = 0;

  if (currentTier === 'BRONZE') {
    nextTier = 'SILVER';
  } else if (currentTier === 'SILVER') {
    nextTier = 'GOLD';
  } else if (currentTier === 'GOLD') {
    nextTier = 'PLATINUM';
  }

  if (nextTier) {
    const nextConfig = TIER_CONFIGS[nextTier];
    nextTierName = nextConfig.name;
    revenueToNext = nextConfig.minRevenue - currentRevenue;

    const tierRange = nextConfig.minRevenue - currentConfig.minRevenue;
    const currentProgress = currentRevenue - currentConfig.minRevenue;
    progress = Math.min(100, Math.max(0, (currentProgress / tierRange) * 100));
  } else {
    // Already at max tier
    progress = 100;
  }

  return {
    currentTier,
    currentTierName: currentConfig.name,
    nextTier,
    nextTierName,
    progress,
    revenueToNext: Math.max(0, revenueToNext),
    currentRevenue,
    discount: currentConfig.discount,
  };
}
