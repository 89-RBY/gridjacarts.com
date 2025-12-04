import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import CookieBanner from '@/components/CookieBanner';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

// Force dynamic rendering since we fetch settings from database
export const dynamic = 'force-dynamic';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
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
    <html lang={locale} suppressHydrationWarning>
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
