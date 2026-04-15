import { NextResponse } from 'next/server';
import { getCurrentUser } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

export const dynamic = 'force-dynamic';

/**
 * One-shot idempotent migration endpoint.
 * Creates missing tables/columns on the production DB without requiring
 * direct psql access. Safe to run multiple times (uses IF NOT EXISTS).
 *
 * Run manually: POST /api/admin/migrate (admin auth required)
 */
export async function POST() {
  const user = await getCurrentUser();
  if (!user || user.role !== 'admin') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 403 });
  }

  const log: string[] = [];

  try {
    // 1) ProductStatus enum
    await prisma.$executeRawUnsafe(`
      DO $$ BEGIN
        CREATE TYPE "ProductStatus" AS ENUM ('LIVE', 'BETA', 'DEVELOPMENT', 'ARCHIVED');
      EXCEPTION
        WHEN duplicate_object THEN null;
      END $$;
    `);
    log.push('✓ ProductStatus enum ready');

    // 2) Product table
    await prisma.$executeRawUnsafe(`
      CREATE TABLE IF NOT EXISTS "Product" (
        "id" TEXT NOT NULL PRIMARY KEY,
        "slug" TEXT NOT NULL UNIQUE,
        "name" TEXT NOT NULL,
        "taglineRo" TEXT NOT NULL,
        "taglineEn" TEXT NOT NULL,
        "taglineIt" TEXT NOT NULL,
        "problemRo" TEXT NOT NULL,
        "problemEn" TEXT NOT NULL,
        "problemIt" TEXT NOT NULL,
        "descriptionRo" TEXT NOT NULL,
        "descriptionEn" TEXT NOT NULL,
        "descriptionIt" TEXT NOT NULL,
        "featuresRo" TEXT NOT NULL DEFAULT '[]',
        "featuresEn" TEXT NOT NULL DEFAULT '[]',
        "featuresIt" TEXT NOT NULL DEFAULT '[]',
        "techStack" TEXT NOT NULL DEFAULT '[]',
        "imageUrl" TEXT,
        "logoUrl" TEXT,
        "demoUrl" TEXT,
        "caseStudyUrl" TEXT,
        "usersCount" TEXT,
        "automationSaved" TEXT,
        "status" "ProductStatus" NOT NULL DEFAULT 'LIVE',
        "category" TEXT NOT NULL,
        "metaTitleRo" TEXT,
        "metaTitleEn" TEXT,
        "metaTitleIt" TEXT,
        "metaDescRo" TEXT,
        "metaDescEn" TEXT,
        "metaDescIt" TEXT,
        "featured" BOOLEAN NOT NULL DEFAULT false,
        "order" INTEGER NOT NULL DEFAULT 0,
        "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
        "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP
      );
    `);
    log.push('✓ Product table ready');

    // 3) Product indexes
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Product_status_idx" ON "Product"("status");`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Product_featured_idx" ON "Product"("featured");`);
    await prisma.$executeRawUnsafe(`CREATE INDEX IF NOT EXISTS "Product_category_idx" ON "Product"("category");`);
    log.push('✓ Product indexes ready');

    // 4) SiteSettings SMTP columns (if missing)
    await prisma.$executeRawUnsafe(`ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "smtpHost" TEXT NOT NULL DEFAULT '';`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "smtpPort" TEXT NOT NULL DEFAULT '465';`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "smtpUser" TEXT NOT NULL DEFAULT '';`);
    await prisma.$executeRawUnsafe(`ALTER TABLE "SiteSettings" ADD COLUMN IF NOT EXISTS "smtpPassword" TEXT NOT NULL DEFAULT '';`);
    log.push('✓ SiteSettings SMTP columns ready');

    return NextResponse.json({
      success: true,
      message: 'Migration completed successfully',
      log,
    });
  } catch (error) {
    console.error('Migration error:', error);
    const message = error instanceof Error ? error.message : 'Unknown error';
    return NextResponse.json(
      {
        success: false,
        error: message,
        log,
      },
      { status: 500 }
    );
  }
}
