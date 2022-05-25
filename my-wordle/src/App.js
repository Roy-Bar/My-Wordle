/* Free Dictionary API - https://dictionaryapi.dev/ */
/* DataMuse free words query API - http://www.datamuse.com/api/ */

import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Keyboard from "react-simple-keyboard";
import "react-simple-keyboard/build/css/index.css";
import axios from "axios";

import Board from "./components/Board";
import { boardActions } from "./store/boardStore";
import Modal from "./components/UI/Modal";
import Actions from "./components/UI/Actions";
import useEventListener from "./components/hooks/useEventListener";

function App() {
  const [pressedKey, setPressedKey] = useState(".");
  const [isShowModal, setIsShowModal] = useState(true);
  const [isShowActions, setIsShowActions] = useState(false);

  const dispatch = useDispatch();
  const { isGameEnded, almostLetters, correctLetters, usedLetters, numberOfTilesInLine, numberOfGames } = useSelector(
    (state) => state.board
  );

  useEffect(() => {
    const randomLetter = () => {
      const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
      return letters[Math.floor(Math.random() * letters.length)];
    };

    const buildWordQueryParam = () => {
      let queryParam = randomLetter();
      for (let index = 1; index < numberOfTilesInLine - 1; index++) {
        queryParam += "?";
      }
      return queryParam;
    };

    const getWordleWord = async () => {
      const payload = { theWordle: "", wordleDescription: "" };

      axios
        .get(`https://api.datamuse.com/words?sp=${buildWordQueryParam()}?&max=10`)
        .then((response) => {
          const pattern = new RegExp(`[A-Z]{${numberOfTilesInLine}}`);
          let count = 0;

          do {
            payload.theWordle = response.data[Math.floor(Math.random() * 10)].word.toUpperCase();
            ++count;
          } while (!pattern.test(payload.theWordle) && count < 10);
          dispatch(boardActions.fetchWordle(payload));

          axios
            .get(`https://api.dictionaryapi.dev/api/v2/entries/en/${payload.theWordle.toLowerCase()}`)
            .then((secondResponse) => {
              payload.wordleDescription = secondResponse.data[0].meanings[0].definitions[0].definition;
            })
            .catch((error) => console.log("dictionary API error: " + error))
            .finally(() => {
              dispatch(boardActions.fetchWordle(payload));
            });
        })
        .catch((error) => console.log(error));
    };

    getWordleWord();
  }, [numberOfTilesInLine, dispatch, numberOfGames]);

  const onKeyPress = useCallback(
    (button) => {
      setPressedKey(button);
      setTimeout(() => {
        setPressedKey(".");
      }, 200);

      dispatch(boardActions.keyPressed(button));
    },
    [dispatch]
  );

  const showModal = (boolean) => {
    setIsShowModal(boolean);
  };

  const showActionsHandler = (boolean) => {
    setIsShowActions(boolean);
  };

  const handler = ({ key }) => {
    key = key.toUpperCase();
    switch (key) {
      case "BACKSPACE":
        key = "{bksp}";
        break;
      case "ENTER":
        key = "{enter}";
        break;
      default:
        break;
    }    
    onKeyPress(key);
  };

  useEventListener("keydown", handler);

  return (
    <>
      <header>
        <h2>My Wordle!</h2>
      </header>
      <main>
        {isGameEnded && isShowModal && <Modal showModal={showModal} showActions={showActionsHandler} />}
        <Board />
        {isShowActions && <Actions showActions={showActionsHandler} showModal={showModal} />}
      </main>
      <Keyboard
        onKeyPress={onKeyPress}
        layout={{
          default: ["Q W E R T Y U I O P {bksp}", "A S D F G H J K L {enter}", "Z X C V B N M"],
        }}
        buttonTheme={[
          {
            class: "hg-black",
            buttons: pressedKey,
          },
          {
            class: "hg-almost",
            buttons: almostLetters.join(" "),
          },
          {
            class: "hg-correct",
            buttons: correctLetters.join(" "),
          },
          {
            class: "hg-used",
            buttons: usedLetters.join(" "),
          },
        ]}
      />
    </>
  );
}

export default App;
