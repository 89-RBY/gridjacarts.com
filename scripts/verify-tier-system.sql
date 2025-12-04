-- Verification Script for Tier System Migration
-- Run this after executing the migration to verify everything is set up correctly

-- 1. Check if ServicePricing table exists and has data
SELECT 'ServicePricing Table' as check_name, COUNT(*) as count FROM "ServicePricing";

-- 2. Check services by category
SELECT 'Services by Category' as check_name;
SELECT "category", COUNT(*) as count
FROM "ServicePricing"
GROUP BY "category"
ORDER BY "category";

-- 3. Show sample pricing (first 5 services)
SELECT 'Sample Services' as check_name;
SELECT "serviceType", "serviceName", "priceRo", "priceIt", "priceEn", "isActive"
FROM "ServicePricing"
ORDER BY "category", "serviceType"
LIMIT 5;

-- 4. Check if BonusService table exists
SELECT 'BonusService Table' as check_name, COUNT(*) as count FROM "BonusService";

-- 5. Check if Order table exists
SELECT 'Order Table' as check_name, COUNT(*) as count FROM "Order";

-- 6. Check Partner table for tier fields
SELECT 'Partners with Tiers' as check_name;
SELECT "companyName", "currentTier", "annualRevenue", "fiscalYearStart"
FROM "Partner"
LIMIT 5;

-- 7. Verify ENUM types exist
SELECT 'TierLevel Enum Values' as check_name;
SELECT enumlabel FROM pg_enum WHERE enumtypid = 'TierLevel'::regtype ORDER BY enumlabel;

SELECT 'BonusStatus Enum Values' as check_name;
SELECT enumlabel FROM pg_enum WHERE enumtypid = 'BonusStatus'::regtype ORDER BY enumlabel;

SELECT 'OrderStatus Enum Values' as check_name;
SELECT enumlabel FROM pg_enum WHERE enumtypid = 'OrderStatus'::regtype ORDER BY enumlabel;

-- 8. Summary
SELECT
  'Migration Summary' as info,
  (SELECT COUNT(*) FROM "ServicePricing") as total_services,
  (SELECT COUNT(*) FROM "Partner") as total_partners,
  (SELECT COUNT(*) FROM "BonusService") as total_bonus_services,
  (SELECT COUNT(*) FROM "Order") as total_orders;
