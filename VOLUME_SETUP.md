# Volume Storage Setup per Contratti

Questo documento spiega come configurare e utilizzare il volume esterno per salvare i contratti partner.

## 📁 Configurazione Volume

### 1. Verifica Volume Montato

Assicurati che il volume sia montato correttamente su `/data_gridjacarts`:

```bash
# Verifica che il path esista
ls -la /data_gridjacarts

# Crea la directory contracts se non esiste
mkdir -p /data_gridjacarts/contracts
chmod 755 /data_gridjacarts/contracts
```

### 2. Configura Variabile d'Ambiente

Aggiungi al tuo file `.env`:

```bash
CONTRACTS_STORAGE_PATH=/data_gridjacarts/contracts
```

> **Nota**: Se non specifichi questa variabile, l'applicazione userà automaticamente `/data_gridjacarts/contracts` come default.

### 3. Verifica Permessi

L'applicazione deve avere permessi di lettura e scrittura sul volume:

```bash
# Se usi Docker, assicurati che il container abbia i permessi corretti
chown -R www-data:www-data /data_gridjacarts/contracts
chmod -R 755 /data_gridjacarts/contracts
```

## 🔄 Migrazione Contratti Esistenti

### Team Images Setup

Per le immagini del team, segui la stessa procedura:

1.  **Crea Directory**:
    ```bash
    mkdir -p /data_gridjacarts/team
    chmod 755 /data_gridjacarts/team
    chown -R www-data:www-data /data_gridjacarts/team
    ```

2.  **Configura Variabile d'Ambiente**:
    ```bash
    TEAM_STORAGE_PATH=/data_gridjacarts/team
    ```

3.  **Docker Compose**:
    Aggiungi la variabile d'ambiente al servizio `app`.

### Blog Images Setup

Per le immagini del blog:

1.  **Crea Directory**:
    ```bash
    mkdir -p /data_gridjacarts/blog
    chmod 755 /data_gridjacarts/blog
    chown -R www-data:www-data /data_gridjacarts/blog
    ```

2.  **Configura Variabile d'Ambiente**:
    ```bash
    BLOG_STORAGE_PATH=/data_gridjacarts/blog
    ```

---

## 🔄 Migrazione Contratti Esistenti

Se hai contratti già caricati in `public/uploads/contracts/`, devi:

### Passo 1: Copia i File

```bash
# Copia i file esistenti nel nuovo volume
cp -r public/uploads/contracts/* /data_gridjacarts/contracts/

# Verifica che i file siano stati copiati
ls -la /data_gridjacarts/contracts/
```

### Passo 2: Aggiorna Database

Esegui lo script di migrazione per aggiornare gli URL nel database:

```bash
# Sul server, dentro la directory dell'app
npm run migrate:contract-urls
```

Questo script:
- Trova tutti i contratti con URL vecchi (`/uploads/contracts/...`)
- Li aggiorna per usare il nuovo endpoint API (`/api/contracts/files/...`)
- Mostra un report dei contratti migrati

### Passo 3: Verifica

Dopo la migrazione:
1. Accedi alla dashboard admin
2. Vai alla sezione "Contracts"
3. Clicca su un contratto per aprire il modal
4. Verifica che il PDF venga visualizzato correttamente

## 🚀 Deployment

### Docker Compose

Se usi Docker Compose, aggiungi il volume:

```yaml
version: '3.8'

services:
  app:
    image: your-app-image
    volumes:
      - contracts_data:/data_gridjacarts
    environment:
      - CONTRACTS_STORAGE_PATH=/data_gridjacarts/contracts

volumes:
  contracts_data:
    driver: local
```

### Docker Run

```bash
docker run -d \
  -v /path/to/volume:/data_gridjacarts \
  -e CONTRACTS_STORAGE_PATH=/data_gridjacarts/contracts \
  your-app-image
```

### Server Diretto

Se non usi Docker:

```bash
# 1. Crea la directory
sudo mkdir -p /data_gridjacarts/contracts

# 2. Imposta i permessi
sudo chown -R $USER:$USER /data_gridjacarts
chmod -R 755 /data_gridjacarts

# 3. Aggiungi al .env
echo "CONTRACTS_STORAGE_PATH=/data_gridjacarts/contracts" >> .env

# 4. Riavvia l'applicazione
pm2 restart gridjacarts
```

## 🔒 Sicurezza

L'endpoint `/api/contracts/files/[filename]` implementa:

1. **Autenticazione**: Solo utenti loggati possono accedere
2. **Autorizzazione**:
   - Admin possono vedere tutti i contratti
   - Partner possono vedere solo i propri contratti
3. **Validazione Path**: Previene path traversal attacks
4. **Check Esistenza**: Verifica che il file esista prima di servirlo

## 🧪 Test

### Test Upload

1. Accedi come partner
2. Vai alla sezione "Contracts"
3. Carica un nuovo contratto PDF
4. Verifica che venga salvato in `/data_gridjacarts/contracts/`

```bash
# Sul server, verifica il file
ls -lh /data_gridjacarts/contracts/CONTR-*
```

### Test Download

1. Clicca su un contratto nella lista
2. Il modal dovrebbe mostrare il PDF in anteprima
3. Clicca "Download" per scaricare il file
4. Verifica che il download funzioni

### Test Permessi

1. Accedi come partner A
2. Prova ad accedere al contratto di un altro partner B
3. Dovresti ricevere un errore "Forbidden"

## 📊 Monitoraggio

### Controllo Spazio

```bash
# Controlla spazio disponibile sul volume
df -h /data_gridjacarts

# Conta i contratti
find /data_gridjacarts/contracts -type f | wc -l

# Dimensione totale
du -sh /data_gridjacarts/contracts
```

### Log

I log dell'applicazione mostrano:
- Upload di nuovi contratti: `Contract saved to: /data_gridjacarts/contracts/...`
- Errori di accesso file: `File not found: /data_gridjacarts/contracts/...`

## 🆘 Troubleshooting

### "File not found in storage"

**Problema**: Il modal mostra "File not found"

**Soluzioni**:
1. Verifica che il file esista fisicamente:
   ```bash
   ls -la /data_gridjacarts/contracts/CONTR-*
   ```

2. Verifica i permessi:
   ```bash
   chmod 755 /data_gridjacarts/contracts/CONTR-*
   ```

3. Controlla il path nel database vs filesystem

### "Unauthorized" o "Forbidden"

**Problema**: Errore di accesso

**Soluzioni**:
1. Verifica di essere loggato
2. Se sei partner, verifica che il contratto sia tuo
3. Controlla i log dell'applicazione

### Volume non montato

**Problema**: Directory `/data_gridjacarts` non esiste

**Soluzioni**:
1. Verifica il mount del volume Docker
2. Crea manualmente la directory se necessario
3. Riavvia il container/applicazione

## 📝 Note Aggiuntive

- Il formato del nome file è: `CONTR-{ANNO}-{PARTNER_ID}-{NUMERO}-{nome_originale}`
- I file sono serviti con `Content-Type` corretto dal database
- Il cache è impostato a 1 ora (`max-age=3600`)
- Per backup, basta fare backup del volume `/data_gridjacarts`

## 🔄 Rollback

Se vuoi tornare al sistema precedente (non consigliato):

1. Copia i file dal volume a public:
   ```bash
   cp -r /data_gridjacarts/contracts/* public/uploads/contracts/
   ```

2. Aggiorna manualmente gli URL nel database da `/api/contracts/files/` a `/uploads/contracts/`

3. Ripristina il codice vecchio con git
