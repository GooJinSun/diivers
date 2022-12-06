import { UseInfiniteQueryOptions, UseQueryOptions } from 'react-query';

export type QueryHookOptions<
  T extends (...args: any) => any,
  QueryFn = Awaited<ReturnType<T>>
> = Omit<UseQueryOptions<QueryFn, any, QueryFn, any>, 'select'>;

export type QuerySelectHookOptions<
  T extends (...args: any) => any,
  QueryFn = Awaited<ReturnType<T>>
> = Omit<UseQueryOptions<QueryFn, any, any, any>, 'select'>;

export type InfiniteQueryHookOptions<
  T extends (...args: any) => any,
  QueryFn = Awaited<ReturnType<T>> & { nextOffset: number }
> = Omit<
  UseInfiniteQueryOptions<QueryFn, any, QueryFn, QueryFn, any>,
  'queryKey' | 'queryFn'
>;
