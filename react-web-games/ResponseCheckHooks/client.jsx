import React from "react";
import ReactDOM from "react-dom";
import ResponseCheck from "./ResponseCheck";
import { hot } from "react-hot-loader/root";
const Hot = hot(ResponseCheck);

ReactDOM.render(<Hot />, document.querySelector("#root"));
