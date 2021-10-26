import { FC, useEffect, useState } from 'react';
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

const apiDomain = 'http://localhost:3000';
const popularArticlesApiUrl = `${apiDomain}/v2/posts?popular=true`;

interface Article {
  id: number;
  title: string;
  excerpt: string;
}

const App: FC = () => {
  const [articles, setArticles] = useState<Article[]>([]);
  const [lastArticleId, setLastArticleId] = useState<number | null>(null);
  const [isFetchMore, setIsFetchMore] = useState(false);

  const articlesApiUrl =
    lastArticleId === null
      ? popularArticlesApiUrl
      : `${popularArticlesApiUrl}&before=${lastArticleId}`;

  // first screen article data fetch
  useEffect(() => {
    setIsFetchMore(true);
  }, []);

  // when turn on isFetchMore will fetch more articles
  useEffect(() => {
    if (isFetchMore) {
      fetch(articlesApiUrl)
        .then(result => result.json())
        .then(newArticles => {
          setArticles(prevArticles => {
            return [...prevArticles, ...newArticles];
          });
          setIsFetchMore(false);
        });
    }
  }, [isFetchMore, articlesApiUrl]);

  // when get new articles data will update lastArticleId
  useEffect(() => {
    const articlesQty = articles.length;
    if (articlesQty > 0) {
      const newlastArticleId = articles[articlesQty - 1].id;
      setLastArticleId(newlastArticleId);
    }
  }, [articles]);

  // turn on handleScroll event
  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isFetchMore) {
      setIsFetchMore(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
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
