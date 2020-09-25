import React from "react";
import { Route, Link } from "react-router-dom";
import About from "./About";
import Home from "./Home";

const App = () => {
  return (
    <>
      <ul>
        <li>
          {/* Link 태그 내에는 a가 내장되어 있음. 그냥 a 쓰면 페이지 이동되므로 이걸 막아줌 */}
          <Link to="/">홈</Link>
        </li>
        <li>
          <Link to="/about">소개</Link>
        </li>
        <li>
          <Link to="/info">정보</Link>
        </li>
      </ul>
      <hr />
      {/* exact를 true로 안 하면 /about을 쳐도 /에도 걸려서 /도 나타난다. */}
      <Route path="/" component={Home} exact={true} />
      {/* 다른 주소로 같은 라우터 접근 가능 */}
      <Route path={["/about", "/info"]} component={About} />
    </>
  );
};

export default App;
