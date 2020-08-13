import React, { useContext } from "react";
import Tr from "./Tr";
import { TableContext } from "./Mine";

const Table = () => {
  const { tableData } = useContext(TableContext);
  return (
    <table>
      {tableData &&
        Array(tableData.length)
          .fill()
          .map((tr, i) => <Tr key={i} rowIndex={i} />)}
    </table>
  );
};

export default Table;
