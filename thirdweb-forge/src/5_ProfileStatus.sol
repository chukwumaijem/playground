// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.13;

contract ForgeProfileStatus {
    struct Status {
        string status;
        bool exists;
    }

    mapping(address => Status) public statuses;
    event StatusCreated(address indexed user, string status);
    event StatusUpdated(address indexed user, string status);

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
}
