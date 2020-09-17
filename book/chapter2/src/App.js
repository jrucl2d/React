import React from "react";
import "./App.css";
// import MyComponent from "./MyComponent";
// import Counter from "./Counter";
import Say from "./Say";

const App = () => {
  // return <MyComponent name="React" />;
  // return <MyComponent />; // defaultProps 값이 사용됨
  return (
    // <Counter />
    <Say />
    // <MyComponent name="으쟁이" favoriteNumber={3}>
    //   리액트
    // </MyComponent>
  ); // props.children으로 표시
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
