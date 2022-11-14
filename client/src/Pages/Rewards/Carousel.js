import React, { useState, useEffect } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import classes from "./Carousel.module.css";

const Carousel = (props) => {
  const { children } = props;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length/5);

  useEffect(() => {
    setLength(children.length/5);
  }, [children]);

  const next = () => {
    if (currentIndex < length - 1) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  return (
    <div className={classes.carouselContainer}>
      <div className={classes.carouselWrapper}>
        {currentIndex > 0 && (
          <ChevronLeftIcon
            onClick={prev}
            w={8}
            h={8}
            color="green.500"
            className={classes.leftArrow}
          />
        )}
        <div className={classes.carouselContentWrapper}>
          {currentIndex < length - 1 && (
            <ChevronRightIcon
              onClick={next}
              w={8}
              h={8}
              color="green.500"
              className={classes.rightArrow}
            />
          )}
          <div
            className={classes.carouselContent}
            style={{ transform: `translateX(-${currentIndex * 110}%)` }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};
export default Carousel;
