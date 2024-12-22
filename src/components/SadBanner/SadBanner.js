import React from "react";

function SadBanner({ answer, onRestart }) {
  return (
    <div className="sad banner">
      <p>
        Sorry, the correct answer is <strong>{answer}</strong>.
      </p>
      <button className="restart" onClick={onRestart}>
        🔄
      </button>
    </div>
  );
}

export default SadBanner;
