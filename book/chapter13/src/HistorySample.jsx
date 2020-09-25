import React, { Component } from "react";

class HistorySample extends Component {
  //뒤로 가기
  handleGoBack = () => {
    this.props.history.goBack();
  };
  // 홈으로 이동
  handleGoHome = () => {
    this.props.history.push("/");
  };
  componentDidMount() {
    // 페이지 변화 생길 때마다 정말 나갈건지 물음
    this.unblock = this.props.history.block("정말 나갈건가?");
  }
  componentWillUnmount() {
    if (this.unblock) {
      this.unblock(); // 컴포넌트 언마운트 되면 질문 멈춤
    }
  }
  render() {
    return (
      <>
        <button onClick={this.handleGoBack}>뒤로</button>
        <button onClick={this.handleGoHome}>홈으로</button>
      </>
    );
  }
}
export default HistorySample;
