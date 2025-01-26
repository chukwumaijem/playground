'use client';

import { Contracts } from '~/components/Contracts';
import { Hero } from '~/components/Hero';

export default function Home() {
  return (
    <main className="flex w-full flex-col items-center py-5">
      <Hero />
      <Contracts />
    </main>
  );
}
