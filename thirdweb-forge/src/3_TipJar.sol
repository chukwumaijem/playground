// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";

contract ForgeTipJar is ContractMetadata {
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
