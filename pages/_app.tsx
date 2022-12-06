import 'styles/globals.css';
import type { AppProps } from 'next/app';
import { Footer, Header } from 'components';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import { DefaultSeo } from 'next-seo';
import nextSeoConfig from 'constants/seo';

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <DefaultSeo {...nextSeoConfig} />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
