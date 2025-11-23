import { NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getPartnerOrders, createOrder } from '@/lib/tier';

export async function GET(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user and partner
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { partner: true },
    });

    if (!user?.partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    // Parse query parameters
    const { searchParams } = new URL(request.url);
    const status = searchParams.get('status') as 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED' | null;
    const skip = parseInt(searchParams.get('skip') || '0');
    const take = parseInt(searchParams.get('take') || '20');

    const orders = await getPartnerOrders(user.partner.id, {
      skip,
      take,
      ...(status && { status }),
    });

    return NextResponse.json({ orders });
  } catch (error) {
    console.error('Orders GET API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session?.user?.email) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user and partner
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
      include: { partner: true },
    });

    if (!user?.partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    const body = await request.json();
    const { serviceType, clientName, clientEmail, locale, notes } = body;

    // Validate required fields
    if (!serviceType || !clientName || !clientEmail || !locale) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create order
    const order = await createOrder({
      partnerId: user.partner.id,
      serviceType,
      clientName,
      clientEmail,
      locale: locale as 'ro' | 'it' | 'en',
      notes: notes || '',
    });

    return NextResponse.json({ order }, { status: 201 });
  } catch (error: any) {
    console.error('Orders POST API error:', error);
    return NextResponse.json(
      { error: error.message || 'Internal server error' },
      { status: 500 }
    );
  }
}
