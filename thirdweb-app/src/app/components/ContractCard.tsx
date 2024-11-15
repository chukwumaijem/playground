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

type ContractCardProps = {
  href: string;
  contract: ThirdwebContract;
};
export function ContractCard(props: ContractCardProps) {
  const { href, contract } = props;
  const { data: metadata } = useReadContract(getContractMetadata, {
    contract,
  });

  return (
    <Link href={href}>
      <Card className="group w-full overflow-hidden">
        <CardContent className="flex flex-col items-center justify-center !p-0">
          <MediaRenderer
            src={metadata?.image}
            client={client}
            className="h-full w-full transform transition-transform duration-300 group-hover:scale-[102%]"
          />
        </CardContent>
        <CardHeader className="flex h-full flex-col justify-center border-t border-border !p-4">
          <CardTitle>{metadata?.name}</CardTitle>
          <CardDescription>{metadata?.description}</CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}
