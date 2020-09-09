import React, {
  useEffect,
  useState,
  useRef,
  useMemo,
  useCallback,
} from "react";
import Ball from "./Ball";

// useCallback은 함수 자체를 기억하고, useMemo는 함수의 값을 기억한다.

// 렌더링될 때 전체가 다 실행되는 훅스의 특성상, getNumbers가 계속 실행된다. 따라서 그 결과물인 winNumbers를 잠시 저장할 캐시, useMeno를 사용한다.
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

const LottoHooks = () => {
  // 간단한건 useRef, 복잡한 것은 useMemo. 두 번째 인자가 바뀌지 않는 한 안의 함수가 다시 실행되지 않는다.
  // 만약 이 안에 winBalls를 넣으면 계속 다시 실행된다. 아래에서 setWinBalls로 계속해서 winBalls를 setState하고 있기 때문에 바뀌기 때문이다.
  const rememberedNumbers = useMemo(() => getWinNumbers(), []);
  const [winNumbers, setWinNumbers] = useState(rememberedNumbers);
  const [winBalls, setWinBalls] = useState([]);
  const [bonus, setBonus] = useState(null);
  const [redo, setRedo] = useState(false);
  const timeouts = useRef([]);
  // 위의 부분(훅스)는 순서가 매우매우! 중요하기 때문에 조건문이나 함수에 넣었을 때 순서가 달라질 수 있으므로 절대로! 넣으면 안 된다. useEffect등에서도 쓰면 안 됨
  // 반복문에서는 순서가 일정하다면 넣어도 되긴 한데 왠만하면 넣지 마라. 최상위에 무조건.

  const runTimeouts = () => {
    for (let i = 0; i < winNumbers.length - 1; i++) {
      timeouts.current[i] = setTimeout(() => {
        // timeouts.current의 '요소'를 바꾸는 것이므로 timeouts.current가 바뀌는 것이 아니다.
        setWinBalls((prevWinBalls) => {
          return [...prevWinBalls, winNumbers[i]];
        });
      }, (i + 1) * 1000); // n번째 공은 n초 뒤에 들어감
    }

    timeouts.current[6] = setTimeout(() => {
      setBonus(winNumbers[6]);
      setRedo(true);
    }, 7000); // 7초 뒤에 보너스 공 들어감
  };

  // 전체가 재실행될 때 onClickRedo 함수가 계속 재생성되는데, useCallback으로 감싸놓으면 재실행되도 이 함수를 기억해놨던 것을 가지고 사용한다.
  const onClickRedo = useCallback(() => {
    setWinNumbers(getWinNumbers());
    console.log(winNumbers); // 이전 당첨 숫자를 기억하게 되는데, 다시 재실행되어도 이 값이 바뀌지 않는다.
    setWinBalls([]);
    setBonus(null);
    setRedo(false);
    timeouts.current = []; // timeouts.current에 새로운 배열을 넣어주는 '바뀌는' 부분이다.
  }, [winNumbers]); // 두 번째 인자에 이게 바뀌면 다시 재실행되므로 state와 같은 것을 여기에 넣어줘야지 된다.

  // didMount에서만 실행되었으면 하는 작업은 아래와 같이 한다.
  useEffect(() => {
    // 여기는 didMount에서 처음 시작되는 작업
  }, []); // 빈 배열이면 바뀔게 없으니 처음 시작되고 만다.
  const mount = useRef(false);

  // 만약 didMount는 실행 안 되었으면 좋겠고 didUpdate에서만 실행되었으면 좋겠다면 다음과 같이 하면 된다.
  useEffect(() => {
    if (!mount.current) mount.current = true;
    //이후에 원하는 작업 수행
  }, ["바뀌는 값"]);
  // 위의 useEffect가 didMount에 실행되는 것은 어쩔 수 없다. 그러나 처음에 mount가 false이기 때문에 아무것도 안 한다.

  useEffect(() => {
    runTimeouts();
    return () => {
      timeouts.current.forEach((v) => clearTimeout(v));
    };
  }, [timeouts.current]);
  // 배열에 요소가 없으면 componentDidMount 역할만 하고 요소가 있으면 componentDidMount와 componentDidUpdate 역할 두 개를 다 하게 된다.

  return (
    // 아래 <Ball/>에 만약 함수를 넘기게 되면 그 때 그 함수는 무조건 useCallback을 사용해야 한다. 자식 컴포넌트는 안 그러면 항상 새로운 함수가 전달되는 줄
    // 알고 매번 새로 렌더링을 하게 된다. 사실 함수 자체는 바뀐게 없는데 자식은 계속 함수가 바뀐다고 생각하기 때문에 렌더링하게 되므로 이것은 옳지 않다.
    <>
      <div>당첨 숫자</div>
      <div id="결과창">
        {winBalls.map((v) => (
          <Ball key={v} number={v} />
        ))}
      </div>
      <div>보너스!</div>
      {bonus && <Ball number={bonus} />}
      <button onClick={redo ? onClickRedo : () => {}}>한 번 더!</button>
    </>
  );
};

export default LottoHooks;
