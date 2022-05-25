import { createSlice } from "@reduxjs/toolkit";

const NUMBER_OF_LINES = 6;
const NUMBER_OF_TILES_IN_LINE = 5;
const LAST_LINE = NUMBER_OF_LINES - 1;
const LAST_TILE = NUMBER_OF_TILES_IN_LINE - 1;

const removeCharAt = (str, i) => {
  try {
    const newStr = str;
    if (i >= 0 && i < str.length) {
      newStr[i] = "";
      return newStr;
    }
  } catch (error) {
    console.log(`can't remove chat at porived index: ${i}
    ${error}`);
  }
};

const Tile = {
  letter: "",
  isAlmostCorrect: false,
  isCorrect: false,
  lineIndex: null,
  tileIndex: null,
};

class Line extends Array {
  wordInLine() {
    const wordInLine = this.reduce((word, currTile) => word + currTile.letter, "");
    return wordInLine;
  }
  isLineValid() {
    const isValid = !this.find((tile) => tile.letter === "");
    return isValid;
  }
}

function initLines() {
  const lines = [];
  for (let i = 0; i < NUMBER_OF_LINES; i++) {
    const line = new Line();
    for (let j = 0; j < NUMBER_OF_TILES_IN_LINE; j++) {
      line.push({ ...Tile, lineIndex: i, tileIndex: j });
    }
    lines.push(line);
  }
  return lines;
}

const Lines = initLines();
console.log(Lines);
const boardInitState = {
  tiles: Lines,
  numberOfLines: NUMBER_OF_LINES,
  numberOfTilesInLine: NUMBER_OF_TILES_IN_LINE,
  currentLine: 0,
  currentTile: 0,
  isLineValid: true,
  isGameEnded: false,
  isWon: false,
  numberOfGames: 1,
  almostLetters: ["."],
  correctLetters: ["."],
  usedLetters: ["."],
  theWordle: "",
  remainingWordleLetters: [],
  wordleDescription: "",
};

const boardSlice = createSlice({
  name: "board",
  initialState: boardInitState,
  reducers: {
    initGame(state) {
      state.tiles = initLines();
      state.isGameEnded = boardInitState.isGameEnded;
      state.isWon = boardInitState.isWon;
      state.currentLine = boardInitState.currentLine;
      state.currentTile = boardInitState.currentTile;
      state.almostLetters = boardInitState.almostLetters;
      state.correctLetters = boardInitState.correctLetters;
      state.usedLetters = boardInitState.usedLetters;
      state.theWordle = boardInitState.theWordle;
      state.theWordle = boardInitState.remainingWordleLetters;
      state.wordleDescription = boardInitState.wordleDescription;
      ++state.numberOfGames;
    },
    fetchWordle(state, action) {
      state.theWordle = action.payload.theWordle;
      state.remainingWordleLetters = action.payload.theWordle.split("");
      state.wordleDescription = action.payload.wordleDescription;
    },
    setFocuse(state, action) {
      state.currentTile = action.payload;
    },
    keyPressed(state, action) {
      const keyPressed = action.payload;
      const pattern = /[A-Z]/;

      if (state.isGameEnded) {
        return;
      }

      if (pattern.test(keyPressed) && keyPressed.length === 1) {
        state.tiles[state.currentLine][state.currentTile].letter = keyPressed;
        state.currentTile !== LAST_TILE && ++state.currentTile;
      } else if (keyPressed === "ARROWRIGHT" && state.currentTile !== LAST_TILE) {
        ++state.currentTile;
      } else if (keyPressed === "ARROWLEFT" && state.currentTile !== 0) {
        --state.currentTile;
      } else if (keyPressed === "{bksp}") {
        if (state.tiles[state.currentLine][state.currentTile].letter !== "") {
          state.tiles[state.currentLine][state.currentTile].letter = "";
        } else if (state.currentTile > 0) {
          state.tiles[state.currentLine][state.currentTile - 1].letter = "";
          --state.currentTile;
        }
      } else if (keyPressed === "{enter}") {
        state.isLineValid = state.tiles[state.currentLine].isLineValid();

        if (!state.isLineValid) {
          return;
        }

        //check line letters
        state.tiles[state.currentLine].forEach((tile, index) => {
          if (state.theWordle[index] === tile.letter) {
            tile.isCorrect = true;
            tile.isAlmostCorrect = false;
            !state.correctLetters.includes(tile.letter) && state.correctLetters.push(tile.letter);
            state.remainingWordleLetters = removeCharAt(state.remainingWordleLetters, index);
          } else if (!state.theWordle.includes(tile.letter)) {
            !state.usedLetters.includes(tile.letter) && state.usedLetters.push(tile.letter);
          }
        });

        state.tiles[state.currentLine].forEach((tile) => {
          if (state.remainingWordleLetters.includes(tile.letter)) {
            tile.isAlmostCorrect = true;
            !state.almostLetters.includes(tile.letter) && state.almostLetters.push(tile.letter);
          }
        });

        state.isWon = state.tiles[state.currentLine].wordInLine() === state.theWordle;

        if (!state.isWon && state.currentLine !== LAST_LINE) {
          ++state.currentLine;
          state.currentTile = 0;
        } else {
          state.isGameEnded = true;
        }
      }
    },
  },
});

export const boardSliceReducer = boardSlice.reducer;
export const boardActions = boardSlice.actions;
