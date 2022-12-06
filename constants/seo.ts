import process from 'process';
import manifest from 'public/manifest.json';

const nextSeoConfig = {
  titleTemplate: process.env.NEXT_PUBLIC_NAME + ' - %s',
  defaultTitle: process.env.NEXT_PUBLIC_NAME,
  openGraph: {
    description: process.env.NEXT_PUBLIC_DESCRIPTION,
    url: process.env.NEXT_PUBLIC_URL,
    locale: 'en_US',
    images: [
      ...(process.env.NEXT_PUBLIC_OG_IMAGE_URL
        ? [
            {
              url: process.env.NEXT_PUBLIC_OG_IMAGE_URL,
              alt: 'Og Image Alt',
              width: 800,
              height: 600
            },
          ]
        : []),
    ],
    type: 'website',
  },
  themeColor: manifest.theme_color,
  additionalMetaTags: [
    ...(process.env.NEXT_PUBLIC_KEYWORDS
      ? [{ name: 'keywords', content: process.env.NEXT_PUBLIC_KEYWORDS }]
      : []),
  ],
  additionalLinkTags: [
    {
      rel: 'icon',
      sizes: '32x32',
      href: '/icons/icon-32x32.png',
    },
    {
      rel: 'icon',
      sizes: '16x16',
      href: '/icons/icon-16x16.png',
    },
    {
      rel: 'manifest',
      href: '/manifest.json',
    },
    ...(process.env.NEXT_PUBLIC_APPLE_TOUCH_ICON_URL
      ? [
          {
            rel: 'apple-touch-icon',
            sizes: '180x180',
            href: process.env.NEXT_PUBLIC_APPLE_TOUCH_ICON_URL,
          },
        ]
      : []),
    ...(process.env.NEXT_PUBLIC_SAFARI_TAB_ICON_URL
      ? [
          {
            rel: 'mask-icon',
            href: process.env.NEXT_PUBLIC_SAFARI_TAB_ICON_URL,
          },
        ]
      : []),
  ],
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default nextSeoConfig;
