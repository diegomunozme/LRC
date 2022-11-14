import React from "react";
import Card from "../../UI/Modal/Card/Card";
import classes from "./LoginPopUp.module.css";
// import FirebaseApp from "../Header/Firebase-UI/FirebaseApp";
import Login from "../Header/Firebase-UI/Login";

const LoginPopUp = (props) => {
  return (
    <div>
      <div className={classes.backdrop} onClick={props.loginModuleHandler} />
      <Card className={classes.modal}>
        <div className={classes.content}>
          {/* Lets see what happens here */}
          <Login handleSetRegister={props.handleSetRegister} />
        </div>
      </Card>
    </div>
  );
};

export default LoginPopUp;
