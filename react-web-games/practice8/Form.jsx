import React, { useState, useCallback, useContext, memo } from "react";
import { TableContext, START_GAME } from "./Mine";

const Form = memo(() => {
  const [row, setRow] = useState(10);
  const [col, setCol] = useState(10);
  const [mine, setMine] = useState(20);
  const { dispatch } = useContext(TableContext); // Mine에서 가져온 것, value.dispatch가 아닌 구조분해로 바로 dispatch를 사용

  const onChangeRow = useCallback((e) => {
    setRow(e.target.value);
  }, []);
  const onChangeCol = useCallback((e) => {
    setCol(e.target.value);
  }, []);
  const onChangeMine = useCallback((e) => {
    setMine(e.target.value);
  }, []);
  const onClickBtn = useCallback(() => {
    dispatch({ type: START_GAME, row, col, mine }); // row:row, col:col
  }, [row, col, mine]);

  return (
    <div>
      <input type="number" placeholder="세로" value={row} onChange={onChangeRow} />
      <input type="number" placeholder="가로" value={col} onChange={onChangeCol} />
      <input type="number" placeholder="지뢰" value={mine} onChange={onChangeMine} />
      <button onClick={onClickBtn}>시작</button>
    </div>
  );
});

export default Form;
