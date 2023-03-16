import "../styles/globals.css";
import Layout from "../components/Layout";
import { ContextProvider } from "../context";
import { useEffect } from "react";
import { hotjar } from 'react-hotjar';
import { Analytics } from '@vercel/analytics/react';
import * as gtag from '../lib/analytics'
import { useRouter } from 'next/router'

export default function App({ Component, pageProps }) {
  const router = useRouter();

  useEffect(() => {
    hotjar.initialize(3395534, 6);
  }, []);

  useEffect(() => {
    const handleRouteChange = url => {
      gtag.pageview(url);
    };
    router.events.on('routeChangeComplete', handleRouteChange)
    return () => {
      router.events.off('routeChangeComplete', handleRouteChange)
    }
  }, [router.events])

  return (
    <ContextProvider>
      <Layout>
        <Component {...pageProps} />
        <Analytics />
      </Layout>
    </ContextProvider>
  );
}
