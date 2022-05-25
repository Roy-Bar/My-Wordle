import React from "react";

import classes from "./Actions.module.css";

const InfoBtn = (props) => {
  const infoGameHandler = () => {
    props.showModal(true);
    props.showActions(false);
  };

  return (
    <div className={classes.actionBtn} onClick={infoGameHandler}>
      <img alt="Game Info" title="Game Info" src="https://img.icons8.com/wired/64/f0ffff/bookmark--v2.png" />
      {/* https://icons8.com/icon/set/popular/wired */}
    </div>
  );
};

export default InfoBtn;
