'use client';

import { ThirdwebContract } from 'thirdweb/contract';
import { getCurrencyMetadata } from 'thirdweb/extensions/erc20';
import { useReadContract } from 'thirdweb/react';

type TokenSymbolProps = {
  contract: ThirdwebContract;
};
export function TokenSymbol(props: TokenSymbolProps) {
  const { data: metadata } = useReadContract(getCurrencyMetadata, {
    contract: props.contract,
  });

  return <span>{metadata?.symbol}</span>;
}
