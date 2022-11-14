import React from "react";

import classes from "./ConnectToBChain.module.css";

const ConnectToBChain = (props) => {
  return (
    <button
      className={classes.button}
      handleSetRegister={props.handleSetRegister}
      onClick={props.onClick}
    >
      <span>Connect</span>
    </button>
  );
};

export { ConnectToBChain };
