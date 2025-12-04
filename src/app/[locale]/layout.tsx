import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { locales } from '@/i18n';
import { getSiteSettings } from '@/lib/data';
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

  // Fetch settings with error handling
  let settings = { analyticsCode: '', chatbotCode: '', updatedAt: '' };
  try {
    settings = await getSiteSettings();
  } catch (error) {
    console.error('Error fetching site settings:', error);
    // Continue with empty settings if database is unavailable
  }

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Google Analytics Code from Admin Settings - Injected at top of head */}
        {settings.analyticsCode && (
          <script
            id="google-analytics"
            dangerouslySetInnerHTML={{ __html: settings.analyticsCode }}
          />
        )}
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
