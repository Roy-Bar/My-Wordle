import React from "react";

import ReplayBtn from "./ReplayBtn";
import InfoBtn from "./InfoBtn";
import classes from "./Actions.module.css"

const Actions = (props) => {
  return (
    <div className={classes.actions}>
      <InfoBtn showModal={props.showModal} showActions={props.showActions}/>
      <ReplayBtn showModal={props.showModal} showActions={props.showActions}/>
    </div>
  );
};

export default Actions;
