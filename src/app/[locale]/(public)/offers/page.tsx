import { getTranslations, unstable_setRequestLocale } from 'next-intl/server';
import OfferHero from '@/components/OfferHero';
import OfferForm from '@/components/OfferForm';
import OfferFunnel from '@/components/OfferFunnel';

export const dynamic = 'force-dynamic'; // Ensures the page updates automatically every month

interface Props {
    params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: Props) {
    const t = await getTranslations({ locale, namespace: 'offer' });
    const date = new Date();
    const currentMonth = date.getMonth();
    // @ts-ignore
    const monthName = t(`months.${currentMonth}`);

    return {
        title: t('pageTitle', { month: monthName }),
    };
}

export default function OfferPage({ params: { locale } }: Props) {
    unstable_setRequestLocale(locale);

    const date = new Date();
    const currentMonth = date.getMonth(); // 0-11

    return (
        <main className="min-h-screen bg-white dark:bg-gray-900">
            <OfferHero currentMonth={currentMonth} />

            <OfferFunnel />

            <section className="py-20 bg-gray-50 dark:bg-gray-800/50">
                <div className="container mx-auto px-4">
                    <OfferForm />
                </div>
            </section>
        </main>
    );
}
