import { NextIntlClientProvider } from 'next-intl';
import { getMessages, getTranslations } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import CookieBanner from '@/components/CookieBanner';
import '../globals.css';

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
    title: {
      default: t('defaultTitle'),
      template: `%s | Gridjac Art's`,
    },
    description: t('description'),
    keywords: t('keywords').split(','),
    authors: [{ name: "Gridjac Art's SRL" }],
    creator: "Gridjac Art's",
    publisher: "Gridjac Art's",
    formatDetection: {
      email: false,
      address: false,
      telephone: false,
    },
    openGraph: {
      type: 'website',
      siteName: "Gridjac Art's",
      title: t('ogTitle'),
      description: t('ogDescription'),
    },
    twitter: {
      card: 'summary_large_image',
      title: "Gridjac Art's",
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
        {/* Google Analytics Code - Static injection */}
        <script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-3RP9LHBPP3"
        />
        <script
          id="google-analytics"
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', 'G-3RP9LHBPP3');
            `,
          }}
        />
      </head>
      <body className="min-h-screen">
        <NextIntlClientProvider messages={messages}>
          {children}
          <CookieBanner locale={locale} />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
