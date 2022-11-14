import React, { useState } from "react";
import classes from "./Header.module.css";
import { ConnectToBChain } from "./ConnectToBChain";
import CButton from "./Explore/ExploreButton";
import RewardsButton from "./Rewards/RewardsButton";
import InputChakra from "../../UI/InputChakra/InputChakra";
import { Link } from "react-router-dom";
const Header = (props) => {
  return (
    <div>
      <div className={classes.container}>
        <div className={classes.header}>
          <div className={classes.left}>
            <div>
              <Link to="/">
                <h3 className={classes.title}>Hashback</h3>
              </Link>
            </div>
            <InputChakra onClick={props.handleSetSearch} />
          </div>
          {/* {login ? <LoginPopUp/> : null}; */}
          <div className={classes.right}>
            <Link to="/Rewards">
              <RewardsButton />
            </Link>
            <Link to="/Explore">
              <CButton />
            </Link>

            <ConnectToBChain
              handleSetRegister={props.handleSetRegister}
              onClick={props.handleSetLogin}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
