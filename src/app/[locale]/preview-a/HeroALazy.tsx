'use client';

import dynamic from 'next/dynamic';

const HeroA = dynamic(() => import('./HeroA'), {
  ssr: false,
  loading: () => null,
});

export default function HeroALazy() {
  return <HeroA />;
}
