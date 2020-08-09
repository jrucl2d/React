import React, { memo } from "react";

// () 안이 바로 props를 위한 자리이다. 따라서 바로 구조분해가 가능하다.
// 성능 최적화를 하고 싶으면 memo로 컴포넌트를 감싸주면 된다.
// 성능 최적화는 가장 자식 컴포넌트에 memo 또는 PureComponenet를 하는 것이다.
// 만약 자식이 모두 memo나 퓨어면 부모도 memo나 pure를 적용해도 된다.
const Try = memo(({ tryInfo }) => {
  return (
    <li>
      {/* props로 전달받은 tryInfo 안의 try와 result를 출력 */}
      <div>{tryInfo.try}</div>
      <div>{tryInfo.result}</div>
    </li>
  );
});

export default Try;
