'use client';

import dynamic from 'next/dynamic';

const HeroB = dynamic(() => import('./HeroB'), {
  ssr: false,
  loading: () => null,
});

export default function HeroBLazy() {
  return <HeroB />;
}
