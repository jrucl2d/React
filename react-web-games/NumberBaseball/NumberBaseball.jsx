import React, { Component, createRef } from "react"; // 한 번에 합쳐줄 수 있다.
import Try from "./Try";

// 숫자 네 개를 겹치지 않게 랜덤하게 뽑는 함수, this 안 쓰면 밖으로 뺄수 있다.
const getNumbers = () => {
  const candidate = [1, 2, 3, 4, 5, 6, 7, 8, 9];
  const array = [];
  for (let i = 0; i < 4; i++) {
    const chosen = candidate.splice(Math.floor(Math.random() * (9 - i)), 1)[0];
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
  // 함수를 사용하면 안에 console.log를 사용한다던가 미세한 조정 가능. 선택의 문제.
  inputRef = createRef(); // import해서 사용 가능

  onSubmitForm = (e) => {
    const { value, answer, tries, result } = this.state;
    e.preventDefault();
    if (value === answer.join("")) {
      this.setState((prev) => {
        // 여기도 연달아 setState가 등장하므로 함수형으로 쓰는 것이 좋다.
        return {
          result: "홈런!",
          // 참조가 바뀌어야지 리액트에서 감지할 수 있다. 따라서 push 하면 안 되고
          // ...this.state.tries, 즉 예전 배열을 복사하고 새로운 걸 넣어주는 방식으로 해야 한다.
          tries: [...prev.tries, { try: value, result: "홈런!" }],
        };
      });
      alert("게임을 다시 시작함");
      this.setState({
        value: "",
        answer: getNumbers(),
        tries: [],
      });
    } else {
      const answerArray = value.split("").map((v) => parseInt(v));
      let strike = 0;
      let ball = 0;
      if (tries.length >= 9) {
        this.setState({
          result: `10번 넘게 틀려서 실패! 답은 ${answer.join(",")}이었다.`,
        });
        alert("게임을 다시 시작함");
        this.setState({
          value: "",
          answer: getNumbers(),
          tries: [],
        });
      } else {
        for (let i = 0; i < 4; i++) {
          if (answerArray[i] === answer[i]) {
            strike += 1;
          } else if (answer.includes(answerArray[i])) {
            ball += 1;
          }
        }
        this.setState((prev) => {
          return {
            tries: [...prev.tries, { try: value, result: `${strike} 스트라이크, ${ball}볼!` }],
            value: "",
          };
        });
      }
    }
    this.inputRef.current.focus();
  };

  onChangeInput = (e) => {
    this.setState({
      value: e.target.value,
    });
  };

  // render 안에 setState 쓰면 무하 반복이 생긴다. setState가 render를 부르고, render 안에 setState가 있어서.
  render() {
    const { result, value, tries } = this.state; // 비구조화 할당으로 코드를 더 간결하게 가능
    return (
      <>
        <h1>{result}</h1>
        <form onSubmit={this.onSubmitForm}>
          {/* input 부분에 value와 onchange를 안 쓰고 defaultValue로도 할 수 있다. */}
          <input maxLength={4} value={value} onChange={this.onChangeInput} ref={this.inputRef} />
          <button>제출</button>
        </form>
        <div>시도 : {tries.length}</div>

        {/* 리액트에서 반복문을 사용하는 법 */}
        {/* 바뀌는 부분이 두 개라면 이차원 배열 또는 객체를 이용하지만 보통 객체가 더 좋다. */}
        <ul>
          {tries.map((v, i) => (
            <Try key={`${i + 1}차 시도 : `} tryInfo={v} />
          ))}
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
