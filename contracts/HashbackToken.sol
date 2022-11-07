pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract HashBackToken is ERC20 {
    //Sends all funds to user that deployed contract initially 
    constructor() ERC20("HashbackToken", "HBT") {
        _mint(msg.sender, 5000 * 10**18);
    }
}
