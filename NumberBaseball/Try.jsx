import React, { Component } from "react";

class Try extends Component {
  render() {
    const { tryInfo } = this.props; // 비구조화 할당
    return (
      <li>
        {/* props로 전달받은 tryInfo 안의 try와 result를 출력 */}
        <div>{tryInfo.try}</div>
        <div>{tryInfo.result}</div>
      </li>
    );
  }
}

export default Try;
