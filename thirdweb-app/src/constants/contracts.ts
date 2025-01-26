import { getContract } from 'thirdweb';
import { defineChain } from 'thirdweb/chains';
import { client } from '~/lib/client';
import {
  CONTRACT_ADDRESS_CHUK_COIN_FLIP,
  CONTRACT_ADDRESS_CHUK_MESSAGE_BOARD,
  CONTRACT_ADDRESS_CHUK_PROFILE_STATUS,
  CONTRACT_ADDRESS_CHUK_TIP_JAR,
  CONTRACT_ADDRESS_ERC1155_NFT,
  CONTRACT_ADDRESS_ERC20_TOKEN,
  CONTRACT_ADDRESS_ERC721_NFT,
  CONTRACT_ADDRESS_ERC721_STAKING,
} from './address';

const data = [
  // pre-built contracts
  {
    address: CONTRACT_ADDRESS_ERC20_TOKEN,
    path: 'erc20-token',
  },
  {
    address: CONTRACT_ADDRESS_ERC721_NFT,
    path: 'erc721-nft',
  },
  {
    address: CONTRACT_ADDRESS_ERC721_STAKING,
    path: 'erc721-staking',
  },
  {
    address: CONTRACT_ADDRESS_ERC1155_NFT,
    path: 'erc1155-nft',
  },

  // custom contracts
  {
    address: CONTRACT_ADDRESS_CHUK_TIP_JAR,
    path: 'chuk-tip-jar',
  },
  {
    address: CONTRACT_ADDRESS_CHUK_COIN_FLIP,
    path: 'chuk-coin-flip',
  },
  {
    address: CONTRACT_ADDRESS_CHUK_MESSAGE_BOARD,
    path: 'chuk-message-board',
  },
  {
    address: CONTRACT_ADDRESS_CHUK_PROFILE_STATUS,
    path: 'chuk-profile-status',
  },
];
const chain = defineChain(2442);

export const preBuiltContracts = data.slice(0, 4).map((item) => {
  return {
    contract: getContract({
      address: item.address,
      chain,
      client,
    }),
    href: `/contracts/${item.path}`,
    path: item.path,
  };
});

export const customContracts = data.slice(4).map((item) => {
  return {
    contract: getContract({
      address: item.address,
      chain,
      client,
    }),
    href: `/contracts/${item.path}`,
    path: item.path,
  };
});
