'use client';

import { ThirdwebContract } from 'thirdweb/contract';
import { getContractMetadata } from 'thirdweb/extensions/common';
import { MediaRenderer, useReadContract } from 'thirdweb/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '~/components/ui/card';
import { client } from '~/lib/client';
import { ContractHeroSkeleton } from './ContractHeroSkeleton';

type ContractHeroCardProps = {
  contract: ThirdwebContract;
};
export function ContractHeroCard(props: ContractHeroCardProps) {
  const { data: metadata, isLoading } = useReadContract(getContractMetadata, {
    contract: props.contract,
  });

  if (isLoading) {
    return <ContractHeroSkeleton />;
  }

  return (
    <Card className="group flex h-full w-full items-center overflow-hidden">
      <CardContent className="flex flex-col items-center justify-center !p-0">
        <MediaRenderer
          src={metadata?.image}
          client={client}
          className="transform transition-transform duration-300 group-hover:scale-[102%]"
        />
      </CardContent>

      <CardHeader className="flex h-full flex-grow flex-col !p-4">
        <CardTitle>{metadata?.name}</CardTitle>
        <CardDescription className="flex-grow">
          <p>{metadata?.description}</p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
}
