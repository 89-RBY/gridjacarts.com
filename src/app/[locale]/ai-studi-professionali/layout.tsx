import { notFound } from 'next/navigation';
import Link from 'next/link';
import Logo from '@/components/Logo';
import { SITE_URL } from '@/lib/seo';

// Force dynamic rendering: the page hosts a lead form posted to /api/contact
export const dynamic = 'force-dynamic';

interface AiStudiLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Omit<AiStudiLayoutProps, 'children'>) {
  if (locale !== 'it') return {};

  const path = '/ai-studi-professionali';
  return {
    title: 'AI privata per studi legali e fiduciarie in Ticino',
    description:
      "Intelligenza artificiale sui documenti del vostro studio, installata in sede. Nessun dato esce dall'ufficio. Demo gratuita in Ticino.",
    alternates: {
      canonical: `${SITE_URL}/${locale}${path}`,
    },
  };
}

export default function AiStudiLayout({ children, params: { locale } }: AiStudiLayoutProps) {
  // Italian-only landing page for now (see brief: valutare in futuro una versione tedesca)
  if (locale !== 'it') {
    notFound();
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="sticky top-0 z-50 border-b border-tech-border bg-tech-bg/90 backdrop-blur">
        <div className="container-custom flex items-center justify-between py-3">
          <Link href={`/${locale}/ai-studi-professionali`} aria-label="Gridjac Arts">
            <Logo size="sm" />
          </Link>
          <a href="#demo" className="btn-primary !py-2.5 !px-5 text-sm whitespace-nowrap">
            Prenota una demo
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
