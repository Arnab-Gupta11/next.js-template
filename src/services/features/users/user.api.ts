/* eslint-disable @typescript-eslint/no-explicit-any */
import { useAppMutation } from '@/services/base/use-app-mutation';
import { useAppQuery } from '@/services/base/use-app-query';
import { queryKeys } from '@/services/config/query-keys';
import { userService } from './user.services';

const UserApi = {
  // Queries
  useAllUsers: (params?: any) =>
    useAppQuery(queryKeys.users.list(params), () => userService.getAll(params)),

  useUserSummary: () => useAppQuery(queryKeys.users.summary(), () => userService.getSummary()),

  useMe: () => useAppQuery(queryKeys.users.me(), () => userService.getMe()),

  // Mutations
  useCreateUser: () =>
    useAppMutation((data) => userService.create(data), {
      invalidateKeys: [queryKeys.users.lists()],
    }),

  useUpdateUser: (userId: string) =>
    useAppMutation(({ id, data }: { id: string; data: any }) => userService.update(id, data), {
      invalidateKeys: [queryKeys.users.lists(), queryKeys.users.detail(userId)],
    }),

  useUpdateAvatar: () =>
    useAppMutation((data) => userService.updateAvatar(data), {
      invalidateKeys: [queryKeys.users.me()],
    }),

  useDeleteUser: () =>
    useAppMutation((id: string) => userService.delete(id), {
      invalidateKeys: [queryKeys.users.lists()],
    }),

  useRestoreUser: () =>
    useAppMutation((id: string) => userService.restore(id), {
      invalidateKeys: [queryKeys.users.lists()],
    }),

  useGetConversationId: () =>
    useAppMutation((recipientId: string) => userService.getConversationId(recipientId)),
};

export const {
  useAllUsers,
  useUserSummary,
  useMe,
  useCreateUser,
  useUpdateUser,
  useUpdateAvatar,
  useDeleteUser,
  useRestoreUser,
  useGetConversationId,
} = UserApi;
