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
    setItems(prevItems => [...prevItems, ...newItems]);
  }, [newItems]);

  useEffect(() => {
    if (isFetchMore) {
      fetchMoreItemsFn().then(() => {
        setIsFetchMore(false);
      });
    }
  }, [isFetchMore, fetchMoreItemsFn]);

  const handleScroll = () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isFetchMore) {
      setIsFetchMore(true);
    }
  };

  const handleScrollWithDebounce = debounce(handleScroll, 20);

  useEffect(() => {
    window.addEventListener('scroll', handleScrollWithDebounce);
    return () => window.removeEventListener('scroll', handleScrollWithDebounce);
  }, []);

  return { items, isFetchMore, setIsFetchMore };
};

export default useInfiniteScroll;
