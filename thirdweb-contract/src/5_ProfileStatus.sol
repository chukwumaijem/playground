// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";

contract ForgeProfileStatus is ContractMetadata {
    address payable owner;

    struct Status {
        string status;
        bool exists;
    }

    mapping(address => Status) public statuses;
    event StatusCreated(address indexed user, string status);
    event StatusUpdated(address indexed user, string status);

    constructor() {
        owner = payable(msg.sender);
    }

    function createStatus(string memory status) public {
        require(statuses[msg.sender].exists == false, "Status already exists");

        statuses[msg.sender] = Status(status, true);
        emit StatusCreated(msg.sender, status);
    }

    function updateStatus(string memory status) public {
        require(statuses[msg.sender].exists == true, "Status does not exists");

        statuses[msg.sender].status = status;
        emit StatusUpdated(msg.sender, status);
    }

    function getStatus(address user) public view returns (string memory) {
        return statuses[user].status;
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
