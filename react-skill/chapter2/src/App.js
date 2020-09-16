import React from "react";

function App() {
  const name = "리액트쟁이";
  const number = 0;
  return (
    <>
      <h1>{name} 안녕!</h1>
      <h2>잘 작동하니?</h2>
      {name === "리액트쟁이" ? ( // jsx를 여러 줄로 쓸 때는 괄호로 감싼다.
        <h1>나는 리액트쟁이</h1>
      ) : (
        <h1>나는 리액트 안쟁이</h1>
      )}
      {name === "리액트쟁이" && <h1>리액트쟁이</h1>}
      {name === "리액트돌이" && null}
      {number && <h1>영이다</h1>} {/* 이건 0이 출력됨 */}
    </>
  );
}

export default App;
