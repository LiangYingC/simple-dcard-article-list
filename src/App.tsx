import { FC, useState, useEffect } from 'react';
import styled from 'styled-components';
import GlobalStyle from './styles/globalStyle';

const Articles = styled.div`
  width: 70%;
  margin: 0 auto;
  background-color: #ffffff;
`;

const Article = styled.article`
  position: relative;
  margin: 0px 60px;
  padding: 20px 0px;
  border-bottom: 1px solid rgb(233, 233, 233);
`;

const Title = styled.h2`
  color: #333333;
`;

const Excerpt = styled.p`
  color: #555555;
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
`;

const App: FC = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    fetch('http://localhost:3000/v2/posts?popular=true')
      .then(data => {
        return data.json();
      })
      .then(data => {
        setArticles(data);
      });
  }, []);
  return (
    <>
      <GlobalStyle />
      <Articles>
        {articles.map(({ id, title, excerpt }) => {
          return (
            <Article key={id}>
              <Title>{title}</Title>
              <Excerpt>{excerpt}</Excerpt>
            </Article>
          );
        })}
      </Articles>
    </>
  );
};

export default App;
