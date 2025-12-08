import { useTranslations } from 'next-intl';
import { getTranslations } from 'next-intl/server';

interface PageProps {
    params: { locale: string };
}

export async function generateMetadata({ params: { locale } }: PageProps) {
    const t = await getTranslations({ locale, namespace: 'footer' });
    return {
        title: t('privacy'),
    };
}

export default function PrivacyPage() {
    const t = useTranslations('footer');

    return (
        <div className="container-custom py-12 md:py-20">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl md:text-4xl font-bold mb-8">{t('privacy')}</h1>
                <div className="prose dark:prose-invert max-w-none">
                    <p>
                        {/* Placeholder content - user should update this */}
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                    </p>
                    <p>
                        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur.
                        Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
                    </p>
                </div>
            </div>
        </div>
    );
}
