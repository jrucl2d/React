import React, { Component } from "react";

class Td extends Component {
  state = {
    point: "",
  };

  onClickPoint = (row, col) => {
    console.log(row);
  };

  render() {
    const { gameState, row, col, colData } = this.props;

    return <td onClick={this.onClickPoint(row, col)}>{this.state.point}</td>;
  }
}
export default Td;
