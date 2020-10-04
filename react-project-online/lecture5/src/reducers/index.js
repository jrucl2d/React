import { combineReducers } from "redux";
import counter from "./counter";
import color from "./color";

const reducers = combineReducers({
  counter,
  color,
});

export default reducers;
