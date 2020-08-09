import React, { Component, useState, useRef } from "react"; // 한 번에 합쳐줄 수 있다.
import Try from "./Try";

const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
    array.push(chosen);
  }
  return array;
};

const NumberBaseball = () => {
  const [result, setResult] = useState("");
  const [value, setValue] = useState("");
  const [answer, setAnswer] = useState(getNumbers());
  const [tries, setTries] = useState([]);
  const inputRef = useRef(null);

  const onSubmitForm = (e) => {
    e.preventDefault();
    inputRef.current.focus();
    if (value === answer.join("")) {
      setResult("홈런!");
      setTries((prev) => {
        return [...prev, { try: value, result: "홈런!" }]; // 옛날 걸로 만들면 함수형
      });
      alert("게임을 다시 시작함");
      setResult("");
      setValue("");
      setAnswer(getNumbers());
      setTries([]);
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        setResult(`10번 넘게 틀려서 실패! 답은 ${answer.join(",")}이었다.`);
        alert("게임을 다시 시작함");
        setResult("");
        setValue("");
        setAnswer(getNumbers());
        setTries([]);
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        setTries((prev) => [...prev, { try: value, result: `${strike} 스트라이크, ${ball}볼!` }]);
        setValue("");
      }
    }
  };
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };
  return (
    <>
      <h1>{result}</h1>
      <form onSubmit={onSubmitForm}>
        <input maxLength={4} value={value} onChange={onChangeInput} ref={inputRef} />
        <button>제출</button>
      </form>
      <div>시도 : {tries.length}</div>

      <ul>
        {tries.map((v, i) => (
          <Try key={`${i + 1}차 시도 : `} tryInfo={v} />
        ))}
      </ul>
    </>
  );
};

export default NumberBaseball; // import NubmerBaseball로 가져온다, module.exports와 호환된다고 생각하면 된다.
export const hello = `hello`; // import {hello}로 가져온다.
