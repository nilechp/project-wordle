import React from "react";

function Keyboard({ letterStates, onKeyPress }) {
  return (
    <div className="keyboard">
      <div className="row">
        <KeyRow
          letters="QWERTYUIOP"
          letterStates={letterStates}
          onKeyPress={onKeyPress}
        />
      </div>
      <div className="row">
        <KeyRow
          letters="ASDFGHJKL"
          letterStates={letterStates}
          onKeyPress={onKeyPress}
        />
      </div>
      <div className="row">
        <button className="key wide" onClick={() => onKeyPress("Enter")}>
          Enter
        </button>
        <KeyRow
          letters="ZXCVBNM"
          letterStates={letterStates}
          onKeyPress={onKeyPress}
        />
        <button className="key wide" onClick={() => onKeyPress("Del")}>
          Del
        </button>
      </div>
    </div>
  );
}

function KeyRow({ letters, letterStates, onKeyPress }) {
  return letters.split("").map((letter) => (
    <button
      className={`key ${letterStates.get(letter)}`}
      key={letter}
      onClick={() => onKeyPress(letter)}
    >
      {letter}
    </button>
  ));
}

export default Keyboard;
