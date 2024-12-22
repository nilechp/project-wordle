import React from "react";

function HappyBanner({ numGuesses, onRestart }) {
  return (
      <div className="happy banner">
        <p>
          <strong>Congratulations!</strong> Got it in{" "}
          <strong>{`${numGuesses} guess${numGuesses > 1 ? "es" : ""}`}</strong>.
        </p>
        <button className="restart" onClick={onRestart}>🔄</button>
      </div>
  );
}

export default HappyBanner;
