// import React from "react";
// // import EventPractice_func from "./EventPractice_func";
// import ScrollBox from "./ScrollBox";

// const App = () => {
//   return <ScrollBox />;
// };

// export default App;

import React, { Component } from "react";
// import ScrollBox from "./ScrollBox";
// import IteractionSample from "./IterationSample";
import LifeCycleSample from "./LifeCycleSample";

function getRandomColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

class App extends Component {
  state = {
    color: "#000000",
  };
  handleClick = () => {
    this.setState({
      color: getRandomColor(),
    });
  };
  render() {
    return (
      // <div>
      //   <ScrollBox ref={(ref) => (this.scrollBox = ref)} />
      //   <button onClick={() => this.scrollBox.scrollToBottom()}>
      //     맨 밑으로
      //   </button>
      // </div>
      // <IteractionSample />
      <>
        <button onClick={this.handleClick}>랜덤 색상</button>
        <LifeCycleSample color={this.state.color} />
      </>
    );
  }
}
export default App;
