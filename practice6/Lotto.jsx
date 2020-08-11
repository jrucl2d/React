import React, { Component } from "react";
import Ball from "./Ball";
function getWinNumbers() {
  console.log("getWinNumbers");
  const candidate = Array(45)
    .fill()
    .map((v, i) => i + 1);
  const shuffle = [];
  while (candidate.length > 0) {
    shuffle.push(
      candidate.splice(Math.floor(Math.random() * candidate.length), 1)[0]
    );
  }
  const bonusNumber = shuffle[shuffle.length - 1];
  const winNumbers = shuffle.slice(0, 6).sort((p, c) => p - c);
  return [...winNumbers, bonusNumber];
}
class Lotto extends Component {
  state = {
    winNumbers: getWinNumbers(),
    winBalls: [],
    bonus: null,
    redo: false,
  };

  timeouts = []; // setTimeout들을 담아서 없애주기 위해서

  runTimeouts = () => {
    const { winNumbers } = this.state;
    for (let i = 0; i < winNumbers.length - 1; i++) {
      this.timeouts[i] = setTimeout(() => {
        this.setState((prevState) => {
          return {
            winBalls: [...prevState.winBalls, winNumbers[i]],
          };
        });
      }, (i + 1) * 1000); // n번째 공은 n초 뒤에 들어감
    }

    this.timeouts[6] = setTimeout(() => {
      this.setState({
        bonus: winNumbers[6],
        redo: true,
      });
    }, 7000); // 7초 뒤에 보너스 공 들어감
  };

  componentDidMount() {
    this.runTimeouts();
  }

  componentDidUpdate(prevProps, prevState) {
    // 다시 실행하게 되는 조건을 잘 설정해줘야 한다. prevProps는 부모로부터 받은 값이 변하는 경우가 있기 때문에 쓴다.
    // prevState가 이전 스테이트이고, this.state가 현재 스테이트
    // 조건문이 없다면 this.runTimeout이 계속 실행된다. 이것을 거를 수 있는 조건문이 반드시 필요햐다.
    if (this.state.winBalls.length === 0) {
      this.runTimeouts();
    }
  }

  // 메모리 누수 문제를 조심하기 위해서 신경 잘 써야 한다.
  componentWillUnmount() {
    this.timeouts.forEach((v) => clearTimeout(v));
  }

  onClickRedo = () => {
    this.setState({
      winNumbers: getWinNumbers(),
      winBalls: [],
      bonus: null,
      redo: false,
    });
    this.timeouts = [];
  };

  render() {
    const { winBalls, bonus, redo } = this.state;
    return (
      <>
        <div>당첨 숫자</div>
        <div id="결과창">
          {winBalls.map((v) => (
            <Ball key={v} number={v} />
          ))}
        </div>
        <div>보너스!</div>
        {bonus && <Ball number={bonus} />}
        <button onClick={redo ? this.onClickRedo : () => {}}>한 번 더!</button>
      </>
    );
  }
}

export default Lotto;
