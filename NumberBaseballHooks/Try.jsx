import React, { Component } from "react";

// () 안이 바로 props를 위한 자리이다. 따라서 바로 구조분해가 가능하다.
const Try = ({ tryInfo }) => {
  return (
    <li>
      {/* props로 전달받은 tryInfo 안의 try와 result를 출력 */}
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
};

export default Try;
