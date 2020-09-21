import React, { useState, useMemo } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산중... ");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, cur) => acc + cur);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };
  const onInsert = (e) => {
    const nextList = list.concat(+number);
    setList(nextList);
    setNumber("");
  };
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
