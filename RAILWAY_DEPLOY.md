# 🚀 Deploy su Railway - Aggiornamento Database

Sei già connesso al container Railway. Segui questi passi:

## Opzione 1: Prisma DB Push (CONSIGLIATO)

```bash
# Sincronizza lo schema senza migrazioni
npx prisma db push

# Rigenera il Prisma Client
npx prisma generate
```

Questo comando:
- ✅ Crea la tabella Contract se non esiste
- ✅ Aggiunge l'enum ContractStatus
- ✅ Non richiede baseline
- ✅ È sicuro per database esistenti

## Opzione 2: SQL Manuale (se prisma db push fallisce)

```bash
# Connettiti al database
psql $DATABASE_URL

# Poi esegui questi comandi SQL:
```

```sql
-- 1. Crea enum ContractStatus
DO $$ BEGIN
    CREATE TYPE "ContractStatus" AS ENUM ('PENDING', 'SIGNED', 'EXPIRED', 'REJECTED', 'ARCHIVED');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2. Crea tabella Contract
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

    CONSTRAINT "Contract_partnerId_fkey" FOREIGN KEY ("partnerId") 
    REFERENCES "Partner"("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- 3. Crea indici
CREATE INDEX IF NOT EXISTS "Contract_partnerId_idx" ON "Contract"("partnerId");
CREATE INDEX IF NOT EXISTS "Contract_status_idx" ON "Contract"("status");
CREATE INDEX IF NOT EXISTS "Contract_contractNumber_idx" ON "Contract"("contractNumber");
```

## Verifica

```bash
# Controlla se la tabella esiste
psql $DATABASE_URL -c "SELECT tablename FROM pg_tables WHERE schemaname='public' AND tablename='Contract';"

# Verifica struttura
psql $DATABASE_URL -c "\d Contract"
```

## Riavvio App

Dopo l'aggiornamento del database:
```bash
# Esci dal container
exit

# Railway riavvierà automaticamente l'app
```

## Note

- `prisma db push` è ideale per production quando il database ha già dati
- Non crea file di migrazione
- Sincronizza lo schema direttamente con il database
- È idempotente (puoi eseguirlo più volte)

