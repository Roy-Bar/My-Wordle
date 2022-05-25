import React from "react";
import { useDispatch } from "react-redux";

import { boardActions } from "../../store/boardStore";
import classes from "./Actions.module.css"

const ReloadBtn = (props) => {
  const dispatch = useDispatch();

  const replayGameHandler = () => {
    dispatch(boardActions.initGame());
    props.showActions(false);
    props.showModal(true);
  };

  return (
    <div className={classes.actionBtn} onClick={replayGameHandler}>
      <img alt="Replay Game" title="Replay Game" src="https://img.icons8.com/wired/64/f0ffff/synchronize.png" />
      {/* https://icons8.com/icon/set/popular/wired */}
    </div>
  );
};

export default ReloadBtn;
