import 'styles/globals.css';
import type { AppProps as IAppProps } from 'next/app';

import { config } from '@fortawesome/fontawesome-svg-core';
import '@fortawesome/fontawesome-svg-core/styles.css';
import nextSeoConfig from 'constants/seo';
import { DefaultSeo } from 'next-seo';
import { Analytics } from '@vercel/analytics/react';
import { NextIntlClientProvider } from 'next-intl';
import type { SiteConfig } from 'types/siteConfig';
import { AppProvider } from 'contexts/app-context';
import { useRouter } from 'next/router';

config.autoAddCss = false;

interface AppProps extends IAppProps {
  siteConfig?: SiteConfig;
}

export default function App({ Component, pageProps }: AppProps) {
  const { siteConfig } = pageProps;
  const { locale } = useRouter();
  return (
    <NextIntlClientProvider messages={siteConfig?.translations} locale={locale}>
      <AppProvider>
        <DefaultSeo {...nextSeoConfig} />
        <Component {...pageProps} />
        <Analytics />
      </AppProvider>
    </NextIntlClientProvider>
  );
}
