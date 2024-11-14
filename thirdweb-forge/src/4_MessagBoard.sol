// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract ForgeMessageBoard {
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
}
