import React, { Component } from "react";

class Counter extends Component {
  //   constructor(props) {
  //     super(props);
  //     this.state = {
  //       number: 0,
  //       fixedNumber: 0,
  //     };
  //   }
  // 위처럼 귀찮게 할 필요 없음
  state = {
    number: 0,
    fixedNumber: 0,
  };

  render() {
    const { number, fixedNumber } = this.state;
    return (
      <div>
        <h1>{number}</h1>
        <h2>바뀌지 않는 값 : {fixedNumber}</h2>
        <button
          onClick={() => {
            // setState는 비동기적으로 작동하므로 그냥 setState 두 번 쓴다고 2씩 커지지 않는다.
            // 그래서 이전 state인 prevState 안의 number + 1을 해주면 2씩 커진다
            this.setState((prevState) => {
              return {
                number: prevState.number + 1, // 여기는 return이라는 단어를 써서 리턴
              };
            });

            // 화살표 함수에서 바로 객체를 반환하므로 ({})의 형태
            // setState 두 번째 인자에 콜백을 넣어주면 끝나고 실행됨
            this.setState(
              (prevState) => ({
                number: prevState.number + 1,
              }),
              () => {
                console.log("방금 두 번재 setState가 호출되었음");
                console.log(this.state);
              }
            );
          }}

          //   onClick={() => {
          //     // this.setState를 사용하여 state에 새로운 값을 넣을 수 있습니다.
          //     this.setState({ number: number + 1 });
          //   }}
        >
          +1
        </button>
      </div>
    );
  }
}

export default Counter;
