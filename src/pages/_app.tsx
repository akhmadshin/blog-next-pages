import '@/styles/globals.css'

import {
  Hydrate,
} from '@tanstack/react-query'
import React, { useEffect } from 'react';
import { Header } from '@/components/Header';
import { useSSRIntercept } from '@/hooks/useSSRIntercept';
import { AppProps } from 'next/app';
import { useRouter } from 'next/router';
import WithQueryClientProvider from '@/components/WithQueryClientProvider';
import { Page } from '@/components/Page';

export default function MyApp({Component, pageProps}: AppProps) {
  const router = useRouter();

  useEffect(() => {
    router.prefetch('/');
    router.prefetch('/blog/[slug]');
  }, [])

  useSSRIntercept();

  return (
    <WithQueryClientProvider>
      <Header/>
      <main>
        <Hydrate state={pageProps.dehydratedState}>
          <Page>
            <Component {...pageProps} />
          </Page>
        </Hydrate>
      </main>
      <div className="mt-16 sm:mt-32"></div>
    </WithQueryClientProvider>
  )
}