// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract NFT is ERC721 {
    constructor() ERC721("AI Artwork", "AIN") {}

    function mint(address to, uint256 tokenId) external {
        _mint(to, tokenId);
    }
}