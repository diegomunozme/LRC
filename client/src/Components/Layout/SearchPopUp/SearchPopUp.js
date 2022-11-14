import React, { useState } from "react";
import { InputGroup, InputLeftElement, Input } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import Card from "../../UI/Modal/Card/Card";
import classes from "./SearchPopUp.module.css";
import { products } from "../../../assets/data";

const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const SearchPopUp = (props) => {
  const [query, setQuery] = useState("");
  return (
    <div>
      <div className={classes.backdrop} onClick={props.searchModuleHandler} />
      <Card className={classes.modal}>
        <div className={classes.content}>
          {/* Lets see what happens here */}
          <InputGroup size="md">
            <InputLeftElement
              pointerEvents="hover"
              children={<SearchIcon color="gray.300" />}
            />
            <Input
              htmlSize={3}
              type="search"
              placeholder="Search"
              borderRadius="46px"
              variant="outline"
              onChange={(event) => setQuery(event.target.value)}
            />
          </InputGroup>
          <div className={classes.productsBox}>
            {products
              .filter((item) => {
                if (query === "") {
                  return item;
                } else if (
                  item.title.toLowerCase().includes(query.toLowerCase())
                ) {
                  return item;
                }
              })
              .map((item, id) => (
                <div
                  onClick={() => openInNewTab(item.website)} 
                  className={classes.Container}
                  key={id}
                >
                  <div className={classes.Circle}>
                    <img
                      src={item.img}
                      key={item.id}
                      className={classes.Image}
                      alt="none"
                    />
                  </div>
                  <div>
                    <div className={classes.productText}>{item.title}</div>
                    <div className={classes.productDesc}>{item.deal}</div>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </Card>
    </div>
  );
};

export default SearchPopUp;
