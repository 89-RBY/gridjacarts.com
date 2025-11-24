/**
 * Migration Script: Update Contract URLs to use Volume Storage
 *
 * This script updates existing contract records in the database to use
 * the new API endpoint for serving files from the external volume.
 *
 * Usage:
 *   npx tsx scripts/migrate-contract-urls.ts
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function migrateContractUrls() {
  console.log('🔄 Starting contract URL migration...\n');

  try {
    // Find all contracts with old URL format
    const contracts = await prisma.contract.findMany({
      where: {
        fileUrl: {
          startsWith: '/uploads/contracts/',
        },
      },
    });

    console.log(`📋 Found ${contracts.length} contracts to migrate\n`);

    if (contracts.length === 0) {
      console.log('✅ No contracts need migration. All done!');
      return;
    }

    let successCount = 0;
    let errorCount = 0;

    for (const contract of contracts) {
      try {
        // Extract filename from old URL
        const oldUrl = contract.fileUrl;
        const filename = oldUrl.replace('/uploads/contracts/', '');

        // Generate new URL pointing to API endpoint
        const newUrl = `/api/contracts/files/${filename}`;

        // Update contract
        await prisma.contract.update({
          where: { id: contract.id },
          data: { fileUrl: newUrl },
        });

        console.log(`✅ Migrated: ${contract.contractNumber}`);
        console.log(`   Old: ${oldUrl}`);
        console.log(`   New: ${newUrl}\n`);

        successCount++;
      } catch (error) {
        console.error(`❌ Error migrating ${contract.contractNumber}:`, error);
        errorCount++;
      }
    }

    console.log('\n📊 Migration Summary:');
    console.log(`   ✅ Success: ${successCount}`);
    console.log(`   ❌ Errors: ${errorCount}`);
    console.log(`   📋 Total: ${contracts.length}`);

    if (errorCount === 0) {
      console.log('\n🎉 Migration completed successfully!');
    } else {
      console.log('\n⚠️  Migration completed with errors. Please review the logs above.');
    }
  } catch (error) {
    console.error('❌ Migration failed:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

// Run migration
migrateContractUrls();
