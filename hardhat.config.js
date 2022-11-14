/** @type import('hardhat/config').HardhatUserConfig */
require("@nomiclabs/hardhat-waffle");
require("@nomicfoundation/hardhat-toolbox");

const ALCHEMY_API_KEY = "-S0QjiRRqIb62ksQWQ-oNhqAQVeY2Lie";

const GOERLI_PRIVATE_KEY = "63ddf53c3bac455897d065fe1ca7d3fa32eca463394166903838f66e4f14f6bd"
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
