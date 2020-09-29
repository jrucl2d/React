import React from "react";
import { connect } from "react-redux";
import { changeInput, insert, toggle, remove } from "../modules/todos";
import Todos from "../components/Todos";

const TodosContainer = ({
  input,
  todos,
  changeInput,
  insert,
  toggle,
  remove,
}) => {
  return (
    <Todos
      input={input}
      todos={todos}
      onChangeInput={changeInput}
      onInsert={insert}
      onToggle={toggle}
      onRemove={remove}
    />
  );
};

export default connect(
  // 구조분해 할당으로 todos를 분리. state.todos 대신 todos로
  ({ todos }) => ({ input: todos.input, todos: todos.todos }),
  {
    changeInput,
    insert,
    toggle,
    remove,
  }
)(TodosContainer);
