import React from "react";

function Value({ number = -1 }) {
  return (
    <div>
      <h1>{number}</h1>
    </div>
  );
}

export default Value;
