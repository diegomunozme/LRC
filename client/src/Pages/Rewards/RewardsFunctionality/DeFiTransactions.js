import { ethers } from "ethers";
import artifact from "../../../artifacts/contracts/HashbackToken.sol/HashBackToken.json";
let private_key =
  "ac0974bec39a17e36ba4a6b4d238ff944bacb478cbed5efcae784d7bf4f2ff80";
let gas_limit = "0x100000";
//
// let provider = new ethers.providers.Web3Provider(window.ethereum);
//the purpose of this script is to automatically send DeFi transactions from the owner address
export const send_token = (
  contract_address, // token I'm sending the HBT amount
  provider,
  send_token_amount,
  to_address,
  send_account
) => {
  let wallet = new ethers.Wallet(private_key);

  let walletSigner = wallet.connect(provider);

  provider.getGasPrice().then((currentGasPrice) => {
    let gas_price = ethers.utils.hexlify(parseInt(currentGasPrice));

    console.log(`gas_price: ${gas_price}`);

    if (contract_address) {
      // general token send

      let contract = new ethers.Contract(
        contract_address,

        artifact.abi,

        walletSigner
      );

      // How many tokens?

      let numberOfTokens = ethers.utils.parseUnits(send_token_amount, 18);

      console.log(`numberOfTokens: ${numberOfTokens}`);

      // Send tokens

      contract.transfer(to_address, numberOfTokens).then((transferResult) => {
        console.dir(transferResult);
      });
    } // ether send
  });
};
