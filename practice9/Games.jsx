import React from "react";
import { BrowserRouter, HashRouter, Route, Link } from "react-router-dom";
import NumberBaseball from "../NumberBaseball/NumberBaseball";
import RSP from "../practice5/RSP copy";
import Lotto from "../practice6/Lotto";

const Games = () => {
  return (
    // Link로 만든 링크는 실제로 존재하는 주소가 아닌 react-Router만 알고 있는 가상의 주소이다. 따라서 a태그를 쓰면 오류난다.
    // 실제 주소가 아니라 그런척 하는거라서 실제 주소로 찾아가면 오류난다.
    <BrowserRouter>
      <div>공통인 부분</div>
      <Link to="/number-baseball">숫자 야구</Link>
      &nbsp;
      <Link to="/rock-scissors-paper">가위바위보</Link>
      &nbsp;
      <Link to="/lotto-generator">로또 생성기</Link>
      <div>
        <Route path="/number-baseball" component={NumberBaseball} />
        <Route path="/rock-scissors-paper" component={RSP} />
        <Route path="/lotto-generator" component={Lotto} />
      </div>
    </BrowserRouter>
  );
};
export default Games;
