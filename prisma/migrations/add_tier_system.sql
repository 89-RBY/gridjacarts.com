-- Migration: Add Tier System to Partner Model
-- This migration adds tier system fields to the Partner table

-- Step 1: Create ENUM types
CREATE TYPE "TierLevel" AS ENUM ('BRONZE', 'SILVER', 'GOLD', 'PLATINUM');
CREATE TYPE "BonusStatus" AS ENUM ('AVAILABLE', 'USED', 'EXPIRED');
CREATE TYPE "OrderStatus" AS ENUM ('PENDING', 'IN_PROGRESS', 'COMPLETED', 'CANCELLED');

-- Step 2: Add tier system columns to Partner table
ALTER TABLE "Partner"
ADD COLUMN IF NOT EXISTS "currentTier" "TierLevel" DEFAULT 'BRONZE',
ADD COLUMN IF NOT EXISTS "annualRevenue" DOUBLE PRECISION DEFAULT 0,
ADD COLUMN IF NOT EXISTS "fiscalYearStart" TIMESTAMP(3) DEFAULT NOW(),
ADD COLUMN IF NOT EXISTS "lastTierUpdate" TIMESTAMP(3) DEFAULT NOW();

-- Step 3: Make markup nullable (for backward compatibility)
ALTER TABLE "Partner" ALTER COLUMN "markup" DROP NOT NULL;

-- Step 4: Create BonusService table
CREATE TABLE IF NOT EXISTS "BonusService" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "partnerId" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'ro',
    "status" "BonusStatus" NOT NULL DEFAULT 'AVAILABLE',
    "assignedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "usedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "BonusService_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Step 5: Create ServicePricing table
CREATE TABLE IF NOT EXISTS "ServicePricing" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "serviceType" TEXT NOT NULL UNIQUE,
    "serviceName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "priceRo" DOUBLE PRECISION NOT NULL,
    "priceIt" DOUBLE PRECISION NOT NULL,
    "priceEn" DOUBLE PRECISION NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "isRecurring" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Step 6: Create Order table
CREATE TABLE IF NOT EXISTS "Order" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "partnerId" TEXT NOT NULL,
    "serviceType" TEXT NOT NULL,
    "serviceName" TEXT NOT NULL,
    "clientName" TEXT NOT NULL,
    "clientEmail" TEXT NOT NULL,
    "amount" DOUBLE PRECISION NOT NULL,
    "partnerCost" DOUBLE PRECISION NOT NULL,
    "discount" DOUBLE PRECISION NOT NULL,
    "locale" TEXT NOT NULL DEFAULT 'ro',
    "status" "OrderStatus" NOT NULL DEFAULT 'PENDING',
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "completedAt" TIMESTAMP(3),
    "cancelledAt" TIMESTAMP(3),
    "notes" TEXT NOT NULL DEFAULT '',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Step 7: Create indexes for better performance
CREATE INDEX IF NOT EXISTS "BonusService_partnerId_idx" ON "BonusService"("partnerId");
CREATE INDEX IF NOT EXISTS "BonusService_status_idx" ON "BonusService"("status");

CREATE INDEX IF NOT EXISTS "ServicePricing_category_idx" ON "ServicePricing"("category");
CREATE INDEX IF NOT EXISTS "ServicePricing_isActive_idx" ON "ServicePricing"("isActive");

CREATE INDEX IF NOT EXISTS "Order_partnerId_idx" ON "Order"("partnerId");
CREATE INDEX IF NOT EXISTS "Order_status_idx" ON "Order"("status");
CREATE INDEX IF NOT EXISTS "Order_orderDate_idx" ON "Order"("orderDate");

-- Step 8: Set fiscalYearStart to beginning of current year for existing partners
UPDATE "Partner"
SET "fiscalYearStart" = DATE_TRUNC('year', CURRENT_DATE)
WHERE "fiscalYearStart" IS NULL OR "fiscalYearStart" = NOW();
