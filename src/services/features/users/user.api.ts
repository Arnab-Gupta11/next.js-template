/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppMutation } from '@/services/base/use-app-mutation';
import { useAppQuery } from '@/services/base/use-app-query';
import { queryKeys } from '@/services/config/query-keys';
import { userService } from './user.services';

const UserApi = {
  //=====================
  // Queries
  //=====================
  queries: {
    useAllUsersQuery: (params?: any) =>
      useAppQuery(queryKeys.users.list(params), () => userService.getAll(params)),

    useUserSummaryQuery: () =>
      useAppQuery(queryKeys.users.summary(), () => userService.getSummary()),

    useMeQuery: () => useAppQuery(queryKeys.users.me(), () => userService.getMe()),
  },

  //=====================
  // Mutations
  //=====================
  mutations: {
    useCreateUserMutation: () =>
      useAppMutation((data) => userService.create(data), {
        invalidateKeys: [queryKeys.users.lists()],
      }),

    useUpdateUserMutation: (userId: string) =>
      useAppMutation(({ id, data }: { id: string; data: any }) => userService.update(id, data), {
        invalidateKeys: [queryKeys.users.lists(), queryKeys.users.detail(userId)],
      }),

    useUpdateAvatarMutation: () =>
      useAppMutation((data) => userService.updateAvatar(data), {
        invalidateKeys: [queryKeys.users.me()],
      }),

    useDeleteUserMutation: () =>
      useAppMutation((id: string) => userService.delete(id), {
        invalidateKeys: [queryKeys.users.lists()],
      }),

    useRestoreUserMutation: () =>
      useAppMutation((id: string) => userService.restore(id), {
        invalidateKeys: [queryKeys.users.lists()],
      }),
  },
};

export const {
  useAllUsersQuery,
  useUserSummaryQuery,
  useMeQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useUpdateAvatarMutation,
  useDeleteUserMutation,
  useRestoreUserMutation,
} = { ...UserApi.queries, ...UserApi.mutations };
