import React, { useState, useCallback } from "react";
import { MdAdd } from "react-icons/md";
import "./TodoInsert.scss";

const TodoInsert = ({ onInsert }) => {
  const [value, setValue] = useState("");
  const onChange = useCallback((e) => {
    setValue(e.target.value);
  }, []);

  // onSubmit 사용하면 엔터로 입력하는것도 한 번에 처리 가능
  const onSubmit = useCallback(
    (e) => {
      e.preventDefault();

      onInsert(value); // text에 value를 넣어줌
      setValue(""); // value 초기화
    },
    [onInsert, value]
  );

  return (
    <form className="TodoInsert" onSubmit={onSubmit}>
      <input
        placeholder="할일을 입력하세요"
        value={value}
        onChange={onChange}
      />
      <button type="submit">
        <MdAdd />
      </button>
    </form>
  );
};
export default TodoInsert;
