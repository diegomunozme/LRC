import React, { useState } from "react";
import Card from "../../UI/Modal/Card/Card";
import classes from "./RegisterForAirdrop.module.css";
import { Input, Button, Divider, Spinner } from "@chakra-ui/react";
import { registerForAirdrop } from "../../../firebase/firebase";
import { add } from "lodash";
const AirdropRegister = (props) => {
  const [address, setAddress] = useState("");
  const [progress, setProgress] = useState(0);
  const [spin, setSpinner] = useState(false);
  const addressChangeHandler = (e) => {
    setAddress(e.target.value);
  };

  const airdropClearance = () => {
    setAddress("");
  };

  const handleSetSpinner = () => {
    setSpinner(true);
    console.log("setSpinnertoTrue");
  };

  const spinnerModuleHandler = () => {
    setSpinner(false);
  };

  return (
    <div>
      <div className={classes.backdrop} onClick={props.registerModuleHandler} />
      <Card className={classes.modal}>
        {spin && <Spinner />}
        <div className={classes.content}>
          {/* Lets see what happens here */}
          <h1 style={{ padding: "1rem", fontWeight: "bold" }}>
            Enter Ethereum Wallet and be a part of our initial ERC20 Token
            Airdop!
          </h1>
          <div style={{ display: "flex", padding: "1rem" }}>
            <Input
              variant="outline"
              placeholder="Ethereum Mainnet Address"
              bg="transparent"
              focusBorderColor="green"
              value={address}
              onChange={addressChangeHandler}
            />

            <Button
              bg="transparent"
              variant="outline"
              outline="green"
              focusBorderColor="green"
              onClick={() => {
                handleSetSpinner().then(registerForAirdrop(address));
                airdropClearance();
                spinnerModuleHandler();
              //  new Promise.resolve(path.join()) 
              }}
            >
              {" "}
              Register
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default AirdropRegister;
