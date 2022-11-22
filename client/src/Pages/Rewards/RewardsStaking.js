import { BigNumber, ethers } from "ethers";
import artifact from "../../artifacts/contracts/Staking.sol/Staking.json";
import React, { useState, useEffect } from "react";
import classes from "./RewardsStaking.module.css";
import StakingCard from "./StakingCard";
import StakingInfo from "./StakingInfo";
import hbtArtifact from "../../artifacts/contracts/HashbackToken.sol/HashBackToken.json";
const CONTRACT_ADDRESS = "0x5E037600Ed03235539E4E3951A9eBc2a40edD6A3";
const HBT_ADDRESS = "0x035C5e1BD224894364e11Aa71282dfC632D928F3";
const ownerAddress = "0x08d8c5330D68e7c2E25B0252a30a5B6024b0a6e5";
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

    //Getting the rewards earned by the users
    // const re = await contract.connect(signer).getReward(); //getting the reward accumulated so far
    // console.log("Earned Rewards", re);

    const rew = await contract.earned(signerAddress);
    console.log("rewards: ", rew);
    setRewards(rew.toString());

    //Working to display total transactions via ethers to avoid storing duplicate data
    // let etherscanProvider = new ethers.providers.EtherscanProvider();
    // etherscanProvider.getHistory(ownerAddress).then((history) => {
    //   history.forEach((tx, index) => {
    //     console.log(
    //       `Transaction Amount: `,
    //       ethers.utils.arrayify(tx.value._hex)[0],
    //       ` Entire Obj Position: ${index}`,
    //       tx
    //     );
    //   });
    // });
  };

  const stake = async () => {
    await hbtContract.connect(signer).approve(contract.address, amount);
    contract.connect(signer).stake(amount);
    console.log("Signer Address", signer.address);
    setAmount(0);
  };

  const unStakeAll = async () => {
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
