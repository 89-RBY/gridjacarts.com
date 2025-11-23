# Guida Migrazione Database - Sistema Tier

Questa guida ti spiega come eseguire la migrazione del database per implementare il nuovo sistema tier per i partner.

## 📋 Prerequisiti

- Accesso al database PostgreSQL su Railway
- Connessione via CLI o interfaccia web Railway

---

## 🔧 PASSO 1: Esegui la Migrazione Tier System

Questo script aggiunge le tabelle e i campi necessari per il tier system.

**File**: `prisma/migrations/add_tier_system.sql`

### Opzione A: Via Railway Dashboard

1. Vai su **railway.app**
2. Apri il progetto **gridjacarts.com**
3. Clicca sul servizio **PostgreSQL**
4. Vai alla tab **"Query"**
5. Copia e incolla tutto il contenuto del file `prisma/migrations/add_tier_system.sql`
6. Premi **Execute**

### Opzione B: Via psql CLI

```bash
# Connettiti al database
psql $DATABASE_URL

# Esegui il file di migrazione
\i prisma/migrations/add_tier_system.sql

# Oppure direttamente:
psql $DATABASE_URL -f prisma/migrations/add_tier_system.sql
```

### ✅ Verifica

Dopo l'esecuzione, verifica che le tabelle siano state create:

```sql
-- Lista tutte le tabelle
\dt

-- Dovresti vedere: BonusService, ServicePricing, Order

-- Verifica le nuove colonne di Partner
\d "Partner"

-- Dovresti vedere: currentTier, annualRevenue, fiscalYearStart
```

---

## 📦 PASSO 2: Popola ServicePricing con i Prezzi Iniziali

Questo script inserisce i prezzi fissi per tutti i servizi in RO/IT/EN.

**File**: `scripts/seed-service-pricing.sql`

### Esegui il seed:

**Railway Dashboard:**
1. Nella stessa interfaccia Query
2. Copia e incolla tutto il contenuto di `scripts/seed-service-pricing.sql`
3. Premi Execute

**CLI:**
```bash
psql $DATABASE_URL -f scripts/seed-service-pricing.sql
```

### ✅ Verifica

```sql
-- Conta i servizi inseriti (dovresti avere ~18 servizi)
SELECT COUNT(*) as total_services FROM "ServicePricing";

-- Vedi i servizi per categoria
SELECT "category", COUNT(*) as count
FROM "ServicePricing"
GROUP BY "category"
ORDER BY "category";

-- Mostra alcuni servizi
SELECT "serviceType", "serviceName", "priceRo", "priceIt", "priceEn"
FROM "ServicePricing"
LIMIT 5;
```

**Output atteso:**
```
 category     | count
--------------+-------
 advertising  |     2
 branding     |     3
 ecommerce    |     2
 seo          |     5
 social-media |     3
 web-design   |     4
```

---

## 🔄 PASSO 3: Aggiorna Partner Esistenti (se ci sono)

Se hai già dei partner nel database, devi inizializzare i loro campi tier:

```sql
-- Imposta tutti i partner esistenti a BRONZE con anno fiscale corrente
UPDATE "Partner"
SET
  "currentTier" = 'BRONZE',
  "annualRevenue" = 0,
  "fiscalYearStart" = DATE_TRUNC('year', CURRENT_DATE)
WHERE "currentTier" IS NULL;

-- Verifica
SELECT
  "companyName",
  "currentTier",
  "annualRevenue",
  "fiscalYearStart"
FROM "Partner";
```

---

## 🎯 PASSO 4: Rigenera Prisma Client

Dopo aver eseguito le migrazioni SQL, devi rigenerare il client Prisma nel codice:

```bash
# Nella directory del progetto
npm run prisma generate

# Oppure
npx prisma generate
```

---

## 📊 PASSO 5: Test del Sistema

### Test 1: Verifica Tier Configs

```sql
-- Verifica che tutti gli enum siano stati creati
SELECT enumlabel FROM pg_enum WHERE enumtypid = 'TierLevel'::regtype;

-- Output atteso:
-- BRONZE
-- SILVER
-- GOLD
-- PLATINUM
```

