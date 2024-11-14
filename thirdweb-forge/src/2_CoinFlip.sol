// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";

contract ForgeCoinFlip is ContractMetadata {
    address payable owner;

    enum CoinSide {
        Heads,
        Tails
    }
    enum FlipResult {
        WIN,
        LOSE
    }

    event CoinFlipResult(
        address indexed player,
        CoinSide choice,
        FlipResult result
    );

    constructor() {
        owner = payable(msg.sender);
    }

    function flip(uint256 choice) public {
        require(choice == 0 || choice == 1, "Invalid coin side");

        uint256 randomNumber = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender))
        );
        uint256 systemChoice = randomNumber % 2;
        FlipResult flipResult = (choice == systemChoice)
            ? FlipResult.WIN
            : FlipResult.LOSE;

        emit CoinFlipResult(msg.sender, CoinSide(choice), flipResult);
    }

    /**
     *  This function returns who is authorized to set the metadata for your metadata.
     *
     *  As an EXAMPLE, we'll only allow the contract deployer to set the contract's metadata.
     *
     *  You MUST complete the body of this function to use the `ContractMetadata` extension.
     */
    function _canSetContractURI()
        internal
        view
        virtual
        override
        returns (bool)
    {
        return msg.sender == owner;
    }
}
