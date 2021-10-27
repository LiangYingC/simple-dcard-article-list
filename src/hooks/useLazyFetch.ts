import { Reducer, useCallback, useReducer } from 'react';

enum RequestMethodEnum {
  GET = 'GET',
  POST = 'POST',
  PUT = 'PUT',
  PATCH = 'PATCH',
  DELETE = 'DELETE',
}

enum FetchActionEnum {
  START_FETCH = 'START_FETCH',
  FETCH_FULFILLED = 'FETCH_FULFILLED',
  FETCH_REJECTED = 'FETCH_REJECTED',
}

type FetchState<T> = {
  data: T;
  isLoading: boolean;
  isError: boolean;
};

type FetchActions<T> =
  | { type: FetchActionEnum.START_FETCH }
  | { type: FetchActionEnum.FETCH_FULFILLED; payload: { data: T } }
  | { type: FetchActionEnum.FETCH_REJECTED };

const fetchReducer = <T>(state: FetchState<T>, action: FetchActions<T>) => {
  switch (action.type) {
    case FetchActionEnum.START_FETCH:
      return { isLoading: true, isError: false, data: state.data };
    case FetchActionEnum.FETCH_FULFILLED:
      return { isLoading: false, isError: false, data: action.payload.data };
    case FetchActionEnum.FETCH_REJECTED:
      return { isLoading: false, isError: true, data: state.data };
    default:
      return state;
  }
};

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
  const initialState = {
    isLoading: false,
    isError: false,
    data: initialData,
  };
  const [state, dispatch] = useReducer<Reducer<FetchState<T>, FetchActions<T>>>(
    fetchReducer,
    initialState
  );

  const fetchData = useCallback(async () => {
    dispatch({ type: FetchActionEnum.START_FETCH });

    try {
      const result = await fetch(url, { method });
      const parsedResult: T = await result.json();
      dispatch({ type: FetchActionEnum.FETCH_FULFILLED, payload: { data: parsedResult } });
    } catch (error) {
      dispatch({ type: FetchActionEnum.FETCH_REJECTED });
    }
  }, [method, url]);

  const { data, isLoading, isError } = state;

  return { data, fetchData, isLoading, isError };
};

export default useLazyFetch;
