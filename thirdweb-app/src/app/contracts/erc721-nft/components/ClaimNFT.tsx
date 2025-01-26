'use client';

import { Fragment } from 'react';
import { toWei } from 'thirdweb';
import { ethereum } from 'thirdweb/chains';
import { ThirdwebContract } from 'thirdweb/contract';
import { totalSupply } from 'thirdweb/extensions/erc20';
import { ClaimButton, useActiveAccount, useReadContract } from 'thirdweb/react';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';
import { client } from '~/lib/client';
import { chain } from '~/constants/contracts';

type ClaimNFTProps = {
  contract: ThirdwebContract;
};
export function ClaimNFT(props: ClaimNFTProps) {
  const address = useActiveAccount()?.address ?? '';
  const { data: tokens, isPending } = useReadContract(totalSupply, {
    contract: props.contract,
  });

  return (
    <Card className="group h-full w-full overflow-hidden">
      <CardHeader className="flex h-full flex-grow flex-col justify-center border-t border-border !p-4">
        <CardTitle className="line-clamp-1">Claim NFT</CardTitle>

        {!address && isPending && (
          <Fragment>
            <Skeleton className="my-3 h-4 w-full" />
            <Skeleton className="h-8 w-full" />
          </Fragment>
        )}

        {!address && !isPending && <p>Connect your wallet to claim an NFT</p>}

        {address && !isPending && tokens && (
          <CardDescription className="flex-grow">
            <p className="my-3">Claim an ERC721 NFT for free</p>
            <ClaimButton
              contractAddress={props.contract.address}
              chain={chain}
              client={client}
              claimParams={{ type: 'ERC721', quantity: toWei('1') }}
            >
              Claim now
            </ClaimButton>
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}
