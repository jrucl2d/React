import React, { Component } from "react";

class LifeCycleSample extends Component {
  state = {
    number: 0,
    color: null,
  };
  constructor(props) {
    super(props);
    console.log("construnctor");
  }

  // 부모로부터 받은 color 값을 state에 동기화. 컴포넌트가 마운트 되거나 업데이트 될 때
  static getDerivedStateFromProps(nextProps, prevState) {
    console.log("getDerivedStateFromProps");
    if (nextProps.color !== prevState.color) {
      return { color: nextProps.color }; // 조건에 따라서 state color을 동기화
    }
    return null; // state를 변경할 필요가 없으면 null 반환
  }

  // 컴포넌트 만들고 첫 렌더링을 마친 후 실행. 이벤트 등록, 비동기 요청, 다른 라이브러리/프레임워크 함수 호출
  componentDidMount() {
    console.log("componentDidMount");
  }

  // 리렌더링을 할지 말지 결정
  shouldComponentUpdate(nextProps, nextState) {
    console.log("shouldComponentUpdate ", nextProps, nextState);
    // 숫자의 마지막 자리가 4면 리렌더링 하지 않음
    return nextState.number % 10 !== 4;
  }

  // 컴포넌트를 DOM에서 제거할 때 실행됨
  componentWillUnmount() {
    console.log("ComponentWillUnmount");
  }
  myRef = null;
  handleClick = () => {
    this.setState({
      number: this.state.number + 1,
    });
  };

  // render에서 만들어진 결과물이 브라우저에 실제 반영되기 직전에 호출. 여기의 반환값이 componentDidUpdate의 snapshot에 들어감
  // DOM에 변화가 생기기 직전 색상 속성을 snapshot 값으로 반환하여 componentDidUpdate에서 조회할 수 있도록 함
  getSnapshotBeforeUpdate(prevProps, prevState) {
    console.log("getSnapshotBeforeUpdate");
    if (prevProps.color !== this.props.color) {
      return this.myRef.style.color;
    }
    return null;
  }

  // 리렌더링 완료한 후 실행됨
  componentDidUpdate(prevProps, prevState, snapshot) {
    console.log("componentDidUpdate", prevProps, prevState);
    if (snapshot) {
      console.log("업데이트 되기 직전 색상:", snapshot);
    }
  }

  render() {
    console.log("render");
    const style = {
      color: this.props.color,
    };
    return (
      <div>
        {/* 아래에서 의도적인 에러 발생 */}
        {this.props.missing.value}
        <h1 style={style} ref={(ref) => (this.myRef = ref)}>
          {this.state.number}
        </h1>
        <p>color: {this.state.color}</p>
        <button onClick={this.handleClick}>더하기</button>
      </div>
    );
  }
}

export default LifeCycleSample;
