import { QueryKey, useQuery, UseQueryOptions } from '@tanstack/react-query';

export const useAppQuery = <TData, TError = Error>(
  queryKey: QueryKey,
  queryFn: () => Promise<TData>,
  options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
) => {
  return useQuery({
    queryKey,
    queryFn,
    ...options,
  });
};

// import {
//   InfiniteData,
//   QueryKey,
//   useInfiniteQuery,
//   UseInfiniteQueryOptions,
//   useQuery,
//   UseQueryOptions,
// } from '@tanstack/react-query';

// // ── Standard Query ──────────────────────────────
// export const useAppQuery = <TData, TError = Error>(
//   queryKey: QueryKey,
//   queryFn: () => Promise<TData>,
//   options?: Omit<UseQueryOptions<TData, TError>, 'queryKey' | 'queryFn'>,
// ) => {
//   return useQuery<TData, TError>({
//     queryKey,
//     queryFn,
//     ...options,
//   });
// };

// // ── Infinite Query (pagination / load more) ─────
// // eslint-disable-next-line no-unused-vars
// type InfiniteQueryFn<TData> = (pageParam: number) => Promise<TData>;

// export const useAppInfiniteQuery = <
//   TData extends { meta?: { hasNextPage?: boolean; currentPage?: number } },
//   TError = Error,
// >(
//   queryKey: QueryKey,
//   queryFn: InfiniteQueryFn<TData>,
//   options?: Omit<
//     UseInfiniteQueryOptions<TData, TError, InfiniteData<TData>, QueryKey, number>,
//     'queryKey' | 'queryFn'
//   >,
// ) => {
//   return useInfiniteQuery<TData, TError, InfiniteData<TData>, QueryKey, number>({
//     queryKey,
//     queryFn: ({ pageParam }) => queryFn(pageParam),
//     initialPageParam: 1,
//     getNextPageParam: (lastPage: TData): number | null | undefined =>
//       lastPage?.meta?.hasNextPage ? (lastPage.meta?.currentPage ?? 0) + 1 : undefined,
//     ...options,
//   });
// };
