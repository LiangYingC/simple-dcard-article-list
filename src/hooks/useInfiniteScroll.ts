import { useEffect, useState } from 'react';
import debounce from '../libs/debounce';

interface UseInfiniteScrollParams<T> {
  newItems: T[];
  fetchMoreItemsFn: () => Promise<void>;
  hasMore: boolean;
}

const useInfiniteScroll = <T>({
  newItems,
  fetchMoreItemsFn,
  hasMore,
}: UseInfiniteScrollParams<T>) => {
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

  const isScrollToThreshold =
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 100;

  const handleScroll = () => {
    if (isScrollToThreshold && !isFetchMore && hasMore) {
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
