import React, { useState, useContext } from "react";
import { Button, Input, ButtonGroup } from "@chakra-ui/react";
import classes from "./StakingCard.module.css";
const ButtonSwitcher = (props) => {
  const [active, isActive] = useState(true);

  const handleSetActive = () => {
    isActive(true);
  };

  const activeModuleHandler = () => {
    isActive(false);
    console.log("Active Module Handler");
  };

  const handleChange = (event) => props.setAmount(event.target.value);
  const handleWithdrawl = (event) =>
    props.setWithdrawlAmount(event.target.value);

  const displayModal = () => {
    if (active === true) {
      return (
        <div>
          <div
            style={{
              margin: "1rem",
              padding: ".1rem",
              width: "50%",
              border: "1px solid",
              borderRadius: "8px",
              borderColor: "#4d5358",
            }}
          >
            <ButtonGroup role="group" width="100%">
              <Button color="#000000EB" bg="whitesmoke" width="50%">
                Stake
              </Button>
              <Button
                color="whitesmoke"
                bg="transparent"
                width="50%"
                _hover={{
                  bg: "#252d33",
                }}
                onClick={activeModuleHandler}
              >
                Unstake
              </Button>
            </ButtonGroup>
          </div>
          <div>
            <>
              <div style={{ display: "flex", padding: "1rem" }}>
                <Input
                  _focus={{ borderColor: "white", borderWidth: "1px" }}
                  _active={{ borderColor: "white", borderWidth: "1px" }}
                  value={props.amount}
                  onChange={handleChange}
                  variant="filled"
                  bg="rgba(255, 255, 255, 0.08)"
                  placeholder="HashBack Tokens"
                  focusBorderColor="green"
                  borderRightRadius="0px"
                />
                <Button
                  // bg="transparent"
                  bg="rgba(255, 255, 255, 0.08)"
                  borderLeftRadius="0px"
                  variant="filled"
                  outline="green"
                  onClick={() => props.stake()}
                >
                  {" "}
                  Stake
                </Button>
              </div>
            </>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <div
            style={{
              margin: "1rem",
              padding: ".1rem",
              width: "50%",
              border: "1px solid",
              borderRadius: "8px",
              borderColor: "#4d5358",
            }}
          >
            <ButtonGroup role="group" width="100%">
              <Button
                color="whitesmoke"
                bg="transparent"
                width="50%"
                _hover={{
                  bg: "#252d33",
                }}
                onClick={handleSetActive}
              >
                Stake
              </Button>
              <Button color="#000000EB" bg="whitesmoke" width="50%">
                Unstake
              </Button>
            </ButtonGroup>
          </div>
          <div style={{ display: "flex", padding: "1rem" }}>
            <Input
              _focus={{ borderColor: "white", borderWidth: "1px" }}
              _active={{ borderColor: "white", borderWidth: "1px" }}
              value={props.withdrawlAmount}
              onChange={handleWithdrawl}
              variant="filled"
              bg="rgba(255, 255, 255, 0.08)"
              placeholder="Withdrawing Tokens"
              focusBorderColor="green"
              borderRightRadius="0px"
            />
            <Button
              bg="rgba(255, 255, 255, 0.08)"
              borderLeftRadius="0px"
              borderRightRadius="0px"
              variant="filled"
              outline="green"
              onClick={() => props.unStakeAll()}
            >
              {" "}
              Max
            </Button>
            <Button
              bg="rgba(255, 255, 255, 0.08)"
              borderLeftRadius="0px"
              variant="filled"
              outline="green"
              onClick={() => props.withdraw()}
            >
              {" "}
              Withdraw
            </Button>
          </div>
        </div>
      );
    }
  };
  return (
    <>
      <div>{displayModal()}</div>
      <div className={classes.displayRewards}></div>
    </>
  );
};

export default ButtonSwitcher;
