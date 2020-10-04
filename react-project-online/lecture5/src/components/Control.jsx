import React from "react";

function Control({ onPlus, onSub, onRandom }) {
  return (
    <div>
      <button onClick={onPlus}>+</button>
      <button onClick={onSub}>-</button>
      <button onClick={onRandom}>Randomize Color</button>
    </div>
  );
}

export default Control;
