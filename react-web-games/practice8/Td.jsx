import React, { useContext, useCallback, memo, useMemo } from "react";
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
  console.log("getTdtext"); // 컴포넌트 함수 자체는 100번 실행되지만 리렌더링은 딱 한 번 실행되는 것을 확인 가능.
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
      return code || ""; // 0이면 빈칸, 아니면 개수를 보여줌
  }
};

const Td = memo(({ rowIndex, colIndex }) => {
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

  console.log("td rendered");
  // 모든 칸이 리렌더링 되는 것을 막기 위해서
  //   return useMemo(
  //     () => (
  //       <td style={getTdStyle(tableData[rowIndex][colIndex])} onClick={onClickTd} onContextMenu={onRightClick}>
  //         {getTdText(tableData[rowIndex][colIndex])}
  //       </td>
  //     ),
  //     [tableData[rowIndex][colIndex]]
  //   );

  return <RealTd onClickTd={onClickTd} onRightClick={onRightClick} data={tableData[rowIndex][colIndex]} />;
});

// 이렇게 분리 가능
const RealTd = memo(({ onClickTd, onRightClick, data }) => {
  console.log("real td rendered");
  return (
    <td style={getTdStyle(data)} onClick={onClickTd} onContextMenu={onRightClick}>
      {getTdText(data)}
    </td>
  );
});

export default Td;
