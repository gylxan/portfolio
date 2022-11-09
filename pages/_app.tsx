import '../styles/globals.css';
import type { AppProps } from 'next/app';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import DefaultLayout from '../components/layouts/DefaultLayout/DefaultLayout';
import { Page } from '../types/page';

config.autoAddCss = false;

export default function App({
  Component,
  pageProps,
}: AppProps & { Component: Page }) {
  // Use the layout defined at the page level, if available
  const Layout = Component.layout || DefaultLayout;

  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
