import React, { Component } from "react";
import Td from "./Td";

class Tr extends Component {
  state = {};
  render() {
    const { rowData } = this.props;
    return (
      <tr>
        {Array(rowData.length)
          .fill()
          .map((td, i) => (
            <Td key={i} colData={rowData[i]}></Td>
          ))}
      </tr>
    );
  }
}
export default Tr;
