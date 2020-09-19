// import React from "react";
// // import EventPractice_func from "./EventPractice_func";
// import ScrollBox from "./ScrollBox";

// const App = () => {
//   return <ScrollBox />;
// };

// export default App;

import React, { Component } from "react";
import ScrollBox from "./ScrollBox";
class App extends Component {
  render() {
    return (
      <div>
        <ScrollBox ref={(ref) => (this.scrollBox = ref)} />
        <button onClick={() => this.scrollBox.scrollToBottom()}>
          맨 밑으로
        </button>
      </div>
    );
  }
}
export default App;
