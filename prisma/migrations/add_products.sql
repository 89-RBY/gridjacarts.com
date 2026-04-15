-- Add Product model and ProductStatus enum

-- Create ProductStatus enum
CREATE TYPE "ProductStatus" AS ENUM ('LIVE', 'BETA', 'DEVELOPMENT', 'ARCHIVED');

-- Create Product table
CREATE TABLE "Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "slug" TEXT NOT NULL UNIQUE,
    "name" TEXT NOT NULL,

    -- Taglines (multilingual)
    "taglineRo" TEXT NOT NULL,
    "taglineEn" TEXT NOT NULL,
    "taglineIt" TEXT NOT NULL,

    -- Problem (multilingual)
    "problemRo" TEXT NOT NULL,
    "problemEn" TEXT NOT NULL,
    "problemIt" TEXT NOT NULL,

    -- Descriptions (multilingual)
    "descriptionRo" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "descriptionIt" TEXT NOT NULL,

    -- Features (JSON arrays, multilingual)
    "featuresRo" TEXT NOT NULL DEFAULT '[]',
    "featuresEn" TEXT NOT NULL DEFAULT '[]',
    "featuresIt" TEXT NOT NULL DEFAULT '[]',

    -- Tech stack (JSON array)
    "techStack" TEXT NOT NULL DEFAULT '[]',

    -- Media & links
    "imageUrl" TEXT,
    "logoUrl" TEXT,
    "demoUrl" TEXT,
    "caseStudyUrl" TEXT,

    -- Metrics
    "usersCount" TEXT,
    "automationSaved" TEXT,

    -- Status & category
    "status" "ProductStatus" NOT NULL DEFAULT 'LIVE',
    "category" TEXT NOT NULL,

    -- SEO (multilingual)
    "metaTitleRo" TEXT,
    "metaTitleEn" TEXT,
    "metaTitleIt" TEXT,
    "metaDescRo" TEXT,
    "metaDescEn" TEXT,
    "metaDescIt" TEXT,

    -- Display
    "featured" BOOLEAN NOT NULL DEFAULT false,
    "order" INTEGER NOT NULL DEFAULT 0,

    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- Create indexes
CREATE INDEX "Product_status_idx" ON "Product"("status");
CREATE INDEX "Product_featured_idx" ON "Product"("featured");
CREATE INDEX "Product_category_idx" ON "Product"("category");
