import React, { useCallback, useRef, useEffect, memo } from "react";
import { CLICK_CELL } from "./TicTacToe"; // 액션을 불러옴

// memo로 성능 최적화
const Td = memo(({ rowIndex, cellIndex, cellData, dispatch }) => {
  //   // 성능 최적화 확인용
  //   const ref = useRef([]); // 여기에 props들을 다 저장하고 useEffect로 렌더링 시마다 바뀌는 것이 무엇인지 파악. 바뀌는 것이 false이고, 그것 때문에 리렌더링 발생
  //   useEffect(() => {
  //     console.log(ref.current[0] === rowIndex, ref.current[1] === cellIndex, ref.current[2] === cellData, ref.current[3] === dispatch);
  //     ref.current = [rowIndex, cellIndex, cellData, dispatch];
  //   }, [rowIndex, cellIndex, cellData, dispatch]); // cellData가 바뀐다.

  const onClickTd = useCallback(() => {
    if (cellData) return; // 이미 cellData가 있다면 함수를 리턴해버린다.

    dispatch({ type: CLICK_CELL, row: rowIndex, cell: cellIndex }); // 칸 클릭
    // dispatch는 비동기라서 여기서 state.turn 찍어봐도 안 바뀌게 나온다. 때문에 세 줄 완료를 파악하려면 useEffect를 써서 처리해야 한다.
    //
    //
  }, [cellData]); // cellData는 바뀌니깐 넣어주자.
  //   이거 안 넣어주면 이전의 cellData를 계속 기억하므로 cellData가 없다고 판단해서 계속 재실행. 하지만 그래도 cellData의 기억을 바꾸지 않음

  return <td onClick={onClickTd}>{cellData}</td>;
});

export default Td;
