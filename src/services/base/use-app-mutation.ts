/* eslint-disable no-unused-vars */
import { useMutation, UseMutationOptions } from '@tanstack/react-query';

export const useAppMutation = <TData, TVariables>(
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: UseMutationOptions<TData, Error, TVariables>,
) => {
  return useMutation({ mutationFn, ...options });
};
