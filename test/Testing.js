const { expect } = require("chai");
const { ethers } = require("hardhat");

describe("Staking", function () {
  beforeEach(async function () {
    [owner, signer2, signer3, signer4, signer5] = await ethers.getSigners();
    usersArray = [signer3.address, signer4.address, signer5.address];

    const HBT = await ethers.getContractFactory("HashBackToken", owner);
    hbt = await HBT.deploy();
    const Staking = await ethers.getContractFactory("Staking", owner);
    // console.log(Staking);
    staking = await Staking.deploy(hbt.address);
    const ownerBalance = await hbt.balanceOf(owner.address);
    //make sure tsupply is sent to signert 2
    expect(await hbt.totalSupply()).to.equal(ownerBalance);

    //Approve other us
    // Transfer 50 tokens from owner to addr1
    await hbt.connect(owner).transfer(signer3.address, 50);
    await hbt.connect(owner).transfer(signer2.address, 500);
    expect(await hbt.balanceOf(signer3.address)).to.equal(50);
    //Hashback address
    console.log("Hashback Address: ", await hbt.address);
    console.log("Signer2 Balance: ", await hbt.balanceOf(signer2.address));
    console.log("Owner Balance: ", await hbt.balanceOf(owner.address));
    console.log("HB BALANCE: ", await hbt.balanceOf(signer3.address));

    await hbt.connect(signer2).approve(staking.address, 100);

    await staking.connect(signer2).stake(100);

    console.log("balance after staking", await hbt.balanceOf(signer2.address));
  });
  describe("Staking functionality", () => {
    it("Checks staking functionality", async () => {
      //dont really know what this is yet
      const provider = waffle.provider;
      //Make sure contract 3 can be accepted as depositer of ERC20 coins
      const signerBalance = await hbt.balanceOf(signer3.address);
      //Ensure balance is >0
      expect(signerBalance).to.equal(50);

      //ERC20 function approve is to make sure only approved users can deposit coins into our app
      //So in essense we're allowing the staking contract to spend 100 of our tokens
      await hbt.connect(signer3).approve(staking.address, 40);
      const transaction = await staking.connect(signer3).stake(40);
      const receipt = await transaction.wait();
      const staked = await staking.balanceOf(signer3.address);
      console.log("total staked by account 3: ", staked);

      const signerBalancePostStake = await hbt.balanceOf(signer3.address);

      expect(signerBalancePostStake).to.equal(10);

      //Set the Duration for holding the coin
      await staking.setRewardsDuration(100);
      const earned = await staking.earned(signer3.address);

      await staking.connect(signer3).withdraw(5);
      console.log(
        "Tokens staked after withdrawing",
        await hbt.balanceOf(signer3.address)
      );
    });
  });
  it("Position Functionality", async () => {
    console.log("Signer 5 balance", await hbt.balanceOf(usersArray[0]));
    // await staking.sendSameValue(usersArray, 1);
    hbt.connect(owner).approve(staking.address, 100);
    await staking.multiSendSameValue(usersArray, 1);
    console.log(
      "Signer5 Balance after multi transfer",
      await hbt.balanceOf(signer5.address)
    );
  });
});
