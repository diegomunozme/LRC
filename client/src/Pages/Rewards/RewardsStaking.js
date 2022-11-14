import { ethers } from "ethers";
import artifact from "../../artifacts/contracts/Staking.sol/Staking.json";
import React, { useState, useEffect } from "react";
import classes from "./RewardsStaking.module.css";
import StakingCard from "./StakingCard";
import StakingInfo from "./StakingInfo";
import hbtArtifact from "../../artifacts/contracts/HashbackToken.sol/HashBackToken.json";
// StakingContract deployed to:  0x0C0b19086233BFD91bf67Db62D4B4B8419F41C1a 
// Owner address:  0x08d8c5330D68e7c2E25B0252a30a5B6024b0a6e5 
// HashbackToken:  0xD1227eEf8cA2d93Fde35df86408D6D8F66730393
const CONTRACT_ADDRESS = "0x0C0b19086233BFD91bf67Db62D4B4B8419F41C1a";
const HBT_ADDRESS = "0xD1227eEf8cA2d93Fde35df86408D6D8F66730393";
const ownerAddress = "0x08d8c5330D68e7c2E25B0252a30a5B6024b0a6e5";
const RewardsStaking = () => {
  // general
  const [provider, setProvider] = useState(undefined);
  const [signer, setSigner] = useState(undefined);
  const [contract, setContract] = useState(undefined);
  const [signerAddress, setSignerAddress] = useState(undefined);
  const [hbtContract, sethbtContract] = useState(undefined);

  // assets
  const [assetIds, setAssetIds] = useState([]);
  const [assets, setAssets] = useState([]);

  // staking
  const [amount, setAmount] = useState(0);
  const [totalStaked, setTotalStaked] = useState(0);
  const [withdrawAmount, setWithdrawlAmount] = useState(0);
  useEffect(() => {
    const onLoad = async () => {
      const provider = await new ethers.providers.Web3Provider(window.ethereum);
      setProvider(provider);

      const contract = await new ethers.Contract(
        CONTRACT_ADDRESS,
        artifact.abi
      );
      setContract(contract);

      const hbtContract = await new ethers.Contract(
        HBT_ADDRESS,
        hbtArtifact.abi,
        provider
      );
      sethbtContract(hbtContract);

      await hbtContract.balanceOf(signerAddress);
      setTotalStaked(await hbtContract.balanceOf(signerAddress));
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

    const signerAddress = await signer.getAddress();
    setSignerAddress(signerAddress);
    console.log("SIGNER ADDRESS :", signerAddress);
  };

  const stake = async () => {
    await hbtContract.connect(signer).approve(contract.address, amount);
    contract.connect(signer).stake(amount);
    setAmount(0);
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
        />
        <StakingInfo />
      </div>
    </div>
  );
};

export default RewardsStaking;
