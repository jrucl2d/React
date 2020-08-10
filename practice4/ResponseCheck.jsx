import React, { Component } from "react";

class ResponseCheck extends Component {
  state = {
    state: "waiting", // 색깔을 담당할 예정
    message: "클릭해서 시작하세요",
    result: [],
  };

  timeout; // 타임아웃 초기화하기 위해 사용
  startTime; // 시간 재기 위해 사용
  endTime;

  onClickScreen = () => {
    const { state, message, result } = this.state;

    if (state === "waiting") {
      this.setState({
        state: "ready",
        message: "초록색이 되면 클릭하세요",
      });
      this.timeout = setTimeout(() => {
        this.setState({
          state: "now",
          message: "지금 클릭",
        });
        this.startTime = new Date(); // 시작 시간
      }, Math.floor(Math.random() * 1000) + 2000); // 2~3초 랜덤
    } else if (state === "ready") {
      // 성급한 클릭
      this.setState({
        state: "waiting",
        message: "너무 성급합니다. 초록색일 때 클릭하세요",
      });
      clearTimeout(this.timeout); // 기존의 타임아웃 삭제
    } else {
      // 반응속도 체크
      this.endTime = new Date(); // 끝 시간
      this.setState((prevState) => {
        return {
          state: "waiting",
          message: "클릭해서 시작하세요",
          result: [...prevState.result, this.endTime - this.startTime],
        };
      });
    }
  };
  // 반응 속도 기록을 리셋
  onReset = () => {
    this.setState({
      result: [],
    });
  };
  // 원래 이 부분도 따로 컴포넌트를 만들고 props로 바꿔주는 것이 좋다.
  returnAverage = () => {
    const { result } = this.state;
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={this.onReset}>리셋</button>
      </>
    );
    // 혹은 this.state.result.length !== 0 && div....
  };

  render() {
    const { state, message } = this.state;
    return (
      <>
        <div id="screen" className={state} onClick={this.onClickScreen}>
          {message}
        </div>
        {/* 이 부분은 함수라서 () 필요. 위에는 함수명을 넣는거라 안 필요 */}
        {this.returnAverage()}
      </>
    );
  }
}

export default ResponseCheck;
