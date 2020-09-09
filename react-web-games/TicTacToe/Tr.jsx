import React, { useContext, memo } from "react";
import Td from "./Td";
import { TableContext } from "./TicTacToe";

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(TableContext);
  // console.log("tr rendered");
  return (
    <tr>
      {tableData &&
        Array(tableData[0].length)
          .fill()
          .map((td, i) => <Td key={i} rowIndex={rowIndex} colIndex={i} />)}
    </tr>
  );
});
export default Tr;
