import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { getServicePricing } from '@/lib/tier';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Get all active service pricing
    const services = await getServicePricing();

    return NextResponse.json({ services });
  } catch (error) {
    console.error('Services API error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
