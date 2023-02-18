// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/interfaces/IERC721"

contract marketplace {

    uint256 uuid;

    struct listing {
        uint id;
        address seller;
        address contractAddr;
        uint tokenId;
        uint price;
    };

    // list of all users who listed their tokens
    address[] public sellers;

    mapping (address => []uint) name;

    constructor() {
        listings = [];
    }

    // add listing
    function addListing(address contractAddr, uint tokenId, uint price) public isOwner(msg.sender, contractAddr, tokenId) isListed(contractAddr, tokenId) {
        listings.push(listing(uuid, msg.sender, contractAddr, tokenId, price));
    }

    // checks if the token is owned by the current contract
    modifer isOwner (address seller, address contractAddr, uint tokenId) {
        IERC721 token = IERC721(contractAddr);
        require(token.ownerOf(tokenId) == seller, "You didn't transfer the ownership of the token to the contract");
        _;
    }

    // check if the token is listed
    modifier isListed (uint ) {
        for (uint i = 0; i < listings.length; i++) {
            if (listings[i].contractAddr == contractAddr && listings[i].tokenId == tokenId) {
                revert("Token is already listed");
            }
        }
        _;
    }

}