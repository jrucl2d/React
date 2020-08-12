import React, { Component } from "react";
import Tr from "./Tr";

class Table extends Component {
  state = {};
  render() {
    const { tableData } = this.props;
    console.log(tableData.length);
    return (
      <table>
        {Array(tableData.length)
          .fill()
          .map((tr, i) => (
            <Tr key={i} rowData={tableData[i]}></Tr>
          ))}
      </table>
    );
  }
}
export default Table;
