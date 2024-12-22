import React from "react";
import { range } from "../../utils";
import { checkGuess } from "../../game-helpers";

function Guess({ content, answer }) {
  const checkedGuess = checkGuess(content, answer);

  if (!checkedGuess) {
    return (
      <p className="guess">
        {range(5).map((idx) => (
          <span key={idx} className="cell" />
        ))}
      </p>
    );
  }

  return (
    <p className="guess">
      {checkedGuess.map(({ letter, status }, idx) => (
        <span key={idx} className={`cell ${status}`}>
          {letter}
        </span>
      ))}
    </p>
  );
}

export default Guess;
