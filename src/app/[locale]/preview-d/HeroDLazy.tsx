'use client';

import dynamic from 'next/dynamic';

const HeroD = dynamic(() => import('./HeroD'), {
  ssr: false,
  loading: () => null,
});

export default function HeroDLazy() {
  return <HeroD />;
}
