import React, { useCallback, useState } from "react";
import Keyboard from "../Keyboard/Keyboard";

function GuessInput({ addGuess, enabled, letterStates }) {
  const [input, setInput] = useState("");
  const [inputRef, _] = useState(null);
  const insertGuess = useCallback(() => {
    addGuess(input);
    setInput("");
  }, [input, addGuess]);

  const handleKeyPress = (letter) => {
    if (letter === "Enter") {
      insertGuess();
    }
    if (letter === "Del") {
      setInput((prev) => prev.slice(0, -1));
      return;
    }

    if (input.length >= 5) return;
    setInput(input + letter.toUpperCase());
  };

  return (
    <>
      <form
        className="guess-input-wrapper"
        onSubmit={(e) => {
          e.preventDefault();
          insertGuess();
        }}
      >
        <label htmlFor="guess-input">Enter guess:</label>
        <input
          required
          disabled={!enabled}
          id="guess-input"
          type="text"
          maxLength="5"
          pattern="[A-Z]{5}"
          title="Enter a 5-letter word"
          value={input}
          onChange={(e) => setInput(e.target.value.toUpperCase())}
          ref={inputRef}
        />
      </form>
      <Keyboard letterStates={letterStates} onKeyPress={handleKeyPress} />
    </>
  );
}

export default GuessInput;
