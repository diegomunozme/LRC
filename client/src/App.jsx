import React, { useState, useContext } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Header from "./Components/Layout/Header/Header";
import Body from "./Components/Layout/Body/Body";
import classes from "./App.module.css";
import Footer from "./Components/Layout/Footer/Footer";
import LoginPopUp from "./Components/Layout/LoginPopUp/LoginPopUp";
import RegisterModal from "./Components/Layout/RegisterModal/RegisterModal";
import Explore from "./Pages/Explore/Explore";
import Rewards from "./Pages/Rewards/Rewards";
import SearchPopUp from "./Components/Layout/SearchPopUp/SearchPopUp";
import ResetModal from "./Components/Layout/Header/Firebase-UI/ResetModal";

function App() {
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);
  const [search, setSearch] = useState(false);
  const [reset, setReset] = useState(false);
  const handleSetLogin = (e) => {
    e.preventDefault();
    setRegister(false);
    setReset(false);
    setLogin(true);
  };

  const handleSetRegister = (e) => {
    e.preventDefault();
    setLogin(false);
    setRegister(true);
  };

  const handleSetReset = (e) => {
    e.preventDefault();
    setLogin(false);
    setReset(true);
  };

  const resetModuleHandler = () => {
    setReset(false);
  };

  const loginModuleHandler = () => {
    setLogin(false);
  };

  const registerModuleHandler = () => {
    setRegister(false);
  };

  const handleSetSearch = (e) => {
    e.preventDefault();
    console.log("seachbartrial");
    setSearch(true);
  };
  const searchModuleHandler = () => {
    setSearch(false);
  };

  return (
    <div>
      <Router>
        {/* <Routes> */}
        {login && (
          <LoginPopUp
            loginModuleHandler={loginModuleHandler}
            handleSetRegister={handleSetRegister}
            handleSetReset={handleSetReset}
            resetModuleHandler={resetModuleHandler}
          />
        )}
        ;
        {register && (
          <RegisterModal
            handleSetLogin={handleSetLogin}
            registerModuleHandler={registerModuleHandler}
          />
        )}
        ;
        {reset && (
          <ResetModal
            handleSetLogin={handleSetLogin}
            resetModuleHandler={resetModuleHandler}
          />
        )}
        ;{search && <SearchPopUp searchModuleHandler={searchModuleHandler} />};
        <div className={classes.background}>
          <Header
            handleSetRegister={handleSetRegister}
            registerModuleHandler={registerModuleHandler}
            handleSetLogin={handleSetLogin}
            loginModuleHandler={loginModuleHandler}
            handleSetSearch={handleSetSearch}
            searchModuleHandler={searchModuleHandler}
          />

          <Routes>
            <Route path="/" element={<Body />} />
            <Route
              exact
              path="/Explore"
              element={
                <>
                  <Explore />
                </>
              }
            />
            <Route
              exact
              path="/Rewards"
              element={
                <>
                  <Rewards />
                </>
              }
            />
          </Routes>
          <Footer />
        </div>
        {/* </Routes> */}
      </Router>
    </div>
  );
}

export default App;
