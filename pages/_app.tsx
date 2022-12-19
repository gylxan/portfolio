import 'styles/globals.css';
import type { AppProps } from 'next/app';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import nextSeoConfig from 'constants/seo';
import { DefaultSeo } from 'next-seo';
import { Analytics } from "@vercel/analytics/react";

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <DefaultSeo {...nextSeoConfig} />
      <Component {...pageProps} />
      <Analytics />
    </>
  );
}
