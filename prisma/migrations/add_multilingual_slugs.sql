-- Add multilingual slug columns to BlogPost table
ALTER TABLE "BlogPost"
ADD COLUMN IF NOT EXISTS "slugRo" TEXT,
ADD COLUMN IF NOT EXISTS "slugEn" TEXT,
ADD COLUMN IF NOT EXISTS "slugIt" TEXT;

-- Copy existing slug to all language versions temporarily
UPDATE "BlogPost" SET "slugRo" = slug WHERE "slugRo" IS NULL;
UPDATE "BlogPost" SET "slugEn" = slug WHERE "slugEn" IS NULL;
UPDATE "BlogPost" SET "slugIt" = slug WHERE "slugIt" IS NULL;

-- Add unique constraints
CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_slugRo_key" ON "BlogPost"("slugRo");
CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_slugEn_key" ON "BlogPost"("slugEn");
CREATE UNIQUE INDEX IF NOT EXISTS "BlogPost_slugIt_key" ON "BlogPost"("slugIt");

-- Make columns NOT NULL after data is populated
ALTER TABLE "BlogPost" ALTER COLUMN "slugRo" SET NOT NULL;
ALTER TABLE "BlogPost" ALTER COLUMN "slugEn" SET NOT NULL;
ALTER TABLE "BlogPost" ALTER COLUMN "slugIt" SET NOT NULL;
