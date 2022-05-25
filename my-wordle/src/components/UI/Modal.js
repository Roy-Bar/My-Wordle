import React from "react";
import { useDispatch, useSelector } from "react-redux";

import Card from "./Card";
import Button from "./Button";
import classes from "./Modal.module.css";
import { boardActions } from "../../store/boardStore";

const Modal = (props) => {
  const { isWon, theWordle, wordleDescription } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const replayGameHandler = () => {
    dispatch(boardActions.initGame());
  };

  const viewBoardHandler = () => {
    props.showModal(false);
    props.showActions(true);
  };

  return (
    <>
      <div className={classes.backdrop} />
      <Card className={classes.modal}>
        <header className={classes.header}>
          <h2>Game Ended!</h2>
        </header>
        <div className={classes.content}>
          {isWon ? <p>Congrats! you won!</p> : <p>Sorry you lost :(</p>}
          <p>
            The wordle was- <strong>{theWordle}</strong>
          </p>
          {wordleDescription && (
            <p>
              {theWordle}: {wordleDescription}
            </p>
          )}
        </div>
        <footer className={classes.actions}>
          <Button onClick={replayGameHandler}>Replay!</Button>
          <Button onClick={viewBoardHandler}>View Board</Button>
        </footer>
      </Card>
    </>
  );
};

export default Modal;
