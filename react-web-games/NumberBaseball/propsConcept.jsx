import React, { Component } from "react"; // 한 번에 합쳐줄 수 있다.

// 숫자 네 개를 겹치지 않게 랜덤하게 뽑는 함수
const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), i)[0];
    array.push(chosen);
  }
  return array;
};

class NumberBaseball extends Component {
  state = {
    result: "",
    value: "",
    answer: getNumbers(),
    tries: [], // 리액트에서 push 쓰면 안 됨
  };

  onSubmitForm = (e) => {
    e.preventDefault();
    if (this.state.value === this.state.answer.join("")) {
      this.setState({
        result: "홈런!",
        // 참조가 바뀌어야지 리액트에서 감지할 수 있다. 따라서 push 하면 안 되고
        // ...this.state.tries, 즉 예전 배열을 복사하고 새로운 걸 넣어주는 방식으로 해야 한다.
        tries: [...this.state.tries, { try: this.state.value, result: "홈런!" }],
      });
      alert("게임을 다시 시작함");
      this.setState({
        result: "",
        value: "",
        answer: getNumbers(),
        tries: [],
      });
    } else {
      const answerArray = this.state.value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (this.state.tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${this.state.answer.join(",")}이었다.`,
        });
        alert("게임을 다시 시작함");
        this.setState({
          result: "",
          value: "",
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === this.state.answer[i]) {
            strike += 1;
          } else if (this.state.answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState({
          tires: [...this.state.tries, { try: this.state.value, result: `${strike} 스트라이크, ${ball}볼!` }],
          value: "",
        });
      }
    }
  };
  inputElem;
  myRef = (c) => {
    this.inputElem = c;
  };

  render() {
    return (
      <>
        <h1>{this.state.result}</h1>
        <form onSubmit={this.onSubmitForm}>
          {/* input 부분에 value와 onchange를 안 쓰고 defaultValue로도 할 수 있다. */}
          <input maxLength={4} defaultValue={this.state.value} ref={this.myRef} />
        </form>
        <div>시도 : {this.state.tries.length}</div>

        {/* 리액트에서 반복문을 사용하는 법 */}
        {/* 바뀌는 부분이 두 개라면 이차원 배열 또는 객체를 이용하지만 보통 객체가 더 좋다. */}
        <ul>
          {[
            { fruit: "사과", taste: "맛있다" },
            { fruit: "배", taste: "맛없다" },
            { fruit: "사과", taste: "띵땅똥" },
          ].map((v, i) => {
            return (
              // key를 고유한 것으로 해줘야 하는데 사과가 겹치므로 두 문자열을 더한 것으로 해준다
              // 이 부분은 따로 Try라는 컴포넌트를 만들어서 import해와서
              //  <Try key={v.fruit+v.tase} index={i} value={v} />로 보내주는 습관을 들이는 것이 좋다.
              <li key={v.fruit + v.taste}>
                <b>{v.fruit}</b>-{v.taste} {i}
              </li>
            );
          })}
        </ul>
      </>
    );
  }
}

// 한 파일 안에서 default와 그냥을 같이 쓸 수 있다. default는 한 번만, 그냥은 여러번 쓸 수 있다.
export default NumberBaseball; // import NubmerBaseball로 가져온다, module.exports와 호환된다고 생각하면 된다.
export const hello = `hello`; // import {hello}로 가져온다.

// 이 아래는 common.js이고 위에는 react2015의 문법
// const React = require("react");
// exports.hello = "hello";
// module.exports = NumberBaseball;
