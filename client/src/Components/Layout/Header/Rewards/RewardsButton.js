import React from "react";
import classes from "./RewardsButton.module.css";

const RewardsButton = (props) => {
  

  return (
    <button className={classes.button} onClick = {props.onClick}>
    <span>Rewards</span>
    </button>
  );
};

export default RewardsButton;
