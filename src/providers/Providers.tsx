import { getUserInfoFromCookie } from '@/server-actions/actions/auth/get-user-info';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import { AuthProvider } from './AuthProvider';
import QueryProvider from './QueryProvider';

const Providers = async ({ children }: { children: React.ReactNode }) => {
  const initialUser = await getUserInfoFromCookie();
  return (
    <>
      <QueryProvider>
        <AuthProvider initialUser={initialUser}>{children}</AuthProvider>
        <Toaster position="top-center" richColors />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>
    </>
  );
};

export default Providers;
