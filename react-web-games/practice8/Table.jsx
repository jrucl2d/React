import React, { useContext, memo } from "react";
import Tr from "./Tr";
import { TableContext } from "./Mine";

const Table = memo(() => {
  const { tableData } = useContext(TableContext);
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
