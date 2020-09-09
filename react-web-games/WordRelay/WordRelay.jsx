const React = require("react");
const { useState, useRef } = require("react");

const WordRealy = () => {
  const [word, setWord] = useState("트따리");
  const [value, setValue] = useState("");
  const [result, setResult] = useState("");
  const inputRef = useRef(null);

  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onClick = (e) => {
    e.preventDefault();
    if (value === "") {
      setResult("입력을 해주세요");
      return;
    } else if (word[word.length - 1] === value[0]) {
      setWord(value);
      setValue("");
      setResult("맞음!!");
    } else {
      setValue("");
      setResult("땡");
    }
    inputRef.current.focus(); // 이거 까먹으면 안 됨
  };

  return (
    <>
      <div>{word}</div>
      <form>
        <label htmlFor="myInput">입력을 하시오</label>
        <input
          id="myInput"
          className="good"
          type="text"
          value={value}
          onChange={onChange}
          ref={inputRef}
        />
        <button onClick={onClick}>입력!</button>
      </form>
      <div>{result}</div>
    </>
  );
};

module.exports = WordRealy;
