import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getServices, calculatePartnerPricing } from '@/lib/data';

export async function GET() {
  try {
    const user = await getCurrentUser();

    if (!user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const services = await getServices();

    // If partner, return pricing with markup
    if (user.role === 'partner') {
      const pricing = calculatePartnerPricing(services, 20); // 20% default markup
      return NextResponse.json({ pricing });
    }

    // If admin, return base services
    return NextResponse.json({ services });
  } catch (error) {
    console.error('Error fetching services:', error);
    return NextResponse.json({ error: 'Failed to fetch services' }, { status: 500 });
  }
}
