'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, User } from 'lucide-react';
import Logo from './Logo';
import { useBlogSlugs } from '@/contexts/BlogSlugContext';

interface HeaderProps {
  locale: string;
  blogPostSlugs?: {
    ro: string;
    en: string;
    it: string;
  };
}

export default function Header({ locale, blogPostSlugs }: HeaderProps) {
  const t = useTranslations('nav');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangMenuOpen, setIsLangMenuOpen] = useState(false);
  const pathname = usePathname();

  // Use context slugs if available, otherwise fall back to props
  const contextSlugs = useBlogSlugs();
  const slugs = contextSlugs || blogPostSlugs;

  const navigation = [
    { name: t('home'), href: `/${locale}` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('services'), href: `/${locale}/services` },
    { name: t('portfolio'), href: `/${locale}/portfolio` },
    { name: t('blog'), href: `/${locale}/blog` },
    { name: t('contact'), href: `/${locale}/contact` },
  ];

  const languages = [
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  ];

  const switchLanguage = (newLocale: string) => {
    // If we're on a blog post page and have slugs, use the correct slug for the new language
    if (slugs && pathname.includes('/blog/')) {
      const newSlug = slugs[newLocale as keyof typeof slugs];
      window.location.href = `/${newLocale}/blog/${newSlug}`;
    } else {
      // For other pages, just replace the locale in the path
      const currentPath = pathname.replace(`/${locale}`, '');
      window.location.href = `/${newLocale}${currentPath || ''}`;
    }
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/80 dark:bg-gray-900/80 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0">
            <Logo size="md" />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`text-sm font-medium transition-colors hover:text-primary-600 ${
                  pathname === item.href
                    ? 'text-primary-600'
                    : 'text-gray-700 dark:text-gray-200'
                }`}
              >
                {item.name}
              </Link>
            ))}
          </nav>

          {/* Right side - Language switcher & CTA */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 transition-colors"
              >
                <Globe className="w-4 h-4" />
                {languages.find((l) => l.code === locale)?.flag}
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        switchLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 flex items-center gap-2 ${
                        locale === lang.code ? 'text-primary-600 font-medium' : 'text-gray-700 dark:text-gray-200'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login Button */}
            <Link
              href={`/${locale}/login`}
              className="flex items-center gap-2 px-3 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 hover:text-primary-600 transition-colors"
            >
              <User className="w-4 h-4" />
              <span className="hidden lg:inline">
                {locale === 'ro' ? 'Login' : locale === 'it' ? 'Accedi' : 'Login'}
              </span>
            </Link>

            {/* CTA Button */}
            <Link
              href={`/${locale}/contact`}
              className="bg-gradient-to-r from-primary-600 to-accent-600 text-white px-6 py-2 rounded-full text-sm font-medium hover:shadow-lg hover:scale-105 transition-all duration-200"
            >
              {t('contact')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden p-2 rounded-lg text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700">
          <div className="px-4 py-4 space-y-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2 rounded-lg text-base font-medium ${
                  pathname === item.href
                    ? 'bg-primary-50 text-primary-600'
                    : 'text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800'
                }`}
              >
                {item.name}
              </Link>
            ))}

            {/* Mobile Login Button */}
            <Link
              href={`/${locale}/login`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg text-base font-medium text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <User className="w-5 h-5" />
              {locale === 'ro' ? 'Login / Cont' : locale === 'it' ? 'Accedi / Account' : 'Login / Account'}
            </Link>

            <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="px-3 py-2 text-sm font-medium text-gray-500">Limba / Language</p>
              <div className="flex gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={`px-4 py-2 rounded-lg text-sm ${
                      locale === lang.code
                        ? 'bg-primary-100 text-primary-600 font-medium'
                        : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-200'
                    }`}
                  >
                    {lang.flag} {lang.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
