#!/bin/bash

# Script per aggiornare il database di produzione con la tabella Contract

echo "🔍 Checking database connection..."

# Check if we can connect to the database
if ! command -v psql &> /dev/null; then
    echo "❌ psql not found. Using Prisma db push instead..."
    npx prisma db push --accept-data-loss
    exit $?
fi

echo "📊 Checking if Contract table exists..."

# Check if Contract table exists
TABLE_EXISTS=$(psql $DATABASE_URL -tAc "SELECT EXISTS (SELECT FROM information_schema.tables WHERE table_schema = 'public' AND table_name = 'Contract');")

if [ "$TABLE_EXISTS" = "t" ]; then
    echo "✅ Contract table already exists"
    echo "📋 Current structure:"
    psql $DATABASE_URL -c "SELECT column_name, data_type FROM information_schema.columns WHERE table_schema = 'public' AND table_name = 'Contract' ORDER BY ordinal_position;"
else
    echo "📝 Creating Contract table..."

    # Execute migration
    psql $DATABASE_URL << 'EOSQL'
-- Create ContractStatus enum if not exists
DO $$ BEGIN
    CREATE TYPE "ContractStatus" AS ENUM ('PENDING', 'SIGNED', 'EXPIRED', 'REJECTED', 'ARCHIVED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- Create Contract table
CREATE TABLE IF NOT EXISTS "Contract" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "partnerId" TEXT NOT NULL,
    "orderId" TEXT,
    "contractNumber" TEXT NOT NULL UNIQUE,
    "contractType" TEXT NOT NULL,
    "fileName" TEXT NOT NULL,
    "fileUrl" TEXT NOT NULL,
    "fileSize" INTEGER NOT NULL,
    "mimeType" TEXT NOT NULL,
    "status" "ContractStatus" NOT NULL DEFAULT 'PENDING',
    "signedAt" TIMESTAMP(3),
    "expiresAt" TIMESTAMP(3),
    "notes" TEXT NOT NULL DEFAULT '',
    "uploadedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Contract_partnerId_fkey" FOREIGN KEY ("partnerId") REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- Create indexes
CREATE INDEX IF NOT EXISTS "Contract_partnerId_idx" ON "Contract"("partnerId");
CREATE INDEX IF NOT EXISTS "Contract_status_idx" ON "Contract"("status");
CREATE INDEX IF NOT EXISTS "Contract_contractNumber_idx" ON "Contract"("contractNumber");
EOSQL

    if [ $? -eq 0 ]; then
        echo "✅ Contract table created successfully"
    else
        echo "❌ Error creating Contract table"
        exit 1
    fi
fi

echo ""
echo "🎉 Database update completed!"
echo ""
echo "Next steps:"
echo "1. Regenerate Prisma Client: npx prisma generate"
echo "2. Restart your application"
