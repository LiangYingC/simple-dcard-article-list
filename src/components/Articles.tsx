import { FC, useEffect, useState } from 'react';
import styled from 'styled-components';
import useLazyFetch from '../hooks/useLazyFetch';
import useInfiniteScroll from '../hooks/useInfiniteScroll';

const apiDomain = 'http://localhost:3000';
const popularArticlesApiUrl = `${apiDomain}/v2/posts?popular=true`;

const ArticlesWrapper = styled.div`
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

const filterDuplicateIdArticles = (data: Article[]) => {
  const temp: { [key: string]: boolean } = {};
  return data.filter(({ id }) => {
    if (temp[id]) return false;
    temp[id] = true;
    return true;
  });
};

interface Article {
  id: number;
  title: string;
  excerpt: string;
}

const Articles: FC = () => {
  const [lastArticleId, setLastArticleId] = useState<number | null>(null);
  const [hasMoreArticles, setHasMoreArticles] = useState(true);

  const articlesApiUrl =
    lastArticleId === null
      ? popularArticlesApiUrl
      : `${popularArticlesApiUrl}&before=${lastArticleId}`;

  const { data: newArticles, fetchData: fetchArticles } = useLazyFetch<Article[]>({
    url: articlesApiUrl,
    initialData: [],
  });

  const { items: allArticles } = useInfiniteScroll<Article>({
    newItems: newArticles,
    fetchMoreItemsFn: fetchArticles,
    hasMore: hasMoreArticles,
  });

  const uniqueArticles = filterDuplicateIdArticles(allArticles);

  useEffect(() => {
    const articlesQty = allArticles.length;
    if (articlesQty === 0 || !hasMoreArticles) return;

    const newlastArticleId = allArticles[articlesQty - 1].id;
    if (newlastArticleId === lastArticleId) {
      setLastArticleId(newlastArticleId);
    } else {
      setHasMoreArticles(false);
    }
  }, [allArticles, lastArticleId, hasMoreArticles]);

  return (
    <ArticlesWrapper>
      {uniqueArticles.map(({ id, title, excerpt }) => {
        return (
          <Article key={id}>
            <Title>{title}</Title>
            <Excerpt>{excerpt}</Excerpt>
          </Article>
        );
      })}
    </ArticlesWrapper>
  );
};

export default Articles;
