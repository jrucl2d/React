import React, { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const onClick = () => {
    setName("Yuseonggeun");
  };

  return (
    <>
      <button onClick={onClick}>Click Me</button>
      <div>Hello!!!! {name}</div>
    </>
  );
};

export default App;
