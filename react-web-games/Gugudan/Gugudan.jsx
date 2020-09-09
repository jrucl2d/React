const React = require("react");
const { useState, useRef } = React;

const GuguDan = () => {
  // state 선언법, useState() 안에 초기값을 넣어주면 된다. 무조건 함수 안에 존재해야 한다.
  const [first, setFirst] = useState(Math.ceil(Math.random() * 9));
  const [second, setSecond] = useState(Math.ceil(Math.random() * 9));
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null); // 초기값으로 null을 넣어줌

  // 내부 함수
  const onChangeInput = (e) => {
    setValue(e.target.value);
  };
  const onSubmitForm = (e) => {
    e.preventDefault();
    if (value === "") {
      // 여기도 함수형으로 쓸 수 있다. 옛날 state 사용하는 경우
      // setValue(() => {return })
      setValue("");
      setResult("답을 입력하세요!");
    } else if (parseInt(value) === first * second) {
      setFirst(Math.ceil(Math.random() * 9));
      setSecond(Math.ceil(Math.random() * 9));
      setValue("");
      setResult(`${value} 정답!`);
    } else {
      setValue("");
      setResult(`${value} 오답!`);
    }
    inputRef.current.focus();
  };
  return (
    <>
      <div>
        {first} 곱하기 {second} 는?
      </div>
      <form onSubmit={onSubmitForm}>
        <input
          ref={inputRef}
          onChange={onChangeInput}
          type="number"
          value={value}
        />
        <button>입력!</button>
      </form>
      <div id="result">{result}</div>
    </>
  );
};

module.exports = GuguDan;
