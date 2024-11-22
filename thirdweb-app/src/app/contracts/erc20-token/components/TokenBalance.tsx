'use client';

import { prepareContractCall, toEther, toWei } from 'thirdweb';
import { ThirdwebContract } from 'thirdweb/contract';
import { balanceOf } from 'thirdweb/extensions/erc20';
import {
  TransactionButton,
  useActiveAccount,
  useReadContract,
} from 'thirdweb/react';
import { TokenSymbol } from '~/components/TokenSymbol';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { Skeleton } from '~/components/ui/skeleton';

type TokenBalanceProps = {
  contract: ThirdwebContract;
};
export function TokenBalance(props: TokenBalanceProps) {
  const address = useActiveAccount()?.address;
  const { data: tokens, isPending } = useReadContract(balanceOf, {
    contract: props.contract,
    address: address || '',
  });
  const transaction = () =>
    prepareContractCall({
      contract: props.contract,
      method: 'function burn(uint256 amount)',
      params: [toWei('10')],
    });

  return (
    <Card className="group h-full w-full overflow-hidden">
      <CardHeader className="flex h-full flex-grow flex-col justify-center border-t border-border !p-4">
        <CardTitle className="line-clamp-1">Your Balance</CardTitle>
        {!address && <p>Connect your wallet to see your balance</p>}

        {address && isPending && <Skeleton className="h-4 w-full" />}

        {address && !isPending && tokens && (
          <CardDescription className="flex-grow">
            <p className="mb-5">
              <strong>Balance:</strong> {toEther(tokens)}{' '}
              <TokenSymbol contract={props.contract} />
            </p>

            <TransactionButton transaction={transaction}>
              Burn 10 Tokens
            </TransactionButton>
          </CardDescription>
        )}
      </CardHeader>
    </Card>
  );
}
