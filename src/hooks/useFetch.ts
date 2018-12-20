import { useEffect, useRef, useReducer } from 'react';
import produce, { Draft } from 'immer';

export type UseFetchError = ResponseError | Error;

/**
 * The interface for the `useFetch` internal state
 */
export interface UseFetchState<T> {
  data: T | null;
  loading: boolean;
  error: UseFetchError | null;
  retries: number;
}

/**
 * The interface returned from `useFetch`.
 */
export interface UseFetch<T> extends UseFetchState<T> {
  aborted: boolean;
  retry(): void;
  abort(): void;
}

enum UseFetchActionType {
  Started,
  Succeeded,
  Failed,
  Retried,
  Aborted,
}

interface UseFetchAction<T> {
  type: UseFetchActionType;
  data?: Draft<T>;
  error?: UseFetchError;
}

/**
 * The interface for the request options that the user can attach to the fetch call.
 *
 * @export
 * @interface RequestOptions
 * @extends {RequestInit}
 * @template T The interface for the original data returned from the fetch call
 * @template E The interface of the transformed data. It defaults to T
 */
export interface RequestOptions<T, E = T> extends RequestInit {
  /**
   * If true, it transforms the raw data to JSON.
   *
   * @type {boolean}
   */
  json?: boolean;

  /**
   * You can pass a `dataTransformer` to, well, transform the data returned from the fetch call.
   */
  dataTransformer?(data: T): E;

  /**
   * Called when the data is received and transformed
   */
  onSuccess?(data: E): void;

  /**
   * Called when an error occurs
   */
  onFail?(err: UseFetchError): void;
}

/**
 * A simple custom error for when the fetch response doesn't succeed.
 * It contains an HTTP status code and status text.
 *
 * @export
 * @class ResponseError
 * @extends {Error}
 */
export class ResponseError extends Error {
  constructor(message: string, public statusCode: number, public statusText: string) {
    super(message);
  }
}

const initialState: UseFetchState<any> = {
  data: null,
  error: null,
  loading: false,
  retries: 0,
};

function reducer<T>(state: UseFetchState<T>, action: UseFetchAction<T>): UseFetchState<T> {
  return produce(state, draft => {
    switch (action.type) {
      case UseFetchActionType.Started:
        draft.loading = true;
        break;
      case UseFetchActionType.Succeeded:
        if (!action.data) {
          throw new Error(
            `The action "${UseFetchActionType.Succeeded.toString()}" must contain a "data" property`,
          );
        }

        draft.loading = false;
        draft.data = action.data;
        draft.error = null;
        break;
      case UseFetchActionType.Failed:
        draft.loading = false;
        draft.data = null;
        draft.error = action.error || null;
        break;
      case UseFetchActionType.Retried:
        draft.data = null;
        draft.error = null;
        draft.loading = true;
        draft.retries += 1;
        break;
      case UseFetchActionType.Aborted:
        draft.data = null;
        draft.error = null;
        draft.loading = false;
        break;
    }
  });
}

/**
 * A custom React Hook to fetch data using the [Fetch API](https://developer.mozilla.org/it/docs/Web/API/Fetch_API)
 * It supports a loading and an error state, the fetch call can be retried and it can have a
 * `dataTransformer` option to optionally transform the returned data.
 * In theory we can use React Suspense with react-cache but the typescript definitions aren't
 * there yet.
 *
 * @export
 * @template T The original data interface returned from the fetch call
 * @template E The interface of the transformed data. It defaults to T
 * @param {RequestInfo} input The request URL
 * @param {RequestOptions<T, E>} [options={}] The request options
 * @returns {UseFetch<E>}
 */
export default function useFetch<T = any, E = T>(
  input: RequestInfo,
  options: RequestOptions<T, E> = {},
): UseFetch<E> {
  const [{ data, error, retries, loading }, dispatch] = useReducer<
    UseFetchState<E>,
    UseFetchAction<E>
  >(reducer, initialState);
  const controller = useRef<AbortController | null>(null);

  const { dataTransformer, json = true, onSuccess, onFail, ...rest } = options;

  useEffect(
    () => {
      controller.current = new AbortController();
      dispatch({ type: UseFetchActionType.Started });

      fetch(input, { signal: controller.current.signal, ...rest })
        .then(res => {
          if (!res.ok) throw new ResponseError(res.statusText, res.status, res.statusText);
          return json ? res.json() : res;
        })
        .then(res => (dataTransformer ? dataTransformer(res) : res))
        .then(res => {
          dispatch({ type: UseFetchActionType.Succeeded, data: res });
          if (onSuccess !== undefined) onSuccess(res);
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            dispatch({ type: UseFetchActionType.Failed, error: err });
          } else {
            dispatch({ type: UseFetchActionType.Aborted });
          }
          if (onFail !== undefined) onFail(err);
        });

      return () => {
        if (loading && controller.current !== null && !controller.current.signal.aborted) {
          controller.current.abort();
        }
      };
    },
    [input, retries],
  );

  function retry() {
    dispatch({ type: UseFetchActionType.Retried });
  }

  function abort() {
    if (controller.current !== null) controller.current.abort();
  }

  return {
    loading,
    data,
    error,
    retries,
    retry,
    abort,
    aborted: controller.current !== null && controller.current.signal.aborted,
  };
}
