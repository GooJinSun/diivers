import { InfiniteData } from 'react-query';

export const getNextPageParam = <
  T extends { isEnd: boolean; nextOffset?: number }
>(
  lastPage: T
) => (!lastPage.isEnd ? lastPage.nextOffset : undefined);

export const withInfiniteLoad =
  <Fn extends (...args: any) => Promise<any>, P = Parameters<Fn>>(
    api: Fn,
    params: P,
    pageSize: number
  ) =>
  async ({ pageParam: offset = 0 }) => {
    const r = await api({ ...params, offset, limit: pageSize });
    return {
      nextOffset: offset + pageSize,
      ...r
    };
  };

export type KeysMatching<T, V> = {
  [K in keyof T]-?: T[K] extends V ? K : never;
}[keyof T];

export const withTypedInfiniteLoad =
  <
    QueryFn extends (...args: any) => Promise<any>,
    Params = Parameters<QueryFn>
  >(
    api: QueryFn,
    params: Params,
    pageSize: number
  ) =>
  async ({
    pageParam: offset = 0
  }): Promise<
    Awaited<QueryFn extends (...args: any) => infer R ? R : never>
  > => {
    return {
      nextOffset: offset + pageSize,
      ...(await api({ ...params, offset, limit: pageSize }))
    };
  };

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
