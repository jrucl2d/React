import React, { Component } from "react";
import "./App.css";
import MyComponent from "./MyComponent";

const App = () => {
  return <MyComponent />;
};

// class App extends Component {
//   render() {
//     const name = "react";
//     return <div className="react">{name} hi!</div>;
//   }
// }

// function App() {
//   const name = "리액트";
//   return (
//     <>
//       <div className="react">{name}</div>
//       <input /> {/* self closing 태그 */}
//     </>
//   );
// }

export default App;
