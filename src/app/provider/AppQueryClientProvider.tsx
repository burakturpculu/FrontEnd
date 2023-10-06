'use client';

import {
  MutationCache,
  QueryClient,
  QueryClientProvider,
} from '@tanstack/react-query';
import { AxiosError } from 'axios';
import { useState } from 'react';
import toast, { ToastOptions } from 'react-hot-toast';

export default function FrontQueryClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const mutationCache = new MutationCache({
    onError: (error, _variables, _context, mutation) => {
      if (mutation.options.onError) {
        return;
      }

      const commonToastOptions: ToastOptions = {
        duration: 5000,
        position: 'top-right',
      };

      if (error instanceof AxiosError) {
        if (error.response?.data?.exception?.message) {
          toast.error(
            `${error.response.data.exception?.message}`,
            commonToastOptions,
          );
          return;
        }

        if (error.response?.data?.resourceCode) {
          toast.error(
            `${error.response.data.resourceCode}`,
            commonToastOptions,
          );
          return;
        }

        if (error.response?.data?.messages?.length) {
          error.response.data.messages.forEach((message: string) => {
            toast.error(`errors.${message}`, commonToastOptions);
          });
          return;
        }
      }

      toast.error('errors.unknown', commonToastOptions);
    },
  });
  const [queryClient] = useState(
    () =>
      new QueryClient({
        mutationCache,
        defaultOptions: {
          queries: {
            suspense: true,
            staleTime: 1000 * 60 * 5,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            refetchOnReconnect: false,
          },
        },
      }),
  );

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
