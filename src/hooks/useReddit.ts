import useFetch, { UseFetch, RequestOptions } from './useFetch';

export const baseUrl = 'https://api.reddit.com';

/**
 * A custom React Hook for using the Reddit API. It uses `useFetch` with a base URL and a
 * `dataTransformer` to parse the Reddit data and clear all the bloat that comes with it.
 *
 * @export
 * @param {string} [endpoint='']
 * @returns {UseFetch<any>}
 */
export default function useReddit(
  endpoint: string = '',
  options?: RequestOptions<any>,
): UseFetch<any> {
  return useFetch(baseUrl + endpoint, {
    dataTransformer: data => data.data.children.map((item: any) => item.data),
    ...options,
  });
}
