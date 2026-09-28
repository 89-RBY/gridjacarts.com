import { notFound } from 'next/navigation';
import Link from 'next/link';
import { Fraunces } from 'next/font/google';
import { SITE_URL } from '@/lib/seo';

const fraunces = Fraunces({ subsets: ['latin'], weight: ['600'] });

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

  const navLinkClass = 'text-[15px] text-[#17202E] hover:text-[#8A6420] transition-colors';

  return (
    <div className="min-h-screen flex flex-col bg-[#F6F3EC]">
      <header className="sticky top-0 z-50 border-b border-[#DDD6C8] bg-[#F6F3EC]/95 backdrop-blur">
        <div className="container-custom flex items-center justify-between py-5">
          <Link
            href={`/${locale}/ai-studi-legali-italia`}
            aria-label="Gridjac Arts"
            className={`${fraunces.className} text-[22px] font-semibold text-[#17202E]`}
          >
            Gridjac Arts <span className="font-normal text-[#5B6472]">&middot; AI per studi legali</span>
          </Link>
          <nav className="hidden md:flex items-center gap-9">
            <a href="#come" className={navLinkClass}>Come funziona</a>
            <a href="#privacy" className={navLinkClass}>Riservatezza</a>
            <a href="#faq" className={navLinkClass}>Domande</a>
          </nav>
          <a
            href="#contatto"
            className="inline-flex items-center rounded-md bg-[#17202E] px-[22px] py-3 text-[15px] font-medium text-[#F6F3EC] hover:bg-[#8A6420] transition-colors whitespace-nowrap"
          >
            Richiedi informazioni
          </a>
        </div>
      </header>

      <main className="flex-grow">{children}</main>

      <footer className="mt-auto border-t border-[#DDD6C8] py-8">
        <div className="container-custom flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-[#5B6472]">
          <span>© {new Date().getFullYear()} Gridjac Arts SRL</span>
          <div className="flex items-center gap-5">
            <Link href={`/${locale}/privacy`} className="hover:text-[#8A6420] transition-colors">
              Informativa privacy
            </Link>
            <a href="mailto:info@gridjacarts.com" className="hover:text-[#8A6420] transition-colors">
              info@gridjacarts.com
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
