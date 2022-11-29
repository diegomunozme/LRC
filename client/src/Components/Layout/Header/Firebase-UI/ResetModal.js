import React from "react";
import Card from "../../../UI/Modal/Card/Card";
import classes from "./ResetModal.module.css";
import Reset from "../Firebase-UI/Reset";

const ResetModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.resetModuleHandler} />
      <Card className={classes.modal}>
        <div className={classes.content}>
          {/* Lets see what happens here */}
          <Reset handleSetLogin={props.handleSetLogin} />
        </div>
      </Card>
    </div>
  );
};

export default ResetModal;
