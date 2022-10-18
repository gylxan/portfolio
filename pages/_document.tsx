import { Head, Html, Main, NextScript } from 'next/document';
import manifest from '../public/manifest.json';

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="title" content={process.env.NEXT_PUBLIC_NAME} />
        <meta name="keywords" content={process.env.NEXT_PUBLIC_KEYWORDS} />
        <meta
          name="description"
          content={process.env.NEXT_PUBLIC_DESCRIPTION}
        />
        <meta name="og:title" content={process.env.NEXT_PUBLIC_NAME} />
        <meta
          name="og:description"
          content={process.env.NEXT_PUBLIC_DESCRIPTION}
        />
        <meta name="og:url" content={process.env.NEXT_PUBLIC_URL} />
        <meta name="og:type" content="website" />
        <meta name="og:image" content={process.env.NEXT_PUBLIC_LOGO_URL} />
        <link rel="apple-touch-icon" sizes="180x180" href="/icons/apple-touch-icon.png" />
        <link rel="icon" sizes="32x32" href="/icons/icon-32x32.png" />
        <link rel="icon" sizes="16x16" href="/icons/icon-16x16.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="mask-icon" href="/icons/safari-pinned-tab.svg" color="#ff8080" />
        <meta name="theme-color" content={manifest.theme_color} />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
