import { useState, useCallback } from 'react';

enum RequestMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

interface UseLazyFetchParams<T> {
  method?: RequestMethodEnum;
  url: string;
  initialData: T;
}

const useLazyFetch = <T>({
  method = RequestMethodEnum.GET,
  url,
  initialData,
}: UseLazyFetchParams<T>) => {
  const [data, setData] = useState<T>(initialData);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  const fetchData = useCallback(async () => {
    setIsError(false);
    setIsLoading(true);

    try {
      const result = await fetch(url, { method });
      const parsedResult: T = await result.json();
      setData(parsedResult);
    } catch (error) {
      setIsError(true);
    }

    setIsLoading(false);
  }, [method, url]);

  return { data, fetchData, isLoading, isError };
};

export default useLazyFetch;
