import React, { useState, useEffect } from "react";
import styled from "styled-components";
import NewsItem from "./NewsItem";
import axios from "axios";

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
const NewsList = () => {
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    // useEffect 자체에 async를 사용하는 것은 불가.
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          "http://newsapi.org/v2/top-headlines?country=kr&apiKey=8b03715d8e07427093ea24fa793a2d64"
        );
        setArticles(response.data.articles);
      } catch (err) {
        console.error(err);
      }
      setLoading(false);
    };
    fetchData();
  }, []);

  if (loading) {
    return <NewsListBlock>대기중...</NewsListBlock>;
  }
  // 아직 articles 값이 설정되지 않았을 때
  // 이 작업이 없으면 아직 데이터가 없어서 null에는 map 함수가 없어서 렌더링 오류가 ㅂ라생함.
  if (!articles) {
    return null;
  }

  return (
    <NewsListBlock>
      {articles.map((article) => (
        <NewsItem key={article.url} article={article} />
      ))}
    </NewsListBlock>
  );
};

export default NewsList;
