import React from "react";
import classes from "./Footer.module.css";

const Footer = () => {
  return (
    <div className={classes.container}>
      <div>
        <h1>HashbackLLC</h1>
        <h1>About</h1>
      </div>
      <h1>Twitter</h1>
      <h1>LinkedIn</h1>
    </div>
  );
};

export default Footer;
