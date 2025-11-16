import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Gridjac Art\'s - Partenerul tău în creștere digitală',
    template: '%s | Gridjac Art\'s',
  },
  description: 'Suntem partenerul tău strategic în transformarea digitală. Web Design, Development, SEO, Social Media Marketing și multe altele.',
  keywords: ['web design', 'web development', 'SEO', 'social media marketing', 'publicitate online', 'tururi virtuale', 'full stack development'],
  authors: [{ name: 'Gridjac Art\'s SRL' }],
  creator: 'Gridjac Art\'s',
  publisher: 'Gridjac Art\'s',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    siteName: 'Gridjac Art\'s',
    title: 'Gridjac Art\'s - Partenerul tău în creștere digitală',
    description: 'Suntem partenerul tău strategic în transformarea digitală.',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Gridjac Art\'s',
    description: 'Partenerul tău în creștere digitală',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
