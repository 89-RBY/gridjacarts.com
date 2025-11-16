# Gridjac Art's Website

Site web modern pentru agenția Gridjac Art's SRL, construit cu Next.js 14, TypeScript și Tailwind CSS.

## Caracteristici Principale

### Frontend
- **Multi-language Support**: Română, Engleză, Italiană cu next-intl
- **Design Modern**: Minimal dar particular, cu gradient accents și animații fluide
- **SEO Optimizat**: Meta tags dinamice, sitemap automat, robots.txt
- **Responsive**: Funcționează perfect pe toate dispozitivele
- **Logo SVG Personalizat**: Brand vizual modern cu gradient

### Backend & Admin
- **Dashboard Complet**: Statistici, gestionare conținut
- **Blog System**: CRUD complet pentru articole în 3 limbi
- **Partner Management**: Aplicații, aprobare, markup personalizat
- **Services Management**: CRUD pentru servicii și prețuri
- **Site Settings**: Integrare Google Analytics și chatbot AI
- **Image Upload**: Upload imagini pentru blog și portofoliu (max 5MB)

### Sistem Parteneri (Franciză)
- **Aplicare Publică**: Formular de aplicare pentru parteneri noi
- **Aprobare Admin**: Review și aprobare aplicații
- **Markup Personalizat**: Fiecare partener poate avea markup diferit
- **Portal Dedicat**: Prețuri calculate automat cu markup-ul personalizat

### Database
- **Prisma ORM**: Schema completă pentru PostgreSQL
- **Railway Ready**: Configurare optimizată pentru Railway deployment
- **Migrări**: Suport pentru database migrations
- **Seed Data**: Script de populare cu date inițiale

## Tehnologii

- **Framework**: Next.js 14 (App Router)
- **Language**: TypeScript 5.4
- **Styling**: Tailwind CSS 3.4
- **i18n**: next-intl 3.15
- **Database**: Prisma 5.14 cu PostgreSQL
- **Auth**: bcryptjs & jsonwebtoken
- **Icons**: Lucide React

## Instalare

```bash
# Instalează dependențele
npm install

# Copiază fișierul de environment
cp .env.example .env

# (Opțional) Setup Prisma pentru producție
npx prisma generate
npx prisma db push
npx ts-node prisma/seed.ts

# Rulează în development
npm run dev
```

## Setup Prisma (pentru producție)

```bash
# Generează clientul Prisma
npx prisma generate

# Creează baza de date și tabele
npx prisma db push

# Populează cu date inițiale
npx ts-node prisma/seed.ts

# (Optional) Vizualizează datele
npx prisma studio
```

## Structură Proiect

```
├── prisma/                    # Prisma schema și migrări
│   ├── schema.prisma          # Schema bază de date
│   └── seed.ts                # Script populare date
├── public/
│   ├── uploads/               # Imagini uploadate
│   └── manifest.json          # PWA manifest
├── src/
│   ├── app/
│   │   ├── [locale]/          # Pagini multilingve
│   │   │   ├── about/         # Despre Noi
│   │   │   ├── admin/         # Dashboard Admin
│   │   │   ├── become-partner/ # Formular Aplicare
│   │   │   ├── blog/          # Blog public
│   │   │   ├── contact/       # Contact
│   │   │   ├── login/         # Autentificare
│   │   │   ├── partner/       # Portal Parteneri
│   │   │   ├── portfolio/     # Portofoliu
│   │   │   └── services/      # Servicii
│   │   ├── api/               # API Routes
│   │   │   ├── auth/          # Login, logout, me
│   │   │   ├── blog/          # CRUD articole
│   │   │   ├── partner-applications/ # Aplicații
│   │   │   ├── partners/      # CRUD parteneri
│   │   │   ├── services/      # CRUD servicii
│   │   │   ├── settings/      # Setări site
│   │   │   ├── upload/        # Upload imagini
│   │   │   └── users/         # Gestionare utilizatori
│   │   ├── robots.ts          # SEO robots.txt
│   │   └── sitemap.ts         # SEO sitemap
│   ├── components/
│   │   ├── Footer.tsx         # Footer universal
│   │   ├── Header.tsx         # Header cu nav și lang switch
│   │   ├── ImageUploader.tsx  # Upload imagini
│   │   └── Logo.tsx           # Logo SVG
│   ├── lib/
│   │   ├── auth.ts            # Autentificare & JWT
│   │   ├── data.ts            # Data management (JSON)
│   │   └── prisma.ts          # Client Prisma singleton
│   ├── messages/              # Traduceri
│   │   ├── en.json
│   │   ├── it.json
│   │   └── ro.json
│   ├── types/
│   │   └── index.ts           # TypeScript interfaces
│   ├── i18n.ts                # Config internaționalizare
│   └── middleware.ts          # Route middleware
├── .env.example               # Environment variables template
├── tailwind.config.ts         # Tailwind configuration
└── tsconfig.json              # TypeScript configuration
```

