import { NextResponse } from 'next/server';
import { revalidatePath } from 'next/cache';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { SERVICE_PRICING_SEED_DATA } from '@/lib/service-pricing-seed-data';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    let created = 0;
    let updated = 0;

    for (const service of SERVICE_PRICING_SEED_DATA) {
      const existing = await prisma.servicePricing.findFirst({
        where: { serviceType: service.serviceType },
      });

      const data = {
        serviceType: service.serviceType,
        serviceName: service.serviceName,
        category: service.category,
        priceRo: service.priceRo,
        priceIt: service.priceIt,
        priceEn: service.priceEn,
        description: service.description,
        isActive: service.isActive,
        isRecurring: service.isRecurring,
      };

      if (existing) {
        await prisma.servicePricing.update({
          where: { id: existing.id },
          data,
        });
        updated++;
      } else {
        await prisma.servicePricing.create({ data });
        created++;
      }
    }

    // Revalidate services pages to clear cache
    revalidatePath('/[locale]/admin', 'page');

    return NextResponse.json({
      message: `Successfully seeded services: ${created} created, ${updated} updated`,
      created,
      updated,
      total: SERVICE_PRICING_SEED_DATA.length,
    });
  } catch (error) {
    console.error('Error reseeding services:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to reseed services: ${message}` },
      { status: 500 }
    );
  }
}
