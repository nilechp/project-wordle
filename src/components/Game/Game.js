import React, { useCallback, useState } from "react";

import GuessInput from "../GuessInput/GuessInput";
import GuessList from "../GuessList/GuessList";
import {
  KEYBOARD_STATE_PRIORITY,
  NUM_OF_GUESSES_ALLOWED,
} from "../../constants";
import HappyBanner from "../HappyBanner/HappyBanner";
import SadBanner from "../SadBanner/SadBanner";
import { checkGuess, initLetterStates } from "../../game-helpers";
import { sample } from "../../utils";
import { WORDS } from "../../data";

function Game() {
  const [answer, setAnswer] = useState(() => {
    const answer = sample(WORDS);
    console.log(`[Nile] answer: ${answer}`);
    return answer;
  });
  const [gameState, setGameState] = useState("active"); // active, win, lose
  const [letterStates, setLetterStates] = useState(initLetterStates());
  const [guesses, setGuesses] = useState([]); // {id, content}

  const updateLetterStates = useCallback((guess) => {
    const updates = checkGuess(guess, answer);
    setLetterStates((prev) => {
      const updatedStates = new Map(prev);
      updates.forEach(({ letter, status }) => {
        const currentStatus = updatedStates.get(letter);
        if (
          KEYBOARD_STATE_PRIORITY[status] <
          KEYBOARD_STATE_PRIORITY[currentStatus]
        ) {
          updatedStates.set(letter, status);
        }
      });
      return updatedStates;
    });
  }, []);

  const addGuess = useCallback(
    (guessContent) => {
      const newGuesses = [
        ...guesses,
        { id: crypto.randomUUID(), content: guessContent },
      ];
      setGuesses(newGuesses);
      updateLetterStates(guessContent);

      if (guessContent === answer) {
        setGameState("win");
      } else if (newGuesses.length >= NUM_OF_GUESSES_ALLOWED) {
        setGameState("lose");
      }
    },
    [guesses, updateLetterStates, answer]
  );

  const handleRestart = useCallback(() => {
    setGameState("active");
    setGuesses([]);
    setLetterStates(initLetterStates());
    const newAnswer = sample(WORDS);
    console.log(`[Nile] answer: ${newAnswer}`);
    setAnswer(newAnswer);
  }, []);

  return (
    <>
      <GuessList guesses={guesses} answer={answer} />
      <GuessInput
        addGuess={addGuess}
        enabled={gameState === "active"}
        letterStates={letterStates}
      />
      {gameState === "win" && (
        <HappyBanner numGuesses={guesses.length} onRestart={handleRestart} />
      )}
      {gameState === "lose" && (
        <SadBanner answer={answer} onRestart={handleRestart} />
      )}
    </>
  );
}

export default Game;
