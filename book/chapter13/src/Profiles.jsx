import React from "react";
import { NavLink, Route } from "react-router-dom";
import Profile from "./Profile";

const Profiles = () => {
  const activeStyle = {
    background: "black",
    color: "white",
  };
  return (
    <div>
      <h3>사용자 목록:</h3>
      <ul>
        <li>
          <NavLink
            to="/profiles/velopert"
            activeStyle={activeStyle} // 활성화되었을 때의 스타일
            activeClassName="selected" // 활성화되었을 때의 클래스
          >
            velopert
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/profiles/gildong"
            activeStyle={activeStyle}
            activeClassName="selected"
          >
            gildong
          </NavLink>
        </li>
      </ul>

      <Route
        path="/profiles"
        exact // =true 안 하면 디폴트로 true
        // 컴포넌트 자체를 전달하지 않고 보여주고 싶은 JSX를 넣어줄 수 있다. render를 통해
        render={() => <div>사용자를 선택해 주세요.</div>}
      />
      <Route path="/profiles/:username" component={Profile} />
    </div>
  );
};
export default Profiles;
