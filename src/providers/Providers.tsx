import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Toaster } from 'sonner';
import QueryProvider from './QueryProvider';

const Providers = ({ children }: { children: React.ReactNode }) => {
  return (
    <>
      <QueryProvider>
        {children}
        <Toaster position="top-center" richColors />
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryProvider>
    </>
  );
};

export default Providers;
