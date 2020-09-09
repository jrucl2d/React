import React, { memo } from "react";
// useState, useEffect를 써야 hooks이다. 이거는 그냥 함수 컴포넌트

// 하나의 컴포넌트를 다른 컴포넌트로 감싸는 등의 행위를 high order component, HOC라고 부른다.
const Ball = memo(({ number }) => {
  let background;
  if (number <= 10) {
    background = "red";
  } else if (number <= 20) {
    background = "orange";
  } else if (number <= 30) {
    background = "yellow";
  } else if (number <= 40) {
    background = "blue";
  } else {
    background = "green";
  }
  return (
    <div className="ball" style={{ background }}>
      {number}
    </div>
  );
});

export default Ball;
