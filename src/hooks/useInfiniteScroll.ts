import { useEffect, useState } from 'react';

const useInfiniteScroll = () => {
  const [isFetchMore, setIsFetchMore] = useState(false);

  function handleScroll() {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 100 && !isFetchMore) {
      setIsFetchMore(true);
    }
  }

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return { isFetchMore, setIsFetchMore };
};

export default useInfiniteScroll;
