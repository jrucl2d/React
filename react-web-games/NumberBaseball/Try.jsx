import React, { PureComponent } from "react";

// PureComponent를 쓰면 쓸데없이 Try가 렌더링되는 것을 막을 수 있다.
class Try extends PureComponent {
  render() {
    const { tryInfo } = this.props; // 비구조화 할당
    // props로 받은 것은 자식에서 '절대' 바꾸면 안 된다. 부모에서 바꿔라.
    // 정 바꾸고 싶다면 this.state={result:this.props.result} 이런식으로 해라
    // 훅스는 const [result, setResult] = useState(tryInfo.result)를 써서 state로 바꿔라.
    // 그리고 변수도 바로 안 쓰고 한 번 필터링을 거치고 싶다면 constructor을 만들어서 그 안에서
    // 다른 동작을 하고 넘겨주는 방식이 있다.
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
