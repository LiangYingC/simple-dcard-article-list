import { useEffect, useState } from 'react';

interface UseInfiniteScrollParams<T> {
  newItems: T[];
  fetchMoreItemsFn: () => Promise<void>;
}

const useInfiniteScroll = <T>({ newItems, fetchMoreItemsFn }: UseInfiniteScrollParams<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [isFetchMore, setIsFetchMore] = useState(false);

  useEffect(() => {
    setIsFetchMore(true);
  }, []);

  useEffect(() => {
    setItems(prevItems => [...prevItems, ...newItems]);
  }, [newItems]);

  useEffect(() => {
    if (isFetchMore) {
      fetchMoreItemsFn().then(() => {
        setIsFetchMore(false);
      });
    }
  }, [isFetchMore, fetchMoreItemsFn]);

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isFetchMore) {
      setIsFetchMore(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { items, isFetchMore, setIsFetchMore };
};

export default useInfiniteScroll;
