'use client';

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { trackDarkModeToggle } from '@/lib/analytics';

export default function ThemeToggle() {
    const { theme, toggleTheme, mounted } = useTheme();

    if (!mounted) {
        return <div className="w-14 h-14" />; // Placeholder to avoid layout shift
    }

    const handleToggle = () => {
        const newTheme = theme === 'light' ? 'dark' : 'light';
        toggleTheme();
        trackDarkModeToggle(newTheme);
    };

    return (
        <button
            onClick={handleToggle}
            className="fixed top-6 right-6 z-50 w-14 h-14 brutal-border brutal-shadow bg-brutal-yellow dark:bg-brutal-cyan hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all duration-100 flex items-center justify-center group"
            aria-label="Toggle theme"
        >
            {theme === 'light' ? (
                <Moon className="w-6 h-6 text-black group-hover:rotate-12 transition-transform duration-200" />
            ) : (
                <Sun className="w-6 h-6 text-black group-hover:rotate-12 transition-transform duration-200" />
            )}
        </button>
    );
}
