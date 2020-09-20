import React, { useState } from "react";

const IterationSample = () => {
  //   const names = ["눈사람", "얼음", "눈", "바람"];
  //   // index 키는 효율적 리렌더링이 안 된다. 이렇게 딴거 없을 때 해라.
  //   const nameList = names.map((name, index) => <li key={index}>{name}</li>);
  //   return <ul>{nameList}</ul>;

  const [names, setNames] = useState([
    { id: 1, text: "눈사람" },
    { id: 2, text: "얼음" },
    { id: 3, text: "눈" },
    { id: 4, text: "바람" },
  ]);
  const [inputText, setInputText] = useState("");
  const [nextId, setNextId] = useState(5);

  const onChange = (e) => setInputText(e.target.value);
  const onClick = () => {
    // push가 아닌 concat을 썼다 : 리액트에서는 상태 업데이트시 기존 상태를 그대로 두고 새로운 값을 상태로 설정해야 함
    const nextNames = names.concat({ id: nextId, text: inputText });
    setNames(nextNames);
    setNextId(nextId + 1);
    setInputText("");
  };
  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      onClick();
    }
  };
  const onRemove = (id) => {
    const nextNames = names.filter((name) => name.id !== id);
    setNames(nextNames);
  };

  const nameList = names.map((name) => (
    <li key={name.id} onDoubleClick={() => onRemove(name.id)}>
      {name.text}
    </li>
  ));

  return (
    <>
      <input value={inputText} onChange={onChange} onKeyPress={onKeyPress} />
      <button onClick={onClick}>추가</button>
      <ul>{nameList}</ul>
    </>
  );
};

export default IterationSample;
