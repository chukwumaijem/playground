'use client';

import { toEther } from 'thirdweb';
import { ThirdwebContract } from 'thirdweb/contract';
import { totalSupply } from 'thirdweb/extensions/erc20';
import { useReadContract } from 'thirdweb/react';
import { TokenSymbol } from '~/components/TokenSymbol';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';

type TokenStatsProps = {
  contract: ThirdwebContract;
};
export function TokenStats(props: TokenStatsProps) {
  const { data: tokens, isPending } = useReadContract(totalSupply, {
    contract: props.contract,
  });

  return (
    <Card className="group h-full w-full overflow-hidden">
      <CardHeader className="flex h-full flex-grow flex-col justify-center border-t border-border !p-4">
        <CardTitle className="line-clamp-1">Token Stats</CardTitle>
        {isPending && <Skeleton className="h-4 w-full" />}

        {!isPending && tokens && (
          <CardDescription className="flex-grow">
            <p className="line-clamp-2">
              <strong>Total Supply:</strong> {toEther(tokens)}{' '}
              <TokenSymbol contract={props.contract} />
            </p>
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}
