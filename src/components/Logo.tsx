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
    <div className={`flex items-center gap-2.5 ${className}`}>
      <div className={`${sizes[size]} aspect-square relative`}>
        <svg viewBox="0 0 100 100" className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <linearGradient id="logoGradient" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0ea5e9" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#d946ef" />
            </linearGradient>
          </defs>

          {/* Terminal window frame */}
          <rect
            x="8"
            y="12"
            width="84"
            height="76"
            rx="10"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="5"
          />

          {/* Terminal header bar */}
          <line
            x1="8"
            y1="30"
            x2="92"
            y2="30"
            stroke="url(#logoGradient)"
            strokeWidth="2.5"
            opacity="0.6"
          />

          {/* Window dots (traffic lights) */}
          <circle cx="18" cy="21" r="2.5" fill="#ff5f57" />
          <circle cx="27" cy="21" r="2.5" fill="#febc2e" />
          <circle cx="36" cy="21" r="2.5" fill="#28c840" />

          {/* Prompt chevron: > */}
          <polyline
            points="22,50 32,60 22,70"
            fill="none"
            stroke="url(#logoGradient)"
            strokeWidth="5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />

          {/* Blinking cursor underscore */}
          <rect x="42" y="67" width="28" height="5" rx="1" fill="url(#logoGradient)">
            <animate
              attributeName="opacity"
              values="1;1;0;0;1"
              keyTimes="0;0.5;0.5;1;1"
              dur="1.1s"
              repeatCount="indefinite"
            />
          </rect>
        </svg>
      </div>
      <div className="flex items-baseline gap-1">
        <span className="font-display font-bold text-lg leading-tight bg-gradient-to-r from-primary-600 via-violet-600 to-accent-600 bg-clip-text text-transparent">
          Gridjac
        </span>
        <span className="font-mono font-semibold text-sm leading-tight text-tech-accent">
          Arts
        </span>
      </div>
    </div>
  );
}
