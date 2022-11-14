import React from "react";
import classes from "./Slider.module.css";
import Card from "../../../UI/Modal/Card/Card";
import UA from "../../../../assets/images/hbLogo.jpg";
// import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";

const SliderLanding = () => {
  return (
    <div>
      <div className={classes.topWrapper}>
        {/* <div className={classes.arrowL}>
          <ChevronLeftIcon />
        </div> */}
        <div className={classes.content}>
          <div className={classes.leftCard}>
            <h1 className={classes.leftMainText}>
              Save Money, <br />
              Earn Crypto, <br /> All While Shopping <br /> Your Favorite
              Brands!
            </h1>
            <p className={classes.leftPText}>
              Earn up to 10% cashback on certain brands, and soon actively earn
              % on liquidity pools!
            </p>
          </div>
          <Card className={classes.landingCard}>
            <img src={UA} alt="placeholder" className={classes.rightCard} />
          </Card>
        </div>
        {/* <div className={classes.arrowR}>
          <ChevronRightIcon />
        </div> */}
      </div>
    </div>
  );
};

export default SliderLanding;
