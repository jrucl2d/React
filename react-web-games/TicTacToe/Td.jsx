import React, { memo, useCallback, useContext, useEffect } from "react";
import { SET_CELL, TableContext } from "./TicTacToe";

const Td = memo(({ rowIndex, colIndex }) => {
  // console.log("td rendered");
  const { tableData, dispatch, winner } = useContext(TableContext);

  const onClickTd = useCallback(() => {
    if (tableData[rowIndex][colIndex]) {
      return;
    }
    dispatch({ type: SET_CELL, row: rowIndex, col: colIndex });
  }, [tableData[rowIndex][colIndex]]);

  return <td onClick={onClickTd}>{tableData[rowIndex][colIndex]}</td>;
});
export default Td;
