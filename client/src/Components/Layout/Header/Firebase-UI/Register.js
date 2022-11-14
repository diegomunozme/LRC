import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { Link, useNavigate } from "react-router-dom";
import {
  auth,
  registerWithEmailAndPassword,
  signInWithGoogle,
} from "../../../../firebase/firebase";

import classes from "./Register.module.css";
import googleLogo from "../../../../assets/images/googleLogo.jpg";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  const register = () => {
    if (!name) alert("Please Enter Name");
    registerWithEmailAndPassword(name, email, password);
  };
  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className={classes.register}>
      <div className={classes.register__container}>
        <header className={classes.header}>
          <h2>Register Today</h2>
        </header>
        <div className={classes.loginRegisterName}>Full Name</div>
        <input
          type="text"
          className={classes.register__textBox}
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Full Name"
        />
        <div className={classes.loginRegisterEmail}>Email Address</div>
        <input
          type="text"
          className={classes.register__textBox}
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="E-mail Address"
        />
        <div className={classes.loginRegisterPassword}>Password</div>
        <input
          type="text"
          className={classes.register__textBox}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
        <button className={classes.register__btn} onClick={register}>
          {" "}
          Register
        </button>
        <div className={classes.seperator}></div>
        <button className={classes.register__google} onClick={signInWithGoogle}>
          <div>
            <img
              src={googleLogo}
              alt="placeholder"
              style={{ display: "inline" }}
            />
            Register with Google
          </div>
        </button>
        <div>
          Already Have an Account?
          <div className={classes.loginLink}>
            <u onClick={props.handleSetLogin}>Login</u>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
