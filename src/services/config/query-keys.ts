/* eslint-disable @typescript-eslint/no-explicit-any */
export const queryKeys = {
  users: {
    all: ['users'] as const,
    lists: () => [...queryKeys.users.all, 'list'] as const,
    list: (params: any) => [...queryKeys.users.lists(), { params }] as const,
    details: () => [...queryKeys.users.all, 'detail'] as const,
    detail: (id: string) => [...queryKeys.users.details(), id] as const,
    summary: () => [...queryKeys.users.all, 'summary'] as const,
    me: () => [...queryKeys.users.all, 'me'] as const,
  },
};
