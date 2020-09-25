import React from "react";
import { withRouter } from "react-router-dom"; // 라우터로 사용된 컴포넌트가 아니어도 location, match, history에 접근할 수 있게 해줌
const WithRouterSample = ({ location, match, history }) => {
  return (
    <div>
      <h4>location</h4>
      <textarea
        value={JSON.stringify(location, null, 2)} // null, 2로 해주면 들여쓰기 적용된 상태로 문자열 만들어짐
        rows={7}
        readOnly={true}
      />
      <h4>match</h4>
      <textarea
        value={JSON.stringify(match, null, 2)}
        rows={7}
        readOnly={true}
      />
      <button onClick={() => history.push("/")}>홈으로</button>
    </div>
  );
};

export default withRouter(WithRouterSample);
