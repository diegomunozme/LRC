import React from "react";
import classes from "./StakingInfo.module.css";
const StakingInfo = () => {
  return (
    <div className={classes.containerStyle}>
      <div className={classes.inlineStyle}>
        <div className={classes.informationStyle}>
          <div className={classes.informationStyleTwo}>
            <h1 className={classes.header}>Staking Rewards</h1>
            <p className={classes.paragraph}>
              <span className={classes.paragraphTitle}>
                HashBack Compounder:
              </span>{" "}
              Earn up to 256% APY on HBT and earn WETH through airdrops 
            </p>
            <p className={classes.learnMore}>
            Learn More
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StakingInfo;
