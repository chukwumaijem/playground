// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract ForgeTipJar {
    address payable owner;

    event TipReceived(address indexed sender, uint256 amount);
    event TipWithdrawn(address indexed sender, uint256 amount);

    constructor() {
        owner = payable(msg.sender);
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only owner can call this function");
        _;
    }

    function tip() public payable {
        require(msg.value > 0, "Amount must be greater than 0");

        emit TipReceived(msg.sender, msg.value);
    }

    function withdraw() public onlyOwner {
        uint256 balance = address(this).balance;
        require(balance > 0, "Tip jar is empty");

        payable(owner).transfer(balance);
        emit TipWithdrawn(owner, balance);
    }

    function getBalance() public view onlyOwner returns (uint256) {
        return address(this).balance;
    }
}
