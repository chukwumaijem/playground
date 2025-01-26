import { ContractHeroCard } from '~/components/ContractHeroCard';
import { preBuiltContracts } from '~/constants/contracts';

const contract = preBuiltContracts[3].contract;
export default function ERC1155NFT() {
  return (
    <div className="flex w-full flex-col justify-center p-5 md:p-16">
      <ContractHeroCard contract={contract} />

      <div className="mt-5 grid w-full grid-cols-1 justify-center gap-4 md:grid-cols-3">
        Contract Showcase
      </div>
    </div>
  );
}
