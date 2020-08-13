import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import Mine from "./Mine";
const Hot = hot(Mine);

ReactDOM.render(<Hot />, document.querySelector("#root"));
