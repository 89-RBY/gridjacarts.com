# Gridjac Art's Website

Site web modern pentru agenția Gridjac Art's SRL, construit cu Next.js 14, TypeScript și Tailwind CSS.

## Caracteristici

- **Multi-language Support**: Română, Engleză, Italiană
- **Design Modern**: Minimal dar particular, cu animații fluide
- **SEO Optimizat**: Meta tags, sitemap, robots.txt
- **Admin Dashboard**: Gestionare blog și setări site
- **Portal Parteneri**: Sistem de franciză cu prețuri personalizate
- **Blog System**: CRUD complet pentru articole în 3 limbi
- **Responsive**: Funcționează perfect pe toate dispozitivele

## Tehnologii

- Next.js 14 (App Router)
- TypeScript
- Tailwind CSS
- next-intl (Internationalization)
- bcryptjs & jsonwebtoken (Authentication)
- Lucide React (Icons)

## Instalare

```bash
# Instalează dependențele
npm install

# Copiază fișierul de environment
cp .env.example .env

# Rulează în development
npm run dev
```

## Structură Proiect

```
src/
├── app/
│   ├── [locale]/           # Pagini pentru fiecare limbă
│   │   ├── about/
│   │   ├── admin/          # Dashboard Admin
│   │   ├── blog/
│   │   ├── contact/
│   │   ├── login/
│   │   ├── partner/        # Portal Parteneri
│   │   ├── portfolio/
│   │   ├── services/
│   │   └── page.tsx        # Home
│   ├── api/                # API Routes
│   │   ├── auth/
│   │   ├── blog/
│   │   ├── services/
│   │   └── settings/
│   ├── layout.tsx
│   ├── robots.ts
│   └── sitemap.ts
├── components/
│   ├── Footer.tsx
│   ├── Header.tsx
│   └── Logo.tsx
├── lib/
│   ├── auth.ts             # Authentication logic
│   └── data.ts             # Data management
├── messages/               # Traduceri
│   ├── en.json
│   ├── it.json
│   └── ro.json
├── types/
│   └── index.ts
├── i18n.ts
└── middleware.ts
```

## Credențiale Demo

- **Admin**: admin@gridjacarts.com / admin123
- **Partner**: partner@example.com / admin123

## Deployment

1. Configurează variabilele de environment pentru producție
2. Build: `npm run build`
3. Start: `npm start`

## Funcționalități Admin

- Gestionare articole blog (CRUD)
- Configurare Google Analytics
- Integrare chatbot în footer
- Dashboard cu statistici

## Funcționalități Partner

- Vizualizare prețuri cu markup automat
- Tabel interactiv cu toate serviciile
- Suport multi-limbă

## Contact

- Email: info@gridjacarts.com
- România: +40 770 362 294
- Italia: +39 320 377 9506

## Licență

Proprietate Gridjac Art's SRL
