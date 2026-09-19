import { localeAlternates } from '@/lib/seo';

// Force dynamic rendering for become-partner route
export const dynamic = 'force-dynamic';

interface BecomePartnerLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Omit<BecomePartnerLayoutProps, 'children'>) {
  const title =
    locale === 'ro'
      ? 'Devino partener'
      : locale === 'it'
        ? 'Diventa partner'
        : 'Become a partner';
  const description =
    locale === 'ro'
      ? 'Alătură-te programului de franciză Gridjac Arts: markup personalizat, portal dedicat și onboarding tehnic.'
      : locale === 'it'
        ? "Unisciti al programma di franchising Gridjac Arts: markup personalizzato, portale dedicato e onboarding tecnico."
        : 'Join the Gridjac Arts franchise program: custom markup, dedicated portal and technical onboarding.';

  return {
    title,
    description,
    alternates: localeAlternates(locale, '/become-partner'),
  };
}

export default function BecomePartnerLayout({ children }: BecomePartnerLayoutProps) {
  return children;
}
