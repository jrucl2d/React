import React from "react";

function App() {
  const name = "리액트쟁이";
  const number = 0;

  const unde = undefined;
  // return unde; // undefined를 리턴하면 오류남
  // return unde || "값이 undefined입니다."; // or 연산자로 해결

  const style = {
    backgroundColor: "black", // background-color
    color: "aqua",
    fontSize: "48px", // font-size
    fontWeight: "bold", // font-weight
    padding: 16, // 단위 생략시 알아서 px단위로
  };
  return (
    <>
      <h1 style={style}>{name} 안녕!</h1>
      <h2>잘 작동하니?</h2>
      {name === "리액트쟁이" ? ( // jsx를 여러 줄로 쓸 때는 괄호로 감싼다.
        <h1>나는 리액트쟁이</h1>
      ) : (
        <h1>나는 리액트 안쟁이</h1>
      )}
      <h2
        style={{
          backgroundColor: "black", // background-color
          color: "aqua",
          fontSize: "48px", // font-size
          fontWeight: "bold", // font-weight
          padding: 16, // 단위 생략시 알아서 px단위로
        }}
      >
        이것도 적용 가능
      </h2>
      {name === "리액트쟁이" && <h1>리액트쟁이</h1>}
      {name === "리액트돌이" && null}
      {number && <h1>영이다</h1>} {/* 이건 0이 출력됨 */}
      {unde || "언디파인드"} {/* undefined를 렌더링하는 것은 가능 */}
    </>
  );
}

export default App;
