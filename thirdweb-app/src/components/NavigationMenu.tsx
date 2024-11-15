import Image from 'next/image';
import Link from 'next/link';
import { ConnectButton } from 'thirdweb/react';
import { client } from '~/lib/client';

export function NavigationMenu() {
  return (
    <div className="flex items-center justify-between">
      <Link href="/">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="" width={50} height={50} />
          <p className="text-2xl font-semibold">My Contracts</p>
        </div>
      </Link>

      <ConnectButton client={client} />
    </div>
  );
}
