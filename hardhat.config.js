/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
//Pull this fron the Alchemy front endhbtContract.connect(signer).approve(contract.address, amount)
const ALCHEMY_API_KEY = "hz6pTpHKaJ-upJmujEaLyRjIMo0jM6qS";

//This is from meta mask and go to Account Details > Export Private Key
// Beware: NEVER put real Ether into testing accounts
const GOERLI_PRIVATE_KEY =
  "63ddf53c3bac455897d065fe1ca7d3fa32eca463394166903838f66e4f14f6bd";
module.exports = {
  solidity: {
    version: "0.8.0",
  },
  paths: {
    artifacts: "./client/src/artifacts",
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY],
    },
  },
};
