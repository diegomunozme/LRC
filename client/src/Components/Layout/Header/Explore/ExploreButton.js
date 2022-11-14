import React from "react";
import classes from "./ExploreButton.module.css";

const CButton = (props) => {
  const handleClick = () => {
    console.log("trial");
  };
  return (
    <div>
      <button className={classes.button} onClick={handleClick}>
        <span>Explore</span>
      </button>
    </div>
  );
};

export default CButton;
