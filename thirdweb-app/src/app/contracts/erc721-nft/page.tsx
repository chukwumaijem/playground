import { ContractHeroCard } from '~/components/ContractHeroCard';
import { preBuiltContracts } from '~/constants/contracts';
import { ClaimNFT } from './components/ClaimNFT';

const contract = preBuiltContracts[1].contract;
export default function ERC721NFT() {
  return (
    <div className="flex w-full flex-col justify-center p-5 md:p-16">
      <ContractHeroCard contract={contract} />

      <div className="mt-5 grid w-full grid-cols-1 justify-center gap-4 md:grid-cols-3">
        <ClaimNFT contract={contract} />
      </div>
    </div>
  );
}
