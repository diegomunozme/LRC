import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../../../../firebase/firebase";
import classes from "./Reset.module.css";

const Reset = (props) => {
  const [email, setEmail] = useState("");
  // const [user, loading, error] = useAuthState(auth);

  return (
    <div className={classes.reset}>
      <div className={classes.reset__container}>
        Recovery Email
        <input
          type="text"
          className={classes.reset__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <button
          className={classes.reset__btn}
          onClick={() => sendPasswordReset(email)}
        >
          Send Reset Password Email
        </button>
        <div style={{ padding: "2ch" }}>Already Have An Account? </div>
        <button className={classes.reset__btn} onClick={props.handleSetLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Reset;
