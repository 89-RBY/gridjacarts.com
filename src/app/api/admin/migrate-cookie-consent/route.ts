import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { getCurrentUser } from '@/lib/auth';

// Temporary endpoint to run the cookie consent table migration
export async function POST(request: NextRequest) {
  try {
    // Security: Only allow admin users to run migrations
    const user = await getCurrentUser();
    if (!user || user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
    }

    console.log('[Migration] Creating CookieConsent table...');

    // Create the table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "CookieConsent" (
          "id" TEXT NOT NULL,
          "userId" TEXT,
          "sessionId" TEXT NOT NULL,
          "ipAddress" TEXT,
          "userAgent" TEXT,
          "necessary" BOOLEAN NOT NULL DEFAULT true,
          "analytics" BOOLEAN NOT NULL DEFAULT false,
          "marketing" BOOLEAN NOT NULL DEFAULT false,
          "preferences" BOOLEAN NOT NULL DEFAULT false,
          "consentVersion" TEXT NOT NULL DEFAULT '1.0',
          "locale" TEXT NOT NULL DEFAULT 'en',
          "consentDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
          "lastUpdated" TIMESTAMP(3) NOT NULL,
          "expiresAt" TIMESTAMP(3) NOT NULL,

          CONSTRAINT "CookieConsent_pkey" PRIMARY KEY ("id")
      );
    `);

    console.log('[Migration] ✓ CookieConsent table created');

    // Create indexes
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "CookieConsent_sessionId_idx" ON "CookieConsent"("sessionId");
    `);
    console.log('[Migration] ✓ Index on sessionId created');

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "CookieConsent_userId_idx" ON "CookieConsent"("userId");
    `);
    console.log('[Migration] ✓ Index on userId created');

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "CookieConsent_consentDate_idx" ON "CookieConsent"("consentDate");
    `);
    console.log('[Migration] ✓ Index on consentDate created');

    return NextResponse.json({
      success: true,
      message: 'CookieConsent table created successfully with all indexes',
    });
  } catch (error: any) {
    console.error('[Migration] Error:', error);

    // If table already exists, return success
    if (error.message?.includes('already exists')) {
      return NextResponse.json({
        success: true,
        message: 'CookieConsent table already exists',
      });
    }

    return NextResponse.json(
      {
        error: 'Migration failed',
        details: error.message
      },
      { status: 500 }
    );
  }
}
