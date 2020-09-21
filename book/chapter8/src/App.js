import React, { useState } from "react";
import Counter from "./Counter";
import Info from "./Info.jsx";
import Average from "./Average";

function App() {
  // return <Average />;
  return <Info />;
  // return <Counter />;
  // const [visible, setVisible] = useState(false);
  // return (
  // <>
  //   <button onClick={() => setVisible(!visible)}>
  //     {visible ? "숨기기" : "보이기"}
  //   </button>
  //   <hr />
  //   {visible && <Info />}
  // </>
  // );
}

export default App;
