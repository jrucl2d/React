import React, { useState, useMemo, useCallback } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산중... ");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, cur) => acc + cur);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링 될 때만 함수 생성
  const onInsert = useCallback(
    (e) => {
      const nextList = list.concat(+number);
      setList(nextList);
      setNumber("");
    },
    [number, list] // number 혹은 list가 바뀔 때만 함수 생성
  );
  const avg = useMemo(() => getAverage(list), [list]);
  return (
    <>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((v, i) => {
          return <li key={i}>{v}</li>;
        })}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </>
  );
};
export default Average;
