'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { useTranslations } from 'next-intl';
import { usePathname } from 'next/navigation';
import { Menu, X, Globe, User, ChevronDown } from 'lucide-react';
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
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  const contextSlugs = useBlogSlugs();
  const slugs = contextSlugs || blogPostSlugs;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navigation = [
    { name: t('products'), href: `/${locale}/products` },
    { name: t('services'), href: `/${locale}/services` },
    { name: t('labs'), href: `/${locale}/labs` },
    { name: t('about'), href: `/${locale}/about` },
    { name: t('blog'), href: `/${locale}/blog` },
    { name: t('becomePartner'), href: `/${locale}/become-partner` },
  ];

  const languages = [
    { code: 'ro', name: 'Română', flag: '🇷🇴' },
    { code: 'en', name: 'English', flag: '🇬🇧' },
    { code: 'it', name: 'Italiano', flag: '🇮🇹' },
  ];

  const switchLanguage = (newLocale: string) => {
    if (slugs && pathname.includes('/blog/')) {
      const newSlug = slugs[newLocale as keyof typeof slugs];
      window.location.href = `/${newLocale}/blog/${newSlug}`;
    } else {
      const currentPath = pathname.replace(`/${locale}`, '');
      window.location.href = `/${newLocale}${currentPath || ''}`;
    }
  };

  const isActive = (href: string) => {
    if (href === `/${locale}`) return pathname === href;
    return pathname.startsWith(href);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-tech-bg/80 backdrop-blur-xl border-b border-tech-border'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex-shrink-0 flex items-center gap-2 group">
            <Logo size="md" />
            <span className="hidden sm:inline text-[10px] font-mono text-tech-accent/70 border border-tech-accent/30 rounded px-1.5 py-0.5 ml-1">
              v2.0
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={`relative px-3 py-2 text-sm font-medium rounded-md transition-all duration-200 ${
                  isActive(item.href)
                    ? 'text-tech-accent'
                    : 'text-tech-text-dim hover:text-tech-text'
                }`}
              >
                {item.name}
                {isActive(item.href) && (
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-tech-accent" />
                )}
              </Link>
            ))}
          </nav>

          {/* Right side */}
          <div className="hidden lg:flex items-center gap-2">
            {/* Language Switcher */}
            <div className="relative">
              <button
                onClick={() => setIsLangMenuOpen(!isLangMenuOpen)}
                className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-tech-text-dim hover:text-tech-accent transition-colors"
              >
                <Globe className="w-4 h-4" />
                <span className="uppercase font-mono text-xs">{locale}</span>
                <ChevronDown className="w-3 h-3" />
              </button>
              {isLangMenuOpen && (
                <div className="absolute right-0 mt-2 w-40 bg-tech-elevated rounded-lg shadow-xl border border-tech-border-strong py-1">
                  {languages.map((lang) => (
                    <button
                      key={lang.code}
                      onClick={() => {
                        switchLanguage(lang.code);
                        setIsLangMenuOpen(false);
                      }}
                      className={`w-full text-left px-4 py-2 text-sm flex items-center gap-2 transition-colors ${
                        locale === lang.code
                          ? 'text-tech-accent bg-tech-accent/5'
                          : 'text-tech-text-dim hover:text-tech-text hover:bg-tech-surface'
                      }`}
                    >
                      <span>{lang.flag}</span>
                      <span>{lang.name}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Login */}
            <Link
              href={`/${locale}/login`}
              className="flex items-center gap-1.5 px-3 py-2 text-sm font-medium text-tech-text-dim hover:text-tech-accent transition-colors"
            >
              <User className="w-4 h-4" />
            </Link>

            {/* CTA */}
            <Link
              href={`/${locale}/contact`}
              className="btn-primary !py-2 !px-5 text-sm"
            >
              {t('contact')}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden p-2 rounded-lg text-tech-text-dim hover:text-tech-accent hover:bg-tech-surface transition-colors"
            aria-label="Toggle menu"
          >
            {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden bg-tech-bg border-t border-tech-border">
          <div className="px-4 py-4 space-y-1">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`block px-3 py-2.5 rounded-lg text-base font-medium transition-colors ${
                  isActive(item.href)
                    ? 'bg-tech-accent/10 text-tech-accent'
                    : 'text-tech-text-dim hover:bg-tech-surface hover:text-tech-text'
                }`}
              >
                {item.name}
              </Link>
            ))}

            <Link
              href={`/${locale}/contact`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="block mt-4 btn-primary w-full text-center"
            >
              {t('contact')}
            </Link>

            <Link
              href={`/${locale}/login`}
              onClick={() => setIsMobileMenuOpen(false)}
              className="flex items-center gap-2 px-3 py-2.5 rounded-lg text-base font-medium text-tech-text-dim hover:bg-tech-surface"
            >
              <User className="w-5 h-5" />
              {locale === 'ro' ? 'Login / Cont' : locale === 'it' ? 'Accedi / Account' : 'Login / Account'}
            </Link>

            <div className="pt-4 mt-4 border-t border-tech-border">
              <p className="px-3 py-2 text-xs font-mono uppercase text-tech-text-muted">Language</p>
              <div className="flex gap-2 px-3">
                {languages.map((lang) => (
                  <button
                    key={lang.code}
                    onClick={() => switchLanguage(lang.code)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      locale === lang.code
                        ? 'bg-tech-accent/10 text-tech-accent border border-tech-accent/30'
                        : 'bg-tech-surface text-tech-text-dim border border-tech-border'
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
