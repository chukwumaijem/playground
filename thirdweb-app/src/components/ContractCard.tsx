import Link from 'next/link';
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
import { ContractSkeleton } from './ContractSkeleton';

type ContractCardProps = {
  href: string;
  contract: ThirdwebContract;
};
export function ContractCard(props: ContractCardProps) {
  const { href, contract } = props;
  const { data: metadata, isLoading } = useReadContract(getContractMetadata, {
    contract,
  });

  if (isLoading) {
    return <ContractSkeleton />;
  }

  return (
    <Link href={href}>
      <Card className="group h-full w-full overflow-hidden">
        <CardContent className="flex flex-col items-center justify-center !p-0">
          <MediaRenderer
            src={metadata?.image}
            client={client}
            className="aspect-square h-full w-full transform transition-transform duration-300 group-hover:scale-[102%]"
          />
        </CardContent>

        <CardHeader className="flex h-full flex-grow flex-col justify-center border-t border-border !p-4">
          <CardTitle className="line-clamp-1">{metadata?.name}</CardTitle>
          <CardDescription className="flex-grow">
            <p className="line-clamp-2">{metadata?.description}</p>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
