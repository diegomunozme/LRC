import { BigNumber, ethers } from "ethers";
import artifact from "../../artifacts/contracts/Staking.sol/Staking.json";
import React, { useState, useEffect } from "react";
import classes from "./RewardsStaking.module.css";
import StakingCard from "./StakingCard";
import StakingInfo from "./StakingInfo";
import hbtArtifact from "../../artifacts/contracts/HashbackToken.sol/HashBackToken.json";
const CONTRACT_ADDRESS = "0x3582490D34452132B0Ae35aC79f86157b90a8C71";
const HBT_ADDRESS = "0xFa203f93dF38A4d01cBf510c1CD3935e56933590";
// const ownerAddress = "0xf39Fd6e51aad88F6F4ce6aB8827279cffFb92266";
const RewardsStaking = () => {
  // general
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [hbtContract, sethbtContract] = useState(undefined);

  // staking
  const [amount, setAmount] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [allTokens, setAllTokens] = useState(0);
  const [withdrawAmount, setWithdrawlAmount] = useState(0);
  const [rewards, setRewards] = useState(0);

  useEffect(() => {
    const onLoad = async () => {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const contract = new ethers.Contract(
        CONTRACT_ADDRESS,
        artifact.abi,
        provider
      );
      setContract(contract);

      const hbtContract = new ethers.Contract(
        HBT_ADDRESS,
        hbtArtifact.abi,
        provider
      );
      sethbtContract(hbtContract);
      console.log("USe Effect Contract", contract);
    };
    onLoad();
  }, []);

  const isConnected = () => signer !== undefined;

  const getSigner = async () => {
    const signer = provider.getSigner();
    setSigner(signer);
    return signer;
  };

  const connectAndLoad = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    await provider.send("eth_requestAccounts", []);

    const signer = await getSigner(provider);
    setSigner(signer);

    //Signer Information
    const signerAddress = await signer.getAddress();
    setSignerAddress(signerAddress);
    console.log("SIGNER ADDRESS :", signerAddress);
    console.log("provider: ", provider);
    console.log("signer: ", signer);
    console.log("contract: ", contract);

    // Current Staking
    const bn = await contract.balanceOf(signerAddress);
    console.log("hex: ", ethers.BigNumber.from(bn));
    console.log(ethers.utils.arrayify(bn._hex)[0]);
    console.log("This will now be total Staked: ", bn.toString());
    setTotalStaked(bn.toString());

    //Sending the rewards earned by the users
    // const re = await contract.connect(signer).getReward(); //getting the reward accumulated so far
    // console.log("Earned Rewards", re);

    const rew = await contract.earned(signerAddress);
    console.log("rewards: ", rew);
    setRewards("trial".toString());
  };

  const stake = async () => {
    await hbtContract.connect(signer).approve(contract.address, amount);
    contract.connect(signer).stake(amount);
    console.log("Amount Being Staked: ", amount);
    console.log("Signer Address", signer.address);
    setAmount(0);
  };

  const unStakeAll = () => {
    setWithdrawlAmount(totalStaked);
  };

  const withdraw = async () => {
    await contract.connect(signer).withdraw(withdrawAmount);
    setWithdrawlAmount(0);
  };

  return (
    <div className={classes.componentFormatting}>
      <div className={classes.stakingLayout}>
        <StakingCard
          totalStaked={totalStaked}
          withdraw={withdraw}
          setWithdrawlAmount={setWithdrawlAmount}
          withdrawlAmount={withdrawAmount}
          amount={amount}
          setAmount={setAmount}
          stake={stake}
          cardHeader="Stake Hashback"
          cardSubHeader="Earn HBT and gain WETH on affiliate earnings"
          connectAndLoad={connectAndLoad}
          signerAddress={signerAddress}
          unStakeAll={unStakeAll}
          rewards={rewards}
        />
        <StakingInfo />
      </div>
    </div>
  );
};

export default RewardsStaking;
