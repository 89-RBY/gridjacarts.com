import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function NotFound() {
    const t = useTranslations('common');

    return (
        <div className="min-h-[60vh] flex flex-col items-center justify-center text-center px-4">
            <h1 className="text-6xl font-bold mb-4 text-gray-900 dark:text-white">404</h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
                Page not found
            </p>
            <Link
                href="/"
                className="px-6 py-3 bg-primary-600 text-white rounded-full hover:bg-primary-700 transition-colors"
            >
                {t('brand')} - Home
            </Link>
        </div>
    );
}
