import React, { memo } from "react";
import Tr from "./Tr";

const Table = memo(({ tableData, dispatch }) => {
  // 세 개짜리의 배열을 .fill()로 요소가 존재하게 만들고, 각 요소에 대해서 Tr을 만들어줌. Tr에는 rowData를 넘겨줌
  return (
    <table>
      {Array(tableData.length)
        .fill()
        .map((tr, i) => (
          <Tr key={i} rowData={tableData[i]} rowIndex={i} dispatch={dispatch} />
        ))}
    </table>
  );
});
export default Table;
