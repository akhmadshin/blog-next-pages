import React from 'react';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';

function WithQueryClientProvider({children}: React.PropsWithChildren) {
  const [queryClient] = React.useState(() => new QueryClient({
    defaultOptions: {
      queries: {
        refetchOnMount: false,
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
      }
    }
  }))
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

export default WithQueryClientProvider;
