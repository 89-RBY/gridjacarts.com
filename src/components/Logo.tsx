'use client';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizes = {
    sm: 'h-8',
    md: 'h-10',
    lg: 'h-14',
  };

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <div className={`${sizes[size]} aspect-square relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full">
          {/* Grid pattern background */}
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>

          {/* Main grid square */}
          <rect
            x="10"
            y="10"
            width="80"
            height="80"
            rx="8"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="4"
          />

          {/* Grid lines */}
          <line x1="10" y1="36" x2="90" y2="36" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.6" />
          <line x1="10" y1="64" x2="90" y2="64" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.6" />
          <line x1="36" y1="10" x2="36" y2="90" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.6" />
          <line x1="64" y1="10" x2="64" y2="90" stroke="url(#logoGradient)" strokeWidth="2" opacity="0.6" />

          {/* Accent dot */}
          <circle cx="50" cy="50" r="12" fill="url(#logoGradient)" />

          {/* Corner accents */}
          <circle cx="23" cy="23" r="4" fill="#0ea5e9" opacity="0.8" />
          <circle cx="77" cy="77" r="4" fill="#d946ef" opacity="0.8" />
        </svg>
      </div>
      <div className="flex flex-col">
        <span className="font-display font-bold text-lg leading-tight bg-gradient-to-r from-primary-600 via-violet-600 to-accent-600 bg-clip-text text-transparent">
          Gridjac
        </span>
        <span className="font-display font-light text-sm leading-tight text-gray-600 dark:text-gray-300">
          Art&apos;s
        </span>
      </div>
    </div>
  );
}
