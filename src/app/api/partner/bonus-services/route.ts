import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { getPartnerBonusServices, consumeBonusService } from '@/lib/tier';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get user and partner
    const user = await prisma.user.findUnique({
      where: { email: currentUser.email },
      include: { partner: true },
    });

    if (!user?.partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    const bonusServices = await getPartnerBonusServices(user.partner.id);

    return NextResponse.json({ bonusServices });
  } catch (error) {
    console.error('Bonus services API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const { bonusServiceId } = body;

    if (!bonusServiceId) {
      return NextResponse.json(
        { error: 'Bonus service ID is required' },
        { status: 400 }
      );
    }

    // Verify partner owns this bonus service
    const user = await prisma.user.findUnique({
      where: { email: currentUser.email },
      include: { partner: true },
    });

    if (!user?.partner) {
      return NextResponse.json({ error: 'Partner not found' }, { status: 404 });
    }

    const bonusService = await prisma.bonusService.findUnique({
      where: { id: bonusServiceId },
    });

    if (!bonusService) {
      return NextResponse.json(
        { error: 'Bonus service not found' },
        { status: 404 }
      );
    }

    if (bonusService.partnerId !== user.partner.id) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    if (bonusService.status !== 'AVAILABLE') {
      return NextResponse.json(
        { error: 'Bonus service is not available' },
        { status: 400 }
      );
    }

    // Mark as used
    await consumeBonusService(bonusServiceId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Use bonus service API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
