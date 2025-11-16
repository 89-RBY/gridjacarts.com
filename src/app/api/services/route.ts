import { NextRequest, NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getServices, saveServices, calculatePartnerPricing, getPartnerByUserId } from '@/lib/data';
import { Service } from '@/types';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const services = await getServices();

    // If partner, return pricing with their custom markup
    if (user.role === 'partner') {
      const partner = await getPartnerByUserId(user.id);
      const markup = partner?.markup || 20;
      const pricing = calculatePartnerPricing(services, markup);
      return NextResponse.json({ pricing, markup });
    }

    // If admin, return base services
    return NextResponse.json({ services });
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

    const { name, basePrice, description } = await request.json();

    if (!name || basePrice === undefined || !description) {
      return NextResponse.json({ error: 'All fields are required' }, { status: 400 });
    }

    const services = await getServices();

    const newService: Service = {
      id: Date.now().toString(),
      name,
      basePrice: Number(basePrice),
      description,
    };

    services.push(newService);
    await saveServices(services);

    return NextResponse.json({ service: newService, message: 'Service created successfully' });
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

    const { id, name, basePrice, description } = await request.json();

    if (!id) {
      return NextResponse.json({ error: 'Service ID required' }, { status: 400 });
    }

    const services = await getServices();
    const index = services.findIndex((s) => s.id === id);

    if (index === -1) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    if (name) services[index].name = name;
    if (basePrice !== undefined) services[index].basePrice = Number(basePrice);
    if (description) services[index].description = description;

    await saveServices(services);

    return NextResponse.json({ service: services[index], message: 'Service updated successfully' });
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

    const services = await getServices();
    const filteredServices = services.filter((s) => s.id !== id);

    if (services.length === filteredServices.length) {
      return NextResponse.json({ error: 'Service not found' }, { status: 404 });
    }

    await saveServices(filteredServices);

    return NextResponse.json({ message: 'Service deleted successfully' });
  } catch (error) {
    console.error('Error deleting service:', error);
    return NextResponse.json({ error: 'Failed to delete service' }, { status: 500 });
  }
}
