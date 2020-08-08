const React = require("react");
const { Component } = React;

class WordRealy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: "hello webpack",
    };
  }
  render() {
    return <h1>{this.state.text}</h1>;
  }
}

module.exports = WordRealy;
