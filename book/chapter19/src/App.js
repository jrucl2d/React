import React from "react";
import logo from "./logo.svg";
import "./App.css";

function App() {
  const onClick = () => {
    import("./notify").then((result) => result.default()); // export default로 보내서 default로 실행함
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick}>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
