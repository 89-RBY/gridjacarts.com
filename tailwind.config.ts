import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        // Tech palette — Software House redesign (dark-first)
        tech: {
          // Backgrounds
          bg: '#0a0e1a',          // primary background (almost black, blue-tinted)
          surface: '#121826',     // cards, sections
          elevated: '#1a2132',    // elevated cards, modals
          border: '#1f2937',      // subtle borders
          'border-strong': '#2d3748',

          // Text
          text: '#f0f6fc',        // primary text
          'text-dim': '#94a3b8',  // secondary text
          'text-muted': '#64748b', // tertiary / placeholders

          // Accent — Electric Green
          accent: '#00ff88',      // primary accent
          'accent-hover': '#00e077',
          'accent-dim': '#00cc6a',
          'accent-dark': '#008c4a',

          // Secondary accent — Cyan for variety
          cyan: '#00d4ff',
          'cyan-dim': '#0099cc',

          // Semantic
          danger: '#ff4d6d',
          warning: '#ffbe3b',
          info: '#00d4ff',
          success: '#00ff88',
        },

        // Legacy palettes — kept for backwards compatibility during migration
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
          950: '#082f49',
        },
        accent: {
          50: '#fdf4ff',
          100: '#fae8ff',
          200: '#f5d0fe',
          300: '#f0abfc',
          400: '#e879f9',
          500: '#d946ef',
          600: '#c026d3',
          700: '#a21caf',
          800: '#86198f',
          900: '#701a75',
          950: '#4a044e',
        },
        brutal: {
          yellow: '#FFFF00',
          cyan: '#00FFFF',
          magenta: '#FF00FF',
          lime: '#00FF00',
          orange: '#FF6600',
          red: '#FF0000',
          blue: '#0000FF',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Menlo', 'Monaco', 'Consolas', 'monospace'],
      },
      backgroundImage: {
        'grid-pattern': "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='60' height='60' viewBox='0 0 60 60'%3E%3Cg fill='none' stroke='%231f2937' stroke-width='1'%3E%3Cpath d='M0 0h60v60H0z'/%3E%3C/g%3E%3C/svg%3E\")",
        'gradient-radial': 'radial-gradient(ellipse at center, var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
        'tech-gradient': 'linear-gradient(135deg, #00ff88 0%, #00d4ff 100%)',
        'tech-radial': 'radial-gradient(circle at 50% 0%, rgba(0,255,136,0.15) 0%, rgba(0,0,0,0) 50%)',
      },
      boxShadow: {
        'tech-glow': '0 0 40px rgba(0, 255, 136, 0.15)',
        'tech-glow-sm': '0 0 20px rgba(0, 255, 136, 0.1)',
        'tech-glow-lg': '0 0 80px rgba(0, 255, 136, 0.25)',
        'tech-cyan': '0 0 40px rgba(0, 212, 255, 0.15)',
        'tech-card': '0 4px 24px -6px rgba(0, 0, 0, 0.5)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'float': 'float 6s ease-in-out infinite',
        'blink': 'blink 1s ease-in-out infinite',
        'shake': 'shake 0.5s ease-in-out',
        'reveal': 'reveal 0.6s ease-out forwards',
        'brutal-pop': 'brutalPop 0.15s ease-out',
        'cursor-blink': 'cursorBlink 1.1s step-end infinite',
        'glow-pulse': 'glowPulse 3s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
        'scan-line': 'scanLine 4s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-20px)' },
        },
        blink: {
          '0%, 50%, 100%': { opacity: '1' },
          '25%, 75%': { opacity: '0.3' },
        },
        shake: {
          '0%, 100%': { transform: 'translateX(0)' },
          '25%': { transform: 'translateX(-4px)' },
          '75%': { transform: 'translateX(4px)' },
        },
        reveal: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        brutalPop: {
          '0%': { transform: 'scale(0.95)' },
          '50%': { transform: 'scale(1.02)' },
          '100%': { transform: 'scale(1)' },
        },
        cursorBlink: {
          '0%, 50%': { opacity: '1' },
          '51%, 100%': { opacity: '0' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(0, 255, 136, 0.15)' },
          '50%': { boxShadow: '0 0 40px rgba(0, 255, 136, 0.35)' },
        },
        gradientShift: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
        scanLine: {
          '0%': { transform: 'translateY(-100%)' },
          '100%': { transform: 'translateY(100vh)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
