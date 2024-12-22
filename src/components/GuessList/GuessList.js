import React from "react";
import Guess from "../Guess/Guess";
import { NUM_OF_GUESSES_ALLOWED } from "../../constants";
import { range } from "../../utils";

function GuessList({ guesses, answer }) {
  const remainingGuesses = NUM_OF_GUESSES_ALLOWED - guesses.length;
  return (
    <div className="guess-results">
      {guesses.map(({ id, content }) => (
        <Guess key={id} content={content} answer={answer} />
      ))}
      {range(remainingGuesses).map((idx) => (
        <Guess key={idx} content={""} answer={answer} />
      ))}
    </div>
  );
}

export default GuessList;
