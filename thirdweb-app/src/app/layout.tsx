import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import { ThirdwebProvider } from 'thirdweb/react';
import { NavigationMenu } from '~/components/NavigationMenu';
import { Separator } from '~/components/ui/separator';
import { cn } from '~/lib/utils';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Web3 App with thirdweb',
  description: 'Exploring the world of web3 with thirdweb and Next.js',
};

type RootLayoutProps = Readonly<{
  children: React.ReactNode;
}>;

export default function RootLayout(props: RootLayoutProps) {
  return (
    <html lang="en" className="dark">
      <body
        className={cn(
          'mx-auto flex h-full w-full max-w-7xl flex-col p-4 pb-5',
          inter.className,
        )}
      >
        <ThirdwebProvider>
          <NavigationMenu />
          <Separator className="mt-4" />

          {props.children}
        </ThirdwebProvider>
      </body>
    </html>
  );
}
