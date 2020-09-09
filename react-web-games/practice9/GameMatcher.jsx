import React, { Component } from "react";
import NumberBaseball from "../NumberBaseball/NumberBaseball";
import RSP from "../practice5/RSP copy";
import Lotto from "../practice6/Lotto";

export default class GameMatcher extends Component {
  render() {
    console.log(this.props);
    // props안에 있는 history의 메서드로 브라우저의 동작을 직접 조절해야 한다. 뒤로가기 등.
    // match안의 params안에 주소가 존재한다. 이걸로 분기처리.
    // history안에 search, hash 등이 들어있다.
    // 위 API들은 브라우저 내장 API와는 다르다.

    if (this.props.match.params.name === "number-baseball") {
      return <NumberBaseball />;
    } else if (this.props.match.params.name === "rock-scissors-paper") {
      return <RSP />;
    } else if (this.props.match.params.name === "lotto-generator") {
      return <Lotto />;
    }
    return <div>일치하는 게임이 없습니다.</div>;
  }
}
