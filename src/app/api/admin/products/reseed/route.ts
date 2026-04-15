import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { reseedProducts } from '@/lib/data';

export const dynamic = 'force-dynamic';

export async function POST() {
  try {
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const count = await reseedProducts();
    return NextResponse.json({
      message: `Successfully seeded ${count} default projects`,
      count,
    });
  } catch (error) {
    console.error('Error reseeding products:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      { error: `Failed to reseed products: ${message}` },
      { status: 500 }
    );
  }
}
