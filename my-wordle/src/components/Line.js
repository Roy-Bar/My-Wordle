import React from "react";

import Tile from "./Tile";
import classes from "./Line.module.css";
import { useSelector } from "react-redux";

const Line = (props) => {
  const { numberOfTilesInLine, tiles: storeTiles } = useSelector((state) => state.board);
  const lineIndex = props.lineIndex;

  const tiles = [];
  for (let index = 0; index < numberOfTilesInLine; index++) {
    tiles.push(<Tile key={"Tile_" + lineIndex + index} tile={storeTiles[lineIndex][index]} />);
  }

  return <div className={classes.Line}>{tiles}</div>;
};

export default Line;
