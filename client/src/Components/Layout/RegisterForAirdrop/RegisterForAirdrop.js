import React, { useState } from "react";
import Card from "../../UI/Modal/Card/Card";
import classes from "./RegisterForAirdrop.module.css";
import { Input, Button, Divider } from "@chakra-ui/react";
import { registerForAirdrop } from "../../../firebase/firebase";
const AirdropRegister = (props) => {
  const [address, setAddress] = useState("");

  const addressChangeHandler = (e) => {
    setAddress(e.target.value);
  };

  const airdropClearance = () => {
    setAddress("");
  };

  return (
    <div>
      <div className={classes.backdrop} onClick={props.registerModuleHandler} />
      <Card className={classes.modal}>
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
                registerForAirdrop(address);
                airdropClearance();
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
