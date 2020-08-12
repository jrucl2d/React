import React, { Component } from "react";
import Tr from "./Tr";

class Table extends Component {
  state = {};
  render() {
    const { gameState, tableData } = this.props;
    return (
      <table>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr
              key={i}
              gameState={gameState}
              row={i}
              rowData={tableData[i]}
            ></Tr>
          ))}
      </table>
    );
  }
}
export default Table;
