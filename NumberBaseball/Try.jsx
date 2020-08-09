import React, { PureComponent } from "react";

// PureComponent를 쓰면 쓸데없이 Try가 렌더링되는 것을 막을 수 있다.
class Try extends PureComponent {
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

// 더 세밀하게 조정하고 싶다면 Component를 쓰고 shouldComponentUpdate(nextProps, nextState, nextContext)를
// 사용해서 조건을 제시해서 원하는 것만 렌더링을 다시해야 한다.
