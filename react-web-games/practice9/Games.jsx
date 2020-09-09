import React from "react";
import { BrowserRouter, HashRouter, Route, Link, Switch } from "react-router-dom";

import GameMatcher from "./GameMatcher";

const Games = () => {
  return (
    // Link로 만든 링크는 실제로 존재하는 주소가 아닌 react-Router만 알고 있는 가상의 주소이다. 따라서 a태그를 쓰면 오류난다.
    // 실제 주소가 아니라 그런척 하는거라서 실제 주소로 찾아가면 오류난다. -> 서버에서 따로 저 주소에 대해서 처리를 해줘야 검색엔진 최적화가 가능하다.

    // HashRouter 사용하면 주소에 #이 들어간다. 그래서 새로고침해도 오류가 안 난다. # 뒤 부분은 브라우저만 아는 부분이라서. 대신 서버는 모른다.(단점)
    //  즉, 검색 엔진 최적화에서 불이익 받는다. 그래서 실무에서 잘 안 쓴다.
    <BrowserRouter>
      {/* 여기에 레이아웃을 배치하면 된다.  */}
      <div>공통인 부분</div>
      <Link to="/game/number-baseball">숫자 야구</Link>
      &nbsp;
      <Link to="/game/rock-scissors-paper">가위바위보</Link>
      &nbsp;
      <Link to="/game/lotto-generator">로또 생성기</Link>
      &nbsp;
      <Link to="/game/index">게임 매쳐</Link>
      <div>
        {/* 동적 라우트 매칭 */}
        {/* <Route path="/game/:name" component={GameMatcher} /> */}
        {/* 렌더 형식으로 넘겨줄 수도 있다. */}
        {/* 이렇게 여러 군데에 매칭되는 경우가 있을 수 있는데 이런 경우에는 Switch를 쓰면 하나에만 매칭된다. 왠만하면 스위치를 다 감싸주는게 좋다.  */}
        {/* 그리고 exact는 정확히 일치해야만 매칭된다. 만약 상위주소"/"와 하위주소가 있는 경우에는 스위치가 제대로 동작 안 하므로 exact를 쓰자. */}
        <Switch>
          <Route exact path="/game/:name" render={(props) => <GameMatcher {...props} />} />
          <Route path="/game/baseball-game" render={(props) => <GameMatcher {...props} />} />
          <Route path="/game/baseball-game" render={(props) => <GameMatcher {...props} />} />
          <Route path="/game/baseball-game" render={(props) => <GameMatcher {...props} />} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};
export default Games;
