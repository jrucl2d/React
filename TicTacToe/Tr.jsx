import React, { Component } from "react";
import Td from "./Td";

class Tr extends Component {
  state = {};
  render() {
    const { gameState, row, rowData } = this.props;
    return (
      <tr>
        {Array(rowData.length)
          .fill()
          .map((td, i) => (
            <Td
              key={i}
              gameState={gameState}
              row={row}
              col={i}
              colData={rowData[i]}
            ></Td>
          ))}
      </tr>
    );
  }
}
export default Tr;
