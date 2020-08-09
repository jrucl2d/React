import React, { Component } from "react";

class Try extends Component {
  render() {
    return (
      <li>
        {/* props로 전달받은 tryInfo 안의 try와 result를 출력 */}
        <div>{this.props.tryInfo.try}</div>
        <div>{this.props.tryInfo.result}</div>
      </li>
    );
  }
}

export default Try;
