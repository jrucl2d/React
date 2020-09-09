import React, { useContext, memo } from "react";
import { TableContext } from "./TicTacToe";
import Tr from "./Tr";

const Table = memo(() => {
  const { tableData } = useContext(TableContext);
  // console.log("table rendered");
  return (
    <table>
      {tableData &&
        Array(tableData.length)
          .fill()
          .map((tr, i) => <Tr key={i} rowIndex={i} />)}
    </table>
  );
});
export default Table;
