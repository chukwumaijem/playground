'use client';

import { Contracts } from '~/components/Contracts';
import { Hero } from '~/components/Hero';

export default function Home() {
  return (
    <main className="container">
      <Hero />
      <Contracts />
    </main>
  );
}
