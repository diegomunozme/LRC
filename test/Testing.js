const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staking", function () {
  beforeEach(async function () {
    [owner, signer2] = await ethers.getSigners();

    HBT = await ethers.getContractFactory("HashBackToken", signer2);
    hbt = await HBT.deploy();
    Staking = await ethers.getContractFactory("Staking", owner);
    staking = await Staking.deploy(hbt.address);
    const ownerBalance = await hbt.balanceOf(signer2.address);

    //IERC20 Approve Function
    await hbt
      .connect(signer2)
      .approve(staking.address, ethers.utils.parseEther("100"));
  });
  staking.connect(signer2).stakeTokens
  describe("deploy", function () {
    it("Should Set owner", async function () {
      expect(await staking.owner()).to.equal(owner.address);
    });
  });
  describe("StakeToken", function () {
    it("Transfers Tokens", async () => {
      const signerBalance = await hbt.balanceOf(signer2.address);
      console.log("SignerBalance: ", signerBalance);
      console.log("Ethers Parsed: ", ethers.utils.parseEther("4900"));
    });
  });
});