### Test 2: Crea un Ordine Test (opzionale)

```sql
-- Trova l'ID di un partner
SELECT id, "companyName" FROM "Partner" LIMIT 1;

-- Crea un ordine test (sostituisci [PARTNER_ID] con l'ID trovato)
INSERT INTO "Order" (
  id, "partnerId", "serviceType", "serviceName",
  "clientName", "clientEmail", amount, "partnerCost",
  discount, locale, status, "createdAt", "updatedAt"
)
VALUES (
  'test_order_1',
  '[PARTNER_ID]',
  'web-design-basic',
  'Web Design Basic',
  'Test Client',
  'test@example.com',
  1500,
  1275,  -- 15% sconto BRONZE
  15,
  'it',
  'PENDING',
  NOW(),
  NOW()
);

-- Verifica
SELECT * FROM "Order" WHERE id = 'test_order_1';
```

### Test 3: Crea un Bonus Service Test (opzionale)

```sql
-- Crea un bonus service test
INSERT INTO "BonusService" (
  id, "partnerId", "serviceName", "serviceType",
  value, locale, status, "expiresAt",
  "createdAt", "updatedAt"
)
VALUES (
  'test_bonus_1',
  '[PARTNER_ID]',
  'Logo Design',
  'logo-design',
  500,
  'it',
  'AVAILABLE',
  DATE_TRUNC('year', CURRENT_DATE) + INTERVAL '1 year' - INTERVAL '1 day',
  NOW(),
  NOW()
);

-- Verifica
SELECT * FROM "BonusService" WHERE id = 'test_bonus_1';
```

---

## 🚨 Troubleshooting

### Errore: "type TierLevel already exists"
```sql
-- Elimina gli enum esistenti (ATTENZIONE: solo se la migrazione è fallita)
DROP TYPE IF EXISTS "TierLevel" CASCADE;
DROP TYPE IF EXISTS "BonusStatus" CASCADE;
DROP TYPE IF EXISTS "OrderStatus" CASCADE;

-- Poi riesegui la migrazione
```

### Errore: "relation already exists"
```sql
-- Verifica quali tabelle esistono
\dt

-- Se BonusService/ServicePricing/Order esistono già, puoi saltare il PASSO 1
```

### Verifica Integrità Database
```sql
-- Conta record in tutte le tabelle tier
SELECT 'BonusService' as table_name, COUNT(*) FROM "BonusService"
UNION ALL
SELECT 'ServicePricing', COUNT(*) FROM "ServicePricing"
UNION ALL
SELECT 'Order', COUNT(*) FROM "Order";
```

---

## ✅ Checklist Finale

- [ ] Migrazione tier system eseguita (`add_tier_system.sql`)
- [ ] ServicePricing popolato con ~18 servizi (`seed-service-pricing.sql`)
- [ ] Partner esistenti aggiornati con tier BRONZE
- [ ] Prisma Client rigenerato (`npx prisma generate`)
- [ ] Test di creazione ordine eseguito con successo
- [ ] Verifica che tutti gli enum siano presenti
- [ ] Build del progetto funziona: `npm run build`

---

## 📝 Note Importanti

1. **Backup**: Railway fa backup automatici, ma puoi fare un backup manuale prima della migrazione
2. **Rollback**: Se qualcosa va storto, puoi fare rollback all'ultima versione dal Railway dashboard
3. **Production**: Queste migrazioni sono sicure per production (usano `IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`, `ON CONFLICT`)
4. **Performance**: Gli indici sono stati creati per ottimizzare le query più comuni

---

## 🎉 Dopo la Migrazione

Una volta completata la migrazione, il sistema tier sarà attivo:

- ✅ Prezzi fissi per servizi (RO/IT/EN)
- ✅ Sistema tier automatico (15%-30% sconto)
- ✅ Bonus services per tier Silver/Gold/Platinum
- ✅ Tracking ordini e revenue annuale
- ✅ Reset automatico anno fiscale

La dashboard partner mostrerà automaticamente il tier corrente e i servizi bonus disponibili!
