import { combineReducers } from "redux";
import counter from "./counter";
import todos from "./todos";

// redux 내부의 combineReducers를 이용해서 리듀서를 하나로 묶어줘야 한다. 스토어 만들 때 하나만 있어야 하므로.
const rootReducer = combineReducers({
  counter,
  todos,
});

export default rootReducer;
