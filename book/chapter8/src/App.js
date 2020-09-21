import React, { useState } from "react";
import Counter from "./Counter";
import Info from "./Info";

function App() {
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
