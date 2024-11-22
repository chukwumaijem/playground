'use client';

import Link from 'next/link';
import { Button } from '~/components/ui/button';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { preBuiltContracts } from '~/constants/contracts';

const stakingLink = preBuiltContracts[2].href;
export function EarnTokens() {
  return (
    <Card className="group h-full w-full">
      <CardHeader className="flex h-full flex-grow flex-col justify-center border-t border-border !p-4">
        <CardTitle className="line-clamp-1">Earn Tokens</CardTitle>
        <CardDescription className="flex-grow">
          Earn more tokens by staking an ERC721 NFT
        </CardDescription>
        <div className="flex w-full flex-wrap gap-2">
          <Link href={stakingLink}>
            <Button variant="secondary">Stake NFT</Button>
          </Link>
          <Link href={stakingLink}>
            <Button variant="secondary">Claim NFT</Button>
          </Link>
        </div>
      </CardHeader>
    </Card>
  );
}
