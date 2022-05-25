import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { boardActions } from "../store/boardStore";

import classes from "./Tile.module.css";

const Tile = (props) => {
  const { currentLine, currentTile, isGameEnded } = useSelector((state) => state.board);
  const dispatch = useDispatch();

  const tile = props.tile;
  let classNames = classes.tile;
  const isTileInCurrentLine = tile.lineIndex === currentLine;
  let isFocused = isTileInCurrentLine && tile.tileIndex === currentTile;
  
  const tileClickHandler = () => {
    if (!isFocused && isTileInCurrentLine && !isGameEnded) {
      console.log("pressed in valid line");      
      dispatch(boardActions.setFocuse(tile.tileIndex));      
    }
  };

  classNames = isFocused && !isGameEnded ? `${classNames} ${classes.focused}` : classNames;
  classNames = tile.isAlmostCorrect ? `${classNames} ${classes.almost}` : classNames;
  classNames = tile.isCorrect ? `${classNames} ${classes.correct}` : classNames;
  classNames = isTileInCurrentLine && !isGameEnded ? `${classNames} ${classes.clickable}` : classNames;


  return (
    <div className={classNames} onClick={tileClickHandler}>
      <span>{tile.letter}</span>
    </div>
  );
};

export default Tile;
