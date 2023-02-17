// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";

contract NFT is ERC721URIStorage {
    using Counters for Counters.Counter;
    Counters.Counter public tokenId;

    constructor() ERC721("AI Artwork", "AIN") {}

    function mint(string memory baseUri) external returns (uint) {
        uint currentTokenId = tokenId.current();
        _mint(msg.sender, currentTokenId);
        tokenId.increment();
        _setTokenURI(currentTokenId, baseUri);
        return currentTokenId;
    }

    function tokenURI(uint256 _tokenId) public view virtual override returns (string memory) {
        return super.tokenURI(_tokenId);
    }
}