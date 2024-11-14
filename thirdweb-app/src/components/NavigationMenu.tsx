import Image from 'next/image';
import { ConnectButton } from 'thirdweb/react';
import { client } from '~/lib/client';

export function NavigationMenu() {
  return (
    <div className="flex items-center justify-between">
      <Image
        src="/logo.png"
        alt=""
        width={50}
        height={50}
      />

      <ConnectButton
        client={client}
        appMetadata={{
          name: 'Example App',
          url: 'https://example.com',
        }}
      />
    </div>
  );
}
