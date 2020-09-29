import React, { useCallback } from "react";
import { useSelector, useDispatch } from "react-redux";
import { changeInput, insert, toggle, remove } from "../modules/todos";
import Todos from "../components/Todos";
import useActions from "../lib/useActions";

const TodosContainer = () => {
  const { input, todos } = useSelector((state) => ({
    input: state.todos.input,
    todos: state.todos.todos,
  }));
  //   const dispatch = useDispatch();
  //   const onChangeInput = useCallback((input) => dispatch(changeInput(input)), [
  //     dispatch,
  //   ]);
  //   const onInsert = useCallback((id) => dispatch(insert(id)), [dispatch]);
  //   const onToggle = useCallback((id) => dispatch(toggle(id)), [dispatch]);
  //   const onRemove = useCallback((id) => dispatch(remove(id)), [dispatch]);

  // 액션함수 배열, deps 배열 이 안의 원소가 바뀌면 액션을 디스패치하는 함수를 새로 만듦
  const [onChangeInput, onInsert, onToggle, onRemove] = useActions(
    [changeInput, insert, toggle, remove],
    []
  );
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={onChangeInput}
      onInsert={onInsert}
      onToggle={onToggle}
      onRemove={onRemove}
    />
  );
};
export default React.memo(TodosContainer);
