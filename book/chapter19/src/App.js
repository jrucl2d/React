import React, { useState, Suspense } from "react";
import logo from "./logo.svg";
import "./App.css";
import loadable from "@loadable/component";
const SplitMe = loadable(() => import("./SplitMe"), {
  fallback: <div>loading...</div>, // 로딩 시 보여줄 문구는 여기에
});

const App = () => {
  const [visible, setVisible] = useState(false);
  const onClick = () => {
    setVisible(true);
  };
  // preloading. 마우스 올리면 먼저 로딩하고 클릭하면 바로 보여줄 수 있도록
  const onMouseOver = () => {
    SplitMe.preload();
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p onClick={onClick} onMouseOver={onMouseOver}>
          Hello React!
        </p>
        {/* 안 보일 때는 loading...을 보여줌 */}
        {visible && <SplitMe />}
      </header>
    </div>
  );
};

export default App;
