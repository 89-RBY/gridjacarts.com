import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WhatsAppButton from '@/components/WhatsAppButton';

interface PublicLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function PublicLayout({
  children,
  params: { locale },
}: PublicLayoutProps) {
  return (
    <div className="min-h-screen flex flex-col">
      <Header locale={locale} />
      <main className="flex-grow pt-16">
        {children}
      </main>
      <Footer locale={locale} />
      <WhatsAppButton locale={locale} />
    </div>
  );
}
