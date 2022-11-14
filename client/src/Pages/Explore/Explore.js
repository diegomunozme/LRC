import React from "react";
import classes from "./Explore.module.css";
import { products } from "../../assets/data";

const openInNewTab = (url) => {
  window.open(url, "_blank", "noopener,noreferrer");
};

const Explore = () => {
  return (
    <div className={classes.exploreMainContent}>
      <div>
        <div className={classes.exploreTitle}>Hottest Deals</div>
        <div className={classes.productsBox}>
          {products.map((item) => (
            <div
              onClick={() => openInNewTab(item.website)}
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
              <div>
                <div className={classes.productText}>{item.title}</div>
                <div className={classes.productDesc}>{item.deal}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default Explore;
