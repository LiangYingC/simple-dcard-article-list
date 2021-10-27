import { useEffect, useState } from 'react';
import debounce from '../libs/debounce';

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
    if (isFetchMore) {
      fetchMoreItemsFn().then(() => {
        setIsFetchMore(false);
      });
    }
  }, [isFetchMore, fetchMoreItemsFn]);

  useEffect(() => {
    setItems(prevItems => [...prevItems, ...newItems]);
  }, [newItems]);

  const handleScroll = () => {
    const isScrollToThreshold =
      window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;
    if (isScrollToThreshold && !isFetchMore) {
      setIsFetchMore(true);
    }
  };

  const handleScrollWithDebounce = debounce(handleScroll, 20);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollWithDebounce);
    return () => window.removeEventListener('scroll', handleScrollWithDebounce);
  }, []);

  return { items };
};

export default useInfiniteScroll;
