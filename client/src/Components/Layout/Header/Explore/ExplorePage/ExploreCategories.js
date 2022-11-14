import React from "react";
import classes from "./ExploreCategories.module.css"
import Card from "../../../../UI/Modal/Card/Card";
const ExploreCategories = (props)=>{
    return (
        <div>
          <div className={classes.backdrop} onClick={props.loginAccModuleHandler} />
          <Card className={classes.modal}>
            <header>
              <h2>Login or Register Today!!</h2>
            </header>
            <div className={classes.content}>
              <p>Login info here</p>
            </div>
          </Card>
        </div>
      );
    };    
export default ExploreCategories;
