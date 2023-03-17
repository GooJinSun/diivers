import { InfiniteData } from 'react-query';

export type KeysMatching<T, V> = {
  [K in keyof T]: T[K] extends V ? K : never;
}[keyof T];

/**
 *
 * @param data infinite data
 * @param key infinite data 중에서 pluck 하고자 하는 array 형태 data
 * @param identifier array 데이터 중 uniqueness 구분자
 */
export const flatMapInfiniteData = <
  Data extends InfiniteData<any> | undefined,
  Response extends Data extends InfiniteData<infer V> ? V : never,
  Key extends KeysMatching<Response, Array<any>>,
  Identifier extends keyof Response[Key][number],
  Result extends Response[Key]
>(
  data: Data,
  key: Key,
  identifier: Identifier
): Result => {
  return (
    data?.pages?.reduce((acc, curr) => {
      const nextPage = curr[key];

      if (!nextPage) return acc;

      const filtered = nextPage.filter(
        (v: Result) => !acc.find((p: Result) => p[identifier] === v[identifier])
      );

      return [...acc, ...filtered];
    }, []) || []
  );
};
