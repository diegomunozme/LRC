import React, { useEffect, useState } from "react";

import { ethers, providers } from "ethers";

import { ReactComponent as BlockchainSVG } from "../../assets/images/trial.svg";
import classes from "./Rewards.module.css";
import RewardsStaking from "./RewardsStaking";
import RegisterForAirdrop from "../../Components/Layout/RegisterForAirdrop/RegisterForAirdrop";

const Rewards = () => {
  const [blockchain, setBlockchain] = useState(false);
  //   //Logic for displaying Modules
  const handleSetBlockchain = (e) => {
    e.preventDefault();
    setBlockchain(true);
  };

  const registerModuleHandler = () => {
    setBlockchain(false);
  };

  return (
    <div className={classes.rewardsWrapper}>
      {blockchain && (
        <RegisterForAirdrop registerModuleHandler={registerModuleHandler} />
      )}
      ;
      <div className={classes.contentTop}>
        <div>
          <h2>Stake Hashback Tokens,</h2>
          <h2>Earn Rewards Up To</h2>
          <h2 className={classes.text}>250% APY</h2>
          <div className={classes.buyLooksButton} onClick={handleSetBlockchain}>
            Register for HBT Airdrop
          </div>
        </div>
        <BlockchainSVG />
      </div>
      <RewardsStaking />
    </div>
  );
};
export default Rewards;
