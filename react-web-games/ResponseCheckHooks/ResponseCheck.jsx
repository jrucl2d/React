import React, { useState, useRef } from "react";

const ResponseCheck = () => {
  const [state, setState] = useState("waiting");
  const [message, setMessage] = useState("클릭해서 시작하세요");
  const [result, setResult] = useState([]);
  // Hooks에서는 class 사용법에서 그냥 선언하던 변수들을 ref를 이용해서 처리한다.
  // setState는 바꾸면 return이 다시 실행되지만 ref는 그렇지 않다. 불필요한 렌더링 막을 수 있다.
  // 즉, 값이 바뀌지만 화면에는 영향을 주고 싶지 않을 때
  const timeout = useRef(null);
  const startTime = useRef(null);
  const endTime = useRef(null);

  const onClickScreen = () => {
    if (state === "waiting") {
      setState("ready");
      setMessage("초록색이 되면 클릭하세요");
      timeout.current = setTimeout(() => {
        setState("now");
        setMessage("지금 클릭");
        startTime.current = new Date(); // ref이기 때문에 current에 넣어줘야 함
      }, Math.floor(Math.random() * 1000) + 2000);
    } else if (state === "ready") {
      setState("waiting");
      setMessage("너무 성급합니다. 초록색일 때 클릭하세요");
      clearTimeout(timeout.current);
    } else {
      endTime.current = new Date();
      setState("waiting");
      setMessage("클릭해서 시작하세요");
      setResult((prevResult) => {
        return [...prevResult, endTime.current - startTime.current]; // 이거는 그냥 바로 하면 된다. result 하나니깐
      });
    }
  };
  const onReset = () => {
    setResult([]);
  };
  const returnAverage = () => {
    return result.length === 0 ? null : (
      <>
        <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
        <button onClick={onReset}>리셋!</button>
      </>
    );
  };

  return (
    <>
      <div id="screen" className={state} onClick={onClickScreen}>
        {message}
      </div>
      {/* return 내부에서 if문을 사용하는 법 : IIFE를 사용. 별로라서 잘 안 씀 */}
      {/* for문 또한 IIFE를 사용해서 할 수 있다. 그러나 별로라서 잘 안 쓰고 자식 컴포넌트 만드는게 좋다 */}
      {/* 배열 안에 jsx를 담아서 출력도 가능하다. 그러나 거의 쓰이지는 않는다. <> </>를 더 많이 씀*/}
      {/* return [<div key="사과">사과</div>
      <div key="배">배</div>
      <div key="포도">포도</div>] */}
      {(() => {
        if (result.length === 0) {
          return null;
        } else {
          return (
            <>
              <div>평균 시간: {result.reduce((a, c) => a + c) / result.length}ms</div>
              <button onClick={onReset}>리셋!</button>
            </>
          );
        }
      })()}
      {/* {returnAverage()} */}
    </>
  );
};

export default ResponseCheck;
