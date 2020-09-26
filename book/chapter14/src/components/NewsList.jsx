import React from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";
import usePromise from "../lib/usePromise";

const NewsListBlock = styled.div`
  box-sizing: border-box;
  padding-bottom: 3rem;
  width: 768px;
  margin: 0 auto;
  margin-top: 2rem;
  @media screen and (max-width: 768px) {
    width: 100%;
    padding-left: 1rem;
    padding-right: 1rem;
  }
`;
const NewsList = ({ category }) => {
  const [loading, response, error] = usePromise(() => {
    const query = category === "all" ? "" : `&category=${category}`;
    return axios.get(
      `http://newsapi.org/v2/top-headlines?country=kr${query}&apiKey=8b03715d8e07427093ea24fa793a2d64`
    );
  }, [category]);

  if (loading) {
    return <NewsListBlock>대기중...</NewsListBlock>;
  }
  // 아직 articles 값(response)이 설정되지 않았을 때
  // 이 작업이 없으면 아직 데이터가 없어서 null에는 map 함수가 없어서 렌더링 오류가 발생함.
  if (!response) {
    return null;
  }
  if (error) {
    return <NewsListBlock>에러 발생!</NewsListBlock>;
  }

  const { articles } = response.data;
  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
