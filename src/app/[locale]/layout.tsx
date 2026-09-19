import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import Script from 'next/script';
import { locales } from '@/i18n';
import { SITE_URL } from '@/lib/seo';
import CookieBanner from '@/components/CookieBanner';
import OrganizationJsonLd from '@/components/OrganizationJsonLd';
import '../globals.css';

const OG_LOCALE_MAP: Record<string, string> = {
  ro: 'ro_RO',
  en: 'en_US',
  it: 'it_IT',
};

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

// Force dynamic rendering since we fetch settings from database
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params: { locale } }: Omit<LocaleLayoutProps, 'children'>) {
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    metadataBase: new URL(SITE_URL),
    title: {
      default: t('defaultTitle'),
      template: `%s | Gridjac Arts`,
    },
    description: t('description'),
    keywords: t('keywords').split(','),
    authors: [{ name: 'Gridjac Arts SRL' }],
    creator: 'Gridjac Arts',
    publisher: 'Gridjac Arts',
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      siteName: 'Gridjac Arts',
      title: t('ogTitle'),
      description: t('ogDescription'),
      url: `${SITE_URL}/${locale}`,
      locale: OG_LOCALE_MAP[locale] ?? 'en_US',
      alternateLocale: locales
        .filter((l) => l !== locale)
        .map((l) => OG_LOCALE_MAP[l] ?? l),
    },
    twitter: {
      card: 'summary_large_image',
      title: t('ogTitle'),
      description: t('twitterDescription'),
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  };
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: LocaleLayoutProps) {
  if (!locales.includes(locale as (typeof locales)[number])) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className="dark" suppressHydrationWarning>
      <head>
        <OrganizationJsonLd />
      </head>
      <body className="min-h-screen">
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-3RP9LHBPP3"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-3RP9LHBPP3');
          `}
        </Script>
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieBanner locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
