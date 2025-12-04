import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Creating CookieConsent table...');

  try {
    // Execute raw SQL to create the table
    await prisma.$executeRawUnsafe(`
      -- CreateTable: CookieConsent for GDPR compliance
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

    console.log('✓ CookieConsent table created successfully');

    // Create indexes
    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "CookieConsent_sessionId_idx" ON "CookieConsent"("sessionId");
    `);
    console.log('✓ Index on sessionId created');

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "CookieConsent_userId_idx" ON "CookieConsent"("userId");
    `);
    console.log('✓ Index on userId created');

    await prisma.$executeRawUnsafe(`
      CREATE INDEX IF NOT EXISTS "CookieConsent_consentDate_idx" ON "CookieConsent"("consentDate");
    `);
    console.log('✓ Index on consentDate created');

    console.log('\n✅ Migration completed successfully!');
  } catch (error) {
    console.error('❌ Error creating table:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
