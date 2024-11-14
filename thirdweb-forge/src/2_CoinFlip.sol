// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract ForgeCoinFlip {
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
}
