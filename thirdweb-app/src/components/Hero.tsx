import Link from 'next/link';

export function Hero() {
  return (
    <div className="py-5 sm:py-16">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h1 className="text-balance text-3xl font-semibold tracking-tight md:text-5xl">
            Web3 App with{' '}
            <Link
              href="https://thirdweb.com/"
              className="text-gray-500 underline"
            >
              thirdweb
            </Link>
          </h1>
          <p className="mt-8 text-pretty font-medium sm:text-lg">
            Exploring the world of web3 with thirdweb and Next.js.
          </p>
        </div>
      </div>
    </div>
  );
}
