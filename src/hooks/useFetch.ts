import { useState, useEffect, useRef } from 'react';

/**
 * The interface returned from {@link useFetch}.
 *
 * @export
 * @interface UseFetch
 * @template T The interface for the data returned from the fetch call
 */
export interface UseFetch<T> {
  data: T | null;
  loading: boolean;
  error: ResponseError | Error | null;
  retries: number;
  aborted: boolean;
  retry(): void;
  abort(): void;
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
  onSuccess?(): void;

  /**
   * Called when an error occurs
   */
  onFail?(err: ResponseError | Error): void;
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

/**
 * A custom React Hook to fetch data using the [Fetch API](https://developer.mozilla.org/it/docs/Web/API/Fetch_API)
 * It supports a loading and an error state, the fetch call can be retried and it can have a
 * `dataTransformer` option to optionally transform the returned data.
 * In theory we can use React Suspance with react-cache but the typescript definitions aren't
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
  const [data, setData] = useState<E | null>(null);
  const [error, setError] = useState<ResponseError | Error | null>(null);
  const [retries, setRetries] = useState(0);
  const [loading, setLoading] = useState(false);
  const controller = useRef<AbortController | null>(null);

  const { dataTransformer, json = true, onSuccess, onFail, ...rest } = options;

  useEffect(
    () => {
      controller.current = new AbortController();
      setLoading(true);

      fetch(input, { signal: controller.current.signal, ...rest })
        .then(res => {
          if (!res.ok) throw new ResponseError(res.statusText, res.status, res.statusText);
          return json ? res.json() : res;
        })
        .then(res => (dataTransformer ? dataTransformer(res) : res))
        .then(res => {
          setData(res);
          setLoading(false);
          if (onSuccess !== undefined) onSuccess();
        })
        .catch(err => {
          if (err.name !== 'AbortError') {
            setError(err);
            setLoading(false);
          } else {
            setLoading(false);
            setData(null);
            setError(null);
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
    setData(null);
    setError(null);
    setRetries(retries + 1);
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
