import { ContractHeroCard } from '~/components/ContractHeroCard';
import { preBuiltContracts } from '~/constants/contracts';
import { EarnTokens } from './components/EarnTokens';
import { TokenBalance } from './components/TokenBalance';
import { TokenStats } from './components/TokenStats';

const contract = preBuiltContracts[0].contract;
export default function ERC20Token() {
  return (
    <div className="flex w-full flex-col justify-center p-5 md:p-16">
      <ContractHeroCard contract={contract} />

      <div className="mt-5 grid w-full grid-cols-1 justify-center gap-4 md:grid-cols-3">
        <TokenStats contract={contract} />
        <TokenBalance contract={contract} />
        <EarnTokens />
      </div>
    </div>
  );
}
