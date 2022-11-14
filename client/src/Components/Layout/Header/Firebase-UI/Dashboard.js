import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";
import classes from "./Dashboard.module.css";
import { auth, db, logout } from "../../../../firebase/firebase";
import { query, collection, getDocs, where } from "firebase/firestore";

const Dashboard = () => {
  const [user, loading, error] = useAuthState(auth);
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const fetchUserName = async () => {
    try {
      const q = query(collection(db, "users"), where("uid", "==", user?.uid));
      const doc = await getDocs(q);
      const data = doc.docs[0].data();
      setName(data.name);
    } catch (err) {
      console.log(err);
      alert("An error occurred while fetching the data");
    }
  };
  useEffect(() => {
    if (loading) return;
    if (!user) return navigate("/");
    fetchUserName();
  }, [user, loading]);
  return (
    <div className={classes.dashboard}>
      <div className={classes.dashboard__container}>
        Loggin in as
        <div>{name}</div>
        <div>{user?.email}</div>
        <button className={classes.dashboard__btn} onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};
export default Dashboard;