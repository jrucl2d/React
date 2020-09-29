import React from "react";
import CounterContainer from "./containers/CounterContainer";
// import Todos from "./components/Todos";
import TodosContainer from "./containers/TodosContainer";

const App = () => {
  return (
    <div>
      <CounterContainer />
      <hr />
      {/* <Todos /> */}
      <TodosContainer />
    </div>
  );
};

export default App;
