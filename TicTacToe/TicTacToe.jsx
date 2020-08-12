import React, { Component } from "react";
import Table from "./Table";

class TicTacToe extends Component {
  state = {
    winner: "",
    turn: "O",
    tableData: [
      ["", "", ""],
      ["", "", ""],
      ["", "", ""],
    ],
  };
  render() {
    const { winner, turn, tableData } = this.state;
    return (
      <>
        <Table gameState={this.state} tableData={tableData} />
        {winner && <div>승자는 {winner}입니다.</div>}
      </>
    );
  }
}

export default TicTacToe;
