const { ethers } = require("hardhat");

async function main() {
  /* for this contract, we're writing deploy functionality and 
    seeding it with test ether in order to have ether accrued once we deploy it on the hardhat test net

    IN ORDER TO DEPLOY:
    npx hardhat node // to initialize the local ethereum network
    npx hardhat run --network localhost scripts/deploy.js // run this in a new console window
    */
  [owner] = await ethers.getSigners();

  HBT = await ethers.getContractFactory("HashBackToken", owner);
  hbt = await HBT.deploy();
  Staking = await ethers.getContractFactory("Staking", owner);
  staking = await Staking.deploy(hbt.address);

  console.log(
    "StakingContract deployed to: ",
    staking.address,
    "Owner address: ",
    owner.address,
    "HashbackToken: ",
    hbt.address
  );

  await hbt.connect(owner).approve(staking.address, ethers.utils.parseEther("1"));
  await staking.connect(owner).stake(ethers.utils.parseEther("1"));
  const provider = waffle.provider;
  const block = await provider.getBlock();
  const newCreatedDate = block.timestamp - 86400 * 365;
//   await staking.connect(hashbackAddress).modifyCreatedDate(1, newCreatedDate);
//   await staking.connect(hashbackAddress).modifyCreatedDate(2, newCreatedDate);
//   await staking.connect(hashbackAddress).modifyCreatedDate(3, newCreatedDate);
}

main()
  .then(() => process.exit(0))
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
