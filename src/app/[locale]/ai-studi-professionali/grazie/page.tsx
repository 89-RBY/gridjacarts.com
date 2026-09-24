import Link from 'next/link';
import { CheckCircle, ArrowLeft } from 'lucide-react';

export const dynamic = 'force-dynamic';

export const metadata = {
  title: 'Richiesta ricevuta',
  robots: { index: false, follow: false },
};

export default function AiStudiThankYouPage({ params: { locale } }: { params: { locale: string } }) {
  return (
    <div className="min-h-[70vh] flex items-center justify-center section-padding">
      <div className="container-custom max-w-xl text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-tech-accent/10 mb-6">
          <CheckCircle className="w-8 h-8 text-tech-accent" />
        </div>
        <h1 className="text-3xl md:text-4xl font-display font-bold text-tech-text mb-4">
          Richiesta ricevuta
        </h1>
        <p className="text-tech-text-dim leading-relaxed mb-8">
          Grazie per l&apos;interesse. Vi ricontattiamo entro 24 ore lavorative per fissare la demo
          gratuita direttamente nel vostro studio. Controllate anche la cartella spam: la conferma
          arriva via email.
        </p>
        <Link
          href={`/${locale}/ai-studi-professionali`}
          className="btn-secondary inline-flex items-center gap-2"
        >
          <ArrowLeft className="w-4 h-4" />
          Torna alla pagina
        </Link>
      </div>
    </div>
  );
}
