import React from "react";
import Card from "../../UI/Modal/Card/Card";
import classes from "./RegisterModal.module.css";
import Register from "../Header/Firebase-UI/Register";



const RegisterModal = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.registerModuleHandler} />
      <Card className={classes.modal}>
        <div className={classes.content}>
          {/* Lets see what happens here */}
          <Register handleSetLogin={props.handleSetLogin} />
        </div>
      </Card>
    </div>
  );
};

export default RegisterModal;
