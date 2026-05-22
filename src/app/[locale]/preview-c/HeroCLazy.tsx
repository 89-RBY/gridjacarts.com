'use client';

import dynamic from 'next/dynamic';

const HeroC = dynamic(() => import('./HeroC'), {
  ssr: false,
  loading: () => null,
});

export default function HeroCLazy() {
  return <HeroC />;
}
