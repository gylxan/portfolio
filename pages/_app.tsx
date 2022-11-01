import '../styles/globals.css';
import type { AppProps } from 'next/app';
import Footer from '../components/Footer/Footer';
import Header from '../components/Header/Header';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';

config.autoAddCss = false;

export default function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header />
      <main>
        <Component {...pageProps} />
      </main>
      <Footer />
    </>
  );
}
