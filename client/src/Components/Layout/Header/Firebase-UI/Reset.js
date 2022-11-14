import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { auth, sendPasswordReset } from "../../../../firebase/firebase";
import classes from "./Reset.module.css";

const Reset = () => {
  const [email, setEmail] = useState("");
  const [user, loading, error] = useAuthState(auth);
  const navigate = useNavigate();

  useEffect(() => {
    if (loading) return;
    if (user) navigate("/dashboard");
  }, [user, loading]);

  return (
    <div className={classes.reset}>
      <div className={classes.reset__conatiner}>
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
          Send email to reset password
        </button>
        <div>
          Don't have an account?? <Link to="/register"> Register</Link>
        </div>
      </div>
    </div>
  );
};

export default Reset;