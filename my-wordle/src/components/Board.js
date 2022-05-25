import React from "react";
import { useSelector } from "react-redux";

import Line from "./Line";
//import classes from "./Board.module.css"

const Board = () => {
  const { numberOfLines } = useSelector((state) => state.board);

  const Lines = [];
  for (let index = 0; index < numberOfLines; index++) {
    Lines.push(<Line key={"Line_" + index} lineIndex={index} />);
  }

  return <>{Lines}</>;
};

export default Board;
