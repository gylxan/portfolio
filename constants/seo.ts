import manifest from 'public/manifest.json';

const nextSeoConfig = {
  openGraph: {
    locale: 'en_US',
    type: 'website',
  },
  themeColor: manifest.theme_color,
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
  ],
  twitter: {
    handle: '@handle',
    site: '@site',
    cardType: 'summary_large_image',
  },
};

export default nextSeoConfig;
