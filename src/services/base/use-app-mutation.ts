/* eslint-disable @typescript-eslint/no-explicit-any */
// /* eslint-disable no-unused-vars */
// import { useMutation, UseMutationOptions } from '@tanstack/react-query';

// export const useAppMutation = <TData, TVariables>(
//   mutationFn: (variables: TVariables) => Promise<TData>,
//   options?: UseMutationOptions<TData, Error, TVariables>,
// ) => {
//   return useMutation({ mutationFn, ...options });
// };

// ====================================>

import {
  DefaultError,
  useMutation,
  UseMutationOptions,
  useQueryClient,
} from '@tanstack/react-query';

// ১. কাস্টম অপশন টাইপ
interface AppMutationOptions<TData, TError, TVariables, TContext> extends UseMutationOptions<
  TData,
  TError,
  TVariables,
  TContext
> {
  invalidateKeys?: readonly (readonly any[])[];
}

export const useAppMutation = <
  TData = unknown,
  TVariables = void,
  TError = DefaultError,
  TContext = unknown,
>(
  // eslint-disable-next-line no-unused-vars
  mutationFn: (variables: TVariables) => Promise<TData>,
  options?: AppMutationOptions<TData, TError, TVariables, TContext>,
) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn,
    ...options,

    // onMutate এখন ২ টি আর্গুমেন্ট নেয়
    onMutate: async (variables, _mutationContext) => {
      if (options?.onMutate) {
        return await options.onMutate(variables, _mutationContext);
      }
      return undefined as TContext;
    },

    // onSuccess এখন ৪ টি আর্গুমেন্ট নেয়
    onSuccess: async (data, variables, context, _mutationContext) => {
      if (options?.invalidateKeys) {
        await Promise.all(
          options.invalidateKeys.map((key) => queryClient.invalidateQueries({ queryKey: key })),
        );
      }
      if (options?.onSuccess) {
        // কম্পোনেন্ট লেভেলের কলব্যাকেও ৪টি আর্গুমেন্ট পাস করতে হবে
        options.onSuccess(data, variables, context, _mutationContext);
      }
    },

    // onError এখন ৪ টি আর্গুমেন্ট নেয়
    onError: (err, variables, context, _mutationContext) => {
      console.error('Mutation Error:', err);
      if (options?.onError) {
        // কম্পোনেন্ট লেভেলের কলব্যাকেও ৪টি আর্গুমেন্ট পাস করতে হবে
        options.onError(err, variables, context, _mutationContext);
      }
    },

    // onSettled এখন ৫ টি আর্গুমেন্ট নেয়
    onSettled: (data, error, variables, context, _mutationContext) => {
      if (options?.onSettled) {
        // কম্পোনেন্ট লেভেলের কলব্যাকেও ৫টি আর্গুমেন্ট পাস করতে হবে
        options.onSettled(data, error, variables, context, _mutationContext);
      }
    },
  });
};
