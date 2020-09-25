import React from "react";
import qs from "qs";

const About = ({ location }) => {
  const query = qs.parse(location.search, {
    ignoreQueryPrefix: true, // 맨 앞의 ?를 생략
  });
  const showDetail = query.detail === "true"; // 쿼리의 파싱 결과는 문자열.
  return (
    <>
      <h1>소개</h1>
      <p>이 프로젝트는 리액트 라우터 기초를 실습하는 프로젝트</p>
      {showDetail && <p>detail 값을 true로 설정했네!</p>}
    </>
  );
};
export default About;
