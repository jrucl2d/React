import React, { useContext, memo } from "react";
import Td from "./Td";
import { TableContext } from "./Mine";

const Tr = memo(({ rowIndex }) => {
  const { tableData } = useContext(TableContext);
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
