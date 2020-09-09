import React from "react";
import ReactDOM from "react-dom";
import { hot } from "react-hot-loader/root";
import LottoHooks from "./LottoHooks";
const Hot = hot(LottoHooks);

ReactDOM.render(<Hot />, document.querySelector("#root"));
