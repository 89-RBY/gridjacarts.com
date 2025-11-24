import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get services from ServicePricing table (used by partner dashboard)
    const services = await prisma.servicePricing.findMany({
      orderBy: { category: 'asc' },
    });

    const formattedServices = services.map((s: any) => ({
      ...s,
      createdAt: s.createdAt.toISOString(),
      updatedAt: s.updatedAt.toISOString(),
    }));

    return NextResponse.json({ services: formattedServices });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { serviceType, serviceName, category, priceRo, priceIt, priceEn, description, isRecurring } = await request.json();

    if (!serviceType || !serviceName || !category || priceRo === undefined || priceIt === undefined || priceEn === undefined) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const newService = await prisma.servicePricing.create({
      data: {
        serviceType,
        serviceName,
        category,
        priceRo: Number(priceRo),
        priceIt: Number(priceIt),
        priceEn: Number(priceEn),
        description: description || '',
        isActive: true,
        isRecurring: isRecurring || false,
      },
    });

    return NextResponse.json({
      service: {
        ...newService,
        createdAt: newService.createdAt.toISOString(),
        updatedAt: newService.updatedAt.toISOString(),
      },
      message: 'Service created successfully'
    });
  } catch (error) {
    console.error('Error creating service:', error);
    return NextResponse.json({ error: 'Failed to create service' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { id, serviceType, serviceName, category, priceRo, priceIt, priceEn, description, isActive, isRecurring } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Service ID required' }, { status: 400 });
    }

    console.log('Updating service:', { id, serviceType, serviceName, category, priceRo, priceIt, priceEn, description, isActive, isRecurring });

    const updateData: any = {};
    if (serviceType !== undefined) updateData.serviceType = serviceType;
    if (serviceName !== undefined) updateData.serviceName = serviceName;
    if (category !== undefined) updateData.category = category;
    if (priceRo !== undefined) updateData.priceRo = Number(priceRo);
    if (priceIt !== undefined) updateData.priceIt = Number(priceIt);
    if (priceEn !== undefined) updateData.priceEn = Number(priceEn);
    if (description !== undefined) updateData.description = description;
    if (isActive !== undefined) updateData.isActive = isActive;
    if (isRecurring !== undefined) updateData.isRecurring = isRecurring;

    const updatedService = await prisma.servicePricing.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json({
      service: {
        ...updatedService,
        createdAt: updatedService.createdAt.toISOString(),
        updatedAt: updatedService.updatedAt.toISOString(),
      },
      message: 'Service updated successfully'
    });
  } catch (error) {
    console.error('Error updating service:', error);
    return NextResponse.json({ error: 'Failed to update service' }, { status: 500 });
  }
}

export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Service ID required' }, { status: 400 });
    }

    await prisma.servicePricing.delete({
      where: { id },
    });

    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