## Credențiale Demo

- **Admin**: admin@gridjacarts.com / admin123

## Pagini Admin

1. **Dashboard**: Statistici generale
2. **Applications**: Gestionare aplicații parteneri (aprobare/respingere)
3. **Partners**: Lista parteneri, editare markup, suspendare
4. **Services**: CRUD servicii și prețuri bază
5. **Blog**: Creare și editare articole în 3 limbi
6. **Settings**: Google Analytics code și Chatbot snippet

## Funcționalități Portal Parteneri

- Vizualizare prețuri cu markup personalizat
- Tabel interactiv cu toate serviciile
- Calcul automat preț final
- Suport multi-limbă

## API Endpoints

### Authentication
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `GET /api/auth/me` - Current user

### Blog
- `GET /api/blog` - Lista articole
- `POST /api/blog` - Creare articol
- `PUT /api/blog` - Actualizare articol
- `DELETE /api/blog?id=` - Ștergere articol

### Partners
- `GET /api/partners` - Lista parteneri
- `POST /api/partners` - Creare partener
- `PUT /api/partners` - Actualizare partener
- `DELETE /api/partners?id=` - Ștergere partener

### Partner Applications
- `GET /api/partner-applications` - Lista aplicații
- `POST /api/partner-applications` - Trimite aplicație (public)
- `PUT /api/partner-applications` - Aprobare/respingere
- `DELETE /api/partner-applications?id=` - Ștergere

### Services
- `GET /api/services` - Lista servicii (admin) sau prețuri (partner)
- `POST /api/services` - Creare serviciu
- `PUT /api/services` - Actualizare serviciu
- `DELETE /api/services?id=` - Ștergere serviciu

### Upload
- `GET /api/upload` - Lista fișiere uploadate
- `POST /api/upload` - Upload imagine

### Settings
- `GET /api/settings` - Obține setări
- `PUT /api/settings` - Actualizare setări

## Environment Variables

```bash
# JWT Secret (required)
JWT_SECRET=your-secret-key

# Database URL pentru Prisma (PostgreSQL)
DATABASE_URL="postgresql://user:password@host:port/database"

# Node Environment
NODE_ENV=production
```

## Deployment pe Railway

### Pași Rapizi

1. **Creează cont Railway**: https://railway.app
2. **New Project** → **Deploy from GitHub repo**
3. **Adaugă PostgreSQL**:
   - Click "New" → "Database" → "PostgreSQL"
   - Railway setează automat `DATABASE_URL`
4. **Configurează Environment Variables**:
   ```
   JWT_SECRET=your-super-secret-key-change-this
   NODE_ENV=production
   ```
5. **Deploy**: Railway face automat `npm install` și `npm run build`
6. **Inițializează DB**:
   ```bash
   # În Railway CLI sau terminal
   npx prisma db push
   npm run db:seed
   ```

### Railway CLI (Opțional)

```bash
# Instalează Railway CLI
npm install -g @railway/cli

# Login
railway login

# Link la proiect
railway link

# Deploy
railway up

# Rulează comenzi în cloud
railway run npx prisma db push
railway run npm run db:seed
```

### Variables Railway

Railway setează automat:
- `DATABASE_URL` - connection string PostgreSQL

Tu trebuie să setezi:
- `JWT_SECRET` - cheie secretă pentru JWT tokens
- `NODE_ENV` - setează la "production"

### Build Command (Automat)

Railway detectează Next.js și rulează:
```bash
npm install
npm run build  # include prisma generate
npm start
```

## Deployment Manual

1. **Setup environment**: Configurează `.env` cu secretele de producție
2. **Install**: `npm install`
3. **Database**: `npx prisma generate && npx prisma db push`
4. **Seed**: `npm run db:seed`
5. **Build**: `npm run build`
6. **Start**: `npm start`

## Securitate

- Parole hash-uite cu bcrypt (cost factor 10)
- JWT tokens cu expirare 7 zile
- HTTP-only cookies pentru tokens
- Validare input pe toate API endpoints
- Upload restricționat la imagini (max 5MB)
- Role-based access control (admin/partner)

## Contact

- **Email**: info@gridjacarts.com
- **România**: +40 770 362 294
- **Italia**: +39 320 377 9506
- **Adrese**:
  - Str. Principală, nr. 159, Balcauți 727025 SV, România
  - Via Trecate 43, Roma 00166, Italia

## Social Media

- Facebook: /gridjacarts
- Instagram: /gridjacarts
- LinkedIn: /company/gridjacarts

## Licență

Proprietate Gridjac Art's SRL - Toate drepturile rezervate
