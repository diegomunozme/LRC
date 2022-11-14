import React, { useState } from "react";
import classes from "./StakingCard.module.css";
import { Input, Button, Divider } from "@chakra-ui/react";
const StakingCard = (props) => {
  // The Stakeing Modal for this staking pool
  // things to go herep

  const handleChange = (event) => props.setAmount(event.target.value);
  const handleWithdrawl = (event) =>
    props.setWithdrawlAmount(event.target.value);
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
            <h1 style={{ fontSize: ".75", padding: "1rem", color: "#4D5358" }}>
              Your Stake: {props.amount}
            </h1>
            <div style={{ display: "flex", padding: "1rem" }}>
              <Input
                value={props.amount}
                onChange={handleChange}
                variant="outline"
                placeholder="HashBack Tokens"
                bg="transparent"
                focusBorderColor="green"
              />
              <Button
                bg="transparent"
                variant="outline"
                outline="green"
                onClick={() => props.stake()}
              >
                {" "}
                Stake
              </Button>
            </div>
          </div>
          <Divider />
          <div className={classes.displayRewards}>
            <h1 style={{ display: "flex", padding: "1rem" }}>
              Total Tokens Staked:{props.totalStaked}{" "}
            </h1>
            <div style={{ display: "flex", padding: "1rem" }}>
              <Input
                value={props.withdrawlAmount}
                onChange={handleWithdrawl}
                variant="outline"
                placeholder="HashBack Tokens"
                bg="transparent"
                focusBorderColor="green"
              />
              <Button
                bg="transparent"
                variant="outline"
                outline="green"
                onClick={() => props.withdraw()}
              >
                {" "}
                Withdraw
              </Button>
            </div>
            <Divider orientation="vertical" />
            <h1 style={{ display: "flex", padding: "1rem" }}>
              Total Tokens Earned To Date:
            </h1>
          </div>
        </>
      )}
    </div>
  );
};

export default StakingCard;
