import PageRouter from 'next/router';
import { useEffect } from 'react';

export const useSSRIntercept = () => {
  useEffect(() => {
    if (!PageRouter.router?.components) return;

    const pageLoader = PageRouter.router.pageLoader;

    if (!pageLoader) return;

    const {loadPage: originalLoadPage} = pageLoader;
    pageLoader.loadPage = (...args) => (
      originalLoadPage
        .apply(pageLoader, args)
        .then((pageCache) => {
          return {
            ...pageCache,
            mod: {
              ...pageCache.mod,
              // NOTE: behave as if there is no `getServerSideProps` for the
              // page so Next won't fetch the result from the server
              // @see https://github.com/vercel/next.js/blob/13b32ba98179aa94ac2e402f272e5c6a3356d310/packages/next/src/shared/lib/router/router.ts#L2181
              __N_SSP: false,
            },
          }
        }))

    return () => {
      pageLoader.loadPage = originalLoadPage;
    };
  }, []);
};