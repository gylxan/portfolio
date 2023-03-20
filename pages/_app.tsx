import 'styles/globals.css';
import type { AppProps as IAppProps } from 'next/app';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import nextSeoConfig from 'constants/seo';
import { DefaultSeo } from 'next-seo';
import { Analytics } from '@vercel/analytics/react';
import { NextIntlProvider } from 'next-intl';
import type { SiteConfig } from 'types/siteConfig';

config.autoAddCss = false;

interface AppProps extends IAppProps {
  siteConfig?: SiteConfig;
}

export default function App({ Component, pageProps }: AppProps) {
  const { siteConfig } = pageProps;
  return (
    <NextIntlProvider messages={siteConfig?.translations}>
      <DefaultSeo {...nextSeoConfig} />
      <Component {...pageProps} />
      <Analytics />
    </NextIntlProvider>
  );
}
