import React from "react";
import { Route } from "react-router-dom";
import About from "./About";
import Home from "./Home";

const App = () => {
  return (
    <>
      {/* exact를 true로 안 하면 /about을 쳐도 /에도 걸려서 /도 나타난다. */}
      <Route path="/" component={Home} exact={true} />
      <Route path="/about" component={About} />
    </>
  );
};

export default App;
