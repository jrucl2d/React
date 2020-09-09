import React, { useState, useRef, useEffect } from "react";

const rspCoords = {
  바위: "0",
  가위: "-142px",
  보: "-284px",
};
const scores = {
  가위: 1,
  바위: 0,
  보: -1,
};
const computerChoice = (imgCoord) => {
  return Object.entries(rspCoords).find(function (v) {
    return v[1] === imgCoord;
  })[0];
};

const RSP = () => {
  const [result, setResult] = useState("");
  const [imgCoord, setImgCoord] = useState(0);
  const [score, setScore] = useState(0);
  const interval = useRef(null);

  // componentDidMount, componentDidUpdate 역할(1대 1 대응은 아니지만)
  // 두 번째 인자 배열이 클로져 문제 같은 것을 해결 해줌.
  // useEffect를 실행하고 싶은 state(여기서는 imgCoord)가 들어감
  // 훅스는 매번 이 함수 전체가 다시 실행된다. 즉, useEffect가 매번 실행되면서 setInterval이
  // 실행되었다가 clearInterval로 종료되고가 반복된다. 즉, imgCoord가 바뀔 때마다 setInteval이
  // 실행되었다가 꺼졌다가를 반복한다. 즉, setTimeout과 같은 역할을 하게 된다.
  // 배열이 비어있다면 어떤게 바뀌던지 상관 안 하고 한 번만 바뀌고 만다. 즉 비면 didMount, 있으면 didUpdate 역할.
  // class에서는 did시리즈가 딱 한 번 쓰여서 그 안에서 모든 state를 처리하지만 useEffect는 원하는
  // state마다 여러번 쓸 수 있다.
  useEffect(() => {
    interval.current = setInterval(changeHand, 100);
    return () => {
      // return이 componentWillUnmount 역할
      clearInterval(interval.current);
    };
  }, [imgCoord]);

  // uselayoutEffect는 레이아웃이 변경되면이기 때문에 useEffect랑 다르게 바뀌기 전에 실행된다.

  const changeHand = () => {
    if (imgCoord === rspCoords.바위) {
      setImgCoord(rspCoords.가위);
    } else if (imgCoord === rspCoords.가위) {
      setImgCoord(rspCoords.보);
    } else {
      setImgCoord(rspCoords.바위);
    }
  };

  const onClickBtn = (choice) => () => {
    clearInterval(interval.current);
    const myScore = scores[choice];
    const computerScore = scores[computerChoice(imgCoord)];
    const diff = myScore - computerScore;
    if (diff === 0) {
      setResult("비겼습니다");
    } else if ([-1, 2].includes(diff)) {
      setResult("비겼습니다");
      setScore((prevScore) => prevScore + 1);
    } else {
      setResult("졌습니다");
      setScore((prevScore) => prevScore - 1);
    }
    setTimeout(() => {
      interval.current = setInterval(changeHand, 100);
    }, 1000);
  };

  return (
    <>
      <div id="computer" style={{ background: `url(https://en.pimg.jp/023/182/267/1/23182267.jpg) ${imgCoord} 0` }}></div>
      <div>
        <button id="rock" className="btn" onClick={onClickBtn("바위")}>
          바위
        </button>
        <button id="scissor" className="btn" onClick={onClickBtn("가위")}>
          가위
        </button>
        <button id="paper" className="btn" onClick={onClickBtn("보")}>
          보
        </button>
      </div>
      <div>{result}</div>
      <div>현재 {score} 점</div>
    </>
  );
};
export default RSP;
