import React, { useState, useRef, useCallback } from "react";
import TodoTemplate from "./components/TodoTemplate";
import TodoInsert from "./components/TodoInsert";
import TodoList from "./components/TodoList";

function createBulkTodos() {
  const array = [];
  Array(2500)
    .fill()
    .forEach((v, i) => {
      array.push({
        id: i,
        text: "할일",
        checked: false,
      });
    });
  return array;
}

const App = () => {
  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: "리액트의 기초 알아보기",
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: "컴포넌트 스타일링 해보기",
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: "일정관리 앱 만들어보기",
  //     checked: false,
  //   },
  // ]);

  // useState(createBulkTodos())로 넣으면 리렌더링마다 함수가 호출되지만 파라미터를 함수형태로 넣어주면 처음만 실행됨
  const [todos, setTodos] = useState(createBulkTodos);

  // 고윳값으로 사용될 id, ref를 이용해서 변수 담기
  // id값은 렌더링되는 값이 아니라 키로 참조하는 값이므로 ref가 맞다.
  // const nextId = useRef(4);
  const nextId = useRef(2501);
  const onInsert = useCallback((text) => {
    const todo = {
      id: nextId.current,
      text,
      checked: false,
    };
    setTodos((todos) => todos.concat(todo)); // 상태 업데이트를 어떻게 할지 넣어줘도 된다. '함수형 업데이트'
    nextId.current += 1;
  }, []); // 함수형 업데이트를 하면 []안에 별도로 todos를 넣어주지 않아도 된다. 아래 remove, toggle도 똑같음

  const onRemove = useCallback((id) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id)); // 선택된 아이디가 아닌 todo만 걸러서 setTodo해줌
  }, []);

  const onToggle = useCallback((id) => {
    setTodos((todos) =>
      todos.map((todo) =>
        todo.id === id ? { ...todo, checked: !todo.checked } : todo
      )
    );
  }, []);

  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert} />
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
    </TodoTemplate>
  );
};
export default App;
