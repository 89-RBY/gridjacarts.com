import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getTierProgress } from '@/lib/tier';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user and partner data
    const user = await prisma.user.findUnique({
      where: { email: currentUser.email },
      include: {
        partner: {
          include: {
            bonusServices: {
              where: {
                status: { in: ['AVAILABLE', 'USED'] },
              },
              orderBy: { assignedAt: 'desc' },
            },
            orders: {
              orderBy: { orderDate: 'desc' },
              take: 10, // Last 10 orders
            },
          },
        },
      },
    });

    if (!user?.partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    const partner = user.partner;

    // Calculate tier progress
    const tierProgressData = getTierProgress({
      id: partner.id,
      userId: partner.userId,
      companyName: partner.companyName,
      contactPerson: partner.contactPerson,
      email: partner.email,
      phone: partner.phone,
      address: partner.address,
      taxId: partner.taxId,
      currentTier: partner.currentTier as any,
      annualRevenue: partner.annualRevenue,
      fiscalYearStart: partner.fiscalYearStart.toISOString(),
      lastTierUpdate: partner.lastTierUpdate.toISOString(),
      status: partner.status as any,
      notes: partner.notes,
      createdAt: partner.createdAt.toISOString(),
      approvedAt: partner.approvedAt?.toISOString(),
      approvedBy: partner.approvedBy ?? undefined,
    });

    // Format bonus services
    const bonusServices = partner.bonusServices.map((bs: any) => ({
      id: bs.id,
      partnerId: bs.partnerId,
      serviceName: bs.serviceName,
      serviceType: bs.serviceType,
      value: bs.value,
      locale: bs.locale as 'ro' | 'it' | 'en',
      status: bs.status as 'AVAILABLE' | 'USED' | 'EXPIRED',
      assignedAt: bs.assignedAt.toISOString(),
      usedAt: bs.usedAt?.toISOString(),
      expiresAt: bs.expiresAt.toISOString(),
      notes: bs.notes,
      createdAt: bs.createdAt.toISOString(),
      updatedAt: bs.updatedAt.toISOString(),
    }));

    // Format orders
    const orders = partner.orders.map((order: any) => ({
      id: order.id,
      partnerId: order.partnerId,
      serviceType: order.serviceType,
      serviceName: order.serviceName,
      clientName: order.clientName,
      clientEmail: order.clientEmail,
      amount: order.amount,
      partnerCost: order.partnerCost,
      discount: order.discount,
      locale: order.locale as 'ro' | 'it' | 'en',
      status: order.status as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED',
      orderDate: order.orderDate.toISOString(),
      completedAt: order.completedAt?.toISOString(),
      cancelledAt: order.cancelledAt?.toISOString(),
      notes: order.notes,
      createdAt: order.createdAt.toISOString(),
      updatedAt: order.updatedAt.toISOString(),
    }));

    // Return dashboard data
    return NextResponse.json({
      partner: {
        id: partner.id,
        userId: partner.userId,
        companyName: partner.companyName,
        contactPerson: partner.contactPerson,
        email: partner.email,
        phone: partner.phone,
        address: partner.address,
        taxId: partner.taxId,
        currentTier: partner.currentTier,
        annualRevenue: partner.annualRevenue,
        fiscalYearStart: partner.fiscalYearStart.toISOString(),
        lastTierUpdate: partner.lastTierUpdate.toISOString(),
        status: partner.status,
        notes: partner.notes,
        createdAt: partner.createdAt.toISOString(),
        approvedAt: partner.approvedAt?.toISOString(),
        approvedBy: partner.approvedBy,
      },
      tierProgress: tierProgressData,
      bonusServices,
      orders,
    });
  } catch (error) {
    console.error('Dashboard API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
