import { notFound } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { SITE_URL } from '@/lib/seo';

// Force dynamic rendering: the page hosts a lead form posted to /api/contact
export const dynamic = 'force-dynamic';

interface AiStudiLegaliLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Omit<AiStudiLegaliLayoutProps, 'children'>) {
  if (locale !== 'it') return {};

  const path = '/ai-studi-legali-italia';
  return {
    title: 'Assistente AI in studio per avvocati – GDPR, dati in locale',
    description:
      'Assistente AI installato nel vostro studio legale, specializzato sul diritto italiano: fascicoli e documenti restano sempre in sede, in linea con il GDPR.',
    alternates: {
      canonical: `${SITE_URL}/it${path}`,
      languages: {
        'it-IT': `${SITE_URL}/it${path}`,
        'it-CH': `${SITE_URL}/it/ai-studi-professionali`,
        'x-default': `${SITE_URL}/it${path}`,
      },
    },
  };
}

export default function AiStudiLegaliLayout({ children, params: { locale } }: AiStudiLegaliLayoutProps) {
  // Italian-only landing page (see brief: solo studi legali italiani)
  if (locale !== 'it') {
    notFound();
  }

  const navLinkClass = 'text-sm text-tech-text-dim hover:text-tech-accent transition-colors';

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-tech-border bg-tech-bg/90 backdrop-blur">
        <div className="container-custom flex items-center justify-between py-3">
          <Link href={`/${locale}/ai-studi-legali-italia`} aria-label="Gridjac Arts">
            <Logo size="sm" />
          </Link>
          <nav className="hidden md:flex items-center gap-8">
            <a href="#come" className={navLinkClass}>Come funziona</a>
            <a href="#privacy" className={navLinkClass}>Riservatezza</a>
            <a href="#faq" className={navLinkClass}>Domande</a>
          </nav>
          <a href="#contatto" className="btn-primary !py-2.5 !px-5 text-sm whitespace-nowrap">
            Richiedi informazioni
          </a>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="border-t border-tech-border py-8">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-tech-text-muted">
          <span>© {new Date().getFullYear()} Gridjac Arts SRL</span>
          <div className="flex items-center gap-5">
            <Link href={`/${locale}/privacy`} className="hover:text-tech-accent transition-colors">
              Privacy
            </Link>
            <a href="mailto:info@gridjacarts.com" className="hover:text-tech-accent transition-colors">
              info@gridjacarts.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
