import React from "react";
import classes from "./StakingCard.module.css";
import { Input, Button, Divider } from "@chakra-ui/react";
import ButtonSwitcher from "./ButtonSwitcher";
const StakingCard = (props) => {
  // The Stakeing Modal for this staking pool
  // things to go herep

  return (
    <div className={classes.stakingCard}>
      <div className={classes.cardContent}>
        <div>
          <h1 className={classes.cardHeader}>{props.cardHeader}</h1>
          <h2 className={classes.cardSubHeader}>{props.cardSubHeader}</h2>
        </div>
      </div>
      {/* tryign to add some functionality to show and hide components based off metamask login */}
      {props.signerAddress === undefined ? (
        <button onClick={props.connectAndLoad} className={classes.cardButton}>
          Connect To MetaMask
        </button>
      ) : (
        <>
          <div className={classes.stakingInputs}>
            <div className={classes.displayStaking}>
              <h1>Your Stake: {props.amount}</h1>
              <h1>Total Tokens Staked:{props.totalStaked} </h1>
            </div>
            {/* Not going to pass props in order to try and useContext hook */}
            <ButtonSwitcher {...props} />

            <Divider orientation="vertical" />
            <h1 style={{ display: "flex", padding: "1rem" }}>
              Reward Tokens Earned: {props.rewards}
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default StakingCard;
