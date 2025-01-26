// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

import "@thirdweb-dev/contracts/extension/ContractMetadata.sol";

contract ForgeMessageBoard is ContractMetadata {
    address public owner;

    struct Message {
        address sender;
        string content;
        uint256 timestamp;
    }
    Message[] public messages;

    event MessageAdded(address indexed sender, string content);

    constructor() {
        owner = msg.sender;
    }

    function addMessage(string memory content) public {
        Message memory newMessage = Message({
            sender: msg.sender,
            content: content,
            timestamp: block.timestamp
        });
        messages.push(newMessage);

        emit MessageAdded(msg.sender, content);
    }

    function getMessagesCount() public view returns (uint256) {
        return messages.length;
    }

    function getMessage(uint256 index) public view returns (Message memory) {
        require(index < messages.length, "Message index out of bounds");
        return messages[index];
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
