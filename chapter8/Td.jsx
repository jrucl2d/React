import React, { useContext, useCallback } from "react";
import { TableContext, CODE, OPEN_CELL, CLICK_MINE, NORMALIZE_CELL, FLAG_CELL, QUESTION_CELL } from "./Mine";

const getTdStyle = (code) => {
  switch (code) {
    case CODE.NORMAL:
    case CODE.MINE:
      return {
        background: "#444",
      };
    case CODE.CLICKED_MINE:
    case CODE.OPENED:
      return {
        background: "white",
      };
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return {
        background: "yellow",
      };
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return {
        background: "red",
      };
    default:
      return {
        background: "white",
      };
  }
};
const getTdText = (code) => {
  console.log("getTdtext");
  switch (code) {
    case CODE.NORMAL:
      return "";
    case CODE.MINE:
      return "X";
    case CODE.CLICKED_MINE:
      return "펑";
    case CODE.FLAG_MINE:
    case CODE.FLAG:
      return "!";
    case CODE.QUESTION_MINE:
    case CODE.QUESTION:
      return "?";
    default:
      return "";
  }
};

const Td = ({ rowIndex, colIndex }) => {
  const { tableData, dispatch, halted } = useContext(TableContext);
  // 칸 클릭 시
  const onClickTd = useCallback(() => {
    if (halted) {
      return;
    }
    switch (tableData[rowIndex][colIndex]) {
      case CODE.OPENED:
      case CODE.FLAG_MINE:
      case CODE.FLAG:
      case CODE.QUESTION_MINE:
      case CODE.QUESTION:
        return;
      case CODE.NORMAL:
        dispatch({ type: OPEN_CELL, row: rowIndex, col: colIndex });
        return;
      case CODE.MINE:
        dispatch({ type: CLICK_MINE, row: rowIndex, col: colIndex });
        return;
      default:
        return;
    }
  }, [tableData[rowIndex][colIndex], halted]);
  const onRightClick = useCallback(
    (e) => {
      if (halted) {
        return;
      }
      e.preventDefault(); // 오른쪽 클릭 메뉴 안 뜨게
      switch (tableData[rowIndex][colIndex]) {
        case CODE.NORMAL:
        case CODE.MINE:
          dispatch({ type: FLAG_CELL, row: rowIndex, col: colIndex });
          return;
        case CODE.FLAG:
        case CODE.FLAG_MINE:
          dispatch({ type: QUESTION_CELL, row: rowIndex, col: colIndex });
          return;
        case CODE.QUESTION:
        case CODE.QUESTION_MINE:
          dispatch({ type: NORMALIZE_CELL, row: rowIndex, col: colIndex });
          return;
        default:
          return;
      }
    },
    [tableData[rowIndex][colIndex], halted]
  );

  return (
    <td style={getTdStyle(tableData[rowIndex][colIndex])} onClick={onClickTd} onContextMenu={onRightClick}>
      {getTdText(tableData[rowIndex][colIndex])}
    </td>
  );
};

export default Td;
