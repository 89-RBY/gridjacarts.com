import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

export const dynamic = 'force-dynamic';

// Save or update cookie consent
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const {
      sessionId,
      necessary = true,
      analytics = false,
      marketing = false,
      preferences = false,
      locale = 'en',
    } = body;

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    // Get user if logged in
    const user = await getCurrentUser();
    const userId = user?.id;

    // Get IP and User Agent
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
    const userAgent = request.headers.get('user-agent') || 'unknown';

    // Consent expires in 1 year
    const expiresAt = new Date();
    expiresAt.setFullYear(expiresAt.getFullYear() + 1);

    // Check if consent already exists for this session
    const existingConsent = await prisma.cookieConsent.findFirst({
      where: { sessionId },
      orderBy: { consentDate: 'desc' },
    });

    let consent;
    if (existingConsent) {
      // Update existing consent
      consent = await prisma.cookieConsent.update({
        where: { id: existingConsent.id },
        data: {
          userId,
          necessary,
          analytics,
          marketing,
          preferences,
          locale,
          ipAddress,
          userAgent,
          expiresAt,
        },
      });
    } else {
      // Create new consent
      consent = await prisma.cookieConsent.create({
        data: {
          sessionId,
          userId,
          necessary,
          analytics,
          marketing,
          preferences,
          locale,
          ipAddress,
          userAgent,
          expiresAt,
          consentVersion: '1.0',
        },
      });
    }

    return NextResponse.json({
      success: true,
      consent,
      message: 'Consent saved successfully'
    });
  } catch (error) {
    console.error('Error saving cookie consent:', error);
    return NextResponse.json(
      { error: 'Failed to save consent' },
      { status: 500 }
    );
  }
}

// Get cookie consent for a session
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const sessionId = searchParams.get('sessionId');

    if (!sessionId) {
      return NextResponse.json({ error: 'Session ID required' }, { status: 400 });
    }

    const consent = await prisma.cookieConsent.findFirst({
      where: { sessionId },
      orderBy: { consentDate: 'desc' },
    });

    if (!consent) {
      return NextResponse.json({ consent: null });
    }

    // Check if consent is expired
    const isExpired = new Date() > new Date(consent.expiresAt);

    return NextResponse.json({
      consent: isExpired ? null : consent,
      isExpired
    });
  } catch (error) {
    console.error('Error fetching cookie consent:', error);
    return NextResponse.json(
      { error: 'Failed to fetch consent' },
      { status: 500 }
    );
  }
}
