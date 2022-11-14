import React from "react";
import classes from "./Body.module.css";
import SliderLanding from "./Slider/Slider";
import InitialProducts from "./Initial-Products/InitialProducts";
const Body = () => {
  return (
    <div>
      <SliderLanding />
      <InitialProducts />
    </div>
  );
};

export default Body;
