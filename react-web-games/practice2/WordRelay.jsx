const React = require("react");
const { Component } = React;

class WordRealy extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      word: "트따리",
      value: "",
      result: "",
    };
  }

  onChange = (e) => {
    this.setState({ value: e.target.value });
  };

  onClick = (e) => {
    e.preventDefault();
    if (this.state.value === "") {
      this.setState({
        result: "입력을 하십시오!",
      });
      return;
    } else if (
      this.state.word[this.state.word.length - 1] === this.state.value[0]
    ) {
      this.setState((prev) => {
        return {
          word: prev.value,
          value: "",
          result: "맞음!!!!!!!",
        };
      });
    } else {
      this.setState({
        value: "",
        result: "땡!!!!!!",
      });
    }
    this.inputEl.focus();
  };

  myRef = (c) => {
    this.inputEl = c;
  };
  inputEl;
  render() {
    return (
      <>
        <div>{this.state.word}</div>
        <form>
          <input
            type="text"
            value={this.state.value}
            onChange={this.onChange}
            ref={this.myRef}
          />
          <button onClick={this.onClick}>입력!</button>
        </form>
        <div>{this.state.result}</div>
      </>
    );
  }
}

module.exports = WordRealy;
