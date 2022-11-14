import React from "react";
import classes from "./InitialProducts.module.css";
import { products } from "../../../../assets/data";
import Carousel from "../../../../Pages/Rewards/Carousel";

const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const InitialProducts = () => {
  return (
    <div className={classes.initialStores}>
      <Carousel>

        {products.map((item) => (
          <div
            onClick={() => openInNewTab("https://google.com")}
            className={classes.Container}
          >
            <div className={classes.Circle}>
              <img
                src={item.img}
                key={item.id}
                className={classes.Image}
                alt="none"
              />
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default InitialProducts;
