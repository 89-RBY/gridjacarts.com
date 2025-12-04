import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// Get all cookie consents (admin only)
export async function GET(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const export_format = searchParams.get('export');
    const userId = searchParams.get('userId');
    const sessionId = searchParams.get('sessionId');

    // Build query
    const where: any = {};
    if (userId) where.userId = userId;
    if (sessionId) where.sessionId = sessionId;

    const consents = await prisma.cookieConsent.findMany({
      where,
      orderBy: { consentDate: 'desc' },
      take: export_format ? undefined : 100, // Limit to 100 unless exporting
    });

    // Export as CSV if requested
    if (export_format === 'csv') {
      const csv = generateCSV(consents);
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="cookie-consents-${new Date().toISOString()}.csv"`,
        },
      });
    }

    // Return JSON with stats
    const stats = {
      total: consents.length,
      analytics: consents.filter(c => c.analytics).length,
      marketing: consents.filter(c => c.marketing).length,
      preferences: consents.filter(c => c.preferences).length,
      byLocale: consents.reduce((acc: any, c) => {
        acc[c.locale] = (acc[c.locale] || 0) + 1;
        return acc;
      }, {}),
    };

    return NextResponse.json({
      consents,
      stats,
      total: consents.length,
    });
  } catch (error) {
    console.error('Error fetching cookie consents:', error);
    return NextResponse.json(
      { error: 'Failed to fetch consents' },
      { status: 500 }
    );
  }
}

// Delete a specific consent (admin only)
export async function DELETE(request: NextRequest) {
  try {
    const user = await getCurrentUser();

    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (!id) {
      return NextResponse.json({ error: 'Consent ID required' }, { status: 400 });
    }

    await prisma.cookieConsent.delete({
      where: { id },
    });

    return NextResponse.json({
      success: true,
      message: 'Consent deleted successfully',
    });
  } catch (error) {
    console.error('Error deleting cookie consent:', error);
    return NextResponse.json(
      { error: 'Failed to delete consent' },
      { status: 500 }
    );
  }
}

function generateCSV(consents: any[]): string {
  const headers = [
    'ID',
    'Session ID',
    'User ID',
    'IP Address',
    'Necessary',
    'Analytics',
    'Marketing',
    'Preferences',
    'Locale',
    'Consent Date',
    'Expires At',
    'Version',
  ];

  const rows = consents.map(c => [
    c.id,
    c.sessionId,
    c.userId || 'Anonymous',
    c.ipAddress || 'N/A',
    c.necessary ? 'Yes' : 'No',
    c.analytics ? 'Yes' : 'No',
    c.marketing ? 'Yes' : 'No',
    c.preferences ? 'Yes' : 'No',
    c.locale,
    new Date(c.consentDate).toISOString(),
    new Date(c.expiresAt).toISOString(),
    c.consentVersion,
  ]);

  return [headers.join(','), ...rows.map(row => row.join(','))].join('\n');
}
